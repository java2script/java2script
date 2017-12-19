(function(){var P$=Clazz.newPackage("com.falstad.circuit");
var C$=Clazz.newClass(P$, "EditInfo");

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.name = null;
this.text = null;
this.value = 0;
this.minval = 0;
this.maxval = 0;
this.textf = null;
this.bar = null;
this.choice = null;
this.checkbox = null;
this.newDialog = false;
this.forceLargeM = false;
this.dimensionless = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$S$D$D$D', function (n, val, mn, mx) {
C$.$init$.apply(this);
this.name = n;
this.value = val;
if (mn == 0  && mx == 0   && val > 0  ) {
this.minval = 1.0E10;
while (this.minval > val / 100 )this.minval /= 10.0;

this.maxval = this.minval * 1000;
} else {
this.minval = mn;
this.maxval = mx;
}this.forceLargeM = this.name.indexOf("(ohms)") > 0 || this.name.indexOf("(Hz)") > 0 ;
this.dimensionless = false;
}, 1);

Clazz.newMeth(C$, 'setDimensionless', function () {
this.dimensionless = true;
return this;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
