package test;

interface Test_Generic_XY<X, Y> {
	/*
generic type: Ltest/Test_Generic~TGeneric<TM;TV;>;
generic method: Ltest/Test_Generic~TGeneric;.compareTo(TM;)I
generic method: Ltest/Test_Generic~TGeneric;.compareTo(TM;TV;)I
generic method: Ltest/Test_Generic~TGeneric;.compareTo(TM;Ljava/lang/String;Ljava/lang/String;)I	 */

	public int compareTo(X s); 
	public int compareTo(X s, Y t);
	public int compareTo(X s, String t, String t1); 
	public void show(String msg, X x);
	
	
}
