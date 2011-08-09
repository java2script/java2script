Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["java.util.Collections", "$.TreeSet"], "org.eclipse.jface.util.Util", ["java.lang.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = Clazz.declareType (org.eclipse.jface.util, "Util");
c$.assertInstance = Clazz.defineMethod (c$, "assertInstance", 
function (object, c) {
org.eclipse.jface.util.Util.assertInstance (object, c, false);
}, "~O,Class");
c$.assertInstance = Clazz.defineMethod (c$, "assertInstance", 
($fz = function (object, c, allowNull) {
if (object == null && allowNull) return ;
if (object == null || c == null) throw  new NullPointerException ();
 else if (!c.isInstance (object)) throw  new IllegalArgumentException ();
}, $fz.isPrivate = true, $fz), "~O,Class,~B");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
return left == false ? (right == true ? -1 : 0) : 1;
}, "~B,~B");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
return left - right;
}, "~N,~N");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
if (left == null && right == null) return 0;
 else if (left == null) return -1;
 else if (right == null) return 1;
 else return left.compareTo (right);
}, "Comparable,Comparable");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
if (left == null && right == null) return 0;
 else if (left == null) return -1;
 else if (right == null) return 1;
 else {
var l = left.length;
var r = right.length;
if (l != r) return l - r;
for (var i = 0; i < l; i++) {
var compareTo = org.eclipse.jface.util.Util.compare (left[i], right[i]);
if (compareTo != 0) return compareTo;
}
return 0;
}}, "~A,~A");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
if (left == null && right == null) return 0;
 else if (left == null) return -1;
 else if (right == null) return 1;
 else {
var l = left.size ();
var r = right.size ();
if (l != r) return l - r;
for (var i = 0; i < l; i++) {
var compareTo = org.eclipse.jface.util.Util.compare (left.get (i), right.get (i));
if (compareTo != 0) return compareTo;
}
return 0;
}}, "java.util.List,java.util.List");
c$.endsWith = Clazz.defineMethod (c$, "endsWith", 
function (left, right, equals) {
if (left == null || right == null) return false;
var l = left.length;
var r = right.length;
if (r > l || !equals && r == l) return false;
for (var i = 0; i < r; i++) if (!org.eclipse.jface.util.Util.equals (left[l - i - 1], right[r - i - 1])) return false;

return true;
}, "~A,~A,~B");
c$.equals = Clazz.defineMethod (c$, "equals", 
function (left, right) {
return left == null ? right == null : ((right != null) && left.equals (right));
}, "~O,~O");
c$.equals = Clazz.defineMethod (c$, "equals", 
function (leftArray, rightArray) {
if (leftArray == null) {
return (rightArray == null);
} else if (rightArray == null) {
return false;
}if (leftArray.length != rightArray.length) {
return false;
}for (var i = 0; i < leftArray.length; i++) {
var left = leftArray[i];
var right = rightArray[i];
var equal = (left == null) ? (right == null) : (left.equals (right));
if (!equal) {
return false;
}}
return true;
}, "~A,~A");
c$.hashCode = Clazz.defineMethod (c$, "hashCode", 
function (i) {
return i;
}, "~N");
c$.hashCode = Clazz.defineMethod (c$, "hashCode", 
function (object) {
return object != null ? object.hashCode () : 0;
}, "~O");
c$.hashCode = Clazz.defineMethod (c$, "hashCode", 
function (objects) {
if (objects == null) {
return 0;
}var hashCode = 89;
for (var i = 0; i < objects.length; i++) {
var object = objects[i];
if (object != null) {
hashCode = hashCode * 31 + object.hashCode ();
}}
return hashCode;
}, "~A");
c$.startsWith = Clazz.defineMethod (c$, "startsWith", 
function (left, right, equals) {
if (left == null || right == null) return false;
var l = left.length;
var r = right.length;
if (r > l || !equals && r == l) return false;
for (var i = 0; i < r; i++) if (!org.eclipse.jface.util.Util.equals (left[i], right[i])) return false;

return true;
}, "~A,~A,~B");
c$.translateString = Clazz.defineMethod (c$, "translateString", 
function (resourceBundle, key, defaultString) {
if (resourceBundle != null && key != null) try {
var translatedString = resourceBundle.getString (key);
if (translatedString != null) return translatedString;
} catch (eMissingResource) {
if (Clazz.instanceOf (eMissingResource, java.util.MissingResourceException)) {
} else {
throw eMissingResource;
}
}
return defaultString;
}, "java.util.ResourceBundle,~S,~S");
c$.EMPTY_SORTED_SET = c$.prototype.EMPTY_SORTED_SET = java.util.Collections.unmodifiableSortedSet ( new java.util.TreeSet ());
Clazz.defineStatics (c$,
"ZERO_LENGTH_STRING", "");
});
