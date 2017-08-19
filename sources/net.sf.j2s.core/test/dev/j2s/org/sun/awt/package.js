var path = ClazzLoader.getClasspathFor ("sun.awt.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "AppContext.js", [
"sun.awt.MostRecentKeyValue",
"$.MostRecentThreadAppContext",
"$.AppContext"]);
