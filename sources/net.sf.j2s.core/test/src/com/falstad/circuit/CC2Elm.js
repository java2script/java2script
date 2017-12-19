(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "CC2Elm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.gain = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.gain = 1;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I', function (xx, yy, g) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.gain = g;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.gain =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.gain).toString() ;
});

Clazz.newMeth(C$, 'getChipName', function () {
return "CC2";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [3]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "X"]);
this.pins[0].output = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "Y"]);
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "Z"]);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = (this.gain == 1 ) ? "CCII+" : "CCII-";
arr[1] = "X,Y = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
arr[2] = "Z = " + P$.CircuitElm.getVoltageText$D(this.volts[2]);
arr[3] = "I = " + P$.CircuitElm.getCurrentText$D(this.pins[0].current);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[0], this.pins[0].voltSource);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCVS$I$I$D$I(0, this.nodes[1], 1, this.pins[0].voltSource);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCCCS$I$I$I$D(0, this.nodes[2], this.pins[0].voltSource, this.gain);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.pins[2].current = this.pins[0].current * this.gain;
this.drawChip$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 179;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
