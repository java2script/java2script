package test;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;

import javax.swing.JFrame;
import javax.swing.Timer;

public class Test_Exit extends Test_ {

	public static void main(String[] args) {
		new Test_Exit();
	}

	public Test_Exit() {
		
		// oddly enough, Java runs these hooks in unpredictable order, 
		// but SwingJS will run them sequentially
		
		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {

			@Override
			public void run() {
				System.out.println("OK Test_Exit 1");
			}
			
		}));
		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {

			@Override
			public void run() {
				System.out.println("OK Test_Exit 2");
			}
			
		}));

		Timer t = new Timer(200, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				// System.exit(0) should prevent this from firing
				// but in Java, it depends upon the delay, with about 200 ms required to stop it
				System.out.println("NO! Test_Exit");
				assert(false);
			}
			
		});
		t.setRepeats(false);
		t.start();
		JFrame j = new JFrame("test");
		j.setSize(300,300);
		j.setVisible(true);
		System.exit(0);
	}
	
	static {
		// to allow the frame to pop up briefly
		j2sHeadless = false;
	}
}
