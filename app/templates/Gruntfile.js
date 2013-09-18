'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        //Global directory configuration
        // Src > input directory
        // Dest > output directory
        globalConfig: {
            src: 'app',
            dest: 'dist'
        },
        //Cleans output directory
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= globalConfig.dest %>/*',
                        '<%= globalConfig.dest %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        //Copy from input to output static files
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= globalConfig.src %>',
                    dest: '<%= globalConfig.dest %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}'
                    ]
                },
                //Copy from input to output JS plugins
                {
                    expand: true,
                    cwd: 'bower_components/',
                    src: '{,*/}*.js',
                    dest: '<%= globalConfig.dest %>/scripts/libs',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        },
        //Minify images and copy to output
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.src %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= globalConfig.dest %>/images/'
                }]
            }
        },
        //Prettify html files and indents al files to 4 spaces
        prettify: {
            options: {
                'indent': 4
            },
            all: {
                expand: true,
                cwd: '<%= globalConfig.src %>',
                ext: '.html',
                src: ['*.html'],
                dest: '<%= globalConfig.dest %>/'
            }
        },
        //Minify html and reduce unused data
        htmlmin: {
            options: {
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true
            },

            files: {
                expand: true,
                flatten: true,
                src: ['<%= globalConfig.dest %>/*.html'],
                dest: '<%= globalConfig.dest %>/'
            }
        },
        //Hints html
        htmlhint: {
            options: {
                'tag-pair': true,
                'attr-value-not-empty': true,
                'head-script-disabled': true,
                'img-alt-require': true
            },
            src: ['<%= globalConfig.src %>/*.html']
        },
        //Less hints and compile
        less: {
            development: {
                options: {
                    paths: ['<%= globalConfig.app %>/styles'],
                    //yuicompress: true, // Enable only when in production
                    imports: {
                        less: ['bower_components/lesshat/lesshat.less']
                    }
                },
                files: {
                    '<%= globalConfig.dest  %>/styles/style.css': '<%= globalConfig.src %>/styles/*.less'
                }
            }
        },
        //Hints JS files
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= globalConfig.src %>/scripts/{,*/}*.js',
                '<%= globalConfig.src %>/scripts/libs/*'
            ]
        },
        //Hints coffeescript files
        coffeelint: {
            app: ['<%= globalConfig.src %>/scripts/*.coffee', '<%= globalConfig.src %>/scripts/libs/*.coffee'],
            options: {
                indentation: { level: 'error', value: 4 }
            },
        },
        //Compile coffeescript files
        coffee: {
            compile: {
                files: {
                    '<%= globalConfig.dest %>/scripts/script.js': ['<%= globalConfig.src %>/scripts/*.coffee', '<%= globalConfig.src %>/scripts/libs/*.coffee'] // compile and concat into single file
                }
            },
        },
        //Uglifys compiled JS
        uglify: {
            dist: {
                files: {
                    '<%= globalConfig.dest %>/scripts/<%= globalConfig.src %>.min.js': ['<%= globalConfig.dest %>/scripts/script.js']
                }
            }
        },
        //Connects the server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= globalConfig.dest %>'
                }
            }
        },
        //Watch directories for changes
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:all']
            },
            html: {
                files: '<%= globalConfig.src %>/*.html',
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
                files: ['<%= globalConfig.src %>/scripts/{,*/}*.coffee'],
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
