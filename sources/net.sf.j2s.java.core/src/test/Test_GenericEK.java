package test;

class Test_GenericEK extends Test_Generic_K<String> {
	
	public boolean checkb(String a) {
		check(a);
		return false;
	}

	@Override
	public int compareTo(String s) {
		return s.compareTo("testb");
	}
	
	//we need to be able to equate $p.compareTo$TK = $p.compareto$S

}