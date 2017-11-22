package com.falstad.circuit;

import java.awt.Dimension;
import java.awt.Event;
import java.awt.Point;
import java.awt.event.*;

import a2s.Button;
import a2s.Dialog;
import a2s.TextArea;



class ImportDialog extends Dialog implements ActionListener {
    CirSim cframe;
    Button importButton, closeButton;
    TextArea text;
    boolean isURL;
	
    ImportDialog(CirSim f, String str, boolean url) {
	super(f, (str.length() > 0) ? "Export" : "Import", false);
	isURL = url;
	cframe = f;
	setLayout(new ImportDialogLayout());
	add(text = new TextArea(str, 10, 60));
	importButton = new Button("Import");
	if (!isURL)
	    add(importButton);
	importButton.addActionListener(this);
	add(closeButton = new Button("Close"));
	closeButton.addActionListener(this);
	Point x = cframe.main.getLocationOnScreen();
	resize(400, 300);
	Dimension d = getSize();
	setLocation(x.x + (cframe.winSize.width-d.width)/2,
		    x.y + (cframe.winSize.height-d.height)/2);
	show();
	if (str.length() > 0)
	    text.selectAll();
    }

    public void actionPerformed(ActionEvent e) {
	int i;
	Object src = e.getSource();
	if (src == importButton) {
	    cframe.readSetup(text.getText());
	    setVisible(false);
	}
	if (src == closeButton)
	    setVisible(false);
    }
	
    public boolean handleEvent(Event ev) {
	if (ev.id == Event.WINDOW_DESTROY) {
	    cframe.main.requestFocus();
	    setVisible(false);
	    cframe.impDialog = null;
	    return true;
	}
	return super.handleEvent(ev);
    }
}
    
