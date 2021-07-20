package test;

import java.net.URI;
import javajs.http.HttpClient;
import javajs.http.HttpClientFactory;

class Test_URL_POST {

	/**
	 * simple Java POST test, sending strings and raw bytes
	 * as files or field data.
	 * 
	 * Working in Java and JavaScript. 
	 * 
	 * If you want to test this yourself, you will have to get
	 * your own toilet! They do expire. :)
	 * 
	 */
	public static void main(String[] args) {

//Dundee test (does not work in JavaScript because of CORS issue

		try {
	
			
			String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";
			HttpClient client = HttpClientFactory.getClient(null);
			String response = client
					.get(new URI("https://www.compbio.dundee.ac.uk/slivka/api/services/example"))
					.addFilePart("input-file", json, "application/octet-stream", "main.json")
					.addFormPart("content", "len:11 long")
					.execute()
					.getText();
			System.out.println(response);
			
			// toilet test works -- but may expire and need a new url.
//			String toilet = "/t/ej940-1592930406/post";
//			URL url = new URL("https://ptsv2.com" + toilet);
//			String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";
//			byte[] bytes = "This is a test".getBytes();
//			String date = "<date>" + new Date() + "</date>"
//					+ "<mandarin>Pǔtōnghuà (普通话/普通話, literally 'common speech')</mandarin>";
//			SimplePoster multipart = new SimplePoster(url);
//			multipart.addFormField("file", json, "application/json", "main.json");
//			multipart.addFormField("message", bytes, "application/octet-stream", null);
//			multipart.addFormField("date", date, null, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}