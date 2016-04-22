'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        clean: {
            build: ['build']
        },
        open: {
            server: {
                path: 'http://localhost:8080'
            }
        },
        copy: {
            dist: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['css/**'], dest: 'www/'},
                    {expand: true, src: ['assets/**'], dest: 'www/'},
                    {expand: true, src: ['index.html'], dest: 'www/'},
                    {expand: true, flatten: true, src: ['node_modules/phaser/dist/*.js'], dest: 'www/js/'}
                ]
            }
        },
        browserify: {
            build: {
                src: ['game/main.js'],
                dest: 'www/js/game.js'
            }
        },
        watch: {
            source: {
                files: ["./src/**/*.js", "./game/**/*.js"],
                tasks: ['build'],
                options: {
                    livereload: true
                }

            }
        },
        connect: {
          server: {
            options: {
              port: 8080,
              // Change this to '0.0.0.0' to access the server from outside.
              hostname: '0.0.0.0',
              base: 'www'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['clean:build', 'browserify', 'copy']);
    grunt.registerTask('default', ['build', 'connect', 'open', 'watch']);
    //grunt.registerTask('prod', ['build', 'copy']);
};
