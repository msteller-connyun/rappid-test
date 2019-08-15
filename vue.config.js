const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, './htdocs'),
    publicPath: '/',
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('provide').use(require('webpack').ProvidePlugin, [
            {
              $: 'jquery',
              jQuery: 'jquery',
              joint: 'rappid/dist/joint.min',
            },
        ]);
    },
    configureWebpack: {
        devtool: 'source-map',
        devServer: {
            port: 9000,
            host: 'localhost',
            headers:
                {
                    'Content-Security-Policy':
                        'default-src \'self\'; connect-src ws://*.localhost ws://localhost:*  http://localhost:*; script-src \'self\' \'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI=\'; img-src \'self\' data:; style-src \'self\' \'unsafe-inline\' blob:; font-src \'self\'  data:; frame-src \'self\' ; object-src \'none\';',
                },
        },
    },
};
