package test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.net.UnknownHostException;

import javax.net.ssl.HttpsURLConnection;

import javajs.http.HttpClient;
import javajs.http.HttpClient.HttpRequest;
import javajs.http.HttpClient.HttpResponse;
import javajs.http.HttpClientFactory;

/** A JavaScript-only class */

public class Test_HTTP extends Test_ {

	static {
		/** @j2sNative 
		J2S.addDirectDatabaseCall("www.compbio.dundee.ac.uk/slivka");
		
		J2S.addDirectDatabaseCall("httpstat.us");

		 */

	}
	@SuppressWarnings("unused")
	public static void main(String[] args) {

		HttpClient client = HttpClientFactory.getClient(null);
		HttpRequest req = null;

		System.out.println("Testing httpstat 201");
		
		try {
			URL url = new URL("http://httpstat.us/201");
			HttpURLConnection c = (HttpURLConnection) url.openConnection();
			int code = c.getResponseCode();
			System.out.println("httpstat.us reports " + code);
			InputStream oi = url.openStream();
			String s = new String(oi.readAllBytes());
			System.out.println("httpstat.us reports " + s);
		} catch (IOException e) {
			System.out.println(e);
		}


		System.out.println("Testing unknown host");

		try {
			URL url = new URL("https://www.compbiolivka/api/services");
			HttpURLConnection c = (HttpURLConnection) url.openConnection();
			int code = c.getResponseCode();
			InputStream oi = url.openStream();
		} catch (IOException e) {
			assert(e instanceof UnknownHostException);
		}
		

		System.out.println("Testing sync GET");
		
		try {
			req = javajs.http.SimpleHttpClient.createRequest(client, "get",
					"https://www.compbio.dundee.ac.uk/slivka/api/services");
			System.out.println(req.getUri());
			showResponse(req.execute());

		} catch (IOException e) {
			System.err.println(e);
		}

		System.out.println("Testing async GET");
		doAsync("async GET", req);

		
		System.out.println("Testing sync POST");
		
		try {
			req = javajs.http.SimpleHttpClient.createRequest(client, "post",
					"https://www.compbio.dundee.ac.uk/slivka/api/services/example");
			String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";
			req.addFilePart("input-file", new ByteArrayInputStream(json.getBytes()));
			req.addFormPart("content", "len:11 long");
			System.out.println(req.getUri());
			showResponse(req.execute());
		} catch (IOException e) {
			System.err.println(e);
		}
		
		
		System.out.println("Testing sync PUT");
		
		try {
			req = javajs.http.SimpleHttpClient.createRequest(client, "put",
					"https://www.compbio.dundee.ac.uk/slivka/api/services/example");
			String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";
			req.addFilePart("input-file", new ByteArrayInputStream(json.getBytes()));
			req.addFormPart("content", "len:11 long");
			System.out.println(req.getUri());
			showResponse(req.execute());
		} catch (IOException e) {
			System.err.println(e);
		}
		
		
		System.out.println("Testing async PUT, reuse of req");
		
		req.addFormPart("testing", "here");
		doAsync("async PUT", req);
	}

	private static void doAsync(String msg, HttpRequest req) {
		req.executeAsync((resp) -> {
			System.out.println(msg + " returned SUCCESS:");
		}, (resp, e) -> {
			System.out.println(msg + " returned FAILED: " + e);
		}, (resp, e) -> {
			showResponse(resp);
		});
		System.out.println(msg + " submitted...");
	}

	private static void showResponse(HttpResponse resp) {
		System.out.println(resp);
		if (resp.getStatusCode() < 400) {
			try {
				System.out.println(resp.getText().replace('\n', ' '));
			} catch (IOException e) {
				System.err.println(e);
			}
		}
	}

}
