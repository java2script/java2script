(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DFlipFlopElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_RESET = 0;
this.FLAG_SET = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_RESET = 2;
this.FLAG_SET = 4;
}, 1);

Clazz.newMeth(C$, 'hasReset', function () {
return (this.flags & 2) != 0 || this.hasSet() ;
});

Clazz.newMeth(C$, 'hasSet', function () {
return (this.flags & 4) != 0;
});

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.pins[2].value = !this.pins[1].value;
}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "D flip-flop";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "D"]);
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "Q"]);
this.pins[1].output = this.pins[1].state = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.hasSet() ? 1 : 2, 3, "Q"]);
this.pins[2].output = true;
this.pins[2].lineOver = true;
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, ""]);
this.pins[3].clock = true;
if (!this.hasSet()) {
if (this.hasReset()) this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "R"]);
} else {
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "S"]);
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "R"]);
}});

Clazz.newMeth(C$, 'getPostCount', function () {
return 4 + (this.hasReset() ? 1 : 0) + (this.hasSet() ? 1 : 0) ;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 2;
});

Clazz.newMeth(C$, 'reset', function () {
C$.superclazz.prototype.reset.apply(this, []);
this.volts[2] = 5;
this.pins[2].value = true;
});

Clazz.newMeth(C$, 'execute', function () {
if (this.pins[3].value && !this.lastClock ) {
this.pins[1].value = this.pins[0].value;
this.pins[2].value = !this.pins[0].value;
}if (this.hasSet() && this.pins[5].value ) {
this.pins[1].value = true;
this.pins[2].value = false;
}if (this.hasReset() && this.pins[4].value ) {
this.pins[1].value = false;
this.pins[2].value = true;
}this.lastClock = this.pins[3].value;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 155;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 2) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Reset Pin", this.hasReset()]);
return ei;
}if (n == 3) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Set Pin", this.hasSet()]);
return ei;
}return C$.superclazz.prototype.getEditInfo$I.apply(this, [n]);
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 2) {
if (ei.checkbox.getState()) this.flags = this.flags|(2);
 else this.flags = this.flags&(-3);
this.setupPins();
this.allocNodes();
this.setPoints();
}if (n == 3) {
if (ei.checkbox.getState()) this.flags = this.flags|(4);
 else this.flags = this.flags&(-5);
this.setupPins();
this.allocNodes();
this.setPoints();
}C$.superclazz.prototype.setEditValue$I$com_falstad_circuit_EditInfo.apply(this, [n, ei]);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
