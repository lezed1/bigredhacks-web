module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: [{
                    cwd: 'public/js/',
                    src: '**/*.js',
                    dest: './build/js',
                    ext: '.js',
                    expand: true
                }]
            }
        },
        mochaTest: {
            all: {
                src: ['tests/**/*.js']
            },
            options: {
                run: true
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task(s).
    grunt.registerTask('heroku', ['uglify']);
    grunt.registerTask('test', ['mochaTest']);

};