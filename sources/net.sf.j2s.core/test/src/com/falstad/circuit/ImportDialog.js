(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ImportDialog", null, 'a2s.Dialog', 'java.awt.event.ActionListener');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cframe = null;
this.importButton = null;
this.closeButton = null;
this.text = null;
this.isURL = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim$S$Z', function (f, str, url) {
C$.superclazz.c$$a2s_Frame$S$Z.apply(this, [f, (str.length$() > 0) ? "Export" : "Import", false]);
C$.$init$.apply(this);
this.isURL = url;
this.cframe = f;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.ImportDialogLayout')))));
this.add$java_awt_Component(this.text = Clazz.new_((I$[1]||(I$[1]=Clazz.load('a2s.TextArea'))).c$$S$I$I,[str, 10, 60]));
this.importButton = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Button'))).c$$S,["Import"]);
if (!this.isURL) this.add$java_awt_Component(this.importButton);
this.importButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.closeButton = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Button'))).c$$S,["Close"]));
this.closeButton.addActionListener$java_awt_event_ActionListener(this);
var x = this.cframe.main.getLocationOnScreen();
this.resize$I$I(400, 300);
var d = this.getSize();
this.setLocation$I$I(x.x + ((this.cframe.winSize.width - d.width)/2|0), x.y + ((this.cframe.winSize.height - d.height)/2|0));
this.show();
if (str.length$() > 0) this.text.selectAll();
}, 1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
var i;
var src = e.getSource();
if (src === this.importButton ) {
this.cframe.readSetup$S(this.text.getText());
this.setVisible$Z(false);
}if (src === this.closeButton ) this.setVisible$Z(false);
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
