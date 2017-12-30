package test;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

public class Test_Dialog  /* implements JSComponent.AsynchronousDialogCaller */ {

	//  JSCOmponent.DialogCaller interface
	public void onReturn(int value) {
		System.out.println("value is " + value);
	}
	

	public static void main(String[] args) {
		try {			
			final Test_Dialog td = new Test_Dialog();
			JFrame f = new JFrame("testing");
			f.setSize(300, 300);
			JButton b = new JButton("test");
			final JPanel optionPanel = new Test_Dialog_Panel(td);
			optionPanel.setLayout(new BorderLayout());
			optionPanel.add(new JLabel("optionPanel"), BorderLayout.CENTER);
			b.addActionListener(new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					
					td.onReturn(JOptionPane.showConfirmDialog(f, optionPanel, "Testing", JOptionPane.OK_CANCEL_OPTION));
				
				}
				
			});
			f.add(b);
			f.setVisible(true);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	public static class Test_Dialog_Panel extends JPanel /* implements JSComponent.AsynchronousDialogMessage */ {

		private Object dialogCaller; 
		
		/**
		 * required by SwingJS for asynchronous return
		 * 
		 * @return JSComponent.AsynchronousDialogCaller
		 */
		public Object getDialogCaller() { 
			return dialogCaller;
		}

		public Test_Dialog_Panel(Test_Dialog td) {
			super(null);
			dialogCaller = td;
		}
		
		
	}
}

