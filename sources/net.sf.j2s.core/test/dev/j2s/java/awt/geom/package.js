var path = ClazzLoader.getClasspathFor ("java.awt.geom.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Area.js", [
"java.awt.geom.AreaIterator",
"$.Area"]);
