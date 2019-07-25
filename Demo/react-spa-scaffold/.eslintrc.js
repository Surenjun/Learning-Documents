module.exports = {
    "extends": "standard",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
    },
    "rules": {
        "strict": 0,
        "valid-jsdoc": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": 2,
        "indent": ["error", 4]
    },
    "plugins": [
        "react"
    ]
}
