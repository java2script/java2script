package edu.uah.sdspage;
// Source File Name:   ProteinData.java

import java.awt.Color;
import java.awt.GridLayout;
import a2s.Label;
import a2s.Panel;
import a2s.TextField;

public class ProteinData extends Panel
{

    public void displayData(Protein protein)
    {
        name.setText(protein.name);
        fullName.setText(protein.fullName);
        abbr.setText(protein.abbr);
        mw = String.valueOf(protein.mw);
        molwt.setText(mw);
        double d = Math.log(protein.mw) / Math.log(10D);
        logMolWt.setText(String.valueOf(d));
    }

    ProteinData(Electrophoresis electrophoresis)
    {        parent = electrophoresis;
}
    
    ProteinData set() {
        mw = "0";
        titlePanel = new Panel();
        namePanel = new Panel();
        fullNamePanel = new Panel();
        abbrPanel = new Panel();
        molWtPanel = new Panel();
        logMolWtPanel = new Panel();
        setLayout(new GridLayout(6, 1));
        titlePanel.setBackground(Color.lightGray);
        namePanel.setBackground(Color.lightGray);
        fullNamePanel.setBackground(Color.lightGray);
        abbrPanel.setBackground(Color.lightGray);
        molWtPanel.setBackground(Color.lightGray);
        logMolWtPanel.setBackground(Color.lightGray);
        titlePanel.add(new Label("DATOS DE PROTEÍNAS"));
        namePanel.add(new Label("Identificador"));
        name = new TextField(15);
        namePanel.add(name);
        fullNamePanel.add(new Label("Nombre de la proteína"));
        fullName = new TextField(28);
        fullNamePanel.add(fullName);
        abbrPanel.add(new Label("Abreviatura"));
        abbr = new TextField(10);
        abbrPanel.add(abbr);
        molWtPanel.add(new Label("Masa molecular"));
        molwt = new TextField(10);
        molWtPanel.add(molwt);
        logMolWtPanel.add(new Label("log (Mr)"));
        logMolWt = new TextField(10);
        logMolWtPanel.add(logMolWt);
        name.setEditable(false);
        fullName.setEditable(false);
        abbr.setEditable(false);
        molwt.setEditable(false);
        logMolWt.setEditable(false);
        add(titlePanel);
        add(namePanel);
        add(fullNamePanel);
        add(abbrPanel);
        add(molWtPanel);
        add(logMolWtPanel);
		return this;
    }

    Electrophoresis parent;
    String mw;
    TextField name;
    TextField fullName;
    TextField abbr;
    TextField molwt;
    TextField logMolWt;
    Panel titlePanel;
    Panel namePanel;
    Panel fullNamePanel;
    Panel abbrPanel;
    Panel molWtPanel;
    Panel logMolWtPanel;
}