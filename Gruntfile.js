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
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('heroku', ['uglify']);

};