const { UserInputError, AuthenticationError } = require('apollo-server');

const Tag = require('../../models/Tag');
const auth = require('../../utils/auth');

module.exports = {
    Query: {
        // eslint-disable-next-line no-empty-pattern
        async getTags(_, {}, context) {
            const { username } = auth(context);

            try {
                // eslint-disable
                const tags = await Tag.find({ username }).populate('products');
                return tags;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getProductsByTag(_, { tagId }) {
            try {
                const tag = await Tag.findById(tagId).populate('products');
                if (tag) {
                    const { products } = tag;
                    return products;
                }
                throw new Error('Tag not found');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
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
