package test;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringBufferInputStream;
import java.io.StringReader;
import java.util.ArrayList;

import java.util.List;

import javajs.util.Rdr;

public class CSVParser {
	/**
	 * read the stream; do NOT close the stream, though.
	 * 
	 * @param is
	 * @return List of List of String
	 */
	public static List<List<String>> parse(InputStream is) {
		try {
			String s = Rdr.streamToString(is);
			if (s == null)
				return null;
			int len = s.length();
			List<List<String>> ret = new ArrayList<>();
			if (len == 0)
				return ret;
			List<String> items = null;
			boolean quoted = false;
			boolean emptyLine = true;
			boolean qq = false;
			int q0 = -1, q1 = 0, pt = 0;
			for (int i = 0; i <= len; i++) {
				int ch = (i == len ? '\n' : s.codePointAt(i));
				if (ch == '"') {
					emptyLine = false;
					if (pt == i) {
						quoted = true;
						q0 = pt + 1;
					} else {
						quoted = !quoted;
						if (quoted) {
							qq = true;
						} else if (q0 > 0) {
							q1 = i;
						}
					}
					continue;
				}
				if (quoted)
					continue;
				switch (ch) {
				case 0xFEFF:
					// unicode flag
					pt = i + 1;
					break;
				case ',':
					emptyLine = false;
					//$FALL_THROUGH$
				case '\n':
				case '\r':
					if (emptyLine) {
						pt = i + 1;
						continue;
					}
					if (items == null)
						items = new ArrayList<>();
					String item;
					if (q0 > 0) {
						item = s.substring(q0, q1);
						if (qq)
							item = item.replaceAll("\"\"", "\"");
					} else {
						item = s.substring(pt, i);
					}
					items.add(item);
					q0 = 0;
					qq = false;
					pt = i + 1;
					if (ch != ',') {
						ret.add(items);
						items = null;
						emptyLine = true;
					}
					break;
				default:
					emptyLine = false;
					break;
				}
			}
			return ret;
		} catch (IOException e) {
			return null;
		}
	}

	public static void main(String[] args) {
		try {
			System.out.println(parse(new FileInputStream("c:/temp/t.csv")));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
