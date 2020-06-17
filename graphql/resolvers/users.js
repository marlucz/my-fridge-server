const bcrypt = require('bcryptjs');

const { UserInputError } = require('apollo-server');

const {
    validateRegisterInput,
    validateLoginInput,
    generateToken,
} = require('../../utils/validators');
const User = require('../../models/User');

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async register(
            _,
            { registerInput: { username, email, password, passwordConfirm } }, // context,
        ) // info,
        {
            // validate input data
            const { errors, valid } = validateRegisterInput(
                username,
                email,
                password,
                passwordConfirm,
            );

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // check if user does not already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('User with that name alreasy exists', {
                    errors: {
                        username: 'This username is already taken',
                    },
                });
            }

            // hash password, create user token

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token,
            };
        },

        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong password';
                throw new UserInputError('Wrong password', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },
    },
};
