package test;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
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
import org.json.simple.parser.ParseException;

import javajs.util.AjaxURLConnection;
import javajs.util.Rdr;
import sun.misc.IOUtils;
import swingjs.JSUtil;
import test.osp.OSPDocument;

public class Test_Google extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {
			testGoogle();
	}

	private static void testGoogle() {
		int mssleep = 5000;
		URL url = Test_URL.class.getResource("words.txt");
		byte[] ret;
		try {
			ret = (byte[]) Rdr.getStreamAsBytes(new BufferedInputStream(url.openStream()), null);
			String[] words = new String(ret).split("\r\n");
			int n = words.length;
			double[] freq = new double[n];
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < n; i++) {
				try {
					processWord(i, words, freq);
					sb.append(i).append('\t').append(words[i]).append('\t').append(freq[i]).append('\n');
				} catch (IOException e) {
					System.out.println(e);
					// TODO Auto-generated catch block
					i--;
					try {
						Thread.sleep(mssleep);
					} catch (InterruptedException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}
			}
			FileOutputStream fos = new FileOutputStream("c:/temp/words.out");
			fos.write(sb.toString().getBytes());
			fos.close();
		} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}

		// TODO Auto-generated method stub

	}

	private static void processWord(int i, String[] words, double[] freq) throws IOException {
		String word = words[i];
			URL url = new URL("https://books.google.com/ngrams/json?content=+"+word + "&year_start=1981&year_end=2020&corpus=en&smoothing=3");			byte[] bytes = (byte[]) Rdr.getStreamAsBytes(new BufferedInputStream(url.openStream()), null);
			String json = new String(bytes);
			String[] values = json.split("\\[")[2].split("\\]")[0].split(",");
			double v = 0;
			for (int j = values.length; --j >= 0;) {
				v += Double.valueOf(values[j]);
			}
			System.out.println(i + "\t" + word + "\t" + v);
			freq[i] = v;
	}

}
