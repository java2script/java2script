package test;

interface MyInterface extends MyInterface0 {
	Integer value = MyInterface2.getValue(0);
	Integer value1 = MyInterface2.getValue(1);

	default Integer getValue() {
		System.out.println("fixed2 " + new MyInterface0() {}.getValue());
		return value;
	}
	
}