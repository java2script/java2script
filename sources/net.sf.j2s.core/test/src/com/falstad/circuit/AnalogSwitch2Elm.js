(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "AnalogSwitch2Elm", null, 'com.falstad.circuit.AnalogSwitchElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.openhs = 0;
this.swposts = null;
this.swpoles = null;
this.ctlPoint = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.openhs = 16;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.swposts = this.newPointArray$I(2);
this.swpoles = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.swpoles[0], this.swpoles[1], 1, 16);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.swposts[0], this.swposts[1], 1, 16);
this.ctlPoint = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0.5, 16);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 4;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 16);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.swpoles[0], this.swposts[0]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.swpoles[1], this.swposts[1]);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
var position = (this.open) ? 1 : 0;
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead1, this.swpoles[position]);
this.updateDotCount();
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.swpoles[position], this.swposts[position], this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 3) ? this.ctlPoint : this.swposts[n - 1];
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 160;
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
if (this.open) this.current = (this.volts[0] - this.volts[2]) / this.r_on;
 else this.current = (this.volts[0] - this.volts[1]) / this.r_on;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[2]);
});

Clazz.newMeth(C$, 'doStep', function () {
this.open = (this.volts[3] < 2.5 );
if ((this.flags & 1) != 0) this.open = !this.open;
if (this.open) {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[2], this.r_on);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.r_off);
} else {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.r_on);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[2], this.r_off);
}});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
if (n1 == 3 || n2 == 3 ) return false;
return true;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "analog switch (SPDT)";
arr[1] = "I = " + P$.CircuitElm.getCurrentDText$D(this.getCurrent());
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
