(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "LampElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.resistance = 0;
this.roomTemp = 0;
this.temp = 0;
this.nom_pow = 0;
this.nom_v = 0;
this.warmTime = 0;
this.coolTime = 0;
this.bulbLead = null;
this.filament = null;
this.bulb = null;
this.bulbR = 0;
this.filament_len = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.roomTemp = 300;
this.filament_len = 24;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.temp = 300.0;
this.nom_pow = 100;
this.nom_v = 120;
this.warmTime = 0.4;
this.coolTime = 0.4;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.temp =  new Double(st.nextToken()).doubleValue();
this.nom_pow =  new Double(st.nextToken()).doubleValue();
this.nom_v =  new Double(st.nextToken()).doubleValue();
this.warmTime =  new Double(st.nextToken()).doubleValue();
this.coolTime =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.temp).toString() + " " + new Double(this.nom_pow).toString() + " " + new Double(this.nom_v).toString() + " " + new Double(this.warmTime).toString() + " " + new Double(this.coolTime).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 181;
});

Clazz.newMeth(C$, 'reset', function () {
C$.superclazz.prototype.reset.apply(this, []);
this.temp = 300.0;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var llen = 16;
this.calcLeads$I(llen);
this.bulbLead = this.newPointArray$I(2);
this.filament = this.newPointArray$I(2);
this.bulbR = 20;
this.filament[0] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, 0, 24);
this.filament[1] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, 1, 24);
var br = 24 - Math.sqrt(this.bulbR * this.bulbR - llen * llen);
this.bulbLead[0] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, 0, br);
this.bulbLead[1] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, 1, br);
this.bulb = this.interpPoint$java_awt_Point$java_awt_Point$D(this.filament[0], this.filament[1], 0.5);
});

Clazz.newMeth(C$, 'getTempColor', function () {
if (this.temp < 1200 ) {
var x = ((255 * (this.temp - 800) / 400)|0);
if (x < 0) x = 0;
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).c$$I$I$I,[x, 0, 0]);
}if (this.temp < 1700 ) {
var x = ((255 * (this.temp - 1200) / 500)|0);
if (x < 0) x = 0;
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, x, 0]);
}if (this.temp < 2400 ) {
var x = ((255 * (this.temp - 1700) / 700)|0);
if (x < 0) x = 0;
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 255, x]);
}return (I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).white;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 4);
this.adjustBbox$I$I$I$I(this.bulb.x - this.bulbR, this.bulb.y - this.bulbR, this.bulb.x + this.bulbR, this.bulb.y + this.bulbR);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
g.setColor$java_awt_Color(this.getTempColor());
g.fillOval$I$I$I$I(this.bulb.x - this.bulbR, this.bulb.y - this.bulbR, this.bulbR * 2, this.bulbR * 2);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).white);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.bulb.x, this.bulb.y, this.bulbR);
this.setVoltageColor$java_awt_Graphics$D(g, v1);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead1, this.filament[0]);
this.setVoltageColor$java_awt_Graphics$D(g, v2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead2, this.filament[1]);
this.setVoltageColor$java_awt_Graphics$D(g, (v1 + v2) * 0.5);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.filament[0], this.filament[1]);
this.updateDotCount();
if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
var cc = this.curcount + (this.dn - 16) / 2;
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.lead1, this.filament[0], cc);
cc += 24;
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.filament[0], this.filament[1], cc);
cc += 16;
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.filament[1], this.lead2, cc);
cc += 24;
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.lead2, this.point2, this.curcount);
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'startIteration', function () {
var nom_r = this.nom_v * this.nom_v / this.nom_pow;
var tp = (this.temp > 5390 ) ? 5390 : this.temp;
this.resistance = nom_r * (1.26104 - 4.90662 * Math.sqrt(17.1839 / tp - 0.00318794) - 7.8569 / (tp - 187.56));
var cap = 1.57E-4 * this.nom_pow;
var capw = cap * this.warmTime / 0.4;
var capc = cap * this.coolTime / 0.4;
this.temp += this.getPower() * (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep / capw;
var cr = 2600 / this.nom_pow;
this.temp -= (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep * (this.temp - 300.0) / (capc * cr);
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.resistance);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "lamp";
this.getBasicInfo$SA(arr);
arr[3] = "R = " + P$.CircuitElm.getUnitText$D$S(this.resistance, P$.CirSim.ohmString);
arr[4] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
arr[5] = "T = " + ((this.temp|0)) + " K" ;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Nominal Power", this.nom_pow, 0, 0]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Nominal Voltage", this.nom_v, 0, 0]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Warmup Time (s)", this.warmTime, 0, 0]);
if (n == 3) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Cooldown Time (s)", this.coolTime, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0 && ei.value > 0  ) this.nom_pow = ei.value;
if (n == 1 && ei.value > 0  ) this.nom_v = ei.value;
if (n == 2 && ei.value > 0  ) this.warmTime = ei.value;
if (n == 3 && ei.value > 0  ) this.coolTime = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
