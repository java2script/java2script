Clazz.declarePackage ("sun.awt");
Clazz.load (["java.lang.StringBuffer", "java.util.Collections", "$.HashMap", "$.IdentityHashMap"], ["sun.awt.MostRecentKeyValue", "$.MostRecentThreadAppContext", "$.AppContext"], ["java.lang.Thread", "java.util.HashSet", "java.beans.PropertyChangeSupport", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.table = null;
this.threadGroup = null;
this.changeSupport = null;
this.$isDisposed = false;
this.mostRecentKeyValue = null;
this.shadowMostRecentKeyValue = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "AppContext");
Clazz.prepareFields (c$, function () {
this.table =  new java.util.HashMap ();
});
c$.getAppContexts = Clazz.defineMethod (c$, "getAppContexts", 
function () {
return  new java.util.HashSet (sun.awt.AppContext.threadGroup2appContext.values ());
});
Clazz.defineMethod (c$, "isDisposed", 
function () {
return this.$isDisposed;
});
Clazz.makeConstructor (c$, 
function (threadGroup) {
sun.awt.AppContext.numAppContexts++;
this.threadGroup = threadGroup;
sun.awt.AppContext.threadGroup2appContext.put (threadGroup, this);
}, "ThreadGroup");
c$.getAppContext = Clazz.defineMethod (c$, "getAppContext", 
function () {
var currentThread = Thread.currentThread ();
var appContext = null;
var recent = sun.awt.AppContext.mostRecentThreadAppContext;
if ((recent != null) && (recent.thread === currentThread)) {
appContext = recent.appContext;
} else {
var currentThreadGroup = currentThread.getThreadGroup ();
var threadGroup = currentThreadGroup;
appContext = sun.awt.AppContext.threadGroup2appContext.get (threadGroup);
while (appContext == null) {
threadGroup = threadGroup.getParent ();
if (threadGroup == null) {
appContext = swingjs.JSToolkit.createNewAppContext ();
break;
}appContext = sun.awt.AppContext.threadGroup2appContext.get (threadGroup);
}
for (var tg = currentThreadGroup; tg !== threadGroup; tg = tg.getParent ()) {
sun.awt.AppContext.threadGroup2appContext.put (tg, appContext);
}
sun.awt.AppContext.mostRecentThreadAppContext =  new sun.awt.MostRecentThreadAppContext (currentThread, appContext);
}return appContext;
});
c$.isMainContext = Clazz.defineMethod (c$, "isMainContext", 
function (ctx) {
return false;
}, "sun.awt.AppContext");
Clazz.defineMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "get", 
function (key) {
{
var recent = this.mostRecentKeyValue;
if ((recent != null) && (recent.key === key)) {
return recent.value;
}var value = this.table.get (key);
if (this.mostRecentKeyValue == null) {
this.mostRecentKeyValue =  new sun.awt.MostRecentKeyValue (key, value);
this.shadowMostRecentKeyValue =  new sun.awt.MostRecentKeyValue (key, value);
} else {
var auxKeyValue = this.mostRecentKeyValue;
this.shadowMostRecentKeyValue.setPair (key, value);
this.mostRecentKeyValue = this.shadowMostRecentKeyValue;
this.shadowMostRecentKeyValue = auxKeyValue;
}return value;
}}, "~O");
Clazz.defineMethod (c$, "put", 
function (key, value) {
{
var recent = this.mostRecentKeyValue;
if ((recent != null) && (recent.key === key)) recent.value = value;
return this.table.put (key, value);
}}, "~O,~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
{
var recent = this.mostRecentKeyValue;
if ((recent != null) && (recent.key === key)) recent.value = null;
return this.table.remove (key);
}}, "~O");
Clazz.defineMethod (c$, "getThreadGroup", 
function () {
return this.threadGroup;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[threadGroup=" + this.threadGroup.getName () + "]";
});
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (propertyName, listener) {
if (listener == null) {
return;
}if (this.changeSupport == null) {
this.changeSupport =  new java.beans.PropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (propertyName, listener);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (propertyName, listener) {
if (listener == null || this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (propertyName, listener);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function (propertyName) {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners (propertyName);
}, "~S");
c$.EVENT_QUEUE_KEY = c$.prototype.EVENT_QUEUE_KEY =  new StringBuffer ("EventQueue");
c$.threadGroup2appContext = c$.prototype.threadGroup2appContext = java.util.Collections.synchronizedMap ( new java.util.IdentityHashMap ());
Clazz.defineStatics (c$,
"DISPOSED_PROPERTY_NAME", "disposed",
"GUI_DISPOSED", "guidisposed",
"numAppContexts", 0,
"mostRecentThreadAppContext", null);
c$ = Clazz.decorateAsClass (function () {
this.thread = null;
this.appContext = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "MostRecentThreadAppContext");
Clazz.makeConstructor (c$, 
function (key, value) {
this.thread = key;
this.appContext = value;
}, "Thread,sun.awt.AppContext");
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "MostRecentKeyValue");
Clazz.makeConstructor (c$, 
function (k, v) {
this.key = k;
this.value = v;
}, "~O,~O");
Clazz.defineMethod (c$, "setPair", 
function (k, v) {
this.key = k;
this.value = v;
}, "~O,~O");
});
