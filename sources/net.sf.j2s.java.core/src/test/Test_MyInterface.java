package test;

class Test_MyInterface extends Test_ {
	public static void main(String[] args) {
		MyInterfaceImpl impl = new MyInterfaceImpl();
		assert(impl.getValue() == 0);
		assert(impl.getValueImpl() == 102);
		assert(impl.getValue() == 0);
		System.out.println("Test_MyInterface OK");
	}
}