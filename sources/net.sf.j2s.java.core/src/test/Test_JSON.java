package test;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javajs.util.Rdr;
import swingjs.JSUtil;

public class Test_JSON extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {
		try {
//
//			System.out.println(Double.valueOf(Double.MIN_NORMAL + "1"));
//			System.out.println(Long.valueOf(Long.MAX_VALUE+"1"));
//			BigInteger bi = new BigInteger(Long.MAX_VALUE+"");
//			System.out.println(bi.longValue());
//			BigDecimal bd = new BigDecimal(Double.MAX_VALUE + "1");
//			System.out.println(bi.doubleValue());

			
			org.json.JSONObject o = new org.json.JSONObject(new Test_JSON());
			System.out.println(o.toString());
						
			URL url = new URL("http://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/1cbs");

			JSUtil.setAjax(url);
			Object data = url.getContent();
			/**
			 * @j2sNative
			 * 
			 * 			data = data._jsonData;
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
				data = JSUtil.parseJSON(url);
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

	public int getValue() {
		return 3;
	}
	
	public double getValueD() {
		return 3;
	}
	
	public boolean getValueBtrue() {
		return true;
	}
	
	public boolean getValueBfalse() {
		return false;
	}
	
	public String getValueS() {
		return "s";
	}
	
	
	public char[] getValueCA() {
		return new char[] {'o','k'};
	}

	public BigInteger getValueBI() {
		return new BigInteger("123456789012345678901234567890");
	}

	public BigDecimal getValueBD() {
		return new BigDecimal("123456789012345.678901234567890E456");
	}

	public BigDecimal getValueLD() {
		return new BigDecimal("123456789012345.678901234567890E-1456");
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
