(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DecadeElm", null, 'com.falstad.circuit.ChipElm');

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
return "decade counter";
});

Clazz.newMeth(C$, 'needsBits', function () {
return true;
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = this.bits > 2 ? this.bits : 2;
this.sizeY = 2;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, ""]);
this.pins[0].clock = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.sizeX - 1, 1, "R"]);
this.pins[1].bubble = true;
var i;
for (i = 0; i != this.bits; i++) {
var ii = i + 2;
this.pins[ii] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, i, 0, "Q" + i]);
this.pins[ii].output = this.pins[ii].state = true;
}
this.allocNodes();
});

Clazz.newMeth(C$, 'getPostCount', function () {
return this.bits + 2;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return this.bits;
});

Clazz.newMeth(C$, 'execute', function () {
var i;
if (this.pins[0].value && !this.lastClock ) {
for (i = 0; i != this.bits; i++) if (this.pins[i + 2].value) break;

if (i < this.bits) this.pins[i++ + 2].value = false;
i = i%(this.bits);
this.pins[i + 2].value = true;
}if (!this.pins[1].value) {
for (i = 1; i != this.bits; i++) this.pins[i + 2].value = false;

this.pins[2].value = true;
}this.lastClock = this.pins[0].value;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 163;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
