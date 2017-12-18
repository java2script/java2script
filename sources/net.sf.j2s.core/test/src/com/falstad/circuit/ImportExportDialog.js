(function(){var P$=Clazz.newPackage("com.falstad.circuit");
var C$=Clazz.newInterface(P$, "ImportExportDialog");
;
(function(){var C$=Clazz.newClass(P$.ImportExportDialog, "Action", null, 'Enum');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
var vals = [];
Clazz.newEnumConst(vals, C$.c$, "IMPORT", 0, []);
Clazz.newEnumConst(vals, C$.c$, "EXPORT", 1, []);
Clazz.newMeth(C$, 'values', function() { return vals }, 1);
Clazz.newMeth(Enum, 'valueOf$Class$S', function(cl, name) { return cl[name] }, 1);
})()
})();
//Created 2017-12-17 19:28:19
