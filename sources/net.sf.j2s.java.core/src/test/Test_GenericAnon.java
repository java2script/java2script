package test;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

class Test_GenericAnon {

	// @Override
	// public int compareTo(Object o) {
	// // TODO Auto-generated method stub
	// return 0;
	// }
	//

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Map<String, Integer> m = new Map<String, Integer>() {

			@Override
			public int size() {
				// TODO Auto-generated method stub
				return 0;
			}

			@Override
			public boolean isEmpty() {
				// TODO Auto-generated method stub
				return false;
			}

			@Override
			public boolean containsKey(Object key) {
				// TODO Auto-generated method stub
				return false;
			}

			@Override
			public boolean containsValue(Object value) {
				// TODO Auto-generated method stub
				return false;
			}

			@Override
			public Integer get(Object key) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Integer put(String key, Integer value) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Integer remove(Object key) {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public void putAll(Map<? extends String, ? extends Integer> m) {
				// TODO Auto-generated method stub

			}

			@Override
			public void clear() {
				// TODO Auto-generated method stub

			}

			@Override
			public Set<String> keySet() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Collection<Integer> values() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Set<java.util.Map.Entry<String, Integer>> entrySet() {
				// TODO Auto-generated method stub
				return null;
			}
		};

	}

}