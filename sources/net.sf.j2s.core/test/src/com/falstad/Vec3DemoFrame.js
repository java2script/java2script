(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "Vec3DemoFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.DISP_PART_VELOC = 0;
C$.DISP_PART_FORCE = 0;
C$.DISP_VECTORS = 0;
C$.DISP_LINES = 0;
C$.DISP_EQUIPS = 0;
C$.DISP_PART_VELOC_A = 0;
C$.DISP_VECTORS_A = 0;
C$.DISP_PART_MAG = 0;
C$.DISP_VIEW_PAPER = 0;
C$.BUILD_E = false;
C$.BUILD_V = false;
C$.BUILD_M = false;
C$.frames = 0;
C$.framerate = 0;
C$.firsttime = 0;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.BUILD_E = false;
C$.BUILD_V = true;
C$.BUILD_M = false;
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
this.sliceChooser = null;
this.partCountLabel = null;
this.textFieldLabel = null;
this.strengthLabel = null;
this.partCountBar = null;
this.strengthBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.aux3Bar = null;
this.fieldStrength = 0;
this.partMult = 0;
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
this.textFields = null;
this.reverse = 0;
this.xpoints = null;
this.ypoints = null;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.particles = null;
this.vectors = null;
this.vecCount = 0;
this.density = null;
this.sliceval = 0;
this.rotmatrix = null;
this.cameraPos = null;
this.intersection = null;
this.intersectionDistance = 0;
this.vectorSpacing = 0;
this.currentStep = 0;
this.selectedSlice = false;
this.$mouseDown = false;
this.getPot = false;
this.showA = false;
this.parseError = false;
this.fieldColors = null;
this.equipColors = null;
this.zoom = 0;
this.dragging = false;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragZoomStart = 0;
this.lastXRot = 0;
this.lastYRot = 0;
this.functionList = null;
this.curfunc = null;
this.pause = 0;
this.useFrame = false;
this.finished = false;
this.shown = false;
this.scalex = 0;
this.scaley = 0;
this.lastTime = 0;
this.timeStep = 0;
this.potfield = null;
this.wooft = 0;
this.rediscount = 0;
this.ignoreChanges = false;
this.mstates = null;
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
this.darkYellow = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I$I$I,[144, 144, 0]);
this.lineWidth = 0.01;
this.sliceval = 0;
this.vectorSpacing = 16;
this.zoom = 3;
this.pause = 20;
this.useFrame = false;
this.shown = false;
this.wooft = 0;
this.ignoreChanges = false;
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
return "Vec3Demo by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'BUILD_CASE_EMV$S$S$S', function (e, m, v) {
return C$.BUILD_V ? v : C$.BUILD_E ? e : m;
}, 1);

Clazz.newMeth(C$, 'BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction', function (e, m, v) {
return C$.BUILD_V ? v : C$.BUILD_E ? e : m;
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_Vec3Demo', function (a) {
C$.superclazz.c$$S.apply(this, ["3-D Vector Fields Applet v1.3c"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'initFrame', function () {
try {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("true") ) this.useFrame = true;
param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
param = this.applet.getParameter$S("mode");
if (param != null  && param.equalsIgnoreCase$S("electric") ) {
C$.BUILD_E = true;
C$.BUILD_V = false;
C$.BUILD_M = false;
}if (param != null  && param.equalsIgnoreCase$S("magnetic") ) {
C$.BUILD_M = true;
C$.BUILD_V = false;
C$.BUILD_E = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
var main;
if (this.useFrame) main = this;
 else main = this.applet;
if (!C$.BUILD_M) {
C$.DISP_PART_VELOC = 0;
C$.DISP_PART_FORCE = 1;
C$.DISP_VECTORS = 2;
C$.DISP_LINES = 3;
C$.DISP_EQUIPS = 4;
C$.DISP_PART_VELOC_A = -1;
C$.DISP_VECTORS_A = -2;
C$.DISP_PART_MAG = -3;
C$.DISP_VIEW_PAPER = -4;
} else {
C$.DISP_PART_VELOC = 0;
C$.DISP_PART_VELOC_A = 1;
C$.DISP_VECTORS = 2;
C$.DISP_VECTORS_A = 3;
C$.DISP_LINES = 4;
C$.DISP_PART_MAG = 5;
C$.DISP_VIEW_PAPER = 6;
C$.DISP_EQUIPS = -1;
C$.DISP_PART_FORCE = -4;
}this.functionList = Clazz.new_((I$[91]||(I$[91]=Clazz.load('java.util.Vector'))));
var vf = C$.BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction(Clazz.new_((I$[92]||(I$[92]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquaredRadial))), [this, null]), Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRotational))), [this, null]), Clazz.new_((I$[92]||(I$[92]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquaredRadial))), [this, null]));
while (vf != null ){
this.functionList.addElement$TE(vf);
vf = vf.createNext();
}
this.random = Clazz.new_((I$[93]||(I$[93]=Clazz.load('java.util.Random'))));
this.particles = Clazz.array((I$[94]||(I$[94]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Particle))), [5000]);
var i;
for (i = 0; i != 5000; i++) this.particles[i] = Clazz.new_((I$[94]||(I$[94]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Particle))), [this, null]);

this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.slicerPoints = Clazz.array(Integer.TYPE, [2, 10]);
this.sliceFaces = Clazz.array(Double.TYPE, [4, 3]);
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.setXYView();
this.density = Clazz.array(Integer.TYPE, [4, 4, 4]);
main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[95]||(I$[95]=Clazz.load('com.falstad.Vec3DemoLayout')))));
this.cv = Clazz.new_((I$[96]||(I$[96]=Clazz.load('com.falstad.Vec3DemoCanvas'))).c$$com_falstad_Vec3DemoFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
main.add$java_awt_Component(this.cv);
main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S,["Field selection:"]));
this.functionChooser = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Choice'))));
for (i = 0; i != this.functionList.size(); i++) this.functionChooser.add$S((this.functionList.elementAt$I(i)).getName());

main.add$java_awt_Component(this.functionChooser);
this.functionChooser.addItemListener$java_awt_event_ItemListener(this);
this.dispChooser = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Choice'))));
this.dispChooser.addItemListener$java_awt_event_ItemListener(this);
this.setupDispChooser$Z(true);
main.add$java_awt_Component(this.dispChooser);
this.modeChooser = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust Angle");
this.modeChooser.add$S("Mouse = Adjust Zoom");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.modeChooser);
this.sliceChooser = Clazz.new_((I$[98]||(I$[98]=Clazz.load('a2s.Choice'))));
this.sliceChooser.add$S("No Slicing");
this.sliceChooser.add$S("Show X Slice");
this.sliceChooser.add$S("Show Y Slice");
this.sliceChooser.add$S("Show Z Slice");
this.sliceChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.sliceChooser);
this.stoppedCheck = Clazz.new_((I$[99]||(I$[99]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.stoppedCheck);
this.reverseCheck = Clazz.new_((I$[99]||(I$[99]=Clazz.load('a2s.Checkbox'))).c$$S,["Reverse"]);
this.reverseCheck.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.reverseCheck);
this.resetButton = Clazz.new_((I$[100]||(I$[100]=Clazz.load('a2s.Button'))).c$$S,["Reset"]);
main.add$java_awt_Component(this.resetButton);
this.resetButton.addActionListener$java_awt_event_ActionListener(this);
this.kickButton = Clazz.new_((I$[100]||(I$[100]=Clazz.load('a2s.Button'))).c$$S,["Kick"]);
if (C$.BUILD_M) {
this.add$java_awt_Component(this.kickButton);
this.kickButton.addActionListener$java_awt_event_ActionListener(this);
this.kickButton.disable();
}main.add$java_awt_Component(this.strengthLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Field Strength", 0]));
main.add$java_awt_Component(this.strengthBar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 0, 100]));
this.strengthBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
main.add$java_awt_Component(this.partCountLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Number of Particles", 0]));
main.add$java_awt_Component(this.partCountBar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 500, 1, 1, 5000]));
this.partCountBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
main.add$java_awt_Component(this.vecDensityLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Vector Density", 0]));
main.add$java_awt_Component(this.vecDensityBar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 16, 1, 2, 64]));
this.vecDensityBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
main.add$java_awt_Component(this.lineDensityLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,[C$.BUILD_V ? "Streamline Density" : "Field Line Density", 0]));
main.add$java_awt_Component(this.lineDensityBar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 5, 1, 3, 16]));
this.lineDensityBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
main.add$java_awt_Component(this.potentialLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Potential", 0]));
main.add$java_awt_Component(this.potentialBar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 250, 1, 0, 1000]));
this.potentialBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
var lb;
this.auxBars = Clazz.array((I$[102]||(I$[102]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').AuxBar))), [3]);
main.add$java_awt_Component(lb = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 1", 0]));
main.add$java_awt_Component(this.aux1Bar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 0, 1, 0, 100]));
this.aux1Bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxBars[0] = Clazz.new_((I$[102]||(I$[102]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').AuxBar))).c$$a2s_Label$a2s_Scrollbar, [this, null, lb, this.aux1Bar]);
main.add$java_awt_Component(lb = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 2", 0]));
main.add$java_awt_Component(this.aux2Bar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 0, 1, 0, 100]));
this.aux2Bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxBars[1] = Clazz.new_((I$[102]||(I$[102]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').AuxBar))).c$$a2s_Label$a2s_Scrollbar, [this, null, lb, this.aux2Bar]);
main.add$java_awt_Component(lb = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["Aux 3", 0]));
main.add$java_awt_Component(this.aux3Bar = Clazz.new_((I$[101]||(I$[101]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 0, 1, 0, 100]));
this.aux3Bar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.auxBars[2] = Clazz.new_((I$[102]||(I$[102]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').AuxBar))).c$$a2s_Label$a2s_Scrollbar, [this, null, lb, this.aux3Bar]);
if (C$.BUILD_V) main.add$java_awt_Component(this.textFieldLabel = Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.textFields = Clazz.array((I$[103]||(I$[103]=Clazz.load('a2s.TextField'))), [3]);
for (i = 0; i != 3; i++) {
main.add$java_awt_Component(this.textFields[i] = Clazz.new_((I$[103]||(I$[103]=Clazz.load('a2s.TextField')))));
this.textFields[i].addActionListener$java_awt_event_ActionListener(this);
}
this.fieldColors = Clazz.array((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))), [513]);
for (i = 0; i != 256; i++) {
var col = -16777216 | (i << 8);
this.fieldColors[i] = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I,[col]);
}
for (i = 0; i != 256; i++) {
var col = -16777216 | 65280 | (i * 65537) ;
this.fieldColors[i + 256] = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I,[col]);
}
this.fieldColors[512] = this.fieldColors[511];
this.equipColors = Clazz.array((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))), [513]);
for (i = 0; i != 256; i++) {
var r = 255 - (i/2|0);
var gb = (i/2|0);
var col = -16777216 | (r << 16) | (gb << 8) | gb ;
this.equipColors[i] = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I,[col]);
}
for (i = 0; i != 256; i++) {
var g = 128 + (i/2|0);
var rb = 128 - (i/2|0);
var col = -16777216 | (rb << 16) | (g << 8) | rb ;
this.equipColors[i + 256] = Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I,[col]);
}
this.equipColors[512] = this.equipColors[511];
main.add$java_awt_Component(Clazz.new_((I$[97]||(I$[97]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
this.intersection = Clazz.array(Double.TYPE, [3]);
this.reinit();
this.cv.setBackground$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).lightGray);
this.functionChanged();
this.dispChooserChanged();
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
this.finished = true;
});

Clazz.newMeth(C$, 'setViewMatrix$D$D', function (a, b) {
var i;
for (i = 0; i != 9; i++) this.rotmatrix[i] = 0;

this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate$D$D(a, b);
this.lastXRot = this.lastYRot = 0;
});

Clazz.newMeth(C$, 'setXYView', function () {
this.setViewMatrix$D$D(0, 0.28559933214452665);
});

Clazz.newMeth(C$, 'setXYViewExact', function () {
this.setViewMatrix$D$D(0, 0);
});

Clazz.newMeth(C$, 'setXZView', function () {
this.setViewMatrix$D$D(0, -1.2851969946503699);
});

Clazz.newMeth(C$, 'setXZViewExact', function () {
this.setViewMatrix$D$D(0, -1.5707963267948966);
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
this.viewMain = Clazz.new_((I$[104]||(I$[104]=Clazz.load('java.awt.Rectangle'))).c$$java_awt_Dimension,[this.winSize]);
this.viewAxes = Clazz.new_((I$[104]||(I$[104]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.winSize.width - 100, 0, 100, 100]);
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
this.addToDensityGroup$com_falstad_Vec3DemoFrame_Particle(p);
}
for (; i != 5000; i++) {
var p = this.particles[i];
p.lifetime = -100;
}
});

Clazz.newMeth(C$, 'addToDensityGroup$com_falstad_Vec3DemoFrame_Particle', function (p) {
var a = (((p.pos[0] + 1) * 2)|0);
var b = (((p.pos[1] + 1) * 2)|0);
var c = (((p.pos[2] + 1) * 2)|0);
var n = 0;
try {
n = ++this.density[a][b][c];
if (n > 5000) System.out.print$S(a + " " + b + " " + c + " " + this.density[a][b][c] + "\n" );
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

Clazz.newMeth(C$, 'removeFromDensityGroup$com_falstad_Vec3DemoFrame_Particle', function (p) {
var a = (((p.pos[0] + 1) * 2)|0);
var b = (((p.pos[1] + 1) * 2)|0);
var c = (((p.pos[2] + 1) * 2)|0);
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

Clazz.newMeth(C$, 'positionParticle$com_falstad_Vec3DemoFrame_Particle', function (p) {
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
for (x = 0; x != 4; x++) for (y = 0; y != 4; y++) for (z = 0; z != 4; z++) {
var ix = (randaddx + x) % 4;
var iy = (randaddy + y) % 4;
var iz = (randaddz + z) % 4;
if (this.density[ix][iy][iz] <= best) {
bestx = ix;
besty = iy;
bestz = iz;
best = this.density[ix][iy][iz];
}}


p.pos[0] = bestx * 0.5 + this.getrand$I(100) * 0.5 / 100.0 - 1;
p.pos[1] = besty * 0.5 + this.getrand$I(100) * 0.5 / 100.0 - 1;
p.pos[2] = bestz * 0.5 + this.getrand$I(100) * 0.5 / 100.0 - 1;
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
for (j = 0; j != 3; j++) {
p.pos[j] = this.getrand$I(200) / 100.0 - 1;
p.vel[j] = 0;
}
p.lifetime = i * 2;
p.stepsize = 1;
}
this.resetDensityGroups();
});

Clazz.newMeth(C$, 'kickParticles', function () {
var i;
var j;
for (i = 0; i != this.getParticleCount(); i++) {
var p = this.particles[i];
for (j = 0; j != 3; j++) p.vel[j] += (this.getrand$I(100) / 99.0 - 0.5) * 0.04;

}
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
this.rotate$DA(rotm2);
});

Clazz.newMeth(C$, 'rotate$DA', function (rotm2) {
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

Clazz.newMeth(C$, 'reinit', function () {
this.handleResize();
this.resetParticles();
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'map3d$D$D$D$IA$IA$I', function (x, y, z, xpoints, ypoints, pt) {
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(x, y, z, xpoints, ypoints, pt, this.viewMain);
});

Clazz.newMeth(C$, 'map3dView$D$D$D$IA$IA$I$java_awt_Rectangle', function (x, y, z, xpoints, ypoints, pt, view) {
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = 5.0 - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = view.x + (view.width/2|0) + ((scalex * realx / realz)|0);
ypoints[pt] = view.y + (view.height/2|0) - ((scaley * realy / realz)|0);
});

Clazz.newMeth(C$, 'getScalingFactor$D$D$D', function (x, y, z) {
var rotm = this.rotmatrix;
var realz = 5.0 - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = this.winSize.width * this.zoom / 2;
var scaley = this.winSize.height * this.zoom / 2;
var aratio = this.winSize.width / this.winSize.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
return scalex / realz;
});

Clazz.newMeth(C$, 'unmap3d$DA$I$I$D$java_awt_Rectangle', function (x3, x, y, z, view) {
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var realz = 5.0 - z;
var realx = (x - ((view.width/2|0))) * realz / scalex;
var realy = -(y - ((view.height/2|0))) * realz / scaley;
var rotm = this.rotmatrix;
x3[0] = (realx * rotm[0] + realy * rotm[1] + z * rotm[2]);
x3[1] = (realx * rotm[3] + realy * rotm[4] + z * rotm[5]);
x3[2] = (realx * rotm[6] + realy * rotm[7] + z * rotm[8]);
});

Clazz.newMeth(C$, 'unmap3d$DA$I$I$DA$DA$java_awt_Rectangle', function (x3, x, y, pn, pp, view) {
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1 ) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - ((view.width/2|0))) / scalex;
var vy = -(y - ((view.height/2|0))) / scaley;
var rotm = this.rotmatrix;
var mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
var mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
var mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);
var t = ((pp[0] - this.cameraPos[0]) * pn[0] + (pp[1] - this.cameraPos[1]) * pn[1] + (pp[2] - this.cameraPos[2]) * pn[2]) / (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);
x3[0] = this.cameraPos[0] + mvx * t;
x3[1] = this.cameraPos[1] + mvy * t;
x3[2] = this.cameraPos[2] + mvz * t;
});

Clazz.newMeth(C$, 'scaleworld', function () {
this.scalex = (this.winSize.width/2|0);
this.scaley = (this.winSize.height/2|0);
});

Clazz.newMeth(C$, 'updateVec3Demo$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
if (this.xpoints == null ) return;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var allquiet = false;
this.curfunc.setupFrame();
var disp = this.dispChooser.getSelectedIndex();
this.timeStep = 1;
if (!this.stoppedCheck.getState()) {
if (this.lastTime > 0) this.timeStep = (System.currentTimeMillis() - this.lastTime) * 0.03;
if (this.timeStep > 3 ) this.timeStep = 3;
this.lastTime = System.currentTimeMillis();
if (disp != C$.DISP_VECTORS && disp != C$.DISP_VECTORS_A  && disp != C$.DISP_LINES  && disp != C$.DISP_EQUIPS ) {
this.moveParticles();
allquiet = false;
}this.currentStep = ((this.reverse * ((this.lastTime/30|0)) % 800)|0);
if (this.currentStep < 0) this.currentStep = this.currentStep+(800);
} else {
this.lastXRot = this.lastYRot = 0;
this.lastTime = 0;
}this.drawCube$java_awt_Graphics$Z(g, true);
this.cameraPos = Clazz.array(Double.TYPE, [3]);
this.unmap3d$DA$I$I$D$java_awt_Rectangle(this.cameraPos, (this.winSize.width/2|0), (this.winSize.height/2|0), 5.0, this.viewMain);
if (disp == C$.DISP_VECTORS || disp == C$.DISP_VECTORS_A ) this.drawVectors$java_awt_Graphics(g);
 else if (disp == C$.DISP_LINES) {
this.genLines();
this.drawLines$java_awt_Graphics(g);
} else if (disp == C$.DISP_EQUIPS) {
this.genEquips();
this.drawLines$java_awt_Graphics(g);
} else if (disp == C$.DISP_VIEW_PAPER) this.drawViewPaper$java_awt_Graphics(g);
 else this.drawParticles$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).gray);
this.drawCube$java_awt_Graphics$Z(g, false);
this.drawAxes$java_awt_Graphics(g);
this.curfunc.finishFrame();
if (this.parseError) this.centerString$java_awt_Graphics$S$I(g, "Can\'t parse expression", this.winSize.height - 20);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
var t = System.currentTimeMillis();
C$.frames++;
if (C$.firsttime == 0) C$.firsttime = t;
 else if (t - C$.firsttime > 1000) {
C$.framerate = C$.frames;
C$.firsttime = t;
C$.frames = 0;
}if (this.$mouseDown) this.lastXRot = this.lastYRot = 0;
 else if (this.lastXRot != 0  || this.lastYRot != 0  ) {
this.rotate$D$D(this.lastXRot * this.timeStep, this.lastYRot * this.timeStep);
allquiet = false;
}if (!this.stoppedCheck.getState() && !allquiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'drawCurrentArrow$java_awt_Graphics$I$I$I$I', function (g, x1, y1, x2, y2) {
if (this.reverse == 1) this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, x1, y1, x2, y2, 7);
 else this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, x2, y2, x1, y1, 7);
});

Clazz.newMeth(C$, 'drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I', function (g, x1, y1, x2, y2, n, doArrow, dir) {
var i;
if (dir == -1) {
var x3 = x1;
var y3 = y1;
x1 = x2;
y1 = y2;
x2 = x3;
y2 = y3;
}var x0 = x1;
var y0 = y1;
n = n*(3);
for (i = 1; i <= n; i++) {
var x = ((x2 - x1) * i/n|0) + x1;
var y = ((y2 - y1) * i/n|0) + y1;
g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).yellow);
if (i == n && doArrow  && this.reverse == 1 ) this.drawCurrentArrow$java_awt_Graphics$I$I$I$I(g, x0, y0, x, y);
 else if (i == 1 && doArrow  && this.reverse == -1 ) this.drawCurrentArrow$java_awt_Graphics$I$I$I$I(g, x0, y0, x, y);
 else {
g.setColor$java_awt_Color(this.getCurrentColor$I(i));
g.drawLine$I$I$I$I(x0, y0, x, y);
}x0 = x;
y0 = y;
}
});

Clazz.newMeth(C$, 'getCurrentColor$I', function (i) {
return ((((this.currentStep/2|0) + 400 - i) & 4) > 0) ? (I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).yellow : (I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).darkGray;
});

Clazz.newMeth(C$, 'drawSphere$java_awt_Graphics$D$Z', function (g, r, back) {
var i;
var ct = 10;
for (i = 0; i != ct; i++) {
var th1 = 3.141592653589793 * 2 * i  / ct;
var th2 = 3.141592653589793 * 2 * (i + 1)  / ct;
var sinth1 = r * java.lang.Math.sin(th1);
var costh1 = r * java.lang.Math.cos(th1);
var sinth2 = r * java.lang.Math.sin(th2);
var costh2 = r * java.lang.Math.cos(th2);
if (this.backFacing$D$D$D$D$D$D(costh1, sinth1, 0, costh1, sinth1, 0) == back ) {
this.map3d$D$D$D$IA$IA$I(costh1, sinth1, 0, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(costh2, sinth2, 0, this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (this.backFacing$D$D$D$D$D$D(0, costh1, sinth1, 0, costh1, sinth1) == back ) {
this.map3d$D$D$D$IA$IA$I(0, costh1, sinth1, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(0, costh2, sinth2, this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (this.backFacing$D$D$D$D$D$D(costh1, 0, sinth1, costh1, 0, sinth1) == back ) {
this.map3d$D$D$D$IA$IA$I(costh1, 0, sinth1, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(costh2, 0, sinth2, this.xpoints, this.ypoints, 1);
g.drawLine$I$I$I$I(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}}
});

Clazz.newMeth(C$, 'fillSphere$java_awt_Graphics$D$D', function (g, r, xoff) {
var i;
var j;
var ct = 20;
for (i = 0; i != ct; i++) {
var th1 = 3.141592653589793 * i / ct;
var th2 = 3.141592653589793 * (i + 1) / ct;
var costh1 = r * java.lang.Math.cos(th1);
var sinth1 = r * java.lang.Math.sin(th1);
var costh2 = r * java.lang.Math.cos(th2);
var sinth2 = r * java.lang.Math.sin(th2);
var cosph1 = 1;
var sinph1 = 0;
for (j = 0; j != ct; j++) {
var ph2 = 2 * 3.141592653589793 * (j + 1)  / ct;
var cosph2 = java.lang.Math.cos(ph2);
var sinph2 = java.lang.Math.sin(ph2);
var x1 = sinth1 * cosph1;
var y1 = sinth1 * sinph1;
var z1 = costh1;
var x = this.cameraPos[0] - (x1 + xoff);
var y = this.cameraPos[1] - y1;
var z = this.cameraPos[2] - z1;
var d = x * x1 + y * y1 + z * z1;
if (d > 0 ) {
var dd = ((d / r * 40)|0);
if (dd > 255) dd = 255;
g.setColor$java_awt_Color(Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I$I$I,[dd, dd, 0]));
this.map3d$D$D$D$IA$IA$I(xoff + x1, y1, z1, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(xoff + sinth1 * cosph2, sinth1 * sinph2, costh1, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(xoff + sinth2 * cosph2, sinth2 * sinph2, costh2, this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(xoff + sinth2 * cosph1, sinth2 * sinph1, costh2, this.xpoints, this.ypoints, 3);
g.fillPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
}cosph1 = cosph2;
sinph1 = sinph2;
}
}
});

Clazz.newMeth(C$, 'drawCylinder$java_awt_Graphics$D$D$Z', function (g, r, xoff, back) {
var i;
var ct = 10;
for (i = 0; i != ct; i++) {
var th1 = 3.141592653589793 * 2 * i  / ct;
var th2 = 3.141592653589793 * 2 * (i + 1)  / ct;
var sinth1 = r * java.lang.Math.sin(th1);
var costh1 = r * java.lang.Math.cos(th1);
var sinth2 = r * java.lang.Math.sin(th2);
var costh2 = r * java.lang.Math.cos(th2);
if (this.backFacing$D$D$D$D$D$D(costh1, sinth1, 0, costh1, sinth1, 0) == back ) {
this.map3d$D$D$D$IA$IA$I(xoff + costh1, sinth1, -1, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(xoff + costh2, sinth2, -1, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(xoff + costh2, sinth2, 1, this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(xoff + costh1, sinth1, 1, this.xpoints, this.ypoints, 3);
g.drawPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
}}
});

Clazz.newMeth(C$, 'setFaceColor$java_awt_Graphics$D', function (g, d) {
var dd = 32 + ((d * 40)|0);
if (dd > 255) dd = 255;
g.setColor$java_awt_Color(Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$I$I$I,[dd, dd, 0]));
});

Clazz.newMeth(C$, 'fillCylinder$java_awt_Graphics$D$D', function (g, r, xoff) {
var i;
var ct = 30;
var sidepoints;
sidepoints = Clazz.array(Integer.TYPE, [4, ct]);
for (i = 0; i != ct; i++) {
var th1 = 3.141592653589793 * 2 * i  / ct;
var th2 = 3.141592653589793 * 2 * (i + 1)  / ct;
var sinth1 = r * java.lang.Math.sin(th1);
var costh1 = r * java.lang.Math.cos(th1);
var sinth2 = r * java.lang.Math.sin(th2);
var costh2 = r * java.lang.Math.cos(th2);
var x = this.cameraPos[0] - (xoff + costh1);
var y = this.cameraPos[1] - sinth1;
var d = x * costh1 + y * sinth1;
if (d > 0 ) this.setFaceColor$java_awt_Graphics$D(g, d / r);
this.map3d$D$D$D$IA$IA$I(xoff + costh1, sinth1, -1, this.xpoints, this.ypoints, 0);
this.map3d$D$D$D$IA$IA$I(xoff + costh2, sinth2, -1, this.xpoints, this.ypoints, 1);
this.map3d$D$D$D$IA$IA$I(xoff + costh2, sinth2, 1, this.xpoints, this.ypoints, 2);
this.map3d$D$D$D$IA$IA$I(xoff + costh1, sinth1, 1, this.xpoints, this.ypoints, 3);
sidepoints[0][i] = this.xpoints[0];
sidepoints[1][i] = this.ypoints[0];
sidepoints[2][i] = this.xpoints[3];
sidepoints[3][i] = this.ypoints[3];
if (d > 0 ) g.fillPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
}
if (!this.backFacing$D$D$D$D$D$D(0, 0, 1, 0, 0, 1)) {
this.setFaceColor$java_awt_Graphics$D(g, this.cameraPos[2]);
g.fillPolygon$IA$IA$I(sidepoints[2], sidepoints[3], ct);
} else if (!this.backFacing$D$D$D$D$D$D(0, 0, -1, 0, 0, -1)) {
this.setFaceColor$java_awt_Graphics$D(g, -this.cameraPos[2]);
g.fillPolygon$IA$IA$I(sidepoints[0], sidepoints[1], ct);
}});

Clazz.newMeth(C$, 'drawAxes$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).white);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 0, this.xpoints, this.ypoints, 0, this.viewAxes);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(1, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "x", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(0, 1, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "y", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3dView$D$D$D$IA$IA$I$java_awt_Rectangle(0, 0, 1, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow$java_awt_Graphics$S$I$I$I$I(g, "z", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
});

Clazz.newMeth(C$, 'drawViewPaper$java_awt_Graphics', function (g) {
var i;
var j;
var ct = this.vecDensityBar.getValue();
ct = 24 + ((ct * 56/64|0));
var z = this.sliceval;
var pos = Clazz.array(Double.TYPE, [3]);
var field = Clazz.array(Double.TYPE, [3]);
var slice = this.sliceChooser.getSelectedIndex() - 1;
if (slice < 0) slice = 0;
var coord1 = (slice == 0) ? 1 : 0;
var coord2 = (slice == 2) ? 1 : 2;
for (i = 0; i != ct; i++) {
var x1 = i * 2.0 / ct - 1;
var x2 = (i + 1.0) * 2 / ct - 1;
for (j = 0; j != ct; j++) {
var y1 = j * 2.0 / ct - 1;
var y2 = (j + 1.0) * 2 / ct - 1;
pos[coord1] = x1;
pos[coord2] = y1;
pos[slice] = z;
this.curfunc.getField$DA$DA(field, pos);
var prp = field[slice] < 0  ? -field[slice] : field[slice];
var par = java.lang.Math.sqrt(field[coord1] * field[coord1] + field[coord2] * field[coord2]);
var dd = (((par / 2 - prp) * this.strengthBar.getValue() * 20000.0  + 128)|0);
if (dd < 0) dd = 0;
if (dd > 255) dd = 255;
g.setColor$java_awt_Color(Clazz.new_((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).c$$F$F$F,[0.0, dd / 255.0, 0.0]));
this.map3d$D$D$D$IA$IA$I(pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 0);
pos[coord1] = x2;
this.map3d$D$D$D$IA$IA$I(pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 1);
pos[coord2] = y2;
this.map3d$D$D$D$IA$IA$I(pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 2);
pos[coord1] = x1;
this.map3d$D$D$D$IA$IA$I(pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 3);
g.fillPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
}
}
});

Clazz.newMeth(C$, 'drawVectors$java_awt_Graphics', function (g) {
var x;
var y;
var z;
var dd = Clazz.new_((I$[105]||(I$[105]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DrawData))), [this, null]);
dd.mult = this.strengthBar.getValue() * 80.0;
dd.g = g;
dd.field = Clazz.array(Double.TYPE, [3]);
dd.vv = Clazz.array(Double.TYPE, [3]);
this.vectorSpacing = this.vecDensityBar.getValue();
var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
var vec = Clazz.array(Double.TYPE, [3]);
if (this.vectors == null  && sliced ) this.vectors = Clazz.array((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [this.vectorSpacing * this.vectorSpacing]);
this.vecCount = 0;
if (!sliced) {
this.vectorSpacing = (this.vectorSpacing/2|0);
if (this.vectors == null ) this.vectors = Clazz.array((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [this.vectorSpacing * this.vectorSpacing * this.vectorSpacing ]);
for (x = 0; x != this.vectorSpacing; x++) {
vec[0] = x * (2.0 / (this.vectorSpacing - 1)) - 1;
for (y = 0; y != this.vectorSpacing; y++) {
vec[1] = y * (2.0 / (this.vectorSpacing - 1)) - 1;
for (z = 0; z != this.vectorSpacing; z++) {
vec[2] = z * (2.0 / (this.vectorSpacing - 1)) - 1;
this.drawVector$com_falstad_Vec3DemoFrame_DrawData$DA(dd, vec);
}
}
}
} else {
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
var slicecoord = slice - 1;
vec[slicecoord] = this.sliceval;
for (x = 0; x != this.vectorSpacing; x++) {
vec[coord1] = x * (2.0 / (this.vectorSpacing - 1)) - 1;
for (y = 0; y != this.vectorSpacing; y++) {
vec[coord2] = y * (2.0 / (this.vectorSpacing - 1)) - 1;
this.drawVector$com_falstad_Vec3DemoFrame_DrawData$DA(dd, vec);
}
}
}this.curfunc.render$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'genLines', function () {
if (this.vectors != null ) return;
this.partMult = this.fieldStrength = 10;
var i;
this.vecCount = 0;
var lineGridSize = this.lineDensityBar.getValue();
if (lineGridSize < 3) lineGridSize = 3;
if (lineGridSize > 16) lineGridSize = 16;
var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
if (sliced) lineGridSize = lineGridSize*(2);
var ct = (sliced) ? 30 * lineGridSize * lineGridSize  : 30 * lineGridSize * lineGridSize * lineGridSize ;
this.vectors = Clazz.array((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [ct]);
var brightmult = 160 * this.strengthBar.getValue();
var lineGrid = Clazz.array(Boolean.TYPE, [lineGridSize, lineGridSize, lineGridSize]);
var lineGridMult = lineGridSize / 2.0;
if (sliced) {
var j;
var k;
var gp = (((this.sliceval + 1) * lineGridMult)|0);
for (i = 0; i != lineGridSize; i++) for (j = 0; j != lineGridSize; j++) for (k = 0; k != lineGridSize; k++) {
switch (slice) {
case 1:
lineGrid[i][j][k] = i != gp;
break;
case 2:
lineGrid[i][j][k] = j != gp;
break;
case 3:
lineGrid[i][j][k] = k != gp;
break;
}
}


}var origp = Clazz.array(Double.TYPE, [3]);
var field = Clazz.array(Double.TYPE, [3]);
var p = Clazz.new_((I$[94]||(I$[94]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Particle))), [this, null]);
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
var pz = 0;
while (true){
if (!lineGrid[px][py][pz]) break;
if (++px < lineGridSize) continue;
px = 0;
if (++py < lineGridSize) continue;
py = 0;
if (++pz < lineGridSize) continue;
break;
}
if (pz == lineGridSize) break;
lineGrid[px][py][pz] = true;
var offs = 0.5 / lineGridMult;
origp[0] = p.pos[0] = px / lineGridMult - 1 + offs;
origp[1] = p.pos[1] = py / lineGridMult - 1 + offs;
origp[2] = p.pos[2] = pz / lineGridMult - 1 + offs;
if (sliced) origp[slice - 1] = p.pos[slice - 1] = this.sliceval;
}var fv = this.vectors[this.vecCount];
if (fv == null ) {
fv = this.vectors[this.vecCount] = Clazz.new_((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [this, null]);
fv.p1 = Clazz.array(Double.TYPE, [3]);
fv.p2 = Clazz.array(Double.TYPE, [3]);
}this.vecCount++;
fv.p1[0] = p.pos[0];
fv.p1[1] = p.pos[1];
fv.p1[2] = p.pos[2];
var x = p.pos;
this.lineSegment$com_falstad_Vec3DemoFrame_Particle$I(p, dir);
if (p.lifetime < 0 ) {
this.vecCount--;
continue;
}var gx = (((x[0] + 1) * lineGridMult)|0);
var gy = (((x[1] + 1) * lineGridMult)|0);
var gz = (((x[2] + 1) * lineGridMult)|0);
if (!lineGrid[gx][gy][gz]) segs--;
lineGrid[gx][gy][gz] = true;
fv.p2[0] = p.pos[0];
fv.p2[1] = p.pos[1];
fv.p2[2] = p.pos[2];
var dn = brightmult * p.phi;
if (dn > 2 ) dn = 2;
fv.col = ((dn * 255)|0);
var d2 = this.dist2$DA$DA(origp, x);
if (d2 > lastdist ) lastdist = d2;
 else segs++;
if (segs > 10 || d2 < 0.001  ) p.lifetime = -1;
}
});

Clazz.newMeth(C$, 'drawLines$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != this.vecCount; i++) {
var fv = this.vectors[i];
var x = fv.p1;
this.map3d$D$D$D$IA$IA$I(x[0], x[1], x[2], this.xpoints, this.ypoints, 0);
var vp1 = this.curfunc.getViewPri$DA$DA(this.cameraPos, x);
x = fv.p2;
this.map3d$D$D$D$IA$IA$I(x[0], x[1], x[2], this.xpoints, this.ypoints, 1);
fv.sx1 = this.xpoints[0];
fv.sy1 = this.ypoints[0];
fv.sx2 = this.xpoints[1];
fv.sy2 = this.ypoints[1];
var vp2 = this.curfunc.getViewPri$DA$DA(this.cameraPos, x);
fv.viewPri = (vp1 > vp2) ? vp1 : vp2;
}
this.curfunc.render$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'canSubdivide$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint', function (a, b) {
return this.dist2$DA$DA(a.pos, b.pos) > 0.0016 ;
});

Clazz.newMeth(C$, 'genEquips', function () {
if (this.vectors != null ) return;
this.partMult = this.fieldStrength = 10;
this.vecCount = 0;
var slice = this.sliceChooser.getSelectedIndex();
this.vectors = Clazz.array((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [10000]);
this.potfield = Clazz.array(Double.TYPE, [3]);
var eps = Clazz.array((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))), [4]);
var i;
for (i = 0; i != 4; i++) eps[i] = Clazz.new_((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))), [this, null]);

if (slice == 0) {
var steps = 3;
for (i = -steps; i <= steps; i++) this.genEquipPlane$com_falstad_Vec3DemoFrame_EquipPointA$D$I(eps, i / steps, 1);

for (i = -steps; i <= steps; i++) this.genEquipPlane$com_falstad_Vec3DemoFrame_EquipPointA$D$I(eps, i / steps, 2);

for (i = -steps; i <= steps; i++) this.genEquipPlane$com_falstad_Vec3DemoFrame_EquipPointA$D$I(eps, i / steps, 3);

} else this.genEquipPlane$com_falstad_Vec3DemoFrame_EquipPointA$D$I(eps, this.sliceval, slice);
});

Clazz.newMeth(C$, 'genEquipPlane$com_falstad_Vec3DemoFrame_EquipPointA$D$I', function (eps, z, slice) {
var i;
var j;
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
slice = slice-(1);
var grid = (this.sliceChooser.getSelectedIndex() == 0) ? 12 : 24;
var gridmult = 2.0 / grid;
var pots = Clazz.array(Double.TYPE, [grid + 1, grid + 1]);
for (i = 0; i <= grid; i++) for (j = 0; j <= grid; j++) {
var x1 = i * gridmult - 1;
var y1 = j * gridmult - 1;
eps[0].set$I$I$I$D$D$D(coord1, coord2, slice, x1, y1, z);
this.curfunc.getField$DA$DA(this.potfield, eps[0].pos);
pots[i][j] = this.reverse * this.potfield[0];
}

for (i = 0; i != grid; i++) for (j = 0; j != grid; j++) {
var x1 = i * gridmult - 1;
var y1 = j * gridmult - 1;
var x2 = (i + 1) * gridmult - 1;
var y2 = (j + 1) * gridmult - 1;
eps[0].set$I$I$I$D$D$D(coord1, coord2, slice, x1, y1, z);
eps[1].set$I$I$I$D$D$D(coord1, coord2, slice, x2, y1, z);
eps[2].set$I$I$I$D$D$D(coord1, coord2, slice, x1, y2, z);
eps[3].set$I$I$I$D$D$D(coord1, coord2, slice, x2, y2, z);
eps[0].setPot$D(pots[i][j]);
eps[1].setPot$D(pots[i + 1][j]);
eps[2].setPot$D(pots[i][j + 1]);
eps[3].setPot$D(pots[i + 1][j + 1]);
this.tryEdges$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(eps[0], eps[1], eps[2], eps[3]);
}

});

Clazz.newMeth(C$, 'max$D$D', function (a, b) {
return a > b  ? a : b;
});

Clazz.newMeth(C$, 'min$D$D', function (a, b) {
return a < b  ? a : b;
});

Clazz.newMeth(C$, 'shouldSubdivide$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint', function (ep1, ep2, ep3, ep4) {
if (!ep1.inRange()) return true;
if (!ep2.inRange()) return true;
if (!ep3.inRange()) return true;
if (!ep4.inRange()) return true;
var pmin = this.min$D$D(this.min$D$D(ep1.pot, ep2.pot), this.min$D$D(ep3.pot, ep4.pot));
var pmax = this.max$D$D(this.max$D$D(ep1.pot, ep2.pot), this.max$D$D(ep3.pot, ep4.pot));
return (pmax - pmin) > 0.3 ;
});

Clazz.newMeth(C$, 'tryEdges$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint', function (ep1, ep2, ep3, ep4) {
if (this.shouldSubdivide$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep2, ep3, ep4) && this.canSubdivide$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep2) ) {
var ep12 = Clazz.new_((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))).c$$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint, [this, null, ep1, ep2]);
var ep13 = Clazz.new_((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))).c$$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint, [this, null, ep1, ep3]);
var ep24 = Clazz.new_((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))).c$$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint, [this, null, ep2, ep4]);
var ep34 = Clazz.new_((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))).c$$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint, [this, null, ep3, ep4]);
var epc = Clazz.new_((I$[107]||(I$[107]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').EquipPoint))).c$$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint, [this, null, ep12, ep34]);
this.tryEdges$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep12, ep13, epc);
this.tryEdges$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep12, ep2, epc, ep24);
this.tryEdges$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep13, epc, ep3, ep34);
this.tryEdges$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(epc, ep24, ep34, ep4);
return;
}this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep2, ep3, ep4);
this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep2, ep1, ep3);
this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep2, ep2, ep4);
this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep3, ep2, ep4);
this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep1, ep3, ep3, ep4);
this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint(ep2, ep4, ep3, ep4);
});

Clazz.newMeth(C$, 'spanning$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D', function (ep1, ep2, pval) {
if (ep1.pot == ep2.pot ) return false;
if (!(ep1.valid() && ep2.valid() )) return false;
return !((ep1.pot < pval  && ep2.pot < pval  ) || (ep1.pot > pval  && ep2.pot > pval  ) );
});

Clazz.newMeth(C$, 'interpPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D$DA', function (ep1, ep2, pval, pos) {
var interp2 = (pval - ep1.pot) / (ep2.pot - ep1.pot);
var interp1 = 1 - interp2;
var i;
for (i = 0; i != 3; i++) pos[i] = ep1.pos[i] * interp1 + ep2.pos[i] * interp2;

});

Clazz.newMeth(C$, 'tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint', function (ep1, ep2, ep3, ep4) {
var i;
if (this.sliceChooser.getSelectedIndex() == 0) {
this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D(ep1, ep2, ep3, ep4, (this.potentialBar.getValue() - 500) / 500.0);
} else {
for (i = -20; i <= 20; i++) this.tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D(ep1, ep2, ep3, ep4, i / 20.0);

}});

Clazz.newMeth(C$, 'tryEdge$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D', function (ep1, ep2, ep3, ep4, pval) {
if (!(this.spanning$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D(ep1, ep2, pval) && this.spanning$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D(ep3, ep4, pval) )) return;
if (this.vecCount == 10000) return;
var fv = this.vectors[this.vecCount];
if (fv == null ) {
fv = this.vectors[this.vecCount] = Clazz.new_((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [this, null]);
fv.p1 = Clazz.array(Double.TYPE, [3]);
fv.p2 = Clazz.array(Double.TYPE, [3]);
}this.vecCount++;
this.interpPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D$DA(ep1, ep2, pval, fv.p1);
this.interpPoint$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint$D$DA(ep3, ep4, pval, fv.p2);
fv.col = 255 + (((255 * pval)|0));
});

Clazz.newMeth(C$, 'drawVector$com_falstad_Vec3DemoFrame_DrawData$DA', function (dd, vec) {
var field = dd.field;
this.curfunc.getField$DA$DA(field, vec);
var dn = java.lang.Math.sqrt(field[0] * field[0] + field[1] * field[1] + field[2] * field[2]);
var dnr = dn * this.reverse;
if (dn > 0 ) {
field[0] /= dnr;
field[1] /= dnr;
field[2] /= dnr;
}dn *= dd.mult;
if (dn > 2 ) dn = 2;
var col = ((dn * 255)|0);
var sw2 = 1.0 / (this.vectorSpacing - 1);
this.map3d$D$D$D$IA$IA$I(vec[0], vec[1], vec[2], this.xpoints, this.ypoints, 0);
var vv = dd.vv;
vv[0] = vec[0] + sw2 * field[0];
vv[1] = vec[1] + sw2 * field[1];
vv[2] = vec[2] + sw2 * field[2];
this.map3d$D$D$D$IA$IA$I(vv[0], vv[1], vv[2], this.xpoints, this.ypoints, 1);
var fv = this.vectors[this.vecCount];
if (fv == null ) fv = this.vectors[this.vecCount] = Clazz.new_((I$[106]||(I$[106]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FieldVector))), [this, null]);
fv.sx1 = this.xpoints[0];
fv.sy1 = this.ypoints[0];
fv.sx2 = this.xpoints[1];
fv.sy2 = this.ypoints[1];
fv.col = col;
this.vecCount++;
var vp1 = this.curfunc.getViewPri$DA$DA(this.cameraPos, vec);
if (!this.curfunc.noSplitFieldVectors()) fv.viewPri = vp1;
 else {
var vp2 = this.curfunc.getViewPri$DA$DA(this.cameraPos, vv);
fv.viewPri = (vp1 == vp2) ? vp1 : -1;
}});

Clazz.newMeth(C$, 'drawParticles$java_awt_Graphics', function (g) {
var i;
var pcount = this.getParticleCount();
for (i = 0; i < pcount; i++) {
var pt = this.particles[i];
pt.viewPri = this.curfunc.getViewPri$DA$DA(this.cameraPos, pt.pos);
}
this.curfunc.render$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'moveParticles', function () {
this.fieldStrength = this.strengthBar.getValue();
var bestd = 0;
var i;
var pcount = this.getParticleCount();
var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
this.partMult = this.fieldStrength * this.reverse * this.timeStep ;
for (i = 0; i != pcount; i++) {
var pt = this.particles[i];
this.removeFromDensityGroup$com_falstad_Vec3DemoFrame_Particle(pt);
this.moveParticle$com_falstad_Vec3DemoFrame_Particle(pt);
var x = pt.pos;
if (!(x[0] >= -1  && x[0] < 1   && x[1] >= -1   && x[1] < 1   && x[2] >= -1   && x[2] < 1  ) || (pt.lifetime -= this.timeStep) < 0  ) {
this.positionParticle$com_falstad_Vec3DemoFrame_Particle(pt);
}if (sliced) x[slice - 1] = this.sliceval;
var d = this.addToDensityGroup$com_falstad_Vec3DemoFrame_Particle(pt);
if (d > bestd) bestd = d;
}
var withforce = (this.dispChooser.getSelectedIndex() == C$.DISP_PART_FORCE);
var maxd = ((10 * this.getParticleCount()/64|0));
if (sliced) maxd = (4 * this.getParticleCount()/16|0);
if (!withforce && this.curfunc.redistribute() && bestd > maxd  ) this.redistribute$I(bestd);
});

Clazz.newMeth(C$, 'drawCube$java_awt_Graphics$Z', function (g, drawAll) {
var i;
var slice = this.sliceChooser.getSelectedIndex();
var sp = (drawAll) ? 0 : 8;
for (i = 0; i != 6; i++) {
var nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
var ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
var nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
if (!drawAll && this.backFacing$D$D$D$D$D$D(nx, ny, nz, nx, ny, nz) ) continue;
var pts;
pts = Clazz.array(Double.TYPE, [3]);
var n;
for (n = 0; n != 4; n++) {
this.computeFace$I$I$DA(i, n, pts);
this.map3d$D$D$D$IA$IA$I(pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n);
}
g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).gray);
g.drawPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
if (slice != 0 && (i/2|0) != slice - 1 ) {
if (this.selectedSlice) g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace$I$I$DA(i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp);
this.computeFace$I$I$DA(i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d$D$D$D$IA$IA$I(pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1);
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

Clazz.newMeth(C$, 'renderItems$java_awt_Graphics$I', function (g, pri) {
g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).white);
var disp = this.dispChooser.getSelectedIndex();
if (disp == C$.DISP_VECTORS || disp == C$.DISP_VECTORS_A ) {
var i;
for (i = 0; i != this.vecCount; i++) {
var fv = this.vectors[i];
if (fv.viewPri != pri) continue;
g.setColor$java_awt_Color(this.fieldColors[fv.col]);
this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, fv.sx1, fv.sy1, fv.sx2, fv.sy2, 2);
}
return;
}if (disp == C$.DISP_LINES || disp == C$.DISP_EQUIPS ) {
var i;
g.setColor$java_awt_Color((I$[90]||(I$[90]=Clazz.load('java.awt.Color'))).white);
var colvec = (disp == C$.DISP_EQUIPS) ? this.equipColors : this.fieldColors;
for (i = 0; i != this.vecCount; i++) {
var fv = this.vectors[i];
if (fv.viewPri != pri) continue;
if (fv.sx1 == fv.sx2 && fv.sy1 == fv.sy2 ) continue;
g.setColor$java_awt_Color(colvec[fv.col]);
g.drawLine$I$I$I$I(fv.sx1, fv.sy1, fv.sx2, fv.sy2);
}
return;
}var pcount = this.getParticleCount();
var i;
this.wooft += 0.3;
for (i = 0; i < pcount; i++) {
var p = this.particles[i];
if (p.viewPri != pri) continue;
var pos = p.pos;
this.map3d$D$D$D$IA$IA$I(pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 0);
if (this.xpoints[0] < 0 || this.xpoints[0] >= this.winSize.width  || this.ypoints[0] < 0  || this.ypoints[0] >= this.winSize.height ) continue;
if (disp == C$.DISP_PART_MAG) {
var cosph = java.lang.Math.cos(p.phi);
var sinph = java.lang.Math.sin(p.phi);
var costh = java.lang.Math.cos(p.theta);
var sinth = java.lang.Math.sin(p.theta);
var al = 0.08;
var rhatx = sinth * cosph * al ;
var rhaty = sinth * sinph * al ;
var rhatz = costh * al;
this.map3d$D$D$D$IA$IA$I(pos[0] + rhatx, pos[1] + rhaty, pos[2] + rhatz, this.xpoints, this.ypoints, 1);
this.drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], 2);
} else g.fillRect$I$I$I$I(this.xpoints[0], this.ypoints[0] - 1, 2, 2);
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

Clazz.newMeth(C$, 'backFacing$D$D$D$D$D$D', function (px, py, pz, nx, ny, nz) {
var x = this.cameraPos[0] - px;
var y = this.cameraPos[1] - py;
var z = this.cameraPos[2] - pz;
var d = x * nx + y * ny + z * nz;
return d <= 0 ;
});

Clazz.newMeth(C$, 'intersectSphere$DA$D$D$D$D', function (cp, ptx, pty, ptz, r) {
return this.intersectSphere$DA$D$D$D$D$D$D$D(cp, ptx, pty, ptz, 0, 0, 0, r);
});

Clazz.newMeth(C$, 'intersectSphere$DA$D$D$D$D$D$D$D', function (cp, ptx, pty, ptz, sx, sy, sz, r) {
var vx = ptx - cp[0];
var vy = pty - cp[1];
var vz = ptz - cp[2];
var qpx = cp[0] - sx;
var qpy = cp[1] - sy;
var qpz = cp[2] - sz;
var a = vx * vx + vy * vy + vz * vz;
var b = 2 * (vx * qpx + vy * qpy + vz * qpz);
var c = qpx * qpx + qpy * qpy + qpz * qpz - r * r;
var discrim = b * b - 4 * a * c ;
if (discrim < 0 ) return 0;
discrim = java.lang.Math.sqrt(discrim);
var b1 = (-b - discrim) / (2 * a);
var b2 = (-b + discrim) / (2 * a);
if (b1 < 1  && this.inViewBox$D$DA$D$D$D(b1, cp, vx, vy, vz) ) return (b2 < 1 ) ? 2 : 1;
 else return 0;
});

Clazz.newMeth(C$, 'intersectZPlane$DA$D$D$D$D', function (cp, a, ptx, pty, ptz) {
var vx = ptx - cp[0];
var vy = pty - cp[1];
var vz = ptz - cp[2];
var t = this.intersectionDistance = -(cp[2] + a) / vz;
if (t > 1 ) return 0;
if (!this.inViewBox$D$DA$D$D$D(t, cp, vx, vy, vz)) return 0;
return 2;
});

Clazz.newMeth(C$, 'inViewBox$D$DA$D$D$D', function (t, cp, vx, vy, vz) {
if (t < 0 ) return false;
var ix = this.intersection[0] = cp[0] + vx * t;
var iy = this.intersection[1] = cp[1] + vy * t;
var iz = this.intersection[2] = cp[2] + vz * t;
if (ix < -1  || ix > 1   || iy < -1   || iy > 1   || iz < -1   || iz > 1  ) return false;
return true;
});

Clazz.newMeth(C$, 'intersectCylinder$DA$D$D$D$D$Z', function (cp, ptx, pty, ptz, r, vbTest) {
return this.intersectCylinder$DA$D$D$D$D$D$D$Z(cp, ptx, pty, ptz, 0, 0, r, vbTest);
});

Clazz.newMeth(C$, 'intersectCylinder$DA$D$D$D$D$D$D$Z', function (cp, ptx, pty, ptz, sx, sy, r, vbTest) {
var vx = ptx - cp[0];
var vy = pty - cp[1];
var qpx = cp[0] - sx;
var qpy = cp[1] - sy;
var a = vx * vx + vy * vy;
var b = 2 * (vx * qpx + vy * qpy);
var c = qpx * qpx + qpy * qpy - r * r;
var discrim = b * b - 4 * a * c ;
if (discrim < 0 ) return 0;
discrim = java.lang.Math.sqrt(discrim);
var b1 = (-b - discrim) / (2 * a);
var b2 = (-b + discrim) / (2 * a);
if (b1 > 1 ) return 0;
if (!vbTest || this.inViewBox$D$DA$D$D$D(b1, cp, vx, vy, ptz - cp[2]) ) return (b2 < 1 ) ? 2 : 1;
if (b2 > 1 ) return 2;
if (this.inViewBox$D$DA$D$D$D(b2, cp, vx, vy, ptz - cp[2])) return 2;
return 0;
});

Clazz.newMeth(C$, 'redistribute$I', function (mostd) {
if (mostd < 5) return;
this.rediscount++;
var maxd = ((10 * this.getParticleCount()/64|0));
var i;
var pn = 0;
var pcount = this.getParticleCount();
for (i = this.rediscount % 4; i < pcount; i = i+(4)) {
var p = this.particles[i];
var a = (((p.pos[0] + 1) * 2)|0);
var b = (((p.pos[1] + 1) * 2)|0);
var c = (((p.pos[2] + 1) * 2)|0);
if (this.density[a][b][c] <= maxd) continue;
p.lifetime = -1;
pn++;
}
});

Clazz.newMeth(C$, 'distanceParticle$com_falstad_Vec3DemoFrame_Particle', function (p) {
return C$.distance3$D$D$D(p.pos[0], p.pos[1], p.pos[2]);
}, 1);

Clazz.newMeth(C$, 'distanceArray$DA', function (y) {
return C$.distance3$D$D$D(y[0], y[1], y[2]);
}, 1);

Clazz.newMeth(C$, 'distance3$D$D$D', function (x, y, z) {
return java.lang.Math.sqrt(x * x + y * y + z * z + 1.0E-9);
}, 1);

Clazz.newMeth(C$, 'distance2$D$D', function (x, y) {
return java.lang.Math.sqrt(x * x + y * y + 1.0E-9);
}, 1);

Clazz.newMeth(C$, 'rotateParticleAdd$DA$DA$D$D$D', function (result, y, mult, cx, cy) {
result[0] += -mult * (y[1] - cy);
result[1] += mult * (y[0] - cx);
result[2] += 0;
});

Clazz.newMeth(C$, 'rotateParticle$DA$DA$D', function (result, y, mult) {
result[0] = -mult * y[1];
result[1] = mult * y[0];
result[2] = 0;
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
this.vectors = null;
if (e.getSource() === this.resetButton ) this.resetParticles();
if (e.getSource() === this.kickButton ) this.kickParticles();
if (e.getSource() === this.infoButton ) {
var s = this.curfunc.getClass().getName();
try {
s = s.substring(s.lastIndexOf('.') + 1);
this.applet.getAppletContext().showDocument$java_net_URL$S(Clazz.new_((I$[108]||(I$[108]=Clazz.load('java.net.URL'))).c$$java_net_URL$S,[this.applet.getCodeBase(), "functions.html" + '#' + s ]), "functionHelp");
} catch (ex) {
if (Clazz.exceptionOf(ex, Exception)){
} else {
throw ex;
}
}
}this.curfunc.actionPerformed();
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
this.vectors = null;
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.partCountBar ) this.resetDensityGroups();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX();
this.dragY = e.getY();
var mode = this.modeChooser.getSelectedIndex();
if (this.selectedSlice) mode = 2;
if (mode == 0) {
var xo = this.oldDragX - this.dragX;
var yo = this.oldDragY - this.dragY;
this.rotate$D$D(this.lastXRot = xo / 40.0, this.lastYRot = -yo / 40.0);
var lr = Math.sqrt(this.lastXRot * this.lastXRot + this.lastYRot * this.lastYRot);
if (lr > 0.06 ) {
lr /= 0.06;
this.lastXRot /= lr;
this.lastYRot /= lr;
}this.cv.repaint$J(this.pause);
} else if (mode == 1) {
var xo = this.dragX - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.0;
if (this.zoom < 0.1 ) this.zoom = 0.1;
this.cv.repaint$J(this.pause);
} else if (mode == 2) {
var x3 = Clazz.array(Double.TYPE, [3]);
this.unmap3d$DA$I$I$DA$DA$java_awt_Rectangle(x3, this.dragX, this.dragY, this.sliceFace, this.sliceFace, this.viewMain);
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
this.vectors = null;
}});

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

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
this.dragX = e.getX();
this.dragY = e.getY();
this.dragStartX = this.dragX;
this.dragStartY = this.dragY;
this.dragZoomStart = this.zoom;
var ss = this.selectedSlice;
this.checkSlice$I$I(this.dragX, this.dragY);
if (ss != this.selectedSlice ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.mouseMoved$java_awt_event_MouseEvent(e);
this.$mouseDown = true;
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
this.$mouseDown = false;
});

Clazz.newMeth(C$, 'dispChooserChanged', function () {
var disp = this.dispChooser.getSelectedIndex();
this.showA = (disp == C$.DISP_PART_VELOC_A || disp == C$.DISP_VECTORS_A );
this.getPot = (disp == C$.DISP_EQUIPS);
if (disp == C$.DISP_PART_FORCE) this.kickButton.enable();
 else this.kickButton.disable();
this.potentialLabel.hide();
this.potentialBar.hide();
this.vecDensityLabel.hide();
this.vecDensityBar.hide();
this.lineDensityLabel.hide();
this.lineDensityBar.hide();
this.partCountLabel.hide();
this.partCountBar.hide();
this.strengthLabel.show();
this.strengthBar.show();
if (disp == C$.DISP_VECTORS || disp == C$.DISP_VECTORS_A  || disp == C$.DISP_VIEW_PAPER ) {
this.vecDensityLabel.show();
this.vecDensityBar.show();
} else if (disp == C$.DISP_LINES) {
this.lineDensityLabel.show();
this.lineDensityBar.show();
} else if (disp == C$.DISP_EQUIPS) {
this.potentialLabel.show();
this.potentialBar.show();
} else {
this.partCountLabel.show();
this.partCountBar.show();
}this.vecDensityLabel.setText$S(disp == C$.DISP_VIEW_PAPER ? "Resolution" : "Vector Density");
if (disp == C$.DISP_EQUIPS) {
this.strengthLabel.hide();
this.strengthBar.hide();
}if ((disp == C$.DISP_VIEW_PAPER || disp == C$.DISP_EQUIPS ) && this.sliceChooser.getSelectedIndex() == 0 ) {
this.sliceChooser.select$I(this.curfunc.getBestSlice());
this.potentialBar.disable();
}this.validate();
this.resetParticles();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished || this.ignoreChanges ) return;
this.vectors = null;
this.cv.repaint$J(this.pause);
this.reverse = (this.reverseCheck.getState()) ? -1 : 1;
if (e.getItemSelectable() === this.dispChooser ) {
this.dispChooserChanged();
this.resetParticles();
}if (e.getItemSelectable() === this.sliceChooser ) {
this.resetParticles();
if (this.modeChooser.getSelectedIndex() == 2) this.modeChooser.select$I(0);
if (this.sliceChooser.getSelectedIndex() == 0) this.potentialBar.enable();
 else this.potentialBar.disable();
}if (e.getStateChange() != 1) return;
if (e.getItemSelectable() === this.functionChooser ) this.functionChanged();
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
this.textFields[i].hide();
if (this.textFieldLabel != null ) this.textFieldLabel.hide();
}
this.strengthBar.setValue$I(20);
var x = this.dispChooser.getSelectedIndex();
this.setupDispChooser$Z(!this.curfunc.nonGradient());
this.ignoreChanges = true;
try {
if (x >= 0) this.dispChooser.select$I(x);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.ignoreChanges = false;
this.curfunc.setup();
this.sliceChooser.select$I(0);
this.validate();
this.resetParticles();
this.dispChooserChanged();
});

Clazz.newMeth(C$, 'setupDispChooser$Z', function (potential) {
this.ignoreChanges = true;
this.dispChooser.removeAllItems();
this.dispChooser.add$S("Display: Particles (Vel.)");
if (C$.BUILD_M) {
this.dispChooser.add$S("Display: Parts (A Field, Vel.)");
this.dispChooser.add$S("Display: Field Vectors");
this.dispChooser.add$S("Display: Field Vectors (A)");
} else {
this.dispChooser.add$S("Display: Particles (Force)");
this.dispChooser.add$S("Display: Field Vectors");
}if (C$.BUILD_V) this.dispChooser.add$S("Display: Streamlines");
 else this.dispChooser.add$S("Display: Field Lines");
if (C$.BUILD_M) {
this.dispChooser.add$S("Display: Parts (Magnetic)");
this.dispChooser.add$S("Display: Mag View Film");
} else {
if (potential) this.dispChooser.add$S("Display: Equipotentials");
}this.ignoreChanges = false;
});

Clazz.newMeth(C$, 'setupBar$I$S$I', function (n, text, val) {
this.auxBars[n].label.setText$S(text);
this.auxBars[n].label.show();
this.auxBars[n].bar.setValue$I(val);
this.auxBars[n].bar.show();
});

Clazz.newMeth(C$, 'useMagnetMove', function () {
var disp = this.dispChooser.getSelectedIndex();
return (disp == C$.DISP_PART_MAG);
});

Clazz.newMeth(C$, 'magneticMoveParticle$com_falstad_Vec3DemoFrame_Particle', function (p) {
var i;
if (this.mstates == null ) {
this.mstates = Clazz.array((I$[109]||(I$[109]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MagnetState))), [3]);
for (i = 0; i != 3; i++) this.mstates[i] = Clazz.new_((I$[109]||(I$[109]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MagnetState))), [this, null]);

}var ms = this.mstates[0];
var mshalf = this.mstates[1];
var oldms = this.mstates[2];
for (i = 0; i != 3; i++) {
ms.pos[i] = p.pos[i];
ms.vel[i] = p.vel[i];
ms.theta = p.theta;
ms.thetav = p.thetav;
ms.phi = p.phi;
ms.phiv = p.phiv;
}
mshalf.copy$com_falstad_Vec3DemoFrame_MagnetState(ms);
oldms.copy$com_falstad_Vec3DemoFrame_MagnetState(ms);
var h = 1;
var minh = 0.01;
var maxh = 1;
var E = 0.1;
var steps = 0;
var adapt = this.curfunc.useAdaptiveRungeKutta() && this.curfunc.useRungeKutta() ;
this.boundCheck = false;
var t = 0;
while (t < 1 ){
this.magnetMove$com_falstad_Vec3DemoFrame_MagnetState$D(ms, h);
if (this.boundCheck) {
p.pos[0] = -100;
return;
}if (this.curfunc.checkBounds$DA$DA(ms.pos, oldms.pos)) {
p.pos[0] = -100;
return;
}if (!adapt) break;
this.magnetMove$com_falstad_Vec3DemoFrame_MagnetState$D(mshalf, h * 0.5);
this.magnetMove$com_falstad_Vec3DemoFrame_MagnetState$D(mshalf, h * 0.5);
var localError = java.lang.Math.abs(ms.pos[0] - mshalf.pos[0]) + java.lang.Math.abs(ms.pos[1] - mshalf.pos[1]) + java.lang.Math.abs(ms.pos[2] - mshalf.pos[2]) + java.lang.Math.abs(ms.theta - mshalf.theta) + java.lang.Math.abs(ms.phi - mshalf.phi) ;
if (localError > 0.1  && h > 0.01  ) {
h *= 0.75;
if (h < 0.01 ) h = 0.01;
ms.copy$com_falstad_Vec3DemoFrame_MagnetState(oldms);
continue;
} else if (localError < 0.05 ) {
h *= 1.25;
if (h > 1.0 ) h = 1.0;
}mshalf.copy$com_falstad_Vec3DemoFrame_MagnetState(ms);
t += h;
steps++;
}
for (i = 0; i != 3; i++) {
p.pos[i] = ms.pos[i];
p.vel[i] = ms.vel[i];
p.theta = ms.theta;
p.thetav = ms.thetav;
p.phi = ms.phi;
p.phiv = ms.phiv;
}
});

Clazz.newMeth(C$, 'magnetMove$com_falstad_Vec3DemoFrame_MagnetState$D', function (ms, stepsize) {
var cosph = java.lang.Math.cos(ms.phi);
var sinph = java.lang.Math.sin(ms.phi);
var costh = java.lang.Math.cos(ms.theta);
var sinth = java.lang.Math.sin(ms.theta);
var thhat = Clazz.array(Double.TYPE, [3]);
var phhat = Clazz.array(Double.TYPE, [3]);
var thhatn = Clazz.array(Double.TYPE, [3]);
var phhatn = Clazz.array(Double.TYPE, [3]);
var force = Clazz.array(Double.TYPE, [3]);
var torque = Clazz.array(Double.TYPE, [3]);
thhat[0] = costh * cosph;
thhat[1] = costh * sinph;
thhat[2] = -sinth;
phhat[0] = -sinph;
phhat[1] = cosph;
phhat[2] = 0;
var i;
for (i = 0; i != 3; i++) {
thhatn[i] = -thhat[i];
phhatn[i] = -phhat[i];
force[i] = torque[i] = 0;
}
this.getMagForce$DA$DA$DA$DA$DA(ms.pos, thhat, phhat, force, torque);
this.getMagForce$DA$DA$DA$DA$DA(ms.pos, phhat, thhatn, force, torque);
this.getMagForce$DA$DA$DA$DA$DA(ms.pos, thhatn, phhatn, force, torque);
this.getMagForce$DA$DA$DA$DA$DA(ms.pos, phhatn, thhat, force, torque);
for (i = 0; i != 3; i++) {
ms.vel[i] += force[i] * stepsize;
ms.pos[i] += ms.vel[i] * stepsize;
}
ms.thetav += this.dot$DA$DA(torque, phhat) * 1000 * stepsize ;
ms.phiv += torque[2] * 1000 * stepsize ;
ms.thetav *= java.lang.Math.exp(-0.2 * stepsize);
ms.phiv *= java.lang.Math.exp(-0.2 * stepsize);
ms.theta += ms.thetav * stepsize;
ms.phi += ms.phiv * stepsize;
});

Clazz.newMeth(C$, 'getMagForce$DA$DA$DA$DA$DA', function (pos, off, j, f, torque) {
var i;
var offs = Clazz.array(Double.TYPE, [3]);
for (i = 0; i != 3; i++) {
offs[i] = off[i] * 0.02;
this.rk_yn[i] = pos[i] + offs[i];
}
this.curfunc.getField$DA$DA(this.rk_k1, this.rk_yn);
var fmult = this.reverse * this.strengthBar.getValue();
for (i = 0; i != 3; i++) this.rk_k1[i] *= fmult;

var newf = Clazz.array(Double.TYPE, [3]);
var newtorque = Clazz.array(Double.TYPE, [3]);
this.cross$DA$DA$DA(newf, j, this.rk_k1);
this.cross$DA$DA$DA(newtorque, offs, newf);
for (i = 0; i != 3; i++) {
f[i] += newf[i];
torque[i] += newtorque[i];
}
});

Clazz.newMeth(C$, 'cross$DA$DA$DA', function (res, v1, v2) {
res[0] = v1[1] * v2[2] - v1[2] * v2[1];
res[1] = v1[2] * v2[0] - v1[0] * v2[2];
res[2] = v1[0] * v2[1] - v1[1] * v2[0];
});

Clazz.newMeth(C$, 'dot$DA$DA', function (v1, v2) {
return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
});

Clazz.newMeth(C$, 'rk$I$D$DA$D', function (order, x, Y, stepsize) {
var i;
if (order == 3) {
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

}});

Clazz.newMeth(C$, 'getForceField$DA$DA$D$D', function (result, y, stepsize, fmult) {
this.curfunc.getField$DA$DA(result, y);
var i;
for (i = 0; i != 3; i++) result[i + 3] = 0.1 * fmult * result[i] ;

for (i = 0; i != 3; i++) result[i] = stepsize * this.timeStep * this.rk_yn[i + 3] ;

});

Clazz.newMeth(C$, 'moveParticle$com_falstad_Vec3DemoFrame_Particle', function (p) {
var disp = this.dispChooser.getSelectedIndex();
if (disp == C$.DISP_PART_MAG) {
this.magneticMoveParticle$com_falstad_Vec3DemoFrame_Particle(p);
return;
}var numIter = 0;
var maxh = 1;
var error = 0.0;
var E = 0.001;
var localError;
var useForce = (disp == C$.DISP_PART_FORCE);
var order = useForce ? 6 : 3;
var Y = this.rk_Y;
var Yhalf = this.rk_Yhalf;
this.oldY = this.rk_oldY;
var i;
for (i = 0; i != 3; i++) this.oldY[i] = Y[i] = Yhalf[i] = p.pos[i];

if (useForce) for (i = 0; i != 3; i++) Y[i + 3] = Yhalf[i + 3] = p.vel[i];

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
for (i = 0; i != 3; i++) {
p.vel[i] += fmult * Yhalf[i];
p.pos[i] += this.timeStep * p.vel[i];
}
} else {
for (i = 0; i != 3; i++) p.pos[i] += fmult * Yhalf[i];

}for (i = 0; i != 3; i++) Y[i] = p.pos[i];

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
if (this.boundCheck && (!useForce || this.curfunc.checkBoundsWithForce() ) ) {
p.pos[0] = -100;
return;
}p.stepsize = h;
for (i = 0; i != 3; i++) p.pos[i] = Y[i];

if (useForce) {
for (i = 0; i != 3; i++) p.vel[i] = Y[i + 3];

}});

Clazz.newMeth(C$, 'dist2$DA$DA', function (a, b) {
var c0 = a[0] - b[0];
var c1 = a[1] - b[1];
var c2 = a[2] - b[2];
return c0 * c0 + c1 * c1 + c2 * c2;
});

Clazz.newMeth(C$, 'lineSegment$com_falstad_Vec3DemoFrame_Particle$I', function (p, dir) {
var numIter = 0;
var maxh = 20;
var error = 0.0;
var E = 0.001;
var localError;
var order = 3;
var Y = this.rk_Y;
var Yhalf = this.rk_Yhalf;
this.oldY = this.rk_oldY;
var i;
var slice = this.sliceChooser.getSelectedIndex();
var sliced = (slice > 0);
slice = slice-(1);
for (i = 0; i != 3; i++) this.oldY[i] = Y[i] = Yhalf[i] = p.pos[i];

var h = p.stepsize;
this.ls_fieldavg[0] = this.ls_fieldavg[1] = this.ls_fieldavg[2] = 0;
var steps = 0;
var minh = 0.1;
var segSize2min = 0.0016;
var segSize2max = 0.0064;
var lastd = 0;
var avgct = 0;
while (true){
this.boundCheck = false;
steps++;
if (steps > 100) {
p.lifetime = -1;
break;
}this.rk$I$D$DA$D(order, 0, Y, dir * h);
this.rk$I$D$DA$D(order, 0, Yhalf, dir * h * 0.5 );
this.rk$I$D$DA$D(order, 0, Yhalf, dir * h * 0.5 );
if (sliced) Y[slice] = Yhalf[slice] = this.sliceval;
if (this.boundCheck) {
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

h /= 2;
if (h < minh ) {
p.lifetime = -1;
break;
}continue;
}if (Y[0] < -1  || Y[0] >= 0.999   || Y[1] < -1   || Y[1] >= 0.999   || Y[2] < -1   || Y[2] >= 0.999  ) {
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

h /= 2;
if (h < minh ) {
p.lifetime = -1;
break;
}continue;
}localError = java.lang.Math.abs(Y[0] - Yhalf[0]) + java.lang.Math.abs(Y[1] - Yhalf[1]) + java.lang.Math.abs(Y[2] - Yhalf[2]) ;
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
break;
}if (d > segSize2max ) {
h /= 2;
if (h < minh ) break;
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

continue;
}this.ls_fieldavg[0] += this.rk_k1[0];
this.ls_fieldavg[1] += this.rk_k1[1];
this.ls_fieldavg[2] += this.rk_k1[2];
avgct++;
if (d > segSize2min ) break;
lastd = d;
for (i = 0; i != order; i++) this.oldY[i] = Yhalf[i] = Y[i];

}
p.stepsize = h;
for (i = 0; i != 3; i++) p.pos[i] = Y[i];

p.phi = java.lang.Math.sqrt(this.ls_fieldavg[0] * this.ls_fieldavg[0] + this.ls_fieldavg[1] * this.ls_fieldavg[1] + this.ls_fieldavg[2] * this.ls_fieldavg[2]) / avgct;
});

Clazz.newMeth(C$, 'getDirectionField$DA$DA$D$D', function (result, y, th, ph) {
var sinth = java.lang.Math.sin(th);
var costh = java.lang.Math.cos(th);
var sinph = java.lang.Math.sin(ph);
var cosph = java.lang.Math.cos(ph);
if (!this.showA) {
if (this.getPot) {
result[0] = -0.4 * (y[0] * sinth * cosph  + y[1] * sinth * sinph  + y[2] * costh);
return;
}result[0] = 3.0E-4 * sinth * cosph ;
result[1] = 3.0E-4 * sinth * sinph ;
result[2] = 3.0E-4 * costh;
} else {
var axis = Clazz.array(Double.TYPE, [3]);
axis[0] = sinth * cosph;
axis[1] = sinth * sinph;
axis[2] = costh;
var d = this.dot$DA$DA(axis, y);
var r = Clazz.array(Double.TYPE, [3]);
var i;
for (i = 0; i != 3; i++) r[i] = 6.0E-4 * (y[i] - axis[i] * d);

this.cross$DA$DA$DA(result, axis, r);
}});
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "AuxBar", function(){
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "EquipPoint", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pos = null;
this.pot = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.pos = Clazz.array(Double.TYPE, [3]);
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_Vec3DemoFrame_EquipPoint$com_falstad_Vec3DemoFrame_EquipPoint', function (a, b) {
C$.$init$.apply(this);
this.pos = Clazz.array(Double.TYPE, [3]);
var i;
for (i = 0; i != 3; i++) this.pos[i] = 0.5 * (a.pos[i] + b.pos[i]);

this.b$['com.falstad.Vec3DemoFrame'].curfunc.getField$DA$DA(this.b$['com.falstad.Vec3DemoFrame'].potfield, this.pos);
this.pot = this.b$['com.falstad.Vec3DemoFrame'].reverse * this.b$['com.falstad.Vec3DemoFrame'].potfield[0];
}, 1);

Clazz.newMeth(C$, 'set$I$I$I$D$D$D', function (cx, cy, cz, x, y, z) {
this.pos[cx] = x;
this.pos[cy] = y;
this.pos[cz] = z;
});

Clazz.newMeth(C$, 'valid', function () {
return !(Double.isNaN(this.pot) || Double.isInfinite(this.pot) );
});

Clazz.newMeth(C$, 'inRange', function () {
return (this.pot >= -2  && this.pot <= 2  );
});

Clazz.newMeth(C$, 'setPot$D', function (p) {
this.pot = p;
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "MagnetState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pos = null;
this.vel = null;
this.theta = null;
this.phi = null;
this.thetav = null;
this.phiv = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.pos = Clazz.array(Double.TYPE, [3]);
this.vel = Clazz.array(Double.TYPE, [3]);
}, 1);

Clazz.newMeth(C$, 'copy$com_falstad_Vec3DemoFrame_MagnetState', function (ms) {
var i;
for (i = 0; i != 3; i++) {
this.pos[i] = ms.pos[i];
this.vel[i] = ms.vel[i];
this.theta = ms.theta;
this.thetav = ms.thetav;
this.phi = ms.phi;
this.phiv = ms.phiv;
}
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "VecFunction", function(){
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

Clazz.newMeth(C$, 'noSplitFieldVectors', function () {
return true;
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, pos) {
return 0;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
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

Clazz.newMeth(C$, 'getBestSlice', function () {
var y = Clazz.array(Double.TYPE, [3]);
var r1 = Clazz.array(Double.TYPE, [3]);
var r2 = Clazz.array(Double.TYPE, [3]);
var r3 = Clazz.array(Double.TYPE, [3]);
y[0] = y[1] = y[2] = 0.9;
this.b$['com.falstad.Vec3DemoFrame'].curfunc.getField$DA$DA(r1, y);
y[0] = 0.91;
this.b$['com.falstad.Vec3DemoFrame'].curfunc.getField$DA$DA(r2, y);
y[0] = 0.9;
y[1] = 0.91;
this.b$['com.falstad.Vec3DemoFrame'].curfunc.getField$DA$DA(r3, y);
if (r1[0] == r2[0]  && r1[1] == r2[1]   && r1[2] == r2[2]  ) return 1;
if (r1[0] == r3[0]  && r1[1] == r3[1]   && r1[2] == r3[2]  ) return 2;
return 3;
});

Clazz.newMeth(C$, 'renderSphere$java_awt_Graphics$D', function (g, sz) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 2);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].drawSphere$java_awt_Graphics$D$Z(g, sz, true);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(0, 0, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
var r = ((this.b$['com.falstad.Vec3DemoFrame'].getScalingFactor$D$D$D(0, 0, 0) * sz)|0);
g.drawOval$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0] - r, this.b$['com.falstad.Vec3DemoFrame'].ypoints[0] - r, r * 2, r * 2);
this.b$['com.falstad.Vec3DemoFrame'].drawSphere$java_awt_Graphics$D$Z(g, sz, false);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseSquaredRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S("point charge", null, "1/r^2 single");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distanceArray$DA(y);
if (r < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -0.1 / r;
return;
}var r3 = r * r * r ;
var q = 3.0E-4 / r3;
result[0] = -y[0] * q;
result[1] = -y[1] * q;
result[2] = -y[2] * q;
});

Clazz.newMeth(C$, 'drawCharge$java_awt_Graphics$D$D$D', function (g, x, y, z) {
this.drawCharge$java_awt_Graphics$D$D$D$I(g, x, y, z, 0);
});

Clazz.newMeth(C$, 'drawCharge$java_awt_Graphics$D$D$D$I', function (g, x, y, z, dir) {
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(x, y, z, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(x, y, z + 0.3 * dir * this.b$['com.falstad.Vec3DemoFrame'].reverse , this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var r = ((this.b$['com.falstad.Vec3DemoFrame'].getScalingFactor$D$D$D(x, y, z) * 0.06)|0);
g.fillOval$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0] - r, this.b$['com.falstad.Vec3DemoFrame'].ypoints[0] - r, r * 2, r * 2);
if (dir != 0) this.b$['com.falstad.Vec3DemoFrame'].drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1], 5);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.drawCharge$java_awt_Graphics$D$D$D(g, 0, 0, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var i;
i = this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(cameraPos, x[0], x[1], x[2], 0.06);
if (i == 0) return 1;
if (i == 1) return -1;
return 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquaredRadialDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseSquaredRadialDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sign2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S("point charge double", null, "1/r^2 double");
});

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var xx1 = y[0] - sep;
var xx2 = y[0] + sep;
var r1 = P$.Vec3DemoFrame.distance3$D$D$D(xx1, y[1], y[2]);
if (r1 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var r2 = P$.Vec3DemoFrame.distance3$D$D$D(xx2, y[1], y[2]);
if (r2 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -0.05 / r1 - 0.05 * this.sign2 / r2;
if (this.sign2 == -1 ) result[0] *= 2;
return;
}var q = 3.0E-4;
var rq1 = q / (r1 * r1 * r1 );
var rq2 = q / (r2 * r2 * r2 ) * this.sign2;
result[0] = -xx1 * rq1 - xx2 * rq2;
result[1] = -y[1] * rq1 - y[1] * rq2;
result[2] = -y[2] * rq1 - y[2] * rq2;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.sign2 = 1;
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Charge Separation", 30);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.drawCharge$java_awt_Graphics$D$D$D(g, +sep, 0, 0);
this.drawCharge$java_awt_Graphics$D$D$D(g, -sep, 0, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
if (this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D$D$D$D(cameraPos, x[0], x[1], x[2], +sep, 0, 0, 0.06) == 0 && this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D$D$D$D(cameraPos, x[0], x[1], x[2], -sep, 0, 0, 0.06) == 0 ) return 1;
return 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction(Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquaredRadialDipole))), [this, null]), null, Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRadial))), [this, null]));
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseSquaredRadialDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadialDouble']);

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
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquaredRadialQuad))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseSquaredRadialQuad", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "quadrupole";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var xx1 = y[0] - sep;
var xx2 = y[0] + sep;
var yy1 = y[1] - sep;
var yy2 = y[1] + sep;
var zz = y[2];
var r1 = P$.Vec3DemoFrame.distance3$D$D$D(xx1, yy1, zz);
var r2 = P$.Vec3DemoFrame.distance3$D$D$D(xx2, yy1, zz);
var r3 = P$.Vec3DemoFrame.distance3$D$D$D(xx1, yy2, zz);
var r4 = P$.Vec3DemoFrame.distance3$D$D$D(xx2, yy2, zz);
if (r1 < 0.06  || r2 < 0.06   || r3 < 0.06   || r4 < 0.06  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 0.05 * (-1 / r1 + 1 / r2 + 1 / r3 - 1 / r4);
return;
}var q = 3.0E-4;
var rq1 = q / (r1 * r1 * r1 );
var rq2 = q / (r2 * r2 * r2 );
var rq3 = q / (r3 * r3 * r3 );
var rq4 = q / (r4 * r4 * r4 );
result[0] = -xx1 * rq1 - xx2 * rq4 + xx2 * rq2 + xx1 * rq3;
result[1] = -yy1 * rq1 - yy2 * rq4 + yy1 * rq2 + yy2 * rq3;
result[2] = -zz * rq1 - zz * rq4 + zz * rq2 + zz * rq3;
});

Clazz.newMeth(C$, 'setup', function () {
C$.superclazz.prototype.setup.apply(this, []);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Charge Separation", 30);
this.b$['com.falstad.Vec3DemoFrame'].setXYViewExact();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var i;
var j;
for (i = -1; i <= 1; i = i+(2)) for (j = -1; j <= 1; j = j+(2)) this.drawCharge$java_awt_Graphics$D$D$D(g, i * sep, j * sep, 0);


this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var i;
var j;
for (i = -1; i <= 1; i = i+(2)) for (j = -1; j <= 1; j = j+(2)) if (this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D$D$D$D(cameraPos, x[0], x[1], x[2], i * sep, j * sep, 0, 0.06) != 0) return 0;


return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRadial))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.lineLen = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S("charged line", null, "1/r single line");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
if (r < 0.01 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 0.4 * java.lang.Math.log(r + 1.0E-20);
return;
}var r2 = r * r;
result[0] = -3.0E-4 * y[0] / r2;
result[1] = -3.0E-4 * y[1] / r2;
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.lineLen = 1;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(0, 0, -this.lineLen, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(0, 0, +this.lineLen, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], 0.01, true) == 0) return 1;
if (this.b$['com.falstad.Vec3DemoFrame'].intersection[2] >= -this.lineLen  && this.b$['com.falstad.Vec3DemoFrame'].intersection[2] <= this.lineLen  ) return 0;
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRadialDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRadialDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

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
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S("line charge double", null, "1/r double lines");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var xx1 = y[0] - sep;
var xx2 = y[0] + sep;
var r1 = P$.Vec3DemoFrame.distance2$D$D(xx1, y[1]);
var r2 = P$.Vec3DemoFrame.distance2$D$D(xx2, y[1]);
if (r1 < 0.01  || r2 < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 0.2 * (java.lang.Math.log(r1 + 1.0E-20) + this.sign * java.lang.Math.log(r2 + 1.0E-20));
return;
}var q = 3.0E-4;
var r1s = 1 / (r1 * r1);
var r2s = 1 / (r2 * r2 * this.sign );
result[0] = q * (-xx1 * r1s - xx2 * r2s);
result[1] = q * (-y[1] * r1s - y[1] * r2s);
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Line Separation", 30);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var i;
for (i = -1; i <= 1; i = i+(2)) {
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, 0, -1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, 0, 1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var i;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
for (i = -1; i <= 1; i = i+(2)) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], i * sep, 0, 0.01, true) != 0) return 0;
}
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction(Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRadialDipole))), [this, null]), null, Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRotational))), [this, null]));
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRadialDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadialDouble']);

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
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRadialQuad))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRadialQuad", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "quad lines";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var xx1 = y[0] + sep;
var xx2 = y[0] - sep;
var yy1 = y[1] + sep;
var yy2 = y[1] - sep;
var r1 = P$.Vec3DemoFrame.distance2$D$D(xx1, yy1);
var r2 = P$.Vec3DemoFrame.distance2$D$D(xx2, yy1);
var r3 = P$.Vec3DemoFrame.distance2$D$D(xx1, yy2);
var r4 = P$.Vec3DemoFrame.distance2$D$D(xx2, yy2);
if (r1 < 0.01  || r2 < 0.01   || r3 < 0.01   || r4 < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 0.2 * (+java.lang.Math.log(r1 + 1.0E-20) - java.lang.Math.log(r2 + 1.0E-20) - java.lang.Math.log(r3 + 1.0E-20)  + java.lang.Math.log(r4 + 1.0E-20));
return;
}var q = 3.0E-4;
result[0] = q * (-xx1 / (r1 * r1) - xx2 / (r4 * r4) + xx2 / (r2 * r2) + xx1 / (r3 * r3));
result[1] = q * (-yy1 / (r1 * r1) - yy2 / (r4 * r4) + yy1 / (r2 * r2) + yy2 / (r3 * r3));
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Line Separation", 30);
this.b$['com.falstad.Vec3DemoFrame'].setXYViewExact();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var i;
var j;
for (i = -1; i <= 1; i = i+(2)) {
for (j = -1; j <= 1; j = j+(2)) {
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, sep * j, -1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, sep * j, 1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
}
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var i;
var j;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
for (i = -1; i <= 1; i = i+(2)) {
for (j = -1; j <= 1; j = j+(2)) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], i * sep, j * sep, 0.01, true) != 0) return 0;
}
}
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FiniteChargedLine))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FiniteChargedLine", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "finite line";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Line Length", 30);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.lineLen = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 101.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[0] = result[1] = result[2] = 0;
this.getLineField$DA$DA$D(result, y, 0);
});

Clazz.newMeth(C$, 'getLineField$DA$DA$D', function (result, y, off) {
var a1 = -this.lineLen - y[2];
var a2 = this.lineLen - y[2];
var r = P$.Vec3DemoFrame.distance2$D$D(y[0] - off, y[1]);
if (r < 0.01  && a1 <= 0   && a2 >= 0  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var y2 = r * r;
var a12 = a1 * a1;
var a22 = a2 * a2;
var a12y2 = java.lang.Math.sqrt(a12 + y2);
var a22y2 = java.lang.Math.sqrt(a22 + y2);
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] -= 0.2 * java.lang.Math.log((a2 + a22y2) / (a1 + a12y2));
return;
}var q = 1.0E-4 / this.lineLen;
var fth = q * (-1 / (a12 + y2 + a1 * a12y2 ) + 1 / (a22 + y2 + a2 * a22y2 ));
result[0] += fth * (y[0] - off);
result[1] += fth * y[1];
result[2] += q * (1 / a12y2 - 1 / a22y2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FiniteChargedLinePair))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FiniteChargedLinePair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.FiniteChargedLine']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dipole = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dipole = 1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "finite line pair";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Line Length", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Line Separation", 30);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.lineLen = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 101.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
result[0] = result[1] = result[2] = 0;
this.getLineField$DA$DA$D(result, y, +sep);
result[0] *= this.dipole;
result[1] *= this.dipole;
result[2] *= this.dipole;
this.getLineField$DA$DA$D(result, y, -sep);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var i;
for (i = -1; i <= 1; i = i+(2)) {
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, 0, -this.lineLen, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, 0, +this.lineLen, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var i;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
for (i = -1; i <= 1; i = i+(2)) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], i * sep, 0, 0.01, true) != 0) if (this.b$['com.falstad.Vec3DemoFrame'].intersection[2] >= -this.lineLen  && this.b$['com.falstad.Vec3DemoFrame'].intersection[2] <= this.lineLen  ) return 0;
}
return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FiniteChargedLineDipole))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FiniteChargedLineDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.FiniteChargedLinePair']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dipole = -1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "finite line dipole";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConductingPlate))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConductingPlate", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.z = null;
this.plate = false;
this.a = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting plate";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.z = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.Complex'))));
this.plate = true;
}, 1);

Clazz.newMeth(C$, 'setupFrame', function () {
this.a = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[2] >= -0.02  && y[2] <= 0.02  ) {
if ((this.plate && y[0] >= -this.a   && y[0] <= this.a  ) || (!this.plate && (y[0] >= this.a  || y[0] <= -this.a  ) ) ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
}this.z.setReIm$D$D(y[0] / this.a, y[2] / this.a);
if (y[2] < 0  && this.plate ) this.z.im = -this.z.im;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
this.z.arcsin();
result[0] = (this.plate) ? this.z.im * 0.6 * this.a  : -this.z.re * 0.6;
return;
}this.z.square();
this.z.multRe$D(-1);
this.z.addRe$D(1);
this.z.pow$D(-0.5);
this.z.multRe$D(1 / this.a);
if (this.plate) {
result[2] = this.z.re * -7.0E-4;
result[0] = this.z.im * -7.0E-4;
if (y[2] < 0 ) result[2] = -result[2];
} else {
result[0] = this.z.re * 7.0E-4;
result[2] = -this.z.im * 7.0E-4;
}result[1] = 0;
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) != 0 ) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersection[0] >= -this.a  && this.b$['com.falstad.Vec3DemoFrame'].intersection[0] <= this.a  ) return 1;
}return 0;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].drawPlane$java_awt_Graphics$D$D$D(g, this.a, 1, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Plate Size", 60);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ChargedPlate))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ChargedPlate", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ConductingPlate']);

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
this.cz = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.Complex'))));
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged plate";
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
return 0.2 * (2 * (a1 - a2) + (b1 - this.cz.im) * y + a2 * java.lang.Math.log(a2 * a2 + y2) - a1 * java.lang.Math.log(a1 * a1 + y2));
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[2] >= -0.01  && y[2] <= 0.01   && (y[0] >= -this.a  && y[0] <= this.a  ) ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var a1 = -this.a - y[0];
var a2 = this.a - y[0];
var y2 = y[2] * y[2];
if (y2 == 0 ) y2 = 1.0E-8;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = this.getPot$D$D$D(a1, a2, y[2]);
return;
}var q = 3.0E-4 / this.a;
result[0] = 0.5 * q * java.lang.Math.log((y2 + a2 * a2) / (y2 + a1 * a1)) ;
result[1] = 0;
result[2] = q * (java.lang.Math.atan(a1 / y[2]) - java.lang.Math.atan(a2 / y[2]));
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ChargedPlatePair))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ChargedPlatePair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ChargedPlate']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged plate pair";
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return false;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
if ((y[2] >= -0.01 + sep  && y[2] <= 0.01 + sep   || y[2] >= -0.01 - sep  && y[2] <= 0.01 - sep   ) && y[0] >= -this.a   && y[0] <= this.a  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var a1 = -this.a - y[0];
var a2 = this.a - y[0];
var y1 = y[2] - sep;
var y12 = y1 * y1;
if (y12 == 0 ) y12 = 1.0E-8;
var y2 = y[2] + sep;
var y22 = y2 * y2;
if (y22 == 0 ) y22 = 1.0E-8;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = this.getPot$D$D$D(a1, a2, y1) - this.getPot$D$D$D(a1, a2, y2);
return;
}var q = 3.0E-4 / this.a;
result[0] = 0.5 * q * (java.lang.Math.log((y12 + a2 * a2) / (y12 + a1 * a1)) - java.lang.Math.log((y22 + a2 * a2) / (y22 + a1 * a1))) ;
result[1] = 0;
result[2] = q * (java.lang.Math.atan(a1 / y1) - java.lang.Math.atan(a2 / y1) - java.lang.Math.atan(a1 / y2)  + java.lang.Math.atan(a2 / y2));
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sheet Size", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Sheet Separation", 33);
this.b$['com.falstad.Vec3DemoFrame'].setXZViewExact();
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
var size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
if (y[0] >= -size  && y[0] <= size  ) {
if (y[2] > sep ) {
if (oldY[2] < sep ) return true;
} else if (y[2] < -sep ) {
if (oldY[2] > -sep ) return true;
} else if (oldY[2] > sep  || oldY[2] < -sep  ) return true;
}return false;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
var size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var i;
for (i = 0; i != 2; i++) {
var s = (i == 0) ? sep : -sep;
this.b$['com.falstad.Vec3DemoFrame'].drawPlane$java_awt_Graphics$D$D$D(g, size, 1, s);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
var size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, +sep, x[0], x[1], x[2]) != 0 ) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersection[0] >= -size  && this.b$['com.falstad.Vec3DemoFrame'].intersection[0] <= size  ) return 0;
}if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, -sep, x[0], x[1], x[2]) != 0 ) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersection[0] >= -size  && this.b$['com.falstad.Vec3DemoFrame'].intersection[0] <= size  ) return 0;
}return 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InfiniteChargedPlane))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InfiniteChargedPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "infinite plane";
});

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var alpha = 3.0E-4;
if (y[2] > -0.01  && y[2] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = java.lang.Math.abs(y[2]) - 1;
return;
}result[0] = 0;
result[1] = 0;
result[2] = (y[2] < 0 ) ? alpha : -alpha;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
this.b$['com.falstad.Vec3DemoFrame'].drawPlane$java_awt_Graphics$D$D$D(g, 1, 1, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) == 0 ) return 0;
return 1;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').SphereAndPointCharge))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "SphereAndPointCharge", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting sphere + pt";
});

Clazz.newMeth(C$, 'getSphereRadius', function () {
return (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 110.0;
});

Clazz.newMeth(C$, 'getSeparation', function () {
return this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
});

Clazz.newMeth(C$, 'getSpherePos', function () {
return this.getSeparation() / 2;
});

Clazz.newMeth(C$, 'getPointPos', function () {
return -this.getSeparation() / 2 - this.getSphereRadius();
});

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sphere Size", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Separation", 50);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "Sphere Potential", 50);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = -3.0E-4;
var a = this.getSphereRadius();
var b = this.getSeparation() + a;
var spos = this.getSpherePos();
var imageQ = -q * a / b;
var imagePos = spos - a * a / b;
var x1 = y[0] - spos;
var r1 = P$.Vec3DemoFrame.distance3$D$D$D(x1, y[1], y[2]);
if (r1 < a ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var sq = (this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() - 50) * 0.002 * a  / 50.0;
var x2 = y[0] - imagePos;
var r2 = P$.Vec3DemoFrame.distance3$D$D$D(x2, y[1], y[2]);
var x3 = y[0] - this.getPointPos();
var r3 = P$.Vec3DemoFrame.distance3$D$D$D(x3, y[1], y[2]);
if (r3 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 400 * (sq / r1 + imageQ / r2 + q / r3);
return;
}var a1 = sq / (r1 * r1 * r1 );
var a2 = imageQ / (r2 * r2 * r2 );
var a3 = q / (r3 * r3 * r3 );
result[0] = x1 * a1 + x2 * a2 + x3 * a3;
result[1] = y[1] * (a1 + a2 + a3 );
result[2] = y[2] * (a1 + a2 + a3 );
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var ic = this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(this.b$['com.falstad.Vec3DemoFrame'].cameraPos, this.getPointPos() - this.getSpherePos(), 0, 0, this.getSphereRadius());
if (ic != 0) this.drawCharge$java_awt_Graphics$D$D$D$I(g, this.getPointPos(), 0, 0, 0);
this.b$['com.falstad.Vec3DemoFrame'].fillSphere$java_awt_Graphics$D$D(g, this.getSphereRadius(), this.getSpherePos());
if (ic == 0) this.drawCharge$java_awt_Graphics$D$D$D$I(g, this.getPointPos(), 0, 0, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D$D$D$D(cameraPos, x[0], x[1], x[2], this.getSpherePos(), 0, 0, this.getSphereRadius()) != 0) return -1;
if (this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D$D$D$D(cameraPos, x[0], x[1], x[2], this.getPointPos(), 0, 0, 0.06) != 0) return -1;
return 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ChargedSphereAndPointCharge))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ChargedSphereAndPointCharge", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.SphereAndPointCharge']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged sphere + pt";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sphere Size", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Separation", 50);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "Sphere Charge", 50);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = -3.0E-4;
var a = this.getSphereRadius();
var b = this.getSeparation() + a;
var spos = this.getSpherePos();
var x1 = y[0] - spos;
var r1 = P$.Vec3DemoFrame.distance3$D$D$D(x1, y[1], y[2]);
if (r1 < a ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var sq = (this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() - 50) * 6.0E-4 / 50.0;
var x3 = y[0] - this.getPointPos();
var r3 = P$.Vec3DemoFrame.distance3$D$D$D(x3, y[1], y[2]);
if (r3 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 300 * (sq / r1 + q / r3);
return;
}var a1 = sq / (r1 * r1 * r1 );
var a3 = q / (r3 * r3 * r3 );
result[0] = x1 * a1 + x3 * a3;
result[1] = y[1] * (a1 + a3);
result[2] = y[2] * (a1 + a3);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CylinderAndLineCharge))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CylinderAndLineCharge", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "cyl + line charge";
});

Clazz.newMeth(C$, 'getCylRadius', function () {
return (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 110.0;
});

Clazz.newMeth(C$, 'getSeparation', function () {
return this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
});

Clazz.newMeth(C$, 'getCylPos', function () {
return this.getSeparation() / 2;
});

Clazz.newMeth(C$, 'getPointPos', function () {
return -this.getSeparation() / 2 - this.getCylRadius();
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Separation", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "Cylinder Potential", 50);
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = -3.0E-4;
var a = this.getCylRadius();
var b = this.getSeparation() + a;
var spos = this.getCylPos();
var imagePos = spos - a * a / b;
var x1 = y[0] - spos;
var r1 = P$.Vec3DemoFrame.distance2$D$D(x1, y[1]);
if (r1 < a ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var x2 = y[0] - imagePos;
var r2 = P$.Vec3DemoFrame.distance2$D$D(x2, y[1]);
var x3 = y[0] - this.getPointPos();
var r3 = P$.Vec3DemoFrame.distance2$D$D(x3, y[1]);
var chargeSize = 0.06;
if (r3 < chargeSize ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var cq = q * (java.lang.Math.exp(b - a) - 1) + (this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() / 50.0 - 1) * a * 6.0E-4 ;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -700 * (cq * java.lang.Math.log(r1 + 1.0E-20) - q * java.lang.Math.log(r2 + 1.0E-20) + q * java.lang.Math.log(r3 + 1.0E-20));
return;
}var a1 = cq / (r1 * r1);
var a2 = -q / (r2 * r2);
var a3 = q / (r3 * r3);
result[0] = x1 * a1 + x2 * a2 + x3 * a3;
result[1] = y[1] * (a1 + a2 + a3 );
result[2] = 0;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var ic = this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$D$D$Z(this.b$['com.falstad.Vec3DemoFrame'].cameraPos, this.getPointPos(), 0, 0, this.getCylPos(), 0, this.getCylRadius(), false);
if (ic == 0) this.b$['com.falstad.Vec3DemoFrame'].fillCylinder$java_awt_Graphics$D$D(g, this.getCylRadius(), this.getCylPos());
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.getPointPos(), 0, -1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.getPointPos(), 0, 1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
if (ic != 0) this.b$['com.falstad.Vec3DemoFrame'].fillCylinder$java_awt_Graphics$D$D(g, this.getCylRadius(), this.getCylPos());
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], this.getPointPos(), 0, 0.01, true) != 0) return -1;
if (this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], this.getCylPos(), 0, this.getCylRadius(), true) != 0) return -1;
return 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').SphereInField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "SphereInField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.conducting = false;
this.showD = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = true;
this.showD = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting sphere in field";
});

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var a3 = a * a * a ;
var r = P$.Vec3DemoFrame.distanceArray$DA(y);
var e1 = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 10.0 + 1;
var dimult = (this.conducting) ? 1 : (e1 - 1) / (e1 + 2);
var fmult = 6.0E-4;
if (r < a ) {
result[0] = result[1] = 0;
if (this.conducting) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
 else {
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) result[0] = -(1 - dimult) * y[2];
 else result[2] = (this.showD) ? e1 * fmult * (1 - dimult)  : fmult * (1 - dimult);
}return;
}var costh = y[2] / r;
var sinth = java.lang.Math.sqrt(1 - costh * costh);
var cosph = y[0] / (r * sinth);
var sinph = y[1] / (r * sinth);
var r_3 = 1 / (r * r * r );
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -(1 - dimult * a3 * r_3 ) * y[2];
return;
}var er = (1 + dimult * 2 * a3 * r_3 ) * costh * fmult ;
var eth = -(1 - dimult * a3 * r_3 ) * sinth * fmult ;
er /= r;
result[0] = y[0] * er + eth * costh * cosph ;
result[1] = y[1] * er + eth * costh * sinph ;
result[2] = y[2] * er - eth * sinth;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sphere Size", 60);
this.b$['com.falstad.Vec3DemoFrame'].setXZViewExact();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.b$['com.falstad.Vec3DemoFrame'].fillSphere$java_awt_Graphics$D$D(g, a, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
return this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(cameraPos, x[0], x[1], x[2], a);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DielectricSphereInFieldE))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DielectricSphereInFieldE", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.SphereInField']);

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
return "dielec sphere in field E";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sphere Size", 60);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Dielectric Strength", 60);
this.b$['com.falstad.Vec3DemoFrame'].setXZViewExact();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.renderSphere$java_awt_Graphics$D(g, a);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
return this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(cameraPos, x[0], x[1], x[2], a);
});

Clazz.newMeth(C$, 'noSplitFieldVectors', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DielectricSphereInFieldD))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DielectricSphereInFieldD", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.DielectricSphereInFieldE']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = false;
this.showD = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dielec sphere in field D";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CylinderInField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CylinderInField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

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
this.a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a2 = this.a * this.a;
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
var e1 = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 10.0 + 1;
var dimult = (this.conducting) ? 1 : (e1 - 1) / (e1 + 1);
var fmult = 6.0E-4;
if (r < this.a ) {
result[0] = result[1] = result[2] = 0;
if (this.conducting) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
 else if (this.b$['com.falstad.Vec3DemoFrame'].getPot) result[0] = -(1 - dimult) * y[0];
 else result[0] = (this.showD) ? e1 * fmult * (1 - dimult)  : fmult * (1 - dimult);
return;
}var costh = y[0] / r;
var sinth = y[1] / r;
var r_2 = 1 / (r * r);
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -(1 - dimult * a2 * r_2 ) * y[0];
return;
}var er = (1 + dimult * a2 * r_2 ) * costh * fmult ;
var eth = -(1 - dimult * a2 * r_2 ) * sinth * fmult ;
er /= r;
result[0] = y[0] * er - eth * sinth;
result[1] = y[1] * er + eth * costh;
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 40);
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].fillCylinder$java_awt_Graphics$D$D(g, this.a, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
return this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], this.a, this.conducting);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DielectricCylinderInFieldE))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DielectricCylinderInFieldE", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CylinderInField']);

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
return "dielec cyl in field E";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Cylinder Size", 40);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Dielectric Strength", 60);
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 2);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].drawCylinder$java_awt_Graphics$D$D$Z(g, this.a, 0, true);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].drawCylinder$java_awt_Graphics$D$D$Z(g, this.a, 0, false);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'noSplitFieldVectors', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DielectricCylinderInFieldD))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DielectricCylinderInFieldD", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.DielectricCylinderInFieldE']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = false;
this.showD = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dielec cyl in field D";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DielectricBoundaryE))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DielectricBoundaryE", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.showD = false;
this.conducting = false;
this.planeZ = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = false;
this.showD = false;
}, 1);

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'getName', function () {
return "dielec boundary E";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Charge Location", 60);
if (!this.conducting) this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Dielectric Strength", 60);
this.b$['com.falstad.Vec3DemoFrame'].setViewMatrix$D$D(0, -1.4922565104551517);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
this.b$['com.falstad.Vec3DemoFrame'].drawPlane$java_awt_Graphics$D$D$D(g, 1, 1, this.planeZ);
var cx = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 50.0 - 1.001;
this.drawCharge$java_awt_Graphics$D$D$D(g, 0, 0, cx);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var cx = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 50.0 - 1.001;
if (this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(cameraPos, x[0], x[1], x[2] - cx, 0.06) == 0 && this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2] - this.planeZ) == 0  ) return 0;
return 1;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var cx = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 50.0 - 1.001;
var r1 = P$.Vec3DemoFrame.distance3$D$D$D(y[0], y[1], y[2] - cx);
if (r1 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var eps1 = 1;
var eps2 = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 10.0 + 1;
if (this.conducting) eps2 = 1.0E8;
if (cx < this.planeZ ) {
eps1 = eps2;
eps2 = 1;
}var q1 = 3.0E-4;
var q2 = -(eps2 - eps1) / (eps2 + eps1) * q1;
var ep = eps1;
if (cx > this.planeZ  && y[2] < this.planeZ   || cx < this.planeZ  && y[2] > this.planeZ   ) {
q1 = 2 * eps2 * q1  / (eps2 + eps1);
q2 = 0;
ep = eps2;
}var r2 = P$.Vec3DemoFrame.distance3$D$D$D(y[0], y[1], y[2] - this.planeZ * 2 + cx);
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -1000 * (q1 / (r1 * ep) + q2 / (r2 * ep));
return;
}if (!this.showD) {
q1 /= ep;
q2 /= ep;
}var rq1 = q1 / (r1 * r1 * r1 );
var rq2 = q2 / (r2 * r2 * r2 );
result[0] = -y[0] * (rq1 + rq2);
result[1] = -y[1] * (rq1 + rq2);
result[2] = -(y[2] - cx) * rq1 - (y[2] - this.planeZ * 2 + cx) * rq2;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').DielectricBoundaryD))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DielectricBoundaryD", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.DielectricBoundaryE']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = false;
this.showD = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "dielec boundary D";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConductingPlane))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConductingPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.DielectricBoundaryE']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.conducting = true;
this.showD = false;
this.planeZ = -1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "conducting plane + pt";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FastChargeEField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "MovingChargeField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "moving charge";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var rz = P$.Vec3DemoFrame.distanceArray$DA(y);
if (this.b$['com.falstad.Vec3DemoFrame'].showA) {
result[0] = result[1] = 0;
result[2] = 3.0E-4 / rz;
} else {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
if (rz < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.b$['com.falstad.Vec3DemoFrame'].rotateParticle$DA$DA$D(result, y, 1.0E-4 / (rz * rz * rz ));
}});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.drawCharge$java_awt_Graphics$D$D$D$I(g, 0, 0, 0, 1);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction(null, Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FastChargeField))), [this, null]), null);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FastChargeEField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.MovingChargeField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "fast charge";
});

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var rz = P$.Vec3DemoFrame.distanceArray$DA(y);
if (rz < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
var sinth = r / rz;
var beta = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 102.0;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -0.1 / (rz * java.lang.Math.pow(1 - beta * beta * sinth * sinth , 0.5));
return;
}var b = -1.0E-4 * (1 - beta * beta) / (rz * rz * rz * java.lang.Math.pow(1 - beta * beta * sinth * sinth , 1.5) );
result[0] = b * y[0];
result[1] = b * y[1];
result[2] = b * y[2];
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Speed/C", 60);
C$.superclazz.prototype.setup.apply(this, []);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ChargedRing))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "SlottedPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.z = null;
this.z2 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "slotted conducting plane";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.z = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.Complex'))));
this.z2 = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.Complex'))));
}, 1);

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 101.0;
if (y[2] >= -0.01  && y[2] <= 0.01   && (y[0] < -a  || y[0] > a  ) ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.z.setReIm$D$D(y[0], y[2]);
this.z2.set$com_falstad_Complex(this.z);
this.z2.square();
this.z2.addRe$D(-a * a);
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
this.z2.pow$D(0.5);
if (this.z2.im < 0 ) this.z2.multRe$D(-1);
this.z2.add$com_falstad_Complex(this.z);
result[0] = -this.z2.im * 0.6;
return;
}this.z2.pow$D(-0.5);
if (this.z2.im > 0 ) this.z2.multRe$D(-1);
this.z2.mult$com_falstad_Complex(this.z);
result[2] = (1 + this.z2.re) * 0.003;
result[0] = (this.z2.im) * 0.003;
result[1] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Slot Size", 60);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) != 0 ) {
var a = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 101.0;
if (this.b$['com.falstad.Vec3DemoFrame'].intersection[0] < -a  || this.b$['com.falstad.Vec3DemoFrame'].intersection[0] > a  ) return 1;
}return 0;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var a = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 101.0;
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-1, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-a, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-a, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-1, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
g.fillPolygon$IA$IA$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 4);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(1, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(a, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(a, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(1, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
g.fillPolygon$IA$IA$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 4);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[33]||(I$[33]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').PlanePair))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "PlanePair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ConductingPlate']);

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
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Gap Size", 20);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) != 0 ) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersection[0] < -this.a  || this.b$['com.falstad.Vec3DemoFrame'].intersection[0] > this.a  ) return 1;
}return 0;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-1, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-this.a, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-this.a, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-1, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
g.fillPolygon$IA$IA$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 4);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(1, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.a, -1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.a, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(1, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
g.fillPolygon$IA$IA$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 4);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S(null, "current line", "1/r rotational");
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYViewExact();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
if (this.b$['com.falstad.Vec3DemoFrame'].showA) {
result[0] = result[1] = 0;
result[2] = -0.001 * (java.lang.Math.log(r) - 0.5);
} else {
if (r < 0.02 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.b$['com.falstad.Vec3DemoFrame'].rotateParticle$DA$DA$D(result, y, 1.0E-4 / (r * r));
}});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(0, 0, -1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(0, 0, 1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1], 12, true, 1);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[34]||(I$[34]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRotationalDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRotationalDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadialDouble']);

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
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S(null, "current line double", "1/r rotational double");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var r = P$.Vec3DemoFrame.distance2$D$D(y[0] - sep, y[1]);
var r2 = P$.Vec3DemoFrame.distance2$D$D(y[0] + sep, y[1]);
if (this.ext) {
var p = this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() * 3.141592653589793 / 50.0;
var s = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 30.0;
this.b$['com.falstad.Vec3DemoFrame'].getDirectionField$DA$DA$D$D(result, y, 1.5707963267948966, p);
result[0] *= s;
result[1] *= s;
result[2] *= s;
} else result[0] = result[1] = result[2] = 0;
if (this.b$['com.falstad.Vec3DemoFrame'].showA) {
if (this.dir2 == 1) result[2] += -0.001 * (java.lang.Math.log(r) + java.lang.Math.log(r2) - 1);
 else result[2] += -0.001 * (java.lang.Math.log(r) - java.lang.Math.log(r2));
} else {
if (r < 0.02 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.b$['com.falstad.Vec3DemoFrame'].rotateParticleAdd$DA$DA$D$D$D(result, y, 1.0E-4 / (r * r), sep, 0);
if (r2 < 0.02 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.b$['com.falstad.Vec3DemoFrame'].rotateParticleAdd$DA$DA$D$D$D(result, y, this.dir2 * 1.0E-4 / (r2 * r2), -sep, 0);
}});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Line Separation", 30);
if (this.ext) {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Ext. Strength", 28);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "Ext. Direction", 0);
}this.b$['com.falstad.Vec3DemoFrame'].setXYViewExact();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var i;
for (i = -1; i <= 1; i = i+(2)) {
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, 0, -1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(sep * i, 0, 1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
var dir = (i == -1) ? this.dir2 : 1;
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1], 12, true, dir);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[35]||(I$[35]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRotationalDoubleExt))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRotationalDoubleExt", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRotationalDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.ext = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S(null, "cur line double + ext", "1/r rot double + ext");
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRotationalDipole))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRotationalDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRotationalDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dir2 = -1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S(null, "current line dipole", "1/r rotational dipole");
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[37]||(I$[37]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseRotationalDipoleExt))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseRotationalDipoleExt", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRotationalDouble']);

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
this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.setValue$I(17);
this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.setValue$I(25);
});

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S(null, "cur line dipole + ext", "1/r rot dipole + ext");
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[38]||(I$[38]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').OneDirectionFunction))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "OneDirectionFunction", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$S$S$S(null, "uniform field", "one direction");
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var th = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() * 3.141592653589793 / 50.0;
var ph = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() * 3.141592653589793 / 50.0;
this.b$['com.falstad.Vec3DemoFrame'].getDirectionField$DA$DA$D$D(result, y, th, ph);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Theta", 25);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Phi", 0);
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction(null, Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MovingChargeField))), [this, null]), Clazz.new_((I$[40]||(I$[40]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquaredRadialSphere))), [this, null]));
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FastChargeField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.MovingChargeField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "fast charge";
});

Clazz.newMeth(C$, 'getFieldStrength$DA', function (y) {
var rz = P$.Vec3DemoFrame.distanceArray$DA(y);
if (rz < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
var sinth = r / rz;
var beta = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 102.0;
var b = 0.001 * (1 - beta * beta) * beta  / (rz * rz * java.lang.Math.pow(1 - beta * beta * sinth * sinth , 1.5) );
return b;
});

Clazz.newMeth(C$, 'setup', function () {
C$.superclazz.prototype.setup.apply(this, []);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Speed/C", 60);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.drawCharge$java_awt_Graphics$D$D$D$I(g, 0, 0, 0, this.b$['com.falstad.Vec3DemoFrame'].reverse);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (this.b$['com.falstad.Vec3DemoFrame'].showA) {
var rz = P$.Vec3DemoFrame.distanceArray$DA(y);
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
var sinth = r / rz;
var beta = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 102.0;
result[0] = result[1] = 0;
result[2] = 0.003 * beta / (rz * java.lang.Math.pow(1 - beta * beta * sinth * sinth , 0.5));
} else this.b$['com.falstad.Vec3DemoFrame'].rotateParticle$DA$DA$D(result, y, this.getFieldStrength$DA(y));
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[41]||(I$[41]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MovingChargeFieldDouble))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "MovingChargeFieldDouble", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadialDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dir2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "moving charge double";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dir2 = 1;
}, 1);

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[0] = result[1] = result[2] = 0;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var rz1 = P$.Vec3DemoFrame.distance3$D$D$D(y[0] - sep, y[1], y[2]);
var rz2 = P$.Vec3DemoFrame.distance3$D$D$D(y[0] + sep, y[1], y[2]);
if (this.b$['com.falstad.Vec3DemoFrame'].showA) {
result[0] = result[1] = 0;
result[2] = 3.0E-4 * (1 / rz1 + this.dir2 / rz2);
} else {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0] - sep, y[1]);
if (rz1 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.b$['com.falstad.Vec3DemoFrame'].rotateParticleAdd$DA$DA$D$D$D(result, y, 1.0E-4 / (rz1 * rz1 * rz1 ), sep, 0);
if (rz2 < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
r = P$.Vec3DemoFrame.distance2$D$D(y[0] + sep, y[1]);
this.b$['com.falstad.Vec3DemoFrame'].rotateParticleAdd$DA$DA$D$D$D(result, y, this.dir2 * 1.0E-4 / (rz2 * rz2 * rz2 ), -sep, 0);
}});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Charge Separation", 30);
C$.superclazz.prototype.setup.apply(this, []);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.drawCharge$java_awt_Graphics$D$D$D$I(g, +sep, 0, 0, 1);
this.drawCharge$java_awt_Graphics$D$D$D$I(g, -sep, 0, 0, this.dir2);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MovingChargeDipole))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "MovingChargeDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.MovingChargeFieldDouble']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.dir2 = -1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "moving charge dipole";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CurrentLoopField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CurrentLoopField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.colors = null;
this.useColor = false;
this.size = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.useColor = true;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "current loop";
});

Clazz.newMeth(C$, 'useAdaptiveRungeKutta', function () {
return false;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Loop Size", 40);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
this.getLoopField$DA$DA$D$D$I$D(result, y, 0, 0, 1, this.size);
});

Clazz.newMeth(C$, 'getLoopField$DA$DA$D$D$I$D', function (result, y, xoff, zoff, dir, size) {
var xx = y[0] - xoff;
var yy = y[1];
var zz = y[2] - zoff;
var i;
result[0] = result[1] = result[2] = 0;
var ct = 8;
var q = 6.0E-4 * dir / (size * ct);
var ang0 = java.lang.Math.atan2(y[1], y[0]);
for (i = 0; i != ct; i++) {
var ang = 3.141592653589793 * 2 * i  / ct;
var jxx = size * java.lang.Math.cos(ang + ang0);
var jyy = size * java.lang.Math.sin(ang + ang0);
var lxx = -jyy * q;
var lyy = jxx * q;
var rx = xx - jxx;
var ry = yy - jyy;
var rz = zz;
var r = java.lang.Math.sqrt(rx * rx + ry * ry + rz * rz);
if (!this.b$['com.falstad.Vec3DemoFrame'].showA) {
var r3 = r * r * r ;
if (r < 0.04  && this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove() ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var cx = lyy * rz / r3;
var cy = -lxx * rz / r3;
var cz = (lxx * ry - lyy * rx) / r3;
result[0] += cx;
result[1] += cy;
result[2] += cz;
} else {
result[0] += 6 * lxx / r;
result[1] += 6 * lyy / r;
}}
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
if (!this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove()) return false;
if ((y[2] > 0  && oldY[2] < 0  ) || (y[2] < 0  && oldY[2] > 0  ) ) {
var r = java.lang.Math.sqrt(y[0] * y[0] + y[1] * y[1]);
if (r < this.size ) return true;
}return false;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
this.renderLoop$java_awt_Graphics$D$D$I$D(g, 0, 0, 1, this.size);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'renderLoop$java_awt_Graphics$D$D$I$D', function (g, xoff, zoff, dir, size) {
var loopSegments = 72;
var i;
if (!this.useColor) g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
for (i = 0; i != 72; i++) {
var ang1 = 3.141592653589793 * 2 * i  / 72;
var ang2 = 3.141592653589793 * 2 * (i + dir)  / 72;
var jxx1 = size * java.lang.Math.cos(ang1) + xoff;
var jyy1 = size * java.lang.Math.sin(ang1);
var jxx2 = size * java.lang.Math.cos(ang2) + xoff;
var jyy2 = size * java.lang.Math.sin(ang2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(jxx1, jyy1, zoff, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(jxx2, jyy2, zoff, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
if (this.useColor) g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].getCurrentColor$I(i * dir));
if (i == 0 && this.useColor ) this.b$['com.falstad.Vec3DemoFrame'].drawCurrentArrow$java_awt_Graphics$I$I$I$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
 else g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
}
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) != 0 ) return 1;
return 0;
});

Clazz.newMeth(C$, 'noSplitFieldVectors', function () {
return false;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return P$.Vec3DemoFrame.BUILD_CASE_EMV$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction$com_falstad_Vec3DemoFrame_VecFunction(null, Clazz.new_((I$[44]||(I$[44]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CurrentLoopsSideField))), [this, null]), null);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CurrentLoopsSideField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CurrentLoopField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dir2 = 0;
this.offx = 0;
this.offz = 0;
this.$size = 0;
this.tres1 = null;
this.tres2 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "loop pair";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.tres1 = Clazz.array(Double.TYPE, [3]);
this.tres2 = Clazz.array(Double.TYPE, [3]);
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Loop Size", 40);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Loop Separation", 10);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "Offset", 0);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.$size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
var sep2 = this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() / 100.0;
this.offx = sep * (1 - this.$size) + this.$size;
this.offz = sep2;
this.dir2 = 1;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
this.getLoopField$DA$DA$D$D$I$D(this.tres1, y, +this.offx, +this.offz, 1, this.$size);
this.getLoopField$DA$DA$D$D$I$D(this.tres2, y, -this.offx, -this.offz, this.dir2, this.$size);
var i;
for (i = 0; i != 3; i++) result[i] = this.tres1[i] + this.tres2[i];

});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
this.renderLoop$java_awt_Graphics$D$D$I$D(g, +this.offx, +this.offz, 1, this.$size);
this.renderLoop$java_awt_Graphics$D$D$I$D(g, -this.offx, -this.offz, this.dir2, this.$size);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
if (!this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove()) return false;
if ((y[2] > this.offz  && oldY[2] < this.offz  ) || (y[2] < this.offz  && oldY[2] > this.offz  ) ) {
var x = y[0] - this.offx;
var r = java.lang.Math.sqrt(x * x + y[1] * y[1]);
if (r < this.$size ) return true;
}if ((y[2] > -this.offz  && oldY[2] < -this.offz  ) || (y[2] < -this.offz  && oldY[2] > -this.offz  ) ) {
var x = y[0] + this.offx;
var r = java.lang.Math.sqrt(x * x + y[1] * y[1]);
if (r < this.$size ) return true;
}return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[45]||(I$[45]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CurrentLoopsSideOppField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CurrentLoopsSideOppField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CurrentLoopsSideField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "loop pair opposing";
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.$size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
var sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
var sep2 = this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() / 100.0;
this.offx = sep * (1 - this.$size) + this.$size;
this.offz = sep2;
this.dir2 = -1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[46]||(I$[46]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CurrentLoopsStackedField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CurrentLoopsStackedField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CurrentLoopsSideField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "loop pair stacked";
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.$size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
var sep = (this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() + 1) / 100.0;
var sep2 = this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() / 100.0;
this.offx = sep2;
this.offz = sep;
this.dir2 = 1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[47]||(I$[47]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CurrentLoopsStackedOppField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CurrentLoopsStackedOppField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CurrentLoopsSideField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "loop pair stacked, opp.";
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.$size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
var sep = (this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() + 1) / 100.0;
var sep2 = this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() / 100.0;
this.offx = sep2;
this.offz = sep;
this.dir2 = -1;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[48]||(I$[48]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CurrentLoopsOpposingConcentric))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CurrentLoopsOpposingConcentric", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CurrentLoopField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.dir2 = 0;
this.tres1 = null;
this.tres2 = null;
this.size2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "concentric loops";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.tres1 = Clazz.array(Double.TYPE, [3]);
this.tres2 = Clazz.array(Double.TYPE, [3]);
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Outer Loop Size", 75);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Inner Loop Size", 50);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 101.0;
this.size2 = this.size * (this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() + 1) / 101.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
this.getLoopField$DA$DA$D$D$I$D(this.tres1, y, 0, 0, 1, this.size);
this.getLoopField$DA$DA$D$D$I$D(this.tres2, y, 0, 0, -1, this.size2);
var mult = this.size2 / this.size;
var i;
for (i = 0; i != 3; i++) result[i] = this.tres1[i] + mult * this.tres2[i];

});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
this.renderLoop$java_awt_Graphics$D$D$I$D(g, 0, 0, 1, this.size);
this.renderLoop$java_awt_Graphics$D$D$I$D(g, 0, 0, -1, this.size2);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[49]||(I$[49]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').SolenoidField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ChargedRing", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.CurrentLoopField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.useColor = false;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged ring";
});

Clazz.newMeth(C$, 'getBestSlice', function () {
return 2;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
this.getLoopField$DA$DA$D(result, y, 0);
});

Clazz.newMeth(C$, 'getLoopField$DA$DA$D', function (result, y, zoff) {
var xx = y[0];
var yy = y[1];
var zz = y[2] + zoff;
var i;
result[0] = result[1] = result[2] = 0;
var size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var ct = 8;
var q = (this.b$['com.falstad.Vec3DemoFrame'].getPot) ? 0.2 / ct : -6.0E-4 / ct;
var ang0 = java.lang.Math.atan2(y[1], y[0]);
for (i = 0; i != ct; i++) {
var ang = 3.141592653589793 * 2 * i  / ct;
var jxx = size * java.lang.Math.cos(ang + ang0);
var jyy = size * java.lang.Math.sin(ang + ang0);
var rx = xx - jxx;
var ry = yy - jyy;
var rz = zz;
var r = java.lang.Math.sqrt(rx * rx + ry * ry + rz * rz);
if (r < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var r3 = r * r * r ;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] += -q / r;
} else {
result[0] += q * rx / r3;
result[1] += q * ry / r3;
result[2] += q * rz / r3;
}}
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Ring Size", 40);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[50]||(I$[50]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ChargedRingPair))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ChargedRingPair", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ChargedRing']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sep = 0;
this.r2 = 0;
this.tres1 = null;
this.tres2 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged ring pair";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.tres1 = Clazz.array(Double.TYPE, [3]);
this.tres2 = Clazz.array(Double.TYPE, [3]);
this.r2 = 1;
}, 1);

Clazz.newMeth(C$, 'setupFrame', function () {
this.sep = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
this.getLoopField$DA$DA$D(this.tres1, y, -this.sep);
this.getLoopField$DA$DA$D(this.tres2, y, this.sep);
var i;
for (i = 0; i != 3; i++) result[i] = this.tres1[i] + this.r2 * this.tres2[i];

});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
var size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.renderLoop$java_awt_Graphics$D$D$I$D(g, 0, -this.sep, 1, size);
this.renderLoop$java_awt_Graphics$D$D$I$D(g, 0, this.sep, 1, size);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Ring Size", 40);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Ring Separation", 40);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[51]||(I$[51]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ChargedRingDipole))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ChargedRingDipole", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ChargedRingPair']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "charged ring dipole";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.r2 = -1;
}, 1);

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').SlottedPlane))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "SolenoidField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.height = 0;
this.size = 0;
this.turns = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "solenoid";
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return false;
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 100.0;
this.turns = ((this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue()/4|0)) + 1;
this.height = (this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() + 1) / 25.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var i;
var j;
var n;
result[0] = result[1] = result[2] = 0;
var angct = 8;
if (this.turns == 0) return;
if (this.turns < 9) angct = (80/this.turns|0);
var ang0 = java.lang.Math.atan2(y[1], y[0]);
var zcoilstep = this.height / this.turns;
var zangstep = zcoilstep / angct;
var zbase = -this.height / 2;
var q = 0.003 / (this.turns * angct);
var lzz = q * zangstep;
if (ang0 < 0 ) ang0 += 6.283185307179586;
if (ang0 < 0 ) System.out.print$S("-ang0?? " + new Double(ang0).toString() + "\n" );
ang0 %= zangstep;
zbase += zcoilstep * ang0 / 6.283185307179586;
for (i = 0; i != angct; i++) {
var ang = 3.141592653589793 * 2 * i  / angct;
var jxx = this.size * java.lang.Math.cos(ang + ang0);
var jyy = this.size * java.lang.Math.sin(ang + ang0);
var jzz = zbase + zangstep * i;
var lxx = -jyy * q;
var lyy = jxx * q;
var rx = y[0] - jxx;
var ry = y[1] - jyy;
var rx2ry2 = rx * rx + ry * ry;
for (j = 0; j != this.turns; j++) {
var rz = y[2] - jzz;
var r = java.lang.Math.sqrt(rx2ry2 + rz * rz);
if (!this.b$['com.falstad.Vec3DemoFrame'].showA) {
if (r < 0.04  && this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove() ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var r3 = r * r * r ;
var cx = (lyy * rz - lzz * ry) / r3;
var cy = (lzz * rx - lxx * rz) / r3;
var cz = (lxx * ry - lyy * rx) / r3;
result[0] += cx;
result[1] += cy;
result[2] += cz;
} else {
result[0] += 6 * lxx / r;
result[1] += 6 * lyy / r;
result[2] += 6 * lzz / r;
}jzz += zcoilstep;
}
}
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Diameter", 40);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Height", 30);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "# of Turns", 36);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
return this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], 2, false);
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
if (!this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove()) return false;
var height2 = this.height * 2;
var r = java.lang.Math.sqrt(y[0] * y[0] + y[1] * y[1]);
var or = java.lang.Math.sqrt(oldY[0] * oldY[0] + oldY[1] * oldY[1]);
if (y[2] < height2  && y[2] > -height2  ) {
if ((r < this.size  && or > this.size  ) || (or < this.size  && r > this.size  ) ) return true;
}if ((y[2] > 0  && oldY[2] < 0  ) || (y[2] < 0  && oldY[2] > 0  ) ) {
if (r < this.size ) return true;
}return false;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 2);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var i;
var j;
var angct = 48;
if (this.turns < 10) angct = (480/this.turns|0);
var zcoilstep = this.height / this.turns;
var zangstep = zcoilstep / angct;
var zbase = -this.height / 2;
for (i = 0; i != angct; i++) {
var ang1 = 3.141592653589793 * 2 * i  / angct;
var ang2 = 3.141592653589793 * 2 * (i + 1)  / angct;
var jxx1 = this.size * java.lang.Math.cos(ang1);
var jyy1 = this.size * java.lang.Math.sin(ang1);
var jxx2 = this.size * java.lang.Math.cos(ang2);
var jyy2 = this.size * java.lang.Math.sin(ang2);
var jzz1 = zbase + zangstep * i;
for (j = 0; j != this.turns; j++) {
var jzz2 = jzz1 + zangstep;
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(jxx1, jyy1, jzz1, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(jxx2, jyy2, jzz2, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].getCurrentColor$I(j * angct + i));
if (i == 0 && j == (this.turns/2|0) ) this.b$['com.falstad.Vec3DemoFrame'].drawCurrentArrow$java_awt_Graphics$I$I$I$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
 else g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
jzz1 += zcoilstep;
}
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[53]||(I$[53]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ToroidalSolenoidField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ToroidalSolenoidField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.size1 = 0;
this.size2 = 0;
this.q = 0;
this.turns = 0;
this.angct = 0;
this.turnmult = 0;
this.costab1 = null;
this.sintab1 = null;
this.costab2 = null;
this.sintab2 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.angct = 8;
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.turnmult = 1;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "toroidal solenoid";
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return false;
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.size1 = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.size2 = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() * this.size1 / 100.0;
this.turns = (this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue()/3|0) + 6;
this.q = 3.0E-4 / (this.angct * this.turns);
this.costab1 = Clazz.array(Double.TYPE, [this.angct]);
this.sintab1 = Clazz.array(Double.TYPE, [this.angct]);
this.costab2 = Clazz.array(Double.TYPE, [this.angct, this.turns]);
this.sintab2 = Clazz.array(Double.TYPE, [this.angct, this.turns]);
var i;
var j;
for (i = 0; i != this.angct; i++) {
var ang = 3.141592653589793 * 2 * i  / this.angct;
this.costab1[i] = java.lang.Math.cos(ang);
this.sintab1[i] = java.lang.Math.sin(ang);
for (j = 0; j != this.turns; j++) {
var ang2 = (3.141592653589793 * 2 * j  + ang) / (this.turnmult * this.turns);
this.costab2[i][j] = java.lang.Math.cos(ang2);
this.sintab2[i][j] = java.lang.Math.sin(ang2);
}
}
});

Clazz.newMeth(C$, 'finishFrame', function () {
this.costab1 = this.sintab1 = null;
this.costab2 = this.sintab2 = null;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Center Radius", 60);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Outer Radius", 80);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "# of turns", 18);
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var i;
var j;
var n;
result[0] = result[1] = result[2] = 0;
for (i = 0; i != this.angct; i++) {
var cosp = this.costab1[i];
var sinp = this.sintab1[i];
var jzz = this.size2 * sinp;
var lzz = this.q * this.turns * this.size2 * cosp ;
var rz = y[2] - jzz;
for (j = 0; j != this.turns; j++) {
var cosa = this.costab2[i][j];
var sina = this.sintab2[i][j];
var jxx = cosa * (this.size1 + this.size2 * cosp);
var jyy = sina * (this.size1 + this.size2 * cosp);
var lxx = this.q * (-(this.size1 + this.size2 * cosp) * sina - this.turns * this.size2 * cosa * sinp );
var lyy = this.q * ((this.size1 + this.size2 * cosp) * cosa - this.turns * this.size2 * sina * sinp );
var rx = y[0] - jxx;
var ry = y[1] - jyy;
var r = P$.Vec3DemoFrame.distance3$D$D$D(rx, ry, rz);
if (!this.b$['com.falstad.Vec3DemoFrame'].showA) {
var r3 = r * r * r ;
if (r < 0.04  && this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove() ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var cx = (lyy * rz - lzz * ry) / r3;
var cy = (lzz * rx - lxx * rz) / r3;
var cz = (lxx * ry - lyy * rx) / r3;
result[0] += cx;
result[1] += cy;
result[2] += cz;
} else {
result[0] += 6 * lxx / r;
result[1] += 6 * lyy / r;
result[2] += 6 * lzz / r;
}}
}
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
return this.b$['com.falstad.Vec3DemoFrame'].intersectCylinder$DA$D$D$D$D$Z(cameraPos, x[0], x[1], x[2], 2, false);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 2);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var jzz;
var i;
var steps = this.turns * 48;
for (i = 0; i != steps; i++) {
this.getToroidPoint$IA$IA$D$D$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, this.size1, this.size2, this.turns, i, 0);
this.getToroidPoint$IA$IA$D$D$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, this.size1, this.size2, this.turns, i + 1, 1);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].getCurrentColor$I(i));
if (i == 50) this.b$['com.falstad.Vec3DemoFrame'].drawArrow$java_awt_Graphics$S$I$I$I$I$I(g, null, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1], 7);
 else g.drawLine$I$I$I$I(this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1]);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getToroidPoint$IA$IA$D$D$I$I$I', function (xpoints, ypoints, size1, size2, turns, i, n) {
var angct = 48;
var ang = 3.141592653589793 * 2 * (i % angct)  / angct;
var cosp = java.lang.Math.cos(ang);
var sinp = java.lang.Math.sin(ang);
var ang2 = (3.141592653589793 * 2 * ((i/angct|0))  + ang) / (turns * this.turnmult);
var cosa = java.lang.Math.cos(ang2);
var sina = java.lang.Math.sin(ang2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(cosa * (size1 + size2 * cosp), sina * (size1 + size2 * cosp), size2 * sinp, xpoints, ypoints, n);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[54]||(I$[54]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').HorseshoeElectromagnetField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "HorseshoeElectromagnetField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ToroidalSolenoidField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.turnmult = 2;
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "horseshoe electromagnet";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Center Radius", 40);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Outer Radius", 50);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "# of turns", 18);
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').SquareLoopField))), [this, null]);
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "SquareLoopField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.lstart = 0;
this.lstop = 0;
this.size = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "square loop";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Loop Size", 60);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.lstart = -this.size;
this.lstop = this.size;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
this.getLoopField$DA$DA$D$I(result, y, 0, 1);
});

Clazz.newMeth(C$, 'getLineField$DA$DA$D$D$I$I$I$I', function (result, y, offo, offt, lcoord, ocoord, tcoord, dir) {
var a1 = this.lstart - y[lcoord];
var a2 = this.lstop - y[lcoord];
var r = P$.Vec3DemoFrame.distance2$D$D(y[ocoord] - offo, y[tcoord] - offt);
if (r < 0.01  && a1 <= 0   && a2 >= 0  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var y2 = r * r;
var a12 = a1 * a1;
var a22 = a2 * a2;
var a12y2 = java.lang.Math.sqrt(a12 + y2);
var a22y2 = java.lang.Math.sqrt(a22 + y2);
if (this.b$['com.falstad.Vec3DemoFrame'].showA) {
if (lcoord < ocoord) dir = -dir;
result[lcoord] += dir * 3.0E-4 * java.lang.Math.log((a2 + a22y2) / (a1 + a12y2))  / this.size;
return;
}var q = dir * 1.0E-4 / this.size;
var fth = q * (-1 / (a12 + y2 + a1 * a12y2 ) + 1 / (a22 + y2 + a2 * a22y2 ));
result[tcoord] += fth * (y[ocoord] - offo);
result[ocoord] -= fth * (y[tcoord] - offt);
});

Clazz.newMeth(C$, 'getLoopField$DA$DA$D$I', function (result, y, zoff, dir) {
result[0] = result[1] = result[2] = 0;
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, this.size, zoff, 0, 1, 2, dir);
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, -this.size, zoff, 0, 1, 2, -dir);
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, this.size, zoff, 1, 0, 2, dir);
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, -this.size, zoff, 1, 0, 2, -dir);
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
if (!this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove()) return false;
if ((y[2] > 0  && oldY[2] < 0  ) || (y[2] < 0  && oldY[2] > 0  ) ) {
if (y[0] < this.size  && y[1] < this.size   && y[0] > -this.size   && y[1] > -this.size  ) return true;
}return false;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-this.size, -this.size, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+this.size, -this.size, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+this.size, +this.size, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-this.size, +this.size, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
var i;
for (i = 0; i != 4; i++) {
var j = (i + 1) & 3;
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[i], this.b$['com.falstad.Vec3DemoFrame'].ypoints[i], this.b$['com.falstad.Vec3DemoFrame'].xpoints[j], this.b$['com.falstad.Vec3DemoFrame'].ypoints[j], 8, i == 0, 1);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) == 0 ) return 1;
return 0;
});

Clazz.newMeth(C$, 'noSplitFieldVectors', function () {
return false;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[56]||(I$[56]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').RectLoopField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "RectLoopField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.SquareLoopField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.sizeX = 0;
this.sizeY = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "rectangular loop";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Loop Width", 60);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Loop Depth", 40);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.sizeX = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0 + 0.01;
this.sizeY = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0 + 0.01;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[0] = result[1] = result[2] = 0;
this.lstart = -this.sizeX;
this.lstop = this.sizeX;
this.size = this.sizeY;
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, this.sizeY, 0, 0, 1, 2, 1);
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, -this.sizeY, 0, 0, 1, 2, -1);
this.lstart = -this.sizeY;
this.lstop = this.sizeY;
this.size = this.sizeX;
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, this.sizeX, 0, 1, 0, 2, 1);
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, -this.sizeX, 0, 1, 0, 2, -1);
});

Clazz.newMeth(C$, 'checkBounds$DA$DA', function (y, oldY) {
if (!this.b$['com.falstad.Vec3DemoFrame'].useMagnetMove()) return false;
if ((y[2] > 0  && oldY[2] < 0  ) || (y[2] < 0  && oldY[2] > 0  ) ) {
if (y[0] < this.sizeX  && y[1] < this.sizeY   && y[0] > -this.sizeX   && y[1] > -this.sizeY  ) return true;
}return false;
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-this.sizeX, -this.sizeY, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+this.sizeX, -this.sizeY, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+this.sizeX, +this.sizeY, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-this.sizeX, +this.sizeY, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
var i;
for (i = 0; i != 4; i++) {
var j = (i + 1) & 3;
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[i], this.b$['com.falstad.Vec3DemoFrame'].ypoints[i], this.b$['com.falstad.Vec3DemoFrame'].xpoints[j], this.b$['com.falstad.Vec3DemoFrame'].ypoints[j], 8, i == 0, 1);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[57]||(I$[57]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').CornerField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "CornerField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.SquareLoopField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.offset = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "corner";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Offset", 50);
});

Clazz.newMeth(C$, 'setupFrame', function () {
this.size = 2;
this.offset = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 50.0 - 1;
this.lstart = this.offset;
this.lstop = 10 + this.offset;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[0] = result[1] = result[2] = 0;
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, this.offset, 0, 0, 1, 2, -1);
this.getLineField$DA$DA$D$D$I$I$I$I(result, y, this.offset, 0, 1, 0, 2, -1);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.offset, this.offset, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(1, this.offset, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.offset, 1, 0, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], this.b$['com.falstad.Vec3DemoFrame'].xpoints[1], this.b$['com.falstad.Vec3DemoFrame'].ypoints[1], 8, true, 1);
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[2], this.b$['com.falstad.Vec3DemoFrame'].ypoints[2], this.b$['com.falstad.Vec3DemoFrame'].xpoints[0], this.b$['com.falstad.Vec3DemoFrame'].ypoints[0], 8, false, 1);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[58]||(I$[58]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MagneticSphereB))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "MagneticSphereB", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "magnetic sphere";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var r = P$.Vec3DemoFrame.distanceArray$DA(y);
if (r < a ) {
this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
result[0] = result[1] = result[2] = 0;
return;
}var rz = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
var costh = y[2] / r;
var sinth = rz / r;
var sinph = y[1] / rz;
var cosph = y[0] / rz;
if (!this.b$['com.falstad.Vec3DemoFrame'].showA) {
var r3 = 0.003 * a * a * a  / (r * r * r );
var eth = 2 * sinth * r3 ;
var er = costh * r3;
result[0] = sinth * cosph * er  + costh * cosph * eth ;
result[1] = sinth * sinph * er  + costh * sinph * eth ;
result[2] = costh * er - sinth * eth;
} else {
var aph = 0.003 * a * a * a * sinth  / (r * r);
result[0] = -sinph * aph;
result[1] = cosph * aph;
result[2] = 0;
}});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sphere Size", 50);
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
this.b$['com.falstad.Vec3DemoFrame'].fillSphere$java_awt_Graphics$D$D(g, a, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
var a = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
return this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(cameraPos, x[0], x[1], x[2], a);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[59]||(I$[59]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').MonopoleAttempt))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "MonopoleAttempt", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.SquareLoopField']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.tres = null;
this.yflip = null;
this.rad = null;
this.$size = null;
this.count = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "monopole attempt";
});

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.tres = Clazz.array(Double.TYPE, [8, 3]);
this.yflip = Clazz.array(Double.TYPE, [3]);
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Loop Size", 40);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Separation", 10);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(2, "Loop Count", 100);
this.b$['com.falstad.Vec3DemoFrame'].dispChooser.select$I((I$[60]||(I$[60]=Clazz.load('com.falstad.Vec3DemoFrame'))).DISP_VECTORS);
});

Clazz.newMeth(C$, 'setupFrame', function () {
C$.superclazz.prototype.setupFrame.apply(this, []);
this.$size = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue()) / 100.0;
this.rad = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() / 100.0 + this.$size;
this.count = ((this.b$['com.falstad.Vec3DemoFrame'].aux3Bar.getValue() * 6)/101|0) + 1;
});

Clazz.newMeth(C$, 'drawLoop$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != 4; i++) {
var j = (i + 1) & 3;
this.b$['com.falstad.Vec3DemoFrame'].drawCurrentLine$java_awt_Graphics$I$I$I$I$I$Z$I(g, this.b$['com.falstad.Vec3DemoFrame'].xpoints[i], this.b$['com.falstad.Vec3DemoFrame'].ypoints[i], this.b$['com.falstad.Vec3DemoFrame'].xpoints[j], this.b$['com.falstad.Vec3DemoFrame'].ypoints[j], 8, i == 0, 1);
}
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
g.setColor$java_awt_Color(this.b$['com.falstad.Vec3DemoFrame'].darkYellow);
var size = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() / 100.0;
var i;
var ct = this.count;
for (i = -1; i <= 1; i = i+(2)) {
if (--ct < 0) break;
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-size, -size, this.rad * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+size * i, -size * i, this.rad * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+size, +size, this.rad * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-size * i, +size * i, this.rad * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
this.drawLoop$java_awt_Graphics(g);
}
for (i = -1; i <= 1; i = i+(2)) {
if (--ct < 0) break;
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-size, this.rad * i, -size, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(-size * i, this.rad * i, +size * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+size, this.rad * i, +size, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(+size * i, this.rad * i, -size * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
this.drawLoop$java_awt_Graphics(g);
}
for (i = -1; i <= 1; i = i+(2)) {
if (--ct < 0) break;
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.rad * i, -size, -size, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 0);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.rad * i, +size * i, -size * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 1);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.rad * i, +size, +size, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 2);
this.b$['com.falstad.Vec3DemoFrame'].map3d$D$D$D$IA$IA$I(this.rad * i, -size * i, +size * i, this.b$['com.falstad.Vec3DemoFrame'].xpoints, this.b$['com.falstad.Vec3DemoFrame'].ypoints, 3);
this.drawLoop$java_awt_Graphics(g);
}
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var i;
for (i = 0; i != 6; i++) this.tres[i][0] = this.tres[i][1] = this.tres[i][2] = 0;

this.getLoopField$DA$DA$D$I(this.tres[0], y, -this.rad, -1);
if (this.count > 1) this.getLoopField$DA$DA$D$I(this.tres[1], y, this.rad, 1);
this.yflip[1] = y[0];
this.yflip[2] = y[1];
this.yflip[0] = y[2];
if (this.count > 2) this.getLoopField$DA$DA$D$I(this.tres[2], this.yflip, -this.rad, -1);
if (this.count > 3) this.getLoopField$DA$DA$D$I(this.tres[3], this.yflip, this.rad, 1);
this.yflip[2] = y[0];
this.yflip[0] = y[1];
this.yflip[1] = y[2];
if (this.count > 4) this.getLoopField$DA$DA$D$I(this.tres[4], this.yflip, -this.rad, -1);
if (this.count > 5) this.getLoopField$DA$DA$D$I(this.tres[5], this.yflip, this.rad, 1);
for (i = 0; i != 3; i++) result[i] = this.tres[0][i] + this.tres[1][i] + this.tres[2][(i + 1) % 3] + this.tres[3][(i + 1) % 3] + this.tres[4][(i + 2) % 3] + this.tres[5][(i + 2) % 3] ;

});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseSquaredRadialSphere", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1/r^2 sphere";
});

Clazz.newMeth(C$, 'getSize', function () {
return (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 110.0;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distanceArray$DA(y);
if (r < 0.01 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var a = this.getSize();
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = 0.1 * ((r > a ) ? -1 / r : -3 / (2 * a) + r * r / (2 * a * a * a ));
return;
}if (r < a ) r = a;
var alpha = 3.0E-4 / (r * r * r );
result[0] = -y[0] * alpha;
result[1] = -y[1] * alpha;
result[2] = -y[2] * alpha;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Sphere Size", 70);
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.renderSphere$java_awt_Graphics$D(g, this.getSize());
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
return this.b$['com.falstad.Vec3DemoFrame'].intersectSphere$DA$D$D$D$D(cameraPos, x[0], x[1], x[2], this.getSize());
});

Clazz.newMeth(C$, 'noSplitFieldVectors', function () {
return false;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[61]||(I$[61]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConstRadial))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConstRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "const radial";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distanceArray$DA(y);
if (r < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var q = 3.0E-4 / r;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = r - 1;
return;
}result[0] = -q * y[0];
result[1] = -q * y[1];
result[2] = -q * y[2];
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[62]||(I$[62]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearRadial))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearRadial", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseSquaredRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear radial";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distanceArray$DA(y);
if (r < 0.06 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = r * r - 1;
return;
}var k = 3.0E-4;
result[0] = -y[0] * k;
result[1] = -y[1] * k;
result[2] = -y[2] * k;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[63]||(I$[63]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConstantToZAxis))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConstantToZAxis", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "constant to z axis";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
if (r < 0.01 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = r - 1;
return;
}var q = 3.0E-4 / r;
result[0] = -y[0] * q;
result[1] = -y[1] * q;
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[64]||(I$[64]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConstantToXYPlane))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConstantToXYPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "constant to xy plane";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var alpha = 3.0E-4;
if (y[2] > -0.01  && y[2] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = java.lang.Math.abs(y[2]) - 1;
return;
}result[0] = 0;
result[1] = 0;
result[2] = (y[2] < 0 ) ? alpha : -alpha;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'render$java_awt_Graphics', function (g) {
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 1);
this.b$['com.falstad.Vec3DemoFrame'].drawPlane$java_awt_Graphics$D$D$D(g, 1, 1, 0);
this.b$['com.falstad.Vec3DemoFrame'].renderItems$java_awt_Graphics$I(g, 0);
});

Clazz.newMeth(C$, 'getViewPri$DA$DA', function (cameraPos, x) {
if (this.b$['com.falstad.Vec3DemoFrame'].intersectZPlane$DA$D$D$D$D(cameraPos, 0, x[0], x[1], x[2]) == 0 ) return 0;
return 1;
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[65]||(I$[65]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearToZAxis))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearToZAxis", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear to z axis";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
if (r < 0.01 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = r * r - 1;
return;
}var q = 3.0E-4;
result[0] = -y[0] * q;
result[1] = -y[1] * q;
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[66]||(I$[66]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearToXYPlane))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearToXYPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ConstantToXYPlane']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear to xy plane";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = y[2] * y[2] - 1;
return;
}if (y[2] > -0.01  && y[2] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var alpha = 3.0E-4;
result[0] = 0;
result[1] = 0;
result[2] = -alpha * y[2];
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[67]||(I$[67]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearToYZXZPlane))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearToYZXZPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear to yz, xz planes";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[0] > -0.01  && y[0] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
if (y[1] > -0.01  && y[1] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var alpha = 3.0E-4;
var r = java.lang.Math.sqrt((this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 51.0);
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = (y[0] * y[0] * r  + y[1] * y[1] / r) - 1;
return;
}result[0] = -alpha * r * y[0] ;
result[1] = -alpha / r * y[1];
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "X/Y Ratio", 50);
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[68]||(I$[68]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearToYZXZXYPlane))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearToYZXZXYPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear to yz, xz, xy planes";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[2] > -0.01  && y[2] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var alpha = 3.0E-4;
var r1 = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() + 1) / 51.0;
var r2 = (this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() + 1) / 51.0;
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = (y[0] * y[0] * r1  + y[1] * y[1] + y[2] * y[2] / r2) - 1;
return;
}result[0] = -alpha * r1 * y[0] ;
result[1] = -alpha * y[1];
result[2] = -alpha / r2 * y[2];
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "X/Y Ratio", 50);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Y/Z Ratio", 50);
});

Clazz.newMeth(C$, 'checkBoundsWithForce', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[69]||(I$[69]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseToXYPlane))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseToXYPlane", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.ConstantToXYPlane']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "inverse to xy plane";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
if (y[2] > -0.01  && y[2] < 0.01  ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
var alpha = 3.0E-4;
var zz = y[2];
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = -0.01 / (zz * zz);
return;
}if (zz == 0 ) zz = 1.0E-5;
result[0] = 0;
result[1] = 0;
result[2] = -alpha / zz;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[70]||(I$[70]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').InverseSquareRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "InverseSquareRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1/r^2 rotational";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
if (r < 0.02 ) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
this.b$['com.falstad.Vec3DemoFrame'].rotateParticle$DA$DA$D(result, y, 1.0E-4 / (r * r * r ));
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[71]||(I$[71]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear rotational";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYViewExact();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = -q * y[1];
result[1] = q * y[0];
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[72]||(I$[72]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearRotationalA))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearRotationalA", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "fz=-(x^2+y^2)";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = result[1] = 0;
result[2] = -q * (y[0] * y[0] + y[1] * y[1]);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[73]||(I$[73]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConstantRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConstantRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "constant rotational";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYViewExact();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
this.b$['com.falstad.Vec3DemoFrame'].rotateParticle$DA$DA$D(result, y, 3.0E-4 / r);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[74]||(I$[74]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ConstantRotationalA))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ConstantRotationalA", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(0,0,-r)";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var r = P$.Vec3DemoFrame.distance2$D$D(y[0], y[1]);
result[0] = result[1] = 0;
result[2] = -6.0E-4 * r;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[75]||(I$[75]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Helical))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "Helical", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.InverseRadial']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "helical";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Z Speed", 30);
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = -q * y[1];
result[1] = q * y[0];
result[2] = 1.0E-5 * this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[76]||(I$[76]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FxEqualsYField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FxEqualsYField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "fx=y";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[2] = result[1] = 0;
result[0] = y[1] * 6.0E-4;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[77]||(I$[77]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').FxEqualsY2))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FxEqualsY2", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "fx=y2";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
result[2] = result[1] = 0;
result[0] = y[1] * y[1] * 0.001 ;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[78]||(I$[78]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LinearZRotational))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LinearZRotational", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(-yz,xz,0)";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 0.001 * y[2];
result[0] = -q * y[1];
result[1] = q * y[0];
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[79]||(I$[79]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').YzXz0Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "YzXz0Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(yz,xz,0)";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4 * y[2];
result[0] = q * y[1];
result[1] = q * y[0];
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[80]||(I$[80]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').XY_2ZField))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "XY_2ZField", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(-x,-y,2z)";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4;
result[0] = q * y[0];
result[1] = q * y[1];
result[2] = -2 * q * y[2] ;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[81]||(I$[81]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').XY0Field))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "XY0Field", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(-x,y,0)";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 6.0E-4;
result[0] = -q * y[0];
result[1] = q * y[1];
result[2] = 0;
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[82]||(I$[82]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').RotationalExpansion))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "RotationalExpansion", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(x-y,x+y,0)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = q * (y[0] - y[1]);
result[1] = q * (y[0] + y[1]);
result[2] = 0;
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[83]||(I$[83]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').RotationalExpansion3D))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "RotationalExpansion3D", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "(x-y,x+y,2z)";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var q = 3.0E-4;
result[0] = q * (y[0] - y[1]);
result[1] = q * (y[0] + y[1]);
result[2] = q * (y[2] * 2);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXYView();
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[84]||(I$[84]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').RosslerAttractor))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "RosslerAttractor", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Rossler attractor";
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var scale = this.b$['com.falstad.Vec3DemoFrame'].aux2Bar.getValue() * 2 + 20;
var xx = y[0] * 24;
var yy = y[1] * 24;
var zz = (y[2] + 0.75) * scale;
var k = 2.0E-5;
var c = this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue() * 0.1;
result[0] = -(yy + zz) * k;
result[1] = k * (xx + 0.2 * yy);
result[2] = k * (0.2 + xx * zz - c * zz);
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "c", 80);
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(1, "Z Scale", 36);
this.b$['com.falstad.Vec3DemoFrame'].strengthBar.setValue$I(75);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'redistribute', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[85]||(I$[85]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').LorenzAttractor))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "LorenzAttractor", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Lorenz attractor";
});

Clazz.newMeth(C$, 'setup', function () {
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].setupBar$I$S$I(0, "Scale", 24);
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var scale = (this.b$['com.falstad.Vec3DemoFrame'].aux1Bar.getValue()/2|0) + 23;
var xx = y[0] * scale;
var yy = y[1] * scale;
var zz = y[2] * scale + scale;
var k = 2.0E-5;
result[0] = (-10 * xx + 10 * yy) * k;
result[1] = k * (28 * xx - yy - xx * zz);
result[2] = k * (-2.6666666666666665 * zz + xx * yy);
});

Clazz.newMeth(C$, 'nonGradient', function () {
return true;
});

Clazz.newMeth(C$, 'redistribute', function () {
return false;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[86]||(I$[86]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').UserDefinedPotential))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "UserDefinedPotential", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

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
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.b$['com.falstad.Vec3DemoFrame'].textFields[0].setText$S("x*x-z*z");
this.b$['com.falstad.Vec3DemoFrame'].textFields[0].show();
this.b$['com.falstad.Vec3DemoFrame'].textFieldLabel.setText$S("Potential Function");
this.b$['com.falstad.Vec3DemoFrame'].textFieldLabel.show();
this.actionPerformed();
this.y0 = Clazz.array(Double.TYPE, [3]);
});

Clazz.newMeth(C$, 'actionPerformed', function () {
this.b$['com.falstad.Vec3DemoFrame'].parseError = false;
var ep = Clazz.new_((I$[87]||(I$[87]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ExprParser))).c$$S, [this, null, this.b$['com.falstad.Vec3DemoFrame'].textFields[0].getText()]);
this.expr = ep.parseExpression();
if (ep.gotError()) this.b$['com.falstad.Vec3DemoFrame'].parseError = true;
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var k = 1.0E-5;
var i;
for (i = 0; i != 3; i++) this.y0[i] = y[i];

var pot0 = this.expr.eval$DA(this.y0);
if (this.b$['com.falstad.Vec3DemoFrame'].getPot) {
result[0] = pot0 * 0.01;
return;
}this.y0[0] += k;
result[0] = pot0 - this.expr.eval$DA(this.y0);
this.y0[0] = y[0];
this.y0[1] += k;
result[1] = pot0 - this.expr.eval$DA(this.y0);
this.y0[1] = y[1];
this.y0[2] += k;
result[2] = pot0 - this.expr.eval$DA(this.y0);
for (i = 0; i != 3; i++) if (!(result[i] > -10  && result[i] < 10  )) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[88]||(I$[88]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').UserDefinedFunction))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "UserDefinedFunction", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Vec3DemoFrame','com.falstad.Vec3DemoFrame.VecFunction']);

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
this.b$['com.falstad.Vec3DemoFrame'].setXZView();
this.exprs = Clazz.array((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))), [3]);
this.b$['com.falstad.Vec3DemoFrame'].textFields[0].setText$S("x");
this.b$['com.falstad.Vec3DemoFrame'].textFields[1].setText$S("y");
this.b$['com.falstad.Vec3DemoFrame'].textFields[2].setText$S("z");
this.b$['com.falstad.Vec3DemoFrame'].textFieldLabel.setText$S("Field Functions");
this.b$['com.falstad.Vec3DemoFrame'].textFieldLabel.show();
var i;
for (i = 0; i != 3; i++) this.b$['com.falstad.Vec3DemoFrame'].textFields[i].show();

this.actionPerformed();
});

Clazz.newMeth(C$, 'actionPerformed', function () {
var i;
this.b$['com.falstad.Vec3DemoFrame'].parseError = false;
for (i = 0; i != 3; i++) {
var ep = Clazz.new_((I$[87]||(I$[87]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').ExprParser))).c$$S, [this, null, this.b$['com.falstad.Vec3DemoFrame'].textFields[i].getText()]);
this.exprs[i] = ep.parseExpression();
if (ep.gotError()) this.b$['com.falstad.Vec3DemoFrame'].parseError = true;
}
});

Clazz.newMeth(C$, 'getField$DA$DA', function (result, y) {
var k = 2.0E-4;
var i;
for (i = 0; i != 3; i++) {
result[i] = k * this.exprs[i].eval$DA(y);
if (!(result[i] > -10  && result[i] < 10  )) this.b$['com.falstad.Vec3DemoFrame'].boundCheck = true;
}
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "DrawData", function(){
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "Particle", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pos = null;
this.vel = null;
this.viewPri = 0;
this.lifetime = 0;
this.phi = 0;
this.theta = 0;
this.phiv = 0;
this.thetav = 0;
this.stepsize = 0;
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "FieldVector", function(){
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ExprState", function(){
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "Expr", function(){
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

Clazz.newMeth(C$, 'c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I', function (e1, e2, v) {
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
case 5:
return es[2] * 10;
case 18:
return java.lang.Math.sqrt(es[0] * es[0] + es[1] * es[1] + es[2] * es[2]) * 10;
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
(function(){var C$=Clazz.newClass(P$.Vec3DemoFrame, "ExprParser", function(){
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
if (this.token.length$() == 0) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I$D, [this, null, 6, 0.0]);
var e = this.parse();
if (this.token.length$() > 0) this.err = true;
return e;
});

Clazz.newMeth(C$, 'parse', function () {
var e = this.parseMult();
while (true){
if (this.skip$S("+")) e = Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, e, this.parseMult(), 1]);
 else if (this.skip$S("-")) e = Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, e, this.parseMult(), 2]);
 else break;
}
return e;
});

Clazz.newMeth(C$, 'parseMult', function () {
var e = this.parseUminus();
while (true){
if (this.skip$S("*")) e = Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, e, this.parseUminus(), 7]);
 else if (this.skip$S("/")) e = Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, e, this.parseUminus(), 8]);
 else break;
}
return e;
});

Clazz.newMeth(C$, 'parseUminus', function () {
this.skip$S("+");
if (this.skip$S("-")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, this.parsePow(), null, 10]);
return this.parsePow();
});

Clazz.newMeth(C$, 'parsePow', function () {
var e = this.parseTerm();
while (true){
if (this.skip$S("^")) e = Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, e, this.parseTerm(), 9]);
 else break;
}
return e;
});

Clazz.newMeth(C$, 'parseFunc$I', function (t) {
this.skipOrError$S("(");
var e = this.parse();
this.skipOrError$S(")");
return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$com_falstad_Vec3DemoFrame_Expr$com_falstad_Vec3DemoFrame_Expr$I, [this, null, e, null, t]);
});

Clazz.newMeth(C$, 'parseTerm', function () {
if (this.skip$S("(")) {
var e = this.parse();
this.skipOrError$S(")");
return e;
}if (this.skip$S("x")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I, [this, null, 3]);
if (this.skip$S("y")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I, [this, null, 4]);
if (this.skip$S("z")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I, [this, null, 5]);
if (this.skip$S("r")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I, [this, null, 18]);
if (this.skip$S("pi")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I$D, [this, null, 6, 3.141592653589793]);
if (this.skip$S("e")) return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I$D, [this, null, 6, 2.718281828459045]);
if (this.skip$S("sin")) return this.parseFunc$I(11);
if (this.skip$S("cos")) return this.parseFunc$I(12);
if (this.skip$S("abs")) return this.parseFunc$I(13);
if (this.skip$S("exp")) return this.parseFunc$I(14);
if (this.skip$S("log")) return this.parseFunc$I(15);
if (this.skip$S("sqrt")) return this.parseFunc$I(16);
if (this.skip$S("tan")) return this.parseFunc$I(17);
try {
var e = Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I$D, [this, null, 6, Double.$valueOf(this.token).doubleValue()]);
this.getToken();
return e;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.err = true;
System.out.print$S("unrecognized token: " + this.token + "\n" );
return Clazz.new_((I$[89]||(I$[89]=Clazz.load(Clazz.load('com.falstad.Vec3DemoFrame').Expr))).c$$I$D, [this, null, 6, 0]);
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
//Created 2017-12-17 19:28:14
