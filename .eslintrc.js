module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    extends: ['airbnb-base', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'import/no-extraneous-dependencies': 0,
        'no-underscore-dangle': 0,
    },
};
