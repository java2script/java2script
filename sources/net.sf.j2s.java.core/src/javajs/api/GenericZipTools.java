package javajs.api;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

import java.util.Map;


public interface GenericZipTools {

  public ZInputStream newZipInputStream(InputStream is);
  
  public String getZipDirectoryAsStringAndClose(BufferedInputStream t);

  public InputStream newGZIPInputStream(InputStream bis) throws IOException;

  public InputStream newBZip2InputStream(InputStream bis) throws IOException;

  public Object getZipFileDirectory(BufferedInputStream bis,
                                          String[] subFileList, int listPtr, boolean asBufferedInputStream);

  public String[] getZipDirectoryAndClose(BufferedInputStream t,
                                                 String manifestID);

  public void getAllZipData(InputStream bis, String[] subFileList,
                                String replace, String binaryFileList, String exclude,
                                Map<String, String> fileData);

  public Object getZipFileContentsAsBytes(BufferedInputStream bis,
                                                 String[] subFileList, int i);

  public void addZipEntry(Object zos, String fileName) throws IOException;

  public void closeZipEntry(Object zos) throws IOException;

  public Object getZipOutputStream(Object bos);

  public int getCrcValue(byte[] bytes);

  public void readFileAsMap(BufferedInputStream is, Map<String, Object> bdata, String name);

  public String cacheZipContents(BufferedInputStream bis, String shortName,
                                 Map<String, Object> cache, boolean asByteArray);

  BufferedInputStream getUnGzippedInputStream(byte[] bytes);
}
