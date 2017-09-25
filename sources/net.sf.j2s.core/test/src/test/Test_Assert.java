package test;

class Test_Assert extends Test_ {
	
	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		//ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_assert2", true);
		try {
			Class<Test_assert2> cl = (Class<Test_assert2>) ClassLoader.getSystemClassLoader().loadClass("test.Test_assert2");
			Test_assert2 ta2 = cl.newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}