package test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

public class Test_J8_Speed extends Test_ {
	
	public static void main(String[] args) {

		long millis = System.currentTimeMillis();
		Map<String, List<String>> map = new HashMap<>();

		for (int i = 0; i < 10000; i++) {
			map.put("testA" + i, Arrays.asList("1", "2", "3", "4"));
			map.put("testB" + i, Arrays.asList("10", "20", "30", "40"));
			map.put("testC" + i, Arrays.asList("100", "200", "300", "400"));
			map.put("testD" + i, Arrays.asList("1000", "2000", "3000", "4000"));
		}
		
		log("#0 for map create ", (-(millis - (millis=System.currentTimeMillis()))));
		List<String> list0 = new ArrayList<>();
		for (Entry<String, List<String>> e : map.entrySet()) {
			List<String> l = e.getValue();
			list0.addAll(l);
		}
		System.out.println(list0.size());
		log("#0 for loop", (-(millis - (millis=System.currentTimeMillis()))));

		list0 = new ArrayList<>();
		for (Entry<String, List<String>> e : map.entrySet()) {
			List<String> l = e.getValue();
			list0.addAll(l);
		}
		System.out.println(list0.size());
		log("#0 for loop", (-(millis - (millis=System.currentTimeMillis()))));

		
		// preload all classes for time test
		List<String> someList = map.values().stream().flatMap(c -> c.stream()).collect(Collectors.toList());
		log("#1 map.values().stream().flatMap(c -> c.stream()).collect(Collectors.toList())", (-(millis - (millis=System.currentTimeMillis()))));

		boolean doProfile = false;
		/**
		 * add profiling of new object creation
		 * 
		 * @j2sNative if (doProfile) Clazz.startProfiling(5, true);
		 * 
		 */
		someList = map.values().stream().flatMap(c -> c.stream()).collect(Collectors.toList());

		log("#2 map.values().stream().flatMap(c -> c.stream()).collect(Collectors.toList())", (-(millis - (millis=System.currentTimeMillis()))));
		
		System.out.println(someList.size());

//		These tests are not particularly relevant. The idea is not
//      to generate functional expressions by the millions. The idea
//      is to USE them with millions of objects.
//
//      It is interesting, though, that in the above construction, there are only 16 objects created. 
//
//		int maxcounter = 1000;
//		float ntotal;
//		int ntimes = 1;
//		long millis;
//
//		log(0, 0);
//
//		ntotal = 0;
//		millis = System.currentTimeMillis();
//		for (int j = 0; j < ntimes; j++) {
//			for (int i = 0; i < maxcounter; i++) {
//				Collection<List<String>> v = map.values();
//			}
//		}
//		ntotal += (System.currentTimeMillis() - millis);
//
//		log(1, ntotal / ntimes);
//
//		millis = System.currentTimeMillis();
//		ntotal = 0;
//		for (int j = 0; j < ntimes; j++) {
//			for (int i = 0; i < maxcounter; i++) {
//				Collection<List<String>> v = map.values();
//				Stream<List<String>> s = v.stream();
//			}
//			ntotal += (System.currentTimeMillis() - millis);
//		}
//
//		log(2, ntotal / ntimes);
//
//		ntotal = 0;
//		millis = System.currentTimeMillis();
//		for (int j = 0; j < ntimes; j++) {
//			for (int i = 0; i < maxcounter; i++) {
//				Collection<List<String>> v = map.values();
//				Stream<List<String>> s = v.stream();
//				Stream<String> fm = s.flatMap(c -> c.stream());
//			}
//			ntotal += (System.currentTimeMillis() - millis);
//		}
//
//		log(3, ntotal / ntimes);
//
//		ntotal = 0;
//		millis = System.currentTimeMillis();
//		for (int j = 0; j < ntimes; j++) {
//			for (int i = 0; i < maxcounter; i++) {
//				Collection<List<String>> v = map.values();
//				Stream<List<String>> s = v.stream();
//				Stream<String> fm = s.flatMap(c -> c.stream());
//				Collector<String, ?, List<String>> list = Collectors.toList();
//			}
//			ntotal += (System.currentTimeMillis() - millis);
//		}
//
//		log(4, ntotal / ntimes);
//
//		ntotal = 0;
//		millis = System.currentTimeMillis();
//		for (int j = 0; j < ntimes; j++) {
//			for (int i = 0; i < maxcounter; i++) {
//				Collection<List<String>> v = map.values();
//				Stream<List<String>> s = v.stream();
//				Stream<String> fm = s.flatMap(c -> c.stream());
//				Collector<String, ?, List<String>> list = Collectors.toList();
//				someList = fm.collect(list);
//			}
//			ntotal += (System.currentTimeMillis() - millis);
//		}
//
//		log(5, ntotal / ntimes);

	}

	private static void log(String msg, long f) {
		System.out.println( msg +" " + f + " ms " + (/**@j2sNative Clazz._newCount + */" objects"));
		/**
		 * @j2sNative Clazz._newCount = 0;
		 * 
		 */
	}
}
