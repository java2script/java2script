package test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.util.function.Consumer;

import javajs.http.HttpClient;
import javajs.http.HttpClient.HttpRequest;
import javajs.http.HttpClient.HttpResponse;
import javajs.http.HttpClientFactory;


/** A JavaScript-only class */

public class Test_HTTP extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		if (/** @j2sNative false && */ true)
			return;
		try {

			HttpClient client = HttpClientFactory.getClient(null);
			
			HttpRequest req = client.get(new URI("https://www.compbio.dundee.ac.uk/slivka/api/services"));
			HttpResponse resp = req.execute();
			
			System.out.println(resp);
			String res = resp.getText();
			System.out.println(res);
			System.out.println(resp.getStatusCode());
			
			req = client.put(new URI("https://www.compbio.dundee.ac.uk/slivka/api/services/example"));
			
			String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";		
			req.addFilePart("input-file",new ByteArrayInputStream(json.getBytes()));
			req.addFormPart("content", "len:11 long");

			resp = req.execute();
			
			System.out.println(resp);
			res = resp.getText();
			System.out.println(res);
			System.out.println(resp.getStatusCode());

			System.out.println("Testing async");
			req.addFormPart("testing", "here");
			req.executeAsync(new Consumer<HttpResponse>() {

				@Override
				public void accept(HttpResponse t) {
					try {
						String res = t.getText();
						System.out.println("Testing async...returned:");
						System.out.println(res);
						System.out.println(t.getStatusCode());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				
			}, null, null);
			System.out.println("Testing async...submitted...");

			
		} catch (Exception e3) {
			e3.printStackTrace();
		}

	}
	
}
