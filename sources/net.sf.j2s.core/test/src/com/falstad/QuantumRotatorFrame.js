(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumRotatorFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.maxModes = 0;
C$.maxDispCoefs = 0;
C$.viewDistance = 0;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.maxModes = 10;
C$.maxDispCoefs = 8;
C$.viewDistance = 12;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.memimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.blankButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.stoppedCheck = null;
this.colorCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.lCheckItem = null;
this.alwaysNormItem = null;
this.axesItem = null;
this.exitItem = null;
this.modeChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.internalResBar = null;
this.brightnessBar = null;
this.phasorBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewL = null;
this.viewStates = null;
this.viewList = null;
this.viewCount = 0;
this.phasors = null;
this.phasorCount = 0;
this.states = null;
this.stateCount = 0;
this.textBoxes = null;
this.textCount = 0;
this.dragZoomStart = 0;
this.zoom = 0;
this.rotmatrix = null;
this.viewAxes = null;
this.xpoints = null;
this.ypoints = null;
this.floorValues = null;
this.selectedPaneHandle = 0;
this.phaseColors = null;
this.grayLevels = null;
this.resadj = 0;
this.dragging = false;
this.editingFunc = false;
this.imageSource = null;
this.pixels = null;
this.dataSize = 0;
this.dataSizeTh = 0;
this.dataSizePh = 0;
this.pause = 0;
this.applet = null;
this.selectedState = null;
this.selectedPhasor = null;
this.selection = 0;
this.settingScale = false;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.func = null;
this.funci = null;
this.phiIndex = 0;
this.phiSector = 0;
this.bestBrightness = 0;
this.userBrightMult = 0;
this.colorMult = 0;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.useBufferedImage = false;
this.fft = null;
this.cv = null;
this.main = null;
this.showControls = false;
this.useFrame = false;
this.shown = false;
this.lastTime = 0;
this.scaleValue = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.zoom = 19.9;
this.dragging = false;
this.editingFunc = false;
this.selection = -1;
this.t = 0;
this.userBrightMult = 1;
this.shown = false;
this.scaleValue = -1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "QuantumRotator by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_QuantumRotator', function (a) {
C$.superclazz.c$$S.apply(this, ["Rigid Rotator v1.5b"]);
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
this.gray2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.QuantumRotatorLayout')))));
this.cv = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.QuantumRotatorCanvas'))).c$$com_falstad_QuantumRotatorFrame,[this]);
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
m.add$javax_swing_JMenuItem(this.lCheckItem = this.getCheckItem$S("Angular Momentum (Z)"));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.colorCheck = this.getCheckItem$S("Phase as Color"));
this.colorCheck.setState$Z(true);
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
mb.add$javax_swing_JMenu(m);
this.alwaysNormItem = this.getCheckItem$S("Always Normalize");
m.add$javax_swing_JMenuItem(this.axesItem = this.getCheckItem$S("Show Axes"));
this.axesItem.setState$Z(true);
this.setMenuBar$a2s_MenuBar(mb);
var i;
this.modeChooser = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust View");
this.modeChooser.add$S("Mouse = Create Gaussian");
this.modeChooser.add$S("Mouse = Gaussian w/ Momentum");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.stoppedCheck = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.main.add$java_awt_Component(this.blankButton = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.normalizeButton = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Button'))).c$$S,["Normalize"]));
this.normalizeButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.maximizeButton = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Button'))).c$$S,["Maximize"]));
this.maximizeButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 6, 1, 1, 200]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 743, 1, 1, 4000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.main.add$java_awt_Component(this.resolutionBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 150, 2, 20, 500]));
this.resolutionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Phasor Count", 0]));
this.main.add$java_awt_Component(this.phasorBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 8, 1, 3, 30]));
this.phasorBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
var j;
this.phaseColors = Clazz.array((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))), [8, 51]);
for (i = 0; i != 8; i++) for (j = 0; j <= 50; j++) {
var ang = java.lang.Math.atan(j / 50.0);
this.phaseColors[i][j] = this.genPhaseColor$I$D(i, ang);
}

this.grayLevels = Clazz.array((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))), [256]);
for (i = 0; i != 256; i++) this.grayLevels[i] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[i, i, i]);

this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.setView();
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.random = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
if (this.useFrame) {
this.setSize$I$I(800, 640);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
this.setupStates();
} else {
this.setVisible$Z(false);
this.setupStates();
this.handleResize();
this.applet.validate();
}});

Clazz.newMeth(C$, 'setView', function () {
var i;
for (i = 0; i != 9; i++) this.rotmatrix[i] = 0;

this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate$D$D(0, -1.5707963267948966);
});

Clazz.newMeth(C$, 'setupStates', function () {
this.stateCount = 1024;
var i;
this.states = Clazz.array((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').BasisState))), [this.stateCount]);
var l = 0;
var m = 0;
var dshalf = (this.dataSize/2|0);
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i] = Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').BasisState))), [this, null]);
bs.elevel = l * (l + 1);
bs.l = l;
bs.m = m;
var mpos = (m < 0) ? -m : m;
var lgcorrect = java.lang.Math.pow(-1, m);
var norm = this.sphericalNorm$I$I(l, mpos);
var dataTh = bs.plm = Clazz.array(Double.TYPE, [this.dataSizeTh]);
var mphase = java.lang.Math.pow(-1, m);
lgcorrect *= mphase * norm;
var x;
for (x = 0; x != this.dataSizeTh; x++) {
var th = x * 3.141592653589793 / (this.dataSizeTh - 1);
dataTh[x] = lgcorrect * this.plgndr$I$I$D(l, mpos, java.lang.Math.cos(th));
}
if (m < l) m++;
 else {
l++;
m = -l;
}}
this.states[13].setRe$D(1);
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[15]||(I$[15]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[16]||(I$[16]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
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
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))).c$$D$D$D, [this, null, 1, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))).c$$D$D$D, [this, null, a3, 1, 0]);
break;
case 2:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))).c$$D$D$D, [this, null, 0, 1, a2]);
break;
case 3:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))).c$$D$D$D, [this, null, 0, a3, 1]);
break;
case 4:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))).c$$D$D$D, [this, null, a2, 0, 1]);
break;
case 5:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 0, a3]);
break;
}
return c;
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
this.reinit();
});

Clazz.newMeth(C$, 'reinit', function () {
this.setResolution();
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
this.setupDisplay();
});

Clazz.newMeth(C$, 'createPhasors', function () {
this.phasorCount = this.textCount = 0;
var i;
if (this.viewStates == null ) return;
var sz = (this.viewStates.height/this.phasorBar.getValue()|0);
if (sz < 7) sz = 7;
var x = (this.viewStates.width/2|0);
var y = this.viewStates.y;
var n = 1;
var l = 0;
var m = 0;
this.textBoxes = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').TextBox))), [10]);
this.phasorCount = this.phasorBar.getValue();
this.phasorCount = this.phasorCount*(this.phasorCount);
this.phasors = Clazz.array((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').Phasor))), [this.phasorCount]);
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i] = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, sz, sz]);
ph.state = this.states[i];
x = x+(sz);
if (++m > l) {
x = x-(sz * (2 * l + 2));
y = y+(sz);
l++;
m = -l;
}}
});

Clazz.newMeth(C$, 'setInitialOrbital', function () {
if (this.phasorCount == 0) return;
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > 0 ) return;

for (i = 0; i != this.phasorCount; i++) if (Clazz.instanceOf(this.phasors[i].state, "com.falstad.QuantumRotatorFrame.BasisState")) {
this.phasors[i].state.setRe$D(1);
return;
}
});

Clazz.newMeth(C$, 'createBasisPhasors$I$I$I$I$I$I', function (x, y, sz, i, n, l) {
var j;
for (j = 0; j != l * 2 + 1; j++) {
var ph = this.phasors[i] = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, sz, sz]);
ph.state = this.getState$I$I$I(n, l, j - l);
x = x+(sz);
i++;
}
return i;
});

Clazz.newMeth(C$, 'createText$S$I$I$I', function (text, x, y, sz) {
var tb = Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').TextBox))).c$$I$I$I$I$S, [this, null, x + 10, y, this.winSize.width - x, sz, text]);
this.textBoxes[this.textCount++] = tb;
});

Clazz.newMeth(C$, 'setupDisplay', function () {
if (this.winSize == null ) return;
var potsize = (this.viewPotential == null ) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null ) ? 96 : this.viewStates.height;
this.viewX = this.viewPotential = this.viewL = this.viewStates = null;
this.viewList = Clazz.array((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').View))), [10]);
var i = 0;
if (this.eCheckItem.getState()) this.viewList[i++] = this.viewPotential = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').View))), [this, null]);
if (this.lCheckItem.getState()) this.viewList[i++] = this.viewL = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').View))), [this, null]);
this.viewList[i++] = this.viewStates = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.QuantumRotatorFrame').View))), [this, null]);
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
var i;
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz.forName("java.awt.image.BufferedImage");
var dbiclass = Clazz.forName("java.awt.image.DataBufferInt");
var rasclass = Clazz.forName("java.awt.image.Raster");
var cstr = biclass.getConstructor$ClassA(Clazz.array(java.lang.Class, -1, [Integer.TYPE, Integer.TYPE, Integer.TYPE]));
this.memimage = cstr.newInstance$OA(Clazz.array(java.lang.Object, -1, [ new Integer(this.viewX.width),  new Integer(this.viewX.height),  new Integer(1)]));
var m = biclass.getMethod$S$ClassA("getRaster", null);
var ras = m.invoke$O$OA(this.memimage, null);
var db = rasclass.getMethod$S$ClassA("getDataBuffer", null).invoke$O$OA(ras, null);
this.pixels = dbiclass.getMethod$S$ClassA("getData", null).invoke$O$OA(db, null);
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
System.out.println$S("BufferedImage failed");
} else {
throw ee;
}
}
}if (this.pixels == null ) {
this.pixels = Clazz.array(Integer.TYPE, [this.viewX.width * this.viewX.height]);
for (i = 0; i != this.viewX.width * this.viewX.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.memimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}var asize = ((this.min$D$D(this.viewX.width, this.viewX.height) / 4)|0);
this.viewAxes = Clazz.new_((I$[21]||(I$[21]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.viewX.x + this.winSize.width - asize, this.viewX.y, asize, asize]);
this.floorValues = null;
this.createPhasors();
});

Clazz.newMeth(C$, 'getTermWidth', function () {
return 8;
});

Clazz.newMeth(C$, 'rotate$D$D', function (angle1, angle2) {
var r1cos = java.lang.Math.cos(angle1);
var r1sin = java.lang.Math.sin(angle1);
var r2cos = java.lang.Math.cos(angle2);
var r2sin = java.lang.Math.sin(angle2);
var rotm2 = Clazz.array(Double.TYPE, [9]);
rotm2[0] = r1cos;
rotm2[1] = -r1sin * r2sin;
rotm2[2] = r2cos * r1sin;
rotm2[3] = 0;
rotm2[4] = r2cos;
rotm2[5] = r2sin;
rotm2[6] = -r1sin;
rotm2[7] = -r1cos * r2sin;
rotm2[8] = r1cos * r2cos;
var rotm1 = this.rotmatrix;
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
var i;
var j;
var k;
for (j = 0; j != 3; j++) for (i = 0; i != 3; i++) {
var v = 0;
for (k = 0; k != 3; k++) v += rotm1[k + j * 3] * rotm2[i + k * 3];

this.rotmatrix[i + j * 3] = v;
}

});

Clazz.newMeth(C$, 'max$D$D', function (a, b) {
return a > b  ? a : b;
});

Clazz.newMeth(C$, 'min$D$D', function (a, b) {
return a < b  ? a : b;
});

Clazz.newMeth(C$, 'setResolution', function () {
var og = this.gridSizeX;
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue() & -2);
if (og == this.gridSizeX) return;
this.dataSize = this.gridSizeX * 4;
this.dataSize = 128;
this.dataSizePh = this.dataSize;
this.dataSizeTh = this.dataSize + 1;
this.func = Clazz.array(Double.TYPE, [this.dataSizeTh, this.dataSizePh]);
this.funci = Clazz.array(Double.TYPE, [this.dataSizeTh, this.dataSizePh]);
System.out.print$S("setResolution " + this.dataSize + " " + this.gridSizeX + "\n" );
this.fft = Clazz.new_((I$[22]||(I$[22]=Clazz.load('com.falstad.FFT'))).c$$I,[this.dataSizePh]);
this.resadj = 50.0 / this.dataSize;
});

Clazz.newMeth(C$, 'computeView$D', function (normmult) {
var i;
var j;
var q = 3.14159265 / this.dataSize;
var color = this.colorCheck.getState();
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var aratio = this.viewX.width / this.viewX.height;
var xmult = this.dataSize / 2.0;
var ymult = this.dataSize / 2.0;
var zmult = this.dataSize / 2.0;
var aratiox = izoom;
var aratioy = izoom;
if (aratio < 1 ) aratioy /= aratio;
 else aratiox *= aratio;
var boundRadius2 = 0.5;
boundRadius2 *= boundRadius2;
var phiMask = this.dataSizePh - 1;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = -(2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * C$.viewDistance;
var camy = rotm[5] * C$.viewDistance;
var camz = rotm[8] * C$.viewDistance;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
var camnorm = java.lang.Math.sqrt(camvx0 * camvx0 + camvy0 * camvy0 + 1);
var n;
var simpr = 0;
var simpg = 0;
var simpb = 0;
var a = camvx * camvx + camvy * camvy + camvz * camvz;
var b = 2 * (camvx * camx + camvy * camy + camvz * camz);
var c = camx * camx + camy * camy + camz * camz - boundRadius2;
var discrim = b * b - 4 * a * c ;
if (discrim < 0 ) {
if (color) {
var xx = 40.0 / this.colorMult;
this.fillSquare$I$I$D$D$D(i, j, xx, xx, xx);
} else {
this.fillSquare$I$I$D$D$D(i, j, 0, 0, 64.0 / this.colorMult);
}continue;
}discrim = java.lang.Math.sqrt(discrim);
var mint = (-b - discrim) / (2 * a);
var xx = (camx + camvx * mint) * xmult;
var yy = (camy + camvy * mint) * ymult;
var zz = (camz + camvz * mint) * zmult;
var dshalf = (this.dataSizeTh/2|0);
var r = xmult * 0.5;
var costh = zz / r;
var th = java.lang.Math.acos(costh);
var th0 = th / 3.141592653589793 * (this.dataSizeTh - 1);
var thi = (th0|0);
var thw = th0 - thi;
var phi = this.calcPhiComponent$D$D(xx, yy);
var phii = (phi|0);
var phiw = phi - phii;
var phi1 = (phii + 1) & phiMask;
var fr = this.func[thi][phii] * (1 - thw) * (1 - phiw)  + this.func[thi + 1][phii] * thw * (1 - phiw)  + this.func[thi][phi1] * (1 - thw) * phiw  + this.func[thi + 1][phi1] * thw * phiw ;
var fi = this.funci[thi][phii] * (1 - thw) * (1 - phiw)  + this.funci[thi + 1][phii] * thw * (1 - phiw)  + this.funci[thi][phi1] * (1 - thw) * phiw  + this.funci[thi + 1][phi1] * thw * phiw ;
if (color) {
var fv = fr * fr + fi * fi;
var col = this.getPhaseColor$D$D(fr, fi);
simpr = col.r * fv;
simpg = col.g * fv;
simpb = col.b * fv;
} else {
var fv = (fr * fr + fi * fi);
simpr = simpg = simpb = fv;
}this.fillSquare$I$I$D$D$D(i, j, simpr, simpg, simpb);
}

});

Clazz.newMeth(C$, 'getPhaseColor$D$D', function (x, y) {
var sector = 0;
var val = 0;
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

Clazz.newMeth(C$, 'calcPhiComponent$D$D', function (x, y) {
var sectorMult = (this.dataSizePh/8|0);
var phiSector = 0;
var val = 0;
if (x == 0  && y == 0  ) return 0;
if (y >= 0 ) {
if (x >= 0 ) {
if (x >= y ) {
phiSector = 0;
val = y / x;
} else {
phiSector = 1;
val = 1 - x / y;
}} else {
if (-x <= y ) {
phiSector = 2;
val = -x / y;
} else {
phiSector = 3;
val = 1 + y / x;
}}} else {
if (x <= 0 ) {
if (y >= x ) {
phiSector = 4;
val = y / x;
} else {
phiSector = 5;
val = 1 - x / y;
}} else {
if (-y >= x ) {
phiSector = 6;
val = -x / y;
} else {
phiSector = 7;
val = 1 + y / x;
}}}return (phiSector + val) * sectorMult;
});

Clazz.newMeth(C$, 'genFunc$D', function (normmult) {
var i;
var j;
var th;
var ph;
var wc = this.dataSizePh * 2;
var wm = wc - 1;
var xformbuf = Clazz.array(Double.TYPE, [wc]);
for (th = 0; th != this.dataSizeTh; th++) {
for (i = 0; i != wc; i++) xformbuf[i] = 0;

for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var ii = wm & (-st.m * 2);
xformbuf[ii] += st.re * st.plm[th];
xformbuf[ii + 1] += st.im * st.plm[th];
}
this.fft.transform$DA$Z(xformbuf, true);
for (i = 0; i != this.dataSizePh; i++) {
this.func[th][i] = xformbuf[i * 2] * normmult;
this.funci[th][i] = xformbuf[i * 2 + 1] * normmult;
}
}
});

Clazz.newMeth(C$, 'transform', function () {
var wc = this.dataSizePh * 2;
var wm = wc - 1;
var i;
for (i = 0; i != this.stateCount; i++) this.states[i].setRe$D(0);

this.t = 0;
var th;
var xformbuf = Clazz.array(Double.TYPE, [wc]);
for (th = 0; th != this.dataSizeTh; th++) {
var mult = java.lang.Math.sin(th * 3.141592653589793 / (this.dataSizeTh - 1));
for (i = 0; i != this.dataSizePh; i++) {
xformbuf[i * 2] = this.func[th][i];
xformbuf[i * 2 + 1] = this.funci[th][i];
}
this.fft.transform$DA$Z(xformbuf, false);
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var ii = wm & (-st.m * 2);
st.addQuick$D$D(xformbuf[ii] * st.plm[th] * mult , xformbuf[ii + 1] * st.plm[th] * mult );
}
}
for (i = 0; i != this.stateCount; i++) this.states[i].setMP();

this.maximize();
});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
this.cv.repaint();
});

Clazz.newMeth(C$, 'updateQuantumRotator$java_awt_Graphics', function (realg) {
var g = null;
if (this.winSize == null  || this.winSize.width == 0 ) return;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
if (this.fontMetrics == null ) this.fontMetrics = g.getFontMetrics();
var allQuiet = false;
var tadd = 0;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue();
var sysTime = System.currentTimeMillis();
if (this.lastTime != 0) tadd = val * 6.25E-6 * (sysTime - this.lastTime) ;
this.lastTime = sysTime;
this.t += tadd;
} else {
this.lastTime = 0;
allQuiet = true;
}var norm = 0;
var normmult = 0;
var normmult2 = 0;
if (this.alwaysNormItem.getState()) this.normalize();
var i;
if (!this.editingFunc && tadd != 0  ) {
allQuiet = false;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.mag < 0.01 ) {
st.setRe$D(0);
continue;
}st.rotate$D(-(st.elevel + 0.0) * tadd);
}
}for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
norm += st.magSquared();
}
normmult2 = 1 / norm;
if (norm == 0 ) normmult2 = 0;
normmult = java.lang.Math.sqrt(normmult2);
this.genFunc$D(normmult);
this.colorMult = java.lang.Math.exp(this.brightnessBar.getValue() / 100.0);
this.computeView$D(normmult);
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null ) {
var ymult = 0.2;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).darkGray);
var floory = this.viewPotential.y + this.viewPotential.height - 1;
if (this.floorValues == null ) this.floorValues = Clazz.array(Integer.TYPE, [floory + 1]);
for (i = 0; i <= floory; i++) this.floorValues[i] = 0;

for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var dy = st.elevel;
var m = st.magSquared();
var mc = ((224 * m)|0) + 1;
var y;
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
if (norm != 0 ) {
var expecte = 0;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var prob = st.magSquared() * normmult2;
expecte += prob * st.elevel;
}
var y = floory - ((ymult * expecte)|0);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}if (this.selectedState != null  && !this.dragging ) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
var y = floory - ((ymult * this.selectedState.elevel)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.viewL != null ) {
var maxm = 32;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata = Clazz.array(Double.TYPE, [ct]);
this.calcLz$DA$I$I$I$Z(ldata, ct, maxm, pad, false);
this.drawFunction$java_awt_Graphics$com_falstad_QuantumRotatorFrame_View$DA$I$I$Z(g, this.viewL, ldata, ct, pad, false);
}if (this.imageSource != null ) this.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.memimage, this.viewX.x, this.viewX.y, null);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
if (this.axesItem.getState()) this.drawAxes$java_awt_Graphics(g);
for (i = 0; i != this.textCount; i++) {
var tb = this.textBoxes[i];
var h = ((tb.height + this.fontMetrics.getAscent() - this.fontMetrics.getDescent())/2|0);
g.drawString$S$I$I(tb.text, tb.x, tb.y + h);
}
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
if (this.selectedState != null ) this.centerString$java_awt_Graphics$S$I(g, this.selectedState.getText(), this.viewX.y + this.viewX.height - 5);
if (this.viewStates != null ) {
this.drawPhasors$java_awt_Graphics$com_falstad_QuantumRotatorFrame_View(g, this.viewStates);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
var termWidth = this.phasors[0].width;
var x = this.winSize.width - (termWidth/2|0);
var y = this.viewStates.y + (termWidth/2|0);
var omega = 2;
var tcos = java.lang.Math.cos(-omega * this.t + 1.5707963267948966);
var tsin = java.lang.Math.sin(-omega * this.t + 1.5707963267948966);
var ss2 = (termWidth/2|0);
var xa = ((tcos * ss2)|0);
var ya = ((-tsin * ss2)|0);
g.drawOval$I$I$I$I(x - ss2, y - ss2, termWidth, termWidth);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.drawLine$I$I$I$I(x + xa, y + ya - 1, x + xa, y + ya + 1 );
g.drawLine$I$I$I$I(x + xa - 1, y + ya, x + xa + 1 , y + ya);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'fillSquare$I$I$D$D$D', function (i, j, cr, cg, cb) {
var winw = this.viewX.width;
var winh = this.viewX.height;
var x = (i * winw/this.gridSizeX|0);
var y = (j * winh/this.gridSizeY|0);
var x2 = ((i + 1) * winw/this.gridSizeX|0);
var y2 = ((j + 1) * winh/this.gridSizeY|0);
cr *= this.colorMult;
cg *= this.colorMult;
cb *= this.colorMult;
var k;
var l;
if (cr == 0  && cg == 0   && cb == 0  ) {
var y2l = y2 * this.viewX.width;
for (k = x; k < x2; k++) for (l = y * this.viewX.width; l < y2l; l = l+(this.viewX.width)) this.pixels[k + l] = -16777216;


return;
}var fm = this.max$D$D(cr, this.max$D$D(cg, cb));
if (fm > 255 ) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = -16777216 + (((cr|0)) << 16) | (((cg|0)) << 8) | (((cb|0)));
var y2l = y2 * this.viewX.width;
for (k = x; k < x2; k++) for (l = y * this.viewX.width; l < y2l; l = l+(this.viewX.width)) this.pixels[k + l] = colval;


});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, str, ypos) {
g.drawString$S$I$I(str, ((this.winSize.width - this.fontMetrics.stringWidth$S(str))/2|0), ypos);
});

Clazz.newMeth(C$, 'visibleFace$I$I$I', function (nx, ny, nz) {
var viewx = C$.viewDistance * this.rotmatrix[2];
var viewy = C$.viewDistance * this.rotmatrix[5];
var viewz = C$.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0 ;
});

Clazz.newMeth(C$, 'drawPhasors$java_awt_Graphics$com_falstad_QuantumRotatorFrame_View', function (g, v) {
var i;
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i];
var st = ph.state;
var ss = ph.width;
var ss2 = (ss/2|0);
var x = ph.x + ss2;
var y = ph.y + ss2;
var yel = (this.selectedState != null  && this.selectedState.elevel == st.elevel  );
g.setColor$java_awt_Color(yel ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : st.mag == 0  ? this.gray2 : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(x - ss2, y - ss2, ss, ss);
var xa = ((st.re * ss2)|0);
var ya = ((-st.im * ss2)|0);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.drawLine$I$I$I$I(x + xa, y + ya - 1, x + xa, y + ya + 1 );
g.drawLine$I$I$I$I(x + xa - 1, y + ya, x + xa + 1 , y + ya);
}
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_QuantumRotatorFrame_View$DA$I$I$Z', function (g, view, fr, count, pad, fromZero) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var vw = this.winSize.width;
var vw2 = vw;
var mid_x = (fromZero) ? ((vw2/(count - 1)|0)) : (vw2 * ((count/2|0))/(count - 1)|0);
var zero = mid_x;
for (i = 0; i != count; i++) {
var x = (vw2 * i/(count - 1)|0);
var ii = i;
var dr = fr[ii];
var dy = dr * dr;
if (dy > maxsq ) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev ;
tot += dy;
}
zero = mid_x;
expectx /= tot;
expectx2 /= tot;
var maxnm = java.lang.Math.sqrt(maxsq);
var uncert = java.lang.Math.sqrt(expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 1 / maxnm;
view.scale = bestscale;
if (view.scale > 1.0E8 ) view.scale = 1.0E8;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(mid_x, view.y, mid_x, view.y + view.height);
var ymult2 = 0.9 * view.height;
var mid_y = view.y + (view.height/2|0) + ((ymult2|0)/2|0);
var mult = ymult2 * view.scale;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
ox = -1;
for (i = 0; i != count; i++) {
var x = (vw2 * i/(count - 1)|0);
var ii = i;
var y = mid_y - ((mult * fr[ii])|0);
if ((i % pad) == 1) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(x, mid_y, x, mid_y + 4);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
}if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
if (maxsq > 0 ) {
expectx += zero + 0.5;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I((expectx|0), view.y, (expectx|0), view.y + view.height);
}});

Clazz.newMeth(C$, 'drawAxes$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
var d = 0.5;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 0, this.xpoints, this.ypoints, 0, this.viewAxes);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(d, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "x", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, d, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "y", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, d, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "z", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
});

Clazz.newMeth(C$, 'drawArrow$java_awt_Graphics$S$I$I$I$I', function (g, text, x1, y1, x2, y2) {
this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, text, x1, y1, x2, y2, 5);
});

Clazz.newMeth(C$, 'drawArrow$java_awt_Graphics$S$I$I$I$I$I', function (g, text, x1, y1, x2, y2, as) {
g.drawLine$I$I$I$I(x1, y1, x2, y2);
var l = java.lang.Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
if (l > (as/2|0) ) {
var hatx = (x2 - x1) / l;
var haty = (y2 - y1) / l;
g.drawLine$I$I$I$I(x2, y2, ((haty * as - hatx * as + x2)|0), ((-hatx * as - haty * as + y2)|0));
g.drawLine$I$I$I$I(x2, y2, ((-haty * as - hatx * as + x2)|0), ((hatx * as - haty * as + y2)|0));
if (text != null ) g.drawString$S$I$I(text, ((x2 + hatx * 10)|0), ((y2 + haty * 10)|0));
}});

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I$java_awt_Rectangle', function (x, y, z, xpoints, ypoints, pt, v) {
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = C$.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = v.width * this.zoom / 2;
var scaley = v.height * this.zoom / 2;
var aratio = v.width / v.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = v.x + (v.width/2|0) + ((scalex * realx / realz)|0);
ypoints[pt] = v.y + (v.height/2|0) - ((scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'unmap3d$DA$I$I$DA$DA', function (x3, x, y, pn, pp) {
var scalex = this.viewX.width * this.zoom / 2;
var scaley = this.viewX.height * this.zoom / 2;
var aratio = this.viewX.width / this.viewX.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - (this.viewX.x + (this.viewX.width/2|0))) / scalex;
var vy = -(y - (this.viewX.y + (this.viewX.height/2|0))) / scaley;
var rotm = this.rotmatrix;
var mx = C$.viewDistance * rotm[2];
var my = C$.viewDistance * rotm[5];
var mz = C$.viewDistance * rotm[8];
var mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
var mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
var mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);
var t = ((pp[0] - mx) * pn[0] + (pp[1] - my) * pn[1] + (pp[2] - mz) * pn[2]) / (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);
x3[0] = mx + mvx * t;
x3[1] = my + mvy * t;
x3[2] = mz + mvz * t;
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint();
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
if (e.getSource() === this.blankButton ) this.doClear();
if (e.getSource() === this.normalizeButton ) this.normalize();
if (e.getSource() === this.maximizeButton ) this.maximize();
});

Clazz.newMeth(C$, 'doGauss$I$I$I', function (xx, yy, mom) {
var i;
var j;
var dshalf = (this.dataSizeTh/2|0);
if (xx < 0) xx = 0;
if (yy < 0) yy = 0;
var gx = (500/(xx + 5)|0);
var gy = (500/(yy + 5)|0);
var gm = mom / 3.0;
if (gm > 24 ) gm = 24;
if (gm < -24 ) gm = -24;
for (i = 0; i != this.dataSizeTh; i++) {
var th = i * 3.141592653589793 / (this.dataSizeTh - 1);
var z = java.lang.Math.cos(th);
var sinth = java.lang.Math.sin(th);
for (j = 0; j != this.dataSizePh; j++) {
var ph = j * 2 * 3.141592653589793  / this.dataSizePh;
var x = java.lang.Math.cos(ph) * sinth;
var y = java.lang.Math.sin(ph) * sinth;
var d1 = java.lang.Math.exp(-gx * ((y + 1) * (y + 1) + x * x) - gy * z * z );
this.func[i][j] = d1 * java.lang.Math.cos((ph - 4.71238898038469) * gm);
this.funci[i][j] = d1 * java.lang.Math.sin((ph - 4.71238898038469) * gm);
}
}
this.transform();
this.editingFunc = true;
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.phasorBar ) this.setupDisplay();
if (e.getSource() === this.brightnessBar ) {
var mult = java.lang.Math.exp(this.brightnessBar.getValue() / 100.0);
this.userBrightMult = mult / this.bestBrightness;
}if (e.getSource() === this.resolutionBar ) this.setResolution();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
this.dragX = e.getX();
this.dragY = e.getY();
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if (this.dragging) return;
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var oldsph = this.selectedPaneHandle;
var olds = this.selection;
var oldss = this.selectedState;
this.selectedPaneHandle = -1;
this.selection = 0;
this.selectedState = null;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3 ) {
this.selectedPaneHandle = i;
this.selection = 4;
}}
if (this.viewX != null  && this.viewX.inside$I$I(x, y) ) {
this.selection = 2;
} else if (this.viewPotential != null  && this.viewPotential.contains$I$I(x, y) ) {
this.selection = 1;
} else if (this.viewStates != null  && this.viewStates.inside$I$I(x, y) ) this.findPhasor$com_falstad_QuantumRotatorFrame_View$I$I(this.viewStates, x, y);
if (oldsph != this.selectedPaneHandle || olds != this.selection  || oldss !== this.selectedState  ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'findPhasor$com_falstad_QuantumRotatorFrame_View$I$I', function (v, x, y) {
var i;
for (i = 0; i != this.phasorCount; i++) {
if (!this.phasors[i].inside$I$I(x, y)) continue;
this.selectedPhasor = this.phasors[i];
this.selectedState = this.selectedPhasor.state;
this.selection = 3;
break;
}
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (this.selection == 3) this.editMagClick();
if (e.getClickCount() == 2 && this.selectedState != null  ) this.enterSelectedState();
});

Clazz.newMeth(C$, 'enterSelectedState', function () {
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i] !== this.selectedState ) this.states[i].setRe$D(0);

this.selectedState.setRe$D(1);
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
if ((e.getModifiers() & 16) == 0) return;
this.mouseMoved$java_awt_event_MouseEvent(e);
this.dragX = this.dragStartX = e.getX();
this.dragY = this.dragStartY = e.getY();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.dragging) this.cv.repaint();
this.dragging = this.editingFunc = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (Clazz.instanceOf(e.getItemSelectable(), "a2s.CheckboxMenuItem")) {
this.setupDisplay();
this.cv.repaint$J(this.pause);
return;
}this.cv.repaint$J(this.pause);
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

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 4:
this.editHandle$I(y);
break;
case 3:
this.editMag$I$I(x, y);
break;
case 1:
break;
case 2:
this.editX$I$I(x, y);
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

Clazz.newMeth(C$, 'editX$I$I', function (x, y) {
var mode = this.modeChooser.getSelectedIndex();
if (mode == 0) {
var xo = this.dragX - x;
var yo = this.dragY - y;
this.rotate$D$D(xo / 40.0, -yo / 40.0);
this.cv.repaint$J(this.pause);
} else if (mode == 1) {
this.doGauss$I$I$I(x - this.dragStartX, y - this.dragStartY, 0);
this.setView();
this.cv.repaint();
} else if (mode == 2) {
var xx = x - this.dragStartX;
var yy = y - this.dragStartY;
this.doGauss$I$I$I(yy, yy, xx);
this.setView();
this.cv.repaint();
} else if (mode == 3) {
var xo = this.dragX - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.0;
if (this.zoom < 0.1 ) this.zoom = 0.1;
System.out.println$D(this.zoom);
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedPhasor == null ) return;
var stateSize = this.selectedPhasor.width;
var ss2 = (stateSize/2|0);
var x0 = this.selectedPhasor.x + ss2;
var y0 = this.selectedPhasor.y + ss2;
x = x-(x0);
y = y-(y0);
var mag = java.lang.Math.sqrt(x * x + y * y) / ss2;
var ang = java.lang.Math.atan2(-y, x);
if (mag > 10 ) mag = 0;
if (mag > 1 ) mag = 1;
this.selectedState.setMagPhase$D$D(mag, ang);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedState == null ) return;
if (this.magDragStart < 0.5 ) this.selectedState.setRe$D(1);
 else this.selectedState.setRe$D(0);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'calcLz$DA$I$I$I$Z', function (data, count, maxm, pad, square) {
var i;
var mid = (count/2|0);
for (i = 0; i != count; i++) data[i] = 0;

if (square) mid = 1;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i];
if (bs.l <= maxm) {
if (square) data[mid + bs.m * bs.m * pad ] += bs.magSquared();
 else data[mid + bs.m * pad] += bs.magSquared();
}}
for (i = 0; i != count; i++) data[i] = java.lang.Math.sqrt(data[i]);

});

Clazz.newMeth(C$, 'doClear', function () {
var x;
for (x = 0; x != this.stateCount; x++) this.states[x].setRe$D(0);

});

Clazz.newMeth(C$, 'normalize', function () {
var norm = 0;
var i;
for (i = 0; i != this.stateCount; i++) norm += this.states[i].magSquared();

if (norm == 0 ) return;
var normmult = 1 / java.lang.Math.sqrt(norm);
for (i = 0; i != this.stateCount; i++) this.states[i].multRe$D(normmult);

this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'maximize', function () {
var i;
var maxm = 0;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > maxm ) maxm = this.states[i].mag;

if (maxm == 0 ) return;
for (i = 0; i != this.stateCount; i++) {
this.states[i].multRe$D(1 / maxm);
if (this.states[i].mag < 0.01 ) this.states[i].setRe$D(0);
}
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'getState$I$I$I', function (n, l, m) {
var pre_n = n - 1;
var pre_n_add = (pre_n * (pre_n + 1) * (2 * pre_n + 1) /6|0);
var pre_l_add = l * l;
return this.states[pre_n_add + pre_l_add + l + m ];
});

Clazz.newMeth(C$, 'radialNorm$I$I', function (n, l) {
var a0 = this.factorial$I(n + l);
return java.lang.Math.sqrt(4.0 * this.factorial$I(n + l) / (n * n * n * n * this.factorial$I(n - l - 1 ) )) / this.factorial$I(2 * l + 1);
});

Clazz.newMeth(C$, 'sphericalNorm$I$I', function (l, m) {
return java.lang.Math.sqrt((2 * l + 1) * this.factorial$I(l - m) / (4 * 3.141592653589793 * this.factorial$I(l + m) ));
});

Clazz.newMeth(C$, 'factorial$I', function (f) {
var res = 1;
while (f > 1)res *= f--;

return res;
});

Clazz.newMeth(C$, 'plgndr$I$I$D', function (l, m, x) {
var fact;
var pll = 0;
var pmm;
var pmmp1;
var somx2;
var i;
var ll;
if (m < 0 || m > l  || java.lang.Math.abs(x) > 1.0  ) {
System.out.print$S("bad arguments in plgndr\u000a");
}pmm = 1.0;
if (m > 0) {
somx2 = java.lang.Math.sqrt((1.0 - x) * (1.0 + x));
fact = 1.0;
for (i = 1; i <= m; i++) {
pmm *= -fact * somx2;
fact += 2.0;
}
}if (l == m) return pmm;
 else {
pmmp1 = x * (2 * m + 1) * pmm ;
if (l == (m + 1)) return pmmp1;
 else {
for (ll = (m + 2); ll <= l; ll++) {
pll = (x * (2 * ll - 1) * pmmp1  - (ll + m - 1) * pmm) / (ll - m);
pmm = pmmp1;
pmmp1 = pll;
}
return pll;
}}});

Clazz.newMeth(C$, 'hypser$I$I$D', function (a, c, z) {
var n;
var fac = 1;
var result = 1;
for (n = 1; n <= 1000; n++) {
fac *= a * z / (n * c);
if (fac == 0 ) return result;
result += fac;
a++;
c++;
}
System.out.print$S("convergence failure in hypser\u000a");
return 0;
});
;
(function(){var C$=Clazz.newClass(P$.QuantumRotatorFrame, "Phasor", function(){
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
(function(){var C$=Clazz.newClass(P$.QuantumRotatorFrame, "State", function(){
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

Clazz.newMeth(C$, 'setBasisActive', function () {
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumRotatorFrame, "BasisState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.QuantumRotatorFrame','com.falstad.QuantumRotatorFrame.State']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.l = 0;
this.m = 0;
this.plm = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getText', function () {
return "l = " + this.l + ", m = " + this.m ;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumRotatorFrame, "PhaseColor", function(){
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
(function(){var C$=Clazz.newClass(P$.QuantumRotatorFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.scale = 0;
this.paneY = 0;
this.pixels = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_QuantumRotatorFrame_View', function (v) {
C$.superclazz.c$$java_awt_Rectangle.apply(this, [v]);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.QuantumRotatorFrame, "TextBox", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.text = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$S', function (x, y, a, b, s) {
C$.superclazz.c$$I$I$I$I.apply(this, [x, y, a, b]);
C$.$init$.apply(this);
this.text = s;
}, 1);

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:10
