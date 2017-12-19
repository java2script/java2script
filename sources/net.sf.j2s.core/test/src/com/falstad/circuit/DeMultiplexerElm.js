(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DeMultiplexerElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
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
return "Multiplexer";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 3;
this.sizeY = 5;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "Q0"]);
this.pins[0].output = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "Q1"]);
this.pins[1].output = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "Q2"]);
this.pins[2].output = true;
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 3, "Q3"]);
this.pins[3].output = true;
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 1, "S0"]);
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 1, "S1"]);
this.pins[6] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "Q"]);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 7;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 4;
});

Clazz.newMeth(C$, 'execute', function () {
var selectedvalue = 0;
if (this.pins[4].value) selectedvalue++;
if (this.pins[5].value) selectedvalue = selectedvalue+(2);
for (var i = 0; i < 4; i++) this.pins[i].value = false;

this.pins[selectedvalue].value = this.pins[6].value;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 185;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
