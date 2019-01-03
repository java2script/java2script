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

import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.SwingUtilities;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.text.JTextComponent;

public class TextListener implements MouseListener, MouseMotionListener, FocusListener, ChangeListener,
		PropertyChangeListener, DocumentListener, CaretListener {

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
			((JSComponentUI) txtComp.getUI()).propertyChangedFromListener(prop);
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

	@Override
	public void mouseMoved(MouseEvent e) {
	}

	@Override
	public void mouseDragged(MouseEvent e) {
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		//System.out.println("textlistener mouseclicked");
	}

	@Override
	public void mousePressed(MouseEvent e) {
		if (SwingUtilities.isLeftMouseButton(e)) {
			JTextComponent txtComp = (JTextComponent) e.getSource();
			if (!txtComp.contains(e.getX(), e.getY()))
				return;
			if (!txtComp.hasFocus() && txtComp.isRequestFocusEnabled()) {
				txtComp.requestFocus();
				ui.requestFocus(null,  false,  false,  0,  null);
			}
		}
//		Object je = (/** @j2sNative e.bdata.jqevent || */ null);
//		ui.handleJSEvent(e.getSource(), e.getID(), je);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
//		Object je = (/** @j2sNative e.bdata.jqevent || */ null);
//		ui.handleJSEvent(e.getSource(), e.getID(), je);
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	private boolean selecting;

	private boolean working;

	/**
	 * Called by JSTextUI.handleJSEvent
	 * 
	 * @param ui
	 * @param eventType
	 * @param jQueryEvent
	 * @return false to indicate "handled and so don't pass on to window"
	 */
	boolean handleJSTextEvent(JSTextUI ui, int eventType, Object jQueryEvent) {
		int dot = 0, mark = 0;
		String evType = null, id = null;
		boolean isEditable = ui.editor.isEditable();

		// JSEditorPaneUI will not indicate the target
		/**
		 * @j2sNative
		 * 
		 * 			var s = jQueryEvent.target || jQueryEvent; mark =
		 *            s.selectionStart; dot = s.selectionEnd; evType = jQueryEvent.type;
		 *            id = s.id;
		 * 
		 * 
		 */

		// HTML5 selection is always mark....dot
		// but Java can be Dot....Mark

		int oldDot = ui.editor.getCaret().getDot();
		int oldMark = ui.editor.getCaret().getMark();

		// System.out.println("textlist1 " + evType + " " + eventType + " " + id + "
		// oldDot=" + oldDot + " oldmark=" + oldMark + " dot=" + dot + " mark=" + mark +
		// " " + (dot > mark));

		boolean setCaret = true;
		boolean handledorNot = JSComponentUI.UNHANDLED;
		if (dot != mark && oldMark == dot) {
			dot = mark;
			mark = oldMark;
			// System.out.println("textlist rev " + id + " dot=" + dot + " mark=" + mark);
		}
		switch (eventType) {
		case MouseEvent.MOUSE_WHEEL:
			return JSComponentUI.UNHANDLED;
		case MouseEvent.MOUSE_PRESSED:
			selecting = true;
			setCaret = false;
			break;
		case MouseEvent.MOUSE_RELEASED:
			if (!selecting)
				return JSComponentUI.UNHANDLED; // yield to some drag-drop event?
			selecting = false;
			break;
		case MouseEvent.MOUSE_CLICKED:
			break;
		case KeyEvent.KEY_PRESSED:
		case KeyEvent.KEY_RELEASED:
		case KeyEvent.KEY_TYPED:
			selecting = false;
			int keyCode = /** @j2sNative jQueryEvent.keyCode || */
					0;
			if (keyCode == 13)
				keyCode = KeyEvent.VK_ENTER;
			if (keyCode == KeyEvent.VK_ENTER) {
				if (ui.handleEnter(eventType)) {
					// JTextField
					break;
				}
			}
			if (eventType == KeyEvent.KEY_PRESSED) {
				setCaret = false;
			} else {
				working = true;
				ui.checkEditorTextValue(dot);
				working = false;
			}
			break;
		}
		if (setCaret) {
			if (dot != oldDot || mark != oldMark) {
				ui.editor.getCaret().setDot(mark);
				if (dot != mark)
					ui.editor.getCaret().moveDot(dot);
				ui.editor.caretEvent.fire();
			}
		}
		
//		handledorNot = ui.editor.isEditable();
//
		return handledorNot;
	}

	@Override
	public void insertUpdate(DocumentEvent e) {
		
	//	System.out.println("textlistener insertupdate");
		if (!working)
			ui.setJSTextDelayed();
	}

	@Override
	public void removeUpdate(DocumentEvent e) {
	//	System.out.println("textlistener removeupdate");
		if (!working)
			ui.setJSTextDelayed();
	}

	@Override
	public void changedUpdate(DocumentEvent e) {
	//	System.out.println("textlistener change");
		if (!working)
			ui.setJSTextDelayed();
	}

	@Override
	public void caretUpdate(CaretEvent e) {
		ui.setJSSelection("caret");
	}

}
