package test;

@SuppressWarnings("rawtypes")
class Test_Class {
	
	Class B() {
		return null;
	}
	
	static class C extends Test_Class  {
		
	}

	Class D() {
		return C.class;
	}
	
  public static void main(String[] args) {
  }
	
}