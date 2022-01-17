package test;

class Test_MyInterface extends Test_ {
	public static void main(String[] args) {
		MyInterfaceImpl impl = new MyInterfaceImpl();
		System.out.println(String.valueOf(impl.getValue()));
		System.out.println(String.valueOf(impl.getValueImpl()));
		System.out.println(String.valueOf(impl.getValue()));
	}
}