module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'plugin:react/recommended',
    ],
    "settings": {
        "react": {
            "version": "detect",
        },
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint',
    ],
    'rules': {
        'max-len': ['error', {'code': 180, 'tabWidth': 4}],
        'indent': ['error', 4, { "SwitchCase": 1 }],
    },
};
