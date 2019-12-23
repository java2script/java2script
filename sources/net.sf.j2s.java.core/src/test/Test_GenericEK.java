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

	@Override
	String get(String a) {
		// TODO Auto-generated method stub
		return null;
	}
	
	//we need to be able to equate $p.compareTo$TK = $p.compareto$S

}