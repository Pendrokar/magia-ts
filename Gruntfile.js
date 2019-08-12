const sass = require('sass');
var grunt = require("grunt");

require('load-grunt-tasks')(grunt);

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
        options: {
            implementation: sass,
            sourceMap: false,
            outputStyle: 'compressed'
        },
        dist: {
            files: {
                'css/main.css': 'sass/main.scss'
            }
        }
    }

    // uglify: {
    //   my_target: {
    //     files: {
    //       'js/main.min.js': ['js/scroll.js', 'js/video-players.js']
    //     }
    //   }
    // }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.registerTask('minifyjs', ['uglify']);
  grunt.registerTask('default', ['sass']);
};
