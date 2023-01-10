module.exports = {
	src: {
			pug: ["src/**/*.pug", "!" + "src/pug/**/_*.pug"],
			sass: "src/sass/**/*.scss",
			js: "src/js/**/*.js",
			i18n: "src/i18n/*.json",
			vendor: "src/vendor/**",
			img: "src/assets/images/**",
			assets: "src/assets/**",
			icon: "src/*.ico",
			data: "src/data/*.json",
	},
	dist: {
			pug: "dist",
			html: "dist/*.html",
			css: "dist/css",
			js: "dist/js",
			i18n: "dist/i18n",
			vendor: "dist/vendor",
			img: "dist/assets/images",
			assets: "dist/assets",
			data: "src/data",
	},
};
