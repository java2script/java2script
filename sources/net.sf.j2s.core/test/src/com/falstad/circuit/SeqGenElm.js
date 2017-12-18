(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SeqGenElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = 0;
this.position = 0;
this.oneshot = false;
this.lastchangetime = 0;
this.clockstate = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = ($s$[0] = 0, $s$[0]);
this.position = ($b$[0] = 0, $b$[0]);
this.oneshot = false;
this.lastchangetime = 0;
this.clockstate = false;
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
this.data = ($s$[0] = (( new Integer(st.nextToken()).intValue())|0), $s$[0]);
if (st.hasMoreTokens()) {
this.oneshot =  Boolean.from(st.nextToken()).booleanValue();
this.position = ($b$[0] = 8, $b$[0]);
}}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "Sequence generator";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = 2;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, ""]);
this.pins[0].clock = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "Q"]);
this.pins[1].output = true;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 2;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'GetNextBit', function () {
if (((this.data >>> this.position) & 1) != 0) this.pins[1].value = true;
 else this.pins[1].value = false;
this.position++;
});

Clazz.newMeth(C$, 'execute', function () {
if (this.oneshot) {
if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t - this.lastchangetime > 0.005 ) {
if (this.position <= 8) this.GetNextBit();
this.lastchangetime = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t;
}}if (this.pins[0].value && !this.clockstate ) {
this.clockstate = true;
if (this.oneshot) {
this.position = ($b$[0] = 0, $b$[0]);
} else {
this.GetNextBit();
if (this.position >= 8) this.position = ($b$[0] = 0, $b$[0]);
}}if (!this.pins[0].value) this.clockstate = false;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 188;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.data + " " + this.oneshot ;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 0 set", (this.data & 1) != 0]);
return ei;
}if (n == 1) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 1 set", (this.data & 2) != 0]);
return ei;
}if (n == 2) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 2 set", (this.data & 4) != 0]);
return ei;
}if (n == 3) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 3 set", (this.data & 8) != 0]);
return ei;
}if (n == 4) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 4 set", (this.data & 16) != 0]);
return ei;
}if (n == 5) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 5 set", (this.data & 32) != 0]);
return ei;
}if (n == 6) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 6 set", (this.data & 64) != 0]);
return ei;
}if (n == 7) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bit 7 set", (this.data & 128) != 0]);
return ei;
}if (n == 8) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["One shot", this.oneshot]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(1), $s$[0]);
 else this.data = ($s$[0] = this.data&(-2), $s$[0]);
this.setPoints();
}if (n == 1) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(2), $s$[0]);
 else this.data = ($s$[0] = this.data&(-3), $s$[0]);
this.setPoints();
}if (n == 2) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(4), $s$[0]);
 else this.data = ($s$[0] = this.data&(-5), $s$[0]);
this.setPoints();
}if (n == 3) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(8), $s$[0]);
 else this.data = ($s$[0] = this.data&(-9), $s$[0]);
this.setPoints();
}if (n == 4) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(16), $s$[0]);
 else this.data = ($s$[0] = this.data&(-17), $s$[0]);
this.setPoints();
}if (n == 5) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(32), $s$[0]);
 else this.data = ($s$[0] = this.data&(-33), $s$[0]);
this.setPoints();
}if (n == 6) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(64), $s$[0]);
 else this.data = ($s$[0] = this.data&(-65), $s$[0]);
this.setPoints();
}if (n == 7) {
if (ei.checkbox.getState()) this.data = ($s$[0] = this.data|(128), $s$[0]);
 else this.data = ($s$[0] = this.data&(-129), $s$[0]);
this.setPoints();
}if (n == 8) {
if (ei.checkbox.getState()) {
this.oneshot = true;
this.position = ($b$[0] = 8, $b$[0]);
} else {
this.position = ($b$[0] = 0, $b$[0]);
this.oneshot = false;
}}});
var $s$ = new Int16Array(1);
var $b$ = new Int8Array(1);

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
