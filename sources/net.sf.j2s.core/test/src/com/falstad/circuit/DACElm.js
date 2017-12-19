(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DACElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
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
return "DAC";
});

Clazz.newMeth(C$, 'needsBits', function () {
return true;
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = this.bits > 2 ? this.bits : 2;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
var i;
for (i = 0; i != this.bits; i++) this.pins[i] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.bits - 1 - i , 2, "D" + i]);

this.pins[this.bits] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "O"]);
this.pins[this.bits].output = true;
this.pins[this.bits + 1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.sizeY - 1, 3, "V+"]);
this.allocNodes();
});

Clazz.newMeth(C$, 'doStep', function () {
var ival = 0;
var i;
for (i = 0; i != this.bits; i++) if (this.volts[i] > 2.5 ) ival = ival|(1 << i);

var ivalmax = (1 << this.bits) - 1;
var v = ival * this.volts[this.bits + 1] / ivalmax;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[this.bits], this.pins[this.bits].voltSource, v);
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return this.bits + 2;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 166;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
