module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 4],
        "semi": ["off"],
        "max-len": ["off"],
        "global-require": ["off"],
        "no-confusing-arrow": ["off"],
        "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "react/no-string-refs": ["off"],
        "react/self-closing-comp": ["off"],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
    }
};