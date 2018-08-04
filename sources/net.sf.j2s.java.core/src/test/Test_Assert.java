package test;

class Test_Assert extends Test_ {
	
	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_assert2", true);
		try {
			Class<Test_assert2> cl = (Class<Test_assert2>) ClassLoader.getSystemClassLoader().loadClass("test.Test_assert2");
			cl.newInstance();
			System.out.println("Test_Assert OK");
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}