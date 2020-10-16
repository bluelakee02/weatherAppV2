const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const globalSassData = "'./src/assets/styles/variables/_colors.scss', './src/assets/styles/variables/_global.scss', './src/assets/styles/mixins/_shapes.scss'";

module.exports = (env, argv) => {
    const isDevBuild = argv.mode === 'development';
    return {
        stats: isDevBuild ? {
            assets: false,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: false,
            version: false,
            warnings: true,
            colors: true,
            entrypoints: true,
        } : {},
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom',
                '@': path.resolve(__dirname, 'src'),
            },
            extensions: ['.ts', '.js', '.json', '.tsx'],
        },
        entry: {
            app: {import: ['react-hot-loader/patch', './src/index.tsx'], filename: '[name].[contenthash].js'},
        },
        devtool: isDevBuild ? 'inline-cheap-source-map' : false,
        devServer: {
            contentBase: './dist',
            hot: true,
            historyApiFallback: true,
            proxy: {
                '/getLocation': 'http://localhost:3000'
            }
        },
        plugins: [
            new CleanWebpackPlugin(), //cleans everything in the output path
            new ManifestPlugin({fileName: 'manifest.webmanifest'}),
            new CompressionPlugin({
                filename: '[path].gz',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.ttf$/,
                threshold: 1024,
                minRatio: 0.8,
            }),
            new CompressionPlugin({
                filename: '[path].br',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|ttf)$/,
                compressionOptions: {
                    level: 11,
                },
                threshold: 1024,
                minRatio: 0.8,
            }),
            new HtmlWebpackPlugin({
                title: isDevBuild ? 'DEV BUILD' : 'PRODUCTION',
                cache: true,
                inject: 'head',
                scriptLoading: 'defer',
                template: 'src/index.html',
                jsExtension: '.gz',
            }),
            new webpack.DefinePlugin({
                VERSION: JSON.stringify('1.0.5'),
            }),
            new MiniCssExtractPlugin({
                filename: isDevBuild ? '[name].css' : '[contenthash].css',
            }),
            new CopyPlugin({
                patterns: [
                    {from: 'src/assets/public'},
                ]
            })
        ],
        performance: {
            hints: "warning",
            // To give warnings only if gzipped size exceeds limits
            assetFilter: (assetFilename) => assetFilename.endsWith(".js.gz"),
        },
        output: {
            filename: '[name].[chunkhash:16].bundle.js',
            chunkFilename: '[name].[chunkhash:16].chunk.js',
            path: path.resolve(__dirname, 'dist'),
        },
        optimization: {
            moduleIds: 'deterministic',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /node_modules\/(?!react|react-dom\/).*/,
                        name: "vendors",
                        chunks: "all",
                    },
                    react: {
                        test: /node_modules\/(react|react-dom\/).*/,
                        name: "react",
                        chunks: "all",
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
            runtimeChunk: {
                name: "runtime",
            },
            minimize: !isDevBuild,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: undefined,
                        parse: {},
                        compress: {},
                        mangle: true,
                        module: false,
                        output: null,
                        toplevel: false,
                        nameCache: null,
                        ie8: false,
                        keep_classnames: undefined,
                        keep_fnames: true, //for testcafe to work
                        safari10: false,
                    },
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: [
                        'cache-loader',
                        {
                            loader: 'thread-loader', options: {
                                workers: require("os").cpus().length - 1
                            },
                        },

                        'babel-loader',

                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'cache-loader',
                        {
                            loader: 'style-loader',
                            options: {injectType: 'singletonStyleTag'},
                        },
                        'css-loader',
                        'postcss-loader'
                    ],
                },
                {
                    test: /(?<!global)\.scss$/i,
                    use: [
                        'cache-loader',
                        'thread-loader',
                        {
                            loader: 'style-loader',
                            options: {injectType: 'singletonStyleTag'},
                        },
                        {
                            loader: 'css-loader', options: {
                                modules: {
                                    localIdentName: isDevBuild ? '[path][name]__[local]--[hash:base64:5]' : '[contenthash:16]',
                                },
                                importLoaders: 1
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                // Prefer `dart-sass`
                                implementation: require('sass'),
                                additionalData: `@import ${globalSassData};`,
                            },
                        },
                    ],
                },
                {
                    test: /global.scss$/i,
                    use: [
                        {
                            loader: isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
                            options: isDevBuild ? {injectType: 'singletonStyleTag'} : {filename: '[hash].css'},
                        },
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                // Prefer `dart-sass`
                                implementation: require('sass'),
                                additionalData: `@import ${globalSassData};`,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif|webp)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'images/[name]-[hash].[ext]', //if it fallbacks by default to file-loader - image webpack loader reuses that name then
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                debug: false,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // No IE support - remove in IE bundle
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ['file-loader'],
                },
            ],

        },
    };
};
