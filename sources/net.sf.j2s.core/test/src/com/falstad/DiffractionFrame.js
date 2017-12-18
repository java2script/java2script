(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DiffractionFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);
C$.sn = null;
C$.sd = null;
C$.cn = null;
C$.cd = null;
C$.fn = null;
C$.fd = null;
C$.gn = null;
C$.gd = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.sn = Clazz.array(Double.TYPE, -1, [-2991.8191940101983, 708840.0452577386, -6.297414862058625E7, 2.5489088057337637E9, -4.429795180596978E10, 3.180162978765678E11]);
C$.sd = Clazz.array(Double.TYPE, -1, [281.3762688899943, 45584.78108065326, 5173438.887700964, 4.193202458981112E8, 2.2441179564534092E10, 6.073663894900846E11]);
C$.cn = Clazz.array(Double.TYPE, -1, [-4.9884311457357354E-8, 9.504280628298596E-6, -6.451914356839651E-4, 0.018884331939670384, -0.20552590095501388, 1.0]);
C$.cd = Clazz.array(Double.TYPE, -1, [3.99982968972496E-12, 9.154392157746574E-10, 1.2500186247959882E-7, 1.2226278902417902E-5, 8.680295429417843E-4, 0.04121420907221998, 1.0]);
C$.fn = Clazz.array(Double.TYPE, -1, [0.4215435550436775, 0.1434079197807589, 0.011522095507358577, 3.45017939782574E-4, 4.6361374928786735E-6, 3.055689837902576E-8, 1.0230451416490724E-10, 1.7201074326816183E-13, 1.3428327623306275E-16, 3.763297112699879E-20]);
C$.fd = Clazz.array(Double.TYPE, -1, [0.7515863983533789, 0.11688892585919138, 0.0064405152650885865, 1.5593440916415301E-4, 1.8462756734893055E-6, 1.1269922476399903E-8, 3.6014002958937136E-11, 5.887545336215784E-14, 4.5200143407412973E-17, 1.2544323709001127E-20]);
C$.gn = Clazz.array(Double.TYPE, -1, [0.5044420736433832, 0.1971028335255234, 0.018764858409257526, 6.840793809153931E-4, 1.1513882611188428E-5, 9.828524436884223E-8, 4.4534441586175015E-10, 1.0826804113902088E-12, 1.375554606332618E-15, 8.363544356306774E-19, 1.8695871016278324E-22]);
C$.gd = Clazz.array(Double.TYPE, -1, [1.4749575992512833, 0.33774898912002, 0.02536037414203388, 8.146791071843061E-4, 1.2754507566772912E-5, 1.0431458965757199E-7, 4.6068072814652043E-10, 1.1027321506624028E-12, 1.3879653125957886E-15, 8.391588162831187E-19, 1.8695871016278324E-22]);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.fullWinSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.defaultsButton = null;
this.colorCheck = null;
this.reversedCheck = null;
this.sizeCheck = null;
this.apertureChooser = null;
this.gridBar = null;
this.lengthBar = null;
this.zoomBar = null;
this.brightnessBar = null;
this.colorMult = 0;
this.zbase = 0;
this.func = null;
this.functionChanged = false;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.cv = null;
this.apertureList = null;
this.aperture = null;
this.applet = null;
this.main = null;
this.useBufferedImage = false;
this.useFrame = false;
this.showControls = false;
this.shown = false;
this.angleSteps = 0;
this.angleStepsMask = 0;
this.angcos1 = null;
this.angsin1 = null;
this.angcos2 = null;
this.angsin2 = null;
this.angleSteps2 = 0;
this.angleSteps2Mask = 0;
this.accumR = null;
this.accumI = null;
this.apertureArgMult = 0;
this.apertureArgMultRed = 0;
this.apertureArgMultBlue = 0;
this.colorLenMults = null;
this.reversed = false;
this.color = false;
this.selection = 0;
this.zoomFactor = 0;
this.oldZoom = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.gridSizeX = 200;
this.gridSizeY = 200;
this.dragging = false;
this.useBufferedImage = false;
this.shown = false;
this.selection = -1;
this.oldZoom = 200;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Diffraction by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Diffraction', function (a) {
C$.superclazz.c$$S.apply(this, ["Diffraction Applet v1.1a"]);
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
this.apertureList = Clazz.new_((I$[18]||(I$[18]=Clazz.load('java.util.Vector'))));
var a = Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').CircularAperture))), [this, null]);
while (a != null ){
this.apertureList.addElement$TE(a);
a = a.createNext();
}
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[20]||(I$[20]=Clazz.load('com.falstad.DiffractionLayout')))));
this.cv = Clazz.new_((I$[21]||(I$[21]=Clazz.load('com.falstad.DiffractionCanvas'))).c$$com_falstad_DiffractionFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.main.add$java_awt_Component(this.defaultsButton = Clazz.new_((I$[22]||(I$[22]=Clazz.load('a2s.Button'))).c$$S,["Set to Defaults"]));
this.defaultsButton.addActionListener$java_awt_event_ActionListener(this);
this.colorCheck = Clazz.new_((I$[23]||(I$[23]=Clazz.load('a2s.Checkbox'))).c$$S,["Tri-chromatic"]);
this.colorCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.colorCheck);
this.reversedCheck = Clazz.new_((I$[23]||(I$[23]=Clazz.load('a2s.Checkbox'))).c$$S,["Reversed"]);
this.reversedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.reversedCheck);
this.sizeCheck = Clazz.new_((I$[23]||(I$[23]=Clazz.load('a2s.Checkbox'))).c$$S,["Show Dimensions"]);
this.sizeCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.sizeCheck);
var os = System.getProperty("os.name");
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.useBufferedImage = true;
this.apertureChooser = Clazz.new_((I$[24]||(I$[24]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.apertureList.size(); i++) this.apertureChooser.add$S("Aperture: " + (this.apertureList.elementAt$I(i)).getName());

this.main.add$java_awt_Component(this.apertureChooser);
this.aperture = this.apertureList.elementAt$I(0);
this.apertureChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.Label'))).c$$S$I,["Aperture Scale", 0]));
this.main.add$java_awt_Component(this.lengthBar = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 260, 1, 35, 500]));
this.lengthBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.Label'))).c$$S$I,["Zoom", 0]));
this.main.add$java_awt_Component(this.zoomBar = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 200, 1, 30, 400]));
this.zoomBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 1, 500]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.Label'))).c$$S$I,["Image Resolution", 0]));
this.main.add$java_awt_Component(this.gridBar = Clazz.new_((I$[26]||(I$[26]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 250, 2, 10, 600]));
this.gridBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[25]||(I$[25]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
this.random = Clazz.new_((I$[27]||(I$[27]=Clazz.load('java.util.Random'))));
this.functionChanged = true;
this.reinit();
this.cv.setBackground$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
this.zbase = 1 / java.lang.Math.exp(4);
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
this.handleResize();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
var d = this.fullWinSize = this.cv.getSize();
var w = (this.winSize.width > this.winSize.height) ? this.winSize.height : this.winSize.width;
this.winSize.width = this.winSize.height = w;
this.pixels = null;
d = this.winSize;
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
this.pixels = Clazz.array(Integer.TYPE, [d.width * d.height]);
var i;
for (i = 0; i != d.width * d.height; i++) this.pixels[i] = -16777216;

this.imageSource = Clazz.new_((I$[28]||(I$[28]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
this.imageSource.setAnimated$Z(true);
this.imageSource.setFullBufferUpdates$Z(true);
this.dbimage = this.cv.createImage$java_awt_image_ImageProducer(this.imageSource);
}this.imageSource = Clazz.new_((I$[28]||(I$[28]=Clazz.load('java.awt.image.MemoryImageSource'))).c$$I$I$IA$I$I,[d.width, d.height, this.pixels, 0, d.width]);
});

Clazz.newMeth(C$, 'computeFunction', function () {
this.accumR = Clazz.array(Integer.TYPE, [3]);
this.accumI = Clazz.array(Integer.TYPE, [3]);
this.aperture = this.apertureList.elementAt$I(this.apertureChooser.getSelectedIndex());
this.gridSizeX = this.gridSizeY = (this.gridBar.getValue() & -2);
if (this.aperture.oneDimensional()) {
this.gridSizeX = this.gridSizeX*(2);
this.gridSizeY = 1;
}this.func = Clazz.array(Double.TYPE, [this.gridSizeX, this.gridSizeY, 3]);
var i;
var j;
this.color = this.colorCheck.getState();
this.angleSteps = (this.gridBar.getValue() >= 195) ? 1024 : 256;
if (this.aperture.oneDimensional()) this.angleSteps = (this.gridBar.getValue() >= 195) ? 2048 : 1024;
this.angleStepsMask = this.angleSteps - 1;
this.zoomFactor = java.lang.Math.exp(this.zoomBar.getValue() / 50.0) * this.zbase;
var baselen = java.lang.Math.exp(this.lengthBar.getValue() / 110.0) / this.zoomFactor;
this.angcos1 = Clazz.array(Double.TYPE, [this.angleSteps]);
this.angsin1 = Clazz.array(Double.TYPE, [this.angleSteps]);
for (i = 0; i != this.angleSteps; i++) {
this.angcos1[i] = java.lang.Math.cos(i * 6.283185307179586 / this.angleSteps);
this.angsin1[i] = java.lang.Math.sin(i * 6.283185307179586 / this.angleSteps);
}
this.angleSteps2 = 4096;
this.angleSteps2Mask = this.angleSteps2 - 1;
this.angcos2 = Clazz.array(Long.TYPE, [this.angleSteps2]);
this.angsin2 = Clazz.array(Long.TYPE, [this.angleSteps2]);
this.reversed = this.reversedCheck.getState();
var sign = (this.reversed) ? -1 : 1;
this.colorLenMults = Clazz.array(Double.TYPE, [3]);
for (i = 0; i != this.angleSteps2; i++) {
this.angcos2[i] = ((java.lang.Math.cos(i * 6.283185307179586 / this.angleSteps2) * 256 * sign )|0);
this.angsin2[i] = ((java.lang.Math.sin(i * 6.283185307179586 / this.angleSteps2) * 256 * sign )|0);
}
this.colorLenMults[0] = baselen / 1.2745098039215685;
this.colorLenMults[1] = baselen;
this.colorLenMults[2] = baselen / 0.9313725490196079;
this.apertureArgMult = this.angleSteps2 * 0.25;
this.apertureArgMult *= baselen * baselen;
this.apertureArgMultRed = this.apertureArgMult / 1.6243752402921954;
this.apertureArgMultBlue = this.apertureArgMult / 0.8674548250672818;
this.aperture.compute();
var maxx = this.aperture.hasXSymmetry() ? (this.gridSizeX/2|0) : this.gridSizeX;
var maxy = this.aperture.hasYSymmetry() ? (this.gridSizeY/2|0) : this.gridSizeY;
var mink = (this.color) ? 0 : 1;
var maxk = (this.color) ? 2 : 1;
var k;
if (this.aperture.hasDiagonalSymmetry()) for (k = mink; k <= maxk; k++) for (i = 0; i != maxx; i++) for (j = 0; j <= i; j++) this.func[j][i][k] = this.func[i][j][k];



if (this.aperture.hasXSymmetry()) for (k = mink; k <= maxk; k++) for (i = 0; i != maxx; i++) for (j = 0; j != maxy; j++) this.func[this.gridSizeX - 1 - i ][j][k] = this.func[i][j][k];



if (this.aperture.hasYSymmetry()) for (k = mink; k <= maxk; k++) for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != maxy; j++) this.func[i][this.gridSizeX - 1 - j ][k] = this.func[i][j][k];



this.functionChanged = false;
});

Clazz.newMeth(C$, 'setFunction$I$I', function (i, j) {
var mink = 1;
var maxk = 1;
if (this.color) {
mink = 0;
maxk = 2;
}var k;
for (k = mink; k <= maxk; k++) {
var ard = (this.accumR[k]) / (this.angleSteps * 256);
var aid = (this.accumI[k]) / (this.angleSteps * 256);
var mag = ard * ard + aid * aid;
this.func[i][j][k] = mag;
}
});

Clazz.newMeth(C$, 'clearAccum', function () {
var i;
for (i = 0; i != 3; i++) this.accumR[i] = this.accumI[i] = 0;

});

Clazz.newMeth(C$, 'apertureStart$D', function (r) {
var r2 = r * r;
var arg = (((r2 * this.apertureArgMult)|0)) & this.angleSteps2Mask;
this.accumR[1] = this.accumR[1]-(this.angcos2[arg]);
this.accumI[1] = this.accumI[1]-(this.angsin2[arg]);
if (this.color) {
arg = (((r2 * this.apertureArgMultRed)|0)) & this.angleSteps2Mask;
this.accumR[0] = this.accumR[0]-(this.angcos2[arg]);
this.accumI[0] = this.accumI[0]-(this.angsin2[arg]);
arg = (((r2 * this.apertureArgMultBlue)|0)) & this.angleSteps2Mask;
this.accumR[2] = this.accumR[2]-(this.angcos2[arg]);
this.accumI[2] = this.accumI[2]-(this.angsin2[arg]);
}});

Clazz.newMeth(C$, 'apertureStop$D', function (r) {
var r2 = r * r;
var arg = (((r2 * this.apertureArgMult)|0)) & this.angleSteps2Mask;
this.accumR[1] = this.accumR[1]+(this.angcos2[arg]);
this.accumI[1] = this.accumI[1]+(this.angsin2[arg]);
if (this.color) {
arg = (((r2 * this.apertureArgMultRed)|0)) & this.angleSteps2Mask;
this.accumR[0] = this.accumR[0]+(this.angcos2[arg]);
this.accumI[0] = this.accumI[0]+(this.angsin2[arg]);
arg = (((r2 * this.apertureArgMultBlue)|0)) & this.angleSteps2Mask;
this.accumR[2] = this.accumR[2]+(this.angcos2[arg]);
this.accumI[2] = this.accumI[2]+(this.angsin2[arg]);
}});

Clazz.newMeth(C$, 'apertureStartOrigin$Z', function (x) {
if (this.reversed) x = !x;
if (x) {
this.accumR[1] = this.accumR[1]-(256 * this.angleSteps);
if (this.color) {
this.accumR[0] = this.accumR[0]-(256 * this.angleSteps);
this.accumR[2] = this.accumR[2]-(256 * this.angleSteps);
}}});

Clazz.newMeth(C$, 'sign$D', function (x) {
return x < 0  ? -1 : 1;
});

Clazz.newMeth(C$, 'updateDiffraction$java_awt_Graphics', function (realg) {
if (this.fullWinSize == null ) return;
var hideFunction = this.dragging && this.aperture.hideWhileDragging() ;
if (this.functionChanged) {
realg.setColor$java_awt_Color(this.cv.getBackground());
var fm = realg.getFontMetrics();
var cs = "Calculating...";
realg.fillRect$I$I$I$I(0, this.fullWinSize.height - 30, 20 + fm.stringWidth$S(cs), 30);
realg.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
realg.drawString$S$I$I(cs, 10, this.fullWinSize.height - 10);
this.computeFunction();
}var g = null;
if (this.winSize == null  || this.winSize.width == 0 ) return;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.fullWinSize.width, this.fullWinSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var j;
this.colorMult = 70 * java.lang.Math.exp(this.brightnessBar.getValue() / 50.0);
if (!hideFunction) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var x = (i * this.winSize.width/this.gridSizeX|0);
var y = (j * this.winSize.height/this.gridSizeY|0);
var x2 = ((i + 1) * this.winSize.width/this.gridSizeX|0);
var y2 = ((j + 1) * this.winSize.height/this.gridSizeY|0);
var colval = 0;
if (!this.color) {
var col = this.getColorValue$I$I$I(i, j, 1);
colval = -16777216 | (col * 65793);
} else {
colval = -16777216 + (this.getColorValue$I$I$I(i, j, 0) << 16) | (this.getColorValue$I$I$I(i, j, 1) << 8) | (this.getColorValue$I$I$I(i, j, 2));
}var k;
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


}

}if (this.imageSource != null ) this.imageSource.newPixels();
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
this.aperture.drawGeometricShadow$java_awt_Graphics(g);
if (this.sizeCheck.getState()) {
g.setColor$java_awt_Color(this.cv.getBackground());
var fm = realg.getFontMetrics();
var wl = 5.1E-7;
var nf = (I$[29]||(I$[29]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(2);
var baselen = java.lang.Math.exp(this.lengthBar.getValue() / 110.0) / this.zoomFactor;
var dim = this.aperture.getDimension() * baselen * java.lang.Math.sqrt(wl * 2) ;
var cs = "width = ";
if (dim > 0.001 ) cs += nf.format$D(dim * 1000) + " mm";
 else if (dim > 1.0E-6 ) cs += nf.format$D(dim * 1000000.0) + " \u00b5m";
 else cs += nf.format$D(dim * 1.0E9) + " nm";
var sw = fm.stringWidth$S(cs);
if (dim > 0 ) {
g.fillRect$I$I$I$I(this.fullWinSize.width - (20 + sw), this.fullWinSize.height - 30, 20 + sw, 30);
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).white);
g.drawString$S$I$I(cs, this.fullWinSize.width - (10 + sw), this.fullWinSize.height - 10);
}}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'getColorValue$I$I$I', function (i, j, k) {
var val = ((this.func[i][j][k] * this.colorMult)|0);
if (val > 255) val = 255;
return val;
});

Clazz.newMeth(C$, 'doZoom', function () {
var z = java.lang.Math.exp(this.zoomBar.getValue() / 50.0) * this.zbase;
var oz = java.lang.Math.exp(this.oldZoom / 50.0) * this.zbase;
var zoomChange = z / oz;
this.oldZoom = this.zoomBar.getValue();
this.aperture.rezoom$D(zoomChange);
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
if (e.getSource() === this.defaultsButton ) {
this.colorCheck.setState$Z(false);
this.reversedCheck.setState$Z(false);
this.lengthBar.setValue$I(260);
this.gridBar.setValue$I(90);
this.zoomBar.setValue$I(this.oldZoom = 200);
this.functionChanged = true;
this.brightnessBar.setValue$I(this.aperture.defaultBrightness());
this.aperture.setToDefaults();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
System.out.print$S((e.getSource()).getValue() + "\n");
if (e.getSource() !== this.brightnessBar ) this.functionChanged = true;
if (e.getSource() === this.zoomBar ) this.doZoom();
this.cv.repaint$J(100);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
if (this.selection != -1) {
this.dragging = true;
if (this.aperture.drag$I$I(e.getX(), e.getY())) this.cv.repaint();
}});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
if (this.aperture.drag$I$I(e.getX(), e.getY())) this.cv.repaint();
}return;
}this.processMouseMotion$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'processMouseMotion$java_awt_event_MouseEvent', function (e) {
var sel = this.selection;
this.selection = this.aperture.getSelection$I$I(e.getX(), e.getY());
if (this.selection != sel) this.cv.repaint();
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selection != -1 ) {
this.selection = -1;
this.cv.repaint();
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.processMouseMotion$java_awt_event_MouseEvent(e);
if (this.selection != -1) {
this.dragging = true;
if (this.aperture.drag$I$I(e.getX(), e.getY())) this.cv.repaint();
}});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.dragging) {
this.functionChanged = true;
this.cv.repaint();
}this.dragging = false;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getSource() !== this.sizeCheck ) this.functionChanged = true;
if (e.getSource() === this.apertureChooser ) {
{
//debugger;
}this.aperture = this.apertureList.elementAt$I(this.apertureChooser.getSelectedIndex());
this.brightnessBar.setValue$I(this.aperture.defaultBrightness());
this.zoomBar.setValue$I(this.oldZoom = 200);
}System.out.println$S("requestion repaint for " + this.aperture.getClass().getName());
this.cv.repaint$J(100);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'fresnl$D$DA', function (xxa, result) {
var f;
var g;
var cc;
var ss;
var c;
var s;
var t;
var u;
var x;
var x2;
while (true){
x = java.lang.Math.abs(xxa);
x2 = x * x;
if (x2 < 2.5625 ) {
t = x2 * x2;
ss = x * x2 * this.polevl$D$DA$I(t, C$.sn, 5)  / this.p1evl$D$DA$I(t, C$.sd, 6);
cc = x * this.polevl$D$DA$I(t, C$.cn, 5) / this.polevl$D$DA$I(t, C$.cd, 6);
break;
}if (x > 36974.0 ) {
cc = 0.5;
ss = 0.5;
break;
}x2 = x * x;
t = 3.141592653589793 * x2;
u = 1.0 / (t * t);
t = 1.0 / t;
f = 1.0 - u * this.polevl$D$DA$I(u, C$.fn, 9) / this.p1evl$D$DA$I(u, C$.fd, 10);
g = t * this.polevl$D$DA$I(u, C$.gn, 10) / this.p1evl$D$DA$I(u, C$.gd, 11);
t = 1.5707963267948966 * x2;
c = java.lang.Math.cos(t);
s = java.lang.Math.sin(t);
t = 3.141592653589793 * x;
cc = 0.5 + (f * s - g * c) / t;
ss = 0.5 - (f * c + g * s) / t;
break;
}
if (xxa < 0.0 ) {
cc = -cc;
ss = -ss;
}result[0] = cc;
result[1] = ss;
return 0;
});

Clazz.newMeth(C$, 'polevl$D$DA$I', function (x, coef, N) {
var ans;
var i;
var p = 0;
ans = coef[p++];
i = N;
do ans = ans * x + coef[p++];
 while (--i > 0);
return (ans);
});

Clazz.newMeth(C$, 'p1evl$D$DA$I', function (x, coef, N) {
var ans;
var p = 0;
var i;
ans = x + coef[p++];
i = N - 1;
do ans = ans * x + coef[p++];
 while (--i > 0);
return (ans);
});
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "Aperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'defaultBrightness', function () {
return 50;
});

Clazz.newMeth(C$, 'oneDimensional', function () {
return false;
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return false;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return false;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return false;
});

Clazz.newMeth(C$, 'hideWhileDragging', function () {
return true;
});

Clazz.newMeth(C$, 'rezoom$D', function (x) {
});

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.setToDefaults();
}, 1);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "CircularAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.Aperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.radius = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "circle";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').HalfPlaneAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.radius = 0.25;
});

Clazz.newMeth(C$, 'rezoom$D', function (z) {
this.radius *= z;
});

Clazz.newMeth(C$, 'compute', function () {
var i;
var j;
for (i = 0; i != (this.b$['com.falstad.DiffractionFrame'].gridSizeX/2|0); i++) {
for (j = 0; j <= i; j++) {
this.b$['com.falstad.DiffractionFrame'].clearAccum();
var x0 = (i / this.b$['com.falstad.DiffractionFrame'].gridSizeX) - 0.5;
var y0 = (j / this.b$['com.falstad.DiffractionFrame'].gridSizeY) - 0.5;
var th;
var cx = -x0;
var cy = -y0;
var c2 = cx * cx + cy * cy;
var cr = this.radius;
var c = c2 - cr * cr;
var ac4 = c * 4;
var th1 = 0;
var th2 = 6.283185307179586;
if (c <= 0 ) {
} else {
var r = java.lang.Math.sqrt(c2);
var cx1 = cx / r;
var cy1 = cy / r;
var a1 = java.lang.Math.atan2(cy - cx1 * cr, cx + cy1 * cr);
var a2 = java.lang.Math.atan2(cy + cx1 * cr, cx - cy1 * cr);
th1 = (a1 < a2 ) ? a1 : a2;
th2 = (a1 > a2 ) ? a1 : a2;
if (th2 - th1 > 3.141592653589793 ) {
th1 = (a1 > a2 ) ? a1 : a2;
th2 = (a1 < a2 ) ? a1 : a2;
th2 += 6.283185307179586;
}}var th1i = (((th1 * this.b$['com.falstad.DiffractionFrame'].angleSteps) / 6.283185307179586)|0);
var th2i = (((th2 * this.b$['com.falstad.DiffractionFrame'].angleSteps) / 6.283185307179586)|0);
while (th1i < 0){
th1i = th1i+(this.b$['com.falstad.DiffractionFrame'].angleSteps);
th2i = th2i+(this.b$['com.falstad.DiffractionFrame'].angleSteps);
}
for (th = th1i; th < th2i; th++) {
var costh = this.b$['com.falstad.DiffractionFrame'].angcos1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var sinth = this.b$['com.falstad.DiffractionFrame'].angsin1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var b = -2 * (costh * cx + sinth * cy);
var discrim = b * b - ac4;
if (discrim < 0 ) continue;
discrim = java.lang.Math.sqrt(discrim);
var r1 = 0.5 * (-b - discrim);
var r2 = 0.5 * (-b + discrim);
if (r1 < 0  && r2 < 0  ) continue;
if (r1 > 0 ) this.b$['com.falstad.DiffractionFrame'].apertureStart$D(r1);
this.b$['com.falstad.DiffractionFrame'].apertureStop$D(r2);
}
this.b$['com.falstad.DiffractionFrame'].apertureStartOrigin$Z(c < 0 );
this.b$['com.falstad.DiffractionFrame'].setFunction$I$I(i, j);
}
}
});

Clazz.newMeth(C$, 'drawGeometricShadow$java_awt_Graphics', function (g) {
if (this.b$['com.falstad.DiffractionFrame'].selection == 1) g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
var r = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.radius)|0);
g.drawOval$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - r, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, r * 2, r * 2);
});

Clazz.newMeth(C$, 'getSelection$I$I', function (x, y) {
var rx = (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx * rx + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
return (java.lang.Math.abs(r - this.radius) < 10.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) ? 1 : -1;
});

Clazz.newMeth(C$, 'drag$I$I', function (x, y) {
var rx = (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx * rx + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (r == this.radius ) return false;
this.radius = r;
return true;
});

Clazz.newMeth(C$, 'getDimension', function () {
return this.radius * 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "OneDimensionalAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.Aperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.lineLocations = null;
this.lineCount = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'oneDimensional', function () {
return true;
});

Clazz.newMeth(C$, 'compute', function () {
var i;
var j;
var result = Clazz.array(Double.TYPE, [2]);
var mink = 1;
var maxk = 1;
if (this.b$['com.falstad.DiffractionFrame'].color) {
mink = 0;
maxk = 2;
}var k;
var xlim = (this.hasXSymmetry()) ? (this.b$['com.falstad.DiffractionFrame'].gridSizeX/2|0) : this.b$['com.falstad.DiffractionFrame'].gridSizeX;
var astart = (this.b$['com.falstad.DiffractionFrame'].reversedCheck.getState()) ? -1 : 0;
if (this.lineCount == 1) astart += 0.5;
for (i = 0; i != xlim; i++) {
var x0 = (i / this.b$['com.falstad.DiffractionFrame'].gridSizeX) - 0.5;
for (k = mink; k <= maxk; k++) {
var mult = this.b$['com.falstad.DiffractionFrame'].colorLenMults[k];
var ar = astart;
var ai = astart;
var d = 1;
for (j = 0; j != this.lineCount; j++) {
this.b$['com.falstad.DiffractionFrame'].fresnl$D$DA((x0 - this.lineLocations[j]) * mult, result);
ar += d * result[0];
ai += d * result[1];
d = -d;
}
this.b$['com.falstad.DiffractionFrame'].func[i][0][k] = 0.5 * (ar * ar + ai * ai);
}
}
});

Clazz.newMeth(C$, 'getDimension', function () {
return this.lineLocations[this.lineCount - 1] - this.lineLocations[0];
});

Clazz.newMeth(C$, 'drawGeometricShadow$java_awt_Graphics', function (g) {
var i;
var symsel = -1;
if (this.b$['com.falstad.DiffractionFrame'].selection != -1 && this.hasXSymmetry() ) symsel = this.lineCount - 1 - this.b$['com.falstad.DiffractionFrame'].selection ;
for (i = 0; i != this.lineCount; i++) {
var x = (((this.lineLocations[i] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.width)|0);
g.setColor$java_awt_Color((this.b$['com.falstad.DiffractionFrame'].selection == i || symsel == i ) ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(x, 0, x, this.b$['com.falstad.DiffractionFrame'].winSize.height - 1);
}
});

Clazz.newMeth(C$, 'getSelection$I$I', function (x, y) {
var xf = (x) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
var thresh = 3.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width;
var sel = -1;
var i;
for (i = 0; i != this.lineCount; i++) {
var dist = java.lang.Math.abs(this.lineLocations[i] - xf);
if (dist < thresh ) {
sel = i;
thresh = dist;
}}
return sel;
});

Clazz.newMeth(C$, 'drag$I$I', function (x, y) {
var xf = (x) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
if (this.b$['com.falstad.DiffractionFrame'].selection > 0 && xf <= this.lineLocations[this.b$['com.falstad.DiffractionFrame'].selection - 1]  ) return false;
if (this.b$['com.falstad.DiffractionFrame'].selection < this.lineCount - 1 && xf >= this.lineLocations[this.b$['com.falstad.DiffractionFrame'].selection + 1]  ) return false;
if (this.hasXSymmetry() && this.b$['com.falstad.DiffractionFrame'].sign$D(this.lineLocations[this.b$['com.falstad.DiffractionFrame'].selection]) != this.b$['com.falstad.DiffractionFrame'].sign$D(xf) ) return false;
this.lineLocations[this.b$['com.falstad.DiffractionFrame'].selection] = xf;
if (this.hasXSymmetry()) {
var symsel = this.lineCount - 1 - this.b$['com.falstad.DiffractionFrame'].selection ;
this.lineLocations[symsel] = -xf;
}this.b$['com.falstad.DiffractionFrame'].functionChanged = true;
return true;
});

Clazz.newMeth(C$, 'hideWhileDragging', function () {
return false;
});

Clazz.newMeth(C$, 'rezoom$D', function (z) {
var i;
for (i = 0; i != this.lineCount; i++) this.lineLocations[i] *= z;

});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "HalfPlaneAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.OneDimensionalAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setToDefaults', function () {
this.lineLocations = Clazz.array(Double.TYPE, [this.lineCount = 1]);
this.lineLocations[0] = 0;
});

Clazz.newMeth(C$, 'getName', function () {
return "half plane";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').SlitAperture))), [this, null]);
});

Clazz.newMeth(C$, 'getDimension', function () {
return 0.5 - this.lineLocations[0];
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "SlitAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.OneDimensionalAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setToDefaults', function () {
this.lineLocations = Clazz.array(Double.TYPE, [this.lineCount = 2]);
this.lineLocations[0] = -0.06;
this.lineLocations[1] = 0.06;
});

Clazz.newMeth(C$, 'defaultBrightness', function () {
return 200;
});

Clazz.newMeth(C$, 'getName', function () {
return "slit";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').DoubleSlitAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "DoubleSlitAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.OneDimensionalAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setToDefaults', function () {
this.lineLocations = Clazz.array(Double.TYPE, [this.lineCount = 4]);
this.lineLocations[0] = -0.17;
this.lineLocations[1] = -0.125;
this.lineLocations[2] = 0.125;
this.lineLocations[3] = 0.17;
});

Clazz.newMeth(C$, 'defaultBrightness', function () {
return 140;
});

Clazz.newMeth(C$, 'getName', function () {
return "double slit";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').TripleSlitAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "TripleSlitAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.OneDimensionalAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setToDefaults', function () {
this.lineLocations = Clazz.array(Double.TYPE, [this.lineCount = 6]);
this.lineLocations[0] = -0.1533;
this.lineLocations[1] = -0.1133;
this.lineLocations[2] = -0.02;
this.lineLocations[3] = 0.02;
this.lineLocations[4] = 0.1133;
this.lineLocations[5] = 0.1533;
});

Clazz.newMeth(C$, 'defaultBrightness', function () {
return 210;
});

Clazz.newMeth(C$, 'getName', function () {
return "triple slit";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').SquareAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "BlockAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.Aperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.blockCountX = 0;
this.blockCountY = 0;
this.blocks = null;
this.lineXLocations = null;
this.lineYLocations = null;
this.rectCount = 0;
this.rects = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'compute', function () {
this.setupRects();
var i;
var j;
var result1 = Clazz.array(Double.TYPE, [2]);
var result2 = Clazz.array(Double.TYPE, [2]);
var result3 = Clazz.array(Double.TYPE, [2]);
var result4 = Clazz.array(Double.TYPE, [2]);
var mink = 1;
var maxk = 1;
if (this.b$['com.falstad.DiffractionFrame'].color) {
mink = 0;
maxk = 2;
}var k;
var astart = (this.b$['com.falstad.DiffractionFrame'].reversedCheck.getState()) ? -1 : 0;
var xlim = (this.hasXSymmetry()) ? (this.b$['com.falstad.DiffractionFrame'].gridSizeX/2|0) : this.b$['com.falstad.DiffractionFrame'].gridSizeX;
var ylim = (this.hasYSymmetry()) ? (this.b$['com.falstad.DiffractionFrame'].gridSizeY/2|0) : this.b$['com.falstad.DiffractionFrame'].gridSizeY;
for (i = 0; i != xlim; i++) {
if (this.hasDiagonalSymmetry()) ylim = i + 1;
var x0 = (i / this.b$['com.falstad.DiffractionFrame'].gridSizeX) - 0.5;
for (j = 0; j != ylim; j++) {
var y0 = (j / this.b$['com.falstad.DiffractionFrame'].gridSizeY) - 0.5;
for (k = mink; k <= maxk; k++) {
var mult = this.b$['com.falstad.DiffractionFrame'].colorLenMults[k];
var ar = 0;
var ai = astart;
var l;
for (l = 0; l != this.rectCount; l++) {
this.b$['com.falstad.DiffractionFrame'].fresnl$D$DA((this.rects[l][0] - x0) * mult, result1);
this.b$['com.falstad.DiffractionFrame'].fresnl$D$DA((this.rects[l][2] - x0) * mult, result2);
this.b$['com.falstad.DiffractionFrame'].fresnl$D$DA((this.rects[l][1] - y0) * mult, result3);
this.b$['com.falstad.DiffractionFrame'].fresnl$D$DA((this.rects[l][3] - y0) * mult, result4);
var ar1 = result1[0] - result2[0];
var ai1 = result1[1] - result2[1];
var ar2 = result3[0] - result4[0];
var ai2 = result3[1] - result4[1];
ar += this.rects[l][4] * (ar1 * ar2 - ai1 * ai2);
ai += this.rects[l][4] * (ar1 * ai2 + ai1 * ar2);
}
this.b$['com.falstad.DiffractionFrame'].func[i][j][k] = ar * ar + ai * ai;
}
}
}
});

Clazz.newMeth(C$, 'drawGeometricShadow$java_awt_Graphics', function (g) {
var i;
var j;
for (i = 1; i < this.blockCountX; i = i+(2)) for (j = 0; j < this.blockCountY; j = j+(2)) {
if (this.blocks[i - 1][j] == this.blocks[i + 1][j] ) continue;
var x = (((this.lineXLocations[i] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.width)|0);
var y1 = 0;
var y2 = this.b$['com.falstad.DiffractionFrame'].winSize.height;
if (j > 0) y1 = (((this.lineYLocations[j - 1] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.height)|0);
if (j < this.lineYLocations.length - 1) y2 = (((this.lineYLocations[j + 1] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.height)|0);
g.setColor$java_awt_Color(this.isSelected$I$I(i, -1) ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(x, y1, x, y2);
}

for (i = 0; i < this.blockCountX; i = i+(2)) for (j = 1; j < this.blockCountY; j = j+(2)) {
if (this.blocks[i][j - 1] == this.blocks[i][j + 1] ) continue;
var y = (((this.lineYLocations[j] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.height)|0);
var x1 = 0;
var x2 = this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (i > 0) x1 = (((this.lineXLocations[i - 1] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.width)|0);
if (i < this.lineXLocations.length - 1) x2 = (((this.lineXLocations[i + 1] + 0.5) * this.b$['com.falstad.DiffractionFrame'].winSize.width)|0);
g.setColor$java_awt_Color(this.isSelected$I$I(-1, j) ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
g.drawLine$I$I$I$I(x1, y, x2, y);
}

});

Clazz.newMeth(C$, 'isSelected$I$I', function (x, y) {
return this.isSelected$I$I$I(x, y, 0);
});

Clazz.newMeth(C$, 'isSelected$I$I$I', function (x, y, iter) {
if (this.b$['com.falstad.DiffractionFrame'].selection == -1) return false;
if (this.b$['com.falstad.DiffractionFrame'].selection == x + 100 || this.b$['com.falstad.DiffractionFrame'].selection == y + 200 ) return true;
if (this.hasXSymmetry() && iter < 1  && this.blockCountX > 3  && this.isSelected$I$I$I(this.blockCountX - 1 - x , y, 1) ) return true;
if (this.hasYSymmetry() && iter < 2  && this.blockCountY > 3  && this.isSelected$I$I$I(x, this.blockCountY - 1 - y , 2) ) return true;
if (this.hasDiagonalSymmetry() && iter < 3  && this.isSelected$I$I$I(y, x, 3) ) return true;
return false;
});

Clazz.newMeth(C$, 'getSelection$I$I', function (x, y) {
var xf = (x) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
var yf = (y) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
var thresh = 3.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width;
var sel = -1;
var i;
for (i = 1; i < this.blockCountX; i = i+(2)) {
var dist = java.lang.Math.abs(this.lineXLocations[i] - xf);
if (dist < thresh ) {
sel = 100 + i;
thresh = dist;
}}
for (i = 1; i < this.blockCountY; i = i+(2)) {
var dist = java.lang.Math.abs(this.lineYLocations[i] - yf);
if (dist < thresh ) {
sel = 200 + i;
thresh = dist;
}}
return sel;
});

Clazz.newMeth(C$, 'drag$I$I', function (x, y) {
var xf = (x) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
var yf = (y) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
if (this.b$['com.falstad.DiffractionFrame'].selection >= 200) return this.dragLine$I$I$D$I(-1, this.b$['com.falstad.DiffractionFrame'].selection - 200, yf, 0);
 else return this.dragLine$I$I$D$I(this.b$['com.falstad.DiffractionFrame'].selection - 100, -1, xf, 0);
});

Clazz.newMeth(C$, 'rezoom$D', function (z) {
var i;
for (i = 1; i < this.blockCountX; i = i+(2)) this.lineXLocations[i] *= z;

for (i = 1; i < this.blockCountY; i = i+(2)) this.lineYLocations[i] *= z;

});

Clazz.newMeth(C$, 'dragLine$I$I$D$I', function (x, y, loc, iter) {
if (x != -1) {
if (this.hasXSymmetry() && this.b$['com.falstad.DiffractionFrame'].sign$D(this.lineXLocations[x]) != this.b$['com.falstad.DiffractionFrame'].sign$D(loc) ) return false;
if (x > 1 && loc <= this.lineXLocations[x - 2]  ) return false;
if (x < this.blockCountX - 2 && loc >= this.lineXLocations[x + 2]  ) return false;
}if (y != -1) {
if (this.hasYSymmetry() && this.b$['com.falstad.DiffractionFrame'].sign$D(this.lineYLocations[y]) != this.b$['com.falstad.DiffractionFrame'].sign$D(loc) ) return false;
if (y > 1 && loc <= this.lineYLocations[y - 2]  ) return false;
if (y < this.blockCountY - 2 && loc >= this.lineYLocations[y + 2]  ) return false;
}if (x != -1 && this.hasXSymmetry()  && iter < 1 ) this.dragLine$I$I$D$I(this.blockCountX - 1 - x , y, -loc, 1);
if (y != -1 && this.hasYSymmetry()  && iter < 2 ) this.dragLine$I$I$D$I(x, this.blockCountY - 1 - y , -loc, 2);
if (this.hasDiagonalSymmetry() && iter < 3 ) this.dragLine$I$I$D$I(y, x, loc, 3);
if (x != -1) this.lineXLocations[x] = loc;
if (y != -1) this.lineYLocations[y] = loc;
return true;
});

Clazz.newMeth(C$, 'getDimension', function () {
return this.lineXLocations[this.blockCountX - 2] - this.lineXLocations[1];
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "SquareAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "square";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').RectangularAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
var sqdim = 0.25;
this.blockCountX = this.blockCountY = 5;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
this.blocks[2][2] = true;
this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -sqdim;
this.lineXLocations[3] = sqdim;
this.lineYLocations[1] = -sqdim;
this.lineYLocations[3] = sqdim;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 1;
this.rects = Clazz.array(Double.TYPE, [1, 5]);
var sqdim = this.lineXLocations[3];
this.rects[0][0] = -sqdim;
this.rects[0][1] = -sqdim;
this.rects[0][2] = sqdim;
this.rects[0][3] = sqdim;
this.rects[0][4] = 0.5;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "RectangularAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "rectangle";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').CornerAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.blockCountX = this.blockCountY = 5;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
this.blocks[2][2] = true;
this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -0.25;
this.lineXLocations[3] = 0.25;
this.lineYLocations[1] = -0.4;
this.lineYLocations[3] = 0.4;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 1;
this.rects = Clazz.array(Double.TYPE, [1, 5]);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[3];
this.rects[0][3] = this.lineYLocations[3];
this.rects[0][4] = 0.5;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "CornerAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "corner";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').CrossAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.blockCountX = this.blockCountY = 3;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
this.blocks[2][2] = true;
this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = 0;
this.lineYLocations[1] = 0;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 1;
this.rects = Clazz.array(Double.TYPE, [1, 5]);
var sqdim = this.lineXLocations[1];
this.rects[0][0] = sqdim;
this.rects[0][1] = sqdim;
this.rects[0][2] = 1.0E8;
this.rects[0][3] = 1.0E8;
this.rects[0][4] = 0.5;
});

Clazz.newMeth(C$, 'getDimension', function () {
return 0.5 - this.lineXLocations[1];
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "CrossAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "cross";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').RectanglesAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
var sqdim = 0.0625;
this.blockCountX = this.blockCountY = 5;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
this.blocks[0][2] = this.blocks[2][2] = this.blocks[4][2] = this.blocks[2][0] = this.blocks[2][4] = true;
this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -sqdim;
this.lineXLocations[3] = sqdim;
this.lineYLocations[1] = -sqdim;
this.lineYLocations[3] = sqdim;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 3;
this.rects = Clazz.array(Double.TYPE, [3, 5]);
var sqdim = this.lineXLocations[3];
this.rects[0][0] = -sqdim;
this.rects[0][1] = -1.0E8;
this.rects[0][2] = sqdim;
this.rects[0][3] = 1.0E8;
this.rects[0][4] = 0.5;
this.rects[1][0] = -1.0E8;
this.rects[1][1] = -sqdim;
this.rects[1][2] = 1.0E8;
this.rects[1][3] = sqdim;
this.rects[1][4] = 0.5;
this.rects[2][0] = -sqdim;
this.rects[2][1] = -sqdim;
this.rects[2][2] = sqdim;
this.rects[2][3] = sqdim;
this.rects[2][4] = -0.5;
});

Clazz.newMeth(C$, 'getDimension', function () {
return 1;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "RectanglesAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 rectangles";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').FrameAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.blockCountX = 9;
this.blockCountY = 5;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
this.blocks[2][2] = this.blocks[6][2] = true;
this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = 0.125;
this.lineXLocations[7] = 0.375;
this.lineYLocations[1] = -0.25;
this.lineYLocations[3] = 0.25;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 2;
this.rects = Clazz.array(Double.TYPE, [2, 5]);
var sqdim = this.lineXLocations[1];
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[3];
this.rects[0][3] = this.lineYLocations[3];
this.rects[0][4] = 0.5;
this.rects[1][0] = this.lineXLocations[5];
this.rects[1][1] = this.lineYLocations[1];
this.rects[1][2] = this.lineXLocations[7];
this.rects[1][3] = this.lineYLocations[3];
this.rects[1][4] = 0.5;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "FrameAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "frame";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').PlusAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.blockCountX = this.blockCountY = 9;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
var i;
for (i = 2; i <= 6; i = i+(2)) this.blocks[i][2] = this.blocks[i][6] = this.blocks[2][i] = this.blocks[6][i] = true;

this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = 0.125;
this.lineXLocations[7] = 0.375;
this.lineYLocations[1] = -0.375;
this.lineYLocations[3] = -0.125;
this.lineYLocations[5] = 0.125;
this.lineYLocations[7] = 0.375;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 2;
this.rects = Clazz.array(Double.TYPE, [2, 5]);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[7];
this.rects[0][3] = this.lineYLocations[7];
this.rects[0][4] = 0.5;
this.rects[1][0] = this.lineXLocations[3];
this.rects[1][1] = this.lineYLocations[3];
this.rects[1][2] = this.lineXLocations[5];
this.rects[1][3] = this.lineYLocations[5];
this.rects[1][4] = -0.5;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "PlusAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "plus";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').IntersectingSquaresAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.blockCountX = this.blockCountY = 9;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
var i;
for (i = 2; i <= 6; i = i+(2)) this.blocks[i][4] = this.blocks[4][i] = true;

this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = 0.125;
this.lineXLocations[7] = 0.375;
this.lineYLocations[1] = -0.375;
this.lineYLocations[3] = -0.125;
this.lineYLocations[5] = 0.125;
this.lineYLocations[7] = 0.375;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 3;
this.rects = Clazz.array(Double.TYPE, [3, 5]);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[3];
this.rects[0][2] = this.lineXLocations[7];
this.rects[0][3] = this.lineYLocations[5];
this.rects[0][4] = 0.5;
this.rects[1][0] = this.lineXLocations[3];
this.rects[1][1] = this.lineYLocations[1];
this.rects[1][2] = this.lineXLocations[5];
this.rects[1][3] = this.lineYLocations[7];
this.rects[1][4] = 0.5;
this.rects[2][0] = this.lineXLocations[3];
this.rects[2][1] = this.lineYLocations[3];
this.rects[2][2] = this.lineXLocations[5];
this.rects[2][3] = this.lineYLocations[5];
this.rects[2][4] = -0.5;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "IntersectingSquaresAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.BlockAperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 squares";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').DoubleCircleAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.blockCountX = this.blockCountY = 9;
this.blocks = Clazz.array(Boolean.TYPE, [this.blockCountX, this.blockCountY]);
var i;
for (i = 2; i <= 6; i = i+(2)) this.blocks[i][4] = this.blocks[4][i] = true;

this.blocks[2][2] = this.blocks[6][6] = true;
this.lineXLocations = Clazz.array(Double.TYPE, [this.blockCountX]);
this.lineYLocations = Clazz.array(Double.TYPE, [this.blockCountY]);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = 0.125;
this.lineXLocations[7] = 0.375;
this.lineYLocations[1] = -0.375;
this.lineYLocations[3] = -0.125;
this.lineYLocations[5] = 0.125;
this.lineYLocations[7] = 0.375;
});

Clazz.newMeth(C$, 'setupRects', function () {
this.rectCount = 3;
this.rects = Clazz.array(Double.TYPE, [3, 5]);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[5];
this.rects[0][3] = this.lineYLocations[5];
this.rects[0][4] = 0.5;
this.rects[1][0] = this.lineXLocations[3];
this.rects[1][1] = this.lineYLocations[3];
this.rects[1][2] = this.lineXLocations[7];
this.rects[1][3] = this.lineYLocations[7];
this.rects[1][4] = 0.5;
this.rects[2][0] = this.lineXLocations[3];
this.rects[2][1] = this.lineYLocations[3];
this.rects[2][2] = this.lineXLocations[5];
this.rects[2][3] = this.lineYLocations[5];
this.rects[2][4] = -0.5;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "DoubleCircleAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.Aperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.radius = 0;
this.offset = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "2 circles";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').RingAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.radius = 0.3;
this.offset = 0.25;
});

Clazz.newMeth(C$, 'getDimension', function () {
return (this.radius + this.offset) * 2;
});

Clazz.newMeth(C$, 'compute', function () {
var i;
var j;
var points = Clazz.array(Double.TYPE, [4]);
var dx = this.offset;
var dy = 0;
var intersecting = (this.offset < this.radius );
if (intersecting) {
dy = java.lang.Math.sqrt(this.radius * this.radius - this.offset * this.offset);
var overflow = this.radius - 2 * this.offset;
if (overflow > 0 ) dx = this.offset + overflow;
}for (i = 0; i != (this.b$['com.falstad.DiffractionFrame'].gridSizeX/2|0); i++) {
for (j = 0; j != (this.b$['com.falstad.DiffractionFrame'].gridSizeY/2|0); j++) {
this.b$['com.falstad.DiffractionFrame'].clearAccum();
var x0 = (i / this.b$['com.falstad.DiffractionFrame'].gridSizeX) - 0.5;
var y0 = (j / this.b$['com.falstad.DiffractionFrame'].gridSizeY) - 0.5;
var th;
var cx1 = -x0 + this.offset;
var cx2 = -x0 - this.offset;
var cy = -y0;
var c21 = cx1 * cx1 + cy * cy;
var c22 = cx2 * cx2 + cy * cy;
var cr2 = this.radius * this.radius;
var cd1 = c21 - cr2;
var cd2 = c22 - cr2;
var ac41 = cd1 * 4;
var ac42 = cd2 * 4;
var th1 = 0;
var th2 = 6.283185307179586;
var th1i = (((th1 * this.b$['com.falstad.DiffractionFrame'].angleSteps) / 6.283185307179586)|0);
var th2i = (((th2 * this.b$['com.falstad.DiffractionFrame'].angleSteps) / 6.283185307179586)|0);
while (th1i < 0){
th1i = th1i+(this.b$['com.falstad.DiffractionFrame'].angleSteps);
th2i = th2i+(this.b$['com.falstad.DiffractionFrame'].angleSteps);
}
var open = cd1 < 0  || cd2 < 0  ;
this.b$['com.falstad.DiffractionFrame'].apertureStartOrigin$Z(open);
for (th = th1i; th < th2i; th++) {
var costh = this.b$['com.falstad.DiffractionFrame'].angcos1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var sinth = this.b$['com.falstad.DiffractionFrame'].angsin1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var b1 = -2 * (costh * cx1 + sinth * cy);
var b2 = -2 * (costh * cx2 + sinth * cy);
var discrim1 = b1 * b1 - ac41;
var discrim2 = b2 * b2 - ac42;
if (discrim1 < 0  && discrim2 < 0  ) continue;
var ct = 0;
if (discrim1 >= 0 ) {
discrim1 = java.lang.Math.sqrt(discrim1);
points[ct++] = 0.5 * (-b1 - discrim1);
points[ct++] = 0.5 * (-b1 + discrim1);
}if (discrim2 >= 0 ) {
discrim2 = java.lang.Math.sqrt(discrim2);
points[ct++] = 0.5 * (-b2 - discrim2);
points[ct++] = 0.5 * (-b2 + discrim2);
}var si;
var sj;
for (si = 1; si < ct; si++) {
var v = points[si];
sj = si;
while (points[sj - 1] > v ){
points[sj] = points[sj - 1];
sj--;
if (sj <= 0) break;
}
points[sj] = v;
}
var inOpen = open;
for (si = 0; si != ct; si++) {
var r = points[si];
if (r < 0 ) continue;
var x1 = x0 + costh * r;
var y1 = y0 + sinth * r;
if (intersecting && x1 > -dx   && x1 < dx   && y1 > -dy   && y1 < dy  ) {
var y12 = y1 * y1;
if ((x1 - this.offset) * (x1 - this.offset) + y12 < cr2  || (x1 + this.offset) * (x1 + this.offset) + y12 < cr2  ) continue;
}if (!inOpen) {
this.b$['com.falstad.DiffractionFrame'].apertureStart$D(points[si]);
inOpen = true;
} else {
this.b$['com.falstad.DiffractionFrame'].apertureStop$D(points[si]);
inOpen = false;
}}
}
this.b$['com.falstad.DiffractionFrame'].setFunction$I$I(i, j);
}
}
});

Clazz.newMeth(C$, 'drawGeometricShadow$java_awt_Graphics', function (g) {
var r = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.radius)|0);
var o = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.offset)|0);
if (this.b$['com.falstad.DiffractionFrame'].selection != -1) {
g.setColor$java_awt_Color(this.b$['com.falstad.DiffractionFrame'].selection == 0 ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
var or = 5;
g.fillOval$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - o - or, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - or, or * 2, or * 2);
g.fillOval$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) + o - or, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - or, or * 2, or * 2);
}g.setColor$java_awt_Color(this.b$['com.falstad.DiffractionFrame'].selection > 0 ? (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow : (I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
var th = 0;
if (this.offset < this.radius ) th = ((java.lang.Math.acos(this.offset / this.radius) * 57.29577951308232)|0);
g.drawArc$I$I$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - r - o, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, r * 2, r * 2, th, 360 - 2 * th);
g.drawArc$I$I$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - r + o, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, r * 2, r * 2, 180 + th, 360 - 2 * th);
});

Clazz.newMeth(C$, 'getSelection$I$I', function (x, y) {
var o = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.offset)|0);
var rx1 = ((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - o) - x;
var rx2 = ((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) + o) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx1 * rx1 + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (java.lang.Math.abs(r - this.radius) < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) return 1;
if (r < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) return 0;
r = java.lang.Math.sqrt(rx2 * rx2 + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (java.lang.Math.abs(r - this.radius) < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) return 2;
if (r < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) return 0;
return -1;
});

Clazz.newMeth(C$, 'drag$I$I', function (x, y) {
if (this.b$['com.falstad.DiffractionFrame'].selection == 0) {
var xf = (x) / this.b$['com.falstad.DiffractionFrame'].winSize.width - 0.5;
var o = java.lang.Math.abs(xf);
if (o == this.offset ) return false;
this.offset = o;
return true;
}var o = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.offset)|0);
var rx1 = ((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - o) - x;
var rx2 = ((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) + o) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var rr;
if (this.b$['com.falstad.DiffractionFrame'].selection == 2) rr = rx2 * rx2;
 else rr = rx1 * rx1;
var r = java.lang.Math.sqrt(rr + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (r == this.radius ) return false;
this.radius = r;
return true;
});

Clazz.newMeth(C$, 'rezoom$D', function (z) {
this.radius *= z;
this.offset *= z;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "RingAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.Aperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.radius1 = 0;
this.radius2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "ring";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.DiffractionFrame').HalfCircleAperture))), [this, null]);
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.radius1 = 0.15;
this.radius2 = 0.25;
});

Clazz.newMeth(C$, 'rezoom$D', function (z) {
this.radius1 *= z;
this.radius2 *= z;
});

Clazz.newMeth(C$, 'compute', function () {
var i;
var j;
for (i = 0; i != (this.b$['com.falstad.DiffractionFrame'].gridSizeX/2|0); i++) {
for (j = 0; j <= i; j++) {
this.b$['com.falstad.DiffractionFrame'].clearAccum();
var x0 = (i / this.b$['com.falstad.DiffractionFrame'].gridSizeX) - 0.5;
var y0 = (j / this.b$['com.falstad.DiffractionFrame'].gridSizeY) - 0.5;
var th;
var cx = -x0;
var cy = -y0;
var c2 = cx * cx + cy * cy;
var cr = this.radius2;
var c = c2 - cr * cr;
var ac4 = c * 4;
var cin = c2 - this.radius1 * this.radius1;
var ac4in = cin * 4;
var th1 = 0;
if (c <= 0 ) {
} else {
var a = java.lang.Math.atan2(cy, cx);
th1 = (((a * this.b$['com.falstad.DiffractionFrame'].angleSteps) / 6.283185307179586)|0);
}var dir = 1;
for (th = th1; th != th1 + this.b$['com.falstad.DiffractionFrame'].angleSteps; th = th+(dir)) {
var costh = this.b$['com.falstad.DiffractionFrame'].angcos1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var sinth = this.b$['com.falstad.DiffractionFrame'].angsin1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var b = -2 * (costh * cx + sinth * cy);
var discrim_out = b * b - ac4;
var discrim_in = b * b - ac4in;
if (discrim_out < 0  && discrim_in < 0  ) {
if (dir == -1) break;
dir = -1;
th = th1;
continue;
}var disc = java.lang.Math.sqrt(discrim_in);
var r1in = 0.5 * (-b - disc);
var r2in = 0.5 * (-b + disc);
disc = java.lang.Math.sqrt(discrim_out);
var r1out = 0.5 * (-b - disc);
var r2out = 0.5 * (-b + disc);
if (r1out > 0 ) this.b$['com.falstad.DiffractionFrame'].apertureStart$D(r1out);
if (r1in > 0 ) this.b$['com.falstad.DiffractionFrame'].apertureStop$D(r1in);
if (r2in > 0 ) this.b$['com.falstad.DiffractionFrame'].apertureStart$D(r2in);
if (r2out > 0 ) this.b$['com.falstad.DiffractionFrame'].apertureStop$D(r2out);
}
this.b$['com.falstad.DiffractionFrame'].apertureStartOrigin$Z(c < 0  && cin >= 0  );
this.b$['com.falstad.DiffractionFrame'].setFunction$I$I(i, j);
}
}
});

Clazz.newMeth(C$, 'drawGeometricShadow$java_awt_Graphics', function (g) {
if (this.b$['com.falstad.DiffractionFrame'].selection == 1) g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
var r = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.radius1)|0);
g.drawOval$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - r, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, r * 2, r * 2);
g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).red);
if (this.b$['com.falstad.DiffractionFrame'].selection == 2) g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
r = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.radius2)|0);
g.drawOval$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - r, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, r * 2, r * 2);
});

Clazz.newMeth(C$, 'getSelection$I$I', function (x, y) {
var rx = (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx * rx + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
return (java.lang.Math.abs(r - this.radius1) < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) ? 1 : (java.lang.Math.abs(r - this.radius2) < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) ? 2 : -1;
});

Clazz.newMeth(C$, 'drag$I$I', function (x, y) {
var rx = (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx * rx + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (this.b$['com.falstad.DiffractionFrame'].selection == 1) {
if (r == this.radius1  || r >= this.radius2  ) return false;
this.radius1 = r;
} else {
if (r == this.radius2  || r <= this.radius1  ) return false;
this.radius2 = r;
}return true;
});

Clazz.newMeth(C$, 'getDimension', function () {
return this.radius2 * 2;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffractionFrame, "HalfCircleAperture", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffractionFrame','com.falstad.DiffractionFrame.Aperture']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.radius = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "half circle";
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$, 'hasXSymmetry', function () {
return false;
});

Clazz.newMeth(C$, 'hasYSymmetry', function () {
return true;
});

Clazz.newMeth(C$, 'hasDiagonalSymmetry', function () {
return false;
});

Clazz.newMeth(C$, 'setToDefaults', function () {
this.radius = 0.25;
});

Clazz.newMeth(C$, 'rezoom$D', function (z) {
this.radius *= z;
});

Clazz.newMeth(C$, 'compute', function () {
var i;
var j;
for (i = 0; i != this.b$['com.falstad.DiffractionFrame'].gridSizeX; i++) {
for (j = 0; j != (this.b$['com.falstad.DiffractionFrame'].gridSizeY/2|0); j++) {
this.b$['com.falstad.DiffractionFrame'].clearAccum();
var x0 = ((i + 0.25) / this.b$['com.falstad.DiffractionFrame'].gridSizeX) - 0.5;
var y0 = (j / this.b$['com.falstad.DiffractionFrame'].gridSizeY) - 0.5;
var th;
var cx = -x0;
var cy = -y0;
var c2 = cx * cx + cy * cy;
var cr = this.radius;
var c = c2 - cr * cr;
var ac4 = c * 4;
var th1 = 0;
if (c <= 0 ) {
} else {
var a = java.lang.Math.atan2(cy, cx);
th1 = (((a * this.b$['com.falstad.DiffractionFrame'].angleSteps) / 6.283185307179586)|0);
}var dir = 1;
for (th = th1; th != th1 + this.b$['com.falstad.DiffractionFrame'].angleSteps; th = th+(dir)) {
var costh = this.b$['com.falstad.DiffractionFrame'].angcos1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var sinth = this.b$['com.falstad.DiffractionFrame'].angsin1[th & this.b$['com.falstad.DiffractionFrame'].angleStepsMask];
var b = -2 * (costh * cx + sinth * cy);
var discrim = b * b - ac4;
if (discrim < 0 ) {
if (dir == -1) break;
dir = -1;
th = th1;
continue;
}var ry = -x0 / costh;
discrim = java.lang.Math.sqrt(discrim);
var r1 = 0.5 * (-b - discrim);
var r2 = 0.5 * (-b + discrim);
if (x0 + r1 * costh < 0 ) r1 = ry;
if (x0 + r2 * costh < 0 ) {
r2 = ry;
if (r1 == ry ) {
if (dir == -1) break;
dir = -1;
th = th1;
continue;
}}if (r1 < 0  && r2 < 0  ) continue;
if (r1 > 0 ) this.b$['com.falstad.DiffractionFrame'].apertureStart$D(r1);
this.b$['com.falstad.DiffractionFrame'].apertureStop$D(r2);
}
this.b$['com.falstad.DiffractionFrame'].apertureStartOrigin$Z(c < 0  && x0 >= 0  );
this.b$['com.falstad.DiffractionFrame'].setFunction$I$I(i, j);
}
}
});

Clazz.newMeth(C$, 'drawGeometricShadow$java_awt_Graphics', function (g) {
if (this.b$['com.falstad.DiffractionFrame'].selection == 1) g.setColor$java_awt_Color((I$[3]||(I$[3]=Clazz.load('java.awt.Color'))).yellow);
var r = ((this.b$['com.falstad.DiffractionFrame'].winSize.width * this.radius)|0);
g.drawArc$I$I$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - r, (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, r * 2, r * 2, -90, 180);
g.drawLine$I$I$I$I((this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0), (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - r, (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0), (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) + r);
});

Clazz.newMeth(C$, 'getSelection$I$I', function (x, y) {
if (x < 0) return -1;
var rx = (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx * rx + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
return (java.lang.Math.abs(r - this.radius) < 5.0 / this.b$['com.falstad.DiffractionFrame'].winSize.width ) ? 1 : -1;
});

Clazz.newMeth(C$, 'drag$I$I', function (x, y) {
var rx = (this.b$['com.falstad.DiffractionFrame'].winSize.width/2|0) - x;
var ry = (this.b$['com.falstad.DiffractionFrame'].winSize.height/2|0) - y;
var r = java.lang.Math.sqrt(rx * rx + ry * ry) / this.b$['com.falstad.DiffractionFrame'].winSize.width;
if (r == this.radius ) return false;
this.radius = r;
return true;
});

Clazz.newMeth(C$, 'getDimension', function () {
return this.radius * 2;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:02
