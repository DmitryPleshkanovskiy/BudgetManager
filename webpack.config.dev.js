import path from 'path';
import webpack from 'webpack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

export default {
    devtools: 'eval-sourse-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client-mvp/index.js')
    ],
    output: {
        path: '/',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin(
             {
                // browse to http://localhost:3000/ during development 
                host: 'localhost',
                port: 3000,
                // proxy the Webpack Dev Server endpoint 
                // (which should be serving on http://localhost:3100/) 
                // through BrowserSync 
                proxy: 'http://localhost:5000/'
            },
            // plugin options 
            {
                // prevent BrowserSync from reloading the page 
                // and let Webpack Dev Server take care of this 
                reload: false
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, '/client-mvp'),
                loaders: [ 'babel' ]
            }, 
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, 
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }, 
            { 
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|jpg)(\?\S*)?$/,
                loader: 'url'
            }
        ]
    },
    resolve: {
        extentions: ['', '.js']
    }
}