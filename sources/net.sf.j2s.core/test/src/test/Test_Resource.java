package test;

import java.io.IOException;
import java.util.Properties;

public class Test_Resource {
	
	static int getInt() {
		return 0;
	}
	
	public static void main(String[] args) {
		Properties p = new Properties();
		try {
			Class<?> c = test.Test_Resource.class;
			p.load(c.getResourceAsStream("test.properties"));
	        String test = p.getProperty("test");
	        System.out.println("OK".equals(test));
		} catch (IOException e) {
			System.out.println(e);
		}
	}

} 