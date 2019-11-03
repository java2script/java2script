Clazz.declarePackage ("org.eclipse.jface.window");
Clazz.load (["org.eclipse.jface.window.IShellProvider"], "org.eclipse.jface.window.SameShellProvider", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.targetControl = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.window, "SameShellProvider", null, org.eclipse.jface.window.IShellProvider);
Clazz.makeConstructor (c$, 
function (targetControl) {
this.targetControl = targetControl;
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "getShell", 
function () {
if (Clazz.instanceOf (this.targetControl, $wt.widgets.Shell)) {
return this.targetControl;
}return this.targetControl == null ? null : this.targetControl.getShell ();
});
});
