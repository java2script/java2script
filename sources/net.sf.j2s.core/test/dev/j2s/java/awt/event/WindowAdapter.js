Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.WindowFocusListener", "$.WindowListener", "$.WindowStateListener"], "java.awt.event.WindowAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "WindowAdapter", null, [java.awt.event.WindowListener, java.awt.event.WindowStateListener, java.awt.event.WindowFocusListener]);
Clazz.overrideMethod (c$, "windowOpened", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowClosing", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowClosed", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowIconified", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowDeiconified", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowActivated", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowDeactivated", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowStateChanged", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowGainedFocus", 
function (e) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowLostFocus", 
function (e) {
}, "java.awt.event.WindowEvent");
});
