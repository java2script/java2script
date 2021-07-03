package test;

/**
 * This is the troubling class. We have a method that appears not to have a
 * generic-replaced method, because its class def has no indication of it. But
 * actually it does, and we have to alias it in this class to all its precursor
 * qualified names.
 * 
 * @author RM
 *
 */
class Test_GenericEABIXY2 extends Test_GenericEABIXY {

	public class MyClass<T extends Test_Generic_K> { // <- Type declaration

		class MyClassInner<U extends T> {

		}

		private T item; // <- Type usage

		T x;

		@Deprecated
		public <K extends T> K getSubitem() {
			// ^ ^
			// declaration usage
			x = this.asList(); // <- Type Usage not a type declaration
			return (K) x;
		}

		private <K> K asList() {
			return null;
		}

	}

	public static void main(String[] args) {

		Object tgk = new Test_Generic_K<Integer>() {

			@Override
			int compareTo(Integer a) {
				// TODO Auto-generated method stub
				return 0;
			}

			@Override
			Integer get(Integer a) {
				// TODO Auto-generated method stub
				return null;
			}

		};

		Object myclassinner = new Test_GenericEABIXY2().new MyClass().new MyClassInner() {

		};

		Test_GenericEK c = new Test_GenericEK();
		c.check("testa");
		c.checkb("testc");

		Test_GenericEABIXY tc = new Test_GenericEABIXY();
		assert (tc.compareTo(null, null) == 0);

		tc.test(null, null);

		Test_GenericIMV_AB<String, Integer> tcc = new Test_GenericIMV_AB<String, Integer>();
		tcc.test(null, null);

		Test_GenericEABIXY2 tc2 = new Test_GenericEABIXY2();
		int ret = tc2.compareTo("test", Integer.valueOf(1));
		assert (ret == 1);
		ret = tc2.compareTo("test", (Number) Integer.valueOf(0));
		assert (ret == 0);

		System.out.println("Test_GenericC OK");
	}

	/**
	 * note that this has to be the EXACT signature as listed above, and it has to
	 * match.
	 * 
	 */
	public int compareTo(String s, Integer i) {
		System.out.println("Test_Generic2#compareTo(String Integer)" + s + "," + i);
		return 1;
	}

	public int show(String s, Integer i) {
		System.out.println("Test_Generic2#show(String Integer)" + s + "," + i);
		return 1;
	}

//	visit Ltest/Test_GenericEABIMV2;
//	>> Ltest/Test_GenericEABIMV2;.compareTo(Ljava/lang/String;Ljava/lang/Integer;)I
//	 overrides Ltest/Test_GenericEABIMV;.compareTo(Ljava/lang/String;Ljava/lang/Integer;)I
//	 overrides Ltest/Test_Generic_ABIMV_AB<Ljava/lang/String;Ljava/lang/Integer;>;.compareTo(Ljava/lang/String;Ljava/lang/Integer;)I
//
//	>> Ltest/Test_GenericEABIMV;.compareTo(Ljava/lang/String;Ljava/lang/Integer;)I
//	 overrides Ltest/Test_Generic_ABIMV_AB<Ljava/lang/String;Ljava/lang/Integer;>;.compareTo(Ljava/lang/String;Ljava/lang/Integer;)I

}
