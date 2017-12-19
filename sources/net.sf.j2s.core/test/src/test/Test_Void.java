package test;

class Test_Void extends Test_ {
	
	public static void main(String[] args) {
		assert(void.class.toString().equals("void"));
		assert(void.class.getTypeName().equals("void"));
		System.out.println("Test_Void OK");
	}

}