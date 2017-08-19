package javajs.api;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.InputStream;
import java.util.Map;


import javajs.util.SB;

public interface GenericBinaryDocument extends GenericBinaryDocumentReader {

  GenericBinaryDocument setStream(BufferedInputStream bis, boolean isBigEndian);

  void setStreamData(DataInputStream dataInputStream, boolean isBigEndian);

  long getPosition();

  SB getAllDataFiles(String binaryFileList, String firstFile);

  void getAllDataMapped(String replace, String string, Map<String, String> fileData);

  int swapBytesI(int nx);

  short swapBytesS(short s);

  void seek(long i);

  void setOutputChannel(GenericOutputChannel out);

  InputStream getInputStream();

  int readIntLE() throws Exception;

  int readByteArray(byte[] b, int off, int len) throws Exception;


  void close();

}
