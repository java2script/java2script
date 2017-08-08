Clazz.declarePackage ("java.beans");
Clazz.load (null, "java.beans.FeatureDescriptor", ["java.util.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.classRef = null;
this.expert = false;
this.hidden = false;
this.preferred = false;
this.shortDescription = null;
this.name = null;
this.displayName = null;
this.table = null;
Clazz.instantialize (this, arguments);
}, java.beans, "FeatureDescriptor");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getDisplayName", 
function () {
if (this.displayName == null) {
return this.getName ();
}return this.displayName;
});
Clazz.defineMethod (c$, "setDisplayName", 
function (displayName) {
this.displayName = displayName;
}, "~S");
Clazz.defineMethod (c$, "isExpert", 
function () {
return this.expert;
});
Clazz.defineMethod (c$, "setExpert", 
function (expert) {
this.expert = expert;
}, "~B");
Clazz.defineMethod (c$, "isHidden", 
function () {
return this.hidden;
});
Clazz.defineMethod (c$, "setHidden", 
function (hidden) {
this.hidden = hidden;
}, "~B");
Clazz.defineMethod (c$, "isPreferred", 
function () {
return this.preferred;
});
Clazz.defineMethod (c$, "setPreferred", 
function (preferred) {
this.preferred = preferred;
}, "~B");
Clazz.defineMethod (c$, "getShortDescription", 
function () {
if (this.shortDescription == null) {
return this.getDisplayName ();
}return this.shortDescription;
});
Clazz.defineMethod (c$, "setShortDescription", 
function (text) {
this.shortDescription = text;
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (attributeName, value) {
if (this.table == null) {
this.table =  new java.util.Hashtable ();
}this.table.put (attributeName, value);
}, "~S,~O");
Clazz.defineMethod (c$, "getValue", 
function (attributeName) {
if (this.table == null) {
return null;
}return this.table.get (attributeName);
}, "~S");
Clazz.defineMethod (c$, "attributeNames", 
function () {
if (this.table == null) {
this.table =  new java.util.Hashtable ();
}return this.table.keys ();
});
Clazz.makeConstructor (c$, 
function (x, y) {
this.expert =  new Boolean (x.expert | y.expert).valueOf ();
this.hidden =  new Boolean (x.hidden | y.hidden).valueOf ();
this.preferred =  new Boolean (x.preferred | y.preferred).valueOf ();
this.name = y.name;
this.shortDescription = x.shortDescription;
if (y.shortDescription != null) {
this.shortDescription = y.shortDescription;
}this.displayName = x.displayName;
if (y.displayName != null) {
this.displayName = y.displayName;
}this.classRef = x.classRef;
if (y.classRef != null) {
this.classRef = y.classRef;
}this.addTable (x.table);
this.addTable (y.table);
}, "java.beans.FeatureDescriptor,java.beans.FeatureDescriptor");
Clazz.makeConstructor (c$, 
function (old) {
this.expert = old.expert;
this.hidden = old.hidden;
this.preferred = old.preferred;
this.name = old.name;
this.shortDescription = old.shortDescription;
this.displayName = old.displayName;
this.classRef = old.classRef;
this.addTable (old.table);
}, "java.beans.FeatureDescriptor");
Clazz.defineMethod (c$, "addTable", 
 function (t) {
if (t == null) {
return;
}var keys = t.keys ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
var value = t.get (key);
this.setValue (key, value);
}
}, "java.util.Hashtable");
Clazz.defineMethod (c$, "setClass0", 
function (cls) {
this.classRef = cls;
}, "Class");
Clazz.defineMethod (c$, "getClass0", 
function () {
return (this.classRef != null) ? this.classRef : null;
});
c$.getReturnType = Clazz.defineMethod (c$, "getReturnType", 
function (base, method) {
return null;
}, "Class,java.lang.reflect.Method");
c$.getParameterTypes = Clazz.defineMethod (c$, "getParameterTypes", 
function (base, method) {
return  new Array (0);
}, "Class,java.lang.reflect.Method");
});
