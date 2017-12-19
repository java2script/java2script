(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ThermistorElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.minresistance = 0;
this.maxresistance = 0;
this.resistance = 0;
this.slider = null;
this.label = null;
this.ps3 = null;
this.ps4 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.maxresistance = 1.0E9;
this.minresistance = 1000.0;
this.createSlider();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.minresistance =  new Double(st.nextToken()).doubleValue();
this.maxresistance =  new Double(st.nextToken()).doubleValue();
this.createSlider();
}, 1);

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 192;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.minresistance).toString() + " " + new Double(this.maxresistance).toString() ;
});

Clazz.newMeth(C$, 'createSlider', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.add$java_awt_Component(this.label = Clazz.new_((I$[1]||(I$[1]=Clazz.load('a2s.Label'))).c$$S$I,["Temperature", 0]));
var value = 50;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.add$java_awt_Component(this.slider = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, value, 1, 0, 101]));
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.validate();
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.ps3 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
this.ps4 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, '$delete', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.remove$java_awt_Component(this.label);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.remove$java_awt_Component(this.slider);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 6);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var vd = this.volts[0] - this.volts[1];
this.current = vd / this.resistance;
});

Clazz.newMeth(C$, 'startIteration', function () {
var vd = this.volts[0] - this.volts[1];
this.resistance = this.minresistance;
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.resistance);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "spark gap";
this.getBasicInfo$SA(arr);
arr[3] = "R = " + P$.CircuitElm.getUnitText$D$S(this.resistance, P$.CirSim.ohmString);
arr[4] = "Ron = " + P$.CircuitElm.getUnitText$D$S(this.minresistance, P$.CirSim.ohmString);
arr[5] = "Roff = " + P$.CircuitElm.getUnitText$D$S(this.maxresistance, P$.CirSim.ohmString);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Min resistance (ohms)", this.minresistance, 0, 0]);
if (n == 1) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max resistance (ohms)", this.maxresistance, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (ei.value > 0  && n == 0 ) this.minresistance = ei.value;
if (ei.value > 0  && n == 1 ) this.maxresistance = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
