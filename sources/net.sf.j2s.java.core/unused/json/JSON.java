package test.json;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;

/**
 * 
 * A rudimentary JSON converter/iterator that uses the browser's native AJAX
 * json data type delivery mechanism.
 * 
 * Arrays are delivered as ArrayList<Object> where Object may be Boolean,
 * String, Long, Double, ArrayList, and "Map-like object".
 * 
 * For speed, the maps returned are just JavaScript maps with a few added
 * methods for extracting data. [get(), contains(), probably should add keySet,
 * valueSet, and entrySet].
 * 
 * @author hansonr Bob Hanson St. Olaf College 1/24/2019
 *
 */
public class JSON {

	/**
	 * A privately initialized class that allows us to do the object
	 * conversion from JavaScript to "Java" on the fly. 
	 * 
	 * @author hansonr
	 *
	 */
	@SuppressWarnings("serial")
	public static class JSONList extends ArrayList<Object>  {


		static ListIterator iter;
		
		JSONList(Object[] a) {
			super();
			/**
			 * @j2sNative
			 * 
			 * this.elementData = a;
			 * this.size = a.length;
			 */
		}
		
		public Object get(int i) {
			Object o = null;
			/**
			 * @j2sNative
			 * 
			 *  o = this.elementData[i]; 
			 *  
			 */
			return JSON.toObject(o);
		}

		@Override
		public Iterator<Object> iterator() {
			if (iter == null)
				iter = new ListIterator();
			iter.pt = 0;
			iter.list = this;
			return iter;
		}

		
		/**
		 * 
		 * @author hansonr
		 *
		 */
		public static class ListIterator implements Iterator<Object> {

			ListIterator() {/* restricted */}
			
			public JSONList list;
			int pt = -1;

			@Override
			public boolean hasNext() {
				@SuppressWarnings("unused")
				boolean more;
				/**
				 * @j2sNative
				 * 
				 * more = this.list && (this.pt < this.list.size);
				 * if (!more) {
				 *   this.list = null;
				 *   this.pt = -1;
				 * }
				 * return more; 
				 */
				{
				return pt < list.size();
				}
			}

			@Override
			public Object next() {
				Object o = null;
				/**
				 * @j2sNative o = this.list.elementData[this.pt++];
				 * 
				 */
				
				return toObject(o);				
			}
		}
	}

	/**
	 * A simple encoding of sequential key/value pairs for a jQuery.ajax call. If
	 * the first key is "url" and the second is an object, then the ajax object is
	 * attached to that url as well, just for transport purposes within the system.
	 * 
	 * @param keyValues assumed to be simple String,Object pairs. String objects
	 *                  will be surrounded by double quotes.
	 */
	public static Object setAjax(Object... keyValues) {
		Object ajax = null;
		/**
		 * @j2sNative ajax = {}; if (keyValues[0] == "url" && typeof keyValues[1] ==
		 *            "object") { ajax = keyValues[1].ajax || (keyValues[1].ajax = ajax); }
		 * 
		 *            for (var i = 0; i < keyValues.length;) { var key = keyValues[i++];
		 *            var val = keyValues[i++]; ajax[key] = val; }
		 */
		return ajax;
	}

	public static void setAjax(URL url) {
		setAjax("url", url, "dataType", "json", "async", Boolean.FALSE);	
	}

	public static BufferedReader getJSONReader(InputStream is) {
		return new JSONReader(is);
	}

	public static class JSONReader extends BufferedReader {
		Object data;

		public JSONReader(InputStream in) {
			super((Reader) (Object) in);
			// could be buffered
			data = toObject(/** @j2sNative $in._ajaxData || $in.$in && $in.$in._ajaxData || */ null);
			
		}

		public JSONReader(Reader in) {
			super(in);
			// could be buffered
			data = toObject(/** @j2sNative $in._ajaxData || $in.$in && $in.$in._ajaxData || */ null);
		}

		public JSONReader(String json) {
			super((Reader) (Object) "");
			data = toObject(/** @j2sNative  swingjs.JSUtil.parseJSON$S(json)|| */null); 
		}

		@Override
		public void close() {
			data = null;
			try {
				super.close();
			} catch (IOException e) {
				// ignore, especially if we set $in to a string!
			}
		}
	}

	@SuppressWarnings("resource")
	public static Object parse(String json) {
		return new JSONReader(json).data;
	}

	public static Object parse(Reader br) {
		return ((JSONReader) br).data;
	}

	/**
	 * Get an object in the JSON associative array.
	 * @param br
	 * @param key
	 * @return
	 */
	@SuppressWarnings("unused")
	public static Object toObject(Object o) {
		if (o == null)
			return null;
		String type = /** @j2sNative (typeof o) + */"";
		switch (type) {
		case "string":
			return o;
		case "number":
			double n = 0;
			if (/** @j2sNative (n = o) == (n|0) || */false)
				return Long.valueOf((long) n);
			return Double.valueOf(n);
		case "boolean":
			return Boolean.valueOf(/** @j2sNative !!o || */false);
		case "object":
			boolean isArray =  /** @j2sNative o instanceof Array || */false;
			if (isArray) {
				return toList((Object[]) o);
			}
			return toMap(o);
		default:
			return o;
		}
	}
	
	Object get(String key) {
		/**
		 * @j2sNative
		 * 
		 *  return C$.toObject$O(this[key]);
		 */
		{
			return null;
		}
	}
	boolean contains(String key) {
		/**
		 * @j2sNative
		 * 
		 *  return typeof this[key] != "undefined"
		 */
		{
			return false;
		}
	}
	
	@SuppressWarnings("unchecked")
	private static Hashtable<String, Object> toMap(Object map) {
		/**
		 * @j2sNative
		 * map.get$O = C$.prototype.get$S;
		 * map.contains$O = C$.prototype.contains$S;
		 */			
		return (Hashtable<String, Object>) map;
	}

	private static List<Object> toList(Object[] a) {
		return new JSONList(a);
	}

}
