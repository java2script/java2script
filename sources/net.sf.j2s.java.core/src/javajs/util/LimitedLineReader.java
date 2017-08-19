package javajs.util;

import java.io.BufferedReader;

/**
 *  A simple class to read a designated number of bytes from a 
 *  file and then return them line by line, skipping lines that
 *  start with #, and including the \n or \r characters at line ends.
 *  
 *  Generally useful for determining what sort of data a file contains.
 *   
 */
public class LimitedLineReader {
  private char[] buf;
  private int cchBuf;
  private int ichCurrent;

  public LimitedLineReader(BufferedReader bufferedReader, int readLimit)
    throws Exception {  
    bufferedReader.mark(readLimit + 1);
    buf = new char[readLimit];
    cchBuf = Math.max(bufferedReader.read(buf, 0, readLimit), 0);
    ichCurrent = 0;
    bufferedReader.reset();
  }

  public String getHeader(int n) {
    return (n == 0 ? new String(buf) : new String(buf, 0, Math.min(cchBuf, n)));
  }
  
  public String readLineWithNewline() {
    while (ichCurrent < cchBuf) {
      int ichBeginningOfLine = ichCurrent;
      char ch = 0;
      while (ichCurrent < cchBuf &&
             (ch = buf[ichCurrent++]) != '\r' && ch != '\n') {
      }
      if (ch == '\r' && ichCurrent < cchBuf && buf[ichCurrent] == '\n')
        ++ichCurrent;
      int cchLine = ichCurrent - ichBeginningOfLine;
      if (buf[ichBeginningOfLine] == '#')
        continue; // flush comment lines;
      return new String(buf, ichBeginningOfLine, cchLine);
    }
    return "";
  }
}

