Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (["java.lang.Exception"], "java.awt.datatransfer.UnsupportedFlavorException", null, function () {
c$ = Clazz.declareType (java.awt.datatransfer, "UnsupportedFlavorException", Exception);
Clazz.makeConstructor (c$, 
function (flavor) {
Clazz.superConstructor (this, java.awt.datatransfer.UnsupportedFlavorException, [(flavor != null) ? flavor.getHumanPresentableName () : null]);
}, "java.awt.datatransfer.DataFlavor");
});
