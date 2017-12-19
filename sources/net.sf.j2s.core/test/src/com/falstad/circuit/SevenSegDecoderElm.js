(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SevenSegDecoderElm", null, 'com.falstad.circuit.ChipElm');
C$.symbols = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.symbols = Clazz.array(Boolean.TYPE, -2, [Clazz.array(Boolean.TYPE, -1, [true, true, true, true, true, true, false]), Clazz.array(Boolean.TYPE, -1, [false, true, true, false, false, false, false]), Clazz.array(Boolean.TYPE, -1, [true, true, false, true, true, false, true]), Clazz.array(Boolean.TYPE, -1, [true, true, true, true, false, false, true]), Clazz.array(Boolean.TYPE, -1, [false, true, true, false, false, true, true]), Clazz.array(Boolean.TYPE, -1, [true, false, true, true, false, true, true]), Clazz.array(Boolean.TYPE, -1, [true, false, true, true, true, true, true]), Clazz.array(Boolean.TYPE, -1, [true, true, true, false, false, false, false]), Clazz.array(Boolean.TYPE, -1, [true, true, true, true, true, true, true]), Clazz.array(Boolean.TYPE, -1, [true, true, true, false, false, true, true]), Clazz.array(Boolean.TYPE, -1, [true, true, true, false, true, true, true]), Clazz.array(Boolean.TYPE, -1, [false, false, true, true, true, true, true]), Clazz.array(Boolean.TYPE, -1, [true, false, false, true, true, true, false]), Clazz.array(Boolean.TYPE, -1, [false, true, true, true, true, false, true]), Clazz.array(Boolean.TYPE, -1, [true, false, false, true, true, true, true]), Clazz.array(Boolean.TYPE, -1, [true, false, false, false, true, true, true])]);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'hasReset', function () {
return false;
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
return "Seven Segment LED Decoder";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 3;
this.sizeY = 7;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[7] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "I3"]);
this.pins[8] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, "I2"]);
this.pins[9] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "I1"]);
this.pins[10] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 2, "I0"]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "a"]);
this.pins[0].output = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "b"]);
this.pins[1].output = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "c"]);
this.pins[2].output = true;
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 3, "d"]);
this.pins[3].output = true;
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 4, 3, "e"]);
this.pins[4].output = true;
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 5, 3, "f"]);
this.pins[5].output = true;
this.pins[6] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 6, 3, "g"]);
this.pins[6].output = true;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 11;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 7;
});

Clazz.newMeth(C$, 'execute', function () {
var input = 0;
if (this.pins[7].value) input = input+(8);
if (this.pins[8].value) input = input+(4);
if (this.pins[9].value) input = input+(2);
if (this.pins[10].value) input = input+(1);
for (var i = 0; i < 7; i++) {
this.pins[i].value = C$.symbols[input][i];
}
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 197;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
