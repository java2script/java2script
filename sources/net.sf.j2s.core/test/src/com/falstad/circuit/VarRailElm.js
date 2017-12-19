(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "VarRailElm", null, 'com.falstad.circuit.RailElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.slider = null;
this.label = null;
this.sliderText = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I$I.apply(this, [xx, yy, 6]);
C$.$init$.apply(this);
this.sliderText = "Voltage";
this.frequency = this.maxVoltage;
this.createSlider();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.sliderText = st.nextToken();
while (st.hasMoreTokens())this.sliderText += ' ' + st.nextToken();

this.createSlider();
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.sliderText ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 172;
});

Clazz.newMeth(C$, 'createSlider', function () {
this.waveform = 6;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.add$java_awt_Component(this.label = Clazz.new_((I$[1]||(I$[1]=Clazz.load('a2s.Label'))).c$$S$I,[this.sliderText, 0]));
var value = (((this.frequency - this.bias) * 100 / (this.maxVoltage - this.bias))|0);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.add$java_awt_Component(this.slider = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, value, 1, 0, 101]));
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.validate();
});

Clazz.newMeth(C$, 'getVoltage', function () {
this.frequency = this.slider.getValue() * (this.maxVoltage - this.bias) / 100.0 + this.bias;
return this.frequency;
});

Clazz.newMeth(C$, '$delete', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.remove$java_awt_Component(this.label);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.main.remove$java_awt_Component(this.slider);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Min Voltage", this.bias, -20, 20]);
if (n == 1) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max Voltage", this.maxVoltage, -20, 20]);
if (n == 2) {
var ei = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Slider Text", 0, -1, -1]);
ei.text = this.sliderText;
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.bias = ei.value;
if (n == 1) this.maxVoltage = ei.value;
if (n == 2) {
this.sliderText = ei.textf.getText();
this.label.setText$S(this.sliderText);
}});

Clazz.newMeth(C$, 'getShortcut', function () {
return 0;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
