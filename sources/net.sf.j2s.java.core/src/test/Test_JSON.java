package test;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javajs.util.Rdr;
import swingjs.JSUtil;

public class Test_JSON extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {
		try {
			URL url = new URL("http://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/1cbs");

			JSUtil.setAjax(url);
			/**
			 * @j2sNative
			 * 
			 * 			url.ajax = {dataType:"json"};
			 */
			Object data = url.getContent();
			/**
			 * @j2sNative
			 * 
			 * 			data = data._ajaxData;
			 * 
			 *            data = data["1cbs"][0].title;
			 */
			if (data instanceof InputStream) {
				data = Rdr.streamToUTF8String(new BufferedInputStream((InputStream) data));
			}
			System.out.println(data);

			
			url = new URL("http://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/1cbs");
			JSUtil.setAjax(url);
		    HttpURLConnection connection = (HttpURLConnection) url.openConnection();		    
		    data = connection.getInputStream();
			data = Rdr.streamToUTF8String(new BufferedInputStream((InputStream) data));
			System.out.println(data);
		    
		
			if (/** @j2sNative true || */
			false) {
				// JavaScript-only code
				url = new URL("http://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/1d66");
				JSUtil.setAjax(url);
				
				
				BufferedReader br = JSUtil.getJSONReader((InputStream) url.getContent());
				data = JSUtil.parseJSON(br);
				String title = (((Map<String, java.util.List<Map<String, String>>>) data).get("1d66")).get(0)
						.get("title");
				System.out.println(title);

				// dynamic loading
				Map<String, Object> c = (Map<String, Object>) swingjs.JSUtil.parseJSON("{\"a\":\"val_a\"}");
				System.out.println(c.get("a"));
				assert(c.get("a") == "val_a");
				c.put("b", "val_b");
				for (String key : c.keySet())
				  assert(c.get(key) == "val_" + key);
				String s = "";
				Iterator iter = ((ArrayList) JSUtil.parseJSON("[1,2,3,4,5,6]")).iterator();
				while (iter.hasNext())
					s += iter.next();
				System.out.println(s);
				assert(s == "123456");
				Object obj;
				
				obj = JSUtil.parseJSON("[1,{\"a\":[2,{\"b\":[3,4,5]},6]},7]");
//				obj = JSUtil.parseJSON("[1,{\"a\":2},3]");
//				obj = JSUtil.parseJSON("[2,{\"b\":[3]},4]");
				dumpVal(obj);
//				ArrayList list = ((ArrayList) obj);
//				for (int i = 0; i < list.size(); i++)
//					dumpVal(list.get(i));
			}
			System.out.println("Test_JSON OK");
		} catch (MalformedURLException e) {
		} catch (IOException e) {
		}
	}

	private static void dumpVal(Object object) {
		if (object instanceof Map) {
		   Map<String, Object> m = (Map<String, Object>) object;
		   for (Object k : m.keySet())
			   dumpVal(m.get(k));
		} else if (object instanceof List) {
			for (Object o : ((List) object)) {
				dumpVal(o);
			}
		} else {
			System.out.println("val is " + object);
		}
	}
}
