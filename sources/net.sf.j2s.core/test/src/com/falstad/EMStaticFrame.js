(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "EMStaticFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.windowWidth = 0;
this.windowHeight = 0;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.chargeRadius = 0;
this.blankButton = null;
this.stoppedCheck = null;
this.currentCheck = null;
this.equipCheck = null;
this.modeChooser = null;
this.viewChooser = null;
this.setupChooser = null;
this.accuracyChooser = null;
this.setupList = null;
this.setup = null;
this.resBar = null;
this.brightnessBar = null;
this.adjustBar = null;
this.equipBar = null;
this.adjustLabel = null;
this.grid = null;
this.solverGrids = null;
this.charges = null;
this.dragX = 0;
this.dragY = 0;
this.selectedCharge = 0;
this.dragging = false;
this.stopCalc = false;
this.dragClear = false;
this.dragSet = false;
this.objDragMap = null;
this.changedCharges = false;
this.changedConductors = false;
this.changedMagField = false;
this.t = 0;
this.pause = 0;
this.chargeCount = 0;
this.adjustSelectX1 = 0;
this.adjustSelectY1 = 0;
this.adjustSelectX2 = 0;
this.adjustSelectY2 = 0;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.main = null;
this.shown = false;
this.calculateNotice = false;
this.solveCurrent = false;
this.floatCap = 0;
this.floatCharge = 0;
this.floatExtCharge = 0;
this.linegrid = null;
this.dragObjX = 0;
this.dragObjY = 0;
this.dragBoundX1 = 0;
this.dragBoundX2 = 0;
this.dragBoundY1 = 0;
this.dragBoundY2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.chargeRadius = 1;
this.chargeCount = 0;
this.shown = false;
this.floatCharge = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "EMStatic by Paul Falstad";
});

Clazz.newMeth(C$, 'c$$com_falstad_EMStatic', function (a) {
C$.superclazz.c$$S.apply(this, ["Electrostatics Applet"]);
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
this.setupList = Clazz.new_((I$[41]||(I$[41]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[42]||(I$[42]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SingleChargeSetup))), [this, null]);
var i = 0;
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
if (i++ == 300) {
System.out.print$S("setup loop?\u000a");
break;
}}
this.charges = Clazz.array((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Charge))), [20]);
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[44]||(I$[44]=Clazz.load('com.falstad.EMStaticLayout')))));
this.cv = Clazz.new_((I$[45]||(I$[45]=Clazz.load('com.falstad.EMStaticCanvas'))).c$$com_falstad_EMStaticFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.setupChooser = Clazz.new_((I$[46]||(I$[46]=Clazz.load('a2s.Choice'))));
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setup = this.setupList.elementAt$I(0);
this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.setupChooser);
this.modeChooser = Clazz.new_((I$[46]||(I$[46]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Move Object");
this.modeChooser.add$S("Mouse = Delete Object");
this.modeChooser.add$S("Mouse = Add + Draggable Charge");
this.modeChooser.add$S("Mouse = Add - Draggable Charge");
this.modeChooser.add$S("Mouse = Clear Square");
this.modeChooser.add$S("Mouse = Add Conductor (Gnd)");
this.modeChooser.add$S("Mouse = Add + Conductor");
this.modeChooser.add$S("Mouse = Add - Conductor");
this.modeChooser.add$S("Mouse = Add + Charge Square");
this.modeChooser.add$S("Mouse = Add - Charge Square");
this.modeChooser.add$S("Mouse = Add Dielectric");
this.modeChooser.add$S("Mouse = Make Floater");
this.modeChooser.add$S("Mouse = Adjust Conductivity");
this.modeChooser.add$S("Mouse = Adjust Dielectric");
this.modeChooser.add$S("Mouse = Adjust Potential");
this.modeChooser.add$S("Mouse = Adjust Charge");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
this.modeChooser.select$I(0);
this.main.add$java_awt_Component(this.modeChooser);
this.viewChooser = Clazz.new_((I$[46]||(I$[46]=Clazz.load('a2s.Choice'))));
this.viewChooser.add$S("Show Electric Field (E)");
this.viewChooser.add$S("Show E lines");
this.viewChooser.add$S("Show Potential (Phi)");
this.viewChooser.add$S("Show Vector Potential (A)");
this.viewChooser.add$S("Show Magnetic Field (B)");
this.viewChooser.add$S("Show Current (j)");
this.viewChooser.add$S("Show Charge (rho)");
this.viewChooser.add$S("Show Displacement (D)");
this.viewChooser.add$S("Show Polarization (P)");
this.viewChooser.add$S("Show Polarization Charge");
this.viewChooser.add$S("Show Material Type");
this.viewChooser.add$S("Show rho/j");
this.viewChooser.add$S("Show E/rho");
this.viewChooser.add$S("Show E lines/rho");
this.viewChooser.add$S("Show E/j");
this.viewChooser.add$S("Show E lines/j");
this.viewChooser.add$S("Show E/rho/j");
this.viewChooser.add$S("Show E lines/rho/j");
this.viewChooser.add$S("Show E/Phi");
this.viewChooser.add$S("Show E lines/Phi");
this.viewChooser.add$S("Show E/Phi in conductors");
this.viewChooser.add$S("Show E lines/Phi in cond.");
this.viewChooser.add$S("Show E/Phi/j");
this.viewChooser.add$S("Show E lines/Phi/j");
this.viewChooser.add$S("Show B/j");
this.viewChooser.add$S("Show E/B/rho/j");
this.viewChooser.add$S("Show E lines/B/rho/j");
this.viewChooser.add$S("Show Ex");
this.viewChooser.add$S("Show Ey");
this.viewChooser.add$S("Show Dx");
this.viewChooser.add$S("Show Dy");
this.viewChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.viewChooser);
this.viewChooser.select$I(16);
this.accuracyChooser = Clazz.new_((I$[46]||(I$[46]=Clazz.load('a2s.Choice'))));
this.accuracyChooser.add$S("Low Accuracy");
this.accuracyChooser.add$S("Medium Accuracy");
this.accuracyChooser.add$S("High Accuracy");
this.accuracyChooser.add$S("Highest Accuracy");
this.accuracyChooser.select$I(2);
this.accuracyChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.accuracyChooser);
this.main.add$java_awt_Component(this.blankButton = Clazz.new_((I$[47]||(I$[47]=Clazz.load('a2s.Button'))).c$$S,["Clear All"]));
this.blankButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[48]||(I$[48]=Clazz.load('a2s.Checkbox'))).c$$S,["Stop Calculation"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.currentCheck = Clazz.new_((I$[48]||(I$[48]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Enable Current", false]);
this.currentCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.currentCheck);
this.equipCheck = Clazz.new_((I$[48]||(I$[48]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Draw Equipotentials", true]);
this.equipCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.equipCheck);
this.main.add$java_awt_Component(Clazz.new_((I$[49]||(I$[49]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]));
this.main.add$java_awt_Component(this.resBar = Clazz.new_((I$[50]||(I$[50]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 44, 4, 24, 90]));
this.resBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.setResolution();
this.main.add$java_awt_Component(Clazz.new_((I$[49]||(I$[49]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[50]||(I$[50]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 1, 2000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[49]||(I$[49]=Clazz.load('a2s.Label'))).c$$S$I,["Equipotential Count", 0]));
this.main.add$java_awt_Component(this.equipBar = Clazz.new_((I$[50]||(I$[50]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 10, 1, 2, 30]));
this.equipBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.adjustLabel = Clazz.new_((I$[49]||(I$[49]=Clazz.load('a2s.Label'))).c$$S$I,["", 0]));
this.main.add$java_awt_Component(this.adjustBar = Clazz.new_((I$[50]||(I$[50]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 0, 102]));
this.adjustBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[49]||(I$[49]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.reinit();
this.setModeChooser();
this.setup = this.setupList.elementAt$I(0);
this.cv.setBackground$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).lightGray);
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
}});

Clazz.newMeth(C$, 'reinit', function () {
this.chargeCount = 0;
this.adjustSelectX1 = -1;
this.grid = Clazz.array((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').GridElement))), [this.gridSizeX, this.gridSizeY]);
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) this.grid[i][j] = Clazz.new_((I$[52]||(I$[52]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').GridElement))), [this, null]);


this.solverGrids = Clazz.array((I$[53]||(I$[53]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverGrid))), [16]);
for (i = 0; i != 16; i++) this.solverGrids[i] = Clazz.new_((I$[53]||(I$[53]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverGrid))), [this, null]);

this.doSetup();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'doBlank', function () {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) for (y = 0; y < this.gridSizeY; y++) this.grid[x][y].clear();


this.chargeCount = 0;
this.floatCharge = 0;
this.changedCharges = this.changedConductors = true;
});

Clazz.newMeth(C$, 'doDielec$D', function (d) {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) for (y = (this.gridSizeY/2|0); y < this.gridSizeY; y++) {
this.grid[x][y].dielec = d;
}

this.changedConductors = true;
});

Clazz.newMeth(C$, 'addUniformField', function () {
this.conductFillRect$I$I$I$I$D$D(0, this.windowOffsetY, this.gridSizeX - 1, this.windowOffsetY, 1, 1);
var y = this.windowOffsetY + this.windowHeight - 1;
this.conductFillRect$I$I$I$I$D$D(0, y, this.gridSizeX - 1, y, -1, 1);
});

Clazz.newMeth(C$, 'calcExceptions', function () {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) for (y = 0; y < this.windowOffsetY; y++) {
this.copyConductor$I$I$I$I(x, y, x, this.windowOffsetY);
this.copyConductor$I$I$I$I(x, this.gridSizeY - y - 1 , x, this.windowOffsetY + this.windowHeight - 1);
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.copyConductor$I$I$I$I(x, y, this.windowOffsetX, y);
this.copyConductor$I$I$I$I(this.gridSizeX - x - 1 , y, this.windowOffsetX + this.windowWidth - 1, y);
}

for (x = 1; x != this.gridSizeX - 1; x++) for (y = 1; y != this.gridSizeY - 1; y++) {
var e1 = this.grid[x][y - 1];
var e2 = this.grid[x][y + 1];
var e3 = this.grid[x - 1][y];
var e4 = this.grid[x + 1][y];
var e0 = this.grid[x][y];
e0.boundary = (e1.dielec != e0.dielec  || e2.dielec != e0.dielec   || e3.dielec != e0.dielec   || e4.dielec != e0.dielec   || e1.conductor != e0.conductor   || e2.conductor != e0.conductor   || e3.conductor != e0.conductor   || e4.conductor != e0.conductor  );
}

});

Clazz.newMeth(C$, 'copyConductor$I$I$I$I', function (x1, y1, x2, y2) {
this.grid[x1][y1].conductor = this.grid[x2][y2].conductor;
this.grid[x1][y1].floater = ($b$[0] = this.grid[x2][y2].floater, $b$[0]);
this.grid[x1][y1].conductivity = this.grid[x2][y2].conductivity;
if (this.grid[x1][y1].conductor) this.grid[x1][y1].pot = this.grid[x2][y2].pot;
});

Clazz.newMeth(C$, 'getPanelHeight', function () {
return (this.winSize.height/3|0);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateEMStatic$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = null;
g = this.dbimage.getGraphics();
if (!this.calculateNotice && !this.stoppedCheck.getState() && !this.stopCalc && (this.changedConductors || this.changedCharges )  ) {
var fm = g.getFontMetrics();
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).black);
var cs = "Calculating...";
g.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).white);
g.drawString$S$I$I(cs, 10, this.winSize.height - 10);
this.cv.repaint$J(0);
this.calculateNotice = true;
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
return;
}this.calculateNotice = false;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
var i;
var j;
var mult = this.brightnessBar.getValue() / 5.0;
var ix = 0;
var k;
var l;
var viewScalar;
var viewVector;
var viewScalarCond;
var viewVectorCond;
viewScalar = viewScalarCond = viewVector = viewVectorCond = -1;
var v = this.viewChooser.getSelectedIndex();
var showLines = false;
var conductLines = false;
var needA = false;
switch (v) {
case 2:
case 6:
case 9:
case 10:
viewScalar = viewScalarCond = v;
break;
case 4:
case 29:
case 30:
case 27:
case 28:
viewScalar = viewScalarCond = v;
needA = true;
break;
case 0:
case 7:
case 8:
case 5:
viewVector = viewVectorCond = v;
break;
case 3:
viewVector = viewVectorCond = v;
needA = true;
break;
case 14:
viewVector = 0;
viewVectorCond = 5;
break;
case 15:
viewVectorCond = 5;
showLines = true;
break;
case 1:
showLines = conductLines = true;
break;
case 11:
viewScalar = viewScalarCond = 6;
viewVector = viewVectorCond = 5;
break;
case 12:
viewScalar = viewScalarCond = 6;
viewVector = viewVectorCond = 0;
break;
case 13:
viewScalar = viewScalarCond = 6;
showLines = conductLines = true;
break;
case 26:
viewScalar = 4;
viewScalarCond = 6;
viewVectorCond = 5;
showLines = true;
needA = true;
break;
case 18:
viewScalar = viewScalarCond = 2;
viewVector = viewVectorCond = 0;
break;
case 19:
viewScalar = viewScalarCond = 2;
showLines = conductLines = true;
break;
case 22:
viewScalar = viewScalarCond = 2;
viewVector = 0;
viewVectorCond = 5;
break;
case 23:
viewScalar = viewScalarCond = 2;
viewVectorCond = 5;
showLines = true;
break;
case 20:
viewScalar = -1;
viewScalarCond = 2;
viewVector = 0;
break;
case 21:
viewScalar = -1;
viewScalarCond = 2;
showLines = true;
break;
case 16:
viewScalar = viewScalarCond = 6;
viewVector = 0;
viewVectorCond = 5;
break;
case 17:
viewScalar = viewScalarCond = 6;
viewVectorCond = 5;
showLines = true;
break;
case 24:
viewScalar = viewScalarCond = 4;
viewVector = viewVectorCond = 5;
needA = true;
break;
case 25:
viewScalar = 4;
viewScalarCond = 6;
viewVector = 0;
viewVectorCond = 5;
needA = true;
break;
}
this.doCalc$Z(needA);
if (this.stopCalc) {
viewVector = viewVectorCond = viewScalar = -1;
if (viewScalarCond != 2) viewScalarCond = -1;
}for (j = 0; j != this.windowHeight; j++) {
ix = this.winSize.width * ((j * this.winSize.height/this.windowHeight|0));
for (i = 0; i != this.windowWidth; i++) {
var x = (i * this.winSize.width/this.windowWidth|0);
var y = (j * this.winSize.height/this.windowHeight|0);
var x2 = ((i + 1) * this.winSize.width/this.windowWidth|0);
var y2 = ((j + 1) * this.winSize.height/this.windowHeight|0);
var i2 = i + this.windowOffsetX;
var j2 = j + this.windowOffsetY;
var vs = viewScalar;
var vv = viewVector;
var col_r = 0;
var col_g = 0;
var col_b = 0;
var ge = this.grid[i2][j2];
if (ge.conductor || ge.dielec != 1   || ge.charge != 0  ) {
col_r = col_g = col_b = 64;
if (this.objDragMap != null ) {
try {
if (this.objDragMap[i2 - this.dragObjX][j2 - this.dragObjY]) {
col_r = col_g = col_b = 128;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
}if (ge.conductor) {
vv = viewVectorCond;
vs = viewScalarCond;
}}if (vs != -1) {
var dy = 0;
switch (vs) {
case 2:
dy = ge.pot * 0.2 * mult ;
break;
case 6:
dy = 0.4 * this.getCharge$I$I(i2, j2) * mult ;
break;
case 27:
dy = this.getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2]) * mult;
break;
case 28:
dy = this.getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1]) * mult;
break;
case 29:
dy = this.getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2], 0) * mult;
break;
case 30:
dy = this.getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1], 0) * mult;
break;
case 4:
var daydx = this.grid[i2 - 1][j2].ay - this.grid[i2 + 1][j2].ay;
var daxdy = this.grid[i2][j2 + 1].ax - this.grid[i2][j2 - 1].ax;
dy = (daydx + daxdy) * mult;
break;
case 9:
dy = (this.getPCharge$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2]) + this.getPCharge$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1])) * 0.4 * mult ;
vs = 6;
break;
}
if (dy < -1 ) dy = -1;
if (dy > 1 ) dy = 1;
if (vs == 10) {
var dr = 0;
var dg = 0;
var db = 0;
if (ge.conductor) {
if (ge.floater > 0) dr = db = 1;
 else dg = db = ge.conductivity;
} else if (ge.dielec != 1 ) {
dr = ge.dielec / 10;
dg = dr * 0.5;
} else if (ge.charge != 0 ) {
dy = ge.charge * mult;
if (dy < 0 ) col_b = col_b + ((-dy * (255 - col_b))|0);
 else {
col_r = col_r + ((dy * (255 - col_r))|0);
col_g = col_g + ((dy * (255 - col_g))|0);
}}col_r = col_r + ((this.clamp$D(dr) * (255 - col_r))|0);
col_g = col_g + ((this.clamp$D(dg) * (255 - col_g))|0);
col_b = col_b + ((this.clamp$D(db) * (255 - col_b))|0);
} else if (vs == 6) {
if (dy < 0 ) col_b = col_b + ((-dy * (255 - col_b))|0);
 else {
col_r = col_r + ((dy * (255 - col_r))|0);
col_g = col_g + ((dy * (255 - col_g))|0);
}} else {
if (dy < 0 ) col_r = col_r + ((-dy * (255 - col_r))|0);
 else col_g = col_g + ((dy * (255 - col_g))|0);
}}var col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
g.setColor$java_awt_Color(Clazz.new_((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).c$$I,[col]));
g.fillRect$I$I$I$I(x, y, x2 - x, y2 - y);
ge.col = col;
if (vv != -1) {
var dx = 0;
var dy = 0;
switch (vv) {
case 0:
if (!ge.boundary) {
dx = -this.grid[i2 + 1][j2].pot + this.grid[i2 - 1][j2].pot;
dy = -this.grid[i2][j2 + 1].pot + this.grid[i2][j2 - 1].pot;
} else {
dx = this.getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2]);
dy = this.getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1]);
}break;
case 7:
dx = this.getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2], 0);
dy = this.getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1], 0);
break;
case 8:
dx = this.getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2], 1);
dy = this.getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1], 1);
break;
case 5:
dx = ge.jx;
dy = ge.jy;
break;
case 3:
dx = ge.ax * 0.3;
dy = ge.ay * 0.3;
break;
}
var dn = java.lang.Math.sqrt(dx * dx + dy * dy);
if (dn > 0 ) {
dx /= dn;
dy /= dn;
}dn *= mult;
if (vv == 5) {
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_r = col_g = 255;
col_b = col_b + ((dn * (255 - col_b))|0);
} else {
col_r = col_r + ((dn * (255 - col_r))|0);
col_g = col_g + ((dn * (255 - col_g))|0);
}} else {
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + ((dn * (255 - col_r))|0);
col_b = col_b + ((dn * (255 - col_b))|0);
} else col_g = col_g + ((dn * (255 - col_g))|0);
}col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
var sw2 = ((x2 - x)/2|0);
var sh2 = ((y2 - y)/2|0);
g.setColor$java_awt_Color(Clazz.new_((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).c$$I,[col]));
var x1 = x + sw2 - ((sw2 * dx)|0);
var y1 = y + sh2 - ((sh2 * dy)|0);
x2 = x + sw2 + ((sw2 * dx)|0) ;
y2 = y + sh2 + ((sh2 * dy)|0) ;
g.drawLine$I$I$I$I(x1, y1, x2, y2);
var as = 3;
g.drawLine$I$I$I$I(x2, y2, ((dy * as - dx * as + x2)|0), ((-dx * as - dy * as + y2)|0));
g.drawLine$I$I$I$I(x2, y2, ((-dy * as - dx * as + x2)|0), ((dx * as - dy * as + y2)|0));
}}
}
if (!this.stopCalc) {
if (showLines) this.renderLines$java_awt_Graphics$Z(g, conductLines);
if (this.equipCheck.getState()) this.renderEquips$java_awt_Graphics(g);
}this.chargeRadius = (this.winSize.width * 5/(this.windowWidth * 4)|0);
for (i = 0; i < this.chargeCount; i++) {
var src = this.charges[i];
var xx = src.getScreenX();
var yy = src.getScreenY();
var rad = this.chargeRadius;
var dy = src.v * mult * 0.4 ;
if (dy < 0 ) {
var b = ((-dy * 191)|0) + 64;
if (b > 255) b = 255;
g.setColor$java_awt_Color(Clazz.new_((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).c$$I$I$I,[64, 64, b]));
} else {
var r = ((dy * 191)|0) + 64;
if (r > 255) r = 255;
g.setColor$java_awt_Color(Clazz.new_((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).c$$I$I$I,[r, r, 64]));
}g.fillOval$I$I$I$I(xx - rad, yy - rad, rad * 2, rad * 2);
if (i == this.selectedCharge) {
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).white);
g.drawOval$I$I$I$I(xx - rad, yy - rad, rad * 2, rad * 2);
}g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).black);
g.drawLine$I$I$I$I(xx - (rad/2|0), yy, xx + (rad/2|0), yy);
if (src.v > 0 ) g.drawLine$I$I$I$I(xx, yy - (rad/2|0), xx, yy + (rad/2|0));
}
if (this.adjustSelectX1 != -1) {
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).cyan);
var lx1 = ((this.adjustSelectX1 * this.winSize.width/this.windowWidth|0));
var ly1 = ((this.adjustSelectY1 * this.winSize.height/this.windowHeight|0));
var lx2 = (((this.adjustSelectX2 + 1) * this.winSize.width/this.windowWidth|0));
var ly2 = (((this.adjustSelectY2 + 1) * this.winSize.height/this.windowHeight|0));
g.drawRect$I$I$I$I(lx1, ly1, lx2 - lx1 - 1 , ly2 - ly1 - 1 );
}if (this.objDragMap != null ) {
var nf = (I$[54]||(I$[54]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(3);
var fm = g.getFontMetrics();
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).black);
var cs = "Q = " + nf.format$D(this.getSelObjCharge());
g.fillRect$I$I$I$I(0, this.winSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).white);
g.drawString$S$I$I(cs, 10, this.winSize.height - 10);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'clamp$D', function (x) {
return (x < 0 ) ? 0 : (x > 1 ) ? 1 : x;
});

Clazz.newMeth(C$, 'doCalc$Z', function (needA) {
if (this.stoppedCheck.getState() || this.stopCalc ) {
if (this.changedConductors || this.changedCharges ) {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
ge.jx = ge.jy = ge.ax = ge.ay = 0;
if (!ge.conductor) ge.pot = 0;
}

}return;
}var hasPath = false;
if (this.changedConductors) {
this.calcExceptions();
hasPath = this.findCurrentPath();
}var sg = Clazz.array((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverElement))), [this.gridSizeX, this.gridSizeY]);
var i;
var j;
if (hasPath) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j] = Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverElement))), [this, null]);
se.charge = 0;
se.boundary = true;
if (ge.currentPath) {
se.pot = (j == 0) ? 1 : (j == this.gridSizeY - 1) ? -1 : 0;
se.conductor = (j == 0 || j == this.gridSizeY - 1 );
se.ignore = false;
se.dielec = ge.conductivity;
} else {
se.ignore = true;
se.dielec = 0;
se.pot = 0;
}}

this.solveCurrent = true;
this.doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I(sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
if (ge.currentPath && i > 0  && i < this.gridSizeX - 1  && j > 0  && j < this.gridSizeY - 1 ) {
ge.pot = se.pot;
var d1 = (this.grid[i - 1][j].currentPath) ? sg[i - 1][j].pot : ge.pot;
var d2 = (this.grid[i + 1][j].currentPath) ? sg[i + 1][j].pot : ge.pot;
var d3 = (this.grid[i][j - 1].currentPath) ? sg[i][j - 1].pot : ge.pot;
var d4 = (this.grid[i][j + 1].currentPath) ? sg[i][j + 1].pot : ge.pot;
ge.jx = (d1 - ge.pot) * (this.grid[i - 1][j].conductivity) + (ge.pot - d2) * ge.conductivity;
ge.jy = (d3 - ge.pot) * (this.grid[i][j - 1].conductivity) + (ge.pot - d4) * ge.conductivity;
} else {
ge.jx = ge.jy = 0;
if (ge.conductor) ge.pot = 0;
}}

this.changedMagField = this.changedConductors = true;
} else if (this.changedConductors) {
this.changedMagField = false;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
ge.ax = ge.ay = ge.jx = ge.jy = 0;
}

}if (this.changedConductors || this.changedCharges ) {
var floater = false;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j] = Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverElement))), [this, null]);
se.dielec = ge.dielec;
if (ge.conductor) {
ge.charge = 0;
if (ge.floater > 0) {
ge.pot = 0;
floater = true;
}if (i < this.gridSizeX - 1 && !this.grid[i + 1][j].conductor ) se.dielec = this.grid[i + 1][j].dielec;
 else if (j < this.gridSizeY - 1 && !this.grid[i][j + 1].conductor ) se.dielec = this.grid[i][j + 1].dielec;
}se.charge = ge.charge;
se.ignore = false;
se.pot = ge.pot;
se.conductor = ge.conductor;
se.boundary = ge.boundary;
}

this.solveCurrent = false;
this.doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I(sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
ge.pot = se.pot;
}

if (floater) this.doFloater$com_falstad_EMStaticFrame_SolverElementAA(sg);
 else this.floatCharge = 0;
}if (this.changedMagField && needA ) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j] = Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverElement))), [this, null]);
se.charge = ge.jx * 0.01;
se.dielec = 1;
}

this.doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I(sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
ge.ax = se.pot;
se.charge = ge.jy * 0.01;
se.pot = 0;
}

this.doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I(sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
ge.ay = se.pot;
}

this.changedMagField = false;
}this.changedConductors = this.changedCharges = false;
});

Clazz.newMeth(C$, 'checkAdjConductor$I$I$java_awt_Point', function (x, y, adj) {
if (adj.x == -2) return;
if (this.grid[x][y].conductor && this.grid[x][y].floater == 0 ) {
if (adj.x >= 0 && this.grid[x][y].pot != this.grid[adj.x][adj.y].pot  ) {
adj.x = -2;
} else {
adj.x = x;
adj.y = y;
}}});

Clazz.newMeth(C$, 'doFloater$com_falstad_EMStaticFrame_SolverElementAA', function (sg) {
var i;
var j;
this.floatExtCharge = 0;
var fp1 = 0;
var adj = Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[-1, 0]);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
if (ge.floater > 0) {
fp1 = ge.pot;
this.floatExtCharge += this.getCharge$I$I(i, j);
this.checkAdjConductor$I$I$java_awt_Point(i + 1, j, adj);
this.checkAdjConductor$I$I$java_awt_Point(i - 1, j, adj);
this.checkAdjConductor$I$I$java_awt_Point(i, j + 1, adj);
this.checkAdjConductor$I$I$java_awt_Point(i, j - 1, adj);
}}

var adjPot = 0;
var isAdj = false;
if (adj.x == -2) System.out.print$S("two floating potentials!\u000a");
 else if (adj.x != -1) {
isAdj = true;
adjPot = this.grid[adj.x][adj.y].pot;
}if (this.changedConductors) {
var fp = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
se.pot = (ge.conductor && ge.floater > 0 ) ? 1 : 0;
se.charge = 0;
}

this.solveCurrent = false;
this.doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I(sg, 0, this.gridSizeX);
this.floatCap = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
var pot = ge.floatPot = se.pot;
if (ge.floater > 0) {
fp = pot;
if (!this.grid[i + 1][j].conductor) this.floatCap -= sg[i + 1][j].pot - pot;
if (!this.grid[i - 1][j].conductor) this.floatCap -= sg[i - 1][j].pot - pot;
if (!this.grid[i][j + 1].conductor) this.floatCap -= sg[i][j + 1].pot - pot;
if (!this.grid[i][j - 1].conductor) this.floatCap -= sg[i][j - 1].pot - pot;
}}

}var mult = 0;
if (isAdj) mult = adjPot;
 else mult = (this.floatCharge - this.floatExtCharge) / this.floatCap;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
ge.pot += ge.floatPot * mult;
}

if (isAdj) {
var charge2 = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
if (ge.floater > 0) charge2 += this.getCharge$I$I(i, j);
}

this.floatCharge = charge2;
}});

Clazz.newMeth(C$, 'doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I', function (g1, step, size) {
var i;
var j;
var size1 = size - 1;
if (size > 3) {
var size2 = (size/2|0) + 1;
var g2 = this.solverGrids[step].grid;
if (g2 == null ) g2 = this.solverGrids[step].grid = Clazz.array((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverElement))), [size2, size2]);
for (i = 0; i != size2; i++) for (j = 0; j != size2; j++) {
var i2 = i * 2;
var j2 = j * 2;
if (i2 >= size) i2 = size1;
if (j2 >= size) j2 = size1;
if (g2[i][j] == null ) g2[i][j] = Clazz.new_((I$[55]||(I$[55]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SolverElement))), [this, null]);
var c = g1[i2][j2].charge;
var d = g1[i2][j2].dielec;
var b = g1[i2][j2].boundary;
var ig = (g1[i2][j2].ignore) ? 1 : 0;
var sq = 1;
if (i2 < size1) {
c += g1[i2 + 1][j2].charge;
d += g1[i2 + 1][j2].dielec;
b = (b||g1[i2 + 1][j2].boundary);
ig = ig+((g1[i2 + 1][j2].ignore) ? 1 : 0);
sq++;
if (j2 < size1) {
c += g1[i2 + 1][j2 + 1].charge;
d += g1[i2 + 1][j2 + 1].dielec;
b = (b||g1[i2 + 1][j2 + 1].boundary);
ig = ig+((g1[i2 + 1][j2 + 1].ignore) ? 1 : 0);
sq++;
}}if (j2 < size1) {
c += g1[i2][j2 + 1].charge;
d += g1[i2][j2 + 1].dielec;
b = (b||g1[i2][j2 + 1].boundary);
ig = ig+((g1[i2][j2 + 1].ignore) ? 1 : 0);
sq++;
}g2[i][j].charge = c;
g2[i][j].dielec = d / sq;
g2[i][j].boundary = b;
g2[i][j].ignore = (ig == sq) ? true : false;
if (this.solveCurrent) g2[i][j].dielec = (ig == sq) ? 0 : d / (4 - ig);
var cc = 0;
var cpot = 0;
if (g1[i2][j2].conductor) {
cc++;
cpot += g1[i2][j2].pot;
}if (i2 < size1 && g1[i2 + 1][j2].conductor ) {
cc++;
cpot += g1[i2 + 1][j2].pot;
}if (j2 < size1 && g1[i2][j2 + 1].conductor ) {
cc++;
cpot += g1[i2][j2 + 1].pot;
}if (i2 < size1 && j2 < size1  && g1[i2 + 1][j2 + 1].conductor ) {
cc++;
cpot += g1[i2 + 1][j2 + 1].pot;
}if (cc > 0 && g2[i][j].charge == 0  ) {
g2[i][j].conductor = true;
g2[i][j].pot = cpot / cc;
} else {
g2[i][j].conductor = false;
g2[i][j].pot = 0;
}}

this.doSolve$com_falstad_EMStaticFrame_SolverElementAA$I$I(g2, step + 1, size2);
for (i = 1; i != size1; i++) for (j = 1; j != size1; j++) {
if (!g1[i][j].conductor) g1[i][j].pot = g2[(i/2|0)][(j/2|0)].pot;
}

}var iters = 0;
var tol = 0;
var maxiter = 200;
switch (this.accuracyChooser.getSelectedIndex()) {
case 0:
tol = 1.5000000000000001E-4;
break;
case 1:
tol = 7.500000000000001E-5;
break;
case 2:
tol = 1.5E-5;
maxiter = 400;
break;
case 3:
tol = 1.0E-7;
if (step == 0) maxiter = 20000;
 else maxiter = 1000;
break;
}
var err = 0;
if (step > 1) {
if (maxiter < 400) maxiter = 400;
tol /= 5;
}if (step == 0 && maxiter < 1000 ) tol /= 2;
while (true){
err = 0;
for (i = 1; i != size1; i++) for (j = 1; j != size1; j++) {
var ge = g1[i][j];
if (ge.conductor || ge.ignore ) continue;
var previ;
var nexti;
var prevj;
var nextj;
var np;
if (ge.boundary) {
previ = g1[i - 1][j].pot * g1[i - 1][j].dielec;
nexti = g1[i + 1][j].pot * g1[i][j].dielec;
prevj = g1[i][j - 1].pot * g1[i][j - 1].dielec;
nextj = g1[i][j + 1].pot * g1[i][j].dielec;
var div = (g1[i - 1][j].dielec + g1[i][j].dielec + g1[i][j - 1].dielec + g1[i][j].dielec );
if (this.solveCurrent) {
if (g1[i - 1][j].ignore) {
previ = 0;
div -= g1[i - 1][j].dielec;
}if (g1[i + 1][j].ignore) {
nexti = 0;
div -= g1[i][j].dielec;
}if (g1[i][j - 1].ignore) {
prevj = 0;
div -= g1[i][j - 1].dielec;
}if (g1[i][j + 1].ignore) {
nextj = 0;
div -= g1[i][j].dielec;
}}np = (nexti + previ + nextj + prevj ) / div + ge.charge / ge.dielec;
} else {
previ = g1[i - 1][j].pot;
nexti = g1[i + 1][j].pot;
prevj = g1[i][j - 1].pot;
nextj = g1[i][j + 1].pot;
np = (nexti + previ + nextj + prevj ) * 0.25 + ge.charge / ge.dielec;
}err += (np > ge.pot ) ? np - ge.pot : ge.pot - np;
ge.pot = np;
}

iters++;
if (err / (size * size) < tol  || iters == maxiter ) break;
}
});

Clazz.newMeth(C$, 'findCurrentPath', function () {
if (!this.currentCheck.getState()) return false;
var i;
var j;
for (j = 0; j != this.gridSizeY; j++) {
for (i = 0; i != this.gridSizeX; i++) {
var ge = this.grid[i][j];
ge.currentPath = false;
}
}
var returnVal = this.currentPathSearch$I$I(0, 1);
returnVal = (returnVal||this.currentPathSearch$I$I(this.gridSizeY - 1, -1));
return returnVal;
});

Clazz.newMeth(C$, 'currentPathSearch$I$I', function (y, pot) {
var i;
var stack = null;
for (i = 0; i != this.gridSizeX; i++) if (this.grid[i][y].conductor) {
if (stack == null ) stack = Clazz.new_((I$[41]||(I$[41]=Clazz.load('java.util.Vector'))));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[i, y]));
}
if (stack == null ) return false;
var returnVal = false;
while (stack.size() > 0){
var x = stack.elementAt$I(stack.size() - 1);
stack.removeElementAt$I(stack.size() - 1);
var ge = this.grid[x.x][x.y];
if (!ge.conductor || ge.currentPath ) continue;
ge.currentPath = true;
ge.pot = pot;
if (x.x > 0) stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x - 1, x.y]));
if (x.y > 0) stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x, x.y - 1]));
 else if (y != 0) returnVal = true;
if (x.x < this.gridSizeX - 1) stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x + 1, x.y]));
if (x.y < this.gridSizeY - 1) stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x, x.y + 1]));
 else if (y == 0) returnVal = true;
}
return returnVal;
});

Clazz.newMeth(C$, 'getCharge$I$I', function (x, y) {
var ge = this.grid[x][y];
var scale = 3.72;
if (!ge.conductor) return ge.charge * 3.72;
var c = ge.charge * 3.72;
c -= (this.grid[x + 1][y].pot - ge.pot) * (this.grid[x + 1][y].dielec);
c -= (this.grid[x - 1][y].pot - ge.pot) * (this.grid[x - 1][y].dielec);
c -= (this.grid[x][y + 1].pot - ge.pot) * (this.grid[x][y + 1].dielec);
c -= (this.grid[x][y - 1].pot - ge.pot) * (this.grid[x][y - 1].dielec);
return c;
});

Clazz.newMeth(C$, 'getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement', function (ge, gp, gn) {
if (ge.conductor && !gn.conductor && !gp.conductor  ) return -gn.pot + gp.pot;
if (ge.dielec != gp.dielec  || ge.conductor != gp.conductor  ) return 2 * (ge.pot - gn.pot);
if (ge.conductor != gn.conductor ) return 2 * (gp.pot - ge.pot);
return -gn.pot + gp.pot;
});

Clazz.newMeth(C$, 'getDField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D', function (ge, gp, gn, p) {
if (ge.conductor && !gn.conductor && !gp.conductor  ) return (ge.pot - gn.pot) * (ge.dielec - p) + (gp.pot - ge.pot) * (gp.dielec - p);
if (ge.dielec != gp.dielec  || ge.conductor != gp.conductor  ) return 2 * (ge.pot - gn.pot) * (ge.dielec - p) ;
if (ge.conductor != gn.conductor ) return 2 * (gp.pot - ge.pot) * (gp.dielec - p) ;
return (ge.pot - gn.pot) * (ge.dielec - p) + (gp.pot - ge.pot) * (gp.dielec - p);
});

Clazz.newMeth(C$, 'getPCharge$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement', function (ge, gp, gn) {
if (ge.dielec == gp.dielec ) return 0;
return (ge.dielec - 1) * (gn.pot - ge.pot) - (gp.dielec - 1) * (ge.pot - gp.pot);
});

Clazz.newMeth(C$, 'abs$I', function (x) {
return x < 0 ? -x : x;
});

Clazz.newMeth(C$, 'sign$I', function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
});

Clazz.newMeth(C$, 'renderLines$java_awt_Graphics$Z', function (g, inConduct) {
var x = 0;
var y = 0;
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).white);
var lspacing = 1.5;
var cgridw = ((this.windowWidth * 1.5)|0);
var cgridh = ((this.windowHeight * 1.5)|0);
if (this.linegrid == null ) this.linegrid = Clazz.array(Byte.TYPE, [cgridw + 1, cgridh + 1]);
var startx = -1;
var starty = 0;
var linemax = 0;
var mult = this.brightnessBar.getValue() / 5.0;
var doArrow = false;
var dir = 1;
var olddn = -1;
var oldcol = -1;
var gridsearchx = 0;
var gridsearchy = 0;
var i;
var j;
for (i = 0; i != cgridw; i++) for (j = 0; j != cgridh; j++) this.linegrid[i][j] = (0|0);


while (true){
if (linemax-- == 0 || x == 0  ) {
if (dir == 1) {
while (true){
if (this.linegrid[gridsearchx][gridsearchy] == 0) break;
if (++gridsearchx == cgridw) {
if (++gridsearchy == cgridh) break;
gridsearchx = 0;
}}
if (gridsearchx == cgridw && gridsearchy == cgridh ) break;
startx = gridsearchx / 1.5;
starty = gridsearchy / 1.5;
}x = startx + 0.3333333333333333;
y = starty + 0.3333333333333333;
linemax = 40;
doArrow = (dir == -1);
dir = -dir;
}if (x < 0  || y < 0   || x >= this.windowWidth   || y >= this.windowHeight  ) {
x = 0;
continue;
}var cgx = ((x * 1.5)|0);
var cgy = ((y * 1.5)|0);
if (++this.linegrid[cgx][cgy] > 2) {
x = 0;
continue;
}if (this.linegrid[cgx][cgy] == 1) doArrow = true;
var xi = this.windowOffsetX + (x|0);
var yi = this.windowOffsetY + (y|0);
var ge = this.grid[xi][yi];
if (!inConduct && ge.conductor ) {
x = 0;
continue;
}var dx;
var dy;
if (!ge.boundary) {
dx = -this.grid[xi + 1][yi].pot + this.grid[xi - 1][yi].pot;
dy = -this.grid[xi][yi + 1].pot + this.grid[xi][yi - 1].pot;
} else {
dx = this.getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[xi - 1][yi], this.grid[xi + 1][yi]);
dy = this.getEField$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, this.grid[xi][yi - 1], this.grid[xi][yi + 1]);
}var dn = java.lang.Math.sqrt(dx * dx + dy * dy);
if (dn == 0 ) {
x = 0;
continue;
}dx /= dn;
dy /= dn;
var oldx = x;
var oldy = y;
x += 0.5 * dx * dir ;
y += 0.5 * dy * dir ;
dn *= mult;
var col = this.grid[xi][yi].col;
if (dn != olddn  || col != oldcol ) {
var col_r = (col >> 16) & 255;
var col_g = (col >> 8) & 255;
var col_b = col & 255;
if (dn > 1 ) {
if (dn > 2 ) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + ((dn * (255 - col_r))|0);
col_b = col_b + ((dn * (255 - col_b))|0);
} else col_g = col_g + ((dn * (255 - col_g))|0);
col = -16777216 | (col_r << 16) | (col_g << 8) | col_b ;
g.setColor$java_awt_Color(Clazz.new_((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).c$$I,[col]));
olddn = dn;
oldcol = col;
}var lx1 = ((oldx * this.winSize.width / this.windowWidth)|0);
var ly1 = ((oldy * this.winSize.height / this.windowHeight)|0);
var lx2 = ((x * this.winSize.width / this.windowWidth)|0);
var ly2 = ((y * this.winSize.height / this.windowHeight)|0);
g.drawLine$I$I$I$I(lx1, ly1, lx2, ly2);
if (doArrow) {
doArrow = false;
if ((cgx & 3) == 0 && (cgy & 3) == 0 ) {
var as = 5;
g.drawLine$I$I$I$I(lx2, ly2, ((dy * as - dx * as + lx2)|0), ((-dx * as - dy * as + ly2)|0));
g.drawLine$I$I$I$I(lx2, ly2, ((-dy * as - dx * as + lx2)|0), ((dx * as - dy * as + ly2)|0));
}}}
});

Clazz.newMeth(C$, 'renderEquips$java_awt_Graphics', function (g) {
var x;
var y;
g.setColor$java_awt_Color((I$[51]||(I$[51]=Clazz.load('java.awt.Color'))).lightGray);
for (x = 0; x != this.windowWidth; x++) for (y = 0; y != this.windowHeight; y++) {
this.tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I(g, x, y, x + 1, y, x, y + 1, x + 1, y + 1);
this.tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I(g, x, y, x + 1, y, x, y, x, y + 1);
this.tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I(g, x, y, x + 1, y, x + 1, y, x + 1, y + 1);
this.tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I(g, x, y, x, y + 1, x + 1, y, x + 1, y + 1);
this.tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I(g, x, y, x, y + 1, x, y + 1, x + 1, y + 1);
this.tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I(g, x + 1, y, x + 1, y + 1, x, y + 1, x + 1, y + 1);
}

});

Clazz.newMeth(C$, 'interpPoint$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$I$I$I$I$D$java_awt_Point', function (ep1, ep2, x1, y1, x2, y2, pval, pos) {
var interp2 = (pval - ep1.pot) / (ep2.pot - ep1.pot);
var interp1 = 1 - interp2;
pos.x = (((x1 + 0.5) * this.winSize.width * interp1  / this.windowWidth + (x2 + 0.5) * this.winSize.width * interp2  / this.windowWidth)|0);
pos.y = (((y1 + 0.5) * this.winSize.height * interp1  / this.windowHeight + (y2 + 0.5) * this.winSize.height * interp2  / this.windowHeight)|0);
});

Clazz.newMeth(C$, 'spanning$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D', function (ep1, ep2, pval) {
if (ep1.pot == ep2.pot ) return false;
return !((ep1.pot < pval  && ep2.pot < pval  ) || (ep1.pot > pval  && ep2.pot > pval  ) );
});

Clazz.newMeth(C$, 'tryEdge$java_awt_Graphics$I$I$I$I$I$I$I$I', function (g, x1, y1, x2, y2, x3, y3, x4, y4) {
var i;
var emult = this.equipBar.getValue() * 0.1;
var mult = 1 / (this.brightnessBar.getValue() * emult * 0.1 );
var ep1 = this.grid[x1 + this.windowOffsetX][y1 + this.windowOffsetY];
var ep2 = this.grid[x2 + this.windowOffsetX][y2 + this.windowOffsetY];
var ep3 = this.grid[x3 + this.windowOffsetX][y3 + this.windowOffsetY];
var ep4 = this.grid[x4 + this.windowOffsetX][y4 + this.windowOffsetY];
var pmin = this.min$D$D(this.min$D$D(ep1.pot, ep2.pot), this.min$D$D(ep3.pot, ep4.pot));
var pmax = this.max$D$D(this.max$D$D(ep1.pot, ep2.pot), this.max$D$D(ep3.pot, ep4.pot));
var imin = ((pmin / mult)|0);
var imax = ((pmax / mult)|0);
for (i = imin; i <= imax; i++) {
var pval = i * mult;
if (!(this.spanning$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ep1, ep2, pval) && this.spanning$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$D(ep3, ep4, pval) )) continue;
var pa = Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))));
var pb = Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))));
this.interpPoint$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$I$I$I$I$D$java_awt_Point(ep1, ep2, x1, y1, x2, y2, pval, pa);
this.interpPoint$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement$I$I$I$I$D$java_awt_Point(ep3, ep4, x3, y3, x4, y4, pval, pb);
g.drawLine$I$I$I$I(pa.x, pa.y, pb.x, pb.y);
}
});

Clazz.newMeth(C$, 'dragCharge$I$I', function (x, y) {
var s = this.charges[this.selectedCharge];
if (!(x >= 0 && y >= 0  && x < this.windowWidth  && y < this.windowHeight )) return;
x = x+(this.windowOffsetX);
y = y+(this.windowOffsetY);
if (x == s.x && y == s.y ) return;
if (!this.legalChargePos$I$I$I(x, y, this.selectedCharge)) return;
var ox = s.x;
var oy = s.y;
this.grid[ox][oy].charge = 0;
s.x = x;
s.y = y;
var ge = this.grid[s.x][s.y];
ge.charge = s.v;
this.changedCharges = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'emptySquare$I$I', function (x, y) {
if (this.grid[x][y].conductor) return false;
if (this.grid[x][y].charge != 0 ) return false;
return true;
});

Clazz.newMeth(C$, 'getSelObjCharge', function () {
var x;
var y;
var c = 0;
for (x = 0; x != this.gridSizeX; x++) for (y = 0; y != this.gridSizeY; y++) {
if (this.objDragMap[x][y]) c += this.getCharge$I$I(x + this.dragObjX, y + this.dragObjY);
}

return c;
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

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
if (this.selectedCharge != -1) {
x = (x * this.windowWidth/this.winSize.width|0);
y = (y * this.windowHeight/this.winSize.height|0);
this.dragCharge$I$I(x, y);
return;
}switch (this.modeChooser.getSelectedIndex()) {
case 2:
case 3:
case 0:
case 11:
return;
}
if (this.modeChooser.getSelectedIndex() >= 12) {
var xp = (x * this.windowWidth/this.winSize.width|0);
var yp = (y * this.windowHeight/this.winSize.height|0);
if (this.adjustSelectX1 == -1) {
this.adjustSelectX1 = this.adjustSelectX2 = xp;
this.adjustSelectY1 = this.adjustSelectY2 = yp;
this.adjustBar.enable();
return;
}this.adjustSelectX1 = this.max$I$I(0, this.min$I$I(xp, this.adjustSelectX1));
this.adjustSelectX2 = this.min$I$I(this.windowWidth - 1, this.max$I$I(xp, this.adjustSelectX2));
this.adjustSelectY1 = this.max$I$I(0, this.min$I$I(yp, this.adjustSelectY1));
this.adjustSelectY2 = this.min$I$I(this.windowHeight - 1, this.max$I$I(yp, this.adjustSelectY2));
this.adjustBar.enable();
this.cv.repaint$J(this.pause);
return;
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

Clazz.newMeth(C$, 'clearFloaters', function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) this.grid[i][j].floater = ($b$[0] = 0, $b$[0]);


this.changedConductors = true;
});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var xp = (x * this.windowWidth/this.winSize.width|0) + this.windowOffsetX;
var yp = (y * this.windowHeight/this.winSize.height|0) + this.windowOffsetY;
var ge = this.grid[xp][yp];
if (!this.dragSet && !this.dragClear ) {
this.dragClear = (ge.conductor || ge.charge != 0   || ge.dielec != 1  );
this.dragSet = !this.dragClear;
}if (ge.conductor && ge.floater > 0 ) this.clearFloaters();
ge.conductor = false;
ge.jx = ge.jy = ge.charge = 0;
ge.dielec = 1;
this.stopCalc = true;
switch (this.modeChooser.getSelectedIndex()) {
case 4:
this.dragClear = true;
this.dragSet = false;
break;
case 5:
if (this.dragSet) this.addConductor$I$I$D(xp, yp, 0);
break;
case 6:
if (this.dragSet) this.addConductor$I$I$D(xp, yp, 1);
break;
case 7:
if (this.dragSet) this.addConductor$I$I$D(xp, yp, -1);
break;
case 10:
if (this.dragSet) ge.dielec = 2;
break;
case 8:
if (this.dragSet) ge.charge = 0.5;
break;
case 9:
if (this.dragSet) ge.charge = -0.5;
break;
}
this.changedCharges = this.changedConductors = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'addCharge$I$I$D', function (x, y, amt) {
if (this.chargeCount == 20) return;
if (!this.legalChargePos$I$I$I(x, y, -1)) return;
this.charges[this.chargeCount++] = Clazz.new_((I$[43]||(I$[43]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Charge))).c$$I$I$D, [this, null, x, y, amt]);
this.grid[x][y].charge = amt;
this.changedCharges = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'deleteCharge$I', function (num) {
var c = this.charges[num];
this.grid[c.x][c.y].charge = 0;
for (; num < this.chargeCount; num++) this.charges[num] = this.charges[num + 1];

this.chargeCount--;
this.changedCharges = true;
this.selectedCharge = -1;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'legalChargePos$I$I$I', function (x, y, orig) {
var s = (orig == -1) ? null : this.charges[orig];
var i;
var j;
for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
if (s != null  && s.x == x + i  && s.y == y + j ) continue;
if (!this.emptySquare$I$I(x + i, y + j)) return false;
}

for (i = 0; i != this.chargeCount; i++) {
if (i == orig) continue;
var s2 = this.charges[i];
if (this.abs$I(s2.x - x) <= 2 && this.abs$I(s2.y - y) <= 2 ) return false;
}
return true;
});

Clazz.newMeth(C$, 'selectCharge$java_awt_event_MouseEvent', function (me) {
var x = me.getX();
var y = me.getY();
var i;
var sc = this.selectedCharge;
this.selectedCharge = -1;
for (i = 0; i != this.chargeCount; i++) {
var src = this.charges[i];
var sx = src.getScreenX();
var sy = src.getScreenY();
var r2 = (sx - x) * (sx - x) + (sy - y) * (sy - y);
if (this.chargeRadius * this.chargeRadius > r2) {
this.selectedCharge = i;
break;
}}
if (sc != this.selectedCharge) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'matchElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement', function (ge1, ge2) {
if (ge1.conductor && ge2.conductor && (ge1.pot == ge2.pot  || this.currentCheck.getState() ) && ge1.floater == ge2.floater   && ge1.conductivity == ge2.conductivity  ) return true;
if (ge1.charge != 0  && ge1.charge == ge2.charge  ) return true;
if (ge1.dielec != 1  && ge1.dielec == ge2.dielec  ) return true;
return false;
});

Clazz.newMeth(C$, 'selectObject$I$I', function (xo, yo) {
this.dragObjX = this.dragObjY = 0;
var xp = (xo * this.windowWidth/this.winSize.width|0) + this.windowOffsetX;
var yp = (yo * this.windowHeight/this.winSize.height|0) + this.windowOffsetY;
var oldSel1 = this.objDragMap != null ;
var oldSel2 = oldSel1 && this.objDragMap[xp][yp] ;
var ge1 = this.grid[xp][yp];
if (!(ge1.conductor || ge1.dielec != 1   || ge1.charge != 0  )) {
this.objDragMap = null;
if (oldSel1) this.cv.repaint$J(this.pause);
return;
}if (this.objDragMap != null  && this.objDragMap[xp][yp] ) return;
this.objDragMap = Clazz.array(Boolean.TYPE, [this.gridSizeX, this.gridSizeY]);
var stack = Clazz.new_((I$[41]||(I$[41]=Clazz.load('java.util.Vector'))));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[xp, yp]));
while (stack.size() > 0){
var x = stack.elementAt$I(stack.size() - 1);
stack.removeElementAt$I(stack.size() - 1);
if (this.objDragMap[x.x][x.y]) continue;
var ge = this.grid[x.x][x.y];
if (!this.matchElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, ge1)) continue;
if (x.x == this.windowOffsetX || x.x == this.windowOffsetX + this.windowWidth - 1  || x.y == this.windowOffsetY  || x.y == this.windowOffsetY + this.windowHeight - 1 ) {
this.objDragMap = null;
if (oldSel1) this.cv.repaint$J(this.pause);
return;
}this.objDragMap[x.x][x.y] = true;
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x - 1, x.y]));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x, x.y - 1]));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x + 1, x.y]));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x, x.y + 1]));
}
this.dragBoundX1 = 1000;
this.dragBoundY1 = 1000;
this.dragBoundX2 = 0;
this.dragBoundY2 = 0;
var xi;
var yi;
for (xi = 0; xi != this.gridSizeX; xi++) for (yi = 0; yi != this.gridSizeY; yi++) {
if (!this.objDragMap[xi][yi]) continue;
if (xi < this.dragBoundX1) this.dragBoundX1 = xi;
if (yi < this.dragBoundY1) this.dragBoundY1 = yi;
if (xi > this.dragBoundX2) this.dragBoundX2 = xi;
if (yi > this.dragBoundY2) this.dragBoundY2 = yi;
}

if (!oldSel2) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'dragObject$I$I', function (xe, ye) {
var xp2 = (xe * this.windowWidth/this.winSize.width|0) + this.windowOffsetX;
var yp2 = (ye * this.windowHeight/this.winSize.height|0) + this.windowOffsetY;
var xp1 = (this.dragX * this.windowWidth/this.winSize.width|0) + this.windowOffsetX;
var yp1 = (this.dragY * this.windowHeight/this.winSize.height|0) + this.windowOffsetY;
var dx = xp2 - xp1;
var dy = yp2 - yp1;
if (dx == this.dragObjX && dy == this.dragObjY ) return;
var xi;
var yi;
if (!this.tryDrag$I$I(dx, dy)) {
for (; ; ) {
if (dx != this.dragObjX) {
dx = (dx > this.dragObjX) ? dx - 1 : dx + 1;
if (this.tryDrag$I$I(dx, dy)) break;
}if (dy != this.dragObjY) {
dy = (dy > this.dragObjY) ? dy - 1 : dy + 1;
if (this.tryDrag$I$I(dx, dy)) break;
}if (dx == this.dragObjX && dy == this.dragObjY ) return;
}
}var template = null;
for (xi = this.dragBoundX1; xi <= this.dragBoundX2; xi++) for (yi = this.dragBoundY1; yi <= this.dragBoundY2; yi++) {
var xi1 = xi + this.dragObjX;
var yi1 = yi + this.dragObjY;
if (this.objDragMap[xi][yi]) {
var ge = this.grid[xi1][yi1];
template = ge.copy();
ge.clear();
}}

for (xi = this.dragBoundX1; xi <= this.dragBoundX2; xi++) for (yi = this.dragBoundY1; yi <= this.dragBoundY2; yi++) {
var xi2 = xi + dx;
var yi2 = yi + dy;
if (this.objDragMap[xi][yi]) {
var ge = this.grid[xi2][yi2];
ge.set$com_falstad_EMStaticFrame_GridElement(template);
}}

this.dragObjX = dx;
this.dragObjY = dy;
this.changedConductors = true;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'tryDrag$I$I', function (dx, dy) {
var xi;
var yi;
if (this.dragBoundX1 + dx <= this.windowOffsetX || this.dragBoundY1 + dy <= this.windowOffsetY  || this.dragBoundX2 + dx >= this.windowOffsetX + this.windowWidth - 1  || this.dragBoundY2 + dy >= this.windowOffsetY + this.windowHeight - 1 ) return false;
for (xi = this.dragBoundX1; xi <= this.dragBoundX2; xi++) for (yi = this.dragBoundY1; yi <= this.dragBoundY2; yi++) {
var xi1 = xi + dx - this.dragObjX;
var yi1 = yi + dy - this.dragObjY;
var xi2 = xi + dx;
var yi2 = yi + dy;
try {
if (!this.objDragMap[xi1][yi1] && this.objDragMap[xi][yi] && (this.grid[xi2][yi2].conductor || this.grid[xi2][yi2].dielec != 1   || this.grid[xi2][yi2].charge != 0  )  ) return false;
if (this.objDragMap[xi][yi]) {
var i;
for (i = 0; i != this.chargeCount; i++) {
var s = this.charges[i];
if (this.abs$I(s.x - xi2) <= 1 && this.abs$I(s.y - yi2) <= 1 ) return false;
}
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
return false;
} else {
throw e;
}
}
}

return true;
});

Clazz.newMeth(C$, 'deleteObject$I$I', function (xp, yp) {
var stack = Clazz.new_((I$[41]||(I$[41]=Clazz.load('java.util.Vector'))));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[xp, yp]));
var ge1 = this.grid[xp][yp].copy();
while (stack.size() > 0){
var x = stack.elementAt$I(stack.size() - 1);
stack.removeElementAt$I(stack.size() - 1);
if (x.x < 0 || x.x >= this.gridSizeX  || x.y < 0  || x.y >= this.gridSizeY ) continue;
var ge = this.grid[x.x][x.y];
if (!this.matchElement$com_falstad_EMStaticFrame_GridElement$com_falstad_EMStaticFrame_GridElement(ge, ge1)) continue;
ge.clear();
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x - 1, x.y]));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x, x.y - 1]));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x + 1, x.y]));
stack.addElement$TE(Clazz.new_((I$[56]||(I$[56]=Clazz.load('java.awt.Point'))).c$$I$I,[x.x, x.y + 1]));
}
this.changedConductors = true;
this.cv.repaint$J(this.pause);
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
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
this.cv.repaint$J(this.pause);
if (e.getSource() === this.resBar ) {
this.setResolution();
this.reinit();
}if (e.getSource() === this.adjustBar ) this.doAdjust();
});

Clazz.newMeth(C$, 'setResolution', function () {
this.windowWidth = this.windowHeight = this.resBar.getValue() + 1;
this.windowOffsetX = this.windowOffsetY = 20;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.linegrid = null;
});

Clazz.newMeth(C$, 'setResolution$I', function (x) {
this.resBar.setValue$I(x);
this.setResolution();
this.reinit();
});

Clazz.newMeth(C$, 'doAdjust', function () {
if (this.adjustSelectX1 == -1) return;
var vali = this.adjustBar.getValue();
if (vali < 1) vali = 1;
if (vali > 99) vali = 100;
var val = vali / 100.0;
var x;
var y;
var create = true;
for (y = this.adjustSelectY1; y <= this.adjustSelectY2; y++) for (x = this.adjustSelectX1; x <= this.adjustSelectX2; x++) {
var oe = this.grid[x + this.windowOffsetX][y + this.windowOffsetY];
if (oe.conductor || oe.dielec != 1  ) create = false;
}

var adjustFloat = false;
var pot = 0;
for (y = this.adjustSelectY1; y <= this.adjustSelectY2; y++) for (x = this.adjustSelectX1; x <= this.adjustSelectX2; x++) {
var oe = this.grid[x + this.windowOffsetX][y + this.windowOffsetY];
switch (this.modeChooser.getSelectedIndex()) {
case 12:
if (oe.conductor) oe.conductivity = val;
this.changedConductors = true;
break;
case 13:
if (oe.dielec != 1  || create ) oe.dielec = (vali - 1) / 10.0 + 1.1;
this.changedConductors = true;
break;
case 15:
if (vali <= 1) val = 0;
if (vali == 50) val = 0.51;
if (oe.charge != 0 ) oe.charge = val * 2 - 1;
this.changedConductors = true;
break;
case 14:
if (vali <= 1) val = 0;
pot = val * 2 - 1;
if (create) this.addConductor$I$I(x + this.windowOffsetX, y + this.windowOffsetY);
if (oe.conductor) {
if (oe.floater > 0) adjustFloat = true;
 else {
oe.pot = pot;
this.changedConductors = true;
}}break;
}
}

if (adjustFloat) {
this.floatCharge = this.floatExtCharge + this.floatCap * pot;
this.changedCharges = true;
}this.cv.repaint$J(this.pause);
if (this.modeChooser.getSelectedIndex() == 15) {
var i;
for (i = 0; i != this.chargeCount; i++) {
var src = this.charges[i];
src.v = this.grid[src.x][src.y].charge;
}
}});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
if (this.objDragMap != null  && this.modeChooser.getSelectedIndex() == 0 ) this.dragObject$I$I(e.getX(), e.getY());
 else this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'processMouseMotion$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var panelHeight = this.getPanelHeight();
this.selectCharge$java_awt_event_MouseEvent(e);
var md = this.modeChooser.getSelectedIndex();
if ((md == 0 || md == 1  || md == 11 ) && this.selectedCharge == -1 ) this.selectObject$I$I(x, y);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
this.adjustSelectX1 = -1;
this.adjustBar.disable();
var xp = (e.getX() * this.windowWidth/this.winSize.width|0) + this.windowOffsetX;
var yp = (e.getY() * this.windowHeight/this.winSize.height|0) + this.windowOffsetY;
switch (this.modeChooser.getSelectedIndex()) {
case 2:
if (this.selectedCharge == -1) this.addCharge$I$I$D(xp, yp, 0.5);
break;
case 3:
if (this.selectedCharge == -1) this.addCharge$I$I$D(xp, yp, -0.5);
break;
case 0:
this.dragging = true;
break;
case 11:
if (this.objDragMap != null ) {
this.clearFloaters();
var i;
var j;
var ch = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) if (this.objDragMap[i][j]) {
this.grid[i][j].floater = ($b$[0] = 1, $b$[0]);
ch += this.getCharge$I$I(i, j);
}

this.floatCharge = ch;
this.changedConductors = true;
this.cv.repaint$J(this.pause);
}break;
case 1:
if (this.selectedCharge != -1) this.deleteCharge$I(this.selectedCharge);
 else this.deleteObject$I$I(xp, yp);
break;
default:
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
break;
}
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = this.dragSet = this.dragClear = this.stopCalc = false;
if (this.objDragMap != null ) {
this.objDragMap = null;
this.selectObject$I$I(e.getX(), e.getY());
}this.cv.repaint();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
this.cv.repaint$J(this.pause);
this.deselectAll();
if (e.getItemSelectable() === this.setupChooser ) this.doSetup();
if (e.getItemSelectable() === this.modeChooser ) this.setModeChooser();
if (e.getItemSelectable() === this.accuracyChooser  || e.getItemSelectable() === this.currentCheck  ) this.changedConductors = true;
});

Clazz.newMeth(C$, 'deselectAll', function () {
this.objDragMap = null;
this.selectedCharge = -1;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'setModeChooser', function () {
if (this.modeChooser.getSelectedIndex() < 12) {
this.adjustLabel.hide();
this.adjustBar.hide();
this.validate();
this.adjustSelectX1 = -1;
return;
}switch (this.modeChooser.getSelectedIndex()) {
case 12:
this.adjustLabel.setText$S("Conductivity");
break;
case 13:
this.adjustLabel.setText$S("Dielectric Constant");
break;
case 14:
this.adjustLabel.setText$S("Potential");
break;
case 15:
this.adjustLabel.setText$S("Charge");
break;
}
this.adjustLabel.show();
this.adjustBar.show();
if (this.adjustSelectX1 == -1) this.adjustBar.disable();
 else this.adjustBar.enable();
this.validate();
});

Clazz.newMeth(C$, 'doSetup', function () {
this.t = 0;
this.doBlank();
this.currentCheck.setState$Z(false);
this.brightnessBar.setValue$I(90);
this.modeChooser.select$I(0);
this.setModeChooser();
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.setup.select();
});

Clazz.newMeth(C$, 'doCylinder$D$I', function (p, floater) {
var x = (this.gridSizeX/2|0);
var y = (this.gridSizeY/2|0);
var r = 8;
var n;
for (n = -r + 1; n < r; n++) {
var a = (java.lang.Math.sqrt(r * r - n * n - 0.01)|0);
var a2;
for (a2 = -a; a2 != a; a2++) {
this.addConductor$I$I$D(x + n, y + a2, p);
this.grid[x + n][y + a2].floater = ($b$[0] = (floater|0), $b$[0]);
}
}
});

Clazz.newMeth(C$, 'doCylinderHollow$D$I', function (p, floater) {
var x = (this.gridSizeX/2|0);
var y = (this.gridSizeY/2|0);
var r = 12;
var n;
for (n = -r + 1; n < r; n++) {
var a = (java.lang.Math.sqrt(r * r - n * n - 0.01)|0);
var a2;
for (a2 = -a; a2 != a; a2++) {
if (Math.sqrt(n * n + a2 * a2) < 9 ) continue;
this.addConductor$I$I$D(x + n, y + a2, p);
this.grid[x + n][y + a2].floater = ($b$[0] = (floater|0), $b$[0]);
}
}
});

Clazz.newMeth(C$, 'doCylinderCharge$D$I$I', function (p, r, xo) {
var x = (this.gridSizeX/2|0);
var y = (this.gridSizeY/2|0);
var n;
for (n = -r + 1; n < r; n++) {
var a = (java.lang.Math.sqrt(r * r - n * n - 0.01)|0);
var a2;
for (a2 = -a; a2 != a; a2++) this.grid[x + n + xo ][y + a2].charge += p;

}
});

Clazz.newMeth(C$, 'doDielecCylinder', function () {
var x = (this.gridSizeX/2|0);
var y = (this.gridSizeY/2|0);
var r = 8;
var n;
for (n = -r + 1; n < r; n++) {
var a = (java.lang.Math.sqrt(r * r - n * n - 0.01)|0);
var a2;
for (a2 = -a; a2 != a; a2++) this.grid[x + n][y + a2].dielec = 5;

}
});

Clazz.newMeth(C$, 'addConductor$I$I', function (x, y) {
this.addConductor$I$I$D$D(x, y, 0, 1);
});

Clazz.newMeth(C$, 'addConductor$I$I$D', function (x, y, p) {
this.addConductor$I$I$D$D(x, y, p, 1);
});

Clazz.newMeth(C$, 'addConductor$I$I$D$D', function (x, y, p, cv) {
var ge = this.grid[x][y];
ge.conductor = true;
ge.pot = p;
ge.conductivity = cv;
ge.floater = ($b$[0] = 0, $b$[0]);
});

Clazz.newMeth(C$, 'conductFillRect$I$I$I$I$D$D', function (x, y, x2, y2, p, cv) {
var i;
var j;
for (i = x; i <= x2; i++) for (j = y; j <= y2; j++) this.addConductor$I$I$D$D(i, j, p, cv);


});

Clazz.newMeth(C$, 'conductDrawRect$I$I$I$I$D$D', function (x, y, x2, y2, p, cv) {
var i;
var j;
for (i = x; i <= x2; i++) {
this.addConductor$I$I$D$D(i, y, p, cv);
this.addConductor$I$I$D$D(i, y2, p, cv);
}
for (j = y; j <= y2; j++) {
this.addConductor$I$I$D$D(x, j, p, cv);
this.addConductor$I$I$D$D(x2, j, p, cv);
}
});
var $b$ = new Int8Array(1);
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Charge", function(){
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

Clazz.newMeth(C$, 'c$$I$I$D', function (xx, yy, vv) {
C$.$init$.apply(this);
this.x = xx;
this.y = yy;
this.v = vv;
}, 1);

Clazz.newMeth(C$, 'getScreenX', function () {
return (((this.x - this.b$['com.falstad.EMStaticFrame'].windowOffsetX) * this.b$['com.falstad.EMStaticFrame'].winSize.width + (this.b$['com.falstad.EMStaticFrame'].winSize.width/2|0))/this.b$['com.falstad.EMStaticFrame'].windowWidth|0);
});

Clazz.newMeth(C$, 'getScreenY', function () {
return (((this.y - this.b$['com.falstad.EMStaticFrame'].windowOffsetY) * this.b$['com.falstad.EMStaticFrame'].winSize.height + (this.b$['com.falstad.EMStaticFrame'].winSize.height/2|0))/this.b$['com.falstad.EMStaticFrame'].windowHeight|0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "GridElement", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pot = 0;
this.jx = 0;
this.jy = 0;
this.ax = 0;
this.ay = 0;
this.dielec = 0;
this.conductivity = 0;
this.charge = 0;
this.floatPot = 0;
this.col = 0;
this.conductor = false;
this.boundary = false;
this.currentPath = false;
this.floater = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'clear', function () {
this.pot = this.charge = 0;
this.dielec = this.conductivity = 1;
this.conductor = false;
this.floater = ($b$[0] = 0, $b$[0]);
});

Clazz.newMeth(C$, 'copy', function () {
var ge = Clazz.new_(C$, [this, null]);
ge.pot = this.pot;
ge.dielec = this.dielec;
ge.conductivity = this.conductivity;
ge.conductor = this.conductor;
ge.charge = this.charge;
ge.floater = ($b$[0] = this.floater, $b$[0]);
return ge;
});

Clazz.newMeth(C$, 'set$com_falstad_EMStaticFrame_GridElement', function (ge) {
this.pot = ge.pot;
this.dielec = ge.dielec;
this.conductivity = ge.conductivity;
this.conductor = ge.conductor;
this.charge = ge.charge;
this.floater = ($b$[0] = ge.floater, $b$[0]);
});
var $b$ = new Int8Array(1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "SolverElement", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.charge = 0;
this.dielec = 0;
this.pot = 0;
this.conductor = false;
this.boundary = false;
this.ignore = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "SolverGrid", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.grid = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'deselect', function () {
});

Clazz.newMeth(C$, 'valueChanged$a2s_Scrollbar', function (s) {
});

Clazz.newMeth(C$, 'doStep', function () {
});

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "SingleChargeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Single Charge";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DoubleChargeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DoubleChargeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Double Charge";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y - 6, 0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y + 6, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DipoleChargeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DipoleChargeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dipole Charge";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y - 5, 0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y + 5, -0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ChargePlaneSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ChargePlaneSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Charge + Plane";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y - 5, 0.5);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(this.b$['com.falstad.EMStaticFrame'].windowOffsetX + 1, y, this.b$['com.falstad.EMStaticFrame'].windowOffsetX + this.b$['com.falstad.EMStaticFrame'].windowWidth - 2, y + 2, 0, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DipoleUniformSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DipoleUniformSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dipole + Uniform";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y - 4, 0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y + 4, -0.5);
this.b$['com.falstad.EMStaticFrame'].addUniformField();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').QuadChargeSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "QuadChargeSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Quadrupole Charge";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x + 4, y - 4, 0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x + 4, y + 4, -0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x - 4, y - 4, -0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x - 4, y + 4, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ConductingPlanesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ConductingPlanesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Conducting Planes";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var sep = 4;
var w = (this.b$['com.falstad.EMStaticFrame'].windowWidth * 2/6|0);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - w, y - sep - 2 , x + w, y - sep, 1, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - w, y + sep, x + w, y + sep + 2 , -1, 1);
this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ChargedPlanesSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ChargedPlanesSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Charged Planes";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var sep = 4;
var w = (this.b$['com.falstad.EMStaticFrame'].windowWidth * 2/6|0);
var n;
var i;
var c = 1.0 / (w * 3);
for (i = 0; i != 3; i++) for (n = -w; n <= w; n++) {
this.b$['com.falstad.EMStaticFrame'].grid[x + n][y - sep - i ].charge = c;
this.b$['com.falstad.EMStaticFrame'].grid[x + n][y + sep + i ].charge = -c;
}

this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(35);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ConductingCylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ConductingCylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Conducting Cylinder";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinder$D$I(1, 0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').GroundedCylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "GroundedCylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Grounded Cyl + Charge";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinder$D$I(0, 0);
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var r = 7;
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x, y + r * 2, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').GroundedCylinderUniformSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "GroundedCylinderUniformSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Grounded Cyl + Field";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinder$D$I(0, 0);
this.b$['com.falstad.EMStaticFrame'].addUniformField();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ChargedCylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ChargedCylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Charged Cylinder";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinderCharge$D$I$I(0.005, 10, 0);
this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(50);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ChargedHollowCylinder1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ChargedHollowCylinder1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Charged Hollow Cyl 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinderCharge$D$I$I(0.005, 10, 0);
this.b$['com.falstad.EMStaticFrame'].doCylinderCharge$D$I$I(-0.005, 5, 0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ChargedHollowCylinder2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ChargedHollowCylinder2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Charged Hollow Cyl 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinderCharge$D$I$I(0.005, 10, 0);
this.b$['com.falstad.EMStaticFrame'].doCylinderCharge$D$I$I(-0.005, 5, 2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').FloatingCylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "FloatingCylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Floating Cyl + Charge";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinder$D$I(1, 1);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + 7, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 7, 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').FloatingCylinder2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "FloatingCylinder2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Floating Cyl + Plates";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinder$D$I(1, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - (this.b$['com.falstad.EMStaticFrame'].windowWidth/3|0), this.b$['com.falstad.EMStaticFrame'].windowOffsetY, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + (this.b$['com.falstad.EMStaticFrame'].windowWidth/3|0), this.b$['com.falstad.EMStaticFrame'].windowOffsetY + 2, 1, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - (this.b$['com.falstad.EMStaticFrame'].windowWidth/3|0), this.b$['com.falstad.EMStaticFrame'].windowOffsetY + this.b$['com.falstad.EMStaticFrame'].windowHeight - 3, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + (this.b$['com.falstad.EMStaticFrame'].windowWidth/3|0), this.b$['com.falstad.EMStaticFrame'].windowOffsetY + this.b$['com.falstad.EMStaticFrame'].windowHeight - 1, -1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ConductingBoxSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ConductingBoxSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Conducting Box";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var d = (this.b$['com.falstad.EMStaticFrame'].windowWidth/5|0);
for (i = d - 2; i <= d; i++) this.b$['com.falstad.EMStaticFrame'].conductDrawRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + i, 1, 1);

});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').HollowFloatingCylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "HollowFloatingCylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Floating Hollow Cyl";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinderHollow$D$I(0, 1);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + 6, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0), 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').HollowFloatingCylinder2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "HollowFloatingCylinder2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Floating Hollow Cyl 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doCylinderHollow$D$I(0, 1);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - 3, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0), 0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + 3, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0), -0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SharpPointSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "SharpPointSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Sharp Point";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + 1, this.b$['com.falstad.EMStaticFrame'].gridSizeY - 1, 1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').CornerSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "CornerSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Corner";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + 1, this.b$['com.falstad.EMStaticFrame'].gridSizeY - 1, 1, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 1, this.b$['com.falstad.EMStaticFrame'].gridSizeX - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 1, 1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Angle45Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Angle45Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "45 Degrees";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var d = 4;
for (i = -1; i != (this.b$['com.falstad.EMStaticFrame'].windowWidth/2|0) + d * 2; i++) this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i - d - 2, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i - d + 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d - i, 1, 1);

this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - d, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 1 + d, this.b$['com.falstad.EMStaticFrame'].gridSizeX - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 1 + d, 1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Angle135Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Angle135Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "135 Degrees";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var d = 0;
for (i = -1; i != (this.b$['com.falstad.EMStaticFrame'].windowWidth/2|0) + 2; i++) this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i - d - 2, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i - d + 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d - i, 1, 1);

this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(0, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 1 + d, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - d, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 1 + d, 1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DielectricCylinderSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DielectricCylinderSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric Cylinder";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doDielecCylinder();
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var r = 8;
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x + (r * 3/2|0), y + (r * 3/2|0), 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DielectricCylinderFieldSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DielectricCylinderFieldSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric Cyl + Field";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doDielecCylinder();
this.b$['com.falstad.EMStaticFrame'].addUniformField();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Dielectric1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Dielectric1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric 1";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doDielec$D(6);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 5, 0.5);
this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(250);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Dielectric2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Dielectric2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric 2";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doDielec$D(6);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 5, 0.5);
this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(250);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[28]||(I$[28]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DielectricDipoleSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DielectricDipoleSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric + Dipole";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.EMStaticFrame'].doDielec$D(3);
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x + 8, y - 4, 0.5);
this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D(x - 8, y + 4, -0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[29]||(I$[29]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').DielecCapSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "DielecCapSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Dielectric Capacitor";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var sep = 2;
var w = (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - w, y - sep - 2 , x + w, y - sep, 1, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - w, y + sep, x + w, y + sep + 2 , -1, 1);
var i;
var j;
for (i = -w + 2; i <= w - 2; i++) for (j = -sep + 1; j < sep; j++) this.b$['com.falstad.EMStaticFrame'].grid[x + i][y + j].dielec = 5;


this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(12);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ConductingPlanesGapSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ConductingPlanesGapSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Conducting Planes w/ Gap";
});

Clazz.newMeth(C$, 'select', function () {
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var d = 4;
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(0, y - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - d - 1, y + 1, 1, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + d, y - 1, this.b$['com.falstad.EMStaticFrame'].gridSizeX - 1, y + 1, -1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').SlottedConductingPlaneSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "SlottedConductingPlaneSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Slotted Conducting Plane";
});

Clazz.newMeth(C$, 'select', function () {
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var d = 4;
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(0, y - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - d - 1, y + 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + d, y - 1, this.b$['com.falstad.EMStaticFrame'].gridSizeX - 1, y + 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(0, this.b$['com.falstad.EMStaticFrame'].windowOffsetY, this.b$['com.falstad.EMStaticFrame'].gridSizeX - 1, this.b$['com.falstad.EMStaticFrame'].windowOffsetY, 1, 1);
this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(960);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[32]||(I$[32]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Shielding1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Shielding1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Shielding 1";
});

Clazz.newMeth(C$, 'select', function () {
var i;
for (i = 6; i <= 8; i++) this.b$['com.falstad.EMStaticFrame'].conductDrawRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + i, 0, 1);

this.b$['com.falstad.EMStaticFrame'].addUniformField();
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[33]||(I$[33]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Shielding2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Shielding2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Shielding 2";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var s1 = (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0);
var s2 = s1 + 2;
for (i = s1; i <= s2; i++) this.b$['com.falstad.EMStaticFrame'].conductDrawRect$I$I$I$I$D$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - i, (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) + i, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + i, 0, 1);

this.b$['com.falstad.EMStaticFrame'].addCharge$I$I$D((this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0), 0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[34]||(I$[34]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').BoxOneSideSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "BoxOneSideSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Box w/ One Live Side";
});

Clazz.newMeth(C$, 'select', function () {
var i;
var s1 = (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0);
var s2 = s1 + 2;
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
for (i = s1; i <= s2; i++) {
this.b$['com.falstad.EMStaticFrame'].conductDrawRect$I$I$I$I$D$D(x - i, y - i, x + i, y + i, 0, 1);
this.b$['com.falstad.EMStaticFrame'].grid[x - s1 + 1][y - i].conductor = false;
this.b$['com.falstad.EMStaticFrame'].grid[x + s1 - 1][y - i].conductor = false;
}
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - s1 + 2, y - s2, x + s1 - 2, y - s1, 1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[35]||(I$[35]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').QuadrupoleLensSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "QuadrupoleLensSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Quadrupole Lens";
});

Clazz.newMeth(C$, 'select', function () {
var x;
var w = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0) - 1;
var h = (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0);
var cx = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var cy = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
for (x = -w; x <= w; x++) {
var yd = (java.lang.Math.sqrt(x * x + h * h)|0);
var y;
for (y = yd; y <= w; y++) {
this.b$['com.falstad.EMStaticFrame'].addConductor$I$I$D(cx + x, cy + y, -1);
this.b$['com.falstad.EMStaticFrame'].addConductor$I$I$D(cx + x, cy - y, -1);
this.b$['com.falstad.EMStaticFrame'].addConductor$I$I$D(cx + y, cy + x, 1);
this.b$['com.falstad.EMStaticFrame'].addConductor$I$I$D(cx - y, cy + x, 1);
}
}
this.b$['com.falstad.EMStaticFrame'].brightnessBar.setValue$I(24);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ConductingWireSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ConductingWireSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Wire w/ Current";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var d = 8;
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (d/2|0), 0, x + (d/2|0), this.b$['com.falstad.EMStaticFrame'].gridSizeY - 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].currentCheck.setState$Z(true);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[37]||(I$[37]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ResistorSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ResistorSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resistor";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var d = 8;
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (d/2|0), 0, x + (d/2|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 6, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (d/2|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 6, x + (d/2|0), this.b$['com.falstad.EMStaticFrame'].gridSizeY - 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (d/2|0) + 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - 5, x + (d/2|0) - 1, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + 5, 0, 0.1);
this.b$['com.falstad.EMStaticFrame'].currentCheck.setState$Z(true);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[38]||(I$[38]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').ResistorsParallelSetup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "ResistorsParallelSetup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Resistors in Parallel";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var d = 8;
var i;
var j;
var d2 = (d/2|0);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - d2, 0, x + d2, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d2 - 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - d2, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d2 + 1, x + d2, this.b$['com.falstad.EMStaticFrame'].gridSizeY - 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d, x + (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d2 - 1, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d2 + 1, x + (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d2, x - (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0) + 4, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d2, 0, 0.6);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x + (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0) - 4, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d2, x + (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0), (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d2, 0, 0.1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - 2, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d2, x + 2, (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d2, 0, 0.04);
this.b$['com.falstad.EMStaticFrame'].currentCheck.setState$Z(true);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[39]||(I$[39]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Current2D1Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Current2D1Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Current in 2D 1";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var y = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0);
var d = (this.b$['com.falstad.EMStaticFrame'].windowWidth/3|0);
var i;
var j;
var d2 = 4;
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - d, y - d, x + d, y + d, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x - d, 0, x - d + d2, y, 0, 1);
this.b$['com.falstad.EMStaticFrame'].conductFillRect$I$I$I$I$D$D(x + d - d2, 0, x + d, this.b$['com.falstad.EMStaticFrame'].gridSizeY - 1, 0, 1);
for (i = -3; i <= 3; i++) for (j = -3; j <= 3; j++) this.b$['com.falstad.EMStaticFrame'].grid[x + i][y + j].conductor = false;


this.b$['com.falstad.EMStaticFrame'].currentCheck.setState$Z(true);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[40]||(I$[40]=Clazz.load(Clazz.load('com.falstad.EMStaticFrame').Current2D2Setup))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.EMStaticFrame, "Current2D2Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.EMStaticFrame','com.falstad.EMStaticFrame.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Current in 2D 2";
});

Clazz.newMeth(C$, 'select', function () {
var x = (this.b$['com.falstad.EMStaticFrame'].gridSizeX/2|0);
var d = 8;
var i;
var j;
for (i = 0; i != d; i++) for (j = 0; j != this.b$['com.falstad.EMStaticFrame'].gridSizeY; j++) this.b$['com.falstad.EMStaticFrame'].addConductor$I$I(x + i - (d/2|0), j);


for (i = (-this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0); i < (this.b$['com.falstad.EMStaticFrame'].windowWidth/4|0); i++) for (j = (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) - d; j <= (this.b$['com.falstad.EMStaticFrame'].gridSizeY/2|0) + d; j++) this.b$['com.falstad.EMStaticFrame'].addConductor$I$I(x + i, j);


this.b$['com.falstad.EMStaticFrame'].currentCheck.setState$Z(true);
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:03
