const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');

module.exports = context => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired Token');
            }
        }

        throw new Error(`Invalid authentication token syntax`);
    }
    throw new Error('Authorization header not provided');
};
