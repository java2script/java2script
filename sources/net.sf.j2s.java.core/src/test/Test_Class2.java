package test;

abstract class Test_Class2<T extends Number> extends Test_ implements Test_Class_int {


	static  {
		System.out.println("Test_Class2 static init ");
	}

	static  {
		System.out.println("Test_Class2 nonstatic init ");
	}

//    static Test_Class cl2_1 = new Test_Class("test-static2_1 <<<<<<<<<");
//    static Test_Class cl2_2 = new Test_Class("test-static2_2 <<<<<<<<<");
//
//    
//	static {
//		System.out.println("Test_Class2 static init" + cl2_1);
//	}
//
//	{
//		System.out.println("Test_Class2 nonstatic init " + cl2_1);
//	}
//

//	static String s = "test";

	int test1 = 2;

	private String test = "testing2";

	protected String getTesting() {
		return test;
	}

	public Test_Class2() {

//		PropertyChangeListener l = new PropertyChangeListener() {
//			@Override
//			public void propertyChange(PropertyChangeEvent event) {
//				// Let the defaultCloseOperation handle the closing
//				// if the user closed the window without selecting a button
//				// (newValue = null in that case). Otherwise, close the dialog.
//				Test_Class2 x = Test_Class2.this;
//				System.out.println(x);
//			}
//		};

		System.out.println("TestClass2() constructor ");
		
//		final Test_Class2 me = Test_Class2.this;
//		MouseListener c = new MouseListener() {
//
//			@Override
//			public void mouseClicked(MouseEvent e) {
//				System.out.println("!!!");
//				Test_Class2.this.showt();
//				showt();
//				assert (Test_Class2.this == me);
//				System.out.println("!!!");
//			}
//
//			@Override
//			public void mousePressed(MouseEvent e) {
//				// TODO Auto-generated method stub
//
//			}
//
//			@Override
//			public void mouseReleased(MouseEvent e) {
//				// TODO Auto-generated method stub
//
//			}
//
//			@Override
//			public void mouseEntered(MouseEvent e) {
//				// TODO Auto-generated method stub
//
//			}
//
//			@Override
//			public void mouseExited(MouseEvent e) {
//				// TODO Auto-generated method stub
//
//			}
//
//		};
	}

	public Test_Class2(byte[]... d) {
		System.out.println("Test_Class2 len = " + d.length);
		testAbstract(3, null, 40);
	}

//	public static void main(String[] args) {
//		//new Test_Class2();
//		//new Test_Class2();
//
//	}
	
	public abstract void testAbstract(int i, T n, long j);
	
//	public abstract void testAbstract(int i, Integer n, long j);

}
