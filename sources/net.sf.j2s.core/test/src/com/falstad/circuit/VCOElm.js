(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "VCOElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cResistance = 0;
this.cCurrent = 0;
this.cDir = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.cResistance = 1000000.0;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "VCO";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = 4;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [6]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "Vi"]);
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 2, "Vo"]);
this.pins[1].output = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "C"]);
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "C"]);
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "R1"]);
this.pins[4].output = true;
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 3, "R2"]);
this.pins[5].output = true;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[1], this.pins[1].voltSource);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(this.nodes[0], this.nodes[4], this.pins[4].voltSource, 0);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(0, this.nodes[5], this.pins[5].voltSource, 5);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[2], this.nodes[3], 1000000.0);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[2]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[3]);
});

Clazz.newMeth(C$, 'doStep', function () {
var vc = this.volts[3] - this.volts[2];
var vo = this.volts[1];
var dir = (vo < 2.5 ) ? 1 : -1;
if (vo < 2.5  && vc > 4.5  ) {
vo = 5;
dir = -1;
}if (vo > 2.5  && vc < 0.5  ) {
vo = 0;
dir = 1;
}(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[1], this.pins[1].voltSource, vo);
var cur1 = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.nodeList.size() + this.pins[4].voltSource;
var cur2 = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.nodeList.size() + this.pins[5].voltSource;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[2], cur1, dir);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[2], cur2, dir);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[3], cur1, -dir);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[3], cur2, -dir);
this.cDir = dir;
});

Clazz.newMeth(C$, 'computeCurrent', function () {
if (false) return;
var c = this.cDir * (this.pins[4].current + this.pins[5].current) + (this.volts[3] - this.volts[2]) / 1000000.0;
this.pins[2].current = -c;
this.pins[3].current = c;
this.pins[0].current = -this.pins[4].current;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.computeCurrent();
this.drawChip$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 6;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 158;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
