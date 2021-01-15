package test;

/**
 * @j2sNative
 * 
 *  // before class1
 * 
 */
/**
 * @j2sNative 
 * 
 *  // before class2
 * 
 */
/**
 *
 * @j2sPrefix
 *   // /-* this is from <@>j2sPrefix *-/ -- no longer supported - unnecessary
 *   
 * 
 * @j2sSuffix
 *   //  /-* this is from <@>j2sSuffix *-/ -- no longer supported - unnecessary
 */
 
class Test_Native extends Test_ {

	/**
	 * @j2sAlias test123
	 */
	@Override
	public void test123(int a, int b, int c) {
		
	}

	
	void checkP(int i, Object obj, int j) {
		
	}
	
	
	/**
	 * @j2sNative
	 * 
	 * 	// field declaration in $init$
	 * 
	 */ 
	int ii;

	
	/**
	 * @j2sNative
	 * 
	 * 		// static field declaration -- just after class starts, before $clinit$
	 * 
	 */
	static int iii;
	
	/**
	 * @j2sNative
	 * 
	 * 		 // should replace static block int jk = 0
	 * 
	 */
	static {
		int jk = 0;
		
	}

	/**
	 * @j2sNative
	 * 
	 * 		// initializer -- replaces ii = 1
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
	 *  //should read "i= 3 || 4"
	 * 
	 */

	int i = /** @j2sNative 3 || */4;

	int test = 3;

	public native void testNative();

	public native void testNative2();

	/**
	 * @j2sNative
	 * 
	 * 		//	return /-* testing *-/ and <@>here
	 *  
	 */
	public void test() {
		/** 
		 * @j2sNative
		 * 
		 * 		//	return /-* test2 *-/ and <@>here  not used - whole function is replaced
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
		 * @j2sNative  // removes block
		 * 
		 * 	
		 * 
		 */
		{
			int j  = 5; 
		}
		/** 
		 * @j2sNative
		 * 
		 *     // before int j=0
		 *     
		 */
		int  j = 0; 
		/**
		 * @j2sIgnore
		 */
		{
			j = 3 + ii;		
		}
		/**
		 * @j2sNative
		 * 
		 * 	j = 1;	// without braces -- included in next replace 
		 * 
		 */

		/**
		 * @j2sNative
		 * 
		 *  this.ii = -1;
		 * 	j = 2;		//  with braces
		 * 
		 */ 
		{}
		
		/**
		 * @j2sNative
		 * 
		 *  this.ii = -1;
		 * 	j = 2		//  without braces
		 * 
		 */ 
		/**
		 * @j2sNative
		 * 
		 *    // before assert - no braces
		 * 
		 */
		assert(j == 3 + ii);
	}

	public static void main(String[] args) {
//		new Test_Native().test2();

		int y = (/** @j2sNative 1?'s': */
		'\t');
		assert (y == 9 || y == 's');
		int z = (/** @j2sNative 1?2: */
		909 + y);
		assert (z == 918 || z == 2);
		int x = (/** @j2sNative 1?3: */
		909);
		assert (x == 909 || x == 3);
		Object g = "testing";
		Object o = (/** @j2sNative g.mark$ ? g : */
		null);
		assert (o == null || o == g);
		
		/** 
		 * @j2sNative
		 *  
		 *     // before if
		 * 
		 */
		if (Math.random() > 0.5) {
			
			System.out.println("else1");
		
			/** 
			 * @j2sNative  
			 * 
			 *   // after else1 sysout 
			 *  
			 */ 
			int j = 1;
			return; 
			/**
			 * @j2sNative 
			 *  
			 *  // after return but before closing brace
			 * 
			 */
		}
		
    	/**
    	 * 
    	 * @j2sNative
    	 * 
    	 *   /-* comment *-/  
    	 * 
    	 */

		System.out.println("Test_Native OK");  

		if (args != null)
		/**
		 * @j2sNative
		 * 
		 *            // THEN clause
		 * 
		 */
		{
			System.out.println("NO");
		} else 
		/**
		 * @j2sNative
		 * 
		 * 			// ELSE clause
		 */
		{
			
			System.out.println("NO");
		}
		
		
		/**
		 * @j2sNative
		 * 
		 *    // before if 
		 */
		if (true) {
			
			int i = 3;
			int j = 5;
			
			/**
			 * @j2sNative
			 * 
			 *    // in if
			 */

		}

		/**
		 * @j2sNative
		 * 
		 *    // after if
		 */
		

		/**
		 * @j2sNative
		 * 
		 *    // end of method
		 */
		
	}

	/**
	 * @j2sNative
	 * 
	 *    // end of class
	 */
} 

/**
 * @j2sNative
 * 
 *    // end of unit
 */

