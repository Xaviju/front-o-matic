'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    src: '{,*/}*.coffee',
                    dest: 'dist/scripts/',
                    ext: '.js'
                }]
            },
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['dist/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/scripts/main.js'
            }
        },
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
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app/',
                    dest: 'dist/',
                    src: [
                        '*.{ico,txt,html}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}'
                    ]
                }]
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/main.min.js': ['<%= concat.dist.dest %>']
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
            coffee: {
                files: ['app/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
        }
        //watch: {
            //coffee: {
                //files: ['app/scripts/{,*/}*.coffee'],
                //tasks: ['coffee:dist']
            //},
            //recess: {
                //files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                //tasks: ['recess:dist']
            //},
            //livereload: {
                //options: {
                    //livereload: LIVERELOAD_PORT
                //},
                //files: [
                    //'dist/*.html',
                    //'{css,dist/styles/{,*/}*.css, dist/styles/{,*/}*.css',
                    //'{js,dist/scripts/{,*/}*.js',
                    //'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                //]
            //}
        //},
    });

    grunt.registerTask('default', [
        'jshint',
        'clean:dist',
        'copy:dist',
        'coffee:dist',
        'connect:server',
        'minify'
    ]);
    
    grunt.registerTask('minify', [
        'concat:dist',
        'uglify:dist',
        'watch',
    ]);

};
