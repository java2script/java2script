(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "Diode");

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.nodes = null;
this.sim = null;
this.leakage = 0;
this.vt = 0;
this.vdcoef = 0;
this.fwdrop = 0;
this.zvoltage = 0;
this.zoffset = 0;
this.lastvoltdiff = 0;
this.vcrit = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.leakage = 1.0E-14;
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim', function (s) {
C$.$init$.apply(this);
this.sim = s;
this.nodes = Clazz.array(Integer.TYPE, [2]);
}, 1);

Clazz.newMeth(C$, 'setup$D$D', function (fw, zv) {
this.fwdrop = fw;
this.zvoltage = zv;
this.vdcoef = Math.log(1 / this.leakage + 1) / this.fwdrop;
this.vt = 1 / this.vdcoef;
this.vcrit = this.vt * Math.log(this.vt / (Math.sqrt(2) * this.leakage));
if (this.zvoltage == 0 ) this.zoffset = 0;
 else {
var i = -0.005;
this.zoffset = this.zvoltage - Math.log(-(1 + i / this.leakage)) / this.vdcoef;
}});

Clazz.newMeth(C$, 'reset', function () {
this.lastvoltdiff = 0;
});

Clazz.newMeth(C$, 'limitStep$D$D', function (vnew, vold) {
var arg;
var oo = vnew;
if (vnew > this.vcrit  && Math.abs(vnew - vold) > (this.vt + this.vt)  ) {
if (vold > 0 ) {
arg = 1 + (vnew - vold) / this.vt;
if (arg > 0 ) {
vnew = vold + this.vt * Math.log(arg);
var v0 = Math.log(1.0E-6 / this.leakage) * this.vt;
vnew = Math.max(v0, vnew);
} else {
vnew = this.vcrit;
}} else {
vnew = this.vt * Math.log(vnew / this.vt);
}this.sim.converged = false;
} else if (vnew < 0  && this.zoffset != 0  ) {
vnew = -vnew - this.zoffset;
vold = -vold - this.zoffset;
if (vnew > this.vcrit  && Math.abs(vnew - vold) > (this.vt + this.vt)  ) {
if (vold > 0 ) {
arg = 1 + (vnew - vold) / this.vt;
if (arg > 0 ) {
vnew = vold + this.vt * Math.log(arg);
var v0 = Math.log(1.0E-6 / this.leakage) * this.vt;
vnew = Math.max(v0, vnew);
} else {
vnew = this.vcrit;
}} else {
vnew = this.vt * Math.log(vnew / this.vt);
}this.sim.converged = false;
}vnew = -(vnew + this.zoffset);
}return vnew;
});

Clazz.newMeth(C$, 'stamp$I$I', function (n0, n1) {
this.nodes[0] = n0;
this.nodes[1] = n1;
this.sim.stampNonLinear$I(this.nodes[0]);
this.sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'doStep$D', function (voltdiff) {
if (Math.abs(voltdiff - this.lastvoltdiff) > 0.01 ) this.sim.converged = false;
voltdiff = this.limitStep$D$D(voltdiff, this.lastvoltdiff);
this.lastvoltdiff = voltdiff;
if (voltdiff >= 0  || this.zvoltage == 0  ) {
var eval = Math.exp(voltdiff * this.vdcoef);
if (voltdiff < 0 ) eval = 1;
var geq = this.vdcoef * this.leakage * eval ;
var nc = (eval - 1) * this.leakage - geq * voltdiff;
this.sim.stampConductance$I$I$D(this.nodes[0], this.nodes[1], geq);
this.sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], nc);
} else {
var geq = this.leakage * this.vdcoef * (Math.exp(voltdiff * this.vdcoef) + Math.exp((-voltdiff - this.zoffset) * this.vdcoef)) ;
var nc = this.leakage * (Math.exp(voltdiff * this.vdcoef) - Math.exp((-voltdiff - this.zoffset) * this.vdcoef) - 1 ) + geq * (-voltdiff);
this.sim.stampConductance$I$I$D(this.nodes[0], this.nodes[1], geq);
this.sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], nc);
}});

Clazz.newMeth(C$, 'calculateCurrent$D', function (voltdiff) {
if (voltdiff >= 0  || this.zvoltage == 0  ) return this.leakage * (Math.exp(voltdiff * this.vdcoef) - 1);
return this.leakage * (Math.exp(voltdiff * this.vdcoef) - Math.exp((-voltdiff - this.zoffset) * this.vdcoef) - 1 );
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
