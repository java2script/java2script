(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "CounterElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_ENABLE = 0;
this.invertreset = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_ENABLE = 2;
this.invertreset = false;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
if (st.hasMoreTokens()) this.invertreset =  Boolean.from(st.nextToken()).booleanValue();
 else this.invertreset = true;
this.pins[1].bubble = this.invertreset;
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.invertreset ;
});

Clazz.newMeth(C$, 'needsBits', function () {
return true;
});

Clazz.newMeth(C$, 'getChipName', function () {
return "Counter";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = this.bits > 2 ? this.bits : 2;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, ""]);
this.pins[0].clock = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.sizeY - 1, 2, "R"]);
this.pins[1].bubble = this.invertreset;
var i;
for (i = 0; i != this.bits; i++) {
var ii = i + 2;
this.pins[ii] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, i, 3, "Q" + (this.bits - i - 1 )]);
this.pins[ii].output = this.pins[ii].state = true;
}
if (this.hasEnable()) this.pins[this.bits + 2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, this.sizeY - 2, 2, "En"]);
this.allocNodes();
});

Clazz.newMeth(C$, 'getPostCount', function () {
if (this.hasEnable()) return this.bits + 3;
return this.bits + 2;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Flip X", (this.flags & 1024) != 0]);
return ei;
}if (n == 1) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Flip Y", (this.flags & 2048) != 0]);
return ei;
}if (n == 2) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Invert reset pin", this.invertreset]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState()) this.flags = this.flags|(1024);
 else this.flags = this.flags&(-1025);
this.setPoints();
}if (n == 1) {
if (ei.checkbox.getState()) this.flags = this.flags|(2048);
 else this.flags = this.flags&(-2049);
this.setPoints();
}if (n == 2) {
if (ei.checkbox.getState()) {
this.invertreset = true;
this.pins[1].bubble = true;
} else {
this.invertreset = false;
this.pins[1].bubble = false;
}this.setPoints();
}});

Clazz.newMeth(C$, 'hasEnable', function () {
return (this.flags & 2) != 0;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return this.bits;
});

Clazz.newMeth(C$, 'execute', function () {
var en = true;
if (this.hasEnable()) en = this.pins[this.bits + 2].value;
if (this.pins[0].value && !this.lastClock && en  ) {
var i;
for (i = this.bits - 1; i >= 0; i--) {
var ii = i + 2;
if (!this.pins[ii].value) {
this.pins[ii].value = true;
break;
}this.pins[ii].value = false;
}
}if (!this.pins[1].value == this.invertreset ) {
var i;
for (i = 0; i != this.bits; i++) this.pins[i + 2].value = false;

}this.lastClock = this.pins[0].value;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 164;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
