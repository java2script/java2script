package test;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

import test.baeldung.doublecolon.Computer;
import test.baeldung.doublecolon.MacbookPro;


public class Test_Java8 extends Test_ implements PropertyChangeListener { 

	
	public Test_Java8() {
		System.out.println("null constructor");
	}
	
	public Test_Java8(String s) {
		System.out.println("new Test_Java8(" + s + ")");
	}
	
	public static void test() {
		
	}
	
	enum E {
		E1, E2;
	}
	int test1 = 1;  

	void testP1() {
    	class MyPredicate implements Predicate<String> {

			@Override
			public boolean test(String t) {
				// TODO Auto-generated method stub
				return false;
			}
    		
			MyPredicate(String s) {
				
			}
    	}
    	MyPredicate x = new MyPredicate("xx");
    	Consumer<String> c = MyPredicate::new;
    	
    	class MyPredicateA implements Predicate<String> {

			@Override
			public boolean test(String t) {
				// TODO Auto-generated method stub
				return false;
			}
    		
    	}

	}
	
	void testP2() {
    	class MyPredicate implements Predicate<String> {

			@Override
			public boolean test(String t) {
				// TODO Auto-generated method stub
				return false;
			}
    		
			MyPredicate(String s) {
				
			}
    	}
    	MyPredicate x = new MyPredicate("xx");
    	Consumer<String> c = MyPredicate::new;
	}

    Object test2(Object o) {
		System.out.println("test1 is " + test1 + " " + o);
		return o;
	}; 

	static int test1s = 2;
	
    static Integer test2is(Integer i) {
		System.out.println("test1s is " + test1s + " " + i);
		return i;
	};

    Integer test2i(Integer i) {
		System.out.println("test1 is " + test1 + " " + i);
		return i;
	};

	public static boolean isMoreThanFifty(int n1, int n2) {
		System.out.println("testing " + n1 + " + " + n2 +" is more than 50");
		return (n1 + n2) > 50;
	}

	public static List<Integer> findNumbers(List<Integer> l, BiPredicate<Integer, Integer> p) {
		List<Integer> newList = new ArrayList<>();
		for (Integer i : l) {
			System.out.println("testing " + i + " for i + (i + 10) > 50");
			if (p.test(i, i + 10)) {
				System.out.println("OK for " + i);
				newList.add(i);
			}
		} 
		return newList; 
	}

	@FunctionalInterface
	public interface ITest {
	    Test_Java8 c(Object o); 
	}
	 
    public  Predicate<String> makeRef(Predicate<String> predicate) {
    	class MyPredicate implements Predicate<String> {

			@Override
			public boolean test(String t) {
				// TODO Auto-generated method stub
				return false;
			}
    		
			MyPredicate(String s) {
				
			}
    	}
    	MyPredicate x = new MyPredicate("xx");
    	Consumer<String> c = MyPredicate::new;
    	return x;
    }


    public static void main(String[] args) {


		Function<String,Test_Java8> iaCreator2= Test_Java8::new;
		iaCreator2.apply("testNew");
		

		Comparator comp = Comparator.naturalOrder();

	    new Test_Java8().propertyChange(null); // checking for nonqualified
		
		ITest t = new ITest() {
			@Override
			public Test_Java8 c(Object o) {
				return new Test_Java8(o + "??");
			}			
		}; 
		Test_Java8 test = t.c("new");
				
		System.out.println("what is test?? " + test);
		
	   	
		
		System.out.println("E.E1 is " + E.E1);
		

		
		final String function = "function=" + new Date();
		
		
// Function
	
		int[][][] a; 

		Function<Integer, int[][][]> ifi = new Function<Integer, int[][][]>() {
			
			@Override
			public int[][][] apply(Integer t) {
				System.out.println(function);
				return new int[t.intValue()][][]; 
			}
		};
		a = ifi.apply(5); 
		System.out.println("a length is " + a.length);
		
	    a = (new Function<Integer, int[][][]>() {
			@Override
			public int[][][] apply(Integer t) {
				return new int[t.intValue()][][];
			}
		}).apply(6); 
		System.out.println("a.length is " + a.length); 
		
//	    // Lambda_C
	   
	    Function<Integer, int[][][]> iaCreator = int[][][]::new;
		a = iaCreator.apply(7);
		System.out.println("a.length is " + a.length);

		
		Consumer<String> c = s -> System.out.println(s);
		c.accept("testingPointer");

		c = System.out::println; 
		c.accept("testingDoubleColon");

    Function<Integer, Integer> f2 = Test_Java8::test2is;
    f2.apply(new Integer(3));
    
		Function<Integer, Integer> f1 = new Test_Java8("for f1")::test2i;
		f1.apply(new Integer(3));

		Function<Consumer<String>, ?> f = new Test_Java8("for f")::test2;		
		f.apply(c);

		
		
		
		Test_Java8 t8 = new Test_Java8("new8");
		f = t8::test2;
		f.apply(c);
		f.apply(System.out::println);

		// lambda_M
		
		Computer c1 = new Computer(2015, "white", 100);
		Computer c2 = new MacbookPro(2009, "black", 100);
		List<Computer> inventory = Arrays.asList(c1, c2);
		
		inventory.forEach(System.out::println); // works because System.out.println(Object) exists
		
		// note that YOU CANNOT HAVE BOTH  static Computer.turnOnPc(Object) and computer.turnOnPc()
		// so it should be sufficient to call one or the other:
		// Computer.turnOnPc$Computer.apply(x)
		// or 
		// Computer.prototype.turnOnPc$.apply()
		
		inventory.forEach(Computer::turnOnPc); // works because c.turnOnPc() exists
		inventory.forEach(Computer::turnOffPcStatic); // works because Computer.turnOffPcStatic(Computer) exists


		
		// x -> y()  lambda_E

		Function<Integer, String> f3 = i -> Integer.toHexString(i);
		System.out.println("testing->"+ f3.apply(new Integer(300)));


		
		
		List<Integer> list = new ArrayList<Integer>();
		list.add(Integer.valueOf(1));
		list.add(Integer.valueOf(2));
		list.add(Integer.valueOf(4));
		list.add(Integer.valueOf(30));
		list.add(Integer.valueOf(50));
		System.out.println("list size is " + list.size());

		int i3 = 25;

		BiPredicate<Integer, Integer> bp = (i1, i2) -> i1 + i2 > i3;

		Predicate<Integer> bpi = i1 -> i1 > i3;
		
		int i = 3;
		
		//list.stream().allMatch(i -> i > i3);

		System.out.println("list size is " + list.size());
		System.out.println("list matches? " + list.stream().allMatch(bpi));


		new Runnable() {

			@Override
			public void run() {

				System.out.println("cutoff is " + i);
				
				System.out.println("list matches? " + list.stream().allMatch(i -> i > i3));

			}
			
			
		}.run();

		List<Integer> newList = findNumbers(list, bp);
		
		System.out.println("list size is now " + newList.size());
		assert(newList.size() == 2);

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

		
		System.out.println("Test_Java8 OK");
	}
	
	

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		// checking here that this is not qualified	
	}
}
