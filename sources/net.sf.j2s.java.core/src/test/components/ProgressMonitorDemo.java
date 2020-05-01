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
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import javajs.async.AsyncSwingWorker;

public class ProgressMonitorDemo extends JPanel implements PropertyChangeListener {

	/**
	 * A demonstration of subclassing javajs.async.AsyncSwingWorker.
	 * 
	 * Executes asynchronous tasks using a SwingWorker. Unlike a standard SwingWorker, 
	 * AsyncSwingWorker may itself not be synchronous. For example, it might load a file asynchronously. 
	 * Whereas a standard SwingWorker would execute done() long before the file was loaded, 
	 * this class will wait until progress has been asynchronously set at or above its maximum value,
	 * or the task is canceled before executing that method. 
	 * 
	 * Note that while SwingWorkers are limited to progress [0,100], AsyncSwingWorker allows arbitrary 
	 * progress [min,max], same as progressMonitor. 
	 * 
	 * @author hansonr
	 *
	 */
	static class AsyncTask extends AsyncSwingWorker {

		AsyncTask(Component owner, String title, int delayMillis, int min, int max) {
			super(owner, title, delayMillis, min, max);
		}

		@Override
		public void initAsync() {
			System.out.println("AsyncTask.initAsync");
		}

		@Override
		public int doInBackgroundAsync(int progress) {
			// this doInBackground is special -- we get to do bits of the 
			// overall process based on our own progress indicator, whatever that is. 
			// in this example, we are just incrementing the progress.
			return progress + (int)((max > min ? 1 : -1) * (1 + Math.random() * 10));
		}

		@Override
		public void doneAsync() {
			System.out.println("AsyncTask.doneAsync");
		}
		
		
		/// optional calls

		@Override
		public String getNote(int progress) {
			return "processing " + progress + "/" + getProgressPercent() + "%";
		}
	}

	
	//// demo implementation ////
	
	private AsyncTask task;
	
	/**
	 * Invoked when task's progress property changes.
	 */
	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		// BH note that these events are filtered by the progress monitor
		// so this is an UNRELIABLE way of knowing the point 
		String msg = evt.getPropertyName() + "=" + evt.getNewValue() + "\n";
		append(msg);
		switch (evt.getPropertyName()) {
		case "progress":
			append(task.getNote() + "\n");
			break;
		case "state":
			switch (evt.getNewValue().toString()) {
			case AsyncSwingWorker.DONE_ASYNC:
				Toolkit.getDefaultToolkit().beep();
				append("Task completed.\n");
				startButton.setEnabled(true);				
				break;
			case AsyncSwingWorker.CANCELED_ASYNC:
				append("Task canceled.\n");
				startButton.setEnabled(true);
				break;
				}
		}
		append(null);
	}

	///// demo GUI /////

	private JButton startButton;
	private JTextArea taskOutput;

	private void append(String line) {
		if (line == null) {
			taskOutput.scrollRectToVisible(new Rectangle(0,Integer.MAX_VALUE	,1,1));
			return;
		}
		taskOutput.append(line);
	}

	public ProgressMonitorDemo() {
		super(new BorderLayout());

		setPreferredSize(new Dimension(600,150));
		// Create the demo's UI.
		startButton = new JButton("Start");
		startButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent evt) {
				startButton.setEnabled(false);
				taskOutput.setText("");
				int delayMillis = 100; // just something for this example; 0 would be fine here.
				task = new AsyncTask(ProgressMonitorDemo.this, "Some task...", delayMillis, 350, 150);
				task.addPropertyChangeListener(ProgressMonitorDemo.this);
				task.execute();
			}

		});

		taskOutput = new JTextArea(5, 20);
		taskOutput.setMargin(new Insets(5, 5, 5, 5));
		taskOutput.setEditable(false);

		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
		p.add(startButton);
		p.setOpaque(false);
		add(p, BorderLayout.NORTH);
		add(new JScrollPane(taskOutput), BorderLayout.CENTER);
		setBorder(BorderFactory.createEmptyBorder(10,10,10,10));

	}

	/**
	 * Create the GUI and show it. For thread safety, this method should be invoked
	 * from the event-dispatching thread.
	 */
	private static void createAndShowGUI() {
		// Create and set up the window.
		JFrame frame = new JFrame("ProgressMonitorDemo");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		// Create and set up the content pane.
		JComponent newContentPane = new ProgressMonitorDemo();
		newContentPane.setOpaque(true); // content panes must be opaque
		newContentPane.setBackground(Color.lightGray);
		frame.setContentPane(newContentPane);

		frame.setLocation(100,100);
		// Display the window.
		frame.pack();
		frame.setVisible(true);
	}

	public static void main(String[] args) {
		// Schedule a job for the event-dispatching thread:
		// creating and showing this application's GUI.
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				createAndShowGUI();
			}
		});
	}
}
