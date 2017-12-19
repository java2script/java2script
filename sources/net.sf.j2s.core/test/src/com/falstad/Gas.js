(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "Gas", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Applet', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.ItemListener']);
C$.gridEltWidth = 0;
C$.gridEltHeight = 0;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.gridEltWidth = 10;
C$.gridEltHeight = 10;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.molCount = 0;
this.winSize = null;
this.dbimage = null;
this.heaterSize = 0;
this.pause = 0;
this.random = null;
this.gridWidth = 0;
this.gridHeight = 0;
this.mols = null;
this.grid = null;
this.bigmol = null;
this.resetButton = null;
this.expandButton = null;
this.stoppedCheck = null;
this.heaterCheck = null;
this.energyCheck = null;
this.heaterTempBar = null;
this.gravityBar = null;
this.speedBar = null;
this.molCountBar = null;
this.colorBar = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.gravity = 0;
this.colorMult = 0;
this.upperBound = 0;
this.topWallPos = 0;
this.topWallVel = 0;
this.areaHeight = 0;
this.heatstate = 0;
this.heaterTemp = 0;
this.heaterMove = 0;
this.wallF = 0;
this.wallFMeasure = 0;
this.heaterColor = null;
this.colors = null;
this.heaterTop = 0;
this.heaterLeft = 0;
this.heaterRight = 0;
this.maxMolCount = 0;
this.showFormat = null;
this.cv = null;
this.hist_cv = null;
this.secTime = 0;
this.lastTime = 0;
this.t = 0;
this.lastSecT = 0;
this.totalKE = 0;
this.temp = 0;
this.totalV = 0;
this.graphmax = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxMolCount = 1000;
this.graphmax = 20;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Gas Molecules by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'init', function () {
this.setupList = Clazz.new_((I$[11]||(I$[11]=Clazz.load('java.util.Vector'))));
var s = Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.Gas').Setup1Random))), [this, null]);
while (s != null ){
this.setupList.addElement$TE(s);
s = s.createNext();
}
this.showFormat = (I$[13]||(I$[13]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.showFormat.setMaximumFractionDigits$I(3);
var ci = 0;
this.heatstate = 0;
this.colors = Clazz.array((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))), [16]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[46, 120, 255]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[79, 140, 254]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[113, 142, 253]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[147, 145, 252]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[181, 105, 178]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[215, 64, 103]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[249, 23, 28]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[250, 101, 44]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[251, 139, 33]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[252, 178, 22]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[253, 216, 11]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 255, 0]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 255, 63]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 255, 127]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 255, 191]);
this.colors[ci++] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).c$$I$I$I,[255, 255, 255]);
this.gravity = 0;
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[15]||(I$[15]=Clazz.load('com.falstad.GasLayout')))));
this.cv = Clazz.new_((I$[16]||(I$[16]=Clazz.load('com.falstad.GasCanvas'))).c$$com_falstad_Gas,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.add$java_awt_Component(this.cv);
this.hist_cv = Clazz.new_((I$[17]||(I$[17]=Clazz.load('com.falstad.HistogramCanvas'))).c$$com_falstad_Gas,[this]);
this.hist_cv.addComponentListener$java_awt_event_ComponentListener(this);
this.add$java_awt_Component(this.hist_cv);
this.setupChooser = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.setupList.size(); i++) this.setupChooser.add$S("Setup: " + (this.setupList.elementAt$I(i)).getName());

this.setupChooser.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.setupChooser);
this.stoppedCheck = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.stoppedCheck);
this.heaterCheck = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Checkbox'))).c$$S,["Heater"]);
this.heaterCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.heaterCheck);
this.energyCheck = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.Checkbox'))).c$$S,["Energy Distribution"]);
this.energyCheck.addItemListener$java_awt_event_ItemListener(this);
this.add$java_awt_Component(this.energyCheck);
this.add$java_awt_Component(this.resetButton = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Button'))).c$$S,["Reset"]));
this.resetButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.expandButton = Clazz.new_((I$[20]||(I$[20]=Clazz.load('a2s.Button'))).c$$S,["Expand"]));
this.expandButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.add$java_awt_Component(this.speedBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 0, 100]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Label'))).c$$S$I,["Molecule Count", 0]));
this.add$java_awt_Component(this.molCountBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 500, 1, 1, 1000]));
this.molCountBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Label'))).c$$S$I,["Color Scale", 0]));
this.add$java_awt_Component(this.colorBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 150, 1, 1, 300]));
this.colorBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Label'))).c$$S$I,["Heater Temperature", 0]));
this.add$java_awt_Component(this.heaterTempBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 35, 1, 0, 100]));
this.heaterTempBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.add$java_awt_Component(Clazz.new_((I$[21]||(I$[21]=Clazz.load('a2s.Label'))).c$$S$I,["Gravity", 0]));
this.add$java_awt_Component(this.gravityBar = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 20, 1, 0, 100]));
this.gravityBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.cv.setBackground$java_awt_Color((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color(this.heaterColor = (I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).lightGray);
this.hist_cv.setBackground$java_awt_Color((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).black);
this.hist_cv.setForeground$java_awt_Color((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).lightGray);
this.random = Clazz.new_((I$[23]||(I$[23]=Clazz.load('java.util.Random'))));
this.pause = 10;
this.adjustColors();
this.adjustHeaterTemp();
this.enableItems();
try {
var param = this.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.reinit$Z(true);
this.repaint();
});

Clazz.newMeth(C$, 'reinit$Z', function (newsetup) {
if (this.cv.getSize().width == 0 || this.gravityBar == null   || this.setupChooser == null  ) return;
System.out.println$S("winsize " + this.winSize);
this.bigmol = null;
this.setup = this.setupList.elementAt$I(this.setupChooser.getSelectedIndex());
this.gravityBar.setValue$I(0);
if (newsetup) {
this.speedBar.setValue$I(20);
this.molCountBar.setValue$I(500);
this.colorBar.setValue$I(160);
this.setup.select();
}this.setup.reinit();
this.adjustColors();
});

Clazz.newMeth(C$, 'expand', function () {
this.topWallPos -= 50;
if (this.topWallPos < 0 ) this.topWallPos = 0;
this.enableItems();
});

Clazz.newMeth(C$, 'initMolecules$I', function (speed) {
var d = this.winSize = this.cv.getSize();
this.molCount = this.molCountBar.getValue();
this.upperBound = ((this.winSize.height * (1 - this.setup.getVolume()) - 1)|0);
this.topWallPos = this.upperBound;
this.areaHeight = this.winSize.height - this.upperBound;
this.mols = Clazz.array((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.Gas').Molecule))), [1000]);
this.dbimage = this.createImage$I$I(d.width, d.height);
this.gridWidth = (d.width/C$.gridEltWidth|0) + 1;
this.gridHeight = (d.height/C$.gridEltHeight|0) + 1;
this.grid = Clazz.array((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.Gas').Molecule))), [this.gridWidth, this.gridHeight]);
var i;
var j;
for (i = 0; i != this.gridWidth; i++) for (j = 0; j != this.gridHeight; j++) {
this.grid[i][j] = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.Gas').Molecule))), [this, null]);
this.grid[i][j].listHead = true;
}

for (i = 0; i != 1000; i++) {
var m = Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.Gas').Molecule))), [this, null]);
this.mols[i] = m;
m.x = this.getrand$I(this.winSize.width * 10) * 0.1;
m.y = this.getrand$I(this.areaHeight * 10) * 0.1 + this.upperBound;
m.dx = (this.getrand$I(100) / 99.0 - 0.5);
m.dy = java.lang.Math.sqrt(1 - m.dx * m.dx);
if (this.getrand$I(10) > 4) m.dy = -m.dy;
if (speed == 2) {
var q = ((i & 2) > 0) ? 3 : 0.1;
m.dx *= q;
m.dy *= q;
}if (speed == 0) {
var q = this.getrand$I(101) / 50.0;
m.dx *= q;
m.dy *= q;
}if (Double.isNaN(m.dx) || Double.isNaN(m.dy) ) System.out.println$S("nan1");
this.setColor$com_falstad_Gas_Molecule(m);
if (i < this.molCount) this.gridAdd$com_falstad_Gas_Molecule(m);
}
this.heaterTop = this.winSize.height - 5;
this.heaterSize = (this.winSize.width/4|0);
this.heaterLeft = ((this.winSize.width - this.heaterSize * 3)/2|0);
this.heaterRight = ((this.winSize.width + this.heaterSize * 3)/2|0);
this.enableItems();
this.cv.repaint();
this.hist_cv.repaint();
});

Clazz.newMeth(C$, 'setMoleculeTypes$D$I', function (mult, typeCount) {
var i;
var j;
for (i = 0; i != 1000; i++) {
var m = this.mols[i];
m.r = (m.r*(mult)|0);
m.mass *= mult * mult;
if (typeCount > 1) {
var n = (i % typeCount);
m.type = n;
if (n == 2) {
m.r = m.r*(3);
m.mass *= 9;
} else if (n == 1) {
m.r = m.r*(2);
m.mass *= 4;
}}this.setColor$com_falstad_Gas_Molecule(m);
}
});

Clazz.newMeth(C$, 'updateGas$java_awt_Graphics', function (realg) {
if (this.winSize == null ) return;
var g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
var j;
var dt = this.speedBar.getValue() / 100.0;
if (!this.stoppedCheck.getState()) {
var sysTime = System.currentTimeMillis();
if (this.lastTime != 0) {
var inc = ((sysTime - this.lastTime)|0);
dt *= inc / 8.0;
}if (sysTime - this.secTime >= 1000) {
if (this.t > 0 ) this.wallF /= this.t - this.lastSecT;
this.wallFMeasure = this.wallF;
this.wallF = 0;
this.secTime = sysTime;
this.lastSecT = this.t;
}this.lastTime = sysTime;
} else this.lastTime = 0;
for (var i = ($s$[0] = 0, $s$[0]); i != this.molCount; i++) {
var m = this.mols[i];
var bounce = false;
var ix = (m.x|0);
var iy = (m.y|0);
j = (this.stoppedCheck.getState()) ? 5 : 0;
for (; j < 5; j++) {
m.dy += this.gravity * dt;
m.x += m.dx * dt;
m.y += m.dy * dt;
if (Double.isNaN(m.dx) || Double.isNaN(m.dy) ) System.out.println$S("nan2");
var r = m.r;
if (m.x < r  || m.x >= this.winSize.width - r  ) {
this.wallF += Math.abs(m.dx) * m.mass;
m.dx = -m.dx;
if (m.x < m.r ) m.x = m.r;
if (m.x >= this.winSize.width - r ) m.x = this.winSize.width - r - 1 ;
this.setColor$com_falstad_Gas_Molecule(m);
bounce = true;
}if (m.y < this.upperBound + r  || m.y >= this.winSize.height - r  ) {
this.wallF += Math.abs(m.dy) * m.mass;
if (m.y < this.upperBound + r ) m.y = this.upperBound + r;
if (m.y >= this.winSize.height - r ) m.y = this.winSize.height - r - 1 ;
if (m.y == this.upperBound + r  && m.dy < 0   && false ) {
var wallMass = 1000;
var totmass = m.mass + wallMass;
var comdy = (m.mass * m.dy + wallMass * this.topWallVel) / totmass;
var chg = (m.dy - comdy);
m.dy -= 2 * chg;
this.topWallVel += 2 * chg * m.mass  / wallMass;
} else m.dy = -m.dy;
this.setColor$com_falstad_Gas_Molecule(m);
bounce = true;
}var nix = (m.x|0);
var niy = (m.y|0);
if (!bounce && nix >= this.heaterLeft  && nix <= this.heaterRight  && niy >= this.heaterTop - 1  && this.heaterCheck.getState() ) {
var v = java.lang.Math.sqrt(m.dx * m.dx + m.dy * m.dy);
var oldy = m.dy;
var mxv = Math.sqrt(3 * this.heaterTemp / m.mass);
var mix = this.getrand$I(100) / 99.0;
mix = 0;
var newv = v * mix + mxv * (1 - mix);
m.dx = this.getrand$I(101) / 50.0 - 1;
m.dy = -Math.sqrt(1 - m.dx * m.dx) * newv;
m.dx *= newv;
if (Double.isNaN(m.dx) || Double.isNaN(m.dy) ) System.out.println$S("nan3");
this.wallF += (oldy - m.dy) * m.mass;
this.setColor$com_falstad_Gas_Molecule(m);
bounce = true;
m.y = this.heaterTop - 2;
niy = (m.y|0);
}var m2 = (bounce) ? null : this.checkCollision$com_falstad_Gas_Molecule(m);
if (m2 != null ) {
if (m.dx == m2.dx  && m.dy == m2.dy  ) {
if (m.dx == 0  && m.dy == 0  ) continue;
m.dx += 0.001;
}var sdx = m.dx - m2.dx;
var sx = m.x - m2.x;
var sdy = m.dy - m2.dy;
var sy = m.y - m2.y;
var mindist = m.r + m2.r;
var a = sdx * sdx + sdy * sdy;
var b = 2 * (sx * sdx + sy * sdy);
var c = sx * sx + sy * sy - mindist * mindist;
var t = (-b - java.lang.Math.sqrt(b * b - 4 * a * c )) / a;
var t2 = (-b + java.lang.Math.sqrt(b * b - 4 * a * c )) / a;
if (java.lang.Math.abs(t) > java.lang.Math.abs(t2) ) t = t2;
if (Double.isNaN(t)) System.out.print$S("nan " + new Double(m.dx).toString() + " " + new Double(m.dy).toString() + " " + new Double(m2.dx).toString() + " " + new Double(m2.dy).toString() + " " + new Double(a).toString() + " " + new Double(b).toString() + " " + new Double(c).toString() + " " + new Double(t).toString() + " " + new Double(t2).toString() + "\n" );
m.x += t * m.dx;
m.y += t * m.dy;
sx = m.x - m2.x;
sy = m.y - m2.y;
var sxynorm = java.lang.Math.sqrt(sx * sx + sy * sy);
var sxn = sx / sxynorm;
var syn = sy / sxynorm;
var totmass = m.mass + m2.mass;
var comdx = (m.mass * m.dx + m2.mass * m2.dx) / totmass;
var comdy = (m.mass * m.dy + m2.mass * m2.dy) / totmass;
var pn = (m.dx - comdx) * sxn + (m.dy - comdy) * syn;
var px = 2 * sxn * pn ;
var py = 2 * syn * pn ;
m.dx -= px;
m.dy -= py;
if (Double.isNaN(m.dx)) System.out.println$S("nan0 " + new Double(sxynorm).toString() + " " + new Double(pn).toString() );
var mult = m.mass / m2.mass;
m2.dx += px * mult;
m2.dy += py * mult;
if (t < 0 ) {
m.x -= t * m.dx;
m.y -= t * m.dy;
}if (m.x < r ) m.x = r;
if (m.x >= this.winSize.width - r ) m.x = this.winSize.width - r;
if (m.y < this.upperBound + r ) m.y = this.upperBound + r;
if (m.y >= this.winSize.height - r ) m.y = this.winSize.height - r - 1 ;
if (Double.isNaN(m.dx) || Double.isNaN(m.dy) ) System.out.println$S("nan4");
if (Double.isNaN(m2.dx) || Double.isNaN(m2.dy) ) System.out.println$S("nan5");
this.setColor$com_falstad_Gas_Molecule(m);
this.setColor$com_falstad_Gas_Molecule(m2);
}}
g.setColor$java_awt_Color(m.color);
g.fillOval$I$I$I$I((m.x|0) - m.r, (m.y|0) - m.r, m.r * 2, m.r * 2);
this.gridRemove$com_falstad_Gas_Molecule(m);
this.gridAdd$com_falstad_Gas_Molecule(m);
}
this.t += dt * 5;
this.totalKE = 0;
this.totalV = 0;
for (var i = ($s$[0] = 0, $s$[0]); i != this.molCount; i++) {
var m = this.mols[i];
this.totalKE += m.ke;
this.totalV += m.r * m.r;
}
this.totalV *= 3.141592653589793;
this.temp = this.totalKE / this.molCount;
if (this.topWallVel > 0.5 ) this.topWallVel = 0.5;
this.topWallPos += this.topWallVel * 5;
if (this.topWallPos < 0 ) {
this.topWallPos = 0;
if (this.topWallVel < 0 ) this.topWallVel = 0;
}if (this.topWallPos > ((this.winSize.height * 4/5|0)) ) {
this.topWallPos = ((this.winSize.height * 4/5|0));
if (this.topWallVel > 0 ) this.topWallVel = 0;
}this.upperBound = (this.topWallPos|0);
var heatstateint = ((this.heatstate|0));
if (this.heaterCheck.getState()) {
for (j = 0; j != this.heaterSize; j++, heatstateint++) {
var x = this.heaterLeft + j * 3;
var y = heatstateint & 3;
if ((heatstateint & 4) == 4) y = 4 - y;
g.setColor$java_awt_Color(this.heaterColor);
g.fillRect$I$I$I$I(x, this.heaterTop + y, 2, 2);
}
}g.setColor$java_awt_Color((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).lightGray);
g.drawRect$I$I$I$I(0, this.upperBound, this.winSize.width - 1, this.winSize.height - 1 - this.upperBound );
g.fillRect$I$I$I$I((this.winSize.width/2|0) - 20, 0, 40, this.upperBound);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState()) {
this.heatstate += this.heaterMove;
this.cv.repaint$J(this.pause);
this.hist_cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'gridAdd$com_falstad_Gas_Molecule', function (m) {
var gx = ((m.x / C$.gridEltWidth)|0);
var gy = ((m.y / C$.gridEltHeight)|0);
var g = this.grid[gx][gy];
m.next = g;
m.prev = g.prev;
g.prev = m;
m.prev.next = m;
});

Clazz.newMeth(C$, 'gridRemove$com_falstad_Gas_Molecule', function (m) {
m.next.prev = m.prev;
m.prev.next = m.next;
});

Clazz.newMeth(C$, 'checkCollision$com_falstad_Gas_Molecule', function (m) {
if (this.bigmol != null ) {
var q = this.checkCollisionList$com_falstad_Gas_Molecule$com_falstad_Gas_Molecule(m, this.grid[((this.bigmol.x / C$.gridEltWidth)|0)][((this.bigmol.y / C$.gridEltHeight)|0)]);
if (q != null ) return q;
}var gx = ((m.x / C$.gridEltWidth)|0);
var gy = ((m.y / C$.gridEltHeight)|0);
var i;
var j;
for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
if (gx + i < 0 || gy + j < 0  || gx + i >= this.gridWidth  || gy + j >= this.gridHeight ) continue;
var n = this.checkCollisionList$com_falstad_Gas_Molecule$com_falstad_Gas_Molecule(m, this.grid[gx + i][gy + j]);
if (n != null ) return n;
}

return null;
});

Clazz.newMeth(C$, 'checkCollisionList$com_falstad_Gas_Molecule$com_falstad_Gas_Molecule', function (m, list) {
var l = list.next;
var count = 0;
for (; !l.listHead; l = l.next) {
if (m === l ) continue;
count++;
var mindist = m.r + l.r;
var dx = m.x - l.x;
var dy = m.y - l.y;
if (dx > mindist  || dy > mindist   || dx < -mindist   || dy < -mindist  ) continue;
var dist = java.lang.Math.sqrt(dx * dx + dy * dy);
if (dist > mindist ) continue;
return l;
}
return null;
});

Clazz.newMeth(C$, 'setColor$com_falstad_Gas_Molecule', function (m) {
m.vel = Math.sqrt(m.dx * m.dx + m.dy * m.dy);
m.ke = 0.5 * m.mass * m.vel * m.vel ;
var col = ((m.ke * this.colorMult)|0);
var maxcol = this.colors.length - 1;
if (col > maxcol) col = maxcol;
m.color = this.colors[col];
});

Clazz.newMeth(C$, 'updateHistogram$java_awt_Graphics', function (realg) {
if (this.winSize == null ) return;
var d = this.hist_cv.size();
var g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.hist_cv.getBackground());
g.fillRect$I$I$I$I(0, 0, d.width, d.height);
g.setColor$java_awt_Color(this.hist_cv.getForeground());
var i;
var slots = (d.width/2|0);
var graph = Clazz.array(Integer.TYPE, [slots]);
var gi;
var mg = 0;
var gicount = this.setup.getHistogramCount();
var energy = this.energyCheck.getState();
for (gi = 0; gi != gicount; gi++) {
var ymin = (d.height * gi/gicount|0);
var ymax = (d.height * (gi + 1)/gicount|0) - 1;
var yheight = ymax - ymin;
var maxke = energy ? 70 : 15;
for (i = 0; i != slots; i++) graph[i] = 0;

var mass = 1;
var mcount = 0;
for (i = 0; i != this.molCount; i++) {
var m = this.mols[i];
if (m.type != gi) continue;
mcount++;
mass = m.mass;
var value = (energy ? m.ke : m.vel);
var r = ((value * slots / maxke)|0);
if (r >= slots) continue;
graph[r]++;
}
maxke += 0.5;
var maxcol = this.colors.length - 1;
for (i = 0; i != slots; i++) {
if (graph[i] == 0) continue;
if (graph[i] > mg) mg = graph[i];
var y = ymax - ((graph[i] * yheight/this.graphmax|0));
if (y < ymin) y = ymin;
var value = i * maxke / slots;
if (!energy) value *= mass * value;
var col = ((value * this.colorMult)|0);
if (col > maxcol) col = maxcol;
g.setColor$java_awt_Color(this.colors[col]);
g.fillRect$I$I$I$I(i * 2, y, 2, ymax - y + 1);
}
var ox = -1;
var oy = -1;
g.setColor$java_awt_Color((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).lightGray);
if (!this.energyCheck.getState()) {
for (i = 0; i != slots; i++) {
var v = i * maxke / slots;
var dv = maxke / slots;
var distdv = 0.5 * mcount * (this.maxwellDist$D$D(v, mass) + this.maxwellDist$D$D(v + dv, mass)) * dv ;
var v0 = (distdv|0);
var y = (ymax - ((v0 * yheight/this.graphmax|0)));
if (y < ymin) y = ymin;
var x = i * 2;
if (ox != -1 && !(y == oy && oy == ymax ) ) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
}}
if (mg > this.graphmax) this.graphmax = mg;
if (mg < (this.graphmax/2|0) && this.graphmax > 1 ) this.graphmax = (this.graphmax/(2)|0);
var fm = g.getFontMetrics();
g.setColor$java_awt_Color((I$[14]||(I$[14]=Clazz.load('java.awt.Color'))).white);
var x = (this.winSize.width * 2/3|0);
var vadj = 4.0E-4;
var v = (this.winSize.width - 2) * (this.winSize.height - this.upperBound - 2 ) * vadj ;
g.drawString$S$I$I("V = " + this.showFormat.format$D(v), x, fm.getAscent());
g.drawString$S$I$I("n = " + this.molCount, x, fm.getAscent() + fm.getHeight());
var a = 2 * (this.winSize.width + (this.winSize.height - this.upperBound) - 4);
var p = 10000.0 * this.wallFMeasure / (3 * a);
g.drawString$S$I$I("P = " + this.showFormat.format$D(p), x, fm.getAscent() + 2 * fm.getHeight());
g.drawString$S$I$I("kT = " + this.showFormat.format$D(this.temp), x, fm.getAscent() + 3 * fm.getHeight());
g.drawString$S$I$I("PV/nkT = " + this.showFormat.format$D(p * v / (this.molCount * this.temp)), x, fm.getAscent() + 4 * fm.getHeight());
g.drawString$S$I$I("P(V-nb)/nkT = " + this.showFormat.format$D(p * (v - this.totalV * vadj) / (this.molCount * this.temp)), x, fm.getAscent() + 5 * fm.getHeight());
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'maxwellDist$D$D', function (v, mass) {
if (this.energyCheck.getState()) return Math.exp(-v / this.temp) / this.temp;
return (mass / this.temp) * v * Math.exp(-mass * v * v  / (2 * this.temp)) ;
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.reinit$Z(false);
this.cv.repaint$J(100);
this.hist_cv.repaint$J(100);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
System.out.println$O(e);
if (e.getSource() === this.resetButton ) {
this.reinit$Z(false);
this.cv.repaint();
}if (e.getSource() === this.expandButton ) {
this.expand();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.println$I((e.getSource()).getValue());
if (e.getSource() === this.gravityBar ) this.gravity = this.gravityBar.getValue() * 5.0E-5;
if (e.getSource() === this.heaterTempBar ) this.adjustHeaterTemp();
if (e.getSource() === this.molCountBar ) this.adjustMolCount();
if (e.getSource() === this.colorBar ) this.adjustColors();
});

Clazz.newMeth(C$, 'adjustHeaterTemp', function () {
this.heaterTemp = (this.heaterTempBar.getValue() * 0.029111971) * 30 + 0.01;
this.heaterMove = (this.heaterTempBar.getValue() * 0.029111971) + 0.3;
this.heaterMove /= 2;
var value = 1.5 * this.heaterTemp;
var col = ((value * this.colorMult)|0);
var maxcol = this.colors.length - 1;
if (col > maxcol) col = maxcol;
this.heaterColor = this.colors[col];
System.out.println$S("htemp = " + new Double(this.heaterTemp).toString());
});

Clazz.newMeth(C$, 'adjustColors', function () {
var i;
var c = this.colorBar.getValue() / 150.0;
this.colorMult = Math.exp((c - 1) * 4) * 0.7;
for (i = 0; i != this.molCount; i++) this.setColor$com_falstad_Gas_Molecule(this.mols[i]);

});

Clazz.newMeth(C$, 'enableItems', function () {
this.heaterTempBar.setEnabled$Z(this.heaterCheck.getState());
this.expandButton.setEnabled$Z(this.topWallPos > 0 );
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
this.enableItems();
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint();
return;
}if (e.getItemSelectable() === this.setupChooser ) this.reinit$Z(true);
});

Clazz.newMeth(C$, 'adjustMolCount', function () {
var oldcount = this.molCount;
this.molCount = this.molCountBar.getValue();
if (this.molCount == oldcount) return;
if (oldcount > this.molCount) {
var i;
for (i = this.molCount; i != oldcount; i++) this.gridRemove$com_falstad_Gas_Molecule(this.mols[i]);

} else {
var i;
for (i = oldcount; i != this.molCount; i++) this.gridAdd$com_falstad_Gas_Molecule(this.mols[i]);

}});
var $s$ = new Int16Array(1);
;
(function(){var C$=Clazz.newClass(P$.Gas, "Molecule", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.x = 0;
this.y = 0;
this.dx = 0;
this.dy = 0;
this.mass = 0;
this.ke = 0;
this.vel = 0;
this.r = 0;
this.type = 0;
this.color = null;
this.next = null;
this.prev = null;
this.listHead = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.r = 2;
this.type = 0;
this.mass = 2;
this.next = this.prev = this;
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'select', function () {
});

Clazz.newMeth(C$, 'reinit', function () {
});

Clazz.newMeth(C$, 'deselect', function () {
});

Clazz.newMeth(C$, 'getHistogramCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getVolume', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup1Random", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1 Gas, Random Speeds";
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(0);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(2, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load(Clazz.load('com.falstad.Gas').Setup1Equal))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup1Equal", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1 Gas, Equal Speeds";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].speedBar.setValue$I(3);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(1);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(2, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.Gas').Setup1Extreme))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup1Extreme", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1 Gas, Extreme Speeds";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].speedBar.setValue$I(3);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(2);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(2, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.Gas').Setup1Single))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup1Single", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1 Gas, One Moving Molecule";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].speedBar.setValue$I(10);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(1);
var i;
var j;
for (i = 1; i != 1000; i++) this.b$['com.falstad.Gas'].mols[i].dx = this.b$['com.falstad.Gas'].mols[i].dy = 0;

this.b$['com.falstad.Gas'].mols[0].dx *= Math.sqrt(this.b$['com.falstad.Gas'].molCount);
this.b$['com.falstad.Gas'].mols[0].dy *= Math.sqrt(this.b$['com.falstad.Gas'].molCount);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(2, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.Gas').Setup1Small))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup1Small", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "1 Gas, Small";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].colorBar.setValue$I(215);
this.b$['com.falstad.Gas'].speedBar.setValue$I(36);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(0);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(1, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.Gas').Setup2Random))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup2Random", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 Gases, Random Speeds";
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(0);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(1, 2);
});

Clazz.newMeth(C$, 'getHistogramCount', function () {
return 2;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.Gas').Setup2Equal))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup2Equal", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 Gases, Equal Speeds";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].speedBar.setValue$I(3);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(1);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(1, 2);
});

Clazz.newMeth(C$, 'getHistogramCount', function () {
return 2;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.Gas').Setup3Random))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup3Random", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "3 Gases, Random Speeds";
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(0);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(1, 3);
});

Clazz.newMeth(C$, 'getHistogramCount', function () {
return 3;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.Gas').Setup3Equal))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "Setup3Equal", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "3 Gases, Equal Speeds";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].speedBar.setValue$I(3);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(1);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(1, 3);
});

Clazz.newMeth(C$, 'getHistogramCount', function () {
return 3;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.Gas').SetupBrownian))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "SetupBrownian", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Brownian Motion";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].speedBar.setValue$I(70);
this.b$['com.falstad.Gas'].colorBar.setValue$I(210);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(0);
this.b$['com.falstad.Gas'].bigmol = this.b$['com.falstad.Gas'].mols[0];
this.b$['com.falstad.Gas'].bigmol.r = 30;
this.b$['com.falstad.Gas'].bigmol.mass = (this.b$['com.falstad.Gas'].bigmol.r * this.b$['com.falstad.Gas'].bigmol.r/2|0);
this.b$['com.falstad.Gas'].bigmol.dx = this.b$['com.falstad.Gas'].bigmol.dy = 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.Gas').SetupExpansion))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.Gas, "SetupExpansion", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.Gas','com.falstad.Gas.Setup']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Free Expansion";
});

Clazz.newMeth(C$, 'select', function () {
this.b$['com.falstad.Gas'].molCountBar.setValue$I(250);
this.b$['com.falstad.Gas'].speedBar.setValue$I(45);
this.b$['com.falstad.Gas'].colorBar.setValue$I(210);
});

Clazz.newMeth(C$, 'reinit', function () {
this.b$['com.falstad.Gas'].initMolecules$I(0);
this.b$['com.falstad.Gas'].setMoleculeTypes$D$I(1, 1);
});

Clazz.newMeth(C$, 'getVolume', function () {
return 0.5;
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:06
