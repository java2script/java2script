package test;

public class Test_Interface4 {

	interface MyInterface {
		public static final Integer value = Integer.valueOf(1);

		public default Integer getValue() {
			return MyInterface.value;
		}
	}

	static class MyInterfaceImpl implements MyInterface {
		public static final Integer value = Integer.valueOf(2);
		public Integer getValueImpl() {
			return value + MyInterface.value;
		}
	}

	public static void main(String[] args) {
		MyInterfaceImpl impl = new MyInterfaceImpl();
		System.out.println(String.valueOf(impl.getValue()));
		System.out.println(String.valueOf(impl.getValueImpl()));
	}
}
