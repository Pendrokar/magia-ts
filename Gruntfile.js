module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // uglify: {
    //   my_target: {
    //     files: {
    //       'js/main.min.js': ['js/scroll.js', 'js/video-players.js']
    //     }
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['compass',]); // 'uglify'

  grunt.registerTask('minifycss', ['compass']);
  // grunt.registerTask('minifyjs', ['uglify']);
};
