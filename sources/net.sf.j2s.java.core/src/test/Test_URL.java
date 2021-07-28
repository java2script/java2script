package test;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javajs.util.AjaxURLConnection;
import javajs.util.Rdr;
import sun.misc.IOUtils;
import swingjs.JSUtil;

public class Test_URL extends Test_ {

	private static final int DEFAULT_READ_TIMEOUT = 5 * 60 * 1000; // 5 minutes

	private static final int CONNECT_TIMEOUT_MS = 10 * 1000; // 10 seconds

	protected static String getRequestMimeType() {
		return "application/json";
	}

	protected static String getResponseMimeType() {
		return "application/json";
	}

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		try {
			String value = "this is a test+this";
			String s = URLEncoder.encode(value.replace(' ', '\0'), "UTF-8").replaceAll("%00", "%20");
			System.out.println(s);
			
			testPost2();

			// jar:file:C:/temp/car.trz!/Car in a loop with friction.trk
			File fi = new File("src/test/test.xlsx").getAbsoluteFile();
			System.out.println(fi.getAbsolutePath());
			// FileInputStream fis = new FileInputStream(fi);
			URL url;
			URL jarURL;

			String jarpath = /** @j2sNative "./test/test.xlsx" || */
					"src/test/test.xlsx";
			url = new URL("file", null, "C:/temp/car.trz");
			jarURL = new URL("jar", null, url + "!/Car in a loop with friction.trk");// "!/xl/worksheets/sheet1.xml");
			url = new URL("file", null, jarpath);
			jarURL = new URL("jar", null, url + "!/xl/worksheets/sheet1.xml");
			System.out.println(url);
			System.out.println(jarURL);
			InputStream is = jarURL.openConnection().getInputStream();
			Object ret = Rdr.getStreamAsBytes(new BufferedInputStream(is), null);
			System.out.println("length = " + (ret instanceof byte[]
					? ((byte[]) ret).length + "\t" + new String((byte[]) ret).substring(0, 400) + "..."
					: ret.toString()));
		} catch (Exception e3) {
			e3.printStackTrace();
		}

		URL readme = Test_URL.class.getClassLoader().getResource("file://c:/test/t.htm");

		System.out.println(readme);

		try (InputStream in = new URL("https://stolaf.edu/people/hansonr").openStream()) {

			// Java or JavaScript:
			System.out.println("length = " + IOUtils.readFully(in, -1, true).length);

			URL noHost;
			Path path;

//			//noHost = new URL("file:///c:/temp/t");
//			noHost = new URL("file:///./temp/t");
//			System.out.println(noHost.toString());
//			URI u = new URI(noHost.toString());
//			System.out.println(u);
//			path = Paths.get(u);
//			System.out.println(Files.readAllBytes(path).length);

			// method 1: relative path -- Java or JavaScript; the document base
			path = Paths.get("/./README.txt");
			System.out.println(path.toAbsolutePath());
			System.out.println(new String(Files.readAllBytes(path)));
			path = Paths.get("./README.txt");
			System.out.println(path.toAbsolutePath());
			System.out.println(new String(Files.readAllBytes(path)));

			// method 2: relative https -- JavaScript only
			noHost = new URL("https:/./README.txt");
			URI uri = new URI(noHost.toString());
			path = Paths.get(uri);
			// JavaScript only:

			System.out.println(String.join("\n", Files.readAllLines(path)));

		} catch (Exception e2) {
			// This error thrown in Java only
			e2.printStackTrace();
		}

		dumpHeaders("http://www.opensourcephysics.org");
		dumpHeaders("https://www.compadre.org");

		try {
			URI uriNoScheme = new URI("../../test");
			URI uriRel = new URI("https://4virology.net:8080../../test/");
			System.out.println(uriRel.getPort());
			// can't do thi as port is -1 from trying to parse "8080.." : URL u =
			// uriRel.toURL();
			System.out.println(uriRel.getAuthority());
			System.out.println(uriRel.getPath());
//			URI uri = new URI("https://4virology.net/");
			URL url = new URL("https://asfadlkfj");
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			assert (connection.getResponseCode() == HttpURLConnection.HTTP_NOT_FOUND);
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		try {

			String path = "https://rest.ensembl.org/info/ping?content-type=application/json";
			URL url = new URL(path);
			System.out.println("getting " + url);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			connection.setRequestProperty("Content-Type", getRequestMimeType());
			connection.setRequestProperty("Accept", getResponseMimeType());

			connection.setUseCaches(false);
			connection.setDoInput(true);
			connection.setDoOutput(/* multipleIds */true);

			connection.setConnectTimeout(CONNECT_TIMEOUT_MS);
			connection.setReadTimeout(10000);

			InputStream is = url.openStream();
			String s = JSUtil.streamToString(is);
			is.close();
			System.out.println(s);
			assert (s.equals("{\"ping\":1}\n"));

			assert checkEnsembl();

			testPost1();

			System.out.println("Test_URL OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * Checks Ensembl's REST 'ping' endpoint, and returns true if response indicates
	 * available, else false
	 * 
	 * @see http://rest.ensembl.org/documentation/info/ping
	 * @return
	 */
	static boolean checkEnsembl() {
		BufferedReader br = null;
		String pingUrl = "https://rest.ensembl.org/info/ping?content-type=application/json";

		try {
			// note this format works for both ensembl and ensemblgenomes
			// info/ping.json works for ensembl only (March 2016)
			URL ping = new URL(pingUrl);

			/*
			 * expect {"ping":1} if ok if ping takes more than 2 seconds to respond, treat
			 * as if unavailable
			 */
			br = getHttpResponse(ping, null, 4 * 1000);
			if (br == null) {
				// error reponse status
				return false;
			}
			JSONParser jp = new JSONParser();
			JSONObject val = (JSONObject) jp.parse(br);
			String pingString = val.get("ping").toString();
			return pingString != null;
		} catch (Throwable t) {
			System.err.println("Error connecting to " + pingUrl + ": " + t.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					// ignore
				}
			}
		}
		return false;
	}

	/**
	 * @param url
	 * @param ids
	 * @param readTimeout
	 * @return
	 * @throws IOException
	 * @throws ProtocolException
	 */
	protected static HttpURLConnection tryConnection(URL url, List<String> ids, int readTimeout)
			throws IOException, ProtocolException {
		// System.out.println(System.currentTimeMillis() + " " + url);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();

		/*
		 * POST method allows multiple queries in one request; it is supported for
		 * sequence queries, but not for overlap
		 */
		boolean multipleIds = ids != null && ids.size() > 1;
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", getRequestMimeType());
		connection.setRequestProperty("Accept", getResponseMimeType());

		connection.setUseCaches(false);
		connection.setDoInput(true);
		connection.setDoOutput(multipleIds);

		connection.setConnectTimeout(CONNECT_TIMEOUT_MS);
		connection.setReadTimeout(readTimeout);

//	    if (multipleIds)
//	    {
//	      writePostBody(connection, ids);
//	    }
		return connection;
	}

	/**
	 * Sends the HTTP request and gets the response as a reader. Returns null if the
	 * HTTP response code was not 200.
	 * 
	 * @param url
	 * @param ids         written as Json POST body if more than one
	 * @param readTimeout in milliseconds
	 * @return
	 * @throws IOException
	 */
	protected static BufferedReader getHttpResponse(URL url, List<String> ids, int readTimeout) throws IOException {
		int retriesLeft = 1;
		HttpURLConnection connection = null;
		int responseCode = 0;

		while (retriesLeft > 0) {
			connection = tryConnection(url, ids, readTimeout);
			responseCode = connection.getResponseCode();
			if (responseCode == 429) // HTTP_OVERLOAD) // 429
			{
				retriesLeft--;
//	        checkRetryAfter(connection);
			} else {
				retriesLeft = 0;
			}
		}
		if (responseCode != 200) // HTTP_OK) // 200
		{
			/*
			 * note: a GET request for an invalid id returns an error code e.g. 415 but POST
			 * request returns 200 and an empty Fasta response
			 */
			System.err.println("Response code " + responseCode + " for " + url);
			return null;
		}

		InputStream response = connection.getInputStream();

		System.out.println(response.hashCode());
		// System.out.println(getClass().getName() + " took "
		// + (System.currentTimeMillis() - now) + "ms to fetch");

		BufferedReader reader = null;
		reader = new BufferedReader(new InputStreamReader(response, "UTF-8"));
		return reader;
	}

	public static void testPost1() {
		String urlParameters = "format=sdf&get3d=True";
		byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8);
		int postDataLength = postData.length;
		String request = "https://cactus.nci.nih.gov/chemical/structure/aspirin/file";
		try {
			URL url = new URL(request);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setInstanceFollowRedirects(false);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
			conn.setUseCaches(false);
			try (DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
				wr.write(postData);
			}
			BufferedReader reader = null;
			reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			for (int i = 0; i < 10; i++)
				System.out.println(reader.readLine());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unused")
	private static void testPost2() {

		// new toilet needed if this is tested. Worked 2020.06.17
		if (/** @j2sNative true || */
				false) {
			try {

				Map<String, Object> formData = new HashMap<>();
				formData.put("testingAgain", "here");
				formData.put("andBytes", "ABCDE".getBytes());
				URL url = new URL("https://ptsv2.com/t/j1gqe-1592433958/post");
				AjaxURLConnection ajax = (AjaxURLConnection) url.openConnection();
				ajax.setFormData(formData);
				System.out
						.println(new String(JSUtil.getSignedStreamBytes((BufferedInputStream) ajax.getInputStream())));
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	private static void dumpHeaders(String url) {
		try {
			// URL u = new
			// URL("https://physlets.org/tracker/library/cabrillo_collection.xml");
			URL u = new URL(url);
			URLConnection uc = u.openConnection();
			Map<String, List<String>> fields = uc.getHeaderFields();
			for (Entry<String, List<String>> e : fields.entrySet()) {
				String key = e.getKey();
				List<String> list = e.getValue();
				System.out.println(key + "  " + list);
			}

		} catch (IOException e3) {
			// TODO Auto-generated catch block
			e3.printStackTrace();
		}
	}

	static Object getURLContents(URL url, Object bytesOrString) {
		URLConnection conn = null;
		try {
			conn = url.openConnection();
			String type = null;
			byte[] outputBytes = null;
			String post = null;

			if (bytesOrString instanceof byte[]) {
				outputBytes = (byte[]) bytesOrString;
				type = "application/octet-stream;";
			} else if (bytesOrString instanceof String) {
				post = (String) bytesOrString;
				type = "application/x-www-form-urlencoded";
			}
			conn.setRequestProperty("User-Agent", "Java2Script/SwingJS");
			if (type != null) {
				conn.setRequestProperty("Content-Type", type);
				conn.setDoOutput(true);
				if (outputBytes == null) {
					OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
					wr.write(post);
					wr.flush();
				} else {
					conn.getOutputStream().write(outputBytes);
					conn.getOutputStream().flush();
				}
			}
			return new BufferedInputStream(conn.getInputStream());
		} catch (IOException e) {
			return e.toString();
		}
	}
}
