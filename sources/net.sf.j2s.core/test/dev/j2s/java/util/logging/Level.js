Clazz.declarePackage ("java.util.logging");
Clazz.load (["java.util.HashMap"], "java.util.logging.Level", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.ArrayList", "$.ResourceBundle"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.value = 0;
this.resourceBundleName = null;
this.localizedLevelName = null;
Clazz.instantialize (this, arguments);
}, java.util.logging, "Level", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (name, value) {
this.construct (name, value, null);
}, "~S,~N");
Clazz.makeConstructor (c$, 
function (name, value, resourceBundleName) {
if (name == null) {
throw  new NullPointerException ();
}this.name = name;
this.value = value;
this.resourceBundleName = resourceBundleName;
this.localizedLevelName = resourceBundleName == null ? name : null;
java.util.logging.Level.KnownLevel.add (this);
}, "~S,~N,~S");
Clazz.defineMethod (c$, "getResourceBundleName", 
function () {
return this.resourceBundleName;
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getLocalizedName", 
function () {
return this.getLocalizedLevelName ();
});
Clazz.defineMethod (c$, "getLevelName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getLocalizedLevelName", 
function () {
if (this.localizedLevelName != null) {
return this.localizedLevelName;
}try {
var rb = java.util.ResourceBundle.getBundle (this.resourceBundleName);
this.localizedLevelName = rb.getString (this.name);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.localizedLevelName = this.name;
} else {
throw ex;
}
}
return this.localizedLevelName;
});
c$.findLevel = Clazz.defineMethod (c$, "findLevel", 
function (name) {
if (name == null) {
throw  new NullPointerException ();
}var level;
level = java.util.logging.Level.KnownLevel.findByName (name);
if (level != null) {
return level.mirroredLevel;
}try {
var x = Integer.parseInt (name);
level = java.util.logging.Level.KnownLevel.findByValue (x);
if (level == null) {
var levelObject =  new java.util.logging.Level (name, x);
level = java.util.logging.Level.KnownLevel.findByValue (x);
}return level.mirroredLevel;
} catch (ex) {
if (Clazz.exceptionOf (ex, NumberFormatException)) {
} else {
throw ex;
}
}
level = java.util.logging.Level.KnownLevel.findByLocalizedLevelName (name);
if (level != null) {
return level.mirroredLevel;
}return null;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "intValue", 
function () {
return this.value;
});
c$.parse = Clazz.defineMethod (c$, "parse", 
function (name) {
name.length;
var level;
level = java.util.logging.Level.KnownLevel.findByName (name);
if (level != null) {
return level.levelObject;
}try {
var x = Integer.parseInt (name);
level = java.util.logging.Level.KnownLevel.findByValue (x);
if (level == null) {
var levelObject =  new java.util.logging.Level (name, x);
level = java.util.logging.Level.KnownLevel.findByValue (x);
}return level.levelObject;
} catch (ex) {
if (Clazz.exceptionOf (ex, NumberFormatException)) {
} else {
throw ex;
}
}
level = java.util.logging.Level.KnownLevel.findByLocalizedName (name);
if (level != null) {
return level.levelObject;
}throw  new IllegalArgumentException ("Bad level \"" + name + "\"");
}, "~S");
Clazz.overrideMethod (c$, "equals", 
function (ox) {
try {
var lx = ox;
return (lx.value == this.value);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
return false;
} else {
throw ex;
}
}
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.value;
});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.levelObject = null;
this.mirroredLevel = null;
Clazz.instantialize (this, arguments);
}, java.util.logging.Level, "KnownLevel");
Clazz.makeConstructor (c$, 
function (a) {
this.levelObject = a;
if (a.getClass () === java.util.logging.Level) {
this.mirroredLevel = a;
} else {
this.mirroredLevel =  new java.util.logging.Level (a.name, a.value, a.resourceBundleName);
}}, "java.util.logging.Level");
c$.add = Clazz.defineMethod (c$, "add", 
function (a) {
var b =  new java.util.logging.Level.KnownLevel (a);
var c = java.util.logging.Level.KnownLevel.nameToLevels.get (a.name);
if (c == null) {
c =  new java.util.ArrayList ();
java.util.logging.Level.KnownLevel.nameToLevels.put (a.name, c);
}c.add (b);
c = java.util.logging.Level.KnownLevel.intToLevels.get (new Integer (a.value));
if (c == null) {
c =  new java.util.ArrayList ();
java.util.logging.Level.KnownLevel.intToLevels.put (new Integer (a.value), c);
}c.add (b);
}, "java.util.logging.Level");
c$.findByName = Clazz.defineMethod (c$, "findByName", 
function (a) {
var b = java.util.logging.Level.KnownLevel.nameToLevels.get (a);
if (b != null) {
return b.get (0);
}return null;
}, "~S");
c$.findByValue = Clazz.defineMethod (c$, "findByValue", 
function (a) {
var b = java.util.logging.Level.KnownLevel.intToLevels.get (new Integer (a));
if (b != null) {
return b.get (0);
}return null;
}, "~N");
c$.findByLocalizedLevelName = Clazz.defineMethod (c$, "findByLocalizedLevelName", 
function (a) {
for (var levels, $levels = java.util.logging.Level.KnownLevel.nameToLevels.values ().iterator (); $levels.hasNext () && ((levels = $levels.next ()) || true);) {
for (var l, $l = levels.iterator (); $l.hasNext () && ((l = $l.next ()) || true);) {
var b = l.levelObject.getLocalizedLevelName ();
if (a.equals (b)) {
return l;
}}
}
return null;
}, "~S");
c$.findByLocalizedName = Clazz.defineMethod (c$, "findByLocalizedName", 
function (a) {
for (var levels, $levels = java.util.logging.Level.KnownLevel.nameToLevels.values ().iterator (); $levels.hasNext () && ((levels = $levels.next ()) || true);) {
for (var l, $l = levels.iterator (); $l.hasNext () && ((l = $l.next ()) || true);) {
var b = l.levelObject.getLocalizedName ();
if (a.equals (b)) {
return l;
}}
}
return null;
}, "~S");
c$.matches = Clazz.defineMethod (c$, "matches", 
function (a) {
var b = java.util.logging.Level.KnownLevel.nameToLevels.get (a.name);
if (b != null) {
for (var level, $level = b.iterator (); $level.hasNext () && ((level = $level.next ()) || true);) {
var c = level.mirroredLevel;
if (a.value == c.value && (a.resourceBundleName === c.resourceBundleName || (a.resourceBundleName != null && a.resourceBundleName.equals (c.resourceBundleName)))) {
return level;
}}
}return null;
}, "java.util.logging.Level");
c$.nameToLevels = c$.prototype.nameToLevels =  new java.util.HashMap ();
c$.intToLevels = c$.prototype.intToLevels =  new java.util.HashMap ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"defaultBundle", "sun.util.logging.resources.logging");
c$.OFF = c$.prototype.OFF =  new java.util.logging.Level ("OFF", 2147483647, java.util.logging.Level.defaultBundle);
c$.SEVERE = c$.prototype.SEVERE =  new java.util.logging.Level ("SEVERE", 1000, java.util.logging.Level.defaultBundle);
c$.WARNING = c$.prototype.WARNING =  new java.util.logging.Level ("WARNING", 900, java.util.logging.Level.defaultBundle);
c$.INFO = c$.prototype.INFO =  new java.util.logging.Level ("INFO", 800, java.util.logging.Level.defaultBundle);
c$.CONFIG = c$.prototype.CONFIG =  new java.util.logging.Level ("CONFIG", 700, java.util.logging.Level.defaultBundle);
c$.FINE = c$.prototype.FINE =  new java.util.logging.Level ("FINE", 500, java.util.logging.Level.defaultBundle);
c$.FINER = c$.prototype.FINER =  new java.util.logging.Level ("FINER", 400, java.util.logging.Level.defaultBundle);
c$.FINEST = c$.prototype.FINEST =  new java.util.logging.Level ("FINEST", 300, java.util.logging.Level.defaultBundle);
c$.ALL = c$.prototype.ALL =  new java.util.logging.Level ("ALL", -2147483648, java.util.logging.Level.defaultBundle);
});
