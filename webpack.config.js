import webpack from 'webpack';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        esModule: true,
                        modules: {
                            auto: /\.module\.\w+$/i
                        }
                    }
                }],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        esModule: true,
                        modules: {
                            auto: /\.module\.\w+$/i
                        }
                    }
                }, 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        host: 'localhost'
    }
}

if (isProduction) {
    config.mode = 'production';
} else {
    config.mode = 'development';
}

export default config;
