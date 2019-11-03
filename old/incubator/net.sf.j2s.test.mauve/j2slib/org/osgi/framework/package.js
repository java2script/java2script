var path = ClazzLoader.getClasspathFor ("org.osgi.framework.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "ServicePermission.js", [
"org.osgi.framework.ServicePermission",
"$.ServicePermissionCollection"]);
ClazzLoader.jarClasspath (path + "PackagePermission.js", [
"org.osgi.framework.PackagePermission",
"$.PackagePermissionCollection"]);
ClazzLoader.jarClasspath (path + "BundlePermission.js", [
"org.osgi.framework.BundlePermissionCollection",
"$.BundlePermission"]);
ClazzLoader.jarClasspath (path + "AdminPermission.js", [
"org.osgi.framework.AdminPermissionCollection",
"$.AdminPermission"]);
