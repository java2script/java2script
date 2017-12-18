(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "CircOscFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxSampleCount = 0;
this.sampleCountR = 0;
this.sampleCountTh = 0;
this.modeCountR = 0;
this.modeCountTh = 0;
this.maxDispRModes = 0;
this.maxDispThModes = 0;
this.fftTh = null;
this.sineButton = null;
this.blankButton = null;
this.stoppedCheck = null;
this.soundCheck = null;
this.freqCheck = null;
this.modeChooser = null;
this.displayChooser = null;
this.display2Chooser = null;
this.colorCheck = null;
this.dampingBar = null;
this.brightnessBar = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.baseFreqBar = null;
this.phasorBar = null;
this.view3d = null;
this.view2d = null;
this.viewFreq = null;
this.editingFunc = false;
this.dragStop = false;
this.cosTable = null;
this.sinTable = null;
this.magcoef = null;
this.dampcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefadj = null;
this.xformbuf = null;
this.omega = null;
this.step = 0;
this.func = null;
this.funci = null;
this.xpoints = null;
this.ypoints = null;
this.modeFuncsR = null;
this.modeFuncsTh = null;
this.selectedCoefX = 0;
this.selectedCoefY = 0;
this.selectedGridX = 0;
this.selectedGridY = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragSet = false;
this.dragClear = false;
this.viewAngle = 0;
this.viewAngleDragStart = 0;
this.viewZoom = 0;
this.viewZoomDragStart = 0;
this.scaleHeight = 0;
this.viewAngleCos = 0;
this.viewAngleSin = 0;
this.viewHeight = 0;
this.viewHeightDragStart = 0;
this.viewDistance = 0;
this.magDragStart = 0;
this.dragging = false;
this.needPlay = false;
this.t = 0;
this.pause = 0;
this.scalex = 0;
this.scaley = 0;
this.centerX3d = 0;
this.centerY3d = 0;
this.topz = 0;
this.main = null;
this.showControls = false;
this.useFrame = false;
this.cv = null;
this.applet = null;
this.java2 = false;
this.shown = false;
this.displayOrder = null;
this.lastTime = 0;
this.logep2 = 0;
this.finished = false;
this.sndmax = 0;
this.fftPlay = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.maxSampleCount = 70;
this.maxDispRModes = 5;
this.maxDispThModes = 5;
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.viewZoom = 1;
this.scaleHeight = 6;
this.viewAngleCos = 1;
this.viewAngleSin = 0;
this.viewHeight = -14;
this.topz = 3;
this.java2 = false;
this.shown = false;
this.logep2 = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "CircOsc Series by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_CircOsc', function (a) {
C$.superclazz.c$$S.apply(this, ["Circular Membrane Applet v1.6b"]);
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
if (jvf >= 48 ) this.java2 = true;
this.selectedCoefX = this.selectedCoefY = -1;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.CircOscLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.CircOscCanvas'))).c$$com_falstad_CircOscFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.main.add$java_awt_Component(this.sineButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Fundamental"]));
this.sineButton.addActionListener$java_awt_event_ActionListener(this);
this.main.add$java_awt_Component(this.blankButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.freqCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Frequencies", true]);
this.freqCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.freqCheck);
this.colorCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Color", true]);
this.colorCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.colorCheck);
this.soundCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Sound", false]);
this.soundCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.java2) this.main.add$java_awt_Component(this.soundCheck);
this.modeChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Poke membrane");
this.modeChooser.add$S("Mouse = Strike membrane");
this.modeChooser.add$S("Mouse = Adjust view angle");
this.modeChooser.add$S("Mouse = Adjust view zoom");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.modeChooser);
this.modeChooser.select$I(2);
this.displayChooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.displayChooser.add$S("Display 3d+2d");
this.displayChooser.add$S("Display 3d only");
this.displayChooser.add$S("Display 2d only");
this.displayChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.displayChooser);
this.displayChooser.select$I(1);
this.display2Chooser = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Choice'))));
this.display2Chooser.add$S("3d view = Solid");
this.display2Chooser.add$S("3d view = Wireframe");
this.display2Chooser.add$S("3d view = Wireframe theta");
this.display2Chooser.add$S("3d view = Wireframe r");
this.display2Chooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.display2Chooser);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 105, 1, 1, 250]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Damping", 0]));
this.main.add$java_awt_Component(this.dampingBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 0, 5, 0, 100]));
this.dampingBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 0, 100]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 16, 1, 2, (this.maxSampleCount/2|0)]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.java2) this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Base Frequency", 0]));
this.baseFreqBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 84, 12, 49, 127]);
if (this.java2) this.main.add$java_awt_Component(this.baseFreqBar);
this.baseFreqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.baseFreqBar.disable();
this.main.add$java_awt_Component(Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Label'))).c$$S$I,["Freq Display Count", 0]));
this.main.add$java_awt_Component(this.phasorBar = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 5, 66]));
this.phasorBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setResolution();
this.setMaxDispModes();
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.random = Clazz.new_((I$[9]||(I$[9]=Clazz.load('java.util.Random'))));
this.setDamping();
this.reinit();
this.cv.setBackground$java_awt_Color((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).lightGray);
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

Clazz.newMeth(C$, 'reinit', function () {
this.doSine();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0 || this.winSize.height == 0 ) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
this.setupDisplay();
});

Clazz.newMeth(C$, 'setupDisplay', function () {
this.view3d = this.view2d = this.viewFreq = null;
this.displayOrder = null;
switch (this.displayChooser.getSelectedIndex()) {
case 1:
if (!this.freqCheck.getState()) this.view3d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$java_awt_Dimension, [this, null, this.winSize]);
 else {
this.view3d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, 0, this.winSize.width, (this.winSize.height/2|0)]);
this.viewFreq = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, (this.winSize.height/2|0), this.winSize.width, (this.winSize.height/2|0)]);
}break;
case 2:
if (!this.freqCheck.getState()) this.view2d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$java_awt_Dimension, [this, null, this.winSize]);
 else {
this.view2d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, 0, this.winSize.width, (this.winSize.height/2|0)]);
this.viewFreq = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, (this.winSize.height/2|0), this.winSize.width, (this.winSize.height/2|0)]);
}break;
case 0:
default:
if (!this.freqCheck.getState()) {
this.view3d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, 0, this.winSize.width, (this.winSize.height/2|0)]);
this.view2d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, (this.winSize.height/2|0), this.winSize.width, (this.winSize.height/2|0)]);
} else {
this.view3d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, 0, (this.winSize.width/2|0), (this.winSize.height/2|0)]);
this.view2d = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, (this.winSize.width/2|0), 0, (this.winSize.width/2|0), (this.winSize.height/2|0)]);
this.viewFreq = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.CircOscFrame').View))).c$$I$I$I$I, [this, null, 0, (this.winSize.height/2|0), this.winSize.width, (this.winSize.height/2|0)]);
}break;
}
if (this.viewFreq != null ) {
var tw = this.getTermWidth();
var h = tw * (this.maxDispRModes + 1);
var pad = this.viewFreq.height - h;
if (pad > 0) {
this.viewFreq.y = this.viewFreq.y+(pad);
this.viewFreq.height = this.viewFreq.height-(pad);
if (this.view3d != null ) this.view3d.height = this.view3d.height+(pad);
if (this.view2d != null ) this.view2d.height = this.view2d.height+(pad);
}var w = tw * (this.maxDispThModes + 1);
pad = ((this.viewFreq.width - w)/2|0);
if (pad > 0) this.viewFreq.x = this.viewFreq.x+(pad);
}if (this.view2d != null ) {
var dim = (this.view2d.width < this.view2d.height) ? this.view2d.width : this.view2d.height;
this.view2d.x = this.view2d.x+(((this.view2d.width - dim)/2|0));
this.view2d.y = this.view2d.y+(((this.view2d.height - dim)/2|0));
this.view2d.width = dim;
this.view2d.height = dim;
this.setupRaster$com_falstad_CircOscFrame_View(this.view2d);
this.brightnessBar.enable();
} else this.brightnessBar.disable();
if (this.view3d != null ) this.setupRaster$com_falstad_CircOscFrame_View(this.view3d);
});

Clazz.newMeth(C$, 'setupRaster$com_falstad_CircOscFrame_View', function (v) {
v.pixels = null;
if (this.java2) {
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

v.imageSource = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[v.width, v.height, v.pixels, 0, v.width]);
v.imageSource.setAnimated$Z(true);
v.imageSource.setFullBufferUpdates$Z(true);
v.memimage = this.cv.createImage$java_awt_image_ImageProducer(v.imageSource);
}});

Clazz.newMeth(C$, 'doSine', function () {
this.doBlank();
this.magcoef[0][0] = 1;
this.t = 0;
this.doPlay();
});

Clazz.newMeth(C$, 'doPluck$D', function (val) {
val *= 5;
var i;
var j;
var x;
var y;
var b = java.lang.Math.sqrt(this.selectedGridX * this.selectedGridX + this.selectedGridY * this.selectedGridY);
if (b >= 1 ) return;
var imagex = 1.0E8;
var imagey = 0;
var imageb = 1.0E8;
if (b > 0 ) {
imageb = (b == 0 ) ? 1.0E8 : 1 / b;
imagex = this.selectedGridX * imageb / b;
imagey = this.selectedGridY * imageb / b;
}var subout = java.lang.Math.log(1 - b) - java.lang.Math.log(imageb - 1);
var fudge = 1.0E-4;
var mulout = val / (java.lang.Math.log(fudge) - java.lang.Math.log(imageb + fudge) - subout );
for (x = 0; x != this.sampleCountR; x++) for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793  / this.sampleCountTh - this.viewAngle;
var xx = -java.lang.Math.cos(th) * x / this.sampleCountR;
var yy = -java.lang.Math.sin(th) * x / this.sampleCountR;
var xx1 = xx - this.selectedGridX;
var xx2 = xx - imagex;
var yy1 = yy - this.selectedGridY;
var yy2 = yy - imagey;
var r1 = java.lang.Math.sqrt(yy1 * yy1 + xx1 * xx1);
var r2 = java.lang.Math.sqrt(yy2 * yy2 + xx2 * xx2);
var rfunc = (java.lang.Math.log(r1 + fudge) - java.lang.Math.log(r2 + fudge) - subout ) * mulout;
this.func[y][x] = rfunc;
}

this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'transform', function () {
this.t = 0;
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.magcoef[i][j] = this.phasecoef[i][j] = 0;


var r;
var th;
for (r = 0; r <= this.sampleCountR; r++) {
for (th = 0; th != this.sampleCountTh * 2; th++) this.xformbuf[th] = 0;

for (th = 0; th != this.sampleCountTh; th++) this.xformbuf[th * 2] = this.func[th][r] * r;

this.fftTh.transform$DA(this.xformbuf);
for (j = 0; j != this.modeCountR; j++) {
this.magcoef[0][j] += this.modeFuncsR[j][r] * this.xformbuf[0];
this.phasecoef[0][j] += this.modeFuncsR[j][r] * this.modeFuncsR[j][r] * r * this.sampleCountTh ;
}
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
for (i = 1; i < this.modeCountTh; i = i+(2)) {
for (j = 0; j != this.modeCountR; j++) {
var ii = i + 1;
var i2 = (i/2|0);
this.magcoef[i][j] += this.modeFuncsTh[i2][j][r] * 0.5 * (this.xformbuf[ii] + this.xformbuf[wm & (-ii)]) ;
this.magcoef[i + 1][j] += this.modeFuncsTh[i2][j][r] * 0.5 * (this.xformbuf[ii + 1] - this.xformbuf[wm & (-ii + 1)]) ;
this.phasecoef[i][j] += this.modeFuncsTh[i2][j][r] * this.modeFuncsTh[i2][j][r] * r * this.sampleCountTh * 0.5 ;
this.phasecoef[i + 1][j] = this.phasecoef[i][j];
}
}
}
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
this.magcoef[i][j] /= this.phasecoef[i][j];
this.phasecoefadj[i][j] = 0;
this.phasecoef[0][j] = 0;
}

this.needPlay = true;
});

Clazz.newMeth(C$, 'doStrike$D', function (val) {
val *= 10;
var i;
var j;
var x;
var y;
var striker = 0.2;
for (x = 0; x != this.sampleCountR; x++) {
for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793  / this.sampleCountTh - this.viewAngle;
var xx = -java.lang.Math.cos(th) * x / this.sampleCountR - this.selectedGridX;
var yy = -java.lang.Math.sin(th) * x / this.sampleCountR - this.selectedGridY;
var r = java.lang.Math.sqrt(yy * yy + xx * xx);
var rfunc = 0;
if (r < striker ) rfunc = val * (striker - r);
this.func[y][x] = rfunc;
}
}
this.transform();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'doBlank', function () {
this.handleResize();
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

Clazz.newMeth(C$, 'updateCircOsc$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0  || this.dbimage == null  ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
var tadd = 0;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue();
tadd = java.lang.Math.exp(val / 20.0) * 0.002;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * 0.0058823529411764705;
this.t += tadd;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
var gray1 = Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var x;
var y;
var i;
var j;
if (this.dragStop) {
this.t = 0;
this.lastTime = 0;
}for (i = 0; i != this.modeCountTh; i++) {
for (j = 0; j != this.modeCountR; j++) {
if (this.magcoef[i][j] < 1.0E-5  && this.magcoef[i][j] > -1.0E-5  ) {
this.magcoef[i][j] = this.phasecoef[i][j] = this.phasecoefadj[i][j] = 0;
continue;
}this.magcoef[i][j] *= Math.exp(this.dampcoef[i][j] * tadd);
this.phasecoef[i][j] = (this.omega[i][j] * this.t + this.phasecoefadj[i][j]) % 6.283185307179586;
this.phasecoefcos[i][j] = java.lang.Math.cos(this.phasecoef[i][j]);
}
}
this.genFunc();
var brightmult = this.brightnessBar.getValue() / 10.0;
var half = (this.sampleCountTh/2|0);
if (this.view3d != null ) {
this.scaleworld();
for (x = 0; x != this.sampleCountTh + 1; x++) {
var th = 2 * 3.141592653589793 * (x - half)  / this.sampleCountTh;
;this.cosTable[x] = Math.cos(th);
this.sinTable[x] = Math.sin(th);
}
if (this.display2Chooser.getSelectedIndex() == 0) {
var pixels = this.view3d.pixels;
for (x = 0; x != this.view3d.width * this.view3d.height; x++) pixels[x] = -16777216;

if (this.displayOrder == null ) this.displayOrder = this.getDisplayOrder();
var sc2 = this.sampleCountR * this.sampleCountTh;
for (i = 0; i != sc2; i++) {
var de = this.displayOrder[i];
x = de % this.sampleCountTh;
y = (de/this.sampleCountTh|0);
this.map3d$I$D$D$IA$IA$I(x, y, this.func[x][y], this.xpoints, this.ypoints, 0);
this.map3d$I$D$D$IA$IA$I(x + 1, y, this.func[x + 1][y], this.xpoints, this.ypoints, 1);
this.map3d$I$D$D$IA$IA$I(x, y + 1, this.func[x][y + 1], this.xpoints, this.ypoints, 2);
this.map3d$I$D$D$IA$IA$I(x + 1, y + 1, this.func[x + 1][y + 1], this.xpoints, this.ypoints, 3);
var qx = this.func[x + 1][y] - this.func[x][y];
var qy = this.func[x][y + 1] - this.func[x][y];
var normdot = (qx + qy + 1 ) * 0.5780346820809249 / java.lang.Math.sqrt(qx * qx + qy * qy + 1);
var col = this.computeColor$I$I$D(x, y, normdot);
this.fillTriangle$com_falstad_CircOscFrame_View$I$I$I$I$I$I$I(this.view3d, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[3], this.ypoints[3], col);
this.fillTriangle$com_falstad_CircOscFrame_View$I$I$I$I$I$I$I(this.view3d, this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
}
if (this.view3d.imageSource != null ) this.view3d.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.view3d.memimage, this.view3d.x, this.view3d.y, null);
} else {
var needX = (this.display2Chooser.getSelectedIndex() != 3);
var needY = (this.display2Chooser.getSelectedIndex() != 2);
if (this.displayOrder == null ) this.displayOrder = this.getDisplayOrder();
var sc2 = this.sampleCountR * this.sampleCountTh;
for (i = 0; i != sc2; i++) {
var de = this.displayOrder[i];
x = de % this.sampleCountTh;
y = (de/this.sampleCountTh|0);
g.setColor$java_awt_Color(Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).c$$I,[this.computeColor$I$I$D(x, y, 0)]));
this.map3d$I$D$D$IA$IA$I(x, y, this.func[x][y], this.xpoints, this.ypoints, 0);
if (x < this.sampleCountTh && needX ) {
this.map3d$I$D$D$IA$IA$I(x + 1, y, this.func[x + 1][y], this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (y < this.sampleCountR && needY ) {
this.map3d$I$D$D$IA$IA$I(x, y + 1, this.func[x][y + 1], this.xpoints, this.ypoints, 2);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2]);
}}
}}if (this.view2d != null ) {
var rcol = 65536;
var gcol = 256;
var cx = (this.view2d.width/2|0);
var cy = (this.view2d.height/2|0);
var cr = (this.view2d.width/2|0);
for (x = 0; x != this.sampleCountTh; x++) {
var th2 = 2 * 3.141592653589793 * (x + 1)  / this.sampleCountTh - this.viewAngle + 0.001;
this.cosTable[x] = Math.cos(th2);
this.sinTable[x] = Math.sin(th2);
}
for (y = 0; y != this.sampleCountR; y++) {
var r1 = (-cr * y/this.sampleCountR|0);
var r2 = (-cr * (y + 1)/this.sampleCountR|0);
var th1 = -this.viewAngle;
var costh1 = Math.cos(th1);
var sinth1 = Math.sin(th1);
this.xpoints[0] = ((cx + r1 * costh1)|0);
this.ypoints[0] = ((cy - r1 * sinth1)|0);
this.xpoints[3] = ((cx + r2 * costh1)|0);
this.ypoints[3] = ((cy - r2 * sinth1)|0);
for (x = 0; x != this.sampleCountTh; x++) {
var val;
val = ((255 * brightmult * this.func[x][y] )|0);
if (val < -255) val = -255;
if (val > 255) val = 255;
var col = 0;
if (val < 0) col = -16777216 + rcol * -val;
 else col = -16777216 + gcol * val;
var costh2 = this.cosTable[x];
var sinth2 = this.sinTable[x];
this.xpoints[1] = ((cx + r1 * costh2)|0);
this.ypoints[1] = ((cy - r1 * sinth2)|0);
this.xpoints[2] = ((cx + r2 * costh2)|0);
this.ypoints[2] = ((cy - r2 * sinth2)|0);
this.fillTriangle$com_falstad_CircOscFrame_View$I$I$I$I$I$I$I(this.view2d, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2], col);
this.fillTriangle$com_falstad_CircOscFrame_View$I$I$I$I$I$I$I(this.view2d, this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
this.xpoints[0] = this.xpoints[1];
this.ypoints[0] = this.ypoints[1];
this.xpoints[3] = this.xpoints[2];
this.ypoints[3] = this.ypoints[2];
}
}
if (this.view2d.imageSource != null ) this.view2d.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.view2d.memimage, this.view2d.x, this.view2d.y, null);
g.setColor$java_awt_Color((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(this.view2d.x, this.view2d.y, this.view2d.width, this.view2d.height);
}if (this.viewFreq != null ) {
var termWidth = this.getTermWidth();
g.setColor$java_awt_Color((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).white);
for (i = 0; i <= this.maxDispRModes; i++) {
x = i * termWidth;
g.drawLine$I$I$I$I(this.viewFreq.x, x + this.viewFreq.y, this.viewFreq.x + termWidth * this.maxDispThModes, x + this.viewFreq.y);
}
for (i = 0; i <= this.maxDispThModes; i++) {
x = i * termWidth;
g.drawLine$I$I$I$I(this.viewFreq.x + x, this.viewFreq.y, this.viewFreq.x + x, this.viewFreq.y + termWidth * this.maxDispRModes);
}
var rcol = 65536;
var gcol = 256;
for (i = 0; i != this.maxDispThModes; i++) for (j = 0; j != this.maxDispRModes; j++) {
x = this.viewFreq.x + i * termWidth;
y = this.viewFreq.y + j * termWidth;
var val = this.logcoef$D(this.magcoef[i][j]);
if (val < -255) val = -255;
if (val > 255) val = 255;
if (val < 0) g.setColor$java_awt_Color(Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).c$$I,[-16777216 + rcol * -val]));
 else g.setColor$java_awt_Color(Clazz.new_((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).c$$I,[-16777216 + gcol * val]));
g.fillRect$I$I$I$I(x + 1, y + 1, termWidth - 1, termWidth - 1);
var phx = ((this.phasecoefadj[i][j] * termWidth * 0.15915494309189535 )|0);
if (phx > 0) {
g.setColor$java_awt_Color((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(x + phx, y + 1, x + phx, y + termWidth);
}if (this.selectedCoefX != -1 && this.omega[this.selectedCoefX][this.selectedCoefY] == this.omega[i][j]  ) {
g.setColor$java_awt_Color((I$[10]||(I$[10]=Clazz.load('java.awt.Color'))).yellow);
g.drawRect$I$I$I$I(x, y, termWidth, termWidth);
}}

}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (this.dragStop) allQuiet = true;
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'computeColor$I$I$D', function (x, y, c) {
var h = this.func[x][y];
if (!this.colorCheck.getState()) {
h = 0;
if (this.display2Chooser.getSelectedIndex() != 0) return -1;
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
var ri = (((c * redness + gray * grayness) * 255)|0);
var gi = (((c * grnness + gray * grayness) * 255)|0);
var bi = (((gray * grayness) * 255)|0);
return -16777216 | (ri << 16) | (gi << 8) | bi ;
});

Clazz.newMeth(C$, 'genFunc', function () {
var i;
var j;
var th;
var r;
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
for (r = 0; r <= this.sampleCountR; r++) {
for (i = 0; i != wc; i++) this.xformbuf[i] = 0;

var d0 = 0;
for (j = 0; j != this.modeCountR; j++) d0 += this.modeFuncsR[j][r] * this.magcoef[0][j] * this.phasecoefcos[0][j] ;

this.xformbuf[0] = d0;
for (i = 1; i < this.modeCountTh; i = i+(2)) {
var dc = 0;
var ds = 0;
var ii = ((i + 1)/2|0);
var i2 = (i/2|0);
for (j = 0; j != this.modeCountR; j++) {
dc += this.modeFuncsTh[i2][j][r] * this.magcoef[i][j] * this.phasecoefcos[i][j] ;
ds += this.modeFuncsTh[i2][j][r] * this.magcoef[i + 1][j] * this.phasecoefcos[i + 1][j] ;
}
this.xformbuf[ii * 2] = 0.5 * dc;
this.xformbuf[wm & (wc - ii * 2)] = 0.5 * dc;
this.xformbuf[ii * 2 + 1] = -0.5 * ds;
this.xformbuf[wm & (wc - ii * 2 + 1)] = 0.5 * ds;
}
this.fftTh.transform$DA(this.xformbuf);
for (i = 0; i != this.sampleCountTh; i++) this.func[i][r] = this.xformbuf[i * 2];

this.func[this.sampleCountTh][r] = this.func[0][r];
}
});

Clazz.newMeth(C$, 'fillTriangle$com_falstad_CircOscFrame_View$I$I$I$I$I$I$I', function (view, x1, y1, x2, y2, x3, y3, col) {
if (x1 > x2) {
if (x2 > x3) {
var ay = this.interp$I$I$I$I$I(x1, y1, x3, y3, x2);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x3, y3, x2, y2, ay, col);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x1, y1, x2, y2, ay, col);
} else if (x1 > x3) {
var ay = this.interp$I$I$I$I$I(x1, y1, x2, y2, x3);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x2, y2, x3, y3, ay, col);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x1, y1, x3, y3, ay, col);
} else {
var ay = this.interp$I$I$I$I$I(x3, y3, x2, y2, x1);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x2, y2, x1, y1, ay, col);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x3, y3, x1, y1, ay, col);
}} else {
if (x1 > x3) {
var ay = this.interp$I$I$I$I$I(x2, y2, x3, y3, x1);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x3, y3, x1, y1, ay, col);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x2, y2, x1, y1, ay, col);
} else if (x2 > x3) {
var ay = this.interp$I$I$I$I$I(x2, y2, x1, y1, x3);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x1, y1, x3, y3, ay, col);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x2, y2, x3, y3, ay, col);
} else {
var ay = this.interp$I$I$I$I$I(x3, y3, x1, y1, x2);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x1, y1, x2, y2, ay, col);
this.fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I(view, x3, y3, x2, y2, ay, col);
}}});

Clazz.newMeth(C$, 'interp$I$I$I$I$I', function (x1, y1, x2, y2, x) {
if (x1 == x2) return y1;
if (x < x1 && x < x2  || x > x1 && x > x2  ) System.out.print$S("interp out of bounds\u000a");
return ((y1 + (x - x1) * (y2 - y1) / (x2 - x1))|0);
});

Clazz.newMeth(C$, 'fillTriangle1$com_falstad_CircOscFrame_View$I$I$I$I$I$I', function (v, x1, y1, x2, y2, y3, col) {
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

Clazz.newMeth(C$, 'logcoef$D', function (x) {
var ep2 = 0.003;
var sign = (x < 0 ) ? -1 : 1;
x *= sign;
if (x < ep2 ) return 0;
if (this.logep2 == 0 ) this.logep2 = -java.lang.Math.log(2 * ep2);
return ((255 * sign * (java.lang.Math.log(x + ep2) + this.logep2)  / this.logep2)|0);
});

Clazz.newMeth(C$, 'map3d$I$D$D$IA$IA$I', function (th, r, z, xpoints, ypoints, pt) {
z *= -this.scaleHeight;
r *= 16.0 / this.sampleCountR;
var x = r * this.cosTable[th];
var y = r * this.sinTable[th];
var realx = x * this.viewAngleCos + y * this.viewAngleSin;
var realy = z - this.viewHeight;
var realz = y * this.viewAngleCos - x * this.viewAngleSin + this.viewDistance;
xpoints[pt] = this.centerX3d + ((this.scalex * realx / realz)|0);
ypoints[pt] = this.centerY3d - ((this.scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'scaleworld', function () {
this.scalex = this.viewZoom * ((this.view3d.width/4|0)) * this.viewDistance  / 9.0;
this.scaley = -this.scalex;
var y = ((this.scaley * this.viewHeight / this.viewDistance)|0);
this.centerX3d = this.view3d.x + (this.view3d.width/2|0);
this.centerY3d = this.view3d.y + (this.view3d.height/2|0) - y;
});

Clazz.newMeth(C$, 'getTermWidth', function () {
var termWidth1 = (this.viewFreq.width/this.maxDispThModes|0);
var termWidth2 = (this.viewFreq.height/this.maxDispRModes|0);
return (termWidth1 < termWidth2) ? termWidth1 : termWidth2;
});

Clazz.newMeth(C$, 'getDisplayOrder', function () {
var sc2 = this.sampleCountTh * this.sampleCountR;
var disp = Clazz.array(Integer.TYPE, [sc2]);
var dispz = Clazz.array(Double.TYPE, [sc2]);
var i;
for (i = 0; i != sc2; i++) {
disp[i] = i;
var x = i % this.sampleCountTh;
var y = (i/this.sampleCountTh|0);
var th = 2 * this.step * x ;
var xd = y * java.lang.Math.cos(th);
var yd = y * java.lang.Math.sin(th);
dispz[i] = yd * this.viewAngleCos - xd * this.viewAngleSin;
}
this.qsort$IA$DA$I$I(disp, dispz, 0, sc2 - 1);
return disp;
});

Clazz.newMeth(C$, 'qsort$IA$DA$I$I', function (disp, dispz, lo0, hi0) {
var lo = lo0;
var hi = hi0;
if (hi0 > lo0) {
var part = ((lo0 + hi0)/2|0);
var z = dispz[disp[part]];
while (lo <= hi){
while ((lo < hi0) && dispz[disp[lo]] < z  )++lo;

while ((hi > lo0) && dispz[disp[hi]] > z  )--hi;

if (lo <= hi) {
var swap = disp[lo];
disp[lo] = disp[hi];
disp[hi] = swap;
++lo;
--hi;
}}
if (lo0 < hi) this.qsort$IA$DA$I$I(disp, dispz, lo0, hi);
if (lo < hi0) this.qsort$IA$DA$I$I(disp, dispz, lo, hi0);
}});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 3:
this.editMag$I$I(x, y);
break;
case 2:
this.editFunc2D$I$I(x, y);
break;
case 1:
this.editFunc3D$I$I(x, y);
break;
}
});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoefX == -1) return;
var coef = (this.dragStartY - y) / 20.0 + this.magDragStart;
if (coef < -1 ) coef = -1;
if (coef > 1 ) coef = 1;
var pcoef = (x - this.dragStartX) / 10.0;
if (pcoef < 0 ) pcoef = 0;
if (pcoef > 6.283185307179586 ) pcoef = 6.283185307179586;
if (this.magcoef[this.selectedCoefX][this.selectedCoefY] == coef  && this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] == pcoef  ) return;
this.magcoef[this.selectedCoefX][this.selectedCoefY] = coef;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = pcoef;
this.cv.repaint$J(this.pause);
this.needPlay = true;
});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedCoefX == -1) return;
if (this.magDragStart < 0.5 ) this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
 else this.magcoef[this.selectedCoefX][this.selectedCoefY] = 0;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = 0;
this.cv.repaint$J(this.pause);
this.doPlay();
});

Clazz.newMeth(C$, 'editFunc2D$I$I', function (x, y) {
this.findGridPoint2D$I$I(x, y);
this.editingFunc = this.dragStop = true;
if (this.modeChooser.getSelectedIndex() == 1) this.doStrike$D(1);
 else this.doPluck$D(1);
});

Clazz.newMeth(C$, 'editFunc3D$I$I', function (x, y) {
if (this.modeChooser.getSelectedIndex() == 2) {
this.viewAngle = (this.dragStartX - x) / 40.0 + this.viewAngleDragStart;
while (this.viewAngle < 0 )this.viewAngle += 6.283185307179586;

while (this.viewAngle >= 6.283185307179586 )this.viewAngle -= 6.283185307179586;

this.viewAngleCos = java.lang.Math.cos(this.viewAngle);
this.viewAngleSin = java.lang.Math.sin(this.viewAngle);
this.viewHeight = (this.dragStartY - y) / 10.0 + this.viewHeightDragStart;
this.displayOrder = null;
this.cv.repaint$J(this.pause);
return;
}if (this.modeChooser.getSelectedIndex() == 3) {
this.viewZoom = (x - this.dragStartX) / 40.0 + this.viewZoomDragStart;
if (this.viewZoom < 0.1 ) this.viewZoom = 0.1;
this.cv.repaint$J(this.pause);
return;
}var v = 1 + (this.dragStartY - y) / 40.0;
if (v < -1 ) v = -1;
if (v > 1 ) v = 1;
this.editingFunc = this.dragStop = true;
if (this.modeChooser.getSelectedIndex() == 0) {
this.doPluck$D(v);
return;
}this.doStrike$D(v);
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
if (e.getSource() === this.sineButton ) {
this.doSine();
this.cv.repaint();
}if (e.getSource() === this.blankButton ) {
this.doBlank();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.dampingBar  || e.getSource() === this.speedBar  ) this.setDamping();
if (e.getSource() === this.resBar  || e.getSource() === this.phasorBar  ) {
if (this.resBar.getValue() != this.modeCountR) this.setResolution();
this.setMaxDispModes();
this.setupDisplay();
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setMaxDispModes', function () {
this.maxDispRModes = this.phasorBar.getValue();
this.maxDispThModes = this.maxDispRModes * 2 + 1;
if (this.maxDispRModes > this.modeCountR) this.maxDispRModes = this.modeCountR;
if (this.maxDispThModes > this.modeCountTh) this.maxDispThModes = this.modeCountTh;
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
this.sampleCountTh = this.sampleCountTh*(2);
this.cosTable = Clazz.array(Double.TYPE, [this.sampleCountTh + 1]);
this.sinTable = Clazz.array(Double.TYPE, [this.sampleCountTh + 1]);
this.fftTh = Clazz.new_((I$[13]||(I$[13]=Clazz.load('com.falstad.FFT'))).c$$I,[this.sampleCountTh]);
var oldmagcoef = this.magcoef;
this.magcoef = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoef = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoefcos = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.phasecoefadj = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
this.xformbuf = Clazz.array(Double.TYPE, [this.sampleCountTh * 2]);
this.func = Clazz.array(Double.TYPE, [this.sampleCountTh + 1, this.sampleCountR + 1]);
this.funci = Clazz.array(Double.TYPE, [this.sampleCountTh + 1, this.sampleCountR + 1]);
this.scaleHeight = 6;
this.step = 3.141592653589793 / this.sampleCountTh;
this.viewDistance = 50;
this.displayOrder = null;
var m;
var n;
this.omega = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
var angstep = this.step * 2;
for (m = 0; m != this.modeCountTh; m++) for (n = 0; n != this.modeCountR; n++) {
var realm = ((m + 1)/2|0);
this.omega[m][n] = this.zeroj$I$I(realm, n + 1) / this.sampleCountR;
}

var jj = Clazz.array(Double.TYPE, [this.modeCountTh + 1]);
var x;
var y;
this.modeFuncsR = Clazz.array(Float.TYPE, [this.modeCountR, this.sampleCountR + 1]);
this.modeFuncsTh = Clazz.array(Float.TYPE, [(this.modeCountTh/2|0), this.modeCountR, this.sampleCountR + 1]);
System.out.print$S("calc modes...\u000a");
for (n = 0; n != this.modeCountR; n++) {
var max = 0;
for (y = 0; y <= this.sampleCountR; y++) {
if (y == 0) jj[1] = 1;
 else this.bess$I$D$DA(0, y * this.omega[0][n], jj);
var q = this.modeFuncsR[n][y] = jj[1];
if (q > max ) max = q;
if (q < -max ) max = -q;
}
for (y = 0; y <= this.sampleCountR; y++) this.modeFuncsR[n][y] /= max;

}
var m2;
for (m2 = 0; m2 != (this.modeCountTh/2|0); m2++) {
m = m2 * 2 + 1;
var realm = m2 + 1;
for (n = 0; n != this.modeCountR; n++) {
var max = 0;
for (y = 0; y <= this.sampleCountR; y++) {
if (y == 0) jj[realm + 1] = (realm == 0) ? 1 : 0;
 else this.bess$I$D$DA(realm, y * this.omega[m][n], jj);
var q = this.modeFuncsTh[m2][n][y] = jj[realm + 1];
if (q > max ) max = q;
if (q < -max ) max = -q;
}
for (y = 0; y <= this.sampleCountR; y++) this.modeFuncsTh[m2][n][y] /= max;

}
}
var mult = 1 / this.omega[0][0];
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.omega[i][j] *= mult;


if (oldmagcoef != null ) {
for (i = 0; i != oldCountTh && i != this.modeCountTh ; i++) for (j = 0; j != oldCountR && j != this.modeCountR ; j++) this.magcoef[i][j] = oldmagcoef[i][j];


}this.setDamping();
System.out.print$S("calc modes...done\u000a");
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

Clazz.newMeth(C$, 'setDamping', function () {
var i;
var j;
this.dampcoef = Clazz.array(Double.TYPE, [this.modeCountTh, this.modeCountR]);
for (i = 0; i != this.modeCountTh; i++) {
for (j = 0; j != this.modeCountR; j++) {
var damper = this.dampingBar.getValue() / 40.0;
damper = java.lang.Math.exp(damper) - 1;
var damp2 = this.omega[i][j] * java.lang.Math.sqrt(java.lang.Math.sqrt(1 + damper * damper / (this.omega[i][j] * this.omega[i][j])) - 1);
this.dampcoef[i][j] = -damp2 * 0.002;
}
}
});

Clazz.newMeth(C$, 'findGridPoint2D$I$I', function (mx, my) {
var cx = this.view2d.x + (this.view2d.width/2|0);
var cy = this.view2d.y + (this.view2d.height/2|0);
var cr = (this.view2d.width/2|0);
this.selectedGridX = (mx - cx) / cr;
this.selectedGridY = -(my - cy) / cr;
var r = java.lang.Math.sqrt(this.selectedGridX * this.selectedGridX + this.selectedGridY * this.selectedGridY);
if (r > 1 ) {
this.selectedGridX /= r;
this.selectedGridY /= r;
}});

Clazz.newMeth(C$, 'findGridPoint3D$I$I', function (mx, my) {
var x;
var y;
var bestr = 3600;
this.selectedGridX = this.selectedGridY = 0;
for (y = 0; y <= this.sampleCountR; y++) for (x = 0; x <= this.sampleCountTh; x++) {
this.map3d$I$D$D$IA$IA$I(x, y, this.func[x][y], this.xpoints, this.ypoints, 0);
var rx = (this.xpoints[0] - mx);
var ry = (this.ypoints[0] - my);
var r = rx * rx + ry * ry;
if (r < bestr) {
bestr = r;
var th = (x + (this.sampleCountTh/2|0)) * 2 * 3.141592653589793  / this.sampleCountTh - this.viewAngle;
this.selectedGridX = y * java.lang.Math.cos(th) / this.sampleCountR;
this.selectedGridY = y * java.lang.Math.sin(th) / this.sampleCountR;
}}

});

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
this.selection = 0;
if (this.view2d != null  && this.view2d.inside$I$I(x, y) ) this.selection = 2;
 else if (this.view3d != null  && this.view3d.inside$I$I(x, y) ) this.selection = 1;
 else if (this.viewFreq != null  && this.viewFreq.inside$I$I(x, y) ) {
var termWidth = this.getTermWidth();
this.selectedCoefX = ((x - this.viewFreq.x)/termWidth|0);
this.selectedCoefY = ((y - this.viewFreq.y)/termWidth|0);
if (this.selectedCoefX >= this.modeCountTh) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefY >= this.modeCountR) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefX != -1 && this.selectedCoefY != -1 ) this.selection = 3;
}if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (this.selection == 3) this.editMagClick();
if (e.getClickCount() == 2 && this.selectedCoefX != -1 ) {
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (this.selectedCoefX != i || this.selectedCoefY != j ) this.magcoef[i][j] = 0;


this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selectedCoefX != -1 ) {
this.selectedCoefX = this.selectedCoefY = -1;
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.mouseMoved$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) == 0) return;
if (this.selection == 1) this.findGridPoint3D$I$I(e.getX(), e.getY());
this.dragStartX = e.getX();
this.dragStartY = e.getY();
if (this.selectedCoefX != -1) this.magDragStart = this.magcoef[this.selectedCoefX][this.selectedCoefY];
this.viewAngleDragStart = this.viewAngle;
this.viewHeightDragStart = this.viewHeight;
this.viewZoomDragStart = this.viewZoom;
this.dragging = true;
this.needPlay = false;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
if (this.needPlay) this.doPlay();
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
}if (e.getItemSelectable() === this.displayChooser  || e.getItemSelectable() === this.freqCheck  ) {
this.setupDisplay();
this.cv.repaint$J(this.pause);
}if (e.getItemSelectable() === this.display2Chooser  || e.getItemSelectable() === this.colorCheck  ) this.cv.repaint$J(this.pause);
if (e.getItemSelectable() === this.soundCheck ) {
if (this.soundCheck.getState()) {
this.speedBar.setValue$I(250);
this.dampingBar.setValue$I(40);
this.setDamping();
this.baseFreqBar.enable();
this.doPlay();
} else this.baseFreqBar.disable();
}});

Clazz.newMeth(C$, 'getFreq$I', function (n) {
var stepsize = java.lang.Math.log(2) / 12;
var freq = java.lang.Math.exp(this.baseFreqBar.getValue() * stepsize);
return 0;
});

Clazz.newMeth(C$, 'doPlay', function () {
if (!this.soundCheck.getState()) return;
var rate = 22050;
var playSampleCount = 32768;
var b = Clazz.array(Byte.TYPE, [32768]);
var stepsize = Math.log(2) / 12;
var mx = 0.2;
var nmult = 2.849517146113191E-4;
var freq = Math.exp(this.baseFreqBar.getValue() * stepsize);
var n = freq * nmult;
var maxomega = 3.141592653589793 / n;
var failed;
var sndmax = 1.0E-8;
var i;
var j;
var k;
var playfunc = Clazz.array(Double.TYPE, [65536]);
for (j = 0; j < this.modeCountTh; j = j+(2)) for (k = 0; k != this.modeCountR; k++) {
var f = this.omega[j][k] * freq;
if (f < 20  || f > 11025  ) continue;
var dfreq = (((f * 32768.0 / 22050)|0)) * 2;
if (dfreq >= 65536) break;
var mag = this.magcoef[j][k];
if (j > 0) {
var mag2 = this.magcoef[j - 1][k];
mag = Math.sqrt(mag * mag + mag2 * mag2);
}playfunc[dfreq + 1] += mag;
}

if (this.fftPlay == null ) this.fftPlay = Clazz.new_((I$[13]||(I$[13]=Clazz.load('com.falstad.FFT'))).c$$I,[32768]);
this.fftPlay.transform$DA(playfunc);
var damper = this.dampingBar.getValue() * 1.0E-5;
damper = java.lang.Math.exp(damper) - 1;
for (i = 0; i != 32768; i++) {
playfunc[i * 2] *= Math.exp(-damper * i);
var dy = playfunc[i * 2];
if (dy > sndmax ) sndmax = dy;
if (dy < -sndmax ) sndmax = -dy;
}
if (sndmax < 0.01 ) return;
var mult = 127 / sndmax;
for (i = 0; i != 32768; i++) b[i] = (((playfunc[i * 2] * mult)|0)|0);

Clazz.new_((I$[14]||(I$[14]=Clazz.load('javajs.util.JSAudioThread'))).c$$javax_sound_sampled_AudioFormat,[Clazz.new_((I$[15]||(I$[15]=Clazz.load('javax.sound.sampled.AudioFormat'))).c$$F$I$I$Z$Z,[22050, 8, 1, true, true])]).playOnce$BA$I$I(b, 0, b.length);
this.cv.repaint();
});
;
(function(){var C$=Clazz.newClass(P$.CircOscFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pixels = null;
this.imageSource = null;
this.memimage = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$java_awt_Dimension', function (r) {
C$.superclazz.c$$java_awt_Dimension.apply(this, [r]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I', function (a, b, c, d) {
C$.superclazz.c$$I$I$I$I.apply(this, [a, b, c, d]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:01
