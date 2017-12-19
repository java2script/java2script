(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "JKFlipFlopElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_RESET = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_RESET = 2;
}, 1);

Clazz.newMeth(C$, 'hasReset', function () {
return (this.flags & 2) != 0;
});

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.pins[4].value = !this.pins[3].value;
}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "JK flip-flop";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "J"]);
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, ""]);
this.pins[1].clock = true;
this.pins[1].bubble = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "K"]);
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "Q"]);
this.pins[3].output = this.pins[3].state = true;
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "Q"]);
this.pins[4].output = true;
this.pins[4].lineOver = true;
if (this.hasReset()) {
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "R"]);
}});

Clazz.newMeth(C$, 'getPostCount', function () {
return 5 + (this.hasReset() ? 1 : 0);
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 2;
});

Clazz.newMeth(C$, 'execute', function () {
if (!this.pins[1].value && this.lastClock ) {
var q = this.pins[3].value;
if (this.pins[0].value) {
if (this.pins[2].value) q = !q;
 else q = true;
} else if (this.pins[2].value) q = false;
this.pins[3].value = q;
this.pins[4].value = !q;
}this.lastClock = this.pins[1].value;
if (this.hasReset()) {
if (this.pins[5].value) {
this.pins[3].value = false;
this.pins[4].value = true;
}}});

Clazz.newMeth(C$, 'getDumpType', function () {
return 156;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 2) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Reset Pin", this.hasReset()]);
return ei;
}return C$.superclazz.prototype.getEditInfo$I.apply(this, [n]);
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 2) {
if (ei.checkbox.getState()) {
this.flags = this.flags|(2);
} else {
this.flags = this.flags&(-3);
}this.setupPins();
this.allocNodes();
this.setPoints();
}C$.superclazz.prototype.setEditValue$I$com_falstad_circuit_EditInfo.apply(this, [n, ei]);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
