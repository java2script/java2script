package javajs.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

/**
 * Just a simple abstract class to join a String reader and a String[]
 * reader under the same BufferedReader umbrella.
 * 
 * Subclassed as StringDataReader, ArrayDataReader, and ListDataReader
 * 
 */

public abstract class DataReader extends BufferedReader {

  public abstract DataReader setData(Object data);
  
  protected int ptMark;

  public DataReader() {
    super(new StringReader(""));
  }

  protected DataReader(Reader in) {
    super(in);
  }

  public BufferedReader getBufferedReader() {
    return this;
  }

  protected int readBuf(char[] buf, int off, int len) throws IOException {
    // not used by StringDataReader
    int nRead = 0;
    String line = readLine();
    if (line == null)
      return 0;
    int linept = 0;
    int linelen = line.length();
    for (int i = off; i < len && linelen >= 0; i++) {
      if (linept >= linelen) {
        linept = 0;
        buf[i] = '\n';
        line = readLine();
        linelen = (line == null ? -1 : line.length());
      } else {
        buf[i] = line.charAt(linept++);
      }
      nRead++;
    }
    return nRead;
  }

}