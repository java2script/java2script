(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TimerElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_RESET = 0;
this.N_DIS = 0;
this.N_TRIG = 0;
this.N_THRES = 0;
this.N_VIN = 0;
this.N_CTL = 0;
this.N_OUT = 0;
this.N_RST = 0;
this.setOut = false;
this.out = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_RESET = 2;
this.N_DIS = 0;
this.N_TRIG = 1;
this.N_THRES = 2;
this.N_VIN = 3;
this.N_CTL = 4;
this.N_OUT = 5;
this.N_RST = 6;
}, 1);

Clazz.newMeth(C$, 'getDefaultFlags', function () {
return 2;
});

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "555 Timer";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 3;
this.sizeY = 5;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [7]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, "dis"]);
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 2, "tr"]);
this.pins[1].lineOver = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 4, 2, "th"]);
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 0, "Vin"]);
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 1, "ctl"]);
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "out"]);
this.pins[5].output = this.pins[5].state = true;
this.pins[6] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "rst"]);
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'hasReset', function () {
return (this.flags & 2) != 0;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[3], this.nodes[4], 5000);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[4], 0, 10000);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[5], this.pins[5].voltSource);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.pins[3].current = (this.volts[4] - this.volts[3]) / 5000;
this.pins[4].current = -this.volts[4] / 10000 - this.pins[3].current;
this.pins[0].current = (!this.out && !this.setOut ) ? -this.volts[0] / 10 : 0;
});

Clazz.newMeth(C$, 'startIteration', function () {
this.out = this.volts[5] > this.volts[3] / 2 ;
this.setOut = false;
if (this.volts[4] / 2 > this.volts[1] ) this.setOut = this.out = true;
if (this.volts[2] > this.volts[4]  || (this.hasReset() && this.volts[6] < 0.7  ) ) this.out = false;
});

Clazz.newMeth(C$, 'doStep', function () {
if (!this.out && !this.setOut ) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], 0, 10);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[5], this.pins[5].voltSource, this.out ? this.volts[3] : 0);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return this.hasReset() ? 7 : 6;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 165;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
