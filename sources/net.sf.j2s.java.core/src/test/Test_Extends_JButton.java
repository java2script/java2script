package test;

import java.awt.event.ActionEvent;

interface ActionListener_ {
	void actionPerformed(ActionEvent event);
}

class JButton1 {
	ActionListener_ actionListener;

	private static int VALUE;

    int jbuttonval;
    
    {
    	jbuttonval = ++VALUE;
    }
    
	public JButton1() {
		// TODO Auto-generated constructor stub
	}

	public JButton1(Object object) {
		this();
	}

	public void addActionListener(ActionListener_ actionListener) {
		this.actionListener = actionListener;
	}

	public void fireAction() {
		actionListener.actionPerformed(null);
	}
	
	public void checkMe() {
		
		System.out.println("running checkMe in JButton" + jbuttonval + " " + this);
		
	}
}

/**
 * To run test_4 in JavaScript,
 * 
 * @author RM
 *
 */
public class Test_Extends_JButton extends JButton1 {

	public Test_Extends_JButton(Object object) {
		super(object);
		// TODO Auto-generated constructor stub
	}


	public Test_Extends_JButton() {
		// TODO Auto-generated constructor stub
	}


	static {
		// see http://docs.oracle.com/javase/tutorial/java/javaOO/initial.html
		System.out.println("test_Extends_JButton running IdealGasmodule static initialization block ");
	}

	{
		// see http://docs.oracle.com/javase/tutorial/java/javaOO/initial.html
		System.out.println("test_Extends_JButton running IdealGasmodule initialization block");
	}

	int myval = 3;
	
	JButton1 createAnonymousWithInitializer() {

		JButton1 button = new JButton1() {
			
			int mytest0, mytest = 31;
			
			{
				System.out.println("test_Extends_JButton running anon JButton1 initialization block");
				checkMe();
				Runnable r1 = new Runnable() {
					public void run() {
						System.out.println("runnable 1");
						resetChamber();
						checkMe();
						Object o = null;
						JButton1 j2 = new JButton1(o) {
						};
						j2.checkMe();
					}
				};
				
				r1.run();
				addActionListener(new ActionListener_() {
					public void actionPerformed(ActionEvent event) {
						System.out.println("test_Extends_JButton JButton1 running actionPerformed");
						resetChamber();
						checkMe();
						checkMe2();
					}
				});
				System.out.println("test_Extends_JButton finished anon JButton1 initialization block");
			}

			public void checkMe2() {
				System.out.println("test_Extends_JButton JButton1 checkMe2");
			}
			
		};
		return button;
	}

	void resetChamber() {
		System.out.println("test_Extends_JButton running IdealGasmodule resetChamber"  + myval + this);
		checkMe();
	}

	
	public void testMe9()  {
		System.out.println("testing testMe");
				
	}
	
	Runnable r2 = new Runnable() {
		public void run() {
			System.out.println("runnable 2");
			resetChamber();
			checkMe();
		}
	};
	
    public static void main(String[] args) {
		Test_Extends_JButton tester = new Test_Extends_JButton();
		tester.createAnonymousWithInitializer().fireAction();
		tester.createAnonymousWithInitializer().checkMe();
		tester.checkMe();
		tester.r2.run();
		System.out.println("Test_Extends_JButton OK");

	}

}


