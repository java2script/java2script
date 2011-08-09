var path = ClazzLoader.getClasspathFor ("org.osgi.service.condpermadmin.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Condition.js", [
"org.osgi.service.condpermadmin.Condition",
"$.BooleanCondition"]);
