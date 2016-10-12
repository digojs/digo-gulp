var digo = require("digo");
var less = require("gulp-less");

exports.default = function Gulp() {
	digo.src("fixtures/*.*").pipe("../", less()).dest("_build");
};
