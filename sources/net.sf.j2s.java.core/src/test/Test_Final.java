package test;

import java.util.function.Consumer;
import java.util.function.Function;

public class Test_Final extends Test_ {

	public static void testExec() {
		String s = "final";
		Runnable r = () -> {
			for (int k = 0; k < 5; k++) {
				int i = k;
				String t = s;
				Runnable rr = () -> {
					System.out.println(i + t);
				};
				rr.run();
			}
		};
		r.run();
	}


	public final void flatMapToDouble(Function<String, Void> mapper) {
		// We can do better than this, by polling cancellationRequested when stream is
		// infinite
		sayOK(new Consumer<String>() {
			@Override
			public void accept(String u) {
				(new Runnable() {

					@Override
					public void run() {
						mapper.apply(u);
					}

				}).run();
			}
		});

		sayOK((t) -> {
				(new Runnable() {

					@Override
					public void run() {
						mapper.apply(t);
					}

				}).run();
		});


		
		
		
		sayOK((u) -> {
			(new Runnable() {

				@Override
				public void run() {
					mapper.apply(u);
				}

			}).run();
		});

	}


	private void sayOK(Consumer<String> consumer) {
		consumer.accept("ok");
	}
	


	public static void testExec2() {
		String s = "final";
		Runnable r = new Runnable() {

			@Override
			public void run() {
				for (int k = 0; k < 5; k++) {
					final int i = k;
					final String t = s;
					Runnable rr = new Runnable() {

						@Override
						public void run() {
							System.out.println(i + t);
						}
					};
					rr.run();
				}
			}
		};
		r.run();
	}

	// This one should not be removed
	public static final Object UNINITIALIZED_VALUE = "uninitializedValue";

	public String finalStr2 = "?";
	public static int TEST = 0;

	public Test_Final(int i) {
		String finalStr = "testing" + TEST++;
		finalStr2 += "?";
		Test_Extends_8 t = new Test_Extends_8b() {
			public void test8() {
				System.out.println("anon Test_8 finalStr is " + finalStr + " " + finalStr2);

//				assert(finalStr.equals("testing" + i) && finalStr2.equals("??"));
			}
		};
		t.test8();
	}

	public Test_Final() {
	}


	public static void main(String[] args) {

		new Test_Final().flatMapToDouble((t) -> {
			System.out.println("this is t " + t);
			return null;
		});
		testExec();
		testExec2();


		ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_Final$1", true);
		new Test_Final(0); // anon Test_8 finalStr is 0 ??
		new Test_Final(1); // anon Test_8 finalStr is 1 ??
		new Test_Final(2); // anon Test_8 finalStr is 2 ??
		new Test_Final(3); // anon Test_8 finalStr is 3 ??
		new Test_Final(4); // anon Test_8 finalStr is 4 ??
		new Test_Final(5); // anon Test_8 finalStr is 5 ??
		System.out.println("Test_Final OK");
	}
}
