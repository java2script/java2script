Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.internal.runtime.InternalPlatform"], "org.eclipse.core.internal.runtime.FindSupport", ["java.io.IOException", "java.util.ArrayList", "org.eclipse.core.runtime.Path"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "FindSupport");
c$.buildNLVariants = Clazz.defineMethod (c$, "buildNLVariants", 
($fz = function (nl) {
var result =  new java.util.ArrayList ();
var base =  new org.eclipse.core.runtime.Path ("nl");
var path =  new org.eclipse.core.runtime.Path (nl.$replace ('_', '/'));
while (path.segmentCount () > 0) {
result.add (base.append (path).toString ());
if (path.segmentCount () > 1) result.add (base.append (path.toString ().$replace ('/', '_')).toString ());
path = path.removeLastSegments (1);
}
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "~S");
c$.find = Clazz.defineMethod (c$, "find", 
function (bundle, path) {
return org.eclipse.core.internal.runtime.FindSupport.find (bundle, path, null);
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath");
c$.find = Clazz.defineMethod (c$, "find", 
function (b, path, override) {
if (path == null) return null;
var result = null;
if (path.isEmpty () || path.isRoot ()) {
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, org.eclipse.core.runtime.Path.EMPTY);
if (result == null) result = org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, org.eclipse.core.runtime.Path.EMPTY);
return result;
}var first = path.segment (0);
if ((first.charAt (0)).charCodeAt (0) != ('$').charCodeAt (0)) {
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, path);
if (result == null) result = org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, path);
return result;
}var rest = path.removeFirstSegments (1);
if (first.equalsIgnoreCase ("$nl$")) return org.eclipse.core.internal.runtime.FindSupport.findNL (b, rest, override);
if (first.equalsIgnoreCase ("$os$")) return org.eclipse.core.internal.runtime.FindSupport.findOS (b, rest, override);
if (first.equalsIgnoreCase ("$ws$")) return org.eclipse.core.internal.runtime.FindSupport.findWS (b, rest, override);
if (first.equalsIgnoreCase ("$files$")) return null;
return null;
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,java.util.Map");
c$.findOS = Clazz.defineMethod (c$, "findOS", 
($fz = function (b, path, override) {
var os = null;
if (override != null) try {
os = override.get ("$os$");
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
} else {
throw e;
}
}
if (os == null) os = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOS ();
if (os.length == 0) return null;
var osArch = null;
if (override != null) try {
osArch = override.get ("$arch$");
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
} else {
throw e;
}
}
if (osArch == null) osArch = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOSArch ();
if (osArch.length == 0) return null;
var result = null;
var base =  new org.eclipse.core.runtime.Path ("os").append (os).append (osArch);
while (base.segmentCount () != 1) {
var filePath = base.append (path);
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, filePath);
if (result != null) return result;
result = org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, filePath);
if (result != null) return result;
base = base.removeLastSegments (1);
}
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, path);
if (result != null) return result;
return org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, path);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,java.util.Map");
c$.findWS = Clazz.defineMethod (c$, "findWS", 
($fz = function (b, path, override) {
var ws = null;
if (override != null) try {
ws = override.get ("$ws$");
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
} else {
throw e;
}
}
if (ws == null) ws = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getWS ();
var filePath =  new org.eclipse.core.runtime.Path ("ws").append (ws).append (path);
var result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, filePath);
if (result != null) return result;
result = org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, filePath);
if (result != null) return result;
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, path);
if (result != null) return result;
return org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, path);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,java.util.Map");
c$.findNL = Clazz.defineMethod (c$, "findNL", 
($fz = function (b, path, override) {
var nl = null;
var nlVariants = null;
if (override != null) try {
nl = override.get ("$nl$");
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
} else {
throw e;
}
}
nlVariants = nl == null ? org.eclipse.core.internal.runtime.FindSupport.NL_JAR_VARIANTS : org.eclipse.core.internal.runtime.FindSupport.buildNLVariants (nl);
if (nl != null && nl.length == 0) return null;
var result = null;
for (var i = 0; i < nlVariants.length; i++) {
var filePath =  new org.eclipse.core.runtime.Path (nlVariants[i]).append (path);
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, filePath);
if (result != null) return result;
result = org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, filePath);
if (result != null) return result;
}
result = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (b, path);
if (result != null) return result;
return org.eclipse.core.internal.runtime.FindSupport.findInFragments (b, path);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,java.util.Map");
c$.findInPlugin = Clazz.defineMethod (c$, "findInPlugin", 
($fz = function (b, filePath) {
return b.getEntry (filePath.toString ());
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath");
c$.findInFragments = Clazz.defineMethod (c$, "findInFragments", 
($fz = function (b, filePath) {
var fragments = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFragments (b);
if (fragments == null) return null;
var fileURL = null;
var i = 0;
while (i < fragments.length && fileURL == null) {
fileURL = fragments[i].getEntry (filePath.toString ());
i++;
}
return fileURL;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath");
c$.openStream = Clazz.defineMethod (c$, "openStream", 
function (bundle, file, localized) {
var url = null;
if (!localized) {
url = org.eclipse.core.internal.runtime.FindSupport.findInPlugin (bundle, file);
if (url == null) url = org.eclipse.core.internal.runtime.FindSupport.findInFragments (bundle, file);
} else {
url = org.eclipse.core.internal.runtime.FindSupport.find (bundle, file);
}if (url != null) return url.openStream ();
throw  new java.io.IOException ("Cannot find " + file.toString ());
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,~B");
c$.NL_JAR_VARIANTS = c$.prototype.NL_JAR_VARIANTS = org.eclipse.core.internal.runtime.FindSupport.buildNLVariants (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getNL ());
});
