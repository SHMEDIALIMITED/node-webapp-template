module.exports = function (grunt) {

    grunt.initConfig({


        

        id: grunt.option('id'),


        clean: {
            init: ['dist'],
            css: ['dist/public/config.rb', 'dist/public/.sass-cache/', 'dist/public/sass/'],
            js: ['dist/public/js'],
            views: ['dist/public/views'],
            test: ['dist/public/test']
        },

        copy: {
            init: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/'
            },
            js: {
                expand: true,
                cwd: 'src/',
                src: 'public/js/libs/require.2.1.9.min.js',
                dest: 'dist/'
            }

        },

        compass: {
            production: {
                options: {
                    force: true,
                    sassDir: 'dist/public/sass',
                    cssDir: 'dist/public/css',
                    imagesDir : 'dist/public/css/',
                    environment: 'production'
                }
            }
        },

        requirejs: {
            main: {
                options: {
                    name : 'main',
                    baseUrl: 'src/public/js',
                    mainConfigFile: 'src/public/js/main.js',
                    out: 'dist/public/js/main.js'
                }
            }


        }

    });


    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('bump', function (versionType) {
        versionType = grunt.option('type') || 'patch';
        var package = grunt.file.readJSON('build/package.json');
        package.version = bumpVersion(package.version, versionType || 'patch');
        grunt.file.write('build/package.json', JSON.stringify(package, null, '  '));
        grunt.log.ok('Version bumped to ' + package.version);
    })
    function bumpVersion(version, versionType) {
        var type = {
            patch: 2,
            minor: 1,
            major: 0
        };
        var parts = version.split('.');
        var idx = type[versionType || 'patch'];

        parts[idx] = parseInt(parts[idx], 10) + 1;
        while (++idx < parts.length) {
            parts[idx] = 0;
        }
        return parts.join('.');
    }


    grunt.registerTask('render', function() {

        var env = grunt.option('env') || 'qa';
        var exec = require('child_process').exec;
        var done = this.async();
        var p = exec('node src/server_node/server', function() {});
        var agent = require('superagent');
        var async = require('async');

        var pages = require('../src/server_node/models');
        var queue = [];

        for(var i = 0; i < pages.length; ++i) {

            var page = pages[i];

            var f = (function(p) {

                return function(callback) {
                    agent.get('http://localhost:8080/' + p.id + '?env=' + env).end(function(res) {
                        grunt.file.write('dist/public/' + p.id + '.html', res.text);
                        callback(null, p.id);
                    });
                }

            })(page);

            queue.push(f);
        }


        setTimeout(function() {
            async.parallel(queue, function(err, results){
                grunt.log.ok('Successfully flattened HTML files', results);
                p.kill();
                done();
            });
        },1000)
    });



    grunt.registerTask('watch', function() {

        var done = this.async();
        var exec = require('child_process').exec;

        // Run local server
        var p = exec('node src/server_node/server', {}, function() {
            done();
        });
        p.stdout.pipe(process.stdout);
        p.stderr.pipe(process.stderr);

        // Watch SASS/Compass changes
        p = exec('compass watch', {cwd:'src/public/'});
        p.stdout.pipe(process.stdout);
        p.stderr.pipe(process.stderr);
    });

    grunt.registerTask('deploy', function() {

        var async = require('async');
        var exec = require('child_process').exec;
        var done = this.async();


        var env = grunt.option('env') || 'qa';
        var id = grunt.option('id');
        if(env == 'stage') id = 'all'
        if(id && id != 'all') {
            var pages = require('../src/server_node/models');
            for(var i = 0; i < pages.length; ++i) {
                var p = pages[i];
                if(p.id == id) break;
                else p = null;
            }
            if(!p) {
                grunt.log.error('Page ' + id + ' not found');
                done();
            }



            async.parallel([
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/*.html ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/.htaccess ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/css ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/img/*.* ec2-user@54.194.162.232:/var/www/html/' + env + '/img/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/img/' + p.id + ' ec2-user@54.194.162.232:/var/www/html/' + env + '/img/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/js ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/video ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                }
            ],
                function(error, results) {
                    done();
                });

        } else if(id == 'all') {

            async.parallel([
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/** ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/.htaccess ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                }
            ],
                function(error, results) {
                    done();
                });

        } else {

            async.parallel([
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/*.html ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/css ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/js ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/video ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                },
                function(callback) {
                    exec('scp -i tools/AWS/MPC-DEV.pem -r dist/public/.htaccess ec2-user@54.194.162.232:/var/www/html/' + env + '/', function(err) {
                        if (err) return callback(err);
                        callback(null, 'html');
                    }).stdout.pipe(process.stdout);;
                }
            ],
                function(error, results) {
                    done();
                });


        }

    });

    grunt.registerTask('promote', function(destinationEnvironment) {

        if(arguments.length == 0) {
            grunt.fail.warn('Promote task need env argument');
            return;
        }

        grunt.option('env', destinationEnvironment);
        grunt.task.run(['render', 'httpd', 'deploy']);

    });


    grunt.file.setBase('../')



    grunt.registerTask('default', [
        'bump',
        'clean:init',
        'copy:init',
        'compass:production',
        'clean:css',
        'clean:views',
        'requirejs:main',
        'copy:js',
        'render',
        'httpd',
        'deploy']);

};