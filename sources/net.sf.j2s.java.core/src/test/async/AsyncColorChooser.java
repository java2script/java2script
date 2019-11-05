package test.async;

import java.awt.Color;
import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;

import javax.swing.JColorChooser;
import javax.swing.JFileChooser;
import javax.swing.colorchooser.ColorSelectionModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.filechooser.FileSystemView;
import javax.swing.plaf.UIResource;

/**
 * A simple Asynchronous file chooser for JavaScript; synchronous with Java.
 * 
 * Allows two modes -- using an ActionListener (setAction(ActionListener) or constructor(ActionListener))
 * 
 * @author Bob Hanson
 */

public class AsyncColorChooser implements PropertyChangeListener {

	private ActionListener listener;
	private Color selectedColor;

	public void showDialog(Component component, String title, Color initialColor, ActionListener listener) {
		setListener(listener);
		process(JColorChooser.showDialog(component, title, initialColor));
		unsetListener();
	}

	private void setListener(ActionListener a) {
		listener = a;
		/** @j2sNative Clazz.loadClass("javax.swing.JColorChooser");javax.swing.JColorChooser.listener = this */
	}

	private void unsetListener() {
		/** @j2sNative javax.swing.JColorChooser.listener = null */
	}

	
	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		// JavaScript only
		Color c = (Color) evt.getNewValue();
		
		switch (evt.getPropertyName()) {
		case "SelectedColor":
			process(c);
			break;
		}
	}

	
	private void process(Color c) {
		if (c instanceof UIResource)
			return;
		selectedColor = c;
		listener.actionPerformed(new ActionEvent(this, c == null ? 0 : c.getRGB(), c == null ? null : c.toString()));
	}
	
	public Color getSelectedColor() {
		return selectedColor;
	}


}
