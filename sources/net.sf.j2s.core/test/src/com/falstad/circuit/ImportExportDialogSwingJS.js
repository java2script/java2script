(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ImportExportDialogSwingJS", null, 'a2s.Dialog', 'com.falstad.circuit.ImportExportDialog');
C$.lastName = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.lastName = "circuit.txt";
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cframe = null;
this.text = null;
this.$type = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action', function (f, type) {
C$.superclazz.c$$a2s_Frame$S$Z.apply(this, [f, (type === (I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT ) ? "Export" : "Import", false]);
C$.$init$.apply(this);
this.cframe = f;
this.$type = type;
this.text = Clazz.new_((I$[1]||(I$[1]=Clazz.load('a2s.TextArea'))).c$$S$I$I,["", 10, 60]);
}, 1);

Clazz.newMeth(C$, 'setDump$S', function (dump) {
this.text.setText$S(dump);
});

Clazz.newMeth(C$, 'execute', function () {
if (this.$type === (I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).IMPORT ) {
{
swingjs.JSToolkit.getFileFromDialog(this, "string");
}} else {
var data = this.text.getText();
var mimeType = "text/plain";
var encoding = null;
var fileName = null;
var name = C$.lastName;
{
fileName = prompt("Enter a file name", name); fileName && swingjs.JSToolkit.saveFile(fileName, data, mimeType, encoding);
}}this.dispose();
return;
});

Clazz.newMeth(C$, 'handleFileLoaded$O$S', function (data, fileName) {
if (fileName == null ) return;
C$.lastName = fileName;
try {
this.cframe.readSetup$S(data);
} finally {
this.dispose();
}
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.cframe.main.requestFocus();
this.setVisible$Z(false);
this.cframe.impDialog = null;
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
