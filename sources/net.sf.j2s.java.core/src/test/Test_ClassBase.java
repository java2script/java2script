package test;

@SuppressWarnings("rawtypes")
class Test_ClassBase extends Test_ {

	static class Parser extends BaseParser{
	
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
		
	}

}