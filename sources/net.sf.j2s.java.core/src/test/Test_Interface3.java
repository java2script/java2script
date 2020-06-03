package test;

public interface Test_Interface3 { 	
	
	public static int doTest(int i) {
		return i + 1;
	}
	
	interface api {
		default void _api() {
			
		}

		public static int _api_doTest(int i) {
			return i + 1;
		}

		interface js {
			default void _api_js() {
				
			}
			
			public static int _api_js_doTest(int i) {
				return i + 1;
			}

			
			void check();
			interface js1 {
				default void _api_js_js1() {
					
				}

				public static int _api_js_js1_doTest(int i) {
					return i + 1;
				}

			}
			
			class jsc {
				
				void _api_js_jsc() {};
				
				public static int _api_js_jsc_doTest(int i) {
					return i + 1;
				}

				
			}
		}
	}


	
}