package test.charset;

/* GB2312Unicode.java
- Copyright (c) 2015, HerongYang.com, All Rights Reserved.
*/
import java.io.*;
import java.nio.*;
import java.nio.charset.*;
class GB2312Unicode {
  static OutputStream out = null;
  static char hexDigit[] = {'0', '1', '2', '3', '4', '5', '6', '7',
                            '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
  static int b_out[] = {201,267,279,293,484,587,625,657,734,782,827,
     874,901,980,5590};
  static int e_out[] = {216,268,280,294,494,594,632,694,748,794,836,
     894,903,994,5594};
  public static void main(String[] args) {
     try {
        out = new FileOutputStream("gb2312_unicode.gb");
        writeCode();
        out.close();
     } catch (IOException e) {
        System.out.println(e.toString());
     }
  }
  public static void writeCode() throws IOException {
	  
	 IntBuffer ibuf = IntBuffer.allocate(0x10000);
     boolean reserved = false;
     String name = null;
     // GB2312 is not supported by JDK. So I am using GBK.
     CharsetDecoder gbdc = Charset.forName("GBK").newDecoder();
     CharsetEncoder uxec = Charset.forName("UTF-16BE").newEncoder();
     CharsetEncoder u8ec = Charset.forName("UTF-8").newEncoder();
     ByteBuffer gbbb = null;
     ByteBuffer uxbb = null;
     ByteBuffer u8bb = null;
     CharBuffer cb = null;
     int count = 0;
     for (int i=1; i<=94; i++) {
        // Defining row settings
        if (i>=1 && i<=9) {
           reserved = false;
           name = "Graphic symbols";
        } else if (i>=10 && i<=15) {
           reserved = true;
           name = "Reserved";
        } else if (i>=16 && i<=55) {
           reserved = false;
           name = "Level 1 characters";
        } else if (i>=56 && i<=87) {
           reserved = false;
           name = "Level 2 characters";
        } else if (i>=88 && i<=94) {
           reserved = true;
           name = "Reserved";
        }
        // writing row title
        writeln();
        writeString("<p>");
        writeNumber(i);
        writeString(" Row: "+name);
        writeln();
        writeString("</p>");
        writeln();
        if (!reserved) {
           writeln();
           writeHeader();
          // looping through all characters in one row
           for (int j=1; j<=94; j++) {
              byte hi = (byte)(0xA0 + i);
              byte lo = (byte)(0xA0 + j);
              if (validGB(i,j)) {
                 // getting GB, UTF-16BE, UTF-8 codes
                 gbbb = ByteBuffer.wrap(new byte[]{hi,lo});
                 try {
                    cb = gbdc.decode(gbbb);
                    uxbb = uxec.encode(cb);
                    cb.rewind();
                    u8bb = u8ec.encode(cb);
                 } catch (CharacterCodingException e) {
                    cb = null;
                    uxbb = null;
                    u8bb = null;
                 }
              } else {
                 cb = null;
                 uxbb = null;
                 u8bb = null;
              }
              writeNumber(i);
              writeNumber(j);
              writeString(" ");
              if (cb!=null) {
                 writeByte(hi);
                 writeByte(lo);
                 writeString(" ");
                 writeHex(hi);
                 writeHex(lo);
                 count++;
              } else {
                 writeGBSpace();
                 writeString(" null");
              }
              writeString(" ");
              writeByteBuffer(uxbb,2);
              writeString(" ");
              writeByteBuffer(u8bb,3);
              if (j%2 == 0) {
                 writeln();
              } else {
                 writeString("   ");
              }
           }
           writeFooter();
        }
     }
     System.out.println("Number of GB characters wrote: "+count);
  }
  public static void writeln() throws IOException {
     out.write(0x0D);
     out.write(0x0A);
  }
  public static void writeByte(byte b) throws IOException {
     out.write(b & 0xFF);
  }
  public static void writeByteBuffer(ByteBuffer b, int l)
     throws IOException {
     int i = 0;
     if (b==null) {
     	 writeString("null");
     	 i = 2;
     } else {
	for (i=0; i<b.limit(); i++) writeHex(b.get(i));
     }
     for (int j=i; j<l; j++) writeString("  ");
  }
  public static void writeGBSpace() throws IOException {
     out.write(0xA1);
     out.write(0xA1);
  }
  public static void writeString(String s) throws IOException {
     if (s!=null) {
        for (int i=0; i<s.length(); i++) {
           out.write((int) (s.charAt(i) & 0xFF));
        }
     }         
  }
  public static void writeNumber(int i) throws IOException {
     String s = "00" + String.valueOf(i);
     writeString(s.substring(s.length()-2,s.length()));
  }
  public static void writeHex(byte b) throws IOException {
     out.write((int) hexDigit[(b >> 4) & 0x0F]);
     out.write((int) hexDigit[b & 0x0F]);
  }
  public static void writeHeader() throws IOException {
     writeString("<pre>");
     writeln();
     writeString("Q.W. ");
     writeGBSpace();
     writeString(" GB   Uni. UTF-8 ");
     writeString("   ");
     writeString("Q.W. ");
     writeGBSpace();
     writeString(" GB   Uni. UTF-8 ");
     writeln();
     writeln();
  }
  public static void writeFooter() throws IOException {
     writeString("</pre>");
     writeln();
  }
  public static boolean validGB(int i,int j) {
     for (int l=0; l<b_out.length; l++) {
        if (i*100+j>=b_out[l] && i*100+j<=e_out[l]) return false; 
     }
     return true;
  }
}