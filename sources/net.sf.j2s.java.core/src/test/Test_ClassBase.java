package test;

@SuppressWarnings("rawtypes")
class Test_ClassBase extends Test_ {

	public static class PTest extends PTest0<Integer> {

		@Override
		public Integer add(String s, Integer n) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Integer remove(String s, Integer n) {
			// TODO Auto-generated method stub
			return null;
		}
		
	}

	public static abstract class PTest0<N extends Number> implements PTestI<N, String> {

		@Override
		public N remove(String s, N n) {
			// TODO Auto-generated method stub
			return add(s, n);
		}


	}

	public interface PTestI<P, T> {
		public P add(T t, P p);
		public P remove(T t, P p);

	}

	static class Parser extends BaseParser{
	
		@Override
		void test() {
			System.out.println("Parser.test");
		}
		
	}
	
	static abstract class BaseParser {
		
		void doTest() {
			test();
		}
		
		void test() {
			System.out.println("BaseParser.test");
		}
	}
	
	public static void main(String[] args) {

		new Test_ClassBase.Parser().doTest();
		
		new PTest();
		
	}

}