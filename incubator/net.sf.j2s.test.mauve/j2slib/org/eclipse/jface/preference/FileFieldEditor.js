Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.StringButtonFieldEditor"], "org.eclipse.jface.preference.FileFieldEditor", ["java.io.File", "org.eclipse.jface.resource.JFaceResources", "$wt.widgets.FileDialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.extensions = null;
this.enforceAbsolute = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "FileFieldEditor", org.eclipse.jface.preference.StringButtonFieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.FileFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
this.construct (name, labelText, false, parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, enforceAbsolute, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.FileFieldEditor, []);
this.init (name, labelText);
this.enforceAbsolute = enforceAbsolute;
this.setErrorMessage (org.eclipse.jface.resource.JFaceResources.getString ("FileFieldEditor.errorMessage"));
this.setChangeButtonText (org.eclipse.jface.resource.JFaceResources.getString ("openBrowse"));
this.setValidateStrategy (1);
this.createControl (parent);
}, "~S,~S,~B,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "changePressed", 
function () {
var f =  new java.io.File (this.getTextControl ().getText ());
if (!f.exists ()) f = null;
var d = this.getFile (f);
if (d == null) return null;
return d.getAbsolutePath ();
});
Clazz.overrideMethod (c$, "checkState", 
function () {
var msg = null;
var path = this.getTextControl ().getText ();
if (path != null) path = path.trim ();
 else path = "";
if (path.length == 0) {
if (!this.isEmptyStringAllowed ()) msg = this.getErrorMessage ();
} else {
var file =  new java.io.File (path);
if (file.isFile ()) {
if (this.enforceAbsolute && !file.isAbsolute ()) msg = org.eclipse.jface.resource.JFaceResources.getString ("FileFieldEditor.errorMessage2");
} else {
msg = this.getErrorMessage ();
}}if (msg != null) {
this.showErrorMessage (msg);
return false;
}this.clearErrorMessage ();
return true;
});
Clazz.defineMethod (c$, "getFile", 
($fz = function (startingDirectory) {
var dialog =  new $wt.widgets.FileDialog (this.getShell (), 4096);
if (startingDirectory != null) dialog.setFileName (startingDirectory.getPath ());
if (this.extensions != null) dialog.setFilterExtensions (this.extensions);
DialogSync2Async.block (dialog, this, function () {
var file = dialog.dialogReturn;
if (file != null) {
file = file.trim ();
if (file.length > 0) return  new java.io.File (file);
}return null;
});
return;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "setFileExtensions", 
function (extensions) {
this.extensions = extensions;
}, "~A");
});
