Clazz.declarePackage ("org.eclipse.jface.window");
Clazz.load (["org.eclipse.jface.operation.IRunnableContext", "org.eclipse.jface.window.Window", "$wt.widgets.Layout"], "org.eclipse.jface.window.ApplicationWindow", ["org.eclipse.core.runtime.NullProgressMonitor", "org.eclipse.jface.action.CoolBarManager", "$.MenuManager", "$.StatusLineManager", "$.ToolBarManager", "org.eclipse.jface.operation.ModalContext", "org.eclipse.jface.resource.JFaceResources", "$wt.SWT", "$wt.custom.BusyIndicator", "$wt.graphics.Point", "$wt.widgets.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.menuBarManager = null;
this.toolBarManager = null;
this.statusLineManager = null;
this.coolBarManager = null;
this.seperator1 = null;
this.operationInProgress = false;
if (!Clazz.isClassDefined ("org.eclipse.jface.window.ApplicationWindow.ApplicationWindowLayout")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.window.ApplicationWindow, "ApplicationWindowLayout", $wt.widgets.Layout);
Clazz.overrideMethod (c$, "computeSize", 
function (a, b, c, d) {
if (b != -1 && c != -1) return  new $wt.graphics.Point (b, c);
var e =  new $wt.graphics.Point (0, 0);
var f = a.getChildren ();
for (var g = 0; g < f.length; g++) {
var h = f[g];
var i = false;
if (this.b$["org.eclipse.jface.window.ApplicationWindow"].getToolBarControl () === h) {
if (!this.b$["org.eclipse.jface.window.ApplicationWindow"].toolBarChildrenExist ()) {
i = true;
e.y += 23;
}} else if (this.b$["org.eclipse.jface.window.ApplicationWindow"].getCoolBarControl () === h) {
if (!this.b$["org.eclipse.jface.window.ApplicationWindow"].coolBarChildrenExist ()) {
i = true;
e.y += 23;
}} else if (this.b$["org.eclipse.jface.window.ApplicationWindow"].statusLineManager != null && this.b$["org.eclipse.jface.window.ApplicationWindow"].statusLineManager.getControl () === h) {
} else if (g > 0) {
i = false;
}if (!i) {
var j = h.computeSize (b, c, d);
e.x = Math.max (e.x, j.x);
e.y += j.y + 2;
}}
if (b != -1) e.x = b;
if (c != -1) e.y = c;
return e;
}, "$wt.widgets.Composite,~N,~N,~B");
Clazz.overrideMethod (c$, "layout", 
function (a, b) {
var c = a.getClientArea ();
var d = a.getChildren ();
for (var e = 0; e < d.length; e++) {
var f = d[e];
if (e == 0) {
var g = f.computeSize (-1, -1, b);
f.setBounds (c.x, c.y, c.width, g.y);
c.y += g.y;
c.height -= g.y;
} else if (this.b$["org.eclipse.jface.window.ApplicationWindow"].getToolBarControl () === f) {
if (this.b$["org.eclipse.jface.window.ApplicationWindow"].toolBarChildrenExist ()) {
var g = f.computeSize (-1, -1, b);
f.setBounds (c.x, c.y, c.width, g.y);
c.y += g.y + 2;
c.height -= g.y + 2;
}} else if (this.b$["org.eclipse.jface.window.ApplicationWindow"].getCoolBarControl () === f) {
if (this.b$["org.eclipse.jface.window.ApplicationWindow"].coolBarChildrenExist ()) {
var g = f.computeSize (c.width, -1, b);
f.setBounds (c.x, c.y, c.width, g.y);
c.y += g.y + 2;
c.height -= g.y + 2;
}} else if (this.b$["org.eclipse.jface.window.ApplicationWindow"].statusLineManager != null && this.b$["org.eclipse.jface.window.ApplicationWindow"].statusLineManager.getControl () === f) {
var g = f.computeSize (-1, -1, b);
f.setBounds (c.x, c.y + c.height - g.y, c.width, g.y);
c.height -= g.y + 2;
} else {
f.setBounds (c.x, c.y + 2, c.width, c.height - 2);
}}
}, "$wt.widgets.Composite,~B");
Clazz.defineStatics (c$,
"VGAP", 2,
"BAR_SIZE", 23);
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.window, "ApplicationWindow", org.eclipse.jface.window.Window, org.eclipse.jface.operation.IRunnableContext);
Clazz.defineMethod (c$, "getSeperator1", 
function () {
return this.seperator1;
});
Clazz.defineMethod (c$, "addMenuBar", 
function () {
if ((this.getShell () == null) && (this.menuBarManager == null)) {
this.menuBarManager = this.createMenuManager ();
}});
Clazz.defineMethod (c$, "addStatusLine", 
function () {
if ((this.getShell () == null) && (this.statusLineManager == null)) {
this.statusLineManager = this.createStatusLineManager ();
}});
Clazz.defineMethod (c$, "addToolBar", 
function (style) {
if ((this.getShell () == null) && (this.toolBarManager == null) && (this.coolBarManager == null)) {
this.toolBarManager = this.createToolBarManager (style);
}}, "~N");
Clazz.defineMethod (c$, "addCoolBar", 
function (style) {
if ((this.getShell () == null) && (this.toolBarManager == null) && (this.coolBarManager == null)) {
this.coolBarManager = this.createCoolBarManager (style);
}}, "~N");
Clazz.defineMethod (c$, "canHandleShellCloseEvent", 
function () {
return Clazz.superCall (this, org.eclipse.jface.window.ApplicationWindow, "canHandleShellCloseEvent", []) && !this.operationInProgress;
});
Clazz.defineMethod (c$, "close", 
function () {
if (this.operationInProgress) return false;
if (Clazz.superCall (this, org.eclipse.jface.window.ApplicationWindow, "close", [])) {
if (this.menuBarManager != null) {
this.menuBarManager.dispose ();
this.menuBarManager = null;
}if (this.toolBarManager != null) {
this.toolBarManager.dispose ();
this.toolBarManager = null;
}if (this.statusLineManager != null) {
this.statusLineManager.dispose ();
this.statusLineManager = null;
}if (this.coolBarManager != null) {
this.coolBarManager.dispose ();
this.coolBarManager = null;
}return true;
}return false;
});
Clazz.defineMethod (c$, "configureShell", 
function (shell) {
Clazz.superCall (this, org.eclipse.jface.window.ApplicationWindow, "configureShell", [shell]);
this.createTrimWidgets (shell);
}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "createTrimWidgets", 
function (shell) {
if (this.menuBarManager != null) {
this.menuBarManager.updateAll (true);
shell.setMenuBar (this.menuBarManager.createMenuBar (shell));
}if (this.showTopSeperator ()) this.seperator1 =  new $wt.widgets.Label (shell, 258);
this.createToolBarControl (shell);
this.createCoolBarControl (shell);
this.createStatusLine (shell);
}, "$wt.widgets.Shell");
Clazz.overrideMethod (c$, "getLayout", 
function () {
return Clazz.innerTypeInstance (org.eclipse.jface.window.ApplicationWindow.ApplicationWindowLayout, this, null);
});
Clazz.defineMethod (c$, "showTopSeperator", 
function () {
return !"carbon".equals ($WT.getPlatform ());
});
Clazz.defineMethod (c$, "createStatusLine", 
function (shell) {
if (this.statusLineManager != null) {
this.statusLineManager.createControl (shell, 0);
}}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "createMenuManager", 
function () {
return  new org.eclipse.jface.action.MenuManager ();
});
Clazz.defineMethod (c$, "createStatusLineManager", 
function () {
return  new org.eclipse.jface.action.StatusLineManager ();
});
Clazz.defineMethod (c$, "createToolBarManager", 
function (style) {
return  new org.eclipse.jface.action.ToolBarManager (style);
}, "~N");
Clazz.defineMethod (c$, "createCoolBarManager", 
function (style) {
return  new org.eclipse.jface.action.CoolBarManager (style);
}, "~N");
Clazz.defineMethod (c$, "createToolBarControl", 
function (parent) {
if (this.toolBarManager != null) {
return this.toolBarManager.createControl (parent);
}return null;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createCoolBarControl", 
function (composite) {
if (this.coolBarManager != null) {
return this.coolBarManager.createControl (composite);
}return null;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFont (this.getSymbolicFontName ());
});
Clazz.defineMethod (c$, "getMenuBarManager", 
function () {
return this.menuBarManager;
});
Clazz.defineMethod (c$, "getStatusLineManager", 
function () {
return this.statusLineManager;
});
Clazz.defineMethod (c$, "getSymbolicFontName", 
function () {
return "org.eclipse.jface.textfont";
});
Clazz.defineMethod (c$, "getToolBarManager", 
function () {
return this.toolBarManager;
});
Clazz.defineMethod (c$, "getCoolBarManager", 
function () {
return this.coolBarManager;
});
Clazz.defineMethod (c$, "getToolBarControl", 
function () {
if (this.toolBarManager != null) {
return this.toolBarManager.getControl ();
}return null;
});
Clazz.defineMethod (c$, "getCoolBarControl", 
function () {
if (this.coolBarManager != null) {
return this.coolBarManager.getControl ();
}return null;
});
Clazz.overrideMethod (c$, "run", 
function (fork, cancelable, runnable) {
try {
this.operationInProgress = true;
var mgr = this.getStatusLineManager ();
if (mgr == null) {
runnable.run ( new org.eclipse.core.runtime.NullProgressMonitor ());
return ;
}var cancelWasEnabled = mgr.isCancelEnabled ();
var contents = this.getContents ();
var display = contents.getDisplay ();
var shell = this.getShell ();
var contentsWasEnabled = contents.getEnabled ();
var manager = this.getMenuBarManager ();
var menuBar = null;
if (manager != null) {
menuBar = manager.getMenu ();
manager = null;
}var menuBarWasEnabled = false;
if (menuBar != null) menuBarWasEnabled = menuBar.isEnabled ();
var toolbarControl = this.getToolBarControl ();
var toolbarWasEnabled = false;
if (toolbarControl != null) toolbarWasEnabled = toolbarControl.getEnabled ();
var coolbarControl = this.getCoolBarControl ();
var coolbarWasEnabled = false;
if (coolbarControl != null) coolbarWasEnabled = coolbarControl.getEnabled ();
var shells = display.getShells ();
var enabled =  Clazz.newArray (shells.length, false);
for (var i = 0; i < shells.length; i++) {
var current = shells[i];
if (current === shell) continue ;if (current != null && !current.isDisposed ()) {
enabled[i] = current.getEnabled ();
current.setEnabled (false);
}}
var currentFocus = display.getFocusControl ();
try {
contents.setEnabled (false);
if (menuBar != null) menuBar.setEnabled (false);
if (toolbarControl != null) toolbarControl.setEnabled (false);
if (coolbarControl != null) coolbarControl.setEnabled (false);
mgr.setCancelEnabled (cancelable);
var holder =  new Array (1);
$wt.custom.BusyIndicator.showWhile (display, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.window.ApplicationWindow$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.window, "ApplicationWindow$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
try {
org.eclipse.jface.operation.ModalContext.run (this.f$.runnable, this.f$.fork, this.f$.mgr.getProgressMonitor (), this.f$.display);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var ite = e$$;
{
this.f$.holder[0] = ite;
}
} else if (Clazz.instanceOf (e$$, InterruptedException)) {
var ie = e$$;
{
this.f$.holder[0] = ie;
}
} else {
throw e$$;
}
}
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.window.ApplicationWindow$1, i$, v$);
}) (this, Clazz.cloneFinals ("runnable", runnable, "fork", fork, "mgr", mgr, "display", display, "holder", holder)));
if (holder[0] != null) {
if (Clazz.instanceOf (holder[0], java.lang.reflect.InvocationTargetException)) {
throw holder[0];
} else if (Clazz.instanceOf (holder[0], InterruptedException)) {
throw holder[0];
}}} finally {
this.operationInProgress = false;
for (var i = 0; i < shells.length; i++) {
var current = shells[i];
if (current === shell) continue ;if (current != null && !current.isDisposed ()) {
current.setEnabled (enabled[i]);
}}
if (!contents.isDisposed ()) contents.setEnabled (contentsWasEnabled);
if (menuBar != null && !menuBar.isDisposed ()) menuBar.setEnabled (menuBarWasEnabled);
if (toolbarControl != null && !toolbarControl.isDisposed ()) toolbarControl.setEnabled (toolbarWasEnabled);
if (coolbarControl != null && !coolbarControl.isDisposed ()) coolbarControl.setEnabled (coolbarWasEnabled);
mgr.setCancelEnabled (cancelWasEnabled);
if (currentFocus != null && !currentFocus.isDisposed ()) {
currentFocus.forceFocus ();
}}
} finally {
this.operationInProgress = false;
}
}, "~B,~B,org.eclipse.jface.operation.IRunnableWithProgress");
Clazz.defineMethod (c$, "setStatus", 
function (message) {
if (this.statusLineManager != null) {
this.statusLineManager.setMessage (message);
}}, "~S");
Clazz.defineMethod (c$, "toolBarChildrenExist", 
function () {
var toolControl = this.getToolBarControl ();
if (Clazz.instanceOf (toolControl, $wt.widgets.ToolBar)) {
return (toolControl).getItemCount () > 0;
}return false;
});
Clazz.defineMethod (c$, "coolBarChildrenExist", 
function () {
var coolControl = this.getCoolBarControl ();
if (Clazz.instanceOf (coolControl, $wt.widgets.CoolBar)) {
return (coolControl).getItemCount () > 0;
}return false;
});
});
