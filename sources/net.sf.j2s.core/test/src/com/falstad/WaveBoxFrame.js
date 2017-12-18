(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "WaveBoxFrame", function(){
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
this.imageSource = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.finished = null;
this.useFrame = false;
this.showControls = false;
this.adjustResolution = false;
this.stoppedCheck = null;
this.intensityCheck = null;
this.sidesCheck = null;
this.modeChooser = null;
this.sliceChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.brightnessBar = null;
this.freqBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.aux3Bar = null;
this.sampleBar = null;
this.auxBars = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.dragZoomStart = 0;
this.zoom = 0;
this.rotmatrix = null;
this.view3d = null;
this.colorMult = 0;
this.xpoints = null;
this.ypoints = null;
this.spectrum = null;
this.func = null;
this.boxwidth = 0;
this.boxheight = 0;
this.resadj = 0;
this.dragging = false;
this.pixels = null;
this.maxTerms = 0;
this.pause = 0;
this.selection = 0;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.sliceFaceCount = 0;
this.sliceval = 0;
this.sampleCount = 0;
this.sampleMult = null;
this.selectedSlice = false;
this.needsPrecompute = false;
this.magDragStart = 0;
this.cost1 = 0;
this.cost2 = 0;
this.sint1 = 0;
this.sint2 = 0;
this.dragX = 0;
this.dragY = 0;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.logep2 = 0;
this.resBarValue = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.adjustResolution = true;
this.zoom = 7.5;
this.boxwidth = 2;
this.boxheight = 2;
this.dragging = false;
this.maxTerms = 16;
this.selection = -1;
this.sliceval = 0;
this.sampleCount = 15;
this.t = 0;
this.useBufferedImage = false;
this.shown = false;
this.logep2 = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "WaveBox by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_WaveBox', function (a) {
C$.superclazz.c$$S.apply(this, ["3D Wave Applet v1.5a"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, 1);

Clazz.newMeth(C$, 'initFrame', function () {
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
if (this.useFrame) {
this.main = this;
} else this.main = this.applet;
this.setupList = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').SingleSourceSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[17]||(I$[17]=Clazz.load('com.falstad.WaveBoxLayout')))));
this.cv = Clazz.new_((I$[18]||(I$[18]=Clazz.load('com.falstad.WaveBoxCanvas'))).c$$com_falstad_WaveBoxFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.cv);
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Setup:", 0]));
this.setupChooser = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S((this.setupList.elementAt$I(i)).getName());

if (this.showControls) this.main.add$java_awt_Component(this.setupChooser);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.setup = this.setupList.elementAt$I(2);
this.setupChooser.select$I(2);
this.stoppedCheck = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.stoppedCheck);
this.intensityCheck = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Checkbox'))).c$$S,["Show Intensity"]);
this.intensityCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.intensityCheck);
this.sidesCheck = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Checkbox'))).c$$S,["Show Sides"]);
this.sidesCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.sidesCheck);
this.modeChooser = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust Angle");
this.modeChooser.add$S("Mouse = Adjust Zoom");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.modeChooser);
this.sliceChooser = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Choice'))));
this.sliceChooser.add$S("No Slicing");
this.sliceChooser.add$S("Show X Slice");
this.sliceChooser.add$S("Show Y Slice");
this.sliceChooser.add$S("Show Z Slice");
this.sliceChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.sliceChooser);
if (this.showControls) {
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 15, 1, 1, 200]));
}this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) {
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 240, 1, 1, 2000]));
}this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) {
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.main.add$java_awt_Component(this.resolutionBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 100, 2, 20, 240]));
}this.resolutionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) {
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Frequency", 0]));
this.main.add$java_awt_Component(this.freqBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 24, 1, 5, 60]));
}this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
var lb;
this.auxBars = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').AuxBar))), [3]);
lb = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 1", 0]);
if (this.showControls) {
this.main.add$java_awt_Component(lb);
this.main.add$java_awt_Component(this.aux1Bar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 0, 100]));
}this.aux1Bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxBars[0] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').AuxBar))).c$$a2s_Label$a2s_Scrollbar, [this, null, lb, this.aux1Bar]);
lb = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 2", 0]);
if (this.showControls) {
this.main.add$java_awt_Component(lb);
this.main.add$java_awt_Component(this.aux2Bar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 0, 1, 0, 100]));
}this.aux2Bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxBars[1] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').AuxBar))).c$$a2s_Label$a2s_Scrollbar, [this, null, lb, this.aux2Bar]);
if (this.showControls) {
this.main.add$java_awt_Component(lb = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 3", 0]));
this.main.add$java_awt_Component(this.aux3Bar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 0, 1, 0, 100]));
}this.aux3Bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxBars[2] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').AuxBar))).c$$a2s_Label$a2s_Scrollbar, [this, null, lb, this.aux3Bar]);
this.hideBars();
this.main.add$java_awt_Component(Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
try {
var param;
param = this.applet.getParameter$S("setup");
if (param != null ) this.setupChooser.select$I(Integer.parseInt(param));
param = this.applet.getParameter$S("setupClass");
if (param != null ) {
for (i = 0; i != this.setupList.size(); i++) {
if (this.setupList.elementAt$I(i).getClass().getName().equalsIgnoreCase$S("RippleFrame$" + param)) break;
}
if (i != this.setupList.size()) this.setupChooser.select$I(i);
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
if (this.applet != null ) e.printStackTrace();
} else {
throw e;
}
}
this.slicerPoints = Clazz.array(Integer.TYPE, [2, 10]);
this.sliceFaces = Clazz.array(Double.TYPE, [4, 3]);
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.setupSimpson();
this.setup.select();
this.random = Clazz.new_((I$[24]||(I$[24]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[25]||(I$[25]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[25]||(I$[25]=Clazz.load('java.awt.Color'))).white);
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
}this.main.requestFocus();
});

Clazz.newMeth(C$, 'setupSimpson', function () {
this.sampleCount = 23;
this.sampleMult = Clazz.array(Integer.TYPE, [this.sampleCount]);
var i;
for (i = 1; i < this.sampleCount; i = i+(2)) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[this.sampleCount - 1] = 1;
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
if (this.winSize.width == 0 || this.winSize.height <= 0 ) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
this.setupDisplay();
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz.forName("java.awt.image.BufferedImage");
var dbiclass = Clazz.forName("java.awt.image.DataBufferInt");
var rasclass = Clazz.forName("java.awt.image.Raster");
var cstr = biclass.getConstructor$ClassA(Clazz.array(java.lang.Class, -1, [Integer.TYPE, Integer.TYPE, Integer.TYPE]));
this.memimage = cstr.newInstance$OA(Clazz.array(java.lang.Object, -1, [ new Integer(this.view3d.width),  new Integer(this.view3d.height),  new Integer(1)]));
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
this.pixels = Clazz.array(Integer.TYPE, [this.view3d.width * this.view3d.height]);
var i;
for (i = 0; i != this.view3d.width * this.view3d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[26]||(I$[26]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[this.view3d.width, this.view3d.height, this.pixels, 0, this.view3d.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.memimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}});

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

Clazz.newMeth(C$, 'setMaxTerms', function () {
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue() & -2);
this.maxTerms = this.gridSizeX;
this.resadj = 50.0 / this.maxTerms;
this.needsPrecompute = true;
});

Clazz.newMeth(C$, 'setupBar$I$S$I', function (n, text, val) {
this.auxBars[n].label.setText$S(text);
this.auxBars[n].label.setVisible$Z(true);
this.auxBars[n].bar.setValue$I(val);
this.auxBars[n].bar.setVisible$Z(true);
});

Clazz.newMeth(C$, 'setupDisplay', function () {
this.view3d = Clazz.new_((I$[27]||(I$[27]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, 0, this.winSize.width, this.winSize.height]);
});

Clazz.newMeth(C$, 'computeFunction', function () {
var i;
var j;
var q = 3.14159265 / this.maxTerms;
this.cost1 = Math.cos(this.t);
this.sint1 = Math.sin(this.t);
this.cost2 = Math.cos(this.t + this.setup.getPhaseShift());
this.sint2 = Math.sin(this.t + this.setup.getPhaseShift());
var shiftcos = Math.cos(this.setup.getPhaseShift());
var shiftsin = Math.sin(this.setup.getPhaseShift());
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var boxhalfwidth = this.boxwidth / 2;
var boxhalfheight = this.boxheight / 2;
var aratio = this.view3d.width / this.view3d.height;
var xmult = this.maxTerms / this.boxwidth;
var ymult = this.maxTerms / this.boxheight;
var zmult = this.maxTerms / 2.0;
var intensity = this.intensityCheck.getState();
var aratiox = izoom;
var aratioy = izoom;
if (aratio < 1 ) aratioy /= aratio;
 else aratiox *= aratio;
var slice = this.sliceChooser.getSelectedIndex();
if (this.sidesCheck.getState()) slice = 0;
var bmult = (intensity) ? 20 : 1;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = (2 * j / this.gridSizeY - 1) * aratioy;
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
var tx1 = (-boxhalfwidth - camx) / camvx;
var tx2 = (boxhalfwidth - camx) / camvx;
var ty1 = (-boxhalfheight - camy) / camvy;
var ty2 = (boxhalfheight - camy) / camvy;
var tz1 = (-1 - camz) / camvz;
var tz2 = (1 - camz) / camvz;
var mint = this.max$D$D(this.min$D$D(tx1, tx2), this.max$D$D(this.min$D$D(ty1, ty2), this.min$D$D(tz1, tz2))) + 0.001;
var maxt = this.min$D$D(this.max$D$D(tx1, tx2), this.min$D$D(this.max$D$D(ty1, ty2), this.max$D$D(tz1, tz2))) - 0.001;
if (maxt < mint ) {
this.fillSquare$I$I$D$D$D(i, j, 0, 0, 0);
continue;
}if (slice != 0) {
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
this.fillSquare$I$I$D$D$D(i, j, 0, 0, 0);
continue;
}mint = maxt = t;
}var tstep = (maxt - mint) / (this.sampleCount - 1);
var pathlen = (maxt - mint) * camnorm;
var maxn = this.sampleCount;
if (this.sidesCheck.getState()) {
maxn = 1;
pathlen = 5;
} else if (slice != 0) {
maxn = 1;
pathlen = 2;
}var xx = (camx + camvx * mint + boxhalfwidth) * xmult;
var yy = (camy + camvy * mint + boxhalfheight) * ymult;
var zz = (camz + camvz * mint + 1) * zmult;
camvx *= tstep * xmult;
camvy *= tstep * ymult;
camvz *= tstep * zmult;
for (n = 0; n < maxn; n++) {
var xxi = Double.isNaN(xx) ? 0 : (xx|0);
var yyi = Double.isNaN(yy) ? 0 : (yy|0);
var zzi = Double.isNaN(zz) ? 0 : (zz|0);
var f = 0;
if (intensity) {
this.cost1 = 1;
this.sint1 = 0;
this.cost2 = shiftcos;
this.sint2 = shiftsin;
var a = this.setup.computePoint$I$I$I(xxi, yyi, zzi);
this.cost1 = 0;
this.sint1 = 1;
this.cost2 = -shiftsin;
this.sint2 = shiftcos;
var b = this.setup.computePoint$I$I$I(xxi, yyi, zzi);
f = a * a + b * b;
} else f = this.setup.computePoint$I$I$I(xxi, yyi, zzi);
if (f < 0 ) {
simpr -= this.sampleMult[n] * f;
} else simpg += this.sampleMult[n] * f;
xx += camvx;
yy += camvy;
zz += camvz;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
this.fillSquare$I$I$D$D$D(i, j, simpr * bmult, simpg * bmult, 0);
}

});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'updateWaveBox$java_awt_Graphics', function (realg) {
if (this.dbimage == null ) return;
var g = null;
if (this.winSize == null  || this.winSize.width == 0 ) return;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var allQuiet = false;
if (!this.stoppedCheck.getState()) {
var sysTime = System.currentTimeMillis();
var tadd = 0;
if (this.lastTime != 0) {
var val = this.speedBar.getValue();
tadd = val * (sysTime - this.lastTime) * 3.0E-4 ;
this.t += tadd;
}this.lastTime = sysTime;
} else {
this.lastTime = 0;
allQuiet = true;
}if (this.intensityCheck.getState()) allQuiet = true;
this.colorMult = this.brightnessBar.getValue() * 5;
if (this.needsPrecompute) {
this.setup.precompute();
this.needsPrecompute = false;
}this.computeFunction();
var i;
var j;
var k;
var sliced = this.sliceChooser.getSelectedIndex() != 0;
if (this.imageSource != null ) this.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.memimage, this.view3d.x, this.view3d.y, null);
g.setColor$java_awt_Color((I$[25]||(I$[25]=Clazz.load('java.awt.Color'))).white);
this.drawCube$java_awt_Graphics$Z(g, false);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'visibleFace$I$I$I', function (nx, ny, nz) {
var viewx = C$.viewDistance * this.rotmatrix[2];
var viewy = C$.viewDistance * this.rotmatrix[5];
var viewz = C$.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0 ;
});

Clazz.newMeth(C$, 'fillSquare$I$I$D$D$D', function (i, j, cr, cg, cb) {
var winw = this.view3d.width;
var winh = this.view3d.height;
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
var y2l = y2 * this.view3d.width;
for (k = x; k < x2; k++) for (l = y * this.view3d.width; l < y2l; l = l+(this.view3d.width)) this.pixels[k + l] = -16777216;


return;
}var fm = this.max$D$D(cr, this.max$D$D(cg, cb));
if (fm > 255 ) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = -16777216 + (((cr|0)) << 16) | (((cg|0)) << 8) | (((cb|0)));
var y2l = y2 * this.view3d.width;
for (k = x; k < x2; k++) for (l = y * this.view3d.width; l < y2l; l = l+(this.view3d.width)) this.pixels[k + l] = colval;


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
this.map3d$D$D$D$IA$IA$I(pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n);
}
g.setColor$java_awt_Color((I$[25]||(I$[25]=Clazz.load('java.awt.Color'))).gray);
g.drawPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
if (slice != 0 && (i/2|0) != slice - 1 ) {
if (this.selectedSlice) g.setColor$java_awt_Color((I$[25]||(I$[25]=Clazz.load('java.awt.Color'))).yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace$I$I$DA(i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp);
this.computeFace$I$I$DA(i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1);
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

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I', function (x, y, z, xpoints, ypoints, pt) {
x *= this.boxwidth / 2;
y *= this.boxheight / 2;
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = C$.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = this.view3d.width * this.zoom / 2;
var scaley = this.view3d.height * this.zoom / 2;
var aratio = this.view3d.width / this.view3d.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = (this.view3d.width/2|0) + ((scalex * realx / realz)|0);
ypoints[pt] = (this.view3d.height/2|0) + ((scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'unmap3d$DA$I$I$DA$DA', function (x3, x, y, pn, pp) {
var scalex = this.view3d.width * this.zoom / 2;
var scaley = this.view3d.height * this.zoom / 2;
var aratio = this.view3d.width / this.view3d.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - ((this.view3d.width/2|0))) / scalex;
var vy = (y - ((this.view3d.height/2|0))) / scaley;
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

Clazz.newMeth(C$, 'logcoef$D', function (x) {
var ep2 = 0.003;
var sign = (x < 0 ) ? -1 : 1;
x *= sign;
if (x < ep2 ) return 0;
if (this.logep2 == 0 ) this.logep2 = -Math.log(2 * ep2);
return ((255 * sign * (Math.log(x + ep2) + this.logep2)  / this.logep2)|0);
});

Clazz.newMeth(C$, 'getColorValue$I$I$I', function (i, j, k) {
var val = ((this.func[i][j][k] * this.colorMult)|0);
if (val > 255) val = 255;
return val;
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
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.freqBar  || e.getSource() === this.aux1Bar   || e.getSource() === this.aux2Bar   || e.getSource() === this.aux3Bar  ) this.needsPrecompute = true;
if (e.getSource() === this.resolutionBar  && this.resolutionBar.getValue() != this.resBarValue ) {
this.setMaxTerms();
this.resBarValue = this.resolutionBar.getValue();
}this.setupSimpson();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX();
this.dragY = e.getY();
this.edit$java_awt_event_MouseEvent(e);
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
this.checkSlice$I$I(e.getX(), e.getY());
if ((e.getModifiers() & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
}return;
}});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.oldDragX = this.dragStartX = e.getX();
this.oldDragY = this.dragStartY = e.getY();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.dragging) this.cv.repaint();
this.dragging = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.setupChooser ) {
if (this.sliceChooser == null ) return;
this.sliceChooser.select$I(0);
this.setup.deselect();
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.hideBars();
this.setup.select();
this.setup.precompute();
this.validate();
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'hideBars', function () {
var i;
for (i = 0; i != 3; i++) {
this.auxBars[i].label.setVisible$Z(false);
this.auxBars[i].bar.setVisible$Z(false);
}
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
this.edit3d$I$I(x, y);
});

Clazz.newMeth(C$, 'edit3d$I$I', function (x, y) {
var mode = this.modeChooser.getSelectedIndex();
if (this.selectedSlice) mode = 2;
if (mode == 0) {
var xo = this.oldDragX - x;
var yo = this.oldDragY - y;
this.rotate$D$D(xo / 40.0, yo / 40.0);
this.cv.repaint$J(this.pause);
} else if (mode == 1) {
var xo = x - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.0;
if (this.zoom < 0.1 ) this.zoom = 0.1;
this.cv.repaint$J(this.pause);
} else if (mode == 2) {
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

Clazz.newMeth(C$, 'bessj0$D', function (x) {
var ax = x;
var z;
var xx;
var y;
var ans;
var ans1;
var ans2;
if (x < 8.0 ) {
y = x * x;
ans1 = 5.7568490574E10 + y * (-1.3362590354E10 + y * (6.516196407E8 + y * (-1.121442418E7 + y * (77392.33017 + y * -184.9052456))));
ans2 = 5.7568490411E10 + y * (1.029532985E9 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y * 1.0))));
ans = ans1 / ans2;
} else {
z = 8.0 / ax;
y = z * z;
xx = ax - 0.785398164;
ans1 = 1.0 + y * (-0.001098628627 + y * (2.734510407E-5 + y * (-2.073370639E-6 + y * 2.093887211E-7)));
ans2 = -0.01562499995 + y * (1.430488765E-4 + y * (-6.911147651E-6 + y * (7.621095161E-7 - y * 9.34935152E-8)));
ans = Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * ans1 - z * Math.sin(xx) * ans2 );
}return ans;
});

Clazz.newMeth(C$, 'bessy0$D', function (x) {
var z;
var xx;
var y;
var ans;
var ans1;
var ans2;
if (x < 8.0 ) {
y = x * x;
ans1 = -2.957821389E9 + y * (7.062834065E9 + y * (-5.123598036E8 + y * (1.087988129E7 + y * (-86327.92757 + y * 228.4622733))));
ans2 = 4.0076544269E10 + y * (7.452499648E8 + y * (7189466.438 + y * (47447.2647 + y * (226.1030244 + y * 1.0))));
ans = (ans1 / ans2) + 0.636619772 * this.bessj0$D(x) * Math.log(x) ;
} else {
z = 8.0 / x;
y = z * z;
xx = x - 0.785398164;
ans1 = 1.0 + y * (-0.001098628627 + y * (2.734510407E-5 + y * (-2.073370639E-6 + y * 2.093887211E-7)));
ans2 = -0.01562499995 + y * (1.430488765E-4 + y * (-6.911147651E-6 + y * (7.621095161E-7 + y * -9.34945152E-8)));
ans = Math.sqrt(0.636619772 / x) * (Math.sin(xx) * ans1 + z * Math.cos(xx) * ans2 );
}return ans;
});
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "AuxBar", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.bar = null;
this.label = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$a2s_Label$a2s_Scrollbar', function (l, b) {
C$.$init$.apply(this);
this.label = l;
this.bar = b;
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'precompute', function () {
});

Clazz.newMeth(C$, 'deselect', function () {
});

Clazz.newMeth(C$, 'getPhaseShift', function () {
return 0;
});

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "SingleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.mxhalf = 0;
this.mxlast = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "point source";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
var maxdist = 0;
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
this.dataxy = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var distmult = 4;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var xi = x - this.mxhalf;
var yi = y - this.mxhalf;
this.dataxy[x][y] = ((distmult * Math.sqrt(xi * xi + yi * yi) + 0.5)|0);
if (this.dataxy[x][y] > maxdist) maxdist = this.dataxy[x][y];
}

this.datadzr = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datadzi = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) for (y = 0; y <= maxdist; y++) {
var xi = x - this.mxhalf;
var r = Math.sqrt((y * y/(distmult * distmult)|0) + xi * xi) * this.b$['com.falstad.WaveBoxFrame'].resadj + 1.0E-8;
this.datadzr[y][x] = Math.cos(r * mult) / r;
this.datadzi[y][x] = -Math.sin(r * mult) / r;
}

});

Clazz.newMeth(C$, 'deselect', function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var d = this.dataxy[x][y];
return this.datadzr[d][z] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datadzi[d][z] * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').PinholeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "PinholeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.mxhalf = 0;
this.mxlast = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "pinhole";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
var maxdist = 0;
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
this.dataxy = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var distmult = 4;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var xi = x - this.mxhalf;
var yi = y - this.mxhalf;
this.dataxy[x][y] = ((distmult * Math.sqrt(xi * xi + yi * yi) + 0.5)|0);
if (this.dataxy[x][y] > maxdist) maxdist = this.dataxy[x][y];
}

this.datadzr = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datadzi = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) for (y = 0; y <= maxdist; y++) {
var r = Math.sqrt((y * y/(distmult * distmult)|0) + x * x) * this.b$['com.falstad.WaveBoxFrame'].resadj + 1.0E-8;
this.datadzr[y][x] = Math.cos(r * mult) / r;
this.datadzi[y][x] = -Math.sin(r * mult) / r;
}

});

Clazz.newMeth(C$, 'deselect', function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var d = this.dataxy[x][y];
return this.datadzr[d][z] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datadzi[d][z] * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').TwoSourcesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "TwoSourcesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.w1mult = null;
this.w2mult = null;
this.mxhalf = 0;
this.mxlast = 0;
this.dipole = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 point sources";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source Separation", 30);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(1, "Phase Difference", 0);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(2, "Balance", 50);
this.dipole = false;
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.dataxy = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var distmult = 4;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
var maxdist = 0;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf + sep + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var yi = y - this.mxhalf + 0.001;
this.dataxy[x][y] = ((distmult * Math.sqrt(xi * xi + yi * yi) + 0.5)|0);
if (this.dataxy[x][y] > maxdist) maxdist = this.dataxy[x][y];
}
}
this.datadzr = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datadzi = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
for (z = 0; z != this.b$['com.falstad.WaveBoxFrame'].maxTerms; z++) for (y = 0; y <= maxdist; y++) {
var zi = z - this.mxhalf;
var r = Math.sqrt((y * y/(distmult * distmult)|0) + zi * zi) * this.b$['com.falstad.WaveBoxFrame'].resadj + 1.0E-7;
this.datadzr[y][z] = Math.cos(r * mult) / r;
this.datadzi[y][z] = -Math.sin(r * mult) / r;
}

this.w1mult = (this.dipole) ? 0.5 : this.b$['com.falstad.WaveBoxFrame'].aux3Bar.getValue() / 100.0;
this.w2mult = 1 - this.w1mult;
});

Clazz.newMeth(C$, 'getPhaseShift', function () {
return (this.dipole) ? 3.141592653589793 : this.b$['com.falstad.WaveBoxFrame'].aux2Bar.getValue() * 3.141592653589793 / 50.0;
});

Clazz.newMeth(C$, 'deselect', function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var d1 = this.dataxy[x][y];
var d2 = this.dataxy[this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1 - x ][y];
return this.w1mult * (this.datadzr[d1][z] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datadzi[d1][z] * this.b$['com.falstad.WaveBoxFrame'].sint1) + this.w2mult * (this.datadzr[d2][z] * this.b$['com.falstad.WaveBoxFrame'].cost2 - this.datadzi[d2][z] * this.b$['com.falstad.WaveBoxFrame'].sint2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').DipoleSourceSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "DipoleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.TwoSourcesSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dipole source";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source Separation", 8);
this.dipole = true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').LateralQuadrupoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "LateralQuadrupoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.w1mult = null;
this.mxhalf = 0;
this.mxlast = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "lateral quadrupole";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source Separation", 20);
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.dataxy = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var distmult = 4;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
var maxdist = 0;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf + sep + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var yi = y - this.mxhalf + 0.001;
this.dataxy[x][y] = ((distmult * Math.sqrt(xi * xi + yi * yi) + 0.5)|0);
if (this.dataxy[x][y] > maxdist) maxdist = this.dataxy[x][y];
}
}
this.datadzr = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datadzi = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
for (z = 0; z != this.b$['com.falstad.WaveBoxFrame'].maxTerms; z++) for (y = 0; y <= maxdist; y++) {
var zi = z - this.mxhalf;
var r = Math.sqrt((y * y/(distmult * distmult)|0) + zi * zi) * this.b$['com.falstad.WaveBoxFrame'].resadj + 1.0E-7;
this.datadzr[y][z] = 0.25 * Math.cos(r * mult) / r;
this.datadzi[y][z] = -0.25 * Math.sin(r * mult) / r;
}

});

Clazz.newMeth(C$, 'deselect', function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var d1 = this.dataxy[x][y];
var d2 = this.dataxy[this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1 - x ][y];
var d3 = this.dataxy[y][x];
var d4 = this.dataxy[this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1 - y ][x];
return (this.datadzr[d1][z] + this.datadzr[d2][z] - this.datadzr[d3][z] - this.datadzr[d4][z]) * this.b$['com.falstad.WaveBoxFrame'].cost1 - (this.datadzi[d1][z] + this.datadzi[d2][z] - this.datadzi[d3][z] - this.datadzi[d4][z]) * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').LinearQuadrupoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "LinearQuadrupoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataxy1 = null;
this.dataxy2 = null;
this.datadzr = null;
this.datadzi = null;
this.mxhalf = 0;
this.mxlast = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear quadrupole";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source Separation", 20);
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
this.dataxy1 = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.dataxy2 = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var distmult = 4;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
var maxdist = 0;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi1 = x - this.mxhalf + sep + 0.001;
var xi2 = x - this.mxhalf + sep / 2 + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var yi = y - this.mxhalf + 0.001;
this.dataxy1[x][y] = ((distmult * Math.sqrt(xi1 * xi1 + yi * yi) + 0.5)|0);
this.dataxy2[x][y] = ((distmult * Math.sqrt(xi2 * xi2 + yi * yi) + 0.5)|0);
if (this.dataxy1[x][y] > maxdist) maxdist = this.dataxy1[x][y];
if (this.dataxy2[x][y] > maxdist) maxdist = this.dataxy2[x][y];
}
}
this.datadzr = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datadzi = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
for (z = 0; z != this.b$['com.falstad.WaveBoxFrame'].maxTerms; z++) for (y = 0; y <= maxdist; y++) {
var zi = z - this.mxhalf;
var r = Math.sqrt((y * y/(distmult * distmult)|0) + zi * zi) * this.b$['com.falstad.WaveBoxFrame'].resadj + 1.0E-7;
this.datadzr[y][z] = 0.25 * Math.cos(r * mult) / r;
this.datadzi[y][z] = -0.25 * Math.sin(r * mult) / r;
}

});

Clazz.newMeth(C$, 'deselect', function () {
this.dataxy1 = this.dataxy2 = null;
this.datadzr = this.datadzi = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var d1 = this.dataxy1[x][y];
var d2 = this.dataxy2[x][y];
var d3 = this.dataxy1[this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1 - x ][y];
var d4 = this.dataxy2[this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1 - x ][y];
return (this.datadzr[d1][z] - this.datadzr[d2][z] + this.datadzr[d3][z] - this.datadzr[d4][z]) * this.b$['com.falstad.WaveBoxFrame'].cost1 - (this.datadzi[d1][z] - this.datadzi[d2][z] + this.datadzi[d3][z] - this.datadzi[d4][z]) * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').TwoPinholesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "TwoPinholesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.w1mult = null;
this.w2mult = null;
this.mxhalf = 0;
this.mxlast = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 pinholes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source Separation", 30);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(1, "Phase Difference", 0);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(2, "Balance", 50);
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.dataxy = Clazz.array(Integer.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var distmult = 4;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
var maxdist = 0;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf + sep + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
this.dataxy[x][y] = ((distmult * Math.sqrt(xi * xi + y * y) + 0.5)|0);
if (this.dataxy[x][y] > maxdist) maxdist = this.dataxy[x][y];
}
}
this.datadzr = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datadzi = Clazz.array(Double.TYPE, [maxdist + 1, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
for (z = 0; z != this.b$['com.falstad.WaveBoxFrame'].maxTerms; z++) for (y = 0; y <= maxdist; y++) {
var zi = z - this.mxhalf;
var r = Math.sqrt((y * y/(distmult * distmult)|0) + zi * zi) * this.b$['com.falstad.WaveBoxFrame'].resadj + 1.0E-7;
this.datadzr[y][z] = Math.cos(r * mult) / r;
this.datadzi[y][z] = -Math.sin(r * mult) / r;
}

this.w1mult = this.b$['com.falstad.WaveBoxFrame'].aux3Bar.getValue() / 100.0;
this.w2mult = 1 - this.w1mult;
});

Clazz.newMeth(C$, 'getPhaseShift', function () {
return this.b$['com.falstad.WaveBoxFrame'].aux2Bar.getValue() * 3.141592653589793 / 50.0;
});

Clazz.newMeth(C$, 'deselect', function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var d1 = this.dataxy[x][y];
var d2 = this.dataxy[this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1 - x ][y];
return this.w1mult * (this.datadzr[d1][z] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datadzi[d1][z] * this.b$['com.falstad.WaveBoxFrame'].sint1) + this.w2mult * (this.datadzr[d2][z] * this.b$['com.falstad.WaveBoxFrame'].cost2 - this.datadzi[d2][z] * this.b$['com.falstad.WaveBoxFrame'].sint2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').SingleLineSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "SingleLineSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "single line source";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.datar = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datai = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var yi = y - this.mxhalf + 0.001;
var r = Math.sqrt(xi * xi + yi * yi) * this.b$['com.falstad.WaveBoxFrame'].resadj;
this.datar[x][y] = 0.25 * this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r * mult);
this.datai[x][y] = -0.25 * this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r * mult);
}
}
});

Clazz.newMeth(C$, 'deselect', function () {
this.datar = this.datai = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
return this.datar[x][y] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datai[x][y] * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').SingleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "SingleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "single slit";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.datar = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datai = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var r = Math.sqrt(xi * xi + y * y) * this.b$['com.falstad.WaveBoxFrame'].resadj;
this.datar[x][y] = 0.25 * this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r * mult);
this.datai[x][y] = -0.25 * this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r * mult);
}
}
});

Clazz.newMeth(C$, 'deselect', function () {
this.datar = this.datai = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
return this.datar[x][y] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datai[x][y] * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').DoubleLineSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "DoubleLineSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
this.mxlast = 0;
this.w1mult = 0;
this.w2mult = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 line sources";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source Separation", 30);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(1, "Phase Difference", 0);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(2, "Balance", 50);
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.mxlast = this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1;
this.datar = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datai = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
this.w1mult = this.b$['com.falstad.WaveBoxFrame'].aux3Bar.getValue() / 100.0;
this.w2mult = 1 - this.w1mult;
this.w1mult *= 0.25;
this.w2mult *= 0.25;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf - sep  + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var yi = y - this.mxhalf + 0.001;
var r = Math.sqrt(xi * xi + yi * yi) * this.b$['com.falstad.WaveBoxFrame'].resadj;
this.datar[x][y] = this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r * mult);
this.datai[x][y] = -this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r * mult);
}
}
});

Clazz.newMeth(C$, 'getPhaseShift', function () {
return this.b$['com.falstad.WaveBoxFrame'].aux2Bar.getValue() * 3.141592653589793 / 50.0;
});

Clazz.newMeth(C$, 'deselect', function () {
this.datar = this.datai = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var nx = this.mxlast - x;
return this.w1mult * (this.datar[x][y] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datai[x][y] * this.b$['com.falstad.WaveBoxFrame'].sint1) + this.w2mult * (this.datar[nx][y] * this.b$['com.falstad.WaveBoxFrame'].cost2 - this.datai[nx][y] * this.b$['com.falstad.WaveBoxFrame'].sint2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').DoubleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "DoubleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
this.mxlast = 0;
this.w1mult = 0;
this.w2mult = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "double slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Slit Separation", 30);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(1, "Phase Difference", 0);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(2, "Balance", 50);
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.mxlast = this.b$['com.falstad.WaveBoxFrame'].maxTerms - 1;
this.datar = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datai = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
this.w1mult = this.b$['com.falstad.WaveBoxFrame'].aux3Bar.getValue() / 100.0;
this.w2mult = 1 - this.w1mult;
this.w1mult *= 0.25;
this.w2mult *= 0.25;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi = x - this.mxhalf - sep  + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var r = Math.sqrt(xi * xi + y * y) * this.b$['com.falstad.WaveBoxFrame'].resadj;
this.datar[x][y] = this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r * mult);
this.datai[x][y] = -this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r * mult);
}
}
});

Clazz.newMeth(C$, 'getPhaseShift', function () {
return this.b$['com.falstad.WaveBoxFrame'].aux2Bar.getValue() * 3.141592653589793 / 50.0;
});

Clazz.newMeth(C$, 'deselect', function () {
this.datar = this.datai = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var nx = this.mxlast - x;
return this.w1mult * (this.datar[x][y] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datai[x][y] * this.b$['com.falstad.WaveBoxFrame'].sint1) + this.w2mult * (this.datar[nx][y] * this.b$['com.falstad.WaveBoxFrame'].cost2 - this.datai[nx][y] * this.b$['com.falstad.WaveBoxFrame'].sint2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').TripleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "TripleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "triple slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Slit Separation", 30);
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mxhalf = (this.b$['com.falstad.WaveBoxFrame'].maxTerms/2|0);
this.datar = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
this.datai = Clazz.array(Double.TYPE, [this.b$['com.falstad.WaveBoxFrame'].maxTerms, this.b$['com.falstad.WaveBoxFrame'].maxTerms]);
var mult = this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var sep = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() / 3.0 / this.b$['com.falstad.WaveBoxFrame'].resadj ;
var m = 0.08333333333333333;
for (x = 0; x != this.b$['com.falstad.WaveBoxFrame'].maxTerms; x++) {
var xi1 = x - this.mxhalf - sep  + 0.001;
var xi2 = x - this.mxhalf + sep + 0.001;
var xi3 = x - this.mxhalf + 0.001;
for (y = 0; y != this.b$['com.falstad.WaveBoxFrame'].maxTerms; y++) {
var r1 = Math.sqrt(xi1 * xi1 + y * y) * this.b$['com.falstad.WaveBoxFrame'].resadj;
var r2 = Math.sqrt(xi2 * xi2 + y * y) * this.b$['com.falstad.WaveBoxFrame'].resadj;
var r3 = Math.sqrt(xi3 * xi3 + y * y) * this.b$['com.falstad.WaveBoxFrame'].resadj;
this.datar[x][y] = m * (this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r1 * mult) + this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r2 * mult) + this.b$['com.falstad.WaveBoxFrame'].bessj0$D(r3 * mult) );
this.datai[x][y] = -m * (this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r1 * mult) + this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r2 * mult) + this.b$['com.falstad.WaveBoxFrame'].bessy0$D(r3 * mult) );
}
}
});

Clazz.newMeth(C$, 'deselect', function () {
this.datar = this.datai = null;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
return this.datar[x][y] * this.b$['com.falstad.WaveBoxFrame'].cost1 - this.datai[x][y] * this.b$['com.falstad.WaveBoxFrame'].sint1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').PlaneWaveSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "PlaneWaveSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mult = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "plane wave";
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.mult = this.b$['com.falstad.WaveBoxFrame'].resadj * this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
});

Clazz.newMeth(C$, 'deselect', function () {
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
return 0.05 * (Math.cos(x * this.mult) * this.b$['com.falstad.WaveBoxFrame'].cost1 + Math.sin(x * this.mult) * this.b$['com.falstad.WaveBoxFrame'].sint1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.WaveBoxFrame').TwoPlaneWavesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.WaveBoxFrame, "TwoPlaneWavesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.WaveBoxFrame','com.falstad.WaveBoxFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.datar = null;
this.datai = null;
this.noz = false;
this.k2x = 0;
this.k2y = 0;
this.k2z = 0;
this.mult = 0;
this.w1mult = 0;
this.w2mult = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 plane waves";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(0, "Source 1 Theta", 25);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(1, "Source 1 Phi", 0);
this.b$['com.falstad.WaveBoxFrame'].setupBar$I$S$I(2, "Balance", 50);
});

Clazz.newMeth(C$, 'precompute', function () {
this.mult = this.b$['com.falstad.WaveBoxFrame'].resadj * this.b$['com.falstad.WaveBoxFrame'].freqBar.getValue() / 50.0;
var ang1 = this.b$['com.falstad.WaveBoxFrame'].aux1Bar.getValue() * 3.141592653589793 / 50;
var ang2 = this.b$['com.falstad.WaveBoxFrame'].aux2Bar.getValue() * 3.141592653589793 / 50;
this.w1mult = this.b$['com.falstad.WaveBoxFrame'].aux3Bar.getValue() / 100.0;
this.w2mult = 1 - this.w1mult;
this.w1mult *= 0.05;
this.w2mult *= 0.05;
var ang1cos = Math.cos(ang1);
var ang1sin = Math.sin(ang1);
var ang2cos = Math.cos(ang2);
var ang2sin = Math.sin(ang2);
this.k2x = ang2cos * ang1cos * this.mult ;
this.k2y = -ang2cos * ang1sin * this.mult ;
this.k2z = -ang2sin * this.mult;
});

Clazz.newMeth(C$, 'computePoint$I$I$I', function (x, y, z) {
var k1 = x * this.mult;
var k2 = x * this.k2x + y * this.k2y + z * this.k2z;
return this.w1mult * (Math.cos(k1) * this.b$['com.falstad.WaveBoxFrame'].cost1 + Math.sin(k1) * this.b$['com.falstad.WaveBoxFrame'].sint1) + this.w2mult * (Math.cos(k2) * this.b$['com.falstad.WaveBoxFrame'].cost2 + Math.sin(k2) * this.b$['com.falstad.WaveBoxFrame'].sint2);
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
