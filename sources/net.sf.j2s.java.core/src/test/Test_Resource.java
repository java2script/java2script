package test;

import java.util.Properties;

public class Test_Resource extends Test_ {
	
	static int getInt() {
		return 0;
	}
	
	public static void main(String[] args) {
		Properties p = new Properties();
		try {
			// check for proper referencing of an interface
			Class<?> c = Test_Resource.class;
			p.load(c.getResourceAsStream("test.properties"));
	        String test = p.getProperty("test");
	        System.out.println(test);
	        assert("OK".equals(test));
	        System.out.println("Test_Resource OK");
		} catch (Exception e) {
			System.out.println(e);
			assert(false);
		}
	}

} 