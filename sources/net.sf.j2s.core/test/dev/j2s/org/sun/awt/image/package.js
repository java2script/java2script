var path = ClazzLoader.getClasspathFor ("sun.awt.image.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "ImageFetcher.js", [
"sun.awt.image.FetcherInfo",
"$.ImageFetcher"]);
