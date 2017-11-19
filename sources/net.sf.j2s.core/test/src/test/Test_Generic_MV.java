package test;

interface Test_Generic_MV<M, V> extends Comparable<M> {
	/*
generic type: Ltest/Test_Generic~TGeneric<TM;TV;>;
generic method: Ltest/Test_Generic~TGeneric;.compareTo(TM;)I
generic method: Ltest/Test_Generic~TGeneric;.compareTo(TM;TV;)I
generic method: Ltest/Test_Generic~TGeneric;.compareTo(TM;Ljava/lang/String;Ljava/lang/String;)I	 */

//	public int compareTo(M s); 
	public int compareTo(M s, V t);
	public int compareTo(M s, String t, String t1); 

	public int show(String msg, V v);
	
}
