Clazz.declarePackage ("java.util.logging");
Clazz.load (["java.util.Hashtable", "java.util.logging.Level", "$.LogRecord"], "java.util.logging.Logger", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.levelObject = null;
this.levelValue = 0;
Clazz.instantialize (this, arguments);
}, java.util.logging, "Logger");
Clazz.makeConstructor (c$, 
function (name, resourceBundleName) {
this.construct (name, resourceBundleName, null, false);
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (name, resourceBundleName, caller, isSystemLogger) {
this.name = name;
this.levelValue = java.util.logging.Level.INFO.intValue ();
}, "~S,~S,Class,~B");
Clazz.makeConstructor (c$, 
 function (name) {
this.name = name;
this.levelValue = java.util.logging.Level.INFO.intValue ();
}, "~S");
c$.getLogger = Clazz.defineMethod (c$, "getLogger", 
function (name) {
var log = java.util.logging.Logger.loggers.get (name);
if (log == null) java.util.logging.Logger.loggers.put (name, log =  new java.util.logging.Logger (name));
return log;
}, "~S");
c$.getLogger = Clazz.defineMethod (c$, "getLogger", 
function (name, resourceBundleName) {
return java.util.logging.Logger.getLogger (name);
}, "~S,~S");
c$.getAnonymousLogger = Clazz.defineMethod (c$, "getAnonymousLogger", 
function () {
return java.util.logging.Logger.getAnonymousLogger (null);
});
c$.getAnonymousLogger = Clazz.defineMethod (c$, "getAnonymousLogger", 
function (resourceBundleName) {
return java.util.logging.Logger.global;
}, "~S");
Clazz.defineMethod (c$, "log", 
function (record) {
if (record.getLevel ().intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}System.out.println (record.getLoggerName () + ": " + record.getMessage ());
}, "java.util.logging.LogRecord");
Clazz.defineMethod (c$, "doLog", 
 function (lr) {
lr.setLoggerName (this.name);
this.log (lr);
}, "java.util.logging.LogRecord");
Clazz.defineMethod (c$, "log", 
function (level, msg) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
this.doLog (lr);
}, "java.util.logging.Level,~S");
Clazz.defineMethod (c$, "log", 
function (level, msg, param1) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
var params =  Clazz.newArray (-1, [param1]);
lr.setParameters (params);
this.doLog (lr);
}, "java.util.logging.Level,~S,~O");
Clazz.defineMethod (c$, "log", 
function (level, msg, params) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
lr.setParameters (params);
this.doLog (lr);
}, "java.util.logging.Level,~S,~A");
Clazz.defineMethod (c$, "log", 
function (level, msg, thrown) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
lr.setThrown (thrown);
this.doLog (lr);
}, "java.util.logging.Level,~S,Throwable");
Clazz.defineMethod (c$, "logp", 
function (level, sourceClass, sourceMethod, msg) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
lr.setSourceClassName (sourceClass);
lr.setSourceMethodName (sourceMethod);
this.doLog (lr);
}, "java.util.logging.Level,~S,~S,~S");
Clazz.defineMethod (c$, "logp", 
function (level, sourceClass, sourceMethod, msg, param1) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
lr.setSourceClassName (sourceClass);
lr.setSourceMethodName (sourceMethod);
var params =  Clazz.newArray (-1, [param1]);
lr.setParameters (params);
this.doLog (lr);
}, "java.util.logging.Level,~S,~S,~S,~O");
Clazz.defineMethod (c$, "logp", 
function (level, sourceClass, sourceMethod, msg, params) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
lr.setSourceClassName (sourceClass);
lr.setSourceMethodName (sourceMethod);
lr.setParameters (params);
this.doLog (lr);
}, "java.util.logging.Level,~S,~S,~S,~A");
Clazz.defineMethod (c$, "logp", 
function (level, sourceClass, sourceMethod, msg, thrown) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (level, msg);
lr.setSourceClassName (sourceClass);
lr.setSourceMethodName (sourceMethod);
lr.setThrown (thrown);
this.doLog (lr);
}, "java.util.logging.Level,~S,~S,~S,Throwable");
Clazz.defineMethod (c$, "entering", 
function (sourceClass, sourceMethod) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue) {
return;
}this.logp (java.util.logging.Level.FINER, sourceClass, sourceMethod, "ENTRY");
}, "~S,~S");
Clazz.defineMethod (c$, "entering", 
function (sourceClass, sourceMethod, param1) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue) {
return;
}var params =  Clazz.newArray (-1, [param1]);
this.logp (java.util.logging.Level.FINER, sourceClass, sourceMethod, "ENTRY {0}", params);
}, "~S,~S,~O");
Clazz.defineMethod (c$, "entering", 
function (sourceClass, sourceMethod, params) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue) {
return;
}var msg = "ENTRY";
if (params == null) {
this.logp (java.util.logging.Level.FINER, sourceClass, sourceMethod, msg);
return;
}for (var i = 0; i < params.length; i++) {
msg = msg + " {" + i + "}";
}
this.logp (java.util.logging.Level.FINER, sourceClass, sourceMethod, msg, params);
}, "~S,~S,~A");
Clazz.defineMethod (c$, "exiting", 
function (sourceClass, sourceMethod) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue) {
return;
}this.logp (java.util.logging.Level.FINER, sourceClass, sourceMethod, "RETURN");
}, "~S,~S");
Clazz.defineMethod (c$, "exiting", 
function (sourceClass, sourceMethod, result) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue) {
return;
}this.logp (java.util.logging.Level.FINER, sourceClass, sourceMethod, "RETURN {0}", result);
}, "~S,~S,~O");
Clazz.defineMethod (c$, "throwing", 
function (sourceClass, sourceMethod, thrown) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return;
}var lr =  new java.util.logging.LogRecord (java.util.logging.Level.FINER, "THROW");
lr.setSourceClassName (sourceClass);
lr.setSourceMethodName (sourceMethod);
lr.setThrown (thrown);
this.doLog (lr);
}, "~S,~S,Throwable");
Clazz.defineMethod (c$, "severe", 
function (msg) {
if (java.util.logging.Level.SEVERE.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.SEVERE, msg);
}, "~S");
Clazz.defineMethod (c$, "warning", 
function (msg) {
if (java.util.logging.Level.WARNING.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.WARNING, msg);
}, "~S");
Clazz.defineMethod (c$, "info", 
function (msg) {
if (java.util.logging.Level.INFO.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.INFO, msg);
}, "~S");
Clazz.defineMethod (c$, "config", 
function (msg) {
if (java.util.logging.Level.CONFIG.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.CONFIG, msg);
}, "~S");
Clazz.defineMethod (c$, "fine", 
function (msg) {
if (java.util.logging.Level.FINE.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.FINE, msg);
}, "~S");
Clazz.defineMethod (c$, "finer", 
function (msg) {
if (java.util.logging.Level.FINER.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.FINER, msg);
}, "~S");
Clazz.defineMethod (c$, "finest", 
function (msg) {
if (java.util.logging.Level.FINEST.intValue () < this.levelValue) {
return;
}this.log (java.util.logging.Level.FINEST, msg);
}, "~S");
Clazz.defineMethod (c$, "setLevel", 
function (newLevel) {
this.levelObject = newLevel;
this.updateEffectiveLevel ();
}, "java.util.logging.Level");
Clazz.defineMethod (c$, "getLevel", 
function () {
return this.levelObject;
});
Clazz.defineMethod (c$, "isLoggable", 
function (level) {
if (level.intValue () < this.levelValue || this.levelValue == java.util.logging.Logger.offValue) {
return false;
}return true;
}, "java.util.logging.Level");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "updateEffectiveLevel", 
 function () {
var newLevelValue;
if (this.levelObject != null) {
newLevelValue = this.levelObject.intValue ();
} else {
newLevelValue = java.util.logging.Level.INFO.intValue ();
}if (this.levelValue == newLevelValue) {
return;
}this.levelValue = newLevelValue;
});
c$.offValue = c$.prototype.offValue = java.util.logging.Level.OFF.intValue ();
Clazz.defineStatics (c$,
"GLOBAL_LOGGER_NAME", "global");
c$.global = c$.prototype.global =  new java.util.logging.Logger ("global");
c$.loggers = c$.prototype.loggers =  new java.util.Hashtable ();
{
java.util.logging.Logger.loggers.put ("global", java.util.logging.Logger.global);
}});
