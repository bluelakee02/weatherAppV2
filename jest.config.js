module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/?(*.)+(test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(js|ts|jsx|tsx)$": "babel-jest"
    },
    "setupFilesAfterEnv": ["<rootDir>tests/setupEnzyme.js"],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)$": "<rootDir>/tests/fileMock.js",
        "\\.(css|scss)$": "identity-obj-proxy",
        "@/(.*)$": "<rootDir>/src/$1",
    },
    "snapshotSerializers": ["enzyme-to-json/serializer"]
}
