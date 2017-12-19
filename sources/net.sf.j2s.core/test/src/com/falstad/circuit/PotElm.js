(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "PotElm", null, 'com.falstad.circuit.CircuitElm', 'java.awt.event.AdjustmentListener');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.position = 0;
this.maxResistance = 0;
this.resistance1 = 0;
this.resistance2 = 0;
this.current1 = 0;
this.current2 = 0;
this.current3 = 0;
this.curcount1 = 0;
this.curcount2 = 0;
this.curcount3 = 0;
this.slider = null;
this.label = null;
this.sliderText = null;
this.post3 = null;
this.corner2 = null;
this.arrowPoint = null;
this.midpoint = null;
this.arrow1 = null;
this.arrow2 = null;
this.ps3 = null;
this.ps4 = null;
this.bodyLen = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.setup();
this.maxResistance = 1000;
this.position = 0.5;
this.sliderText = "Resistance";
this.createSlider();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.maxResistance =  new Double(st.nextToken()).doubleValue();
this.position =  new Double(st.nextToken()).doubleValue();
this.sliderText = st.nextToken();
while (st.hasMoreTokens())this.sliderText += ' ' + st.nextToken();

this.createSlider();
}, 1);

Clazz.newMeth(C$, 'setup', function () {
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 174;
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : this.post3;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.maxResistance).toString() + " " + new Double(this.position).toString() + " " + this.sliderText ;
});

Clazz.newMeth(C$, 'createSlider', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.add$java_awt_Component(this.label = Clazz.new_((I$[1]||(I$[1]=Clazz.load('a2s.Label'))).c$$S$I,[this.sliderText, 0]));
var value = ((this.position * 100)|0);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.add$java_awt_Component(this.slider = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, value, 1, 0, 101]));
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.validate();
this.slider.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.analyzeFlag = true;
this.setPoints();
});

Clazz.newMeth(C$, '$delete', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.remove$java_awt_Component(this.label);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.remove$java_awt_Component(this.slider);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var offset = 0;
if (P$.CircuitElm.abs$I(this.dx) > P$.CircuitElm.abs$I(this.dy)) {
this.dx = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I((this.dx/2|0)) * 2;
this.point2.x = this.x2 = this.point1.x + this.dx;
offset = (this.dx < 0) ? this.dy : -this.dy;
this.point2.y = this.point1.y;
} else {
this.dy = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I((this.dy/2|0)) * 2;
this.point2.y = this.y2 = this.point1.y + this.dy;
offset = (this.dy > 0) ? this.dx : -this.dx;
this.point2.x = this.point1.x;
}if (offset == 0) offset = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize;
this.dn = P$.CircuitElm.distance$java_awt_Point$java_awt_Point(this.point1, this.point2);
var bodyLen = 32;
this.calcLeads$I(bodyLen);
this.position = this.slider.getValue() * 0.0099 + 0.005;
var soff = (((this.position - 0.5) * bodyLen)|0);
this.post3 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0.5, offset);
this.corner2 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, soff / this.dn + 0.5, offset);
this.arrowPoint = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, soff / this.dn + 0.5, 8 * P$.CircuitElm.sign$I(offset));
this.midpoint = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, soff / this.dn + 0.5);
this.arrow1 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
this.arrow2 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
var clen = P$.CircuitElm.abs$I(offset) - 8;
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.corner2, this.arrowPoint, this.arrow1, this.arrow2, (clen - 8) / clen, 8);
this.ps3 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
this.ps4 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var segments = 16;
var i;
var ox = 0;
var hs = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.euroResistorCheckItem.getState() ? 6 : 8;
var v1 = this.volts[0];
var v2 = this.volts[1];
var v3 = this.volts[2];
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
var segf = 1.0 / segments;
var divide = ((segments * this.position)|0);
if (!(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.euroResistorCheckItem.getState()) {
for (i = 0; i != segments; i++) {
var nx = 0;
switch (i & 3) {
case 0:
nx = 1;
break;
case 2:
nx = -1;
break;
default:
nx = 0;
break;
}
var v = v1 + (v3 - v1) * i / divide;
if (i >= divide) v = v3 + (v2 - v3) * (i - divide) / (segments - divide);
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, i * segf, hs * ox);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, (i + 1) * segf, hs * nx);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
ox = nx;
}
} else {
this.setVoltageColor$java_awt_Graphics$D(g, v1);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 0, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
for (i = 0; i != segments; i++) {
var v = v1 + (v3 - v1) * i / divide;
if (i >= divide) v = v3 + (v2 - v3) * (i - divide) / (segments - divide);
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, i * segf, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.ps3, this.ps4, (i + 1) * segf, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, this.ps3);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, this.ps4);
}
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 1, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
}this.setVoltageColor$java_awt_Graphics$D(g, v3);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.post3, this.corner2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.corner2, this.arrowPoint);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.arrow1, this.arrowPoint);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.arrow2, this.arrowPoint);
this.curcount1 = this.updateDotCount$D$D(this.current1, this.curcount1);
this.curcount2 = this.updateDotCount$D$D(this.current2, this.curcount2);
this.curcount3 = this.updateDotCount$D$D(this.current3, this.curcount3);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.midpoint, this.curcount1);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point2, this.midpoint, this.curcount2);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.post3, this.corner2, this.curcount3);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.corner2, this.midpoint, this.curcount3 + P$.CircuitElm.distance$java_awt_Point$java_awt_Point(this.post3, this.corner2));
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.current1 = (this.volts[0] - this.volts[2]) / this.resistance1;
this.current2 = (this.volts[1] - this.volts[2]) / this.resistance2;
this.current3 = -this.current1 - this.current2;
});

Clazz.newMeth(C$, 'stamp', function () {
this.resistance1 = this.maxResistance * this.position;
this.resistance2 = this.maxResistance * (1 - this.position);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[2], this.resistance1);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[2], this.nodes[1], this.resistance2);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "potentiometer";
arr[1] = "Vd = " + P$.CircuitElm.getVoltageDText$D(this.getVoltageDiff());
arr[2] = "R1 = " + P$.CircuitElm.getUnitText$D$S(this.resistance1, P$.CirSim.ohmString);
arr[3] = "R2 = " + P$.CircuitElm.getUnitText$D$S(this.resistance2, P$.CirSim.ohmString);
arr[4] = "I1 = " + P$.CircuitElm.getCurrentDText$D(this.current1);
arr[5] = "I2 = " + P$.CircuitElm.getCurrentDText$D(this.current2);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Resistance (ohms)", this.maxResistance, 0, 0]);
if (n == 1) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Slider Text", 0, -1, -1]);
ei.text = this.sliderText;
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.maxResistance = ei.value;
if (n == 1) {
this.sliderText = ei.textf.getText();
this.label.setText$S(this.sliderText);
}});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
