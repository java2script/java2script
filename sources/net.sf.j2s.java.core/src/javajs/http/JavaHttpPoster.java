package javajs.http;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.util.List;

import javajs.http.SimpleHttpClient.Request.FormData;

/**
 * A simple Java byte[] or String poster.
 * 
 * A java client that implements multipart form submit over https implemented
 * with only jdk classes and no external dependencies.
 * 
 * Not used in SwingJ. HTML5 does not allow setting content-type to
 * multipart/form-data. Instead, for JavaScript, we simply load up an array of
 * information and turn that into a FormData object in AjaxURLConnection.
 * 
 * adapted from https://github.com/atulsm/https-multipart-purejava
 * 
 * @author Bob Hanson
 *
 */
public class JavaHttpPoster {

	public static void post(HttpURLConnection conn, List<FormData> formData) throws IOException {
		String boundary = "---" + System.nanoTime() + "---";
		conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
		OutputStream os = conn.getOutputStream();
		for (int i = 0; i < formData.size(); i++) {
			FormData data = formData.get(i);
			String name = data.getName();
			Object value = data.getData();
			String contentType = data.getContentType();
			String fileName = data.getFileName();
			append(os, "--" + boundary + "\r\n");
			append(os, "Content-Disposition: form-data; name=\"" + name
					+ (fileName == null ? "" : "\"; filename=\"" + fileName) + "\"");
			append(os, "\r\nContent-Type: ");
			append(os, contentType == null ? "application/octet-stream" : contentType);
			append(os, "\r\n\r\n");
			append(os, value);
			append(os, "\r\n");
		}
		append(os, "\r\n--" + boundary + "--\r\n");
		os.flush();

	}

	private static void append(OutputStream outputStream, Object val) throws IOException {
		if (val instanceof byte[]) {
			outputStream.write((byte[]) val);
		} else {
			outputStream.write(val.toString().getBytes());
		}
	}

}
