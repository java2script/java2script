Clazz.declarePackage ("sun.applet");
Clazz.load (["sun.applet.AppletListener"], "sun.applet.AppletEventMulticaster", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.b = null;
Clazz.instantialize (this, arguments);
}, sun.applet, "AppletEventMulticaster", null, sun.applet.AppletListener);
Clazz.makeConstructor (c$, 
function (a, b) {
this.a = a;
this.b = b;
}, "sun.applet.AppletListener,sun.applet.AppletListener");
Clazz.defineMethod (c$, "appletStateChanged", 
function (e) {
this.a.appletStateChanged (e);
this.b.appletStateChanged (e);
}, "sun.applet.AppletEvent");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return sun.applet.AppletEventMulticaster.addInternal (a, b);
}, "sun.applet.AppletListener,sun.applet.AppletListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return sun.applet.AppletEventMulticaster.removeInternal (l, oldl);
}, "sun.applet.AppletListener,sun.applet.AppletListener");
c$.addInternal = Clazz.defineMethod (c$, "addInternal", 
 function (a, b) {
if (a == null) return b;
if (b == null) return a;
return  new sun.applet.AppletEventMulticaster (a, b);
}, "sun.applet.AppletListener,sun.applet.AppletListener");
Clazz.defineMethod (c$, "remove", 
function (oldl) {
if (oldl === this.a) return this.b;
if (oldl === this.b) return this.a;
var a2 = sun.applet.AppletEventMulticaster.removeInternal (this.a, oldl);
var b2 = sun.applet.AppletEventMulticaster.removeInternal (this.b, oldl);
if (a2 === this.a && b2 === this.b) {
return this;
}return sun.applet.AppletEventMulticaster.addInternal (a2, b2);
}, "sun.applet.AppletListener");
c$.removeInternal = Clazz.defineMethod (c$, "removeInternal", 
 function (l, oldl) {
if (l === oldl || l == null) {
return null;
} else if (Clazz.instanceOf (l, sun.applet.AppletEventMulticaster)) {
return (l).remove (oldl);
} else {
return l;
}}, "sun.applet.AppletListener,sun.applet.AppletListener");
});
