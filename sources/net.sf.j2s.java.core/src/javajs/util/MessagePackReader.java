package javajs.util;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.util.Hashtable;
import java.util.Map;

import javajs.api.GenericBinaryDocumentReader;

/**
 * A simple MessagePack reader. See https://github.com/msgpack/msgpack/blob/master/spec.md
 * with very few dependencies.
 * 
 * Nuances: 
 * 
 *  Does not implement unsigned int32 or int64 (delivers simple integers in all cases).
 *  Does not use doubles; just floats
 *  
 * Note: 
 * 
 *  homogeneousArrays == true will deliver null for empty array.
 * 
 * 
 * Use in MMTF:
 * 
 * 
 *     BufferedInputStream bs = [whatever]
 *     
 *      GenericBinaryDocument binaryDoc =  new javajs.util.BinaryDocument();
 *   
 *      binaryDoc.setStream(bs, true);
 * 
 * 
 *     map = (new MessagePackReader(binaryDoc, true)).readMap();
 * 
 *     entities = (Object[]) map.get("entityList");
 *
 *     float[] x = (float[]) decode((byte[]) map.get("xCoordList"))
 *     
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 */

public class MessagePackReader {

  private GenericBinaryDocumentReader doc;

  private boolean isHomo;// homogeneous arrays -- use int[] not Integer

  // these maps must be checked for the specific number of bits, in the following order:
  private final static int POSITIVEFIXINT_x80 = 0x80; //0xxxxxxx
  private final static int FIXMAP_xF0         = 0x80; //1000xxxx
//  private final static int FIXARRAY_xF0       = 0x90; //1001xxxx
  private final static int FIXSTR_xE0         = 0xa0; //101xxxxx
  private final static int NEGATIVEFIXINT_xE0 = 0xe0; //111xxxxx
  private final static int DEFINITE_xE0       = 0xc0; //110xxxxx
  
  private final static int NIL          = 0xc0;
//  private final static int (NEVERUSED)        = 0xc1;
  private final static int FALSE        = 0xc2;
  private final static int TRUE         = 0xc3;
  private final static int BIN8         = 0xc4;
  private final static int BIN16        = 0xc5;
  private final static int BIN32        = 0xc6;
  private final static int EXT8         = 0xc7;
  private final static int EXT16        = 0xc8;
  private final static int EXT32        = 0xc9;
  private final static int FLOAT32      = 0xca;
  private final static int FLOAT64      = 0xcb;
  private final static int UINT8        = 0xcc;
  private final static int UINT16       = 0xcd;
  private final static int UINT32       = 0xce;
  private final static int UINT64       = 0xcf;
  private final static int INT8         = 0xd0;
  private final static int INT16        = 0xd1;
  private final static int INT32        = 0xd2;
  private final static int INT64        = 0xd3;
  private final static int FIXEXT1      = 0xd4;
  private final static int FIXEXT2      = 0xd5;
  private final static int FIXEXT4      = 0xd6;
  private final static int FIXEXT8      = 0xd7;
  private final static int FIXEXT16     = 0xd8;
  private final static int STR8         = 0xd9;
  private final static int STR16        = 0xda;
  private final static int STR32        = 0xdb;
  private final static int ARRAY16      = 0xdc;
  private final static int ARRAY32      = 0xdd;
  private final static int MAP16        = 0xde;
  private final static int MAP32        = 0xdf;

  public MessagePackReader(GenericBinaryDocumentReader binaryDoc, boolean isHomogeneousArrays) {
    isHomo = isHomogeneousArrays;
    doc = binaryDoc;
  }

  public MessagePackReader() {
    // for reflection
  }
  
  public Map<String, Object> getMapForStream(BufferedInputStream is) throws Exception {
    doc = new BinaryDocument().setStream(is, true);
    Map<String, Object> map = readMap();
    is.close();
    return map;
  }
  
  @SuppressWarnings("unchecked")
  public Map<String, Object> readMap() throws Exception {
    return (Map<String, Object>) getNext(null, 0);
  }
  
  public Object getNext(Object array, int pt) throws Exception {
    int b = doc.readByte() & 0xFF;
    int be0 = b & 0xE0;
    if ((b & POSITIVEFIXINT_x80) == 0) {
      if (array != null) {
        ((int[]) array)[pt] = b;
        return null;
      }
      return Integer.valueOf(b);
    }
    switch (be0) {
    case NEGATIVEFIXINT_xE0:
      b = BC.intToSignedInt(b | 0xFFFFFF00);
      if (array != null) {
        ((int[]) array)[pt] = b;
        return null;
      }
      return Integer.valueOf(b);
    case FIXSTR_xE0: {
      String s = doc.readString(b & 0x1F);
      if (array != null) {
        ((String[]) array)[pt] = s; 
        return null;
      } 
      return s;
    }
    case FIXMAP_xF0:
      return ((b & 0xF0) == FIXMAP_xF0 ? getMap(b & 0x0F) : getArray(b & 0x0F));
    case DEFINITE_xE0:
      switch (b) {
      case NIL:
        return null;
      case FALSE:
        return Boolean.FALSE;
      case TRUE:
        return Boolean.TRUE;
      case EXT8:
        return getObject(doc.readUInt8());
      case EXT16:
        return getObject(doc.readUnsignedShort());
      case EXT32:
        return getObject(doc.readInt()); // should be unsigned int
      case FIXEXT1:
        return getObject(1);
      case FIXEXT2:
        return getObject(2);
      case FIXEXT4:
        return getObject(4);
      case FIXEXT8:
        return getObject(8);
      case FIXEXT16:
        return getObject(16);
      case ARRAY16:
        return getArray(doc.readUnsignedShort());
      case ARRAY32:
        return getArray(doc.readInt());
      case MAP16:
        return getMap(doc.readUnsignedShort());
      case MAP32:
        return getMap(doc.readInt());

        // binary arrays:

      case BIN8:
        return doc.readBytes(doc.readUInt8());
      case BIN16:
        return doc.readBytes(doc.readUnsignedShort());
      case BIN32:
        return doc.readBytes(doc.readInt());
      }
      if (array == null) {
        switch (b) {
        case FLOAT32:
          return Float.valueOf(doc.readFloat());
        case FLOAT64:
          return Float.valueOf((float) doc.readDouble());
        case UINT8:
          return Integer.valueOf(doc.readUInt8());
        case UINT16:
          return Integer.valueOf(doc.readUnsignedShort());
        case UINT32:
          return Integer.valueOf(doc.readInt()); // technically should be UInt32
        case UINT64:
          return Long.valueOf(doc.readLong()); // should be unsigned long; incompatible with JavaScript!
        case INT8:
          return Integer.valueOf(doc.readByte());
        case INT16:
          return Integer.valueOf(doc.readShort());
        case INT32:
          return Integer.valueOf(doc.readInt()); // should be Unsigned Int here
        case INT64:
          return Long.valueOf(doc.readLong());
        case STR8:
          return doc.readString(doc.readUInt8());
        case STR16:
          return doc.readString(doc.readShort());
        case STR32:
          return doc.readString(doc.readInt());
        }
      } else {
        switch (b) {
        case FLOAT32:
          ((float[]) array)[pt] = doc.readFloat();
          break;
        case FLOAT64:
          ((float[]) array)[pt] = (float) doc.readDouble();
          break;
        case UINT8:
          ((int[]) array)[pt] = doc.readUInt8();
          break;
        case UINT16:
          ((int[]) array)[pt] = doc.readUnsignedShort();
          break;
        case UINT32:
          ((int[]) array)[pt] =  doc.readInt(); // should be unsigned int
          break;
        case UINT64:
          ((int[]) array)[pt] =  (int) doc.readLong(); // should be unsigned long; incompatible with JavaScript!
          break;
        case INT8:
          ((int[]) array)[pt] =  doc.readByte();
          break;
        case INT16:
          ((int[]) array)[pt] = doc.readShort();
          break;
        case INT32:
          ((int[]) array)[pt] =  doc.readInt(); // should be Unsigned Int here
          break;
        case INT64:
          ((int[]) array)[pt] =  (int) doc.readLong();
          break;
        case STR8:
          ((String[]) array)[pt] = doc.readString(doc.readUInt8());
          break;
        case STR16:
          ((String[]) array)[pt] = doc.readString(doc.readShort());
          break;
        case STR32:
          ((String[]) array)[pt] = doc.readString(doc.readInt());
          break;
        }
      }
    }
    return null;
  }

  private Object getObject(int n) throws Exception {
    return new Object[] { Integer.valueOf(doc.readUInt8()), doc.readBytes(n) };
  }

  private Object getArray(int n) throws Exception {
    if (isHomo) {
      if (n == 0)
        return null;
      Object v = getNext(null, 0);
      if (v instanceof Integer) {
        int[] a = new int[n];
        a[0] = ((Integer) v).intValue();
        v = a;
      } else if (v instanceof Float) {
        float[] a = new float[n];
        a[0] = ((Float) v).floatValue();
        v = a;
      } else if (v instanceof String) {
        String[] a = new String[n];
        a[0] = (String) v;
        v = a;
      } else {
        Object[] o = new Object[n];
        o[0] = v;
        for (int i = 1; i < n; i++)
          o[i] = getNext(null, 0);
        return o;
      }
      for (int i = 1; i < n; i++)
        getNext(v, i);
      return v;
    }
    Object[] o = new Object[n];
    for (int i = 0; i < n; i++)
      o[i] = getNext(null, 0);
    return o;
  }

  private Object getMap(int n) throws Exception {
    Map<String, Object> map = new Hashtable<String, Object>();
    for (int i = 0; i < n; i++) {
      String key = getNext(null, 0).toString();
      //Logger.info(key);

      Object value = getNext(null, 0);
      if (value == null) {
        //Logger.info("null value for " + key);
      } else {
        map.put(key, value);
      }
    }
    return map;
  }

  /////////////// MMTF MessagePack decoding ///////////////

  /**
   * This single method takes care of all MMTF needs.
   * 
   * See https://github.com/rcsb/mmtf/blob/master/spec.md
   * 
   * @param b
   * 
   * @return array of int, char, or float, depending upon the type
   */
  public static Object decode(byte[] b) {
    int type = BC.bytesToInt(b, 0, true);
    int n = BC.bytesToInt(b, 4, true);
    int param = BC.bytesToInt(b, 8, true);
    switch (type) {
    case 1:
      return getFloats(b, n, 1);
    case 2: // 1-byte
    case 3: // 2-byte
    case 4: // 4-byte
      return getInts(b, n);
    case 5:
      return rldecode32ToStr(b);
    case 6:
      return rldecode32ToChar(b, n);
    case 7:
      return rldecode32(b, n);
    case 8:
      return rldecode32Delta(b, n);
    case 9:
      return rldecodef(b, n, param);
    case 10:
      return unpack16Deltaf(b, n, param);
    case 11:
      return getFloats(b, n, param);
    case 12: // two-byte
    case 13: // one-byte
      return unpackf(b, 14 - type, n, param);
    case 14: // two-byte
    case 15: // one-byte
      return unpack(b, 16 - type, n);
    default:
      System.out.println("MMTF type " + type + " not found!");
      return null;
   }
  }

  /**
   * mmtf type 1 and 11
   * 
   * byte[4] to float32
   * 
   * @param b
   * @param n
   * @param divisor
   * @return array of floats
   */
  public static float[] getFloats(byte[] b, int n, float divisor) {
    if (b == null)
      return null;
    float[] a = new float[n];
    try {
      switch ((b.length - 12) / n) {  
      case 2:
        for (int i = 0, j = 12; i < n; i++, j += 2)
          a[i] = BC.bytesToShort(b, j, false) / divisor;
        break;
      case 4:
        for (int i = 0, j = 12; i < n; i++, j += 4)
          a[i] = BC.bytesToFloat(b, j, false);
        break;
      }
    } catch (Exception e) {
    }
    return a;
  }

  /**
   * mmtf types 2-4
   * 
   * Decode a byte array into a byte, short, or int array.
   * 
   * @param b
   * @param n
   *        
   * @return array of integers
   */
  public static int[] getInts(byte[] b, int n) {
    if (b == null)
      return null;
    int[] a = new int[n];
    switch ((b.length - 12) / n) {
    case 1:
      for (int i = 0, j = 12; i < n; i++, j++)
        a[i] = b[j];
      break;
    case 2:
      for (int i = 0, j = 12; i < n; i++, j += 2)
        a[i] = BC.bytesToShort(b, j, true);
      break;
    case 4:
      for (int i = 0, j = 12; i < n; i++, j += 4)
        a[i] = BC.bytesToInt(b, j, true);
      break;
    }
    return a;
  }

  /**
   * mmtf type 5
   * 
   * Decode each four bytes as a 1- to 4-character string label where a 0 byte
   * indicates end-of-string.
   * 
   * @param b
   *        a byte array
   * @return String[]
   */
  public static String[] rldecode32ToStr(byte[] b) {
    String[] id = new String[(b.length - 12) / 4];
    out: for (int i = 0, len = id.length, pt = 12; i < len; i++) {
      SB sb = new SB();
      for (int j = 0; j < 4; j++) {
        switch (b[pt]) {
        case 0:
          id[i] = sb.toString();
          pt += 4 - j;
          continue out;
        default:
          sb.appendC((char) b[pt++]);
          if (j == 3)
            id[i] = sb.toString();
          continue;
        }
      }
    }
    return id;
  }

  /**
   * mmtf type 6
   * 
   * Decode an array of int32 using run-length decoding to one char per int.
   * 
   * @param b
   * @param n
   * @return array of characters
   */
  public static char[] rldecode32ToChar(byte[] b, int n) {
    if (b == null)
      return null;
    char[] ret = new char[n];
    for (int i = 0, pt = 3; i < n;) {
      char val = (char) b[((pt++) << 2) + 3];
      for (int j = BC.bytesToInt(b, (pt++) << 2, true); --j >= 0;)
        ret[i++] = val;
    }
    return ret;
  }

  /**
   * mmtf type 7
   * 
   * Decode an array of int32 using run-length decoding.
   * 
   * @param b
   * @param n
   * @return array of integers
   */
  public static int[] rldecode32(byte[] b, int n) {
    if (b == null)
      return null;
    int[] ret = new int[n];
    for (int i = 0, pt = 3; i < n;) {
      int val = BC.bytesToInt(b, (pt++) << 2, true);
      for (int j = BC.bytesToInt(b, (pt++) << 2, true); --j >= 0;)
        ret[i++] = val;
    }
    return ret;
  }

  /**
   * mmtf type 8
   * 
   * Decode an array of int32 using run-length decoding of a difference array.
   * 
   * @param b
   * @param n
   * @return array of integers
   */
  public static int[] rldecode32Delta(byte[] b, int n) {
    if (b == null)
      return null;
    int[] ret = new int[n];
    for (int i = 0, pt = 3, val = 0; i < n;) {
      int diff = BC.bytesToInt(b, (pt++) << 2, true);
      for (int j = BC.bytesToInt(b, (pt++) << 2, true); --j >= 0;)
        ret[i++] = (val = val + diff);
    }
    return ret;
  }

  /**
   * mmtf type 9
   * 
   * Decode an array of int32 using run-length decoding and divide by a divisor
   * to give a float32.
   * 
   * @param b
   * @param n
   * @param divisor
   * @return array of floats
   */
  public static float[] rldecodef(byte[] b, int n, float divisor) {
    if (b == null)
      return null;
    float[] ret = new float[n];
    for (int i = 0, pt = 3; i < n;) {
      int val = BC.bytesToInt(b, (pt++) << 2, true);
      for (int j = BC.bytesToInt(b, (pt++) << 2, true); --j >= 0;)
        ret[i++] = val / divisor;
    }
    return ret;
  }

  /**
   * 
   * mmtf type 10
   * 
   * Decode an array of int16 using run-length decoding of a difference array.
   * 
   * @param b
   * @param n
   * @param divisor
   * @return array of floats
   */
  public static float[] unpack16Deltaf(byte[] b, int n, float divisor) {
    if (b == null)
      return null;
    float[] ret = new float[n];
    for (int i = 0, pt = 6, val = 0, buf = 0; i < n;) {
      int diff = BC.bytesToShort(b, (pt++) << 1, true);
      if (diff == Short.MAX_VALUE || diff == Short.MIN_VALUE) {
        buf += diff;
      } else {
        ret[i++] = (val = val + diff + buf) / divisor;
        buf = 0;
      }
    }
    return ret;
  }

  /**
   * 
   * mmtf type 12 and 13
   * 
   * Unpack an array of int8 or int16 to int32 and divide to give a float32.
   * 
   * untested
   * 
   * @param b
   * @param nBytes 
   * @param n
   * @param divisor 
   * @return array of floats
   */
  public static float[] unpackf(byte[] b, int nBytes, int n, float divisor) {
    if (b == null)
      return null;
    float[] ret = new float[n];
    switch (nBytes) {
    case 1:
      for (int i = 0, pt = 12, offset = 0; i < n;) {
        int val = b[pt++];
        if (val == Byte.MAX_VALUE || val == Byte.MIN_VALUE) {
          offset += val;
        } else {
          ret[i++] = (val + offset) / divisor;
          offset = 0;
        }
      }
      break;
    case 2:
      for (int i = 0, pt = 6, offset = 0; i < n;) {
        int val = BC.bytesToShort(b, (pt++) << 1, true);
        if (val == Short.MAX_VALUE || val == Short.MIN_VALUE) {
          offset += val;
        } else {
          ret[i++] = (val + offset) / divisor;
          offset = 0;
        }
      }
      break;
    }
    return ret;
  }

  /**
   * 
   * mmtf type 14 and 15
   * 
   * Unpack an array of int8 or int16 to int32.
   * 
   * untested
   * 
   * @param b
   * @param nBytes 
   * @param n
   * @return array of integers
   */
  public static int[] unpack(byte[] b, int nBytes, int n) {
    if (b == null)
      return null;
    int[] ret = new int[n];
    switch (nBytes) {
    case 1:
      for (int i = 0, pt = 12, offset = 0; i < n;) {
        int val = b[pt++];
        if (val == Byte.MAX_VALUE || val == Byte.MIN_VALUE) {
          offset += val;
        } else {
          ret[i++] = val + offset;
          offset = 0;
        }
      }
      break;
    case 2:
      for (int i = 0, pt = 6, offset = 0; i < n;) {
        int val = BC.bytesToShort(b, (pt++) << 1, true);
        if (val == Short.MAX_VALUE || val == Short.MIN_VALUE) {
          offset += val;
        } else {
          ret[i++] = val + offset;
          offset = 0;
        }
      }
      break;
    }
    return ret;
  }

  ///**
  //* Decode an array of int16 using run-length decoding
  //* of a difference array.
  //* 
  //* @param b
  //* @param n
  //* @param i0 
  //* @return array of integers
  //*/
  //public static int[] rldecode16Delta(byte[] b, int n, int i0) {
  //if (b == null)
  //return null;
  //int[] ret = new int[n];
  //for (int i = 0, pt = i0 / 2, val = 0; i < n;) {
  //int diff = BC.bytesToShort(b, (pt++) << 1, true);
  //for (int j = BC.bytesToShort(b, (pt++) << 1, true); --j >= 0;)
  //ret[i++] = (val = val + diff);
  //}
  //return ret;
  //}

  ///**
  //* Do a split delta to a float[] array
  //* @param xyz label "x", "y", "z", or "bFactor"
  //* @param factor for dividing in the end -- 1000f or 100f 
  //* @return float[]
  //* 
  //*/ 
  //public static float[] getFloatsSplit(String xyz, float factor) {
  //byte[] big = (byte[]) map.get(xyz + "Big");
  //return (big == null ? null : splitDelta(big,
  //(byte[]) map.get(xyz + "Small"), fileAtomCount, factor));
  //}

  ///**
  //* Do a split delta to a float[] array
  //* 
  //* @param big
  //*        [n m n m n m...] where n is a "big delta" and m is a number of
  //*        "small deltas
  //* @param small
  //*        array containing the small deltas
  //* @param n
  //*        the size of the final array
  //* @param factor
  //*        to divide the final result by -- 1000f or 100f here
  //* @return float[]
  //*/
  //public static float[] splitDelta(byte[] big, byte[] small, int n, float factor) {
  //float[] ret = new float[n];
  //for (int i = 0, smallpt = 0, val = 0, datapt = 0, len = big.length >> 2; i < len; i++) {
  //ret[datapt++] = (val = val + BC.bytesToInt(big, i << 2, true)) / factor;
  //if (++i < len)
  //for (int j = BC.bytesToInt(big, i << 2, true); --j >= 0; smallpt++)
  //ret[datapt++] = (val = val + BC.bytesToShort(small, smallpt << 1, true))
  //  / factor;
  //}
  //return ret;
  //}
  //


}
