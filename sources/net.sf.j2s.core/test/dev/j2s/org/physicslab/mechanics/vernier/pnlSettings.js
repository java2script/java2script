Clazz.declarePackage ("org.physicslab.mechanics.vernier");
Clazz.load (["javax.swing.JPanel"], "org.physicslab.mechanics.vernier.pnlSettings", ["java.text.DecimalFormat", "javax.swing.GroupLayout", "$.JButton", "$.JCheckBox", "$.JFormattedTextField", "$.JLabel", "$.LayoutStyle", "javax.swing.text.DefaultFormatterFactory", "$.NumberFormatter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chkDisplayInfo = null;
this.jButton1 = null;
this.lblQuestion = null;
this.txtAnswer = null;
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.vernier, "pnlSettings", javax.swing.JPanel);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.physicslab.mechanics.vernier.pnlSettings, []);
this.initComponents ();
});
Clazz.defineMethod (c$, "initComponents", 
 function () {
this.lblQuestion =  new javax.swing.JLabel ();
this.chkDisplayInfo =  new javax.swing.JCheckBox ();
this.jButton1 =  new javax.swing.JButton ();
this.txtAnswer =  new javax.swing.JFormattedTextField ();
this.lblQuestion.setText ("What is the reading of scale in current position (in mm)?");
this.chkDisplayInfo.setText ("Display Readings");
this.jButton1.setText ("Check Answer");
this.txtAnswer.setFormatterFactory ( new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.NumberFormatter ( new java.text.DecimalFormat ("#0.0"))));
var layout =  new javax.swing.GroupLayout (this);
this.setLayout (layout);
layout.setHorizontalGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addContainerGap ().addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addComponent (this.lblQuestion).addComponent (this.chkDisplayInfo).addComponent (this.txtAnswer, -1, 393, 32767)).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent (this.jButton1).addContainerGap ()));
layout.setVerticalGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.LEADING).addGroup (layout.createSequentialGroup ().addContainerGap ().addComponent (this.lblQuestion).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup (layout.createParallelGroup (javax.swing.GroupLayout.Alignment.BASELINE).addComponent (this.jButton1).addComponent (this.txtAnswer, -2, -1, -2)).addPreferredGap (javax.swing.LayoutStyle.ComponentPlacement.UNRELATED).addComponent (this.chkDisplayInfo).addContainerGap (-1, 32767)));
});
});
