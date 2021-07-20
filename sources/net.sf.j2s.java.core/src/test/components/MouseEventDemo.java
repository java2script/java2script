/*
 * Jalview - A Sequence Alignment Editor and Viewer ($$Version-Rel$$)
 * Copyright (C) $$Year-Rel$$ The Jalview Authors
 * 
 * This file is part of Jalview.
 * 
 * Jalview is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *  
 * Jalview is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty 
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Jalview.  If not, see <http://www.gnu.org/licenses/>.
 * The Jalview Authors are detailed in the 'AUTHORS' file.
 */
package test.components;

import java.awt.AWTEvent;

/*
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
* MouseEventDemo.java
*/

import java.awt.Color;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.KeyboardFocusManager;
import java.awt.Toolkit;
import java.awt.event.AWTEventListener;
import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.AbstractAction;
import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.KeyStroke;
import javax.swing.SwingUtilities;




/**
 * Sourced from Oracle and adapted
 * 
 * @see https
 *      ://docs.oracle.com/javase/tutorial/uiswing/events/mouselistener.html
 */
public class MouseEventDemo extends JPanel implements MouseListener {

	// both rootpane and contentpane focusable --> rootpane gets the keystrokes and focus
	
	// default: rootpane and contentpane are focusable
	// but they must be given a direct setFocusable(true) or getInputMap() anyway to activate key listening
	// they do not just do that with a key listener
	
	private static void logClass(String name) {
		ConsoleHandler consoleHandler = new ConsoleHandler();
		consoleHandler.setLevel(Level.ALL);
		Logger logger = Logger.getLogger(name);
		logger.setLevel(Level.ALL);
		logger.addHandler(consoleHandler);
	}

	private static boolean allowLogging = true;
	private static boolean allowEventInfo = true;

	private void setLogging() {
		if ((/** @j2sNative false && */
		allowLogging)) {

			Logger rootLogger = Logger.getLogger("");
			rootLogger.setLevel(Level.ALL);
			logClass("java.awt.EventDispatchThread");
			logClass("java.awt.EventQueue");
			logClass("java.awt.Component");
			logClass("java.awt.focus.Component");
			logClass("java.awt.focus.DefaultKeyboardFocusManager");

		}

	}

	private class BlankArea extends JLabel {
		Dimension minSize = new Dimension(200, 100);

		public BlankArea(Color color) {
			setBackground(color);
			setOpaque(true);
			setBorder(BorderFactory.createLineBorder(Color.black));
		}

		@Override
		public Dimension getMinimumSize() {
			return minSize;
		}

		@Override
		public Dimension getPreferredSize() {
			return minSize;
		}
	}

	static int counter = 0;

	BlankArea blankArea;

	JTextArea textArea;

	static final String NEWLINE = System.getProperty("line.separator");

	public MouseEventDemo() {
		super(new GridLayout(0, 1));

		setPreferredSize(new Dimension(300,300));
		Toolkit.getDefaultToolkit().addAWTEventListener(new AWTEventListener() {

			@Override
			public void eventDispatched(AWTEvent event) {
				System.out.println("AWTEVEnt dispatched " + event);
			}
			
		}, -1);

		setLogging();
		
		textArea = new JTextArea();
//		textArea.setEditable(false);
//		JScrollPane scrollPane = new JScrollPane(textArea);
//		scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
//		scrollPane.setPreferredSize(new Dimension(400, 75));
//
//		
//		blankArea = new BlankArea(Color.YELLOW);
//		JPanel panel = new JPanel() {
//			protected void paintBorder(Graphics g) {
//				System.out.println("MED JPanel painting border " + getBorder());
//				super.paintBorder(g);
//			}
//			public void setBorder(Border b) {
//				super.setBorder(b);
//			}
//		};
//		
//		System.out.println(UIManager.getBorder("Panel.border") + " " + panel.getBorder());
////		panel.setBorder(new BevelBorder(1));
//		panel.add(blankArea);
//		JButton btn = new JButton("clear");
//		btn.setMnemonic('l');
//		btn.addActionListener(new ActionListener() {
//
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				textArea.setText("");
//				log("");
//			}
//			
//		});
//		
//		panel.add(btn);
////		JPanel scrollPane = new JPanel() {
////			protected void paintBorder(Graphics g) {
////				System.out.println("MED.scrollPanePanel painting border " + getBorder());
////				super.paintBorder(g);
////			}
////		};
////		scrollPane.add(j);
//		JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, panel, scrollPane);
//		splitPane.setVisible(true);
//		splitPane.setDividerLocation(0.2d);
//		splitPane.setResizeWeight(0.5d);
//		add(splitPane);
//
//
		// getInputMap enables key events in Swing
		// if not, then the frame gets the event
		
		// in AWT, key events are fired regardless of whether
		// there is a listener or not.
		addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
				System.out.println(e);
				System.out.println(e.getSource());
			}

			@Override
			public void keyPressed(KeyEvent e) {
			}

			@Override
			public void keyReleased(KeyEvent e) {
			}
			
		});
//		blankArea.addMouseListener(this);
//		addMouseListener(this);
//		setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
	}

	void addKeyBinding() {
		addKeyBinding(KeyStroke.getKeyStroke('C'));
		addKeyBinding(KeyStroke.getKeyStroke('c'));
	}

	/**
	 * @param ks
	 */
	void addKeyBinding(final KeyStroke ks) {
		
		getInputMap(JComponent.WHEN_FOCUSED).put(ks, "clear");
		this.getActionMap().put("clear", new AbstractAction() {
			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("CLEAR");
				textArea.setText("");
				log("");
			}
		});
	}

	void logEvent(String eventDescription, MouseEvent e) {
		log("------- " + counter++ + ": " + eventDescription);
		log("e.isPopupTrigger: " + e.isPopupTrigger());
		log("SwingUtilities.isRightMouseButton: " + SwingUtilities.isRightMouseButton(e));
		log("SwingUtilities.isLeftMouseButton: " + SwingUtilities.isLeftMouseButton(e));
		log("e.isControlDown: " + e.isControlDown());
		log("e.isAltDown: " + e.isAltDown());
		log("e.isMetaDown: " + e.isMetaDown());
		log("e.isShiftDown: " + e.isShiftDown());
		log("e.getClickCount: " + e.getClickCount());
	}

	/**
	 * @param msg
	 */
	void log(String msg) {
		textArea.append(msg + NEWLINE);
		textArea.setCaretPosition(textArea.getDocument().getLength());
	}

	@Override
	public void mousePressed(MouseEvent e) {
		logEvent("Mouse pressed", e);
		e.consume();
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		logEvent("Mouse released", e);
		System.out.println(KeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner().getClass().getName());
		e.consume();
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		logEvent("Mouse clicked", e);
		e.consume();
	}

	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		KeyboardFocusManager.setCurrentKeyboardFocusManager(new DefaultKeyboardFocusManager() {
			@Override
			public boolean dispatchEvent(AWTEvent e) {
				if (allowEventInfo && e.getID() != MouseEvent.MOUSE_MOVED) {
					if (e.getID() == MouseEvent.MOUSE_PRESSED) { //
						System.out.println("FocusMan mousepreseed event");
					}
					System.out.println(
							"FocusMan dispatching activeElement=" + (/** @j2sNative document.activeElement.id || */
					getFocusOwner()));
					System.out.println("FocusMan dispatching event Source " + e.getSource());
					System.out.println("FocusMan dispatching event " + e);
				}
				return super.dispatchEvent(e);
			}
		});
		// Schedule a job for the event dispatch thread:
		// creating and showing this application's GUI.
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				createAndShowGUI();
			}
		});
	}

	/**
	 * Create the GUI and show it. For thread safety, this method should be invoked
	 * from the event dispatch thread.
	 */
	private static void createAndShowGUI() {
		// Create and set up the window.

		
		JFrame frame0 = new JFrame("Second Frame") {
		};
		frame0.setSize(new Dimension(300,300));
		frame0.setVisible(true);
		
		JFrame frame = new JFrame("MouseEventDemo (C to clear)") {
		};
		frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

		
		// Create and set up the content pane.
		MouseEventDemo newContentPane = new MouseEventDemo();
		newContentPane.setOpaque(true); // content panes must be opaque
		frame.setContentPane(newContentPane);

		frame.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("MED.frame focus gained from " + e.getOppositeComponent());
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("MED.frame focus lost to " + e.getOppositeComponent());
			}

		});

		frame.addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
				System.out.println("frame " + e);
				System.out.println("frame " + e.getSource());
			}

			@Override
			public void keyPressed(KeyEvent e) {
			}

			@Override
			public void keyReleased(KeyEvent e) {
				// TODO Auto-generated method stub
				
			}

		});
		
		frame.getRootPane().addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("MEDroot focus gained from " + e.getOppositeComponent());
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("MEDroot focus lost to " + e.getOppositeComponent());
			}

		});

		frame.getRootPane().addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
				System.out.println("root " + e);
				System.out.println("root " + e.getSource());
			}

			@Override
			public void keyPressed(KeyEvent e) {
			}

			@Override
			public void keyReleased(KeyEvent e) {
				// TODO Auto-generated method stub

			}

		});

		// Display the window.
		frame.pack();
		frame.setVisible(true);

// contentPane keyListener fires:
//		
//		newContentPane.addKeyBinding();

// or		

//		newContentPane.setFocusable(true);

// note that key bindings are processed AFTER key listeners
// so e.consume() in keyTyped() will disable the key binding

// firing only in root pane:		
		// frame.getRootPane().setFocusable(true);

// no firing
		frame.setFocusable(false);

// firing in frame only		
		// no additional code necessary

		

	}

}
