package test.components;


import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.event.ActionListener;
import java.util.concurrent.TimeUnit;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.ProgressMonitor;
import javax.swing.UIManager;

import javajs.async.AsyncSwingWorker;

public class ProgressMonitorExample {

	  private static ActionListener createStartTaskActionListener(Component parent) {
	      UIManager.put("ProgressMonitor.progressText", "Test Progress");
	      return (actionEvent) -> {
	          new Thread(() -> { 
	    	  
        	  new AsyncSwingWorker(parent, "Test Task", 200, 1, 100) {

        			@Override
        			public void initAsync() {
        			    progressMonitor.setMillisToDecideToPopup(100);
        			    progressMonitor.setMillisToPopup(100);
        			}

        			@Override
        			public int doInBackgroundAsync(int i) {
        				// nothing to do in this demo except increment i
        				return ++i;
        			}

        			@Override
        			public void doneAsync() {
        				// nothing to do when done for this demo (the ProgressManager is closed already)
        			}
        			
        			@Override
        			public String getNote(int progress) {
        				return "Task step: " + progress;
        			}
        		}.execute();
	          }).start();
	      };
	  }


	  
	  
	private static ActionListener createStartTaskActionListenerOrig(Component parent) {
		// for progress monitor dialog title
		UIManager.put("ProgressMonitor.progressText", "Test Progress");
		return (ae) -> {
			// creating ProgressMonitor instance
			ProgressMonitor pm = new ProgressMonitor(parent, "Test Task", "Task starting", 0, 100);

			// decide after 100 millis whether to show popup or not
			pm.setMillisToDecideToPopup(100);
			// after deciding if predicted time is longer than 100 show popup
			pm.setMillisToPopup(100);
			for (int i = 1; i <= 100; i++) {
				// updating ProgressMonitor note
				pm.setNote("Task step: " + i);
				// updating ProgressMonitor progress
				pm.setProgress(i);
				try {
					// delay for task simulation
					TimeUnit.MILLISECONDS.sleep(200);
				} catch (InterruptedException e) {
					System.err.println(e);
				}
			}
			pm.setNote("Task finished");
		};
	}

	
  public static void main(String[] args) {
      JFrame frame = createFrame("ProgressMonitor Example");
      JButton button = new JButton("start task");
      button.addActionListener(createStartTaskActionListener(frame));
      frame.add(button, BorderLayout.NORTH);
      frame.setVisible(true);
  }

 public static JFrame createFrame(String title) {
      JFrame frame = new JFrame(title);
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setSize(new Dimension(800, 700));
      return frame;
  }
}