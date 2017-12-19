package test;

public class Test_Generic_Method extends Test_ {

	public static void main(String[] args) {
		Test_Generic_Pair<Integer, String> p1 = new Test_Generic_Pair<>(1, "apple");
		Test_Generic_Pair<Integer, String> p1a = new Test_Generic_Pair<>(1, "apple");
		Test_Generic_Pair<Integer, String> p2 = new Test_Generic_Pair<>(2, "pear");
		Test_Generic_Pair<Integer, String> p2a = new Test_Generic_Pair<>(3, "pear");
		assert(!Test_Generic_Method.compare(p1, p2));
		assert(Test_Generic_Method.compare(p1, p1a));
		assert(!Test_Generic_Method.compare(p2, p2a));
		System.out.println("Test_Generic_Method OK");

	}

	public static <K, V> boolean compare(Test_Generic_Pair<K, V> p1, Test_Generic_Pair<K, V> p2) {
		return p1.getKey().equals(p2.getKey()) && p1.getValue().equals(p2.getValue());
	}
}
