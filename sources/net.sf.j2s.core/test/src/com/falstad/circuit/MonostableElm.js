(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "MonostableElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.prevInputValue = false;
this.retriggerable = false;
this.triggered = false;
this.lastRisingEdge = 0;
this.delay = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.prevInputValue = false;
this.retriggerable = false;
this.triggered = false;
this.lastRisingEdge = 0;
this.delay = 0.01;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.retriggerable =  Boolean.from(st.nextToken()).booleanValue();
this.delay =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "Monostable";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 2;
this.sizeY = 2;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [this.getPostCount()]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, ""]);
this.pins[0].clock = true;
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "Q"]);
this.pins[1].output = true;
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "Q"]);
this.pins[2].output = true;
this.pins[2].lineOver = true;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 2;
});

Clazz.newMeth(C$, 'execute', function () {
if (this.pins[0].value && this.prevInputValue != this.pins[0].value   && (this.retriggerable || !this.triggered ) ) {
this.lastRisingEdge = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t;
this.pins[1].value = true;
this.pins[2].value = false;
this.triggered = true;
}if (this.triggered && (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t > this.lastRisingEdge + this.delay  ) {
this.pins[1].value = false;
this.pins[2].value = true;
this.triggered = false;
}this.prevInputValue = this.pins[0].value;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.retriggerable + " " + new Double(this.delay).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 194;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 2) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Retriggerable", this.retriggerable]);
return ei;
}if (n == 3) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Period (s)", this.delay, 0.001, 0.1]);
return ei;
}return C$.superclazz.prototype.getEditInfo$I.apply(this, [n]);
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 2) {
this.retriggerable = ei.checkbox.getState();
}if (n == 3) {
this.delay = ei.value;
}C$.superclazz.prototype.setEditValue$I$com_falstad_circuit_EditInfo.apply(this, [n, ei]);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
