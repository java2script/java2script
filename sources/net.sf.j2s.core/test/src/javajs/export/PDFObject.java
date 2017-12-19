package javajs.export;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Hashtable;
import java.util.Map;
import java.util.Map.Entry;
import java.util.zip.Deflater;
import java.util.zip.DeflaterOutputStream;

import javajs.util.SB;


/**
 * A rudimentary class for working with PDF document creation.
 * Written from scratch based on PDF Reference 13.
 * 
 * @author hansonr  Bob Hanson hansonr@stolaf.edu  10/28/2013
 * 
 */
class PDFObject extends SB {	
	private Map<String, Object> dictionary;
	private byte[] stream;
	private int index;
	String type;
	int len;
	int pt;
	
	PDFObject(int index) {
		this.index = index;
	}

	String getRef() {
		return index + " 0 R";
	}
	
	String getID() {
		return type.substring(0, 1) + index;
	}
	
	boolean isFont() {
		return "Font".equals(type);
	}

	void setStream(byte[] stream) {
		this.stream = stream;
	}

	Object getDef(String key) {
		return dictionary.get(key);
	}
	
	void addDef(String key, Object value) {
		if (dictionary  == null)
			dictionary = new Hashtable<String, Object>();
		dictionary.put(key, value);
		if (key.equals("Type"))
			type = ((String) value).substring(1);
	}
	
	void setAsStream() {
		stream = toBytes(0, -1);
		setLength(0);
	}
	
	int output(OutputStream os) throws IOException {
		if (index > 0) {
			String s = index + " 0 obj\n";
			write(os, s.getBytes(), 0);
		}
		int streamLen = 0;
		if (dictionary != null) {
			if (dictionary.containsKey("Length")) {
				if (stream == null)
					setAsStream();
				streamLen = stream.length;
				boolean doDeflate = (streamLen > 1000);
        if (doDeflate) {
          Deflater deflater = new Deflater(9);
          ByteArrayOutputStream outBytes = new ByteArrayOutputStream(1024);
          DeflaterOutputStream compBytes = new DeflaterOutputStream(outBytes,
              deflater);
          compBytes.write(stream, 0, streamLen);
          compBytes.finish();
          stream = outBytes.toByteArray();
          dictionary.put("Filter", "/FlateDecode");
          streamLen = stream.length;
        }
				dictionary.put("Length", "" + streamLen);
			}
			write(os, getDictionaryText(dictionary, "\n").getBytes(), 0);
		}
		if (length() > 0)
			write(os, this.toString().getBytes(), 0);
		if (stream != null) {
			write(os, "stream\r\n".getBytes(), 0);
			write(os, stream, streamLen);
			write(os, "\r\nendstream\r\n".getBytes(), 0);
		}
		if (index > 0)
			write(os, "endobj\n".getBytes(), 0);
		return len;
	}

	private void write(OutputStream os, byte[] bytes, int nBytes) throws IOException {
		if (nBytes == 0)
			nBytes = bytes.length;
		len += nBytes;
		os.write(bytes, 0, nBytes);
	}

	@SuppressWarnings("unchecked")
	private String getDictionaryText(Map<String, Object> d, String nl) {
		SB sb = new SB();
		sb.append("<<");
		if (d.containsKey("Type"))
			sb.append("/Type").appendO(d.get("Type"));
		for (Entry<String, Object> e : d.entrySet()) {
			String s = e.getKey();
			if (s.equals("Type") || s.startsWith("!"))
				continue;
			sb.append("/" + s);
			Object o = e.getValue();
			if (o instanceof Map<?, ?>) {
				sb.append((getDictionaryText((Map<String, Object>) o, "")));
				continue;
			}
			s = (String) e.getValue();
			if (!s.startsWith("/"))
				sb.append(" ");
			sb.appendO(s);
		}
		return (sb.length() > 3 ? sb.append(">>").append(nl).toString() : "");
	}

	@SuppressWarnings("unchecked")
	private Map<String, Object> createSubdict(Map<String, Object> d0, String dict) {
		Map<String, Object> d = (Map<String, Object>) d0.get(dict);
		if (d == null)
			d0.put(dict, d = new Hashtable<String, Object>());
		return d;
	}

	void addResource(String type, String key, String value) {
		Map<String, Object> r = createSubdict(dictionary, "Resources");
		if (type != null)
			r = createSubdict(r, type);
		r.put(key, value);
	}
	
}
