module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    shell: {
      patternlab: {
        command: "php core/builder.php -gp"
      }
    },
    sass: {
      build: {
        files: {
          "public/css/style-unprefixed.css": "source/css/style.scss"
        }
      }
    },
    watch: {
      html: {
        files: [
          'source/_patterns/**/*.mustache',
          'source/_patterns/**/*.json',
          'source/_data/*.json',
        ],
        tasks: [ 'shell:patternlab' ],
        options: {
          spawn: false,
          livereload: true
        }
      },
      styles: {
        files: [ 
          'source/css/style.scss',
          'source/css/**/*.scss'
        ],
        tasks: [ 'sass', 'autoprefixer' ],
        options: {
          spawn: true,
          livereload: true
        }
      },
      svg: {
        files: [
          'source/images/svg/icons/*.svg'
        ],
        tasks: [
          'svgstore:default', 'shell:patternlab'
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public'
        }
      }
    },
    autoprefixer: {
      global: {
        src: 'public/css/style-unprefixed.css',
        dest: 'public/css/style.css'
      }
    },
    svgstore: {
      options: {
        prefix: 'shape-',
        svg: {
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      default: {
        files: {
          'source/images/svg-defs.svg': ['source/images/svg/icons/*.svg']
        }
      }
    }

  });
 
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgstore');
 
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['shell:patternlab', 'sass']);
 
};