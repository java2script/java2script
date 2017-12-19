(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "AtomViewerFrame", function(){
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
this.l2CheckItem = null;
this.rCheckItem = null;
this.alwaysNormItem = null;
this.cubicItem = null;
this.dimensionsItem = null;
this.axesItem = null;
this.autoZoomItem = null;
this.animatedZoomItem = null;
this.samplesItems = null;
this.samplesNums = null;
this.exitItem = null;
this.modeChooser = null;
this.viewChooser = null;
this.sliceChooser = null;
this.nChooser = null;
this.lChooser = null;
this.mChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.internalResBar = null;
this.brightnessBar = null;
this.scaleBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewL = null;
this.viewL2 = null;
this.viewStates = null;
this.viewRadial = null;
this.viewList = null;
this.viewCount = 0;
this.orbitals = null;
this.orbCount = 0;
this.phasors = null;
this.phasorCount = 0;
this.states = null;
this.stateCount = 0;
this.realBasis = null;
this.n2l1xBasis = null;
this.n2l1yBasis = null;
this.n3l1xBasis = null;
this.n3l1yBasis = null;
this.n3l2xBasis = null;
this.n3l2yBasis = null;
this.n4l1xBasis = null;
this.n4l1yBasis = null;
this.n4l2xBasis = null;
this.n4l2yBasis = null;
this.n4l3xBasis = null;
this.n4l3yBasis = null;
this.n4l3CubicBasis = null;
this.spHybridBasis = null;
this.sp2HybridBasis = null;
this.sp3HybridBasis = null;
this.basisList = null;
this.basisCount = 0;
this.textBoxes = null;
this.textCount = 0;
this.changingDerivedStates = false;
this.$mouseDown = false;
this.dragZoomStart = 0;
this.lastXRot = 0;
this.lastYRot = 0;
this.colorMult = 0;
this.zoom = 0;
this.rotmatrix = null;
this.viewAxes = null;
this.xpoints = null;
this.ypoints = null;
this.selectedPaneHandle = 0;
this.phaseColors = null;
this.resadj = 0;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.sampleCount = 0;
this.dataSize = 0;
this.pause = 0;
this.applet = null;
this.selectedState = null;
this.selectedPhasor = null;
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
this.funcr = 0;
this.funci = 0;
this.phiIndex = 0;
this.bestBrightness = 0;
this.userBrightMult = 0;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.cv = null;
this.useBufferedImage = false;
this.useFrame = false;
this.samplesGroup = null;
this.l1xArray = null;
this.l1yArray = null;
this.l2xArray = null;
this.l2yArray = null;
this.l3xArray = null;
this.l3yArray = null;
this.l3CubicArray = null;
this.spHybridArray = null;
this.sp2HybridArray = null;
this.sp3HybridArray = null;
this.spHybridText = null;
this.sp2HybridText = null;
this.sp3HybridText = null;
this.codeLetter = null;
this.l1RealText = null;
this.l2RealText = null;
this.l3RealText = null;
this.l3CubicRealText = null;
this.lastTime = 0;
this.frameLen = 0;
this.scaleValue = 0;
this.finished = false;
this.ignoreAdjustments = false;
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
this.userBrightMult = 1;
this.useBufferedImage = false;
this.useFrame = false;
this.l1xArray = Clazz.array(Double.TYPE, -1, [0.5, 0, -0.7071067811865476, 0, 0.5, 0, 0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0.5, 0, 0.7071067811865476, 0, 0.5, 0]);
this.l1yArray = Clazz.array(Double.TYPE, -1, [0.5, 0, 0, -0.7071067811865476, -0.5, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0.5, 0, 0, 0.7071067811865476, -0.5, 0]);
this.l2xArray = Clazz.array(Double.TYPE, -1, [0.25, 0, -0.5, 0, 0.6123724356957945, 0, -0.5, 0, 0.25, 0, -0.5, 0, 0.5, 0, 0, 0, -0.5, 0, 0.5, 0, 0.6123724356957945, 0, 0, 0, -0.5, 0, 0, 0, 0.6123724356957945, 0, -0.5, 0, -0.5, 0, 0, 0, 0.5, 0, 0.5, 0, 0.25, 0, 0.5, 0, 0.6123724356957945, 0, 0.5, 0, 0.25, 0]);
this.l2yArray = Clazz.array(Double.TYPE, -1, [0.25, 0, 0, -0.5, -0.6123724356957945, 0, 0, 0.5, 0.25, 0, -0.5, 0, 0, 0.5, 0, 0, 0, 0.5, 0.5, 0, -0.6123724356957945, 0, 0, 0, -0.5, 0, 0, 0, -0.6123724356957945, 0, -0.5, 0, 0, -0.5, 0, 0, 0, -0.5, 0.5, 0, 0.25, 0, 0, 0.5, -0.6123724356957945, 0, 0, -0.5, 0.25, 0]);
this.l3xArray = Clazz.array(Double.TYPE, -1, [0.125, 0, -0.306186, 0, 0.484123, 0, -0.559017, 0, 0.484123, 0, -0.306186, 0, 0.125, 0, -0.306186, 0, 0.5, 0, -0.395285, 0, 0.0, 0, 0.395285, 0, -0.5, 0, 0.306186, 0, 0.484123, 0, -0.395285, 0, -0.125, 0, 0.433013, 0, -0.125, 0, -0.395285, 0, 0.484123, 0, 0.559017, 0, 0.0, 0, -0.433013, 0, 0.0, 0, 0.433013, 0, 0.0, 0, -0.559017, 0, 0.484123, 0, 0.395285, 0, -0.125, 0, -0.433013, 0, -0.125, 0, 0.395285, 0, 0.484123, 0, -0.306186, 0, -0.5, 0, -0.395285, 0, 0.0, 0, 0.395285, 0, 0.5, 0, 0.306186, 0, 0.125, 0, 0.306186, 0, 0.484123, 0, 0.559017, 0, 0.484123, 0, 0.306186, 0, 0.125, 0]);
this.l3yArray = Clazz.array(Double.TYPE, -1, [-0.125, 0, 0, 0.306186, 0.484123, 0, 0, -0.559017, -0.484123, 0, 0, 0.306186, 0.125, 0, 0.306186, 0, 0, -0.5, -0.395285, 0, 0.0, 0, -0.395285, 0, 0, 0.5, 0.306186, 0, -0.484123, 0, 0, 0.395285, -0.125, 0, 0, 0.433013, 0.125, 0, 0, 0.395285, 0.484123, 0, 0, 0.559017, 0.0, 0, 0, 0.433013, 0.0, 0, 0, 0.433013, 0.0, 0, 0, 0.559017, -0.484123, 0, 0, -0.395285, -0.125, 0, 0, -0.433013, 0.125, 0, 0, -0.395285, 0.484123, 0, 0.306186, 0, 0, 0.5, -0.395285, 0, 0.0, 0, -0.395285, 0, 0, -0.5, 0.306186, 0, -0.125, 0, 0, -0.306186, 0.484123, 0, 0, 0.559017, -0.484123, 0, 0, -0.306186, 0.125, 0]);
this.l3CubicArray = Clazz.array(Double.TYPE, -1, [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0.559017, 0, 0, 0, -0.433013, 0, 0, 0, 0.433013, 0, 0, 0, -0.559017, 0, 0, 0.559017, 0, 0, 0, 0.433013, 0, 0, 0, 0.433013, 0, 0, 0, 0.559017, 0, 0, 0.7071067811865476, 0, 0, 0, 0, 0, 0, 0, 0.7071067811865476, 0, 0, 0, 0, 0, 0, -0.7071067811865476, 0, 0, 0, 0, 0, 0, 0, 0.7071067811865476, 0, 0, 0.433013, 0, 0, 0, 0.559017, 0, 0, 0, -0.559017, 0, 0, 0, -0.433013, 0, 0, 0.433013, 0, 0, 0, -0.559017, 0, 0, 0, -0.559017, 0, 0, 0, 0.433013]);
this.spHybridArray = Clazz.array(Double.TYPE, -1, [-0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0, 0, 0.7071067811865476, 0, 0, 0, 0, 0, 0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476]);
this.sp2HybridArray = Clazz.array(Double.TYPE, -1, [-0.57735, 0, 0.57735, 0, 0, 0, -0.57735, 0, -0.57735, 0, -0.288675, -0.5, 0, 0, 0.288675, -0.5, -0.57735, 0, -0.288675, 0.5, 0, 0, 0.288675, 0.5, 0, 0, 0, 0, 1, 0, 0, 0]);
this.sp3HybridArray = Clazz.array(Double.TYPE, -1, [-0.5, 0, -0.3535533905932738, 0.3535533905932738, -0.5, 0, 0.3535533905932738, 0.3535533905932738, -0.5, 0, 0.3535533905932738, -0.3535533905932738, -0.5, 0, -0.3535533905932738, -0.3535533905932738, -0.5, 0, 0.3535533905932738, 0.3535533905932738, 0.5, 0, -0.3535533905932738, 0.3535533905932738, -0.5, 0, -0.3535533905932738, -0.3535533905932738, 0.5, 0, 0.3535533905932738, -0.3535533905932738]);
this.spHybridText = Clazz.array(java.lang.String, -1, ["2sp (1)", "2sp (2)", "2px", "2py"]);
this.sp2HybridText = Clazz.array(java.lang.String, -1, ["2sp2 (1)", "2sp2 (2)", "2sp2 (3)", "2pz"]);
this.sp3HybridText = Clazz.array(java.lang.String, -1, ["2sp3 (1)", "2sp3 (2)", "2sp3 (3)", "2sp3 (4)"]);
this.codeLetter = Clazz.array(java.lang.String, -1, ["s", "p", "d", "f", "g", "h"]);
this.l1RealText = Clazz.array(java.lang.String, -1, ["pz", "px", "py"]);
this.l2RealText = Clazz.array(java.lang.String, -1, ["dz2", "dxz", "dyz", "d(x2-y2)", "dxy"]);
this.l3RealText = Clazz.array(java.lang.String, -1, ["fz3", "fxz2", "fyz2", "fz(x2-y2)", "fxyz", "fx(x2-3y2)", "fy(3x2-y2)"]);
this.l3CubicRealText = Clazz.array(java.lang.String, -1, ["fz3", "fx3", "fy3", "fz(x2-y2)", "fxyz", "fx(z2-y2)", "fy(z2-x2)"]);
this.scaleValue = -1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "AtomViewer by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewer', function (a) {
C$.superclazz.c$$S.apply(this, ["Hydrogenic Atom Viewer v1.5c"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.gray2 = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
var res = 100;
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.AtomViewerLayout')))));
this.cv = Clazz.new_((I$[5]||(I$[5]=Clazz.load('com.falstad.AtomViewerCanvas'))).c$$com_falstad_AtomViewerFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.cv);
var mb = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["View"]);
mb.add$javax_swing_JMenu(m);
m.add$javax_swing_JMenuItem(this.eCheckItem = this.getCheckItem$S("Energy"));
this.eCheckItem.setState$Z(true);
this.xCheckItem = this.getCheckItem$S("Position");
this.xCheckItem.setState$Z(true);
this.xCheckItem.setEnabled$Z(false);
m.add$javax_swing_JMenuItem(this.lCheckItem = this.getCheckItem$S("Angular Momentum"));
m.add$javax_swing_JMenuItem(this.l2CheckItem = this.getCheckItem$S("Angular Momentum^2"));
m.add$javax_swing_JMenuItem(this.rCheckItem = this.getCheckItem$S("Radial Distribution"));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.colorCheck = this.getCheckItem$S("Phase as Color"));
this.colorCheck.setState$Z(true);
m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
mb.add$javax_swing_JMenu(m);
this.alwaysNormItem = this.getCheckItem$S("Always Normalize");
m.add$javax_swing_JMenuItem(this.cubicItem = this.getCheckItem$S("Show Cubic f Orbitals"));
m.add$javax_swing_JMenuItem(this.dimensionsItem = this.getCheckItem$S("Show Dimensions"));
m.add$javax_swing_JMenuItem(this.axesItem = this.getCheckItem$S("Show Axes"));
this.axesItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.autoZoomItem = this.getCheckItem$S("Auto Scale"));
this.autoZoomItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.animatedZoomItem = this.getCheckItem$S("Animated Scaling"));
this.animatedZoomItem.setState$Z(true);
this.setMenuBar$a2s_MenuBar(mb);
m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Samples"]);
mb.add$javax_swing_JMenu(m);
this.samplesItems = Clazz.array((I$[8]||(I$[8]=Clazz.load('javax.swing.JRadioButtonMenuItem'))), [6]);
m.add$javax_swing_JMenuItem(this.samplesItems[0] = this.getRadioItem$S("Samples = 9 (fastest)"));
m.add$javax_swing_JMenuItem(this.samplesItems[1] = this.getRadioItem$S("Samples = 15 (default)"));
m.add$javax_swing_JMenuItem(this.samplesItems[2] = this.getRadioItem$S("Samples = 25"));
m.add$javax_swing_JMenuItem(this.samplesItems[3] = this.getRadioItem$S("Samples = 35"));
m.add$javax_swing_JMenuItem(this.samplesItems[4] = this.getRadioItem$S("Samples = 45"));
m.add$javax_swing_JMenuItem(this.samplesItems[5] = this.getRadioItem$S("Samples = 55 (best)"));
this.samplesGroup = Clazz.new_((I$[9]||(I$[9]=Clazz.load('javax.swing.ButtonGroup'))));
for (var i = 0; i < 6; i++) {
this.samplesGroup.add$javax_swing_AbstractButton(this.samplesItems[i]);
this.samplesItems[i].setActionCommand$S("" + this.samplesNums[i]);
}
this.samplesItems[1].setSelected$Z(true);
this.viewChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
this.viewChooser.add$S("Real Orbitals (chem.)");
this.viewChooser.add$S("Complex Orbitals (phys.)");
this.viewChooser.add$S("Real Combinations (n=1-4)");
this.viewChooser.add$S("Complex Combos (n=1-4)");
this.viewChooser.add$S("Multiple Bases (n=2,l=1)");
this.viewChooser.add$S("Multiple Bases (n=3,l=1)");
this.viewChooser.add$S("Multiple Bases (n=3,l=2)");
this.viewChooser.add$S("Multiple Bases (n=4,l=1)");
this.viewChooser.add$S("Multiple Bases (n=4,l=2)");
this.viewChooser.add$S("Multiple Bases (n=4,l=3)");
this.viewChooser.add$S("Hybrid Bases");
this.viewChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.viewChooser);
var i;
this.nChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
for (i = 1; i <= 16; i++) this.nChooser.add$S("n = " + i);

this.nChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.nChooser);
this.nChooser.select$I(3);
this.lChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
this.lChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.lChooser);
this.mChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
this.mChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.mChooser);
this.sliceChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
this.sliceChooser.add$S("No Slicing");
this.sliceChooser.add$S("Show X Slice");
this.sliceChooser.add$S("Show Y Slice");
this.sliceChooser.add$S("Show Z Slice");
this.sliceChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.sliceChooser);
this.modeChooser = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Adjust View");
this.modeChooser.add$S("Mouse = Rotate X");
this.modeChooser.add$S("Mouse = Rotate Y");
this.modeChooser.add$S("Mouse = Rotate Z");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.modeChooser);
this.stoppedCheck = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stoppedCheck);
this.add$java_awt_Component(this.blankButton = Clazz.new_((I$[12]||(I$[12]=Clazz.load('a2s.Button'))).c$$S,["Clear"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.normalizeButton = Clazz.new_((I$[12]||(I$[12]=Clazz.load('a2s.Button'))).c$$S,["Normalize"]));
this.normalizeButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.maximizeButton = Clazz.new_((I$[12]||(I$[12]=Clazz.load('a2s.Button'))).c$$S,["Maximize"]));
this.maximizeButton.addActionListener$java_awt_event_ActionListener(this);
this.setNValue();
this.lChooser.select$I(3);
this.setLValue();
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.add$java_awt_Component(this.speedBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 40, 1, 1, 180]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 240, 1, 1, 4000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.add$java_awt_Component(this.resolutionBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, res, 2, 20, 300]));
this.resolutionBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["Scale", 0]));
this.add$java_awt_Component(this.scaleBar = Clazz.new_((I$[14]||(I$[14]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 75, 1, 5, 1620]));
this.scaleBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[13]||(I$[13]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
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
this.phaseColors = Clazz.array((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))), [400]);
for (i = 0; i != 8; i++) for (j = 0; j != 50; j++) {
var ang = Math.atan(j / 50.0);
this.phaseColors[i * 50 + j] = this.genPhaseColor$I$D(i, ang);
}

this.slicerPoints = Clazz.array(Integer.TYPE, [2, 10]);
this.sliceFaces = Clazz.array(Double.TYPE, [4, 3]);
this.rotmatrix = Clazz.array(Double.TYPE, [9]);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate$D$D(0, -1.5707963267948966);
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.setupSimpson();
this.setupStates();
this.orbitalChanged();
this.random = Clazz.new_((I$[16]||(I$[16]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
this.setSize$I$I(580, 500);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
this.setupMenus();
this.finished = true;
});

Clazz.newMeth(C$, 'setupStates', function () {
var maxn = 16;
this.stateCount = (maxn * (maxn + 1) * (2 * maxn + 1) /6|0);
var i;
this.states = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').BasisState))), [this.stateCount]);
var n = 1;
var l = 0;
var m = 0;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i] = Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').BasisState))), [this, null]);
bs.elevel = -1 / (2.0 * n * n );
bs.n = n;
bs.l = l;
bs.m = m;
if (m < l) m++;
 else {
l++;
if (l < n) m = -l;
 else {
n++;
l = m = 0;
}}}
this.basisList = Clazz.array((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').AlternateBasis))), [17]);
this.basisCount = 0;
this.realBasis = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').AlternateBasis))), [this, null]);
var maxRealN = 4;
var realct = this.realBasis.altStateCount = (maxRealN * (maxRealN + 1) * (2 * maxRealN + 1) /6|0);
this.realBasis.altStates = Clazz.array((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').DerivedState))), [realct]);
n = 1;
l = m = 0;
for (i = 0; i != realct; i++) {
var ds = this.realBasis.altStates[i] = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').DerivedState))), [this, null]);
ds.basis = this.realBasis;
if (m == 0) {
ds.count = 1;
ds.bstates = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').BasisState))), [1]);
ds.bstates[0] = this.getState$I$I$I(n, l, 0);
ds.coefs = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [1]);
ds.coefs[0] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(1, 0);
} else {
var m0 = m - 1;
var realm = (m0/2|0) + 1;
ds.count = 2;
ds.bstates = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').BasisState))), [2]);
ds.bstates[0] = this.getState$I$I$I(n, l, realm);
ds.bstates[1] = this.getState$I$I$I(n, l, -realm);
ds.coefs = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [2]);
var mphase = Math.pow(-1, realm);
if ((m0 & 1) == 0) {
ds.coefs[0] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(mphase * 0.7071067811865476, 0);
ds.coefs[1] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(0.7071067811865476, 0);
} else {
ds.coefs[0] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(0, mphase * 0.7071067811865476);
ds.coefs[1] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex')))).setReIm$D$D(0, -0.7071067811865476);
}}switch (l) {
case 0:
ds.text = n + "s";
break;
case 1:
ds.text = n + this.l1RealText[m];
break;
case 2:
ds.text = n + this.l2RealText[m];
break;
case 3:
ds.text = n + this.l3RealText[m];
break;
}
if (m < l * 2) m++;
 else {
l++;
if (l < n) m = 0;
 else {
n++;
l = m = 0;
}}}
this.n2l1xBasis = this.setupLBasis$I$I$Z$DA(2, 1, true, this.l1xArray);
this.n2l1yBasis = this.setupLBasis$I$I$Z$DA(2, 1, false, this.l1yArray);
this.n3l1xBasis = this.setupLBasis$I$I$Z$DA(3, 1, true, this.l1xArray);
this.n3l1yBasis = this.setupLBasis$I$I$Z$DA(3, 1, false, this.l1yArray);
this.n3l2xBasis = this.setupLBasis$I$I$Z$DA(3, 2, true, this.l2xArray);
this.n3l2yBasis = this.setupLBasis$I$I$Z$DA(3, 2, false, this.l2yArray);
this.n4l1xBasis = this.setupLBasis$I$I$Z$DA(4, 1, true, this.l1xArray);
this.n4l1yBasis = this.setupLBasis$I$I$Z$DA(4, 1, false, this.l1yArray);
this.n4l2xBasis = this.setupLBasis$I$I$Z$DA(4, 2, true, this.l2xArray);
this.n4l2yBasis = this.setupLBasis$I$I$Z$DA(4, 2, false, this.l2yArray);
this.n4l3xBasis = this.setupLBasis$I$I$Z$DA(4, 3, true, this.l3xArray);
this.n4l3yBasis = this.setupLBasis$I$I$Z$DA(4, 3, false, this.l3yArray);
this.n4l3CubicBasis = this.setupLBasis$I$I$Z$DA(4, 3, false, this.l3CubicArray);
this.n4l3CubicBasis.n = 0;
this.spHybridBasis = this.setupHybridBasis$DA$SA(this.spHybridArray, this.spHybridText);
this.sp2HybridBasis = this.setupHybridBasis$DA$SA(this.sp2HybridArray, this.sp2HybridText);
this.sp3HybridBasis = this.setupHybridBasis$DA$SA(this.sp3HybridArray, this.sp3HybridText);
});

Clazz.newMeth(C$, 'setupLBasis$I$I$Z$DA', function (n, l, xAxis, arr) {
var sct = l * 2 + 1;
var basis = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').AlternateBasis))), [this, null]);
basis.n = n;
basis.l = l;
basis.xAxis = xAxis;
var mtext = (xAxis) ? "mx" : "my";
basis.altStates = Clazz.array((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').DerivedState))), [sct]);
basis.altStateCount = sct;
var i;
for (i = 0; i != sct; i++) {
var ds = basis.altStates[i] = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').DerivedState))), [this, null]);
ds.basis = basis;
ds.count = sct;
ds.bstates = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').BasisState))), [sct]);
ds.coefs = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [sct]);
ds.m = i - l;
var j;
for (j = 0; j != sct; j++) {
ds.bstates[j] = this.getState$I$I$I(n, l, j - l);
ds.coefs[j] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
}
if (arr === this.l3CubicArray ) ds.text = "4" + this.l3CubicRealText[i];
 else ds.text = "n = " + n + ", l = " + l + ", " + mtext + " = " + ds.m ;
}
var ap = 0;
for (i = 0; i != sct; i++) {
var j;
for (j = 0; j != sct; j++) {
basis.altStates[i].coefs[j].setReIm$D$D(arr[ap], arr[ap + 1]);
ap = ap+(2);
}
}
return basis;
});

Clazz.newMeth(C$, 'setupHybridBasis$DA$SA', function (arr, names) {
var sct = 4;
var basis = Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').AlternateBasis))), [this, null]);
basis.altStates = Clazz.array((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').DerivedState))), [sct]);
basis.altStateCount = sct;
var i;
for (i = 0; i != sct; i++) {
var ds = basis.altStates[i] = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').DerivedState))), [this, null]);
ds.basis = basis;
ds.count = sct;
ds.bstates = Clazz.array((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').BasisState))), [sct]);
ds.coefs = Clazz.array((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))), [sct]);
ds.text = names[i];
var j;
ds.bstates[0] = this.getState$I$I$I(2, 0, 0);
ds.coefs[0] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
for (j = 0; j != 3; j++) {
ds.bstates[j + 1] = this.getState$I$I$I(2, 1, j - 1);
ds.coefs[j + 1] = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
}
}
var ap = 0;
for (i = 0; i != sct; i++) {
var j;
for (j = 0; j != sct; j++) {
basis.altStates[i].coefs[j].setReIm$D$D(arr[ap], arr[ap + 1]);
ap = ap+(2);
}
}
return basis;
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
return mi;
});

Clazz.newMeth(C$, 'getRadioItem$S', function (s) {
var mi = Clazz.new_((I$[8]||(I$[8]=Clazz.load('javax.swing.JRadioButtonMenuItem'))).c$$S,[s]);
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
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 1, a2, 0]);
break;
case 1:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))).c$$D$D$D, [this, null, a3, 1, 0]);
break;
case 2:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 0, 1, a2]);
break;
case 3:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 0, a3, 1]);
break;
case 4:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))).c$$D$D$D, [this, null, a2, 0, 1]);
break;
case 5:
c = Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PhaseColor))).c$$D$D$D, [this, null, 1, 0, a3]);
break;
}
return c;
});

Clazz.newMeth(C$, 'setupSimpson', function () {
this.sampleCount = Integer.parseInt(this.samplesGroup.getSelection().getActionCommand());
System.out.print$S("sampleCount = " + this.sampleCount + "\n" );
this.sampleMult = Clazz.array(Integer.TYPE, [this.sampleCount]);
for (var i = 1; i < this.sampleCount; i = i+(2)) {
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

Clazz.newMeth(C$, 'setupMenus', function () {
switch (this.viewChooser.getSelectedIndex()) {
case 1:
case 0:
this.nChooser.setVisible$Z(true);
this.lChooser.setVisible$Z(true);
this.mChooser.setVisible$Z(true);
this.modeChooser.setVisible$Z(false);
this.modeChooser.select$I(0);
this.blankButton.setVisible$Z(false);
this.normalizeButton.setVisible$Z(false);
this.maximizeButton.setVisible$Z(false);
this.alwaysNormItem.setEnabled$Z(false);
break;
default:
this.nChooser.setVisible$Z(false);
this.lChooser.setVisible$Z(false);
this.mChooser.setVisible$Z(false);
this.modeChooser.setVisible$Z(true);
this.blankButton.setVisible$Z(true);
this.normalizeButton.setVisible$Z(true);
this.maximizeButton.setVisible$Z(true);
this.alwaysNormItem.setEnabled$Z(true);
break;
}
if (this.viewChooser.getSelectedIndex() == 0) this.cubicItem.setEnabled$Z(true);
 else this.cubicItem.setEnabled$Z(false);
this.validate();
});

Clazz.newMeth(C$, 'createPhasors', function () {
this.phasorCount = this.textCount = 0;
var i;
for (i = 0; i != this.basisCount; i++) this.basisList[i].active = false;

if (this.viewStates == null ) return;
var sz = (this.viewStates.height/4|0);
var x = 0;
var y = this.viewStates.y;
var n = 1;
var l = 0;
var m = 0;
this.textBoxes = Clazz.array((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').TextBox))), [10]);
switch (this.viewChooser.getSelectedIndex()) {
case 1:
case 0:
break;
case 2:
case 3:
this.phasorCount = 30;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, sz, sz]);
if (this.viewChooser.getSelectedIndex() == 2) ph.state = this.realBasis.altStates[i];
 else ph.state = this.states[i];
x = x+(sz);
if (++m > l) {
x = x+(sz);
l++;
m = -l;
if (l >= n) {
x = 0;
y = y+(sz);
n++;
l = m = 0;
}}}
break;
case 4:
this.phasorCount = 12;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
i = 0;
i = this.createBasisPhasors$I$I$I$I$I$I(x, y, sz, i, 2, 1);
this.createText$S$I$I$I("Lz", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n2l1xBasis, 3, 0);
this.createText$S$I$I$I("Lx", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n2l1yBasis, 3, 0);
this.createText$S$I$I$I("Ly", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 3, 2);
this.createText$S$I$I$I("Real (pz,px,py)", x + sz * 3, y, sz);
break;
case 5:
this.phasorCount = 12;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
i = 0;
i = this.createBasisPhasors$I$I$I$I$I$I(x, y, sz, i, 3, 1);
this.createText$S$I$I$I("Lz", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n3l1xBasis, 3, 0);
this.createText$S$I$I$I("Lx", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n3l1yBasis, 3, 0);
this.createText$S$I$I$I("Ly", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 3, 6);
this.createText$S$I$I$I("Real (pz,px,py)", x + sz * 3, y, sz);
break;
case 6:
this.phasorCount = 20;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
i = 0;
i = this.createBasisPhasors$I$I$I$I$I$I(x, y, sz, i, 3, 2);
this.createText$S$I$I$I("Lz", x + sz * 5, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n3l2xBasis, 5, 0);
this.createText$S$I$I$I("Lx", x + sz * 5, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n3l2yBasis, 5, 0);
this.createText$S$I$I$I("Ly", x + sz * 5, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 5, 9);
this.createText$S$I$I$I("Real", x + sz * 5, y, sz);
break;
case 7:
this.phasorCount = 12;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
i = 0;
i = this.createBasisPhasors$I$I$I$I$I$I(x, y, sz, i, 4, 1);
this.createText$S$I$I$I("Lz", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l1xBasis, 3, 0);
this.createText$S$I$I$I("Lx", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l1yBasis, 3, 0);
this.createText$S$I$I$I("Ly", x + sz * 3, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 3, 15);
this.createText$S$I$I$I("Real (pz,px,py)", x + sz * 3, y, sz);
break;
case 8:
this.phasorCount = 20;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
i = 0;
i = this.createBasisPhasors$I$I$I$I$I$I(x, y, sz, i, 4, 2);
this.createText$S$I$I$I("Lz", x + sz * 5, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l2xBasis, 5, 0);
this.createText$S$I$I$I("Lx", x + sz * 5, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l2yBasis, 5, 0);
this.createText$S$I$I$I("Ly", x + sz * 5, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 5, 18);
this.createText$S$I$I$I("Real", x + sz * 5, y, sz);
break;
case 9:
this.phasorCount = 35;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
sz = (this.viewStates.height/5|0);
i = 0;
i = this.createBasisPhasors$I$I$I$I$I$I(x, y, sz, i, 4, 3);
this.createText$S$I$I$I("Lz", x + sz * 7, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l3xBasis, 7, 0);
this.createText$S$I$I$I("Lx", x + sz * 7, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l3yBasis, 7, 0);
this.createText$S$I$I$I("Ly", x + sz * 7, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 7, 23);
this.createText$S$I$I$I("Real (General)", x + sz * 7, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.n4l3CubicBasis, 7, 0);
this.createText$S$I$I$I("Real (Cubic)", x + sz * 7, y, sz);
break;
case 10:
sz = (this.viewStates.height/5|0);
this.phasorCount = 20;
this.phasors = Clazz.array((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))), [this.phasorCount]);
i = 0;
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.spHybridBasis, 4, 0);
this.createText$S$I$I$I("sp", x + sz * 4, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.sp2HybridBasis, 4, 0);
this.createText$S$I$I$I("sp2", x + sz * 4, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.sp3HybridBasis, 4, 0);
this.createText$S$I$I$I("sp3", x + sz * 4, y, sz);
y = y+(sz);
this.phasors[i] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, sz, sz]);
this.phasors[i++].state = this.getState$I$I$I(2, 0, 0);
i = this.createBasisPhasors$I$I$I$I$I$I(x + sz, y, sz, i, 2, 1);
this.createText$S$I$I$I("Lz", x + sz * 4, y, sz);
y = y+(sz);
i = this.createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I(x, y, sz, i, this.realBasis, 4, 1);
this.createText$S$I$I$I("Real (s,pz,px,py)", x + sz * 4, y, sz);
break;
}
for (i = 0; i != this.phasorCount; i++) this.phasors[i].state.setBasisActive();

for (i = 0; i != this.basisCount; i++) {
if (this.basisList[i].active) {
this.basisList[i].convertBasisToDerived();
this.basisList[i].convertDerivedToBasis();
}}
if (this.viewChooser.getSelectedIndex() == 3) for (i = this.realBasis.altStateCount; i != this.stateCount; i++) this.states[i].setRe$D(0);

this.createOrbitals();
});

Clazz.newMeth(C$, 'higherStatesPresent', function () {
var i;
for (i = this.realBasis.altStateCount; i != this.stateCount; i++) if (this.states[i].mag > 0 ) return true;

return false;
});

Clazz.newMeth(C$, 'setInitialOrbital', function () {
if (this.phasorCount == 0) return;
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > 0 ) return;

for (i = 0; i != this.phasorCount; i++) if (Clazz.instanceOf(this.phasors[i].state, "com.falstad.AtomViewerFrame.BasisState")) {
this.phasors[i].state.setRe$D(1);
this.createOrbitals();
return;
}
});

Clazz.newMeth(C$, 'createBasisPhasors$I$I$I$I$I$I', function (x, y, sz, i, n, l) {
var j;
for (j = 0; j != l * 2 + 1; j++) {
var ph = this.phasors[i] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, sz, sz]);
ph.state = this.getState$I$I$I(n, l, j - l);
x = x+(sz);
i++;
}
return i;
});

Clazz.newMeth(C$, 'createAltPhasors$I$I$I$I$com_falstad_AtomViewerFrame_AlternateBasis$I$I', function (x, y, sz, i, basis, ct, offset) {
var j;
for (j = 0; j != ct; j++) {
var ph = this.phasors[i] = Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Phasor))).c$$I$I$I$I, [this, null, x, y, sz, sz]);
ph.state = basis.altStates[j + offset];
x = x+(sz);
i++;
}
return i;
});

Clazz.newMeth(C$, 'createText$S$I$I$I', function (text, x, y, sz) {
var tb = Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').TextBox))).c$$I$I$I$I$S, [this, null, x + 10, y, this.winSize.width - x, sz, text]);
this.textBoxes[this.textCount++] = tb;
});

Clazz.newMeth(C$, 'setupDisplay', function () {
if (this.winSize == null ) return;
var potsize = (this.viewPotential == null ) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null ) ? 64 : this.viewStates.height;
this.viewX = this.viewPotential = this.viewRadial = this.viewL = this.viewL2 = this.viewStates = null;
this.viewList = Clazz.array((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [10]);
var i = 0;
if (this.eCheckItem.getState()) this.viewList[i++] = this.viewPotential = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [this, null]);
if (this.xCheckItem.getState()) this.viewList[i++] = this.viewX = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [this, null]);
if (this.lCheckItem.getState()) this.viewList[i++] = this.viewL = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [this, null]);
if (this.l2CheckItem.getState()) this.viewList[i++] = this.viewL2 = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [this, null]);
if (this.rCheckItem.getState()) this.viewList[i++] = this.viewRadial = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [this, null]);
if (this.viewChooser.getSelectedIndex() > 1) this.viewList[i++] = this.viewStates = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').View))), [this, null]);
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
var npix = this.viewX.width * this.viewX.height;
this.pixels = Clazz.array(Integer.TYPE, [npix]);
for (i = 0; i != npix; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[25]||(I$[25]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.memimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}var asize = ((this.min$D$D(this.viewX.width, this.viewX.height) / 3)|0);
this.viewAxes = Clazz.new_((I$[26]||(I$[26]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[this.viewX.x + this.winSize.width - asize, this.viewX.y, asize, asize]);
this.setupMenus();
this.createPhasors();
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
System.out.print$S("setResolution " + this.dataSize + " " + this.gridSizeX + " " + this.winSize + "\n" );
this.resadj = 50.0 / this.dataSize;
this.precomputeAll();
});

Clazz.newMeth(C$, 'getN', function () {
return this.nChooser.getSelectedIndex() + 1;
});

Clazz.newMeth(C$, 'getL', function () {
return this.lChooser.getSelectedIndex();
});

Clazz.newMeth(C$, 'getM', function () {
return this.mChooser.getSelectedIndex() - this.getL();
});

Clazz.newMeth(C$, 'setNValue', function () {
var i;
var n = this.nChooser.getSelectedIndex() + 1;
var l = this.lChooser.getSelectedIndex();
this.ignoreAdjustments = true;
this.lChooser.removeAllItems();
for (i = 0; i < n; i++) this.lChooser.add$S("l = " + i + ((i < 6) ? " (" + this.codeLetter[i] + ")"  : "") );

if (l < n && l >= 0 ) this.lChooser.select$I(l);
this.ignoreAdjustments = false;
this.setLValue();
});

Clazz.newMeth(C$, 'setLValue', function () {
var l = this.getL();
var i;
this.ignoreAdjustments = true;
this.mChooser.removeAllItems();
if (this.viewChooser.getSelectedIndex() == 0) {
if (l == 0) {
this.mChooser.add$S(this.getN() + "s");
} else if (l == 1) {
for (i = 0; i != 3; i++) this.mChooser.add$S(this.getN() + this.l1RealText[i]);

} else if (l == 2) {
for (i = 0; i != 5; i++) this.mChooser.add$S(this.getN() + this.l2RealText[i]);

} else if (l == 3 && !this.cubicItem.getState() ) {
for (i = 0; i != 7; i++) this.mChooser.add$S(this.getN() + this.l3RealText[i]);

} else if (l == 3 && this.cubicItem.getState() ) {
for (i = 0; i != 7; i++) this.mChooser.add$S(this.getN() + this.l3CubicRealText[i]);

} else {
this.mChooser.add$S("m = 0");
for (i = 1; i <= l; i++) {
this.mChooser.add$S("m = +-" + i + " (+)" );
this.mChooser.add$S("m = +-" + i + " (-)" );
}
}} else {
for (i = -l; i <= l; i++) this.mChooser.add$S("m = " + i);

this.mChooser.select$I(l);
}this.validate();
this.ignoreAdjustments = false;
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
var boundRadius2 = 0;
for (i = 0; i != this.orbCount; i++) {
var oo = this.orbitals[i];
var br = oo.getBoundRadius$D(this.colorMult);
if (br > boundRadius2 ) boundRadius2 = br;
}
boundRadius2 *= boundRadius2;
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
var simpb = 0;
var a = camvx * camvx + camvy * camvy + camvz * camvz;
var b = 2 * (camvx * camx + camvy * camy + camvz * camz);
var c = camx * camx + camy * camy + camz * camz - boundRadius2;
var discrim = b * b - 4 * a * c ;
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
for (; n < maxn; n++) {
var r = Math.sqrt(xx * xx + yy * yy + zz * zz);
var costh = zz / r;
var ri = (r|0);
var costhi = ((costh * dshalf + dshalf)|0);
var fr = 0;
var fi = 0;
this.calcPhiComponent$D$D(xx, yy);
for (oi = 0; oi != this.orbCount; oi++) {
var oo = this.orbitals[oi];
oo.computePoint$I$I(ri, costhi);
fr += this.funcr;
fi += this.funci;
}
if (color) {
var fv = fr * fr + fi * fi;
if (fv > 1 ) System.out.print$S("fv = " + new Float(fv).toString() + "\n" );
fv *= this.sampleMult[n];
var col = this.getPhaseColor$D$D(fr, fi);
simpr += col.r * fv;
simpg += col.g * fv;
simpb += col.b * fv;
} else {
var fv = (fr * fr + fi * fi) * this.sampleMult[n];
simpr = simpg = (simpb += fv);
}xx += camvx;
yy += camvy;
zz += camvz;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
simpb *= pathlen / n;
this.fillSquare$I$I$F$F$F(i, j, simpr, simpg, simpb);
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
if (cr == 0  && cg == 0   && cb == 0  ) {
var y2l = y2 * this.viewX.width;
for (var k = x; k < x2; k++) for (var d = this.viewX.width, l = y * d; l < y2l; l = l+(d)) this.pixels[k + l] = -16777216;


return;
}var fm = this.max$D$D(cr, this.max$D$D(cg, cb));
if (fm > 255 ) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = -16777216 + (((cr|0)) << 16) | (((cg|0)) << 8) | (((cb|0)));
var y2l = y2 * this.viewX.width;
for (var k = x; k < x2; k++) for (var l = y * this.viewX.width; l < y2l; l = l+(this.viewX.width)) this.pixels[k + l] = colval;


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

Clazz.newMeth(C$, 'setScale', function () {
if (this.manualScale || !this.autoZoomItem.getState() ) return;
var i;
var outer = 0;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
var r = orb.getScaleRadius();
if (r > outer ) outer = r;
}
var scaleValue = ((outer * 3.15)|0);
var oldScaleValue = this.scaleBar.getValue();
if (oldScaleValue != scaleValue) {
var diff = scaleValue - oldScaleValue;
if (diff < -5 || diff > 5 ) {
diff = (diff/(3)|0);
if (diff < -50) diff = -50;
if (diff > 50) diff = 50;
}var diffd = diff * this.frameLen / 60.0;
diff = (diffd|0);
if (diff == 0) diff = (diffd > 0 ) ? 1 : -1;
var nv = oldScaleValue + diff;
if (nv > scaleValue && diff > 0 ) nv = scaleValue;
if (nv < scaleValue && diff < 0 ) nv = scaleValue;
if (!this.animatedZoomItem.getState()) nv = scaleValue;
this.ignoreAdjustments = true;
this.scaleBar.setValue$I(nv);
this.ignoreAdjustments = false;
scaleValue = nv;
this.precomputeAll();
}});

Clazz.newMeth(C$, 'precomputeAll', function () {
var i;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
orb.precompute();
}
});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'updateAtomViewer$java_awt_Graphics', function (realg) {
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
var sysTime = System.currentTimeMillis();
if (this.lastTime != 0) {
var inc = this.frameLen = ((sysTime - this.lastTime)|0);
var val = this.speedBar.getValue();
tadd = Math.exp(val * 0.04 - 9) * inc;
}this.lastTime = sysTime;
this.t += tadd;
} else {
this.lastTime = 0;
allQuiet = true;
}var norm = 0;
var normmult = 0;
var normmult2 = 0;
if (this.alwaysNormItem.getState()) this.normalize();
var i;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.mag < 0.01 ) {
st.setRe$D(0);
continue;
}if (tadd != 0 ) {
allQuiet = false;
st.rotate$D(-(st.elevel + 0.55) * tadd);
}norm += st.magSquared();
}
normmult2 = 1 / norm;
if (norm == 0 ) normmult2 = 0;
normmult = Math.sqrt(normmult2);
var skipBasis = (this.changingDerivedStates) ? (this.selectedState).basis : null;
for (i = 0; i != this.basisCount; i++) {
var basis = this.basisList[i];
if (basis !== skipBasis  && basis.active ) basis.convertBasisToDerived();
}
this.setScale();
this.setBrightness$D(normmult2);
var sliced = this.sliceChooser.getSelectedIndex() != 0;
this.zoom = (sliced) ? 8 : 16.55;
this.colorMult = Math.exp(this.brightnessBar.getValue() / 100.0);
this.computeView$D(normmult);
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color(i == this.selectedPaneHandle ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null ) {
var ymult = this.viewPotential.height * 1.9;
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).darkGray);
for (i = 1; i != 16; i++) {
var e = -1 / (2.0 * i * i );
var y = this.viewPotential.y - ((ymult * e)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}
var xp = this.getScaler();
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
var ox = -1;
var oy = -1;
var floory = this.viewPotential.y + this.viewPotential.height - 1;
for (var x = 0, w = this.winSize.width; x != w; x++) {
var xx = (x - (w/2|0)) * xp;
if (xx < 0 ) xx = -xx;
if (xx < 0.001 ) xx = 0.001;
var dy = -1 / xx;
var y = this.viewPotential.y - ((ymult * dy)|0);
if (y > floory) {
if (ox == -1) continue;
g.drawLine$I$I$I$I(ox, oy, ox, floory);
ox = -1;
continue;
}if (ox == -1 && x > 0 ) {
g.drawLine$I$I$I$I(x, floory, x, y);
ox = x;
oy = y;
continue;
}if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
if (norm != 0 ) {
var expecte = 0;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var prob = st.magSquared() * normmult2;
expecte += prob * st.elevel;
}
var y = this.viewPotential.y - ((ymult * expecte)|0);
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}if (this.selectedState != null  && !this.dragging ) {
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
var y = this.viewPotential.y - ((ymult * this.selectedState.elevel)|0);
g.drawLine$I$I$I$I(0, y, this.winSize.width, y);
}}if (this.viewL != null ) {
var maxm = 3;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata = Clazz.array(Double.TYPE, [ct]);
if (!this.higherStatesPresent()) {
this.calcLxy$DA$I$I$I$Z$Z(ldata, ct, maxm, pad, true, false);
this.drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z(g, this.viewL, 0, ldata, ct, pad, false);
this.calcLxy$DA$I$I$I$Z$Z(ldata, ct, maxm, pad, false, false);
this.drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z(g, this.viewL, 1, ldata, ct, pad, false);
}this.calcLz$DA$I$I$I$Z(ldata, ct, maxm, pad, false);
this.drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z(g, this.viewL, 2, ldata, ct, pad, false);
}if (this.viewL2 != null ) {
var maxm = 3;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata = Clazz.array(Double.TYPE, [ct]);
pad = 2;
if (!this.higherStatesPresent()) {
this.calcLxy$DA$I$I$I$Z$Z(ldata, ct, maxm, pad, true, true);
this.drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z(g, this.viewL2, 0, ldata, ct, pad, true);
this.calcLxy$DA$I$I$I$Z$Z(ldata, ct, maxm, pad, false, true);
this.drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z(g, this.viewL2, 1, ldata, ct, pad, true);
}this.calcLz$DA$I$I$I$Z(ldata, ct, maxm, pad, true);
this.drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z(g, this.viewL2, 2, ldata, ct, pad, true);
}if (this.viewRadial != null  && this.orbCount == 1 ) {
var orb = this.orbitals[0];
var n = orb.n;
var l = orb.l;
norm = orb.radialNorm$I$I(n, l);
var ct = this.viewRadial.width * 2;
var ldata = Clazz.array(Double.TYPE, [ct]);
var sr = orb.getScaleRadius() * 3;
var bestCt = ct;
var max = -1;
for (i = 0; i != ct; i++) {
var r = i * sr / ct + 1.0E-8;
var rho = 2 * r / n;
var rhol = Math.pow(rho, l) * norm;
var dr = this.hypser$I$I$D(l + 1 - n, 2 * l + 2, rho) * rhol * Math.exp(-rho / 2) * norm ;
ldata[i] = dr * dr * r * r ;
if (ldata[i] > max ) max = ldata[i];
if (ldata[i] > max * 0.01 ) bestCt = i;
}
var scaleVal = sr * bestCt / ct;
this.drawRadialFunction$java_awt_Graphics$DA$I$D(g, ldata, bestCt, scaleVal);
}if (this.imageSource != null ) this.imageSource.newPixels();
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.memimage, this.viewX.x, this.viewX.y, null);
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
if (sliced) this.drawCube$java_awt_Graphics$Z(g, false);
if (this.axesItem.getState()) this.drawAxes$java_awt_Graphics(g);
for (i = 0; i != this.textCount; i++) {
var tb = this.textBoxes[i];
var h = ((tb.height + this.fontMetrics.getAscent() - this.fontMetrics.getDescent())/2|0);
g.drawString$S$I$I(tb.text, tb.x, tb.y + h);
}
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
if (this.selectedState != null ) this.centerString$java_awt_Graphics$S$I(g, this.selectedState.getText(), this.viewX.y + this.viewX.height - 5);
 else if (this.dimensionsItem.getState()) {
var xp = this.getScaler();
var w = this.winSize.width * xp * 52.9463 ;
this.centerString$java_awt_Graphics$S$I(g, "Screen width = " + (w|0) + " pm" , this.viewX.y + this.viewX.height - 5);
}if (this.$mouseDown) this.lastXRot = this.lastYRot = 0;
 else if (this.lastXRot != 0  || this.lastYRot != 0  ) {
var ts = this.frameLen / 20.0;
this.rotate$D$D(this.lastXRot * ts, this.lastYRot * ts);
allQuiet = false;
}if (this.viewStates != null ) this.drawPhasors$java_awt_Graphics$com_falstad_AtomViewerFrame_View(g, this.viewStates);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint$J(this.pause);
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

Clazz.newMeth(C$, 'drawPhasors$java_awt_Graphics$com_falstad_AtomViewerFrame_View', function (g, v) {
var i;
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i];
var st = ph.state;
var ss = ph.width;
var ss2 = (ss/2|0);
var x = ph.x + ss2;
var y = ph.y + ss2;
var yel = (this.selectedState === st );
g.setColor$java_awt_Color(yel ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : st.mag == 0  ? this.gray2 : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(x - ss2, y - ss2, ss, ss);
var xa = ((st.re * ss2)|0);
var ya = ((-st.im * ss2)|0);
g.drawLine$I$I$I$I(x, y, x + xa, y + ya);
g.drawLine$I$I$I$I(x + xa - 1, y + ya, x + xa + 1 , y + ya);
g.drawLine$I$I$I$I(x + xa, y + ya - 1, x + xa, y + ya + 1 );
}
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_AtomViewerFrame_View$I$DA$I$I$Z', function (g, view, pos, fr, count, pad, fromZero) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var vw = (this.winSize.width/3|0);
var vw2 = (vw * 4/5|0);
var mid_x = (fromZero) ? ((vw2/(count - 1)|0)) : (vw2 * ((count/2|0))/(count - 1)|0);
var zero = mid_x;
mid_x = mid_x+(vw * pos);
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
var maxnm = Math.sqrt(maxsq);
var uncert = Math.sqrt(expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 1 / maxnm;
view.scale = bestscale;
if (view.scale > 1.0E8 ) view.scale = 1.0E8;
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(mid_x, view.y, mid_x, view.y + view.height);
var ymult2 = 0.9 * view.height;
var mid_y = view.y + (view.height/2|0) + ((ymult2|0)/2|0);
var mult = ymult2 * view.scale;
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
ox = -1;
for (i = 0; i != count; i++) {
var x = (vw2 * i/(count - 1)|0) + vw * pos;
var ii = i;
var y = mid_y - ((mult * fr[ii])|0);
if ((i % pad) == 1) {
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(x, mid_y, x, mid_y + 4);
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
}if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
if (maxsq > 0 ) {
expectx += zero + 0.5;
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I((expectx|0), view.y, (expectx|0), view.y + view.height);
}});

Clazz.newMeth(C$, 'drawRadialFunction$java_awt_Graphics$DA$I$D', function (g, fr, count, scaleVal) {
var i;
var view = this.viewRadial;
var maxsq = 0;
var tot = 0;
var vw = this.winSize.width;
var vw2 = vw;
var mid_x = (vw/2|0);
var zero = mid_x;
for (i = 0; i != count; i++) {
if (fr[i] > maxsq ) maxsq = fr[i];
}
var ox = -1;
var oy = 0;
var bestscale = 1 / maxsq;
view.scale = bestscale;
var ymult2 = 0.9 * view.height;
var mid_y = view.y + (view.height/2|0) + ((ymult2|0)/2|0);
var mult = ymult2 * view.scale;
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
ox = -1;
var midi = (count/2|0);
var a0i = 0;
for (i = 0; i != count; i++) {
var x = mid_x + (mid_x * (i - midi)/midi|0);
var y = mid_y - ((mult * fr[i])|0);
var a0 = scaleVal * i / count;
if (a0 >= a0i ) {
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(x, mid_y, x, mid_y + 4);
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
a0i++;
}if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
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
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).gray);
g.drawPolygon$IA$IA$I(this.xpoints, this.ypoints, 4);
if (slice != 0 && (i/2|0) != slice - 1 ) {
if (this.selectedSlice) g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
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
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
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
if (e.getSource() === this.blankButton ) this.doClear();
if (e.getSource() === this.normalizeButton ) this.normalize();
if (e.getSource() === this.maximizeButton ) this.maximize();
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (!this.finished || this.ignoreAdjustments ) return;
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() === this.scaleBar ) {
if (this.scaleBar.getValue() == this.scaleValue) return;
this.scaleValue = this.scaleBar.getValue();
this.precomputeAll();
this.manualScale = true;
}if (e.getSource() === this.brightnessBar ) {
var mult = Math.exp(this.brightnessBar.getValue() / 100.0);
this.userBrightMult = mult / this.bestBrightness;
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
if (this.viewX != null  && this.viewX.contains$I$I(x, y) ) {
this.selection = 2;
this.checkSlice$I$I(e.getX(), e.getY());
} else if (this.viewPotential.contains$I$I(x, y)) {
this.selection = 1;
} else if (this.viewStates != null  && this.viewStates.contains$I$I(x, y) ) this.findPhasor$com_falstad_AtomViewerFrame_View$I$I(this.viewStates, x, y);
if (oldsph != this.selectedPaneHandle || olds != this.selection  || oldss !== this.selectedState  ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'findPhasor$com_falstad_AtomViewerFrame_View$I$I', function (v, x, y) {
var i;
for (i = 0; i != this.phasorCount; i++) {
if (!this.phasors[i].contains$I$I(x, y)) continue;
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

this.selectedState.convertBasisToDerived();
this.selectedState.setRe$D(1);
this.selectedState.convertDerivedToBasis();
this.createOrbitals();
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
this.$mouseDown = true;
this.mouseMoved$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) == 0) return;
this.dragX = this.dragStartX = e.getX();
this.dragY = this.dragStartY = e.getY();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
this.$mouseDown = false;
if (this.dragging) this.cv.repaint();
this.dragging = this.changingDerivedStates = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished || this.ignoreAdjustments ) {
return;
}var c = e.getItemSelectable();
if (c === this.cubicItem ) {
this.setLValue();
this.setupDisplay();
this.orbitalChanged();
} else if (Clazz.instanceOf(c, "javax.swing.JRadioButtonMenuItem")) {
if (e.getStateChange() != 1) return;
this.setupSimpson();
this.setupDisplay();
} else if (Clazz.instanceOf(c, "a2s.CheckboxMenuItem")) {
this.setupSimpson();
this.setupDisplay();
} else if (c === this.nChooser ) {
this.setNValue();
this.orbitalChanged();
} else if (c === this.lChooser ) {
this.setLValue();
this.orbitalChanged();
} else if (c === this.mChooser ) {
this.orbitalChanged();
} else if (c === this.viewChooser ) {
this.setLValue();
this.orbitalChanged();
this.setupDisplay();
this.setInitialOrbital();
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
if (this.selectedSlice) mode = 5;
if (mode == 0) {
var xo = this.dragX - x;
var yo = this.dragY - y;
this.rotate$D$D(this.lastXRot = xo / 40.0, this.lastYRot = -yo / 40.0);
var lr = Math.sqrt(this.lastXRot * this.lastXRot + this.lastYRot * this.lastYRot);
if (lr > 0.06 ) {
lr /= 0.06;
this.lastXRot /= lr;
this.lastYRot /= lr;
}this.cv.repaint$J(this.pause);
} else if (mode == 1) {
var xo = this.dragX - x + this.dragY - y;
this.rotateXY$D$Z(xo / 40.0, true);
} else if (mode == 2) {
var xo = this.dragX - x + this.dragY - y;
this.rotateXY$D$Z(xo / 40.0, false);
} else if (mode == 3) {
var xo = this.dragX - x + this.dragY - y;
this.rotateZ$D(xo / 40.0);
} else if (mode == 5) {
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
if (Clazz.instanceOf(this.selectedState, "com.falstad.AtomViewerFrame.DerivedState")) {
this.selectedState.convertDerivedToBasis();
this.changingDerivedStates = true;
}this.cv.repaint$J(this.pause);
this.createOrbitals();
});

Clazz.newMeth(C$, 'editMagClick', function () {
if (this.selectedState == null ) return;
if (this.magDragStart < 0.5 ) this.selectedState.setReIm$D$D(1, 0);
 else this.selectedState.setRe$D(0);
this.cv.repaint$J(this.pause);
this.createOrbitals();
});

Clazz.newMeth(C$, 'calcLxy$DA$I$I$I$Z$Z', function (data, count, maxm, pad, xAxis, square) {
var i;
var mid = (count/2|0);
for (i = 0; i != count; i++) data[i] = 0;

if (square) mid = 1;
for (i = 0; i != this.basisCount; i++) {
var ab = this.basisList[i];
if (ab.n == 0 || ab.xAxis != xAxis  ) continue;
ab.convertBasisToDerived();
var j;
for (j = 0; j != ab.altStateCount; j++) {
var ds = ab.altStates[j];
if (square) data[mid + ds.m * ds.m * pad ] += ds.magSquared();
 else data[mid + ds.m * pad] += ds.magSquared();
}
}
for (i = 0; i != this.stateCount; i++) {
if (this.states[i].l == 0) data[mid] += this.states[i].magSquared();
}
for (i = 0; i != count; i++) data[i] = Math.sqrt(data[i]);

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
for (i = 0; i != count; i++) data[i] = Math.sqrt(data[i]);

});

Clazz.newMeth(C$, 'rotateXY$D$Z', function (ang, xAxis) {
var i;
for (i = 0; i != this.basisCount; i++) {
var ab = this.basisList[i];
if (ab.n == 0 || ab.xAxis != xAxis  ) continue;
ab.convertBasisToDerived();
var j;
for (j = 0; j != ab.altStateCount; j++) {
var ds = ab.altStates[j];
ds.rotate$D(ang * ds.m);
}
}
for (i = 0; i != this.stateCount; i++) {
if (this.states[i].l > 0) this.states[i].setRe$D(0);
}
for (i = 0; i != this.basisCount; i++) {
var ab = this.basisList[i];
if (ab.n == 0 || ab.xAxis != xAxis  ) continue;
ab.convertDerivedToBasis$Z(false);
}
this.createOrbitals();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'rotateZ$D', function (ang) {
var i;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i];
bs.rotate$D(ang * bs.m);
}
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'createOrbitals', function () {
var i;
var newOrbCount = 0;
var newOrbitals = false;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.m == 0) {
if (st.mag != 0 ) {
newOrbCount++;
if (st.orb == null ) newOrbitals = true;
} else if (st.orb != null ) newOrbitals = true;
} else if (st.m > 0) {
if (st.mag != 0  || this.getState$I$I$I(st.n, st.l, -st.m).mag != 0  ) {
newOrbCount++;
if (st.orb == null ) newOrbitals = true;
} else if (st.orb != null ) newOrbitals = true;
}}
if (!newOrbitals) return;
this.orbCount = newOrbCount;
this.orbitals = Clazz.array((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').Orbital))), [this.orbCount]);
var oi = 0;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if ((st.m == 0 && st.mag != 0  ) || (st.m > 0 && (st.mag != 0  || this.getState$I$I$I(st.n, st.l, -st.m).mag != 0  ) ) ) {
if (st.orb == null ) {
var orb;
if (st.l == 0) orb = Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').SOrbital))).c$$com_falstad_AtomViewerFrame_BasisState, [this, null, st]);
 else if (st.m == 0) orb = Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').MZeroOrbital))).c$$com_falstad_AtomViewerFrame_BasisState, [this, null, st]);
 else orb = Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.AtomViewerFrame').PairedOrbital))).c$$com_falstad_AtomViewerFrame_BasisState, [this, null, st]);
orb.precompute();
st.orb = orb;
}this.orbitals[oi++] = st.orb;
} else st.orb = null;
}
System.out.println$I(this.orbCount);
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
var normmult = 1 / Math.sqrt(norm);
for (i = 0; i != this.stateCount; i++) this.states[i].multRe$D(normmult);

this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'maximize', function () {
var i;
var maxm = 0;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > maxm ) maxm = this.states[i].mag;

if (maxm == 0 ) return;
for (i = 0; i != this.stateCount; i++) this.states[i].multRe$D(1 / maxm);

this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'orbitalChanged', function () {
if (this.viewChooser.getSelectedIndex() > 1) return;
this.doClear();
if (this.viewChooser.getSelectedIndex() == 0) {
var m = this.mChooser.getSelectedIndex();
if (m == 0) this.getState$I$I$I(this.getN(), this.getL(), 0).setReIm$D$D(1, 0);
 else if (this.getL() == 3 && this.cubicItem.getState() ) {
var i;
for (i = 0; i != 7; i++) {
var ar = m * 14 + i * 2;
this.getState$I$I$I(this.getN(), 3, i - 3).setReIm$D$D(this.l3CubicArray[ar], this.l3CubicArray[ar + 1]);
}
} else {
m--;
var realm = (m/2|0) + 1;
var mphase = Math.pow(-1, realm);
if ((m & 1) == 0) {
this.getState$I$I$I(this.getN(), this.getL(), realm).setRe$D(mphase * 0.7071067811865476);
this.getState$I$I$I(this.getN(), this.getL(), -realm).setRe$D(0.7071067811865476);
} else {
this.getState$I$I$I(this.getN(), this.getL(), realm).setReIm$D$D(0, -mphase * 0.7071067811865476);
this.getState$I$I$I(this.getN(), this.getL(), -realm).setReIm$D$D(0, 0.7071067811865476);
}}} else this.getState$I$I$I(this.getN(), this.getL(), this.getM()).setReIm$D$D(1, 0);
this.createOrbitals();
this.manualScale = false;
});

Clazz.newMeth(C$, 'getState$I$I$I', function (n, l, m) {
var pre_n = n - 1;
var pre_n_add = (pre_n * (pre_n + 1) * (2 * pre_n + 1) /6|0);
var pre_l_add = l * l;
return this.states[pre_n_add + pre_l_add + l + m ];
});

Clazz.newMeth(C$, 'setBrightness$D', function (normmult) {
var i;
var avg = 0;
var totn = 0;
var minavg = 1.0E30;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
var as = orb.getBrightness();
if (as < minavg ) minavg = as;
var st = orb.state;
var n = st.magSquared() * normmult;
if (orb.state.m != 0) n += this.getState$I$I$I(st.n, st.l, -st.m).magSquared() * normmult;
totn += n;
avg += n * as;
}
this.bestBrightness = 113.9 / (Math.sqrt(minavg) * totn);
var mult = this.bestBrightness * this.userBrightMult;
var bvalue = ((Math.log(mult) * 100.0)|0);
this.ignoreAdjustments = true;
this.brightnessBar.setValue$I(bvalue);
this.ignoreAdjustments = false;
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
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "Orbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.state = null;
this.n = 0;
this.l = 0;
this.m = 0;
this.reMult = 0;
this.imMult = 0;
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

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewerFrame_BasisState', function (bs) {
C$.$init$.apply(this);
this.n = bs.n;
this.l = bs.l;
this.m = bs.m;
this.state = bs;
}, 1);

Clazz.newMeth(C$, 'setupFrame$D', function (mult) {
this.reMult = (this.state.re * mult);
this.imMult = (this.state.im * mult);
});

Clazz.newMeth(C$, 'getBoundRadius$D', function (bright) {
var i;
var outer = 1;
var mpos = (this.m < 0) ? -this.m : this.m;
var norm1 = 1 / this.sphericalNorm$I$I(this.l, mpos);
norm1 *= norm1;
norm1 *= bright;
for (i = 0; i != this.b$['com.falstad.AtomViewerFrame'].dataSize; i++) {
var v = this.dataR[i] * this.dataR[i] * norm1 ;
if (v > 32 ) outer = i;
}
return outer / (this.b$['com.falstad.AtomViewerFrame'].dataSize / 2.0);
});

Clazz.newMeth(C$, 'getScaleRadius', function () {
var b0 = -this.n * this.n * 2 ;
var c0 = this.l * (this.l + 1) * this.n * this.n ;
var r0 = 0.5 * (-b0 + Math.sqrt(b0 * b0 - 4 * c0));
return r0;
});

Clazz.newMeth(C$, 'precompute', function () {
var x;
var y;
var z;
this.dshalf = (this.b$['com.falstad.AtomViewerFrame'].dataSize/2|0);
var mult = this.b$['com.falstad.AtomViewerFrame'].scaleBar.getValue() / 50.0;
var mpos = (this.m < 0) ? -this.m : this.m;
var lgcorrect = Math.pow(-1, this.m);
var norm = this.radialNorm$I$I(this.n, this.l) * this.sphericalNorm$I$I(this.l, mpos);
this.dataR = Clazz.array(Float.TYPE, [this.b$['com.falstad.AtomViewerFrame'].dataSize]);
for (x = 0; x != this.b$['com.falstad.AtomViewerFrame'].dataSize; x++) {
var r = x * this.b$['com.falstad.AtomViewerFrame'].resadj + 1.0E-8;
var rho = 2 * r * mult  / this.n;
var rhol = Math.pow(rho, this.l) * norm;
this.dataR[x] = (this.b$['com.falstad.AtomViewerFrame'].hypser$I$I$D(this.l + 1 - this.n, 2 * this.l + 2, rho) * rhol * Math.exp(-rho / 2) );
}
if (this.l > 0) {
this.dataTh = Clazz.array(Float.TYPE, [this.b$['com.falstad.AtomViewerFrame'].dataSize + 1]);
for (x = 0; x != this.b$['com.falstad.AtomViewerFrame'].dataSize + 1; x++) {
var th = (x - this.dshalf) / this.dshalf;
this.dataTh[x] = (lgcorrect * this.b$['com.falstad.AtomViewerFrame'].plgndr$I$I$D(this.l, mpos, th));
}
}if (this.m != 0) {
this.dataPhiR = Clazz.array(Float.TYPE, [8 * (this.b$['com.falstad.AtomViewerFrame'].dataSize + 1)]);
this.dataPhiI = Clazz.array(Float.TYPE, [8 * (this.b$['com.falstad.AtomViewerFrame'].dataSize + 1)]);
var ix = 0;
for (x = 0; x != 8; x++) for (y = 0; y <= this.b$['com.falstad.AtomViewerFrame'].dataSize; y++, ix++) {
var phi = x * 3.141592653589793 / 4 + y * 0.7853981633974483 / this.b$['com.falstad.AtomViewerFrame'].dataSize;
this.dataPhiR[ix] = Math.cos(phi * mpos);
this.dataPhiI[ix] = Math.sin(phi * mpos);
}

}this.brightnessCache = 0;
});

Clazz.newMeth(C$, 'getBrightness', function () {
if (this.brightnessCache != 0 ) return this.brightnessCache;
var x;
var avgsq = 0;
var vol = 0;
var mpos = (this.m < 0) ? -this.m : this.m;
var norm1 = 1 / this.sphericalNorm$I$I(this.l, mpos);
for (x = 0; x != this.b$['com.falstad.AtomViewerFrame'].dataSize; x++) {
var val = this.dataR[x] * norm1;
val *= val;
avgsq += val * val * x * x ;
vol += x * x;
}
this.brightnessCache = avgsq / vol;
return this.brightnessCache;
});

Clazz.newMeth(C$, 'radialNorm$I$I', function (n, l) {
var a0 = this.factorial$I(n + l);
return Math.sqrt(4.0 * this.factorial$I(n + l) / (n * n * n * n * this.factorial$I(n - l - 1 ) )) / this.factorial$I(2 * l + 1);
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
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "SOrbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AtomViewerFrame','com.falstad.AtomViewerFrame.Orbital']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewerFrame_BasisState', function (bs) {
C$.superclazz.c$$com_falstad_AtomViewerFrame_BasisState.apply(this, [bs]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'computePoint$I$I', function (r, costh) {
try {
var v = this.dataR[r];
this.b$['com.falstad.AtomViewerFrame'].funcr = this.reMult * v;
this.b$['com.falstad.AtomViewerFrame'].funci = this.imMult * v;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.b$['com.falstad.AtomViewerFrame'].funcr = this.b$['com.falstad.AtomViewerFrame'].funci = 0;
System.out.println$S("bad " + r + " " + costh );
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "MZeroOrbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AtomViewerFrame','com.falstad.AtomViewerFrame.Orbital']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewerFrame_BasisState', function (bs) {
C$.superclazz.c$$com_falstad_AtomViewerFrame_BasisState.apply(this, [bs]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'computePoint$I$I', function (r, costh) {
try {
var v = this.dataR[r] * this.dataTh[costh];
this.b$['com.falstad.AtomViewerFrame'].funcr = v * this.reMult;
this.b$['com.falstad.AtomViewerFrame'].funci = v * this.imMult;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.b$['com.falstad.AtomViewerFrame'].funcr = this.b$['com.falstad.AtomViewerFrame'].funci = 0;
System.out.println$S("bad " + r + " " + costh );
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "PairedOrbital", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AtomViewerFrame','com.falstad.AtomViewerFrame.Orbital']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.negstate = null;
this.f1 = 0;
this.f2 = 0;
this.f3 = 0;
this.f4 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewerFrame_BasisState', function (bs) {
C$.superclazz.c$$com_falstad_AtomViewerFrame_BasisState.apply(this, [bs]);
C$.$init$.apply(this);
this.negstate = this.b$['com.falstad.AtomViewerFrame'].getState$I$I$I(bs.n, bs.l, -bs.m);
}, 1);

Clazz.newMeth(C$, 'setupFrame$D', function (mult) {
var a = this.state.re * mult;
var b = this.state.im * mult;
var c = this.negstate.re * mult;
var d = this.negstate.im * mult;
var mphase = Math.pow(-1, this.m);
a *= mphase;
b *= mphase;
this.f1 = (a + c);
this.f2 = (d - b);
this.f3 = (b + d);
this.f4 = (a - c);
});

Clazz.newMeth(C$, 'computePoint$I$I', function (r, costh) {
try {
var q = this.dataR[r] * this.dataTh[costh];
var phiValR = this.dataPhiR[this.b$['com.falstad.AtomViewerFrame'].phiIndex];
var phiValI = this.dataPhiI[this.b$['com.falstad.AtomViewerFrame'].phiIndex];
this.b$['com.falstad.AtomViewerFrame'].funcr = q * (this.f1 * phiValR + this.f2 * phiValI);
this.b$['com.falstad.AtomViewerFrame'].funci = q * (this.f3 * phiValR + this.f4 * phiValI);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.b$['com.falstad.AtomViewerFrame'].funcr = this.b$['com.falstad.AtomViewerFrame'].funci = 0;
System.out.println$S("bad " + r + " " + costh );
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "Phasor", function(){
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
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "State", function(){
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

Clazz.newMeth(C$, 'convertDerivedToBasis', function () {
});

Clazz.newMeth(C$, 'convertBasisToDerived', function () {
});

Clazz.newMeth(C$, 'setBasisActive', function () {
});

Clazz.newMeth(C$, 'getText', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "BasisState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AtomViewerFrame','com.falstad.AtomViewerFrame.State']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.n = 0;
this.l = 0;
this.m = 0;
this.orb = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
}, 1);

Clazz.newMeth(C$, 'getText', function () {
return "n = " + this.n + ", l = " + this.l + ", m = " + this.m ;
});
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "DerivedState", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.AtomViewerFrame','com.falstad.AtomViewerFrame.State']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.count = 0;
this.m = 0;
this.basis = null;
this.text = null;
this.bstates = null;
this.coefs = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'convertDerivedToBasis', function () {
this.basis.convertDerivedToBasis();
});

Clazz.newMeth(C$, 'convertBasisToDerived', function () {
this.basis.convertBasisToDerived();
});

Clazz.newMeth(C$, 'setBasisActive', function () {
this.basis.active = true;
});

Clazz.newMeth(C$, 'getText', function () {
return this.text;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "AlternateBasis", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.altStates = null;
this.altStateCount = 0;
this.active = false;
this.n = 0;
this.l = 0;
this.xAxis = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.b$['com.falstad.AtomViewerFrame'].basisList[this.b$['com.falstad.AtomViewerFrame'].basisCount++] = this;
}, 1);

Clazz.newMeth(C$, 'convertDerivedToBasis', function () {
this.convertDerivedToBasis$Z(true);
});

Clazz.newMeth(C$, 'convertDerivedToBasis$Z', function (clear) {
var i;
var j;
if (clear) for (i = 0; i != this.b$['com.falstad.AtomViewerFrame'].stateCount; i++) this.b$['com.falstad.AtomViewerFrame'].states[i].setRe$D(0);

var c = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
for (i = 0; i != this.altStateCount; i++) {
var ds = this.altStates[i];
for (j = 0; j != ds.count; j++) {
c.set$com_falstad_Complex(ds.coefs[j]);
c.conjugate();
c.mult$com_falstad_Complex(ds);
ds.bstates[j].add$com_falstad_Complex(c);
}
}
var maxm = 0;
for (i = 0; i != this.b$['com.falstad.AtomViewerFrame'].stateCount; i++) if (this.b$['com.falstad.AtomViewerFrame'].states[i].mag > maxm ) maxm = this.b$['com.falstad.AtomViewerFrame'].states[i].mag;

if (maxm > 1 ) {
var mult = 1 / maxm;
for (i = 0; i != this.b$['com.falstad.AtomViewerFrame'].stateCount; i++) this.b$['com.falstad.AtomViewerFrame'].states[i].multRe$D(mult);

}});

Clazz.newMeth(C$, 'convertBasisToDerived', function () {
var i;
var j;
var c1 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
var c2 = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.Complex'))));
var maxm = 0;
for (i = 0; i != this.altStateCount; i++) {
var ds = this.altStates[i];
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
for (i = 0; i != this.altStateCount; i++) this.altStates[i].multRe$D(mult);

}});
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "PhaseColor", function(){
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
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "View", function(){
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

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewerFrame_View', function (v) {
C$.superclazz.c$$java_awt_Rectangle.apply(this, [v]);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.AtomViewerFrame, "TextBox", function(){
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
//Created 2017-12-17 19:28:00
