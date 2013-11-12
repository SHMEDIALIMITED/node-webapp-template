module.exports = function(grunt) {

  // if you put the call to setBase here, then the package.json and
  // loadNpmTasks paths will be wrong!!!

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    number : grunt.option('number'),

    id : grunt.option('id'),


    clean: {
      init: ['dist'],
      css : ['dist/public/config.rb', 'dist/public/.sass-cache/', 'dist/public/sass/'],
      js : ['dist/public/js']
    },

    copy: {
      init: {
        expand: true,
        cwd: 'src/',
        src: '**',
        dest: 'dist/'
      },
      js : {
          expand: true,
          cwd: 'src/',
          src: 'public/js/libs/require.2.1.9.min.js',
          dest: 'dist/'
      }

    },

    compass: {
      production: {
          options: { 
          force: true,            
          sassDir: 'dist/public/sass',
          cssDir: 'dist/public/css',
          environment: 'production'
        }
      }                   
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/public/js',
          mainConfigFile: 'src/public/js/main.js',
          //out: 'dist/public/js/main<%= grunt.config.data.number %>.js'
          out: 'dist/public/js/main.js'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
 

  // now that we've loaded the package.json and the node_modules we set the base path
  // for the actual execution of the tasks
  grunt.file.setBase('../../')




  // Default task(s).
  grunt.registerTask('default', [ 
    'clean:init',
    'copy:init',
    'compass:production',
    'clean:css',
    'clean:js',
    'requirejs:compile',
    'copy:js']);

};