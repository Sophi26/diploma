const Path = require("path");

module.exports = {
    entry: {
        main: Path.join(__dirname, 'src', 'index.js'),
    },
    target: 'electron-renderer',
    output: {
        path: Path.join(__dirname, 'public', 'js'),
        filename: 'index.js',
    },
    module: {
        rules: [{
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"],
    },
};