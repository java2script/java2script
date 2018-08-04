package test;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;

import test.baeldung.doublecolon.Computer;
import test.baeldung.doublecolon.MacbookPro;

public class Test_Java8 extends Test_ implements PropertyChangeListener { 

	public static void test() {
		
	}
	
	enum E {
		E1, E2;
	}
	int test1 = 1; 
	
    Object test2(Object o) {
		System.out.println("test1 is " + test1 + " " + o);
		return o;
	};

	public static boolean isMoreThanFifty(int n1, int n2) {
		return (n1 + n2) > 50;
	}

	public static List<Integer> findNumbers(List<Integer> l, BiPredicate<Integer, Integer> p) {
		List<Integer> newList = new ArrayList<>();
		for (Integer i : l) {
			if (p.test(i, i + 10)) {
				newList.add(i);
			}
		} 
		return newList; 
	}

	public Test_Java8() {System.out.println("null constructor");}
	public Test_Java8(Object o) {System.out.println("o is " + o);}
	
	@FunctionalInterface
	public interface ITest {
	    Test_Java8 c(Object o);
	}
	 
	public static void main(String[] args) {
		
	    Comparator comp = Comparator.naturalOrder();
		
		
		System.out.println("E.E1 is " + E.E1);
		
		final String function = "" + new Date();
		
		int[][][] x = new int[5][][];
		Function<Integer, int[][][]> ifi = new Function<Integer, int[][][]>() {
			
			@Override
			public int[][][] apply(Integer t) {
				System.out.println(function);
				return new int[t.intValue()][][]; 
			}
		};
		int[][][] a = ifi.apply(5); 
		
	    a = (new Function<Integer, int[][][]>() {
			@Override
			public int[][][] apply(Integer t) {
				return new int[t.intValue()][][];
			}
		}).apply(5); 

	    Function<Integer, int[][][]> iaCreator = int[][][]::new;
		a = iaCreator.apply(5); 
		System.out.println("a.length is " + a.length);
		Test_Java8[] atest = new Test_Java8[5];
		// following format only works for 
		Function<Object,Test_Java8> iaCreator2= Test_Java8::new;
		
		ITest t;
		t = Test_Java8::new;
		t = new ITest() {
			@Override
			public Test_Java8 c(Object o) {
				return new Test_Java8(o + "??");
			}			
		};
		Test_Java8 test = t.c("new");
				
		System.out.println("what is test? " + test);
		Consumer<String> c = s -> System.out.println(s);
		c = System.out::println; 
		c.accept("testing");

		
		
		Function<Consumer<String>, ?> f = new Test_Java8(null)::test2;
		// Q: where is the object in this expression? test.test2.apply(test, [args])
		f.apply(c); 

		Test_Java8 t8 = new Test_Java8("new8");
		f = t8::test2;
		f.apply(c);
		
		t8.propertyChange(null); // checking for nonqualified
				
		List<Integer> list = new ArrayList<Integer>();
		list.add(Integer.valueOf(30));
		list.add(Integer.valueOf(50));

		BiPredicate<Integer, Integer> bp = (i1, i2) -> i1.intValue() > 3;

		System.out.println(findNumbers(list, bp).size());

		long j = 1;
		int i = 3;
		j &= ~(1L << i);
		j = 1L << i;
		j = 1L << 3;
		j &= 1L << i;
		j = ~i;
		j = ~(1L << i);

		System.out.println("=== RunnableTest ===");

		// Anonymous Runnable 
		Runnable r1 = new Runnable() {

			@Override
			public void run() {
				System.out.println("Hello world one!");
			}
		};

		// Lambda Runnable
		Runnable r2 = () -> System.out.println("Hello world two!");

		// Run em!
		r1.run();
		r2.run();

		
		Computer c1 = new Computer(2015, "white", 100);
		Computer c2 = new MacbookPro(2009, "black", 100);
		List<Computer> inventory = Arrays.asList(c1, c2);
		inventory.forEach(System.out::println);
		inventory.forEach(Computer::turnOnPc);
		inventory.forEach(Computer::turnOffPcStatic);
		System.out.println("Test_Java8 OK");
	}
	
	

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		// checking here that this is not qualified	
	}
}
