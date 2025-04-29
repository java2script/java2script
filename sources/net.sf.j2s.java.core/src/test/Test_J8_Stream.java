package test;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Spliterator;
import java.util.Spliterator.OfInt;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.IntConsumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

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

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		List<Integer> list = new ArrayList<>();
		list.add(Integer.valueOf(33333));
        Set<Integer> begSymCls = list
                .stream()
                .filter(b -> b == 33333)
                .map(b -> 22322)
                .collect(Collectors.toSet());

		
		
		String st = "test\ning\r\nnow";
		String[] lines = st.split("\n");
		int[] ptr = new int[1];
		long n = 0;
		if (/** @j2sNative true || */
		false) {
			// this is Java 11, so JavaScript-only test here
			String s = "\u0000test";
			assert (s.trim().length() == 4);
			n = (/** @j2sNative s.strip$().length || */0);
			System.out.println("strip gives length " + n);
			assert (n == 5);
			
			Stream<String> o = /** @j2sNative st.lines$() || */
					null;
			if (o != null) {
				Spliterator<String> sp = o.spliterator();
				sp.forEachRemaining(new Consumer<String>() {

					@Override
					public void accept(String value) {
						// in JavaScript, assert does not work in anonymous classes
						System.out.println(ptr[0] + " " + value + " " + lines[ptr[0]].trim());
						doassert(value.equals(lines[ptr[0]++].trim()));
					}

				});
			}
		}

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

		System.out.println("average time " + ntotal / ntimes);
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

		OfInt x = "testing\ntest".chars().spliterator();
		x.tryAdvance(new IntConsumer() {

			@Override
			public void accept(int value) {
				System.out.println(value);
			}

		});

		System.out.println("Test_J8_Stream OK");
	}

	protected static void doassert(boolean ok) {
		assert(ok);
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
