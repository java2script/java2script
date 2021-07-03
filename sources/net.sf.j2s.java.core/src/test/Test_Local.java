package test;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Check for proper final references for anonymous subclasses of local nonanonymous classes.
 * Check for proper final references for streams (where this issue was found). 
 * 
 * @author hansonr
 *
 */
public abstract class Test_Local extends Test_ {

	static int nn = 0;

	static abstract class Test_Local1 {

		int a, b;

		Test_Local1(int a, int b) {
			this.a = a * -(++nn);
			this.b = b * -(++nn);
			System.out.println("Test_Local1 a=" + a + " " + " b=" + b);
		}

		abstract int showN(int n);

		abstract Stream<String[]> splitStream();

		public void testMe() {
			System.out.println("Test_Local1 testme a+b=" + (a + b));
		}
	}

	static Test_Local1 newLocal1(int a, int b, String testing, Stream<String> x) {
		int c = a + b;

		class ReducingSink extends Test_Local1 {

			ReducingSink() {
				super(5, 6);
			}

			@Override
			public void testMe() {
				System.out.println(" testMe c=" + c);
				super.testMe();
			}

			@Override
			Stream<String[]> splitStream() {
				check(x);
				return x.map(line -> line.split("t"));
			}

			private void check(Stream<String> x) {
				System.out.println("check x is " + x);

			}

			@Override
			int showN(int n) {
				System.out.println(" showN a=" + a + " b=" + b + " c=" + c + " n=" + n);
				return c;
			}

		}
//		var xx=Clazz.new_($I$(2,1), [this, {c: c, x: x}],P$.Test_Local$1ReducingSink);
//		var yy=((P$.Test_Local$1||
//				(function(){/*type=a*/var C$=Clazz.newClass(P$, 
//		               "Test_Local$1", 
//               		function(){Clazz.newInstance(this, arguments[0],1,C$);}, 
//		                Clazz.load('test.Test_Local$1ReducingSink'), null, 1);
//
//				C$.$clinit$=1;
//...
//				return this.$finals$.c;
//				});
//				})()
//				), Clazz.new_($I$(3,1), [this, {c: c}],P$.Test_Local$1));

//		var yy=((P$.Test_Local$1||
//				(function(){/*type=a*/var C$=Clazz.newClass(P$, "Test_Local$1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('test.Test_Local$1ReducingSink'), null, 1);
//
//				C$.$clinit$=1;
//...
//				System.out.println$S(" showN c=" + this.$finals$.c + " n=" + n );
//				return this.$finals$.c;
//				});
//				})()
//				), Clazz.new_($I$(2,1), [this, {c: c}],P$.Test_Local$1));

		//				var xx=Clazz.new_($I$(3,1), [this, {c: c, x: x}],P$.Test_Local$1ReducingSink);

		// was ok: ReducingSink xx = new ReducingSink();
		
		// was missing x:
		ReducingSink yy = new ReducingSink() {
			
			@Override
			int showN(int n) {
				super.showN(n);
				System.out.println(" showN c=" + c + " n=" + n);
				return c;
			}
		};


		return yy;
	}

	public static void main(String[] args) {

		Runnable r2 = () -> System. out.println("Hello world two!");
		BufferedReader lookupReader = new BufferedReader(new StringReader("testing\n1t1\n2t2\n3t3"));

		Stream<String> x = lookupReader.lines();

		Test_Local1 tl1 = newLocal1(3, 7, "This is a test", x);
		assert (tl1.showN(20) == 10);
		tl1.testMe();
		assert(tl1.a == -5);
		System.out.println(tl1.splitStream().collect(Collectors.toList()).get(2)[1]);

		lookupReader = new BufferedReader(new StringReader("testing\n4t4\n5t5\n6t6"));

        x = lookupReader.lines();
        Stream<String[]> y = x.map(line -> line.split("t"));
        Collector<String[], ?, Map<String, String>> z = Collectors.toMap(
   				split -> split[0], 
   				split -> split[1]); 
        Map<String, String> rawMap = y.collect(z);
        System.out.println(rawMap.entrySet().toString());
        assert(rawMap.entrySet().size() == 4);
		Test_Local1 tl2 = newLocal1(30, 70, "This is another test", x);
		assert (tl2.showN(80) == 100);
		tl2.testMe();
		assert(tl2.a == -15);
		assert (tl1.showN(20) == 10);
		tl1.testMe();
		assert(tl1.a == -5);

		System.out.println("Test_Local OK");

	}

}