'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        coffeelint: {
            app: ['app/scripts/*.coffee', 'app/scripts/libs/*.coffee']
        },
        coffee: {
            compile: {
                files: {
                    'dist/scripts/script.js': ['app/scripts/*.coffee', 'app/scripts/libs/*.coffee'] // compile and concat into single file
                }
            },
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
            coffee: {
                files: ['app/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'coffeelint',
        'clean:dist',
        'copy:dist',
        'connect:server',
        'minify'
    ]);
    
    grunt.registerTask('minify', [
        'coffee:compile',
        'uglify:dist',
        'watch',
    ]);

};
