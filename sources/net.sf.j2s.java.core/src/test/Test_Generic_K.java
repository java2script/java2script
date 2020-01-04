package test;

abstract class Test_Generic_K<K> {
	
	// we can explore the <K> as binding.getTypeParameters()
	
	K value;
	
	abstract int compareTo(K a); // will be String

	abstract K get(K a); // will be String

	@Test_Parameter
	int check(K a) {
		value = a;
	
		// this one is referencing K so it reads compareTo$TK(a) but must call compareTo$S(a).
		
		return compareTo(a); 
		
	}
	
	@Test_Parameter
	K checkK(K a) {
		return a;
	}
}
