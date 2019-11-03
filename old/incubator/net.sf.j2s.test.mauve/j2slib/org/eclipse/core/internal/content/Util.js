Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (null, "org.eclipse.core.internal.content.Util", ["java.lang.StringBuffer", "java.util.ArrayList", "$.StringTokenizer"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.content, "Util");
c$.parseItems = Clazz.defineMethod (c$, "parseItems", 
function (string) {
return org.eclipse.core.internal.content.Util.parseItems (string, ",");
}, "~S");
c$.parseItems = Clazz.defineMethod (c$, "parseItems", 
function (string, separator) {
if (string == null) return  new Array (0);
var tokenizer =  new java.util.StringTokenizer (string, separator, true);
if (!tokenizer.hasMoreTokens ()) return [string.trim ()];
var first = tokenizer.nextToken ().trim ();
var wasSeparator = false;
if (first.equals (separator)) {
first = "";
wasSeparator = true;
}if (!tokenizer.hasMoreTokens ()) return wasSeparator ? [first, first] : [first];
var items =  new java.util.ArrayList ();
items.add (first);
var current;
do {
current = tokenizer.nextToken ().trim ();
var isSeparator = current.equals (separator);
if (isSeparator) {
if (wasSeparator) items.add ("");
} else items.add (current);
wasSeparator = isSeparator;
} while (tokenizer.hasMoreTokens ());
if (wasSeparator) items.add ("");
return items.toArray ( new Array (items.size ()));
}, "~S,~S");
c$.parseItemsIntoList = Clazz.defineMethod (c$, "parseItemsIntoList", 
function (string) {
return org.eclipse.core.internal.content.Util.parseItemsIntoList (string, ",");
}, "~S");
c$.parseItemsIntoList = Clazz.defineMethod (c$, "parseItemsIntoList", 
function (string, separator) {
var items =  new java.util.ArrayList (5);
if (string == null) return items;
var tokenizer =  new java.util.StringTokenizer (string, separator, true);
if (!tokenizer.hasMoreTokens ()) {
items.add (string.trim ());
return items;
}var first = tokenizer.nextToken ().trim ();
var wasSeparator = false;
if (first.equals (separator)) {
first = "";
wasSeparator = true;
}items.add (first);
if (!tokenizer.hasMoreTokens ()) return items;
var current;
do {
current = tokenizer.nextToken ().trim ();
var isSeparator = current.equals (separator);
if (isSeparator) {
if (wasSeparator) items.add ("");
} else items.add (current);
wasSeparator = isSeparator;
} while (tokenizer.hasMoreTokens ());
if (wasSeparator) items.add ("");
return items;
}, "~S,~S");
c$.toListString = Clazz.defineMethod (c$, "toListString", 
function (list) {
return org.eclipse.core.internal.content.Util.toListString (list, ",");
}, "~A");
c$.toListString = Clazz.defineMethod (c$, "toListString", 
function (list, separator) {
if (list == null || list.length == 0) return null;
var result =  new StringBuffer ();
for (var i = 0; i < list.length; i++) {
result.append (list[i]);
result.append (separator);
}
return result.substring (0, result.length () - 1);
}, "~A,~S");
});
