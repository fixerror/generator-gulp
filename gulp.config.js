/**
 * Created by FixError on 14.10.2015.
 */

module.exports = function () {
    /*========PATH SEGMENT============================================*/
    var path = require('path');
    var root = './';
    var client = path.join(root, 'client');
    var clientApp = path.join(client, 'app');

    var config = {
        client: client,
        clientApp: clientApp,
        clientIndex: path.join(clientApp, 'index.html'),
        js: {
            scripts: path.join(clientApp, '**/*.js')
        },
        partialas:[path.join(clientApp, '**/*.html'), "!"+(path.join(clientApp, 'index.html'))],
        css: {
            styleCSS: path.join(clientApp, '**/*.css'),
            styleSCSS: path.join(clientApp, '**/*.scss')
        },
        img: {
            imgPath: path.join(clientApp, '/img/**/*')
        },
        dist: {
            dev: path.join(root, 'dist.dev'),
            css: path.join(root, 'dist.dev/css'),
            img: path.join(root, 'dist.dev/img'),
            scripts: path.join(root, 'dist.dev/js'),
            partialas: path.join(root, 'dist.dev/components')
        },
        prod: {
            prod: path.join(root, 'dist.prod'),
            css: path.join(root, 'dist.prod/css'),
            img: path.join(root, 'dist.prod/img'),
            scripts: path.join(root, 'dist.prod/js'),
            partialas: path.join(root, 'dist.prod/components')
        },
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        bowerPath: {
            bowerDirectory: path.join(clientApp, 'bower_components'),
            bowerrc: path.join(root, '.bowerrc'),
            bowerJson: path.join(root, 'bower.json')
        }
    };
    return config;
};
