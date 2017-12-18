(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumOscFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.dbimage = null;
this.random = null;
this.sampleCount = 0;
this.groundButton = null;
this.blankButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.stoppedCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.pCheckItem = null;
this.lCheckItem = null;
this.statesCheckItem = null;
this.lStatesCheckItem = null;
this.expectCheckItem = null;
this.uncertaintyCheckItem = null;
this.probCheckItem = null;
this.probPhaseCheckItem = null;
this.magPhaseCheckItem = null;
this.alwaysNormItem = null;
this.alwaysMaxItem = null;
this.waveFunctionMenu = null;
this.measureEItem = null;
this.measureLItem = null;
this.exitItem = null;
this.mouseChooser = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.aspectBar = null;
this.brightnessBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewL = null;
this.viewStates = null;
this.viewLStates = null;
this.viewCurrent = null;
this.viewXMap = null;
this.viewPMap = null;
this.viewStatesMap = null;
this.viewLStatesMap = null;
this.viewList = null;
this.viewCount = 0;
this.changingDerivedStates = false;
this.dragStop = false;
this.aspectRatio = 0;
this.hermite = null;
this.data = null;
this.states = null;
this.lzStates = null;
this.lzStateCount = 0;
this.selectedState = null;
this.selectedPhasor = null;
this.lzspectrum = null;
this.step = 0;
this.func = null;
this.funci = null;
this.translateFunc = null;
this.translateFunci = null;
this.pfuncr = null;
this.pfunci = null;
this.phaseColors = null;
this.whitePhaseColor = null;
this.grayLevels = null;
this.xpoints = null;
this.ypoints = null;
this.floorValues = null;
this.selectedGridX = 0;
this.selectedGridY = 0;
this.selectedPaneHandle = 0;
this.selectedGridFunc = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragSet = false;
this.dragClear = false;
this.magDragStart = 0;
this.dragging = false;
this.t = 0;
this.alpha = 0;
this.pause = 0;
this.cv = null;
this.applet = null;
this.radioGroup = null;
this.gray1 = null;
this.gray2 = null;
this.lastTime = 0;
this.lspacing = 0;
this.lastGaussWx = 0;
this.lastGaussWy = 0;
this.momentumX = 0;
this.momentumY = 0;
this.finished = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.aspectRatio = 1;
this.lspacing = 3;
this.lastGaussWx = -0.039;
this.lastGaussWy = -0.039;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "QuantumOsc by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_QuantumOsc', function (a) {
C$.superclazz.c$$S.apply(this, ["Quantum 2-D Oscillator Applet v1.2a"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
var os = System.getProperty("os.name");
var jv = System.getProperty("java.version");
var altRender = false;
if (os.indexOf("Windows") == 0) {
if (jv.indexOf("1.1") == 0) altRender = true;
}this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.QuantumOscLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.QuantumOscCanvas'))).c$$com_falstad_QuantumOscFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.eCheckItem = this.getCheckItem$S("Energy"));
this.eCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.xCheckItem = this.getCheckItem$S("Position"));
this.xCheckItem.setState$Z(true);
this.xCheckItem.disable();
m.add$javax_swing_JMenuItem(this.pCheckItem = this.getCheckItem$S("Linear Momentum"));
m.add$javax_swing_JMenuItem(this.lCheckItem = this.getCheckItem$S("Angular Momentum"));
m.add$javax_swing_JMenuItem(this.statesCheckItem = this.getCheckItem$S("Rectangular States"));
this.statesCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.lStatesCheckItem = this.getCheckItem$S("Angular States"));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.expectCheckItem = this.getCheckItem$S("Expectation Values"));
this.expectCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.uncertaintyCheckItem = this.getCheckItem$S("Uncertainties"));
var m2 = this.waveFunctionMenu = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Menu'))).c$$S,["Wave Function"]);
m.add$javax_swing_JMenuItem(m2);
m2.add$javax_swing_JMenuItem(this.probCheckItem = this.getRadioItem$S("Probability"));
m2.add$javax_swing_JMenuItem(this.probPhaseCheckItem = this.getRadioItem$S("Probability + Phase"));
m2.add$javax_swing_JMenuItem(this.magPhaseCheckItem = this.getRadioItem$S("Magnitude + Phase"));
this.magPhaseCheckItem.setSelected$Z(true);
m = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Menu'))).c$$S,["Measure"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.measureEItem = this.getMenuItem$S("Measure Energy"));
m.add$javax_swing_JMenuItem(this.measureLItem = this.getMenuItem$S("Measure Angular Momentum"));
m = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.alwaysNormItem = this.getCheckItem$S("Always Normalize"));
m.add$javax_swing_JMenuItem(this.alwaysMaxItem = this.getCheckItem$S("Always Maximize"));
this.alwaysMaxItem.setState$Z(true);
this.setMenuBar$a2s_MenuBar(mb);
this.mouseChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.mouseChooser.add$S("Mouse = Create Gaussian");
this.mouseChooser.add$S("Mouse = Gaussian w/ Momentum");
this.mouseChooser.add$S("Mouse = Rotate Function");
this.mouseChooser.add$S("Mouse = Translate Function");
this.mouseChooser.add$S("Mouse = Scale Function");
this.mouseChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.mouseChooser);
this.add$java_awt_Component(this.blankButton = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.normalizeButton = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Button'))).c$$S,["Normalize"]));
this.normalizeButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.maximizeButton = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Button'))).c$$S,["Maximize"]));
this.maximizeButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.groundButton = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Button'))).c$$S,["Ground State"]));
this.groundButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stoppedCheck);
this.add$java_awt_Component(Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.add$java_awt_Component(this.speedBar = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 138, 1, 1, 300]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 1100, 1, 700, 2000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.add$java_awt_Component(this.resBar = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 6, 1, 5, 9]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.resBar.setBlockIncrement$I(1);
this.add$java_awt_Component(Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Label'))).c$$S$I,["Aspect Ratio", 0]));
this.add$java_awt_Component(this.aspectBar = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 31]));
this.aspectBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setLoadCount();
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
var i;
var j;
this.phaseColors = Clazz.array((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))), [8, 51]);
for (i = 0; i != 8; i++) for (j = 0; j <= 50; j++) {
var ang = Math.atan(j / 50.0);
this.phaseColors[i][j] = this.genPhaseColor$I$D(i, ang);
}

this.whitePhaseColor = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 1, 1]);
this.grayLevels = Clazz.array((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))), [256]);
for (i = 0; i != 256; i++) this.grayLevels[i] = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).c$$I$I$I,[i, i, i]);

this.random = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).lightGray);
this.resize$I$I(800, 700);
this.show();
this.handleResize();
this.validate();
this.finished = true;
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
return mi;
});

Clazz.newMeth(C$, 'getRadioItem$S', function (s) {
if (this.radioGroup == null ) this.radioGroup = Clazz.new_((I$[16]||(I$[16]=Clazz.load('javax.swing.ButtonGroup'))));
var mi = Clazz.new_((I$[17]||(I$[17]=Clazz.load('javax.swing.JRadioButtonMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
this.radioGroup.add$javax_swing_AbstractButton(mi);
return mi;
});

Clazz.newMeth(C$, 'genPhaseColor$I$D', function (sec, ang) {
ang += sec * 3.141592653589793 / 4;
ang *= 0.954929658551372;
var hsec = (ang|0);
var a2 = ang % 1;
var a3 = 1.0 - a2;
var c = null;
switch (hsec) {
case 6:
case 0:
c = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, 1, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, a3, 1, 0]);
break;
case 2:
c = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, 0, 1, a2]);
break;
case 3:
c = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, 0, a3, 1]);
break;
case 4:
c = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, a2, 0, 1]);
break;
case 5:
c = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 0, a3]);
break;
}
return c;
});

Clazz.newMeth(C$, 'reinit', function () {
this.momentumX = 0;
this.momentumY = 0.490873;
this.selectedGridX = (this.sampleCount * 22/32|0);
this.selectedGridY = (this.sampleCount/2|0);
this.drawXGaussP();
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
this.setupDisplay();
});

Clazz.newMeth(C$, 'setupDisplay', function () {
if (this.winSize == null ) return;
var potsize = (this.viewPotential == null ) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null ) ? 150 : this.viewStates.height;
this.viewX = this.viewPotential = this.viewP = this.viewL = this.viewStates = this.viewLStates = null;
this.viewList = Clazz.array((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [10]);
var i = 0;
if (this.eCheckItem.getState()) this.viewList[i++] = this.viewPotential = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [this, null]);
if (this.pCheckItem.getState()) this.viewList[i++] = this.viewP = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [this, null]);
if (this.lCheckItem.getState() && this.aspectRatio == 1  ) this.viewList[i++] = this.viewL = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [this, null]);
if (this.statesCheckItem.getState()) this.viewList[i++] = this.viewStates = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [this, null]);
if (this.lStatesCheckItem.getState() && this.aspectRatio == 1  ) this.viewList[i++] = this.viewLStates = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))), [this, null]);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0 && this.viewPotential != null  ) {
sizenum--;
toth = toth-(potsize);
}if (statesize > 0 && this.viewStates != null  ) {
sizenum--;
toth = toth-(statesize);
}toth = toth-(4 * 2 * (this.viewCount - 1) );
var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (sizenum == 0) ? toth : (toth/sizenum|0);
if (v === this.viewPotential  && potsize > 0 ) h = potsize;
 else if (v === this.viewStates  && statesize > 0 ) h = statesize;
v.paneY = cury;
if (cury > 0) cury = cury+(4);
v.x = 0;
v.width = this.winSize.width;
v.y = cury;
v.height = h;
cury = cury+(h + 4);
}
this.setSubViews();
});

Clazz.newMeth(C$, 'setSubViews', function () {
this.viewXMap = this.viewPMap = null;
this.viewStatesMap = null;
this.viewLStatesMap = null;
if (this.viewStates != null ) {
this.viewStatesMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))).c$$com_falstad_QuantumOscFrame_View, [this, null, this.viewStates]);
this.viewStatesMap.x = ((this.winSize.width - this.viewStatesMap.height)/2|0);
this.viewStatesMap.width = this.viewStatesMap.width-(this.viewStatesMap.x * 2);
}if (this.viewLStates != null ) {
this.viewLStatesMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))).c$$com_falstad_QuantumOscFrame_View, [this, null, this.viewLStates]);
this.viewLStatesMap.x = ((this.winSize.width - this.viewLStatesMap.height)/2|0);
this.viewLStatesMap.width = this.viewLStatesMap.width-(this.viewLStatesMap.x * 2);
}if (this.viewX != null ) {
this.viewXMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))).c$$com_falstad_QuantumOscFrame_View, [this, null, this.viewX]);
this.processMap$com_falstad_QuantumOscFrame_View$D(this.viewXMap, this.aspectRatio);
}if (this.viewP != null ) {
this.viewPMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').View))).c$$com_falstad_QuantumOscFrame_View, [this, null, this.viewP]);
this.processMap$com_falstad_QuantumOscFrame_View$D(this.viewPMap, 1 / this.aspectRatio);
}if (this.viewL != null ) {
var v = this.viewL;
v.mid_y = v.y + (v.height/2|0);
v.ymult = 0.9 * v.height / 2;
v.lower_y = ((v.mid_y + v.ymult)|0);
v.ymult2 = v.ymult * 2;
}this.floorValues = null;
var i;
var j;
if (this.viewStatesMap != null ) {
var termWidth = (this.viewStatesMap.height/10|0);
this.viewStatesMap.phasorCount = 100;
var phasors = this.viewStatesMap.phasors = Clazz.array((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').Phasor))), [this.viewStatesMap.phasorCount]);
var pn = 0;
for (i = 1; i <= 10; i++) for (j = 1; j <= 10; j++) {
var x = this.viewStatesMap.x + (i - 1) * termWidth;
var y = this.viewStatesMap.y + (j - 1) * termWidth;
var ph = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, termWidth, termWidth]);
ph.state = this.states[i - 1][j - 1];
phasors[pn++] = ph;
}

}if (this.viewLStatesMap != null ) {
var termWidth = (this.viewLStatesMap.height/10|0);
var ct = this.viewLStatesMap.phasorCount = 55;
var phasors = this.viewLStatesMap.phasors = Clazz.array((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').Phasor))), [ct]);
var pn = 0;
for (i = 1; i <= 10; i++) for (j = 1; j <= i; j++) {
var y = this.viewLStatesMap.y + (i - 1) * termWidth;
var x = this.viewLStatesMap.x + (j - 1) * termWidth - ((i - 1) * termWidth/2|0) + (this.viewLStatesMap.width/2|0);
var ph = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, termWidth, termWidth]);
ph.state = this.lzStates[pn];
phasors[pn++] = ph;
}

}});

Clazz.newMeth(C$, 'processMap$com_falstad_QuantumOscFrame_View$D', function (v, ar) {
var a = v.width / v.height;
var w;
var h;
if (ar > a ) {
w = v.width - 2;
h = ((w / ar)|0);
} else {
h = v.height - 2;
w = ((h * ar)|0);
}v.x = v.x+(((v.width - w)/2|0) + 1);
v.y = v.y+(((v.height - h)/2|0) + 1);
v.width = w;
v.height = h;
v.pixels = Clazz.array(Integer.TYPE, [v.width * v.height]);
var i;
for (i = 0; i != v.width * v.height; i++) v.pixels[i] = -16777216;

v.imageSource = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[v.width, v.height, v.pixels, 0, v.width]);
});

Clazz.newMeth(C$, 'min$I$I', function (x, y) {
return (x < y) ? x : y;
});

Clazz.newMeth(C$, 'doGround', function () {
var x;
var y;
for (x = 0; x != 14; x++) for (y = 0; y != 14; y++) this.states[x][y].setRe$D(0);


this.states[0][0].setReIm$D$D(1, 0);
});

Clazz.newMeth(C$, 'doBlank', function () {
var x;
var y;
for (x = 0; x <= this.sampleCount; x++) for (y = 0; y <= this.sampleCount; y++) this.func[x][y] = 0;


this.transform$Z(true);
});

Clazz.newMeth(C$, 'normalize', function () {
var norm = 0;
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) norm += this.states[i][j].magSquared();


if (norm == 0 ) return;
var normmult = 1 / Math.sqrt(norm);
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].multRe$D(normmult);


this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'maximize', function () {
var i;
var j;
var maxm = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) if (this.states[i][j].mag > maxm ) maxm = this.states[i][j].mag;


if (maxm == 0 ) return;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].multRe$D(1 / maxm);


this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'measureE', function () {
this.normalize();
var n = this.random.nextDouble();
var i = 0;
var j = 0;
var picki = -1;
var pickj = -1;
for (i = 0; i < 14; i++) for (j = 0; j < 14; j++) {
var m = this.states[i][j].magSquared();
n -= m;
if (n < 0 ) {
picki = i;
pickj = j;
i = j = 14;
break;
}}

if (picki == -1) return;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
if (st.elevel != this.states[picki][pickj].elevel ) st.setRe$D(0);
}

if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
});

Clazz.newMeth(C$, 'transform$Z', function (novel) {
this.t = 0;
var x;
var y;
var i;
var j;
for (x = 0; x != 14; x++) for (y = 0; y != 14; y++) {
var st = this.states[x][y];
var nx = st.nx;
var ny = st.ny;
var a = 0;
var b = 0;
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
var q = this.hermite[nx][i] * this.hermite[ny][j];
a += q * this.func[i][j];
b += q * this.funci[i][j];
}

if (a < 0.01  && a > -0.01  ) a = 0;
if (b < 0.01  && b > -0.01  ) b = 0;
if (novel) b = 0;
st.setReIm$D$D(a, b);
}

this.cv.repaint$J(this.pause);
if (this.alwaysNormItem.getState()) this.normalize();
 else if (this.alwaysMaxItem.getState()) this.maximize();
});

Clazz.newMeth(C$, 'getPanelHeight', function () {
return (this.winSize.height/3|0);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateQuantumOsc$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) {
this.handleResize();
return;
}var g = this.dbimage.getGraphics();
var allQuiet = true;
var tadd = 0;
if (!this.stoppedCheck.getState() && !this.dragging ) {
var val = this.speedBar.getValue();
tadd = Math.exp(val / 20.0) * 0.02;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * 0.002;
this.t += tadd;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
if (this.gray1 == null ) {
this.gray1 = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
this.gray2 = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
}g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var j;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
var x;
var y;
this.xpoints = Clazz.array(Integer.TYPE, [3]);
this.xpoints = Clazz.array(Integer.TYPE, [3]);
if (this.dragStop) this.t = 0;
var norm = 0;
var normmult = 0;
var normmult2 = 0;
for (i = 0; i != 14; i++) {
for (j = 0; j != 14; j++) {
var st = this.states[i][j];
if (st.mag < 0.01 ) {
st.setRe$D(0);
continue;
}allQuiet = false;
st.rotate$D(-st.elevel * tadd);
norm += st.magSquared();
}
}
normmult2 = 1 / norm;
if (norm == 0 ) normmult2 = 0;
normmult = Math.sqrt(normmult2);
if (!this.changingDerivedStates) this.convertBasisToDerived();
this.genFunc$D(normmult);
var brightmult = Math.exp(this.brightnessBar.getValue() / 200.0 - 5);
if (norm == 0 ) normmult = normmult2 = 0;
if (this.dragStop) allQuiet = true;
var half = (this.sampleCount/2|0);
if (this.viewPotential != null ) {
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 100;
if (this.floorValues == null ) this.floorValues = Clazz.array(Integer.TYPE, [floory + 1]);
for (i = 0; i <= floory; i++) this.floorValues[i] = 0;

for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
var dy = st.elevel;
var m = st.magSquared();
var mc = ((224 * m)|0) + 1;
y = floory - ((ymult * dy)|0);
if (y >= 0 && y <= floory ) this.floorValues[y] = this.floorValues[y]+(mc);
}

for (i = 0; i <= floory; i++) {
if (this.floorValues[i] == 0) continue;
var mc = this.floorValues[i] + 32;
if (mc > 255) mc = 255;
g.setColor$java_awt_Color(this.grayLevels[mc]);
g.drawLine$I$I$I$I(0, i, this.winSize.width, i);
}
var oy = -1;
var xmult = this.alpha * this.sampleCount;
var omegax = (this.states[1][0].elevel - this.states[0][0].elevel) * 0.5;
if (this.aspectRatio != 1 ) {
var omegay = (this.states[0][1].elevel - this.states[0][0].elevel) * 0.5;
g.setColor$java_awt_Color(this.gray1);
for (i = 0; i != this.winSize.width; i++) {
var xx = ((i - (this.winSize.width/2|0)) / this.viewXMap.width) * xmult;
var dy = xx * xx * omegay ;
y = floory - ((ymult * dy)|0);
if (i > 0) g.drawLine$I$I$I$I(i - 1, oy, i, y);
oy = y;
}
}g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
for (i = 0; i != this.winSize.width; i++) {
var xx = ((i - (this.winSize.width/2|0)) / this.viewXMap.width) * xmult;
var dy = xx * xx * omegax ;
y = floory - ((ymult * dy)|0);
if (i > 0) g.drawLine$I$I$I$I(i - 1, oy, i, y);
oy = y;
}
if (norm != 0  && (this.expectCheckItem.getState() || this.uncertaintyCheckItem.getState() ) ) {
var expecte = 0;
var expecte2 = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
var prob = st.magSquared() * normmult2;
expecte += prob * st.elevel;
expecte2 += prob * st.elevel * st.elevel ;
}

var uncert = Math.sqrt(expecte2 - expecte * expecte);
if (this.uncertaintyCheckItem.getState()) {
if (!(uncert >= 0 )) uncert = 0;
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).blue);
y = floory - ((ymult * (expecte + uncert))|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
y = floory - ((ymult * (expecte - uncert))|0);
if (expecte - uncert >= 0 ) g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}if (this.expectCheckItem.getState()) {
y = floory - ((ymult * (expecte + 1.0E-4))|0);
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.selectedState != null  && !this.dragging ) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow);
y = floory - ((ymult * this.selectedState.elevel)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.viewXMap != null ) this.updateMapView$java_awt_Graphics$com_falstad_QuantumOscFrame_View$DAA$DAA$I$D(g, this.viewXMap, this.func, this.funci, this.sampleCount, brightmult);
if (this.viewPMap != null ) {
var pres = this.sampleCount * 2;
for (x = 0; x != this.sampleCount * this.sampleCount * 8 ; x++) this.data[x] = 0;

var ymult = pres * 2;
var nn = Clazz.array(Integer.TYPE, [2]);
nn[0] = nn[1] = pres;
var mask = pres - 1;
var s2 = this.sampleCount;
var poff = ((pres - this.sampleCount)/2|0);
for (x = 0; x != this.sampleCount; x++) for (y = 0; y != this.sampleCount; y++) {
var o = ((x + poff + s2 ) & mask) * 2 + ((y + poff + s2 ) & mask) * ymult;
this.data[o] = this.func[x][y];
this.data[o + 1] = this.funci[x][y];
}

this.ndfft$DA$IA$I$I(this.data, nn, 2, 1);
var m = 1.0 / (this.sampleCount * 2);
var s0 = 32;
var p0 = ((pres - s0 + 2)/2|0);
if (this.pfuncr == null ) {
this.pfuncr = Clazz.array(Double.TYPE, [s0 + 1, s0 + 1]);
this.pfunci = Clazz.array(Double.TYPE, [s0 + 1, s0 + 1]);
}for (x = 0; x <= s0; x++) for (y = 0; y <= s0; y++) {
var o = ((s0 - 1 - x  + p0 + s2) & mask) * 2 + ((s0 - 1 - y  + p0 + s2) & mask) * ymult;
this.pfuncr[x][y] = this.data[o] * m;
this.pfunci[x][y] = this.data[o + 1] * m;
}

this.updateMapView$java_awt_Graphics$com_falstad_QuantumOscFrame_View$DAA$DAA$I$D(g, this.viewPMap, this.pfuncr, this.pfunci, s0, brightmult);
} else {
this.pfuncr = this.pfunci = null;
}if (this.viewL != null ) {
var lzcount = 87;
this.calcLSpectrum();
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = Math.sqrt(this.lzspectrum[i]);

this.drawFunction$java_awt_Graphics$com_falstad_QuantumOscFrame_View$DA$DA$I$I(g, this.viewL, this.lzspectrum, null, lzcount, 0);
}if (this.viewStatesMap != null ) {
this.drawPhasors$java_awt_Graphics$com_falstad_QuantumOscFrame_View(g, this.viewStatesMap);
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
var termWidth = this.getTermWidth();
if (this.viewStatesMap.x > (termWidth * 3/2|0) && this.aspectRatio == 1  ) {
x = this.winSize.width - termWidth;
y = this.viewStatesMap.y + (this.viewStatesMap.height/2|0);
var omega = this.states[0][0].elevel;
var tcos = Math.cos(-omega * this.t + 1.5707963267948966);
var tsin = Math.sin(-omega * this.t + 1.5707963267948966);
var ss2 = (termWidth/2|0);
var xa = ((tcos * ss2)|0);
var ya = ((-tsin * ss2)|0);
g.drawOval$I$I$I$I(x - ss2, y - ss2, termWidth, termWidth);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.fillOval$I$I$I$I(x + xa - 1, y + ya - 1, 3, 3);
}}if (this.viewLStatesMap != null ) this.drawPhasors$java_awt_Graphics$com_falstad_QuantumOscFrame_View(g, this.viewLStatesMap);
if (this.selectedState != null  && this.viewXMap != null  ) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow);
if (Clazz.instanceOf(this.selectedState, "com.falstad.QuantumOscFrame.BasisState")) this.drawSelectedBasisState$java_awt_Graphics(g);
 else this.drawSelectedLzState$java_awt_Graphics(g);
}if (Clazz.instanceOf(this.selectedState, "com.falstad.QuantumOscFrame.DerivedState") && this.viewL != null  ) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow);
var lzcount = 87;
var m = (this.selectedState).lz * 3 + (lzcount/2|0);
x = (this.viewL.width * m/(lzcount - 1)|0);
g.drawLine$I$I$I$I(x, this.viewL.y, x, this.viewL.y + this.viewL.height);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'drawSelectedBasisState$java_awt_Graphics', function (g) {
var bst = this.selectedState;
var nx = bst.nx;
var ny = bst.ny;
var i;
var cross = 0;
var s0 = 0;
var xs = Clazz.array(Integer.TYPE, [nx + 2]);
var maxed = false;
var thresh = 0.02;
for (i = 0; i != this.sampleCount; i++) {
var draw = false;
if (Math.abs(this.hermite[nx][i]) > 0.1 ) maxed = true;
if (Math.abs(this.hermite[nx][i]) > thresh ) {
if (cross == 0) draw = true;
} else if (maxed && cross == nx + 1 ) draw = true;
if (draw || this.hermite[nx][i] * s0 < 0  ) {
var x = this.viewXMap.x + (this.viewXMap.width * i/(this.sampleCount + 1)|0);
xs[cross] = x;
s0 = this.hermite[nx][i];
cross++;
maxed = false;
}}
if (cross <= nx + 1) xs[cross++] = this.viewXMap.x + this.viewXMap.width;
cross = 0;
s0 = 0;
var ys = Clazz.array(Integer.TYPE, [ny + 2]);
maxed = false;
for (i = 0; i != this.sampleCount; i++) {
var draw = false;
if (Math.abs(this.hermite[ny][i]) > 0.1 ) maxed = true;
if (Math.abs(this.hermite[ny][i]) > thresh ) {
if (cross == 0) draw = true;
} else if (cross == ny + 1 && maxed ) draw = true;
if (draw || this.hermite[ny][i] * s0 < 0  ) {
var y = this.viewXMap.y + (this.viewXMap.height * i/(this.sampleCount + 1)|0);
ys[cross] = y;
s0 = this.hermite[ny][i];
cross++;
maxed = false;
}}
if (cross <= ny + 1) ys[cross] = this.viewXMap.y + this.viewXMap.height;
var j;
for (i = 0; i <= nx; i++) for (j = 0; j <= ny; j++) {
var x1 = xs[i];
var x0 = xs[i + 1] - xs[i];
var y1 = ys[j];
var y0 = ys[j + 1] - ys[j];
g.drawOval$I$I$I$I(x1 + (x0 * 10/100|0), y1 + (y0 * 10/100|0), (x0 * 80/100|0), (y0 * 80/100|0));
}

this.centerString$java_awt_Graphics$S$I(g, "nx = " + nx + ", ny = " + ny , this.viewX.y + this.viewX.height - 10);
});

Clazz.newMeth(C$, 'drawSelectedLzState$java_awt_Graphics', function (g) {
var ds = this.selectedState;
this.centerString$java_awt_Graphics$S$I(g, "n = " + (ds.bstates[0].nx + ds.bstates[0].ny) + ", m = " + ds.lz , this.viewX.y + this.viewX.height - 10);
var e = ds.elevel;
var xx = Math.sqrt(e * 2) / 1.7888;
var x = (((0.5 - xx) * this.viewXMap.width)|0);
if (x < 0) return;
g.drawOval$I$I$I$I(this.viewXMap.x + x, this.viewXMap.y + x, this.viewXMap.width - x * 2, this.viewXMap.width - x * 2);
});

Clazz.newMeth(C$, 'drawPhasors$java_awt_Graphics$com_falstad_QuantumOscFrame_View', function (g, v) {
var i;
for (i = 0; i != v.phasorCount; i++) {
var ph = v.phasors[i];
var st = ph.state;
var ss = ph.width;
var ss2 = (ss/2|0);
var x = ph.x + ss2;
var y = ph.y + ss2;
var yel = (this.selectedState != null  && this.selectedState.elevel == st.elevel  );
g.setColor$java_awt_Color(yel ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : st.mag == 0  ? this.gray2 : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(x - ss2, y - ss2, ss, ss);
var xa = ((st.re * ss2)|0);
var ya = ((-st.im * ss2)|0);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.fillOval$I$I$I$I(x + xa - 1, y + ya - 1, 3, 3);
}
});

Clazz.newMeth(C$, 'updateMapView$java_awt_Graphics$com_falstad_QuantumOscFrame_View$DAA$DAA$I$D', function (g, vmap, arrayr, arrayi, res, brightmult) {
var selectMag = 0;
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
g.drawRect$I$I$I$I(vmap.x - 1, vmap.y - 1, vmap.width + 2, vmap.height + 2);
var maxsq = 0;
var expectx = 0;
var expectx2 = 0;
var expecty = 0;
var expecty2 = 0;
var tot = 0;
var zero = (res/2|0);
var x;
var y;
for (y = 0; y <= res; y++) {
for (x = 0; x <= res; x++) {
var dr = arrayr[x][y];
var di = arrayi[x][y];
var dy = dr * dr + di * di;
if (dy > maxsq ) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev ;
dev = y - zero;
expecty += dy * dev;
expecty2 += dy * dev * dev ;
tot += dy;
}
}
expectx /= tot;
expectx2 /= tot;
expecty /= tot;
expecty2 /= tot;
var maxnm = Math.sqrt(maxsq);
var uncertx = Math.sqrt(expectx2 - expectx * expectx);
var uncerty = Math.sqrt(expecty2 - expecty * expecty);
var bestscale = 0;
if (this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() ) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
vmap.scale *= 1.1;
vmap.scale = bestscale;
if (vmap.scale > 1.0E8 ) vmap.scale = 1.0E8;
var res1 = res + 1;
var mis = true;
for (y = 0; y <= res; y++) {
for (x = 0; x <= res; x++) {
var fr = arrayr[x][y];
var fi = arrayi[x][y];
var fv = (fr * fr + fi * fi);
if (this.magPhaseCheckItem.isSelected()) fv = Math.sqrt(fv);
fv *= 255 * vmap.scale * brightmult ;
var c = this.getPhaseColor$D$D(fr, fi);
if (fv > 255 ) fv = 255;
var cr = ((c.r * fv)|0);
var cg = ((c.g * fv)|0);
var cb = ((c.b * fv)|0);
var col = -16777216 | (cr << 16) | (cg << 8) | cb ;
var x1 = (x * vmap.width/res1|0);
var y1 = (y * vmap.height/res1|0);
var x2 = ((x + 1) * vmap.width/res1|0);
var y2 = ((y + 1) * vmap.height/res1|0);
if (mis) {
var ix = x1 + y1 * vmap.width;
var k;
var l;
for (k = 0; k != x2 - x1; k++, ix++) for (l = 0; l != y2 - y1; l++) vmap.pixels[ix + l * vmap.width] = col;


} else {
g.setColor$java_awt_Color(Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).c$$I,[col]));
g.fillRect$I$I$I$I(x1 + vmap.x, y1 + vmap.y, x2 - x1, y2 - y1);
}}
}
if (mis) {
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.cv.createImage$java_awt_image_ImageProducer(vmap.imageSource), vmap.x, vmap.y, null);
}if (this.uncertaintyCheckItem.getState() && tot > 0  ) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).blue);
var xx1 = ((vmap.width * (expectx + zero - uncertx + 0.5) / res1 + vmap.x)|0);
var xx2 = ((vmap.width * (expectx + zero + uncertx + 0.5 ) / res1 + vmap.x)|0);
var yy1 = ((vmap.height * (expecty + zero - uncerty + 0.5) / res1 + vmap.y)|0);
var yy2 = ((vmap.height * (expecty + zero + uncerty + 0.5 ) / res1 + vmap.y)|0);
g.drawRect$I$I$I$I(xx1, yy1, xx2 - xx1, yy2 - yy1);
}if (this.expectCheckItem.getState() && tot > 0  ) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).red);
var xx = ((vmap.width * (expectx + zero + 0.5 ) / res1 + vmap.x)|0);
g.drawLine$I$I$I$I(xx, vmap.y, xx, vmap.y + vmap.height);
var yy = ((vmap.height * (expecty + zero + 0.5 ) / res1 + vmap.y)|0);
g.drawLine$I$I$I$I(vmap.x, yy, vmap.x + vmap.width, yy);
}});

Clazz.newMeth(C$, 'calcLSpectrum', function () {
var lzcount = 87;
if (this.lzspectrum == null ) this.lzspectrum = Clazz.array(Double.TYPE, [lzcount]);
var i;
var j;
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = 0;

var lc = ((lzcount/2|0));
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
var m = lc + 3 * ds.lz;
this.lzspectrum[m] += ds.magSquared();
}
});

Clazz.newMeth(C$, 'measureL', function () {
if (this.aspectRatio != 1 ) return;
this.normalize();
this.convertBasisToDerived();
this.calcLSpectrum();
var n = this.random.nextDouble();
var i = 0;
var picki = -1;
var lzcount = 87;
for (i = 0; i != lzcount; i++) {
var m = this.lzspectrum[i];
n -= m;
if (n < 0 ) {
picki = i;
i = lzcount;
break;
}}
if (picki == -1) return;
var lc = ((lzcount/2|0));
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
var m = lc + 3 * ds.lz;
if (m != picki) ds.setRe$D(0);
}
this.convertDerivedToBasis();
if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
});

Clazz.newMeth(C$, 'genFunc$D', function (normmult) {
var x;
var y;
var i;
var j;
for (x = 0; x <= this.sampleCount; x++) for (y = 0; y <= this.sampleCount; y++) {
var dr = 0;
var di = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
var q = this.hermite[st.nx][x] * this.hermite[st.ny][y];
dr += q * st.re;
di += q * st.im;
}

this.func[x][y] = dr * normmult;
this.funci[x][y] = di * normmult;
}

});

Clazz.newMeth(C$, 'getPhaseColor$D$D', function (x, y) {
var sector = 0;
var val = 0;
if (this.probCheckItem.isSelected()) return this.whitePhaseColor;
if (x == 0  && y == 0  ) return this.phaseColors[0][0];
if (y >= 0 ) {
if (x >= 0 ) {
if (x >= y ) {
sector = 0;
val = y / x;
} else {
sector = 1;
val = 1 - x / y;
}} else {
if (-x <= y ) {
sector = 2;
val = -x / y;
} else {
sector = 3;
val = 1 + y / x;
}}} else {
if (x <= 0 ) {
if (y >= x ) {
sector = 4;
val = y / x;
} else {
sector = 5;
val = 1 - x / y;
}} else {
if (-y >= x ) {
sector = 6;
val = -x / y;
} else {
sector = 7;
val = 1 + y / x;
}}}return this.phaseColors[sector][((val * 50)|0)];
});

Clazz.newMeth(C$, 'getTermWidth', function () {
var termWidth = (this.viewStatesMap.height/10|0);
return termWidth;
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 5:
this.editHandle$I(y);
break;
case 4:
this.editMag$I$I(x, y);
break;
case 1:
this.findStateByEnergy$I(y);
this.enterSelectedState();
break;
case 2:
this.editX$I$I(x, y);
break;
case 3:
this.editP$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'editHandle$I', function (y) {
var dy = y - this.viewList[this.selectedPaneHandle].paneY;
var upper = this.viewList[this.selectedPaneHandle - 1];
var lower = this.viewList[this.selectedPaneHandle];
var minheight = 10;
if (upper.height + dy < minheight || lower.height - dy < minheight ) return;
upper.height = upper.height+(dy);
lower.height = lower.height-(dy);
lower.y = lower.y+(dy);
lower.paneY = lower.paneY+(dy);
this.cv.repaint$J(this.pause);
this.setSubViews();
});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedPhasor == null ) return;
var stateSize = this.selectedPhasor.width;
var ss2 = (stateSize/2|0);
var x0 = this.selectedPhasor.x + ss2;
var y0 = this.selectedPhasor.y + ss2;
x = x-(x0);
y = y-(y0);
var mag = Math.sqrt(x * x + y * y) / ss2;
var ang = Math.atan2(-y, x);
if (mag > 10 ) mag = 0;
if (mag > 1 ) mag = 1;
this.selectedState.setMagPhase$D$D(mag, ang);
if (Clazz.instanceOf(this.selectedState, "com.falstad.QuantumOscFrame.DerivedState")) {
this.convertDerivedToBasis();
this.changingDerivedStates = true;
}if (this.alwaysNormItem.getState()) this.normalize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'convertDerivedToBasis', function () {
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].setRe$D(0);


var c = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
for (j = 0; j != ds.count; j++) {
c.set$com_falstad_Complex(ds.coefs[j]);
c.conjugate();
c.mult$com_falstad_Complex(ds);
ds.bstates[j].add$com_falstad_Complex(c);
}
}
var maxm = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) if (this.states[i][j].mag > maxm ) maxm = this.states[i][j].mag;


if (maxm > 1 ) {
var mult = 1 / maxm;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].multRe$D(mult);


}});

Clazz.newMeth(C$, 'convertBasisToDerived', function () {
var i;
var j;
var c1 = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
var c2 = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
var maxm = 0;
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
c1.setRe$D(0);
try {
for (j = 0; j != ds.count; j++) {
c2.set$com_falstad_Complex(ds.coefs[j]);
c2.mult$com_falstad_Complex(ds.bstates[j]);
c1.add$com_falstad_Complex(c2);
}
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
System.out.print$S("Exception at " + i + "\n" );
} else {
throw e;
}
}
if (c1.mag < 0.01 ) c1.setRe$D(0);
ds.set$com_falstad_Complex(c1);
if (c1.mag > maxm ) maxm = ds.mag;
}
if (maxm > 1 ) {
var mult = 1 / maxm;
for (i = 0; i != this.lzStateCount; i++) this.lzStates[i].multRe$D(mult);

}});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedState == null ) return;
if (this.magDragStart < 0.5 ) this.selectedState.setRe$D(1);
 else this.selectedState.setRe$D(0);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editX$I$I', function (x, y) {
var oldgx = this.selectedGridX;
var oldgy = this.selectedGridY;
switch (this.mouseChooser.getSelectedIndex()) {
case 0:
this.editXGauss$I$I(x, y);
return;
case 1:
this.editXGaussP$I$I(x, y);
return;
case 3:
this.editXTranslate$I$I(x, y);
return;
case 4:
this.editXScale$I$I(x, y);
return;
case 2:
this.editXRotate$I$I(x, y);
return;
}
this.findGridPoint2D$com_falstad_QuantumOscFrame_View$I$I(this.viewXMap, x, y);
var x1 = oldgx;
var y1 = oldgy;
var x2 = this.selectedGridX;
var y2 = this.selectedGridY;
if (x1 == x2 && y1 == y2 ) {
this.editFuncPoint$I$I$D(x2, y2, 1);
} else if (this.abs$I(y2 - y1) > this.abs$I(x2 - x1)) {
var sgn = this.sign$I(y2 - y1);
for (y = y1; y != y2 + sgn; y = y+(sgn)) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
this.editFuncPoint$I$I$D(x, y, 1);
}
} else {
var sgn = this.sign$I(x2 - x1);
for (x = x1; x != x2 + sgn; x = x+(sgn)) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.editFuncPoint$I$I$D(x, y, 1);
}
}this.transform$Z(false);
});

Clazz.newMeth(C$, 'editP$I$I', function (x, y) {
var oldgx = this.selectedGridX;
var oldgy = this.selectedGridY;
switch (this.mouseChooser.getSelectedIndex()) {
case 0:
this.editPGauss$I$I(x, y);
return;
}
});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'editFuncPoint$I$I$D', function (x, y, v) {
if (!this.dragSet && !this.dragClear ) {
this.dragClear = this.func[x][y] > 0.1 ;
this.dragSet = !this.dragClear;
}this.func[x][y] = (this.dragSet) ? v : 0;
this.dragStop = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editXTranslate$I$I', function (x, y) {
var offx = ((x - this.dragX) * this.sampleCount/this.viewXMap.width|0);
var offy = ((y - this.dragY) * this.sampleCount/this.viewXMap.height|0);
var i;
var j;
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
if (i - offx < 0 || j - offy < 0  || i - offx >= this.sampleCount  || j - offy >= this.sampleCount ) continue;
this.func[i][j] = this.translateFunc[i - offx][j - offy];
this.funci[i][j] = this.translateFunci[i - offx][j - offy];
}

this.transform$Z(false);
});

Clazz.newMeth(C$, 'editXScale$I$I', function (x, y) {
var i;
var j;
var cx = this.viewXMap.x + (this.viewXMap.width/2|0);
var cy = this.viewXMap.y + (this.viewXMap.height/2|0);
var scalex = (this.dragX - cx) / (x - cx);
var scaley = (this.dragY - cy) / (y - cy);
var hx = (this.sampleCount/2|0);
var hy = (this.sampleCount/2|0);
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
var i1 = (((i - hx) * scalex + hx + 0.5)|0);
var j1 = (((j - hy) * scaley + hy + 0.5)|0);
if (i1 < 0 || j1 < 0  || i1 >= this.sampleCount  || j1 >= this.sampleCount ) this.func[i][j] = this.funci[i][j] = 0;
 else {
this.func[i][j] = this.translateFunc[i1][j1];
this.funci[i][j] = this.translateFunci[i1][j1];
}}

this.transform$Z(false);
});

Clazz.newMeth(C$, 'editXRotate$I$I', function (x, y) {
if (this.aspectRatio != 1 ) return;
var cx = this.viewXMap.x + (this.viewXMap.width/2|0);
var cy = this.viewXMap.y + (this.viewXMap.height/2|0);
var angle1 = Math.atan2(-(this.dragY - cy), this.dragX - cx);
var angle2 = Math.atan2(-(y - cy), x - cx);
var ad = angle2 - angle1;
var i;
var j;
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
ds.rotate$D(-ad * ds.lz);
}
this.convertDerivedToBasis();
this.changingDerivedStates = true;
this.dragX = x;
this.dragY = y;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editXGauss$I$I', function (x, y) {
var i;
var j;
var gx = x - this.dragX;
var gy = y - this.dragY;
var wx = 1 / (this.abs$I(gx) + 1.0E-4);
var wy = 1 / (this.abs$I(gy) + 1.0E-4);
wx = -wx * wx * 10 ;
wy = -wy * wy * 10 ;
var rm = 32.0 / this.sampleCount;
rm *= rm;
this.lastGaussWx = wx;
this.lastGaussWy = wy;
wx *= this.aspectRatio * this.aspectRatio;
if (wx < -0.25 ) wx = -0.25;
if (wy < -0.25 ) wy = -0.25;
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
var x1 = i - this.selectedGridX;
var y1 = j - this.selectedGridY;
this.func[i][j] = Math.exp(rm * (wx * x1 * x1  + wy * y1 * y1 ));
}

this.transform$Z(true);
});

Clazz.newMeth(C$, 'editXGaussP$I$I', function (x, y) {
this.getMomentumCoords$com_falstad_QuantumOscFrame_View$I$I(this.viewXMap, x - this.dragX + this.viewXMap.x + (this.viewXMap.width/2|0), y - this.dragY + this.viewXMap.y + (this.viewXMap.height/2|0));
this.drawXGaussP();
});

Clazz.newMeth(C$, 'drawXGaussP', function () {
var i;
var j;
var wx = this.lastGaussWx;
var wy = this.lastGaussWy;
wx *= this.aspectRatio * this.aspectRatio;
if (wx < -0.25 ) wx = -0.25;
if (wy < -0.25 ) wy = -0.25;
var rm = 32.0 / this.sampleCount;
rm *= rm;
for (i = 0; i <= this.sampleCount; i++) for (j = 0; j <= this.sampleCount; j++) {
var x1 = i - this.selectedGridX;
var y1 = j - this.selectedGridY;
var n = Math.exp(rm * (wx * x1 * x1  + wy * y1 * y1 ));
var cx = Math.cos(this.momentumX * x1);
var cy = Math.cos(this.momentumY * y1);
var sx = Math.sin(this.momentumX * x1);
var sy = Math.sin(this.momentumY * y1);
this.func[i][j] = n * (cx * cy - sx * sy);
this.funci[i][j] = n * (cx * sy + cy * sx);
}

this.transform$Z(false);
});

Clazz.newMeth(C$, 'getMomentumCoords$com_falstad_QuantumOscFrame_View$I$I', function (v, x, y) {
var pres = this.sampleCount * 2;
var s0 = 32;
var p0 = ((pres - s0 + 2)/2|0);
this.momentumX = ((((x - v.x - 1 ) * s0/(v.width - 2)|0)) - (s0/2|0)) * 3.141592653589793 / this.sampleCount;
this.momentumY = ((((y - v.y - 1 ) * s0/(v.height - 2)|0)) - (s0/2|0)) * 3.141592653589793 / this.sampleCount;
if (this.momentumX > 3.141592653589793 ) this.momentumX = 3.141592653589793;
if (this.momentumY > 3.141592653589793 ) this.momentumY = 3.141592653589793;
if (this.momentumX < -3.141592653589793 ) this.momentumX = -3.141592653589793;
if (this.momentumY < -3.141592653589793 ) this.momentumY = -3.141592653589793;
});

Clazz.newMeth(C$, 'editPGauss$I$I', function (x, y) {
var i;
var j;
var gx = x - this.dragX;
var gy = y - this.dragY;
var wx = this.aspectRatio / (this.abs$I(gx) + 1.0E-4);
var wy = 1 / (this.abs$I(gy) + 1.0E-4);
wx = -wx * wx * 10 ;
wy = -wy * wy * 10 ;
if (wx < -0.25 ) wx = -0.25;
if (wy < -0.25 ) wy = -0.25;
var rm = 32.0 / this.sampleCount;
rm *= rm;
this.getMomentumCoords$com_falstad_QuantumOscFrame_View$I$I(this.viewPMap, this.dragX, this.dragY);
for (i = 0; i <= this.sampleCount; i++) for (j = 0; j <= this.sampleCount; j++) {
var x1 = i - (this.sampleCount/2|0);
var y1 = j - (this.sampleCount/2|0);
var n = Math.exp(rm * (wx * x1 * x1  + wy * y1 * y1 ));
var cx = Math.cos(this.momentumX * x1);
var cy = Math.cos(this.momentumY * y1);
var sx = Math.sin(this.momentumX * x1);
var sy = Math.sin(this.momentumY * y1);
this.func[i][j] = n * (cx * cy - sx * sy);
this.funci[i][j] = n * (cx * sy + cy * sx);
}

this.transform$Z(false);
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_QuantumOscFrame_View$DA$DA$I$I', function (g, view, fr, fi, count, offset) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var zero = (this.winSize.width/2|0);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var dr = fr[ii];
var di = (fi == null ) ? 0 : fi[ii];
var dy = dr * dr + di * di;
if (dy > maxsq ) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev ;
tot += dy;
}
expectx /= tot;
expectx2 /= tot;
var maxnm = Math.sqrt(maxsq);
var uncert = Math.sqrt(expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 0;
if (fi != null  && (this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() ) ) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
view.scale = bestscale;
if (view.scale > 1.0E8 ) view.scale = 1.0E8;
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).gray);
var mid_x = (this.winSize.width * ((count/2|0))/(count - 1)|0);
g.drawLine$I$I$I$I(mid_x, view.y, mid_x, view.y + view.height);
var mid_y = view.lower_y;
var mult = view.ymult2 * view.scale;
if (fi != null ) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).blue);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fi[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
ox = -1;
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fr[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
if (maxsq > 0 ) {
expectx += zero;
if (this.uncertaintyCheckItem.getState()) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(((expectx - uncert)|0), view.y, ((expectx - uncert)|0), view.y + view.height);
g.drawLine$I$I$I$I(((expectx + uncert)|0), view.y, ((expectx + uncert)|0), view.y + view.height);
}if (this.expectCheckItem.getState()) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I((expectx|0), view.y, (expectx|0), view.y + view.height);
}}});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.exitItem ) {
this.applet.destroyFrame();
return;
}this.cv.repaint();
if (e.getSource() === this.groundButton ) this.doGround();
if (e.getSource() === this.blankButton ) this.doBlank();
if (e.getSource() === this.normalizeButton ) this.normalize();
if (e.getSource() === this.maximizeButton ) this.maximize();
if (e.getSource() === this.measureEItem ) this.measureE();
if (e.getSource() === this.measureLItem ) this.measureL();
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.resBar ) this.setLoadCount();
if (e.getSource() === this.aspectBar ) {
this.setLoadCount();
if (this.aspectRatio == 1 ) {
this.measureLItem.enable();
this.lCheckItem.enable();
this.lStatesCheckItem.enable();
} else {
this.measureLItem.disable();
this.lCheckItem.disable();
this.lStatesCheckItem.disable();
}}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'destroyFrame', function () {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
});

Clazz.newMeth(C$, 'setLoadCount', function () {
var q = this.resBar.getValue();
this.sampleCount = 1;
while (q-- > 0)this.sampleCount = this.sampleCount*(2);

if (this.sampleCount < 8) this.sampleCount = 8;
System.out.print$S("sampleCount = " + this.sampleCount + "\n" );
this.states = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').BasisState))), [14, 14]);
this.aspectRatio = this.aspectBar.getValue() / 10.0;
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
this.states[i][j] = Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').BasisState))), [this, null]);
var nx = i;
var ny = j;
this.states[i][j].nx = nx;
this.states[i][j].ny = ny;
this.states[i][j].elevel = (0.5 + nx) / (this.aspectRatio * this.aspectRatio) + 0.5 + ny;
}

this.func = Clazz.array(Double.TYPE, [this.sampleCount + 1, this.sampleCount + 1]);
this.funci = Clazz.array(Double.TYPE, [this.sampleCount + 1, this.sampleCount + 1]);
this.pfuncr = this.pfunci = null;
this.step = 3.141592653589793 / this.sampleCount;
this.data = Clazz.array(Double.TYPE, [this.sampleCount * this.sampleCount * 2 * 4 ]);
var mult = 0.04 / this.states[0][0].elevel;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].elevel *= mult;


this.hermite = Clazz.array(Double.TYPE, [15, this.sampleCount + 1]);
var xp = Clazz.array(Double.TYPE, [14]);
this.alpha = 9.6 / this.sampleCount;
for (i = 0; i <= this.sampleCount; i++) {
var x = this.alpha * (i - (this.sampleCount/2|0));
var e = Math.exp(-x * x * 0.5 );
xp[1] = x;
for (j = 2; j != 14; j++) xp[j] = xp[j - 1] * x;

this.hermite[0][i] = e;
this.hermite[1][i] = 2 * x * e ;
this.hermite[2][i] = (4 * x * x  - 2) * e;
this.hermite[3][i] = (8 * xp[3] - 12 * x) * e;
this.hermite[4][i] = (16 * xp[4] - 48 * x * x  + 12) * e;
this.hermite[5][i] = (32 * xp[5] - 160 * xp[3] + 120 * x) * e;
this.hermite[6][i] = (-120 + 720 * x * x  - 480 * xp[4] + 64 * xp[6]) * e;
this.hermite[7][i] = (-1680 * x + 3360 * xp[3] - 1344 * xp[5] + 128 * xp[7]) * e;
this.hermite[8][i] = (1680 - 13440 * x * x  + 13440 * xp[4] - 3584 * xp[6] + 256 * xp[8]) * e;
this.hermite[9][i] = (30240 * x - 80640 * xp[3] + 48384 * xp[5] - 9216 * xp[7] + 512 * xp[9]) * e;
this.hermite[10][i] = (-30240 + 302400 * xp[2] - 403200 * xp[4] + 161280 * xp[6] - 23040 * xp[8] + 1024 * xp[10]) * e;
this.hermite[11][i] = (-665280 * x + 2217600 * xp[3] - 1774080 * xp[5] + 506880 * xp[7] - 56320 * xp[9] + 2048 * xp[11]) * e;
this.hermite[12][i] = (665280 - 7983360 * xp[2] + 13305600 * xp[4] - 7096320 * xp[6] + 1520640 * xp[8] - 135168 * xp[10] + 4096 * xp[12]) * e;
this.hermite[13][i] = (17297280 * x - 69189120 * xp[3] + 69189120 * xp[5] - 26357760 * xp[7] + 4392960 * xp[9] - 319488 * xp[11] + 8192 * xp[13]) * e;
}
for (i = 0; i != 14; i++) {
var dy = 0;
for (j = 0; j <= this.sampleCount; j++) dy += this.hermite[i][j] * this.hermite[i][j];

dy = Math.sqrt(dy);
if (dy > 0 ) {
for (j = 0; j <= this.sampleCount; j++) this.hermite[i][j] /= dy;

}}
var m;
var n;
this.lzStateCount = 105;
this.lzStates = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').DerivedState))), [this.lzStateCount]);
var x = Clazz.array((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))), [1]);
x[0] = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(1, 0);
this.setLzState$I$I$com_falstad_ComplexA(0, 0, x);
this.calcLzStates$com_falstad_ComplexA$I$I(x, 0, 0);
this.setupDisplay();
});

Clazz.newMeth(C$, 'setLzState$I$I$com_falstad_ComplexA', function (d, g, coefs) {
var st = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').DerivedState))), [this, null]);
var n = 1 + d + g ;
var pos = ((n * (n - 1))/2|0) + d;
var m = d - g;
this.lzStates[pos] = st;
st.count = n;
st.bstates = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.QuantumOscFrame').BasisState))), [n]);
st.coefs = coefs;
var i;
for (i = 1; i <= n; i++) st.bstates[i - 1] = this.states[i - 1][n - i];

st.lz = m;
st.elevel = this.states[n - 1][0].elevel;
});

Clazz.newMeth(C$, 'calcLzStates$com_falstad_ComplexA$I$I', function (arr0, d, g) {
var n = 2 + d + g ;
if (n > 14) return;
this.calcLzStatesD$com_falstad_ComplexA$I$I(arr0, d + 1, g);
var arr1 = Clazz.array((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))), [n]);
var j;
var c2 = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
for (j = 0; j != n; j++) {
var c = arr1[j] = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
if (j > 0) {
c.set$com_falstad_Complex(arr0[j - 1]);
c.multRe$D(Math.sqrt(j));
} else c.setRe$D(0);
if (j < n - 1) {
c2.set$com_falstad_Complex(arr0[j]);
c2.multReIm$D$D(0, -Math.sqrt(n - j - 1 ));
} else c2.setRe$D(0);
c.add$com_falstad_Complex(c2);
c.multRe$D(1 / Math.sqrt(2 * (g + 1)));
}
this.setLzState$I$I$com_falstad_ComplexA(d, g + 1, arr1);
this.calcLzStates$com_falstad_ComplexA$I$I(arr1, d, g + 1);
});

Clazz.newMeth(C$, 'calcLzStatesD$com_falstad_ComplexA$I$I', function (arr0, d, g) {
var n = 1 + d + g ;
if (n > 14) return;
var arr1 = Clazz.array((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))), [n]);
var i;
var j;
var c2 = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
for (j = 0; j != n; j++) {
var c = arr1[j] = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.Complex'))));
if (j > 0) {
c.set$com_falstad_Complex(arr0[j - 1]);
c.multRe$D(Math.sqrt(j));
} else c.setRe$D(0);
if (j < n - 1) {
c2.set$com_falstad_Complex(arr0[j]);
c2.multReIm$D$D(0, Math.sqrt(n - j - 1 ));
} else c2.setRe$D(0);
c.add$com_falstad_Complex(c2);
c.multRe$D(1 / Math.sqrt(2 * d));
}
this.setLzState$I$I$com_falstad_ComplexA(d, g, arr1);
this.calcLzStatesD$com_falstad_ComplexA$I$I(arr1, d + 1, g);
});

Clazz.newMeth(C$, 'findGridPoint2D$com_falstad_QuantumOscFrame_View$I$I', function (v, mx, my) {
var res1 = this.sampleCount + 1;
this.selectedGridX = ((mx - v.x) * res1/v.width|0);
this.selectedGridY = ((my - v.y) * res1/v.height|0);
var f = 1;
if (this.selectedGridX < f) this.selectedGridX = f;
if (this.selectedGridY < f) this.selectedGridY = f;
if (this.selectedGridX > this.sampleCount - f) this.selectedGridX = this.sampleCount - f;
if (this.selectedGridY > this.sampleCount - f) this.selectedGridY = this.sampleCount - f;
this.selectedGridFunc = this.func[this.selectedGridX][this.selectedGridY];
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.changingDerivedStates = false;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if (this.dragging) return;
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var panelHeight = this.getPanelHeight();
var oldSelectedState = this.selectedState;
this.selectedState = null;
this.selectedPhasor = null;
this.selectedPaneHandle = -1;
this.selection = 0;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3 ) {
this.selectedPaneHandle = i;
this.selection = 5;
}}
if (this.viewXMap != null  && this.viewXMap.inside$I$I(x, y) ) this.selection = 2;
 else if (this.viewPMap != null  && this.viewPMap.inside$I$I(x, y) ) this.selection = 3;
 else if (this.viewPotential != null  && this.viewPotential.contains$I$I(x, y) ) {
this.selection = 1;
this.findStateByEnergy$I(y);
} else if (this.viewStatesMap != null  && this.viewStatesMap.inside$I$I(x, y) ) this.findPhasor$com_falstad_QuantumOscFrame_View$I$I(this.viewStatesMap, x, y);
 else if (this.viewLStatesMap != null  && this.viewLStatesMap.inside$I$I(x, y) ) this.findPhasor$com_falstad_QuantumOscFrame_View$I$I(this.viewLStatesMap, x, y);
if (this.selectedState !== oldSelectedState ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'findPhasor$com_falstad_QuantumOscFrame_View$I$I', function (v, x, y) {
var i;
for (i = 0; i != v.phasorCount; i++) {
if (!v.phasors[i].inside$I$I(x, y)) continue;
this.selectedPhasor = v.phasors[i];
this.selectedState = this.selectedPhasor.state;
this.selection = 4;
break;
}
});

Clazz.newMeth(C$, 'findStateByEnergy$I', function (y) {
var i;
var j;
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 100;
var dist = 100;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var yy = floory - ((ymult * this.states[i][j].elevel)|0);
var d = Math.abs(y - yy);
if (d < dist ) {
dist = d;
this.selectedState = this.states[i][j];
}}

});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (this.selection == 4) this.editMagClick();
if (e.getClickCount() == 2 && this.selectedState != null  ) this.enterSelectedState();
});

Clazz.newMeth(C$, 'enterSelectedState', function () {
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) if (this.states[i][j] !== this.selectedState ) this.states[i][j].setRe$D(0);


this.convertBasisToDerived();
this.selectedState.setRe$D(1);
if (Clazz.instanceOf(this.selectedState, "com.falstad.QuantumOscFrame.DerivedState")) this.convertDerivedToBasis();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selection != 0 ) {
this.selectedPaneHandle = -1;
this.selectedState = null;
this.selectedPhasor = null;
this.selection = 0;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.mouseMoved$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) == 0) return;
if (this.selection == 2) this.findGridPoint2D$com_falstad_QuantumOscFrame_View$I$I(this.viewXMap, e.getX(), e.getY());
 else if (this.selection == 3) this.findGridPoint2D$com_falstad_QuantumOscFrame_View$I$I(this.viewPMap, e.getX(), e.getY());
if (this.selection == 2 && (this.mouseChooser.getSelectedIndex() == 3 || this.mouseChooser.getSelectedIndex() == 4 ) ) this.saveTranslateData();
this.dragStartX = e.getX();
this.dragStartY = e.getY();
if (this.selectedState != null ) this.magDragStart = this.selectedState.mag;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'saveTranslateData', function () {
this.translateFunc = this.func;
this.translateFunci = this.funci;
this.func = Clazz.array(Double.TYPE, [this.sampleCount + 1, this.sampleCount + 1]);
this.funci = Clazz.array(Double.TYPE, [this.sampleCount + 1, this.sampleCount + 1]);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = this.dragStop = this.changingDerivedStates = false;
this.dragSet = this.dragClear = false;
this.translateFunc = this.translateFunci = null;
this.mouseMoved$java_awt_event_MouseEvent(e);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) {
return;
}if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (Clazz.instanceOf(e.getItemSelectable(), "a2s.CheckboxMenuItem")) {
this.handleResize();
this.cv.repaint$J(this.pause);
}if (e.getItemSelectable() === this.alwaysNormItem  && this.alwaysNormItem.getState() ) {
this.normalize();
this.alwaysMaxItem.setState$Z(false);
this.cv.repaint$J(this.pause);
}if (e.getItemSelectable() === this.alwaysMaxItem  && this.alwaysMaxItem.getState() ) {
this.maximize();
this.alwaysNormItem.setState$Z(false);
this.cv.repaint$J(this.pause);
}var i;
for (i = 0; i != this.waveFunctionMenu.countItems(); i++) if (e.getItemSelectable() === this.waveFunctionMenu.getItem$I(i) ) {
var j;
(this.waveFunctionMenu.getItem$I(i)).setState$Z(true);
for (j = 0; j != this.waveFunctionMenu.countItems(); j++) if (i != j) (this.waveFunctionMenu.getItem$I(j)).setState$Z(false);

}
});

Clazz.newMeth(C$, 'ndfft$DA$IA$I$I', function (data, nn, ndim, isign) {
var ntot = 1;
var nprev = 1;
var idim;
var i2pi = isign * 2 * 3.141592653589793 ;
for (idim = 0; idim < ndim; idim++) ntot = ntot*(nn[idim]);

for (idim = 0; idim < ndim; idim++) {
var n = nn[idim];
var nrem = (ntot/(n * nprev)|0);
var ip1 = 2 * nprev;
var ip2 = ip1 * n;
var ip3 = ip2 * nrem;
var i2rev = 0;
var i2;
var ifp1;
for (i2 = 0; i2 < ip2; i2 = i2+(ip1)) {
var ibit;
if (i2 < i2rev) {
var i1;
for (i1 = i2; i1 < i2 + ip1; i1 = i1+(2)) {
var i3;
for (i3 = i1; i3 < ip3; i3 = i3+(ip2)) {
var i3rev = i2rev + i3 - i2;
var tempr = data[i3];
var tempi = data[i3 + 1];
data[i3] = data[i3rev];
data[i3 + 1] = data[i3rev + 1];
data[i3rev] = tempr;
data[i3rev + 1] = tempi;
}
}
}ibit = (ip2/2|0);
while ((ibit > ip1) && (i2rev > ibit - 1) ){
i2rev = i2rev-(ibit);
ibit = (ibit/(2)|0);
}
i2rev = i2rev+(ibit);
}
ifp1 = ip1;
while (ifp1 < ip2){
var ifp2 = 2 * ifp1;
var theta = i2pi / (ifp2 / ip1);
var wpr;
var wpi;
var wr = 1.0;
var wi = 0.0;
var i3;
wpr = Math.sin(0.5 * theta);
wpr *= wpr * -2.0;
wpi = Math.sin(theta);
for (i3 = 0; i3 < ifp1; i3 = i3+(ip1)) {
var i1;
var wtemp;
for (i1 = i3; i1 < i3 + ip1; i1 = i1+(2)) {
for (i2 = i1; i2 < ip3; i2 = i2+(ifp2)) {
var i21 = i2 + 1;
var k2 = i2 + ifp1;
var k21 = k2 + 1;
var tempr = (wr * data[k2]) - (wi * data[k21]);
var tempi = (wr * data[k21]) + (wi * data[k2]);
data[k2] = data[i2] - tempr;
data[k21] = data[i21] - tempi;
data[i2] += tempr;
data[i21] += tempi;
}
}
wtemp = wr;
wr += (wr * wpr) - (wi * wpi);
wi += (wi * wpr) + (wtemp * wpi);
}
ifp1 = ifp2;
}
nprev = nprev*(n);
}
});
;
(function(){var C$=Clazz.newClass(P$.QuantumOscFrame, "PhaseColor", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.r = 0;
this.g = 0;
this.b = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$D$D$D', function (rr, gg, bb) {
C$.$init$.apply(this);
this.r = rr;
this.g = gg;
this.b = bb;
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumOscFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.paneY = 0;
this.imageSource = null;
this.pixels = null;
this.phasorCount = 0;
this.phasors = null;
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
this.mid_y = 0;
this.lower_y = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_QuantumOscFrame_View', function (v) {
C$.superclazz.c$$java_awt_Rectangle.apply(this, [v]);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumOscFrame, "Phasor", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.state = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I', function (x, y, a, b) {
C$.superclazz.c$$I$I$I$I.apply(this, [x, y, a, b]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumOscFrame, "State", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'com.falstad.Complex');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.elevel = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumOscFrame, "BasisState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumOscFrame','com.falstad.QuantumOscFrame.State']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.nx = 0;
this.ny = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumOscFrame, "DerivedState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumOscFrame','com.falstad.QuantumOscFrame.State']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.count = 0;
this.lz = 0;
this.bstates = null;
this.coefs = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:09
