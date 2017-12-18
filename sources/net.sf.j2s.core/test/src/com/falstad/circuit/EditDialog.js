(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "EditDialog", null, 'a2s.Dialog', ['java.awt.event.AdjustmentListener', 'java.awt.event.ActionListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.elm = null;
this.cframe = null;
this.applyButton = null;
this.okButton = null;
this.einfos = null;
this.einfocount = 0;
this.barmax = 0;
this.noCommaFormat = null;
this.ignoreChanges = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.barmax = 1000;
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_Editable$com_falstad_circuit_CirSim', function (ce, f) {
C$.superclazz.c$$a2s_Frame$S$Z.apply(this, [f, "Edit Component", false]);
C$.$init$.apply(this);
this.cframe = f;
this.elm = ce;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.EditDialogLayout')))));
this.einfos = Clazz.array((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))), [10]);
this.noCommaFormat = (I$[2]||(I$[2]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.noCommaFormat.setMaximumFractionDigits$I(10);
this.noCommaFormat.setGroupingUsed$Z(false);
var i;
for (i = 0; ; i++) {
this.einfos[i] = this.elm.getEditInfo$I(i);
if (this.einfos[i] == null ) break;
var ei = this.einfos[i];
this.add$java_awt_Component(Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Label'))).c$$S,[ei.name]));
if (ei.choice != null ) {
this.add$java_awt_Component(ei.choice);
ei.choice.addItemListener$java_awt_event_ItemListener(this);
} else if (ei.checkbox != null ) {
this.add$java_awt_Component(ei.checkbox);
ei.checkbox.addItemListener$java_awt_event_ItemListener(this);
} else {
this.add$java_awt_Component(ei.textf = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.TextField'))).c$$S$I,[this.unitString$com_falstad_circuit_EditInfo(ei), 10]));
if (ei.text != null ) ei.textf.setText$S(ei.text);
ei.textf.addActionListener$java_awt_event_ActionListener(this);
if (ei.text == null ) {
this.add$java_awt_Component(ei.bar = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 10, 0, 1002]));
this.setBar$com_falstad_circuit_EditInfo(ei);
ei.bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
}}}
this.einfocount = i;
this.add$java_awt_Component(this.applyButton = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Button'))).c$$S,["Apply"]));
this.applyButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.okButton = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Button'))).c$$S,["OK"]));
this.okButton.addActionListener$java_awt_event_ActionListener(this);
this.pack();
var x = this.cframe.main.getLocationOnScreen();
var d = this.getSize();
this.setLocation$I$I(x.x + ((this.cframe.winSize.width - d.width)/2|0), x.y + ((this.cframe.winSize.height - d.height)/2|0));
this.addWindowListener$java_awt_event_WindowListener(((
(function(){var C$=Clazz.newClass(P$, "EditDialog$1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('java.awt.event.WindowAdapter'), null, 1);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'windowClosing$java_awt_event_WindowEvent', function (we) {
this.b$['com.falstad.circuit.EditDialog'].closeDialog();
});
})()
), Clazz.new_((I$[7]||(I$[7]=Clazz.load('java.awt.event.WindowAdapter'))), [this, null],P$.EditDialog$1)));
}, 1);

Clazz.newMeth(C$, 'unitString$com_falstad_circuit_EditInfo', function (ei) {
var v = ei.value;
var va = Math.abs(v);
if (ei.dimensionless) return this.noCommaFormat.format$D(v);
if (v == 0 ) return "0";
if (va < 1.0E-9 ) return this.noCommaFormat.format$D(v * 1.0E12) + "p";
if (va < 1.0E-6 ) return this.noCommaFormat.format$D(v * 1.0E9) + "n";
if (va < 0.001 ) return this.noCommaFormat.format$D(v * 1000000.0) + "u";
if (va < 1  && !ei.forceLargeM ) return this.noCommaFormat.format$D(v * 1000.0) + "m";
if (va < 1000.0 ) return this.noCommaFormat.format$D(v);
if (va < 1000000.0 ) return this.noCommaFormat.format$D(v * 0.001) + "k";
if (va < 1.0E9 ) return this.noCommaFormat.format$D(v * 1.0E-6) + "M";
return this.noCommaFormat.format$D(v * 1.0E-9) + "G";
});

Clazz.newMeth(C$, 'parseUnits$com_falstad_circuit_EditInfo', function (ei) {
var s = ei.textf.getText();
s = s.trim();
var len = s.length$();
var uc = s.charAt(len - 1);
var mult = 1;
switch (uc.$c()) {
case 112:
case 80:
mult = 1.0E-12;
break;
case 110:
case 78:
mult = 1.0E-9;
break;
case 117:
case 85:
mult = 1.0E-6;
break;
case 109:
mult = (ei.forceLargeM) ? 1000000.0 : 0.001;
break;
case 107:
case 75:
mult = 1000.0;
break;
case 77:
mult = 1000000.0;
break;
case 71:
case 103:
mult = 1.0E9;
break;
}
if (mult != 1 ) s = s.substring(0, len - 1).trim();
return this.noCommaFormat.parse$S(s).doubleValue() * mult;
});

Clazz.newMeth(C$, '$apply', function () {
var i;
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (ei.textf == null ) continue;
if (ei.text == null ) {
try {
var d = this.parseUnits$com_falstad_circuit_EditInfo(ei);
ei.value = d;
} catch (ex) {
if (Clazz.exceptionOf(ex, Exception)){
} else {
throw ex;
}
}
}this.elm.setEditValue$I$com_falstad_circuit_EditInfo(i, ei);
if (ei.text == null ) this.setBar$com_falstad_circuit_EditInfo(ei);
}
this.cframe.needAnalyze();
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
var i;
var src = e.getSource();
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (src === ei.textf ) {
if (ei.text == null ) {
try {
var d = this.parseUnits$com_falstad_circuit_EditInfo(ei);
ei.value = d;
} catch (ex) {
if (Clazz.exceptionOf(ex, Exception)){
} else {
throw ex;
}
}
}this.elm.setEditValue$I$com_falstad_circuit_EditInfo(i, ei);
if (ei.text == null ) this.setBar$com_falstad_circuit_EditInfo(ei);
this.cframe.needAnalyze();
}}
if (e.getSource() === this.okButton ) {
this.$apply();
this.closeDialog();
}if (e.getSource() === this.applyButton ) this.$apply();
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (this.ignoreChanges) return;
var src = e.getSource();
var i;
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (ei.bar === src ) {
var v = ei.bar.getValue() / 1000.0;
if (v < 0 ) v = 0;
if (v > 1 ) v = 1;
ei.value = (ei.maxval - ei.minval) * v + ei.minval;
ei.value = Math.round(ei.value / ei.minval) * ei.minval;
this.elm.setEditValue$I$com_falstad_circuit_EditInfo(i, ei);
ei.textf.setText$S(this.unitString$com_falstad_circuit_EditInfo(ei));
this.cframe.needAnalyze();
}}
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
var src = e.getItemSelectable();
var i;
var changed = false;
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (ei.choice === src  || ei.checkbox === src  ) {
this.elm.setEditValue$I$com_falstad_circuit_EditInfo(i, ei);
if (ei.newDialog) changed = true;
this.cframe.needAnalyze();
}}
if (changed) {
this.setVisible$Z(false);
this.cframe.editDialog = Clazz.new_(C$.c$$com_falstad_circuit_Editable$com_falstad_circuit_CirSim,[this.elm, this.cframe]);
this.cframe.editDialog.show();
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.closeDialog();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'setBar$com_falstad_circuit_EditInfo', function (ei) {
var x = ((1000 * (ei.value - ei.minval) / (ei.maxval - ei.minval))|0);
this.ignoreChanges = true;
ei.bar.setValue$I(x);
this.ignoreChanges = false;
});

Clazz.newMeth(C$, 'closeDialog', function () {
this.cframe.main.requestFocus();
this.setVisible$Z(false);
this.cframe.editDialog = null;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
