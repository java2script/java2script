(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "AntennaElm", null, 'com.falstad.circuit.RailElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.fmphase = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I$I.apply(this, [xx, yy, 0]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.waveform = 0;
}, 1);

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[0], this.voltSource);
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, this.getVoltage());
});

Clazz.newMeth(C$, 'getVoltage', function () {
this.fmphase += 2 * 3.141592653589793 * (2200 + Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 13 ) * 100) * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep ;
var fm = 3 * Math.sin(this.fmphase);
return Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 3000 ) * (1.3 + Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 12 )) * 3  + Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 2710 ) * (1.3 + Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 13 )) * 3  + Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 2433 ) * (1.3 + Math.sin(2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t * 14 )) * 3  + fm;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'A'.$c();
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 0;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
