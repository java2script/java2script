(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "LEDElm", null, 'com.falstad.circuit.DiodeElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.colorR = 0;
this.colorG = 0;
this.colorB = 0;
this.ledLead1 = null;
this.ledLead2 = null;
this.ledCenter = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.fwdrop = 2.1024259;
this.setup();
this.colorR = 1;
this.colorG = this.colorB = 0;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
if ((f & 1) == 0) this.fwdrop = 2.1024259;
this.setup();
this.colorR =  new Double(st.nextToken()).doubleValue();
this.colorG =  new Double(st.nextToken()).doubleValue();
this.colorB =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 162;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.colorR).toString() + " " + new Double(this.colorG).toString() + " " + new Double(this.colorB).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var cr = 12;
this.ledLead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 - cr / this.dn);
this.ledLead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + cr / this.dn);
this.ledCenter = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
if (this.needsHighlight() || this === (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm  ) {
C$.superclazz.prototype.draw$java_awt_Graphics.apply(this, [g]);
return;
}this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.ledLead1);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ledLead2, this.point2);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
var cr = 12;
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.ledCenter.x, this.ledCenter.y, cr);
cr = cr-(4);
var w = 255 * this.current / 0.01;
if (w > 255 ) w = 255;
var cc = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[((this.colorR * w)|0), ((this.colorG * w)|0), ((this.colorB * w)|0)]);
g.setColor$java_awt_Color(cc);
g.fillOval$I$I$I$I(this.ledCenter.x - cr, this.ledCenter.y - cr, cr * 2, cr * 2);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, cr);
this.updateDotCount();
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.ledLead1, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point2, this.ledLead2, -this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
C$.superclazz.prototype.getInfo$SA.apply(this, [arr]);
arr[0] = "LED";
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return C$.superclazz.prototype.getEditInfo$I.apply(this, [n]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Red Value (0-1)", this.colorR, 0, 1]).setDimensionless();
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Green Value (0-1)", this.colorG, 0, 1]).setDimensionless();
if (n == 3) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Blue Value (0-1)", this.colorB, 0, 1]).setDimensionless();
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) C$.superclazz.prototype.setEditValue$I$com_falstad_circuit_EditInfo.apply(this, [0, ei]);
if (n == 1) this.colorR = ei.value;
if (n == 2) this.colorG = ei.value;
if (n == 3) this.colorB = ei.value;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'l'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
