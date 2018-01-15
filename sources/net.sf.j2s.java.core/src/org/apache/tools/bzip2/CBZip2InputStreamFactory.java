package org.apache.tools.bzip2;

import java.io.IOException;
import java.io.InputStream;

public class CBZip2InputStreamFactory {
  
  /**
   * jsjava addition for reflection
   * 
   * @param is
   * @return BZip2 input stream
   * @throws IOException 
   */
  public CBZip2InputStream getStream(InputStream is) throws IOException {
    is.read(new byte[2], 0, 2);
    return new CBZip2InputStream(is);
  }

}

