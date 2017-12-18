(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SRAMElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.data = Clazz.array(Short.TYPE, [256]);
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
var i;
for (i = ($s$[0] = 0, $s$[0]); i < 256; i++) this.data[i] = (0|0);

}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
var i;
for (i = ($s$[0] = 0, $s$[0]); i < 256; i++) this.data[i] = (0|0);

}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "SRAM";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 4;
this.sizeY = 9;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [19]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "A7"]);
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, "A6"]);
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "A5"]);
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 2, "A4"]);
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 4, 2, "A3"]);
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 5, 2, "A2"]);
this.pins[6] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 6, 2, "A1"]);
this.pins[7] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 7, 2, "A0"]);
this.pins[8] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 8, 2, "R"]);
this.pins[9] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 8, 3, "W"]);
this.pins[10] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 3, "D7"]);
this.pins[11] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 3, "D6"]);
this.pins[12] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 3, "D5"]);
this.pins[13] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 3, "D4"]);
this.pins[14] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 4, 3, "D3"]);
this.pins[15] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 5, 3, "D2"]);
this.pins[16] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 6, 3, "D1"]);
this.pins[17] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 7, 3, "D0"]);
this.pins[10].output = true;
this.pins[11].output = true;
this.pins[12].output = true;
this.pins[13].output = true;
this.pins[14].output = true;
this.pins[15].output = true;
this.pins[16].output = true;
this.pins[17].output = true;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 18;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 8;
});

Clazz.newMeth(C$, 'execute', function () {
var index = ($s$[0] = 0, $s$[0]);
if (this.pins[8].value || this.pins[9].value ) {
if (this.pins[0].value) index = ($s$[0] = index+(128), $s$[0]);
if (this.pins[1].value) index = ($s$[0] = index+(64), $s$[0]);
if (this.pins[2].value) index = ($s$[0] = index+(32), $s$[0]);
if (this.pins[3].value) index = ($s$[0] = index+(16), $s$[0]);
if (this.pins[4].value) index = ($s$[0] = index+(8), $s$[0]);
if (this.pins[5].value) index = ($s$[0] = index+(4), $s$[0]);
if (this.pins[6].value) index = ($s$[0] = index+(2), $s$[0]);
if (this.pins[7].value) index = ($s$[0] = index+(1), $s$[0]);
if (this.pins[8].value) {
if ((this.data[index] & 128) > 0) this.pins[10].value = true;
 else this.pins[10].value = false;
if ((this.data[index] & 64) > 0) this.pins[11].value = true;
 else this.pins[11].value = false;
if ((this.data[index] & 32) > 0) this.pins[12].value = true;
 else this.pins[12].value = false;
if ((this.data[index] & 16) > 0) this.pins[13].value = true;
 else this.pins[13].value = false;
if ((this.data[index] & 8) > 0) this.pins[14].value = true;
 else this.pins[14].value = false;
if ((this.data[index] & 4) > 0) this.pins[15].value = true;
 else this.pins[15].value = false;
if ((this.data[index] & 2) > 0) this.pins[16].value = true;
 else this.pins[16].value = false;
if ((this.data[index] & 1) > 0) this.pins[17].value = true;
 else this.pins[17].value = false;
} else {
this.data[index] = (0|0);
if (this.pins[10].value) this.data[index] = (this.data[index]+(128)|0);
if (this.pins[11].value) this.data[index] = (this.data[index]+(64)|0);
if (this.pins[12].value) this.data[index] = (this.data[index]+(32)|0);
if (this.pins[13].value) this.data[index] = (this.data[index]+(16)|0);
if (this.pins[14].value) this.data[index] = (this.data[index]+(8)|0);
if (this.pins[15].value) this.data[index] = (this.data[index]+(4)|0);
if (this.pins[16].value) this.data[index] = (this.data[index]+(2)|0);
if (this.pins[17].value) this.data[index] = (this.data[index]+(1)|0);
}}});

Clazz.newMeth(C$, 'doStep', function () {
var i;
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (p.output && this.pins[9].value ) p.value = this.volts[i] > 2.5 ;
if (!p.output) p.value = this.volts[i] > 2.5 ;
}
this.execute();
for (i = 0; i != this.getPostCount(); i++) {
var p = this.pins[i];
if (p.output && !this.pins[9].value ) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[i], p.voltSource, p.value ? 5 : 0);
}
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 204;
});
var $s$ = new Int16Array(1);

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
