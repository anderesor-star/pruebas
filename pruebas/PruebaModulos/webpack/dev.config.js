const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

const env = require('../env');
const proxyRules = require('../proxy/rules');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = webpackMerge(webpackCommon, {

  devtool: 'inline-source-map',
  mode: 'development',
  output: {
  
    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    rules: [
      // 1. Regla para CSS y Sass (Actualizada para Webpack 5)
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // Nota: 'outputStyle' y 'sourceMapContents' se eliminaron en las versiones 
              // modernas de sass-loader. Con dejar 'sourceMap' ya funciona perfecto.
            }
          }
        ]
      },

      // 2. Regla para Javascript (Babel) - Seguramente la tienes así
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // 3. ¡LA REGLA QUE DIBA EL ERROR ARREGLADA! (Imágenes y Assets)
      // Reemplaza tus viejas reglas de 'url-loader' o 'file-loader' por esta:
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset', // El sistema nativo de Webpack 5
        parser: {
          dataUrlCondition: {
            maxSize: 10000 // Esto sustituye limpiamente al viejo 'limit=10000'
          }
        }
      }
    ]

  },

  plugins: [
    /*new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),*/
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new HotModuleReplacementPlugin()
  ],

  devServer: {
    host: env.devServer.host || 'localhost',
    port: env.devServer.port || 3000,
    allowedHosts: 'all',
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    // 1. NUEVO HOGAR PARA CONTENTBASE (Ahora se llama 'static')
    static: {
      directory: path.resolve(__dirname, '../static'),
      watch: true, // Reemplaza a watchContentBase
    },
    // 2. NUEVO HOGAR PARA WATCHOPTIONS (Ahora se configura en static o watchFiles)
    watchFiles: {
      paths: ['src/**/*'], // Observa tus archivos de código
      options: {
        ignored: /node_modules/,
      },
    },
    // 3. NUEVO HOGAR PARA OVERLAY (Dentro de client)
    client: {
      webSocketURL: 'ws://localhost:3000/ws',
      overlay: {
        warnings: true,
        errors: true
      },
    },
    // 4. EL PROXY (Mantenemos tu variable proxyRules)
    // Nota: Si te da error de tipo "should be an array", asegúrate de que 
    // la variable proxyRules esté definida arriba como un Array [].
    proxy: []
}
});
