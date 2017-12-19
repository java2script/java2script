(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ImportExportClipboardDialog", null, 'a2s.Dialog', ['com.falstad.circuit.ImportExportDialog', 'java.awt.event.ActionListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cframe = null;
this.importButton = null;
this.closeButton = null;
this.text = null;
this.$type = null;
this.clipboard = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.clipboard = null;
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action', function (f, type) {
C$.superclazz.c$$a2s_Frame$S$Z.apply(this, [f, (type === (I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT ) ? "Export" : "Import", false]);
C$.$init$.apply(this);
this.cframe = f;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.ImportExportDialogLayout')))));
this.add$java_awt_Component(this.text = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.TextArea'))).c$$S$I$I,["", 10, 60]));
this.importButton = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Button'))).c$$S,["Import"]);
this.$type = type;
this.add$java_awt_Component(this.importButton);
this.importButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.closeButton = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Button'))).c$$S,["Close"]));
this.closeButton.addActionListener$java_awt_event_ActionListener(this);
var x = this.cframe.main.getLocationOnScreen();
this.resize$I$I(400, 300);
var d = this.getSize();
this.setLocation$I$I(x.x + ((this.cframe.winSize.width - d.width)/2|0), x.y + ((this.cframe.winSize.height - d.height)/2|0));
}, 1);

Clazz.newMeth(C$, 'setDump$S', function (dump) {
this.text.setText$S(dump);
});

Clazz.newMeth(C$, 'execute', function () {
if (this.$type === (I$[0]||(I$[0]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT ) this.text.selectAll();
this.setVisible$Z(true);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
var i;
var src = e.getSource();
if (src === this.importButton ) {
{
this.cframe.readSetup$S(this.text.getText());
}}if (src === this.closeButton ) this.setVisible$Z(false);
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
