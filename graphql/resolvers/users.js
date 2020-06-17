const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput } = require('../../utils/validators');
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

            const token = jwt.sign(
                {
                    id: res.id,
                    email: res.email,
                    username: res.username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                },
            );

            return {
                ...res._doc,
                id: res._id,
                token,
            };
        },
    },
};
