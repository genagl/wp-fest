const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var Webpack = require('webpack');
var NpmInstallPlugin = require("webpack-plugin-install-deps");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: {
        app: './src/index.js'
        // 'webpack-hot-middleware/client',

    },

    module: {
        rules: [
            {
				test: /\.scss$/,
				use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-0"]
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            // 'react-native': 'react-web',
            // 'WebView': 'react-native-web-webview',
        }
    },



   plugins: [
		//new Webpack.HotModuleReplacementPlugin(),
		//new Webpack.NoEmitOnErrorsPlugin(),
		new NpmInstallPlugin(),
		new Dotenv(),
		// new CleanWebpackPlugin(['dist']),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Production'
		}),
		new CopyWebpackPlugin([
			{ from: 'assets', to: 'assets' }
		]),
	],
   output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
       publicPath: '/dist'
       // publicPath: 'public'
       }


 };

//https://maxfarseer.gitbooks.io/redux-course-ru/content/es2015,_react_hmr.html