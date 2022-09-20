package test;


public abstract class Test_Inner extends Test_ {

	final static String a = "a string";
	static String b = "bstring";
	
	public String t_test = "Test_Inner.t_test";
	
	public String t_test2 = "test2";
	
	public Test_Inner(int i) {
		t_test2 += i;
	}


	@Override
	public String showt2() {
		
		boolean ok = true;
		int n = 25;
		
		class Showt2Inner {

			public String getString() {
				return "inner " + ok + " " + n;
			}
			
			
		}
		
		System.out.println(new Showt2Inner().getString());
		System.out.println("test_Inner.showt2()" + this + " " + this.t_test);
		return "Test_Inner";
	}
	
	public class Test_Abstract_a extends Test_ {
	
		public void testing() {
			System.out.println("this is " + a);
			assert (a == "a string");
			System.out.println(showt2());
			System.out.println(t_test);
			System.out.println(t_test2);
			t_test2 += "new";
			System.out.println(t_test2);
			
			
			Test_Inner.this.showt2(); 
						
			System.out.println(Test_Inner.this.showt2()); 
			System.out.println(Test_Inner.this.t_test);
			new Test_Inner(5) {
				@SuppressWarnings("unused")
				public String t_test = "Test_Inner";
				void test() {
					showt2();
					Test_Abstract_a a = new Test_Abstract_a() {
						@Override
						public String showt2() {
							System.out.println("c.a.showt2() " + t_test);
							return t_test;
						}
					};					
					a.showt2();
				}
				
			}.test();

		}
		
	}
	 
	
	public void testDollar(Test_Abstract_a abs) {
		
	}
	
	public static void main(String[] args) {
		try {
			Class<?> t = Class.forName("test.Test_InnerAo$AiStat");
			System.out.println(t.getName() + " loaded");
			System.out.println(t.newInstance());
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			assert(false);
		}
		
		Test_Inner inner = new Test_Inner(6) {};
		try {
			System.out.println(inner.getClass().getMethod("testDollar", new Class<?>[] {Test_Abstract_a.class}).getName());
		} catch (NoSuchMethodException | SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		inner.showt2();
		new Test_Inner(3) {}.showt2();
		System.out.println(inner.t_test);
		System.out.println("new Test_Inner(){}.t_test=" + new Test_Inner(7) {}.t_test);
		Test_Abstract_a abs = inner.new Test_Abstract_a();
		String s = abs.getClass().getName();
		String s1 = new Test_Abstract_a[] {abs}.getClass().getName();
		System.out.print("checking inner$");
		assert(s.equals("test.Test_Inner$Test_Abstract_a"));
		assert(s1.equals("[Ltest.Test_Inner$Test_Abstract_a;"));
		System.out.println(" ok");
		new Test_Inner(8) {}.new Test_Abstract_a().testing();

		try {
			System.out.println(abs.getClass().getMethod("testing", new Class<?>[] {}).getName());
		} catch (NoSuchMethodException | SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		System.out.println("Test_Inner OK");
	}

}