package test;

abstract class Test_Generic_K<K> {
	
	// we can explore the <K> as binding.getTypeParameters()
	
	
	abstract int compareTo(K a); // will be String

	int check(K a) {
	
		// this one is referencing K so it reads compareTo$TK(a) but must call compareTo$S(a).
		
		return compareTo(a); 
		
	}
}
