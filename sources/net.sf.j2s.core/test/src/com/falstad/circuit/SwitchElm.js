(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SwitchElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.momentary = false;
this.position = 0;
this.posCount = 0;
this.ps = null;
this.$ps2 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.momentary = false;
this.position = 0;
this.posCount = 2;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$Z', function (xx, yy, mm) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.position = (mm) ? 1 : 0;
this.momentary = mm;
this.posCount = 2;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
var str = st.nextToken();
if (str.compareTo$S("true") == 0) this.position = (Clazz.instanceOf(this, "com.falstad.circuit.LogicInputElm")) ? 0 : 1;
 else if (str.compareTo$S("false") == 0) this.position = (Clazz.instanceOf(this, "com.falstad.circuit.LogicInputElm")) ? 1 : 0;
 else this.position =  new Integer(str).intValue();
this.momentary =  Boolean.from(st.nextToken()).booleanValue();
this.posCount = 2;
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 's'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.position + " " + this.momentary ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.ps = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
this.$ps2 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var openhs = 16;
var hs1 = (this.position == 1) ? 0 : 2;
var hs2 = (this.position == 1) ? openhs : 2;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, openhs);
this.draw2Leads$java_awt_Graphics(g);
if (this.position == 0) this.doDots$java_awt_Graphics(g);
if (!this.needsHighlight()) g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.ps, 0, hs1);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.$ps2, 1, hs2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ps, this.$ps2);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
if (this.position == 1) this.current = 0;
});

Clazz.newMeth(C$, 'stamp', function () {
if (this.position == 0) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(this.nodes[0], this.nodes[1], this.voltSource, 0);
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return (this.position == 1) ? 0 : 1;
});

Clazz.newMeth(C$, 'mouseUp', function () {
if (this.momentary) this.toggle();
});

Clazz.newMeth(C$, 'toggle', function () {
this.position++;
if (this.position >= this.posCount) this.position = 0;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = (this.momentary) ? "push switch (SPST)" : "switch (SPST)";
if (this.position == 1) {
arr[1] = "open";
arr[2] = "Vd = " + P$.CircuitElm.getVoltageDText$D(this.getVoltageDiff());
} else {
arr[1] = "closed";
arr[2] = "V = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
arr[3] = "I = " + P$.CircuitElm.getCurrentDText$D(this.getCurrent());
}});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return this.position == 0;
});

Clazz.newMeth(C$, 'isWire', function () {
return true;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Momentary Switch", this.momentary]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.momentary = ei.checkbox.getState();
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 's'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
