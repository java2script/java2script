(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "EditOptions", null, null, 'com.falstad.circuit.Editable');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sim = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim', function (s) {
C$.$init$.apply(this);
this.sim = s;
}, 1);

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Time step size (s)", this.sim.timeStep, 0, 0]);
if (n == 1) return Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Range for voltage color (V)", (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).voltageRange, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0 && ei.value > 0  ) this.sim.timeStep = ei.value;
if (n == 1 && ei.value > 0  ) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).voltageRange = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
