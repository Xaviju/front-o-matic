'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*',
                        'dist/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app/',
                    dest: 'dist/',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}'
                    ]
                },
                {
                    expand: true,
                    cwd: 'bower_components/',
                    src: '{,*/}*.js',
                    dest: 'dist/scripts/libs',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        },
        htmlmin: {
            options: {
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true
            },

            files: {
                expand: true,
                flatten: true,
                src: ['app/*.html'],
                dest: 'dist/'
            }
        },
        less: {
            development: {
                options: {
                    paths: ['app/styles'],
                    //yuicompress: true, // Enable only when in production
                    imports: {
                        less: ['bower_components/lesshat/lesshat.less']
                    }
                },
                files: {
                    'dist/styles/style.css': 'app/styles/*.less'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/scripts/{,*/}*.js',
                'app/scripts/libs/*'
            ]
        },
        coffeelint: {
            app: ['app/scripts/*.coffee', 'app/scripts/libs/*.coffee'],
            options: {
                indentation: { level: 'error', value: 4 }
            },
        },
        coffee: {
            compile: {
                files: {
                    'dist/scripts/script.js': ['app/scripts/*.coffee', 'app/scripts/libs/*.coffee'] // compile and concat into single file
                }
            },
        },
        uglify: {
            dist: {
                files: {
                    'dist/scripts/app.min.js': ['dist/scripts/script.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'dist'
                }
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:all']
            },
            html: {
                files: 'app/*.html',
                tasks: ['htmlmin']
            },
            less: {
                files: '**/*.less',
                tasks: ['assemble-less'],
                options: {
                    livereload: true,
                }
            },
            coffee: {
                files: ['app/scripts/{,*/}*.coffee'],
                tasks: [
                    'coffeelint',
                    'coffee:compile',
                    'uglify:dist'
                ]
            },
        }
    });

    grunt.loadNpmTasks('assemble-less');

    grunt.registerTask('default', [
        'jshint',
        'coffeelint',
        'clean:dist',
        'copy:dist',
        'htmlmin',
        'less',
        'connect:server',
        'minify'
    ]);

    grunt.registerTask('minify', [
        'coffee:compile',
        'uglify:dist',
        'watch',
    ]);

};
