const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
};
