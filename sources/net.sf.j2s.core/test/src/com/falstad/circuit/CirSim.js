(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "CirSim", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener', 'java.awt.event.KeyListener']);
C$.muString = null;
C$.ohmString = null;
C$.BASE_CLASS_PREFIX = null;
C$.STARTUP_READ_COUNT = 0;
C$.foundSite = 0;
var p$=C$.prototype;
C$.elmData = null;
C$.elmKey = null;
C$.elmMap = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.muString = "u";
C$.ohmString = "ohm";
C$.BASE_CLASS_PREFIX = null;
C$.STARTUP_READ_COUNT = 0;
C$.foundSite = -1;
C$.elmData = Clazz.array(java.lang.String, -2, [Clazz.array(java.lang.String, -1, ["ACRailElm", "RailElm", "82", null]), Clazz.array(java.lang.String, -1, ["ACVoltageElm", "VoltageElm", "118", null]), Clazz.array(java.lang.String, -1, ["ADCElm", null, "167", null]), Clazz.array(java.lang.String, -1, ["AMElm", null, "200", null]), Clazz.array(java.lang.String, -1, ["AnalogSwitch2Elm", null, "160", null]), Clazz.array(java.lang.String, -1, ["AnalogSwitchElm", null, "159", null]), Clazz.array(java.lang.String, -1, ["AndGateElm", null, "150", "50"]), Clazz.array(java.lang.String, -1, ["AntennaElm", null, "65", null]), Clazz.array(java.lang.String, -1, ["BoxElm", null, "98", null]), Clazz.array(java.lang.String, -1, ["CapacitorElm", null, "99", "99"]), Clazz.array(java.lang.String, -1, ["CC2Elm", null, "179", null]), Clazz.array(java.lang.String, -1, ["CC2NegElm", "CC2Elm", "179", null]), Clazz.array(java.lang.String, -1, ["ClockElm", "RailElm", "82", null]), Clazz.array(java.lang.String, -1, ["CounterElm", null, "164", null]), Clazz.array(java.lang.String, -1, ["CurrentElm", null, "105", null]), Clazz.array(java.lang.String, -1, ["DACElm", null, "166", null]), Clazz.array(java.lang.String, -1, ["DCVoltageElm", "VoltageElm", "118", "118"]), Clazz.array(java.lang.String, -1, ["DecadeElm", null, "163", null]), Clazz.array(java.lang.String, -1, ["DeMultiplexerElm", null, "185", null]), Clazz.array(java.lang.String, -1, ["DFlipFlopElm", null, "155", null]), Clazz.array(java.lang.String, -1, ["DiodeElm", null, "100", "100"]), Clazz.array(java.lang.String, -1, ["FMElm", null, "201", null]), Clazz.array(java.lang.String, -1, ["FullAdderElm", null, "196", null]), Clazz.array(java.lang.String, -1, ["GroundElm", null, "103", "103"]), Clazz.array(java.lang.String, -1, ["HalfAdderElm", null, "195", null]), Clazz.array(java.lang.String, -1, ["InductorElm", null, "108", null]), Clazz.array(java.lang.String, -1, ["InverterElm", null, "73", "49"]), Clazz.array(java.lang.String, -1, ["InvertingSchmittElm", null, "183", null]), Clazz.array(java.lang.String, -1, ["JKFlipFlopElm", null, "156", null]), Clazz.array(java.lang.String, -1, ["LampElm", null, "181", null]), Clazz.array(java.lang.String, -1, ["LatchElm", null, "168", null]), Clazz.array(java.lang.String, -1, ["LEDElm", null, "162", "108"]), Clazz.array(java.lang.String, -1, ["LEDMatrixElm", null, "207", null]), Clazz.array(java.lang.String, -1, ["LogicInputElm", null, "76", "105"]), Clazz.array(java.lang.String, -1, ["LogicOutputElm", null, "77", "111"]), Clazz.array(java.lang.String, -1, ["MemristorElm", null, "109", null]), Clazz.array(java.lang.String, -1, ["MonostableElm", null, "194", null]), Clazz.array(java.lang.String, -1, ["MultiplexerElm", null, "184", null]), Clazz.array(java.lang.String, -1, ["NandGateElm", null, "151", "64"]), Clazz.array(java.lang.String, -1, ["NJfetElm", "JfetElm", "106", null]), Clazz.array(java.lang.String, -1, ["NMosfetElm", "MosfetElm", "102", null]), Clazz.array(java.lang.String, -1, ["NorGateElm", null, "153", "35"]), Clazz.array(java.lang.String, -1, ["NTransistorElm", "TransistorElm", "116", null]), Clazz.array(java.lang.String, -1, ["OpAmpElm", null, "97", null]), Clazz.array(java.lang.String, -1, ["OpAmpSwapElm", "OpAmpElm", "97", null]), Clazz.array(java.lang.String, -1, ["OrGateElm", null, "152", "51"]), Clazz.array(java.lang.String, -1, ["OutputElm", null, "79", null]), Clazz.array(java.lang.String, -1, ["PhaseCompElm", null, "161", null]), Clazz.array(java.lang.String, -1, ["PisoShiftElm", null, "186", null]), Clazz.array(java.lang.String, -1, ["PJfetElm", "JfetElm", "106", null]), Clazz.array(java.lang.String, -1, ["PMosfetElm", "MosfetElm", "102", null]), Clazz.array(java.lang.String, -1, ["PotElm", null, "174", null]), Clazz.array(java.lang.String, -1, ["ProbeElm", null, "112", null]), Clazz.array(java.lang.String, -1, ["PTransistorElm", "TransistorElm", "116", null]), Clazz.array(java.lang.String, -1, ["PushSwitchElm", "SwitchElm", "115", null]), Clazz.array(java.lang.String, -1, ["RailElm", null, "82", "86"]), Clazz.array(java.lang.String, -1, ["RelayElm", null, "178", "82"]), Clazz.array(java.lang.String, -1, ["ResistorElm", null, "114", "114"]), Clazz.array(java.lang.String, -1, ["SchmittElm", null, "182", null]), Clazz.array(java.lang.String, -1, ["SCRElm", null, "177", null]), Clazz.array(java.lang.String, -1, ["SeqGenElm", null, "188", null]), Clazz.array(java.lang.String, -1, ["SevenSegDecoderElm", null, "197", null]), Clazz.array(java.lang.String, -1, ["SevenSegElm", null, "157", null]), Clazz.array(java.lang.String, -1, ["SipoShiftElm", null, "189", null]), Clazz.array(java.lang.String, -1, ["SparkGapElm", null, "187", null]), Clazz.array(java.lang.String, -1, ["SquareRailElm", "RailElm", "82", null]), Clazz.array(java.lang.String, -1, ["SweepElm", null, "170", null]), Clazz.array(java.lang.String, -1, ["Switch2Elm", null, "83", "83"]), Clazz.array(java.lang.String, -1, ["SwitchElm", null, "115", "115"]), Clazz.array(java.lang.String, -1, ["TappedTransformerElm", null, "169", null]), Clazz.array(java.lang.String, -1, ["TextElm", null, "120", "116"]), Clazz.array(java.lang.String, -1, ["TFlipFlopElm", null, "193", null]), Clazz.array(java.lang.String, -1, ["TimerElm", null, "165", null]), Clazz.array(java.lang.String, -1, ["TransformerElm", null, "84", null]), Clazz.array(java.lang.String, -1, ["TransLineElm", null, "171", null]), Clazz.array(java.lang.String, -1, ["TriodeElm", null, "173", null]), Clazz.array(java.lang.String, -1, ["TriStateElm", null, "180", null]), Clazz.array(java.lang.String, -1, ["TunnelDiodeElm", null, "175", null]), Clazz.array(java.lang.String, -1, ["VarRailElm", null, "172", null]), Clazz.array(java.lang.String, -1, ["VCOElm", null, "158", null]), Clazz.array(java.lang.String, -1, ["WireElm", null, "119", "119"]), Clazz.array(java.lang.String, -1, ["XorGateElm", null, "154", "52"]), Clazz.array(java.lang.String, -1, ["ZenerElm", null, "122", null])]);
C$.elmKey = Clazz.array(java.lang.String, -1, ["", "", "d", "s"]);
C$.elmMap = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.util.Hashtable'))));
{
for (var i = C$.elmData.length; --i >= 0; ) {
var data = C$.elmData[i];
if (data[1] == null ) data[1] = data[0];
for (var j = 0; j < 4; j++) if (data[j] != null ) C$.elmMap.put$TK$TV(C$.elmKey[j] + data[j], data);

}
}
;
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.main = null;
this.titleLabel = null;
this.resetButton = null;
this.dumpMatrixButton = null;
this.exportItem = null;
this.exportLinkItem = null;
this.importItem = null;
this.exitItem = null;
this.undoItem = null;
this.redoItem = null;
this.cutItem = null;
this.copyItem = null;
this.pasteItem = null;
this.selectAllItem = null;
this.optionsItem = null;
this.optionsMenu = null;
this.stoppedCheck = null;
this.dotsCheckItem = null;
this.voltsCheckItem = null;
this.powerCheckItem = null;
this.smallGridCheckItem = null;
this.showValuesCheckItem = null;
this.conductanceCheckItem = null;
this.euroResistorCheckItem = null;
this.printableCheckItem = null;
this.conventionCheckItem = null;
this.speedBar = null;
this.currentBar = null;
this.powerLabel = null;
this.powerBar = null;
this.elmMenu = null;
this.elmEditMenuItem = null;
this.elmCutMenuItem = null;
this.elmCopyMenuItem = null;
this.elmDeleteMenuItem = null;
this.elmScopeMenuItem = null;
this.scopeMenu = null;
this.transScopeMenu = null;
this.mainMenu = null;
this.scopeVMenuItem = null;
this.scopeIMenuItem = null;
this.scopeMaxMenuItem = null;
this.scopeMinMenuItem = null;
this.scopeFreqMenuItem = null;
this.scopePowerMenuItem = null;
this.scopeIbMenuItem = null;
this.scopeIcMenuItem = null;
this.scopeIeMenuItem = null;
this.scopeVbeMenuItem = null;
this.scopeVbcMenuItem = null;
this.scopeVceMenuItem = null;
this.scopeVIMenuItem = null;
this.scopeXYMenuItem = null;
this.scopeResistMenuItem = null;
this.scopeVceIcMenuItem = null;
this.scopeSelectYMenuItem = null;
this.addingClass = null;
this.mouseMode = 0;
this.tempMouseMode = 0;
this.mouseModeStr = null;
this.dragX = 0;
this.dragY = 0;
this.initDragX = 0;
this.initDragY = 0;
this.selectedSource = 0;
this.selectedArea = null;
this.gridSize = 0;
this.gridMask = 0;
this.gridRound = 0;
this.dragging = false;
this.analyzeFlag = false;
this.dumpMatrix = false;
this.useBufferedImage = false;
this.isMac = false;
this.ctrlMetaKey = null;
this.t = 0;
this.pause = 0;
this.scopeSelected = 0;
this.menuScope = 0;
this.hintType = 0;
this.hintItem1 = 0;
this.hintItem2 = 0;
this.stopMessage = null;
this.timeStep = 0;
this.BASE_PACKAGE = null;
this.elmList = null;
this.dragElm = null;
this.menuElm = null;
this.mouseElm = null;
this.stopElm = null;
this.didSwitch = false;
this.mousePost = 0;
this.plotXElm = null;
this.plotYElm = null;
this.draggingPost = 0;
this.heldSwitchElm = null;
this.circuitMatrix = null;
this.circuitRightSide = null;
this.origRightSide = null;
this.origMatrix = null;
this.circuitRowInfo = null;
this.circuitPermute = null;
this.circuitNonLinear = false;
this.voltageSourceCount = 0;
this.circuitMatrixSize = 0;
this.circuitMatrixFullSize = 0;
this.circuitNeedsMap = false;
this.useFrame = false;
this.scopeCount = 0;
this.scopes = null;
this.scopeColCount = null;
this.editDialog = null;
this.impDialog = null;
this.expDialog = null;
this.clipboard = null;
this.circuitArea = null;
this.circuitBottom = 0;
this.undoStack = null;
this.redoStack = null;
this.cv = null;
this.applet = null;
this.startCircuit = null;
this.startLabel = null;
this.startCircuitText = null;
this.baseURL = null;
this.shown = false;
this.lastTime = 0;
this.lastFrameTime = 0;
this.lastIterTime = 0;
this.secTime = 0;
this.frames = 0;
this.steps = 0;
this.framerate = 0;
this.steprate = 0;
this.timer = null;
this.nodeList = null;
this.voltageSources = null;
this.converged = false;
this.subIterations = 0;
this.finished = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.mouseMode = 6;
this.tempMouseMode = 6;
this.mouseModeStr = "Select";
this.pause = 10;
this.scopeSelected = -1;
this.menuScope = -1;
this.hintType = -1;
this.didSwitch = false;
this.mousePost = -1;
this.useFrame = true;
this.startCircuit = null;
this.startLabel = null;
this.startCircuitText = null;
this.baseURL = "http://www.falstad.com/circuit/";
this.shown = false;
this.lastTime = 0;
this.secTime = 0;
this.frames = 0;
this.steps = 0;
this.framerate = 0;
this.steprate = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Circuit by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_circuit_Circuit', function (a) {
C$.superclazz.c$$S.apply(this, ["Circuit Simulator v1.6i"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = false;
var path = this.getClass().getName();
var pt = path.lastIndexOf(".");
if (pt >= 0) path = path.substring(0, pt) + ".";
this.BASE_PACKAGE = path;
}, 1);

Clazz.newMeth(C$, 'init', function () {
var euroResistor = null;
var useFrameStr = null;
var printable = false;
var convention = true;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).initClass$com_falstad_circuit_CirSim(this);
try {
this.baseURL = this.applet.getDocumentBase().getFile();
var doc = this.applet.getDocumentBase().toString();
var $in = doc.indexOf('#');
if ($in > 0) {
var x = null;
try {
x = doc.substring($in + 1);
x = (I$[2]||(I$[2]=Clazz.load('java.net.URLDecoder'))).decode$S(x);
this.startCircuitText = x;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
System.out.println$S("can't decode " + x);
e.printStackTrace();
} else {
throw e;
}
}
}$in = doc.lastIndexOf('/');
if ($in > 0) this.baseURL = doc.substring(0, $in + 1);
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
this.startCircuit = this.applet.getParameter$S("startCircuit");
this.startLabel = this.applet.getParameter$S("startLabel");
euroResistor = this.applet.getParameter$S("euroResistors");
useFrameStr = this.applet.getParameter$S("useFrame");
var x = this.applet.getParameter$S("whiteBackground");
if (x != null  && x.equalsIgnoreCase$S("true") ) printable = true;
x = this.applet.getParameter$S("conventionalCurrent");
if (x != null  && x.equalsIgnoreCase$S("true") ) convention = false;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
var euro = (euroResistor != null  && euroResistor.equalsIgnoreCase$S("true") );
this.useFrame = (useFrameStr == null  || !useFrameStr.equalsIgnoreCase$S("false") );
if (this.useFrame) this.main = this;
 else this.main = this.applet;
var os = System.getProperty("os.name");
this.isMac = (os.indexOf("Mac ") == 0);
this.ctrlMetaKey = (this.isMac) ? "\u2318" : "Ctrl";
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) {
C$.muString = "\u03bc";
C$.ohmString = "\u03a9";
this.useBufferedImage = true;
}this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.CircuitLayout')))));
this.cv = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.CircuitCanvas'))).c$$com_falstad_circuit_CirSim,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.cv.addKeyListener$java_awt_event_KeyListener(this);
this.main.add$java_awt_Component(this.cv);
this.mainMenu = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.PopupMenu'))));
var mb = null;
if (this.useFrame) mb = Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.MenuBar'))));
var m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["File"]);
if (this.useFrame) mb.add$javax_swing_JMenu(m);
 else this.mainMenu.add$javax_swing_JMenuItem(m);
m.add$javax_swing_JMenuItem(this.importItem = this.getMenuItem$S("Import"));
m.add$javax_swing_JMenuItem(this.exportItem = this.getMenuItem$S("Export"));
m.add$javax_swing_JMenuItem(this.exportLinkItem = this.getMenuItem$S("Export Link"));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.exitItem = this.getMenuItem$S("Exit"));
m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Edit"]);
m.add$javax_swing_JMenuItem(this.undoItem = this.getMenuItem$S("Undo"));
m.add$javax_swing_JMenuItem(this.redoItem = this.getMenuItem$S("Redo"));
m.addSeparator();
m.add$javax_swing_JMenuItem(this.cutItem = this.getMenuItem$S("Cut"));
m.add$javax_swing_JMenuItem(this.copyItem = this.getMenuItem$S("Copy"));
m.add$javax_swing_JMenuItem(this.pasteItem = this.getMenuItem$S("Paste"));
this.pasteItem.setEnabled$Z(false);
m.add$javax_swing_JMenuItem(this.selectAllItem = this.getMenuItem$S("Select All"));
if (this.useFrame) mb.add$javax_swing_JMenu(m);
 else this.mainMenu.add$javax_swing_JMenuItem(m);
m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Scope"]);
if (this.useFrame) mb.add$javax_swing_JMenu(m);
 else this.mainMenu.add$javax_swing_JMenuItem(m);
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Stack All", "stackAll"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Unstack All", "unstackAll"));
this.optionsMenu = m = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Options"]);
if (this.useFrame) mb.add$javax_swing_JMenu(m);
 else this.mainMenu.add$javax_swing_JMenuItem(m);
m.add$javax_swing_JMenuItem(this.dotsCheckItem = this.getCheckItem$S("Show Current"));
this.dotsCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.voltsCheckItem = this.getCheckItem$S("Show Voltage"));
this.voltsCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.powerCheckItem = this.getCheckItem$S("Show Power"));
m.add$javax_swing_JMenuItem(this.showValuesCheckItem = this.getCheckItem$S("Show Values"));
this.showValuesCheckItem.setState$Z(true);
m.add$javax_swing_JMenuItem(this.smallGridCheckItem = this.getCheckItem$S("Small Grid"));
m.add$javax_swing_JMenuItem(this.euroResistorCheckItem = this.getCheckItem$S("European Resistors"));
this.euroResistorCheckItem.setState$Z(euro);
m.add$javax_swing_JMenuItem(this.printableCheckItem = this.getCheckItem$S("White Background"));
this.printableCheckItem.setState$Z(printable);
m.add$javax_swing_JMenuItem(this.conventionCheckItem = this.getCheckItem$S("Conventional Current Motion"));
this.conventionCheckItem.setState$Z(convention);
m.add$javax_swing_JMenuItem(this.optionsItem = this.getMenuItem$S("Other Options..."));
var circuitsMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Circuits"]);
if (this.useFrame) mb.add$javax_swing_JMenu(circuitsMenu);
 else this.mainMenu.add$javax_swing_JMenuItem(circuitsMenu);
this.mainMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Wire", "WireElm"));
this.mainMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Resistor", "ResistorElm"));
var passMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Passive Components"]);
this.mainMenu.add$javax_swing_JMenuItem(passMenu);
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Capacitor", "CapacitorElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Inductor", "InductorElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Switch", "SwitchElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Push Switch", "PushSwitchElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add SPDT Switch", "Switch2Elm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Potentiometer", "PotElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Transformer", "TransformerElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Tapped Transformer", "TappedTransformerElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Transmission Line", "TransLineElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Relay", "RelayElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Memristor", "MemristorElm"));
passMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Spark Gap", "SparkGapElm"));
var inputMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Inputs/Outputs"]);
this.mainMenu.add$javax_swing_JMenuItem(inputMenu);
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Ground", "GroundElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Voltage Source (2-terminal)", "DCVoltageElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add A/C Source (2-terminal)", "ACVoltageElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Voltage Source (1-terminal)", "RailElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add A/C Source (1-terminal)", "ACRailElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Square Wave (1-terminal)", "SquareRailElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Analog Output", "OutputElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Logic Input", "LogicInputElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Logic Output", "LogicOutputElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Clock", "ClockElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add A/C Sweep", "SweepElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Var. Voltage", "VarRailElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Antenna", "AntennaElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add AM source", "AMElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add FM source", "FMElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Current Source", "CurrentElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add LED", "LEDElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Lamp (beta)", "LampElm"));
inputMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add LED Matrix", "LEDMatrixElm"));
var activeMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Active Components"]);
this.mainMenu.add$javax_swing_JMenuItem(activeMenu);
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Diode", "DiodeElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Zener Diode", "ZenerElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Transistor (bipolar, NPN)", "NTransistorElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Transistor (bipolar, PNP)", "PTransistorElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Op Amp (- on top)", "OpAmpElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Op Amp (+ on top)", "OpAmpSwapElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add MOSFET (n-channel)", "NMosfetElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add MOSFET (p-channel)", "PMosfetElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add JFET (n-channel)", "NJfetElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add JFET (p-channel)", "PJfetElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Analog Switch (SPST)", "AnalogSwitchElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Analog Switch (SPDT)", "AnalogSwitch2Elm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Tristate buffer", "TriStateElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Schmitt Trigger", "SchmittElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Schmitt Trigger (Inverting)", "InvertingSchmittElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add SCR", "SCRElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Tunnel Diode", "TunnelDiodeElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Triode", "TriodeElm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add CCII+", "CC2Elm"));
activeMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add CCII-", "CC2NegElm"));
var gateMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Logic Gates"]);
this.mainMenu.add$javax_swing_JMenuItem(gateMenu);
gateMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Inverter", "InverterElm"));
gateMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add NAND Gate", "NandGateElm"));
gateMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add NOR Gate", "NorGateElm"));
gateMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add AND Gate", "AndGateElm"));
gateMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add OR Gate", "OrGateElm"));
gateMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add XOR Gate", "XorGateElm"));
var chipMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Chips"]);
this.mainMenu.add$javax_swing_JMenuItem(chipMenu);
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add D Flip-Flop", "DFlipFlopElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add JK Flip-Flop", "JKFlipFlopElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add T Flip-Flop", "TFlipFlopElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add 7 Segment LED", "SevenSegElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add 7 Segment Decoder", "SevenSegDecoderElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Multiplexer", "MultiplexerElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Demultiplexer", "DeMultiplexerElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add SIPO shift register", "SipoShiftElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add PISO shift register", "PisoShiftElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Phase Comparator", "PhaseCompElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Counter", "CounterElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Decade Counter", "DecadeElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add 555 Timer", "TimerElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add DAC", "DACElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add ADC", "ADCElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Latch", "LatchElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Sequence generator", "SeqGenElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add VCO", "VCOElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Full Adder", "FullAdderElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Half Adder", "HalfAdderElm"));
chipMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Monostable", "MonostableElm"));
var otherMenu = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,["Other"]);
this.mainMenu.add$javax_swing_JMenuItem(otherMenu);
otherMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Text", "TextElm"));
otherMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Box", "BoxElm"));
otherMenu.add$javax_swing_JMenuItem(this.getClassCheckItem$S$S("Add Scope Probe", "ProbeElm"));
otherMenu.add$javax_swing_JMenuItem(this.getCheckItem$S$S("Drag All (Alt-drag)", "DragAll"));
otherMenu.add$javax_swing_JMenuItem(this.getCheckItem$S$S(this.isMac ? "Drag Row (Alt-S-drag, S-right)" : "Drag Row (S-right)", "DragRow"));
otherMenu.add$javax_swing_JMenuItem(this.getCheckItem$S$S(this.isMac ? "Drag Column (Alt-\u2318-drag, \u2318-right)" : "Drag Column (C-right)", "DragColumn"));
otherMenu.add$javax_swing_JMenuItem(this.getCheckItem$S$S("Drag Selected", "DragSelected"));
otherMenu.add$javax_swing_JMenuItem(this.getCheckItem$S$S("Drag Post (" + this.ctrlMetaKey + "-drag)" , "DragPost"));
this.mainMenu.add$javax_swing_JMenuItem(this.getCheckItem$S$S("Select/Drag Selected (space or Shift-drag)", "Select"));
this.main.add$java_awt_Component(this.resetButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Reset"]));
this.resetButton.addActionListener$java_awt_event_ActionListener(this);
this.dumpMatrixButton = Clazz.new_((I$[8]||(I$[8]=Clazz.load('a2s.Button'))).c$$S,["Dump Matrix"]);
this.dumpMatrixButton.addActionListener$java_awt_event_ActionListener(this);
this.stoppedCheck = Clazz.new_((I$[9]||(I$[9]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 3, 1, 0, 260]));
this.speedBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Current Speed", 0]));
this.currentBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 1, 100]);
this.currentBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(this.currentBar);
this.main.add$java_awt_Component(this.powerLabel = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Power Brightness", 0]));
this.main.add$java_awt_Component(this.powerBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 1, 100]));
this.powerBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.powerBar.disable();
this.powerLabel.disable();
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S,["www.falstad.com"]));
if (this.useFrame) this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S,["\u000a"]));
var f = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, 10]);
var l;
l = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S,["Current Circuit:"]);
l.setFont$java_awt_Font(f);
this.titleLabel = Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S,["Label"]);
this.titleLabel.setFont$java_awt_Font(f);
if (this.useFrame) {
this.main.add$java_awt_Component(l);
this.main.add$java_awt_Component(this.titleLabel);
}this.setGrid();
this.elmList = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Vector'))));
this.undoStack = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Vector'))));
this.redoStack = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Vector'))));
this.scopes = Clazz.array((I$[14]||(I$[14]=Clazz.load('com.falstad.circuit.Scope'))), [20]);
this.scopeColCount = Clazz.array(Integer.TYPE, [20]);
this.scopeCount = 0;
this.random = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.util.Random'))));
this.cv.setBackground$java_awt_Color((I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).lightGray);
this.elmMenu = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.PopupMenu'))));
this.elmMenu.add$javax_swing_JMenuItem(this.elmEditMenuItem = this.getMenuItem$S("Edit"));
this.elmMenu.add$javax_swing_JMenuItem(this.elmScopeMenuItem = this.getMenuItem$S("View in Scope"));
this.elmMenu.add$javax_swing_JMenuItem(this.elmCutMenuItem = this.getMenuItem$S("Cut"));
this.elmMenu.add$javax_swing_JMenuItem(this.elmCopyMenuItem = this.getMenuItem$S("Copy"));
this.elmMenu.add$javax_swing_JMenuItem(this.elmDeleteMenuItem = this.getMenuItem$S("Delete"));
this.scopeMenu = this.buildScopeMenu$Z(false);
this.transScopeMenu = this.buildScopeMenu$Z(true);
this.getSetupList$a2s_Menu$Z(circuitsMenu, false);
if (this.useFrame) this.setMenuBar$a2s_MenuBar(mb);
if (this.startCircuitText != null ) this.readSetup$S(this.startCircuitText);
 else if (this.stopMessage == null  && this.startCircuit != null  ) this.readCircuitFile$S$S(this.startCircuit, this.startLabel);
 else this.readSetup$BA$I$Z(null, 0, false);
if (this.useFrame) {
var screen = this.getToolkit().getScreenSize();
this.resize$I$I(860, 640);
this.handleResize();
var x = this.getSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.show();
} else {
if (!this.powerCheckItem.getState()) {
this.main.remove$java_awt_Component(this.powerBar);
this.main.remove$java_awt_Component(this.powerLabel);
this.main.validate();
}this.hide();
this.handleResize();
this.applet.validate();
}this.requestFocus();
this.finished = true;
this.addWindowListener$java_awt_event_WindowListener(((
(function(){var C$=Clazz.newClass(P$, "CirSim$1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('java.awt.event.WindowAdapter'), null, 1);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'windowClosing$java_awt_event_WindowEvent', function (we) {
this.b$['com.falstad.circuit.CirSim'].destroyFrame();
});
})()
), Clazz.new_((I$[17]||(I$[17]=Clazz.load('java.awt.event.WindowAdapter'))), [this, null],P$.CirSim$1)));
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.show();
this.shown = true;
});

Clazz.newMeth(C$, 'requestFocus', function () {
C$.superclazz.prototype.requestFocus.apply(this, []);
this.cv.requestFocus();
});

Clazz.newMeth(C$, 'buildScopeMenu$Z', function (t) {
var m = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.PopupMenu'))));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Remove", "remove"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Speed 2x", "speed2"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Speed 1/2x", "speed1/2"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Scale 2x", "scale"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Max Scale", "maxscale"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Stack", "stack"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Unstack", "unstack"));
m.add$javax_swing_JMenuItem(this.getMenuItem$S$S("Reset", "reset"));
if (t) {
m.add$javax_swing_JMenuItem(this.scopeIbMenuItem = this.getCheckItem$S("Show Ib"));
m.add$javax_swing_JMenuItem(this.scopeIcMenuItem = this.getCheckItem$S("Show Ic"));
m.add$javax_swing_JMenuItem(this.scopeIeMenuItem = this.getCheckItem$S("Show Ie"));
m.add$javax_swing_JMenuItem(this.scopeVbeMenuItem = this.getCheckItem$S("Show Vbe"));
m.add$javax_swing_JMenuItem(this.scopeVbcMenuItem = this.getCheckItem$S("Show Vbc"));
m.add$javax_swing_JMenuItem(this.scopeVceMenuItem = this.getCheckItem$S("Show Vce"));
m.add$javax_swing_JMenuItem(this.scopeVceIcMenuItem = this.getCheckItem$S("Show Vce vs Ic"));
} else {
m.add$javax_swing_JMenuItem(this.scopeVMenuItem = this.getCheckItem$S("Show Voltage"));
m.add$javax_swing_JMenuItem(this.scopeIMenuItem = this.getCheckItem$S("Show Current"));
m.add$javax_swing_JMenuItem(this.scopePowerMenuItem = this.getCheckItem$S("Show Power Consumed"));
m.add$javax_swing_JMenuItem(this.scopeMaxMenuItem = this.getCheckItem$S("Show Peak Value"));
m.add$javax_swing_JMenuItem(this.scopeMinMenuItem = this.getCheckItem$S("Show Negative Peak Value"));
m.add$javax_swing_JMenuItem(this.scopeFreqMenuItem = this.getCheckItem$S("Show Frequency"));
m.add$javax_swing_JMenuItem(this.scopeVIMenuItem = this.getCheckItem$S("Show V vs I"));
m.add$javax_swing_JMenuItem(this.scopeXYMenuItem = this.getCheckItem$S("Plot X/Y"));
m.add$javax_swing_JMenuItem(this.scopeSelectYMenuItem = this.getMenuItem$S$S("Select Y", "selecty"));
m.add$javax_swing_JMenuItem(this.scopeResistMenuItem = this.getCheckItem$S("Show Resistance"));
}return m;
});

Clazz.newMeth(C$, 'getMenuItem$S', function (s) {
var mi = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getMenuItem$S$S', function (s, ac) {
var mi = Clazz.new_((I$[18]||(I$[18]=Clazz.load('a2s.MenuItem'))).c$$S,[s]);
mi.setActionCommand$S(ac);
mi.addActionListener$java_awt_event_ActionListener(this);
return mi;
});

Clazz.newMeth(C$, 'getCheckItem$S', function (s) {
var mi = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
mi.setActionCommand$S("");
return mi;
});

Clazz.newMeth(C$, 'getClassCheckItem$S$S', function (s, t) {
return this.getCheckItem$S$S(s, t);
});

Clazz.newMeth(C$, 'getCheckItem$S$S', function (s, t) {
var mi = Clazz.new_((I$[19]||(I$[19]=Clazz.load('a2s.CheckboxMenuItem'))).c$$S,[s]);
mi.addItemListener$java_awt_event_ItemListener(this);
mi.setActionCommand$S(t);
return mi;
});

Clazz.newMeth(C$, 'handleResize', function () {
this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.main.createImage$I$I(this.winSize.width, this.winSize.height);
var h = (this.winSize.height/5|0);
this.circuitArea = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[0, 0, this.winSize.width, this.winSize.height - h]);
var i;
var minx = 1000;
var maxx = 0;
var miny = 1000;
var maxy = 0;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (!ce.isCenteredText()) {
minx = this.min$I$I(ce.x, this.min$I$I(ce.x2, minx));
maxx = this.max$I$I(ce.x, this.max$I$I(ce.x2, maxx));
}miny = this.min$I$I(ce.y, this.min$I$I(ce.y2, miny));
maxy = this.max$I$I(ce.y, this.max$I$I(ce.y2, maxy));
}
var dx = this.gridMask & (((this.circuitArea.width - (maxx - minx))/2|0) - minx);
var dy = this.gridMask & (((this.circuitArea.height - (maxy - miny))/2|0) - miny);
if (dx + minx < 0) dx = this.gridMask & (-minx);
if (dy + miny < 0) dy = this.gridMask & (-miny);
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.move$I$I(dx, dy);
}
this.needAnalyze();
this.circuitBottom = 0;
});

Clazz.newMeth(C$, 'destroyFrame', function () {
if (this.applet == null ) {
this.dispose();
System.exit(0);
} else {
this.applet.destroyFrame();
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'updateCircuit$java_awt_Graphics', function (realg) {
var realMouseElm;
if (this.winSize == null  || this.winSize.width == 0 ) return;
if (this.analyzeFlag) {
this.analyzeCircuit();
this.analyzeFlag = false;
}if (this.editDialog != null  && Clazz.instanceOf(this.editDialog.elm, "com.falstad.circuit.CircuitElm") ) this.mouseElm = (this.editDialog.elm);
realMouseElm = this.mouseElm;
if (this.mouseElm == null ) this.mouseElm = this.stopElm;
this.setupScopes();
var g = null;
g = this.dbimage.getGraphics();
g.setRenderingHint$java_awt_RenderingHints_Key$O((I$[21]||(I$[21]=Clazz.load('java.awt.RenderingHints'))).KEY_ANTIALIASING, (I$[21]||(I$[21]=Clazz.load('java.awt.RenderingHints'))).VALUE_ANTIALIAS_ON);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor = (I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).cyan;
if (this.printableCheckItem.getState()) {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor = (I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).black;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor = (I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).black;
g.setColor$java_awt_Color((I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).white);
} else {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor = (I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).white;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor = (I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).lightGray;
g.setColor$java_awt_Color((I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).black);
}g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
if (!this.stoppedCheck.getState()) {
try {
this.runCircuit();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
{
}e.printStackTrace();
this.analyzeFlag = true;
p$.repaintCV$I.apply(this, [0]);
return;
} else {
throw e;
}
}
}if (!this.stoppedCheck.getState()) {
var sysTime = System.currentTimeMillis();
if (this.lastTime != 0) {
var inc = ((sysTime - this.lastTime)|0);
var c = this.currentBar.getValue();
c = java.lang.Math.exp(c / 3.5 - 14.2);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).currentMult = 1.7 * inc * c ;
if (!this.conventionCheckItem.getState()) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).currentMult = -(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).currentMult;
}if (sysTime - this.secTime >= 1000) {
this.framerate = this.frames;
this.steprate = this.steps;
this.frames = 0;
this.steps = 0;
this.secTime = sysTime;
}this.lastTime = sysTime;
} else this.lastTime = 0;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).powerMult = Math.exp(this.powerBar.getValue() / 4.762 - 7);
var i;
var oldfont = g.getFont();
for (i = 0; i != this.elmList.size(); i++) {
if (this.powerCheckItem.getState()) g.setColor$java_awt_Color((I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).gray);
this.getElm$I(i).draw$java_awt_Graphics(g);
}
if (this.tempMouseMode == 2 || this.tempMouseMode == 3  || this.tempMouseMode == 5  || this.tempMouseMode == 4 ) for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.drawPost$java_awt_Graphics$I$I(g, ce.x, ce.y);
ce.drawPost$java_awt_Graphics$I$I(g, ce.x2, ce.y2);
}
var badnodes = 0;
if (this.nodeList != null ) for (i = 0; i != this.nodeList.size(); i++) {
var cn = this.getCircuitNode$I(i);
if (!cn.internal && cn.links.size() == 1 ) {
var bb = 0;
var j;
var cnl = cn.links.elementAt$I(0);
for (j = 0; j != this.elmList.size(); j++) {
var ce = this.getElm$I(j);
if (Clazz.instanceOf(ce, "com.falstad.circuit.GraphicElm")) continue;
if (cnl.elm !== ce  && this.getElm$I(j).boundingBox.contains$I$I(cn.x, cn.y) ) bb++;
}
if (bb > 0) {
g.setColor$java_awt_Color((I$[16]||(I$[16]=Clazz.load('java.awt.Color'))).red);
g.fillOval$I$I$I$I(cn.x - 3, cn.y - 3, 7, 7);
badnodes++;
}}}
if (this.dragElm != null  && (this.dragElm.x != this.dragElm.x2 || this.dragElm.y != this.dragElm.y2 ) ) this.dragElm.draw$java_awt_Graphics(g);
g.setFont$java_awt_Font(oldfont);
var ct = this.scopeCount;
if (this.stopMessage != null ) ct = 0;
for (i = 0; i != ct; i++) this.scopes[i].draw$java_awt_Graphics(g);

g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
if (this.stopMessage != null ) {
g.drawString$S$I$I(this.stopMessage, 10, this.circuitArea.height);
} else {
if (this.circuitBottom == 0) this.calcCircuitBottom();
var info = Clazz.array(java.lang.String, [10]);
if (this.mouseElm != null ) {
if (this.mousePost == -1) this.mouseElm.getInfo$SA(info);
 else info[0] = "V = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(this.mouseElm.getPostVoltage$I(this.mousePost), "V");
} else {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).showFormat.setMinimumFractionDigits$I(2);
info[0] = "t = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(this.t, "s");
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).showFormat.setMinimumFractionDigits$I(0);
}if (this.hintType != -1) {
for (i = 0; info[i] != null ; i++) ;
var s = this.getHint();
if (s == null ) this.hintType = -1;
 else info[i] = s;
}var x = 0;
if (ct != 0) x = this.scopes[ct - 1].rightEdge() + 20;
x = this.max$I$I(x, (this.winSize.width * 2/3|0));
for (i = 0; info[i] != null ; i++) ;
if (badnodes > 0) info[i++] = badnodes + ((badnodes == 1) ? " bad connection" : " bad connections");
var ybase = this.winSize.height - 15 * i - 5;
ybase = this.min$I$I(ybase, this.circuitArea.height);
ybase = this.max$I$I(ybase, this.circuitBottom);
for (i = 0; info[i] != null ; i++) g.drawString$S$I$I(info[i], x, ybase + 15 * (i + 1));

}if (this.selectedArea != null ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor);
g.drawRect$I$I$I$I(this.selectedArea.x, this.selectedArea.y, this.selectedArea.width, this.selectedArea.height);
}this.mouseElm = realMouseElm;
this.frames++;
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (this.stoppedCheck.getState() || this.circuitMatrix == null  ) {
this.lastFrameTime = this.lastTime;
return;
}var delay = 20 - (System.currentTimeMillis() - this.lastFrameTime);
realg.drawString$S$I$I("delay: " + delay, 10, 90);
if (this.timer == null ) {
this.timer = Clazz.new_((I$[22]||(I$[22]=Clazz.load('javax.swing.Timer'))).c$$I$java_awt_event_ActionListener,[((delay < 0 ? 0 : delay)|0), this]);
this.timer.setRepeats$Z(true);
this.timer.setActionCommand$S("repaint");
this.timer.start();
} else if (!this.timer.isRunning()) {
this.timer.setInitialDelay$I(Math.max(0, (delay|0)));
this.timer.restart();
}});

Clazz.newMeth(C$, 'setupScopes', function () {
var i;
var pos = -1;
for (i = 0; i < this.scopeCount; i++) {
if (this.locateElm$com_falstad_circuit_CircuitElm(this.scopes[i].elm) < 0) this.scopes[i].setElm$com_falstad_circuit_CircuitElm(null);
if (this.scopes[i].elm == null ) {
var j;
for (j = i; j != this.scopeCount; j++) this.scopes[j] = this.scopes[j + 1];

this.scopeCount--;
i--;
continue;
}if (this.scopes[i].position > pos + 1) this.scopes[i].position = pos + 1;
pos = this.scopes[i].position;
}
while (this.scopeCount > 0 && this.scopes[this.scopeCount - 1].elm == null  )this.scopeCount--;

var h = this.winSize.height - this.circuitArea.height;
pos = 0;
for (i = 0; i != this.scopeCount; i++) this.scopeColCount[i] = 0;

for (i = 0; i != this.scopeCount; i++) {
pos = this.max$I$I(this.scopes[i].position, pos);
this.scopeColCount[this.scopes[i].position]++;
}
var colct = pos + 1;
var iw = 120;
if (colct <= 2) iw = (iw * 3/2|0);
var w = ((this.winSize.width - iw)/colct|0);
var marg = 10;
if (w < marg * 2) w = marg * 2;
pos = -1;
var colh = 0;
var row = 0;
var speed = 0;
for (i = 0; i != this.scopeCount; i++) {
var s = this.scopes[i];
if (s.position > pos) {
pos = s.position;
colh = (h/this.scopeColCount[pos]|0);
row = 0;
speed = s.speed;
}if (s.speed != speed) {
s.speed = speed;
s.resetGraph();
}var r = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[pos * w, this.winSize.height - h + colh * row, w - marg, colh]);
row++;
if (!r.equals$O(s.rect)) s.setRect$java_awt_Rectangle(r);
}
});

Clazz.newMeth(C$, 'getHint', function () {
var c1 = this.getElm$I(this.hintItem1);
var c2 = this.getElm$I(this.hintItem2);
if (c1 == null  || c2 == null  ) return null;
if (this.hintType == 1) {
if (!(Clazz.instanceOf(c1, "com.falstad.circuit.InductorElm"))) return null;
if (!(Clazz.instanceOf(c2, "com.falstad.circuit.CapacitorElm"))) return null;
var ie = c1;
var ce = c2;
return "res.f = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(1 / (2 * 3.141592653589793 * Math.sqrt(ie.inductance * ce.capacitance) ), "Hz");
}if (this.hintType == 2) {
if (!(Clazz.instanceOf(c1, "com.falstad.circuit.ResistorElm"))) return null;
if (!(Clazz.instanceOf(c2, "com.falstad.circuit.CapacitorElm"))) return null;
var re = c1;
var ce = c2;
return "RC = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(re.resistance * ce.capacitance, "s");
}if (this.hintType == 3) {
if (!(Clazz.instanceOf(c1, "com.falstad.circuit.ResistorElm"))) return null;
if (!(Clazz.instanceOf(c2, "com.falstad.circuit.CapacitorElm"))) return null;
var re = c1;
var ce = c2;
return "f.3db = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(1 / (2 * 3.141592653589793 * re.resistance * ce.capacitance ), "Hz");
}if (this.hintType == 5) {
if (!(Clazz.instanceOf(c1, "com.falstad.circuit.ResistorElm"))) return null;
if (!(Clazz.instanceOf(c2, "com.falstad.circuit.InductorElm"))) return null;
var re = c1;
var ie = c2;
return "f.3db = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(re.resistance / (2 * 3.141592653589793 * ie.inductance ), "Hz");
}if (this.hintType == 4) {
if (!(Clazz.instanceOf(c1, "com.falstad.circuit.ResistorElm"))) return null;
if (!(Clazz.instanceOf(c2, "com.falstad.circuit.CapacitorElm"))) return null;
var re = c1;
var ce = c2;
return "fc = " + (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).getUnitText$D$S(1 / (2 * 3.141592653589793 * re.resistance * ce.capacitance ), "Hz");
}return null;
});

Clazz.newMeth(C$, 'toggleSwitch$I', function (n) {
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (Clazz.instanceOf(ce, "com.falstad.circuit.SwitchElm")) {
n--;
if (n == 0) {
(ce).toggle();
this.analyzeFlag = true;
p$.repaintCV$I.apply(this, [0]);
return;
}}}
});

Clazz.newMeth(C$, 'needAnalyze', function () {
this.analyzeFlag = true;
p$.repaintCV$I.apply(this, [0]);
});

Clazz.newMeth(C$, 'getCircuitNode$I', function (n) {
if (n >= this.nodeList.size()) return null;
return this.nodeList.elementAt$I(n);
});

Clazz.newMeth(C$, 'getElm$I', function (n) {
if (n >= this.elmList.size()) return null;
return this.elmList.elementAt$I(n);
});

Clazz.newMeth(C$, 'analyzeCircuit', function () {
this.calcCircuitBottom();
if (this.elmList.isEmpty()) return;
this.stopMessage = null;
this.stopElm = null;
var i;
var j;
var vscount = 0;
this.nodeList = Clazz.new_((I$[13]||(I$[13]=Clazz.load('java.util.Vector'))));
var gotGround = false;
var gotRail = false;
var volt = null;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (Clazz.instanceOf(ce, "com.falstad.circuit.GroundElm")) {
gotGround = true;
break;
}if (Clazz.instanceOf(ce, "com.falstad.circuit.RailElm")) gotRail = true;
if (volt == null  && Clazz.instanceOf(ce, "com.falstad.circuit.VoltageElm") ) volt = ce;
}
if (!gotGround && volt != null   && !gotRail ) {
var cn = Clazz.new_((I$[23]||(I$[23]=Clazz.load('com.falstad.circuit.CircuitNode'))));
var pt = volt.getPost$I(0);
cn.x = pt.x;
cn.y = pt.y;
this.nodeList.addElement$TE(cn);
} else {
var cn = Clazz.new_((I$[23]||(I$[23]=Clazz.load('com.falstad.circuit.CircuitNode'))));
cn.x = cn.y = -1;
this.nodeList.addElement$TE(cn);
}for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
var inodes = ce.getInternalNodeCount();
var ivs = ce.getVoltageSourceCount();
var posts = ce.getPostCount();
for (j = 0; j != posts; j++) {
var pt = ce.getPost$I(j);
var k;
for (k = 0; k != this.nodeList.size(); k++) {
var cn = this.getCircuitNode$I(k);
if (pt.x == cn.x && pt.y == cn.y ) break;
}
if (k == this.nodeList.size()) {
var cn = Clazz.new_((I$[23]||(I$[23]=Clazz.load('com.falstad.circuit.CircuitNode'))));
cn.x = pt.x;
cn.y = pt.y;
var cnl = Clazz.new_((I$[24]||(I$[24]=Clazz.load('com.falstad.circuit.CircuitNodeLink'))));
cnl.num = j;
cnl.elm = ce;
cn.links.addElement$TE(cnl);
ce.setNode$I$I(j, this.nodeList.size());
this.nodeList.addElement$TE(cn);
} else {
var cnl = Clazz.new_((I$[24]||(I$[24]=Clazz.load('com.falstad.circuit.CircuitNodeLink'))));
cnl.num = j;
cnl.elm = ce;
this.getCircuitNode$I(k).links.addElement$TE(cnl);
ce.setNode$I$I(j, k);
if (k == 0) ce.setNodeVoltage$I$D(j, 0);
}}
for (j = 0; j != inodes; j++) {
var cn = Clazz.new_((I$[23]||(I$[23]=Clazz.load('com.falstad.circuit.CircuitNode'))));
cn.x = cn.y = -1;
cn.internal = true;
var cnl = Clazz.new_((I$[24]||(I$[24]=Clazz.load('com.falstad.circuit.CircuitNodeLink'))));
cnl.num = j + posts;
cnl.elm = ce;
cn.links.addElement$TE(cnl);
ce.setNode$I$I(cnl.num, this.nodeList.size());
this.nodeList.addElement$TE(cn);
}
vscount = vscount+(ivs);
}
this.voltageSources = Clazz.array((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))), [vscount]);
vscount = 0;
this.circuitNonLinear = false;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (ce.nonLinear()) this.circuitNonLinear = true;
var ivs = ce.getVoltageSourceCount();
for (j = 0; j != ivs; j++) {
this.voltageSources[vscount] = ce;
ce.setVoltageSource$I$I(j, vscount++);
}
}
this.voltageSourceCount = vscount;
var matrixSize = this.nodeList.size() - 1 + vscount;
this.circuitMatrix = Clazz.array(Double.TYPE, [matrixSize, matrixSize]);
this.circuitRightSide = Clazz.array(Double.TYPE, [matrixSize]);
this.origMatrix = Clazz.array(Double.TYPE, [matrixSize, matrixSize]);
this.origRightSide = Clazz.array(Double.TYPE, [matrixSize]);
this.circuitMatrixSize = this.circuitMatrixFullSize = matrixSize;
this.circuitRowInfo = Clazz.array((I$[25]||(I$[25]=Clazz.load('com.falstad.circuit.RowInfo'))), [matrixSize]);
this.circuitPermute = Clazz.array(Integer.TYPE, [matrixSize]);
var vs = 0;
for (i = 0; i != matrixSize; i++) this.circuitRowInfo[i] = Clazz.new_((I$[25]||(I$[25]=Clazz.load('com.falstad.circuit.RowInfo'))));

this.circuitNeedsMap = false;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.stamp();
}
var closure = Clazz.array(Boolean.TYPE, [this.nodeList.size()]);
var tempclosure = Clazz.array(Boolean.TYPE, [this.nodeList.size()]);
var changed = true;
closure[0] = true;
while (changed){
changed = false;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
for (j = 0; j < ce.getPostCount(); j++) {
if (!closure[ce.getNode$I(j)]) {
if (ce.hasGroundConnection$I(j)) closure[ce.getNode$I(j)] = changed = true;
continue;
}var k;
for (k = 0; k != ce.getPostCount(); k++) {
if (j == k) continue;
var kn = ce.getNode$I(k);
if (ce.getConnection$I$I(j, k) && !closure[kn] ) {
closure[kn] = true;
changed = true;
}}
}
}
if (changed) continue;
for (i = 0; i != this.nodeList.size(); i++) if (!closure[i] && !this.getCircuitNode$I(i).internal ) {
this.stampResistor$I$I$D(0, i, 1.0E8);
closure[i] = true;
changed = true;
break;
}
}
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (Clazz.instanceOf(ce, "com.falstad.circuit.InductorElm")) {
var fpi = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.circuit.CirSim').FindPathInfo))).c$$I$com_falstad_circuit_CircuitElm$I, [this, null, 1, ce, ce.getNode$I(1)]);
if (!fpi.findPath$I$I(ce.getNode$I(0), 5) && !fpi.findPath$I(ce.getNode$I(0)) ) {
System.out.println$S(ce + " no path");
ce.reset();
}}if (Clazz.instanceOf(ce, "com.falstad.circuit.CurrentElm")) {
var fpi = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.circuit.CirSim').FindPathInfo))).c$$I$com_falstad_circuit_CircuitElm$I, [this, null, 1, ce, ce.getNode$I(1)]);
if (!fpi.findPath$I(ce.getNode$I(0))) {
this.stop$S$com_falstad_circuit_CircuitElm("No path for current source!", ce);
return;
}}if ((Clazz.instanceOf(ce, "com.falstad.circuit.VoltageElm") && ce.getPostCount() == 2 ) || Clazz.instanceOf(ce, "com.falstad.circuit.WireElm") ) {
var fpi = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.circuit.CirSim').FindPathInfo))).c$$I$com_falstad_circuit_CircuitElm$I, [this, null, 2, ce, ce.getNode$I(1)]);
if (fpi.findPath$I(ce.getNode$I(0))) {
this.stop$S$com_falstad_circuit_CircuitElm("Voltage source/wire loop with no resistance!", ce);
return;
}}if (Clazz.instanceOf(ce, "com.falstad.circuit.CapacitorElm")) {
var fpi = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.circuit.CirSim').FindPathInfo))).c$$I$com_falstad_circuit_CircuitElm$I, [this, null, 3, ce, ce.getNode$I(1)]);
if (fpi.findPath$I(ce.getNode$I(0))) {
ce.reset();
} else {
fpi = Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.circuit.CirSim').FindPathInfo))).c$$I$com_falstad_circuit_CircuitElm$I, [this, null, 4, ce, ce.getNode$I(1)]);
if (fpi.findPath$I(ce.getNode$I(0))) {
this.stop$S$com_falstad_circuit_CircuitElm("Capacitor loop with no resistance!", ce);
return;
}}}}
for (i = 0; i != matrixSize; i++) {
var qm = -1;
var qp = -1;
var qv = 0;
var re = this.circuitRowInfo[i];
if (re.lsChanges || re.dropRow || re.rsChanges  ) continue;
var rsadd = 0;
for (j = 0; j != matrixSize; j++) {
var q = this.circuitMatrix[i][j];
if (this.circuitRowInfo[j].type == 1) {
rsadd -= this.circuitRowInfo[j].value * q;
continue;
}if (q == 0 ) continue;
if (qp == -1) {
qp = j;
qv = q;
continue;
}if (qm == -1 && q == -qv  ) {
qm = j;
continue;
}break;
}
if (j == matrixSize) {
if (qp == -1) {
this.stop$S$com_falstad_circuit_CircuitElm("Matrix error", null);
return;
}var elt = this.circuitRowInfo[qp];
if (qm == -1) {
var k;
for (k = 0; elt.type == 2 && k < 100 ; k++) {
qp = elt.nodeEq;
elt = this.circuitRowInfo[qp];
}
if (elt.type == 2) {
elt.type = 0;
continue;
}if (elt.type != 0) {
System.out.println$S("type already " + elt.type + " for " + qp + "!" );
continue;
}elt.type = 1;
elt.value = (this.circuitRightSide[i] + rsadd) / qv;
this.circuitRowInfo[i].dropRow = true;
i = -1;
} else if (this.circuitRightSide[i] + rsadd == 0 ) {
if (elt.type != 0) {
var qq = qm;
qm = qp;
qp = qq;
elt = this.circuitRowInfo[qp];
if (elt.type != 0) {
System.out.println$S("swap failed");
continue;
}}elt.type = 2;
elt.nodeEq = qm;
this.circuitRowInfo[i].dropRow = true;
}}}
var nn = 0;
for (i = 0; i != matrixSize; i++) {
var elt = this.circuitRowInfo[i];
if (elt.type == 0) {
elt.mapCol = nn++;
continue;
}if (elt.type == 2) {
var e2 = null;
for (j = 0; j != 100; j++) {
e2 = this.circuitRowInfo[elt.nodeEq];
if (e2.type != 2) break;
if (i == e2.nodeEq) break;
elt.nodeEq = e2.nodeEq;
}
}if (elt.type == 1) elt.mapCol = -1;
}
for (i = 0; i != matrixSize; i++) {
var elt = this.circuitRowInfo[i];
if (elt.type == 2) {
var e2 = this.circuitRowInfo[elt.nodeEq];
if (e2.type == 1) {
elt.type = e2.type;
elt.value = e2.value;
elt.mapCol = -1;
} else {
elt.mapCol = e2.mapCol;
}}}
var newsize = nn;
var newmatx = Clazz.array(Double.TYPE, [newsize, newsize]);
var newrs = Clazz.array(Double.TYPE, [newsize]);
var ii = 0;
for (i = 0; i != matrixSize; i++) {
var rri = this.circuitRowInfo[i];
if (rri.dropRow) {
rri.mapRow = -1;
continue;
}newrs[ii] = this.circuitRightSide[i];
rri.mapRow = ii;
for (j = 0; j != matrixSize; j++) {
var ri = this.circuitRowInfo[j];
if (ri.type == 1) newrs[ii] -= ri.value * this.circuitMatrix[i][j];
 else newmatx[ii][ri.mapCol] += this.circuitMatrix[i][j];
}
ii++;
}
this.circuitMatrix = newmatx;
this.circuitRightSide = newrs;
matrixSize = this.circuitMatrixSize = newsize;
for (i = 0; i != matrixSize; i++) this.origRightSide[i] = this.circuitRightSide[i];

for (i = 0; i != matrixSize; i++) for (j = 0; j != matrixSize; j++) this.origMatrix[i][j] = this.circuitMatrix[i][j];


this.circuitNeedsMap = true;
if (!this.circuitNonLinear) {
if (!this.lu_factor$DAA$I$IA(this.circuitMatrix, this.circuitMatrixSize, this.circuitPermute)) {
this.stop$S$com_falstad_circuit_CircuitElm("Singular matrix!", null);
return;
}}});

Clazz.newMeth(C$, 'calcCircuitBottom', function () {
var i;
this.circuitBottom = 0;
for (i = 0; i != this.elmList.size(); i++) {
var rect = this.getElm$I(i).boundingBox;
var bottom = rect.height + rect.y;
if (bottom > this.circuitBottom) this.circuitBottom = bottom;
}
});

Clazz.newMeth(C$, 'stop$S$com_falstad_circuit_CircuitElm', function (s, ce) {
this.stopMessage = s;
this.circuitMatrix = null;
this.stopElm = ce;
this.stoppedCheck.setState$Z(true);
this.analyzeFlag = false;
p$.repaintCV$I.apply(this, [0]);
});

Clazz.newMeth(C$, 'stampVCVS$I$I$D$I', function (n1, n2, coef, vs) {
var vn = this.nodeList.size() + vs;
this.stampMatrix$I$I$D(vn, n1, coef);
this.stampMatrix$I$I$D(vn, n2, -coef);
});

Clazz.newMeth(C$, 'stampVoltageSource$I$I$I$D', function (n1, n2, vs, v) {
var vn = this.nodeList.size() + vs;
this.stampMatrix$I$I$D(vn, n1, -1);
this.stampMatrix$I$I$D(vn, n2, 1);
this.stampRightSide$I$D(vn, v);
this.stampMatrix$I$I$D(n1, vn, 1);
this.stampMatrix$I$I$D(n2, vn, -1);
});

Clazz.newMeth(C$, 'stampVoltageSource$I$I$I', function (n1, n2, vs) {
var vn = this.nodeList.size() + vs;
this.stampMatrix$I$I$D(vn, n1, -1);
this.stampMatrix$I$I$D(vn, n2, 1);
this.stampRightSide$I(vn);
this.stampMatrix$I$I$D(n1, vn, 1);
this.stampMatrix$I$I$D(n2, vn, -1);
});

Clazz.newMeth(C$, 'updateVoltageSource$I$I$I$D', function (n1, n2, vs, v) {
var vn = this.nodeList.size() + vs;
this.stampRightSide$I$D(vn, v);
});

Clazz.newMeth(C$, 'stampResistor$I$I$D', function (n1, n2, r) {
var r0 = 1 / r;
if (Double.isNaN(r0) || Double.isInfinite(r0) ) {
System.out.print$S("bad resistance " + new Double(r).toString() + " " + new Double(r0).toString() + "\n" );
var a = 0;
a = (a/(a)|0);
}this.stampMatrix$I$I$D(n1, n1, r0);
this.stampMatrix$I$I$D(n2, n2, r0);
this.stampMatrix$I$I$D(n1, n2, -r0);
this.stampMatrix$I$I$D(n2, n1, -r0);
});

Clazz.newMeth(C$, 'stampConductance$I$I$D', function (n1, n2, r0) {
this.stampMatrix$I$I$D(n1, n1, r0);
this.stampMatrix$I$I$D(n2, n2, r0);
this.stampMatrix$I$I$D(n1, n2, -r0);
this.stampMatrix$I$I$D(n2, n1, -r0);
});

Clazz.newMeth(C$, 'stampVCCurrentSource$I$I$I$I$D', function (cn1, cn2, vn1, vn2, g) {
this.stampMatrix$I$I$D(cn1, vn1, g);
this.stampMatrix$I$I$D(cn2, vn2, g);
this.stampMatrix$I$I$D(cn1, vn2, -g);
this.stampMatrix$I$I$D(cn2, vn1, -g);
});

Clazz.newMeth(C$, 'stampCurrentSource$I$I$D', function (n1, n2, i) {
this.stampRightSide$I$D(n1, -i);
this.stampRightSide$I$D(n2, i);
});

Clazz.newMeth(C$, 'stampCCCS$I$I$I$D', function (n1, n2, vs, gain) {
var vn = this.nodeList.size() + vs;
this.stampMatrix$I$I$D(n1, vn, gain);
this.stampMatrix$I$I$D(n2, vn, -gain);
});

Clazz.newMeth(C$, 'stampMatrix$I$I$D', function (i, j, x) {
if (i > 0 && j > 0 ) {
if (this.circuitNeedsMap) {
i = this.circuitRowInfo[i - 1].mapRow;
var ri = this.circuitRowInfo[j - 1];
if (ri.type == 1) {
this.circuitRightSide[i] -= x * ri.value;
return;
}j = ri.mapCol;
} else {
i--;
j--;
}this.circuitMatrix[i][j] += x;
}});

Clazz.newMeth(C$, 'stampRightSide$I$D', function (i, x) {
if (i > 0) {
if (this.circuitNeedsMap) {
i = this.circuitRowInfo[i - 1].mapRow;
} else i--;
this.circuitRightSide[i] += x;
}});

Clazz.newMeth(C$, 'stampRightSide$I', function (i) {
if (i > 0) this.circuitRowInfo[i - 1].rsChanges = true;
});

Clazz.newMeth(C$, 'stampNonLinear$I', function (i) {
if (i > 0) this.circuitRowInfo[i - 1].lsChanges = true;
});

Clazz.newMeth(C$, 'getIterCount', function () {
if (this.speedBar.getValue() == 0) return 0;
return 0.1 * Math.exp((this.speedBar.getValue() - 61) / 24.0);
});

Clazz.newMeth(C$, 'runCircuit', function () {
if (this.circuitMatrix == null  || this.elmList.size() == 0 ) {
this.circuitMatrix = null;
return;
}var iter;
var debugprint = this.dumpMatrix;
this.dumpMatrix = false;
var steprate = ((160 * this.getIterCount())|0);
var tm = System.currentTimeMillis();
var lit = this.lastIterTime;
if (1000 >= steprate * (tm - this.lastIterTime)) return;
for (iter = 1; ; iter++) {
var i;
var j;
var k;
var subiter;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.startIteration();
}
this.steps++;
var subiterCount = 5000;
for (subiter = 0; subiter != 5000; subiter++) {
this.converged = true;
this.subIterations = subiter;
for (i = 0; i != this.circuitMatrixSize; i++) this.circuitRightSide[i] = this.origRightSide[i];

if (this.circuitNonLinear) {
for (i = 0; i != this.circuitMatrixSize; i++) for (j = 0; j != this.circuitMatrixSize; j++) this.circuitMatrix[i][j] = this.origMatrix[i][j];


}for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.doStep();
}
if (this.stopMessage != null ) return;
var printit = debugprint;
debugprint = false;
for (j = 0; j != this.circuitMatrixSize; j++) {
for (i = 0; i != this.circuitMatrixSize; i++) {
var x = this.circuitMatrix[i][j];
if (Double.isNaN(x) || Double.isInfinite(x) ) {
this.stop$S$com_falstad_circuit_CircuitElm("nan/infinite matrix!", null);
return;
}}
}
if (printit) {
for (j = 0; j != this.circuitMatrixSize; j++) {
for (i = 0; i != this.circuitMatrixSize; i++) System.out.print$S(new Double(this.circuitMatrix[j][i]).toString() + ",");

System.out.print$S("  " + new Double(this.circuitRightSide[j]).toString() + "\n" );
}
System.out.print$S("\u000a");
}if (this.circuitNonLinear) {
if (this.converged && subiter > 0 ) break;
if (!this.lu_factor$DAA$I$IA(this.circuitMatrix, this.circuitMatrixSize, this.circuitPermute)) {
this.stop$S$com_falstad_circuit_CircuitElm("Singular matrix!", null);
return;
}}this.lu_solve$DAA$I$IA$DA(this.circuitMatrix, this.circuitMatrixSize, this.circuitPermute, this.circuitRightSide);
for (j = 0; j != this.circuitMatrixFullSize; j++) {
var ri = this.circuitRowInfo[j];
var res = 0;
if (ri.type == 1) res = ri.value;
 else res = this.circuitRightSide[ri.mapCol];
if (Double.isNaN(res)) {
this.converged = false;
break;
}if (j < this.nodeList.size() - 1) {
var cn = this.getCircuitNode$I(j + 1);
for (k = 0; k != cn.links.size(); k++) {
var cnl = cn.links.elementAt$I(k);
cnl.elm.setNodeVoltage$I$D(cnl.num, res);
}
} else {
var ji = j - (this.nodeList.size() - 1);
this.voltageSources[ji].setCurrent$I$D(ji, res);
}}
if (!this.circuitNonLinear) break;
}
if (subiter > 5) System.out.print$S("converged after " + subiter + " iterations\n" );
if (subiter == 5000) {
this.stop$S$com_falstad_circuit_CircuitElm("Convergence failed!", null);
break;
}this.t += this.timeStep;
for (i = 0; i != this.scopeCount; i++) this.scopes[i].timeStep();

tm = System.currentTimeMillis();
lit = tm;
if (iter * 1000 >= steprate * (tm - this.lastIterTime) || (tm - this.lastFrameTime > 500) ) break;
}
this.lastIterTime = lit;
});

Clazz.newMeth(C$, 'min$I$I', function (a, b) {
return (a < b) ? a : b;
});

Clazz.newMeth(C$, 'max$I$I', function (a, b) {
return (a > b) ? a : b;
});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
p$.repaintCV$I.apply(this, [this.pause]);
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
p$.repaintCV$I.apply(this, [0]);
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
p$.repaintCV$I.apply(this, [100]);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
var ac = e.getActionCommand();
var src = e.getSource();
if (ac == "repaint") {
p$.repaintCV$I.apply(this, [0]);
this.lastFrameTime = this.lastTime;
return;
} else if (src === this.resetButton ) {
var i;
this.dbimage = this.main.createImage$I$I(this.winSize.width, this.winSize.height);
for (i = 0; i != this.elmList.size(); i++) this.getElm$I(i).reset();

for (i = 0; i != this.scopeCount; i++) this.scopes[i].resetGraph();

this.analyzeFlag = true;
this.t = 0;
this.stoppedCheck.setState$Z(false);
p$.repaintCV$I.apply(this, [0]);
} else if (src === this.dumpMatrixButton ) {
this.dumpMatrix = true;
} else if (src === this.exportItem ) {
this.doExport$Z(false);
} else if (src === this.optionsItem ) {
this.doEdit$com_falstad_circuit_Editable(Clazz.new_((I$[27]||(I$[27]=Clazz.load('com.falstad.circuit.EditOptions'))).c$$com_falstad_circuit_CirSim,[this]));
} else if (src === this.importItem ) {
this.doImport();
} else if (src === this.exportLinkItem ) {
this.doExport$Z(true);
} else if (src === this.undoItem ) {
this.doUndo();
} else if (src === this.redoItem ) {
this.doRedo();
} else if (ac.compareTo$S("Cut") == 0) {
if (src !== this.elmCutMenuItem ) this.menuElm = null;
this.doCut();
} else if (ac.compareTo$S("Copy") == 0) {
if (src !== this.elmCopyMenuItem ) this.menuElm = null;
this.doCopy();
} else if (ac.compareTo$S("Paste") == 0) {
this.doPaste();
} else if (src === this.selectAllItem ) {
this.doSelectAll();
} else if (src === this.exitItem ) {
this.destroyFrame();
return;
}if (ac.compareTo$S("stackAll") == 0) this.stackAll();
 else if (ac.compareTo$S("unstackAll") == 0) this.unstackAll();
 else if (src === this.elmEditMenuItem ) this.doEdit$com_falstad_circuit_Editable(this.menuElm);
 else if (ac.compareTo$S("Delete") == 0) {
if (src !== this.elmDeleteMenuItem ) this.menuElm = null;
this.doDelete();
}if (src === this.elmScopeMenuItem  && this.menuElm != null  ) {
var i;
for (i = 0; i != this.scopeCount; i++) if (this.scopes[i].elm == null ) break;

if (i == this.scopeCount) {
if (this.scopeCount == this.scopes.length) return;
this.scopeCount++;
this.scopes[i] = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.circuit.Scope'))).c$$com_falstad_circuit_CirSim,[this]);
this.scopes[i].position = i;
this.handleResize();
}this.scopes[i].setElm$com_falstad_circuit_CircuitElm(this.menuElm);
}if (this.menuScope != -1) {
if (ac.compareTo$S("remove") == 0) this.scopes[this.menuScope].setElm$com_falstad_circuit_CircuitElm(null);
 else if (ac.compareTo$S("speed2") == 0) this.scopes[this.menuScope].speedUp();
 else if (ac.compareTo$S("speed1/2") == 0) this.scopes[this.menuScope].slowDown();
 else if (ac.compareTo$S("scale") == 0) this.scopes[this.menuScope].adjustScale$D(0.5);
 else if (ac.compareTo$S("maxscale") == 0) this.scopes[this.menuScope].adjustScale$D(1.0E-50);
 else if (ac.compareTo$S("stack") == 0) this.stackScope$I(this.menuScope);
 else if (ac.compareTo$S("unstack") == 0) this.unstackScope$I(this.menuScope);
 else if (ac.compareTo$S("selecty") == 0) this.scopes[this.menuScope].selectY();
 else if (ac.compareTo$S("reset") == 0) this.scopes[this.menuScope].resetGraph();
p$.repaintCV$I.apply(this, [0]);
}if (ac.indexOf("setup ") == 0) {
this.pushUndo();
this.readCircuitFile$S$S(ac.substring(6), (e.getSource()).getLabel());
}});

Clazz.newMeth(C$, 'stackScope$I', function (s) {
if (s == 0) {
if (this.scopeCount < 2) return;
s = 1;
}if (this.scopes[s].position == this.scopes[s - 1].position) return;
this.scopes[s].position = this.scopes[s - 1].position;
for (s++; s < this.scopeCount; s++) this.scopes[s].position--;

});

Clazz.newMeth(C$, 'unstackScope$I', function (s) {
if (s == 0) {
if (this.scopeCount < 2) return;
s = 1;
}if (this.scopes[s].position != this.scopes[s - 1].position) return;
for (; s < this.scopeCount; s++) this.scopes[s].position++;

});

Clazz.newMeth(C$, 'stackAll', function () {
var i;
for (i = 0; i != this.scopeCount; i++) {
this.scopes[i].position = 0;
this.scopes[i].$showMax = this.scopes[i].$showMin = false;
}
});

Clazz.newMeth(C$, 'unstackAll', function () {
var i;
for (i = 0; i != this.scopeCount; i++) {
this.scopes[i].position = i;
this.scopes[i].$showMax = true;
}
});

Clazz.newMeth(C$, 'doEdit$com_falstad_circuit_Editable', function (eable) {
this.clearSelection();
this.pushUndo();
if (this.editDialog != null ) {
this.requestFocus();
this.editDialog.setVisible$Z(false);
this.editDialog = null;
}this.editDialog = Clazz.new_((I$[28]||(I$[28]=Clazz.load('com.falstad.circuit.EditDialog'))).c$$com_falstad_circuit_Editable$com_falstad_circuit_CirSim,[eable, this]);
this.editDialog.show();
});

Clazz.newMeth(C$, 'doImport', function () {
if (this.impDialog == null ) this.impDialog = (I$[29]||(I$[29]=Clazz.load('com.falstad.circuit.ImportExportDialogFactory'))).Create$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action(this, (I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).IMPORT);
this.pushUndo();
this.impDialog.execute();
});

Clazz.newMeth(C$, 'doExport$Z', function (url) {
var dump = this.dumpCircuit();
if (url) dump = this.baseURL + "#" + (I$[31]||(I$[31]=Clazz.load('java.net.URLEncoder'))).encode$S(dump) ;
if (this.expDialog == null ) {
this.expDialog = (I$[29]||(I$[29]=Clazz.load('com.falstad.circuit.ImportExportDialogFactory'))).Create$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action(this, (I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT);
}this.expDialog.setDump$S(dump);
this.expDialog.execute();
});

Clazz.newMeth(C$, 'dumpCircuit', function () {
var i;
var f = (this.dotsCheckItem.getState()) ? 1 : 0;
f = f|((this.smallGridCheckItem.getState()) ? 2 : 0);
f = f|((this.voltsCheckItem.getState()) ? 0 : 4);
f = f|((this.powerCheckItem.getState()) ? 8 : 0);
f = f|((this.showValuesCheckItem.getState()) ? 0 : 16);
var dump = "$ " + f + " " + new Double(this.timeStep).toString() + " " + new Double(this.getIterCount()).toString() + " " + this.currentBar.getValue() + " " + new Double((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).voltageRange).toString() + " " + this.powerBar.getValue() + "\n" ;
for (i = 0; i != this.elmList.size(); i++) dump += this.getElm$I(i).dump() + "\n";

for (i = 0; i != this.scopeCount; i++) {
var d = this.scopes[i].dump();
if (d != null ) dump += d + "\n";
}
if (this.hintType != -1) dump += "h " + this.hintType + " " + this.hintItem1 + " " + this.hintItem2 + "\n" ;
return dump;
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (!this.finished) {
return;
}System.out.print$S((e.getSource()).getValue() + "\n");
});

Clazz.newMeth(C$, 'readUrlData$java_net_URL', function (url) {
if (url == null ) return null;
System.out.println$S("Looking for " + url);
var o = url.getContent();
if (o == null ) throw Clazz.new_(Clazz.load('java.io.IOException').c$$S,["Could not read " + url]);
var fis = o;
var ba = Clazz.new_((I$[32]||(I$[32]=Clazz.load('java.io.ByteArrayOutputStream'))).c$$I,[fis.available()]);
var blen = 1024;
var b = Clazz.array(Byte.TYPE, [blen]);
while (true){
var len = fis.read$BA(b);
if (len <= 0) break;
ba.write$BA$I$I(b, 0, len);
}
return ba;
});

Clazz.newMeth(C$, 'getSetupList$a2s_Menu$Z', function (menu, retry) {
var stack = Clazz.array((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))), [6]);
var stackptr = 0;
stack[stackptr++] = menu;
var b = p$.getResource$S$Z.apply(this, ["setuplist.txt", true]);
if (b == null ) {
this.stop$S$com_falstad_circuit_CircuitElm("Can\'t read setuplist.txt!", null);
return;
}var s =  String.instantialize(b);
var st = Clazz.new_((I$[33]||(I$[33]=Clazz.load('java.util.StringTokenizer'))).c$$S$S$Z,[s, "\u000a\u000d", false]);
var line = null;
while (st.hasMoreTokens()){
if ((line = st.nextToken()) == null  || line.length$() == 0  || line.startsWith$S("#") ) continue;
System.out.println$S(line);
if (line.charAt(0) == '+') {
var n = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Menu'))).c$$S,[line.substring(1)]);
menu.add$javax_swing_JMenuItem(n);
menu = stack[stackptr++] = n;
} else if (line.charAt(0) == '-') {
menu = stack[--stackptr - 1];
} else {
var i = line.indexOf(' ');
if (i > 0) {
var title = line.substring(i + 1);
var first = false;
if (line.charAt(0) == '>') first = true;
var file = line.substring(first ? 1 : 0, i);
menu.add$javax_swing_JMenuItem(this.getMenuItem$S$S(title, "setup " + file));
if (first && this.startCircuit == null  ) {
this.startCircuit = file;
this.startLabel = title;
}}}}
System.out.println$S("done reading setuplist.txt");
});

Clazz.newMeth(C$, 'getResource$S$Z', function (file, isStartup) {
var i0 = 0;
var i1 = 4;
if (C$.foundSite >= 0) i0 = i1 = C$.foundSite;
for (var i = i0; i <= i1; i++) {
C$.foundSite = i;
var url = null;
try {
switch (i) {
case 0:
if (this.applet == null ) {
var f = Clazz.new_((I$[34]||(I$[34]=Clazz.load('java.io.File'))).c$$S,["."]);
var s = f.getCanonicalPath();
url = Clazz.new_((I$[35]||(I$[35]=Clazz.load('java.net.URL'))).c$$S,["file:" + s + "/" + file ]);
} else {
var path = this.applet.getDocumentBase().toString();
var pt = path.lastIndexOf(".htm");
if (pt > 0) path = path.substring(0, pt);
path = path.$replace('\\', '/');
pt = path.lastIndexOf('/');
if (pt > 0) path = path.substring(0, pt + 1);
 else path = path + "/";
url = Clazz.new_((I$[35]||(I$[35]=Clazz.load('java.net.URL'))).c$$S,[path + file]);
}break;
case 1:
url = (this.applet == null  ? null : Clazz.new_((I$[35]||(I$[35]=Clazz.load('java.net.URL'))).c$$S,[this.applet.getCodeBase().toString() + file]));
break;
case 2:
url = this.getClass().getResource$S(file);
break;
case 3:
url = Clazz.new_((I$[35]||(I$[35]=Clazz.load('java.net.URL'))).c$$S,["http://www.falstad.com/circuit-java/" + file]);
break;
}
var os = (url == null  ? null : this.readUrlData$java_net_URL(url));
if (os == null ) continue;
var b = os.toByteArray();
if (b != null  && b.length > 0  && b[0] == (isStartup ? '#' : '$').$c()  ) {
C$.foundSite = i;
return b;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
}
return null;
});

Clazz.newMeth(C$, 'readCircuitFile$S$S', function (str, title) {
this.t = 0;
System.out.println$S(str);
try {
var b = p$.getResource$S$Z.apply(this, ["circuits/" + str, false]);
this.readSetup$BA$I$Z(b, b.length, false);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
this.stop$S$com_falstad_circuit_CircuitElm("Unable to read circuits/" + str + "!" , null);
} else {
throw e;
}
}
this.titleLabel.setText$S(title);
});

Clazz.newMeth(C$, 'readSetup$S', function (text) {
this.readSetup$S$Z(text, false);
});

Clazz.newMeth(C$, 'readSetup$S$Z', function (text, retain) {
this.readSetup$BA$I$Z(text.getBytes(), text.length$(), retain);
this.titleLabel.setText$S("untitled");
});

Clazz.newMeth(C$, 'readSetup$BA$I$Z', function (b, len, retain) {
var i;
if (!retain) {
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.$delete();
}
this.elmList.removeAllElements();
this.hintType = -1;
this.timeStep = 5.0E-6;
this.dotsCheckItem.setState$Z(false);
this.smallGridCheckItem.setState$Z(false);
this.powerCheckItem.setState$Z(false);
this.voltsCheckItem.setState$Z(true);
this.showValuesCheckItem.setState$Z(true);
this.setGrid();
this.speedBar.setValue$I(117);
this.currentBar.setValue$I(50);
this.powerBar.setValue$I(50);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).voltageRange = 5;
this.scopeCount = 0;
}p$.repaintCV$I.apply(this, [0]);
var s = (b == null  ? "" :  String.instantialize(b));
var t = Clazz.new_((I$[33]||(I$[33]=Clazz.load('java.util.StringTokenizer'))).c$$S$S$Z,[s, "\u000a\u000d", false]);
while (t.hasMoreTokens()){
var line = t.nextToken();
if (line.length$() == 0) continue;
System.out.println$S(line);
if (line.startsWith$S("#")) continue;
var st = Clazz.new_((I$[33]||(I$[33]=Clazz.load('java.util.StringTokenizer'))).c$$S,[line]);
while (st.hasMoreTokens()){
var type = st.nextToken();
var tint = type.charAt(0);
try {
if (tint == 'o') {
var sc = Clazz.new_((I$[14]||(I$[14]=Clazz.load('com.falstad.circuit.Scope'))).c$$com_falstad_circuit_CirSim,[this]);
sc.position = this.scopeCount;
sc.undump$java_util_StringTokenizer(st);
this.scopes[this.scopeCount++] = sc;
break;
}if (tint == 'h') {
this.readHint$java_util_StringTokenizer(st);
break;
}if (tint == '$') {
this.readOptions$java_util_StringTokenizer(st);
break;
}if (tint == '%' || tint == '?'  || tint == 'B' ) {
break;
}var ttint = tint.$c();
if (tint >= '0' && tint <= '9' ) ttint =  new Integer(type).intValue();
var x1 =  new Integer(st.nextToken()).intValue();
var y1 =  new Integer(st.nextToken()).intValue();
var x2 =  new Integer(st.nextToken()).intValue();
var y2 =  new Integer(st.nextToken()).intValue();
var f =  new Integer(st.nextToken()).intValue();
var ce = null;
var cls = this.getDumpClass$I(ttint);
if (cls == null ) {
System.out.println$S("unrecognized dump type: " + type);
break;
}var carr = Clazz.array(java.lang.Class, [6]);
carr[0] = carr[1] = carr[2] = carr[3] = carr[4] = Integer.TYPE;
carr[5] = Clazz.getClass((I$[33]||(I$[33]=Clazz.load('java.util.StringTokenizer'))));
var cstr = null;
cstr = cls.getConstructor$ClassA(carr);
var oarr = Clazz.array(java.lang.Object, [6]);
oarr[0] =  new Integer(x1);
oarr[1] =  new Integer(y1);
oarr[2] =  new Integer(x2);
oarr[3] =  new Integer(y2);
oarr[4] =  new Integer(f);
oarr[5] = st;
ce = cstr.newInstance$OA(oarr);
ce.setPoints();
this.elmList.addElement$TE(ce);
} catch (e$$) {
if (Clazz.exceptionOf(e$$, java.lang.reflect.InvocationTargetException)){
var ee = e$$;
{
ee.getTargetException().printStackTrace();
break;
}
} else if (Clazz.exceptionOf(e$$, Exception)){
var ee = e$$;
{
ee.printStackTrace();
break;
}
} else {
throw e$$;
}
}
break;
}
}
this.enableItems();
if (!retain) this.handleResize();
this.needAnalyze();
});

Clazz.newMeth(C$, 'readHint$java_util_StringTokenizer', function (st) {
this.hintType =  new Integer(st.nextToken()).intValue();
this.hintItem1 =  new Integer(st.nextToken()).intValue();
this.hintItem2 =  new Integer(st.nextToken()).intValue();
});

Clazz.newMeth(C$, 'readOptions$java_util_StringTokenizer', function (st) {
var flags =  new Integer(st.nextToken()).intValue();
this.dotsCheckItem.setState$Z((flags & 1) != 0);
this.smallGridCheckItem.setState$Z((flags & 2) != 0);
this.voltsCheckItem.setState$Z((flags & 4) == 0);
this.powerCheckItem.setState$Z((flags & 8) == 8);
this.showValuesCheckItem.setState$Z((flags & 16) == 0);
this.timeStep =  new Double(st.nextToken()).doubleValue();
var sp =  new Double(st.nextToken()).doubleValue();
var sp2 = ((Math.log(10 * sp) * 24 + 61.5)|0);
this.speedBar.setValue$I(sp2);
this.currentBar.setValue$I( new Integer(st.nextToken()).intValue());
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).voltageRange =  new Double(st.nextToken()).doubleValue();
try {
this.powerBar.setValue$I( new Integer(st.nextToken()).intValue());
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.setGrid();
});

Clazz.newMeth(C$, 'snapGrid$I', function (x) {
return (x + this.gridRound) & this.gridMask;
});

Clazz.newMeth(C$, 'doSwitch$I$I', function (x, y) {
if (this.mouseElm == null  || !(Clazz.instanceOf(this.mouseElm, "com.falstad.circuit.SwitchElm")) ) return false;
var se = this.mouseElm;
se.toggle();
System.out.println$S("doSwitch");
if (se.momentary) {
System.out.println$S("se is momentary");
this.heldSwitchElm = se;
}this.needAnalyze();
return true;
});

Clazz.newMeth(C$, 'locateElm$com_falstad_circuit_CircuitElm', function (elm) {
var i;
for (i = 0; i != this.elmList.size(); i++) if (elm === this.elmList.elementAt$I(i) ) return i;

return -1;
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 4) != 0) {
var ex = e.getModifiersEx();
if ((ex & 960) == 0) return;
}if (!this.circuitArea.contains$I$I(e.getX(), e.getY())) return;
if (this.dragElm != null ) this.dragElm.drag$I$I(e.getX(), e.getY());
var success = true;
switch (this.tempMouseMode) {
case 1:
this.dragAll$I$I(this.snapGrid$I(e.getX()), this.snapGrid$I(e.getY()));
break;
case 2:
this.dragRow$I$I(this.snapGrid$I(e.getX()), this.snapGrid$I(e.getY()));
break;
case 3:
this.dragColumn$I$I(this.snapGrid$I(e.getX()), this.snapGrid$I(e.getY()));
break;
case 5:
if (this.mouseElm != null ) this.dragPost$I$I(this.snapGrid$I(e.getX()), this.snapGrid$I(e.getY()));
break;
case 6:
if (this.mouseElm == null ) this.selectArea$I$I(e.getX(), e.getY());
 else {
this.tempMouseMode = 4;
success = this.dragSelected$I$I(e.getX(), e.getY());
}break;
case 4:
success = this.dragSelected$I$I(e.getX(), e.getY());
break;
}
this.dragging = true;
if (success) {
if (this.tempMouseMode == 4 && Clazz.instanceOf(this.mouseElm, "com.falstad.circuit.GraphicElm") ) {
this.dragX = e.getX();
this.dragY = e.getY();
} else {
this.dragX = this.snapGrid$I(e.getX());
this.dragY = this.snapGrid$I(e.getY());
}}p$.repaintCV$I.apply(this, [this.pause]);
});

Clazz.newMeth(C$, 'dragAll$I$I', function (x, y) {
var dx = x - this.dragX;
var dy = y - this.dragY;
if (dx == 0 && dy == 0 ) return;
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.move$I$I(dx, dy);
}
this.removeZeroLengthElements();
});

Clazz.newMeth(C$, 'dragRow$I$I', function (x, y) {
var dy = y - this.dragY;
if (dy == 0) return;
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (ce.y == this.dragY) ce.movePoint$I$I$I(0, 0, dy);
if (ce.y2 == this.dragY) ce.movePoint$I$I$I(1, 0, dy);
}
this.removeZeroLengthElements();
});

Clazz.newMeth(C$, 'dragColumn$I$I', function (x, y) {
var dx = x - this.dragX;
if (dx == 0) return;
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (ce.x == this.dragX) ce.movePoint$I$I$I(0, dx, 0);
if (ce.x2 == this.dragX) ce.movePoint$I$I$I(1, dx, 0);
}
this.removeZeroLengthElements();
});

Clazz.newMeth(C$, 'dragSelected$I$I', function (x, y) {
var me = false;
if (this.mouseElm != null  && !this.mouseElm.isSelected() ) this.mouseElm.setSelected$Z(me = true);
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (ce.isSelected() && !(Clazz.instanceOf(ce, "com.falstad.circuit.GraphicElm")) ) break;
}
if (i != this.elmList.size()) {
x = this.snapGrid$I(x);
y = this.snapGrid$I(y);
}var dx = x - this.dragX;
var dy = y - this.dragY;
if (dx == 0 && dy == 0 ) {
if (me) this.mouseElm.setSelected$Z(false);
return false;
}var allowed = true;
for (i = 0; allowed && i != this.elmList.size() ; i++) {
var ce = this.getElm$I(i);
if (ce.isSelected() && !ce.allowMove$I$I(dx, dy) ) allowed = false;
}
if (allowed) {
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (ce.isSelected()) ce.move$I$I(dx, dy);
}
this.needAnalyze();
}if (me) this.mouseElm.setSelected$Z(false);
return allowed;
});

Clazz.newMeth(C$, 'dragPost$I$I', function (x, y) {
if (this.draggingPost == -1) {
this.draggingPost = (this.distanceSq$I$I$I$I(this.mouseElm.x, this.mouseElm.y, x, y) > this.distanceSq$I$I$I$I(this.mouseElm.x2, this.mouseElm.y2, x, y)) ? 1 : 0;
}var dx = x - this.dragX;
var dy = y - this.dragY;
if (dx == 0 && dy == 0 ) return;
this.mouseElm.movePoint$I$I$I(this.draggingPost, dx, dy);
this.needAnalyze();
});

Clazz.newMeth(C$, 'selectArea$I$I', function (x, y) {
var x1 = this.min$I$I(x, this.initDragX);
var x2 = this.max$I$I(x, this.initDragX);
var y1 = this.min$I$I(y, this.initDragY);
var y2 = this.max$I$I(y, this.initDragY);
this.selectedArea = Clazz.new_((I$[20]||(I$[20]=Clazz.load('java.awt.Rectangle'))).c$$I$I$I$I,[x1, y1, x2 - x1, y2 - y1]);
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.selectRect$java_awt_Rectangle(this.selectedArea);
}
});

Clazz.newMeth(C$, 'setSelectedElm$com_falstad_circuit_CircuitElm', function (cs) {
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.setSelected$Z(ce === cs );
}
this.mouseElm = cs;
});

Clazz.newMeth(C$, 'removeZeroLengthElements', function () {
var i;
var changed = false;
for (i = this.elmList.size() - 1; i >= 0; i--) {
var ce = this.getElm$I(i);
if (ce.x == ce.x2 && ce.y == ce.y2 ) {
this.elmList.removeElementAt$I(i);
ce.$delete();
changed = true;
}}
this.needAnalyze();
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
var x = e.getX();
var y = e.getY();
this.dragX = this.snapGrid$I(x);
this.dragY = this.snapGrid$I(y);
this.draggingPost = -1;
var i;
var origMouse = this.mouseElm;
this.mouseElm = null;
this.mousePost = -1;
this.plotXElm = this.plotYElm = null;
var bestDist = 100000;
var bestArea = 100000;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
if (ce.boundingBox.contains$I$I(x, y)) {
var j;
var area = ce.boundingBox.width * ce.boundingBox.height;
var jn = ce.getPostCount();
if (jn > 2) jn = 2;
for (j = 0; j != jn; j++) {
var pt = ce.getPost$I(j);
var dist = this.distanceSq$I$I$I$I(x, y, pt.x, pt.y);
if (dist <= bestDist && area <= bestArea ) {
bestDist = dist;
bestArea = area;
this.mouseElm = ce;
}}
if (ce.getPostCount() == 0) this.mouseElm = ce;
}}
this.scopeSelected = -1;
if (this.mouseElm == null ) {
for (i = 0; i != this.scopeCount; i++) {
var s = this.scopes[i];
if (s.rect.contains$I$I(x, y)) {
s.select();
this.scopeSelected = i;
}}
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
var j;
var jn = ce.getPostCount();
for (j = 0; j != jn; j++) {
var pt = ce.getPost$I(j);
var dist = this.distanceSq$I$I$I$I(x, y, pt.x, pt.y);
if (this.distanceSq$I$I$I$I(pt.x, pt.y, x, y) < 26) {
this.mouseElm = ce;
this.mousePost = j;
break;
}}
}
} else {
this.mousePost = -1;
for (i = 0; i != this.mouseElm.getPostCount(); i++) {
var pt = this.mouseElm.getPost$I(i);
if (this.distanceSq$I$I$I$I(pt.x, pt.y, x, y) < 26) this.mousePost = i;
}
}if (this.mouseElm !== origMouse ) {
p$.repaintCV$I.apply(this, [0]);
}});

Clazz.newMeth(C$, 'distanceSq$I$I$I$I', function (x1, y1, x2, y2) {
x2 = x2-(x1);
y2 = y2-(y1);
return x2 * x2 + y2 * y2;
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
var ex = e.getModifiersEx();
if (e.getClickCount() == 2 && !this.didSwitch ) this.doEditMenu$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 16) != 0) {
if (this.mouseMode == 6 || this.mouseMode == 4 ) this.clearSelection();
}});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
this.scopeSelected = -1;
this.mouseElm = this.plotXElm = this.plotYElm = null;
p$.repaintCV$I.apply(this, [0]);
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.didSwitch = false;
var ex = e.getModifiersEx();
if ((ex & (64 | 128 | (e.getButton() == 3 ? 0 : 256) )) == 0 && e.isPopupTrigger() ) {
this.doPopupMenu$java_awt_event_MouseEvent(e);
return;
}if ((e.getModifiers() & 1024) != 0) {
this.tempMouseMode = this.mouseMode;
if ((ex & 512) != 0 && (ex & 256) != 0 ) this.tempMouseMode = 3;
 else if ((ex & 512) != 0 && (ex & 64) != 0 ) this.tempMouseMode = 2;
 else if ((ex & 64) != 0) this.tempMouseMode = 6;
 else if ((ex & 512) != 0) this.tempMouseMode = 1;
 else if ((ex & 384) != 0) this.tempMouseMode = 5;
} else if ((e.getModifiers() & 4) != 0) {
if ((ex & 64) != 0) this.tempMouseMode = 2;
 else if ((ex & 384) != 0) this.tempMouseMode = 3;
 else return;
}if (this.tempMouseMode != 6 && this.tempMouseMode != 4 ) this.clearSelection();
if (this.doSwitch$I$I(e.getX(), e.getY())) {
this.didSwitch = true;
return;
}this.pushUndo();
this.initDragX = e.getX();
this.initDragY = e.getY();
this.dragging = true;
if (this.tempMouseMode != 0 || this.addingClass == null  ) return;
var x0 = this.snapGrid$I(e.getX());
var y0 = this.snapGrid$I(e.getY());
if (!this.circuitArea.contains$I$I(x0, y0)) return;
this.dragElm = this.constructElement$Class$I$I(this.addingClass, x0, y0);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
var ex = e.getModifiersEx();
if ((ex & (64 | 128 | (e.getButton() == 3 ? 0 : 256) )) == 0 && e.isPopupTrigger() ) {
this.doPopupMenu$java_awt_event_MouseEvent(e);
return;
}this.tempMouseMode = this.mouseMode;
this.selectedArea = null;
this.dragging = false;
var circuitChanged = false;
if (this.heldSwitchElm != null ) {
this.heldSwitchElm.mouseUp();
this.heldSwitchElm = null;
circuitChanged = true;
}if (this.dragElm != null ) {
if (this.dragElm.x == this.dragElm.x2 && this.dragElm.y == this.dragElm.y2 ) this.dragElm.$delete();
 else {
this.elmList.addElement$TE(this.dragElm);
circuitChanged = true;
}this.dragElm = null;
}if (circuitChanged) this.needAnalyze();
if (this.dragElm != null ) this.dragElm.$delete();
this.dragElm = null;
p$.repaintCV$I.apply(this, [0]);
});

Clazz.newMeth(C$, 'constructElement$Class$I$I', function (c, x0, y0) {
var carr = Clazz.array(java.lang.Class, [2]);
carr[0] = carr[1] = Integer.TYPE;
var cstr = null;
try {
cstr = c.getConstructor$ClassA(carr);
} catch (e$$) {
if (Clazz.exceptionOf(e$$, NoSuchMethodException)){
var ee = e$$;
{
System.out.println$S("caught NoSuchMethodException " + c);
return null;
}
} else if (Clazz.exceptionOf(e$$, Exception)){
var ee = e$$;
{
ee.printStackTrace();
return null;
}
} else {
throw e$$;
}
}
var oarr = Clazz.array(java.lang.Object, [2]);
oarr[0] =  new Integer(x0);
oarr[1] =  new Integer(y0);
try {
return cstr.newInstance$OA(oarr);
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
ee.printStackTrace();
} else {
throw ee;
}
}
return null;
});

Clazz.newMeth(C$, 'doEditMenu$java_awt_event_MouseEvent', function (e) {
if (this.mouseElm != null ) this.doEdit$com_falstad_circuit_Editable(this.mouseElm);
});

Clazz.newMeth(C$, 'doPopupMenu$java_awt_event_MouseEvent', function (e) {
this.menuElm = this.mouseElm;
this.menuScope = -1;
if (this.scopeSelected != -1) {
var m = this.scopes[this.scopeSelected].getMenu();
this.menuScope = this.scopeSelected;
if (m != null ) m.show$java_awt_Component$I$I(e.getComponent(), e.getX(), e.getY());
} else if (this.mouseElm != null ) {
this.elmEditMenuItem.setEnabled$Z(this.mouseElm.getEditInfo$I(0) != null );
this.elmScopeMenuItem.setEnabled$Z(this.mouseElm.canViewInScope());
this.elmMenu.show$java_awt_Component$I$I(e.getComponent(), e.getX(), e.getY());
} else {
p$.doMainMenuChecks$a2s_PopupMenu.apply(this, [this.mainMenu]);
this.mainMenu.show$java_awt_Component$I$I(e.getComponent(), e.getX(), e.getY());
}});

Clazz.newMeth(C$, 'doMainMenuChecks$a2s_PopupMenu', function (mainMenu2) {
});

Clazz.newMeth(C$, 'doMainMenuChecks$a2s_Menu', function (m) {
var i;
if (m === this.optionsMenu ) return;
});

Clazz.newMeth(C$, 'enableItems', function () {
if (this.powerCheckItem.getState()) {
this.powerBar.enable();
this.powerLabel.enable();
} else {
this.powerBar.disable();
this.powerLabel.disable();
}this.enableUndoRedo();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (!this.finished) {
return;
}p$.repaintCV$I.apply(this, [this.pause]);
var mi = e.getItemSelectable();
if (mi === this.stoppedCheck ) return;
if (mi === this.smallGridCheckItem ) this.setGrid();
if (mi === this.powerCheckItem ) {
if (this.powerCheckItem.getState()) this.voltsCheckItem.setState$Z(false);
 else this.voltsCheckItem.setState$Z(true);
}if (mi === this.voltsCheckItem  && this.voltsCheckItem.getState() ) this.powerCheckItem.setState$Z(false);
this.enableItems();
if (this.menuScope != -1) {
var sc = this.scopes[this.menuScope];
sc.handleMenu$java_awt_event_ItemEvent$O(e, mi);
}if (Clazz.instanceOf(mi, "a2s.CheckboxMenuItem")) {
var mmi = mi;
var prevMouseMode = this.mouseMode;
this.setMouseMode$I(0);
var s = mmi.getActionCommand();
if (s.length$() > 0) this.mouseModeStr = s;
if (s.compareTo$S("DragAll") == 0) this.setMouseMode$I(1);
 else if (s.compareTo$S("DragRow") == 0) this.setMouseMode$I(2);
 else if (s.compareTo$S("DragColumn") == 0) this.setMouseMode$I(3);
 else if (s.compareTo$S("DragSelected") == 0) this.setMouseMode$I(4);
 else if (s.compareTo$S("DragPost") == 0) this.setMouseMode$I(5);
 else if (s.compareTo$S("Select") == 0) this.setMouseMode$I(6);
 else if (s.length$() > 0) {
try {
this.addingClass = Clazz.forName(this.BASE_PACKAGE + s);
} catch (ee) {
if (Clazz.exceptionOf(ee, Exception)){
ee.printStackTrace();
} else {
throw ee;
}
}
} else this.setMouseMode$I(prevMouseMode);
this.tempMouseMode = this.mouseMode;
}});

Clazz.newMeth(C$, 'repaintCV$I', function (pause) {
this.cv.repaint$J(pause);
});

Clazz.newMeth(C$, 'setGrid', function () {
this.gridSize = (this.smallGridCheckItem.getState()) ? 8 : 16;
this.gridMask = ~(this.gridSize - 1);
this.gridRound = (this.gridSize/2|0) - 1;
});

Clazz.newMeth(C$, 'pushUndo', function () {
this.redoStack.removeAllElements();
var s = this.dumpCircuit();
if (this.undoStack.size() > 0 && s.compareTo$S(this.undoStack.lastElement()) == 0 ) return;
this.undoStack.add$TE(s);
this.enableUndoRedo();
});

Clazz.newMeth(C$, 'doUndo', function () {
if (this.undoStack.size() == 0) return;
this.redoStack.add$TE(this.dumpCircuit());
var s = this.undoStack.remove$I(this.undoStack.size() - 1);
this.readSetup$S(s);
this.enableUndoRedo();
});

Clazz.newMeth(C$, 'doRedo', function () {
if (this.redoStack.size() == 0) return;
this.undoStack.add$TE(this.dumpCircuit());
var s = this.redoStack.remove$I(this.redoStack.size() - 1);
this.readSetup$S(s);
this.enableUndoRedo();
});

Clazz.newMeth(C$, 'enableUndoRedo', function () {
this.redoItem.setEnabled$Z(this.redoStack.size() > 0);
this.undoItem.setEnabled$Z(this.undoStack.size() > 0);
});

Clazz.newMeth(C$, 'setMouseMode$I', function (mode) {
this.mouseMode = mode;
if (mode == 0) this.cv.setCursor$java_awt_Cursor(Clazz.new_((I$[36]||(I$[36]=Clazz.load('java.awt.Cursor'))).c$$I,[1]));
 else this.cv.setCursor$java_awt_Cursor(Clazz.new_((I$[36]||(I$[36]=Clazz.load('java.awt.Cursor'))).c$$I,[0]));
});

Clazz.newMeth(C$, 'setMenuSelection', function () {
if (this.menuElm != null ) {
if (this.menuElm.selected) return;
this.clearSelection();
this.menuElm.setSelected$Z(true);
}});

Clazz.newMeth(C$, 'doCut', function () {
var i;
this.pushUndo();
this.setMenuSelection();
this.clipboard = "";
for (i = this.elmList.size() - 1; i >= 0; i--) {
var ce = this.getElm$I(i);
if (ce.isSelected()) {
this.clipboard += ce.dump() + "\n";
ce.$delete();
this.elmList.removeElementAt$I(i);
}}
this.enablePaste();
this.needAnalyze();
});

Clazz.newMeth(C$, 'doDelete', function () {
var i;
this.pushUndo();
this.setMenuSelection();
var hasDeleted = false;
for (i = this.elmList.size() - 1; i >= 0; i--) {
var ce = this.getElm$I(i);
if (ce.isSelected()) {
ce.$delete();
this.elmList.removeElementAt$I(i);
hasDeleted = true;
}}
if (!hasDeleted) {
for (i = this.elmList.size() - 1; i >= 0; i--) {
var ce = this.getElm$I(i);
if (ce === this.mouseElm ) {
ce.$delete();
this.elmList.removeElementAt$I(i);
hasDeleted = true;
this.mouseElm = null;
break;
}}
}if (hasDeleted) this.needAnalyze();
});

Clazz.newMeth(C$, 'doCopy', function () {
var i;
this.clipboard = "";
this.setMenuSelection();
for (i = this.elmList.size() - 1; i >= 0; i--) {
var ce = this.getElm$I(i);
if (ce.isSelected()) this.clipboard += ce.dump() + "\n";
}
this.enablePaste();
});

Clazz.newMeth(C$, 'enablePaste', function () {
this.pasteItem.setEnabled$Z(this.clipboard.length$() > 0);
});

Clazz.newMeth(C$, 'doPaste', function () {
this.pushUndo();
this.clearSelection();
var i;
var oldbb = null;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
var bb = ce.getBoundingBox();
if (oldbb != null ) oldbb = oldbb.union$java_awt_Rectangle(bb);
 else oldbb = bb;
}
var oldsz = this.elmList.size();
this.readSetup$S$Z(this.clipboard, true);
var newbb = null;
for (i = oldsz; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.setSelected$Z(true);
var bb = ce.getBoundingBox();
if (newbb != null ) newbb = newbb.union$java_awt_Rectangle(bb);
 else newbb = bb;
}
if (oldbb != null  && newbb != null   && oldbb.intersects$java_awt_Rectangle(newbb) ) {
var dx = 0;
var dy = 0;
var spacew = this.circuitArea.width - oldbb.width - newbb.width ;
var spaceh = this.circuitArea.height - oldbb.height - newbb.height ;
if (spacew > spaceh) dx = this.snapGrid$I(oldbb.x + oldbb.width - newbb.x + this.gridSize);
 else dy = this.snapGrid$I(oldbb.y + oldbb.height - newbb.y + this.gridSize);
for (i = oldsz; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.move$I$I(dx, dy);
}
this.handleResize();
}this.needAnalyze();
});

Clazz.newMeth(C$, 'clearSelection', function () {
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.setSelected$Z(false);
}
});

Clazz.newMeth(C$, 'doSelectAll', function () {
var i;
for (i = 0; i != this.elmList.size(); i++) {
var ce = this.getElm$I(i);
ce.setSelected$Z(true);
}
});

Clazz.newMeth(C$, 'keyPressed$java_awt_event_KeyEvent', function (e) {
});

Clazz.newMeth(C$, 'keyReleased$java_awt_event_KeyEvent', function (e) {
});

Clazz.newMeth(C$, 'keyTyped$java_awt_event_KeyEvent', function (e) {
if ((e.getKeyChar()).$c() == 127 ) {
this.doDelete();
return;
}if (e.getKeyChar() > ' ' && (e.getKeyChar()).$c() < 127  ) {
var c = p$.getClassFromShortCut$I.apply(this, [e.getKeyChar().$c()]);
if (c == null ) return;
var elm = null;
elm = this.constructElement$Class$I$I(c, 0, 0);
if (elm == null ) return;
this.setMouseMode$I(0);
this.mouseModeStr = c.getName();
this.addingClass = c;
}if (e.getKeyChar() == ' ' || (e.getKeyChar()).$c() == 27  ) {
this.setMouseMode$I(6);
this.mouseModeStr = "Select";
}this.tempMouseMode = this.mouseMode;
});

Clazz.newMeth(C$, 'lu_factor$DAA$I$IA', function (a, n, ipvt) {
var scaleFactors;
var i;
var j;
var k;
scaleFactors = Clazz.array(Double.TYPE, [n]);
for (i = 0; i != n; i++) {
var largest = 0;
for (j = 0; j != n; j++) {
var x = Math.abs(a[i][j]);
if (x > largest ) largest = x;
}
if (largest == 0 ) return false;
scaleFactors[i] = 1.0 / largest;
}
for (j = 0; j != n; j++) {
for (i = 0; i != j; i++) {
var q = a[i][j];
for (k = 0; k != i; k++) q -= a[i][k] * a[k][j];

a[i][j] = q;
}
var largest = 0;
var largestRow = -1;
for (i = j; i != n; i++) {
var q = a[i][j];
for (k = 0; k != j; k++) q -= a[i][k] * a[k][j];

a[i][j] = q;
var x = Math.abs(q);
if (x >= largest ) {
largest = x;
largestRow = i;
}}
if (j != largestRow) {
var x;
for (k = 0; k != n; k++) {
x = a[largestRow][k];
a[largestRow][k] = a[j][k];
a[j][k] = x;
}
scaleFactors[largestRow] = scaleFactors[j];
}ipvt[j] = largestRow;
if (a[j][j] == 0.0 ) {
System.out.println$S("avoided zero");
a[j][j] = 1.0E-18;
}if (j != n - 1) {
var mult = 1.0 / a[j][j];
for (i = j + 1; i != n; i++) a[i][j] *= mult;

}}
return true;
});

Clazz.newMeth(C$, 'lu_solve$DAA$I$IA$DA', function (a, n, ipvt, b) {
var i;
for (i = 0; i != n; i++) {
var row = ipvt[i];
var swap = b[row];
b[row] = b[i];
b[i] = swap;
if (swap != 0 ) break;
}
var bi = i++;
for (; i < n; i++) {
var row = ipvt[i];
var j;
var tot = b[row];
b[row] = b[i];
for (j = bi; j < i; j++) tot -= a[i][j] * b[j];

b[i] = tot;
}
for (i = n - 1; i >= 0; i--) {
var tot = b[i];
var j;
for (j = i + 1; j != n; j++) tot -= a[i][j] * b[j];

b[i] = tot / a[i][i];
}
});

Clazz.newMeth(C$, 'getDumpClass$I', function (t) {
switch (t) {
case 111:
case 104:
case 36:
case 37:
case 63:
case 66:
return Clazz.getClass((I$[14]||(I$[14]=Clazz.load('com.falstad.circuit.Scope'))));
}
try {
var data = C$.elmMap.get$O("d" + t);
if (data != null ) return Clazz.forName(this.BASE_PACKAGE + data[1]);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
return null;
});

Clazz.newMeth(C$, 'getClassFromShortCut$I', function (keyChar) {
try {
var data = C$.elmMap.get$O("s" + keyChar);
if (data != null ) return Clazz.forName(this.BASE_PACKAGE + data[0]);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
return null;
});
;
(function(){var C$=Clazz.newClass(P$.CirSim, "FindPathInfo", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.used = null;
this.dest = 0;
this.firstElm = null;
this.type = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$com_falstad_circuit_CircuitElm$I', function (t, e, d) {
C$.$init$.apply(this);
this.dest = d;
this.type = t;
this.firstElm = e;
this.used = Clazz.array(Boolean.TYPE, [this.b$['com.falstad.circuit.CirSim'].nodeList.size()]);
}, 1);

Clazz.newMeth(C$, 'findPath$I', function (n1) {
return this.findPath$I$I(n1, -1);
});

Clazz.newMeth(C$, 'findPath$I$I', function (n1, depth) {
if (n1 == this.dest) return true;
if (depth-- == 0) return false;
if (this.used[n1]) {
return false;
}this.used[n1] = true;
var i;
for (i = 0; i != this.b$['com.falstad.circuit.CirSim'].elmList.size(); i++) {
var ce = this.b$['com.falstad.circuit.CirSim'].getElm$I(i);
if (ce === this.firstElm ) continue;
if (this.type == 1) {
if (Clazz.instanceOf(ce, "com.falstad.circuit.CurrentElm")) continue;
}if (this.type == 2) {
if (!(ce.isWire() || Clazz.instanceOf(ce, "com.falstad.circuit.VoltageElm") )) continue;
}if (this.type == 3 && !ce.isWire() ) continue;
if (this.type == 4) {
if (!(ce.isWire() || Clazz.instanceOf(ce, "com.falstad.circuit.CapacitorElm") || Clazz.instanceOf(ce, "com.falstad.circuit.VoltageElm")  )) continue;
}if (n1 == 0) {
var j;
for (j = 0; j != ce.getPostCount(); j++) if (ce.hasGroundConnection$I(j) && this.findPath$I$I(ce.getNode$I(j), depth) ) {
this.used[n1] = false;
return true;
}
}var j;
for (j = 0; j != ce.getPostCount(); j++) {
if (ce.getNode$I(j) == n1) break;
}
if (j == ce.getPostCount()) continue;
if (ce.hasGroundConnection$I(j) && this.findPath$I$I(0, depth) ) {
this.used[n1] = false;
return true;
}if (this.type == 1 && Clazz.instanceOf(ce, "com.falstad.circuit.InductorElm") ) {
var c = ce.getCurrent();
if (j == 0) c = -c;
if (Math.abs(c - this.firstElm.getCurrent()) > 1.0E-10 ) continue;
}var k;
for (k = 0; k != ce.getPostCount(); k++) {
if (j == k) continue;
if (ce.getConnection$I$I(j, k) && this.findPath$I$I(ce.getNode$I(k), depth) ) {
this.used[n1] = false;
return true;
}}
}
this.used[n1] = false;
return false;
});

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
