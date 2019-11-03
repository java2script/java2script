Clazz.declarePackage ("org.eclipse.osgi.framework.internal.defaultadaptor");
Clazz.load (["org.eclipse.osgi.framework.log.FrameworkLog"], "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultLog", null, function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.defaultadaptor, "DefaultLog", null, org.eclipse.osgi.framework.log.FrameworkLog);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "log", 
function (frameworkEvent) {
}, "org.osgi.framework.FrameworkEvent");
Clazz.defineMethod (c$, "log", 
function (logEntry) {
}, "org.eclipse.osgi.framework.log.FrameworkLogEntry");
Clazz.overrideMethod (c$, "setWriter", 
function (newWriter, append) {
}, "java.io.Writer,~B");
Clazz.overrideMethod (c$, "setFile", 
function (newFile, append) {
}, "java.io.File,~B");
Clazz.overrideMethod (c$, "getFile", 
function () {
return null;
});
Clazz.overrideMethod (c$, "setConsoleLog", 
function (consoleLog) {
}, "~B");
Clazz.overrideMethod (c$, "close", 
function () {
});
});
