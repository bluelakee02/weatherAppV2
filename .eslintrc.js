module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'import'],
    rules: {
        'max-len': ['error', { code: 180, tabWidth: 4 }],
        'react/prop-types': 0,
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: ['builtin', 'external', ['parent', 'internal', 'sibling'], 'index'],
                alphabetize: { order: 'asc' },
            },
        ],
    },
};
