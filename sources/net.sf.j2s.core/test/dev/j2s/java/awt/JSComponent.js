Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Component", "swingjs.JSToolkit"], "java.awt.JSComponent", ["java.lang.Boolean", "javax.swing.UIManager", "swingjs.JSFrameViewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htmlName = null;
this.num = 0;
this.isRootPane = false;
this.isContentPane = false;
this.canvas = null;
this.appletViewer = null;
this.frameViewer = null;
this.topFrameViewer = null;
this.ui = null;
this.uiClassID = "ComponentUI";
this.peerVis = null;
this.isBackgroundPainted = false;
Clazz.instantialize (this, arguments);
}, java.awt, "JSComponent", java.awt.Component);
Clazz.prepareFields (c$, function () {
this.appletViewer = swingjs.JSToolkit.getAppletViewer ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.JSComponent);
this.num = ++java.awt.JSComponent.incr;
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
if (this.width == 0 || this.height == 0 || !this.isVisible ()) return null;
if (this.frameViewer != null) return this.frameViewer.getGraphics (0, 0).create ();
if (this.parent == null) {
return null;
}var g = this.parent.getGraphics ();
if (g == null) return null;
g.translate (this.x, (this.isContentPane ? 0 : this.y));
g.setClip (0, 0, this.width, this.height);
g.setFont (this.getFont ());
return g;
});
Clazz.defineMethod (c$, "setFrameViewer", 
function (viewer) {
return this.frameViewer = (viewer == null ? viewer =  new swingjs.JSFrameViewer ().setForWindow (this) : viewer);
}, "swingjs.JSFrameViewer");
Clazz.defineMethod (c$, "getFrameViewer", 
function () {
var parent = null;
return (this.topFrameViewer != null ? this.topFrameViewer : this.frameViewer != null ? this.topFrameViewer = this.frameViewer : (parent = this.getParent ()) == null ? null : (this.topFrameViewer = parent.getFrameViewer ()));
});
Clazz.defineMethod (c$, "getHTMLName", 
function (uid) {
return (this.htmlName == null ? this.htmlName = this.appContext.getThreadGroup ().getName () + "_" + uid + "_" + this.num : this.htmlName);
}, "~S");
Clazz.defineMethod (c$, "getUIClassID", 
function () {
return this.uiClassID;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
this.ui = ui;
if (ui != null) {
ui.installUI (this);
}}, "javax.swing.plaf.ComponentUI");
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updatePeerVisibility", 
function (isVisible) {
if (this.getOrCreatePeer () == null) this.peerVis = (isVisible ? Boolean.TRUE : Boolean.FALSE);
 else this.updatePeerVisibilityOrig (isVisible);
}, "~B");
Clazz.overrideMethod (c$, "getOrCreatePeer", 
function () {
return (this.ui == null ? null : this.ui == null ? null : this.peer == null ? (this.peer = this.getToolkit ().createComponent (this)) : this.peer);
});
Clazz.defineMethod (c$, "updateUI", 
function () {
if (this.ui == null) this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.defineMethod (c$, "checkBackgroundPainted", 
function (jsg) {
if (jsg == null) {
this.isBackgroundPainted = false;
return;
}this.isBackgroundPainted = jsg.isBackgroundPainted ();
if (this.isBackgroundPainted) {
this.ui.setBackgroundPainted ();
(this).getRootPane ().getUI ().setBackgroundPainted ();
}}, "swingjs.JSGraphics2D");
Clazz.defineMethod (c$, "selfOrParentBackgroundPainted", 
function () {
var c = this;
while (c != null) {
if (c.isBackgroundPainted) return true;
c = c.getParent ();
}
return false;
});
Clazz.overrideMethod (c$, "isBackgroundSet", 
function () {
return this.background != null;
});
Clazz.defineStatics (c$,
"incr", 0);
});
