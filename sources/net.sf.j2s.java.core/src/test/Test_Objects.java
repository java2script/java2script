package test;

import java.util.Objects;

class Test_Objects extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		Object x = "";
		Objects.requireNonNull(x);
		if (/** @j2sNative true || */
		false) {
			x = "ok";
			x = Objects.requireNonNullElse(x, "testing");
			assert (x == "ok");
			x = null;
			x = Objects.requireNonNullElse(x, "testing");
			assert (x == "testing");
		}
		System.out.println("Test_Objects OK");
	}

}