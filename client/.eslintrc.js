module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
    },
    plugins: [
        'react',
    ],
    rules: {
        'camelcase': 'off',
        'no-console': 'off',
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        'react/destructuring-assignment': ['error', 'never'],
        "react/prop-types": "off",
    },
};
