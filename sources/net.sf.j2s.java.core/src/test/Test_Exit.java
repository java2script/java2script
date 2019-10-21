package test;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.lang.reflect.InvocationTargetException;

import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import javax.swing.Timer;

public class Test_Exit extends Test_ {

	public static void main(String[] args) {
		new Test_Exit();
	}

	public Test_Exit() {
		
		try {
			SwingUtilities.invokeAndWait(new Runnable() {

				@Override
				public void run() {
					System.out.println("OK invokeAndWait");
				}
				
			});
		} catch (InvocationTargetException | InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		ThreadGroup g0 = Thread.currentThread().getThreadGroup();

		// oddly enough, Java runs these hooks in unpredictable order, 
		// but SwingJS will run them sequentially
				
		Thread th = new Thread(new Runnable() {

			@Override
			public void run() {
				System.out.println("OK Test_Exit 1");
			}
			
		});
		
		Runtime.getRuntime().addShutdownHook(th);
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
		System.out.println("docs mention that System.exit(0) does not really exit.");
	}
	
	static {
		/**
		 * To allow the frame to pop up briefly.
		 *
		 * We must do this using j2sNative, because j2sApplet.js
		 * accesses Test_Exit.j2sHeadless directly, not Test_.j2sHeadless.
		 * 
		 * @j2sNative C$.j2sHeadless = false;
		 */
		{
			j2sHeadless = false;
		}
	}
}
