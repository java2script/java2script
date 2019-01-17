/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2006, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package swingjs.plaf;

import java.awt.Point;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.text.JTextComponent;

import swingjs.JSKeyEvent;

public class TextListener implements FocusListener, ChangeListener,
		PropertyChangeListener, DocumentListener {

	private JTextComponent txtComp;

	boolean haveDocument;

	private JSTextUI ui;

	public TextListener(JSTextUI ui, JTextComponent txtComp) {
		this.txtComp = txtComp;
		this.ui = ui;
	}

	void checkDocument() {
		if (!haveDocument && txtComp.getDocument() != null) {
			haveDocument = true;
			txtComp.getDocument().addDocumentListener(this);
		}
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
//		System.out.println("JSTextListener property change: " + prop + " " + e.getSource());
		if ("font" == prop || "foreground" == prop || "preferredSize" == prop) {
			JTextComponent txtComp = (JTextComponent) e.getSource();
			((JSComponentUI) txtComp.getUI()).propertyChangedFromListener(e, prop);
		}
		if ("editable" == prop)
			ui.setEditable(((Boolean) e.getNewValue()).booleanValue());
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		JTextComponent txtComp = (JTextComponent) e.getSource();
		txtComp.repaint();
	}

	@Override
	public void focusGained(FocusEvent e) {
	}

	@Override
	public void focusLost(FocusEvent e) {
	}

	private boolean working;

	/**
	 * Called by JSTextUI.handleJSEvent
	 * 
	 * @param ui
	 * @param eventType
	 * @param jQueryEvent
	 * @return false to indicate "handled and so don't pass on to window"
	 */
	boolean handleJSTextEvent(JSTextUI ui, int eventType, Object jqevent) {
		Point markDot = ui.getNewCaretPosition(null);
		int mark = markDot.x;
		int dot = markDot.y;
		boolean setCaret = (mark != Integer.MIN_VALUE);
		eventType = JSKeyEvent.fixEventType(jqevent, eventType);
		switch (eventType) {
		case KeyEvent.KEY_PRESSED:
			int keyCode = /** @j2sNative jqevent.keyCode || */
					0;
			if (keyCode == 13 || keyCode == KeyEvent.VK_ENTER)
				ui.handleEnter(eventType);
			// fall through
		case KeyEvent.KEY_TYPED:
			setCaret = false;
			break;
		case KeyEvent.KEY_RELEASED:
			working = true;
			if (ui.checkNewEditorTextValue()) {
				if (dot >= 0) {
					//System.out.println("textListener text change");
					ui.setJSMarkAndDot(dot, dot, false);
					setCaret = false;
				}
			}
			working = false;
			break;
		}
		if (setCaret)
			ui.setJavaMarkAndDot(markDot);
		return JSComponentUI.HANDLED;
	}

	@Override
	public void insertUpdate(DocumentEvent e) {
		if (!working)
			ui.setJSTextDelayed();
	}

	@Override
	public void removeUpdate(DocumentEvent e) {
		if (!working)
			ui.setJSTextDelayed();
	}

	@Override
	public void changedUpdate(DocumentEvent e) {
		if (!working)
			ui.setJSTextDelayed();
	}

}
