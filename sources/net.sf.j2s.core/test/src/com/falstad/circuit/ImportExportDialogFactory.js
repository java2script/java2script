(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ImportExportDialogFactory");

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'Create$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action', function (f, type) {
var isJS = false;
{
isJS = true;
}if (isJS) {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.ImportExportDialogSwingJS'))).c$$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action,[f, type]);
} else if (f.applet != null ) {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.ImportExportClipboardDialog'))).c$$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action,[f, type]);
} else {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.ImportExportFileDialog'))).c$$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action,[f, type]);
}}, 1);

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
