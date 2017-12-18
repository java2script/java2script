(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumCircFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxSampleCount = 0;
this.maxDispPhasorsR = 0;
this.maxDispPhasorsTh = 0;
this.sampleCountR = 0;
this.sampleCountTh = 0;
this.modeCountR = 0;
this.modeCountTh = 0;
this.modeCountM = 0;
this.fftTh = null;
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
this.colorCheck = null;
this.brightnessBar = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.phasorBar = null;
this.pZoomBar = null;
this.pZoomBarValue = 0;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewStates = null;
this.viewXMap = null;
this.viewPMap = null;
this.viewStatesMap = null;
this.viewL = null;
this.viewList = null;
this.viewCount = 0;
this.editingFunc = false;
this.dragStop = false;
this.magcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefsin = null;
this.phasecoefadj = null;
this.angle1SinTab = null;
this.angle1CosTab = null;
this.angle2SinTab = null;
this.angle2CosTab = null;
this.elevels = null;
this.xformbuf = null;
this.lzspectrum = null;
this.step = 0;
this.func = null;
this.funci = null;
this.pfunc = null;
this.pfunci = null;
this.phaseColors = null;
this.whitePhaseColor = null;
this.grayLevels = null;
this.xpoints = null;
this.ypoints = null;
this.floorValues = null;
this.xStates = null;
this.pStates = null;
this.selectedCoefX = 0;
this.selectedCoefY = 0;
this.selectedGridX = 0;
this.selectedGridY = 0;
this.selectedPaneHandle = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragSet = false;
this.dragClear = false;
this.viewZoom = 0;
this.viewZoomDragStart = 0;
this.scaleHeight = 0;
this.viewHeight = 0;
this.viewHeightDragStart = 0;
this.viewDistance = 0;
this.magDragStart = 0;
this.dragging = false;
this.t = 0;
this.pause = 0;
this.scalex = 0;
this.scaley = 0;
this.centerX3d = 0;
this.centerY3d = 0;
this.topz = 0;
this.brightmult = 0;
this.cv = null;
this.applet = null;
this.useFrame = false;
this.showControls = false;
this.main = null;
this.useBufferedImage = false;
this.radioGroup = null;
this.shown = false;
this.lspacing = 0;
this.lastTime = 0;
this.lastGaussWx = 0;
this.lastGaussWy = 0;
this.finished = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxSampleCount = 70;
this.maxDispPhasorsR = 10;
this.maxDispPhasorsTh = 21;
this.viewZoom = 1;
this.scaleHeight = 6;
this.viewHeight = -14;
this.topz = 3;
this.useBufferedImage = false;
this.shown = false;
this.lspacing = 3;
this.lastGaussWx = -8;
this.lastGaussWy = -8;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "QuantumCirc Series by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_QuantumCirc', function (a) {
C$.superclazz.c$$S.apply(this, ["Quantum Circular Box Applet v1.5a"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, 1);

Clazz.newMeth(C$, 'init', function () {
try {
if (this.applet != null ) {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.useFrame = false;
param = this.applet.getParameter$S("showControls");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.showControls = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.selectedCoefX = this.selectedCoefY = -1;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.QuantumCircLayout')))));
this.cv = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.QuantumCircCanvas'))).c$$com_falstad_QuantumCircFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.eCheckItem = this.getCheckItem$S("Energy"));
this.eCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.xCheckItem = this.getCheckItem$S("Position"));
this.xCheckItem.setState$Z(true);
this.xCheckItem.disable();
m.add$javax_swing_JMenuItem(this.pCheckItem = this.getCheckItem$S("Linear Momentum"));
m.add$javax_swing_JMenuItem(this.lCheckItem = this.getCheckItem$S("Angular Momentum"));
m.add$javax_swing_JMenuItem(this.statesCheckItem = this.getCheckItem$S("State Phasors"));
this.statesCheckItem.setState$Z(true);
m.addSeparator();
m.add$javax_swing_JMenuItem(this.expectCheckItem = this.getCheckItem$S("Expectation Values"));
m.add$javax_swing_JMenuItem(this.uncertaintyCheckItem = this.getCheckItem$S("Uncertainties"));
var m2 = this.waveFunctionMenu = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["Wave Function"]);
m.add$javax_swing_JMenuItem(m2);
m2.add$javax_swing_JMenuItem(this.probCheckItem = this.getRadioItem$S("Probability"));
m2.add$javax_swing_JMenuItem(this.probPhaseCheckItem = this.getRadioItem$S("Probability + Phase"));
m2.add$javax_swing_JMenuItem(this.magPhaseCheckItem = this.getRadioItem$S("Magnitude + Phase"));
this.magPhaseCheckItem.setSelected$Z(true);
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["Measure"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.measureEItem = this.getMenuItem$S("Measure Energy"));
m.add$javax_swing_JMenuItem(this.measureLItem = this.getMenuItem$S("Measure Angular Momentum"));
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.alwaysNormItem = this.getCheckItem$S("Always Normalize"));
m.add$javax_swing_JMenuItem(this.alwaysMaxItem = this.getCheckItem$S("Always Maximize"));
this.alwaysMaxItem.setState$Z(true);
this.setMenuBar$a2s_MenuBar(mb);
this.mouseChooser = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Choice'))));
this.mouseChooser.add$S("Mouse = Create Gaussian");
this.mouseChooser.add$S("Mouse = Gaussian w/ Momentum");
this.mouseChooser.add$S("Mouse = Rotate Function");
this.mouseChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.mouseChooser);
this.mouseChooser.select$I(0);
this.main.add$java_awt_Component(this.blankButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.normalizeButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Normalize"]));
this.normalizeButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.maximizeButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Maximize"]));
this.maximizeButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.groundButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Ground State"]));
this.groundButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 105, 1, 1, 300]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 980, 1, 700, 2000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 16, 1, 2, (this.maxSampleCount/2|0)]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Momentum Zoom", 0]));
this.main.add$java_awt_Component(this.pZoomBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 166, 1, 45, 260]));
this.pZoomBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Phasor Count", 0]));
this.main.add$java_awt_Component(this.phasorBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, (this.maxSampleCount/2|0)]));
this.phasorBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setResolution();
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
this.phaseColors = Clazz.array((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))), [8, 51]);
for (i = 0; i != 8; i++) for (j = 0; j <= 50; j++) {
var ang = java.lang.Math.atan(j / 50.0);
this.phaseColors[i][j] = this.genPhaseColor$I$D(i, ang);
}

this.whitePhaseColor = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 1, 1]);
this.grayLevels = Clazz.array((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))), [256]);
for (i = 0; i != 256; i++) this.grayLevels[i] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[i, i, i]);

this.random = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).lightGray);
if (this.useFrame) {
this.setSize$I$I(800, 640);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
} else {
this.setVisible$Z(false);
this.handleResize();
this.applet.validate();
}this.finished = true;
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
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, 1, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, a3, 1, 0]);
break;
case 2:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, 0, 1, a2]);
break;
case 3:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, 0, a3, 1]);
break;
case 4:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, a2, 0, 1]);
break;
case 5:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 0, a3]);
break;
}
return c;
});

Clazz.newMeth(C$, 'reinit', function () {
this.doBlank();
this.magcoef[1][0] = 1;
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
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
this.viewX = this.viewL = this.viewP = this.viewPotential = this.viewStates = null;
this.viewList = Clazz.array((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))), [10]);
var i = 0;
if (this.eCheckItem.getState()) this.viewList[i++] = this.viewPotential = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))), [this, null]);
if (this.pCheckItem.getState()) this.viewList[i++] = this.viewP = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))), [this, null]);
if (this.lCheckItem.getState()) this.viewList[i++] = this.viewL = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))), [this, null]);
if (this.statesCheckItem.getState()) this.viewList[i++] = this.viewStates = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))), [this, null]);
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
var h = (toth/sizenum|0);
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
this.viewXMap = null;
this.viewStatesMap = null;
if (this.viewStates != null ) {
this.viewStatesMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))).c$$com_falstad_QuantumCircFrame_View, [this, null, this.viewStates]);
var a = this.viewStates.width / this.viewStates.height;
var a2 = this.modeCountTh / this.modeCountR;
var w;
var h;
if (a2 > a ) w = this.viewStates.width - 2;
 else w = (((this.viewStates.height - 2) * a2)|0);
this.viewStatesMap.x = this.viewStatesMap.x+(((this.viewStatesMap.width - w)/2|0) + 1);
this.viewStatesMap.width = w;
}if (this.viewX != null ) {
this.viewXMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))).c$$com_falstad_QuantumCircFrame_View, [this, null, this.viewX]);
this.processMap$com_falstad_QuantumCircFrame_View(this.viewXMap);
}if (this.viewP != null ) {
this.viewPMap = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumCircFrame').View))).c$$com_falstad_QuantumCircFrame_View, [this, null, this.viewP]);
this.processMap$com_falstad_QuantumCircFrame_View(this.viewPMap);
}if (this.viewL != null ) {
var v = this.viewL;
v.mid_y = v.y + (v.height/2|0);
v.ymult = 0.9 * v.height / 2;
v.lower_y = ((v.mid_y + v.ymult)|0);
v.ymult2 = v.ymult * 2;
}this.floorValues = null;
});

Clazz.newMeth(C$, 'processMap$com_falstad_QuantumCircFrame_View', function (v) {
var a = v.width / v.height;
var w;
var h;
if (1 > a ) w = h = v.width - 2;
 else w = h = v.height - 2;
v.x = v.x+(((v.width - w)/2|0) + 1);
v.y = v.y+(((v.height - h)/2|0) + 1);
v.width = w;
v.height = h;
if (this.useBufferedImage) {
try {
var biclass = Clazz.forName("java.awt.image.BufferedImage");
var dbiclass = Clazz.forName("java.awt.image.DataBufferInt");
var rasclass = Clazz.forName("java.awt.image.Raster");
var cstr = biclass.getConstructor$ClassA(Clazz.array(java.lang.Class, -1, [Integer.TYPE, Integer.TYPE, Integer.TYPE]));
v.memimage = cstr.newInstance$OA(Clazz.array(java.lang.Object, -1, [ new Integer(v.width),  new Integer(v.height),  new Integer(1)]));
var m = biclass.getMethod$S$ClassA("getRaster", null);
var ras = m.invoke$O$OA(v.memimage, null);
var db = rasclass.getMethod$S$ClassA("getDataBuffer", null).invoke$O$OA(ras, null);
v.pixels = dbiclass.getMethod$S$ClassA("getData", null).invoke$O$OA(db, null);
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
System.out.println$S("BufferedImage failed");
} else {
throw ee;
}
}
}if (v.pixels == null ) {
v.pixels = Clazz.array(Integer.TYPE, [v.width * v.height]);
var i;
for (i = 0; i != v.width * v.height; i++) v.pixels[i] = -16777216;

v.imageSource = Clazz.new_((I$[19]||(I$[19]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[v.width, v.height, v.pixels, 0, v.width]);
v.imageSource.setAnimated$Z(true);
v.imageSource.setFullBufferUpdates$Z(true);
v.memimage = this.cv.createImage$java_awt_image_ImageProducer(v.imageSource);
}});

Clazz.newMeth(C$, 'min$I$I', function (x, y) {
return (x < y) ? x : y;
});

Clazz.newMeth(C$, 'doGround', function () {
this.doBlank();
this.magcoef[0][0] = 1;
this.t = 0;
});

Clazz.newMeth(C$, 'normalize', function () {
var norm = 0;
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) norm += this.magcoef[i][j] * this.magcoef[i][j];


if (norm == 0 ) return;
var normmult = 1 / java.lang.Math.sqrt(norm);
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.magcoef[i][j] *= normmult;


this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'maximize', function () {
var i;
var j;
var maxm = 0;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (java.lang.Math.abs(this.magcoef[i][j]) > maxm ) maxm = java.lang.Math.abs(this.magcoef[i][j]);


if (maxm == 0 ) return;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.magcoef[i][j] *= 1 / maxm;


this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'measureE', function () {
this.normalize();
var n = this.random.nextDouble();
var i = 0;
var j = 0;
var picki = -1;
var pickj = -1;
for (i = 0; i < this.modeCountTh; i++) for (j = 0; j < this.modeCountR; j++) {
var m = this.magcoef[i][j] * this.magcoef[i][j];
n -= m;
if (n < 0 ) {
picki = i;
pickj = j;
i = j = 10000;
break;
}}

if (picki == -1) return;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (this.elevels[i][j] != this.elevels[picki][pickj] ) this.magcoef[i][j] = 0;


if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
});

Clazz.newMeth(C$, 'calcLSpectrum', function () {
var lzcount = this.modeCountTh * 3;
if (this.lzspectrum == null ) this.lzspectrum = Clazz.array(Double.TYPE, [lzcount]);
var i;
var j;
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = 0;

var lc = ((lzcount/2|0));
for (i = 0; i != this.modeCountTh; i++) {
var m = ((i % 2) == 0) ? ((i/2|0) * 3 + lc) : (lc - (3 * (i + 1)/2|0));
for (j = 0; j != this.modeCountR; j++) this.lzspectrum[m] += this.magcoef[i][j] * this.magcoef[i][j];

}
});

Clazz.newMeth(C$, 'measureL', function () {
this.normalize();
this.calcLSpectrum();
var n = this.random.nextDouble();
var i = 0;
var picki = -1;
var lzcount = this.modeCountTh * 3;
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
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var m = ((i % 2) == 0) ? ((i/2|0) * 3 + lc) : (lc - (3 * (i + 1)/2|0));
if (m != picki) this.magcoef[i][j] = 0;
}

if (this.alwaysNormItem.getState()) this.normalize();
 else this.maximize();
});

Clazz.newMeth(C$, 'doBlank', function () {
var x;
var y;
for (x = 0; x != this.modeCountTh; x++) for (y = 0; y != this.modeCountR; y++) this.magcoef[x][y] = 0;


});

Clazz.newMeth(C$, 'getPanelHeight', function () {
return (this.winSize.height/3|0);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateQuantumCirc$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) {
this.handleResize();
return;
}var g = this.dbimage.getGraphics();
if (this.winSize == null  || this.winSize.width == 0  || this.dbimage == null  ) return;
var allQuiet = true;
if (!this.stoppedCheck.getState() && !this.dragging ) {
var val = this.speedBar.getValue();
var tadd = java.lang.Math.exp(val / 20.0) * 0.02;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * 0.0058823529411764705;
this.t += tadd;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
var gray1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var j;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
var x;
var y;
if (this.dragStop) this.t = 0;
var norm = 0;
var normmult = 0;
var normmult2 = 0;
if (!this.editingFunc) {
for (i = 0; i != this.modeCountTh; i++) {
for (j = 0; j != this.modeCountR; j++) {
if (this.magcoef[i][j] < 1.0E-5  && this.magcoef[i][j] > -1.0E-5  ) {
this.magcoef[i][j] = this.phasecoef[i][j] = this.phasecoefadj[i][j] = 0;
continue;
}allQuiet = false;
this.phasecoef[i][j] = (-this.elevels[i][j] * this.t + this.phasecoefadj[i][j]) % 6.283185307179586;
this.phasecoefcos[i][j] = java.lang.Math.cos(this.phasecoef[i][j]);
this.phasecoefsin[i][j] = java.lang.Math.sin(this.phasecoef[i][j]);
norm += this.magcoef[i][j] * this.magcoef[i][j];
}
}
normmult2 = 1 / norm;
if (norm == 0 ) normmult2 = 0;
normmult = java.lang.Math.sqrt(normmult2);
this.genFunc$D$Z(normmult, true);
}this.brightmult = java.lang.Math.exp(this.brightnessBar.getValue() / 200.0 - 5);
if (norm == 0 ) normmult = normmult2 = 0;
var half = (this.sampleCountTh/2|0);
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
if (this.viewPotential != null ) {
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 200;
if (this.floorValues == null ) this.floorValues = Clazz.array(Integer.TYPE, [floory + 1]);
for (i = 0; i <= floory; i++) this.floorValues[i] = 0;

for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var dy = this.elevels[i][j];
var m = this.magcoef[i][j] * this.magcoef[i][j];
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
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(this.viewXMap.x, 0, this.viewXMap.x, floory);
var x0 = this.viewXMap.x + this.viewXMap.width;
g.drawLine$I$I$I$I(x0, 0, x0, floory);
g.drawLine$I$I$I$I(this.viewXMap.x, floory, x0, floory);
if (norm != 0  && (this.expectCheckItem.getState() || this.uncertaintyCheckItem.getState() ) ) {
var expecte = 0;
var expecte2 = 0;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var prob = this.magcoef[i][j] * this.magcoef[i][j] * normmult2 ;
expecte += prob * this.elevels[i][j];
expecte2 += prob * this.elevels[i][j] * this.elevels[i][j] ;
}

var uncert = java.lang.Math.sqrt(expecte2 - expecte * expecte);
if (this.uncertaintyCheckItem.getState()) {
if (!(uncert >= 0 )) uncert = 0;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).blue);
y = floory - ((ymult * (expecte + uncert))|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
y = floory - ((ymult * (expecte - uncert))|0);
if (expecte - uncert >= 0 ) g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}if (this.expectCheckItem.getState()) {
y = floory - ((ymult * expecte)|0);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.selectedCoefX != -1 && !this.dragging ) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
y = floory - ((ymult * this.elevels[this.selectedCoefX][this.selectedCoefY])|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.viewX != null ) this.drawRadial$java_awt_Graphics$com_falstad_QuantumCircFrame_View$DAA$DAA(g, this.viewXMap, this.func, this.funci);
if (this.viewP != null ) {
this.genFunc$D$Z(normmult, false);
this.drawRadial$java_awt_Graphics$com_falstad_QuantumCircFrame_View$DAA$DAA(g, this.viewPMap, this.pfunc, this.pfunci);
}if (this.viewL != null ) {
var lzcount = this.modeCountTh * 3;
this.calcLSpectrum();
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = java.lang.Math.sqrt(this.lzspectrum[i]);

this.drawFunction$java_awt_Graphics$com_falstad_QuantumCircFrame_View$DA$DA$I$I(g, this.viewL, this.lzspectrum, null, lzcount, 0);
}if (this.viewStatesMap != null ) {
var termWidth = this.getTermWidth();
var stateSize = termWidth;
var ss2 = (termWidth/2|0);
for (i = 0; i < this.modeCountTh && i < this.maxDispPhasorsTh ; i++) for (j = 0; j < this.modeCountR && j < this.maxDispPhasorsR ; j++) {
x = this.viewStatesMap.x + i * termWidth + ss2;
y = this.viewStatesMap.y + j * termWidth + ss2;
var yel = (this.selectedCoefX != -1 && this.elevels[this.selectedCoefX][this.selectedCoefY] == this.elevels[i][j]  );
g.setColor$java_awt_Color(yel ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (this.magcoef[i][j] == 0 ) ? gray2 : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(x - ss2, y - ss2, stateSize, stateSize);
var xa = ((this.magcoef[i][j] * this.phasecoefcos[i][j] * ss2 )|0);
var ya = ((-this.magcoef[i][j] * this.phasecoefsin[i][j] * ss2 )|0);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.drawLine$I$I$I$I(x + xa - 1, y + ya, x + xa + 1 , y + ya);
g.drawLine$I$I$I$I(x + xa, y + ya - 1, x + xa, y + ya + 1 );
}

g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
}if (this.selectedCoefX != -1) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
var m = ((this.selectedCoefX + 1)/2|0);
if ((this.selectedCoefX & 1) != 0) m = -m;
if (this.viewStatesMap != null  && this.viewX != null  ) this.centerString$java_awt_Graphics$S$I(g, "nr = " + this.selectedCoefY + ", m = " + m , this.viewX.y + this.viewX.height - 10);
if (this.viewL != null ) {
var lzcount = this.modeCountTh * 3;
var mx = m * 3 + (lzcount/2|0);
x = (this.viewL.width * mx/(lzcount - 1)|0);
g.drawLine$I$I$I$I(x, this.viewL.y, x, this.viewL.y + this.viewL.height);
}}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (this.dragStop) allQuiet = true;
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'drawRadial$java_awt_Graphics$com_falstad_QuantumCircFrame_View$DAA$DAA', function (g, view, fr, fi) {
var rcol = 65536;
var gcol = 256;
var cx = (view.width/2|0);
var cy = (view.height/2|0);
var cr = (view.width/2|0);
var x;
var y;
var mx = 0;
var expectx = 0;
var expectx2 = 0;
var expecty = 0;
var expecty2 = 0;
var tot = 0;
for (y = 0; y <= this.sampleCountR; y++) {
for (x = 0; x != this.sampleCountTh; x++) {
var ar = fr[x][y];
var ai = fi[x][y];
var fv = (ar * ar + ai * ai);
var xv = y * this.angle1CosTab[x];
var yv = y * this.angle1SinTab[x];
expectx += fv * y * xv ;
expecty += fv * y * yv ;
expectx2 += fv * y * xv * xv ;
expecty2 += fv * y * yv * yv ;
tot += fv * y;
if (this.magPhaseCheckItem.isSelected()) fv = java.lang.Math.sqrt(fv);
if (fv > mx ) mx = fv;
}
}
expectx /= tot;
expecty /= tot;
expectx2 /= tot;
expecty2 /= tot;
var mult = 255 * this.brightmult / mx;
var rscale = -cr / this.sampleCountR;
for (y = 0; y != this.sampleCountR; y++) {
var r1 = rscale * y;
var r2 = rscale * (y + 1);
this.xpoints[0] = ((cx + r1)|0);
this.ypoints[0] = cy;
this.xpoints[3] = ((cx + r2)|0);
this.ypoints[3] = cy;
for (x = 0; x != this.sampleCountTh; x++) {
var ar = fr[x][y];
var ai = fi[x][y];
var fv = (ar * ar + ai * ai);
if (this.magPhaseCheckItem.isSelected()) fv = java.lang.Math.sqrt(fv);
fv *= mult;
var c = this.getPhaseColor$D$D(ar, ai);
if (fv > 255 ) fv = 255;
var clr = ((c.r * fv)|0);
var clg = ((c.g * fv)|0);
var clb = ((c.b * fv)|0);
var col = -16777216 | (clr << 16) | (clg << 8) | clb ;
g.setColor$java_awt_Color(Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I,[col]));
this.xpoints[1] = ((cx + r1 * this.angle2CosTab[x])|0);
this.ypoints[1] = ((cy - r1 * this.angle2SinTab[x])|0);
this.xpoints[2] = ((cx + r2 * this.angle2CosTab[x])|0);
this.ypoints[2] = ((cy - r2 * this.angle2SinTab[x])|0);
this.fillTriangle$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I$I(view, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2], col);
this.fillTriangle$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I$I(view, this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
this.xpoints[0] = this.xpoints[1];
this.ypoints[0] = this.ypoints[1];
this.xpoints[3] = this.xpoints[2];
this.ypoints[3] = this.ypoints[2];
}
}
if (view.imageSource != null ) view.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(view.memimage, view.x, view.y, null);
cx = cx+(view.x);
cy = cy+(view.y);
if (this.expectCheckItem.getState()) {
x = ((cx + expectx * rscale)|0);
y = ((cy - expecty * rscale)|0);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(x, view.y, x, view.y + view.height);
g.drawLine$I$I$I$I(view.x, y, view.x + view.width, y);
}if (this.uncertaintyCheckItem.getState()) {
var uncertx = java.lang.Math.sqrt(expectx2 - expectx * expectx);
var uncerty = java.lang.Math.sqrt(expecty2 - expecty * expecty);
var xx1 = ((cx + (expectx + uncertx) * rscale)|0);
var xx2 = ((cx + (expectx - uncertx) * rscale)|0);
var yy1 = ((cy - (expecty - uncerty) * rscale)|0);
var yy2 = ((cy - (expecty + uncerty) * rscale)|0);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).blue);
g.drawRect$I$I$I$I(xx1, yy1, xx2 - xx1, yy2 - yy1);
}g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(view.x, view.y, view.width, view.height);
});

Clazz.newMeth(C$, 'fillTriangle$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I$I', function (view, x1, y1, x2, y2, x3, y3, col) {
if (x1 > x2) {
if (x2 > x3) {
var ay = this.interp$I$I$I$I$I(x1, y1, x3, y3, x2);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x3, y3, x2, y2, ay, col);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x1, y1, x2, y2, ay, col);
} else if (x1 > x3) {
var ay = this.interp$I$I$I$I$I(x1, y1, x2, y2, x3);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x2, y2, x3, y3, ay, col);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x1, y1, x3, y3, ay, col);
} else {
var ay = this.interp$I$I$I$I$I(x3, y3, x2, y2, x1);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x2, y2, x1, y1, ay, col);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x3, y3, x1, y1, ay, col);
}} else {
if (x1 > x3) {
var ay = this.interp$I$I$I$I$I(x2, y2, x3, y3, x1);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x3, y3, x1, y1, ay, col);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x2, y2, x1, y1, ay, col);
} else if (x2 > x3) {
var ay = this.interp$I$I$I$I$I(x2, y2, x1, y1, x3);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x1, y1, x3, y3, ay, col);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x2, y2, x3, y3, ay, col);
} else {
var ay = this.interp$I$I$I$I$I(x3, y3, x1, y1, x2);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x1, y1, x2, y2, ay, col);
this.fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I(view, x3, y3, x2, y2, ay, col);
}}});

Clazz.newMeth(C$, 'interp$I$I$I$I$I', function (x1, y1, x2, y2, x) {
if (x1 == x2) return y1;
if (x < x1 && x < x2  || x > x1 && x > x2  ) System.out.print$S("interp out of bounds\u000a");
return ((y1 + (x - x1) * (y2 - y1) / (x2 - x1))|0);
});

Clazz.newMeth(C$, 'fillTriangle1$com_falstad_QuantumCircFrame_View$I$I$I$I$I$I', function (v, x1, y1, x2, y2, y3, col) {
var dir = (x1 > x2) ? -1 : 1;
var x = x1;
if (x < 0) {
x = 0;
if (x2 < 0) return;
}if (x >= v.width) {
x = v.width - 1;
if (x2 >= v.width) return;
}if (y2 > y3) {
var q = y2;
y2 = y3;
y3 = q;
}while (x != x2 + dir){
var ya = this.interp$I$I$I$I$I(x1, y1, x2, y2, x);
var yb = this.interp$I$I$I$I$I(x1, y1, x2, y3, x);
if (ya < 0) ya = 0;
if (yb >= v.height) yb = v.height - 1;
var p1 = x + ya * v.width;
var p2 = x + yb * v.width;
for (; p1 <= p2; p1 = p1+(v.width)) v.pixels[p1] = col;

x = x+(dir);
if (x < 0 || x >= v.width ) return;
}
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_QuantumCircFrame_View$DA$DA$I$I', function (g, view, fr, fi, count, offset) {
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
var maxnm = java.lang.Math.sqrt(maxsq);
var uncert = java.lang.Math.sqrt(expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 0;
if (fi != null  && (this.probCheckItem.isSelected() || this.probPhaseCheckItem.isSelected() ) ) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
view.scale = bestscale;
if (view.scale > 1.0E8 ) view.scale = 1.0E8;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
var mid_x = (this.winSize.width * ((count/2|0))/(count - 1)|0);
g.drawLine$I$I$I$I(mid_x, view.y, mid_x, view.y + view.height);
var mid_y = view.lower_y;
var mult = view.ymult2 * view.scale;
if (fi != null ) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).blue);
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fi[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
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
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(((expectx - uncert)|0), view.y, ((expectx - uncert)|0), view.y + view.height);
g.drawLine$I$I$I$I(((expectx + uncert)|0), view.y, ((expectx + uncert)|0), view.y + view.height);
}if (this.expectCheckItem.getState()) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I((expectx|0), view.y, (expectx|0), view.y + view.height);
}}});

Clazz.newMeth(C$, 'computeColor$I$I$D', function (x, y, c) {
var h = this.func[x][y];
if (!this.colorCheck.getState()) {
h = 0;
}if (c < 0 ) c = 0;
if (c > 1 ) c = 1;
c = 0.5 + c * 0.5;
var redness = (h < 0 ) ? -h : 0;
var grnness = (h > 0 ) ? h : 0;
if (redness > 1 ) redness = 1;
if (grnness > 1 ) grnness = 1;
if (grnness < 0 ) grnness = 0;
if (redness < 0 ) redness = 0;
var grayness = (1 - (redness + grnness)) * c;
var gray = 0.6;
return Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[(((c * redness + gray * grayness) * 255)|0), (((c * grnness + gray * grayness) * 255)|0), (((gray * grayness) * 255)|0)]);
});

Clazz.newMeth(C$, 'genFunc$D$Z', function (normmult, do_x) {
var i;
var j;
var th;
var r;
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
var states = (do_x) ? this.xStates : this.pStates;
var outr = (do_x) ? this.func : this.pfunc;
var outi = (do_x) ? this.funci : this.pfunci;
for (r = 0; r <= this.sampleCountR; r++) {
for (i = 0; i != wc; i++) this.xformbuf[i] = 0;

var d0r = 0;
var d0i = 0;
for (j = 0; j != this.modeCountR; j++) {
d0r += states[0][j][r] * this.magcoef[0][j] * this.phasecoefcos[0][j] ;
d0i += states[0][j][r] * this.magcoef[0][j] * this.phasecoefsin[0][j] ;
}
this.xformbuf[0] = d0r;
this.xformbuf[1] = d0i;
for (i = 1; i < this.modeCountTh; i = i+(2)) {
var d1r = 0;
var d2r = 0;
var d1i = 0;
var d2i = 0;
var ii = ((i + 1)/2|0);
for (j = 0; j != this.modeCountR; j++) {
d1r += states[ii][j][r] * this.magcoef[i][j] * this.phasecoefcos[i][j] ;
d1i += states[ii][j][r] * this.magcoef[i][j] * this.phasecoefsin[i][j] ;
d2r += states[ii][j][r] * this.magcoef[i + 1][j] * this.phasecoefcos[i + 1][j] ;
d2i += states[ii][j][r] * this.magcoef[i + 1][j] * this.phasecoefsin[i + 1][j] ;
}
if (!do_x) {
var adj = 1.5707963267948966 * ii;
var acos = java.lang.Math.cos(adj);
var asin = java.lang.Math.sin(adj);
var q1 = d1r;
var q2 = d1i;
d1r = q1 * acos + q2 * asin;
d1i = -q1 * asin + q2 * acos;
q1 = d2r;
q2 = d2i;
d2r = q1 * acos + q2 * asin;
d2i = -q1 * asin + q2 * acos;
}this.xformbuf[ii * 2] = d2r;
this.xformbuf[ii * 2 + 1] = d2i;
this.xformbuf[wm & (wc - ii * 2)] = d1r;
this.xformbuf[wm & (wc - ii * 2 + 1)] = d1i;
}
this.fftTh.transform$DA(this.xformbuf);
for (i = 0; i != this.sampleCountTh; i++) {
outr[i][r] = this.xformbuf[i * 2] * normmult;
outi[i][r] = this.xformbuf[i * 2 + 1] * normmult;
}
outr[this.sampleCountTh][r] = outr[0][r];
outi[this.sampleCountTh][r] = outi[0][r];
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
var termWidth1 = (this.viewStatesMap.width/this.min$I$I(this.modeCountTh, this.maxDispPhasorsTh)|0);
var termWidth2 = (this.viewStatesMap.height/this.min$I$I(this.modeCountR, this.maxDispPhasorsR)|0);
return (termWidth1 < termWidth2) ? termWidth1 : termWidth2;
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 5:
this.editHandle$I(y);
break;
case 3:
this.editMag$I$I(x, y);
break;
case 1:
this.findStateByEnergy$I(y);
this.enterSelectedState();
break;
case 2:
this.editX$I$I(x, y);
break;
case 4:
this.editL$I$I(x, y);
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
if (this.selectedCoefX == -1) return;
var stateSize = this.getTermWidth();
var ss2 = (stateSize/2|0);
var x0 = stateSize * this.selectedCoefX + ss2 + this.viewStatesMap.x;
var y0 = stateSize * this.selectedCoefY + ss2 + this.viewStatesMap.y;
x = x-(x0);
y = y-(y0);
var mag = java.lang.Math.sqrt(x * x + y * y) / ss2;
var ang = java.lang.Math.atan2(-y, x);
var ang0 = (-this.elevels[this.selectedCoefX][this.selectedCoefY] * this.t) % 6.283185307179586;
if (mag > 10 ) mag = 0;
if (mag > 1 ) mag = 1;
this.magcoef[this.selectedCoefX][this.selectedCoefY] = mag;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = (ang - ang0) % 6.283185307179586;
if (this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] > 3.141592653589793 ) this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] -= 6.283185307179586;
if (this.alwaysNormItem.getState()) this.normalize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedCoefX == -1) return;
if (this.magDragStart < 0.5 ) this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
 else this.magcoef[this.selectedCoefX][this.selectedCoefY] = 0;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = 0;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editX$I$I', function (x, y) {
switch (this.mouseChooser.getSelectedIndex()) {
case 0:
this.editXGauss$I$I(x, y);
return;
case 1:
this.editXGaussP$I$I(x, y);
return;
case 2:
this.editRotate$I$I(x, y);
return;
}
});

Clazz.newMeth(C$, 'editL$I$I', function (x, y) {
var xi = (x * this.modeCountTh/this.winSize.width|0);
var m = xi - (this.modeCountTh/2|0);
var r;
var th;
for (r = 0; r <= this.sampleCountR; r++) for (th = 0; th <= this.sampleCountTh; th++) {
if (r == 0 && m != 0 ) this.func[th][0] = this.funci[th][0] = 0;
 else {
var thr = th * 2 * 3.141592653589793  / this.sampleCountTh;
this.func[th][r] = java.lang.Math.cos(thr * m);
this.funci[th][r] = java.lang.Math.sin(thr * m);
}}

this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editXGauss$I$I', function (x, y) {
var i;
var j;
var gx = x - this.dragX + 8;
var gy = y - this.dragY + 8;
var wx = 1 / (this.abs$I(gx) + 1.0E-4);
var wy = 1 / (this.abs$I(gy) + 1.0E-4);
wx = -wx * wx * 2000 ;
wy = -wy * wy * 2000 ;
this.lastGaussWx = wx;
this.lastGaussWy = wy;
for (x = 0; x != this.sampleCountR; x++) {
for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793  / this.sampleCountTh;
var xx = -java.lang.Math.cos(th) * x / this.sampleCountR - this.selectedGridX;
var yy = -java.lang.Math.sin(th) * x / this.sampleCountR - this.selectedGridY;
var rfunc = java.lang.Math.exp(wx * xx * xx  + wy * yy * yy );
this.func[y][x] = rfunc;
this.funci[y][x] = 0;
}
}
this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editXGaussP$I$I', function (x, y) {
var i;
var j;
var wx = this.lastGaussWx;
var wy = this.lastGaussWy;
var momentumX = (x - this.dragX) * 0.1;
var momentumY = -(y - this.dragY) * 0.1;
for (x = 0; x != this.sampleCountR; x++) {
for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793  / this.sampleCountTh;
var xx = -java.lang.Math.cos(th) * x / this.sampleCountR - this.selectedGridX;
var yy = -java.lang.Math.sin(th) * x / this.sampleCountR - this.selectedGridY;
var cx = java.lang.Math.cos(momentumX * xx);
var cy = java.lang.Math.cos(momentumY * yy);
var sx = java.lang.Math.sin(momentumX * xx);
var sy = java.lang.Math.sin(momentumY * yy);
var rfunc = java.lang.Math.exp(wx * xx * xx  + wy * yy * yy );
this.func[y][x] = rfunc * (cx * cy - sx * sy);
this.funci[y][x] = rfunc * (cx * sy + cy * sx);
}
}
this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editRotate$I$I', function (x, y) {
var cx = this.viewXMap.x + (this.viewXMap.width/2|0);
var cy = this.viewXMap.y + (this.viewXMap.height/2|0);
var angle1 = java.lang.Math.atan2(-(this.dragY - cy), this.dragX - cx);
var angle2 = java.lang.Math.atan2(-(y - cy), x - cx);
var ad = angle2 - angle1;
var i;
var j;
for (i = 1; i < this.modeCountTh; i++) for (j = 0; j < this.modeCountR; j++) {
var m = ((i + 1)/2|0);
if ((i % 2) == 0) m = -m;
this.phasecoefadj[i][j] += ad * m;
}

this.dragX = x;
this.dragY = y;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'transform', function () {
this.t = 0;
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.phasecoefcos[i][j] = this.phasecoefsin[i][j] = 0;


var r;
var th;
for (r = 0; r <= this.sampleCountR; r++) {
for (th = 0; th != this.sampleCountTh * 2; th++) this.xformbuf[th] = 0;

for (th = 0; th != this.sampleCountTh; th++) {
this.xformbuf[th * 2] = this.func[th][r] * r;
this.xformbuf[th * 2 + 1] = this.funci[th][r] * r;
}
this.fftTh.transform$DA(this.xformbuf);
for (j = 0; j != this.modeCountR; j++) {
this.phasecoefcos[0][j] += this.xStates[0][j][r] * this.xformbuf[0];
this.phasecoefsin[0][j] += this.xStates[0][j][r] * this.xformbuf[1];
}
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
for (i = 1; i < this.modeCountTh; i = i+(2)) {
for (j = 0; j != this.modeCountR; j++) {
var ii = i + 1;
var m = (ii/2|0);
this.phasecoefcos[i][j] += this.xStates[m][j][r] * this.xformbuf[ii];
this.phasecoefsin[i][j] += this.xStates[m][j][r] * this.xformbuf[ii + 1];
this.phasecoefcos[i + 1][j] += this.xStates[m][j][r] * this.xformbuf[wm & -ii];
this.phasecoefsin[i + 1][j] += this.xStates[m][j][r] * this.xformbuf[wm & (-ii + 1)];
}
}
}
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var a = this.phasecoefcos[i][j];
var b = this.phasecoefsin[i][j];
if (a < 1.0E-5  && a > -1.0E-5  ) a = 0;
if (b < 1.0E-5  && b > -1.0E-5  ) b = 0;
this.magcoef[i][j] = java.lang.Math.sqrt(a * a + b * b);
this.phasecoefadj[i][j] = java.lang.Math.atan2(b, a);
}

if (this.alwaysNormItem.getState()) this.normalize();
 else if (this.alwaysMaxItem.getState()) this.maximize();
});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

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
if (e.getSource() === this.resBar ) {
if (this.resBar.getValue() != this.modeCountR) this.setResolution();
}if (e.getSource() === this.pZoomBar ) this.calcPStates();
if (e.getSource() === this.phasorBar ) {
this.maxDispPhasorsR = this.phasorBar.getValue();
this.maxDispPhasorsTh = this.maxDispPhasorsR * 2 + 1;
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'setResolution', function () {
var oldCountTh = this.modeCountTh;
var oldCountR = this.modeCountR;
this.modeCountR = this.sampleCountR = this.resBar.getValue();
this.sampleCountR = this.sampleCountR*(4);
var sth = this.resBar.getValue() * 2;
this.sampleCountTh = 1;
while (this.sampleCountTh < sth)this.sampleCountTh = this.sampleCountTh*(2);

this.modeCountTh = this.sampleCountTh + 1;
this.modeCountM = (this.sampleCountTh/2|0) + 1;
this.sampleCountTh = this.sampleCountTh*(2);
this.fftTh = Clazz.new_((I$[20]||(I$[20]=Clazz.load('com.falstad.FFT'))).c$$I,[this.sampleCountTh]);
var oldmagcoef = this.magcoef;
this.magcoef = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoef = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoefcos = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoefsin = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoefadj = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.xformbuf = Clazz.array(Double.TYPE, [this.sampleCountTh * 2]);
this.func = Clazz.array(Double.TYPE, [this.sampleCountTh + 1, this.sampleCountR + 1]);
this.funci = Clazz.array(Double.TYPE, [this.sampleCountTh + 1, this.sampleCountR + 1]);
this.pfunc = Clazz.array(Double.TYPE, [this.sampleCountTh + 1, this.sampleCountR + 1]);
this.pfunci = Clazz.array(Double.TYPE, [this.sampleCountTh + 1, this.sampleCountR + 1]);
this.lzspectrum = null;
System.out.print$S("grid: " + this.sampleCountTh + " " + this.sampleCountR + " " + this.sampleCountTh * this.sampleCountR  + "\n");
this.scaleHeight = 6;
this.step = 3.141592653589793 / this.sampleCountTh;
this.viewDistance = 50;
var m;
var n;
this.elevels = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
var angstep = this.step * 2;
System.out.print$S("calc omegas...\u000a");
for (m = 0; m != this.modeCountTh; m++) for (n = 0; n != this.modeCountR; n++) {
var realm = ((m + 1)/2|0);
this.elevels[m][n] = this.zeroj$I$I(realm, n + 1) / this.sampleCountR;
}

System.out.print$S("calc omegas...done\u000a");
var jj = Clazz.array(Double.TYPE, [this.modeCountM + 1]);
var x;
var y;
this.xStates = Clazz.array(Double.TYPE, [this.modeCountM, this.modeCountR, this.sampleCountR + 1]);
System.out.print$S("calc modes...\u000a");
for (m = 0; m != this.modeCountM; m++) {
for (n = 0; n != this.modeCountR; n++) {
var max = 0;
var nm = 0;
for (y = 0; y <= this.sampleCountR; y++) {
if (y == 0) jj[m + 1] = (m == 0) ? 1 : 0;
 else this.bess$I$D$DA(m, y * this.elevels[m * 2][n], jj);
var q = this.xStates[m][n][y] = jj[m + 1];
if (q > max ) max = q;
if (q < -max ) max = -q;
nm += q * q * y ;
}
nm = java.lang.Math.sqrt(nm);
for (y = 0; y <= this.sampleCountR; y++) this.xStates[m][n][y] /= nm;

}
}
var mult = 0.01 / (this.elevels[0][0] * this.elevels[0][0]);
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.elevels[i][j] *= this.elevels[i][j] * mult;


System.out.print$S("calc modes...done\u000a");
if (oldmagcoef != null ) {
for (i = 0; i != oldCountTh && i != this.modeCountTh ; i++) for (j = 0; j != oldCountR && j != this.modeCountR ; j++) this.magcoef[i][j] = oldmagcoef[i][j];


}this.pZoomBarValue = -1;
this.calcPStates();
this.angle1SinTab = Clazz.array(Double.TYPE, [this.sampleCountTh + 1]);
this.angle1CosTab = Clazz.array(Double.TYPE, [this.sampleCountTh + 1]);
this.angle2SinTab = Clazz.array(Double.TYPE, [this.sampleCountTh + 1]);
this.angle2CosTab = Clazz.array(Double.TYPE, [this.sampleCountTh + 1]);
for (i = 0; i <= this.sampleCountTh; i++) {
var th1 = 2 * 3.141592653589793 * i  / this.sampleCountTh;
var th2 = 2 * 3.141592653589793 * (i + 1)  / this.sampleCountTh + 0.001;
this.angle1SinTab[i] = java.lang.Math.sin(th1);
this.angle1CosTab[i] = java.lang.Math.cos(th1);
this.angle2SinTab[i] = java.lang.Math.sin(th2);
this.angle2CosTab[i] = java.lang.Math.cos(th2);
}
});

Clazz.newMeth(C$, 'calcPStates', function () {
if (this.pZoomBar.getValue() == this.pZoomBarValue) return;
this.pZoomBarValue = this.pZoomBar.getValue();
var pmult = this.pZoomBar.getValue() / (5.0 * this.sampleCountR);
var jj = Clazz.array(Double.TYPE, [this.modeCountM + 1]);
var jz = Clazz.array(Double.TYPE, [this.modeCountM + 1]);
var i;
var j;
var x;
var y;
var realm;
System.out.print$S("calc pstates\u000a");
this.pStates = Clazz.array(Double.TYPE, [this.modeCountM, this.modeCountR, this.sampleCountR + 1]);
for (realm = 0; realm != this.modeCountM; realm++) {
var bessm = (realm == 0) ? 1 : realm;
for (j = 0; j != this.modeCountR; j++) {
var z0 = this.zeroj$I$I(realm, j + 1);
this.bess$I$D$DA(bessm, z0, jz);
jz[0] = -jz[2];
for (x = 0; x != this.sampleCountR; x++) {
var x0 = pmult * x;
if (x == 0) {
if (realm == 0) {
jj[1] = 1;
jj[0] = 0;
} else {
jj[realm + 1] = 0;
jj[realm] = (realm == 1) ? 1 : 0;
}} else {
this.bess$I$D$DA(bessm, x0, jj);
jj[0] = -jj[2];
}this.pStates[realm][j][x] = (z0 * jz[realm] * jj[realm + 1] ) / (x0 * x0 - z0 * z0);
}
}
}
System.out.print$S("calc pstates, done\u000a");
});

Clazz.newMeth(C$, 'zeroj$I$I', function (m_order, n_zero) {
if (m_order >= 48 && n_zero == 1 ) {
switch (m_order) {
case 48:
return 55.0283;
case 49:
return 56.0729;
case 50:
return 57.1169;
case 51:
return 58.1603;
case 52:
return 59.2032;
case 53:
return 60.2456;
case 54:
return 61.2875;
case 55:
return 62.3288;
case 56:
return 63.3697;
case 57:
return 64.4102;
case 58:
return 65.4501;
case 59:
return 66.4897;
case 60:
return 67.5288;
case 61:
return 68.5675;
case 62:
return 69.6058;
case 63:
return 70.6437;
case 64:
return 71.6812;
}
}if (m_order >= 62 && n_zero == 2 ) {
switch (m_order) {
case 62:
return 75.6376;
case 63:
return 76.7021;
case 64:
return 77.7659;
}
}var beta = (n_zero + 0.5 * m_order - 0.25) * 3.141592654;
var mu = 4 * m_order * m_order ;
var beta8 = 8 * beta;
var beta82 = beta8 * beta8;
var beta84 = beta82 * beta82;
var z = beta - (mu - 1) / beta8 - 4 * (mu - 1) * (7 * mu - 31)  / (3 * beta82 * beta8 );
z -= 32 * (mu - 1) * (83 * mu * mu  - 982 * mu + 3779)  / (15 * beta84 * beta8 );
z -= 64 * (mu - 1) * (6949 * mu * mu * mu  - 153855 * mu * mu  + 1585743 * mu - 6277237)  / (105 * beta84 * beta82 * beta8 );
var jj = Clazz.array(Double.TYPE, [m_order + 3]);
var i;
var deriv;
for (i = 1; i <= 5; i++) {
this.bess$I$D$DA(m_order + 1, z, jj);
deriv = -jj[m_order + 2] + m_order / z * jj[m_order + 1];
z -= jj[m_order + 1] / deriv;
}
return (z);
});

Clazz.newMeth(C$, 'bess$I$D$DA', function (m_max, x, jj) {
var maxmx = (m_max > x ) ? m_max : ((x|0));
var m_top = 2 * ((((maxmx + 15)/2|0) + 1));
var j = Clazz.array(Double.TYPE, [m_top + 2]);
j[m_top + 1] = 0.0;
j[m_top] = 1.0;
var tinyNumber = 1.0E-16;
var m;
for (m = m_top - 2; m >= 0; m--) j[m + 1] = 2 * (m + 1) / (x + tinyNumber) * j[m + 2] - j[m + 3];

var norm = j[1];
for (m = 2; m <= m_top; m = m+(2)) norm += 2 * j[m + 1];

for (m = 0; m <= m_max; m++) jj[m + 1] = j[m + 1] / norm;

});

Clazz.newMeth(C$, 'findGridPoint2D$com_falstad_QuantumCircFrame_View$I$I', function (v, mx, my) {
var cx = v.x + (v.width/2|0);
var cy = v.y + (v.height/2|0);
var cr = (v.width/2|0);
this.selectedGridX = (mx - cx) / cr;
this.selectedGridY = -(my - cy) / cr;
var r = java.lang.Math.sqrt(this.selectedGridX * this.selectedGridX + this.selectedGridY * this.selectedGridY);
if (r > 1 ) {
this.selectedGridX /= r;
this.selectedGridY /= r;
}});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if (this.dragging) return;
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var panelHeight = this.getPanelHeight();
var oldCoefX = this.selectedCoefX;
var oldCoefY = this.selectedCoefY;
this.selectedCoefX = -1;
this.selectedCoefY = -1;
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
 else if (this.viewPotential != null  && this.viewPotential.contains$I$I(x, y) ) {
this.selection = 1;
this.findStateByEnergy$I(y);
} else if (this.viewStatesMap != null  && this.viewStatesMap.inside$I$I(x, y) ) {
var termWidth = this.getTermWidth();
this.selectedCoefX = ((x - this.viewStatesMap.x)/termWidth|0);
this.selectedCoefY = ((y - this.viewStatesMap.y)/termWidth|0);
if (this.selectedCoefX >= this.modeCountTh || this.selectedCoefX >= this.maxDispPhasorsTh ) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefY >= this.modeCountR || this.selectedCoefY >= this.maxDispPhasorsR ) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefX < 0 || this.selectedCoefY < 0 ) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefX != -1 && this.selectedCoefY != -1 ) this.selection = 3;
} else if (this.viewL != null  && this.viewL.contains$I$I(x, y) ) this.selection = 4;
if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'findStateByEnergy$I', function (y) {
var i;
var j;
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 200;
var dist = 100;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var yy = floory - ((ymult * this.elevels[i][j])|0);
var d = java.lang.Math.abs(y - yy);
if (d < dist ) {
dist = d;
this.selectedCoefX = i;
this.selectedCoefY = j;
}}

});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (e.getClickCount() == 2 && this.selectedCoefX != -1 ) this.enterSelectedState();
 else if (this.selection == 3) this.editMagClick();
});

Clazz.newMeth(C$, 'enterSelectedState', function () {
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (this.selectedCoefX != i || this.selectedCoefY != j ) this.magcoef[i][j] = 0;


this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging) {
if (this.selectedCoefX != -1) {
this.selectedCoefX = this.selectedCoefY = -1;
this.cv.repaint$J(this.pause);
}if (this.selectedPaneHandle != -1) {
this.selectedPaneHandle = -1;
this.cv.repaint$J(this.pause);
}}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.mouseMoved$java_awt_event_MouseEvent(e);
if (this.selection == 2) this.findGridPoint2D$com_falstad_QuantumCircFrame_View$I$I(this.viewXMap, e.getX(), e.getY());
this.dragStartX = e.getX();
this.dragStartY = e.getY();
if (this.selectedCoefX != -1) this.magDragStart = this.magcoef[this.selectedCoefX][this.selectedCoefY];
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = this.editingFunc = this.dragStop = false;
this.dragSet = this.dragClear = false;
this.mouseMoved$java_awt_event_MouseEvent(e);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) {
return;
}if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}if (e.getItemSelectable() === this.xCheckItem  || e.getItemSelectable() === this.pCheckItem   || e.getItemSelectable() === this.lCheckItem   || e.getItemSelectable() === this.eCheckItem   || e.getItemSelectable() === this.statesCheckItem  ) {
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
;
(function(){var C$=Clazz.newClass(P$.QuantumCircFrame, "PhaseColor", function(){
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

Clazz.newMeth(C$, 'getColor', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[((this.r * 255)|0), ((this.g * 255)|0), ((this.b * 255)|0)]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumCircFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
this.mid_y = 0;
this.lower_y = 0;
this.paneY = 0;
this.imageSource = null;
this.memimage = null;
this.pixels = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_QuantumCircFrame_View', function (v) {
C$.superclazz.c$$java_awt_Rectangle.apply(this, [v]);
C$.$init$.apply(this);
}, 1);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:08
