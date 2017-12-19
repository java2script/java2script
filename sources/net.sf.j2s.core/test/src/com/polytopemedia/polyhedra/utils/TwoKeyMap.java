package com.polytopemedia.polyhedra.utils;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public class TwoKeyMap<K1,K2,V> {

	private LinkedHashMap<K1, LinkedHashMap<K2, V>> map1=new LinkedHashMap<K1, LinkedHashMap<K2,V>>();
	private LinkedHashMap<K2, LinkedHashMap<K1, V>> map2=new LinkedHashMap<K2, LinkedHashMap<K1,V>>();
	
	public void put(K1 k1, K2 k2, V v) {
		if (!map1.containsKey(k1)) {
			map1.put(k1, new LinkedHashMap<K2, V>());
		}
		map1.get(k1).put(k2,v);
		if (!map2.containsKey(k2)) {
			map2.put(k2, new LinkedHashMap<K1, V>());
		}
		map2.get(k2).put(k1,v);
	}
	
	public V get(K1 k1, K2 k2) {
		if (!map1.containsKey(k1)) {
			return null;
		}
		return map1.get(k1).get(k2);
	}
	
	public boolean containsKeys(K1 k1, K2 k2) {
		if (!map1.containsKey(k1)) return false;
		return map1.get(k1).containsKey(k2);
	}
	
	

	public Map<K1, V> filter2(K2 k2) {
		if (!map2.containsKey(k2)) {
			return new LinkedHashMap<K1, V>();
		} 
		return map2.get(k2);
	}
	
// TODO Remove unused code found by UCDetector
// 	public Set<K1> key1Set() {
// 		return map1.keySet();
// 	}
	
// TODO Remove unused code found by UCDetector
// 	public Set<K2> key2Map() {
// 		return map2.keySet();
// 	}
	
	public String toString() {
		StringBuffer buf = new StringBuffer("[");
		boolean first = true;
		for (K1 k1 : map1.keySet()) {
			for (K2 k2 : map1.get(k1).keySet()) {
				if (!first) {
					buf.append(", ");
					first = false;
				}
				buf.append("("+k1+","+k2+")~>"+map1.get(k1).get(k2));
			}
		}
		buf.append("]");
		return buf.toString();
	}

}
