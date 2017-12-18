(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ADCElm", null, 'com.falstad.circuit.ChipElm');

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
return "ADC";
});

Clazz.newMeth(C$, 'needsBits', function () {
return true;
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = this.bits > 2 ? this.bits : 2;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
var i;
for (i = 0; i != this.bits; i++) {
this.pins[i] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.bits - 1 - i , 3, "D" + i]);
this.pins[i].output = true;
}
this.pins[this.bits] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "In"]);
this.pins[this.bits + 1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.sizeY - 1, 2, "V+"]);
this.allocNodes();
});

Clazz.newMeth(C$, 'execute', function () {
var imax = (1 << this.bits) - 1;
var val = imax * this.volts[this.bits] / this.volts[this.bits + 1];
var ival = (val|0);
ival = P$.CircuitElm.min$I$I(imax, P$.CircuitElm.max$I$I(0, ival));
var i;
for (i = 0; i != this.bits; i++) this.pins[i].value = ((ival & (1 << i)) != 0);

});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return this.bits;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return this.bits + 2;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 167;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
