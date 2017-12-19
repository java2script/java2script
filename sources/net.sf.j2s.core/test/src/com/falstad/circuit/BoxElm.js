(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "BoxElm", null, 'com.falstad.circuit.GraphicElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.x2 = xx + 16;
this.y2 = yy + 16;
this.setBbox$I$I$I$I(this.x, this.y, this.x2, this.y2);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.x2 = xb;
this.y2 = yb;
this.setBbox$I$I$I$I(this.x, this.y, this.x2, this.y2);
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []);
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'b'.$c();
});

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
this.x = xx;
this.y = yy;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).GRAY);
this.setBbox$I$I$I$I(this.x, this.y, this.x2, this.y2);
if (this.x < this.x2 && this.y < this.y2 ) g.fillRect$I$I$I$I(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
 else if (this.x > this.x2 && this.y < this.y2 ) g.fillRect$I$I$I$I(this.x2, this.y, this.x - this.x2, this.y2 - this.y);
 else if (this.x < this.x2 && this.y > this.y2 ) g.fillRect$I$I$I$I(this.x, this.y2, this.x2 - this.x, this.y - this.y2);
 else g.fillRect$I$I$I$I(this.x2, this.y2, this.x - this.x2, this.y - this.y2);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 0;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
