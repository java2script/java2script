package javajs.api;

public interface GenericBinaryDocumentReader {

  byte readByte() throws Exception;

  byte[] readBytes(int n) throws Exception;

  int readUInt8() throws Exception;

  int readInt() throws Exception;

  short readShort() throws Exception;

  int readUnsignedShort() throws Exception;

  long readLong() throws Exception;

  float readFloat() throws Exception;

  double readDouble() throws Exception;

  String readString(int i) throws Exception;

}
