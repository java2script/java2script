package test;


class Test_ClassBase extends Test_ {

	public interface PTestN<S extends CharSequence, N extends Number> {
		public N add(S s, N n);
		public N remove(S s, N n);
	}

	public static class PTest extends PTest0<Integer> implements PTestN<String, Integer> {

		@Override
		public Integer add(String s, Integer n) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Integer remove(String s, Integer n) {
			System.out.println(s);
			assert(true);
			return null;
		}
		
		
		@Override
		public Integer removeIt(String s, Integer n) {
			return remove(s, n);
		}
	}

	public static abstract class PTest0<N extends Number> implements PTestI<N, String> {

		@Override
		public N remove(String s, N n) {
			assert(false);
			return add(s, n);
		}
		
		public N removeOne(String s, N n) {
			return remove(s, n);
		}

	}

	public interface PTestI<P, T> {
		public P add(T t, P p);
		public P remove(T t, P p);
		
		default P removeIt(T t, P p) {
			return remove(t, p);
		}

	}

	static class Parser extends BaseParser{
	
		@Override
		void test() {
			assert(true);
		}
		
	}
	
	static abstract class BaseParser {
		
		void doTest() {
			test();
		}
		
		void test() {
			assert(false);
		}
	}
	
	public static void main(String[] args) {

		new Test_ClassBase.Parser().doTest();

		// This test checks that Java2ScriptVisitor.getOverriddenMethods does its job correctly.
		// Failure would be "unknown method"
		PTest pt = new PTest();
		pt.remove("test", Integer.valueOf(3));
		((PTestN)pt).remove("testN", Integer.valueOf(3));
		((PTest0)pt).remove("test0", Integer.valueOf(3));
		((PTestI)pt).remove("testI", Integer.valueOf(3));
		System.out.println("Test_ClassBase OK");
	}

}