package test;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

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
//
//		String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";		
//		url = new URL("https://www.compbio.dundee.ac.uk/slivka/api/services/example");
//		SimplePoster multipart = new SimplePoster(url);
//		multipart.addFormField("input-file", json, "application/json", "main.json");
//		multipart.addFormField("content", "len:  13 long", null, null);
		
		
		try {
	
			// toilet test works -- but may expire and need a new url.
			
			String toilet = "/t/louni-1592443011/post";
			URL url = new URL("https://ptsv2.com" + toilet);
			String json = "{\"key1\":\"val1\", \"key2\":\"val2\"}";
			byte[] bytes = "This is a test".getBytes();
			String date = "<date>" + new Date() + "</date>"
					+ "<mandarin>Pǔtōnghuà (普通话/普通話, literally 'common speech')</mandarin>";
			SimplePoster multipart = new SimplePoster(url);
			multipart.addFormField("file", json, "application/json", "main.json");
			multipart.addFormField("message", bytes, "application/octet-stream", null);
			multipart.addFormField("date", date, null, null);
			bytes = new byte[1000];
			int n = multipart.finish().read(bytes);
			System.out.println(new String(bytes, 0, n, "utf-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * A java client that implements multipart form submit over https implemented
	 * with only jdk classes and no external dependencies.
	 * 
	 * HTML5 does not allow setting content-type to multipart/form-data. Instead,
	 * for JavaScript, we simply load up an array of information and turn that into
	 * a FormData object in AjaxURLConnection.
	 * 
	 * adapted from https://github.com/atulsm/https-multipart-purejava
	 * 
	 * @author Atul Soman, atulsm@gmail.com
	 *
	 */

	private static class SimplePoster {

		private final String boundary;
		private HttpURLConnection conn;
		private OutputStream outputStream;
		public SimplePoster(URL url) throws IOException {
			boundary = "---" + System.currentTimeMillis() + "---";
			conn = (HttpURLConnection) url.openConnection();
			conn.setUseCaches(false);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setRequestMethod("POST");
			// This has to be ignored in AjaxURLConnection:
			conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
			outputStream = conn.getOutputStream();
		}

		public void addFormField(String name, Object value, String contentType, String fileName) throws IOException {
			/**
			 * @j2sNative
			 * 
			 * 			return this.conn.addFormData(name, value, contentType, fileName);
			 * 
			 */
			{
				append("--" + boundary + "\r\n");
				append("Content-Disposition: form-data; name=\"" + name
						+ (fileName == null ? "" : "\"; filename=\"" + fileName) + "\"");
				append("\r\nContent-Type: ");
				append(contentType == null ? "application/octet-stream" : contentType);
				append("\r\n\r\n");
				append(value);
				append("\r\n");
			}
		}

		private void append(Object val) throws IOException {
			/** @j2sIgnore */
			{
				if (val instanceof byte[]) {
					outputStream.write((byte[]) val);
				} else {
					outputStream.write(val.toString().getBytes());
				}
			}
		}

		/**
		 * Send the final boundary if Java, flush, and initiate transfer 
		 * from the input stream.
		 * 
		 * @return
		 * @throws IOException
		 */
		public BufferedInputStream finish() throws IOException {
			append("\r\n--" + boundary + "--\r\n");
			outputStream.flush();
			return new BufferedInputStream(conn.getInputStream());
		}

	}

}