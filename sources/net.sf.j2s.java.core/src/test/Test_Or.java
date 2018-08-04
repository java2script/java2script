package test;

class Test_Or extends Test_ {

	public static void main(String[] args) {
		
		

		int count = 0;
		boolean ok = true;

		// note that |= is bitwise |, not logical ||

		ok |= (count++ == 0);
		ok |= (count++ == 0);
		
		System.out.println(count);
		assert (count == 2);
		
		ok = false;
		count = 0;
		// note that &= is bitwise &, not logical &&
		ok &= (count++ == 0);
		ok &= (count++ == 0);
		System.out.println(count);
		assert (count == 2);

		ok = true; 
		count = 0;
		ok = ok | (count++ == 0);
		ok = ok | (count++ == 0);		
		System.out.println(count);
		assert (count == 2);

		ok = true; 
		count = 0;
		ok = ok || (count++ == 0);
		ok = ok || (count++ == 0);		
		System.out.println(count);
		assert (count == 0);

		// difference between & and &&
		
		ok = false;
		count = 0;
		ok =  ok & (count++ == 0);
		ok =  ok & (count++ == 0);
		System.out.println(count);
		assert (count == 2);

		ok = false;
		count = 0;
		ok =  ok && (count++ == 0);
		ok =  ok && (count++ == 0);
		System.out.println(count);
		assert (count == 0);
		


		
		System.out.println("Test_Or OK");
	}

}