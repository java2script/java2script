package test;

public class Test_ThreadGroup extends Test_ {

	public static void main(String[] args) {
		new Test_ThreadGroup();
	}

	public Test_ThreadGroup() {
		
		ThreadGroup g0 = Thread.currentThread().getThreadGroup();
		System.out.println("g0=" + g0);
		
		// oddly enough, Java runs these hooks in unpredictable order, 
		// but SwingJS will run them sequentially
		
		ThreadGroup g = new ThreadGroup("testing");

		Thread th1 = new Thread(g, new Runnable() {

			@Override
			public void run() {
				ThreadGroup g = Thread.currentThread().getThreadGroup();
				System.out.println("g=" + g);
				System.out.println("OK testing");
			}
			
		});
		
		th1.start();

	}
	
}
