Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Container"], "java.awt.Panel", ["java.awt.FlowLayout"], function () {
c$ = Clazz.declareType (java.awt, "Panel", java.awt.Container);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.Panel, []);
this.setLayout ( new java.awt.FlowLayout ());
});
Clazz.overrideMethod (c$, "canPaint", 
function () {
return this.isContentPane;
});
Clazz.makeConstructor (c$, 
function (layout) {
Clazz.superConstructor (this, java.awt.Panel, []);
if (layout == null) layout =  new java.awt.FlowLayout ();
this.setAppContext ();
this.setLayout (layout);
}, "java.awt.LayoutManager");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
{
return "panel" + java.awt.Panel.nameCounter++;
}});
Clazz.defineMethod (c$, "addNotify", 
function () {
this.getOrCreatePeer ();
Clazz.superCall (this, java.awt.Panel, "addNotify", []);
});
Clazz.overrideMethod (c$, "getOrCreatePeer", 
function () {
return (this.ui == null ? null : this.peer == null ? (this.peer = this.getToolkit ().createPanel (this)) : this.peer);
});
Clazz.defineStatics (c$,
"base", "panel",
"nameCounter", 0);
});
