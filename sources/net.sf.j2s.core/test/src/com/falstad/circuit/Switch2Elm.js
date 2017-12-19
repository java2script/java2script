(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "Switch2Elm", null, 'com.falstad.circuit.SwitchElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.link = 0;
this.openhs = 0;
this.swposts = null;
this.swpoles = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.openhs = 16;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I$Z.apply(this, [xx, yy, false]);
C$.$init$.apply(this);
this.noDiagonal = true;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$Z', function (xx, yy, mm) {
C$.superclazz.c$$I$I$Z.apply(this, [xx, yy, mm]);
C$.$init$.apply(this);
this.noDiagonal = true;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.link =  new Integer(st.nextToken()).intValue();
this.noDiagonal = true;
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'S'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.link ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.swposts = this.newPointArray$I(2);
this.swpoles = this.newPointArray$I(3);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.swpoles[0], this.swpoles[1], 1, 16);
this.swpoles[2] = this.lead2;
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.swposts[0], this.swposts[1], 1, 16);
this.posCount = this.hasCenterOff() ? 3 : 2;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 16);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.swpoles[0], this.swposts[0]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.swpoles[1], this.swposts[1]);
if (!this.needsHighlight()) g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead1, this.swpoles[this.position]);
this.updateDotCount();
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
if (this.position != 2) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.swpoles[this.position], this.swposts[this.position], this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : this.swposts[n - 1];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
if (this.position == 2) this.current = 0;
});

Clazz.newMeth(C$, 'stamp', function () {
if (this.position == 2) return;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(this.nodes[0], this.nodes[this.position + 1], this.voltSource, 0);
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return (this.position == 2) ? 0 : 1;
});

Clazz.newMeth(C$, 'toggle', function () {
C$.superclazz.prototype.toggle.apply(this, []);
if (this.link != 0) {
var i;
for (i = 0; i != (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.elmList.size(); i++) {
var o = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.elmList.elementAt$I(i);
if (Clazz.instanceOf(o, "com.falstad.circuit.Switch2Elm")) {
var s2 = o;
if (s2.link == this.link) s2.position = this.position;
}}
}});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
if (this.position == 2) return false;
return this.comparePair$I$I$I$I(n1, n2, 0, 1 + this.position);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = (this.link == 0) ? "switch (SPDT)" : "switch (DPDT)";
arr[1] = "I = " + P$.CircuitElm.getCurrentDText$D(this.getCurrent());
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 1) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Center Off", this.hasCenterOff()]);
return ei;
}return C$.superclazz.prototype.getEditInfo$I.apply(this, [n]);
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 1) {
this.flags = this.flags&(-2);
if (ei.checkbox.getState()) this.flags = this.flags|(1);
if (this.hasCenterOff()) this.momentary = false;
this.setPoints();
} else C$.superclazz.prototype.setEditValue$I$com_falstad_circuit_EditInfo.apply(this, [n, ei]);
});

Clazz.newMeth(C$, 'hasCenterOff', function () {
return (this.flags & 1) != 0;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'S'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
