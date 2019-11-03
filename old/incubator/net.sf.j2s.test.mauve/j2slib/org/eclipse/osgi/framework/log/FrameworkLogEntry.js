Clazz.declarePackage ("org.eclipse.osgi.framework.log");
c$ = Clazz.decorateAsClass (function () {
this.entry = null;
this.message = null;
this.stackCode = 0;
this.throwable = null;
this.children = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.log, "FrameworkLogEntry");
Clazz.makeConstructor (c$, 
function (entry, message, stackCode, throwable, children) {
this.entry = entry;
this.message = message;
this.stackCode = stackCode;
this.throwable = throwable;
this.children = children;
}, "~S,~S,~N,Throwable,~A");
Clazz.defineMethod (c$, "getChildren", 
function () {
return this.children;
});
Clazz.defineMethod (c$, "getEntry", 
function () {
return this.entry;
});
Clazz.defineMethod (c$, "getMessage", 
function () {
return this.message;
});
Clazz.defineMethod (c$, "getStackCode", 
function () {
return this.stackCode;
});
Clazz.defineMethod (c$, "getThrowable", 
function () {
return this.throwable;
});
