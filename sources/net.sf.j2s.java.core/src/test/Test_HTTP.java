package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;

import javajs.http.HttpClient;
import javajs.http.HttpClient.HttpRequest;
import javajs.http.HttpClient.HttpResponse;
import javajs.http.HttpClientFactory;

/** A JavaScript-only class */

public class Test_HTTP extends Test_ {

	static {
		/** @j2sNative 

// turn off the relay service

		J2S.addDirectDatabaseCall(".");

		 */

	}

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		try {
			getAPIJson("2023-05-06");
		} catch (IOException e) {
			e.printStackTrace();
		}
		HttpClient client = HttpClientFactory.getClient(null);
		HttpRequest req = null;

		System.out.println("Testing localhost:5000 from 8000");

//		try {
//			URL url = new URL("http://localhost:5000/t.txt");
//			HttpURLConnection c = (HttpURLConnection) url.openConnection();
//			int code = c.getResponseCode();
//			System.out.println("localhost reports " + code);
//			InputStream oi = url.openStream();
//			String s = new String(getBytes(oi));
//			System.out.println("localhost nbytes=" + s.length());
//		} catch (IOException e) {
//			System.out.println(e);
//		}

		System.out.println("Testing httpstat 405");

		try {
			URL url = new URL("http://httpstat.us/405");
			HttpURLConnection c = (HttpURLConnection) url.openConnection();
			int code = c.getResponseCode();
			System.out.println("httpstat.us reports " + code);
			InputStream oi = url.openStream();
			String s = new String(getBytes(oi));
			System.out.println("httpstat.us reports " + s);
		} catch (IOException e) {
			System.out.println(e);
		}

		System.out.println("Testing httpstat 201");

		try {
			URL url = new URL("http://httpstat.us/201");
			HttpURLConnection c = (HttpURLConnection) url.openConnection();
			int code = c.getResponseCode();
			System.out.println("httpstat.us reports " + code);
			InputStream oi = url.openStream();
			String s = new String(getBytes(oi));
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
			assert (e instanceof UnknownHostException);
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

	private static void getAPIJson(String date) throws IOException {
			URL url = new URL("<url here>" + date);
			HttpURLConnection c = (HttpURLConnection) url.openConnection();
			c.addRequestProperty("Authorization", "<code here>");
			int code = c.getResponseCode();
			Map<String, List<String>> header = c.getHeaderFields();
			for (Map.Entry<String, List<String>> e : header.entrySet()) {
				System.out.println(e.getKey() + "=" + e.getValue());
			}
			
			InputStream is = c.getInputStream();
			JsonObject json = Json.createReader(is).readObject();
			is.close();
			JsonArray fields = json.getJsonArray("fields");
			for (int i = 0; i < fields.size(); i++) {
				JsonObject field = fields.getJsonObject(i);
				String duty = field.getString("fieldName");
				if (duty.startsWith("Future"))
					continue;
				JsonArray signups = field.getJsonArray("signups");
				for (int j = 0; j < signups.size(); j++) {
					JsonObject who = signups.getJsonObject(j);
					String name = who.getString("userFirstName") + " " + who.getString("userName");
					System.out.println(date + "\t"  + duty + "\t" + name);
				}
			}
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

	public static byte[] getBytes(InputStream is) throws IOException {
		
		// Java 9 version is better:
		//		 return is.readAllBytes();

		ByteArrayOutputStream bos = new ByteArrayOutputStream(0x4000);
		byte[] buf = new byte[0x4000];
		int n = 0;
		while((n = is.read(buf)) >= 0) {
			bos.write(buf, 0, n);
		} 
		is.close();
		return bos.toByteArray();

	}

}
