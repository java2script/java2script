Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.ListEditor"], "org.eclipse.jface.preference.PathEditor", ["java.io.File", "java.lang.StringBuffer", "java.util.ArrayList", "$.StringTokenizer", "$wt.widgets.DirectoryDialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lastPath = null;
this.dirChooserLabelText = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PathEditor", org.eclipse.jface.preference.ListEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.PathEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, dirChooserLabelText, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.PathEditor, []);
this.init (name, labelText);
this.dirChooserLabelText = dirChooserLabelText;
this.createControl (parent);
}, "~S,~S,~S,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createList", 
function (items) {
var path =  new StringBuffer ("");
for (var i = 0; i < items.length; i++) {
path.append (items[i]);
path.append (java.io.File.pathSeparator);
}
return path.toString ();
}, "~A");
Clazz.overrideMethod (c$, "getNewInputObject", 
function () {
var dialog =  new $wt.widgets.DirectoryDialog (this.getShell ());
if (this.dirChooserLabelText != null) dialog.setMessage (this.dirChooserLabelText);
if (this.lastPath != null) {
if ( new java.io.File (this.lastPath).exists ()) dialog.setFilterPath (this.lastPath);
}DialogSync2Async.block (dialog, this, function () {
var dir = dialog.dialogReturn;
if (dir != null) {
dir = dir.trim ();
if (dir.length == 0) return null;
this.lastPath = dir;
}return dir;
});
return;
});
Clazz.overrideMethod (c$, "parseString", 
function (stringList) {
var st =  new java.util.StringTokenizer (stringList, java.io.File.pathSeparator + "\n\r");
var v =  new java.util.ArrayList ();
while (st.hasMoreElements ()) {
v.add (st.nextElement ());
}
return v.toArray ( new Array (v.size ()));
}, "~S");
});
