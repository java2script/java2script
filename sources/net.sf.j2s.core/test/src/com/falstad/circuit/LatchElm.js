(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "LatchElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.loadPin = 0;
this.lastLoad = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.lastLoad = false;
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
return "Latch";
});

Clazz.newMeth(C$, 'needsBits', function () {
return true;
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = this.bits + 1;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
var i;
for (i = 0; i != this.bits; i++) this.pins[i] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.bits - 1 - i , 2, "I" + i]);

for (i = 0; i != this.bits; i++) {
this.pins[i + this.bits] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.bits - 1 - i , 3, "O"]);
this.pins[i + this.bits].output = true;
}
this.pins[this.loadPin = this.bits * 2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.bits, 2, "Ld"]);
this.allocNodes();
});

Clazz.newMeth(C$, 'execute', function () {
var i;
if (this.pins[this.loadPin].value && !this.lastLoad ) for (i = 0; i != this.bits; i++) this.pins[i + this.bits].value = this.pins[i].value;

this.lastLoad = this.pins[this.loadPin].value;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return this.bits;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return this.bits * 2 + 1;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 168;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
