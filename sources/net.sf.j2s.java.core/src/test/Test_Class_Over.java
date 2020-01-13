package test;

import java.util.Hashtable;

class Test_Class_Over extends Test_ {

	public static void main(String[] args) {
		@SuppressWarnings("serial")
		Hashtable<String, Object> t = new Hashtable<String, Object>() {
			@Override
			public Object put(String key, Object value) {
				super.put(key,  value); 
				return value;
			}			
		};
	}

}

