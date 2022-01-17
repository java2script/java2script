package test;

interface MyInterface0 {
	Integer value = MyInterface2.getValue(-2);

	default Integer getValue() {
		return value;
	}
	
}