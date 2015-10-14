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
        js: [
            path.join(clientApp, 'js/**/*.js'),
            path.join(clientApp, 'components/**/*.js')
        ],
        css: [
            path.join(clientApp, 'css/**/*.css'),
        ],
        dist: {
            dev:         path.join(root, 'dist.dev'),
            css:         path.join(root, 'dist.dev/css'),
            img:         path.join(root, 'dist.dev/img'),
            scripts:     path.join(root, 'dist.dev/scripts')
        },
        prod: {
            prod:        path.join(root, 'dist.prod'),
            css:         path.join(root, 'dist.prod/css'),
            img:         path.join(root, 'dist.prod/img'),
            scripts:     path.join(root, 'dist.prod/scripts')
        },
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        bowerPath:{
            bowerDirectory:    path.join(clientApp, 'bower_components'),
            bowerrc:           path.join(root, '.bowerrc'),
            bowerJson:         path.join(root, 'bower.json')

        }
    };
    return config;
};
