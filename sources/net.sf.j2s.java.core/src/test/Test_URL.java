package test;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javajs.util.Rdr;

public class Test_URL extends Test_ {

	
	  private static final int DEFAULT_READ_TIMEOUT = 5 * 60 * 1000; // 5 minutes

	  private static final int CONNECT_TIMEOUT_MS = 10 * 1000; // 10 seconds

	  
	  protected static String getRequestMimeType()
	  {
	    return "application/json";
	  }
	  
	  protected static String getResponseMimeType()
	  {
	    return "application/json";
	  }


	  /**
	   * Checks Ensembl's REST 'ping' endpoint, and returns true if response
	   * indicates available, else false
	   * 
	   * @see http://rest.ensembl.org/documentation/info/ping
	   * @return
	   */
	  static boolean checkEnsembl()
	  {
	    BufferedReader br = null;
	    String pingUrl = "https://rest.ensemblgenomes.org/info/ping?content-type=application/json";

	    try
	    {
	      // note this format works for both ensembl and ensemblgenomes
	      // info/ping.json works for ensembl only (March 2016)
	      URL ping = new URL(pingUrl);

	      /*
	       * expect {"ping":1} if ok
	       * if ping takes more than 2 seconds to respond, treat as if unavailable
	       */
	      br = getHttpResponse(ping, null, 2 * 1000);
	      if (br == null)
	      {
	        // error reponse status
	        return false;
	      }
	      JSONParser jp = new JSONParser();
	      JSONObject val = (JSONObject) jp.parse(br);
	      String pingString = val.get("ping").toString();
	      return pingString != null;
	    } catch (Throwable t)
	    {
	      System.err.println(
	              "Error connecting to " + pingUrl + ": " + t.getMessage());
	    } finally
	    {
	      if (br != null)
	      {
	        try
	        {
	          br.close();
	        } catch (IOException e)
	        {
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
	  protected static HttpURLConnection tryConnection(URL url, List<String> ids,
	          int readTimeout) throws IOException, ProtocolException
	  {
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
	   * Sends the HTTP request and gets the response as a reader. Returns null if
	   * the HTTP response code was not 200.
	   * 
	   * @param url
	   * @param ids
	   *          written as Json POST body if more than one
	   * @param readTimeout
	   *          in milliseconds
	   * @return
	   * @throws IOException
	   */
	  protected static BufferedReader getHttpResponse(URL url, List<String> ids,
	          int readTimeout) throws IOException
	  {
	    int retriesLeft = 1;
	    HttpURLConnection connection = null;
	    int responseCode = 0;

	    while (retriesLeft > 0)
	    {
	      connection = tryConnection(url, ids, readTimeout);
	      responseCode = connection.getResponseCode();
	      if (responseCode == 429) //HTTP_OVERLOAD) // 429
	      {
	        retriesLeft--; 
//	        checkRetryAfter(connection);
	      }
	      else
	      {
	        retriesLeft = 0;
	      }
	    }
	    if (responseCode != 200) //HTTP_OK) // 200
	    {
	      /*
	       * note: a GET request for an invalid id returns an error code e.g. 415
	       * but POST request returns 200 and an empty Fasta response 
	       */
	      System.err.println("Response code " + responseCode + " for " + url);
	      return null;
	    }

	    InputStream response = connection.getInputStream();

	    // System.out.println(getClass().getName() + " took "
	    // + (System.currentTimeMillis() - now) + "ms to fetch");

	    BufferedReader reader = null;
	    reader = new BufferedReader(new InputStreamReader(response, "UTF-8"));
	    return reader;
	  }

	  public static void main(String[] args) {

		try {
			
			
//			String path = "https://rest.ensemblgenomes.org/info/ping?content-type=application/json";
//			URL url = new URL(path);
//			System.out.println("getting " + url);
//		    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//		    connection.setRequestMethod("GET");
//		    connection.setRequestProperty("Content-Type", getRequestMimeType());
//		    connection.setRequestProperty("Accept", getResponseMimeType());
//
//		    connection.setUseCaches(false);
//		    connection.setDoInput(true);
//		    connection.setDoOutput(/*multipleIds*/true);
//
//		    connection.setConnectTimeout(CONNECT_TIMEOUT_MS);
//		    connection.setReadTimeout(10000);
//
//						
//			InputStream fis = url.openStream();
//			BufferedInputStream bis = new BufferedInputStream(fis);
//			String s = Rdr.streamToUTF8String(bis);
//			bis.close();
//			System.out.println(s);
//			assert(s.equals("{\"ping\":1}\n"));
			
			assert checkEnsembl();
			
			System.out.println("Test_URL OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}