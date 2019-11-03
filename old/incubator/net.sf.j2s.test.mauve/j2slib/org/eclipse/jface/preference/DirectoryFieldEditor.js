Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.StringButtonFieldEditor"], "org.eclipse.jface.preference.DirectoryFieldEditor", ["java.io.File", "org.eclipse.jface.resource.JFaceResources", "$wt.widgets.DirectoryDialog"], function () {
c$ = Clazz.declareType (org.eclipse.jface.preference, "DirectoryFieldEditor", org.eclipse.jface.preference.StringButtonFieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.DirectoryFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.DirectoryFieldEditor, []);
this.init (name, labelText);
this.setErrorMessage (org.eclipse.jface.resource.JFaceResources.getString ("DirectoryFieldEditor.errorMessage"));
this.setChangeButtonText (org.eclipse.jface.resource.JFaceResources.getString ("openBrowse"));
this.setValidateStrategy (1);
this.createControl (parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "changePressed", 
function () {
var f =  new java.io.File (this.getTextControl ().getText ());
if (!f.exists ()) f = null;
var d = this.getDirectory (f);
if (d == null) return null;
return d.getAbsolutePath ();
});
Clazz.overrideMethod (c$, "doCheckState", 
function () {
var fileName = this.getTextControl ().getText ();
fileName = fileName.trim ();
if (fileName.length == 0 && this.isEmptyStringAllowed ()) return true;
var file =  new java.io.File (fileName);
return file.isDirectory ();
});
Clazz.defineMethod (c$, "getDirectory", 
($fz = function (startingDirectory) {
var fileDialog =  new $wt.widgets.DirectoryDialog (this.getShell (), 4096);
if (startingDirectory != null) fileDialog.setFilterPath (startingDirectory.getPath ());
DialogSync2Async.block (fileDialog, this, function () {
var dir = fileDialog.dialogReturn;
if (dir != null) {
dir = dir.trim ();
if (dir.length > 0) return  new java.io.File (dir);
}return null;
});
return;
}, $fz.isPrivate = true, $fz), "java.io.File");
});
