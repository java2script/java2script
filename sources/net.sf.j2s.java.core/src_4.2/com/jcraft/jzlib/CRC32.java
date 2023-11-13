/* -*-mode:java; c-basic-offset:2; -*- */
/*
Copyright (c) 2011 ymnk, JCraft,Inc. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  1. Redistributions of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright 
     notice, this list of conditions and the following disclaimer in 
     the documentation and/or other materials provided with the distribution.

  3. The names of the authors may not be used to endorse or promote products
     derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/*
 * This program is based on zlib-1.1.3, so all credit should go authors
 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 * and contributors of zlib.
 */

package com.jcraft.jzlib;

public class CRC32 implements Checksum {

  /*
   *  The following logic has come from RFC1952.
   */
  private int crc = 0;
  private static int[] crc_table = { 0, 1996959894, -301047508, -1727442502,
      124634137, 1886057615, -379345611, -1637575261, 249268274, 2044508324,
      -522852066, -1747789432, 162941995, 2125561021, -407360249, -1866523247,
      498536548, 1789927666, -205950648, -2067906082, 450548861, 1843258603,
      -187386543, -2083289657, 325883990, 1684777152, -43845254, -1973040660,
      335633487, 1661365465, -99664541, -1928851979, 997073096, 1281953886,
      -715111964, -1570279054, 1006888145, 1258607687, -770865667, -1526024853,
      901097722, 1119000684, -608450090, -1396901568, 853044451, 1172266101,
      -589951537, -1412350631, 651767980, 1373503546, -925412992, -1076862698,
      565507253, 1454621731, -809855591, -1195530993, 671266974, 1594198024,
      -972236366, -1324619484, 795835527, 1483230225, -1050600021, -1234817731,
      1994146192, 31158534, -1731059524, -271249366, 1907459465, 112637215,
      -1614814043, -390540237, 2013776290, 251722036, -1777751922, -519137256,
      2137656763, 141376813, -1855689577, -429695999, 1802195444, 476864866,
      -2056965928, -228458418, 1812370925, 453092731, -2113342271, -183516073,
      1706088902, 314042704, -1950435094, -54949764, 1658658271, 366619977,
      -1932296973, -69972891, 1303535960, 984961486, -1547960204, -725929758,
      1256170817, 1037604311, -1529756563, -740887301, 1131014506, 879679996,
      -1385723834, -631195440, 1141124467, 855842277, -1442165665, -586318647,
      1342533948, 654459306, -1106571248, -921952122, 1466479909, 544179635,
      -1184443383, -832445281, 1591671054, 702138776, -1328506846, -942167884,
      1504918807, 783551873, -1212326853, -1061524307, -306674912, -1698712650,
      62317068, 1957810842, -355121351, -1647151185, 81470997, 1943803523,
      -480048366, -1805370492, 225274430, 2053790376, -468791541, -1828061283,
      167816743, 2097651377, -267414716, -2029476910, 503444072, 1762050814,
      -144550051, -2140837941, 426522225, 1852507879, -19653770, -1982649376,
      282753626, 1742555852, -105259153, -1900089351, 397917763, 1622183637,
      -690576408, -1580100738, 953729732, 1340076626, -776247311, -1497606297,
      1068828381, 1219638859, -670225446, -1358292148, 906185462, 1090812512,
      -547295293, -1469587627, 829329135, 1181335161, -882789492, -1134132454,
      628085408, 1382605366, -871598187, -1156888829, 570562233, 1426400815,
      -977650754, -1296233688, 733239954, 1555261956, -1026031705, -1244606671,
      752459403, 1541320221, -1687895376, -328994266, 1969922972, 40735498,
      -1677130071, -351390145, 1913087877, 83908371, -1782625662, -491226604,
      2075208622, 213261112, -1831694693, -438977011, 2094854071, 198958881,
      -2032938284, -237706686, 1759359992, 534414190, -2118248755, -155638181,
      1873836001, 414664567, -2012718362, -15766928, 1711684554, 285281116,
      -1889165569, -127750551, 1634467795, 376229701, -1609899400, -686959890,
      1308918612, 956543938, -1486412191, -799009033, 1231636301, 1047427035,
      -1362007478, -640263460, 1088359270, 936918000, -1447252397, -558129467,
      1202900863, 817233897, -1111625188, -893730166, 1404277552, 615818150,
      -1160759803, -841546093, 1423857449, 601450431, -1285129682, -1000256840,
      1567103746, 711928724, -1274298825, -1022587231, 1510334235, 755167117 };

//static {
//crc_table = new int[256];
//for (int n = 0; n < 256; n++) {
//  int c = n;
//  for (int k = 8; --k >= 0;) {
//    if ((c & 1) != 0)
//      c = 0xedb88320 ^ (c >>> 1);
//    else
//      c = c >>> 1;
//  }
//  crc_table[n] = c;
//}
//}

  public void update(byte[] buf, int index, int len) {
    int c = ~crc;
    while (--len >= 0)
      c = crc_table[(c ^ buf[index++]) & 0xff] ^ (c >>> 8);
    crc = ~c;
  }

  public void reset() {
    crc = 0;
  }

  public void resetLong(long vv) {
    crc = (int) (vv & 0xffffffffL);
  }

  public long getValue() {
    return crc & 0xffffffffL;
  }

  private byte[] b1 = new byte[1];

  public void updateByteAsInt(int b) {
    b1[0] = (byte) b;
    update(b1, 0, 1);
  }

  // The following logic has come from zlib.1.2.

  //  
  //  private static final int GF2_DIM = 32;
  //  static long combine(long crc1, long crc2, long len2){
  //    long row;
  //    long[] even = new long[GF2_DIM];
  //    long[] odd = new long[GF2_DIM];
  //
  //    // degenerate case (also disallow negative lengths)
  //    if (len2 <= 0)
  //      return crc1;
  //
  //    // put operator for one zero bit in odd
  //    odd[0] = 0xedb88320L;          // CRC-32 polynomial
  //    row = 1;
  //    for (int n = 1; n < GF2_DIM; n++) {
  //        odd[n] = row;
  //        row <<= 1;
  //    }
  //
  //    // put operator for two zero bits in even
  //    gf2_matrix_square(even, odd);
  //
  //    // put operator for four zero bits in odd
  //    gf2_matrix_square(odd, even);
  //
  //    // apply len2 zeros to crc1 (first square will put the operator for one
  //    // zero byte, eight zero bits, in even)
  //    do {
  //      // apply zeros operator for this bit of len2
  //      gf2_matrix_square(even, odd);
  //      if ((len2 & 1)!=0)
  //        crc1 = gf2_matrix_times(even, crc1);
  //      len2 >>= 1;
  //
  //      // if no more bits set, then done
  //      if (len2 == 0)
  //        break;
  //
  //      // another iteration of the loop with odd and even swapped
  //      gf2_matrix_square(odd, even);
  //      if ((len2 & 1)!=0)
  //        crc1 = gf2_matrix_times(odd, crc1);
  //      len2 >>= 1;
  //
  //      // if no more bits set, then done
  //    } while (len2 != 0);
  //
  //    /* return combined crc */
  //    crc1 ^= crc2;
  //    return crc1;
  //  }
  //
  //  private static long gf2_matrix_times(long[] mat, long vec){
  //    long sum = 0;
  //    int index = 0;
  //    while (vec!=0) {
  //      if ((vec & 1)!=0)
  //        sum ^= mat[index];
  //      vec >>= 1;
  //      index++;
  //    }
  //    return sum;
  //  }
  //
  //  static final void gf2_matrix_square(long[] square, long[] mat) {
  //    for (int n = 0; n < GF2_DIM; n++)
  //      square[n] = gf2_matrix_times(mat, mat[n]);
  //  }

  //  private java.util.zip.CRC32 crc32 = new java.util.zip.CRC32();
  //
  //  public void update(byte[] buf, int index, int len){
  //    if(buf==null) {crc32.reset();}
  //    else{crc32.update(buf, index, len);}
  //  }
  //  public void reset(){
  //    crc32.reset();
  //  }
  //
  //  public long getValue(){
  //    return crc32.getValue();
  //  }
  //  
  //  public CRC32 copy(){
  //    CRC32 foo = new CRC32();
  //    foo.v = this.v;
  //    return foo;
  //  }
  //
  //  public static int[] getCRC32Table(){
  //    int[] tmp = new int[crc_table.length];
  //    System.arraycopy(crc_table, 0, tmp, 0, tmp.length);
  //    return tmp;
  //  }


//
//private static byte[] b;
//
//static {
//  b = new byte[] {1, 2, 3, 4};
//  java.util.zip.CRC32 c0 = new java.util.zip.CRC32();
//  com.jcraft.jzlib.CRC32 c1 = new com.jcraft.jzlib.CRC32();
//  for (int i = 0; i < 10; i++) {
//    for (int k = 0; k < 4; k++) 
//      b[k] = (byte)(Math.random()*256);
//  c0.reset();
//  c0.update(b, 0, b.length);
//  c1.reset();
//  c1.update(b, 0, b.length);
//  System.out.println("test("+b[0]+","+b[1]+","+b[2]+","+b[3]+"," + c0.getValue() + ",'0x" + Integer.toHexString((int)c1.getValue()) + "'," + (int)c1.getValue()+")");
//  }
//  System.out.println("OK");
//  
//}


}
