package javajs.api;


import java.io.InputStream;
import java.util.zip.ZipInputStream;

public class GenericZipInputStream extends ZipInputStream implements ZInputStream {
  
  public GenericZipInputStream(InputStream in) {
    super(in);
  }
  
}