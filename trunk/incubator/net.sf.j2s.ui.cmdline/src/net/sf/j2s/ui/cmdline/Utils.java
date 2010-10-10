package net.sf.j2s.ui.cmdline;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;
/**
 * miscelaneous utilities for cmdline
 * @author sgurin
 *
 */
public class Utils {

	public static interface Predicate<T> {
		boolean select(T t);
	}

	//misc utilities
	public static int indexOfFirstOccurence(Object [] a, Object o) {
		return Utils.indexOf(a, o, 0, a.length);
	}

	public static int indexOf(Object[] a, Object o, int start, int end) {
		for (int i = start; i < end; i++) {
			if((a[i]==null&&o==null) || a[i].equals(o))
				return i;
		}
		return -1;
	}

	public static void fileOutputStream(String fileName, boolean append, String theText)
	throws IOException {
	  FileOutputStream file = new FileOutputStream(fileName,append);
	  DataOutputStream out   = new DataOutputStream(file);
	  out.writeBytes(theText);
	  out.flush();
	  out.close();
	}

	public static String toString(String[] args) {
		String s="new String[]{";
		for (int i = 0; i < args.length; i++) {
			s+="\""+args[i]+"\"";
			if(i<args.length-1)
				s+=",";				
		}
		return s+"}";
	}

	public  static String[] subArray(String[] args, int start, int end) {
		String []out = new String[end-start];
		for (int k = start; k < end; k++) {
			out[k-start]=args[k];
		}
		return out;
	}

	public static String toString(Collection c, String sep) {
		String s = "";
		for(Object o : c) {
			s+=(o+sep);
		}
		return s;
	}

	public static String toString(Collection c) {
		return toString(c,",");
	}

	public static String toString(Map c) {
		String s = "{";
		for(Object o : c.keySet()) {
			s+=(o+"->"+c.get(o)+"\n ");
		}
		return s+"}";
	}

	static int uniqueCounter=0;

	static int getUnique() {
		return uniqueCounter++;
	}

	public static boolean isNull(Object o) {
		return o==null || o.equals("");
	}

	public static boolean contains(Collection c, Object o) {
		for (Iterator iterator = c.iterator(); iterator.hasNext();) {
			Object object = (Object) iterator.next();
			if(object.equals(o))
				return true;
		}
		return false;
	}

	public static String inputStreamAsString(InputStream in)
	    throws IOException {
	    BufferedReader br = new BufferedReader(new InputStreamReader(in));
	    StringBuilder sb = new StringBuilder();
	    String line = null;	
	    while ((line = br.readLine()) != null) {
	    	sb.append(line + "\n");
	    }	
	    br.close();
	    return sb.toString();
	}

	public static Map toMap(Object...a) {
		Map<Object,Object> m = new HashMap<Object,Object>();
		for (int i = 0; i < a.length-1; i=i+2) 
			m.put(a[i], a[i+1]);
		return m;
	}

	public static <T> T[] concat(T[] first, T[] second) {
	  T[] result = Arrays.copyOf(first, first.length + second.length);
	  System.arraycopy(second, 0, result, first.length, second.length);
	  return result;
	}

	public static <T> T[] select(T[]a, Predicate<T>p) {
		Vector<T> v = new Vector<T>();
		for (int i = 0; i < a.length; i++) {
			if(p.select(a[i]))
				v.add(a[i]);		
		}
		T[] ret = Arrays.copyOf(a, v.size());
		v.toArray(ret);
		return ret;
	}

	public static void exit(int status) {
		System.exit(status);
	}
	
	//debug utilities
	public static boolean debug=false;

	public static void debug(String msg) {
		if(debug)
			System.out.println("DEBUG: "+msg);
	}
	static File logFile=null;
	public static void logError(String s) throws IOException {
		if(logFile==null)
			System.err.println(s);
		else
			fileOutputStream(logFile.getAbsolutePath(), true, s+"\n");
	}


}
