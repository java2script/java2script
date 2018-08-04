package test;

public enum Test_Enum2 { 
	E1,E2;
	
	private static int pi = 0;  
	
    void inEnum2() {}
    
	public enum Type {
		
		T1, T2;		
		void inType() {}
	}
	

	public static void main(String[] args) {
		System.out.println("E1 = " + E1);
		System.out.println("T2 = " + Type.T2);
		System.out.println(Test_Enum2.values().length);
		System.out.println("Test_Enum2 OK");
	}

}

