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

package test.components;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.List;
import java.awt.Panel;
import java.awt.TextField;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.peer.ListPeer;


/* ListDemo.java requires no other files. */
public class ListDemoAWT extends Panel {
	private List list;

	private static final String hireString = "Hire";
	private static final String fireString = "Fire";
	private Button fireButton;
	private TextField employeeName;

	public ListDemoAWT() {
		super(new BorderLayout());

		String[] names = new String[] {"Jane Doe", "John Smith", 
				"Kathy Green", "Rose Red", "Nearly Black", "Pearly White" };
		// Create the list and put it in a scroll pane.
		list = new List(5);
		for (int i = 0; i < names.length; i++)
			list.add(names[i]);
//		list.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		list.select(0);
//		list.addListSelectionListener(this);
//		list.setVisibleRowCount(5);
		
//		Component c = list.getCellRenderer().getListCellRendererComponent(list, "Jane Doe", 0, true, false);
//		System.out.println(c.getFont() + " " + c.getFontMetrics(c.getFont()));
//		System.out.println(c.getPreferredSize());
		
//		JScrollPane listScrollPane = new JScrollPane(list);

		Button hireButton = new Button(hireString);
		HireListener hireListener = new HireListener(hireButton);
		hireButton.setActionCommand(hireString);
		hireButton.addActionListener(hireListener);
		hireButton.setEnabled(true);

		Button gotoButton = new Button("Blanco White");
		gotoButton.setPreferredSize(new Dimension(130, 20));
		gotoButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				list.setSelectedValue(gotoButton.getText(), true);
				gotoButton.setText(gotoButton.getText() == "Blanco White" ? "Jane Doe" : "Blanco White");
			}
			
		});


		fireButton = new Button(fireString);
		fireButton.setActionCommand(fireString);
		fireButton.addActionListener(new FireListener());

		employeeName = new TextField(10);
//		employeeName.addActionListener(hireListener);
//		employeeName.getDocument().addDocumentListener(hireListener);

		// Create a panel that uses BoxLayout.
		Panel buttonPane = new Panel();
//		buttonPane.setLayout(new BoxLayout(buttonPane, BoxLayout.LINE_AXIS));
		buttonPane.add(fireButton);
//		buttonPane.add(Box.createHorizontalStrut(5));
//		buttonPane.add(new JSeparator(SwingConstants.VERTICAL));
//		buttonPane.add(Box.createHorizontalStrut(5));
		buttonPane.add(employeeName);
		buttonPane.add(hireButton);
		buttonPane.add(gotoButton);
//		buttonPane.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));

		add(list, BorderLayout.CENTER);
		add(buttonPane, BorderLayout.PAGE_END);
	}

	class FireListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			// This method can be called only if
			// there's a valid selection
			// so go ahead and remove whatever's selected.
			int index = list.getSelectedIndex();
			list.remove(index);

			
			int size = list.getItemCount();

			if (size == 0) { // Nobody's left, disable firing.
				fireButton.setEnabled(false);

			} else { // Select an index.
				if (index == list.getItemCount()) {
					// removed item in last position
					index--;
				}

				list.select(index);
				list.makeVisible(index);
			}
		}
	}

	// This listener is shared by the text field and the hire button.
	class HireListener implements ActionListener {//, DocumentListener {
		private boolean alreadyEnabled = false;
		private Button button;

		public HireListener(Button button) {
			this.button = button;
		}

		// Required by ActionListener.
		public void actionPerformed(ActionEvent e) {
			String name = employeeName.getText();

			// User didn't type in a unique name...
			if (name.equals("") || alreadyInList(name)) {
				Toolkit.getDefaultToolkit().beep();
				employeeName.requestFocusInWindow();
				employeeName.selectAll();
				return;
			}

			int index = list.getSelectedIndex(); // get selected index
			if (index == -1) { // no selection, so insert at beginning
				index = 0;
			} else { // add after the selected item
				index++;
			}

			list.add(employeeName.getText(), index);
			// If we just wanted to add to the end, we'd do this:
			// listModel.addElement(employeeName.getText());

			// Reset the text field.
			employeeName.requestFocusInWindow();
			employeeName.setText("");

			// Select the new item and make it visible.
			list.select(index);
			list.makeVisible(index);
		}

		// This method tests for string equality. You could certainly
		// get more sophisticated about the algorithm. For example,
		// you might want to ignore white space and capitalization.
		protected boolean alreadyInList(String name) {
			String[] data = list.getItems();
			for (int i = 0; i < data.length; i++)
				if (data[i].equals(name))
					return true;
			return false;
		}
//
//		// Required by DocumentListener.
//		public void insertUpdate(DocumentEvent e) {
//			enableButton();
//		}
//
//		// Required by DocumentListener.
//		public void removeUpdate(DocumentEvent e) {
//			handleEmptyTextField(e);
//		}
//
//		// Required by DocumentListener.
//		public void changedUpdate(DocumentEvent e) {
//			if (!handleEmptyTextField(e)) {
//				enableButton();
//			}
//		}
//
		private void enableButton() {
			if (!alreadyEnabled) {
				button.setEnabled(true);
			}
		}

//		private boolean handleEmptyTextField(DocumentEvent e) {
//			if (e.getDocument().getLength() <= 0) {
//				button.setEnabled(false);
//				alreadyEnabled = false;
//				return true;
//			}
//			return false;
//		}
	}

//	// This method is required by ListSelectionListener.
//	public void valueChanged(ListSelectionEvent e) {
//		if (e.getValueIsAdjusting() == false) {
//
//			if (list.getSelectedIndex() == -1) {
//				// No selection, disable fire button.
//				fireButton.setEnabled(false);
//
//			} else {
//				// Selection, enable the fire button.
//				fireButton.setEnabled(true);
//			}
//		}
//	}
//
	/**
	 * Create the GUI and show it. For thread safety, this method should be invoked
	 * from the event-dispatching thread.
	 */
	private static void createAndShowGUI() {
		// Create and set up the window.
		Frame frame = new Frame("ListDemo");
		//frame.setDefaultCloseOperation(Frame.EXIT_ON_CLOSE);

		// Create and set up the content pane.
		ListDemoAWT demo = new ListDemoAWT();
//		newContentPane.setOpaque(true); // content panes must be opaque
		frame.add(demo);
		demo.checkPeer();
		// Display the window.
		frame.pack();
		frame.setVisible(true);
		demo.checkPeer();
		
	}

	private void checkPeer() {
		ListPeer peer = (ListPeer) list.getPeer();
		System.out.println(peer);
		if (peer == null)
			return;
		System.out.println("pref = " + peer.getPreferredSize(5));
		System.out.println("min = " + peer.getMinimumSize(5));
	}

	public static void main(String[] args) {
		// Schedule a job for the event-dispatching thread:
		// creating and showing this application's GUI.
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				createAndShowGUI();
			}
		});
	}
}
