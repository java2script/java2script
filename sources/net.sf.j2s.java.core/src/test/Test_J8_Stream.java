package test;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.PrimitiveIterator;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.function.IntConsumer;
import java.util.stream.IntStream;
import java.util.stream.StreamSupport;

public class Test_J8_Stream extends Test_ {

	public static void main(String[] args) {

		// http://www.javainuse.com/java/java8_method_References

		List<String> myList = Arrays.asList("b1", "a2", "a1", "c2", "c1");

		System.out.println("\n\n------- stream().map().forEach() using lambda expressions -------");
		myList.stream().map(s -> s.toUpperCase()).forEach(s -> System.out.print(s + " "));

		System.out.println("\n\n------- stream().map().sorted().forEach() using Class::method method reference --------");
		myList.stream().map(String::toUpperCase).sorted().forEach(System.out::print);

		// https://winterbe.com/posts/2014/07/31/java8-stream-tutorial-examples/

		System.out.println("\n\n------- stream().filter().map().sorted().forEach() --------");
		myList.stream()
			.filter(s -> s.startsWith("c"))
			.map(String::toUpperCase)
			.sorted()
			.forEach(System.out::print);
		System.out.println("\n");

		
		
		
		
		
		System.out.println("\n\n------- chars().mapToObj().forEach() --------");


		"test".chars().mapToObj(i -> (char)i).forEach(System.out::print);
		  
		
		System.out.println("\n");
		
		long n = "testing"
				.chars()
				.count();
		
		  assert(n == 7);

		System.out.println("Test_J8_Stream OK");
	}

	private String test;

	public Test_J8_Stream(String test) {
		this.test = test;
	}
//    public IntStream chars() {
//        class CharIterator implements PrimitiveIterator.OfInt {
//            int cur = 0;
//
//            public boolean hasNext() {
//                return cur < length();
//            }
//
//            public int nextInt() {
//                if (hasNext()) {
//                    return charAt(cur++);
//                } else {
//                    throw new NoSuchElementException();
//                }
//            }
//
//            @Override
//            public void forEachRemaining(IntConsumer block) {
//                for (; cur < length(); cur++) {
//                    block.accept(charAt(cur));
//                }
//            }
//        }
//
//        return StreamSupport.intStream(() ->
//                Spliterators.spliterator(
//                        new CharIterator(),
//                        length(),
//                        Spliterator.ORDERED),
//                Spliterator.SUBSIZED | Spliterator.SIZED | Spliterator.ORDERED,
//                false);
//    }
//
//	public int charAt(int i) {
//		// TODO Auto-generated method stub
//		return test.charAt(i);
//	}
//
//	public int length() {
//		// TODO Auto-generated method stub
//		return test.length();
//	}

}
