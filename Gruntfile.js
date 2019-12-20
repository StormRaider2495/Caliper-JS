module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'dist/caliperSensor-1.1.3.js': ['src/**/*.js']
        },
        options: {

        }
      }
    },
    uglify : {
			options : {
        mangle: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build : {
				src : ['dist/caliperSensor-1.1.3.js'],
				dest : 'dist/caliperSensor-1.1.3.min.js'
			}
		},
    tape: {
      options: {
        pretty: true,
        output: 'console'
      },
      files: ['test/**/*.js']
    },
    jsdoc: {
      dist: {
        src: ['src/**/*.js', 'README-external.md'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  // Load the plugin and tasks that provides unit testing via tap/tape
  grunt.loadNpmTasks('grunt-tape');
  // Load grunt uglify plugin
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('test', ['tape']);
  grunt.registerTask('ci', ['tape:ci']);

  // Load the plugin that provides the "browserify" task.
  grunt.loadNpmTasks('grunt-browserify');

  // Load jsDoc3 plugin
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['test', 'browserify','uglify', 'jsdoc']);
  grunt.registerTask('server', ['http-server']);
};
