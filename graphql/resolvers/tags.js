const { UserInputError, AuthenticationError } = require('apollo-server');

const Tag = require('../../models/Tag');
const auth = require('../../utils/auth');

module.exports = {
    Query: {},
    Mutation: {
        async createTag(_, { name }, context) {
            const user = auth(context);

            if (name.trim() === '') {
                throw new UserInputError('Tag name is empty', {
                    errors: {
                        name: `Tag name can't be empty`,
                    },
                });
            }

            const existingTag = await Tag.findOne({ name: name.toLowerCase() });

            if (existingTag) {
                throw new UserInputError(
                    `Tag with name '${name}' already exists`,
                    {
                        errors: {
                            tag: 'Please provide another tag name',
                        },
                    },
                );
            }

            const newTag = new Tag({
                name: name.toLowerCase(),
                user: user.id,
                username: user.username,
            });

            const tag = await newTag.save();
            return tag;
        },
        async deleteTag(_, { tagId }, context) {
            const user = auth(context);

            try {
                const tag = await Tag.findById(tagId);
                if (user.username === tag.username) {
                    await tag.delete();
                    return 'Tag deleted successfully';
                }
                throw new AuthenticationError('Action not allowed');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
