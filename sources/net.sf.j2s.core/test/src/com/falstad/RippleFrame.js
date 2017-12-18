(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "RippleFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.defaultSpeed = 0;
this.defaultResolution = 0;
this.startupTime = 0;
this.resolutionCutoff = 0;
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.gridSizeXY = 0;
this.gw = 0;
this.windowWidth = 0;
this.windowHeight = 0;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.windowBottom = 0;
this.windowRight = 0;
this.main = null;
this.blankButton = null;
this.blankWallsButton = null;
this.borderButton = null;
this.exportButton = null;
this.stoppedCheck = null;
this.fixedEndsCheck = null;
this.view3dCheck = null;
this.modeChooser = null;
this.sourceChooser = null;
this.setupChooser = null;
this.colorChooser = null;
this.setupList = null;
this.setup = null;
this.dampingBar = null;
this.speedBar = null;
this.freqBar = null;
this.resBar = null;
this.brightnessBar = null;
this.auxBar = null;
this.auxLabel = null;
this.dampcoef = 0;
this.freqTimeZero = 0;
this.movingSourcePos = 0;
this.brightMult = 0;
this.func = null;
this.funci = null;
this.damp = null;
this.walls = null;
this.exceptional = null;
this.medium = null;
this.sources = null;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.selectedSource = 0;
this.sourceIndex = 0;
this.freqBarValue = 0;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.useFrame = false;
this.showControls = false;
this.t = 0;
this.imageSource = null;
this.pixels = null;
this.sourceCount = 0;
this.sourcePlane = false;
this.sourceMoving = false;
this.increaseResolution = false;
this.adjustResolution = false;
this.sourceFreqCount = 0;
this.sourceWaveform = 0;
this.auxFunction = 0;
this.startTime = 0;
this.wallColor = null;
this.posColor = null;
this.negColor = null;
this.zeroColor = null;
this.medColor = null;
this.posMedColor = null;
this.negMedColor = null;
this.sourceColor = null;
this.schemeColors = null;
this.timerMethod = null;
this.timerDiv = 0;
this.impDialog = null;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.lastFrameTime = 0;
this.secTime = 0;
this.frames = 0;
this.steps = 0;
this.framerate = 0;
this.steprate = 0;
this.moveRight = false;
this.moveDown = false;
this.filterCount = 0;
this.realxmx = 0;
this.realxmy = 0;
this.realymz = 0;
this.realzmy = 0;
this.realzmx = 0;
this.realymadd = 0;
this.realzmadd = 0;
this.viewAngle = 0;
this.viewAngleDragStart = 0;
this.viewZoom = 0;
this.viewZoomDragStart = 0;
this.viewAngleCos = 0;
this.viewAngleSin = 0;
this.viewHeight = 0;
this.viewHeightDragStart = 0;
this.scalex = 0;
this.scaley = 0;
this.centerX3d = 0;
this.centerY3d = 0;
this.xpoints = null;
this.ypoints = null;
this.viewDistance = 0;
this.scaleMult = 0;
this.aspectRatio = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.defaultSpeed = 1;
this.defaultResolution = 110;
this.startupTime = 1000;
this.resolutionCutoff = 55;
this.engine = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.windowBottom = 0;
this.windowRight = 0;
this.movingSourcePos = 0;
this.brightMult = 1;
this.dragStartX = -1;
this.selectedSource = -1;
this.sourceCount = -1;
this.sourcePlane = false;
this.sourceMoving = false;
this.increaseResolution = false;
this.adjustResolution = true;
this.sourceFreqCount = -1;
this.sourceWaveform = 0;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.secTime = 0;
this.frames = 0;
this.steps = 0;
this.framerate = 0;
this.steprate = 0;
this.moveRight = true;
this.moveDown = true;
this.viewAngle = 3.141592653589793;
this.viewZoom = 0.775;
this.viewAngleCos = -1;
this.viewAngleSin = 0;
this.viewHeight = -38;
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.viewDistance = 66;
this.aspectRatio = 1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Ripple by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Ripple', function (a) {
C$.superclazz.c$$S.apply(this, ["Ripple Tank Applet v1.7f"]);
C$.$init$.apply(this);
this.setDefaultCloseOperation$I(2);
{
this.defaultSpeed = 6; this.defaultResolution = 110;
this.startupTime = 1500; this.resolutionCutoff = 200;
}this.applet = a;
this.useFrame = true;
this.showControls = true;
this.adjustResolution = true;
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
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.setupList = Clazz.new_((I$[78]||(I$[78]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[79]||(I$[79]=Clazz.load(Clazz.load('com.falstad.RippleFrame').SingleSourceSetup))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
var os = System.getProperty("os.name");
var res = this.defaultResolution;
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
{
}this.sources = Clazz.array((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))), [20]);
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[81]||(I$[81]=Clazz.load('com.falstad.RippleLayout')))));
this.cv = Clazz.new_((I$[82]||(I$[82]=Clazz.load('com.falstad.RippleCanvas'))).c$$com_falstad_RippleFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[83]||(I$[83]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.setupChooser);
this.sourceChooser = Clazz.new_((I$[83]||(I$[83]=Clazz.load('a2s.Choice'))));
this.sourceChooser.add$S("No Sources");
this.sourceChooser.add$S("1 Src, 1 Freq");
this.sourceChooser.add$S("1 Src, 2 Freq");
this.sourceChooser.add$S("2 Src, 1 Freq");
this.sourceChooser.add$S("2 Src, 2 Freq");
this.sourceChooser.add$S("3 Src, 1 Freq");
this.sourceChooser.add$S("4 Src, 1 Freq");
this.sourceChooser.add$S("1 Src, 1 Freq (Square)");
this.sourceChooser.add$S("1 Src, 1 Freq (Pulse)");
this.sourceChooser.add$S("1 Moving Src");
this.sourceChooser.add$S("1 Plane Src, 1 Freq");
this.sourceChooser.add$S("1 Plane Src, 2 Freq");
this.sourceChooser.add$S("2 Plane Src, 1 Freq");
this.sourceChooser.add$S("2 Plane Src, 2 Freq");
this.sourceChooser.add$S("1 Plane 1 Freq (Pulse)");
this.sourceChooser.add$S("1 Plane 1 Freq w/Phase");
this.sourceChooser.add$S("6 Src, 1 Freq");
this.sourceChooser.add$S("8 Src, 1 Freq");
this.sourceChooser.add$S("10 Src, 1 Freq");
this.sourceChooser.add$S("12 Src, 1 Freq");
this.sourceChooser.add$S("16 Src, 1 Freq");
this.sourceChooser.add$S("20 Src, 1 Freq");
this.sourceChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.sourceChooser);
this.modeChooser = Clazz.new_((I$[83]||(I$[83]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Edit Wave");
this.modeChooser.add$S("Mouse = Edit Walls");
this.modeChooser.add$S("Mouse = Edit Medium");
this.modeChooser.add$S("Mouse = Hold Wave");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.modeChooser);
this.colorChooser = Clazz.new_((I$[83]||(I$[83]=Clazz.load('a2s.Choice'))));
this.colorChooser.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.colorChooser);
this.blankButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Clear Waves"]);
if (this.showControls) this.main.add$java_awt_Component(this.blankButton);
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.blankWallsButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Clear Walls"]);
if (this.showControls) this.main.add$java_awt_Component(this.blankWallsButton);
this.blankWallsButton.addActionListener$java_awt_event_ActionListener(this);
this.borderButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Add Border"]);
if (this.showControls) this.main.add$java_awt_Component(this.borderButton);
this.borderButton.addActionListener$java_awt_event_ActionListener(this);
this.exportButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Import/Export"]);
if (this.showControls) this.main.add$java_awt_Component(this.exportButton);
this.exportButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[84]||(I$[84]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.stoppedCheck);
this.fixedEndsCheck = Clazz.new_((I$[84]||(I$[84]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Fixed Edges", true]);
this.fixedEndsCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.fixedEndsCheck);
this.view3dCheck = Clazz.new_((I$[84]||(I$[84]=Clazz.load('a2s.Checkbox'))).c$$S,["3-D View"]);
this.view3dCheck.addItemListener$java_awt_event_ItemListener(this);
if (this.showControls) this.main.add$java_awt_Component(this.view3dCheck);
var l = Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]);
this.speedBar = Clazz.new_((I$[86]||(I$[86]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.defaultSpeed, 1, 1, 20]);
if (this.showControls) {
this.main.add$java_awt_Component(l);
this.main.add$java_awt_Component(this.speedBar);
}this.speedBar.setName$S(l.getText());
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
l = Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]);
this.resBar = Clazz.new_((I$[86]||(I$[86]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 5, 5, 400]);
this.resBar.setName$S(l.getText());
if (this.showControls) {
this.main.add$java_awt_Component(l);
this.main.add$java_awt_Component(this.resBar);
}this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
l = Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S$I,["Damping", 0]);
this.dampingBar = Clazz.new_((I$[86]||(I$[86]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 2, 100]);
this.dampingBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.dampingBar.setName$S(l.getText());
if (this.showControls) {
this.main.add$java_awt_Component(l);
this.main.add$java_awt_Component(this.dampingBar);
}l = Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S$I,["Source Frequency", 0]);
this.freqBar = Clazz.new_((I$[86]||(I$[86]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, this.freqBarValue = 15, 1, 1, 30]);
this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) {
this.main.add$java_awt_Component(l);
this.main.add$java_awt_Component(this.freqBar);
}this.freqBar.setName$S(l.getText());
l = Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]);
this.brightnessBar = Clazz.new_((I$[86]||(I$[86]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 27, 1, 1, 1200]);
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) {
this.main.add$java_awt_Component(l);
this.main.add$java_awt_Component(this.brightnessBar);
}this.brightnessBar.setName$S(l.getText());
this.auxLabel = Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]);
this.auxBar = Clazz.new_((I$[86]||(I$[86]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 1, 1, 1, 30]);
this.auxBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.showControls) {
this.main.add$java_awt_Component(this.auxLabel);
this.main.add$java_awt_Component(this.auxBar);
}this.auxBar.setName$S("aux");
if (this.showControls) this.main.add$java_awt_Component(Clazz.new_((I$[85]||(I$[85]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
this.schemeColors = Clazz.array((I$[87]||(I$[87]=Clazz.load('java.awt.Color'))), [20, 8]);
if (!this.showControls) this.modeChooser.select$I(1);
this.sourceChooser.select$I(1);
this.setResolution();
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
}for (i = 0; i != 20; i++) {
param = this.applet.getParameter$S("colorScheme" + (i + 1));
if (param == null ) break;
this.decodeColorScheme$I$S(i, param);
}
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
if (this.applet != null ) e.printStackTrace();
} else {
throw e;
}
}
if (this.colorChooser.getItemCount() == 0) this.addDefaultColorScheme();
this.doColor();
this.random = Clazz.new_((I$[88]||(I$[88]=Clazz.load('java.util.Random'))));
this.setDamping();
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.reinit();
this.cv.setForeground$java_awt_Color((I$[87]||(I$[87]=Clazz.load('java.awt.Color'))).lightGray);
this.startTime = this.getTimeMillis();
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
}this.main.requestFocus();
});

Clazz.newMeth(C$, 'reinit', function () {
this.reinit$Z(true);
});

Clazz.newMeth(C$, 'reinit$Z', function (setup) {
this.sourceCount = -1;
System.out.print$S("reinit " + this.gridSizeX + " " + this.gridSizeY + "\n" );
this.gridSizeXY = this.gridSizeX * this.gridSizeY;
this.gw = this.gridSizeY;
this.func = Clazz.array(Float.TYPE, [this.gridSizeXY]);
this.funci = Clazz.array(Float.TYPE, [this.gridSizeXY]);
this.damp = Clazz.array(Float.TYPE, [this.gridSizeXY]);
this.exceptional = Clazz.array(Boolean.TYPE, [this.gridSizeXY]);
this.medium = Clazz.array(Integer.TYPE, [this.gridSizeXY]);
this.walls = Clazz.array(Boolean.TYPE, [this.gridSizeXY]);
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) this.damp[i] = 1.0;

for (i = 0; i != this.windowOffsetX; i++) for (j = 0; j != this.gridSizeX; j++) this.damp[i + j * this.gw] = this.damp[this.gridSizeX - 1 - i  + this.gw * j] = this.damp[j + this.gw * i] = this.damp[j + (this.gridSizeY - 1 - i ) * this.gw] = (0.999 - (this.windowOffsetX - i) * 0.002);


if (setup) this.doSetup();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width <= 0 || this.winSize.height <= 0 ) return;
this.aspectRatio = (this.winSize.width/this.winSize.height|0);
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz.forName("java.awt.image.BufferedImage");
var dbiclass = Clazz.forName("java.awt.image.DataBufferInt");
var rasclass = Clazz.forName("java.awt.image.Raster");
var cstr = biclass.getConstructor$ClassA(Clazz.array(java.lang.Class, -1, [Integer.TYPE, Integer.TYPE, Integer.TYPE]));
this.dbimage = cstr.newInstance$OA(Clazz.array(java.lang.Object, -1, [ new Integer(d.width),  new Integer(d.height),  new Integer(1)]));
var m = biclass.getMethod$S$ClassA("getRaster", null);
var ras = m.invoke$O$OA(this.dbimage, null);
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
var npix = d.width * d.height;
this.pixels = Clazz.array(Integer.TYPE, [npix]);
var i;
for (i = npix; --i >= 0; ) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[89]||(I$[89]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.dbimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}});

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

Clazz.newMeth(C$, 'doBlank', function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) this.func[x] = this.funci[x] = 1.0E-10;

});

Clazz.newMeth(C$, 'doBlankWalls', function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) {
this.walls[x] = false;
this.medium[x] = 0;
}
this.calcExceptions();
});

Clazz.newMeth(C$, 'doBorder', function () {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) {
this.setWall$I$I(x, this.windowOffsetY);
this.setWall$I$I(x, this.windowBottom);
}
for (y = 0; y < this.gridSizeY; y++) {
this.setWall$I$I(this.windowOffsetX, y);
this.setWall$I$I(this.windowRight, y);
}
this.calcExceptions();
});

Clazz.newMeth(C$, 'setWall$I$I', function (x, y) {
this.walls[x + this.gw * y] = true;
});

Clazz.newMeth(C$, 'setWall$I$I$Z', function (x, y, b) {
this.walls[x + this.gw * y] = b;
});

Clazz.newMeth(C$, 'setMedium$I$I$I', function (x, y, q) {
this.medium[x + this.gw * y] = q;
});

Clazz.newMeth(C$, 'getTimeMillis', function () {
try {
{
return System.currentTimeMillis();
}} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
ee.printStackTrace();
return 0;
} else {
throw ee;
}
}
});

Clazz.newMeth(C$, 'calcExceptions', function () {
var x;
var y;
for (x = 0; x != this.gridSizeX; x++) for (y = 0; y < this.windowOffsetY; y++) {
this.walls[x + this.gw * y] = this.walls[x + this.gw * this.windowOffsetY];
this.walls[x + this.gw * (this.gridSizeY - y - 1 )] = this.walls[x + this.gw * (this.gridSizeY - this.windowOffsetY - 1 )];
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.walls[x + this.gw * y] = this.walls[this.windowOffsetX + this.gw * y];
this.walls[this.gridSizeX - x - 1  + this.gw * y] = this.walls[this.gridSizeX - this.windowOffsetX - 1  + this.gw * y];
}

for (x = 1; x < this.gridSizeX - 1; x++) for (y = 1; y < this.gridSizeY - 1; y++) {
var gi = x + this.gw * y;
this.exceptional[gi] = this.walls[gi - 1] || this.walls[gi + 1] || this.walls[gi - this.gw] || this.walls[gi + this.gw] || this.walls[gi] || this.medium[gi] != this.medium[gi - 1]   || this.medium[gi] != this.medium[gi + 1] ;
if ((x == 1 || x == this.gridSizeX - 2 ) && this.medium[gi] != this.medium[this.gridSizeX - 1 - x  + this.gw * (y + 1)]  || this.medium[gi] != this.medium[this.gridSizeX - 1 - x  + this.gw * (y - 1)] ) this.exceptional[gi] = true;
}

this.exceptional[1 + this.gw] = this.exceptional[this.gridSizeX - 2 + this.gw] = this.exceptional[1 + (this.gridSizeY - 2) * this.gw] = this.exceptional[this.gridSizeX - 2 + (this.gridSizeY - 2) * this.gw] = true;
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateRipple$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width <= 0  || this.winSize.height <= 0 ) {
this.handleResize();
return;
}if (this.increaseResolution) {
this.increaseResolution = false;
if (this.resBar.getValue() < 495) {
var res = this.resBar.getValue() + 10;
System.out.println$S("increasing resolution to " + res);
this.setResolution$I(res);
}}var sysTime = this.getTimeMillis();
var tadd = 0;
if (!this.stoppedCheck.getState()) {
var val = 5;
tadd = val * 0.05;
}var i;
var j;
var stopFunc = this.dragging && this.selectedSource == -1  && this.view3dCheck.getState() == false   && this.modeChooser.getSelectedIndex() == 0 ;
if (this.stoppedCheck.getState()) stopFunc = true;
var iterCount = this.speedBar.getValue();
if (!stopFunc) {
var iter;
var mxx = this.gridSizeX - 1;
var mxy = this.gridSizeY - 1;
for (iter = 0; iter != iterCount; iter++) {
var jstart;
var jend;
var jinc;
if (this.moveDown) {
jstart = 1;
jend = mxy;
jinc = 1;
this.moveDown = false;
} else {
jstart = mxy - 1;
jend = 0;
jinc = -1;
this.moveDown = true;
}this.moveRight = this.moveDown;
var sinhalfth = 0;
var sinth = 0;
var scaleo = 0;
var curMedium = -1;
for (j = jstart; j != jend; j = j+(jinc)) {
var istart;
var iend;
var iinc;
if (this.moveRight) {
iinc = 1;
istart = 1;
iend = mxx;
this.moveRight = false;
} else {
iinc = -1;
istart = mxx - 1;
iend = 0;
this.moveRight = true;
}var gi = j * this.gw + istart;
var giEnd = j * this.gw + iend;
for (; gi != giEnd; gi = gi+(iinc)) {
var previ = this.func[gi - 1];
var nexti = this.func[gi + 1];
var prevj = this.func[gi - this.gw];
var nextj = this.func[gi + this.gw];
var basis = (nexti + previ + nextj + prevj ) * 0.25;
if (this.exceptional[gi]) {
if (curMedium != this.medium[gi]) {
curMedium = this.medium[gi];
var tadd2 = tadd * (1 - 0.002617801047120419 * curMedium);
sinhalfth = Math.sin(tadd2 / 2);
sinth = (Math.sin(tadd2) * this.dampcoef);
scaleo = (1 - Math.sqrt(4 * sinhalfth * sinhalfth  - sinth * sinth));
}if (this.walls[gi]) continue;
var count = 4;
if (this.fixedEndsCheck.getState()) {
if (this.walls[gi - 1]) previ = 0;
if (this.walls[gi + 1]) nexti = 0;
if (this.walls[gi - this.gw]) prevj = 0;
if (this.walls[gi + this.gw]) nextj = 0;
} else {
if (this.walls[gi - 1]) previ = this.walls[gi + 1] ? this.func[gi] : this.func[gi + 1];
if (this.walls[gi + 1]) nexti = this.walls[gi - 1] ? this.func[gi] : this.func[gi - 1];
if (this.walls[gi - this.gw]) prevj = this.walls[gi + this.gw] ? this.func[gi] : this.func[gi + this.gw];
if (this.walls[gi + this.gw]) nextj = this.walls[gi - this.gw] ? this.func[gi] : this.func[gi - this.gw];
}basis = (nexti + previ + nextj + prevj ) * 0.25;
}var a = 0;
var b = 0;
if (this.damp[gi] == 1.0 ) {
a = this.func[gi] - basis;
b = this.funci[gi];
} else {
a = (this.func[gi] - basis) * this.damp[gi];
b = this.funci[gi] * this.damp[gi];
}this.func[gi] = basis + a * scaleo - b * sinth;
this.funci[gi] = b * scaleo + a * sinth;
}
}
this.t += tadd;
if (this.sourceCount > 0) {
var w = this.freqBar.getValue() * (this.t - this.freqTimeZero) * 0.0233333 ;
var w2 = w;
var skip = false;
switch (this.auxFunction) {
case 2:
w2 = this.auxBar.getValue() * this.t * 0.0233333 ;
break;
case 1:
w2 = w + (this.auxBar.getValue() - 1) * 0.10833078115826873;
break;
}
var v = 0;
var v2 = 0;
switch (this.sourceWaveform) {
case 0:
v = Math.cos(w);
if (this.sourceCount >= (this.sourcePlane ? 4 : 2)) v2 = Math.cos(w2);
 else if (this.sourceFreqCount == 2) v = (v + Math.cos(w2)) * 0.5;
break;
case 1:
w %= 6.283185307179586;
v = (w < 3.141592653589793 ) ? 1 : -1;
break;
case 2:
{
w %= 6.283185307179586;
var pulselen = 0.7853981633974483;
var pulselen2 = this.freqBar.getValue() * 0.2;
if (pulselen2 < pulselen ) pulselen = pulselen2;
v = (w > pulselen ) ? 0 : Math.sin(w * 3.141592653589793 / pulselen);
if (w > pulselen * 2 ) skip = true;
}break;
}
for (j = 0; j != this.sourceCount; j++) {
if ((j % 2) == 0) this.sources[j].v = (v * this.setup.sourceStrength());
 else this.sources[j].v = (v2 * this.setup.sourceStrength());
}
if (this.sourcePlane) {
if (!skip) {
for (j = 0; j != (this.sourceCount/2|0); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawPlaneSource$I$I$I$I$F$D(src1.x, src1.y, src2.x, src2.y, src3.v, w);
}
}} else {
if (this.sourceMoving) {
var sy;
this.movingSourcePos += tadd * 0.02 * this.auxBar.getValue() ;
var wm = this.movingSourcePos;
var h = this.windowHeight - 3;
wm %= h * 2;
sy = (wm|0);
if (sy > h) sy = 2 * h - sy;
sy = sy+(this.windowOffsetY + 1);
this.sources[0].y = sy;
}for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
this.func[src.x + this.gw * src.y] = src.v;
this.funci[src.x + this.gw * src.y] = 0;
}
}}this.setup.eachFrame();
this.steps++;
this.filterGrid();
}
}this.brightMult = Math.exp(this.brightnessBar.getValue() / 100.0 - 5.0);
if (this.view3dCheck.getState()) this.draw3dView();
 else this.draw2dView();
if (this.imageSource != null ) this.imageSource.newPixels();
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (this.dragStartX >= 0 && !this.view3dCheck.getState() ) {
var x = (this.dragStartX * this.windowWidth/this.winSize.width|0);
var y = this.windowHeight - 1 - ((this.dragStartY * this.windowHeight/this.winSize.height|0)) ;
var s = "(" + x + "," + y + ")" ;
realg.setColor$java_awt_Color((I$[87]||(I$[87]=Clazz.load('java.awt.Color'))).white);
var fm = realg.getFontMetrics();
var h = 5 + fm.getAscent();
realg.fillRect$I$I$I$I(0, this.winSize.height - h, fm.stringWidth$S(s) + 10, h);
realg.setColor$java_awt_Color((I$[87]||(I$[87]=Clazz.load('java.awt.Color'))).black);
realg.drawString$S$I$I(s, 5, this.winSize.height - 5);
}if (!this.stoppedCheck.getState()) {
var diff = this.getTimeMillis() - sysTime;
if (this.adjustResolution && diff > 0  && sysTime < this.startTime + this.startupTime  && (this.windowOffsetX * diff/iterCount|0) < this.resolutionCutoff ) {
this.increaseResolution = true;
this.startTime = sysTime;
} else {
this.adjustResolution = false;
}if (this.dragging && this.selectedSource == -1  && this.modeChooser.getSelectedIndex() == 3 ) this.editFuncPoint$I$I(this.dragX, this.dragY);
this.cv.repaint$J(0);
}});

Clazz.newMeth(C$, 'filterGrid', function () {
var x;
var y;
if (this.fixedEndsCheck.getState()) return;
if (this.sourceCount > 0 && this.freqBarValue > 23 ) return;
if (this.sourceFreqCount >= 2 && this.auxBar.getValue() > 23 ) return;
if (++this.filterCount < 10) return;
this.filterCount = 0;
for (y = this.windowOffsetY; y < this.windowBottom; y++) for (x = this.windowOffsetX; x < this.windowRight; x++) {
var gi = x + y * this.gw;
if (this.walls[gi]) continue;
if (this.func[gi - 1] < 0  && this.func[gi] > 0   && this.func[gi + 1] < 0   && !this.walls[gi + 1]  && !this.walls[gi - 1] ) this.func[gi] = (this.func[gi - 1] + this.func[gi + 1]) / 2;
if (this.func[gi - this.gw] < 0  && this.func[gi] > 0   && this.func[gi + this.gw] < 0   && !this.walls[gi - this.gw]  && !this.walls[gi + this.gw] ) this.func[gi] = (this.func[gi - this.gw] + this.func[gi + this.gw]) / 2;
if (this.func[gi - 1] > 0  && this.func[gi] < 0   && this.func[gi + 1] > 0   && !this.walls[gi + 1]  && !this.walls[gi - 1] ) this.func[gi] = (this.func[gi - 1] + this.func[gi + 1]) / 2;
if (this.func[gi - this.gw] > 0  && this.func[gi] < 0   && this.func[gi + this.gw] > 0   && !this.walls[gi - this.gw]  && !this.walls[gi + this.gw] ) this.func[gi] = (this.func[gi - this.gw] + this.func[gi + this.gw]) / 2;
}

});

Clazz.newMeth(C$, 'plotPixel$I$I$I', function (x, y, pix) {
if (x < 0 || x >= this.winSize.width ) return;
try {
this.pixels[x + y * this.winSize.width] = pix;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'plotSource$I$I$I', function (n, xx, yy) {
var rad = 7;
var j;
var col = (this.sourceColor.getRed() << 16) | (this.sourceColor.getGreen() << 8) | (this.sourceColor.getBlue()) | -16777216 ;
if (n == this.selectedSource) col = col^(16777215);
for (j = 0; j <= rad; j++) {
var k = ((Math.sqrt(rad * rad - j * j) + 0.5)|0);
this.plotPixel$I$I$I(xx + j, yy + k, col);
this.plotPixel$I$I$I(xx + k, yy + j, col);
this.plotPixel$I$I$I(xx + j, yy - k, col);
this.plotPixel$I$I$I(xx - k, yy + j, col);
this.plotPixel$I$I$I(xx - j, yy + k, col);
this.plotPixel$I$I$I(xx + k, yy - j, col);
this.plotPixel$I$I$I(xx - j, yy - k, col);
this.plotPixel$I$I$I(xx - k, yy - j, col);
this.plotPixel$I$I$I(xx, yy + j, col);
this.plotPixel$I$I$I(xx, yy - j, col);
this.plotPixel$I$I$I(xx + j, yy, col);
this.plotPixel$I$I$I(xx - j, yy, col);
}
});

Clazz.newMeth(C$, 'draw2dView', function () {
var ix = 0;
var i;
var j;
var k;
var l;
for (j = 0; j != this.windowHeight; j++) {
ix = this.winSize.width * ((j * this.winSize.height/this.windowHeight|0));
var j2 = j + this.windowOffsetY;
var gi = j2 * this.gw + this.windowOffsetX;
var y = (j * this.winSize.height/this.windowHeight|0);
var y2 = ((j + 1) * this.winSize.height/this.windowHeight|0);
for (i = 0; i != this.windowWidth; i++, gi++) {
var x = (i * this.winSize.width/this.windowWidth|0);
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var i2 = i + this.windowOffsetX;
var dy = this.func[gi] * this.brightMult;
if (dy < -1 ) dy = -1;
if (dy > 1 ) dy = 1;
var col = 0;
var colR = 0;
var colG = 0;
var colB = 0;
if (this.walls[gi]) {
colR = this.wallColor.getRed();
colG = this.wallColor.getGreen();
colB = this.wallColor.getBlue();
} else if (dy < 0 ) {
var d1 = -dy;
var d2 = 1 - d1;
var d3 = this.medium[gi] * 0.003921414846476609;
var d4 = 1 - d3;
var a1 = d1 * d4;
var a2 = d2 * d4;
var a3 = d1 * d3;
var a4 = d2 * d3;
colR = ((this.negColor.getRed() * a1 + this.zeroColor.getRed() * a2 + this.negMedColor.getRed() * a3 + this.medColor.getRed() * a4)|0);
colG = ((this.negColor.getGreen() * a1 + this.zeroColor.getGreen() * a2 + this.negMedColor.getGreen() * a3 + this.medColor.getGreen() * a4)|0);
colB = ((this.negColor.getBlue() * a1 + this.zeroColor.getBlue() * a2 + this.negMedColor.getBlue() * a3 + this.medColor.getBlue() * a4)|0);
} else {
var d1 = dy;
var d2 = 1 - dy;
var d3 = this.medium[gi] * 0.003921414846476609;
var d4 = 1 - d3;
var a1 = d1 * d4;
var a2 = d2 * d4;
var a3 = d1 * d3;
var a4 = d2 * d3;
colR = ((this.posColor.getRed() * a1 + this.zeroColor.getRed() * a2 + this.posMedColor.getRed() * a3 + this.medColor.getRed() * a4)|0);
colG = ((this.posColor.getGreen() * a1 + this.zeroColor.getGreen() * a2 + this.posMedColor.getGreen() * a3 + this.medColor.getGreen() * a4)|0);
colB = ((this.posColor.getBlue() * a1 + this.zeroColor.getBlue() * a2 + this.posMedColor.getBlue() * a3 + this.medColor.getBlue() * a4)|0);
}col = -16777216 | (colR << 16) | (colG << 8) | (colB) ;
var ll;
for (k = x; k != x2; k++, ix++) for (l = y, ll = 0; l != y2; l++, ll = ll+(this.winSize.width)) this.pixels[ix + ll] = col;


}
}
var intf = (((this.gridSizeY/2|0) - this.windowOffsetY) * this.winSize.height/this.windowHeight|0);
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var xx = src.getScreenX();
var yy = src.getScreenY();
this.plotSource$I$I$I(i, xx, yy);
}
});

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I', function (x, y, z, xpoints, ypoints, pt) {
var realx = this.realxmx * x + this.realxmy * y;
var realy = this.realymz * z + this.realymadd;
var realz = this.realzmx * x + this.realzmy * y + this.realzmadd;
xpoints[pt] = this.centerX3d + ((realx / realz)|0);
ypoints[pt] = this.centerY3d - ((realy / realz)|0);
});

Clazz.newMeth(C$, 'scaleworld', function () {
this.scalex = this.viewZoom * ((this.winSize.width/4|0)) * 66.0  / 8;
this.scaley = -this.scalex;
var y = ((this.scaley * this.viewHeight / 66.0)|0);
this.centerX3d = (this.winSize.width/2|0);
this.centerY3d = (this.winSize.height/2|0) - y;
this.scaleMult = 16.0 / ((this.windowWidth/2|0));
this.realxmx = -this.viewAngleCos * this.scaleMult * this.scalex ;
this.realxmy = this.viewAngleSin * this.scaleMult * this.scalex ;
this.realymz = -this.brightMult * this.scaley;
this.realzmy = this.viewAngleCos * this.scaleMult;
this.realzmx = this.viewAngleSin * this.scaleMult;
this.realymadd = -this.viewHeight * this.scaley;
this.realzmadd = 66.0;
});

Clazz.newMeth(C$, 'draw3dView', function () {
var half = (this.gridSizeX/2|0);
this.scaleworld();
var x;
var y;
var xdir;
var xstart;
var xend;
var ydir;
var ystart;
var yend;
var sc = this.windowRight - 1;
if (this.viewAngleCos > 0 ) {
ystart = sc;
yend = this.windowOffsetY - 1;
ydir = -1;
} else {
ystart = this.windowOffsetY;
yend = sc + 1;
ydir = 1;
}if (this.viewAngleSin < 0 ) {
xstart = this.windowOffsetX;
xend = sc + 1;
xdir = 1;
} else {
xstart = sc;
xend = this.windowOffsetX - 1;
xdir = -1;
}var xFirst = (this.viewAngleSin * xdir < this.viewAngleCos * ydir );
for (x = this.winSize.width * this.winSize.height; --x >= 0; ) this.pixels[x] = -16777216;

var zval = 0.1;
var zval2 = zval * zval;
for (x = xstart; x != xend; x = x+(xdir)) {
for (y = ystart; y != yend; y = y+(ydir)) {
if (!xFirst) x = xstart;
for (; x != xend; x = x+(xdir)) {
var gi = x + this.gw * y;
this.map3d$D$D$D$IA$IA$I(x - half, y - half, this.func[gi], this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(x + 1 - half, y - half, this.func[gi + 1], this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(x - half, y + 1 - half, this.func[gi + this.gw], this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(x + 1 - half, y + 1 - half, this.func[gi + this.gw + 1 ], this.xpoints, this.ypoints, 3);
var qx = this.func[gi + 1] - this.func[gi];
var qy = this.func[gi + this.gw] - this.func[gi];
var normdot = (qx + qy + zval ) * 0.5780346820809249 / Math.sqrt(qx * qx + qy * qy + zval2);
var col = this.computeColor$I$D(gi, normdot);
this.fillTriangle$I$I$I$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[3], this.ypoints[3], col);
this.fillTriangle$I$I$I$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
if (xFirst) break;
}
}
if (!xFirst) break;
}
});

Clazz.newMeth(C$, 'computeColor$I$D', function (gix, c) {
var h = this.func[gix] * this.brightMult;
if (c < 0 ) c = 0;
if (c > 1 ) c = 1;
c = 0.5 + c * 0.5;
var redness = (h < 0 ) ? -h : 0;
var grnness = (h > 0 ) ? h : 0;
if (redness > 1 ) redness = 1;
if (grnness > 1 ) grnness = 1;
if (grnness < 0 ) grnness = 0;
if (redness < 0 ) redness = 0;
var grayness = (1 - (redness + grnness)) * c;
var grayness2 = grayness;
if (this.medium[gix] > 0) {
var mm = 1 - (this.medium[gix] * 0.003921414846476609);
grayness2 *= mm;
}var gray = 0.6;
var ri = (((c * redness + gray * grayness2) * 255)|0);
var gi = (((c * grnness + gray * grayness2) * 255)|0);
var bi = (((gray * grayness) * 255)|0);
return -16777216 | (ri << 16) | (gi << 8) | bi ;
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
for (; ya <= yb; ya++) this.pixels[x + ya * this.winSize.width] = col;

x = x+(dir);
if (x < 0 || x >= this.winSize.width ) return;
}
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'drawPlaneSource$I$I$I$I$F$D', function (x1, y1, x2, y2, v, w) {
if (y1 == y2) {
if (x1 == this.windowOffsetX) x1 = 0;
if (x2 == this.windowOffsetX) x2 = 0;
if (x1 == this.windowOffsetX + this.windowWidth - 1) x1 = this.gridSizeX - 1;
if (x2 == this.windowOffsetX + this.windowWidth - 1) x2 = this.gridSizeX - 1;
}if (x1 == x2) {
if (y1 == this.windowOffsetY) y1 = 0;
if (y2 == this.windowOffsetY) y2 = 0;
if (y1 == this.windowOffsetY + this.windowHeight - 1) y1 = this.gridSizeY - 1;
if (y2 == this.windowOffsetY + this.windowHeight - 1) y2 = this.gridSizeY - 1;
}if (x1 == x2 && y1 == y2 ) {
this.func[x1 + this.gw * y1] = v;
this.funci[x1 + this.gw * y1] = 0;
} else if (this.abs$I(y2 - y1) > this.abs$I(x2 - x1)) {
var sgn = this.sign$I(y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn ; y = (y+(sgn)|0)) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
var ph = sgn * (y - y1) / (y2 - y1);
var gi = x + this.gw * y;
this.func[gi] = this.setup.calcSourcePhase$D$F$D(ph, v, w);
this.funci[gi] = 0;
}
} else {
var sgn = this.sign$I(x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn ; x = (x+(sgn)|0)) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
var ph = sgn * (x - x1) / (x2 - x1);
var gi = x + this.gw * y;
this.func[gi] = this.setup.calcSourcePhase$D$F$D(ph, v, w);
this.funci[gi] = 0;
}
}});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.view3dCheck.getState()) return;
var x = e.getX();
var y = e.getY();
if (this.selectedSource != -1) {
x = (x * this.windowWidth/this.winSize.width|0);
y = (y * this.windowHeight/this.winSize.height|0);
if (x >= 0 && y >= 0  && x < this.windowWidth  && y < this.windowHeight ) {
this.sources[this.selectedSource].x = x + this.windowOffsetX;
this.sources[this.selectedSource].y = y + this.windowOffsetY;
}return;
}if (this.dragX == x && this.dragY == y ) this.editFuncPoint$I$I(x, y);
 else {
if (this.abs$I(y - this.dragY) > this.abs$I(x - this.dragX)) {
var x1 = (y < this.dragY) ? x : this.dragX;
var y1 = (y < this.dragY) ? y : this.dragY;
var x2 = (y > this.dragY) ? x : this.dragX;
var y2 = (y > this.dragY) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (y = y1; y <= y2; y++) {
x = x1 + ((x2 - x1) * (y - y1)/(y2 - y1)|0);
this.editFuncPoint$I$I(x, y);
}
} else {
var x1 = (x < this.dragX) ? x : this.dragX;
var y1 = (x < this.dragX) ? y : this.dragY;
var x2 = (x > this.dragX) ? x : this.dragX;
var y2 = (x > this.dragX) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (x = x1; x <= x2; x++) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.editFuncPoint$I$I(x, y);
}
}}});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var xp = (x * this.windowWidth/this.winSize.width|0) + this.windowOffsetX;
var yp = (y * this.windowHeight/this.winSize.height|0) + this.windowOffsetY;
var gi = xp + yp * this.gw;
if (this.modeChooser.getSelectedIndex() == 1) {
if (!this.dragSet && !this.dragClear ) {
this.dragClear = this.walls[gi];
this.dragSet = !this.dragClear;
}this.walls[gi] = this.dragSet;
this.calcExceptions();
this.func[gi] = this.funci[gi] = 0;
} else if (this.modeChooser.getSelectedIndex() == 2) {
if (!this.dragSet && !this.dragClear ) {
this.dragClear = this.medium[gi] > 0;
this.dragSet = !this.dragClear;
}this.medium[gi] = (this.dragSet) ? 191 : 0;
this.calcExceptions();
} else {
if (!this.dragSet && !this.dragClear ) {
this.dragClear = this.func[gi] > 0.1 ;
this.dragSet = !this.dragClear;
}this.func[gi] = (this.dragSet) ? 1 : -1;
this.funci[gi] = 0;
}this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'selectSource$java_awt_event_MouseEvent', function (me) {
var x = me.getX();
var y = me.getY();
var i;
this.selectedSource = -1;
var best = 14;
best = best*(best);
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var sx = src.getScreenX();
var sy = src.getScreenY();
var r2 = (sx - x) * (sx - x) + (sy - y) * (sy - y);
if (r2 < best) {
this.selectedSource = i;
best = r2;
}}
});

Clazz.newMeth(C$, 'setDamping', function () {
this.dampcoef = 1;
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
this.cv.repaint$J(100);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.blankButton ) {
this.doBlank();
this.cv.repaint();
}if (e.getSource() === this.blankWallsButton ) {
this.doBlankWalls();
this.cv.repaint();
}if (e.getSource() === this.borderButton ) {
this.doBorder();
this.cv.repaint();
}if (e.getSource() === this.exportButton ) this.doImport();
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
var src = e.getSource();
System.out.print$S(src.getName() + "=" + src.getValue() + "\n" );
if (src === this.resBar ) {
this.setResolution();
this.reinit();
}if (src === this.dampingBar ) this.setDamping();
if (src === this.brightnessBar ) this.cv.repaint$J(0);
if (src === this.freqBar ) this.setFreq();
});

Clazz.newMeth(C$, 'setFreqBar$I', function (x) {
this.freqBar.setValue$I(x);
this.freqBarValue = x;
this.freqTimeZero = 0;
});

Clazz.newMeth(C$, 'setFreq', function () {
var oldfreq = this.freqBarValue * 0.0233333;
this.freqBarValue = this.freqBar.getValue();
var newfreq = this.freqBarValue * 0.0233333;
var adj = newfreq - oldfreq;
this.freqTimeZero = this.t - oldfreq * (this.t - this.freqTimeZero) / newfreq;
});

Clazz.newMeth(C$, 'setResolution', function () {
this.windowWidth = this.windowHeight = this.resBar.getValue();
var border = (this.windowWidth/9|0);
if (border < 20) border = 20;
this.windowOffsetX = this.windowOffsetY = border;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.windowBottom = this.windowOffsetY + this.windowHeight - 1;
this.windowRight = this.windowOffsetX + this.windowWidth - 1;
});

Clazz.newMeth(C$, 'setResolution$I', function (x) {
this.resBar.setValue$I(x);
this.setResolution();
this.reinit();
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
if (this.view3dCheck.getState()) {
this.view3dDrag$java_awt_event_MouseEvent(e);
}if (!this.dragging) this.selectSource$java_awt_event_MouseEvent(e);
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
this.adjustResolution = false;
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if (this.dragging) return;
var x = e.getX();
var y = e.getY();
this.dragStartX = this.dragX = x;
this.dragStartY = this.dragY = y;
this.viewAngleDragStart = this.viewAngle;
this.viewHeightDragStart = this.viewHeight;
this.selectSource$java_awt_event_MouseEvent(e);
if (this.stoppedCheck.getState()) this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'view3dDrag$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.viewAngle = (this.dragStartX - x) / 40.0 + this.viewAngleDragStart;
while (this.viewAngle < 0 )this.viewAngle += 6.283185307179586;

while (this.viewAngle >= 6.283185307179586 )this.viewAngle -= 6.283185307179586;

this.viewAngleCos = Math.cos(this.viewAngle);
this.viewAngleSin = Math.sin(this.viewAngle);
this.viewHeight = (this.dragStartY - y) / 10.0 + this.viewHeightDragStart;
this.cv.repaint();
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
this.dragStartX = -1;
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.adjustResolution = false;
this.mouseMoved$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) == 0) return;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.dragSet = this.dragClear = false;
this.cv.repaint();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint();
return;
}if (e.getItemSelectable() === this.sourceChooser ) {
if (this.sourceChooser.getSelectedIndex() != this.sourceIndex) this.setSources();
}if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
if (e.getItemSelectable() === this.colorChooser ) this.doColor();
});

Clazz.newMeth(C$, 'doSetup', function () {
this.t = 0;
if (this.resBar.getValue() < 32) this.setResolution$I(32);
this.doBlank();
this.doBlankWalls();
this.sourceCount = -1;
this.sourceChooser.select$I(1);
this.dampingBar.setValue$I(10);
this.setFreqBar$I(5);
this.setBrightness$I(10);
this.auxBar.setValue$I(1);
this.fixedEndsCheck.setState$Z(true);
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.setup.select();
this.setup.doSetupSources();
this.calcExceptions();
this.setDamping();
});

Clazz.newMeth(C$, 'setBrightness$I', function (x) {
var m = x / 5.0;
m = (Math.log(m) + 5.0) * 100;
this.brightnessBar.setValue$I((m|0));
});

Clazz.newMeth(C$, 'doColor', function () {
var cn = this.colorChooser.getSelectedIndex();
this.wallColor = this.schemeColors[cn][0];
this.posColor = this.schemeColors[cn][1];
this.negColor = this.schemeColors[cn][2];
this.zeroColor = this.schemeColors[cn][3];
this.posMedColor = this.schemeColors[cn][4];
this.negMedColor = this.schemeColors[cn][5];
this.medColor = this.schemeColors[cn][6];
this.sourceColor = this.schemeColors[cn][7];
});

Clazz.newMeth(C$, 'addDefaultColorScheme', function () {
var schemes = Clazz.array(java.lang.String, -1, ["#808080 #00ffff #000000 #008080 #0000ff #000000 #000080 #ffffff", "#808080 #00ff00 #ff0000 #000000 #00ffff #ff00ff #0000ff #0000ff", "#800000 #00ffff #0000ff #000000 #80c8c8 #8080c8 #808080 #ffffff", "#800000 #ffffff #000000 #808080 #0000ff #000000 #000080 #00ff00", "#800000 #ffff00 #0000ff #000000 #ffff80 #8080ff #808080 #ffffff", "#808080 #00ff00 #ff0000 #FFFFFF #00ffff #ff00ff #0000ff #0000ff", "#FF0000 #00FF00 #0000FF #FFFF00 #00FFFF #FF00FF #FFFFFF #000000"]);
var i;
for (i = 0; i != 7; i++) this.decodeColorScheme$I$S(i, schemes[i]);

});

Clazz.newMeth(C$, 'decodeColorScheme$I$S', function (cn, s) {
var st = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.util.StringTokenizer'))).c$$S,[s]);
while (st.hasMoreTokens()){
var i;
for (i = 0; i != 8; i++) this.schemeColors[cn][i] = (I$[87]||(I$[87]=Clazz.load('java.awt.Color'))).decode$S(st.nextToken());

}
this.colorChooser.add$S("Color Scheme " + (cn + 1));
});

Clazz.newMeth(C$, 'addMedium', function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = (this.gridSizeY/2|0); j != this.gridSizeY; j++) this.medium[i + j * this.gw] = 191;


});

Clazz.newMeth(C$, 'setSources', function () {
this.sourceIndex = this.sourceChooser.getSelectedIndex();
var oldSCount = this.sourceCount;
var oldPlane = this.sourcePlane;
this.sourceFreqCount = 1;
this.sourcePlane = (this.sourceChooser.getSelectedIndex() >= 10 && this.sourceChooser.getSelectedIndex() < 16 );
this.sourceMoving = false;
this.sourceWaveform = 0;
this.sourceCount = 1;
var phase = false;
switch (this.sourceChooser.getSelectedIndex()) {
case 0:
this.sourceCount = 0;
break;
case 2:
this.sourceFreqCount = 2;
break;
case 3:
this.sourceCount = 2;
break;
case 4:
this.sourceCount = 2;
this.sourceFreqCount = 2;
break;
case 5:
this.sourceCount = 3;
break;
case 6:
this.sourceCount = 4;
break;
case 7:
this.sourceWaveform = 1;
break;
case 8:
this.sourceWaveform = 2;
break;
case 9:
this.sourceMoving = true;
break;
case 11:
this.sourceFreqCount = 2;
break;
case 12:
this.sourceCount = 2;
break;
case 13:
this.sourceCount = this.sourceFreqCount = 2;
break;
case 14:
this.sourceWaveform = 2;
break;
case 15:
phase = true;
break;
case 16:
this.sourceCount = 6;
break;
case 17:
this.sourceCount = 8;
break;
case 18:
this.sourceCount = 10;
break;
case 19:
this.sourceCount = 12;
break;
case 20:
this.sourceCount = 16;
break;
case 21:
this.sourceCount = 20;
break;
}
if (this.sourceFreqCount >= 2) {
this.auxFunction = 2;
this.auxBar.setValue$I(this.freqBar.getValue());
if (this.sourceCount == 2) this.auxLabel.setText$S("Source 2 Frequency");
 else this.auxLabel.setText$S("2nd Frequency");
} else if (this.sourceCount == 2 || this.sourceCount >= 4  || phase ) {
this.auxFunction = 1;
this.auxBar.setValue$I(1);
this.auxLabel.setText$S("Phase Difference");
} else if (this.sourceMoving) {
this.auxFunction = 3;
this.auxBar.setValue$I(7);
this.auxLabel.setText$S("Source Speed");
} else {
this.auxFunction = 0;
this.auxBar.setVisible$Z(false);
this.auxLabel.setVisible$Z(false);
}if (this.auxFunction != 0) {
this.auxBar.setVisible$Z(true);
this.auxLabel.setVisible$Z(true);
}this.validate();
if (this.sourcePlane) {
this.sourceCount = this.sourceCount*(2);
if (!(oldPlane && oldSCount == this.sourceCount )) {
var x2 = this.windowOffsetX + this.windowWidth - 1;
var y2 = this.windowOffsetY + this.windowHeight - 1;
this.sources[0] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, this.windowOffsetX, this.windowOffsetY + 1]);
this.sources[1] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, x2, this.windowOffsetY + 1]);
this.sources[2] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, this.windowOffsetX, y2]);
this.sources[3] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, x2, y2]);
}} else if (!(oldSCount == this.sourceCount && !oldPlane )) {
this.sources[0] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, (this.gridSizeX/2|0), this.windowOffsetY + 1]);
this.sources[1] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, (this.gridSizeX/2|0), this.gridSizeY - this.windowOffsetY - 2 ]);
this.sources[2] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, this.windowOffsetX + 1, (this.gridSizeY/2|0)]);
this.sources[3] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, this.gridSizeX - this.windowOffsetX - 2 , (this.gridSizeY/2|0)]);
var i;
for (i = 4; i < this.sourceCount; i++) this.sources[i] = Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OscSource))).c$$I$I, [this, null, this.windowOffsetX + 1 + i * 2 , (this.gridSizeY/2|0)]);

}});

Clazz.newMeth(C$, 'doImport', function () {
if (this.impDialog != null ) {
this.requestFocus();
this.impDialog.dispose();
this.impDialog = null;
}var dump = "";
var i;
dump = "$ 0 " + this.resBar.getValue() + " " + this.sourceChooser.getSelectedIndex() + " " + this.colorChooser.getSelectedIndex() + " " + this.fixedEndsCheck.getState() + " " + this.view3dCheck.getState() + " " + this.speedBar.getValue() + " " + this.freqBar.getValue() + " " + this.brightnessBar.getValue() + " " + this.auxBar.getValue() + "\n" ;
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
dump += "s " + src.x + " " + src.y + "\n" ;
}
for (i = 0; i != this.gridSizeXY; ) {
if (i >= this.gridSizeX) {
var istart = i;
for (; i < this.gridSizeXY && this.walls[i] == this.walls[i - this.gridSizeX]   && this.medium[i] == this.medium[i - this.gridSizeX] ; i++) ;
if (i > istart) {
dump += "l " + (i - istart) + "\n" ;
continue;
}}var x = this.walls[i];
var m = this.medium[i];
var ct = 0;
for (; i < this.gridSizeXY && this.walls[i] == x   && this.medium[i] == m ; ct++, i++) ;
dump += (x ? "w " : "c ") + ct + " " + m + "\n" ;
}
this.impDialog = Clazz.new_((I$[91]||(I$[91]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ImportDialog))).c$$com_falstad_RippleFrame$S, [this, null, this, dump]);
this.impDialog.setVisible$Z(true);
});

Clazz.newMeth(C$, 'readImport$S', function (s) {
var b = s.getBytes();
var len = s.length$();
var p;
var x = 0;
var srci = 0;
this.setupChooser.select$I(0);
this.setup = this.setupList.elementAt$I(0);
for (p = 0; p < len; ) {
var l;
var linelen = 0;
for (l = 0; l != len - p; l++) if (b[l + p] == 10  || b[l + p] == 13  ) {
linelen = l++;
if (l + p < b.length && b[l + p] == 10  ) l++;
break;
}
var line =  String.instantialize(b, p, linelen);
var st = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.util.StringTokenizer'))).c$$S,[line]);
while (st.hasMoreTokens()){
var type = st.nextToken();
var tint = type.charAt(0).$c();
try {
if (tint == 36 ) {
var flags =  new Integer(st.nextToken()).intValue();
this.resBar.setValue$I( new Integer(st.nextToken()).intValue());
this.setResolution();
this.reinit$Z(false);
this.sourceChooser.select$I( new Integer(st.nextToken()).intValue());
this.setSources();
this.colorChooser.select$I( new Integer(st.nextToken()).intValue());
this.doColor();
this.fixedEndsCheck.setState$Z(st.nextToken().compareTo$S("true") == 0);
this.view3dCheck.setState$Z(st.nextToken().compareTo$S("true") == 0);
this.speedBar.setValue$I( new Integer(st.nextToken()).intValue());
this.freqBar.setValue$I( new Integer(st.nextToken()).intValue());
this.brightnessBar.setValue$I( new Integer(st.nextToken()).intValue());
this.auxBar.setValue$I( new Integer(st.nextToken()).intValue());
break;
}if (tint == 119  || tint == 99  ) {
var w = (tint == 119 );
var ct =  new Integer(st.nextToken()).intValue();
var md =  new Integer(st.nextToken()).intValue();
for (; ct > 0; ct--, x++) {
this.walls[x] = w;
this.medium[x] = md;
}
break;
}if (tint == 108 ) {
var ct =  new Integer(st.nextToken()).intValue();
for (; ct > 0; ct--, x++) {
this.walls[x] = this.walls[x - this.gridSizeX];
this.medium[x] = this.medium[x - this.gridSizeX];
}
break;
}if (tint == 115 ) {
var sx =  new Integer(st.nextToken()).intValue();
var sy =  new Integer(st.nextToken()).intValue();
this.sources[srci].x = sx;
this.sources[srci].y = sy;
srci++;
break;
}System.out.println$S("unknown type!");
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
ee.printStackTrace();
break;
} else {
throw ee;
}
}
break;
}
p = p+(l);
}
this.calcExceptions();
this.setDamping();
});

Clazz.newMeth(C$, 'setupMode$I$I$I$I$I$I', function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i != sx; i++) for (j = 0; j != sy; j++) {
var gi = i + x + this.gw * (j + y) ;
this.func[gi] = (Math.sin(3.141592653589793 * nx * (i + 1)  / (sx + 1)) * Math.sin(3.141592653589793 * ny * (j + 1)  / (sy + 1)));
this.funci[gi] = 0;
}

});

Clazz.newMeth(C$, 'setupAcousticMode$I$I$I$I$I$I', function (x, y, sx, sy, nx, ny) {
var i;
var j;
if (nx == 0 && ny == 0 ) return;
for (i = 0; i != sx; i++) for (j = 0; j != sy; j++) {
var gi = i + x + this.gw * (j + y) ;
this.func[gi] = (Math.cos(3.141592653589793 * nx * i  / (sx - 1)) * Math.cos(3.141592653589793 * ny * j  / (sy - 1)));
this.funci[gi] = 0;
}

});
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "OscSource", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.v = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.$init$.apply(this);
this.x = xx;
this.y = yy;
}, 1);

Clazz.newMeth(C$, 'getScreenX', function () {
return (((this.x - this.b$['com.falstad.RippleFrame'].windowOffsetX) * this.b$['com.falstad.RippleFrame'].winSize.width + (this.b$['com.falstad.RippleFrame'].winSize.width/2|0))/this.b$['com.falstad.RippleFrame'].windowWidth|0);
});

Clazz.newMeth(C$, 'getScreenY', function () {
return (((this.y - this.b$['com.falstad.RippleFrame'].windowOffsetY) * this.b$['com.falstad.RippleFrame'].winSize.height + (this.b$['com.falstad.RippleFrame'].winSize.height/2|0))/this.b$['com.falstad.RippleFrame'].windowHeight|0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ImportDialogLayout", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, null, 'java.awt.LayoutManager');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'addLayoutComponent$S$java_awt_Component', function (name, c) {
});

Clazz.newMeth(C$, 'removeLayoutComponent$java_awt_Component', function (c) {
});

Clazz.newMeth(C$, 'preferredLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
});

Clazz.newMeth(C$, 'layoutContainer$java_awt_Container', function (target) {
var insets = target.getInsets();
var targetw = target.getSize().width - insets.left - insets.right ;
var targeth = target.getSize().height - (insets.top + insets.bottom);
var i;
var pw = 300;
if (target.getComponentCount() == 0) return;
var cl = target.getComponent$I(target.getComponentCount() - 1);
var dl = cl.getPreferredSize();
target.getComponent$I(0).setLocation$I$I(insets.left, insets.top);
var cw = target.getSize().width - insets.left - insets.right ;
var ch = target.getSize().height - insets.top - insets.bottom - dl.height ;
target.getComponent$I(0).setSize$I$I(cw, ch);
var h = ch + insets.top;
var x = 0;
for (i = 1; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
m.setLocation$I$I(insets.left + x, h);
m.setSize$I$I(d.width, d.height);
x = x+(d.width);
}}
});
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ImportDialog", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'a2s.Dialog', 'java.awt.event.ActionListener');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.rframe = null;
this.importButton = null;
this.clearButton = null;
this.closeButton = null;
this.text = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_RippleFrame$S', function (f, str) {
C$.superclazz.c$$a2s_Frame$S$Z.apply(this, [f, (str.length$() > 0) ? "Export" : "Import", false]);
C$.$init$.apply(this);
this.setDefaultCloseOperation$I(2);
this.rframe = f;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ImportDialogLayout))), [this, null]));
this.add$java_awt_Component(this.text = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.TextArea'))).c$$S$I$I,[str, 10, 60]));
this.add$java_awt_Component(this.importButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Import"]));
this.importButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.clearButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.closeButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Close"]));
this.closeButton.addActionListener$java_awt_event_ActionListener(this);
this.setSize$I$I(400, 300);
var x = (this.b$['com.falstad.RippleFrame'].main === this.rframe  ? this.rframe.getLocationOnScreen() : Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.awt.Point'))).c$$I$I,[0, 0]));
var d = this.getSize();
this.setLocation$I$I(x.x + ((this.b$['com.falstad.RippleFrame'].winSize.width - d.width)/2|0), x.y + ((this.b$['com.falstad.RippleFrame'].winSize.height - d.height)/2|0));
this.setVisible$Z(true);
if (str.length$() > 0) this.text.selectAll();
}, 1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
var i;
var src = e.getSource();
if (src === this.importButton ) {
this.rframe.readImport$S(this.text.getText());
this.setVisible$Z(false);
}if (src === this.closeButton ) this.setVisible$Z(false);
if (src === this.clearButton ) this.text.setText$S("");
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.rframe.requestFocus();
this.setVisible$Z(false);
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].setSources();
});

Clazz.newMeth(C$, 'deselect', function () {
});

Clazz.newMeth(C$, 'sourceStrength', function () {
return 1;
});

Clazz.newMeth(C$, 'eachFrame', function () {
});

Clazz.newMeth(C$, 'calcSourcePhase$D$F$D', function (ph, v, w) {
return v;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "SingleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Source";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setFreqBar$I(15);
this.b$['com.falstad.RippleFrame'].setBrightness$I(27);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.RippleFrame').DoubleSourceSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "DoubleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Two Sources";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setFreqBar$I(15);
this.b$['com.falstad.RippleFrame'].setBrightness$I(19);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(3);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 8;
this.b$['com.falstad.RippleFrame'].sources[1].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) + 8;
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].sources[1].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.RippleFrame').QuadrupleSourceSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "QuadrupleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Four Sources";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(6);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(15);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.RippleFrame').SingleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "SingleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 8;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(i, y);

for (i = -8; i <= 8; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x + i, y, false);

this.b$['com.falstad.RippleFrame'].setBrightness$I(7);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(25);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.RippleFrame').DoubleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "DoubleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Double Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 4;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(i, y);

for (i = 0; i != 3; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x - 5 - i , y, false);
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x + 5 + i , y, false);
}
this.b$['com.falstad.RippleFrame'].brightnessBar.setValue$I(488);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(22);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.RippleFrame').TripleSlitSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "TripleSlitSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Triple Slit";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 4;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(i, y);

for (i = -1; i <= 1; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x - 12 + i, y, false);
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x + i, y, false);
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x + 12 + i , y, false);
}
this.b$['com.falstad.RippleFrame'].setBrightness$I(12);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(22);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ObstacleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ObstacleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Obstacle";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 12;
for (i = -15; i <= 15; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(x + i, y);

this.b$['com.falstad.RippleFrame'].setBrightness$I(280);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(20);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.RippleFrame').HalfPlaneSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "HalfPlaneSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Half Plane";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var x = this.b$['com.falstad.RippleFrame'].windowOffsetX + (this.b$['com.falstad.RippleFrame'].windowWidth/2|0);
var i;
for (i = (this.b$['com.falstad.RippleFrame'].windowWidth/2|0); i < this.b$['com.falstad.RippleFrame'].windowWidth; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + i, this.b$['com.falstad.RippleFrame'].windowOffsetY + 3);

this.b$['com.falstad.RippleFrame'].setBrightness$I(4);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(25);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.RippleFrame').DipoleSourceSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "DipoleSourceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dipole Source";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(3);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[1].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
this.b$['com.falstad.RippleFrame'].sources[0].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) - 1;
this.b$['com.falstad.RippleFrame'].sources[1].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + 1;
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(29);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(13);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.RippleFrame').LateralQuadrupoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "LateralQuadrupoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Lateral Quadrupole";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(6);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[2].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
this.b$['com.falstad.RippleFrame'].sources[0].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) - 2;
this.b$['com.falstad.RippleFrame'].sources[2].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + 2;
this.b$['com.falstad.RippleFrame'].sources[1].x = this.b$['com.falstad.RippleFrame'].sources[3].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
this.b$['com.falstad.RippleFrame'].sources[1].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 2;
this.b$['com.falstad.RippleFrame'].sources[3].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) + 2;
this.b$['com.falstad.RippleFrame'].setFreqBar$I(13);
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(29);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.RippleFrame').LinearQuadrupoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "LinearQuadrupoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Linear Quadrupole";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(6);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].sources[2].y = this.b$['com.falstad.RippleFrame'].sources[3].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
this.b$['com.falstad.RippleFrame'].sources[0].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) - 3;
this.b$['com.falstad.RippleFrame'].sources[2].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + 3;
this.b$['com.falstad.RippleFrame'].sources[1].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + 1;
this.b$['com.falstad.RippleFrame'].sources[3].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) - 1;
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(29);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(13);
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.RippleFrame').HexapoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "HexapoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Hexapole";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(16);
this.b$['com.falstad.RippleFrame'].setSources();
this.doMultipole$I$D(6, 4);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(22);
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(29);
});

Clazz.newMeth(C$, 'doMultipole$I$D', function (n, dist) {
var i;
for (i = 0; i != n; i++) {
var xx = Math.round(dist * Math.cos(2 * 3.141592653589793 * i  / n));
var yy = Math.round(dist * Math.sin(2 * 3.141592653589793 * i  / n));
this.b$['com.falstad.RippleFrame'].sources[i].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + (xx|0);
this.b$['com.falstad.RippleFrame'].sources[i].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) + (yy|0);
}
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].brightnessBar.setValue$I(648);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OctupoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "OctupoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.HexapoleSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Octupole";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(17);
this.b$['com.falstad.RippleFrame'].setSources();
this.doMultipole$I$D(8, 4);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(22);
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(29);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Multi12Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Multi12Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.HexapoleSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "12-Pole";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(19);
this.b$['com.falstad.RippleFrame'].setSources();
this.doMultipole$I$D(12, 6);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(22);
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(29);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PlaneWaveSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PlaneWaveSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Plane Wave";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(15);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.RippleFrame').IntersectingPlaneWavesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "IntersectingPlaneWavesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Intersecting Planes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setBrightness$I(4);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(17);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(12);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].windowOffsetY;
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
this.b$['com.falstad.RippleFrame'].sources[2].x = this.b$['com.falstad.RippleFrame'].sources[3].x = this.b$['com.falstad.RippleFrame'].windowOffsetX;
this.b$['com.falstad.RippleFrame'].sources[2].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1;
this.b$['com.falstad.RippleFrame'].sources[3].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + this.b$['com.falstad.RippleFrame'].windowHeight - 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PhasedArray1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PhasedArray1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Phased Array 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setBrightness$I(5);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(17);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(15);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].sources[1].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
this.b$['com.falstad.RippleFrame'].sources[0].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 12;
this.b$['com.falstad.RippleFrame'].sources[1].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) + 12;
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(5);
});

Clazz.newMeth(C$, 'calcSourcePhase$D$F$D', function (ph, v, w) {
ph *= (this.b$['com.falstad.RippleFrame'].auxBar.getValue() - 15) * 3.8 * this.b$['com.falstad.RippleFrame'].freqBar.getValue() * 0.0233333 ;
return Math.sin(w + ph);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PhasedArray2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PhasedArray2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.PhasedArray1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Phased Array 2";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(15);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].sources[1].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1;
this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + this.b$['com.falstad.RippleFrame'].windowHeight - 2;
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(5);
});

Clazz.newMeth(C$, 'calcSourcePhase$D$F$D', function (ph, v, w) {
var d = this.b$['com.falstad.RippleFrame'].auxBar.getValue() * 2.5 / 30.0;
ph -= 0.5;
ph = Math.sqrt(ph * ph + d * d);
ph *= this.b$['com.falstad.RippleFrame'].freqBar.getValue() * 0.0233333 * 108 ;
return Math.sin(w + ph);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PhasedArray3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PhasedArray3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.PhasedArray2Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Phased Array 3";
});

Clazz.newMeth(C$, 'calcSourcePhase$D$F$D', function (ph, v, w) {
var d = this.b$['com.falstad.RippleFrame'].auxBar.getValue() * 2.5 / 30.0;
ph -= 0.5;
ph = Math.sqrt(ph * ph + d * d);
ph *= this.b$['com.falstad.RippleFrame'].freqBar.getValue() * 0.0233333 * 108 ;
return Math.sin(w - ph);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.RippleFrame').DopplerSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "DopplerSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Doppler Effect 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(9);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(13);
this.b$['com.falstad.RippleFrame'].setBrightness$I(20);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Doppler2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Doppler2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.wall = 0;
this.dir = 0;
this.waiting = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Doppler Effect 2";
});

Clazz.newMeth(C$, 'select', function () {
this.wall = this.b$['com.falstad.RippleFrame'].gridSizeY / 2.0;
this.dir = 1;
this.waiting = 0;
this.b$['com.falstad.RippleFrame'].setFreqBar$I(13);
this.b$['com.falstad.RippleFrame'].setBrightness$I(220);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(1);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1;
});

Clazz.newMeth(C$, 'eachFrame', function () {
if (this.waiting > 0) {
this.waiting--;
return;
}var w1 = (this.wall|0);
this.wall += this.dir * 0.04;
var w2 = (this.wall|0);
if (w1 != w2) {
var i;
for (i = this.b$['com.falstad.RippleFrame'].windowOffsetX + (this.b$['com.falstad.RippleFrame'].windowWidth/3|0); i <= this.b$['com.falstad.RippleFrame'].gridSizeX - 1; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(i, w1, false);
this.b$['com.falstad.RippleFrame'].setWall$I$I(i, w2);
var gi = i + w1 * this.b$['com.falstad.RippleFrame'].gw;
if (w2 < w1) this.b$['com.falstad.RippleFrame'].func[gi] = this.b$['com.falstad.RippleFrame'].funci[gi] = 0;
 else if (w1 > 1) {
this.b$['com.falstad.RippleFrame'].func[gi] = this.b$['com.falstad.RippleFrame'].func[gi - this.b$['com.falstad.RippleFrame'].gw] / 2;
this.b$['com.falstad.RippleFrame'].funci[gi] = this.b$['com.falstad.RippleFrame'].funci[gi - this.b$['com.falstad.RippleFrame'].gw] / 2;
}}
var w3 = ((w2 - this.b$['com.falstad.RippleFrame'].windowOffsetY)/2|0) + this.b$['com.falstad.RippleFrame'].windowOffsetY;
for (i = this.b$['com.falstad.RippleFrame'].windowOffsetY; i < w3; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I((this.b$['com.falstad.RippleFrame'].gridSizeX/2|0), i);

this.b$['com.falstad.RippleFrame'].setWall$I$I$Z((this.b$['com.falstad.RippleFrame'].gridSizeX/2|0), i, false);
this.b$['com.falstad.RippleFrame'].calcExceptions();
}if (w2 == this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/4|0) || w2 == this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight * 3/4|0) ) {
this.dir = -this.dir;
this.waiting = 1000;
}});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.RippleFrame').SonicBoomSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "SonicBoomSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Sonic Boom";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(9);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(13);
this.b$['com.falstad.RippleFrame'].setBrightness$I(20);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(30);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BigModeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BigModeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Big 1x1 Mode";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var n = (this.b$['com.falstad.RippleFrame'].windowWidth * 3/4|0);
var x = this.b$['com.falstad.RippleFrame'].windowOffsetX + (this.b$['com.falstad.RippleFrame'].windowWidth/2|0) - (n/2|0);
var y = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) - (n/2|0);
for (i = 0; i != n + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x + i - 1, y - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x + i - 1, y + n);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x - 1, y + i - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x + n, y + i - 1);
}
this.b$['com.falstad.RippleFrame'].setupMode$I$I$I$I$I$I(x, y, n, n, 1, 1);
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OneByOneModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "OneByOneModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1x1 Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
while (y + ny < this.b$['com.falstad.RippleFrame'].windowHeight){
var nx = (((y + ny) * (this.b$['com.falstad.RippleFrame'].windowWidth - 8)/this.b$['com.falstad.RippleFrame'].windowHeight|0)) + 6;
var y1 = y + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
this.b$['com.falstad.RippleFrame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, 1, 1);
y = y+(ny + 1);
}
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OneByNModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "OneByNModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1xN Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
var nx = this.b$['com.falstad.RippleFrame'].windowWidth - 2;
var mode = 1;
while (y + ny < this.b$['com.falstad.RippleFrame'].windowHeight){
var y1 = y + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
this.b$['com.falstad.RippleFrame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, mode, 1);
y = y+(ny + 1);
mode++;
}
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.RippleFrame').NByNModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "NByNModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "NxN Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var modex;
var modey;
var maxmode = 3;
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() >= 70) maxmode++;
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() >= 100) maxmode++;
var ny = (this.b$['com.falstad.RippleFrame'].windowHeight/maxmode|0) - 2;
var nx = (this.b$['com.falstad.RippleFrame'].windowWidth/maxmode|0) - 2;
for (modex = 1; modex <= maxmode; modex++) for (modey = 1; modey <= maxmode; modey++) {
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1 + (ny + 1) * (modey - 1) ;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1 + (nx + 1) * (modex - 1) ;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
this.b$['com.falstad.RippleFrame'].setupMode$I$I$I$I$I$I(x1, y1, nx, ny, modex, modey);
}

this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.RippleFrame').OneByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "OneByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1xN Mode Combos";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
var nx = this.b$['com.falstad.RippleFrame'].windowWidth - 2;
while (y + ny < this.b$['com.falstad.RippleFrame'].windowHeight){
var mode1 = this.b$['com.falstad.RippleFrame'].getrand$I(12) + 1;
var mode2;
do mode2 = this.b$['com.falstad.RippleFrame'].getrand$I(12) + 1;
 while (mode1 == mode2);
var y1 = y + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
for (i = 0; i != nx; i++) for (j = 0; j != ny; j++) {
var gi = i + x1 + this.b$['com.falstad.RippleFrame'].gw * (j + y1) ;
this.b$['com.falstad.RippleFrame'].func[gi] = (Math.sin(mode1 * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(3.141592653589793 * (j + 1) / (ny + 1)) * 0.5  + Math.sin(mode2 * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(3.141592653589793 * (j + 1) / (ny + 1)) * 0.5 );
this.b$['com.falstad.RippleFrame'].funci[gi] = 0;
}

y = y+(ny + 1);
}
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.RippleFrame').NByNModeCombosSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "NByNModeCombosSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "NxN Mode Combos";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var maxmode = 3;
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() >= 70) maxmode++;
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() >= 100) maxmode++;
var ny = (this.b$['com.falstad.RippleFrame'].windowHeight/maxmode|0) - 2;
var nx = (this.b$['com.falstad.RippleFrame'].windowWidth/maxmode|0) - 2;
var gx;
var gy;
for (gx = 1; gx <= maxmode; gx++) for (gy = 1; gy <= maxmode; gy++) {
var mode1x = this.b$['com.falstad.RippleFrame'].getrand$I(4) + 1;
var mode1y = this.b$['com.falstad.RippleFrame'].getrand$I(4) + 1;
var mode2x;
var mode2y;
do {
mode2x = this.b$['com.falstad.RippleFrame'].getrand$I(4) + 1;
mode2y = this.b$['com.falstad.RippleFrame'].getrand$I(4) + 1;
} while (mode1x == mode2x && mode1y == mode2y );
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1 + (ny + 1) * (gx - 1) ;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1 + (nx + 1) * (gy - 1) ;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
for (i = 0; i != nx; i++) for (j = 0; j != ny; j++) {
var gi = i + x1 + this.b$['com.falstad.RippleFrame'].gw * (j + y1) ;
this.b$['com.falstad.RippleFrame'].func[gi] = (Math.sin(mode1x * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(mode1y * 3.141592653589793 * (j + 1)  / (ny + 1)) * 0.5  + Math.sin(mode2x * 3.141592653589793 * (i + 1)  / (nx + 1)) * Math.sin(mode2y * 3.141592653589793 * (j + 1)  / (ny + 1)) * 0.5 );
this.b$['com.falstad.RippleFrame'].funci[gi] = 0;
}

}

this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[33]||(I$[33]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ZeroByOneModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ZeroByOneModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "0x1 Acoustic Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
while (y + ny < this.b$['com.falstad.RippleFrame'].windowHeight){
var nx = (((y + ny) * (this.b$['com.falstad.RippleFrame'].windowWidth - 8)/this.b$['com.falstad.RippleFrame'].windowHeight|0)) + 6;
var y1 = y + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
this.b$['com.falstad.RippleFrame'].setupAcousticMode$I$I$I$I$I$I(x1, y1, nx, ny, 1, 0);
y = y+(ny + 1);
}
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[34]||(I$[34]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ZeroByNModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ZeroByNModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "0xN Acoustic Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
var nx = this.b$['com.falstad.RippleFrame'].windowWidth - 2;
var mode = 1;
while (y + ny < this.b$['com.falstad.RippleFrame'].windowHeight){
var y1 = y + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
this.b$['com.falstad.RippleFrame'].setupAcousticMode$I$I$I$I$I$I(x1, y1, nx, ny, mode, 0);
y = y+(ny + 1);
mode++;
}
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[35]||(I$[35]=Clazz.load(Clazz.load('com.falstad.RippleFrame').NByNAcoModesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "NByNAcoModesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "NxN Acoustic Modes";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var modex;
var modey;
var maxmode = 2;
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() >= 70) maxmode++;
var ny = (this.b$['com.falstad.RippleFrame'].windowHeight/(maxmode + 1)|0) - 2;
var nx = (this.b$['com.falstad.RippleFrame'].windowWidth/(maxmode + 1)|0) - 2;
for (modex = 0; modex <= maxmode; modex++) for (modey = 0; modey <= maxmode; modey++) {
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1 + (ny + 1) * (modey) ;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1 + (nx + 1) * (modex) ;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
this.b$['com.falstad.RippleFrame'].setupAcousticMode$I$I$I$I$I$I(x1, y1, nx, ny, modex, modey);
}

this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.RippleFrame').CoupledCavitiesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "CoupledCavitiesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Coupled Cavities";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(0);
var i;
var j;
var y = 1;
var ny = 5;
while (y + ny < this.b$['com.falstad.RippleFrame'].windowHeight){
var nx = 35;
var y1 = y + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
for (j = 0; j != 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + (nx/2|0), y1 + j);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + (nx/2|0), y1 + 4 - j);
}
this.b$['com.falstad.RippleFrame'].setupAcousticMode$I$I$I$I$I$I(x1, y1, (nx/2|0), ny, 1, 0);
y = y+(ny + 3);
}
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[37]||(I$[37]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BeatsSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BeatsSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Beats";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(4);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(24);
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[1].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
this.b$['com.falstad.RippleFrame'].sources[0].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) - 2;
this.b$['com.falstad.RippleFrame'].sources[1].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + 2;
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setBrightness$I(25);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(18);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[38]||(I$[38]=Clazz.load(Clazz.load('com.falstad.RippleFrame').SlowMediumSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "SlowMediumSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Slow Medium";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].addMedium();
this.b$['com.falstad.RippleFrame'].setFreqBar$I(10);
this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.RippleFrame').RefractionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "RefractionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Refraction";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(14);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/4|0);
this.b$['com.falstad.RippleFrame'].sources[1].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + (this.b$['com.falstad.RippleFrame'].windowWidth/3|0);
this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].windowOffsetY;
this.b$['com.falstad.RippleFrame'].addMedium();
this.b$['com.falstad.RippleFrame'].setFreqBar$I(1);
this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[40]||(I$[40]=Clazz.load(Clazz.load('com.falstad.RippleFrame').InternalReflectionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "InternalReflectionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Internal Reflection";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(14);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight * 2/3|0);
this.b$['com.falstad.RippleFrame'].sources[1].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + (this.b$['com.falstad.RippleFrame'].windowWidth/3|0);
this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + this.b$['com.falstad.RippleFrame'].windowHeight - 1;
this.b$['com.falstad.RippleFrame'].addMedium();
this.b$['com.falstad.RippleFrame'].setFreqBar$I(1);
this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[41]||(I$[41]=Clazz.load(Clazz.load('com.falstad.RippleFrame').CoatingSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "CoatingSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Anti-Reflective Coating";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(1);
this.b$['com.falstad.RippleFrame'].addMedium();
var i;
var j;
var nmax = Math.sqrt(0.5);
var nroot = Math.sqrt(nmax);
var mm = (((1 - nmax) * 191 / 0.5)|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) for (j = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 4; j != (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0); j++) this.b$['com.falstad.RippleFrame'].medium[i + j * this.b$['com.falstad.RippleFrame'].gw] = mm;


this.b$['com.falstad.RippleFrame'].setFreqBar$I(6);
this.b$['com.falstad.RippleFrame'].setBrightness$I(28);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ZonePlateEvenSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ZonePlateEvenSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.zoneq = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.zoneq = 1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Zone Plate (Even)";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
this.b$['com.falstad.RippleFrame'].setSources();
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 42) this.b$['com.falstad.RippleFrame'].setResolution$I(42);
var i;
var freq = 30;
this.b$['com.falstad.RippleFrame'].setFreqBar$I(freq);
var halfwave = 25.0 / ((freq * 2/5|0));
var y = this.b$['com.falstad.RippleFrame'].sources[0].y + 1;
var dy = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) - y;
var dy2 = dy * dy;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) {
var x = this.b$['com.falstad.RippleFrame'].windowOffsetX + i;
var dx = cx - x;
var dist = Math.sqrt(dx * dx + dy * dy);
dist = (dist - dy);
var zone = ((dist / halfwave)|0);
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x, y, ((zone & 1) == this.zoneq));
this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX, y);
this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + this.b$['com.falstad.RippleFrame'].windowWidth - 1, y);
}
this.b$['com.falstad.RippleFrame'].setBrightness$I(this.zoneq == 1 ? 4 : 7);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ZonePlateOddSetup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ZonePlateOddSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.ZonePlateEvenSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.zoneq = 0;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Zone Plate (Odd)";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[44]||(I$[44]=Clazz.load(Clazz.load('com.falstad.RippleFrame').CircleSetup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "CircleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.circle = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.circle = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Circle";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'select', function () {
var i;
var dx = (this.b$['com.falstad.RippleFrame'].windowWidth/2|0) - 2;
var a2 = dx * dx;
var b2 = a2 / 2;
if (this.circle) b2 = a2;
var cx = (this.b$['com.falstad.RippleFrame'].windowWidth/2|0) + this.b$['com.falstad.RippleFrame'].windowOffsetX;
var cy = (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var ly = -1;
for (i = 0; i <= dx; i++) {
var y = Math.sqrt((1 - i * i / a2) * b2);
var yi = ((y + 1.5)|0);
if (i == dx) yi = 0;
if (ly == -1) ly = yi;
for (; ly >= yi; ly--) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + i, cy + ly);
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - i, cy + ly);
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + i, cy - ly);
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - i, cy - ly);
}
ly = yi;
}
var c = ((Math.sqrt(a2 - b2))|0);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(8);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = cx - c;
this.b$['com.falstad.RippleFrame'].sources[0].y = cy;
this.b$['com.falstad.RippleFrame'].setFreqBar$I(1);
this.b$['com.falstad.RippleFrame'].setBrightness$I(16);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[45]||(I$[45]=Clazz.load(Clazz.load('com.falstad.RippleFrame').EllipseSetup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "EllipseSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.CircleSetup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.circle = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Ellipse";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[46]||(I$[46]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ResonantCavitiesSetup))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ResonantCavitiesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resonant Cavities 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var x = 1;
var nx = 5;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 11;
while (x + nx < this.b$['com.falstad.RippleFrame'].windowWidth){
var ny = (((x + nx) * (this.b$['com.falstad.RippleFrame'].windowHeight - 18)/this.b$['com.falstad.RippleFrame'].windowWidth|0)) + 6;
var x1 = x + this.b$['com.falstad.RippleFrame'].windowOffsetX;
for (i = 0; i != ny + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + i - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + i - 1);
}
for (j = 0; j != nx + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + j - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + j - 1, y1 + ny);
}
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x1 + (nx/2|0), y1 - 1, false);
x = x+(nx + 1);
}
for (; x < this.b$['com.falstad.RippleFrame'].windowWidth; x++) this.b$['com.falstad.RippleFrame'].setWall$I$I(x + this.b$['com.falstad.RippleFrame'].windowOffsetX, y1 - 1);

this.b$['com.falstad.RippleFrame'].setBrightness$I(30);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(15);
});

Clazz.newMeth(C$, 'sourceStrength', function () {
return 0.1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[47]||(I$[47]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ResonantCavities2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ResonantCavities2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resonant Cavities 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var x = 1;
var nx = 5;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 11;
var ny = 5;
while (x + nx < this.b$['com.falstad.RippleFrame'].windowWidth){
var x1 = x + this.b$['com.falstad.RippleFrame'].windowOffsetX;
for (i = 0; i != ny + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + i - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + i - 1);
}
for (j = 0; j != nx + 2; j++) this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + j - 1, y1 + ny);

x = x+(nx + 1);
ny++;
}
for (; x < this.b$['com.falstad.RippleFrame'].windowWidth; x++) this.b$['com.falstad.RippleFrame'].setWall$I$I(x + this.b$['com.falstad.RippleFrame'].windowOffsetX, y1 - 1);

this.b$['com.falstad.RippleFrame'].setBrightness$I(30);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(16);
});

Clazz.newMeth(C$, 'sourceStrength', function () {
return 0.03;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[48]||(I$[48]=Clazz.load(Clazz.load('com.falstad.RippleFrame').RoomResonanceSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "RoomResonanceSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Room Resonance";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(6);
this.b$['com.falstad.RippleFrame'].setSources();
var i;
var j;
var modex;
var modey;
var ny = 17;
var nx = 17;
for (modex = 1; modex <= 2; modex++) for (modey = 1; modey <= 2; modey++) {
var x1 = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1 + (ny + 1) * (modey - 1) ;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1 + (nx + 1) * (modex - 1) ;
for (i = 0; i != nx + 2; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + i - 1, y1 + ny);
}
for (j = 0; j != ny + 2; j++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + j - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + j - 1);
}
}

this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].sources[2].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 2;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 2;
this.b$['com.falstad.RippleFrame'].sources[1].x = this.b$['com.falstad.RippleFrame'].sources[3].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1 + nx + ((nx + 1)/2|0) ;
this.b$['com.falstad.RippleFrame'].sources[2].y = this.b$['com.falstad.RippleFrame'].sources[3].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1 + ny + ((ny + 1)/2|0) ;
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(10);
this.b$['com.falstad.RippleFrame'].setBrightness$I(3);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[49]||(I$[49]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Waveguides1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Waveguides1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var x = 1;
var nx = 3;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 3;
var ny = this.b$['com.falstad.RippleFrame'].windowHeight - 2;
while (x + nx < this.b$['com.falstad.RippleFrame'].windowWidth){
var x1 = x + this.b$['com.falstad.RippleFrame'].windowOffsetX;
for (i = 0; i != ny; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + i - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + i - 1);
}
nx++;
x = x+(nx);
}
for (; x < this.b$['com.falstad.RippleFrame'].windowWidth; x++) this.b$['com.falstad.RippleFrame'].setWall$I$I(x + this.b$['com.falstad.RippleFrame'].windowOffsetX, y1 - 1);

this.b$['com.falstad.RippleFrame'].setBrightness$I(6);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(14);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[50]||(I$[50]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Waveguides2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Waveguides2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Waveguides1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(8);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[51]||(I$[51]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Waveguides3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Waveguides3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 3";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var x = 1;
var nx = 8;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 3;
var ny = this.b$['com.falstad.RippleFrame'].windowHeight - 2;
for (x = 1; x < this.b$['com.falstad.RippleFrame'].windowWidth; x++) this.b$['com.falstad.RippleFrame'].setWall$I$I(x + this.b$['com.falstad.RippleFrame'].windowOffsetX, y1 - 1);

x = 1;
j = 0;
while (x + nx < this.b$['com.falstad.RippleFrame'].windowWidth && j < nx ){
var x1 = x + this.b$['com.falstad.RippleFrame'].windowOffsetX;
for (i = 0; i != ny; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + i - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + i - 1);
}
this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(x1 + j++, y1 - 1, false);
x = x+(nx + 1);
}
this.b$['com.falstad.RippleFrame'].setBrightness$I(89);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(16);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Waveguides4Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Waveguides4Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Waveguides3Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 4";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.RippleFrame'].setBrightness$I(29);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(20);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[53]||(I$[53]=Clazz.load(Clazz.load('com.falstad.RippleFrame').Waveguides5Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "Waveguides5Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Waveguides3Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Waveguides 5";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var x = 1;
var nx = 8;
var y1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + 2;
var ny = this.b$['com.falstad.RippleFrame'].windowHeight - 1;
x = 1;
while (x + nx < this.b$['com.falstad.RippleFrame'].windowWidth){
var x1 = x + this.b$['com.falstad.RippleFrame'].windowOffsetX;
for (i = 0; i != ny; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 - 1, y1 + i - 1);
this.b$['com.falstad.RippleFrame'].setWall$I$I(x1 + nx, y1 + i - 1);
}
x = x+(nx + 1);
}
this.b$['com.falstad.RippleFrame'].setBrightness$I(9);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(22);
});

Clazz.newMeth(C$, 'eachFrame', function () {
var y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1;
var nx = 8;
var x = 1;
var g = 1;
while (x + nx < this.b$['com.falstad.RippleFrame'].windowWidth){
var x1 = x + this.b$['com.falstad.RippleFrame'].windowOffsetX;
var j;
var n1 = 1;
var n2 = 1;
switch (g) {
case 1:
n1 = n2 = 1;
break;
case 2:
n1 = n2 = 2;
break;
case 3:
n1 = 1;
n2 = 2;
break;
case 4:
n1 = n2 = 3;
break;
case 5:
n1 = 1;
n2 = 3;
break;
case 6:
n1 = 2;
n2 = 3;
break;
default:
n1 = n2 = 0;
break;
}
for (j = 0; j != nx; j++) this.b$['com.falstad.RippleFrame'].func[x1 + j + this.b$['com.falstad.RippleFrame'].gw * y ] *= 0.5 * (Math.sin(3.141592653589793 * n1 * (j + 1)  / (nx + 1)) + Math.sin(3.141592653589793 * n2 * (j + 1)  / (nx + 1)));

x = x+(nx + 1);
g++;
}
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[54]||(I$[54]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ParabolicMirror1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ParabolicMirror1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Parabolic Mirror 1";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 50) this.b$['com.falstad.RippleFrame'].setResolution$I(50);
var i;
var cx = (this.b$['com.falstad.RippleFrame'].windowWidth/2|0) + this.b$['com.falstad.RippleFrame'].windowOffsetX;
var lx = 0;
var dy = (this.b$['com.falstad.RippleFrame'].windowHeight/2|0);
var cy = this.b$['com.falstad.RippleFrame'].windowHeight + this.b$['com.falstad.RippleFrame'].windowOffsetY - 2;
var dx = (this.b$['com.falstad.RippleFrame'].windowWidth/2|0) - 2;
var c = dx * dx * 0.5  / dy;
if (c > 20 ) c = 20;
for (i = 0; i <= dy; i++) {
var x = Math.sqrt(2 * c * i );
var xi = ((x + 1.5)|0);
for (; lx <= xi; lx++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - lx, cy - i);
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + lx, cy - i);
}
lx = xi;
}
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = cx;
this.b$['com.falstad.RippleFrame'].sources[0].y = ((cy - 1 - c / 2 )|0);
this.b$['com.falstad.RippleFrame'].setBrightness$I(18);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ParabolicMirror2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ParabolicMirror2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.ParabolicMirror1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Parabolic Mirror 2";
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
this.b$['com.falstad.RippleFrame'].brightnessBar.setValue$I(370);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(15);
this.b$['com.falstad.RippleFrame'].setSources();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[56]||(I$[56]=Clazz.load(Clazz.load('com.falstad.RippleFrame').SoundDuctSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "SoundDuctSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Sound Duct";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(8);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
var i;
var cx = this.b$['com.falstad.RippleFrame'].windowOffsetX + (this.b$['com.falstad.RippleFrame'].windowWidth/2|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowHeight - 12; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - 3, i + this.b$['com.falstad.RippleFrame'].windowOffsetY + 6 );
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + 3, i + this.b$['com.falstad.RippleFrame'].windowOffsetY + 6 );
}
this.b$['com.falstad.RippleFrame'].setFreqBar$I(1);
this.b$['com.falstad.RippleFrame'].setBrightness$I(60);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[57]||(I$[57]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BaffledPistonSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BaffledPistonSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Baffled Piston";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
var i;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeY; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + 2, i);

for (i = 0; i <= 11; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX, i + (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 5);
if (i != 0 && i != 11 ) this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(this.b$['com.falstad.RippleFrame'].windowOffsetX + 2, i + (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 5, false);
}
this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + 1, (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 5);
this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + 1, (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) + 6);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(24);
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].sources[1].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 1;
this.b$['com.falstad.RippleFrame'].sources[0].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - 4;
this.b$['com.falstad.RippleFrame'].sources[1].y = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) + 5;
this.b$['com.falstad.RippleFrame'].setBrightness$I(18);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[58]||(I$[58]=Clazz.load(Clazz.load('com.falstad.RippleFrame').LowPassFilter1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "LowPassFilter1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Low-Pass Filter 1";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 43) this.b$['com.falstad.RippleFrame'].setResolution$I(43);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
var i;
var j;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(i + this.b$['com.falstad.RippleFrame'].windowOffsetX, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9);

var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
for (i = 1; i <= 4; i++) for (j = -7; j <= 7; j++) this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + j, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 * i);


for (i = 0; i <= 4; i++) for (j = -4; j <= 4; j++) this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(cx + j, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 * i, false);


for (i = 0; i != 27; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + 7, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + i );
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - 7, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + i );
}
this.b$['com.falstad.RippleFrame'].setBrightness$I(38);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[59]||(I$[59]=Clazz.load(Clazz.load('com.falstad.RippleFrame').LowPassFilter2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "LowPassFilter2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.LowPassFilter1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Low-Pass Filter 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(17);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[60]||(I$[60]=Clazz.load(Clazz.load('com.falstad.RippleFrame').HighPassFilter1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "HighPassFilter1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "High-Pass Filter 1";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 43) this.b$['com.falstad.RippleFrame'].setResolution$I(43);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
var i;
var j;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) for (j = 0; j <= 25; j = j+(5)) this.b$['com.falstad.RippleFrame'].setWall$I$I(i + this.b$['com.falstad.RippleFrame'].windowOffsetX, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + j );


var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
for (i = 0; i <= 25; i = i+(5)) for (j = -4; j <= 4; j++) this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(cx + j, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + i , false);


this.b$['com.falstad.RippleFrame'].setBrightness$I(62);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(17);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[61]||(I$[61]=Clazz.load(Clazz.load('com.falstad.RippleFrame').HighPassFilter2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "HighPassFilter2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.HighPassFilter1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "High-Pass Filter 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(7);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[62]||(I$[62]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BandStopFilter1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BandStopFilter1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Band-Stop Filter 1";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 43) this.b$['com.falstad.RippleFrame'].setResolution$I(43);
this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
var i;
var j;
var k;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(i + this.b$['com.falstad.RippleFrame'].windowOffsetX, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9);

var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
for (i = 1; i <= 2; i++) for (j = -11; j <= 11; j++) {
if (j > -5 && j < 5 ) continue;
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + j, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + 9 * i );
}

for (i = 0; i <= 1; i++) for (j = -4; j <= 4; j++) this.b$['com.falstad.RippleFrame'].setWall$I$I$Z(cx + j, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + i * 26 , false);


for (i = 0; i <= 18; i++) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + 11, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + i );
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - 11, this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + i );
}
for (i = 0; i != 3; i++) for (j = 0; j != 3; j++) for (k = 9; k <= 18; k = k+(9)) {
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + 5 + i , this.b$['com.falstad.RippleFrame'].windowOffsetY + k + j );
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx + 5 + i , this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + k  - j);
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - 5 - i , this.b$['com.falstad.RippleFrame'].windowOffsetY + k + j );
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx - 5 - i , this.b$['com.falstad.RippleFrame'].windowOffsetY + 9 + k  - j);
}


this.b$['com.falstad.RippleFrame'].setBrightness$I(38);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[63]||(I$[63]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BandStopFilter2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BandStopFilter2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.BandStopFilter1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Band-Stop Filter 2";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(10);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[64]||(I$[64]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BandStopFilter3Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BandStopFilter3Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.BandStopFilter1Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Band-Stop Filter 3";
});

Clazz.newMeth(C$, 'select', function () {
C$.superclazz.prototype.select.apply(this, []);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(4);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PlanarConvexLensSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PlanarConvexLensSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Planar Convex Lens";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 42) this.b$['com.falstad.RippleFrame'].setResolution$I(42);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.RippleFrame'].windowHeight/8|0) + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x0 = (this.b$['com.falstad.RippleFrame'].windowWidth/3|0) - 2;
var y0 = 5;
var r = (0.75 * this.b$['com.falstad.RippleFrame'].windowHeight) * 0.5;
var h = r - y0;
var r2 = r * r;
if (x0 > r ) x0 = (r|0);
for (i = 0; i <= x0; i++) {
var y = 2 + ((Math.sqrt(r2 - i * i) - h + 0.5)|0);
for (; y >= 0; y--) {
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy + y, 95);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx - i, cy + y, 95);
}
}
this.b$['com.falstad.RippleFrame'].setFreqBar$I(19);
this.b$['com.falstad.RippleFrame'].setBrightness$I(6);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[66]||(I$[66]=Clazz.load(Clazz.load('com.falstad.RippleFrame').BiconvexLensSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "BiconvexLensSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Biconvex Lens";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 50) this.b$['com.falstad.RippleFrame'].setResolution$I(50);
this.b$['com.falstad.RippleFrame'].setSources();
var i;
var j;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
var x0 = (this.b$['com.falstad.RippleFrame'].windowWidth/3|0) - 2;
var y0 = 10;
var r = (0.75 * 0.5 * this.b$['com.falstad.RippleFrame'].windowHeight ) * 0.5;
var h = r - y0;
var r2 = r * r;
if (x0 > r ) x0 = (r|0);
for (i = 0; i <= x0; i++) {
var y = 1 + ((Math.sqrt(r2 - i * i) - h + 0.5)|0);
for (; y >= 0; y--) {
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy + y, 95);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx - i, cy + y, 95);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy - y, 95);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx - i, cy - y, 95);
}
}
this.b$['com.falstad.RippleFrame'].setFreqBar$I(19);
this.b$['com.falstad.RippleFrame'].setBrightness$I(66);
this.b$['com.falstad.RippleFrame'].sources[0].y = cy - (2 + 2 * (r|0));
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[67]||(I$[67]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PlanarConcaveSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PlanarConcaveSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Planar Concave Lens";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.RippleFrame'].windowHeight/8|0) + this.b$['com.falstad.RippleFrame'].windowOffsetY;
var x0 = (this.b$['com.falstad.RippleFrame'].windowWidth/5|0);
var y0 = 5;
var r = (0.25 * this.b$['com.falstad.RippleFrame'].windowHeight) * 0.5;
var h = r - y0;
var r2 = r * r;
if (x0 > r ) x0 = (r|0);
for (i = 0; i <= x0; i++) {
var y = y0 + 2 - ((Math.sqrt(r2 - i * i) - h + 0.5)|0);
for (; y >= 0; y--) {
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy + y, 95);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx - i, cy + y, 95);
}
}
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) if (this.b$['com.falstad.RippleFrame'].medium[this.b$['com.falstad.RippleFrame'].windowOffsetX + i + this.b$['com.falstad.RippleFrame'].gw * cy ] == 0) this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + i, cy);

this.b$['com.falstad.RippleFrame'].setFreqBar$I(19);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[68]||(I$[68]=Clazz.load(Clazz.load('com.falstad.RippleFrame').CircularPrismSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "CircularPrismSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Circular Prism";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
var x0 = (this.b$['com.falstad.RippleFrame'].windowWidth/3|0) - 2;
var y0 = x0;
var r = (x0 * x0 + y0 * y0) / (2.0 * y0);
var h = r - y0;
var r2 = r * r;
for (i = 0; i < x0; i++) {
var y = ((Math.sqrt(r2 - i * i) - h + 0.5)|0);
for (; y >= 0; y--) {
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy + y, 191);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx - i, cy + y, 191);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy - y, 191);
this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx - i, cy - y, 191);
}
}
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) if (this.b$['com.falstad.RippleFrame'].medium[this.b$['com.falstad.RippleFrame'].windowOffsetX + i + this.b$['com.falstad.RippleFrame'].gw * cy ] == 0) this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + i, cy);

this.b$['com.falstad.RippleFrame'].setFreqBar$I(9);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[69]||(I$[69]=Clazz.load(Clazz.load('com.falstad.RippleFrame').RightAnglePrismSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "RightAnglePrismSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Right-Angle Prism";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 42) this.b$['com.falstad.RippleFrame'].setResolution$I(42);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
var i;
var j;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
var x0 = (this.b$['com.falstad.RippleFrame'].windowWidth/4|0);
var y0 = x0;
for (i = -x0; i < x0; i++) for (j = -y0; j <= i; j++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy + j, 191);


for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) if (this.b$['com.falstad.RippleFrame'].medium[this.b$['com.falstad.RippleFrame'].windowOffsetX + i + this.b$['com.falstad.RippleFrame'].gw * (cy - y0) ] == 0) this.b$['com.falstad.RippleFrame'].setWall$I$I(this.b$['com.falstad.RippleFrame'].windowOffsetX + i, cy - y0);

this.b$['com.falstad.RippleFrame'].setFreqBar$I(11);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[70]||(I$[70]=Clazz.load(Clazz.load('com.falstad.RippleFrame').PorroPrismSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "PorroPrismSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Porro Prism";
});

Clazz.newMeth(C$, 'select', function () {
if (this.b$['com.falstad.RippleFrame'].resBar.getValue() < 42) this.b$['com.falstad.RippleFrame'].setResolution$I(42);
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(10);
this.b$['com.falstad.RippleFrame'].setSources();
var i;
var j;
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
this.b$['com.falstad.RippleFrame'].sources[1].x = cx - 1;
var x0 = (this.b$['com.falstad.RippleFrame'].windowWidth/2|0);
var y0 = x0;
var cy = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0) - (y0/2|0);
for (i = -x0; i < x0; i++) {
var j2 = y0 + 1 - ((i < 0) ? -i : i);
for (j = 0; j <= j2; j++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(cx + i, cy + j, 191);

}
for (i = 0; i != cy; i++) if (this.b$['com.falstad.RippleFrame'].medium[cx + this.b$['com.falstad.RippleFrame'].gw * (i + this.b$['com.falstad.RippleFrame'].windowOffsetY)] == 0) this.b$['com.falstad.RippleFrame'].setWall$I$I(cx, i + this.b$['com.falstad.RippleFrame'].windowOffsetY);

this.b$['com.falstad.RippleFrame'].setFreqBar$I(11);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[71]||(I$[71]=Clazz.load(Clazz.load('com.falstad.RippleFrame').ScatteringSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "ScatteringSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Scattering";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(14);
var cx = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
this.b$['com.falstad.RippleFrame'].setWall$I$I(cx, cy);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(1);
this.b$['com.falstad.RippleFrame'].dampingBar.setValue$I(40);
this.b$['com.falstad.RippleFrame'].setBrightness$I(52);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[72]||(I$[72]=Clazz.load(Clazz.load('com.falstad.RippleFrame').LloydsMirrorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "LloydsMirrorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Lloyd\'s Mirror";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight * 3/4|0);
this.b$['com.falstad.RippleFrame'].setBrightness$I(75);
this.b$['com.falstad.RippleFrame'].setFreqBar$I(23);
var i;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].windowWidth; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I(i + this.b$['com.falstad.RippleFrame'].windowOffsetX, this.b$['com.falstad.RippleFrame'].windowOffsetY + this.b$['com.falstad.RippleFrame'].windowHeight - 1);

});

Clazz.newMeth(C$, 'doSetupSources', function () {
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[73]||(I$[73]=Clazz.load(Clazz.load('com.falstad.RippleFrame').TempGradient1))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "TempGradient1", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Temperature Gradient 1";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var j;
var j1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0);
var j2 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight * 3/4|0);
var j3 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight * 7/8|0);
for (j = 0; j != this.b$['com.falstad.RippleFrame'].gridSizeY; j++) {
var m;
if (j < j1) m = 0;
 else if (j > j2) m = 191;
 else m = (191 * (j - j1)/(j2 - j1)|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(i, j, m);

}
for (i = j3; i < this.b$['com.falstad.RippleFrame'].windowOffsetY + this.b$['com.falstad.RippleFrame'].windowHeight; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I((this.b$['com.falstad.RippleFrame'].gridSizeX/2|0), i);

this.b$['com.falstad.RippleFrame'].setBrightness$I(33);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 2;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + this.b$['com.falstad.RippleFrame'].windowHeight - 2;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[74]||(I$[74]=Clazz.load(Clazz.load('com.falstad.RippleFrame').TempGradient2))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "TempGradient2", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Temperature Gradient 2";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var j;
var j1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) - (this.b$['com.falstad.RippleFrame'].windowHeight/8|0);
var j2 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) + (this.b$['com.falstad.RippleFrame'].windowHeight/8|0);
for (j = 0; j != this.b$['com.falstad.RippleFrame'].gridSizeY; j++) {
var m;
if (j < j1) m = 191;
 else if (j > j2) m = 0;
 else m = (191 * (j2 - j)/(j2 - j1)|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(i, j, m);

}
this.b$['com.falstad.RippleFrame'].setBrightness$I(31);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 2;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/4|0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[75]||(I$[75]=Clazz.load(Clazz.load('com.falstad.RippleFrame').TempGradient3))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "TempGradient3", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Temperature Gradient 3";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var j;
var j1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) - (this.b$['com.falstad.RippleFrame'].windowHeight/5|0);
var j2 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) + (this.b$['com.falstad.RippleFrame'].windowHeight/5|0);
var j3 = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
for (j = 0; j != this.b$['com.falstad.RippleFrame'].gridSizeY; j++) {
var m;
if (j < j1 || j > j2 ) m = 191;
 else if (j > j3) m = (191 * (j - j3)/(j2 - j3)|0);
 else m = (191 * (j3 - j)/(j3 - j1)|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(i, j, m);

}
this.b$['com.falstad.RippleFrame'].setBrightness$I(31);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = this.b$['com.falstad.RippleFrame'].windowOffsetX + 2;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/4|0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[76]||(I$[76]=Clazz.load(Clazz.load('com.falstad.RippleFrame').TempGradient4))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "TempGradient4", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.TempGradient3']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Temperature Gradient 4";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var j;
var j1 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) - (this.b$['com.falstad.RippleFrame'].windowHeight/5|0);
var j2 = this.b$['com.falstad.RippleFrame'].windowOffsetY + (this.b$['com.falstad.RippleFrame'].windowHeight/2|0) + (this.b$['com.falstad.RippleFrame'].windowHeight/5|0);
var j3 = (this.b$['com.falstad.RippleFrame'].gridSizeY/2|0);
for (j = 0; j != this.b$['com.falstad.RippleFrame'].gridSizeY; j++) {
var m;
if (j < j1 || j > j2 ) m = 0;
 else if (j > j3) m = (191 * (j2 - j)/(j2 - j3)|0);
 else m = (191 * (j - j1)/(j3 - j1)|0);
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(i, j, m);

}
this.b$['com.falstad.RippleFrame'].setBrightness$I(31);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[77]||(I$[77]=Clazz.load(Clazz.load('com.falstad.RippleFrame').DispersionSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.RippleFrame, "DispersionSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.RippleFrame','com.falstad.RippleFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dispersion";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.RippleFrame'].sourceChooser.select$I(4);
var i;
var j;
for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeY; i++) this.b$['com.falstad.RippleFrame'].setWall$I$I((this.b$['com.falstad.RippleFrame'].gridSizeX/2|0), i);

for (i = 0; i != this.b$['com.falstad.RippleFrame'].gridSizeX; i++) for (j = 0; j != this.b$['com.falstad.RippleFrame'].gridSizeY; j++) this.b$['com.falstad.RippleFrame'].setMedium$I$I$I(i, j, 63);


this.b$['com.falstad.RippleFrame'].fixedEndsCheck.setState$Z(false);
this.b$['com.falstad.RippleFrame'].setBrightness$I(16);
});

Clazz.newMeth(C$, 'doSetupSources', function () {
this.b$['com.falstad.RippleFrame'].setSources();
this.b$['com.falstad.RippleFrame'].sources[0].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) - 2;
this.b$['com.falstad.RippleFrame'].sources[1].x = (this.b$['com.falstad.RippleFrame'].gridSizeX/2|0) + 2;
this.b$['com.falstad.RippleFrame'].sources[0].y = this.b$['com.falstad.RippleFrame'].sources[1].y = this.b$['com.falstad.RippleFrame'].windowOffsetY + 1;
this.b$['com.falstad.RippleFrame'].setFreqBar$I(7);
this.b$['com.falstad.RippleFrame'].auxBar.setValue$I(30);
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:12
