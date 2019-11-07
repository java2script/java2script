package test.async;

import java.awt.Component;
import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.Icon;
import javax.swing.JOptionPane;
import javax.swing.plaf.UIResource;

/**
 * A class to manage asynchronous aspects of SwingJS
 * 
 * @author Bob Hanson hansonr_at_stolaf.edu
 *
 */
public class Async {

	public static boolean isJS() {
		return  (/** @j2sNative 1 ? true : */false);
	}

	/**
	 * No sleep in JavaScript
	 * @param ms
	 */
	public static void javaSleep(int ms) {
		if (!isJS()) {
			try {
				Thread.sleep(ms);
			} catch (InterruptedException e) {
			}
		}
	
	}

}
