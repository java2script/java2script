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
public class Test_9 extends JButton1 {

	static {
		// see http://docs.oracle.com/javase/tutorial/java/javaOO/initial.html
		System.out.println("test_9 running IdealGasmodule static initialization block ");
	}

	{
		// see http://docs.oracle.com/javase/tutorial/java/javaOO/initial.html
		System.out.println("test_9 running IdealGasmodule initialization block");
	}

	int myval = 3;
	
	void resetChamber() {
		System.out.println("test_9 running IdealGasmodule resetChamber"  + myval + this);
		checkMe();
	}

	JButton1 createAnonymousWithInitializer() {

		JButton1 button = new JButton1() {
			
			
			public void checkMe2() {
				System.out.println("test_9 JButton checkMe2");
			}
		
			{
				System.out.println("test_9 running anon JButton initialization block");
				checkMe();
				Runnable r = new Runnable() {
					public void run() {
						System.out.println("runnable 1");
						resetChamber();
						checkMe();
						JButton1 j2 = new JButton1() {
						};
						j2.checkMe();
					}
				};
				r.run();
				addActionListener(new ActionListener_() {
					public void actionPerformed(ActionEvent event) {
						System.out.println("test_9 running actionPerformed");
						resetChamber();
						checkMe();
						checkMe2();
					}
				});
				System.out.println("test_9 finished anon JButton initialization block");
			}
			
		};
		return button;
	}

	public void testMe9()  {
		System.out.println("testing testMe");
				
	}
	
	Runnable r = new Runnable() {
		public void run() {
			System.out.println("runnable 1");
			resetChamber();
			checkMe();
		}
	};

	
    public static void main(String[] args) {
		Test_9 tester = new Test_9();
		tester.createAnonymousWithInitializer().fireAction();
		tester.createAnonymousWithInitializer().checkMe();
		tester.checkMe();
		tester.r.run();
		System.out.println("exit main");

	}

}


