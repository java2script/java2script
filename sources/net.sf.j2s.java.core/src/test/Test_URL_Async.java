package test;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.function.Function;

public class Test_URL_Async extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {
		if (!isBatch && (/** @j2sNative true || */
		false)) {
			try {
				new URL("https://stolaf.edu/people/hansonr").getBytesAsync(new Function<byte[], Void>() {

					@Override
					public Void apply(byte[] b) {
						System.out.println("async response length " + (b == null ? 0 : b.length));
						return null;
					}

				});
			} catch (MalformedURLException e3) {
			}
		}
		System.out.println("Test_URL_Async.main complete");
	}

}