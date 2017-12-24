package test;

/**
 * @j2sNative
 * 
 *  // before class1 - ignored - OK
 * 
 */
/**
 * @j2sNative 
 * 
 *  // before class2 - OK
 * 
 */
/**
 *
 * @j2sPrefix
 *   // /-* this is from <@>j2sPrefix *-/ -- no longer supported - OK
 *   
 * 
 * @j2sSuffix
 *   //  /-* this is from <@>j2sSuffix *-/ -- added after last method - OK
 */

class Test_Native extends Test_ {

	/**
	 * @j2sNative
	 * 
	 * 	// field declaration in $init$ - OK
	 * 
	 */
	int ii;

	
	/**
	 * @j2sNative
	 * 
	 * 		// static field declaration -- just after class starts, before $clinit$ - OK
	 * 
	 */
	static int iii;
	
	/**
	 * @j2sNative
	 * 
	 * 		// initializer -- replaces ii = 1 - OK
	 * 
	 *  ii=1;
	 * 
	 */

	{
		ii = 1;
	}
 
	
	/**
	 * @j2sNative
	 * 
	 * 		 // should replace static block int jk = 0 - OK
	 * 
	 */
	static {
		int jk = 0;
		
	}

	int test = 3;

	public native void testNative();

	public native void testNative2();

	/**
	 * @j2sNative
	 * 
	 * 		//	return /-* testing *-/ and <@>here - OK
	 *  
	 */
	public void test() {
		/**
		 * @j2sNative
		 * 
		 * 		//	return /-* test2 *-/ and <@>here  not used - whole function is replaced - OK
	 	 * 
		 */
		{
			int i = 0;
		}
	}

	public void test2() {
		/**
		 * Otherwise the states have not changed
		 * 
		 * @j2sNative  // removes block - OK
		 * 
		 * 	
		 * 
		 */
		{
			new Test_Native().test2(); 
		}
		/** 
		 * @j2sNative
		 * 
		 *     // before int j=0 - OK
		 *     
		 */
		int  j = 0; 
		/**
		 * @j2sIgnore  - OK
		 */
		{
			j = 3 + ii;		
		}
		/**
		 * @j2sNative
		 * 
		 * 	j = 1	// ignored because it is not followed by anything - ok 
		 * 
		 */

		/**
		 * @j2sNative
		 * 
		 *  this.ii = -1;
		 * 	j = 2		// needs {} or it, too, will be ignored - ok
		 * 
		 */ 
		{}
		/**
		 * @j2sNative
		 * 
		 *    // before assert - ok
		 * 
		 */
		assert(j == 3 + ii);
	}

	public static void main(String[] args) {
		new Test_Native().test2();
		System.out.println("Test_Native OK");
	}

	/**
	 * @j2sNative
	 * 
	 *    // end of class -- ignored - OK
	 */

} 
/**
 * @j2sNative
 * 
 *    // after class -- ignored - OK
 */
 