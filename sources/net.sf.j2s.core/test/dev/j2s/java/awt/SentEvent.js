Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.AWTEvent", "$.ActiveEvent"], "java.awt.SentEvent", ["java.awt.Toolkit", "sun.awt.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$dispatched = false;
this.nested = null;
this.toNotify = null;
Clazz.instantialize (this, arguments);
}, java.awt, "SentEvent", java.awt.AWTEvent, java.awt.ActiveEvent);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (nested) {
this.construct (nested, null);
}, "java.awt.AWTEvent");
Clazz.makeConstructor (c$, 
function (nested, toNotify) {
Clazz.superConstructor (this, java.awt.SentEvent, [(nested != null) ? nested.getSource () : java.awt.Toolkit.getDefaultToolkit (), 1007]);
this.nested = nested;
this.toNotify = toNotify;
}, "java.awt.AWTEvent,sun.awt.AppContext");
Clazz.overrideMethod (c$, "dispatch", 
function () {
try {
if (this.nested != null) {
java.awt.Toolkit.getEventQueue ().dispatchEvent (this.nested);
}} finally {
this.$dispatched = true;
if (this.toNotify != null) {
sun.awt.SunToolkit.postEvent (this.toNotify,  new java.awt.SentEvent ());
}{
this.notifyAll ();
}}
});
Clazz.defineMethod (c$, "dispose", 
function () {
this.$dispatched = true;
if (this.toNotify != null) {
sun.awt.SunToolkit.postEvent (this.toNotify,  new java.awt.SentEvent ());
}{
this.notifyAll ();
}});
Clazz.defineStatics (c$,
"ID", 1007);
});
