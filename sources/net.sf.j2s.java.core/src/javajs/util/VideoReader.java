package javajs.util;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * A class to gather data about video file format and codecs.
 * Minimally fleshed out; does read MP4 and MOV files, though.
 * 
 * @author hansonr
 *
 */
public class VideoReader {
	int pt = 0;		
	String blockType;
	int blockLen;
	byte[] buf = new byte[10]; 
	protected DataInputStream is;
	protected String codec;
	protected boolean verbose;
	protected String fileType;
	private List<Map<String, Object>> contents;
	private int timeScale;
	private Map<String, Object> thisTrackMap;
	
	public String getCodec() {
		return codec;
	}
	
	public String getFileType() {
		return fileType;
	}

	public VideoReader(File f) throws FileNotFoundException {
		this(new FileInputStream(f));
	}

	public VideoReader(String path) throws IOException {
		getStream(path.indexOf("://") > 0 ? new URL(path).openStream() : new FileInputStream(path));
	}

	public VideoReader(InputStream stream) {
		getStream(stream);
	}

	private void getStream(InputStream stream) {
		if (stream instanceof DataInputStream) {
			is = (DataInputStream) stream;
		} else {
			is = new DataInputStream(stream);
		}
	}

	public List<Map<String, Object>> getContents(boolean verbose) {
		contents = new ArrayList<>();
		this.verbose = verbose;
		while (isAvail()) {
			try {
				readBlock(contents);
			} catch (IOException e) {
				break;
			}
		}
		try {
			is.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return contents;
	}
	
	protected void readBlock(List<Map<String, Object>> contents) throws IOException {
		int pt = this.pt;
		blockLen = readInt();
		blockType = readString(4);
		if (verbose)
			System.out.println(blockType + "\t" + pt + "\t0x" + Long.toHexString(pt) + "\t" + blockLen);
		Map<String, Object> map = new Hashtable<>();
		map.put("_pt", pt);
		map.put("_type", blockType);
		map.put("_len", blockLen);
		contents.add(map);
		int remaining = readBlock(blockType, blockLen - 8, map);
		if (remaining < 0) {
			pt = -1;
			return;
		}
		skip(remaining);
	}

	/**
	 * Read a block and return the number of remaining bytes, usually 0.
	 * 
	 * @param blockType
	 * @param len
	 * @param map to fill
	 * @return
	 * @throws IOException
	 */
	protected int readBlock(String blockType, int len, Map<String, Object> map) throws IOException {
		switch (blockType) {
		case "ftyp":
			len = readFTYP(len, map);
			break;
		case "trak":
			len = readInner(len, map);
			if (verbose)
				dumpMap(thisTrackMap, "tkhd");
			thisTrackMap = null;
			break;
		case "moov":
		case "mdia":
		case "minf":
		case "stbl":
			len = readInner(len, map);
			break;
		case "mvhd":
			len = readMVHD(len, map);
			break;
		case "tkhd":
			thisTrackMap = map;
			len = readTKHD(len, map);
			break;
		case "stsd":
			len = readSTSD(len, map);
			break;
		case "smhd":
		case "vmhd":
			thisTrackMap.put("_trackType", (blockType.equals("smhd") ? "sound" : "video"));
			// fall through;
		default:
			skip(len);
			len = 0;
			break;
		}
		return (int) len;
	}

	protected int readInner(int len, Map<String, Object> map) throws IOException {
		List<Map<String, Object>> list = new ArrayList<>();
		map.put("blocks", list);
		while (len > 0) {
			int p = pt;
			readBlock(list);
			len -= (pt - p);
		}
		return 0;
	}

	protected int readFTYP(int len, Map<String, Object> map) throws IOException {
		String info = "";
		while (len > 0) {
			String s = readString(4);
			len -= 4;
			if (s.charAt(0) != '\0')
				info += s + " ";
		}
		info = info.trim();
		if (verbose)
			System.out.println("filetype=" + info);
		fileType = info;
		return len;
	}

	protected int readMVHD(int len, Map<String, Object> map) throws IOException {
		map.put("version_flags", readInt()); 
		map.put("creationTime", readUIntLong());
		map.put("modificationTime", readUIntLong());
		timeScale = readInt();
		int dur = readInt();
		map.put("timeScale", timeScale);
		map.put("duration", dur);
		map.put("_duration(sec)", 1.0 * dur / timeScale);
		map.put("preferredRate", readInt());
		map.put("preferredVolume", readShort());
		if (verbose)
			dumpMap(map, "mvhd");
		skip(len - 26);
		return 0;
	}

	private void dumpMap(Map<String, Object> map, String name) {
		for (Entry<String, Object> e : map.entrySet()) {
			System.out.println(name + "." + e.getKey() + ": " + e.getValue());			
		}
	}

	protected int readTKHD(int len, Map<String, Object> map) throws IOException {
		map.put("version_flags", readInt()); 
		map.put("creationTime", readUIntLong());
		map.put("modificationTime", readUIntLong());
		map.put("trackID", readInt());
		readInt(); // reserved
		int dur = readInt();
		map.put("duration", dur);
		map.put("_duration(sec)", 1.0 * dur / timeScale);
		skip(len - 24);
		return 0;
	}

	protected int readSTSD(int len, Map<String, Object> map) throws IOException {
		map.put("version_flags", readInt()); 
		map.put("entryCount", readInt());
		map.put("size", readInt());
		if (codec == null)
			codec = "";
		else
			codec += ",";
		codec += readString(4);
		if (verbose)
			System.out.println("codec=" + codec);
		skip(len - 16);
		return 0;
	}

	protected void skip(int n) throws IOException {
		if (n <= 0)
			return;
		pt += n;
		is.skipBytes(n);
	}

	/**
	 * Read bytes into field buf.
	 * 
	 * @param n number of bytes
	 * @return field bytes, filled [0,n)
	 * @throws IOException
	 */
	protected byte[] readBytes(int n) throws IOException {
		pt += n;
		if (n > buf.length)
			buf = new byte[n << 1];
		is.read(buf, 0, n);
		return buf;
	}

	protected long readUIntLong() throws IOException {
		pt += 4;
		return is.readInt() & 0xFFFFFFFFL;
	}

	@SuppressWarnings("unused")
	protected boolean isAvail() {
		try {
			return (pt != -1 && is.available() > 0);
		} catch (IOException e) {
			return false;
		}
	}

	protected int readInt() throws IOException {
		pt += 4;
		return is.readInt();
	}

	protected int readShort() throws IOException {
		pt += 2;
		return is.readShort();
	}

	protected String readString(int n) throws IOException {
		return new String(readBytes(n), 0, n);
	}

}