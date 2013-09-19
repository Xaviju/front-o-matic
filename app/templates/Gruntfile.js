'use strict';

module.exports = function (grunt) {
    
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    // Src > input directory
    // Dest > output directory
    var yeomanConfig = {
        src: 'app',
        dest: 'dist'
    };

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        yeoman: yeomanConfig,
        //Cleans output directory
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dest %>/*',
                        '<%= yeoman.dest %>/.git*'
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
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dest %>',
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
                    dest: '<%= yeoman.dest %>/scripts/libs',
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
                    cwd: '<%= yeoman.src %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= yeoman.dest %>/images/'
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
                cwd: '<%= yeoman.src %>',
                ext: '.html',
                src: ['*.html'],
                dest: '<%= yeoman.dest %>/'
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
                src: ['<%= yeoman.dest %>/*.html'],
                dest: '<%= yeoman.dest %>/'
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
            src: ['<%= yeoman.src %>/*.html']
        },
        //Less hints and compile
        less: {
            development: {
                options: {
                    paths: ['<%= yeoman.app %>/styles'],
                    //yuicompress: true, // Enable only when in production
                    imports: {
                        less: ['bower_components/lesshat/lesshat.less']
                    }
                },
                files: {
                    '<%= yeoman.dest  %>/styles/style.css': '<%= yeoman.src %>/styles/*.less'
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
                '<%= yeoman.src %>/scripts/{,*/}*.js',
                '<%= yeoman.src %>/scripts/libs/*'
            ]
        },
        //Hints coffeescript files
        coffeelint: {
            app: ['<%= yeoman.src %>/scripts/*.coffee', '<%= yeoman.src %>/scripts/libs/*.coffee'],
            options: {
                indentation: { level: 'error', value: 4 }
            },
        },
        //Compile coffeescript files
        coffee: {
            compile: {
                files: {
                    '<%= yeoman.dest %>/scripts/script.js': ['<%= yeoman.src %>/scripts/*.coffee', '<%= yeoman.src %>/scripts/libs/*.coffee'] // compile and concat into single file
                }
            },
        },
        //Uglifys compiled JS
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dest %>/scripts/<%= yeoman.src %>.min.js': ['<%= yeoman.dest %>/scripts/script.js']
                }
            }
        },
        //Connects the server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= yeoman.dest %>'
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
                files: '<%= yeoman.src %>/*.html',
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
                files: ['<%= yeoman.src %>/scripts/{,*/}*.coffee'],
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
