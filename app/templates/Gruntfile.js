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
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        prettify: {
            options: {
                'indent': 4
            },
            // Prettify a directory of files
            all: {
                expand: true,
                cwd: 'app',
                ext: '.html',
                src: ['*.html'],
                dest: 'dist/'
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
                src: ['dist/*.html'],
                dest: 'dist/'
            }
        },
        htmlhint: {
            options: {
                'tag-pair': true,
                'attr-value-not-empty': true,
                'head-script-disabled': true,
                'img-alt-require': true
            },
            src: ['app/*.html']
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
                tasks: ['htmlhint', 'prettify'],
                options: {
                    livereload: true,
                }
            },
            less: {
                files: '**/*.less',
                tasks: ['less'],
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
        'imagemin:dynamic',
        'htmlhint',
        'prettify',
        'less',
        'connect:server',
        'minify'
    ]);

    grunt.registerTask('minify', [
        'coffee:compile',
        'uglify:dist',
        'watch',
    ]);

    grunt.registerTask('development', [
        'htmlmin',
        'coffee:compile',
        'uglify:dist',
        'watch',
    ]);

};
