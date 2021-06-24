package test;

import java.util.HashMap;
import java.util.Map;

class Test_Clone extends Test_ implements Cloneable {
	int i = 30;
	int[] ia = new int[3];
	Map<String, Object> map = new HashMap<>();

	public static void main(String[] args) {
		Test_Clone tc = new Test_Clone();
		try {
			tc.map.put("key1", "value1");
			tc.map.put("key2", "value2");
			tc.i = 50;
			Test_Clone tc1 = (Test_Clone) tc.clone();
			tc.ia[1] = 33;
			assert(tc1.map.get("key1").equals("value1"));
			System.out.println(tc.i + " " + tc1.i + " " + tc.ia[1] + " " + tc1.ia[1]);
			assert (tc.i == tc1.i && tc.ia == tc1.ia);
			System.out.println("Test_Clone OK");
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}