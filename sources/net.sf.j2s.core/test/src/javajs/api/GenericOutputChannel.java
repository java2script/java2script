package javajs.api;

public interface GenericOutputChannel {

  boolean isBigEndian();

  void writeByteAsInt(int b);

  void write(byte[] b, int off, int n);

  void writeInt(int i);

  void reset();

  String closeChannel();

  void writeLong(long b);

  void writeShort(short i);


}
