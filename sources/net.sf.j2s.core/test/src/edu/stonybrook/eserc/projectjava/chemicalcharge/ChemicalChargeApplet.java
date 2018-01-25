package edu.stonybrook.eserc.projectjava.chemicalcharge;
/****************************************************************/

/* ChemicalChargeApplet.java                               */
/* Add cations and anions together, and view   */ 
/* their overall net ionic charge.                            */
/* Janet L. Kaczmarek                                              */
/* June, 2000                                                              */
/***************************************************************/

//web_Ready
//web_AppletName= Chemical Charge
//web_Description= Combine charges to create a proper chemical formula
//web_JavaVersion= http://www.eserc.stonybrook.edu/ProjectJava/ChemicalChargeApplet/ChemicalChargeApplet.html
//web_AppletImage= chemicalcharge.png
//web_Category= Chemistry
//web_Info= width:550,height:300
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features= graphics, 


import java.awt.Color;
import java.awt.Container;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JTextField;
public class ChemicalChargeApplet extends JApplet
                     implements ActionListener {

public ChemicalFormulaField chemicalFormulaField;
public StandardCationField standardCationField;
public StandardAnionField standardAnionField;

  // Containers
  Container cp;

//  JComboBox
  JComboBox cationComboBox;
  JComboBox anionComboBox;

  // JTextFields
  JTextField cationNameField;
  JTextField anionNameField;
  
  // JButtons
  JButton addCationButton;
  JButton subtractCationButton;
  JButton addAnionButton;
  JButton subtractAnionButton;
  JButton initializeIonsButton;

  // JLabels
  JLabel cationLabel;
  JLabel anionLabel;
  JLabel elementLabel;
  JLabel standardIonLabel;
  JLabel ionicFormulaLabel;

//strings
  String name [];
  String symbol [];
  String ionicFormula;

//doubles
   double drc;
   double dra;

// ints
  int charge [];
  int cationCount;
  int cationTotalCharge;
  int anionCount;
  int anionTotalCharge;
  int netCharge;
  int irc;
  int ira;
  int cl;
  int al;
//ions

    Ion cation [] = {
	new Ion ("Hydrogen", "H", 1 ),
	new Ion ("Lithium", "Li",1),
	new Ion ("Beryllium", "Be", 2),
	new Ion ("Sodium", "Na", 1 ),
	new Ion ("Magnesium", "Mg", 2 ),
	new Ion ("Aluminum", "Al", 3),
	new Ion ("Silicon", "Si", 4),
   	new Ion ("Potassium", "K", 1),
	new Ion ("Calcium","Ca", 2),
	new Ion ("Manganese", "Mn", 2),
        new Ion ("Iron (II)", "Fe", 2),
        new Ion ("Iron (III)", "Fe", 3),
        new Ion ("Copper (I)", "Cu", 1),
        new Ion ("Copper (II)", "Cu", 2),
        new Ion ("Zinc", "Zn", 2),
        new Ion ("Rubidium", "Rb", 1),
        new Ion ("Strontium", "Sr", 2),
	new Ion ("Lead (II)", "Pb", 2),
        new Ion ("Lead (IV)", "Pb", 4),
	new Ion ("Ammonium", "(NH4)", 1)
     };

    Ion anion [] = {
 	new Ion ("Nitride", "N", -3),
	new Ion ("Oxide", "O", -2),
	new Ion ("Fluoride", "F", -1 ),
	new Ion ("Sulfide", "S", -2 ),
	new Ion ("Chloride", "Cl", -1),
	new Ion ("Bromide", "Br", -1),
	new Ion ("Iodide", "I", -1),
	new Ion ("Nitrate", "(NO3)", -1),
        new Ion ("Nitrite", "(NO2)",-2),
	new Ion ("Phosphate", "(PO4)", -3),
	new Ion ("Cyanide", "(CN)", -1),
	new Ion ("Sulfate","(SO4)", -2),
	new Ion ("Hydroxide","(OH)", -1),
	new Ion ("Carbonate", "(CO3)", -2)
     };

 public void init() {
	 
	 setSize(550, 300);
	 

// set up user interface
    cp = getContentPane();
    GridBagLayout gbl = new GridBagLayout();
    GridBagConstraints gbc = new GridBagConstraints();
    cp.setLayout(gbl);



// create comboBoxes by calling its constructor and input all items of each array into corresponding box.
  
    cationComboBox = new JComboBox (cation);
    buildConstraints (gbc, 2, 1, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(cationComboBox, gbc);
    cationComboBox.addActionListener(this);
    cationComboBox.setEditable (false);
    cationComboBox.setBackground (Color.white);
    cp.add(cationComboBox);

    anionComboBox = new JComboBox (anion);
    buildConstraints (gbc, 3, 1, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(anionComboBox, gbc);
    anionComboBox.addActionListener(this);
    anionComboBox.setEditable (false);
    anionComboBox.setBackground (Color.white);
    cp.add(anionComboBox);


// create and add components

//call constructor for this component
    chemicalFormulaField = new ChemicalFormulaField ();
    buildConstraints (gbc, 2, 4, 3, 2, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(chemicalFormulaField, gbc);
    chemicalFormulaField.setForeground (Color.blue);
    cp.add(chemicalFormulaField);

    standardCationField = new StandardCationField ();
    buildConstraints (gbc, 2, 2, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(standardCationField, gbc);
    standardCationField.setForeground (Color.blue);
    cp.add(standardCationField);

    standardAnionField = new StandardAnionField ();
    buildConstraints (gbc, 3, 2, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(standardAnionField, gbc);
    standardAnionField.setForeground (Color.blue);
    cp.add(standardAnionField);

// LABELS /////////

    cationLabel = new JLabel("CATION:");
    cationLabel.setFont(new Font("Times New Roman", Font.BOLD, 14));
    cationLabel.setForeground(Color.red);
    buildConstraints(gbc, 2, 0, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(cationLabel, gbc);
    cp.add(cationLabel);

    anionLabel = new JLabel("ANION:");
    anionLabel.setFont(new Font("Times New Roman", Font.BOLD, 14));
    anionLabel.setForeground(Color.red);
    buildConstraints(gbc, 3, 0, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(anionLabel, gbc);
    cp.add(anionLabel);

    elementLabel = new JLabel("SPECIES:");
    elementLabel.setFont(new Font("Times New Roman", Font.BOLD, 14));
    elementLabel.setForeground(Color.red);
    buildConstraints(gbc, 1, 1, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(elementLabel, gbc);
    cp.add(elementLabel);

    standardIonLabel = new JLabel("SYMBOL:");
    standardIonLabel.setFont(new Font("Times New Roman", Font.BOLD, 14));
    standardIonLabel.setForeground(Color.red);
    buildConstraints(gbc, 1, 2, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(standardIonLabel, gbc);
    cp.add(standardIonLabel);

// SwingJS removed - not clear why this does not show up in Java. Background issue? (BH)
    
//    ionicFormulaLabel = new JLabel("IONIC FORMULA:");
//    ionicFormulaLabel.setFont(new Font("Times New Roman", Font.BOLD, 14));
//    ionicFormulaLabel.setForeground(Color.red);
//    buildConstraints(gbc, 2, 4, 2, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
//    gbl.setConstraints(ionicFormulaLabel, gbc);
//    cp.add(ionicFormulaLabel);

 
 ////  BUTTONS    /////////////////////    

    addCationButton = new JButton("Add CATION");
    addCationButton.setBackground(Color.yellow);
    addCationButton.addActionListener(this);
    buildConstraints(gbc, 2, 12, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(addCationButton, gbc);
    cp.add(addCationButton);

    subtractCationButton= new JButton("Subtract CATION");
    subtractCationButton.setBackground(Color.yellow);
    subtractCationButton.addActionListener(this);
    buildConstraints(gbc, 2, 13, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(subtractCationButton, gbc);
    cp.add(subtractCationButton);

    addAnionButton = new JButton("Add ANION");
    addAnionButton.setBackground(Color.yellow);
    addAnionButton.addActionListener(this);
    buildConstraints(gbc, 3, 12, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(addAnionButton, gbc);
    cp.add(addAnionButton);

    subtractAnionButton = new JButton("Subtract ANION");
    subtractAnionButton.setBackground(Color.yellow);
    subtractAnionButton.addActionListener(this);
    buildConstraints(gbc, 3, 13, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints(subtractAnionButton, gbc);
    cp.add(subtractAnionButton);

    initializeIonsButton = new JButton ("RANDOMIZE IONS");
    initializeIonsButton.setBackground(Color.red);
    initializeIonsButton.addActionListener(this);
    buildConstraints (gbc, 5, 1, 1, 1, 800, 800, GridBagConstraints.NONE, GridBagConstraints.CENTER);
    gbl.setConstraints( initializeIonsButton, gbc);
    cp.add(initializeIonsButton);

   
 //call initialize Ions Method  
    initializeIons ();
   cationComboBox.setSelectedItem (cation [irc]);
   anionComboBox.setSelectedItem (anion [ira]);

    // call the setFormula method in the class chemicalFormulaField.  This will assign values into its constructor
    // so as not to get a null pointer exception
    chemicalFormulaField.setFormula(cation[irc].getSymbol(), cationCount, cationTotalCharge, anion[ira].getSymbol(), anionCount, anionTotalCharge, netCharge);  

} // END of INIT

//method will return an int random number between 0 and n
private int pickRandom (int n) {
     double i;
     int rn;
     i = Math.random();  //generates a random number b/w 0 and 1 not including 1
     rn = (int) Math.floor( n * i);
     return rn;
}

// method  when called will initialize to a new cation and anion
private void initializeIons () {

    //get the length of the cation and anion array
     cl = cation.length;
     al = anion.length;
     irc = pickRandom (cl);
     ira = pickRandom (al);
   
    //initialize variables
    cationCount = 0;
    anionCount = 0;
    cationTotalCharge = 0;
    anionTotalCharge = 0;
    netCharge = 0;
    
    //set the text in the element's name field to a new cation and anion, and 
    // get the symbol and charge that will be assigned to the .setStandardCation .setStandardAnion methods.
   
    standardCationField.setStandardCation(cation[irc].getSymbol(), cation[irc].getCharge());
    standardAnionField.setStandardAnion(anion[ira].getSymbol(), anion[ira].getCharge()); 

   }

  public void actionPerformed(ActionEvent ae) {
  // respond to mouse clicks on the buttons
    Object source;
    source = ae.getSource();

  // determine the button and perform the addition or subtraction to the counts and charges

    if (source == addCationButton) {       //cation count can not go higher than 10 ions.
        if (cationCount<10)
        cationCount = cationCount + 1;
      }
    else if (source == subtractCationButton) {      //cation count can not go lower than 0 ions.
        if (cationCount > 0 )
           cationCount = cationCount - 1;
     }
      
    else if (source == addAnionButton) {      //anion count can not go higher than 10 ions.
      if (anionCount<10)
      anionCount = anionCount + 1;
      }
    else if (source == subtractAnionButton){      //anion count can not go lower than 0 ions.
       if (anionCount > 0)
            anionCount = anionCount - 1;
     }

    else if (source == cationComboBox)  {  
        cationComboBox.getSelectedItem ();
          //initialize variables
            cationCount = 0;
            anionCount = 0;
           cationTotalCharge = 0;
           anionTotalCharge = 0;
           netCharge = 0;
          irc = cationComboBox.getSelectedIndex();
          standardCationField.setStandardCation(cation[irc].getSymbol(), cation[irc].getCharge());
   

    
      // get the symbol and charge that will be assigned to the .setStandardCation .setStandardAnion methods.
          standardCationField.setStandardCation(cation[irc].getSymbol(), cation[irc].getCharge());
       chemicalFormulaField.setFormula(cation[irc].getSymbol(), cationCount, cationTotalCharge, anion[ira].getSymbol(), anionCount, anionTotalCharge, netCharge);    
  }

   else if (source == anionComboBox)  {
         anionComboBox.getSelectedItem ();
            //initialize variables
             cationCount = 0;
             anionCount = 0;
            cationTotalCharge = 0;
            anionTotalCharge = 0;
            netCharge = 0;
            ira = anionComboBox.getSelectedIndex();
            standardAnionField.setStandardAnion(anion[ira].getSymbol(), anion[ira].getCharge()); 

       // get the symbol and charge that will be assigned to the .setStandardCation .setStandardAnion methods.
        standardAnionField.setStandardAnion(anion[ira].getSymbol(), anion[ira].getCharge());
        chemicalFormulaField.setFormula(cation[irc].getSymbol(), cationCount, cationTotalCharge, anion[ira].getSymbol(), anionCount, anionTotalCharge, netCharge); 
 }


     // call the initializeIons method if this button is pressed
      else if (source == initializeIonsButton) {
	initializeIons ();
                   cationComboBox.setSelectedItem (cation [irc]);
                   anionComboBox.setSelectedItem (anion [ira]);
 }
     // recalculate the variables depending on the count and the cation and anion selected
     cationTotalCharge = cationCount * cation[irc].getCharge();
     anionTotalCharge = anionCount * anion[ira].getCharge();
     netCharge = cationTotalCharge + anionTotalCharge;

    // show the results of the (button clicks) addition or subtraction in the corresponding fields
   
     chemicalFormulaField.setFormula(cation[irc].getSymbol(), cationCount, cationTotalCharge, anion[ira].getSymbol(), anionCount, anionTotalCharge, netCharge); 
   
 }  //close Action Performed Method

  void buildConstraints(GridBagConstraints gbc, int gx, int gy,
    int gw, int gh, int wx, int wy, int fill, int anchor) {
  // build the constraints for the GridBagLayout
    gbc.gridx = gx;
    gbc.gridy = gy;
    gbc.gridwidth = gw;
    gbc.gridheight = gh;
    gbc.weightx = wx;
    gbc.weighty = wy;
    gbc.fill = fill;
    gbc.anchor = anchor;
  }

}
