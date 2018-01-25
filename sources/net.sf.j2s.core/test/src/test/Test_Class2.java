package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

@SuppressWarnings("rawtypes")
class Test_Class2 extends Test_ {

	static String s = "test";

	int test1 = 2;

	private String test = "testing";

	private String getTesting() {
		return test;
	}

	public Test_Class2() {

		PropertyChangeListener l = new PropertyChangeListener() {
			@Override
			public void propertyChange(PropertyChangeEvent event) {
				// Let the defaultCloseOperation handle the closing
				// if the user closed the window without selecting a button
				// (newValue = null in that case). Otherwise, close the dialog.
				Test_Class2 x = Test_Class2.this;
				System.out.println(x);
			}
		};

		System.out.println(true);
		final Test_Class2 me = Test_Class2.this;
		MouseListener c = new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println("!!!");
				Test_Class2.this.showt();
				showt();
				assert (Test_Class2.this == me);
				System.out.println("!!!");
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub

			}

		};
	}

	public static void main(String[] args) {
		new Test_Class2();
		new Test_Class2();

	}

}
