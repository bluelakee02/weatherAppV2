const cssnano = require('cssnano');
const pff = require('postcss-flexbugs-fixes');
const ppe = require('postcss-preset-env');

module.exports = {
    plugins:
        process.env.NODE_ENV !== 'development'
            ? [
                pff(),
                ppe({
                    browsers: '> 0.5%, not IE 11, not IE_Mob 11',
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                    features: {
                        'custom-properties': false,
                    },
                }
                ),
                cssnano({
                    preset: ['default', {
                        discardUnused: true
                    }]
                })
            ]
            : [
                pff(),
            ],
};