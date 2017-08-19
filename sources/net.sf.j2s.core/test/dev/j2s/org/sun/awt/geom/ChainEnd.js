Clazz.declarePackage ("sun.awt.geom");
Clazz.load (null, "sun.awt.geom.ChainEnd", ["java.lang.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.head = null;
this.tail = null;
this.partner = null;
this.etag = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "ChainEnd");
Clazz.makeConstructor (c$, 
function (first, partner) {
this.head = first;
this.tail = first;
this.partner = partner;
this.etag = first.getEdgeTag ();
}, "sun.awt.geom.CurveLink,sun.awt.geom.ChainEnd");
Clazz.defineMethod (c$, "getChain", 
function () {
return this.head;
});
Clazz.defineMethod (c$, "setOtherEnd", 
function (partner) {
this.partner = partner;
}, "sun.awt.geom.ChainEnd");
Clazz.defineMethod (c$, "getPartner", 
function () {
return this.partner;
});
Clazz.defineMethod (c$, "linkTo", 
function (that) {
if (this.etag == 0 || that.etag == 0) {
throw  new InternalError ("ChainEnd linked more than once!");
}if (this.etag == that.etag) {
throw  new InternalError ("Linking chains of the same type!");
}var enter;
var exit;
if (this.etag == 1) {
enter = this;
exit = that;
} else {
enter = that;
exit = this;
}this.etag = 0;
that.etag = 0;
enter.tail.setNext (exit.head);
enter.tail = exit.tail;
if (this.partner === that) {
return enter.head;
}var otherenter = exit.partner;
var otherexit = enter.partner;
otherenter.partner = otherexit;
otherexit.partner = otherenter;
if (enter.head.getYTop () < otherenter.head.getYTop ()) {
enter.tail.setNext (otherenter.head);
otherenter.head = enter.head;
} else {
otherexit.tail.setNext (enter.head);
otherexit.tail = enter.tail;
}return null;
}, "sun.awt.geom.ChainEnd");
Clazz.defineMethod (c$, "addLink", 
function (newlink) {
if (this.etag == 1) {
this.tail.setNext (newlink);
this.tail = newlink;
} else {
newlink.setNext (this.head);
this.head = newlink;
}}, "sun.awt.geom.CurveLink");
Clazz.defineMethod (c$, "getX", 
function () {
if (this.etag == 1) {
return this.tail.getXBot ();
} else {
return this.head.getXBot ();
}});
});
