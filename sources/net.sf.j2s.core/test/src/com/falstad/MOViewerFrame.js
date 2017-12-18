(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "MOViewerFrame", function(){
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
this.memoryImageSourceCheck = null;
this.colorCheck = null;
this.eCheckItem = null;
this.eSepCheckItem = null;
this.xCheckItem = null;
this.alwaysNormItem = null;
this.nuclearItem = null;
this.showAtomsItem = null;
this.dimensionsItem = null;
this.axesItem = null;
this.exitItem = null;
this.sliceChooser = null;
this.stateChooser = null;
this.sampleChooser = null;
this.samplesItems = null;
this.samplesGroup = null;
this.samplesNums = null;
this.resolutionBar = null;
this.internalResBar = null;
this.brightnessBar = null;
this.scaleBar = null;
this.sampleBar = null;
this.separationBar = null;
this.viewPotential = null;
this.viewPotentialSep = null;
this.viewX = null;
this.viewList = null;
this.viewCount = 0;
this.stateNum = 0;
this.orbitals = null;
this.orbCount = 0;
this.orbListLeft = null;
this.orbListRight = null;
this.orbListCenter = null;
this.orbCountOffset = 0;
this.orbCountCenter = 0;
this.evalues = null;
this.basisCount = 0;
this.changingDerivedStates = false;
this.dragZoomStart = 0;
this.zoom = 0;
this.rotmatrix = null;
this.sep2 = 0;
this.colorMult = 0;
this.viewAxes = null;
this.xpoints = null;
this.ypoints = null;
this.selectedPaneHandle = 0;
this.func = null;
this.phaseColors = null;
this.resadj = 0;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.sampleCount = 0;
this.dataSize = 0;
this.modes = null;
this.pause = 0;
this.applet = null;
this.selection = 0;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.sliceFaceCount = 0;
this.sliceval = 0;
this.sampleMult = null;
this.selectedSlice = false;
this.settingScale = false;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.phiIndex = 0;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.cv = null;
this.useBufferedImage = false;
this.precount = 0;
this.scaleValue = 0;
this.sepValue = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.samplesNums = Clazz.array(Integer.TYPE, -1, [9, 15, 25, 35, 45, 55]);
this.dragging = false;
this.selection = -1;
this.sliceval = 0;
this.t = 0;
this.useBufferedImage = false;
this.scaleValue = -1;
this.sepValue = -1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "MOViewer by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_MOViewer', function (a) {
C$.superclazz.c$$S.apply(this, ["Molecular Orbital Viewer v1.5a"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.gray2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
var res = 68;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.MOViewerLayout')))));
this.cv = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.MOViewerCanvas'))).c$$com_falstad_MOViewerFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.eSepCheckItem = this.getCheckItem$S("Energy"));
this.eSepCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.xCheckItem = this.getCheckItem$S("Position"));
this.xCheckItem.setState$Z(true);
this.xCheckItem.setEnabled$Z(false);
m.addSeparator();
m.add$javax_swing_JMenuItem(this.colorCheck = this.getCheckItem$S("Phase as Color"));
this.colorCheck.setState$Z(true);
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.nuclearItem = this.getCheckItem$S("Include Nuclear E"));
this.nuclearItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.showAtomsItem = this.getCheckItem$S("Show Nuclei"));
this.showAtomsItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.dimensionsItem = this.getCheckItem$S("Show Dimensions"));
m.add$javax_swing_JMenuItem(this.axesItem = this.getCheckItem$S("Show Axes"));
this.axesItem.setState$Z(true);
this.setMenuBar$a2s_MenuBar(mb);
m = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Menu'))).c$$S,["Samples"]);
mb.add$javax_swing_JMenu(m);
this.samplesItems = Clazz.array((I$[7]||(I$[7]=Clazz.load('javax.swing.JRadioButtonMenuItem'))), [6]);
m.add$javax_swing_JMenuItem(this.samplesItems[0] = this.getRadioItem$S("Samples = 9 (fastest)"));
m.add$javax_swing_JMenuItem(this.samplesItems[1] = this.getRadioItem$S("Samples = 15 (default)"));
m.add$javax_swing_JMenuItem(this.samplesItems[2] = this.getRadioItem$S("Samples = 25"));
m.add$javax_swing_JMenuItem(this.samplesItems[3] = this.getRadioItem$S("Samples = 35"));
m.add$javax_swing_JMenuItem(this.samplesItems[4] = this.getRadioItem$S("Samples = 45"));
m.add$javax_swing_JMenuItem(this.samplesItems[5] = this.getRadioItem$S("Samples = 55 (best)"));
this.samplesGroup = Clazz.new_((I$[8]||(I$[8]=Clazz.load('javax.swing.ButtonGroup'))));
for (var i = 0; i < 6; i++) {
this.samplesGroup.add$javax_swing_AbstractButton(this.samplesItems[i]);
this.samplesItems[i].setActionCommand$S("" + this.samplesNums[i]);
}
this.samplesItems[1].setSelected$Z(true);
var i;
this.stateChooser = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Choice'))));
this.stateChooser.add$S("sigma g 1s");
this.stateChooser.add$S("sigma*u 1s");
this.stateChooser.add$S("pi u 2px");
this.stateChooser.add$S("pi u 2py");
this.stateChooser.add$S("sigma g 2s");
this.stateChooser.add$S("sigma g 2pz");
this.stateChooser.add$S("sigma*u 2s");
this.stateChooser.add$S("pi*g 2px");
this.stateChooser.add$S("pi*g 2py");
this.stateChooser.add$S("sigma*u 2pz");
this.stateChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stateChooser);
this.sliceChooser = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Choice'))));
this.sliceChooser.add$S("No Slicing");
this.sliceChooser.add$S("Show X Slice");
this.sliceChooser.add$S("Show Y Slice");
this.sliceChooser.add$S("Show Z Slice");
this.sliceChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.sliceChooser);
this.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 1385, 1, 1000, 1800]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.add$java_awt_Component(this.resolutionBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 2, 20, 200]));
this.resolutionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Scale", 0]));
this.add$java_awt_Component(this.scaleBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 24, 1, 5, 52]));
this.scaleBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Separation", 0]));
this.add$java_awt_Component(this.separationBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 12, 1, 0, 21]));
this.separationBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
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
this.phaseColors = Clazz.array((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))), [400]);
for (i = 0; i != 8; i++) for (j = 0; j != 50; j++) {
var ang = Math.atan(j / 50.0);
this.phaseColors[i * 50 + j] = this.genPhaseColor$I$D(i, ang);
}

this.slicerPoints = Clazz.array(Integer.TYPE, [2, 10]);
this.sliceFaces = Clazz.array(Double.TYPE, [4, 3]);
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate$D$D(-1.5707963267948966, 0);
this.rotate$D$D(0, 1.5707963267948966);
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.setupSimpson();
this.random = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Random'))));
this.readModes();
this.getEnergyValues();
this.createOrbitals();
this.reinit();
this.cv.setBackground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
this.setSize$I$I(550, 530);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
this.validate();
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
var mi = Clazz.new_((I$[7]||(I$[7]=Clazz.load('javax.swing.JRadioButtonMenuItem'))).c$$S,[s]);
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
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 1, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))).c$$D$D$D, [this, null, a3, 1, 0]);
break;
case 2:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 0, 1, a2]);
break;
case 3:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 0, a3, 1]);
break;
case 4:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))).c$$D$D$D, [this, null, a2, 0, 1]);
break;
case 5:
c = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 0, a3]);
break;
}
return c;
});

Clazz.newMeth(C$, 'setupSimpson', function () {
this.sampleCount = Integer.parseInt(this.samplesGroup.getSelection().getActionCommand());
System.out.println$S("samplecount = " + this.sampleCount);
this.sampleMult = Clazz.array(Integer.TYPE, [this.sampleCount]);
var i;
for (i = 1; i < this.sampleCount; i = i+(2)) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[this.sampleCount - 1] = 1;
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

Clazz.newMeth(C$, 'setupDisplay', function () {
if (this.winSize == null ) return;
var potsize = (this.viewPotentialSep == null ) ? 100 : this.viewPotentialSep.height;
this.viewX = this.viewPotential = this.viewPotentialSep = null;
this.viewList = Clazz.array((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').View))), [10]);
var i = 0;
if (this.eSepCheckItem.getState()) this.viewList[i++] = this.viewPotentialSep = Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').View))), [this, null]);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0 && this.viewPotentialSep != null  ) {
sizenum--;
toth = toth-(potsize);
}toth = toth-(4 * 2 * (this.viewCount - 1) );
var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (sizenum == 0) ? toth : (toth/sizenum|0);
if (v === this.viewPotentialSep  && potsize > 0 ) h = potsize;
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

this.imageSource = Clazz.new_((I$[17]||(I$[17]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.memimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}var asize = ((this.min$D$D(this.viewX.width, this.viewX.height) / 3)|0);
this.viewAxes = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.viewX.x + this.winSize.width - asize, this.viewX.y, asize, asize]);
});

Clazz.newMeth(C$, 'getTermWidth', function () {
return 8;
});

Clazz.newMeth(C$, 'rotate$D$D', function (angle1, angle2) {
var r1cos = Math.cos(angle1);
var r1sin = Math.sin(angle1);
var r2cos = Math.cos(angle2);
var r2sin = Math.sin(angle2);
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
System.out.print$S("setResolution " + this.dataSize + " " + this.gridSizeX + "\n" );
this.resadj = 50.0 / this.dataSize;
this.precomputeAll();
this.func = Clazz.array(Double.TYPE, [this.gridSizeX, this.gridSizeY, 3]);
});

Clazz.newMeth(C$, 'computeView$D', function (normmult) {
var i;
var j;
var q = 3.14159265 / this.dataSize;
var color = this.colorCheck.getState();
for (i = 0; i != this.orbCount; i++) this.orbitals[i].setupFrame$D(normmult);

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
var slice = this.sliceChooser.getSelectedIndex();
var boundRadius2 = 1.22;
boundRadius2 *= boundRadius2;
var scalemult = this.scaleBar.getValue() / 50.0;
var sep = this.sep2 * 0.5 / (zmult * scalemult * this.resadj );
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = -(2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * C$.viewDistance;
var camy = rotm[5] * C$.viewDistance;
var camz = rotm[8] * C$.viewDistance;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
var camnorm = Math.sqrt(camvx0 * camvx0 + camvy0 * camvy0 + 1);
var n;
var simpr = 0;
var simpg = 0;
var a = camvx * camvx + camvy * camvy + camvz * camvz;
var b = 2 * (camvx * camx + camvy * camy + camvz * camz);
var c = camx * camx + camy * camy + camz * camz - boundRadius2;
var discrim = b * b - 4 * a * c ;
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
if (discrim < 0 ) {
this.fillSquare$I$I$F$F$F(i, j, 0, 0, 0);
continue;
}discrim = Math.sqrt(discrim);
var mint = (-b - discrim) / (2 * a);
var maxt = (-b + discrim) / (2 * a);
if (slice != 0) {
var t = -100;
switch (slice) {
case 1:
t = (this.sliceval - camx) / camvx;
break;
case 2:
t = (this.sliceval - camy) / camvy;
break;
case 3:
t = (this.sliceval - camz) / camvz;
break;
}
if (t < mint  || t > maxt  ) {
this.fillSquare$I$I$F$F$F(i, j, 0, 0, 0);
continue;
}mint = maxt = t;
}var tstep = (maxt - mint) / (this.sampleCount - 1);
var pathlen = (maxt - mint) * camnorm;
var maxn = this.sampleCount - 1;
n = 1;
var xx = (camx + camvx * mint) * xmult;
var yy = (camy + camvy * mint) * ymult;
var zz = (camz + camvz * mint) * zmult;
if (slice != 0) {
maxn = 1;
n = 0;
pathlen = 2;
if (xx > xmult  || yy > ymult   || zz > zmult   || xx < -xmult   || yy < -ymult   || zz < -zmult  ) {
this.fillSquare$I$I$F$F$F(i, j, 0, 0, 0);
continue;
}}camvx *= tstep * xmult;
camvy *= tstep * ymult;
camvz *= tstep * zmult;
var dshalf = (this.dataSize/2|0);
var oi;
var msep = sep * zmult;
for (; n < maxn; n++) {
var xy2 = xx * xx + yy * yy;
var zz1 = zz + msep;
var r = Math.sqrt(xy2 + zz1 * zz1);
var costh = zz1 / r;
var ri = (r|0);
var costhi = ((costh * dshalf + dshalf)|0);
var fr = 0;
this.calcPhiComponent$D$D(xx, yy);
for (oi = 0; oi != this.orbCountOffset; oi++) {
var oo = this.orbListLeft[oi];
fr += oo.computePoint$I$I(ri, costhi);
}
var zz2 = zz - msep;
r = Math.sqrt(xy2 + zz2 * zz2);
costh = zz2 / r;
ri = (r|0);
costhi = ((costh * dshalf + dshalf)|0);
for (oi = 0; oi != this.orbCountOffset; oi++) {
var oo = this.orbListRight[oi];
fr += oo.computePoint$I$I(ri, costhi);
}
if (this.orbCountCenter != 0) {
r = Math.sqrt(xy2 + zz * zz);
costh = zz / r;
ri = (r|0);
costhi = ((costh * dshalf + dshalf)|0);
for (oi = 0; oi != this.orbCountCenter; oi++) {
var oo = this.orbListCenter[oi];
fr += oo.computePoint$I$I(ri, costhi);
}
}var fv = fr * fr * this.sampleMult[n] ;
if (color) {
if (fr > 0 ) simpr += fv;
 else simpg += fv;
} else {
simpr = (simpg += fv);
}xx += camvx;
yy += camvy;
zz += camvz;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
this.fillSquare$I$I$F$F$F(i, j, simpr, simpg, simpg);
}

});

Clazz.newMeth(C$, 'fillSquare$I$I$F$F$F', function (i, j, cr, cg, cb) {
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

Clazz.newMeth(C$, 'getPhaseColor$D$D', function (x, y) {
var val = 0;
if (x == 0  && y == 0  ) return this.phaseColors[0];
var offset = 0;
if (y >= 0 ) {
if (x >= 0 ) {
if (x >= y ) {
offset = 0;
val = y / x;
} else {
offset = 50;
val = 1 - x / y;
}} else {
if (-x <= y ) {
offset = 100;
val = -x / y;
} else {
offset = 150;
val = 1 + y / x;
}}} else {
if (x <= 0 ) {
if (y >= x ) {
offset = 200;
val = y / x;
} else {
offset = 250;
val = 1 - x / y;
}} else {
if (-y >= x ) {
offset = 300;
val = -x / y;
} else {
offset = 350;
val = 1 + y / x;
}}}return this.phaseColors[offset + ((val * 49)|0)];
});

Clazz.newMeth(C$, 'calcPhiComponent$D$D', function (x, y) {
var phiSector = 0;
var val = 0;
if (x == 0  && y == 0  ) {
this.phiIndex = 0;
return;
}if (y >= 0 ) {
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
}}}this.phiIndex = (phiSector * (this.dataSize + 1)) + ((val * this.dataSize)|0);
});

Clazz.newMeth(C$, 'getCodeBase', function () {
try {
if (this.applet != null ) return this.applet.getDocumentBase();
var f = Clazz.new_((I$[19]||(I$[19]=Clazz.load('java.io.File'))).c$$S,["."]);
return Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.net.URL'))).c$$S,["file:" + f.getCanonicalPath() + "/" ]);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
return null;
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'readModes', function () {
try {
var url = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.net.URL'))).c$$S,[this.getCodeBase() + "states.txt"]);
var o = url.getContent();
var fis = o;
var b = Clazz.array(Byte.TYPE, [42000]);
var off = 0;
while (true){
var n = fis.read$BA$I$I(b, off, 2048);
if (n <= 0) break;
off = off+(n);
}
var len = off;
var p;
var mm = 0;
this.modes = Clazz.array(Float.TYPE, [10101]);
for (p = 0; p < len; ) {
var l;
for (l = 0; l != len - p; l++) if (b[l + p] == 10 ) {
l++;
break;
}
var line =  String.instantialize(b, p, l - 1);
var st = Clazz.new_((I$[21]||(I$[21]=Clazz.load('java.util.StringTokenizer'))).c$$S,[line]);
while (st.hasMoreTokens())this.modes[mm++] =  new Float(st.nextToken()).floatValue();

p = p+(l);
}
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'precomputeAll', function () {
var i;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
orb.precompute();
}
this.sep2 = this.separationBar.getValue() / 2.0;
if (this.sep2 < 0 ) this.sep2 = 0;
if (this.sep2 > 10 ) this.sep2 = 10;
var ma = 0;
for (; ; ma++) {
if (this.modes[ma] == 99999 ) break;
if (this.modes[ma] == 99000 + this.sep2 ) break;
}
if (this.modes[ma] == 99999 ) return;
ma++;
this.stateNum = 0;
this.orbitals[4].setReal();
this.orbitals[5].setReal();
this.orbitals[9].setReal();
switch (this.stateChooser.getSelectedIndex()) {
case 0:
this.stateNum = 0;
break;
case 1:
this.stateNum = 1;
break;
case 2:
this.stateNum = 2;
break;
case 3:
this.stateNum = 2;
this.orbitals[4].setIm();
this.orbitals[5].setIm();
this.orbitals[9].setIm();
break;
case 4:
this.stateNum = 3;
break;
case 5:
this.stateNum = 4;
break;
case 6:
this.stateNum = 5;
break;
case 7:
this.stateNum = 6;
break;
case 8:
this.stateNum = 6;
this.orbitals[4].setIm();
this.orbitals[5].setIm();
this.orbitals[9].setIm();
break;
case 9:
this.stateNum = 7;
break;
}
for (i = 0; i != this.orbCount; i++) this.orbitals[i].used = false;

while (this.modes[ma] < 99000  && this.modes[ma] != this.stateNum  )ma = ma+(59);

if (this.modes[ma] >= 99000 ) return;
ma++;
this.sep2 = this.modes[ma++];
var sgn = 1;
if (this.sep2 < 0 ) {
this.sep2 = -this.sep2;
sgn = -1;
}ma++;
this.precount = 0;
this.orbitals[0].precomputeR$D$I$D(1, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(1, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(1.5, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(1.5, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(2, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(2, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(0.4, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(0.4, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(0.7, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(0.7, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(1, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(1, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(0.4, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(0.4, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR$D$I$D(0.7, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR$D$I$D(0.7, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR$D$I$D(1, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR$D$I$D(1, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR$D$I$D(0.4, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR$D$I$D(0.4, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR$D$I$D(0.7, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR$D$I$D(0.7, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR$D$I$D(1, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR$D$I$D(1, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR$D$I$D(0.4, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR$D$I$D(0.4, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR$D$I$D(0.7, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR$D$I$D(0.7, 2, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR$D$I$D(1.5, 1, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR$D$I$D(2, 1, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR$D$I$D(1.5, 2, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR$D$I$D(2, 2, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR$D$I$D(1.5, 3, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR$D$I$D(2, 3, sgn * this.modes[ma++]);
this.orbitals[8].precomputeR$D$I$D(1.5, 3, sgn * this.modes[ma++]);
this.orbitals[8].precomputeR$D$I$D(2, 3, sgn * this.modes[ma++]);
this.orbitals[9].precomputeR$D$I$D(1.5, 3, -sgn * this.modes[ma++]);
this.orbitals[9].precomputeR$D$I$D(2, 3, -sgn * this.modes[ma++]);
this.orbitals[7].precomputeR$D$I$D(1.5, 4, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR$D$I$D(2, 4, sgn * this.modes[ma++]);
this.orbitals[10].precomputeR$D$I$D(1.5, 4, sgn * this.modes[ma++]);
this.orbitals[10].precomputeR$D$I$D(2, 4, sgn * this.modes[ma++]);
this.orbCountOffset = this.orbCountCenter = 0;
this.orbListLeft = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').Orbital))), [3]);
this.orbListRight = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').Orbital))), [3]);
this.orbListCenter = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').Orbital))), [5]);
for (i = 0; i != 6; i = i+(2)) {
if (this.orbitals[i].used) {
this.orbListLeft[this.orbCountOffset] = this.orbitals[i];
this.orbListRight[this.orbCountOffset] = this.orbitals[i + 1];
this.orbCountOffset++;
}}
for (i = 6; i != 11; i++) {
if (this.orbitals[i].used) {
this.orbListCenter[this.orbCountCenter] = this.orbitals[i];
this.orbCountCenter++;
}}
});

Clazz.newMeth(C$, 'getEnergyValues', function () {
var ma = 0;
this.evalues = Clazz.array(Double.TYPE, [21, 8]);
while (this.modes[ma] != 99999 ){
var s = (((this.modes[ma] - 99000) * 2)|0);
ma++;
while (this.modes[ma] < 99000 ){
this.evalues[s][(this.modes[ma]|0)] = this.modes[ma + 2];
ma = ma+(59);
}
}
});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'updateMOViewer$java_awt_Graphics', function (realg) {
var g = null;
if (this.winSize == null  || this.winSize.width == 0 ) return;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
if (this.fontMetrics == null ) this.fontMetrics = g.getFontMetrics();
var sliced = this.sliceChooser.getSelectedIndex() != 0;
this.zoom = (sliced) ? 8 : 16.55;
this.colorMult = Math.exp(this.brightnessBar.getValue() / 100.0 - 2);
this.computeView$D(1);
var i;
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null ) {
var sno = ((this.sep2 - 1)|0);
var ymult = this.viewPotential.height * 1.9;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).darkGray);
var floory = this.viewPotential.y + (this.viewPotential.height/2|0);
for (i = 0; i != 21; i++) {
var e = this.evalues[sno][i];
var y = floory - ((ymult * e)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}
var xp = this.getScaler();
}if (this.viewPotentialSep != null ) {
var floory = this.viewPotentialSep.y + (this.viewPotentialSep.height/2|0);
var ymult = this.viewPotentialSep.height;
if (this.nuclearItem.getState()) {
ymult *= 0.7;
} else {
ymult *= 0.5;
floory = this.viewPotentialSep.y;
}for (i = 0; i != 8; i++) this.drawEnergyLine$java_awt_Graphics$I$I$D(g, i, floory, ymult);

this.drawEnergyLine$java_awt_Graphics$I$I$D(g, this.stateNum, floory, ymult);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
var xx = ((this.sep2 * this.winSize.width / 10)|0);
g.drawLine$I$I$I$I(xx, this.viewPotentialSep.y, xx, this.viewPotentialSep.y + this.viewPotentialSep.height - 1);
}if (this.imageSource != null ) this.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.memimage, this.viewX.x, this.viewX.y, null);
if (this.showAtomsItem.getState()) {
var scalemult = this.scaleBar.getValue() / 50.0;
var zmult = this.dataSize / 2.0;
var sep = this.sep2 * 0.5 / (zmult * scalemult * this.resadj );
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, sep, this.xpoints, this.ypoints, 0, this.viewX);
g.drawOval$I$I$I$I(this.xpoints[0] - 2, this.ypoints[0] - 2, 4, 4);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, -sep, this.xpoints, this.ypoints, 0, this.viewX);
g.drawOval$I$I$I$I(this.xpoints[0] - 2, this.ypoints[0] - 2, 4, 4);
}g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).white);
if (sliced) this.drawCube$java_awt_Graphics$Z(g, false);
if (this.axesItem.getState()) this.drawAxes$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
if (this.dimensionsItem.getState()) {
var w = this.sep2 * 52.9463;
this.centerString$java_awt_Graphics$S$I(g, "Separation = " + (w|0) + " pm (" + new Double(this.sep2).toString() + " a0)" , this.viewX.y + this.viewX.height - 5);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'drawEnergyLine$java_awt_Graphics$I$I$D', function (g, i, floory, ymult) {
var ox = -1;
var oy = -1;
g.setColor$java_awt_Color(this.stateNum == i ? (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).darkGray);
var j;
for (j = 0; j != 21; j++) {
var xx = (j * this.winSize.width/20|0);
var ne = 0;
if (this.nuclearItem.getState()) ne = (j == 0) ? 10 : 1 / (j * 0.5);
var yy = floory - ((ymult * (this.evalues[j][i] + ne))|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, xx, yy);
ox = xx;
oy = yy;
}
});

Clazz.newMeth(C$, 'getScaler', function () {
var scalex = this.viewX.width * this.zoom / 2;
var scaley = this.viewX.height * this.zoom / 2;
var aratio = this.viewX.width / this.viewX.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var xp = 2 * scalex / C$.viewDistance;
var mult = this.scaleBar.getValue() / 50.0;
xp /= 50 * mult;
xp = 1 / xp;
return xp;
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

Clazz.newMeth(C$, 'drawCube$java_awt_Graphics$Z', function (g, drawAll) {
var i;
var slice = this.sliceChooser.getSelectedIndex();
var sp = 0;
for (i = 0; i != 6; i++) {
var nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
var ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
var nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
if (!drawAll && !this.visibleFace$I$I$I(nx, ny, nz) ) continue;
var pts;
pts = Clazz.array(Double.TYPE, [3]);
var n;
for (n = 0; n != 4; n++) {
this.computeFace$I$I$DA(i, n, pts);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n, this.viewX);
}
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
g.drawPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
if (slice != 0 && (i/2|0) != slice - 1 ) {
if (this.selectedSlice) g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace$I$I$DA(i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp, this.viewX);
this.computeFace$I$I$DA(i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1, this.viewX);
g.drawLine$I$I$I$I(this.slicerPoints[0][sp], this.slicerPoints[1][sp], this.slicerPoints[0][sp + 1], this.slicerPoints[1][sp + 1]);
this.sliceFaces[(sp/2|0)][0] = nx;
this.sliceFaces[(sp/2|0)][1] = ny;
this.sliceFaces[(sp/2|0)][2] = nz;
sp = sp+(2);
}}
this.sliceFaceCount = sp;
});

Clazz.newMeth(C$, 'computeFace$I$I$DA', function (b, n, pts) {
var a = b >> 1;
pts[a] = ((b & 1) == 0) ? -1 : 1;
var i;
for (i = 0; i != 3; i++) {
if (i == a) continue;
pts[i] = (((n >> 1) ^ (n & 1)) == 0) ? -1 : 1;
n = n>>(1);
}
});

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
var l = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
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
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.scaleBar ) {
if (this.scaleBar.getValue() == this.scaleValue) return;
this.scaleValue = this.scaleBar.getValue();
this.precomputeAll();
this.manualScale = true;
}if (e.getSource() === this.separationBar ) {
if (this.separationBar.getValue() == this.sepValue) return;
this.sepValue = this.separationBar.getValue();
this.precomputeAll();
}if (e.getSource() === this.resolutionBar ) this.setResolution();
this.setupSimpson();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.changingDerivedStates = false;
this.edit$java_awt_event_MouseEvent(e);
this.dragX = e.getX();
this.dragY = e.getY();
});

Clazz.newMeth(C$, 'csInRange$I$I$I', function (x, xa, xb) {
if (xa < xb) return x >= xa - 5 && x <= xb + 5 ;
return x >= xb - 5 && x <= xa + 5 ;
});

Clazz.newMeth(C$, 'checkSlice$I$I', function (x, y) {
if (this.sliceChooser.getSelectedIndex() == 0) {
this.selectedSlice = false;
return;
}var n;
this.selectedSlice = false;
for (n = 0; n != this.sliceFaceCount; n = n+(2)) {
var xa = this.slicerPoints[0][n];
var xb = this.slicerPoints[0][n + 1];
var ya = this.slicerPoints[1][n];
var yb = this.slicerPoints[1][n + 1];
if (!this.csInRange$I$I$I(x, xa, xb) || !this.csInRange$I$I$I(y, ya, yb) ) continue;
var d;
if (xa == xb) d = Math.abs(x - xa);
 else {
var b = (yb - ya) / (xb - xa);
var a = ya - b * xa;
var d1 = y - (a + b * x);
if (d1 < 0 ) d1 = -d1;
d = d1 / Math.sqrt(1 + b * b);
}if (d < 6 ) {
this.selectedSlice = true;
this.sliceFace = this.sliceFaces[(n/2|0)];
break;
}}
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if (this.dragging) return;
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var oldsph = this.selectedPaneHandle;
var olds = this.selection;
var oldss = this.selectedSlice;
this.selectedPaneHandle = -1;
this.selection = 0;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3 ) {
this.selectedPaneHandle = i;
this.selection = 4;
}}
if (this.viewX != null  && this.viewX.inside$I$I(x, y) ) {
this.selection = 2;
this.checkSlice$I$I(e.getX(), e.getY());
} else if (this.viewPotential != null  && this.viewPotential.contains$I$I(x, y) ) {
this.selection = 1;
}if (oldsph != this.selectedPaneHandle || olds != this.selection  || oldss != this.selectedSlice  ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selection != 0 ) {
this.selectedPaneHandle = -1;
this.selection = 0;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragX = this.dragStartX = e.getX();
this.dragY = this.dragStartY = e.getY();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.dragging) this.cv.repaint();
this.dragging = this.changingDerivedStates = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (this.samplesItems == null ) return;
if (Clazz.instanceOf(e.getItemSelectable(), "javax.swing.JRadioButtonMenuItem")) {
if (e.getStateChange() != 1) return;
this.setupSimpson();
this.setupDisplay();
}if (e.getItemSelectable() === this.stateChooser ) this.precomputeAll();
this.cv.repaint$J(this.pause);
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
var mode = 0;
if (this.selectedSlice) mode = 1;
if (mode == 0) {
var xo = this.dragX - x;
var yo = this.dragY - y;
this.rotate$D$D(xo / 40.0, -yo / 40.0);
this.cv.repaint$J(this.pause);
} else if (mode == 1) {
var x3 = Clazz.array(Double.TYPE, [3]);
this.unmap3d$DA$I$I$DA$DA(x3, x, y, this.sliceFace, this.sliceFace);
switch (this.sliceChooser.getSelectedIndex()) {
case 1:
this.sliceval = x3[0];
break;
case 2:
this.sliceval = x3[1];
break;
case 3:
this.sliceval = x3[2];
break;
}
if (this.sliceval < -0.99 ) this.sliceval = -0.99;
if (this.sliceval > 0.99 ) this.sliceval = 0.99;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'createOrbitals', function () {
if (this.orbCount == 11) return;
this.orbCount = 11;
this.orbitals = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').Orbital))), [this.orbCount]);
this.orbitals[0] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').SOrbital))), [this, null]);
this.orbitals[1] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').SOrbital))), [this, null]);
this.orbitals[2] = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').MZeroOrbital))).c$$I, [this, null, 1]);
this.orbitals[3] = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').MZeroOrbital))).c$$I, [this, null, 1]);
this.orbitals[4] = Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').ReImOrbital))).c$$I, [this, null, 1]);
this.orbitals[5] = Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').ReImOrbital))).c$$I, [this, null, 1]);
this.orbitals[6] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').SOrbital))), [this, null]);
this.orbitals[7] = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').MZeroOrbital))).c$$I, [this, null, 1]);
this.orbitals[8] = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').MZeroOrbital))).c$$I, [this, null, 2]);
this.orbitals[9] = Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').ReImOrbital))).c$$I, [this, null, 2]);
this.orbitals[10] = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.MOViewerFrame').MZeroOrbital))).c$$I, [this, null, 3]);
});

Clazz.newMeth(C$, 'plgndr$I$I$D', function (l, m, x) {
var fact;
var pll = 0;
var pmm;
var pmmp1;
var somx2;
var i;
var ll;
if (m < 0 || m > l  || Math.abs(x) > 1.0  ) {
System.out.print$S("bad arguments in plgndr\u000a");
}pmm = 1.0;
if (m > 0) {
somx2 = Math.sqrt((1.0 - x) * (1.0 + x));
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
(function(){var C$=Clazz.newClass(P$.MOViewerFrame, "Orbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.l = 0;
this.m = 0;
this.reMult = 0;
this.imMult = 0;
this.used = false;
this.dataR = null;
this.dataTh = null;
this.dataPhiR = null;
this.dataPhiI = null;
this.dshalf = 0;
this.brightnessCache = 0;
this.distmult = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.distmult = 4;
}, 1);

Clazz.newMeth(C$, 'setupFrame$D', function (mult) {
this.reMult = 1;
this.imMult = 0;
});

Clazz.newMeth(C$, 'setReal', function () {
});

Clazz.newMeth(C$, 'setIm', function () {
});

Clazz.newMeth(C$, 'getBoundRadius$D', function (bright) {
var i;
var outer = 1;
var mpos = (this.m < 0) ? -this.m : this.m;
var norm1 = 1 / this.sphericalNorm$I$I(this.l, mpos);
norm1 *= norm1;
norm1 *= bright;
for (i = 0; i != this.b$['com.falstad.MOViewerFrame'].dataSize; i++) {
var v = this.dataR[i] * this.dataR[i] * norm1 ;
if (v > 32 ) outer = i;
}
return outer / (this.b$['com.falstad.MOViewerFrame'].dataSize / 2.0);
});

Clazz.newMeth(C$, 'getScaleRadius', function () {
var n = 1;
var b0 = -n * n * 2 ;
var c0 = this.l * (this.l + 1) * n * n ;
var r0 = 0.5 * (-b0 + Math.sqrt(b0 * b0 - 4 * c0));
return r0;
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.dshalf = (this.b$['com.falstad.MOViewerFrame'].dataSize/2|0);
var mult = this.b$['com.falstad.MOViewerFrame'].scaleBar.getValue() / 50.0;
var mpos = (this.m < 0) ? -this.m : this.m;
var lgcorrect = Math.pow(-1, this.m);
this.dataR = Clazz.array(Float.TYPE, [this.b$['com.falstad.MOViewerFrame'].dataSize]);
if (this.l > 0) {
this.dataTh = Clazz.array(Float.TYPE, [this.b$['com.falstad.MOViewerFrame'].dataSize + 1]);
for (x = 0; x != this.b$['com.falstad.MOViewerFrame'].dataSize + 1; x++) {
var th = (x - this.dshalf) / this.dshalf;
this.dataTh[x] = (lgcorrect * this.b$['com.falstad.MOViewerFrame'].plgndr$I$I$D(this.l, mpos, th));
}
}if (this.m != 0) {
this.dataPhiR = Clazz.array(Float.TYPE, [8 * (this.b$['com.falstad.MOViewerFrame'].dataSize + 1)]);
this.dataPhiI = Clazz.array(Float.TYPE, [8 * (this.b$['com.falstad.MOViewerFrame'].dataSize + 1)]);
var ix = 0;
for (x = 0; x != 8; x++) for (y = 0; y <= this.b$['com.falstad.MOViewerFrame'].dataSize; y++, ix++) {
var phi = x * 3.141592653589793 / 4 + y * 0.7853981633974483 / this.b$['com.falstad.MOViewerFrame'].dataSize;
this.dataPhiR[ix] = Math.cos(phi * mpos);
this.dataPhiI[ix] = Math.sin(phi * mpos);
}

}this.brightnessCache = 0;
});

Clazz.newMeth(C$, 'precomputeR$D$I$D', function (charge, n, mag) {
if (Math.abs(mag) < 0.06 ) {
this.b$['com.falstad.MOViewerFrame'].precount++;
return;
}this.used = true;
this.b$['com.falstad.MOViewerFrame'].precount++;
var x;
var y;
var z;
this.dshalf = (this.b$['com.falstad.MOViewerFrame'].dataSize/2|0);
var mult = this.b$['com.falstad.MOViewerFrame'].scaleBar.getValue() / 50.0;
var mpos = (this.m < 0) ? -this.m : this.m;
var norm = this.radialNorm$I$I$D(n, this.l, charge) * this.sphericalNorm$I$I(this.l, mpos) * mag ;
for (x = 0; x != this.b$['com.falstad.MOViewerFrame'].dataSize; x++) {
var r = x * this.b$['com.falstad.MOViewerFrame'].resadj + 1.0E-8;
var rho = 2 * charge * r * mult  / n;
var rhol = Math.pow(rho, this.l) * norm;
this.dataR[x] += (this.b$['com.falstad.MOViewerFrame'].hypser$I$I$D(this.l + 1 - n, 2 * this.l + 2, rho) * rhol * Math.exp(-rho / 2) );
}
});

Clazz.newMeth(C$, 'getBrightness', function () {
if (this.brightnessCache != 0 ) return this.brightnessCache;
var x;
var avgsq = 0;
var vol = 0;
var mpos = (this.m < 0) ? -this.m : this.m;
var norm1 = 1 / this.sphericalNorm$I$I(this.l, mpos);
for (x = 0; x != this.b$['com.falstad.MOViewerFrame'].dataSize; x++) {
var val = this.dataR[x] * norm1;
val *= val;
avgsq += val * val * x * x ;
vol += x * x;
}
this.brightnessCache = avgsq / vol;
return this.brightnessCache;
});

Clazz.newMeth(C$, 'radialNorm$I$I$D', function (n, l, charge) {
var a0 = this.factorial$I(n + l);
return Math.sqrt(4.0 * charge * charge * charge * this.factorial$I(n + l)  / (n * n * n * n * this.factorial$I(n - l - 1 ) )) / this.factorial$I(2 * l + 1);
});

Clazz.newMeth(C$, 'sphericalNorm$I$I', function (l, m) {
return Math.sqrt((2 * l + 1) * this.factorial$I(l - m) / (4 * 3.141592653589793 * this.factorial$I(l + m) ));
});

Clazz.newMeth(C$, 'factorial$I', function (f) {
var res = 1;
while (f > 1)res *= f--;

return res;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.MOViewerFrame, "SOrbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.MOViewerFrame','com.falstad.MOViewerFrame.Orbital']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'computePoint$I$I', function (r, costh) {
try {
var v = (r < this.b$['com.falstad.MOViewerFrame'].dataSize) ? this.dataR[r] : 0;
return this.reMult * v;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
return 0;
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.MOViewerFrame, "MZeroOrbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.MOViewerFrame','com.falstad.MOViewerFrame.Orbital']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I', function (ll) {
Clazz.super_(C$, this,1);
this.l = ll;
}, 1);

Clazz.newMeth(C$, 'computePoint$I$I', function (r, costh) {
try {
var v = (r < this.b$['com.falstad.MOViewerFrame'].dataSize) ? this.dataR[r] * this.dataTh[costh] : 0;
return v * this.reMult;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
return 0;
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.MOViewerFrame, "ReImOrbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.MOViewerFrame','com.falstad.MOViewerFrame.Orbital']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataPhi = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I', function (ll) {
Clazz.super_(C$, this,1);
this.l = ll;
this.m = 1;
}, 1);

Clazz.newMeth(C$, 'setReal', function () {
this.dataPhi = this.dataPhiR;
});

Clazz.newMeth(C$, 'setIm', function () {
this.dataPhi = this.dataPhiI;
});

Clazz.newMeth(C$, 'computePoint$I$I', function (r, costh) {
try {
var phiValR = this.dataPhi[this.b$['com.falstad.MOViewerFrame'].phiIndex];
return (r < this.b$['com.falstad.MOViewerFrame'].dataSize) ? this.dataR[r] * this.dataTh[costh] * phiValR * 1.4142135  : 0;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
return 0;
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.MOViewerFrame, "PhaseColor", function(){
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
(function(){var C$=Clazz.newClass(P$.MOViewerFrame, "View", function(){
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

Clazz.newMeth(C$, 'c$$com_falstad_MOViewerFrame_View', function (v) {
C$.superclazz.c$$java_awt_Rectangle.apply(this, [v]);
C$.$init$.apply(this);
}, 1);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:07
