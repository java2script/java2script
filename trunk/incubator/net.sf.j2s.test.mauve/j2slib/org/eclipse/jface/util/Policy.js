Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (null, "org.eclipse.jface.util.Policy", ["org.eclipse.jface.util.ILogger"], function () {
c$ = Clazz.declareType (org.eclipse.jface.util, "Policy");
c$.getDummyLog = Clazz.defineMethod (c$, "getDummyLog", 
($fz = function () {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.Policy$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "Policy$1", null, org.eclipse.jface.util.ILogger);
Clazz.overrideMethod (c$, "log", 
function (status) {
System.err.println (status.getMessage ());
}, "org.eclipse.core.runtime.IStatus");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.Policy$1, i$, v$);
}) (this, null);
}, $fz.isPrivate = true, $fz));
c$.setLog = Clazz.defineMethod (c$, "setLog", 
function (logger) {
($t$ = org.eclipse.jface.util.Policy.log = logger, org.eclipse.jface.util.Policy.prototype.log = org.eclipse.jface.util.Policy.log, $t$);
}, "org.eclipse.jface.util.ILogger");
c$.getLog = Clazz.defineMethod (c$, "getLog", 
function () {
if (org.eclipse.jface.util.Policy.log == null) ($t$ = org.eclipse.jface.util.Policy.log = org.eclipse.jface.util.Policy.getDummyLog (), org.eclipse.jface.util.Policy.prototype.log = org.eclipse.jface.util.Policy.log, $t$);
return org.eclipse.jface.util.Policy.log;
});
Clazz.defineStatics (c$,
"DEFAULT", false,
"JFACE", "org.eclipse.jface",
"log", null,
"DEBUG_DIALOG_NO_PARENT", false,
"TRACE_ACTIONS", false,
"TRACE_TOOLBAR", false);
});
