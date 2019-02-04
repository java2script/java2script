package swingjs.json;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import swingjs.JSUtil;

/**
 * 
 * In a java application, this code must be run for JavaScript only. It replaces
 * org.json.simple.JSONParser and is invoked by a call to
 * 
 * swingjs.JSUtil.parseJSON$O(x)
 * 
 * where x can be a String or an either an InputStream or a Reader created from
 * a Java URL.getContents() or URL.getInputStream() call where the URL has been
 * specially prepared using
 * 
 * swingjs.JSUtil.ajax$OA(params...)
 * 
 * where params is an array of [key1,val1,key2,val2...] where key1 is "url", and
 * key2 is the desired Java URL object. At least key1 and key2 are required.
 * 
 * This array will be delivered to jQuery as an associative array needed for
 * jQuery.ajax({key1:value1, key2:value2, ...}).
 * 
 * 
 * 
 * A rudimentary READ-ONLY JSON converter/iterator that uses the browser's
 * native AJAX json data type delivery mechanism.
 * 
 * Arrays are delivered as ArrayList<Object> where Object may be Boolean,
 * String, Long, Double, ArrayList, and "Map-like object".
 * 
 * For speed, the maps returned are just JavaScript maps with a few added
 * methods for extracting data. [get(), containsKey(), keySet(), and entrySet()].
 * Most notably, maps created by this class are not writable.
 * 
 * 
 * @author hansonr Bob Hanson St. Olaf College 1/24/2019
 *
 */
public class JSON {

	static Object o = JSONMap.class;
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
		 *            "object") { ajax = keyValues[1].ajax || (keyValues[1].ajax =
		 *            ajax); }
		 * 
		 *            for (var i = 0; i < keyValues.length;) { var key = keyValues[i++];
		 *            var val = keyValues[i++]; ajax[key] = val; }
		 */
		return ajax;
	}

	public static Object setAjax(URL url) {
		return setAjax("url", url, "dataType", "json", "async", Boolean.FALSE);
	}

	public static BufferedReader getJSONReader(InputStream is) {
		return new JSONReader(is);
	}

	public static Object parse(Object o) {
		if (o instanceof String)
			return parse((String) o);
		if (o instanceof InputStream)
			return parse((InputStream) o);
		if (o instanceof Reader)
			return parse((Reader) o);
		return null;
	}

	@SuppressWarnings("resource")
	public static Object parse(InputStream json) {
		return new JSONReader(json).data;
	}

	@SuppressWarnings("resource")
	public static Object parse(String json) {
		return new JSONReader(json).data;
	}

	public static Object parse(Reader br) {
		if (br instanceof JSONReader)
			return ((JSONReader) br).data;
		InputStream is = /** @j2sNative br.$in || */null;
		return parse(is);
	}

	/**
	 * Get an object in the JSON associative array.
	 * 
	 * @param br
	 * @param key
	 * @return
	 */
	@SuppressWarnings("unused")
	public static Object toObject(Object o) {
		if (o == null)
			return null;
		String type = /** @j2sNative (typeof o) + */
				"";
		switch (type) {
		case "string":
			return o;
		case "number":
			double n = 0;
			if (/** @j2sNative (n = o) == (n|0) || */
			false)
				return Long.valueOf((long) n);
			return Double.valueOf(n);
		case "boolean":
			return Boolean.valueOf(/** @j2sNative !!o || */
					false);
		case "object":
			boolean isArray = /** @j2sNative o instanceof Array || */
					false;
			if (isArray) {
				return toList((Object[]) o);
			}
			return (/** @j2sNative 1,o.__CLASS_NAME__ ? o : */ toMap(o));
		default:
			return o;
		}
	}

	/**
	 * 
	 * Note that the map-like object is not really a Hashtable. It is a simpler
	 * object that only has get(), containsKey(), keySet(), and entrySet(), isEmpty(), and size().
	 * 
	 * @param map a raw JavaScript map object from window.JSON.parse()
	 * @return a map-like object with just six read-only methods
	 */

	private static Map<String, Object> toMap(Object map) {
		return new JSONMap(map);
	}

	private static List<Object> toList(Object[] a) {
		return new JSONList(a);
	}

	public static class JSONReader extends BufferedReader {
		Object data;

		public JSONReader(InputStream in) {
			super((Reader) (Object) "");
			// could be buffered
			data = toObject(/** @j2sNative $in._ajaxData || $in.$in && $in.$in._ajaxData || */
					null);
			if (data == null) {
				String json = (/** @j2sNative $in.str || $in.$in && $in.$in.str || */null);
				data = toObject(JSUtil.parseJSONRaw(json));
			}
		}

		public JSONReader(Reader in) {
			super(in);
			// could be buffered
			data = toObject(/** @j2sNative $in._ajaxData || $in.$in && $in.$in._ajaxData || */
					null);
		}

		public JSONReader(String json) {
			super((Reader) (Object) "");
			data = toObject(JSUtil.parseJSONRaw(json));
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

	/**
	 * A map that only turns in to a real Hashtable if it needs to.
	 * 
	 * @author hansonr
	 *
	 */
	private static class JSONMap implements Map<String, Object> {

		private String[] keys;
		private Object[] map;
		private Map<String, Object> ht;

		private JSONMap(Object map) {
			this.map = (Object[]) map;
			String[] keys = new String[0];
			/**
			 * @j2sNative 
			 *            for (var i in map) keys.push(i);
			 */
			this.keys = keys;
		}

		@Override
		public Object get(Object key) {
			return (ht == null ? JSON.toObject(map[/** @j2sNative 1 ? key : */ 0]) : ht.get(key));
		}

		@Override
		public int size() {
		    return (ht == null ? keys.length : ht.size());
		}

		@Override
		public boolean isEmpty() {
			return (ht == null ? keys.length == 0 : ht.isEmpty());
		}

		@Override
		public boolean containsKey(Object key) {
			if (ht != null)
				return ht.containsKey(key);
			Object val = get(key);
			return (/** @j2sNative 1 ? typeof val : */val) != "undefined";
		}


		/**
		 * Switch to true Hashtable if anything other than the above are requested. 
		 * 
		 * @return
		 */
		private Map<String, Object> getHashTable() {
			if (this.ht != null)
				return ht;
			Hashtable<String, Object> ht = new Hashtable<String, Object>();
			for (int i = keys.length; --i >= 0;) {
				String key = keys[i];
				ht.put(key, JSON.toObject(get(key)));
			}
			map = null;
			keys = null;
			return this.ht = ht;
		}

		@Override
		public Set keySet() {
			return getHashTable().keySet();
		}

		@Override
		public Set entrySet() {
			return getHashTable().entrySet();
		}

		@Override
		public Object put(String key, Object value) {
			return getHashTable().put((String) key, value);
		}

		@Override
		public Object remove(Object key) {
			return getHashTable().remove(key);
		}

		@Override
		public void putAll(Map m) {
			getHashTable().putAll(m);
		}

		@Override
		public void clear() {
			getHashTable().clear();
		}

		@Override
		public boolean containsValue(Object value) {
			return getHashTable().containsValue(value);
		}
		@Override
		public Collection values() {
			return getHashTable().values();
		}


	}

	/**
	 * A privately initialized class that allows us to do the object conversion from
	 * JavaScript to "Java" on the fly.
	 * 
	 * @author hansonr
	 *
	 */
	@SuppressWarnings("serial")
	private static class JSONList extends ArrayList<Object> {

		private ListIterator iter;

		private JSONList(Object[] a) {
			/**
			 * @j2sNative
			 * 
			 * 			this.elementData = a; this.size = a.length;
			 */
		}

		@Override
		public Object get(int i) {
			Object o = null;
			/**
			 * @j2sNative
			 * 
			 * 			o = this.elementData[i];
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

			ListIterator() {
				/* restricted */}

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
				 *    this.list = null; this.pt = -1; } 
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

}
