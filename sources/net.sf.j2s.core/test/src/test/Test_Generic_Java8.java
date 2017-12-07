package test;

import java.awt.Component;

import javax.swing.JComboBox;
import javax.swing.JList;
import javax.swing.ListCellRenderer;

public class Test_Generic_Java8 extends Test_ implements ListCellRenderer {

	/**
	 * Demonstrates the issue with Java8 classes being generic while Java6
	 * version is not. As long as the transpiler is working in a Java8
	 * environment, it should alias the interface method properly. Note that all
	 * methods in Java8 ListCellRenderer will target the $TE version of the
	 * implemented method, while all methods in Java6 ListCellRenderer will
	 * target the $O version of that method. Both will work. 
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
	
		Test_Generic_Java8 test = new Test_Generic_Java8();
		// calls getListCellRendererComponent$javax_swing_JList$O$I$Z$Z 
		test.getListCellRendererComponent(null,  null, 0, false, false);
		ListCellRenderer t = new Test_Generic_Java8();
		// calls getListCellRendererComponent$javax_swing_JList$TE$I$Z$Z 
		t.getListCellRendererComponent(null,  null, 0, false, false);
		class JCombo extends JComboBox {
			public void test(Object o) {
				// This next call will be to this.addItem$O in Java6
				// but to this.addItem$TE in Java8. Since the SwingJS version 
				// is addItem$O, we need to alias this call to that as 
				//  (($o$ = this).addItem$TE || $o$.addItem$O).apply($o$,[o]);
				//
				addItem(o);
				System.out.println("added " + o);
			}
		}
		new JCombo().test(new Object());
			String s = null;
			String v = "testing";
			System.out.println((s == null ? v : s).length());
			System.out.println((s = v).length());
		System.out.println("Test_Generic_Java8 OK");
	}
	
	
	/**
	 * This method must be bound to both 
	 * 
	 * getListCellRendererComponent$javax_swing_JList$O$I$Z$Z
	 * 
	 * and
	 * 
	 * getListCellRendererComponent$javax_swing_JList$TE$I$Z$Z
	 * 
	 * 
	 * 
	 */
	@Override
	public Component getListCellRendererComponent(JList list, Object value, int index, boolean isSelected,
			boolean cellHasFocus) {
		return null;
	}
	
}
