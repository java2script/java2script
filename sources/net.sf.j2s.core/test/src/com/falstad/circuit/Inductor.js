(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "Inductor");

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.nodes = null;
this.flags = 0;
this.sim = null;
this.inductance = 0;
this.compResistance = 0;
this.current = 0;
this.curSourceValue = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim', function (s) {
C$.$init$.apply(this);
this.sim = s;
this.nodes = Clazz.array(Integer.TYPE, [2]);
}, 1);

Clazz.newMeth(C$, 'setup$D$D$I', function (ic, cr, f) {
this.inductance = ic;
this.current = cr;
this.flags = f;
});

Clazz.newMeth(C$, 'isTrapezoidal', function () {
return (this.flags & 2) == 0;
});

Clazz.newMeth(C$, 'reset', function () {
this.current = 0;
});

Clazz.newMeth(C$, 'stamp$I$I', function (n0, n1) {
this.nodes[0] = n0;
this.nodes[1] = n1;
if (this.isTrapezoidal()) this.compResistance = 2 * this.inductance / this.sim.timeStep;
 else this.compResistance = this.inductance / this.sim.timeStep;
this.sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.compResistance);
this.sim.stampRightSide$I(this.nodes[0]);
this.sim.stampRightSide$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'nonLinear', function () {
return false;
});

Clazz.newMeth(C$, 'startIteration$D', function (voltdiff) {
if (this.isTrapezoidal()) this.curSourceValue = voltdiff / this.compResistance + this.current;
 else this.curSourceValue = this.current;
});

Clazz.newMeth(C$, 'calculateCurrent$D', function (voltdiff) {
if (this.compResistance > 0 ) this.current = voltdiff / this.compResistance + this.curSourceValue;
return this.current;
});

Clazz.newMeth(C$, 'doStep$D', function (voltdiff) {
this.sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], this.curSourceValue);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
