package test;

abstract class Test_GenericExt_K<K extends Comparable<K>> {

	
    protected K data;


	public abstract void check2(K data);

    
    public void check(K data, Test_GenericExt_K<K> next) {
    	this.data = data;

    	// Wow, this works!
    	//
    	// The problem (I thought) is calling a method in an extended generic class. 
    	// We can't know what data's clsss compares to, so here we have to call it "data.compareTo$TT".
    	// But data's class will have its own type letter, not necessarily T.
    	// for example, if we have:
    	//
    	//   Test_Generic_Comp implements Comparable<Test_Generic_Comp>
    	//
    	//   Test_GenericExt2 extends Test_GenericExt_T<Test_Generic_Comp>
    	//
    	// Then a call to 
    	//
    	//   new Test_GenericExt2().check(null, null);
    	//
    	// will try to run 
    	//
    	//   data.compareTo$TT
    	//
    	// using OUR type T here. But for all we know, which will actually work,
    	// because data's compareTo$Test_Generic_Comp will be properly aliased
    	// to Comparable's T type as compareTo$TT as well.
    	//
    	// But if for some reason we chose to use "K" in our class here, we are sunk.
    	// We will be calling data.compareTo$KK, and there is no way at compile time to 
    	// signal to our Test_Generic_Comp class that the function is being 
    	// called data.compareTo$TK here.
    	
    	
    	if (data != null)
    		data.compareTo(null);
    	check2(data);
    }


}
