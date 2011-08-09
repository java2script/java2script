Clazz.declarePackage ("org.eclipse.osgi.util");
Clazz.load (null, "org.eclipse.osgi.util.ManifestElement", ["java.lang.StringBuffer", "java.util.ArrayList", "$.Hashtable", "$.StringTokenizer", "$.Vector", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Msg", "$.Tokenizer", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.value = null;
this.valueComponents = null;
this.attributes = null;
this.directives = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.util, "ManifestElement");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "getValueComponents", 
function () {
return this.valueComponents;
});
Clazz.defineMethod (c$, "getAttribute", 
function (key) {
return this.getTableValue (this.attributes, key);
}, "~S");
Clazz.defineMethod (c$, "getAttributes", 
function (key) {
return this.getTableValues (this.attributes, key);
}, "~S");
Clazz.defineMethod (c$, "getKeys", 
function () {
return this.getTableKeys (this.attributes);
});
Clazz.defineMethod (c$, "addAttribute", 
function (key, value) {
this.attributes = this.addTableValue (this.attributes, key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "getDirective", 
function (key) {
return this.getTableValue (this.directives, key);
}, "~S");
Clazz.defineMethod (c$, "getDirectives", 
function (key) {
return this.getTableValues (this.directives, key);
}, "~S");
Clazz.defineMethod (c$, "getDirectiveKeys", 
function () {
return this.getTableKeys (this.directives);
});
Clazz.defineMethod (c$, "addDirective", 
function (key, value) {
this.directives = this.addTableValue (this.directives, key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "getTableValue", 
($fz = function (table, key) {
if (table == null) return null;
var result = table.get (key);
if (result == null) return null;
if (Clazz.instanceOf (result, String)) return result;
var valueList = result;
return valueList.get (valueList.size () - 1);
}, $fz.isPrivate = true, $fz), "java.util.Hashtable,~S");
Clazz.defineMethod (c$, "getTableValues", 
($fz = function (table, key) {
if (table == null) return null;
var result = table.get (key);
if (result == null) return null;
if (Clazz.instanceOf (result, String)) return [result];
var valueList = result;
return valueList.toArray ( new Array (valueList.size ()));
}, $fz.isPrivate = true, $fz), "java.util.Hashtable,~S");
Clazz.defineMethod (c$, "getTableKeys", 
($fz = function (table) {
if (table == null) return null;
return table.keys ();
}, $fz.isPrivate = true, $fz), "java.util.Hashtable");
Clazz.defineMethod (c$, "addTableValue", 
($fz = function (table, key, value) {
if (table == null) {
table =  new java.util.Hashtable (7);
}var curValue = table.get (key);
if (curValue != null) {
var newList;
if (Clazz.instanceOf (curValue, java.util.ArrayList)) {
newList = curValue;
} else {
newList =  new java.util.ArrayList (5);
newList.add (curValue);
}newList.add (value);
table.put (key, newList);
} else {
table.put (key, value);
}return table;
}, $fz.isPrivate = true, $fz), "java.util.Hashtable,~S,~S");
c$.parseHeader = Clazz.defineMethod (c$, "parseHeader", 
function (header, value) {
if (value == null) {
return (null);
}var headerElements =  new java.util.Vector (10, 10);
var tokenizer =  new org.eclipse.osgi.framework.internal.core.Tokenizer (value);
parseloop : while (true) {
var next = tokenizer.getToken (";,");
if (next == null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
}var headerValues =  new java.util.ArrayList ();
var headerValue =  new StringBuffer (next);
headerValues.add (next);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_MANIFEST) {
org.eclipse.osgi.framework.debug.Debug.print ("paserHeader: " + next);
}var c = tokenizer.getChar ();
while ((c).charCodeAt (0) == (';').charCodeAt (0)) {
next = tokenizer.getToken (";,=:");
if (next == null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
}c = tokenizer.getChar ();
if ((c).charCodeAt (0) == (';').charCodeAt (0) || (c).charCodeAt (0) == ('\0').charCodeAt (0)) {
headerValues.add (next);
headerValue.append (";").append (next);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_MANIFEST) {
org.eclipse.osgi.framework.debug.Debug.print (";" + next);
}}}
var manifestElement =  new org.eclipse.osgi.util.ManifestElement ();
manifestElement.value = headerValue.toString ();
manifestElement.valueComponents = headerValues.toArray ( new Array (headerValues.size ()));
var directive = false;
if ((c).charCodeAt (0) == (':').charCodeAt (0)) {
c = tokenizer.getChar ();
if ((c).charCodeAt (0) != ('=').charCodeAt (0)) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
directive = true;
}while ((c).charCodeAt (0) == ('=').charCodeAt (0)) {
var val = tokenizer.getString (";,");
if (val == null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_MANIFEST) {
org.eclipse.osgi.framework.debug.Debug.print (";" + next + "=" + val);
}try {
if (directive) manifestElement.addDirective (next, val);
 else manifestElement.addAttribute (next, val);
directive = false;
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
} else {
throw e;
}
}
c = tokenizer.getChar ();
if ((c).charCodeAt (0) == (';').charCodeAt (0)) {
next = tokenizer.getToken ("=:");
if (next == null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
}c = tokenizer.getChar ();
if ((c).charCodeAt (0) == (':').charCodeAt (0)) {
c = tokenizer.getChar ();
if ((c).charCodeAt (0) != ('=').charCodeAt (0)) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
directive = true;
}}}
headerElements.addElement (manifestElement);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_MANIFEST) {
org.eclipse.osgi.framework.debug.Debug.println ("");
}if ((c).charCodeAt (0) == (',').charCodeAt (0)) {
continue parseloop;}if ((c).charCodeAt (0) == ('\0').charCodeAt (0)) {
break parseloop;
}throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_HEADER_EXCEPTION, header, value));
}
var size = headerElements.size ();
if (size == 0) {
return (null);
}var result =  new Array (size);
headerElements.copyInto (result);
return (result);
}, "~S,~S");
c$.getArrayFromList = Clazz.defineMethod (c$, "getArrayFromList", 
function (stringList) {
if (stringList == null || stringList.trim ().equals ("")) return null;
var list =  new java.util.Vector ();
var tokens =  new java.util.StringTokenizer (stringList, ",");
while (tokens.hasMoreTokens ()) {
var token = tokens.nextToken ().trim ();
if (!token.equals ("")) list.addElement (token);
}
return list.isEmpty () ?  new Array (0) : list.toArray ( new Array (list.size ()));
}, "~S");
});
