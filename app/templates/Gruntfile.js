// Gruntfile.js
module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uncss: {
      dest: {
        src: ['source/index.html'],
        dest: 'compiled/assets/styles/tidy.css',
        options: {
          report: 'min' // optional: include to report savings
        }
      }
    },

    processhtml: {
      dest: {
        files: {
          'compiled/index.html': ['source/index.html']
        }
      }
    },

    premailer: {
      dest: {
        options: {
          verbose: true
        },
        files: {
          'compiled/email-inlined.html': ['compiled/index.html']
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static('source')
            ];
          }
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'source/{,*/}*.html',
          'source/assets/styles{,*/}*.css',
          'source/assets/images/{,*/}*'
        ]
      },
    }

  });
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['uncss', 'processhtml', 'premailer']);
  grunt.registerTask('serve', ['connect', 'watch']);
}
