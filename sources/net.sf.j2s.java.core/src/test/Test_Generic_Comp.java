package test;

class Test_Generic_Comp implements Comparable<Test_Generic_Comp> {

	@Override
	public int compareTo(Test_Generic_Comp o) {
		
		// Integer needs to have CompareTo$TT
		System.out.println(compare2(Integer.valueOf(3), Integer.valueOf(4)));

		return 0;
	}
	
	public int compare2(Comparable a, Comparable b) {
		return a.compareTo(b);
	}

	// we can explore the <K> as binding.getTypeParameters()
	
	
}
