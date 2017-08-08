var path = ClazzLoader.getClasspathFor ("java.text.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "AttributedString.js", [
"java.text.AttributeEntry",
"$.AttributedString"]);
