package test;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
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
import java.util.function.ToIntFunction;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import javax.swing.JButton;
import javax.swing.SwingUtilities;
import javax.swing.Timer;

import test.baeldung.doublecolon.Computer;
import test.baeldung.doublecolon.MacbookPro;

public class Test_Java8 extends Test_ implements PropertyChangeListener {

	public static int ntest;

	// problem here was that String.class was not triggering use of $$.apply, rather t.apply
	private static Function<Class<?>, Object> x = String.class::cast;

	class TestFunc {

		int val;

		TestFunc() {
			val = ++ntest;
		}

		int getVal() {
			return val;
		}
	}

	public Test_Java8() {
		SwingUtilities.invokeLater(() -> System.out.println("null constructor " + t_test));

		JButton fileButton = new JButton();
		fileButton.addActionListener(this::openFileDialog);		

	}


private	 void openFileDialog(java.awt.event.ActionEvent event) {
		System.out.println("OK");
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

	private Timer timer;

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
		System.out.println("test1 is  " + test1 + " " + o.getClass().getName() + " this is ?? " + this + "??");
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
		System.out.println("testing " + n1 + " + " + n2 + " is more than 50");
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

	public Predicate<String> makeRef(Predicate<String> predicate) {
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

	
	private int timerState = 1;

	private void startTimer(int type) {
//		System.out.println("Timeout starting " + " " + this.t_test + " " + type);
//		switch (type) {
//		case 0:
//			timer = new Timer(100, (e) -> {
//				if (timerState == 1)
//					System.out.println(this.t_test + " " + timer.isRunning());
//				timerState = 0;
//			});
//			break;
//		case 1:
//			Test_Java8 me = this;
//			me.timer = new Timer(100, (e) -> {
//				if (me.timerState == 1)
//					System.out.println(me.t_test + " " + me.timer.isRunning());
//				me.timerState = 0;
//			});
//		case 2:
			ActionListener a = new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					if (timerState == 1)
						System.out.println(Test_Java8.this.t_test + " running");
					else 
						System.out.println(Test_Java8.this.t_test + " was stopped");

					timerState = 0;
				}

			};
			timer = new Timer(100, a);
//			break;
//		}

		timer.setRepeats(false);
		timer.setCoalesce(false);
		SwingUtilities.invokeLater(() -> {
			timer.start();
		});
	}

	private static void checkData(Object data) {
		double[] datae = data instanceof String[] ? Stream.of((String[]) data).mapToDouble(Double::parseDouble).toArray() :
            IntStream.of((int[]) data).mapToDouble(i ->i).toArray();
		System.out.println(Arrays.toString(datae));
		
	}
	
    public DoubleStream values() {
        return IntStream.range(0, 4)
                .mapToDouble(this::get);
    }

	
    public double get(int row) {
        return row;
    }


	private static void testToIntFunction(TestFunc tf, Function<TestFunc, Integer> f) {
		int val = f.apply(tf);
		System.out.println("testToIntFunction =" + val);
	}

	private static void testToIntFunction(Object tf) {
		System.out.println("testToIntFunction = " + tf);
	}

	private static void testFunction(String function, int i) {

		// Function

		int[][][] a;

		Function<Integer, int[][][]> ifi = new Function<Integer, int[][][]>() {

			@Override
			public int[][][] apply(Integer t) {
				System.out.println(function);
				return new int[t.intValue()][][];
			}
		};

		a = ifi.apply(i);
		System.out.println("a length is " + a.length);

	}

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		// checking here that this is not qualified
	}
	
	public static void main(String[] args) {
		
		Test_Java8 t8b = new Test_Java8();
		t8b.t_test = "test0";
		t8b.startTimer(0);
		System.out.println("stopping");
		t8b.timerState = 0;
		Test_Java8 t8a = new Test_Java8();
		t8a.t_test = "test1";
		t8a.startTimer(1);
		Test_Java8 t8c = new Test_Java8();
		t8c.t_test = "test2";
		t8c.startTimer(2);
		
		
		
		
		
		if (true)
			return;
		double[] dd = new Test_Java8().values().toArray();
		int[] data = new int[] {1,2,3,4};
		checkData(data);
		
		double[] datad = IntStream.of(data).mapToDouble(i -> i).toArray();
		System.out.println(Arrays.toString(datad));
		// TODO:  Nodes.flatten issue?
		
		Function<String, Test_Java8> iaCreator2 = Test_Java8::new;
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

		int[][][] a;

		testFunction("function=" + new Date(), 5);
		testFunction("fucntion=new", 6);

		a = (new Function<Integer, int[][][]>() {
			@Override
			public int[][][] apply(Integer t) {
				return new int[t.intValue()][][];
			}
		}).apply(6);
		System.out.println("a.length is " + a.length);

		Function<Integer, int[][][]> iaCreator = int[][][]::new; // Lambda_C
		a = iaCreator.apply(7);
		System.out.println("a.length is " + a.length);

		int i35 = 35;

		ToIntFunction fti = new ToIntFunction() {

			@Override
			public int applyAsInt(Object value) {
				// TODO Auto-generated method stub
				return i35 + Integer.valueOf(value.toString());
			}

		};

		System.out.println("testing ToIntFunction = 1035 ? " + fti.applyAsInt("1000"));

		String tests = "tests"; // Lambda_M
		Consumer<String> c = s -> System.out.println(s + tests);
		c.accept("testingPointer");

		c = System.out::println; // Lambda_F
		c.accept("testingDoubleColon");

		TestFunc[] tfa = new TestFunc[] { new Test_Java8().new TestFunc(), new Test_Java8().new TestFunc(),
				new Test_Java8().new TestFunc() };
		for (int i = 0; i < 3; i++)
			testToIntFunction(tfa[i], val -> val.getVal());

		Function<Integer, Integer> f2 = Test_Java8::test2is; // Lambda_F
		f2.apply(new Integer(3));

		Function<Integer, Integer> f1 = new Test_Java8("for f1")::test2i;
		f1.apply(new Integer(3));

		Function<Consumer<String>, ?> f = new Test_Java8("for f")::test2;
		f.apply(c);

		Test_Java8 t8 = new Test_Java8("new8");
		f = t8::test2;
		f.apply(c);
		for (int i = 0; i < 5; i++)
			f.apply(System.out::println);
		f.apply(System.out::println);

		// lambda_M

		Computer c1 = new Computer(2015, "white", 100);
		Computer c2 = new MacbookPro(2009, "black", 100);
		List<Computer> inventory = Arrays.asList(c1, c2);

		inventory.forEach(System.out::println); // works because System.out.println(Object) exists

		// note that YOU CANNOT HAVE BOTH static Computer.turnOnPc(Object) and
		// computer.turnOnPc()
		// so it should be sufficient to call one or the other:
		// Computer.turnOnPc$Computer.apply(x)
		// or
		// Computer.prototype.turnOnPc$.apply()

		inventory.forEach(Computer::turnOnPc); // works because c.turnOnPc() exists
		inventory.forEach(Computer::turnOffPcStatic); // works because Computer.turnOffPcStatic(Computer) exists

		// x -> y() lambda_E

		Function<Integer, String> f3 = i -> Integer.toHexString(i);
		System.out.println("testing->" + f3.apply(new Integer(300)));

		String test1 = "test";
		Function<String, String> f4 = i -> i + test1;

		System.out.println("testing->" + f4.apply("new"));

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

		// list.stream().allMatch(i -> i > i3);

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
		assert (newList.size() == 2);

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


}
