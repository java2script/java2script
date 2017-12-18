(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "LEDMatrixElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.negateRows = false;
this.negateColumns = false;
this.colorR = 0;
this.colorG = 0;
this.colorB = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.negateRows = false;
this.negateColumns = false;
this.colorR = 1.0;
this.colorG = 0.0;
this.colorB = 0.0;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.negateRows =  Boolean.from(st.nextToken()).booleanValue();
this.negateColumns =  Boolean.from(st.nextToken()).booleanValue();
this.colorR =  new Double(st.nextToken()).doubleValue();
this.colorG =  new Double(st.nextToken()).doubleValue();
this.colorB =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'getChipName', function () {
return "LED Matrix";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.sizeX = 8;
this.sizeY = 8;
this.pins = Clazz.array((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [16]);
this.pins[0] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, ""]);
this.pins[1] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, ""]);
this.pins[2] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, ""]);
this.pins[3] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 2, ""]);
this.pins[4] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 4, 2, ""]);
this.pins[5] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 5, 2, ""]);
this.pins[6] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 6, 2, ""]);
this.pins[7] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 7, 2, ""]);
this.pins[8] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 1, ""]);
this.pins[9] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 1, ""]);
this.pins[10] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 1, ""]);
this.pins[11] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 1, ""]);
this.pins[12] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 4, 1, ""]);
this.pins[13] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 5, 1, ""]);
this.pins[14] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 6, 1, ""]);
this.pins[15] = Clazz.new_((I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 7, 1, ""]);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.drawChip$java_awt_Graphics(g);
var color = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).c$$I$I$I,[((this.colorR * 255)|0), ((this.colorG * 255)|0), ((this.colorB * 255)|0)]);
for (var col = 0; col < 8; col++) for (var row = 0; row < 8; row++) {
var centreX = this.x + 2 * (col + 1) * this.cspc ;
var centreY = this.y + 2 * row * this.cspc ;
var radius = (this.cspc/2|0);
if ((!!(this.negateRows ^ this.pins[row].value)) && (!!(this.negateColumns ^ this.pins[col + 8].value)) ) {
g.setColor$java_awt_Color(color);
g.fillOval$I$I$I$I(centreX - radius, centreY - radius, radius * 2, radius * 2);
}g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
radius = ((3 * this.cspc)/4|0);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, centreX, centreY, radius);
}

});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 2) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Negate rows", this.negateRows]);
return ei;
}if (n == 3) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Negate columns", this.negateColumns]);
return ei;
}if (n == 4) {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Red Value (0-1)", this.colorR, 0, 1]).setDimensionless();
}if (n == 5) {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Green Value (0-1)", this.colorG, 0, 1]).setDimensionless();
}if (n == 6) {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Blue Value (0-1)", this.colorB, 0, 1]).setDimensionless();
}return C$.superclazz.prototype.getEditInfo$I.apply(this, [n]);
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
C$.superclazz.prototype.setEditValue$I$com_falstad_circuit_EditInfo.apply(this, [n, ei]);
if (n == 2) this.negateRows = ei.checkbox.getState();
if (n == 3) this.negateColumns = ei.checkbox.getState();
if (n == 4) this.colorR = ei.value;
if (n == 5) this.colorG = ei.value;
if (n == 6) this.colorB = ei.value;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 16;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 0;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 207;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.negateRows + " " + this.negateColumns + " " + new Double(this.colorR).toString() + " " + new Double(this.colorG).toString() + " " + new Double(this.colorB).toString() ;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
