// Gruntfile.js
module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: ['.tmp', 'compiled'],

    useminPrepare: {
      options: {
        dest: 'compiled',
        flow: {
          html: {
            steps: {
              css: ['concat']
            },
            post: {}
          }
        }
      },
      html: 'source/index.html',
    },

    copy: {
      html: {
        files: [{
          src: 'source/index.html',
          dest: 'compiled/index.html'
          }]
      }
    },

    usemin: {
      html: 'compiled/index.html',
    },

    uncss: {
      dest: {
        src: ['compiled/index.html'],
        dest: 'compiled/styles/main.css',
        options: {
          report: 'min' // optional: include to report savings
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
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          'source/{,*/}*.html',
          'source/styles{,*/}*.css',
          'source/images/{,*/}*'
        ]
      },
    }

  });

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'concat',
    'copy',
    'usemin',
    <% if (uncss) { %>'uncss',<% } else { %>//'uncss',<% } %>
    'premailer'
  ]);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('serve', ['connect', 'watch']);
}
