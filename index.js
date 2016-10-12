var through2 = require('through2');
var Vinyl = require('vinyl');
var digo = require('digo');

module.exports = {
	load: true,
	end: function (files, options, result, done) {
		var src = through2.obj();
		var dest = src.pipe(options);
		dest.on("data", function (vinyl) {
			var file = new digo.File(vinyl.path, vinyl.base);
			file.buffer = vinyl.contents;
			file.sourceMapData = vinyl.sourceMap;
			result.add(file);
		});
		dest.once("error", function (e) {
			digo.error({
				plugin: e.plugin,
				message: e.message,
				error: e,
				fileName: e.fileName,
				showStack: e.showStack,
				line: e.lineNumber - 1
			});
			done();
		});
		dest.on("end", function () {
			done();
		});
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			src.write(new Vinyl({
				base: file.base,
				path: file.path,
				contents: file.buffer,
				sourceMap: file.sourceMapData
			}));
		}
		src.end();
	}
};
