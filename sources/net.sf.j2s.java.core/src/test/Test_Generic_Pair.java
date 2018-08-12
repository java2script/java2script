package test;

public class Test_Generic_Pair<K, V> {

	private K key;
	private V value;

	public Test_Generic_Pair(K key, V value) {
		this.key = key;
		this.value = value;
	}

	public static Test_Generic_Pair test1(Test_Generic_Pair pair) {
		System.out.println("Test_Generic_Pair " + pair);
		return pair;
	}

	public void setKey(K key) {
		this.key = key;
	}

	public void setValue(V value) {
		this.value = value;
	}

	public K getKey() {
		return key;
	}

	public V getValue() {
		return value;
	}
}
