package test;

public class Test_Extends_6 extends Test_Extends_7 {

  public int[] test6 = new int[6];

  public String a = "test_6_a";

  
  public Test_Extends_6() {
	  super();
		System.out.println("calling x_1 in Test_6 constructor");
	  x_1();
	try {
		System.out.println(Test_Extends_7.class.getConstructor(new Class[]{int[].class}));
	} catch (NoSuchMethodException | SecurityException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
  	System.out.println("test6");
  }
  
    public Test_Extends_6(int i) {
		System.out.println("Test_6 constructor int=" + i);
		x_2();
    }

    public Test_Extends_6(double d) {
		System.out.println("Test_6 constructor double=" + d);
    }

	public void x_2() {
		System.out.println("Test_6 x_2 calling x_1 from Test_6.x_2");
		x_1();
    }
	public void x_1() {
		System.out.println("x_1 in Test_6");
	}

	public static void main(String[] args) {
		new Test_Extends_6();
	}


}