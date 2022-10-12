// grunt build
// grunt karma:unit:start watch
// grunt karma:once


module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/raviCart.js', 'src/raviCart.directives.js', 'src/raviCart.fulfilment.js'],
                dest: "dist/raviCart.js"//all above files are put in this destionation folder
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> */\n <%= pkg.url %>'
            },
            dist: {
                src: 'dist/raviCart.js',
                dest: "dist/raviCart.min.js"//make min file everytime
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            },
            once: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            travis: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS2']
            }
        },

        watch: {
            karma: {
                files: ['src/**/*.js'],
                tasks: ['karma:unit:run']
            }
        }

    });


    // standard plugin tasks loaded.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');//to run karma


    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('devmode', ['karma:unit', 'watch']);
    grunt.registerTask('testunit', ['karma:unit']);
    grunt.registerTask('test', ['karma:travis']);


    grunt.registerTask('default', ['test', 'build']);


};
