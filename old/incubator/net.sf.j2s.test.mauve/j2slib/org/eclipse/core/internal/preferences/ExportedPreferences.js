Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.EclipsePreferences", "org.eclipse.core.runtime.preferences.IExportedPreferences"], "org.eclipse.core.internal.preferences.ExportedPreferences", ["java.lang.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isExportRoot = false;
this.version = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "ExportedPreferences", org.eclipse.core.internal.preferences.EclipsePreferences, org.eclipse.core.runtime.preferences.IExportedPreferences);
c$.newRoot = Clazz.defineMethod (c$, "newRoot", 
function () {
return  new org.eclipse.core.internal.preferences.ExportedPreferences (null, "");
});
Clazz.overrideMethod (c$, "isExportRoot", 
function () {
return this.$isExportRoot;
});
Clazz.defineMethod (c$, "setExportRoot", 
function () {
this.$isExportRoot = true;
});
Clazz.defineMethod (c$, "getVersion", 
function () {
return this.version;
});
Clazz.defineMethod (c$, "setVersion", 
function (version) {
this.version = version;
}, "~S");
Clazz.overrideMethod (c$, "internalCreate", 
function (nodeParent, nodeName, context) {
return  new org.eclipse.core.internal.preferences.ExportedPreferences (nodeParent, nodeName);
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ();
if (this.$isExportRoot) buffer.append ("* ");
buffer.append (this.absolutePath ());
if (this.version != null) buffer.append (" (" + this.version + ')');
return buffer.toString ();
});
});
