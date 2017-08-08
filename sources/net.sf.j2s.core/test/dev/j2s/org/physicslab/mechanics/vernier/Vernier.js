Clazz.declarePackage ("org.physicslab.mechanics.vernier");
Clazz.load (["java.awt.event.ActionListener", "javax.swing.JFrame", "javax.swing.event.ChangeListener"], "org.physicslab.mechanics.vernier.Vernier", ["java.lang.Double", "java.text.DecimalFormat", "java.util.logging.Level", "$.Logger", "javax.swing.BorderFactory", "$.GroupLayout", "$.JButton", "$.JCheckBox", "$.JFormattedTextField", "$.JLabel", "$.JOptionPane", "$.JPanel", "$.JSlider", "$.LayoutStyle", "$.UIManager", "javax.swing.text.DefaultFormatterFactory", "$.NumberFormatter", "org.physicslab.mechanics.vernier.VernierPanel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chkDisplayInfo = null;
this.btngetAnswer = null;
this.lblQuestion = null;
this.txtAnswer = null;
this.zeroErrorSlider = null;
this.chkZerroError = null;
this.vernierPanel = null;
this.settingsPanel = null;
this.zeroerror = 0;
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.vernier, "Vernier", javax.swing.JFrame, [java.awt.event.ActionListener, javax.swing.event.ChangeListener]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.physicslab.mechanics.vernier.Vernier, []);
this.vernierPanel =  new org.physicslab.mechanics.vernier.VernierPanel ();
this.settingsPanel =  new javax.swing.JPanel ();
this.add (this.vernierPanel);
this.initComponents ();
this.add (this.settingsPanel, "South");
this.setDefaultCloseOperation (3);
this.setSize (360, 310);
this.setLocationRelativeTo (null);
this.setTitle ("Vernier Callipers");
this.pack ();
this.setVisible (true);
});
Clazz.defineMethod (c$, "initComponents", 
 function () {
this.lblQuestion =  new javax.swing.JLabel ();
this.chkDisplayInfo =  new javax.swing.JCheckBox ();
this.btngetAnswer =  new javax.swing.JButton ();
this.txtAnswer =  new javax.swing.JFormattedTextField ();
this.zeroErrorSlider =  new javax.swing.JSlider ();
this.chkZerroError =  new javax.swing.JCheckBox ();
this.lblQuestion.setText ("What is the reading of scale in current position (in mm)?");
this.chkDisplayInfo.setText ("Display Readings");
this.zeroErrorSlider.setMajorTickSpacing (5);
this.zeroErrorSlider.setMaximum (5);
this.zeroErrorSlider.setMinimum (-5);
this.zeroErrorSlider.setMinorTickSpacing (1);
this.zeroErrorSlider.setPaintTicks (true);
this.zeroErrorSlider.setToolTipText ("");
this.zeroErrorSlider.setValue (0);
this.zeroErrorSlider.addChangeListener (this);
this.chkZerroError.setText ("Zero Error= 0.00 mm");
this.chkZerroError.addActionListener (this);
this.btngetAnswer.setText ("Check Answer");
this.btngetAnswer.addActionListener (this);
this.chkDisplayInfo.addActionListener (this);
this.txtAnswer.setFormatterFactory ( new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.NumberFormatter ( new java.text.DecimalFormat ("#0.0"))));
this.settingsPanel.setBorder (javax.swing.BorderFactory.createEtchedBorder ());
var layout =  new javax.swing.GroupLayout (this.settingsPanel);
this.settingsPanel.setLayout (layout);
layout.setHorizontalGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addContainerGap ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addComponent (this.lblQuestion).addComponent (this.txtAnswer, -1, 393, 32767)).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.btngetAnswer)).addGroup (layout.createSequentialGroup ().addComponent (this.chkZerroError).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.zeroErrorSlider, -2, -1, -2).addGap (0, 0, 32767))).addContainerGap ()).addGroup (layout.createSequentialGroup ().addComponent (this.chkDisplayInfo).addGap (0, 0, 32767)))));
layout.setVerticalGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addContainerGap ().addComponent (this.lblQuestion).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.BASELINE).addComponent (this.btngetAnswer).addComponent (this.txtAnswer, -2, -1, -2)).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.chkDisplayInfo).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.UNRELATED).addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addComponent (this.zeroErrorSlider, -2, -1, -2).addComponent (this.chkZerroError)).addContainerGap (-1, 32767)));
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
try {
var installedLookAndFeels = javax.swing.UIManager.getInstalledLookAndFeels ();
for (var idx = 0; idx < installedLookAndFeels.length; idx++) if ("Nimbus".equals (installedLookAndFeels[idx].getName ())) {
javax.swing.UIManager.setLookAndFeel (installedLookAndFeels[idx].getClassName ());
break;
}
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.vernier.Vernier.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else if (Clazz.exceptionOf (e$$, InstantiationException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.vernier.Vernier.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.vernier.Vernier.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else if (Clazz.exceptionOf (e$$, javax.swing.UnsupportedLookAndFeelException)) {
var ex = e$$;
{
java.util.logging.Logger.getLogger (org.physicslab.mechanics.vernier.Vernier.getName ()).log (java.util.logging.Level.SEVERE, null, ex);
}
} else {
throw e$$;
}
}
 new org.physicslab.mechanics.vernier.Vernier ();
}, "~A");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
if (e.getSource () === this.btngetAnswer) {
if (this.txtAnswer.getValue () == null) {
javax.swing.JOptionPane.showMessageDialog (this, "You are supposed to write answer first in the Text Box", "Vernier Calliper Simulator", 0);
return;
}var n = this.txtAnswer.getValue ();
if (n.doubleValue () == this.vernierPanel.getCorrectedReading ()) {
javax.swing.JOptionPane.showMessageDialog (this, "Congratulation! your answer is correct", "Vernier Calliper Simulator", 1);
} else {
javax.swing.JOptionPane.showMessageDialog (this, "OOPS! your answer is wrong, try again or see hint", "Vernier Calliper Simulator", 1);
}} else if (e.getSource () === this.chkDisplayInfo) {
this.vernierPanel.displayInfo = !this.vernierPanel.displayInfo;
System.out.println (this.vernierPanel.displayInfo);
this.vernierPanel.repaint ();
} else if (e.getSource () === this.chkZerroError) {
System.out.println ("ZeroError Enabled=" + this.chkZerroError.isSelected ());
if (this.chkZerroError.isSelected ()) {
this.zeroerror = this.zeroErrorSlider.getValue ();
this.vernierPanel.setZeroerror (this.zeroerror);
} else this.vernierPanel.setZeroerror (0);
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
if (e.getSource () === this.zeroErrorSlider) {
this.chkZerroError.setText ("ZeroError = " + String.format ("%.1f", [Double.$valueOf (this.zeroErrorSlider.getValue () / 10.0)]) + " mm");
this.zeroerror = this.zeroErrorSlider.getValue ();
if (this.chkZerroError.isSelected ()) this.vernierPanel.setZeroerror (this.zeroerror);
}}, "javax.swing.event.ChangeEvent");
});
