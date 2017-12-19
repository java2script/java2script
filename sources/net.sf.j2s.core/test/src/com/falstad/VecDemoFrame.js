(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "VecDemoFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener', 'com.falstad.DecentScrollbarListener']);
C$.BUILD_E = false;
C$.BUILD_V = false;
C$.frames = 0;
C$.framerate = 0;
C$.firsttime = 0;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.BUILD_E = false;
C$.BUILD_V = true;
C$.frames = 0;
C$.framerate = 0;
C$.firsttime = 0;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.viewMain = null;
this.viewAxes = null;
this.dbimage = null;
this.backimage = null;
this.imageSource = null;
this.pixels = null;
this.applet = null;
this.random = null;
this.cv = null;
this.stoppedCheck = null;
this.resetButton = null;
this.kickButton = null;
this.reverseCheck = null;
this.infoButton = null;
this.functionChooser = null;
this.dispChooser = null;
this.partCountLabel = null;
this.textFieldLabel = null;
this.strengthLabel = null;
this.partCountBar = null;
this.strengthBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.aux3Bar = null;
this.fieldStrength = 0;
this.barFieldStrength = 0;
this.darkYellow = null;
this.lineWidth = 0;
this.auxBars = null;
this.vecDensityLabel = null;
this.vecDensityBar = null;
this.potentialLabel = null;
this.potentialBar = null;
this.lineDensityLabel = null;
this.lineDensityBar = null;
this.modeChooser = null;
this.floorColorChooser = null;
this.floorLineChooser = null;
this.textFields = null;
this.reverse = 0;
this.xpoints = null;
this.ypoints = null;
this.grid = null;
this.particles = null;
this.vectors = null;
this.vecCount = 0;
this.density = null;
this.flatCheck = null;
this.isFlat = false;
this.viewAngle = 0;
this.viewAngleDragStart = 0;
this.viewZoom = 0;
this.viewZoomDragStart = 0;
this.viewAngleCos = 0;
this.viewAngleSin = 0;
this.viewHeight = 0;
this.viewHeightDragStart = 0;
this.viewDistance = 0;
this.integralX = 0;
this.integralY = 0;
this.vectorSpacing = 0;
this.currentStep = 0;
this.showA = false;
this.parseError = false;
this.fieldColors = null;
this.$functionChanged = false;
this.backgroundChanged = false;
this.dragging = false;
this.draggingView = false;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragZoomStart = 0;
this.functionList = null;
this.curfunc = null;
this.pause = 0;
this.useFrame = false;
this.useBufferedImage = false;
this.shown = false;
this.divOffset = 0;
this.divRange = 0;
this.shadowBufferTop = null;
this.shadowBufferBottom = null;
this.shadowBufferTop2 = null;
this.shadowBufferBottom2 = null;
this.floorBrightMult = 0;
this.scalex = 0;
this.scaley = 0;
this.lastTime = 0;
this.timeStep = 0;
this.partMult = 0;
this.slowDragView = false;
this.wooft = 0;
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
this.ls_fieldavg = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.darkYellow = Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I$I$I,[144, 144, 0]);
this.lineWidth = 0.001;
this.viewZoom = 1.6;
this.viewAngleCos = 1;
this.viewAngleSin = 0;
this.viewHeight = 2;
this.viewDistance = 5;
this.integralX = -1;
this.vectorSpacing = 16;
this.pause = 20;
this.useBufferedImage = false;
this.shown = false;
this.floorBrightMult = 2;
this.slowDragView = true;
this.wooft = 0;
this.finished = false;
this.rk_k1 = Clazz.array(Double.TYPE, [6]);
this.rk_k2 = Clazz.array(Double.TYPE, [6]);
this.rk_k3 = Clazz.array(Double.TYPE, [6]);
this.rk_k4 = Clazz.array(Double.TYPE, [6]);
this.rk_yn = Clazz.array(Double.TYPE, [6]);
this.rk_Y = Clazz.array(Double.TYPE, [6]);
this.rk_Yhalf = Clazz.array(Double.TYPE, [6]);
this.rk_oldY = Clazz.array(Double.TYPE, [6]);
this.ls_fieldavg = Clazz.array(Double.TYPE, [3]);
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "VecDemo by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_VecDemo', function (a) {
C$.superclazz.c$$S.apply(this, [C$.BUILD_CASE_EMV$S$S$S("2-D Electrostatic Fields Applet v1.4b", null, "2-D Vector Fields Applet v1.4b")]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'BUILD_CASE_EMV$S$S$S', function (e, m, v) {
return C$.BUILD_V ? v : e;
}, 1);

Clazz.newMeth(C$, 'BUILD_CASE_EMV$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction', function (e, m, v) {
return C$.BUILD_V ? v : e;
}, 1);

Clazz.newMeth(C$, 'initFrame', function () {
this.useFrame = false;
try {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("true") ) this.useFrame = true;
param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
param = this.applet.getParameter$S("mode");
if (param != null  && param.equalsIgnoreCase$S("electric") ) {
C$.BUILD_E = true;
C$.BUILD_V = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.functionList = Clazz.new_((I$[54]||(I$[54]=Clazz.load('java.util.Vector'))));
var vf = Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRadial))), [this, null]);
var ct = 0;
while (vf != null ){
this.functionList.addElement$TE(vf);
vf = vf.createNext();
if (ct == 1000) {
System.out.print$S("setup loop\u000a");
return;
}}
var particleColors = Clazz.array((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))), [27]);
var i;
for (i = 0; i != 27; i++) particleColors[i] = Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I$I$I,[((i % 3) + 1) * 85, (((i/3|0)) % 3 + 1) * 85, (((i/9|0)) % 3 + 1) * 85]);

var main = (this.useFrame) ? this : this.applet;
this.random = Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.util.Random'))));
this.particles = Clazz.array((I$[57]||(I$[57]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Particle))), [2500]);
for (i = 0; i != 2500; i++) {
this.particles[i] = Clazz.new_((I$[57]||(I$[57]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Particle))), [this, null]);
this.particles[i].color = particleColors[i % 27];
}
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.density = Clazz.array(Integer.TYPE, [16, 16]);
main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[58]||(I$[58]=Clazz.load('com.falstad.VecDemoLayout')))));
this.cv = Clazz.new_((I$[59]||(I$[59]=Clazz.load('com.falstad.VecDemoCanvas'))).c$$com_falstad_VecDemoFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
main.add$java_awt_Component(this.cv);
this.functionChooser = Clazz.new_((I$[60]||(I$[60]=Clazz.load('a2s.Choice'))));
for (i = 0; i != this.functionList.size(); i++) this.functionChooser.add$S("Setup: " + (this.functionList.elementAt$I(i)).getName());

main.add$java_awt_Component(this.functionChooser);
this.functionChooser.addItemListener$java_awt_event_ItemListener(this);
this.floorColorChooser = Clazz.new_((I$[60]||(I$[60]=Clazz.load('a2s.Choice'))));
this.floorColorChooser.add$S("Color: field magnitude");
this.floorColorChooser.add$S("Color: potential");
this.floorColorChooser.add$S("Color: none");
if (C$.BUILD_E) this.floorColorChooser.add$S("Color: charge");
 else {
this.floorColorChooser.add$S("Color: divergence");
this.floorColorChooser.add$S("Color: curl z");
}this.floorColorChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.floorColorChooser);
this.floorLineChooser = Clazz.new_((I$[60]||(I$[60]=Clazz.load('a2s.Choice'))));
this.floorLineChooser.add$S("Floor: no lines");
this.floorLineChooser.add$S("Floor: grid");
this.floorLineChooser.add$S("Floor: equipotentials");
if (C$.BUILD_V) this.floorLineChooser.add$S("Floor: streamlines");
 else this.floorLineChooser.add$S("Floor: field lines");
this.floorLineChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.floorLineChooser);
this.floorLineChooser.select$I(2);
this.flatCheck = Clazz.new_((I$[61]||(I$[61]=Clazz.load('a2s.Checkbox'))).c$$S,["Flat View"]);
this.flatCheck.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.flatCheck);
this.dispChooser = Clazz.new_((I$[60]||(I$[60]=Clazz.load('a2s.Choice'))));
this.dispChooser.addItemListener$java_awt_event_ItemListener(this);
this.setupDispChooser$Z(true);
main.add$java_awt_Component(this.dispChooser);
this.modeChooser = Clazz.new_((I$[60]||(I$[60]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust Angle");
this.modeChooser.add$S("Mouse = Adjust Zoom");
this.modeChooser.add$S("Mouse = Line Integral");
this.modeChooser.add$S("Mouse = Surface Integral");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.modeChooser);
this.stoppedCheck = Clazz.new_((I$[61]||(I$[61]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.stoppedCheck);
this.reverseCheck = Clazz.new_((I$[61]||(I$[61]=Clazz.load('a2s.Checkbox'))).c$$S,["Reverse"]);
this.reverseCheck.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.reverseCheck);
this.resetButton = Clazz.new_((I$[62]||(I$[62]=Clazz.load('a2s.Button'))).c$$S,["Reset"]);
main.add$java_awt_Component(this.resetButton);
this.resetButton.addActionListener$java_awt_event_ActionListener(this);
this.kickButton = Clazz.new_((I$[62]||(I$[62]=Clazz.load('a2s.Button'))).c$$S,["Kick"]);
main.add$java_awt_Component(this.kickButton);
this.kickButton.addActionListener$java_awt_event_ActionListener(this);
this.kickButton.disable();
main.add$java_awt_Component(this.strengthLabel = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Field Strength", 0]));
main.add$java_awt_Component(this.strengthBar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 80, 1, 120]));
main.add$java_awt_Component(this.partCountLabel = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Number of Particles", 0]));
main.add$java_awt_Component(this.partCountBar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 500, 1, 2500]));
main.add$java_awt_Component(this.vecDensityLabel = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Vector Density", 0]));
main.add$java_awt_Component(this.vecDensityBar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 32, 2, 64]));
main.add$java_awt_Component(this.potentialLabel = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Potential", 0]));
main.add$java_awt_Component(this.potentialBar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 250, 0, 1000]));
var lb;
this.auxBars = Clazz.array((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').AuxBar))), [3]);
main.add$java_awt_Component(lb = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 1", 0]));
main.add$java_awt_Component(this.aux1Bar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 0, 0, 100]));
this.auxBars[0] = Clazz.new_((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').AuxBar))).c$$a2s_Label$com_falstad_DecentScrollbar, [this, null, lb, this.aux1Bar]);
main.add$java_awt_Component(lb = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 2", 0]));
main.add$java_awt_Component(this.aux2Bar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 0, 0, 100]));
this.auxBars[1] = Clazz.new_((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').AuxBar))).c$$a2s_Label$com_falstad_DecentScrollbar, [this, null, lb, this.aux2Bar]);
main.add$java_awt_Component(lb = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 3", 0]));
main.add$java_awt_Component(this.aux3Bar = Clazz.new_((I$[64]||(I$[64]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 0, 0, 100]));
this.auxBars[2] = Clazz.new_((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').AuxBar))).c$$a2s_Label$com_falstad_DecentScrollbar, [this, null, lb, this.aux3Bar]);
if (C$.BUILD_V) main.add$java_awt_Component(this.textFieldLabel = Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.textFields = Clazz.array((I$[66]||(I$[66]=Clazz.load('a2s.TextField'))), [2]);
for (i = 0; i != 2; i++) {
main.add$java_awt_Component(this.textFields[i] = Clazz.new_((I$[66]||(I$[66]=Clazz.load('a2s.TextField')))));
this.textFields[i].addActionListener$java_awt_event_ActionListener(this);
}
this.fieldColors = Clazz.array((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))), [513]);
var grayLevel = 76;
for (i = 0; i != 256; i++) {
var rb = grayLevel + ((128 - grayLevel) * i/255|0);
var g = grayLevel + ((255 - grayLevel) * i/255|0);
var col = -16777216 | (g << 8) | (rb << 16) | (rb) ;
this.fieldColors[i] = Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I,[col]);
}
for (i = 0; i != 256; i++) {
var col = -16777216 | 65280 | (((i/2|0) + 128) * 65537) ;
this.fieldColors[i + 256] = Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I,[col]);
}
this.fieldColors[512] = this.fieldColors[511];
main.add$java_awt_Component(Clazz.new_((I$[63]||(I$[63]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).lightGray);
this.functionChanged();
this.dispChooserChanged();
this.finished = true;
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
this.cv.repaint();
}main.requestFocus();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.cv.createImage$I$I(d.width, d.height);
this.scaleworld();
this.viewMain = Clazz.new_((I$[67]||(I$[67]=Clazz.load('java.awt.Rectangle'))).c$$java_awt_Dimension,[this.winSize]);
this.viewAxes = Clazz.new_((I$[67]||(I$[67]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.winSize.width - 100, 0, 100, 100]);
this.backgroundChanged = true;
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz.forName("java.awt.image.BufferedImage");
var dbiclass = Clazz.forName("java.awt.image.DataBufferInt");
var rasclass = Clazz.forName("java.awt.image.Raster");
var cstr = biclass.getConstructor$ClassA(Clazz.array(java.lang.Class, -1, [Integer.TYPE, Integer.TYPE, Integer.TYPE]));
this.backimage = cstr.newInstance$OA(Clazz.array(java.lang.Object, -1, [ new Integer(d.width),  new Integer(d.height),  new Integer(1)]));
var m = biclass.getMethod$S$ClassA("getRaster", null);
var ras = m.invoke$O$OA(this.backimage, null);
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
this.pixels = Clazz.array(Integer.TYPE, [d.width * d.height]);
var i;
for (i = 0; i != d.width * d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[68]||(I$[68]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.backimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}});

Clazz.newMeth(C$, 'resetDensityGroups', function () {
var i;
var j;
var k;
for (i = 0; i != 16; i++) for (j = 0; j != 16; j++) this.density[i][j] = 0;


var pcount = this.getParticleCount();
for (i = 0; i != pcount; i++) {
var p = this.particles[i];
this.addToDensityGroup$com_falstad_VecDemoFrame_Particle(p);
}
for (; i != 2500; i++) {
var p = this.particles[i];
p.lifetime = -100;
}
});

Clazz.newMeth(C$, 'addToDensityGroup$com_falstad_VecDemoFrame_Particle', function (p) {
var a = (((p.pos[0] + 1) * 8)|0);
var b = (((p.pos[1] + 1) * 8)|0);
var n = 0;
try {
n = ++this.density[a][b];
if (n > 2500) System.out.print$S(a + " " + b + " " + this.density[a][b] + "\n" );
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
System.out.print$S(new Double(p.pos[0]).toString() + " " + new Double(p.pos[1]).toString() + "\n" );
e.printStackTrace();
} else {
throw e;
}
}
return n;
});

Clazz.newMeth(C$, 'removeFromDensityGroup$com_falstad_VecDemoFrame_Particle', function (p) {
var a = (((p.pos[0] + 1) * 8)|0);
var b = (((p.pos[1] + 1) * 8)|0);
try {
if (--this.density[a][b] < 0) System.out.print$S(a + " " + b + " " + this.density[a][b] + "\n" );
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
System.out.print$S(new Double(p.pos[0]).toString() + " " + new Double(p.pos[1]).toString() + "\n" );
e.printStackTrace();
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'positionParticle$com_falstad_VecDemoFrame_Particle', function (p) {
var x;
var y;
var bestx = 0;
var besty = 0;
var best = 10000;
var randaddx = this.getrand$I(16);
var randaddy = this.getrand$I(16);
for (x = 0; x != 16; x++) for (y = 0; y != 16; y++) {
var ix = (randaddx + x) % 16;
var iy = (randaddy + y) % 16;
if (this.density[ix][iy] <= best) {
bestx = ix;
besty = iy;
best = this.density[ix][iy];
}}

p.pos[0] = bestx * 0.125 + this.getrand$I(100) * 0.125 / 100.0 - 1;
p.pos[1] = besty * 0.125 + this.getrand$I(100) * 0.125 / 100.0 - 1;
p.lifetime = this.curfunc.redistribute() ? 500 : 5000;
p.stepsize = 1;
p.theta = (this.getrand$I(101) - 50) * 3.141592653589793 / 50.0;
p.phi = (this.getrand$I(101) - 50) * 3.141592653589793 / 50.0;
var j;
for (j = 0; j != 3; j++) p.vel[j] = 0;

});

Clazz.newMeth(C$, 'getParticleCount', function () {
return this.partCountBar.getValue();
});

Clazz.newMeth(C$, 'resetParticles', function () {
var pcount = this.getParticleCount();
var i;
var j;
for (i = 0; i != pcount; i++) {
var p = this.particles[i];
for (j = 0; j != 2; j++) {
p.pos[j] = this.getrand$I(200) / 100.0 - 1;
p.vel[j] = 0;
}
p.pos[2] = 0;
p.lifetime = i * 2;
p.stepsize = 1;
}
this.integralX = -1;
this.resetDensityGroups();
});

Clazz.newMeth(C$, 'kickParticles', function () {
var i;
var j;
for (i = 0; i != this.getParticleCount(); i++) {
var p = this.particles[i];
for (j = 0; j != 2; j++) p.vel[j] += (this.getrand$I(100) / 99.0 - 0.5) * 0.04;

}
});

Clazz.newMeth(C$, 'generateFunction', function () {
var x;
var y;
if (this.grid == null ) this.grid = Clazz.array((I$[69]||(I$[69]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').GridElement))), [81, 81]);
this.curfunc.setupFrame();
this.divOffset = this.curfunc.getDivOffset();
this.divRange = this.curfunc.getDivRange();
var mu;
var xx;
var xx2;
var yy;
var yy2;
var r;
var r1;
var r2;
var r3;
var r4;
var levelheight = this.curfunc.getLevelHeight();
for (x = 0; x != 81; x++) for (y = 0; y != 81; y++) {
var ge = this.grid[x][y] = Clazz.new_((I$[69]||(I$[69]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').GridElement))), [this, null]);
ge.curl = ge.div = ge.height = 0;
this.curfunc.setGrid$com_falstad_VecDemoFrame_GridElement$I$I(ge, x, y);
}

this.curfunc.calcDivergence();
var zval = 0.025;
for (y = 0; y != 80; y++) for (x = 0; x != 80; x++) {
var ge = this.grid[x][y];
var vecx = this.grid[x + 1][y].height - ge.height;
var vecy = this.grid[x][y + 1].height - ge.height;
ge.normdot = (vecx + vecy + zval ) * 0.5780346820809249 / java.lang.Math.sqrt(vecx * vecx + vecy * vecy + zval * zval);
}

for (x = 0; x != 81; x++) {
this.grid[80][x] = this.grid[79][x];
this.grid[x][80] = this.grid[x][79];
}
this.$functionChanged = false;
this.backgroundChanged = true;
});

Clazz.newMeth(C$, 'computeColor$com_falstad_VecDemoFrame_GridElement$D', function (ge, c) {
if (c < 0 ) c = 0;
if (c > 1 ) c = 1;
c = 0.5 + c * 0.5;
var value = 0;
var range = 10;
var offset = 4;
switch (this.floorColorChooser.getSelectedIndex()) {
case 0:
value = ge.vecX * ge.vecX + ge.vecY * ge.vecY;
offset = 10;
range = 16;
if (!ge.valid) return -16777088;
break;
case 1:
value = ge.height - this.curfunc.getLevelHeight();
offset = 1;
range = 2;
break;
case 4:
value = ge.curl;
offset = 4;
range = 10;
break;
case 3:
value = ge.div;
offset = this.divOffset;
range = this.divRange;
break;
case 2:
if (!ge.valid) return -16777088;
break;
}
value *= 2.0;
var redness = (value < 0 ) ? (java.lang.Math.log(-value) + offset) / range : 0;
var grnness = (value > 0 ) ? (java.lang.Math.log(value) + offset) / range : 0;
if (redness > 1 ) redness = 1;
if (grnness > 1 ) grnness = 1;
if (grnness < 0 ) grnness = 0;
if (redness < 0 ) redness = 0;
var grayness = (1 - (redness + grnness)) * c;
var gray = 0.6;
var r = (((c * redness + gray * grayness) * 255)|0);
var g = (((c * grnness + gray * grayness) * 255)|0);
var b = (((gray * grayness) * 255)|0);
return -16777216 | (r << 16) | (g << 8) | b ;
});

Clazz.newMeth(C$, 'reinit', function () {
this.handleResize();
this.resetParticles();
this.$functionChanged = this.backgroundChanged = true;
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'drawBackground', function () {
if (this.isFlat) {
var x;
var y;
for (y = 0; y < 80; y++) for (x = 0; x < 80; x++) {
var ge = this.grid[x][y];
var nx = (x * this.winSize.width/80|0);
var ny = this.winSize.height - ((y + 1) * this.winSize.height/80|0);
var nx1 = ((x + 1) * this.winSize.width/80|0);
var ny1 = this.winSize.height - (y * this.winSize.height/80|0);
var col = this.computeColor$com_falstad_VecDemoFrame_GridElement$D(ge, 0);
this.fillRectangle$I$I$I$I$I(nx, ny, nx1, ny1, col);
ge.visible = true;
}

this.drawFloor();
this.$functionChanged = this.backgroundChanged = false;
if (this.imageSource != null ) this.imageSource.newPixels();
return;
}this.scaleworld();
var x;
var y;
var xdir;
var xstart;
var xend;
var ydir;
var ystart;
var yend;
var sc = 80;
if (this.viewAngleCos < 0 ) {
ystart = sc;
yend = 0;
ydir = -1;
} else {
ystart = 0;
yend = sc;
ydir = 1;
}if (this.viewAngleSin < 0 ) {
xstart = 0;
xend = sc;
xdir = 1;
} else {
xstart = sc;
xend = 0;
xdir = -1;
}var xFirst = (-this.viewAngleSin * xdir > this.viewAngleCos * ydir );
this.shadowBufferBottom = Clazz.array(Integer.TYPE, [this.winSize.width]);
this.shadowBufferTop = Clazz.array(Integer.TYPE, [this.winSize.width]);
this.shadowBufferBottom2 = Clazz.array(Integer.TYPE, [this.winSize.width]);
this.shadowBufferTop2 = Clazz.array(Integer.TYPE, [this.winSize.width]);
for (x = 0; x != this.winSize.width; x++) {
this.shadowBufferBottom[x] = this.shadowBufferBottom2[x] = 0;
this.shadowBufferTop[x] = this.shadowBufferTop2[x] = this.winSize.height - 1;
}
for (x = 0; x != this.winSize.width * this.winSize.height; x++) this.pixels[x] = -16777216;

var goffx = (xdir == 1) ? 0 : -1;
var goffy = (ydir == 1) ? 0 : -1;
for (x = xstart; x != xend; x = x+(xdir)) {
for (y = ystart; y != yend; y = y+(ydir)) {
if (!xFirst) x = xstart;
for (; x != xend; x = x+(xdir)) {
var nx = x * 0.025 - 1;
var ny = y * 0.025 - 1;
var nx1 = (x + xdir) * 0.025 - 1;
var ny1 = (y + ydir) * 0.025 - 1;
this.map3d$D$D$D$IA$IA$I(nx, ny, this.grid[x][y].height, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(nx1, ny, this.grid[x + xdir][y].height, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(nx, ny1, this.grid[x][y + ydir].height, this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(nx1, ny1, this.grid[x + xdir][y + ydir].height, this.xpoints, this.ypoints, 3);
var ge = this.grid[x + goffx][y + goffy];
var col = this.computeColor$com_falstad_VecDemoFrame_GridElement$D(ge, ge.normdot);
this.fillTriangle$I$I$I$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[3], this.ypoints[3], col);
this.fillTriangle$I$I$I$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
var cx = ((this.xpoints[0] + this.xpoints[3])/2|0);
var cy = ((this.ypoints[0] + this.ypoints[3])/2|0);
var vis = false;
if (cx >= 0 && cx < this.winSize.width  && cy <= this.shadowBufferTop[cx]  && cy >= 0 ) vis = true;
ge.visible = vis;
if (xFirst) break;
}
if (!xFirst) {
var i;
for (i = 0; i != this.winSize.width; i++) {
this.shadowBufferTop[i] = this.shadowBufferTop2[i];
this.shadowBufferBottom[i] = this.shadowBufferBottom2[i];
}
}}
if (!xFirst) break;
var i;
for (i = 0; i != this.winSize.width; i++) {
this.shadowBufferTop[i] = this.shadowBufferTop2[i];
this.shadowBufferBottom[i] = this.shadowBufferBottom2[i];
}
}
this.drawFloor();
this.$functionChanged = this.backgroundChanged = false;
if (this.imageSource != null ) this.imageSource.newPixels();
});

Clazz.newMeth(C$, 'drawFloor', function () {
var x;
var y;
switch (this.floorLineChooser.getSelectedIndex()) {
case 0:
break;
case 1:
for (x = 0; x != 80; x++) for (y = 0; y != 80; y = y+(10)) {
var nx = x * 0.025 - 1;
var nx1 = (x + 1) * 0.025 - 1;
var ny = y * 0.025 - 1;
if (this.grid[x][y].visible) {
this.map3d$D$D$D$IA$IA$I(nx, ny, this.grid[x][y].height, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(nx1, ny, this.grid[x + 1][y].height, this.xpoints, this.ypoints, 1);
this.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (this.grid[y][x].visible) {
this.map3d$D$D$D$IA$IA$I(ny, nx, this.grid[y][x].height, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(ny, nx1, this.grid[y][x + 1].height, this.xpoints, this.ypoints, 1);
this.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}}

break;
case 2:
if (!this.curfunc.nonGradient()) this.renderEquips();
break;
case 3:
this.genLines();
break;
}
});

Clazz.newMeth(C$, 'fillTriangle$I$I$I$I$I$I$I', function (x1, y1, x2, y2, x3, y3, col) {
if (x1 > x2) {
if (x2 > x3) {
var ay = this.interp$I$I$I$I$I(x1, y1, x3, y3, x2);
this.fillTriangle1$I$I$I$I$I$I(x3, y3, x2, y2, ay, col);
this.fillTriangle1$I$I$I$I$I$I(x1, y1, x2, y2, ay, col);
} else if (x1 > x3) {
var ay = this.interp$I$I$I$I$I(x1, y1, x2, y2, x3);
this.fillTriangle1$I$I$I$I$I$I(x2, y2, x3, y3, ay, col);
this.fillTriangle1$I$I$I$I$I$I(x1, y1, x3, y3, ay, col);
} else {
var ay = this.interp$I$I$I$I$I(x3, y3, x2, y2, x1);
this.fillTriangle1$I$I$I$I$I$I(x2, y2, x1, y1, ay, col);
this.fillTriangle1$I$I$I$I$I$I(x3, y3, x1, y1, ay, col);
}} else {
if (x1 > x3) {
var ay = this.interp$I$I$I$I$I(x2, y2, x3, y3, x1);
this.fillTriangle1$I$I$I$I$I$I(x3, y3, x1, y1, ay, col);
this.fillTriangle1$I$I$I$I$I$I(x2, y2, x1, y1, ay, col);
} else if (x2 > x3) {
var ay = this.interp$I$I$I$I$I(x2, y2, x1, y1, x3);
this.fillTriangle1$I$I$I$I$I$I(x1, y1, x3, y3, ay, col);
this.fillTriangle1$I$I$I$I$I$I(x2, y2, x3, y3, ay, col);
} else {
var ay = this.interp$I$I$I$I$I(x3, y3, x1, y1, x2);
this.fillTriangle1$I$I$I$I$I$I(x1, y1, x2, y2, ay, col);
this.fillTriangle1$I$I$I$I$I$I(x3, y3, x2, y2, ay, col);
}}});

Clazz.newMeth(C$, 'interp$I$I$I$I$I', function (x1, y1, x2, y2, x) {
if (x1 == x2) return y1;
if (x < x1 && x < x2  || x > x1 && x > x2  ) System.out.print$S("interp out of bounds\u000a");
return ((y1 + (x - x1) * (y2 - y1) / (x2 - x1))|0);
});

Clazz.newMeth(C$, 'fillTriangle1$I$I$I$I$I$I', function (x1, y1, x2, y2, y3, col) {
var dir = (x1 > x2) ? -1 : 1;
var x = x1;
if (x < 0) {
x = 0;
if (x2 < 0) return;
}if (x >= this.winSize.width) {
x = this.winSize.width - 1;
if (x2 >= this.winSize.width) return;
}if (y2 > y3) {
var q = y2;
y2 = y3;
y3 = q;
}while (x != x2 + dir){
var ya = this.interp$I$I$I$I$I(x1, y1, x2, y2, x);
var yb = this.interp$I$I$I$I$I(x1, y1, x2, y3, x);
if (ya < 0) ya = 0;
if (yb >= this.winSize.height) yb = this.winSize.height - 1;
if (this.shadowBufferTop2[x] > ya) this.shadowBufferTop2[x] = ya;
if (this.shadowBufferBottom2[x] < yb) this.shadowBufferBottom2[x] = yb;
var sb1 = this.shadowBufferTop[x];
var sb2 = this.shadowBufferBottom[x];
if (!(ya >= sb1 && yb <= sb2 )) {
for (; ya <= yb; ya++) {
if (ya < sb1 || ya > sb2 ) this.pixels[x + ya * this.winSize.width] = col;
}
}x = x+(dir);
if (x < 0 || x >= this.winSize.width ) return;
}
});

Clazz.newMeth(C$, 'fillRectangle$I$I$I$I$I', function (x1, y1, x2, y2, col) {
var x;
var y;
for (y = y1; y < y2; y++) for (x = x1; x < x2; x++) this.pixels[x + y * this.winSize.width] = col;


});

Clazz.newMeth(C$, 'drawLine$I$I$I$I', function (x1, y1, x2, y2) {
if (x1 == x2 && y1 == y2 ) return;
if (this.abs$I(y2 - y1) > this.abs$I(x2 - x1)) {
var sgn = this.sign$I(y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y = y+(sgn)) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
if (x >= 0 && y >= 0  && x < this.winSize.width  && y < this.winSize.height ) this.pixels[x + y * this.winSize.width] = -4144960;
}
} else {
var sgn = this.sign$I(x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x = x+(sgn)) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
if (x >= 0 && y >= 0  && x < this.winSize.width  && y < this.winSize.height ) this.pixels[x + y * this.winSize.width] = -4144960;
}
}});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'min$I$I', function (a, b) {
return (a < b) ? a : b;
});

Clazz.newMeth(C$, 'max$I$I', function (a, b) {
return (a > b) ? a : b;
});

Clazz.newMeth(C$, 'min$D$D', function (a, b) {
return (a < b ) ? a : b;
});

Clazz.newMeth(C$, 'max$D$D', function (a, b) {
return (a > b ) ? a : b;
});

Clazz.newMeth(C$, 'renderEquips', function () {
var x;
var y;
for (x = 0; x != 80; x++) for (y = 0; y != 80; y++) {
if (!this.grid[x][y].visible) continue;
this.tryEdge$I$I$I$I$I$I$I$I(x, y, x + 1, y, x, y + 1, x + 1, y + 1);
this.tryEdge$I$I$I$I$I$I$I$I(x, y, x + 1, y, x, y, x, y + 1);
this.tryEdge$I$I$I$I$I$I$I$I(x, y, x + 1, y, x + 1, y, x + 1, y + 1);
this.tryEdge$I$I$I$I$I$I$I$I(x, y, x, y + 1, x + 1, y, x + 1, y + 1);
this.tryEdge$I$I$I$I$I$I$I$I(x, y, x, y + 1, x, y + 1, x + 1, y + 1);
this.tryEdge$I$I$I$I$I$I$I$I(x + 1, y, x + 1, y + 1, x, y + 1, x + 1, y + 1);
}

});

Clazz.newMeth(C$, 'interpPoint$com_falstad_VecDemoFrame_GridElement$com_falstad_VecDemoFrame_GridElement$I$I$I$I$D$com_falstad_VecDemoFrame_FloatPair', function (ep1, ep2, x1, y1, x2, y2, pval, pos) {
var interp2 = (pval - ep1.height) / (ep2.height - ep1.height);
var interp1 = 1 - interp2;
pos.x = (x1 * interp1 + x2 * interp2) * 2.0 / 80 - 1;
pos.y = (y1 * interp1 + y2 * interp2) * 2.0 / 80 - 1;
});

Clazz.newMeth(C$, 'spanning$com_falstad_VecDemoFrame_GridElement$com_falstad_VecDemoFrame_GridElement$D', function (ep1, ep2, pval) {
if (ep1.height == ep2.height ) return false;
return !((ep1.height < pval  && ep2.height < pval  ) || (ep1.height > pval  && ep2.height > pval  ) );
});

Clazz.newMeth(C$, 'tryEdge$I$I$I$I$I$I$I$I', function (x1, y1, x2, y2, x3, y3, x4, y4) {
var i;
var emult = 5;
var mult = 1 / (40 * emult * 0.1 );
var ep1 = this.grid[x1][y1];
var ep2 = this.grid[x2][y2];
var ep3 = this.grid[x3][y3];
var ep4 = this.grid[x4][y4];
var pmin = this.min$D$D(this.min$D$D(ep1.height, ep2.height), this.min$D$D(ep3.height, ep4.height));
var pmax = this.max$D$D(this.max$D$D(ep1.height, ep2.height), this.max$D$D(ep3.height, ep4.height));
if (pmin < -5 ) pmin = -5;
if (pmax > 5 ) pmax = 5;
var imin = ((pmin / mult)|0);
var imax = ((pmax / mult)|0);
for (i = imin; i <= imax; i++) {
var pval = i * mult;
if (!(this.spanning$com_falstad_VecDemoFrame_GridElement$com_falstad_VecDemoFrame_GridElement$D(ep1, ep2, pval) && this.spanning$com_falstad_VecDemoFrame_GridElement$com_falstad_VecDemoFrame_GridElement$D(ep3, ep4, pval) )) continue;
var pa = Clazz.new_((I$[70]||(I$[70]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').FloatPair))), [this, null]);
var pb = Clazz.new_((I$[70]||(I$[70]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').FloatPair))), [this, null]);
this.interpPoint$com_falstad_VecDemoFrame_GridElement$com_falstad_VecDemoFrame_GridElement$I$I$I$I$D$com_falstad_VecDemoFrame_FloatPair(ep1, ep2, x1, y1, x2, y2, pval, pa);
this.interpPoint$com_falstad_VecDemoFrame_GridElement$com_falstad_VecDemoFrame_GridElement$I$I$I$I$D$com_falstad_VecDemoFrame_FloatPair(ep3, ep4, x3, y3, x4, y4, pval, pb);
this.map3d$D$D$D$IA$IA$I(pa.x, pa.y, pval, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(pb.x, pb.y, pval, this.xpoints, this.ypoints, 1);
this.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}
});

Clazz.newMeth(C$, 'drawLineBackground$java_awt_Graphics', function (g) {
var x;
var y;
for (x = 0; x != 80; x++) for (y = 0; y != 80; y++) this.grid[x][y].visible = true;


if (this.isFlat) return;
for (y = 79; y >= 0; y--) {
for (x = 0; x < 80; x = x+(5)) {
var ny = y * 0.025 - 1;
var nx1 = (x + 1) * 0.025 - 1;
var ny1 = (y + 1) * 0.025 - 1;
this.map3d$D$D$D$IA$IA$I(nx1, ny, this.grid[x][y].height, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(nx1, ny1, this.grid[x][y + 1].height, this.xpoints, this.ypoints, 2);
this.ypoints[1] = this.bound_y$I(this.ypoints[1]);
this.ypoints[2] = this.bound_y$I(this.ypoints[2]);
g.drawLine$I$I$I$I(this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2]);
}
}
for (y = 0; y < 80; y = y+(5)) {
for (x = 79; x >= 0; x--) {
var nx = x * 0.025 - 1;
var nx1 = (x + 1) * 0.025 - 1;
var ny1 = (y + 1) * 0.025 - 1;
this.map3d$D$D$D$IA$IA$I(nx, ny1, this.grid[x][y].height, this.xpoints, this.ypoints, 3);
this.map3d$D$D$D$IA$IA$I(nx1, ny1, this.grid[x + 1][y].height, this.xpoints, this.ypoints, 2);
this.ypoints[3] = this.bound_y$I(this.ypoints[3]);
this.ypoints[2] = this.bound_y$I(this.ypoints[2]);
g.drawLine$I$I$I$I(this.xpoints[3], this.ypoints[3], this.xpoints[2], this.ypoints[2]);
}
}
});

Clazz.newMeth(C$, 'bound_y$I', function (y) {
if (y < -100) y = -100;
if (y > this.winSize.height + 100) y = this.winSize.height + 100;
return y;
});

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I', function (x, y, z, xpoints, ypoints, pt) {
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(x, y, z, xpoints, ypoints, pt, this.viewMain);
});

Clazz.newMeth(C$, 'map3dView$D$D$D$IA$IA$I$java_awt_Rectangle', function (x, y, z, xpoints, ypoints, pt, view) {
if (this.isFlat) {
xpoints[pt] = view.x + (((x + 1) * view.width / 2)|0);
ypoints[pt] = view.y + (((1 - y) * view.height / 2)|0);
return;
}if (z < -1000 ) z = -1000;
if (z > 1000 ) z = 1000;
var realx = x * this.viewAngleCos + y * this.viewAngleSin;
var realy = z - this.viewHeight;
var realz = y * this.viewAngleCos - x * this.viewAngleSin + this.viewDistance;
this.scalex = this.viewZoom * ((view.width/4|0)) * this.viewDistance ;
this.scaley = this.scalex;
var yoff = ((this.scaley * (this.viewHeight - this.curfunc.getLevelHeight()) / this.viewDistance)|0);
xpoints[pt] = view.x + (view.width/2|0) + ((this.scalex * realx / realz)|0);
ypoints[pt] = view.y + (view.height/2|0) - yoff - ((this.scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'scaleworld', function () {
});

Clazz.newMeth(C$, 'getHeight$D$D', function (x, y) {
x = (x + 1) * 40;
y = (y + 1) * 40;
var ix = (x|0);
var iy = (y|0);
if (ix >= 80 || iy >= 80 ) return this.grid[ix][iy].height;
var fracx = x - ix;
var fracy = y - iy;
return this.grid[ix][iy].height * (1 - fracx) * (1 - fracy)  + this.grid[ix + 1][iy].height * fracx * (1 - fracy)  + this.grid[ix][iy + 1].height * (1 - fracx) * fracy  + this.grid[ix + 1][iy + 1].height * fracx * fracy ;
});

Clazz.newMeth(C$, 'sayCalculating$java_awt_Graphics', function (realg) {
realg.setColor$java_awt_Color(this.cv.getBackground());
var fm = realg.getFontMetrics();
var s = "Calculating...";
realg.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(s), 30);
realg.setColor$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).white);
realg.drawString$S$I$I(s, 10, this.winSize.height - 10);
});

Clazz.newMeth(C$, 'updateVecDemo$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
if (this.xpoints == null ) return;
this.checkFlatState();
this.barFieldStrength = this.fieldStrength = java.lang.Math.exp((this.strengthBar.getValue() - 50) / 10.0);
if (this.$functionChanged || this.backgroundChanged ) {
if (this.$functionChanged) {
this.sayCalculating$java_awt_Graphics(realg);
this.generateFunction();
}if (!this.slowDragView || !this.draggingView ) {
var tm1 = System.currentTimeMillis();
this.sayCalculating$java_awt_Graphics(realg);
this.drawBackground();
var tm2 = System.currentTimeMillis();
this.slowDragView = (tm2 - tm1 > 100);
}}this.scaleworld();
if ((this.draggingView && this.slowDragView ) || this.$functionChanged ) {
g.setColor$java_awt_Color(this.isFlat ? this.fieldColors[0] : this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
this.drawLineBackground$java_awt_Graphics(g);
} else g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.backimage, 0, 0, this);
var allquiet = true;
this.curfunc.setupFrame();
this.fieldStrength = this.barFieldStrength;
this.partMult = this.fieldStrength * this.reverse * this.timeStep ;
var disp = this.dispChooser.getSelectedIndex();
this.timeStep = 1;
if (!this.stoppedCheck.getState()) {
if (this.lastTime > 0) this.timeStep = (System.currentTimeMillis() - this.lastTime) * 0.03;
if (this.timeStep > 3 ) this.timeStep = 3;
this.lastTime = System.currentTimeMillis();
if (disp != 2 && disp != 3 ) {
this.moveParticles();
allquiet = false;
}this.currentStep = this.currentStep+(this.reverse);
if (this.currentStep < 0) this.currentStep = this.currentStep+(800);
} else this.lastTime = 0;
if (disp == 2) this.drawVectors$java_awt_Graphics(g);
 else if (disp != 3) this.drawParticles$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).gray);
if (!this.isFlat) this.drawAxes$java_awt_Graphics(g);
this.curfunc.finishFrame();
var mode = this.modeChooser.getSelectedIndex();
if (mode == 2) this.lineIntegral$java_awt_Graphics$Z(g, true);
 else if (mode == 3) this.lineIntegral$java_awt_Graphics$Z(g, false);
if (this.parseError) this.centerString$java_awt_Graphics$S$I(g, "Can\'t parse expression", this.winSize.height - 20);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
var t = System.currentTimeMillis();
C$.frames++;
if (C$.firsttime == 0) C$.firsttime = t;
 else if (t - C$.firsttime > 1000) {
C$.framerate = C$.frames;
C$.firsttime = t;
C$.frames = 0;
}if (!this.stoppedCheck.getState() && !allquiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'drawAxes$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).white);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 0, this.xpoints, this.ypoints, 0, this.viewAxes);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(1, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "x", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(0, 1, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "y", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 1, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "z", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
});

Clazz.newMeth(C$, 'drawVectors$java_awt_Graphics', function (g) {
var x;
var y;
var z;
var dd = Clazz.new_((I$[71]||(I$[71]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').DrawData))), [this, null]);
dd.mult = this.barFieldStrength * 40;
dd.g = g;
dd.field = Clazz.array(Double.TYPE, [3]);
dd.vv = Clazz.array(Double.TYPE, [3]);
this.vectorSpacing = this.vecDensityBar.getValue();
var vec = Clazz.array(Double.TYPE, [3]);
this.vecCount = 0;
for (x = 0; x != this.vectorSpacing; x++) {
vec[0] = x * (2.0 / (this.vectorSpacing - 1)) - 1;
for (y = 0; y != this.vectorSpacing; y++) {
vec[1] = y * (2.0 / (this.vectorSpacing - 1)) - 1;
this.drawVector$com_falstad_VecDemoFrame_DrawData$DA(dd, vec);
}
}
});

Clazz.newMeth(C$, 'lineIntegral$java_awt_Graphics$Z', function (g, line) {
if (this.integralX == -1) return;
if (this.dragStartX == this.integralX || this.dragStartY == this.integralY ) return;
var x1 = this.min$I$I(this.dragStartX, this.integralX);
var y1 = this.min$I$I(this.dragStartY, this.integralY);
var x2 = this.max$I$I(this.dragStartX, this.integralX);
var y2 = this.max$I$I(this.dragStartY, this.integralY);
var step = 15;
var x;
var pos = this.rk_k2;
if (!line) {
g.setColor$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).white);
g.drawRect$I$I$I$I(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
}var y1p = 1 - 2.0 * y1 / this.winSize.height;
var y2p = 1 - 2.0 * y2 / this.winSize.height;
for (x = x1; x <= x2; x = x+(step)) {
var step1 = x2 - x;
if (step1 > step) step1 = step;
pos[0] = 2.0 * x / this.winSize.width - 1;
pos[1] = y1p;
this.lineIntegralStep$java_awt_Graphics$I$I$DA$I$I$Z(g, x, y1, pos, step1, 0, line);
pos[1] = y2p;
this.lineIntegralStep$java_awt_Graphics$I$I$DA$I$I$Z(g, x + step1, y2, pos, -step1, 0, line);
}
var y;
var x1p = 2.0 * x1 / this.winSize.width - 1;
var x2p = 2.0 * x2 / this.winSize.width - 1;
for (y = y2; y >= y1; y = y-(step)) {
var step1 = y - y1;
if (step1 > step) step1 = step;
pos[0] = x1p;
pos[1] = 1 - 2.0 * y / this.winSize.height;
this.lineIntegralStep$java_awt_Graphics$I$I$DA$I$I$Z(g, x1, y, pos, 0, step1, line);
pos[0] = x2p;
this.lineIntegralStep$java_awt_Graphics$I$I$DA$I$I$Z(g, x2, y - step1, pos, 0, -step1, line);
}
this.boundCheck = false;
pos[1] = y1p;
var iv1 = this.numIntegrate$DA$I$D$D$Z(pos, 0, x1p, x2p, line);
pos[1] = y2p;
var iv2 = this.numIntegrate$DA$I$D$D$Z(pos, 0, x1p, x2p, line);
pos[0] = x1p;
var iv3 = this.numIntegrate$DA$I$D$D$Z(pos, 1, y1p, y2p, line);
pos[0] = x2p;
var iv4 = this.numIntegrate$DA$I$D$D$Z(pos, 1, y1p, y2p, line);
var ivtot = -iv1 + iv2 + iv3  - iv4;
var nf = (I$[72]||(I$[72]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(3);
if (ivtot < 1.0E-7  && ivtot > -1.0E-7  ) ivtot = 0;
ivtot *= this.reverse;
var s = ((!line) ? "Flux = " : "Circulation = ");
s += nf.format$D(ivtot * 100000.0);
g.setColor$java_awt_Color(this.cv.getBackground());
var fm = g.getFontMetrics();
g.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(s), 30);
g.setColor$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).white);
g.drawString$S$I$I(s, 10, this.winSize.height - 10);
});

Clazz.newMeth(C$, 'numIntegrate$DA$I$D$D$Z', function (pos, n1, x1, x2, line) {
var steps = 8;
var lastres = 0;
var res = 0;
var n2 = (line) ? n1 : 1 - n1;
while (true){
var i;
var h = (x2 - x1) / steps;
res = 0;
for (i = 0; i <= steps; i++) {
pos[n1] = x1 + i * h;
var field = this.rk_k1;
this.curfunc.getField$DA$DA(field, pos);
var ss = (i == 0 || i == steps ) ? 1 : ((i & 1) == 1) ? 4 : 2;
res += field[n2] * h * ss ;
}
res /= 3;
if (java.lang.Math.abs(lastres - res) < 1.0E-7 ) break;
lastres = res;
steps = steps*(2);
if (steps == 65536) break;
}
if (!line && n1 == 0 ) res = -res;
return res;
});

Clazz.newMeth(C$, 'lineIntegralStep$java_awt_Graphics$I$I$DA$I$I$Z', function (g, x, y, pos, dx, dy, line) {
var field = this.rk_k1;
this.curfunc.getField$DA$DA(field, pos);
var f = (line) ? field[0] * dx + field[1] * dy : field[0] * dy - field[1] * dx;
f *= this.reverse;
var dn = java.lang.Math.abs(f * 100);
if (dn > 1 ) dn = 1;
var col1 = ((dn * 128 + 127)|0);
var col2 = ((127 - dn * 127)|0);
if (!line) {
x = x+((dx/2|0));
y = y-((dy/2|0));
}if (f == 0 ) {
g.setColor$java_awt_Color(Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I$I$I,[col2, col2, col2]));
g.drawLine$I$I$I$I(x, y, x + dx, y - dy);
} else if (f > 0 ) {
g.setColor$java_awt_Color(Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I$I$I,[col1, col2, col2]));
if (line) this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, x, y, x + dx, y - dy);
 else this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, x, y, x + dy, y + dx);
} else {
g.setColor$java_awt_Color(Clazz.new_((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).c$$I$I$I,[col2, col1, col2]));
if (line) this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, x + dx, y - dy, x, y);
 else this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, null, x, y, x - dy, y - dx);
}});

Clazz.newMeth(C$, 'genLines', function () {
var i;
var lineGridSize = 8;
if (lineGridSize < 3) lineGridSize = 3;
if (lineGridSize > 8) lineGridSize = 8;
lineGridSize = lineGridSize*(2);
var ct = 30 * lineGridSize * lineGridSize ;
var brightmult = 80 * this.barFieldStrength;
this.fieldStrength = 10;
var lineGrid = Clazz.array(Boolean.TYPE, [lineGridSize, lineGridSize]);
var lineGridMult = lineGridSize / 2.0;
var origp = Clazz.array(Double.TYPE, [3]);
var field = Clazz.array(Double.TYPE, [3]);
var p = Clazz.new_((I$[57]||(I$[57]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Particle))), [this, null]);
p.lifetime = -1;
p.stepsize = 10;
var dir = -1;
var segs = 0;
var lastdist = 0;
for (i = 0; i != ct; i++) {
if (p.lifetime < 0 ) {
p.lifetime = 1;
p.stepsize = 10;
segs = 0;
lastdist = 0;
if (dir == 1) {
var j;
for (j = 0; j != 3; j++) p.pos[j] = origp[j];

dir = -1;
continue;
}dir = 1;
var px = 0;
var py = 0;
while (true){
if (!lineGrid[px][py]) break;
if (++px < lineGridSize) continue;
px = 0;
if (++py < lineGridSize) continue;
break;
}
if (py == lineGridSize) break;
lineGrid[px][py] = true;
var offs = 0.5 / lineGridMult;
origp[0] = p.pos[0] = px / lineGridMult - 1 + offs;
origp[1] = p.pos[1] = py / lineGridMult - 1 + offs;
}var p1x = p.pos[0];
var p1y = p.pos[1];
var p1z = this.getHeight$D$D(p1x, p1y);
var ge = this.grid[(((p1x + 1) * 80 / 2)|0)][(((p1y + 1) * 80 / 2)|0)];
if (!ge.visible) {
p.lifetime = -1;
continue;
}var x = p.pos;
this.lineSegment$com_falstad_VecDemoFrame_Particle$I(p, dir);
if (p.lifetime < 0 ) continue;
var gx = (((x[0] + 1) * lineGridMult)|0);
var gy = (((x[1] + 1) * lineGridMult)|0);
if (!lineGrid[gx][gy]) segs--;
lineGrid[gx][gy] = true;
ge = this.grid[(((p.pos[0] + 1) * 80 / 2)|0)][(((p.pos[1] + 1) * 80 / 2)|0)];
if (!ge.visible) {
p.lifetime = -1;
continue;
}var dn = brightmult * p.phi;
if (dn > 2 ) dn = 2;
this.map3d$D$D$D$IA$IA$I(p1x, p1y, p1z, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(p.pos[0], p.pos[1], this.getHeight$D$D(p.pos[0], p.pos[1]), this.xpoints, this.ypoints, 1);
this.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
var d2 = this.dist2$DA$DA(origp, x);
if (d2 > lastdist ) lastdist = d2;
 else segs++;
if (segs > 10 || d2 < 0.001  ) p.lifetime = -1;
}
});

Clazz.newMeth(C$, 'drawVector$com_falstad_VecDemoFrame_DrawData$DA', function (dd, vec) {
var field = dd.field;
this.curfunc.getField$DA$DA(field, vec);
var dn = java.lang.Math.sqrt(field[0] * field[0] + field[1] * field[1]);
var dnr = dn * this.reverse;
if (dn > 0 ) {
field[0] /= dnr;
field[1] /= dnr;
}dn *= dd.mult;
if (dn > 2 ) dn = 2;
var col = ((dn * 255)|0);
var sw2 = 1.0 / (this.vectorSpacing - 1);
this.map3d$D$D$D$IA$IA$I(vec[0], vec[1], 0, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(vec[0] + sw2 * field[0], vec[1] + sw2 * field[1], 0, this.xpoints, this.ypoints, 1);
dd.g.setColor$java_awt_Color(this.fieldColors[col]);
this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(dd.g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], 2);
});

Clazz.newMeth(C$, 'moveParticles', function () {
var bestd = 0;
var i;
var pcount = this.getParticleCount();
for (i = 0; i != pcount; i++) {
var pt = this.particles[i];
this.removeFromDensityGroup$com_falstad_VecDemoFrame_Particle(pt);
this.moveParticle$com_falstad_VecDemoFrame_Particle(pt);
var x = pt.pos;
if (!(x[0] >= -1  && x[0] < 1   && x[1] >= -1   && x[1] < 1  ) || (pt.lifetime -= this.timeStep) < 0  ) this.positionParticle$com_falstad_VecDemoFrame_Particle(pt);
var d = this.addToDensityGroup$com_falstad_VecDemoFrame_Particle(pt);
if (d > bestd) bestd = d;
}
var withforce = (this.dispChooser.getSelectedIndex() == 1);
var maxd = ((6 * this.getParticleCount()/256|0));
if (!withforce && this.curfunc.redistribute() && bestd > maxd  ) this.redistribute$I(bestd);
});

Clazz.newMeth(C$, 'drawParticles$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color((I$[53]||(I$[53]=Clazz.load('java.awt.Color'))).white);
var disp = this.dispChooser.getSelectedIndex();
if (disp == 2) {
var i;
for (i = 0; i != this.vecCount; i++) {
var fv = this.vectors[i];
g.setColor$java_awt_Color(this.fieldColors[fv.col]);
this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, fv.sx1, fv.sy1, fv.sx2, fv.sy2, 2);
}
return;
}var pcount = this.getParticleCount();
var i;
this.wooft += 0.3;
if (disp == 4) pcount = ((pcount + 4)/5|0);
for (i = 0; i < pcount; i++) {
var p = this.particles[i];
var pos = p.pos;
var ge = this.grid[(((pos[0] + 1) * 80 / 2)|0)][(((pos[1] + 1) * 80 / 2)|0)];
this.map3d$D$D$D$IA$IA$I(pos[0], pos[1], this.getHeight$D$D(pos[0], pos[1]), this.xpoints, this.ypoints, 0);
if (this.xpoints[0] < 0 || this.xpoints[0] >= this.winSize.width  || this.ypoints[0] < 0  || this.ypoints[0] >= this.winSize.height ) continue;
if (disp == 4) {
g.setColor$java_awt_Color(p.color);
var len = 0.02;
var ax = java.lang.Math.cos(p.theta) * 0.02;
var ay = java.lang.Math.sin(p.theta) * 0.02;
var offx = ax;
var offy = ay;
var a1 = this.curlcalc$D$D$D$D(p.pos[0] + offx, p.pos[1] + offy, -ay, ax);
var a2 = this.curlcalc$D$D$D$D(p.pos[0] - offy, p.pos[1] + offx, -ax, -ay);
var a3 = this.curlcalc$D$D$D$D(p.pos[0] - offx, p.pos[1] - offy, ay, -ax);
var a4 = this.curlcalc$D$D$D$D(p.pos[0] + offy, p.pos[1] - offx, ax, ay);
p.theta += (a1 + a2 + a3 + a4 ) / 0.0016;
this.map3d$D$D$D$IA$IA$I(p.pos[0] - offx, p.pos[1] - offy, 0, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(p.pos[0] + offx, p.pos[1] + offy, 0, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(p.pos[0] - offy, p.pos[1] + offx, 0, this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(p.pos[0] + offy, p.pos[1] - offx, 0, this.xpoints, this.ypoints, 3);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
g.drawLine$I$I$I$I(this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3]);
g.fillOval$I$I$I$I(this.xpoints[0] - 1, this.ypoints[0] - 1, 3, 3);
} else if (ge.visible && ge.valid ) g.fillRect$I$I$I$I(this.xpoints[0], this.ypoints[0] - 1, 2, 2);
}
});

Clazz.newMeth(C$, 'drawPlane$java_awt_Graphics$D$D$D', function (g, sizex, sizey, z) {
g.setColor$java_awt_Color(this.darkYellow);
this.map3d$D$D$D$IA$IA$I(-sizex, -sizey, z, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(+sizex, -sizey, z, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(+sizex, +sizey, z, this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(-sizex, +sizey, z, this.xpoints, this.ypoints, 3);
g.fillPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
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

Clazz.newMeth(C$, 'redistribute$I', function (mostd) {
if (mostd < 5) return;
this.rediscount++;
var maxd = ((6 * this.getParticleCount()/256|0));
var i;
var pn = 0;
var pcount = this.getParticleCount();
for (i = this.rediscount % 4; i < pcount; i = i+(4)) {
var p = this.particles[i];
var a = (((p.pos[0] + 1) * 8)|0);
var b = (((p.pos[1] + 1) * 8)|0);
if (this.density[a][b] <= maxd) continue;
p.lifetime = -1;
pn++;
}
});

Clazz.newMeth(C$, 'curlcalc$D$D$D$D', function (x, y, ax, ay) {
this.rk_yn[0] = x;
this.rk_yn[1] = y;
this.curfunc.getField$DA$DA(this.rk_k1, this.rk_yn);
return this.partMult * (this.rk_k1[0] * ax + this.rk_k1[1] * ay);
});

Clazz.newMeth(C$, 'distanceParticle$com_falstad_VecDemoFrame_Particle', function (p) {
return C$.distanceXY$D$D(p.pos[0], p.pos[1]);
}, 1);

Clazz.newMeth(C$, 'distanceArray$DA', function (y) {
return java.lang.Math.sqrt(y[0] * y[0] + y[1] * y[1] + 1.0E-9);
}, 1);

Clazz.newMeth(C$, 'distanceXY$D$D', function (x, y) {
return java.lang.Math.sqrt(x * x + y * y + 1.0E-9);
}, 1);

Clazz.newMeth(C$, 'rotateParticleAdd$DA$DA$D$D$D', function (result, y, mult, cx, cy) {
result[0] += -mult * (y[1] - cy);
result[1] += mult * (y[0] - cx);
}, 1);

Clazz.newMeth(C$, 'rotateParticle$DA$DA$D', function (result, y, mult) {
result[0] = -mult * y[1];
result[1] = mult * y[0];
result[2] = 0;
}, 1);

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.editView$I$I(x, y);
});

Clazz.newMeth(C$, 'editView$I$I', function (x, y) {
if (this.modeChooser.getSelectedIndex() == 0) {
if (this.isFlat) return;
this.viewAngle = (this.dragStartX - x) / 40.0 + this.viewAngleDragStart;
while (this.viewAngle < 0 )this.viewAngle += 6.283185307179586;

while (this.viewAngle >= 6.283185307179586 )this.viewAngle -= 6.283185307179586;

this.viewAngleCos = java.lang.Math.cos(this.viewAngle);
this.viewAngleSin = java.lang.Math.sin(this.viewAngle);
this.viewHeight = -(this.dragStartY - y) / 10.0 + this.viewHeightDragStart;
if (this.viewHeight > 9 ) this.viewHeight = 9;
if (this.viewHeight < -9 ) this.viewHeight = -9;
this.draggingView = this.backgroundChanged = true;
this.cv.repaint$J(this.pause);
return;
}if (this.modeChooser.getSelectedIndex() == 1) {
if (this.isFlat) return;
this.viewZoom = (x - this.dragStartX) / 40.0 + this.viewZoomDragStart;
if (this.viewZoom < 0.1 ) this.viewZoom = 0.1;
this.draggingView = this.backgroundChanged = true;
this.cv.repaint$J(this.pause);
return;
}if (this.modeChooser.getSelectedIndex() == 2 || this.modeChooser.getSelectedIndex() == 3 ) {
this.integralX = x;
this.integralY = y;
this.cv.repaint$J(this.pause);
}});

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
this.vectors = null;
if (e.getSource() === this.resetButton ) this.resetParticles();
if (e.getSource() === this.kickButton ) this.kickParticles();
if (e.getSource() === this.infoButton ) {
var s = this.curfunc.getClass().getName();
try {
s = s.substring(s.lastIndexOf('.') + 1);
this.applet.getAppletContext().showDocument$java_net_URL$S(Clazz.new_((I$[73]||(I$[73]=Clazz.load('java.net.URL'))).c$$java_net_URL$S,[this.applet.getCodeBase(), "functions.html" + '#' + s ]), "functionHelp");
} catch (ex) {
if (Clazz.exceptionOf(ex, Exception)){
} else {
throw ex;
}
}
}this.curfunc.actionPerformed();
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

Clazz.newMeth(C$, 'scrollbarValueChanged$com_falstad_DecentScrollbar', function (ds) {
this.vectors = null;
System.out.print$S(ds.getValue() + "\n");
if (ds === this.partCountBar ) this.resetDensityGroups();
if (ds === this.aux1Bar  || ds === this.aux2Bar   || ds === this.aux3Bar  ) {
this.$functionChanged = true;
this.draggingView = true;
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'scrollbarFinished$com_falstad_DecentScrollbar', function (ds) {
this.draggingView = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragStartX = e.getX();
this.dragStartY = e.getY();
this.viewAngleDragStart = this.viewAngle;
this.viewHeightDragStart = this.viewHeight;
this.viewZoomDragStart = this.viewZoom;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = this.draggingView = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'dispChooserChanged', function () {
var disp = this.dispChooser.getSelectedIndex();
this.showA = false;
if (disp == 1) this.kickButton.enable();
 else this.kickButton.disable();
this.potentialLabel.hide();
this.potentialBar.hide();
this.vecDensityLabel.hide();
this.vecDensityBar.hide();
this.partCountLabel.hide();
this.partCountBar.hide();
this.strengthLabel.show();
this.strengthBar.show();
if (disp == 2) {
this.vecDensityLabel.show();
this.vecDensityBar.show();
} else {
this.partCountLabel.show();
this.partCountBar.show();
}this.validate();
this.resetParticles();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) return;
this.vectors = null;
this.cv.repaint$J(this.pause);
this.reverse = (this.reverseCheck.getState()) ? -1 : 1;
if (e.getItemSelectable() === this.dispChooser ) {
this.dispChooserChanged();
this.resetParticles();
}if (e.getItemSelectable() === this.functionChooser ) this.functionChanged();
if (e.getItemSelectable() === this.reverseCheck ) this.$functionChanged = true;
if (e.getItemSelectable() === this.floorColorChooser  || e.getItemSelectable() === this.floorLineChooser  ) this.backgroundChanged = true;
});

Clazz.newMeth(C$, 'checkFlatState', function () {
var oldFlat = this.isFlat;
var disp = this.dispChooser.getSelectedIndex();
this.isFlat = this.flatCheck.getState() || this.curfunc.nonGradient() || disp == 2   || disp == 4 ;
var mode = this.modeChooser.getSelectedIndex();
if (mode == 2 || mode == 3 ) this.isFlat = true;
if (this.isFlat != oldFlat ) this.backgroundChanged = true;
});

Clazz.newMeth(C$, 'functionChanged', function () {
this.reverse = 1;
this.reverseCheck.setState$Z(false);
this.parseError = false;
this.curfunc = this.functionList.elementAt$I(this.functionChooser.getSelectedIndex());
var i;
for (i = 0; i != 3; i++) {
this.auxBars[i].label.hide();
this.auxBars[i].bar.hide();
}
for (i = 0; i != 2; i++) this.textFields[i].hide();

if (this.textFieldLabel != null ) this.textFieldLabel.hide();
this.strengthBar.setValue$I(80);
this.curfunc.setup();
this.validate();
this.resetParticles();
this.dispChooserChanged();
this.$functionChanged = true;
this.integralX = -1;
});

Clazz.newMeth(C$, 'setupDispChooser$Z', function (potential) {
this.dispChooser.removeAll();
this.dispChooser.add$S("Display: Particles (Vel.)");
this.dispChooser.add$S("Display: Particles (Force)");
this.dispChooser.add$S("Display: Field Vectors");
this.dispChooser.add$S("Display: None");
if (C$.BUILD_V) this.dispChooser.add$S("Display: Curl Detectors");
});

Clazz.newMeth(C$, 'setupBar$I$S$I', function (n, text, val) {
this.auxBars[n].label.setText$S(text);
this.auxBars[n].label.show();
this.auxBars[n].bar.setValue$I(val);
this.auxBars[n].bar.show();
});

Clazz.newMeth(C$, 'cross$DA$DA$DA', function (res, v1, v2) {
res[0] = v1[1] * v2[2] - v1[2] * v2[1];
res[1] = v1[2] * v2[0] - v1[0] * v2[2];
res[2] = v1[0] * v2[1] - v1[1] * v2[0];
});

Clazz.newMeth(C$, 'dot$DA$DA', function (v1, v2) {
return v1[0] * v2[0] + v1[1] * v2[1];
});

Clazz.newMeth(C$, 'rk$I$D$DA$D', function (order, x, Y, stepsize) {
var i;
if (order == 2) {
var fmult = stepsize * this.partMult;
for (i = 0; i != order; i++) this.rk_yn[i] = Y[i];

this.curfunc.getField$DA$DA(this.rk_k1, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * fmult * this.rk_k1[i] );

this.curfunc.getField$DA$DA(this.rk_k2, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * fmult * this.rk_k2[i] );

this.curfunc.getField$DA$DA(this.rk_k3, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + fmult * this.rk_k3[i]);

this.curfunc.getField$DA$DA(this.rk_k4, this.rk_yn);
for (i = 0; i != order; i++) Y[i] = Y[i] + fmult * (this.rk_k1[i] + 2 * (this.rk_k2[i] + this.rk_k3[i]) + this.rk_k4[i]) / 6;

Y[2] = this.rk_k4[2];
} else {
var fmult = stepsize * this.partMult;
for (i = 0; i != order; i++) this.rk_yn[i] = Y[i];

this.getForceField$DA$DA$D$D(this.rk_k1, this.rk_yn, stepsize, fmult);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * this.rk_k1[i]);

this.getForceField$DA$DA$D$D(this.rk_k2, this.rk_yn, stepsize, fmult);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * this.rk_k2[i]);

this.getForceField$DA$DA$D$D(this.rk_k3, this.rk_yn, stepsize, fmult);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + this.rk_k3[i]);

this.getForceField$DA$DA$D$D(this.rk_k4, this.rk_yn, stepsize, fmult);
for (i = 0; i != order; i++) Y[i] = Y[i] + (this.rk_k1[i] + 2 * (this.rk_k2[i] + this.rk_k3[i]) + this.rk_k4[i]) / 6;

Y[4] = this.rk_k4[4];
}});

Clazz.newMeth(C$, 'getForceField$DA$DA$D$D', function (result, y, stepsize, fmult) {
this.curfunc.getField$DA$DA(result, y);
result[4] = result[2];
var i;
for (i = 0; i != 2; i++) result[i + 2] = fmult * result[i] * 0.1 ;

for (i = 0; i != 2; i++) result[i] = stepsize * this.timeStep * this.rk_yn[i + 2] ;

});

Clazz.newMeth(C$, 'moveParticle$com_falstad_VecDemoFrame_Particle', function (p) {
var disp = this.dispChooser.getSelectedIndex();
var numIter = 0;
var maxh = 1;
var error = 0.0;
var E = 0.001;
var localError;
var useForce = (disp == 1);
var order = useForce ? 4 : 2;
var Y = this.rk_Y;
var Yhalf = this.rk_Yhalf;
this.oldY = this.rk_oldY;
var i;
for (i = 0; i != 2; i++) this.oldY[i] = Y[i] = Yhalf[i] = p.pos[i];

if (useForce) for (i = 0; i != 2; i++) Y[i + 2] = Yhalf[i + 2] = p.vel[i];

var t = 0;
if (!this.curfunc.useRungeKutta()) {
this.boundCheck = false;
this.curfunc.getField$DA$DA(Yhalf, Y);
if (this.boundCheck && (!useForce || this.curfunc.checkBoundsWithForce() ) ) {
p.pos[0] = -100;
return;
}var fmult = this.partMult;
if (useForce) {
fmult *= 0.1;
for (i = 0; i != 2; i++) {
p.vel[i] += fmult * Yhalf[i];
p.pos[i] += p.vel[i] * this.timeStep;
}
} else {
for (i = 0; i != 2; i++) p.pos[i] += fmult * Yhalf[i];

}p.pos[2] = Yhalf[2];
for (i = 0; i != 2; i++) Y[i] = p.pos[i];

if (this.curfunc.checkBounds$DA$DA(Y, this.oldY)) p.pos[0] = -100;
return;
}var adapt = this.curfunc.useAdaptiveRungeKutta();
var h = (adapt) ? p.stepsize : 1;
var steps = 0;
var minh = 1.0E-4;
while (t >= 0  && t < 1  ){
if (t + h > 1 ) h = 1 - t;
this.boundCheck = false;
this.rk$I$D$DA$D(order, 0, Y, h);
if (!adapt) break;
this.rk$I$D$DA$D(order, 0, Yhalf, h * 0.5);
this.rk$I$D$DA$D(order, 0, Yhalf, h * 0.5);
if (this.boundCheck && (!useForce || this.curfunc.checkBoundsWithForce() ) ) {
p.pos[0] = -100;
return;
}localError = java.lang.Math.abs(Y[0] - Yhalf[0]) + java.lang.Math.abs(Y[1] - Yhalf[1]);
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
if (this.boundCheck && (!useForce || this.curfunc.checkBoundsWithForce() ) ) {
p.pos[0] = -100;
return;
}p.stepsize = h;
for (i = 0; i != 3; i++) p.pos[i] = Y[i];

if (useForce) {
for (i = 0; i != 2; i++) p.vel[i] = Y[i + 2];

p.pos[2] = Y[4];
}});

Clazz.newMeth(C$, 'dist2$DA$DA', function (a, b) {
var c0 = a[0] - b[0];
var c1 = a[1] - b[1];
return c0 * c0 + c1 * c1;
});

Clazz.newMeth(C$, 'lineSegment$com_falstad_VecDemoFrame_Particle$I', function (p, dir) {
var numIter = 0;
var maxh = 20;
var error = 0.0;
var E = 0.001;
var localError;
var order = 2;
var Y = this.rk_Y;
var Yhalf = this.rk_Yhalf;
this.oldY = this.rk_oldY;
var i;
for (i = 0; i != 2; i++) this.oldY[i] = Y[i] = Yhalf[i] = p.pos[i];

var h = p.stepsize;
this.ls_fieldavg[0] = this.ls_fieldavg[1] = this.ls_fieldavg[2] = 0;
var steps = 0;
var minh = 0.1;
var segSize2max = 0.0125;
var segSize2min = segSize2max / 4;
var lastd = 0;
var avgct = 0;
while (true){
this.boundCheck = false;
steps++;
if (steps > 100) {
System.out.print$S("maxsteps\u000a");
p.lifetime = -1;
return;
}this.rk$I$D$DA$D(order, 0, Y, dir * h);
this.rk$I$D$DA$D(order, 0, Yhalf, dir * h * 0.5 );
this.rk$I$D$DA$D(order, 0, Yhalf, dir * h * 0.5 );
if (this.boundCheck) {
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

h /= 2;
if (h < minh ) {
p.lifetime = -1;
return;
}continue;
}if (Y[0] < -1  || Y[0] >= 0.999   || Y[1] < -1   || Y[1] >= 0.999  ) {
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

h /= 2;
if (h < minh ) {
p.lifetime = -1;
return;
}continue;
}localError = java.lang.Math.abs(Y[0] - Yhalf[0]) + java.lang.Math.abs(Y[1] - Yhalf[1]);
if (localError > E  && h > minh  ) {
h *= 0.75;
if (h < minh ) h = minh;
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

continue;
} else if (localError < (E * 0.5) ) {
h *= 1.25;
if (h > maxh ) h = maxh;
}var d = this.dist2$DA$DA(p.pos, Y);
if (!(d - lastd > 1.0E-10 )) {
p.lifetime = -1;
return;
}if (d > segSize2max ) {
h /= 2;
if (h < minh ) {
p.lifetime = -1;
return;
}for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

continue;
}this.ls_fieldavg[0] += this.rk_k1[0];
this.ls_fieldavg[1] += this.rk_k1[1];
avgct++;
if (d > segSize2min ) break;
lastd = d;
for (i = 0; i != order; i++) this.oldY[i] = Yhalf[i] = Y[i];

}
p.stepsize = h;
for (i = 0; i != 3; i++) p.pos[i] = Y[i];

p.phi = java.lang.Math.sqrt(this.ls_fieldavg[0] * this.ls_fieldavg[0] + this.ls_fieldavg[1] * this.ls_fieldavg[1]) / avgct;
});

Clazz.newMeth(C$, 'doubleToGrid$D', function (x) {
return (((x + 1) * 80 / 2)|0);
});

Clazz.newMeth(C$, 'gridToDouble$I', function (x) {
return (x * 2.0 / 80) - 1;
});

Clazz.newMeth(C$, 'getDirectionField$DA$DA$D', function (result, y, th) {
var sinth = java.lang.Math.sin(th);
var costh = java.lang.Math.cos(th);
if (!this.showA) {
result[0] = 3.0E-4 * costh;
result[1] = 3.0E-4 * sinth;
result[2] = -0.4 * (y[0] * costh + y[1] * sinth);
} else {
var axis = Clazz.array(Double.TYPE, [3]);
axis[0] = costh;
axis[1] = sinth;
axis[2] = 0;
var d = this.dot$DA$DA(axis, y);
var r = Clazz.array(Double.TYPE, [3]);
var i;
for (i = 0; i != 2; i++) r[i] = 6.0E-4 * (y[i] - axis[i] * d);

this.cross$DA$DA$DA(result, axis, r);
}});
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "AuxBar", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.bar = null;
this.label = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$a2s_Label$com_falstad_DecentScrollbar', function (l, b) {
C$.$init$.apply(this);
this.label = l;
this.bar = b;
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "FloatPair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "VecFunction", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'nonGradient', function () {
return false;
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return true;
});

Clazz.newMeth(C$, 'useAdaptiveRungeKutta', function () {
return true;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return true;
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
return false;
});

Clazz.newMeth(C$, 'redistribute', function () {
return true;
});

Clazz.newMeth(C$, 'setup', function () {
});

Clazz.newMeth(C$, 'setupFrame', function () {
});

Clazz.newMeth(C$, 'finishFrame', function () {
});

Clazz.newMeth(C$, 'actionPerformed', function () {
});

Clazz.newMeth(C$, 'calcDivergence', function () {
});

Clazz.newMeth(C$, 'getLevelHeight', function () {
return 0;
});

Clazz.newMeth(C$, 'setGrid$com_falstad_VecDemoFrame_GridElement$I$I', function (ge, x, y) {
var xx = this.b$['com.falstad.VecDemoFrame'].rk_k1;
var res = this.b$['com.falstad.VecDemoFrame'].rk_k2;
var res1 = this.b$['com.falstad.VecDemoFrame'].rk_k3;
xx[0] = (x * 2.0 / 80) - 1;
xx[1] = (y * 2.0 / 80) - 1;
xx[2] = 0;
this.b$['com.falstad.VecDemoFrame'].boundCheck = false;
this.getField$DA$DA(res, xx);
ge.vecX = this.b$['com.falstad.VecDemoFrame'].reverse * res[0] * 70 ;
ge.vecY = this.b$['com.falstad.VecDemoFrame'].reverse * res[1] * 70 ;
ge.height = this.b$['com.falstad.VecDemoFrame'].reverse * res[2] * 0.625 ;
ge.valid = !this.b$['com.falstad.VecDemoFrame'].boundCheck;
var xorig0 = xx[0];
xx[0] += 1.0E-8;
this.getField$DA$DA(res1, xx);
ge.div = res1[0] - res[0];
ge.curl = res1[1] - res[1];
xx[0] = xorig0;
xx[1] += 1.0E-8;
this.getField$DA$DA(res1, xx);
ge.div = (ge.div + res1[1] - res[1]) * 1.0E10 * this.b$['com.falstad.VecDemoFrame'].reverse ;
ge.curl = (ge.curl - (res1[0] - res[0])) * 1.0E10 * this.b$['com.falstad.VecDemoFrame'].reverse ;
});

Clazz.newMeth(C$, 'getDivOffset', function () {
return 4;
});

Clazz.newMeth(C$, 'getDivRange', function () {
return 11;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.lineLen = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S("charged line", null, "1/r single line");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
if (r < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var r2 = r * r;
result[0] = -2.0E-4 * y[0] / r2;
result[1] = -2.0E-4 * y[1] / r2;
result[2] = 0.4 * java.lang.Math.log(r + 1.0E-300);
});

Clazz.newMeth(C$, 'setup', function () {
this.lineLen = 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRadialDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRadialDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sign = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.sign = 1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S("line charge double", null, "1/r double lines");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(40 + (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() * 80/200|0));
var xx1 = y[0] - sep;
var xx2 = y[0] + sep;
var r1 = P$.VecDemoFrame.distanceXY$D$D(xx1, y[1]);
var r2 = P$.VecDemoFrame.distanceXY$D$D(xx2, y[1]);
if (r1 < 0.001  || r2 < 0.001  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var q = 2.0E-4;
var r1s = 1 / (r1 * r1);
var r2s = 1 / (r2 * r2 * this.sign );
result[0] = q * (-xx1 * r1s - xx2 * r2s);
result[1] = q * (-y[1] * r1s - y[1] * r2s);
result[2] = 0.2 * (java.lang.Math.log(r1 + 1.0E-20) + this.sign * java.lang.Math.log(r2 + 1.0E-20));
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Line Separation", 30);
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction(Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRadialDipole))), [this, null]), null, Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquaredRadial))), [this, null]));
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRadialDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadialDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.sign = -1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dipole lines";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRadialQuad))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRadialQuad", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "quad lines";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(40 + (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() * 80/200|0));
var xx1 = y[0] + sep;
var xx2 = y[0] - sep;
var yy1 = y[1] + sep;
var yy2 = y[1] - sep;
var r1 = P$.VecDemoFrame.distanceXY$D$D(xx1, yy1);
var r2 = P$.VecDemoFrame.distanceXY$D$D(xx2, yy1);
var r3 = P$.VecDemoFrame.distanceXY$D$D(xx1, yy2);
var r4 = P$.VecDemoFrame.distanceXY$D$D(xx2, yy2);
if (r1 < 0.001  || r2 < 0.001   || r3 < 0.001   || r4 < 0.001  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var q = 3.0E-4;
result[0] = q * (-xx1 / (r1 * r1) - xx2 / (r4 * r4) + xx2 / (r2 * r2) + xx1 / (r3 * r3));
result[1] = q * (-yy1 / (r1 * r1) - yy2 / (r4 * r4) + yy1 / (r2 * r2) + yy2 / (r3 * r3));
result[2] = 0.2 * (+java.lang.Math.log(r1 + 1.0E-20) - java.lang.Math.log(r2 + 1.0E-20) - java.lang.Math.log(r3 + 1.0E-20)  + java.lang.Math.log(r4 + 1.0E-20));
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Line Separation", 30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquaredRadial))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseSquaredRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S("point charge", null, "1/r^2 single");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceArray$DA(y);
if (r < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var r3 = r * r * r ;
var q = 3.0E-4 / r3;
result[0] = -y[0] * q;
result[1] = -y[1] * q;
result[2] = -0.3 / r;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquaredRadialDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseSquaredRadialDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sign2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S("point charge double", null, "1/r^2 double");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(40 + (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() * 80/200|0));
var xx1 = y[0] - sep;
var xx2 = y[0] + sep;
var r1 = P$.VecDemoFrame.distanceXY$D$D(xx1, y[1]);
if (r1 < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var r2 = P$.VecDemoFrame.distanceXY$D$D(xx2, y[1]);
if (r2 < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var q = 3.0E-4;
var rq1 = q / (r1 * r1 * r1 );
var rq2 = q / (r2 * r2 * r2 ) * this.sign2;
result[0] = -xx1 * rq1 - xx2 * rq2;
result[1] = -y[1] * rq1 - y[1] * rq2;
result[2] = -0.05 / r1 - 0.05 * this.sign2 / r2;
if (this.sign2 == -1 ) result[2] *= 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.sign2 = 1;
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Charge Separation", 30);
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction(Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquaredRadialDipole))), [this, null]), null, Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRotational))), [this, null]));
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseSquaredRadialDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseSquaredRadialDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dipole";
});

Clazz.newMeth(C$, 'setup', function () {
C$.superclazz.prototype.setup.apply(this, []);
this.sign2 = -1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquaredRadialQuad))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseSquaredRadialQuad", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "quadrupole";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(40 + (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() * 80/200|0));
var xx1 = y[0] - sep;
var xx2 = y[0] + sep;
var yy1 = y[1] - sep;
var yy2 = y[1] + sep;
var r1 = P$.VecDemoFrame.distanceXY$D$D(xx1, yy1);
var r2 = P$.VecDemoFrame.distanceXY$D$D(xx2, yy1);
var r3 = P$.VecDemoFrame.distanceXY$D$D(xx1, yy2);
var r4 = P$.VecDemoFrame.distanceXY$D$D(xx2, yy2);
if (r1 < 0.001  || r2 < 0.001   || r3 < 0.001   || r4 < 0.001  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var q = 3.0E-4;
var rq1 = q / (r1 * r1 * r1 );
var rq2 = q / (r2 * r2 * r2 );
var rq3 = q / (r3 * r3 * r3 );
var rq4 = q / (r4 * r4 * r4 );
result[0] = -xx1 * rq1 - xx2 * rq4 + xx2 * rq2 + xx1 * rq3;
result[1] = -yy1 * rq1 - yy2 * rq4 + yy1 * rq2 + yy2 * rq3;
result[2] = 0.05 * (-1 / r1 + 1 / r2 + 1 / r3 - 1 / r4);
});

Clazz.newMeth(C$, 'setup', function () {
C$.superclazz.prototype.setup.apply(this, []);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Charge Separation", 30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ConductingPlate))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ConductingPlate", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.z = null;
this.z2 = null;
this.plate = false;
this.a = 0;
this.base = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting plate";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.z = Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Complex'))));
this.z2 = Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Complex'))));
this.plate = true;
}, 1);

Clazz.newMeth(C$, 'setupFrame', function () {
this.a = (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() + 1) / 100.0;
this.z.setReIm$D$D(0, 1 / this.a);
this.z.arcsin();
this.base = this.z.im;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[1] >= -0.02  && y[1] <= 0.02  ) {
if ((this.plate && y[0] >= -this.a   && y[0] <= this.a  ) || (!this.plate && (y[0] >= this.a  || y[0] <= -this.a  ) ) ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
}this.z.setReIm$D$D(y[0] / this.a, y[1] / this.a);
if (y[1] < 0  && this.plate ) this.z.im = -this.z.im;
this.z2.set$com_falstad_Complex(this.z);
this.z2.arcsin();
result[2] = (this.plate) ? this.z2.im / this.base - 1 : -this.z2.re * 0.6;
this.z.square();
this.z.multRe$D(-1);
this.z.addRe$D(1);
this.z.pow$D(-0.5);
this.z.multRe$D(1 / this.a);
if (this.plate) {
result[1] = this.z.re * -7.0E-4;
result[0] = this.z.im * -7.0E-4;
if (y[1] <= 0 ) result[1] = -result[1];
} else {
result[0] = this.z.re * 7.0E-4;
result[1] = -this.z.im * 7.0E-4;
if (y[1] == 0 ) result[1] = -result[1];
}});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Plate Size", 60);
});

Clazz.newMeth(C$, 'getDivOffset', function () {
return -17.3;
});

Clazz.newMeth(C$, 'getDivRange', function () {
return 2.5;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ChargedPlate))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ChargedPlate", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.ConductingPlate']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cz = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.cz = Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Complex'))));
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged plate";
});

Clazz.newMeth(C$, 'getDivOffset', function () {
return 4;
});

Clazz.newMeth(C$, 'getDivRange', function () {
return 11;
});

Clazz.newMeth(C$, 'getPot$D$D$D', function (a1, a2, y) {
this.cz.setReIm$D$D(y, -a1);
this.cz.multReIm$D$D(y, a2);
this.cz.log();
var b1 = this.cz.im;
this.cz.setReIm$D$D(y, a1);
this.cz.multReIm$D$D(y, -a2);
this.cz.log();
var y2 = y * y;
if (y2 == 0 ) y2 = 1.0E-8;
return 0.3 * (2 * (a1 - a2) + (b1 - this.cz.im) * y + a2 * java.lang.Math.log(a2 * a2 + y2) - a1 * java.lang.Math.log(a1 * a1 + y2));
});

Clazz.newMeth(C$, 'calcDivergence', function () {
var sep = this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 100.0;
var x;
var y;
for (x = 0; x != 80; x++) {
var xx = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(x);
if (xx < -this.a  || xx > this.a  ) continue;
this.b$['com.falstad.VecDemoFrame'].grid[x][40].div = -this.b$['com.falstad.VecDemoFrame'].reverse;
}
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[1] >= -0.01  && y[1] <= 0.01   && (y[0] >= -this.a  && y[0] <= this.a  ) ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var a1 = -this.a - y[0];
var a2 = this.a - y[0];
var y2 = y[1] * y[1];
if (y2 == 0 ) y2 = 1.0E-8;
var q = 3.0E-4 / this.a;
result[0] = 0.5 * q * java.lang.Math.log((y2 + a2 * a2) / (y2 + a1 * a1)) ;
result[1] = q * (java.lang.Math.atan(a1 / y[1]) - java.lang.Math.atan(a2 / y[1]));
result[2] = 0.4 * this.getPot$D$D$D(a1, a2, y[1]) / this.a;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ChargedPlatePair))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ChargedPlatePair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.ChargedPlate']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dipole = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged plate pair";
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return false;
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dipole = 1;
}, 1);

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 100.0;
if ((y[1] >= -0.01 + sep  && y[1] <= 0.01 + sep   || y[1] >= -0.01 - sep  && y[1] <= 0.01 - sep   ) && y[0] >= -this.a   && y[0] <= this.a  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var a1 = -this.a - y[0];
var a2 = this.a - y[0];
var y1 = y[1] - sep;
var y12 = y1 * y1;
if (y12 == 0 ) y12 = 1.0E-8;
var y2 = y[1] + sep;
var y22 = y2 * y2;
if (y22 == 0 ) y22 = 1.0E-8;
var q = 3.0E-4 / this.a;
result[0] = 0.5 * q * (java.lang.Math.log((y12 + a2 * a2) / (y12 + a1 * a1)) + this.dipole * java.lang.Math.log((y22 + a2 * a2) / (y22 + a1 * a1))) ;
result[1] = q * (java.lang.Math.atan(a1 / y1) - java.lang.Math.atan(a2 / y1) + this.dipole * (java.lang.Math.atan(a1 / y2) - java.lang.Math.atan(a2 / y2)));
result[2] = 0.4 * (this.getPot$D$D$D(a1, a2, y1) + this.dipole * this.getPot$D$D$D(a1, a2, y2)) / this.a;
});

Clazz.newMeth(C$, 'calcDivergence', function () {
var sep = this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 100.0;
var x;
var y;
for (x = 0; x != 80; x++) {
var xx = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(x);
if (xx < -this.a  || xx > this.a  ) continue;
y = this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(sep);
this.b$['com.falstad.VecDemoFrame'].grid[x][y].div = -this.b$['com.falstad.VecDemoFrame'].reverse;
y = this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(-sep);
this.b$['com.falstad.VecDemoFrame'].grid[x][y].div = -this.dipole * this.b$['com.falstad.VecDemoFrame'].reverse;
}
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Sheet Size", 60);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(1, "Sheet Separation", 33);
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
var size = this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() / 100.0;
var sep = this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 100.0;
if (y[0] >= -size  && y[0] <= size  ) {
if (y[1] > sep ) {
if (oldY[1] < sep ) return true;
} else if (y[1] < -sep ) {
if (oldY[1] > -sep ) return true;
} else if (oldY[1] > sep  || oldY[1] < -sep  ) return true;
}return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ChargedPlateDipole))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ChargedPlateDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.ChargedPlatePair']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged plate dipole";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dipole = -1;
}, 1);

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InfiniteChargedPlane))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InfiniteChargedPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "infinite plane";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var alpha = 4.0E-4;
if (y[1] > -0.01  && y[1] < 0.01  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
result[0] = 0;
result[1] = (y[1] <= 0 ) ? alpha : -alpha;
result[2] = java.lang.Math.abs(y[1]) - 1;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Cylinder))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Cylinder", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting cylinder";
});

Clazz.newMeth(C$, 'getCylRadius', function () {
return (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() + 1) / 110.0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 30);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(1, "Cylinder Potential", 1);
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a = this.getCylRadius();
var farpt = 4;
var pot = 2 * (this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 50.0 - 1);
var mult = 4000;
var cq = -pot / (4000 * (java.lang.Math.log(a) - java.lang.Math.log(farpt)));
var pot0 = 4000 * cq * java.lang.Math.log(farpt) ;
var y0 = y[0];
var y1 = y[1];
var r1 = P$.VecDemoFrame.distanceXY$D$D(y0, y1);
if (r1 < a ) {
result[0] = result[1] = 0;
result[2] = pot;
this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
return;
}var a1 = 5 * cq / (r1 * r1);
result[0] = y0 * a1;
result[1] = y1 * a1;
result[2] = pot0 - cq * 4000 * java.lang.Math.log(r1) ;
});

Clazz.newMeth(C$, 'calcDivergence', function () {
var a = this.getCylRadius();
var i;
for (i = 0; i != 100; i++) {
var th = 2 * 3.141592653589793 * i  / 100.0;
var xx = java.lang.Math.cos(th) * a;
var yy = java.lang.Math.sin(th) * a;
this.b$['com.falstad.VecDemoFrame'].grid[this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(xx)][this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(yy)].div -= this.b$['com.falstad.VecDemoFrame'].reverse / 20.0;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').CylinderAndLineCharge))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "CylinderAndLineCharge", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.q = 0;
this.a = 0;
this.b = 0;
this.spos = 0;
this.imagePos = 0;
this.cq = 0;
this.pot0 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "cyl + line charge";
});

Clazz.newMeth(C$, 'getCylRadius', function () {
return (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() + 1) / 110.0;
});

Clazz.newMeth(C$, 'getSeparation', function () {
return this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 100.0;
});

Clazz.newMeth(C$, 'getCylPos', function () {
return this.getSeparation() / 2;
});

Clazz.newMeth(C$, 'getPointPos', function () {
return -this.getSeparation() / 2 - this.getCylRadius();
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 30);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(1, "Separation", 30);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(2, "Cylinder Potential", 50);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.q = -3.0E-4;
this.a = this.getCylRadius();
this.b = this.getSeparation() + this.a;
this.spos = this.getCylPos();
this.imagePos = this.spos - this.a * this.a / this.b;
var r2_0 = this.spos + this.a - this.imagePos;
var r3_0 = this.spos + this.a - this.getPointPos();
this.cq = this.a * this.a * (this.q / (r2_0 * r2_0) - this.q / (r3_0 * r3_0)) ;
this.pot0 = -this.cq * java.lang.Math.log(this.a) + this.q * java.lang.Math.log(r2_0) - this.q * java.lang.Math.log(r3_0);
this.cq -= (this.b$['com.falstad.VecDemoFrame'].aux3Bar.getValue() / 50.0 - 1) * 6.0E-4 / java.lang.Math.log(this.a);
});

Clazz.newMeth(C$, 'calcDivergence', function () {
var i;
var pos = this.b$['com.falstad.VecDemoFrame'].rk_k1;
var res = this.b$['com.falstad.VecDemoFrame'].rk_k2;
var a1 = this.getCylRadius() + 0.001;
var x;
var y;
for (x = 0; x != 80; x++) for (y = 0; y != 80; y++) this.b$['com.falstad.VecDemoFrame'].grid[x][y].div = 0;


this.b$['com.falstad.VecDemoFrame'].grid[this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(this.getPointPos())][this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(0)].div = -this.b$['com.falstad.VecDemoFrame'].reverse;
for (i = 0; i != 200; i++) {
var th = 2 * 3.141592653589793 * i  / 200.0;
var costh = java.lang.Math.cos(th);
var sinth = java.lang.Math.sin(th);
pos[0] = costh * a1 + this.getCylPos();
pos[1] = sinth * a1;
pos[2] = 0;
this.b$['com.falstad.VecDemoFrame'].curfunc.getField$DA$DA(res, pos);
this.b$['com.falstad.VecDemoFrame'].grid[this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(costh * this.a + this.getCylPos())][this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(sinth * this.a)].div += (costh * res[0] + sinth * res[1]) * 60 * this.b$['com.falstad.VecDemoFrame'].reverse ;
}
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var x1 = y[0] - this.spos;
var r1 = P$.VecDemoFrame.distanceXY$D$D(x1, y[1]);
var mult = 4000;
var y0 = y[0];
var y1 = y[1];
if (r1 < this.a ) {
y0 = this.spos + this.a;
y1 = 0;
x1 = r1 = this.a;
this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
}var x2 = y0 - this.imagePos;
var r2 = P$.VecDemoFrame.distanceXY$D$D(x2, y1);
var x3 = y0 - this.getPointPos();
var r3 = P$.VecDemoFrame.distanceXY$D$D(x3, y1);
var chargeSize = 0.001;
if (r3 < chargeSize ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var a1 = this.cq / (r1 * r1);
var a2 = -this.q / (r2 * r2);
var a3 = this.q / (r3 * r3);
result[0] = x1 * a1 + x2 * a2 + x3 * a3;
result[1] = y1 * (a1 + a2 + a3 );
result[2] = 4000 * (-this.pot0 - this.cq * java.lang.Math.log(r1) + this.q * java.lang.Math.log(r2 + 1.0E-20) - this.q * java.lang.Math.log(r3 + 1.0E-20));
if (r1 == this.a ) result[0] = result[1] = 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').CylinderInField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "CylinderInField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.conducting = false;
this.showD = false;
this.a = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = true;
this.showD = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "cylinder in field";
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.a = this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() / 100.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a2 = this.a * this.a;
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
var e1 = this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 10.0 + 1;
var dimult = (this.conducting) ? 1 : (e1 - 1) / (e1 + 1);
var fmult = 6.0E-4;
var potmult = 3;
if (r < this.a ) {
result[0] = result[1] = result[2] = 0;
if (this.conducting) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
 else result[0] = (this.showD) ? e1 * fmult * (1 - dimult)  : fmult * (1 - dimult);
result[2] = -3.0 * (1 - dimult) * y[0] ;
return;
}var costh = y[0] / r;
var sinth = y[1] / r;
var r_2 = 1 / (r * r);
var er = (1 + dimult * a2 * r_2 ) * costh * fmult ;
var eth = -(1 - dimult * a2 * r_2 ) * sinth * fmult ;
er /= r;
result[0] = y[0] * er - eth * sinth;
result[1] = y[1] * er + eth * costh;
result[2] = -3.0 * (1 - dimult * a2 * r_2 ) * y[0] ;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 40);
});

Clazz.newMeth(C$, 'calcDivergence', function () {
var i;
var pos = this.b$['com.falstad.VecDemoFrame'].rk_k1;
var res = this.b$['com.falstad.VecDemoFrame'].rk_k2;
var a1 = this.a + 0.001;
var x;
var y;
for (x = 0; x != 80; x++) for (y = 0; y != 80; y++) this.b$['com.falstad.VecDemoFrame'].grid[x][y].div = 0;


for (i = 0; i != 200; i++) {
var th = 2 * 3.141592653589793 * i  / 200.0;
var costh = java.lang.Math.cos(th);
var sinth = java.lang.Math.sin(th);
pos[0] = costh * a1;
pos[1] = sinth * a1;
pos[2] = 0;
this.b$['com.falstad.VecDemoFrame'].curfunc.getField$DA$DA(res, pos);
var rx = res[0];
var ry = res[1];
var a2 = this.a - 0.001;
pos[0] = costh * a2;
pos[1] = sinth * a2;
pos[2] = 0;
this.b$['com.falstad.VecDemoFrame'].curfunc.getField$DA$DA(res, pos);
this.b$['com.falstad.VecDemoFrame'].grid[this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(costh * this.a)][this.b$['com.falstad.VecDemoFrame'].doubleToGrid$D(sinth * this.a)].div += (costh * (rx - res[0]) + sinth * (ry - res[1])) * 400.0 * this.b$['com.falstad.VecDemoFrame'].reverse ;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').DielectricCylinderInFieldE))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "DielectricCylinderInFieldE", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.CylinderInField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = false;
this.showD = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dielec cyl in field";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 40);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(1, "Dielectric Strength", 60);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').SlottedPlane))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "SlottedPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.z = null;
this.z2 = null;
this.z3 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "slotted conducting plane";
});

Clazz.newMeth(C$, 'getDivOffset', function () {
return -17.3;
});

Clazz.newMeth(C$, 'getDivRange', function () {
return 2.5;
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.z = Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Complex'))));
this.z2 = Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Complex'))));
this.z3 = Clazz.new_((I$[11]||(I$[11]=Clazz.load('com.falstad.Complex'))));
}, 1);

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a = (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() + 1) / 101.0;
this.z.setReIm$D$D(y[0], y[1]);
if (y[1] >= -0.01  && y[1] <= 0.01   && (y[0] < -a  || y[0] > a  ) ) {
this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
if (this.z.im == 0 ) this.z.im = -1.0E-8;
}this.z2.set$com_falstad_Complex(this.z);
this.z2.square();
this.z2.addRe$D(-a * a);
this.z3.set$com_falstad_Complex(this.z2);
this.z3.pow$D(0.5);
if (this.z3.im < 0 ) this.z3.multRe$D(-1);
this.z3.addReIm$D$D(this.z.re, this.z.im);
result[2] = this.z3.im * 2;
this.z2.pow$D(-0.5);
if (this.z2.im > 0 ) this.z2.multRe$D(-1);
this.z2.mult$com_falstad_Complex(this.z);
result[1] = -(1 + this.z2.re) * 0.003;
result[0] = -(this.z2.im) * 0.003;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Slot Size", 30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').PlanePair))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "PlanePair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.ConductingPlate']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting planes w/ gap";
});

Clazz.newMeth(C$, 'c$', function () {
C$.superclazz.c$.apply(this, []);
C$.$init$.apply(this);
this.plate = false;
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Gap Size", 20);
});

Clazz.newMeth(C$, 'getDivOffset', function () {
return -17;
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S(null, "current line", "1/r rotational");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
if (this.b$['com.falstad.VecDemoFrame'].showA) {
result[0] = result[1] = 0;
result[2] = -0.001 * (java.lang.Math.log(r) - 0.5);
} else {
if (r < 0.002 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
P$.VecDemoFrame.rotateParticle$DA$DA$D(result, y, 1.0E-4 / (r * r));
}});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRotationalPotential))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRotationalPotential", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1/r rotational potential";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
P$.VecDemoFrame.rotateParticle$DA$DA$D(result, y, 1.0E-4 / (r * r));
if (r < 0.002 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
 else if (y[0] >= 0  && y[1] < 0.001   && y[1] > -0.025  ) {
this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
if (y[1] == 0 ) result[1] = 1.0E8;
}var ang = java.lang.Math.atan2(y[1], y[0]);
if (ang < 0 ) ang += 6.283185307179586;
result[2] = (3.141592653589793 - ang) * 0.3;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRotationalDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRotationalDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadialDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dir2 = 0;
this.ext = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dir2 = 1;
this.ext = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S(null, "current line double", "1/r rotational double");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.VecDemoFrame'].gridToDouble$I(40 + (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() * 80/200|0));
var r = P$.VecDemoFrame.distanceXY$D$D(y[0] - sep, y[1]);
var r2 = P$.VecDemoFrame.distanceXY$D$D(y[0] + sep, y[1]);
if (this.ext) {
var p = this.b$['com.falstad.VecDemoFrame'].aux3Bar.getValue() * 3.141592653589793 / 50.0;
var s = this.b$['com.falstad.VecDemoFrame'].aux2Bar.getValue() / 6.0;
this.b$['com.falstad.VecDemoFrame'].getDirectionField$DA$DA$D(result, y, p);
result[0] *= s;
result[1] *= s;
result[2] *= s;
} else result[0] = result[1] = result[2] = 0;
if (this.b$['com.falstad.VecDemoFrame'].showA) {
if (this.dir2 == 1) result[2] += -0.001 * (java.lang.Math.log(r) + java.lang.Math.log(r2) - 1);
 else result[2] += 0.001 * (java.lang.Math.log(r) - java.lang.Math.log(r2));
} else {
if (r < 0.002 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
P$.VecDemoFrame.rotateParticleAdd$DA$DA$D$D$D(result, y, 1.0E-4 / (r * r), sep, 0);
if (r2 < 0.002 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
P$.VecDemoFrame.rotateParticleAdd$DA$DA$D$D$D(result, y, this.dir2 * 1.0E-4 / (r2 * r2), -sep, 0);
}});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Line Separation", 30);
if (this.ext) {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(1, "Ext. Strength", 7);
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(2, "Ext. Direction", 0);
}});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRotationalDoubleExt))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRotationalDoubleExt", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRotationalDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.ext = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S(null, "cur line double + ext", "1/r rot double + ext");
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRotationalDipole))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRotationalDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRotationalDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dir2 = -1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S(null, "current line dipole", "1/r rotational dipole");
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseRotationalDipoleExt))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseRotationalDipoleExt", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRotationalDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dir2 = -1;
this.ext = true;
}, 1);

Clazz.newMeth(C$, 'setup', function () {
C$.superclazz.prototype.setup.apply(this, []);
this.b$['com.falstad.VecDemoFrame'].aux2Bar.setValue$I(3);
this.b$['com.falstad.VecDemoFrame'].aux3Bar.setValue$I(25);
});

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S(null, "cur line dipole + ext", "1/r rot dipole + ext");
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').OneDirectionFunction))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "OneDirectionFunction", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$S$S$S(null, "uniform field", "one direction");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var th = this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() * 3.141592653589793 / 50.0;
this.b$['com.falstad.VecDemoFrame'].getDirectionField$DA$DA$D(result, y, th);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Theta", 0);
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.VecDemoFrame.BUILD_CASE_EMV$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction$com_falstad_VecDemoFrame_VecFunction(null, Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').MovingChargeField))), [this, null]), Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquaredRadialSphere))), [this, null]));
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "MovingChargeField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "moving charge";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var rz = P$.VecDemoFrame.distanceArray$DA(y);
if (this.b$['com.falstad.VecDemoFrame'].showA) {
result[0] = result[1] = 0;
result[2] = 3.0E-4 / rz;
} else {
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
if (rz < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
P$.VecDemoFrame.rotateParticle$DA$DA$D(result, y, 1.0E-4 / (rz * rz * rz ));
}});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseSquaredRadialSphere", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1/r^2 sphere";
});

Clazz.newMeth(C$, 'getSize', function () {
return (this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() + 1) / 110.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceArray$DA(y);
if (r < 0.01 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var a = this.getSize();
result[2] = 0.2 * ((r > a ) ? -1 / r : -3 / (2 * a) + r * r / (2 * a * a * a ));
if (r < a ) r = a;
var alpha = 3.0E-4 / (r * r * r );
result[0] = -y[0] * alpha;
result[1] = -y[1] * alpha;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "Sphere Size", 30);
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ConstRadial))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ConstRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "const radial";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceArray$DA(y);
if (r < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var q = 6.0E-4 / r;
result[0] = -q * y[0];
result[1] = -q * y[1];
result[2] = r;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').LinearRadial))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "LinearRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear radial";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceArray$DA(y);
if (r < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var k = 9.0E-4;
result[0] = -y[0] * k;
result[1] = -y[1] * k;
result[2] = r * r - 1;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ConstantToYAxis))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ConstantToYAxis", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "constant to y axis";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var alpha = 4.0E-4;
if (y[0] > -0.01  && y[0] < 0.01  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
result[0] = (y[0] <= 0 ) ? alpha : -alpha;
result[1] = 0;
result[2] = java.lang.Math.abs(y[0]) - 1;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[33]||(I$[33]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').LinearToYAxis))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "LinearToYAxis", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear to y axis";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = java.lang.Math.abs(y[0]);
if (r < 0.001 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var q = 9.0E-4;
result[0] = -y[0] * q;
result[1] = 0;
result[2] = r * r - 1;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[34]||(I$[34]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').LinearToXYAxes))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "LinearToXYAxes", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2-dimensional oscillator";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var alpha = 6.0E-4;
var r = java.lang.Math.sqrt((this.b$['com.falstad.VecDemoFrame'].aux1Bar.getValue() + 1) / 51.0);
result[0] = -alpha * r * y[0] ;
result[1] = -alpha / r * y[1];
result[2] = (y[0] * y[0] * r  + y[1] * y[1] / r) - 1;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].setupBar$I$S$I(0, "X/Y Ratio", 50);
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[35]||(I$[35]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseToYAxis))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseToYAxis", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "inverse to y axis";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[0] > -0.01  && y[0] < 0.01  ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
var alpha = 3.0E-4;
var zz = y[0];
if (zz == 0 ) zz = 1.0E-5;
result[0] = -alpha / zz;
result[1] = 0;
result[2] = -0.01 / (zz * zz);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').InverseSquareRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "InverseSquareRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1/r^2 rotational";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
if (r < 0.002 ) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
P$.VecDemoFrame.rotateParticle$DA$DA$D(result, y, 1.0E-4 / (r * r * r ));
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[37]||(I$[37]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').LinearRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "LinearRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear rotational";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4;
result[0] = -q * y[1];
result[1] = q * y[0];
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[38]||(I$[38]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ConstantRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ConstantRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "constant rotational";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.VecDemoFrame.distanceXY$D$D(y[0], y[1]);
P$.VecDemoFrame.rotateParticle$DA$DA$D(result, y, 6.0E-4 / r);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').FxEqualsYField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "FxEqualsYField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(y,0)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[2] = result[1] = 0;
result[0] = y[1] * 9.0E-4;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[40]||(I$[40]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').FxEqualsY2))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "FxEqualsY2", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(y^2,0)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[2] = result[1] = 0;
result[0] = y[1] * y[1] * 0.002 ;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[41]||(I$[41]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Saddle))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Saddle", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "saddle";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 0.001;
result[0] = -q * y[0];
result[1] = q * y[1] * 0.5 ;
result[2] = 1 * (2 * y[0] * y[0]  - y[1] * y[1]);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').RotationalExpansion))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "RotationalExpansion", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "rotation + expansion";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4;
result[0] = q * (y[0] - y[1]);
result[1] = q * (y[0] + y[1]);
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Function4Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Function4Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(x^2-y,x+y^2)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = q * (y[0] * y[0] - y[1]);
result[1] = q * (y[0] + y[1] * y[1]);
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[44]||(I$[44]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Function5Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Function5Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(x+y^2,x^2-y)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = q * (y[0] + y[1] * y[1]);
result[1] = q * (y[0] * y[0] - y[1]);
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[45]||(I$[45]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Function6Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Function6Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(x,x^2)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4;
result[0] = q * y[0];
result[1] = q * y[0] * y[0] ;
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[46]||(I$[46]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Function7Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Function7Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "u=x^2+y";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = -2 * y[0] * q ;
result[1] = -q;
result[2] = (y[0] * y[0] + y[1]) * 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[47]||(I$[47]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').PendulumPotential))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "PendulumPotential", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "pendulum potential";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4;
var xx = y[0] * 3.1;
var yy = y[1] * 3.1;
var cosx = java.lang.Math.cos(xx);
var cosy = java.lang.Math.cos(yy);
var sinx = java.lang.Math.sin(xx);
var siny = java.lang.Math.sin(yy);
result[0] = -q * sinx * cosy ;
result[1] = -q * cosx * siny ;
result[2] = -cosx * cosy * 0.5 ;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[48]||(I$[48]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Function8Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Function8Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "sin(r2)/r2";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r2 = 23 * (y[0] * y[0] + y[1] * y[1]) + 1.0E-8;
result[2] = java.lang.Math.sin(r2) / r2;
var r = java.lang.Math.sqrt(r2);
var sinr2 = java.lang.Math.sin(r2);
var cosr2 = java.lang.Math.cos(r2);
var r4 = r2 * r2;
var vecR = (sinr2 / r4 - cosr2 / r2) * 0.01;
result[0] = y[0] * vecR;
result[1] = y[1] * vecR;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[49]||(I$[49]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').UserDefinedPotential))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "UserDefinedPotential", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.expr = null;
this.y0 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "user-defined potential";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.VecDemoFrame'].textFields[0].setText$S("x*x");
this.b$['com.falstad.VecDemoFrame'].textFields[0].show();
this.b$['com.falstad.VecDemoFrame'].textFieldLabel.setText$S("Potential Function");
this.b$['com.falstad.VecDemoFrame'].textFieldLabel.show();
this.actionPerformed();
this.y0 = Clazz.array(Double.TYPE, [3]);
});

Clazz.newMeth(C$, 'actionPerformed', function () {
this.b$['com.falstad.VecDemoFrame'].parseError = false;
var ep = Clazz.new_((I$[50]||(I$[50]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ExprParser))).c$$S, [this, null, this.b$['com.falstad.VecDemoFrame'].textFields[0].getText()]);
this.expr = ep.parseExpression();
if (ep.gotError()) this.b$['com.falstad.VecDemoFrame'].parseError = true;
this.b$['com.falstad.VecDemoFrame'].$functionChanged = true;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var k = 1.0E-5;
var i;
for (i = 0; i != 3; i++) this.y0[i] = y[i];

var pot0 = this.expr.eval$DA(this.y0);
this.y0[0] += k;
result[0] = pot0 - this.expr.eval$DA(this.y0);
this.y0[0] = y[0];
this.y0[1] += k;
result[1] = pot0 - this.expr.eval$DA(this.y0);
this.y0[1] = y[1];
result[2] = pot0 * 0.01;
for (i = 0; i != 2; i++) if (!(result[i] > -10  && result[i] < 10  )) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[51]||(I$[51]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').UserDefinedFunction))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "UserDefinedFunction", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.VecDemoFrame','com.falstad.VecDemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.exprs = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "user-defined field";
});

Clazz.newMeth(C$, 'setup', function () {
this.exprs = Clazz.array((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))), [3]);
this.b$['com.falstad.VecDemoFrame'].textFields[0].setText$S("x");
this.b$['com.falstad.VecDemoFrame'].textFields[1].setText$S("y");
this.b$['com.falstad.VecDemoFrame'].textFieldLabel.setText$S("Field Functions");
this.b$['com.falstad.VecDemoFrame'].textFieldLabel.show();
var i;
for (i = 0; i != 2; i++) this.b$['com.falstad.VecDemoFrame'].textFields[i].show();

this.actionPerformed();
});

Clazz.newMeth(C$, 'actionPerformed', function () {
var i;
this.b$['com.falstad.VecDemoFrame'].parseError = false;
for (i = 0; i != 2; i++) {
var ep = Clazz.new_((I$[50]||(I$[50]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').ExprParser))).c$$S, [this, null, this.b$['com.falstad.VecDemoFrame'].textFields[i].getText()]);
this.exprs[i] = ep.parseExpression();
if (ep.gotError()) this.b$['com.falstad.VecDemoFrame'].parseError = true;
}
this.b$['com.falstad.VecDemoFrame'].$functionChanged = true;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var k = 2.0E-4;
var i;
for (i = 0; i != 2; i++) {
result[i] = k * this.exprs[i].eval$DA(y);
if (!(result[i] > -10  && result[i] < 10  )) this.b$['com.falstad.VecDemoFrame'].boundCheck = true;
}
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "DrawData", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.g = null;
this.mult = 0;
this.field = null;
this.vv = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Particle", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pos = null;
this.vel = null;
this.lifetime = 0;
this.phi = 0;
this.theta = 0;
this.phiv = 0;
this.thetav = 0;
this.stepsize = 0;
this.color = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.pos = Clazz.array(Double.TYPE, [3]);
this.vel = Clazz.array(Double.TYPE, [3]);
this.stepsize = 1;
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "FieldVector", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sx1 = 0;
this.sy1 = 0;
this.sx2 = 0;
this.sy2 = 0;
this.p1 = null;
this.p2 = null;
this.col = 0;
this.viewPri = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "GridElement", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.height = 0;
this.div = 0;
this.curl = 0;
this.normdot = 0;
this.vecX = 0;
this.vecY = 0;
this.visible = false;
this.valid = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ExprState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.z = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "Expr", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.left = null;
this.right = null;
this.value = 0;
this.type = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I', function (e1, e2, v) {
C$.$init$.apply(this);
this.left = e1;
this.right = e2;
this.type = v;
}, 1);

Clazz.newMeth(C$, 'c$$I$D', function (v, vv) {
C$.$init$.apply(this);
this.type = v;
this.value = vv;
}, 1);

Clazz.newMeth(C$, 'c$$I', function (v) {
C$.$init$.apply(this);
this.type = v;
}, 1);

Clazz.newMeth(C$, 'eval$DA', function (es) {
switch (this.type) {
case 1:
return this.left.eval$DA(es) + this.right.eval$DA(es);
case 2:
return this.left.eval$DA(es) - this.right.eval$DA(es);
case 7:
return this.left.eval$DA(es) * this.right.eval$DA(es);
case 8:
return this.left.eval$DA(es) / this.right.eval$DA(es);
case 9:
return java.lang.Math.pow(this.left.eval$DA(es), this.right.eval$DA(es));
case 10:
return -this.left.eval$DA(es);
case 6:
return this.value;
case 3:
return es[0] * 10;
case 4:
return es[1] * 10;
case 18:
return java.lang.Math.sqrt(es[0] * es[0] + es[1] * es[1]) * 10;
case 11:
return java.lang.Math.sin(this.left.eval$DA(es));
case 12:
return java.lang.Math.cos(this.left.eval$DA(es));
case 13:
return java.lang.Math.abs(this.left.eval$DA(es));
case 14:
return java.lang.Math.exp(this.left.eval$DA(es));
case 15:
return java.lang.Math.log(this.left.eval$DA(es));
case 16:
return java.lang.Math.sqrt(this.left.eval$DA(es));
case 17:
return java.lang.Math.tan(this.left.eval$DA(es));
default:
System.out.print$S("unknown\u000a");
}
return 0;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.VecDemoFrame, "ExprParser", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.text = null;
this.token = null;
this.pos = 0;
this.tlen = 0;
this.err = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getToken', function () {
while (this.pos < this.tlen && this.text.charAt(this.pos) == ' ' )this.pos++;

if (this.pos == this.tlen) {
this.token = "";
return;
}var i = this.pos;
var c = this.text.charAt(i).$c();
if ((c >= 48  && c <= 57  ) || c == 46  ) {
for (i = this.pos; i != this.tlen; i++) {
if (!((this.text.charAt(i) >= '0' && this.text.charAt(i) <= '9' ) || this.text.charAt(i) == '.' )) break;
}
} else if (c >= 97  && c <= 122  ) {
for (i = this.pos; i != this.tlen; i++) {
if (!(this.text.charAt(i) >= 'a' && this.text.charAt(i) <= 'z' )) break;
}
} else {
i++;
}this.token = this.text.substring(this.pos, i);
this.pos = i;
});

Clazz.newMeth(C$, 'skip$S', function (s) {
if (this.token.compareTo$S(s) != 0) return false;
this.getToken();
return true;
});

Clazz.newMeth(C$, 'skipOrError$S', function (s) {
if (!this.skip$S(s)) this.err = true;
});

Clazz.newMeth(C$, 'parseExpression', function () {
if (this.token.length$() == 0) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I$D, [this, null, 6, 0.0]);
var e = this.parse();
if (this.token.length$() > 0) this.err = true;
return e;
});

Clazz.newMeth(C$, 'parse', function () {
var e = this.parseMult();
while (true){
if (this.skip$S("+")) e = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, e, this.parseMult(), 1]);
 else if (this.skip$S("-")) e = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, e, this.parseMult(), 2]);
 else break;
}
return e;
});

Clazz.newMeth(C$, 'parseMult', function () {
var e = this.parseUminus();
while (true){
if (this.skip$S("*")) e = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, e, this.parseUminus(), 7]);
 else if (this.skip$S("/")) e = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, e, this.parseUminus(), 8]);
 else break;
}
return e;
});

Clazz.newMeth(C$, 'parseUminus', function () {
this.skip$S("+");
if (this.skip$S("-")) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, this.parsePow(), null, 10]);
return this.parsePow();
});

Clazz.newMeth(C$, 'parsePow', function () {
var e = this.parseTerm();
while (true){
if (this.skip$S("^")) e = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, e, this.parseTerm(), 9]);
 else break;
}
return e;
});

Clazz.newMeth(C$, 'parseFunc$I', function (t) {
this.skipOrError$S("(");
var e = this.parse();
this.skipOrError$S(")");
return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$com_falstad_VecDemoFrame_Expr$com_falstad_VecDemoFrame_Expr$I, [this, null, e, null, t]);
});

Clazz.newMeth(C$, 'parseTerm', function () {
if (this.skip$S("(")) {
var e = this.parse();
this.skipOrError$S(")");
return e;
}if (this.skip$S("x")) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I, [this, null, 3]);
if (this.skip$S("y")) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I, [this, null, 4]);
if (this.skip$S("r")) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I, [this, null, 18]);
if (this.skip$S("pi")) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I$D, [this, null, 6, 3.141592653589793]);
if (this.skip$S("e")) return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I$D, [this, null, 6, 2.718281828459045]);
if (this.skip$S("sin")) return this.parseFunc$I(11);
if (this.skip$S("cos")) return this.parseFunc$I(12);
if (this.skip$S("abs")) return this.parseFunc$I(13);
if (this.skip$S("exp")) return this.parseFunc$I(14);
if (this.skip$S("log")) return this.parseFunc$I(15);
if (this.skip$S("sqrt")) return this.parseFunc$I(16);
if (this.skip$S("tan")) return this.parseFunc$I(17);
try {
var e = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I$D, [this, null, 6, Double.$valueOf(this.token).doubleValue()]);
this.getToken();
return e;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.err = true;
System.out.print$S("unrecognized token: " + this.token + "\n" );
return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.VecDemoFrame').Expr))).c$$I$D, [this, null, 6, 0]);
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'c$$S', function (s) {
C$.$init$.apply(this);
this.text = s;
this.tlen = this.text.length$();
this.pos = 0;
this.err = false;
this.getToken();
}, 1);

Clazz.newMeth(C$, 'gotError', function () {
return this.err;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:15
