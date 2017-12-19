(function(){var P$=Clazz.newPackage("com.falstad.circuit");
var C$=Clazz.newClass(P$, "RowInfo");

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.nodeEq = 0;
this.type = 0;
this.mapCol = 0;
this.mapRow = 0;
this.value = 0;
this.rsChanges = false;
this.lsChanges = false;
this.dropRow = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.type = 0;
}, 1);
})();
//Created 2017-12-17 19:28:21
