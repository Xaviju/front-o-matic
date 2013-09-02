'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
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
                        'images/{,*/}*.{webp,gif}',
                        'scripts/{,*/}*.{js,coffee}',
                        'styles/{,*/}*.{less,css}'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'copy:dist'
    ]);

};
