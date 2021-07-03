package test;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

class J8_param<T> {
    T elem;
    public T get() {
        return elem;
    }
    
    public void set(T elem) {
        this.elem = elem;
    }
 
    public static <E> E returnSame(E elem) {
    	System.out.println("returnSame elem="+ elem);
        return elem; 
    }
} 

public class Test_J8_Stream extends Test_J8_Stream0 {
	
	public static void main(String[] args) {
				
		
		Test_J8_Stream j8 = new Test_J8_Stream("s3");
		List<Test_J8_Stream> myList1 = new ArrayList<>();
		myList1.add(new Test_J8_Stream("s1"));
		myList1.add(new Test_J8_Stream("s2"));

		System.out.println("\n\n------- stream().map().forEach() using static method reference -------");
		myList1.stream().map(s -> s.toString()).forEach(Test_J8_Stream.outs::println);

		System.out.println("\n\n------- stream().map().forEach() using nonstatic method reference -------");
		myList1.stream().forEach(j8.out::println);

		System.out.println("\n\n------- stream().map().forEach() using static method reference -------");
		myList1.stream().forEach(Test_J8_Stream::test1s);
		myList1.stream().map(s -> s.toString()).forEach(Test_J8_Stream.outs::println);

		System.out.println("\n\n------- stream().map().forEach() using lambda expression s.test1 -------");
		myList1.stream().forEach(s -> s.test1(s.test));

		System.out.println("\n\n------- stream().map().forEach() using super::xxx -------");
		j8.test2(myList1);

		BiConsumer<Integer, String> li = new ArrayList<String>()::add;
		Consumer<String> li2 = new ArrayList<String>()::add;

		Supplier<J8_param<Integer>> obj = J8_param<Integer>::new;
		J8_param<Integer> param = obj.get();
		Consumer<Integer> cc = param::set;
		Supplier<Integer> sup = param::get;

		long n;
		StringBuffer sb = new StringBuffer("test");
		System.out.println("below is 'test'? " + sb);
		sb.chars().mapToObj(i -> (char) i).forEach(System.out::print);
		System.out.println("\nabove is 'test'? " + sb);
		n = sb.chars().count();
		assert (n == 4);

		n = "testing".chars().count();

		assert (n == 7);

//		Function<String, String> func = J8_param::<String>returnSame;

		long millis;

		Map<String, List<String>> map = new HashMap<>();
		map.put("test", Arrays.asList("1", "2", "3", "4"));
		map.put("test2", Arrays.asList("10", "20", "30", "40"));
		map.put("test3", Arrays.asList("100", "200", "300", "400"));

		int maxcounter = 10;
		float ntotal = 0f;
		int ntimes = 10;
		System.out.println("1 stream flatmap");
		for (int j = 0; j < ntimes; j++) {
			millis = System.currentTimeMillis();
			for (int i = 0; i < maxcounter; i++) {
				List<String> someList = map.values().stream().flatMap(c -> c.stream()).collect(Collectors.toList());
//	        System.out.println(someList);
			}
			ntotal += (System.currentTimeMillis() - millis);
		}

		System.out.println("average time " + ntotal/ntimes);
		// http://www.javainuse.com/java/java8_method_References

		List<String> myList = Arrays.asList("b1", "a2", "a1", "c2", "c1");

		System.out.println("\n\n------- stream().map().forEach() using lambda expression System.out -------");
		myList.stream().map(s -> s.toUpperCase()).forEach(s -> System.out.print(s + " "));

		System.out
				.println("\n\n------- stream().map().sorted().forEach() using Class::method method reference --------");
		myList.stream().map(String::toUpperCase).sorted().forEach(System.out::print);

		System.out
				.println("\n\n------- stream().map().sorted().forEach() using Class:: typed method reference --------");
		myList.stream().map(String::toUpperCase).sorted().forEach(J8_param::<String>returnSame);

		// https://winterbe.com/posts/2014/07/31/java8-stream-tutorial-examples/

		System.out.println("\n\n------- stream().filter().map().sorted().forEach() --------");
		myList.stream().filter(s -> s.startsWith("c")).map(String::toUpperCase).sorted().forEach(System.out::print);
		System.out.println("\n");

		System.out.println("\n\n------- chars().mapToObj().forEach() --------");
		"test".chars().mapToObj(i -> (char) i).forEach(System.out::print);
		System.out.println("\n");

		n = "testing".chars().count();

		assert (n == 7);

		System.out.println("Test_J8_Stream OK");
	}

	private PrintStream out = System.out;
	
	private static PrintStream outs = System.out;
	
	public Test_J8_Stream(String test) {
		this.test = test;
	}
	
	public Test_J8_Stream() {
	}
	
	public Test_J8_Stream(String test, Integer index) {
		
	}
	

	public void test1(String msg) {
		BiConsumer<String, Integer> ttsi = Test_J8_Stream::new;
		Consumer<String> ttt = Test_J8_Stream::new; 
		Supplier<Test_J8_Stream> tttt = Test_J8_Stream::new;
		
		System.out.println("Test_J8_Stream test1 " + msg); 
	}

	public static void test1s(Test_J8_Stream s) {
		System.out.println("Test_J8_Stream static test1s " + s.test);
	}

	/**
	 * tests super::xxxx
	 * 
	 * @param myList1
	 */
	private void test2(List<Test_J8_Stream> myList1) {
		super.test3(this);
		myList1.stream().forEach(super::test3); 
	}
}
