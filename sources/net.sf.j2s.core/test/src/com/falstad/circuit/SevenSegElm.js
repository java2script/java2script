(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SevenSegElm", null, 'com.falstad.circuit.ChipElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.darkred = null;
}, 1);

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
return "7-segment driver/display";
});

Clazz.newMeth(C$, 'setupPins', function () {
this.darkred = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).c$$I$I$I,[30, 0, 0]);
this.sizeX = 4;
this.sizeY = 4;
this.pins = Clazz.array((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))), [7]);
this.pins[0] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 0, 2, "a"]);
this.pins[1] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 2, "b"]);
this.pins[2] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 2, "c"]);
this.pins[3] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 2, "d"]);
this.pins[4] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 1, 1, "e"]);
this.pins[5] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 2, 1, "f"]);
this.pins[6] = Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.circuit.ChipElm').Pin))).c$$I$I$S, [this, null, 3, 1, "g"]);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.drawChip$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).red);
var xl = this.x + this.cspc * 5;
var yl = this.y + this.cspc;
this.setColor$java_awt_Graphics$I(g, 0);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl, yl, xl + this.cspc, yl);
this.setColor$java_awt_Graphics$I(g, 1);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl + this.cspc, yl, xl + this.cspc, yl + this.cspc);
this.setColor$java_awt_Graphics$I(g, 2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl + this.cspc, yl + this.cspc, xl + this.cspc, yl + this.cspc2);
this.setColor$java_awt_Graphics$I(g, 3);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl, yl + this.cspc2, xl + this.cspc, yl + this.cspc2);
this.setColor$java_awt_Graphics$I(g, 4);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl, yl + this.cspc, xl, yl + this.cspc2);
this.setColor$java_awt_Graphics$I(g, 5);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl, yl, xl, yl + this.cspc);
this.setColor$java_awt_Graphics$I(g, 6);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xl, yl + this.cspc, xl + this.cspc, yl + this.cspc);
});

Clazz.newMeth(C$, 'setColor$java_awt_Graphics$I', function (g, p) {
g.setColor$java_awt_Color(this.pins[p].value ? (I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).red : (I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.printableCheckItem.getState() ? (I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).white : this.darkred);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 7;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 0;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 157;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
