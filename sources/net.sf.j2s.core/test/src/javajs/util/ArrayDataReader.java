package javajs.util;

import java.io.IOException;






/**
 * 
 * ArrayDataReader subclasses BufferedReader and overrides its
 * read, readLine, mark, and reset methods so that JmolAdapter 
 * works with String[] arrays without any further adaptation. 
 * 
 */

public class ArrayDataReader extends DataReader {
  private String[] data;
  private int pt;
  private int len;

  public ArrayDataReader() {
    super();
  }
  
  @Override
  public DataReader setData(Object data) {
    this.data = (String[]) data;
    len = this.data.length;
    return this;
  }

  @Override
  public int read(char[] buf, int off, int len) throws IOException {
    return readBuf(buf, off, len);
  }

  @Override
  public String readLine() {
    return (pt < len ? data[pt++] : null);
  }

  /**
   * 
   * @param ptr
   */
  public void mark(long ptr) {
    //ignore ptr.
    ptMark = pt;
  }

  @Override
  public void reset() {
    pt = ptMark;
  }
}