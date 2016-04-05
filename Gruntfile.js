module.exports = function (grunt) {
    'use strict';
    var modRewrite = require('connect-modrewrite');
    var serveStatic = require('serve-static');
    var env_name = process.env.prms || 'stubs';
    var config = grunt.file.readJSON('package.json');
    var env = config.environments[env_name];

    if (!env) {
        console.error('Environment "' + env_name + '" is not defined in package.json.');
        process.exit(1);
    }

    console.log('Environment: ' + env_name);

    grunt.initConfig({

        githooks: {
            all: {
                'pre-commit': 'scsslint jscs',
                'post-merge': 'githooks'
            }
        },

        'bower-install-simple': {
            options:{
                command: 'update'
            },
            dev: {
                options: {
                    production: false
                }
            }
        },

        ngconstant: {
            options: {
                name: 'app.env',
                dest: 'dist/js/environment.js',
                constants: {
                    env: env
                }
            },
            build: {
            }
        },

        wiredep: {
            task: {
                src: ['dist/index.html']
            },
            options: {
                fileTypes: {
                    html: {
                        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            css: /<link.*href=['"]([^'"]+)>/gi,
                            js: /<script.*src=['"]([^'"]+)/gi
                        },
                        replace: {
                            css: '<link rel="stylesheet" href="/{{filePath}}">',
                            js: '<script src="/{{filePath}}"></script>'
                        }
                    }
                }
            }
        },

        replace: {
            env: {
                src: ['dist/index.html'],
                dest: 'dist/index.html',
                replacements: [{
                    from: '@@app.menu.navigation',
                    to: env.menus.navigation
                }, {
                    from: '@@app.menu.footer',
                    to: env.menus.footer
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'dist',
                    open: true,
                    keepalive: true,
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            return next();
                        });

                        middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]'])); //Matches everything that does not contain a '.' (period)
                        options.base.forEach(function (base) {
                            middlewares.push(serveStatic(base));
                        });

                        return middlewares;
                    }
                }
            }
        },

        concurrent: {
            watcher: ['watch', 'connect:server:keepalive'],
            options: {
                logConcurrentOutput: true
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'dist/css',
                    imagesPath: './',
                    outputStyle: 'compressed',
                    sourcemap: false,
                    importPath: ['dist/bower_components/bootstrap-sass/assets/stylesheets']
                }
            }
        },


        watch: {
            scripts: {
                files: ['src/js/**/*.js', 'src/stubs/*.json', '!**/*.spec.js', '!**/*.html.js'],
                tasks: ['js'],
                options: {
                    interrupt: true,
                    interval: 500
                }
            },
            html_pages: {
                files: ['src/*.html', 'src/js/**/*.html'],
                tasks: ['html'],
                options: {
                    interrupt: true,
                    interval: 500
                }
            },
            html_templates: {
                files: 'src/js/**/*.html',
                tasks: ['htmlhint', 'html2js:dist', 'copy:html2js'],
                options: {
                    interrupt: true,
                    interval: 500
                }
            },
            scss: {
                files: ['src/**/*.scss', 'dist/bower_components/**/*.scss'],
                tasks: ['css'],
                options: {
                    interrupt: true,
                    interval: 1000
                }
            }
        },

        autoprefixer: {
            main: {
                options: {
                    browsers: ['last 2 versions', 'ie 11', 'ie 10', 'ie 9']
                },
                files: {
                    'dist/css/core.css': 'dist/css/core.css'
                }
            },
        },


        copy: {
            src: {
                cwd: 'src/',
                src: ['**/**', '!**/*.spec.js', '!**/*.html', '!**/*.html.js'],
                dest: 'dist/',
                expand: true
            },
            html2js: {
                cwd: 'src/',
                src: ['**/*.html.js'],
                dest: 'dist/',
                expand: true
            },
            html: {
                cwd: 'src/',
                src: ['*.html', 'stubs/**/*.html'],
                dest: 'dist/',
                expand: true
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'src/js/{*,**/*}.js', 'tests/{*,**/*}.js', '!tests/test-reports/**/*.js']
        },

        jscs: {
            src: ['Gruntfile.js', 'src/js/{*,**/*}.js', 'tests/unit/{*,**/*}.js',  'tests/e2e/{*,**/*}.js', '!src/**/*.html.js'],
            options: {
                config: '.jscsrc',
                esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
                verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
                fix: true, // Autofix code style violations when possible.
                requireCurlyBraces: ['if']
            }
        },

        html2js: {
            dist: {
                options: {
                    module: null,
                    base: 'src',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                files: [{
                    expand: true,
                    src: ['src/js/**/*.html'],
                    ext: '.html.js'
                }]
            }
        },

        includeSource: {
            options: {
                basePath: 'dist',
                baseUrl: '/',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>'
                    }
                }
            },
            dev: {
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        useminPrepare: {
            html: 'dist/index.html',
            options: {
                root: 'dist'
            }
        },

        usemin: {
            html: 'dist/index.html',
            options:{
                root: 'dist'
            }
        },

        concat:{
            addUseStrict: {
                options: {
                    banner: '(function(){"use strict";',
                    footer: '})();'
                },
                files: {
                    'dist/deploy.js': ['dist/deploy.js'],
                }
            }
        },

        filerev: {
            dist: {
                src: [
                  'dist/*.js',
                  'dist/css/*.css'
                ]
            }
        },

        clean: {
            scss: ['.sass-cache'],
            reset: ['dist'],
            preBuild: ['dist/*', '!dist/bower_components'],
            postBuild: ['dist/*', '!dist/deploy.*.js', '!dist/vendor.*.js', '!dist/index.html', '!dist/css', '!dist/stubs']
        },

        htmlhint: {
            all: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'id-unique': true,
                    'style-disabled': true
                },
                src: ['src/**/*.html', '!src/stubs/**/*.html']
            }
        },

        scsslint: {
            allFiles: ['src/scss/{*,**/*}.scss'],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: true,
                reporterOutput: 'scss-lint-report.xml'
            }
        },

        search: {
            inlinestyles: {
                files: {
                    src: ['src/**/*.html']
                },
                options: {
                    searchString: / style\s?=\s?["']*/g,
                    failOnMatch: false,
                    logFile: 'inlinestyles.json',
                    onMatch: function (params) {
                        var msg = 'Inline Styles Detected in: ' + params.file +
                            ' at line: ' +
                            params.line;
                        console.log(msg);
                    },

                    onComplete: function (params) {
                        if (params.numMatches > 0) {
                            grunt.fail.fatal('Inline styles were detected in ' +
                                params.numMatches +
                                ' file(s).');
                        }
                    }
                }
            }
        }

    });

    // Load tasks
    require('jit-grunt')(grunt, {
        replace: 'grunt-text-replace',
        useminPrepare: 'grunt-usemin',
        scsslint: 'grunt-scss-lint',
        ngconstant: 'grunt-ng-constant'
    });

    grunt.registerTask('default', ['githooks', 'clean:preBuild', 'bower-install-simple:dev', 'css', 'ngconstant', 'js', 'html', 'concurrent']);

    grunt.registerTask('css', ['clean:scss', 'compass:dev', 'autoprefixer']);

    grunt.registerTask('js', ['jshint', 'copy:src', 'includeSource']);

    grunt.registerTask('html', ['htmlhint', 'search', 'html2js', 'copy:html2js', 'copy:html', 'wiredep', 'includeSource', 'replace']);

    grunt.registerTask('build', ['clean:preBuild', 'bower-install-simple:dev', 'css', 'ngconstant', 'js', 'html', 'useminPrepare', 'concat:generated', 'uglify:generated', 'concat:addUseStrict', 'karma:build', 'filerev:dist',  'usemin',  'replace',  'clean:postBuild']);
};
