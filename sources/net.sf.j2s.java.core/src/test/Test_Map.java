package test;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.IdentityHashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.Spliterator;
import java.util.TreeMap;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * A class to test optimization of HashMap and Hashtable.
 * 
 * See dev/mapests.xml for a summary.
 * 
 * BH 2020.03.07-08
 * 
 * Optimization of get/put was highly successful, with improvements up to 10x
 * for Firefox and 12x for Chrome
 * 
 * Firefox is faster than Chrome for relatively small map sizes (10K pairs), but
 * Chrome wins for larger sizes.
 * 
 * Firefox is about as fast as Java for map sizes up to 10K.
 * 
 * Chrome exceeds the speed of Java for map sizes in the 100K to 1M range.
 * 
 * SwingJS falls back to standard Java "unoptimized" behavior only for
 * non-string keys and HashMap Spliterator.
 * 
 * It is important to make sure the browser's developer console is closed during
 * these tests, especially for Firefox.
 * 
 * Map.containsValue(value) is an expensive check in both Java and JavaScript;
 * Firefox is particularly slow in this regard.
 * 
 * The overall switch for optimization or not is java.util.Map.USE_SIMPLE, set
 * to true for using the simple JavaScript Map and false for not.
 * 
 * For this first round, LinkedHashMap is not enabled for use of JavaScript Map.
 * 
 * @author hansonr
 *
 */
class Test_Map extends Test_ {

	public static void main(String[] args) {

		
		System.out.println("Equivalence tests asserted");
		assert(new Integer(3) == 3);
		assert(new Integer(3) != new Integer(3));

		String a = "x";
		String sa = new String("x");
		
		assert("xxx" == "xx" + "x");
		
		
//		assert("xxx" == ("xx" + a).intern()); 
//		
//		try {
//			assert("xxx" != "xx" + a);
//		} catch (AssertionError e) {
//			System.out.println("Known assertion error for  a=\"x\";\"xxx\" != \"xx\" + a ");
//		}
//		try {
//			assert(new String("xxx").toString() != ("xx" + a).intern());
//		} catch (AssertionError e) {
//			System.out.println("Known assertion error for a=\"x\"; new String(\"xxx\").toString() != (\"xx\" + a).intern()");
//		}
		assert(new String("xxx").intern() == "xxx"); 
		assert(!(new String("xxx") == "xxx")); 
		assert(new String("xxx") != "xxx"); 
		assert(new String("xxx") != new String("xxx")); 
		assert(new String("xxx") != new String("xxx").intern()); 


		
		System.out.println("The identityHashCode for these three are all different in Java, but not in Java:");
		System.out.println(System.identityHashCode("test"));
		String s = "";
		System.out.println(System.identityHashCode("test" + s));
		s = "st";
		System.out.println(System.identityHashCode("te" + s));
		System.out.println(System.identityHashCode("te" + s));
		
		System.out.println("The identityHashCode for an interned string is the same as its literal");
		System.out.println(System.identityHashCode(("te" + s).intern()));

		System.out.println("The identityHashCode for these three are all different in Java and JavaScript:");
		System.out.println(System.identityHashCode(new String("test")));
		System.out.println(System.identityHashCode(new String("test")));
		System.out.println(System.identityHashCode(new String("test")));

		testMap();
		
		testSets(); 
		
		testIdentity();
		
		//testMethods();
//		testPerformance();
		
		System.out.println("Test_Map OK");
	}

	private static void testMap() {
		LinkedHashMap<String, String> hm = new LinkedHashMap<>();
		hm.put("key1",  "v1");
		hm.put("key3",  "v3");
		hm.put("key2",  "v2");
		
		LinkedHashMap<String, String> hm1 = (LinkedHashMap<String, String>) hm.clone();
		
		assert(hm1.get("key1") == "v1");	
		assert(hm1.get("key2") == "v2");
		assert(hm1.get("key3") == "v3");
		
		for (String k : hm.keySet()) {
			System.out.println(k);
		}
		
		
		LinkedHashMap<Object, String> hm2 = new LinkedHashMap<>();
		hm2.put(new int[] {1,2,3}, "[123]");
		hm2.put(new int[] {2, 3, 4}, "[234]");
		System.out.println(hm2.get(new int[] {1,2,3}));

		TreeMap<String, String> hm3 = new TreeMap<>();
		hm3.put("key1",  "v1");
		hm3.put("key3",  "v3");
		hm3.put("key2",  "v2");
		
		assert(hm3.get("key1") == "v1");	
		assert(hm3.get("key2") == "v2");
		assert(hm3.get("key3") == "v3");

		String k0 = "key0";
		for (String k : hm3.keySet()) {
			System.out.println(k);
			assert (k0.compareTo(k) == -1);
			k0 = k;
		}
		
	}

	class MySet {

		public int hashCode() {
			return 1;
		}
		public boolean equals(Object o) {
			return true;
		}
	}
	
	static final int hash(Object key) {
		int h;
		return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
	}
	
	private static void testSets() {
		Set<Object> hs = new HashSet<>();
		System.out.println("HashSet should have 6 members:");
		hs.add(null);
		hs.add(new int[] {1,2,3});
		hs.add(new int[] {1,2,3});
		hs.add(new int[] {1,2,3});
		hs.add(Integer.valueOf(3)); // identical
		hs.add(Integer.valueOf(3)); // identical
		hs.add(Integer.valueOf(3)); // identical
		
		hs.add(new String("testing"));   // different
		String ing = "ing";
		hs.add("test" + ing);               // different from above
		hs.add("testing");               // different from above

		for (Object o : hs) {
			System.out.println(o);
		}
		System.out.println(hs.size());
		assert(hs.size() == 6);
	
		Iterator<Object> it;
		it = hs.iterator();
		while (it.hasNext()) {
			System.out.println(it.next());
		}
		System.out.println("");
	    hs.clear();
	    Test_Map tm = new Test_Map();
	    
	    hs.add(tm.new MySet());
	    hs.add(tm.new MySet());
	    hs.add(tm.new MySet());
		it = hs.iterator();
		while (it.hasNext()) {
			System.out.println(it.next());
		}
		System.out.println(hs.size());
		
		String test;
		
		System.out.println("Testing order for new HashSet() -- this will be different than Java for JavaScript in this particular case");
		hs = new HashSet<Object>();
		hs.add("testing");
		hs.add("two");
		hs.add("one");
		hs.add("three");
		test = "";
		it = hs.iterator();
		while (it.hasNext()) {
			test += it.next();
		}
		System.out.println(test);
		assert(test.equals(/** @j2sNative 1 ? "testingtwoonethree":*/"testingonetwothree"));
		System.out.println("Testing order for new HashSet(16, 0.75f) -- this will be the same");
		hs = new HashSet<Object>(16, 0.75f);
		hs.add("testing");
		hs.add("two");
		hs.add("one");
		hs.add("three");
		test = "";
		it = hs.iterator();
		while (it.hasNext()) {
			test += it.next();
		}
		System.out.println(test);
		assert(test.equals("testingonetwothree"));

		System.out.println("testSets OK");
	}

	private static void testIdentity() {
		System.out.println("IdentityHashMap should have 15 members:");
		IdentityHashMap<Object, Object> hmi = new IdentityHashMap<>();
		
		hmi.put(new String("testing"), "testing1");   // different

		
//		String ing = "ing";
//		hmi.put("test" + ing, "testing2");               // different from above
		
		hmi.put("testing", "testing3");               // different from above
		hmi.put("testing", "testing4");               // same as above


		try {
			hmi.put(new Integer(null), "126new"); // unique
			assert (false);
		} catch (NumberFormatException e) {
			assert (true);
		}
		hmi.put(new Integer(126), "126new"); // unique

		hmi.put(Integer.valueOf(126), "126"); // identical
		hmi.put(Integer.valueOf("126"), "126"); // identical

		hmi.put(Integer.valueOf(127), "127"); // identical
		hmi.put(Integer.valueOf("127", 10), "127"); // identical

		hmi.put(Integer.valueOf(128), "128"); // unique
		hmi.put(Integer.valueOf(128), "128"); // unique

		hmi.put(Integer.valueOf(-128), "-128"); // identical
		hmi.put(Integer.valueOf("-128", 10), "-128"); // identical

		hmi.put(Integer.valueOf(-129), "-129"); // unique
		hmi.put(Integer.valueOf(-129), "-129"); // unique

		hmi.put(Double.valueOf(3), "3.0"); // unique
		hmi.put(Double.valueOf(3), "3.0"); // unique

		hmi.put(Boolean.TRUE, "true1"); // same
		hmi.put(Boolean.valueOf(true), "true2"); // same
		hmi.put(new Boolean(true), "true3"); // unique
		
		hmi.put(Boolean.FALSE, "false1"); // same
		hmi.put(Boolean.valueOf("adfadf"), "False"); // same
		
		Entry<Object, Object> e0 = null;
		for (Entry<Object, Object> e : hmi.entrySet()) {
			System.out.println(e.toString() + ":" + e.equals(e0));
			e0 = e;
		}
		System.out.println(hmi.size());
		assert (hmi.size() == 15);

		
		System.out.println("HashMap should have 9 members:");
		HashMap<Object, Object> hm = new HashMap<>();

		hm.put("testing", "testing4");               // same
		assert(hm.get(new String("testing")) == "testing4");

		hm.clear(); 
		
		hm.put(new String("testing"), "testing1");   // same
		hm.put("testing", "testing2");               // same
		String ing = "ing";
		hm.put("test" + ing, "testing3");               // same
		hm.put("testing", "testing4");               // same

		try {
			hm.put(new Integer(null), "126new"); // unique
			assert (false);
		} catch (NumberFormatException e) {
			assert (true);
		}
		hm.put(new Integer(126), "126new"); // unique

		hm.put(Integer.valueOf(126), "126"); // identical
		hm.put(Integer.valueOf("126"), "126"); // identical

		hm.put(Integer.valueOf(127), "127"); // identical
		hm.put(Integer.valueOf("127", 10), "127"); // identical

		hm.put(Integer.valueOf(128), "128"); // unique
		hm.put(Integer.valueOf(128), "128"); // unique

		hm.put(Integer.valueOf(-128), "-128"); // identical
		hm.put(Integer.valueOf("-128", 10), "-128"); // identical

		hm.put(Integer.valueOf(-129), "-129"); // unique
		hm.put(Integer.valueOf(-129), "-129"); // unique

		hm.put(Double.valueOf(3), "3.0"); // unique
		hm.put(Double.valueOf(3), "3.0"); // unique

		hm.put(Boolean.TRUE, "true1"); // same
		hm.put(Boolean.valueOf(true), "true2"); // same
		hm.put(new Boolean(true), "true3"); // unique
		hm.put(Boolean.FALSE, "false1"); // same
		hm.put(Boolean.valueOf("adfadf"), "False"); // same

		hm.put(new String("testing"), "testing1");
		hm.put("testing", "testing2");
		e0 = null;
		for (Entry<Object, Object> e : hm.entrySet()) {
			System.out.println(e.toString() + ":" + e.equals(e0));
			e0 = e;
		}
		System.out.println(hm.size());
		assert (hm.size() == 9);

		System.out.println("testIdentity OK");
	}

	private static void testPerformance() {
		// initial JavaScript Map object test BH 2020.03.07 
		
		
		// compile-time java.util.Map.USE_SIMPLE determines whether optimization is on or not.
		
		testMapReverseOrder(1, false, false);
		testMapReverseOrder(10, false, false);
		testMapReverseOrder(100, false, false);
//
//		
		testMap(1, false, false);
		testMap(10, false, false);
		testMap(100, false, false);

		
		// testing for Map.entrySet();
		
		testMap(10, false, false);
		testMap(10, true, false);

		// testing for containsValue();

		testMap(1, false, true);

		System.out.println("testPerformance done");

		// See dev/mapests.xls for an analysis made 2020.03.07
			

	}

	private static void testMethods() {
		System.out.println("testing merge");
		Map<String,String> maps;
		maps = new HashMap<>();
		maps.put("test",  "It is");
		maps.put("test2",  "It was");
		maps.merge("test",  " OK", String::concat);
		showMap(maps, "test should be It is OK");
		assert(maps.get("test").equals("It is OK"));

		maps = new Hashtable<>();
		maps.put("test",  "It is");
		maps.put("test2",  "It was");
		maps.merge("test2",  " OK", String::concat);
		showMap(maps, "test2 should be It was OK");
		assert(maps.get("test2").equals("It was OK"));

		maps.clear();

		testHashMap(new LinkedHashMap<Object, Object>(), true);
		testHashMap(new Hashtable<Object, Object>(), true);
		testHashMap(new HashMap<Object, Object>(), true);
		
		testHashMap(new LinkedHashMap<Object, Object>(), false);
		testHashMap(new Hashtable<Object, Object>(), false);
		testHashMap(new HashMap<Object, Object>(), false);

		System.out.println("testMethods OK");
	}

	private static void testHashMap(Map<Object, Object> map, boolean asJava) {

		// iterator test
		
		map.put("test", "here");
		map.put("test5", 5);
		
		assert (map.get("test") == "here");

		for (Object e : map.keySet()) {
			System.out.println(e);
		}

		Iterator<Object> iter = map.keySet().iterator();
		while (iter.hasNext()) {
			System.out.println(iter.next());
		}

		for (Map.Entry<Object, Object> e : map.entrySet()) {
			System.out.println(e.getKey() + ":" + e.getValue());
		}
		
		map.clear();

		// array key test
		int[] aa = new int[] {1,2,3};
		int[] ab = new int[] {1,2,3};
		int[] bb = new int[] {4,5,6};
		map.put(aa,  "123aa");
		map.put(ab,  "123ab");
		map.put(bb,  "456bb");
		map.put(Integer.valueOf(3), "3");
		map.put(Integer.valueOf(3), "3");
		map.put(Integer.valueOf(3), "3");
		map.put(new Integer(3), "3");
		map.put(new Integer(3), "3");
		map.put(new Integer(3), "3");
		try {
		map.put(null,  "null");
		assert (!map.getClass().getSimpleName().equals("Hashtable"));
		} catch (NullPointerException e) {
			assert (map.getClass().getSimpleName().equals("Hashtable"));
			map.put("null",  "null");
		}
		Object[] oa = new Object[] {"test", "here"};
		Object[] ob = new Object[] {"test", "here"};
		for (Map.Entry<Object, Object> e : map.entrySet()) {
			System.out.println(e.getKey() + ":" + e.getValue());
		}
		map.put(oa,  "oa");
		map.put(ob,  "ob");
		for (Map.Entry<Object, Object> e : map.entrySet()) {
			System.out.println(e.getKey() + ":" + e.getValue());
		}
	
//		System.out.println(Arrays.hashCode(aa) + " " + Arrays.hashCode(ab) + " " + Arrays.equals(aa, ab));
//		System.out.println(oa.hashCode() + " " + ob.hashCode() + " " + oa.equals(ob));
//		System.out.println(aa.hashCode() + " " + ab.hashCode() + " " + aa.equals(ab));
		System.out.println(map.size());
		assert(map.size() == 7);
		assert(map.put(new int[] {1,2,3}, "ac") == null);
		System.out.println(map.size());
		assert(map.size() == 8);
		
		
		// test that after clearing, we are back to a simple map.
		
		map.clear();
		map.put("aa", "atest");
		map.put("bb", "btest");
		map.put("aa", "atest2");
		assert(map.size() == 2);
		
		map.clear();
		
		showMap(map, "after clear");

		System.out.println("testing null value put");
		map.put("test", "here");
		map.put("test5", 5);
		System.out.println(map.size());
		try {
			map.put("test", null);
			assert (!map.getClass().getSimpleName().equals("Hashtable"));
			System.out.println(map.size());
			assert (map.size() == 2);
			map.put("test3", null);
			assert (map.size() == 3);
		} catch (Exception e) {
			assert (map.getClass().getSimpleName().equals("Hashtable"));
		}

		showMap(map, "before putifabsent");

		map.putIfAbsent("test3", "ok");
		String s = map.size() + " " + map.get("test3");
		System.out.println(s);
		assert (s.equals("3 ok"));
		map.putIfAbsent("test3", "not OK");
		s = map.size() + " " + map.get("test3");
		System.out.println(s);
		assert (s.equals("3 ok"));

		showMap(map, "before spliterator");
		
		System.out.println("testing spliterator");
		Consumer<? super Object> action = new Consumer<Object>() {

			@Override
			public void accept(Object key) {
				System.out.println("spliterator key=" + key);
			}
			
		};
			map.keySet().spliterator().forEachRemaining(action );

		Spliterator<Object> sp = map.keySet().spliterator();
		System.out.println(sp.tryAdvance(action));
		System.out.println(sp.tryAdvance(action));
		System.out.println(sp.tryAdvance(action));
		Spliterator<Entry<Object, Object>> spe = map.entrySet().spliterator();
		Consumer<? super Entry<Object, Object>> actione = new Consumer<Entry<Object, Object>>() {

			@Override
			public void accept(Entry<Object, Object> t) {
				System.out.println("Spliterator: " + t.getKey() + ":" + t.getValue());
				
			}

			
		};
		spe.forEachRemaining(actione);

		showMap(map, "after spliterator");

		map.clear();
		showMap(map, "cleared");
		map.put("testing", "tsting");
		map.put("testing2", "tsting2");
		showMap(map, "");
		if (asJava) {
			map.put(Integer.valueOf(3), "3");
			map.remove(Integer.valueOf(3));
		}


		showMap(map, "after Integer key");
		
		map.clear();
		
		// remove,replace test
		map.put("testing", "tsting");
		map.put("testing2", "tsting2");
		map.put("testing3", "tsting3");
		map.put("stest", "stest1");
		assert(map.remove("testing3", "tsting3"));
		assert(!map.remove("stest", "ok"));
		assert(map.replace("testing","action").equals("tsting"));
		assert(map.get("testing").equals("action"));
		
		showMap(map, "after remove/replace");

		map.clear();
		map.put("testing", "tsting");
		map.put("testing2", "tsting2");
		map.put("testing3", "tsting3");
		map.put("stest", "stest1");
		showMap(map, "");

		BiFunction<? super Object, ? super Object, ? extends Object> f = new BiFunction() {

			@Override
			public Object apply(Object t, Object u) {
				return "" + t + " " + u;
			}

		};
		map.compute("testing", f);
		showMap(map, "compute");
		Function<? super Object, ? extends Object> mappingFunction = new Function() {

			@Override
			public Object apply(Object t) {
				return "mapped " + t;
			}

		};
		assert (map.computeIfAbsent("here", mappingFunction).equals("mapped here"));
		showMap(map, "computeIfAbsent");
		assert (map.computeIfAbsent("here", mappingFunction).equals("mapped here"));
		showMap(map, "computeIfAbsent");
		BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction = new BiFunction() {

			@Override
			public Object apply(Object t, Object u) {
				return null;
			}

		};
		assert (map.computeIfPresent("here", remappingFunction) == null);
		assert (map.computeIfPresent("testing2", f).equals("testing2 tsting2"));
		showMap(map, "computeIfPresent");

		assert (map.replace("testing2", "testing2 tsting2", "reset"));
		showMap(map, "replace found");

		assert (!map.replace("testing2", "testing2 tsting2", "reset"));
		showMap(map, "replace not found");

		BiConsumer<? super Object, ? super Object> action1 = new BiConsumer() {

			@Override
			public void accept(Object key, Object val) {
				System.out.println("key=" + key + "\tvalue=" + val);
			}
		};

		map.forEach(action1);

		System.out.println("testing getOrDefault");
		assert (map.getOrDefault("stest", "stest2").equals("stest1"));
		assert (map.getOrDefault("stest2", "stest2").equals("stest2"));

	    Map<String,Object>map2 = new Hashtable<>();
	    map2.put("item1", 1.5000000);
	    map2.put("item2", 2);
	    map.putAll(map2);
		showMap(map, "putall");
		assert(map.get("item1").toString().equals("1.5"));
		assert(map.get("item2").toString().equals("2"));

		showMap(map, "testHashMap done");
		System.out.println("");
	}

	private static void showMap(Map<?, ?> map, String msg) {
		System.out.println("===" + msg);
		System.out.println(/** @j2sNative map.秘m || */"");
		Set<?> ks = map.keySet();
		for (Object key : ks) {
			System.out.println("mapkeySet: " + key + "=" + map.get(key));
		}
		System.out.println(/** @j2sNative map.秘m || */"");
		System.out.println("===" + map.getClass().getName());
	}

	private static void testMap(int nj, boolean checkEntries, boolean checkValues) {
		System.out.println("\n------\nnj=" + nj + "\n------");
		Map<String, Object> hm;		
		hm = new HashMap<>();
		testMapPut(hm, nj);
		testMapGet(hm, nj, checkEntries, checkValues);
//		System.out.println();
//		hm = new LinkedHashMap<>();
//		testMapPut(hm, nj);
//		testMapGet(hm, nj);
		System.out.println();
		hm = new Hashtable<>();
		testMapPut(hm, nj);
		testMapGet(hm, nj, checkEntries, checkValues);
	}

	private static void testMapReverseOrder(int nj, boolean checkEntries, boolean checkValues) {
		System.out.println("\n------\nnj=" + nj + "\n------");
		Map<String, Object> hm;		
		hm = new Hashtable<>();
		testMapPut(hm, nj);
		testMapGet(hm, nj, checkEntries, checkValues);
//		System.out.println();
//		hm = new LinkedHashMap<>();
//		testMapPut(hm, nj);
//		testMapGet(hm, nj);
		System.out.println();
		hm = new HashMap<>();
		testMapPut(hm, nj);
		testMapGet(hm, nj, checkEntries, checkValues);
	}

	private static void testMapPut(Map map, int nj) {
		Long t0 = System.currentTimeMillis();
		int n = 0;
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < nj; j++, n++)
				map.put("" + n, "test" + n);
		}
		System.out.println("" + (System.currentTimeMillis() - t0) + "\tput\t" + map.getClass().getSimpleName() + "   \tnj=" + nj + "\tsize=" + map.size());
	}

	private static void testMapGet(Map map, int nj, boolean checkEntries, boolean checkValues) {
		Long t0 = System.currentTimeMillis();
		int n = 10000 * nj;
		long ncheck = 0, nvalues = 0;
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < nj; j++) {
				if (checkValues) {
					boolean b = map.containsValue("test" + --n);
					if (b)
						nvalues++;
//					assert(b);
				} else {
					Object o = map.get("" + --n);
//					assert(/**@j2sNative 1?o == "test" + n:*/o.equals("test"+n));
				}
				if (checkEntries) {
					ncheck += map.entrySet().size();
				}
			}
		}
		System.out.println("" + (System.currentTimeMillis() - t0) 
				+ (checkValues ? "\tcontainsValue\t" : "\tget\t") + map.getClass().getSimpleName() + "   \tnj=" + nj + "\tsize=" + map.size() + "\tentrychecks=" + ncheck + "\tvaluechecks=" + nvalues);
	}


}