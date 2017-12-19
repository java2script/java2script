(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "EMBoxFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.waveguide = false;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.clearButton = null;
this.resetPartButton = null;
this.stoppedCheck = null;
this.stopOscCheck = null;
this.spectrumCheck = null;
this.sidesCheck = null;
this.modeChooser = null;
this.sliceChooser = null;
this.emChooser = null;
this.dispChooser = null;
this.speedBar = null;
this.partSpeedBar = null;
this.resolutionBar = null;
this.vecDensityBar = null;
this.brightnessBar = null;
this.widthBar = null;
this.heightBar = null;
this.partCountBar = null;
this.freqBar = null;
this.dragZoomStart = 0;
this.zoom = 0;
this.sliceval = 0;
this.rotmatrix = null;
this.cameraPos = null;
this.selectedMinOmega = 0;
this.selectedMaxOmega = 0;
this.view3d = null;
this.view3d_e = null;
this.view3d_b = null;
this.viewAxes = null;
this.viewSpectrum = null;
this.viewFreq = null;
this.colorMult = 0;
this.vectorSpacing = 0;
this.xpoints = null;
this.ypoints = null;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.particles = null;
this.density = null;
this.spectrum = null;
this.func = null;
this.boxwidth = 0;
this.boxheight = 0;
this.boxdepth = 0;
this.boxGuideMult = 0;
this.dragging = false;
this.selectedSlice = false;
this.imageSource = null;
this.pixels = null;
this.maxTerms = 0;
this.maxModes = 0;
this.maxDispCoefs = 0;
this.maxZDispCoefs = 0;
this.viewDistance = 0;
this.modes = null;
this.modeCount = 0;
this.pause = 0;
this.applet = null;
this.selection = 0;
this.selectedCoefX = 0;
this.selectedCoefY = 0;
this.selectedCoefZ = 0;
this.selectedCoefTEMode = false;
this.sampleMult = null;
this.curfieldno = 0;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.sidemap = null;
this.dynControls = null;
this.cv = null;
this.useFrame = false;
this.showControls = false;
this.main = null;
this.shown = false;
this.allQuiet = false;
this.logep2 = 0;
this.rediscount = 0;
this.finished = false;
this.boundCheck = false;
this.oldY = null;
this.rk_k1 = null;
this.rk_k2 = null;
this.rk_k3 = null;
this.rk_k4 = null;
this.rk_yn = null;
this.rk_Y = null;
this.rk_Yhalf = null;
this.rk_oldY = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.zoom = 6.5;
this.sliceval = 0;
this.vectorSpacing = 16;
this.boxwidth = 2;
this.boxheight = 2;
this.boxdepth = 2;
this.boxGuideMult = 1;
this.dragging = false;
this.maxTerms = 16;
this.maxModes = 10;
this.maxDispCoefs = 5;
this.maxZDispCoefs = 5;
this.viewDistance = 12;
this.modeCount = 0;
this.selection = -1;
this.selectedCoefX = -1;
this.t = 0;
this.shown = false;
this.logep2 = 0;
this.rk_k1 = Clazz.array(Double.TYPE, [6]);
this.rk_k2 = Clazz.array(Double.TYPE, [6]);
this.rk_k3 = Clazz.array(Double.TYPE, [6]);
this.rk_k4 = Clazz.array(Double.TYPE, [6]);
this.rk_yn = Clazz.array(Double.TYPE, [6]);
this.rk_Y = Clazz.array(Double.TYPE, [6]);
this.rk_Yhalf = Clazz.array(Double.TYPE, [6]);
this.rk_oldY = Clazz.array(Double.TYPE, [6]);
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "EMBox by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_EMBox', function (a) {
C$.superclazz.c$$S.apply(this, ["EM Modes Applet"]);
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
var os = System.getProperty("os.name");
var jv = System.getProperty("java.version");
var altRender = false;
var res = 54;
if (os.indexOf("Windows") == 0) {
res = 100;
if (jv.indexOf("1.1") == 0) altRender = true;
}this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.EMBoxLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.EMBoxCanvas'))).c$$com_falstad_EMBoxFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.main.add$java_awt_Component(this.clearButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.resetPartButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Reset Particles"]));
this.resetPartButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Stop"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.stopOscCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Stop Oscillation"]);
this.stopOscCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stopOscCheck);
this.spectrumCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Show Spectrum"]);
this.spectrumCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.spectrumCheck);
this.sidesCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Show Sides"]);
this.sidesCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.sidesCheck);
this.modeChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust Angle");
this.modeChooser.add$S("Mouse = Adjust Zoom");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.sliceChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.sliceChooser.add$S("No Slicing");
this.sliceChooser.add$S("Show X Slice");
this.sliceChooser.add$S("Show Y Slice");
this.sliceChooser.add$S("Show Z Slice");
this.sliceChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.sliceChooser);
this.emChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.emChooser.add$S("Show Electric Field");
this.emChooser.add$S("Show Magnetic Field");
this.emChooser.add$S("Show Both Fields");
this.emChooser.add$S("Show Current");
this.emChooser.add$S("Show Charge");
this.emChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.emChooser);
this.dispChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.dispChooser.add$S("Show Particles on Field Lines");
this.dispChooser.add$S("Show Field Magnitude");
this.dispChooser.add$S("Show Field X");
this.dispChooser.add$S("Show Field Y");
this.dispChooser.add$S("Show Field Z");
this.dispChooser.add$S("Show Field (tri-color)");
this.dispChooser.add$S("Show Field Vectors");
this.dispChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.dispChooser);
this.dispChooser.select$I(5);
this.dynControls = Clazz.array((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DynControl))), [6]);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Oscillation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 15, 1, 1, 200]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
var lab;
this.main.add$java_awt_Component(lab = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Number of Particles", 0]));
this.main.add$java_awt_Component(this.partCountBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 500, 1, 1, 1000]));
this.partCountBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.dynControls[0] = Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DynControl))).c$$a2s_Scrollbar$a2s_Label$I, [this, null, this.partCountBar, lab, 0]);
this.main.add$java_awt_Component(lab = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Particle Speed", 0]));
this.main.add$java_awt_Component(this.partSpeedBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 90, 1, 1, 200]));
this.partSpeedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.dynControls[1] = Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DynControl))).c$$a2s_Scrollbar$a2s_Label$I, [this, null, this.partSpeedBar, lab, 0]);
this.main.add$java_awt_Component(lab = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 28, 1, 1, 200]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.dynControls[2] = Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DynControl))).c$$a2s_Scrollbar$a2s_Label$I$I, [this, null, this.brightnessBar, lab, 1, 6]);
this.main.add$java_awt_Component(lab = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.main.add$java_awt_Component(this.resolutionBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 1, 20, 200]));
this.resolutionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.dynControls[3] = Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DynControl))).c$$a2s_Scrollbar$a2s_Label$I, [this, null, this.resolutionBar, lab, 1]);
this.main.add$java_awt_Component(lab = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Vector Density", 0]));
this.main.add$java_awt_Component(this.vecDensityBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 2, 64]));
this.vecDensityBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.dynControls[4] = Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DynControl))).c$$a2s_Scrollbar$a2s_Label$I, [this, null, this.vecDensityBar, lab, 6]);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Width", 0]));
this.main.add$java_awt_Component(this.widthBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 31]));
this.widthBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Height", 0]));
this.main.add$java_awt_Component(this.heightBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 31]));
this.heightBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
var freqLabel;
this.main.add$java_awt_Component(freqLabel = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["Driving Frequency", 0]));
this.main.add$java_awt_Component(this.freqBar = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 50]));
this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
if (this.applet == null ) C$.waveguide = true;
 else {
var wg = this.applet.getParameter$S("waveguide");
C$.waveguide = (wg != null  && wg.equals$O("true") );
}if (!C$.waveguide) this.vecDensityBar.setValue$I(16);
if (C$.waveguide) {
this.boxGuideMult = 3;
this.boxdepth *= this.boxGuideMult;
this.maxZDispCoefs = 2;
this.zoom = 3.25;
this.spectrumCheck.hide();
} else {
this.freqBar.hide();
freqLabel.hide();
}this.modes = Clazz.array((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').Mode))), [this.maxModes]);
this.addMode$I$I$I$Z(1, 0, 1, true).magcoef = 1;
this.slicerPoints = Clazz.array(Integer.TYPE, [2, 10]);
this.sliceFaces = Clazz.array(Double.TYPE, [4, 3]);
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate$D$D(-1.5707963267948966, 0);
this.rotate$D$D(-0.7853981633974483, 0.7853981633974483);
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.density = Clazz.array(Integer.TYPE, [4, 4, 4]);
var i;
this.sampleMult = Clazz.array(Integer.TYPE, [15]);
for (i = 1; i < 15; i = i+(2)) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[14] = 1;
this.sidemap = Clazz.array(Integer.TYPE, [6, 3]);
for (i = 0; i != 3; i++) {
this.sidemap[i * 2][i] = 1;
this.sidemap[i * 2 + 1][i] = -1;
}
this.random = Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.util.Random'))));
this.particles = Clazz.array((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').Particle))), [1000]);
for (i = 0; i != 1000; i++) this.particles[i] = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').Particle))), [this, null]);

this.reinit();
this.cv.setBackground$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).white);
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

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
this.reinit();
});

Clazz.newMeth(C$, 'reinit', function () {
this.setMaxTerms();
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.calcSpectrum();
this.dbimage = this.createImage$I$I(d.width, d.height);
this.setupDisplay();
var w = this.view3d.width;
if (this.emChooser.getSelectedIndex() == 2) w = (w/2|0);
this.pixels = Clazz.array(Integer.TYPE, [w * this.view3d.height]);
var i;
for (i = 0; i != w * this.view3d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[w, this.view3d.height, this.pixels, 0, w]);
this.resetParticles();
this.setDynamicControls();
});

Clazz.newMeth(C$, 'getTermWidth', function () {
return 8;
});

Clazz.newMeth(C$, 'resetDensityGroups', function () {
var i;
var j;
var k;
for (i = 0; i != 4; i++) for (j = 0; j != 4; j++) for (k = 0; k != 4; k++) this.density[i][j][k] = 0;



var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
var pcount = this.getParticleCount();
for (i = 0; i != pcount; i++) {
var p = this.particles[i];
if (sliced) p.pos[slice - 1] = this.sliceval;
this.addToDensityGroup$com_falstad_EMBoxFrame_Particle(p);
}
for (; i != 1000; i++) {
var p = this.particles[i];
p.lifetime = -100;
}
});

Clazz.newMeth(C$, 'addToDensityGroup$com_falstad_EMBoxFrame_Particle', function (p) {
var a = (((p.pos[0] + 1) / 0.505)|0);
var b = (((p.pos[1] + 1) / 0.505)|0);
var c = (((p.pos[2] + 1) / 0.505)|0);
var n = 0;
try {
n = ++this.density[a][b][c];
if (n > 1000) System.out.print$S(a + " " + b + " " + c + " " + this.density[a][b][c] + "\n" );
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
System.out.print$S(new Double(p.pos[0]).toString() + " " + new Double(p.pos[1]).toString() + " " + new Double(p.pos[2]).toString() + "\n" );
e.printStackTrace();
} else {
throw e;
}
}
return n;
});

Clazz.newMeth(C$, 'removeFromDensityGroup$com_falstad_EMBoxFrame_Particle', function (p) {
var a = (((p.pos[0] + 1) / 0.505)|0);
var b = (((p.pos[1] + 1) / 0.505)|0);
var c = (((p.pos[2] + 1) / 0.505)|0);
try {
if (--this.density[a][b][c] < 0) System.out.print$S(a + " " + b + " " + c + " " + this.density[a][b][c] + "\n" );
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
System.out.print$S(new Double(p.pos[0]).toString() + " " + new Double(p.pos[1]).toString() + " " + new Double(p.pos[2]).toString() + "\n" );
e.printStackTrace();
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'positionParticle$com_falstad_EMBoxFrame_Particle', function (p) {
var x;
var y;
var z;
var bestx = 0;
var besty = 0;
var bestz = 0;
var best = 10000;
var randaddx = this.getrand$I(4);
var randaddy = this.getrand$I(4);
var randaddz = this.getrand$I(4);
var gm1 = 3;
for (x = 0; x != 4; x++) for (y = 0; y != 4; y++) for (z = 0; z != 4; z++) {
var ix = (randaddx + x) % 4;
var iy = (randaddy + y) % 4;
var iz = (randaddz + z) % 4;
if (this.sidesCheck.getState() && !(ix == 0 || ix == gm1  || iy == 0  || iy == gm1  || (!C$.waveguide && (iz == 0 || iz == gm1 ) ) ) ) continue;
if (this.density[ix][iy][iz] <= best) {
bestx = ix;
besty = iy;
bestz = iz;
best = this.density[ix][iy][iz];
}}


p.pos[0] = bestx * 0.505 + this.getrand$I(100) * 0.505 / 100.0 - 1;
p.pos[1] = besty * 0.505 + this.getrand$I(100) * 0.505 / 100.0 - 1;
p.pos[2] = bestz * 0.505 + this.getrand$I(100) * 0.505 / 100.0 - 1;
p.lifetime = 500;
if (this.sidesCheck.getState()) {
var s = 0;
if (bestx == gm1) s = 0;
 else if (bestx == 0) s = 1;
 else if (besty == gm1) s = 2;
 else if (besty == 0) s = 3;
 else if (bestz == gm1) s = 4;
 else s = 5;
if (C$.waveguide && s >= 4 ) p.lifetime = -1;
p.side = s;
p.pos[(p.side/2|0)] = this.sidemap[p.side][(p.side/2|0)];
}});

Clazz.newMeth(C$, 'getParticleCount', function () {
return this.partCountBar.getValue();
});

Clazz.newMeth(C$, 'resetParticles', function () {
var pcount = this.getParticleCount();
var i;
var j;
var k;
for (i = 0; i != pcount; i++) {
var p = this.particles[i];
for (j = 0; j != 3; j++) p.pos[j] = this.getrand$I(200) / 100.0 - 1;

p.lifetime = i * 2;
if (this.sidesCheck.getState()) {
p.side = this.getrand$I(C$.waveguide ? 4 : 6);
p.pos[(p.side/2|0)] = this.sidemap[p.side][(p.side/2|0)];
}}
this.resetDensityGroups();
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

Clazz.newMeth(C$, 'setMaxTerms', function () {
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue() & -2);
this.maxTerms = this.gridSizeX;
if (this.maxTerms > 100) this.maxTerms = 100;
this.func = Clazz.array(Float.TYPE, [this.gridSizeX, this.gridSizeY, 3]);
this.regenData();
});

Clazz.newMeth(C$, 'regenData', function () {
var i;
for (i = 0; i != this.modeCount; i++) this.modes[i].modeDatas[0].data = this.modes[i].modeDatas[1].data = null;

});

Clazz.newMeth(C$, 'setupDisplay', function () {
var perColumn = 2;
var perRow = this.maxZDispCoefs;
var freqHeight = this.getTermWidth() * (this.maxDispCoefs + 1) * perColumn ;
var spectrumHeight = (this.spectrumCheck.getState()) ? this.getTermWidth() * 6 : 0;
this.view3d = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, 0, this.winSize.width, this.winSize.height - freqHeight - spectrumHeight ]);
this.view3d_e = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))).c$$java_awt_Rectangle,[this.view3d]);
this.view3d_e.width = (this.view3d_e.width/2|0);
this.view3d_b = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))).c$$java_awt_Rectangle,[this.view3d]);
this.view3d_b.width = (this.view3d_b.width/2|0);
this.view3d_b.x = this.view3d_b.x+(this.view3d_b.width);
if (this.spectrumCheck.getState()) this.viewSpectrum = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, this.view3d.height, this.winSize.width, spectrumHeight]);
 else this.viewSpectrum = null;
this.viewAxes = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.winSize.width - 100, 0, 100, 100]);
this.viewFreq = Clazz.array((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))), [this.maxZDispCoefs * 2]);
var i;
var winw = this.getTermWidth() * this.maxDispCoefs;
var winh = winw;
var pad = this.getTermWidth();
var x = ((this.winSize.width - (winw * 4 + pad * 3))/2|0);
for (i = 0; i != this.maxZDispCoefs * 2; i++) this.viewFreq[i] = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[x + (i % perRow) * (winw + pad), this.view3d.height + spectrumHeight + ((i/perRow|0)) * (winh + pad) , winw, winh]);

});

Clazz.newMeth(C$, 'computeFunction$java_awt_Rectangle$I', function (view, fieldno) {
var i;
var j;
var q = 3.141592653589793 / this.maxTerms;
var cost = java.lang.Math.cos(this.t);
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var boxhalfwidth = this.boxwidth / 2;
var boxhalfheight = this.boxheight / 2;
var boxhalfdepth = this.boxdepth / 2;
var aratio = view.width / view.height;
var disp = this.dispChooser.getSelectedIndex();
var doSides = this.sidesCheck.getState();
var fnindex = fieldno;
if (fieldno == 4) {
fnindex = 0;
this.genData$I(0);
disp = -1;
doSides = true;
} else if (fieldno == 3) {
fnindex = 1;
this.genData$I(1);
doSides = true;
} else this.genData$I(fieldno);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camx0 = 0;
var camz0 = this.viewDistance;
var camvx0 = (2 * i / this.gridSizeX - 1) * izoom;
var camvy0 = -(2 * j / this.gridSizeY - 1) * izoom;
if (aratio < 1 ) camvy0 /= aratio;
 else camvx0 *= aratio;
var camvz0 = -1;
var camx = rotm[0] * camx0 + rotm[2] * camz0;
var camy = rotm[5] * camz0;
var camz = rotm[6] * camx0 + rotm[8] * camz0;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 + rotm[2] * camvz0;
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 + rotm[5] * camvz0;
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 + rotm[8] * camvz0;
var camnorm = java.lang.Math.sqrt(camvx * camvx + camvy * camvy + camvz * camvz);
var n;
var simpr = 0;
var simpg = 0;
var simpb = 0;
var nmax = 14;
var tx1 = (-boxhalfwidth - camx) / camvx;
var tx2 = (boxhalfwidth - camx) / camvx;
var ty1 = (-boxhalfheight - camy) / camvy;
var ty2 = (boxhalfheight - camy) / camvy;
var tz1 = (-boxhalfdepth - camz) / camvz;
var tz2 = (boxhalfdepth - camz) / camvz;
var mint = (this.max$D$D(this.min$D$D(tx1, tx2), this.max$D$D(this.min$D$D(ty1, ty2), this.min$D$D(tz1, tz2))) + 0.001);
var maxt = (this.min$D$D(this.max$D$D(tx1, tx2), this.min$D$D(this.max$D$D(ty1, ty2), this.max$D$D(tz1, tz2))) - 0.001);
if (maxt < mint ) {
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
continue;
}var tstep = (maxt - mint) / 14;
var pathlen = (maxt - mint) * camnorm;
var xmult = (this.maxTerms / this.boxwidth);
var ymult = (this.maxTerms / this.boxheight);
var zmult = (this.maxTerms / this.boxdepth);
var maxn = 15;
var slice = this.sliceChooser.getSelectedIndex();
if (slice > 0) {
var tx;
if (slice == 1) tx = (this.sliceval * boxhalfwidth - camx) / camvx;
 else if (slice == 2) tx = (this.sliceval * boxhalfheight - camy) / camvy;
 else tx = (this.sliceval * boxhalfdepth - camz) / camvz;
if (tx < mint  || tx > maxt  ) {
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
continue;
}mint = maxt = tx;
pathlen = 2;
maxn = 1;
}if (doSides) {
maxn = 1;
pathlen = 4;
}var fcamx = camx;
var fcamy = camy;
var fcamz = camz;
var fcamvx = camvx;
var fcamvy = camvy;
var fcamvz = camvz;
for (n = 0; n < maxn; n++) {
var t = mint + n * tstep;
var xx = fcamx + fcamvx * t;
var yy = fcamy + fcamvy * t;
var zz = fcamz + fcamvz * t;
var xxi = (((xx + boxhalfwidth) * xmult)|0);
var yyi = (((yy + boxhalfheight) * ymult)|0);
var zzi = (((zz + boxhalfdepth) * zmult)|0);
var mi;
var fx = 0;
var fy = 0;
var fz = 0;
for (mi = 0; mi != this.modeCount; mi++) {
var md = this.modes[mi].modeDatas[fnindex];
var fxymult = md.zmode_xymult[zzi];
var fzmult = md.zmode_zmult[zzi];
fx += md.data[xxi][yyi][0] * fxymult;
fy += md.data[xxi][yyi][1] * fxymult;
fz += md.data[xxi][yyi][2] * fzmult;
}
if (fieldno == 3) {
var sw;
if (xx < -0.99 ) {
fx = 0;
sw = fy;
fy = -fz;
fz = sw;
} else if (xx > 0.99 ) {
fx = 0;
sw = fy;
fy = fz;
fz = -sw;
} else if (yy < -0.99 ) {
fy = 0;
sw = fx;
fx = fz;
fz = -sw;
} else if (yy > 0.99 ) {
fy = 0;
sw = fx;
fx = -fz;
fz = sw;
} else if (zz < -0.99  && !C$.waveguide ) {
fz = 0;
sw = fx;
fx = -fy;
fy = sw;
} else if (zz > 0.99  && !C$.waveguide ) {
fz = 0;
sw = fx;
fx = fy;
fy = -sw;
} else fx = fy = fz = 0;
}if (disp == 5) {
fx = java.lang.Math.abs(fx);
fy = java.lang.Math.abs(fy);
fz = java.lang.Math.abs(fz);
simpr += this.sampleMult[n] * fx;
simpg += this.sampleMult[n] * fy;
simpb += this.sampleMult[n] * fz;
continue;
}var f = 0;
switch (disp) {
case 1:
f = java.lang.Math.sqrt(fx * fx + fy * fy + fz * fz);
break;
case 2:
f = fx;
break;
case 3:
f = fy;
break;
case 4:
f = fz;
break;
case -1:
if (xx < -0.99 ) f = fx;
 else if (xx > 0.99 ) f = -fx;
 else if (yy < -0.99 ) f = fy;
 else if (yy > 0.99 ) f = -fy;
 else if (zz < -0.99  && !C$.waveguide ) f = fz;
 else if (zz > 0.99  && !C$.waveguide ) f = -fz;
 else f = 0;
break;
}
if (f < 0 ) {
f = java.lang.Math.abs(f);
simpr += this.sampleMult[n] * f;
} else simpg += this.sampleMult[n] * f;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
simpb *= pathlen / n;
this.func[i][j][0] = simpr;
this.func[i][j][1] = simpg;
this.func[i][j][2] = simpb;
}

});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'updateEMBox$java_awt_Graphics', function (realg) {
var g = null;
if (this.winSize == null  || this.winSize.width == 0 ) return;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
this.allQuiet = true;
var disp = this.dispChooser.getSelectedIndex();
if (!this.stoppedCheck.getState() && !this.stopOscCheck.getState() ) {
var val = this.speedBar.getValue();
var tadd = val * 0.004;
if (disp == 6 || disp == 0 ) tadd /= 4;
tadd += val * this.getrand$I(20) * 2.7279275E-4 ;
this.t += tadd;
if (this.modeCount > 0) this.allQuiet = false;
}var i;
var j;
var k;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.phasecoef = (m.omega * this.t + m.phasecoefadj) % 6.283185307179586;
var phasecoefcos = java.lang.Math.cos(m.phasecoef);
var phasecoefsin = java.lang.Math.sin(m.phasecoef);
m.ephaseshift = (C$.waveguide) ? -m.phasecoef : 0;
m.bphaseshift = (C$.waveguide) ? -m.phasecoef : 0;
m.ephasemult = (C$.waveguide) ? m.magcoef : phasecoefsin * m.magcoef;
m.bphasemult = (C$.waveguide) ? m.magcoef : phasecoefcos * m.magcoef;
this.calcModeMults$com_falstad_EMBoxFrame_Mode$Z(m, true);
}
if (this.emChooser.getSelectedIndex() == 2) {
this.doDisplay$java_awt_Rectangle$java_awt_Graphics$I(this.view3d_b, g, 1);
this.doDisplay$java_awt_Rectangle$java_awt_Graphics$I(this.view3d_e, g, 0);
} else {
this.doDisplay$java_awt_Rectangle$java_awt_Graphics$I(this.view3d, g, this.emChooser.getSelectedIndex());
}g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).black);
g.fillRect$I$I$I$I(0, this.view3d.height, this.winSize.width, this.winSize.height - this.view3d.height);
for (i = 0; i != this.maxZDispCoefs; i++) {
this.drawFrequencies$java_awt_Graphics$I$Z(g, i, false);
this.drawFrequencies$java_awt_Graphics$I$Z(g, i, true);
}
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 0, this.xpoints, this.ypoints, 0, this.viewAxes);
var defaultColor = (disp == 1 || disp == 0 ) ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).white : (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).gray;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(1, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor$java_awt_Color(disp == 5 ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).red : disp == 2 ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).green : defaultColor);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "x", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
if (disp == 2) {
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(-1, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).red);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 1, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor$java_awt_Color(disp == 5 ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).green : disp == 3 ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).green : defaultColor);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "y", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
if (disp == 3) {
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, -1, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).red);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 1, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor$java_awt_Color(disp == 5 ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).blue : disp == 4 ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).green : defaultColor);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "z", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
if (disp == 4) {
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, -1, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).red);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (this.viewSpectrum != null ) {
var selw = (this.selectedCoefX == -1) ? 0 : this.getOmega$I$I$I(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
var selx = ((selw * 60)|0);
var selmin = ((this.selectedMinOmega * 60)|0);
var selmax = ((this.selectedMaxOmega * 60)|0);
var ym = this.viewSpectrum.height - 10;
var y = this.viewSpectrum.y + this.viewSpectrum.height - 5;
for (i = 1; i != this.winSize.width; i++) {
if (this.spectrum[i] == 0) continue;
var h = ((ym * (0.2 + java.lang.Math.log(this.spectrum[i]) / 4))|0);
if (h > ym) h = ym;
g.setColor$java_awt_Color((i == selx || (i >= selmin && i < selmax ) ) ? (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).yellow : (I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(i, y, i, y - h);
}
}if (this.selectedCoefX != -1) {
var s = "Selected mode = " + ((this.selectedCoefTEMode) ? "TE (" : "TM (") + this.selectedCoefX + "," + this.selectedCoefY ;
if (!C$.waveguide) s += "," + this.selectedCoefZ;
s += ")";
var fm = g.getFontMetrics();
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).yellow);
var y = this.view3d.y + this.view3d.height - fm.getDescent() - 2;
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.allQuiet) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'doDisplay$java_awt_Rectangle$java_awt_Graphics$I', function (view, g, fieldno) {
var i;
var j;
var k;
var mis = true;
this.colorMult = this.brightnessBar.getValue() * 3;
var winw = view.width;
var winh = view.height;
var partDisplay = false;
var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
this.curfieldno = fieldno;
this.drawCube$java_awt_Graphics$java_awt_Rectangle$Z(g, view, true);
this.cameraPos = Clazz.array(Double.TYPE, [3]);
this.unmap3d$DA$I$I$D$java_awt_Rectangle(this.cameraPos, (view.width/2|0), (view.height/2|0), this.viewDistance, view);
var disp = this.dispChooser.getSelectedIndex();
if (fieldno == 4) disp = 1;
if (disp == 6) {
var x;
var y;
var z;
var p = this.particles[0];
var dd = Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').DrawData))), [this, null]);
dd.mult = this.colorMult / 30.0;
dd.g = g;
dd.view = view;
dd.fieldno = fieldno;
dd.realfieldno = fieldno;
if (fieldno == 3) dd.fieldno = 1;
this.vectorSpacing = this.vecDensityBar.getValue();
this.genData$I(dd.fieldno);
var slice01 = 0.5 * this.sliceval + 0.5;
if (this.sidesCheck.getState()) {
this.drawVectorsX$D$com_falstad_EMBoxFrame_DrawData(0, dd);
this.drawVectorsX$D$com_falstad_EMBoxFrame_DrawData(1, dd);
this.drawVectorsY$D$com_falstad_EMBoxFrame_DrawData(0, dd);
this.drawVectorsY$D$com_falstad_EMBoxFrame_DrawData(1, dd);
if (!C$.waveguide) {
this.drawVectorsZ$D$com_falstad_EMBoxFrame_DrawData(0, dd);
this.drawVectorsZ$D$com_falstad_EMBoxFrame_DrawData(1, dd);
}} else if (!sliced) {
this.vectorSpacing = (this.vectorSpacing/2|0);
for (x = 0; x != this.vectorSpacing; x++) {
var xx = x * (1.0 / (this.vectorSpacing - 1));
for (y = 0; y != this.vectorSpacing; y++) {
var yy = y * (1.0 / (this.vectorSpacing - 1));
for (z = 0; z != this.vectorSpacing * this.boxGuideMult; z++) {
var zz = z * (1.0 / (this.vectorSpacing * this.boxGuideMult - 1));
this.drawVector$com_falstad_EMBoxFrame_DrawData$D$D$D(dd, xx, yy, zz);
}
}
}
} else if (slice == 1) {
this.drawVectorsX$D$com_falstad_EMBoxFrame_DrawData(slice01, dd);
} else if (slice == 2) {
this.drawVectorsY$D$com_falstad_EMBoxFrame_DrawData(slice01, dd);
} else if (slice == 3) {
this.drawVectorsZ$D$com_falstad_EMBoxFrame_DrawData(slice01, dd);
}} else if (disp == 0) {
var pcount = (this.getParticleCount()/2|0);
var pstart = 0;
var f = (fieldno == 3) ? 1 : fieldno;
pstart = pcount * f;
if (!this.stoppedCheck.getState()) {
this.moveParticles$I$I(pstart, pcount);
this.allQuiet = false;
}g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).white);
for (i = pstart; i != pcount + pstart; i++) {
var p = this.particles[i];
var pos = p.pos;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 0, view);
if (this.xpoints[0] < 0 || this.xpoints[0] >= this.winSize.width  || this.ypoints[0] < 0  || this.ypoints[0] >= this.winSize.height ) continue;
g.fillRect$I$I$I$I(this.xpoints[0], this.ypoints[0] - 1, 2, 2);
}
} else if (this.modeCount > 0) {
this.computeFunction$java_awt_Rectangle$I(view, fieldno);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var x = (i * winw/this.gridSizeX|0);
var y = (j * winh/this.gridSizeY|0);
var x2 = ((i + 1) * winw/this.gridSizeX|0);
var y2 = ((j + 1) * winh/this.gridSizeY|0);
var colval = -16777216 + (this.getColorValue$I$I$I(i, j, 0) << 16) | (this.getColorValue$I$I$I(i, j, 1) << 8) | (this.getColorValue$I$I$I(i, j, 2));
if (mis) {
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * winw] = colval;


} else {
g.setColor$java_awt_Color(Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).c$$I,[colval]));
g.fillRect$I$I$I$I(view.x + x, view.y + y, x2 - x, y2 - y);
}}

if (mis) {
var dbimage2 = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(dbimage2, view.x, view.y, null);
}}this.drawCube$java_awt_Graphics$java_awt_Rectangle$Z(g, view, false);
});

Clazz.newMeth(C$, 'drawVectorsX$D$com_falstad_EMBoxFrame_DrawData', function (slice01, dd) {
var y;
var z;
for (z = 0; z != this.vectorSpacing * this.boxGuideMult; z++) for (y = 0; y != this.vectorSpacing; y++) {
var xx = slice01;
var yy = y * (1.0 / (this.vectorSpacing - 1));
var zz = z * (1.0 / (this.vectorSpacing * this.boxGuideMult - 1));
this.drawVector$com_falstad_EMBoxFrame_DrawData$D$D$D(dd, xx, yy, zz);
}

});

Clazz.newMeth(C$, 'drawVectorsY$D$com_falstad_EMBoxFrame_DrawData', function (slice01, dd) {
var x;
var z;
for (x = 0; x != this.vectorSpacing; x++) for (z = 0; z != this.vectorSpacing * this.boxGuideMult; z++) {
var xx = x * (1.0 / (this.vectorSpacing - 1));
var yy = slice01;
var zz = z * (1.0 / (this.vectorSpacing * this.boxGuideMult - 1));
this.drawVector$com_falstad_EMBoxFrame_DrawData$D$D$D(dd, xx, yy, zz);
}

});

Clazz.newMeth(C$, 'drawVectorsZ$D$com_falstad_EMBoxFrame_DrawData', function (slice01, dd) {
var x;
var y;
for (x = 0; x != this.vectorSpacing; x++) for (y = 0; y != this.vectorSpacing; y++) {
var xx = x * (1.0 / (this.vectorSpacing - 1));
var yy = y * (1.0 / (this.vectorSpacing - 1));
var zz = slice01;
this.drawVector$com_falstad_EMBoxFrame_DrawData$D$D$D(dd, xx, yy, zz);
}

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

Clazz.newMeth(C$, 'drawVector$com_falstad_EMBoxFrame_DrawData$D$D$D', function (dd, xx, yy, zz) {
var fieldno = dd.fieldno;
var p = this.particles[0];
var xxi = ((xx * this.maxTerms)|0);
var yyi = ((yy * this.maxTerms)|0);
var zzi = ((zz * this.maxTerms)|0);
if (xxi >= this.maxTerms) xxi = this.maxTerms - 1;
if (yyi >= this.maxTerms) yyi = this.maxTerms - 1;
if (zzi >= this.maxTerms) zzi = this.maxTerms - 1;
var mi;
var dx = 0;
var dy = 0;
var dz = 0;
for (mi = 0; mi != this.modeCount; mi++) {
var md = this.modes[mi].modeDatas[fieldno];
var fxymult = md.zmode_xymult[zzi];
var fzmult = md.zmode_zmult[zzi];
dx += md.data[xxi][yyi][0] * fxymult;
dy += md.data[xxi][yyi][1] * fxymult;
dz += md.data[xxi][yyi][2] * fzmult;
}
if (dd.realfieldno == 3) {
var sw;
if (xx <= 0.01 ) {
dx = 0;
sw = dy;
dy = -dz;
dz = sw;
} else if (xx >= 0.99 ) {
dx = 0;
sw = dy;
dy = dz;
dz = -sw;
} else if (yy <= 0.01 ) {
dy = 0;
sw = dx;
dx = dz;
dz = -sw;
} else if (yy >= 0.99 ) {
dy = 0;
sw = dx;
dx = -dz;
dz = sw;
} else if (zz <= 0.01  && !C$.waveguide ) {
dz = 0;
sw = dx;
dx = -dy;
dy = sw;
} else if (zz >= 0.99  && !C$.waveguide ) {
dz = 0;
sw = dx;
dx = dy;
dy = -sw;
} else dx = dy = dz = 0;
}if (dx == 0 ) dx = 1.0E-4;
var dn = java.lang.Math.sqrt(dx * dx + dy * dy + dz * dz);
dx /= dn;
dy /= dn;
dz /= dn;
dn *= dd.mult;
var col;
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
var val = ((dn * 255)|0);
col = -16777216 | 65280 | (val * 65537) ;
} else {
var val = ((dn * 255)|0);
col = -16777216 | (val << 8);
}dd.g.setColor$java_awt_Color(Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).c$$I,[col]));
var sw2 = 1.0 / (this.vectorSpacing - 1);
xx = xx * 2 - 1;
yy = yy * 2 - 1;
zz = zz * 2 - 1;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(xx, yy, zz, this.xpoints, this.ypoints, 0, dd.view);
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(xx + sw2 * dx * 2  / this.boxwidth, yy + sw2 * dy * 2  / this.boxheight, zz + sw2 * dz / this.boxGuideMult, this.xpoints, this.ypoints, 1, dd.view);
this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(dd.g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], 2);
});

Clazz.newMeth(C$, 'visibleFace$I$I$I', function (nx, ny, nz) {
var viewx = this.viewDistance * this.rotmatrix[2];
var viewy = this.viewDistance * this.rotmatrix[5];
var viewz = this.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0 ;
});

Clazz.newMeth(C$, 'drawCube$java_awt_Graphics$java_awt_Rectangle$Z', function (g, view, drawAll) {
var i;
var slice = this.sliceChooser.getSelectedIndex();
var sp = (drawAll) ? 0 : 8;
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
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n, view);
}
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).gray);
g.drawPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
if (slice != 0 && (i/2|0) != slice - 1 ) {
if (this.selectedSlice) g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace$I$I$DA(i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp, view);
this.computeFace$I$I$DA(i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I$java_awt_Rectangle(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1, view);
g.drawLine$I$I$I$I(this.slicerPoints[0][sp], this.slicerPoints[1][sp], this.slicerPoints[0][sp + 1], this.slicerPoints[1][sp + 1]);
if (drawAll) {
this.sliceFaces[(sp/2|0)][0] = nx;
this.sliceFaces[(sp/2|0)][1] = ny;
this.sliceFaces[(sp/2|0)][2] = nz;
sp = sp+(2);
}}}
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

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I$java_awt_Rectangle', function (x, y, z, xpoints, ypoints, pt, view) {
if (view !== this.viewAxes ) {
x *= this.boxwidth / 2;
y *= this.boxheight / 2;
z *= this.boxdepth / 2;
}var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = this.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = view.x + (view.width/2|0) + ((scalex * realx / realz)|0);
ypoints[pt] = view.y + (view.height/2|0) - ((scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'unmap3d$DA$I$I$D$java_awt_Rectangle', function (x3, x, y, z, view) {
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var realz = this.viewDistance - z;
var realx = (x - (view.x + (view.width/2|0))) * realz / scalex;
var realy = -(y - (view.y + (view.height/2|0))) * realz / scaley;
var rotm = this.rotmatrix;
x3[0] = (realx * rotm[0] + realy * rotm[1] + z * rotm[2]) / (this.boxwidth / 2);
x3[1] = (realx * rotm[3] + realy * rotm[4] + z * rotm[5]) / (this.boxheight / 2);
x3[2] = (realx * rotm[6] + realy * rotm[7] + z * rotm[8]) / (this.boxdepth / 2);
});

Clazz.newMeth(C$, 'unmap3d$DA$I$I$DA$DA$java_awt_Rectangle', function (x3, x, y, pn, pp, view) {
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - (view.x + (view.width/2|0))) / scalex;
var vy = -(y - (view.y + (view.height/2|0))) / scaley;
var rotm = this.rotmatrix;
var mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
var mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
var mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);
mvx /= this.boxwidth / 2;
mvy /= this.boxheight / 2;
mvz /= this.boxdepth / 2;
var t = ((pp[0] - this.cameraPos[0]) * pn[0] + (pp[1] - this.cameraPos[1]) * pn[1] + (pp[2] - this.cameraPos[2]) * pn[2]) / (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);
x3[0] = (this.cameraPos[0] + mvx * t);
x3[1] = (this.cameraPos[1] + mvy * t);
x3[2] = (this.cameraPos[2] + mvz * t);
});

Clazz.newMeth(C$, 'drawFrequencies$java_awt_Graphics$I$Z', function (g, z, teMode) {
var view = this.viewFreq[z + ((teMode) ? 0 : this.maxZDispCoefs)];
var termWidth = this.getTermWidth();
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).white);
var i;
var j;
var x;
var y;
if (!this.legalMode$I$I$I$Z(1, 1, z, teMode)) return;
var starti = (this.legalMode$I$I$I$Z(1, 0, z, teMode)) ? 0 : 1;
for (i = starti; i <= this.maxDispCoefs; i++) {
x = i * termWidth;
var startdraw = (i == 0) ? 1 : starti;
g.drawLine$I$I$I$I(view.x + startdraw * termWidth, x + view.y, view.x + termWidth * this.maxDispCoefs, x + view.y);
g.drawLine$I$I$I$I(view.x + x, view.y + startdraw * termWidth, view.x + x, view.y + termWidth * this.maxDispCoefs);
}
var rcol = 65536;
var gcol = 256;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.z != z) continue;
if (m.teMode != teMode ) continue;
x = view.x + m.x * termWidth;
y = view.y + m.y * termWidth;
var val = this.logcoef$D(m.magcoef);
if (val < -255) val = -255;
if (val > 255) val = 255;
if (val < 0) g.setColor$java_awt_Color(Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).c$$I,[-16777216 + rcol * -val]));
 else g.setColor$java_awt_Color(Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).c$$I,[-16777216 + gcol * val]));
g.fillRect$I$I$I$I(x + 1, y + 1, termWidth - 1, termWidth - 1);
var phx = ((m.phasecoefadj * termWidth * 0.15915494309189535 )|0);
if (phx > 0) {
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(x + phx, y + 1, x + phx, y + termWidth);
}}
if (C$.waveguide) {
for (i = 0; i != this.maxDispCoefs; i++) for (j = 0; j != this.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
if (!this.basicLegalMode$I$I$I$Z(i, j, z, teMode)) continue;
if (!this.legalMode$I$I$I$Z(i, j, z, teMode)) {
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(x, y + termWidth, x + termWidth, y);
}}

}if (this.selectedCoefX != -1 && !C$.waveguide ) {
var selOmega = this.getOmega$I$I$I(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).yellow);
for (i = starti; i != this.maxDispCoefs; i++) for (j = starti; j != this.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
if (this.getOmega$I$I$I(i, j, z) == selOmega ) g.drawRect$I$I$I$I(x, y, termWidth, termWidth);
}

}if (this.selectedMinOmega > 0  && this.selectedMaxOmega > 0  ) {
g.setColor$java_awt_Color((I$[13]||(I$[13]=Clazz.load('java.awt.Color'))).yellow);
for (i = starti; i != this.maxDispCoefs; i++) for (j = starti; j != this.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
var w = this.getOmega$I$I$I(i, j, z);
if (w >= this.selectedMinOmega  && w < this.selectedMaxOmega  ) g.drawRect$I$I$I$I(x, y, termWidth, termWidth);
}

}});

Clazz.newMeth(C$, 'logcoef$D', function (x) {
var ep2 = 0.003;
var sign = (x < 0 ) ? -1 : 1;
x *= sign;
if (x < ep2 ) return 0;
if (this.logep2 == 0 ) this.logep2 = -java.lang.Math.log(2 * ep2);
return ((255 * sign * (java.lang.Math.log(x + ep2) + this.logep2)  / this.logep2)|0);
});

Clazz.newMeth(C$, 'getColorValue$I$I$I', function (i, j, k) {
var val = ((this.func[i][j][k] * this.colorMult)|0);
if (val > 255) val = 255;
return val;
});

Clazz.newMeth(C$, 'moveParticles$I$I', function (pstart, pcount) {
var bestd = 0;
var i;
var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
for (i = pstart; i != pcount + pstart; i++) {
var pt = this.particles[i];
this.removeFromDensityGroup$com_falstad_EMBoxFrame_Particle(pt);
this.moveParticle$com_falstad_EMBoxFrame_Particle(pt);
var x = pt.pos;
if (x[0] < -1  || x[0] > 1   || x[1] < -1   || x[1] > 1   || x[2] < -1   || x[2] > 1  ) {
if (!this.sidesCheck.getState()) pt.lifetime = -1;
 else {
var c;
var ns = -1;
for (c = 0; c != 3; c++) {
if (x[c] < -1 ) ns = c * 2 + 1;
 else if (x[c] > 1 ) ns = c * 2;
}
if (ns == pt.side || (C$.waveguide && ns >= 4 ) ) pt.lifetime = -1;
 else {
pt.side = ns;
pt.pos[(pt.side/2|0)] = this.sidemap[pt.side][(pt.side/2|0)];
}}}if (pt.lifetime-- < 0) this.positionParticle$com_falstad_EMBoxFrame_Particle(pt);
if (sliced) x[slice - 1] = this.sliceval;
var d = this.addToDensityGroup$com_falstad_EMBoxFrame_Particle(pt);
if (d > bestd) bestd = d;
}
var maxd = ((4 * this.getParticleCount()/64|0));
if (sliced) maxd = (2 * this.getParticleCount()/16|0);
if (bestd > maxd) this.redistribute$I(bestd);
});

Clazz.newMeth(C$, 'redistribute$I', function (mostd) {
if (mostd < 5) return;
this.rediscount++;
var maxd = ((4 * this.getParticleCount()/64|0));
var i;
var pn = 0;
var pcount = this.getParticleCount();
for (i = this.rediscount % 4; i < pcount; i = i+(4)) {
var p = this.particles[i];
var a = (((p.pos[0] + 1) / 0.505)|0);
var b = (((p.pos[1] + 1) / 0.505)|0);
var c = (((p.pos[2] + 1) / 0.505)|0);
if (this.density[a][b][c] <= maxd) continue;
p.lifetime = -1;
pn++;
}
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
if (e.getSource() === this.clearButton ) {
while (this.modeCount > 0)this.deleteMode$I(0);

this.cv.repaint();
}if (e.getSource() === this.resetPartButton ) {
this.resetParticles();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.widthBar  || e.getSource() === this.heightBar  ) this.setWidthHeight();
if (e.getSource() === this.freqBar ) this.setFrequency();
if (e.getSource() === this.resolutionBar ) this.setMaxTerms();
if (e.getSource() === this.partCountBar ) this.resetDensityGroups();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setWidthHeight', function () {
this.boxwidth = this.widthBar.getValue() / 5.0;
this.boxheight = this.heightBar.getValue() / 5.0;
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.omega = this.getOmega$I$I$I(m.x, m.y, m.z);
}
this.setFrequency();
});

Clazz.newMeth(C$, 'setFrequency', function () {
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.zwavenum = this.getWaveNum$I$I(m.x, m.y);
if (!(m.zwavenum > 0 )) this.deleteMode$I(i--);
}
this.calcSpectrum();
});

Clazz.newMeth(C$, 'calcSpectrum', function () {
var i;
var j;
var k;
if (this.winSize == null ) return;
this.spectrum = Clazz.array(Integer.TYPE, [this.winSize.width]);
for (i = 0; i != this.maxDispCoefs; i++) for (j = 0; j != this.maxDispCoefs; j++) for (k = 0; k != this.maxDispCoefs; k++) {
if (!this.legalMode$I$I$I$Z(i, j, k, true) && !this.legalMode$I$I$I$Z(i, j, k, false) ) continue;
var w = this.getOmega$I$I$I(i, j, k);
var x = ((w * 60)|0);
if (x >= this.winSize.width) continue;
this.spectrum[x]++;
}


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
if (this.emChooser.getSelectedIndex() == 2) x = x-((this.view3d_e.inside$I$I(x, y)) ? 0 : this.view3d_b.x);
for (n = 0; n != 8; n = n+(2)) {
var xa = this.slicerPoints[0][n];
var xb = this.slicerPoints[0][n + 1];
var ya = this.slicerPoints[1][n];
var yb = this.slicerPoints[1][n + 1];
if (!this.csInRange$I$I$I(x, xa, xb) || !this.csInRange$I$I$I(y, ya, yb) ) continue;
var d;
if (xa == xb) d = java.lang.Math.abs(x - xa);
 else {
var b = (yb - ya) / (xb - xa);
var a = ya - b * xa;
var d1 = y - (a + b * x);
if (d1 < 0 ) d1 = -d1;
d = d1 / java.lang.Math.sqrt(1 + b * b);
}if (d < 6 ) {
this.selectedSlice = true;
this.sliceFace = this.sliceFaces[(n/2|0)];
break;
}}
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX();
this.dragY = e.getY();
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
}return;
}this.processMouseMotion$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'processMouseMotion$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = x;
this.dragY = y;
var ss = this.selectedSlice;
this.checkSlice$I$I(this.dragX, this.dragY);
if (ss != this.selectedSlice ) this.cv.repaint$J(this.pause);
var oldCoefX = this.selectedCoefX;
var oldCoefY = this.selectedCoefY;
var oldCoefZ = this.selectedCoefZ;
this.selectedCoefX = -1;
this.selectedCoefY = -1;
this.selectedCoefZ = -1;
this.selection = 0;
this.selectedMinOmega = this.selectedMaxOmega = 0;
var i;
if (this.view3d.inside$I$I(x, y)) this.selection = 1;
if (this.viewSpectrum != null  && this.viewSpectrum.inside$I$I(x, y) ) {
this.selection = 3;
this.selectedMinOmega = (x - 2) / 60.0;
this.selectedMaxOmega = (x + 2) / 60.0;
}for (i = 0; i != this.maxZDispCoefs * 2; i++) {
var vf = this.viewFreq[i];
if (vf.inside$I$I(x, y)) {
var termWidth = this.getTermWidth();
this.selectedCoefX = ((x - vf.x)/termWidth|0);
this.selectedCoefY = ((y - vf.y)/termWidth|0);
this.selectedCoefZ = i % this.maxZDispCoefs;
this.selectedCoefTEMode = (i < this.maxZDispCoefs);
if (this.selectedCoefX >= this.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefY >= this.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefX != -1) this.selection = 2;
}}
if (!this.legalMode$I$I$I$Z(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ, this.selectedCoefTEMode)) this.selectedCoefX = this.selectedCoefY = this.selectedCoefZ = -1;
if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY  || this.selectedCoefZ != oldCoefZ ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'legalMode$I$I$I$Z', function (x, y, z, h) {
if (C$.waveguide) {
if (z != 1) return false;
if (!(this.getWaveNum$I$I(x, y) > 0 )) return false;
}return this.basicLegalMode$I$I$I$Z(x, y, z, h);
});

Clazz.newMeth(C$, 'basicLegalMode$I$I$I$Z', function (x, y, z, h) {
if (h) return z != 0 && !(x == 0 && y == 0 ) ;
 else return x != 0 && y != 0 ;
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (this.selection == 2) this.editMagClick();
if (e.getClickCount() == 2 && this.selectedCoefX != -1 ) {
while (this.modeCount > 0)this.deleteMode$I(0);

this.addMode$I$I$I$Z(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ, this.selectedCoefTEMode).magcoef = 1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selection != -1 ) {
this.selectedCoefX = this.selectedCoefY = this.selectedCoefZ = -1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
this.oldDragX = this.dragStartX = e.getX();
this.oldDragY = this.dragStartY = e.getY();
this.dragZoomStart = this.zoom;
if (this.selectedCoefX != -1) {
var m = this.findSelectedMode();
this.magDragStart = m.magcoef;
}this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.dragging) this.cv.repaint();
this.dragging = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) {
return;
}if (e.getItemSelectable() === this.spectrumCheck ) this.setupDisplay();
if (e.getItemSelectable() === this.dispChooser ) this.setDynamicControls();
if (e.getItemSelectable() === this.sliceChooser ) this.setDynamicControls();
if (e.getItemSelectable() === this.emChooser ) this.reinit();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setDynamicControls', function () {
var em = this.emChooser.getSelectedIndex();
var dcf = this.dispChooser.getSelectedIndex();
if (em == 4) {
this.sliceChooser.select$I(0);
this.sliceChooser.disable();
this.dispChooser.select$I(1);
this.dispChooser.disable();
} else {
if (em == 3 && dcf != 6 ) {
this.sliceChooser.disable();
this.sliceChooser.select$I(0);
} else this.sliceChooser.enable();
this.dispChooser.enable();
}if (dcf != 0 && dcf != 6  && this.sliceChooser.getSelectedIndex() == 0 ) dcf = 1;
if (em == 4 || (em == 3 && dcf != 6 ) ) {
this.sidesCheck.disable();
this.sidesCheck.setState$Z(true);
} else if (this.sliceChooser.getSelectedIndex() == 0 && (dcf != 0 || em == 3 ) ) {
this.sidesCheck.enable();
this.sidesCheck.setState$Z((em == 3) ? true : false);
} else {
this.sidesCheck.disable();
this.sidesCheck.setState$Z(false);
}dcf = 1 << dcf;
var i;
for (i = 0; this.dynControls[i] != null ; i++) {
var dc = this.dynControls[i];
if ((dc.flags & dcf) > 0) {
dc.bar.show();
dc.label.show();
} else {
dc.bar.hide();
dc.label.hide();
}}
if (this.dispChooser.getSelectedIndex() == 0) {
this.resetPartButton.enable();
this.stopOscCheck.enable();
} else {
this.resetPartButton.disable();
this.stopOscCheck.disable();
this.stopOscCheck.setState$Z(false);
}if (this.dispChooser.getSelectedIndex() == 0) this.resetParticles();
this.validate();
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 2:
this.editMag$I$I(x, y);
break;
case 1:
this.edit3d$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'edit3d$I$I', function (x, y) {
if (this.selectedSlice) {
var x3 = Clazz.array(Double.TYPE, [3]);
var view = this.view3d;
if (this.emChooser.getSelectedIndex() == 2) view = (this.view3d_e.inside$I$I(x, y)) ? this.view3d_e : this.view3d_b;
this.unmap3d$DA$I$I$DA$DA$java_awt_Rectangle(x3, this.dragX, this.dragY, this.sliceFace, this.sliceFace, view);
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
this.resetDensityGroups();
this.cv.repaint$J(this.pause);
} else if (this.modeChooser.getSelectedIndex() == 0) {
var xo = this.oldDragX - x;
var yo = this.oldDragY - y;
this.rotate$D$D(xo / 40.0, -yo / 40.0);
this.cv.repaint$J(this.pause);
} else if (this.modeChooser.getSelectedIndex() == 1) {
var xo = x - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.0;
if (this.zoom < 0.1 ) this.zoom = 0.1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoefX == -1) return;
var coef = (this.dragStartY - y) / 20.0 + this.magDragStart;
if (coef < -1 ) coef = -1;
if (coef > 1 ) coef = 1;
var pcoef = (x - this.dragStartX) / 10.0;
if (pcoef < 0 ) pcoef = 0;
if (pcoef > 6.283185307179586 ) pcoef = 6.283185307179586;
var m = this.findSelectedMode();
if (m.magcoef == coef  && m.phasecoefadj == pcoef  ) return;
m.magcoef = coef;
m.phasecoefadj = pcoef;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedCoefX == -1) return;
var m = this.findSelectedMode();
if (this.magDragStart < 0.5 ) m.magcoef = 1;
 else m.magcoef = 0;
m.phasecoefadj = 0;
if (m.magcoef == 0 ) this.deleteMode$com_falstad_EMBoxFrame_Mode(m);
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'genData$I', function (fieldno) {
var q = 3.141592653589793 / (this.maxTerms - 1);
var x;
var y;
var z;
var mi;
var fx;
var fy;
var fz;
var showE = (fieldno == 0);
for (mi = 0; mi != this.modeCount; mi++) {
var m = this.modes[mi];
var md = m.modeDatas[fieldno];
if (md.data == null ) {
md.zmode_xymult = Clazz.array(Float.TYPE, [this.maxTerms]);
md.zmode_zmult = Clazz.array(Float.TYPE, [this.maxTerms]);
}this.calcModeMults$com_falstad_EMBoxFrame_Mode$Z(m, false);
var qz = (C$.waveguide) ? 2 * q * m.zwavenum  : q;
var wgshift = (C$.waveguide) ? 1.5707963267948966 : 0;
for (z = 0; z != this.maxTerms; z++) {
if (showE) {
md.zmode_xymult[z] = (java.lang.Math.sin(z * qz * m.z  + m.ephaseshift) * m.ephasemult);
md.zmode_zmult[z] = (java.lang.Math.cos(z * qz * m.z  + m.ephaseshift) * m.ephasemult);
} else {
md.zmode_xymult[z] = (java.lang.Math.cos(z * qz * m.z  + m.bphaseshift - wgshift) * m.bphasemult);
md.zmode_zmult[z] = (java.lang.Math.sin(z * qz * m.z  + m.bphaseshift + wgshift) * m.bphasemult);
}}
if (md.data != null ) continue;
md.data = Clazz.array(Float.TYPE, [this.maxTerms, this.maxTerms, 3]);
fz = 0;
for (x = 0; x != this.maxTerms; x++) for (y = 0; y != this.maxTerms; y++) {
if (showE) {
fx = java.lang.Math.cos(x * m.x * q ) * java.lang.Math.sin(y * m.y * q ) * m.exmult ;
fy = java.lang.Math.sin(x * m.x * q ) * java.lang.Math.cos(y * m.y * q ) * m.eymult ;
fz = java.lang.Math.sin(x * m.x * q ) * java.lang.Math.sin(y * m.y * q ) * m.ezmult ;
} else {
fx = java.lang.Math.sin(x * m.x * q ) * java.lang.Math.cos(y * m.y * q ) * m.bxmult ;
fy = java.lang.Math.cos(x * m.x * q ) * java.lang.Math.sin(y * m.y * q ) * m.bymult ;
fz = java.lang.Math.cos(x * m.x * q ) * java.lang.Math.cos(y * m.y * q ) * m.bzmult ;
}md.data[x][y][0] = fx;
md.data[x][y][1] = fy;
md.data[x][y][2] = fz;
}

}
});

Clazz.newMeth(C$, 'calcModeMults$com_falstad_EMBoxFrame_Mode$Z', function (m, usephase) {
var a1 = m.x / this.boxwidth;
var a2 = m.y / this.boxheight;
var a3 = (C$.waveguide) ? m.zwavenum : m.z / this.boxdepth;
var gneg = (C$.waveguide) ? -1 : 1;
if (m.teMode) this.calcMults$com_falstad_EMBoxFrame_Mode$D$D$D$D$D$D$D$D(m, usephase ? m.ephasemult : 1, a2, -a1, 0, usephase ? m.bphasemult : 1, a1 * a3, a2 * a3, -gneg * (a1 * a1 + a2 * a2));
 else this.calcMults$com_falstad_EMBoxFrame_Mode$D$D$D$D$D$D$D$D(m, usephase ? m.ephasemult : 1, a1 * a3, a2 * a3, -(a1 * a1 + a2 * a2), usephase ? m.bphasemult : 1, a2 * gneg, -gneg * a1, 0);
});

Clazz.newMeth(C$, 'calcMults$com_falstad_EMBoxFrame_Mode$D$D$D$D$D$D$D$D', function (m, emult, ex, ey, ez, bmult, bx, by, bz) {
var enorm = emult / java.lang.Math.sqrt(ex * ex + ey * ey + ez * ez);
m.exmult = ex * enorm;
m.eymult = ey * enorm;
m.ezmult = ez * enorm;
var bnorm = bmult / java.lang.Math.sqrt(bx * bx + by * by + bz * bz);
m.bxmult = bx * bnorm;
m.bymult = by * bnorm;
m.bzmult = bz * bnorm;
});

Clazz.newMeth(C$, 'calcField$com_falstad_EMBoxFrame_Particle$DA$DA', function (p, field, pos) {
var mi;
var q = 1.5707963267948966;
var x = pos[0] + 1;
var y = pos[1] + 1;
var z = pos[2] + 1;
field[0] = field[1] = field[2] = 0;
var showE = (this.curfieldno == 0);
var wgshift = (C$.waveguide) ? 1.5707963267948966 : 0;
for (mi = 0; mi != this.modeCount; mi++) {
var m = this.modes[mi];
var qz = (C$.waveguide) ? 2 * q * m.zwavenum  : q;
if (showE) {
field[0] += m.exmult * java.lang.Math.cos(x * m.x * q ) * java.lang.Math.sin(y * m.y * q ) * java.lang.Math.sin(z * m.z * qz  + m.ephaseshift) ;
field[1] += m.eymult * java.lang.Math.sin(x * m.x * q ) * java.lang.Math.cos(y * m.y * q ) * java.lang.Math.sin(z * m.z * qz  + m.ephaseshift) ;
field[2] += m.ezmult * java.lang.Math.sin(x * m.x * q ) * java.lang.Math.sin(y * m.y * q ) * java.lang.Math.cos(z * m.z * qz  + m.ephaseshift) ;
} else {
field[0] += m.bxmult * java.lang.Math.sin(x * m.x * q ) * java.lang.Math.cos(y * m.y * q ) * java.lang.Math.cos(z * m.z * qz  + m.bphaseshift - wgshift) ;
field[1] += m.bymult * java.lang.Math.cos(x * m.x * q ) * java.lang.Math.sin(y * m.y * q ) * java.lang.Math.cos(z * m.z * qz  + m.bphaseshift - wgshift) ;
field[2] += m.bzmult * java.lang.Math.cos(x * m.x * q ) * java.lang.Math.cos(y * m.y * q ) * java.lang.Math.sin(z * m.z * qz  + m.bphaseshift + wgshift) ;
}}
if (this.curfieldno == 3) {
var sw;
switch (p.side) {
case 0:
field[0] = 0;
sw = field[1];
field[1] = field[2];
field[2] = -sw;
break;
case 1:
field[0] = 0;
sw = field[1];
field[1] = -field[2];
field[2] = sw;
break;
case 2:
field[1] = 0;
sw = field[0];
field[0] = -field[2];
field[2] = sw;
break;
case 3:
field[1] = 0;
sw = field[0];
field[0] = field[2];
field[2] = -sw;
break;
case 4:
field[2] = 0;
sw = field[0];
field[0] = field[1];
field[1] = -sw;
break;
case 5:
field[2] = 0;
sw = field[0];
field[0] = -field[1];
field[1] = sw;
break;
}
}});

Clazz.newMeth(C$, 'deleteMode$I', function (i) {
for (; i < this.modeCount - 1; i++) {
this.modes[i] = this.modes[i + 1];
}
this.modeCount--;
});

Clazz.newMeth(C$, 'deleteMode$com_falstad_EMBoxFrame_Mode', function (m) {
var i;
for (i = 0; i != this.modeCount; i++) if (this.modes[i] === m ) {
this.deleteMode$I(i);
return;
}
});

Clazz.newMeth(C$, 'addMode$I$I$I$Z', function (x, y, z, teMode) {
if (this.modeCount == this.maxModes) {
var i;
var minmag = 1;
var minmagi = 0;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.magcoef < minmag ) {
minmag = m.magcoef;
minmagi = i;
}}
this.deleteMode$I(minmagi);
}var m = Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').Mode))), [this, null]);
m.x = x;
m.y = y;
m.z = z;
m.teMode = teMode;
m.magcoef = 0;
m.phasecoef = 0;
m.phasecoefadj = 0;
m.omega = this.getOmega$I$I$I(x, y, z);
m.zwavenum = this.getWaveNum$I$I(x, y);
m.modeDatas = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').ModeData))), [2]);
m.modeDatas[0] = Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').ModeData))), [this, null]);
m.modeDatas[1] = Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.EMBoxFrame').ModeData))), [this, null]);
this.modes[this.modeCount++] = m;
return m;
});

Clazz.newMeth(C$, 'getWaveNum$I$I', function (x, y) {
if (!C$.waveguide) return 1;
var gammasq = (x * x / (this.boxwidth * this.boxwidth) + y * y / (this.boxheight * this.boxheight));
return java.lang.Math.sqrt(this.freqBar.getValue() * 0.2 - gammasq);
});

Clazz.newMeth(C$, 'getOmega$I$I$I', function (x, y, z) {
if (C$.waveguide) return 1;
return java.lang.Math.sqrt(x * x / (this.boxwidth * this.boxwidth) + y * y / (this.boxheight * this.boxheight) + z * z / 4.0);
});

Clazz.newMeth(C$, 'findSelectedMode', function () {
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (this.selectedCoefX == m.x && this.selectedCoefY == m.y  && this.selectedCoefZ == m.z  && this.selectedCoefTEMode == m.teMode  ) return m;
}
return this.addMode$I$I$I$Z(this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ, this.selectedCoefTEMode);
});

Clazz.newMeth(C$, 'rk$com_falstad_EMBoxFrame_Particle$I$D$DA$D', function (p, order, x, Y, stepsize) {
var i;
if (order == 3) {
var fmult = stepsize * 0.0016 * this.partSpeedBar.getValue() ;
for (i = 0; i != order; i++) this.rk_yn[i] = Y[i];

this.calcField$com_falstad_EMBoxFrame_Particle$DA$DA(p, this.rk_k1, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * fmult * this.rk_k1[i] );

this.calcField$com_falstad_EMBoxFrame_Particle$DA$DA(p, this.rk_k2, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * fmult * this.rk_k2[i] );

this.calcField$com_falstad_EMBoxFrame_Particle$DA$DA(p, this.rk_k3, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + fmult * this.rk_k3[i]);

this.calcField$com_falstad_EMBoxFrame_Particle$DA$DA(p, this.rk_k4, this.rk_yn);
for (i = 0; i != order; i++) Y[i] = Y[i] + fmult * (this.rk_k1[i] + 2 * (this.rk_k2[i] + this.rk_k3[i]) + this.rk_k4[i]) / 6;

}});

Clazz.newMeth(C$, 'moveParticle$com_falstad_EMBoxFrame_Particle', function (p) {
var disp = this.dispChooser.getSelectedIndex();
var numIter = 0;
var maxh = 1;
var error = 0.0;
var E = 0.001;
var localError;
var order = 3;
var Y = this.rk_Y;
var Yhalf = this.rk_Yhalf;
this.oldY = this.rk_oldY;
var i;
for (i = 0; i != 3; i++) this.oldY[i] = Y[i] = Yhalf[i] = p.pos[i];

var t = 0;
var h = p.stepsize;
var steps = 0;
var minh = 1.0E-4;
while (t >= 0  && t < 1  ){
if (t + h > 1 ) h = 1 - t;
this.boundCheck = false;
this.rk$com_falstad_EMBoxFrame_Particle$I$D$DA$D(p, order, 0, Y, h);
this.rk$com_falstad_EMBoxFrame_Particle$I$D$DA$D(p, order, 0, Yhalf, h * 0.5);
this.rk$com_falstad_EMBoxFrame_Particle$I$D$DA$D(p, order, 0, Yhalf, h * 0.5);
if (this.boundCheck) {
p.pos[0] = -100;
return;
}localError = java.lang.Math.abs(Y[0] - Yhalf[0]) + java.lang.Math.abs(Y[1] - Yhalf[1]) + java.lang.Math.abs(Y[2] - Yhalf[2]) ;
if (localError > E  && h > minh  ) {
h *= 0.75;
if (h < minh ) h = minh;
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

continue;
} else if (localError < (E * 0.5) ) {
h *= 1.25;
if (h > maxh ) h = maxh;
}for (i = 0; i != order; i++) this.oldY[i] = Yhalf[i] = Y[i];

t += h;
steps++;
}
p.stepsize = h;
for (i = 0; i != 3; i++) p.pos[i] = Y[i];

});
;
(function(){var C$=Clazz.newClass(P$.EMBoxFrame, "DynControl", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.bar = null;
this.label = null;
this.flags = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$a2s_Scrollbar$a2s_Label$I', function (s, l, df) {
C$.$init$.apply(this);
this.bar = s;
this.label = l;
this.flags = 1 << df;
}, 1);

Clazz.newMeth(C$, 'c$$a2s_Scrollbar$a2s_Label$I$I', function (s, l, df, df2) {
C$.$init$.apply(this);
this.bar = s;
this.label = l;
this.flags = (1 << df) | (1 << df2);
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMBoxFrame, "Mode", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.z = 0;
this.teMode = false;
this.magcoef = 0;
this.phasecoef = 0;
this.ephasemult = 0;
this.bphasemult = 0;
this.phasecoefadj = 0;
this.omega = 0;
this.ephaseshift = 0;
this.bphaseshift = 0;
this.zwavenum = 0;
this.exmult = 0;
this.eymult = 0;
this.ezmult = 0;
this.bxmult = 0;
this.bymult = 0;
this.bzmult = 0;
this.modeDatas = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMBoxFrame, "ModeData", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.data = null;
this.zmode_xymult = null;
this.zmode_zmult = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMBoxFrame, "DrawData", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.g = null;
this.mult = 0;
this.view = null;
this.fieldno = 0;
this.realfieldno = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMBoxFrame, "Particle", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pos = null;
this.stepsize = null;
this.lifetime = 0;
this.side = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.pos = Clazz.array(Double.TYPE, [3]);
this.stepsize = 1;
}, 1);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:03
