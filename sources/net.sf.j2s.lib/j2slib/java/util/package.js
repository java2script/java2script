var path = ClazzLoader.getClasspathFor ("java.util.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "AbstractList.js", [
"java.util.AbstractList",
"$.RandomAccessSubList",
"$.SubList"]);
