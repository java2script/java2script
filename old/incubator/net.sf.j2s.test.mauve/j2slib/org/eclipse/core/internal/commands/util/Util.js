Clazz.declarePackage ("org.eclipse.core.internal.commands.util");
Clazz.load (["java.util.Collections", "$.TreeMap", "$.TreeSet"], "org.eclipse.core.internal.commands.util.Util", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.HashMap", "$.HashSet"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.commands.util, "Util");
c$.assertInstance = Clazz.defineMethod (c$, "assertInstance", 
function (object, c, allowNull) {
if (object == null && allowNull) return ;
if (object == null || c == null) throw  new NullPointerException ();
 else if (!c.isInstance (object)) throw  new IllegalArgumentException ();
}, "~O,Class,~B");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
return left == false ? (right == true ? -1 : 0) : (right == true ? 0 : 1);
}, "~B,~B");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
if (left == null && right == null) return 0;
 else if (left == null) return -1;
 else if (right == null) return 1;
 else return left.compareTo (right);
}, "Comparable,Comparable");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
return left - right;
}, "~N,~N");
c$.compare = Clazz.defineMethod (c$, "compare", 
function (left, right) {
if (left == null && right == null) return 0;
 else if (left == null) return -1;
 else if (right == null) return 1;
 else return left.toString ().compareTo (right.toString ());
}, "~O,~O");
c$.equals = Clazz.defineMethod (c$, "equals", 
function (left, right) {
return left == right;
}, "~B,~B");
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
c$.safeCopy = Clazz.defineMethod (c$, "safeCopy", 
function (map, keyClass, valueClass, allowNullKeys, allowNullValues) {
if (map == null || keyClass == null || valueClass == null) throw  new NullPointerException ();
var copy = java.util.Collections.unmodifiableMap ( new java.util.HashMap (map));
var iterator = copy.entrySet ().iterator ();
while (iterator.hasNext ()) {
var entry = iterator.next ();
org.eclipse.core.internal.commands.util.Util.assertInstance (entry.getKey (), keyClass, allowNullKeys);
org.eclipse.core.internal.commands.util.Util.assertInstance (entry.getValue (), valueClass, allowNullValues);
}
return map;
}, "java.util.Map,Class,Class,~B,~B");
c$.safeCopy = Clazz.defineMethod (c$, "safeCopy", 
function (set, c) {
return org.eclipse.core.internal.commands.util.Util.safeCopy (set, c, false);
}, "java.util.Set,Class");
c$.safeCopy = Clazz.defineMethod (c$, "safeCopy", 
function (set, c, allowNullElements) {
if (set == null || c == null) throw  new NullPointerException ();
var copy = java.util.Collections.unmodifiableSet ( new java.util.HashSet (set));
var iterator = copy.iterator ();
while (iterator.hasNext ()) org.eclipse.core.internal.commands.util.Util.assertInstance (iterator.next (), c, allowNullElements);

return set;
}, "java.util.Set,Class,~B");
c$.EMPTY_SORTED_MAP = c$.prototype.EMPTY_SORTED_MAP = java.util.Collections.unmodifiableSortedMap ( new java.util.TreeMap ());
c$.EMPTY_SORTED_SET = c$.prototype.EMPTY_SORTED_SET = java.util.Collections.unmodifiableSortedSet ( new java.util.TreeSet ());
Clazz.defineStatics (c$,
"ZERO_LENGTH_STRING", "");
});
