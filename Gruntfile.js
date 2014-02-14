module.exports = function(grunt) {

	"use strict";

	var pkg = grunt.file.readJSON("package.json"),
		key;

	grunt.initConfig({
		pkg: pkg,
		banner: "/*! <%= pkg.name %> v<%= pkg.version %> | (c) 2014 <%= pkg.author %> */",
		clean: ["dist", "build/<%= pkg.version %>"],
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			files: [
				"Gruntfile.js",
				"<%= pkg.name %>.js"
			]
		},
		uglify: {
			options: {
				banner: "<%= banner %>\n"
			},
			build: {
				src: "<%= pkg.name %>.js",
				dest: "<%= pkg.name %>.min.js"
			}
		},
		csslint: {
			options: {
				csslintrc: ".csslintrc"
			},
			files: ["<%= pkg.name %>.css"]
		},
		cssmin: {
			options: {
				banner: "<%= banner %>"
			},
			main: {
				src: "<%= pkg.name %>.css",
				dest: "<%= pkg.name %>.min.css"
			}
		},
		copy: {
			main: {
				src: "<%= pkg.name %>*",
				dest: "build/<%= pkg.version %>/"
			}
		},
		watch: {
			files: [
				"*.js",
				"*.css"
			],
			tasks: "default"
		}
	});

	// Loading dependencies
	for (key in pkg.devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) {
			grunt.loadNpmTasks(key);
		}
	}

	grunt.registerTask("default", ["clean", "jshint", "uglify", "csslint", "cssmin", "copy"]);
};