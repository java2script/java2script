/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

/*
 * This package is based on the work done by Keiron Liddle, Aftex Software
 * <keiron@aftexsw.com> to whom the Ant project is very grateful for his
 * great code.
 */
//package org.apache.tools.bzip2;
package javajs.util;

import java.io.IOException;
import java.io.InputStream;

/**
 * An input stream that decompresses from the BZip2 format (without the file
 * header chars) to be read as any other stream.
 *
 * <p>
 * The decompression requires large amounts of memory. Thus you should call the
 * {@link #close() close()} method as soon as possible, to force
 * <tt>CBZip2InputStream</tt> to release the allocated memory.
 * </p>
 *
 * <p>
 * <tt>CBZip2InputStream</tt> reads bytes from the compressed source stream via
 * the single byte {@link java.io.InputStream#read() read()} method exclusively.
 * Thus you should consider to use a buffered source stream.
 * </p>
 * 
 * <p>
 * Instances of this class are not threadsafe.
 * </p>
 */
public class CBZip2InputStream extends InputStream {

  /**
   * Index of the last char in the block, so the block size == last + 1.
   */
  private int last;

  /**
   * Index in zptr[] of original string after sorting.
   */
  private int origPtr;

  /**
   * always: in the range 0 .. 9. The current block size is 100000 * this
   * number.
   */
  private int blockSize100k;

  private boolean blockRandomised;

  private int bsBuff;
  private int bsLive;

  private int nInUse;

  private InputStream in;
  private final boolean decompressConcatenated;

  private int currentChar = -1;

  private static final int EOF = 0;
  private static final int START_BLOCK_STATE = 1;
  private static final int RAND_PART_A_STATE = 2;
  private static final int RAND_PART_B_STATE = 3;
  private static final int RAND_PART_C_STATE = 4;
  private static final int NO_RAND_PART_A_STATE = 5;
  private static final int NO_RAND_PART_B_STATE = 6;
  private static final int NO_RAND_PART_C_STATE = 7;

  private int currentState = START_BLOCK_STATE;

  private int storedBlockCRC, storedCombinedCRC;
  private int computedBlockCRC, computedCombinedCRC;

  // Variables used by setup* methods exclusively

  private int su_count;
  private int su_ch2;
  private int su_chPrev;
  private int su_i2;
  private int su_j2;
  private int su_rNToGo;
  private int su_rTPos;
  private int su_tPos;
  private char su_z;

  /**
   * All memory intensive stuff. This field is initialized by initBlock().
   */
  private CBZip2InputStream.Data data;

  /**
   * Constructs a new CBZip2InputStream which decompresses bytes read from the
   * specified stream. This doesn't suppprt decompressing concatenated .bz2
   * files.
   *
   * <p>
   * Although BZip2 headers are marked with the magic <tt>"Bz"</tt> this
   * constructor expects the next byte in the stream to be the first one after
   * the magic. Thus callers have to skip the first two bytes. Otherwise this
   * constructor will throw an exception.
   * </p>
   * 
   * @param in
   *
   * @throws IOException
   *         if the stream content is malformed or an I/O error occurs.
   * @throws NullPointerException
   *         if <tt>in == null</tt>
   */
  public CBZip2InputStream(final InputStream in) throws IOException {
    this(in, false);
  }

  /**
   * Constructs a new CBZip2InputStream which decompresses bytes read from the
   * specified stream.
   *
   * <p>
   * Although BZip2 headers are marked with the magic <tt>"Bz"</tt> this
   * constructor expects the next byte in the stream to be the first one after
   * the magic. Thus callers have to skip the first two bytes. Otherwise this
   * constructor will throw an exception.
   * </p>
   *
   * @param in
   *        the InputStream from which this object should be created
   * @param decompressConcatenated
   *        if true, decompress until the end of the input; if false, stop after
   *        the first .bz2 stream and leave the input position to point to the
   *        next byte after the .bz2 stream
   *
   * @throws IOException
   *         if the stream content is malformed or an I/O error occurs.
   * @throws NullPointerException
   *         if <tt>in == null</tt>
   */
  public CBZip2InputStream(final InputStream in,
      final boolean decompressConcatenated) throws IOException {
    super();

    this.in = in;
    this.decompressConcatenated = decompressConcatenated;

    init(true);
    initBlock();
    setupBlock();
  }

  /** {@inheritDoc} */
  @Override
  public int read() throws IOException {
    if (this.in == null)
      throw new IOException("stream closed");
    return read0();
  }

  /*
   * (non-Javadoc)
   * 
   * @see java.io.InputStream#read(byte[], int, int)
   */
  @Override
  public int read(final byte[] dest, final int offs, final int len)
      throws IOException {
    if (offs < 0) {
      throw new IndexOutOfBoundsException("offs(" + offs + ") < 0.");
    }
    if (len < 0) {
      throw new IndexOutOfBoundsException("len(" + len + ") < 0.");
    }
    if (offs + len > dest.length) {
      throw new IndexOutOfBoundsException("offs(" + offs + ") + len(" + len
          + ") > dest.length(" + dest.length + ").");
    }
    if (this.in == null) {
      throw new IOException("stream closed");
    }

    final int hi = offs + len;
    int destOffs = offs;
    for (int b; (destOffs < hi) && ((b = read0()) >= 0);) {
      dest[destOffs++] = (byte) b;
    }

    return (destOffs == offs) ? -1 : (destOffs - offs);
  }

  private void makeMaps() {
    final boolean[] inUse = this.data.inUse;
    final byte[] seqToUnseq = this.data.seqToUnseq;

    int nInUseShadow = 0;

    for (int i = 0; i < 256; i++) {
      if (inUse[i]) {
        seqToUnseq[nInUseShadow++] = (byte) i;
      }
    }

    this.nInUse = nInUseShadow;
  }

  private int read0() throws IOException {
    final int retChar = this.currentChar;

    switch (this.currentState) {
    case EOF:
      return -1;

    case START_BLOCK_STATE:
      throw new IllegalStateException();

    case RAND_PART_A_STATE:
      throw new IllegalStateException();

    case RAND_PART_B_STATE:
      setupRandPartB();
      break;

    case RAND_PART_C_STATE:
      setupRandPartC();
      break;

    case NO_RAND_PART_A_STATE:
      throw new IllegalStateException();

    case NO_RAND_PART_B_STATE:
      setupNoRandPartB();
      break;

    case NO_RAND_PART_C_STATE:
      setupNoRandPartC();
      break;

    default:
      throw new IllegalStateException();
    }

    return retChar;
  }

  private boolean init(boolean isFirstStream) throws IOException {
    if (null == in) {
      throw new IOException("No InputStream");
    }

    if (isFirstStream) {
      if (in.available() == 0) {
        throw new IOException("Empty InputStream");
      }
    } else {
      int magic0 = in.read();
      if (magic0 == -1) {
        return false;
      }
      int magic1 = in.read();
      if (magic0 != 'B' || magic1 != 'Z') {
        throw new IOException("Garbage after a valid BZip2 stream");
      }
    }

    int magic2 = in.read();
    if (magic2 != 'h') {
      throw new IOException(isFirstStream ? "Stream is not in the BZip2 format"
          : "Garbage after a valid BZip2 stream");
    }

    int blockSize = in.read();
    if ((blockSize < '1') || (blockSize > '9')) {
      throw new IOException("Stream is not BZip2 formatted: illegal "
          + "blocksize " + (char) blockSize);
    }

    this.blockSize100k = blockSize - '0';

    this.bsLive = 0;
    this.computedCombinedCRC = 0;

    return true;
  }

  private void initBlock() throws IOException {
    char magic0;
    char magic1;
    char magic2;
    char magic3;
    char magic4;
    char magic5;

    while (true) {
      // Get the block magic bytes.
      magic0 = bsGetUByte();
      magic1 = bsGetUByte();
      magic2 = bsGetUByte();
      magic3 = bsGetUByte();
      magic4 = bsGetUByte();
      magic5 = bsGetUByte();

      // If isn't end of stream magic, break out of the loop.
      if (magic0 != 0x17 || magic1 != 0x72 || magic2 != 0x45 || magic3 != 0x38
          || magic4 != 0x50 || magic5 != 0x90) {
        break;
      }

      // End of stream was reached. Check the combined CRC and
      // advance to the next .bz2 stream if decoding concatenated
      // streams.
      if (complete()) {
        return;
      }
    }

    if (magic0 != 0x31 || // '1'
        magic1 != 0x41 || // ')'
        magic2 != 0x59 || // 'Y'
        magic3 != 0x26 || // '&'
        magic4 != 0x53 || // 'S'
        magic5 != 0x59 // 'Y'
    ) {
      this.currentState = EOF;
      throw new IOException("bad block header");
    }
    this.storedBlockCRC = bsGetInt();
    this.blockRandomised = bsR(1) == 1;

    /**
     * Allocate data here instead in constructor, so we do not allocate it if
     * the input file is empty.
     */
    if (this.data == null) {
      this.data = new Data(this.blockSize100k);
    }

    // currBlockNo++;
    getAndMoveToFrontDecode();

    //this.crc.initialiseCRC();
    this.currentState = START_BLOCK_STATE;
  }

  private void endBlock() throws IOException {
    this.computedBlockCRC = getFinalCRC();

    // A bad CRC is considered a fatal error.
    if (this.storedBlockCRC != this.computedBlockCRC) {
      // make next blocks readable without error
      // (repair feature, not yet documented, not tested)
      this.computedCombinedCRC = (this.storedCombinedCRC << 1)
          | (this.storedCombinedCRC >>> 31);
      this.computedCombinedCRC ^= this.storedBlockCRC;

      reportCRCError();
    }

    this.computedCombinedCRC = (this.computedCombinedCRC << 1)
        | (this.computedCombinedCRC >>> 31);
    this.computedCombinedCRC ^= this.computedBlockCRC;
  }

  private boolean complete() throws IOException {
    this.storedCombinedCRC = bsGetInt();
    this.currentState = EOF;
    this.data = null;

    if (this.storedCombinedCRC != this.computedCombinedCRC) {
      reportCRCError();
    }

    // Look for the next .bz2 stream if decompressing
    // concatenated files.
    return !decompressConcatenated || !init(false);
  }

  @Override
  public void close() throws IOException {
    InputStream inShadow = this.in;
    if (inShadow != null) {
      try {
        if (inShadow != System.in) {
          inShadow.close();
        }
      } finally {
        this.data = null;
        this.in = null;
      }
    }
  }

  private int bsR(final int n) throws IOException {
    int bsLiveShadow = this.bsLive;
    int bsBuffShadow = this.bsBuff;

    if (bsLiveShadow < n) {
      do {
        int thech = in.read();

        if (thech < 0) {
          throw new IOException("unexpected end of stream");
        }

        bsBuffShadow = (bsBuffShadow << 8) | thech;
        bsLiveShadow += 8;
      } while (bsLiveShadow < n);

      this.bsBuff = bsBuffShadow;
    }

    this.bsLive = bsLiveShadow - n;
    return (bsBuffShadow >> (bsLiveShadow - n)) & ((1 << n) - 1);
  }

  private boolean bsGetBit() throws IOException {
    int bsLiveShadow = this.bsLive;
    int bsBuffShadow = this.bsBuff;

    if (bsLiveShadow < 1) {
      int thech = in.read();

      if (thech < 0) {
        throw new IOException("unexpected end of stream");
      }

      bsBuffShadow = (bsBuffShadow << 8) | thech;
      bsLiveShadow += 8;
      this.bsBuff = bsBuffShadow;
    }

    this.bsLive = bsLiveShadow - 1;
    return ((bsBuffShadow >> (bsLiveShadow - 1)) & 1) != 0;
  }

  private char bsGetUByte() throws IOException {
    return (char) bsR(8);
  }

  private int bsGetInt() throws IOException {
    return (((((bsR(8) << 8) | bsR(8)) << 8) | bsR(8)) << 8) | bsR(8);
  }

  /**
   * Called by createHuffmanDecodingTables() exclusively.
   * 
   * @param limit
   * @param base
   * @param perm
   * @param length
   * @param minLen
   * @param maxLen
   * @param alphaSize
   */
  private static void hbCreateDecodeTables(final int[] limit, final int[] base,
                                           final int[] perm,
                                           final char[] length,
                                           final int minLen, final int maxLen,
                                           final int alphaSize) {
    for (int i = minLen, pp = 0; i <= maxLen; i++) {
      for (int j = 0; j < alphaSize; j++) {
        if (length[j] == i) {
          perm[pp++] = j;
        }
      }
    }

    for (int i = MAX_CODE_LEN; --i > 0;) {
      base[i] = 0;
      limit[i] = 0;
    }

    for (int i = 0; i < alphaSize; i++) {
      base[length[i] + 1]++;
    }

    for (int i = 1, b = base[0]; i < MAX_CODE_LEN; i++) {
      b += base[i];
      base[i] = b;
    }

    for (int i = minLen, vec = 0, b = base[i]; i <= maxLen; i++) {
      final int nb = base[i + 1];
      vec += nb - b;
      b = nb;
      limit[i] = vec - 1;
      vec <<= 1;
    }

    for (int i = minLen + 1; i <= maxLen; i++) {
      base[i] = ((limit[i - 1] + 1) << 1) - base[i];
    }
  }

  private void recvDecodingTables() throws IOException {
    final Data dataShadow = this.data;
    final boolean[] inUse = dataShadow.inUse;
    final byte[] pos = dataShadow.recvDecodingTables_pos;
    final byte[] selector = dataShadow.selector;
    final byte[] selectorMtf = dataShadow.selectorMtf;

    int inUse16 = 0;

    /* Receive the mapping table */
    for (int i = 0; i < 16; i++) {
      if (bsGetBit()) {
        inUse16 |= 1 << i;
      }
    }

    for (int i = 256; --i >= 0;) {
      inUse[i] = false;
    }

    for (int i = 0; i < 16; i++) {
      if ((inUse16 & (1 << i)) != 0) {
        final int i16 = i << 4;
        for (int j = 0; j < 16; j++) {
          if (bsGetBit()) {
            inUse[i16 + j] = true;
          }
        }
      }
    }

    makeMaps();
    final int alphaSize = this.nInUse + 2;

    /* Now the selectors */
    final int nGroups = bsR(3);
    final int nSelectors = bsR(15);

    for (int i = 0; i < nSelectors; i++) {
      int j = 0;
      while (bsGetBit()) {
        j++;
      }
      selectorMtf[i] = (byte) j;
    }

    /* Undo the MTF values for the selectors. */
    for (int v = nGroups; --v >= 0;) {
      pos[v] = (byte) v;
    }

    for (int i = 0; i < nSelectors; i++) {
      int v = selectorMtf[i] & 0xff;
      final byte tmp = pos[v];
      while (v > 0) {
        // nearly all times v is zero, 4 in most other cases
        pos[v] = pos[v - 1];
        v--;
      }
      pos[0] = tmp;
      selector[i] = tmp;
    }

    final char[][] len = dataShadow.temp_charArray2d;

    /* Now the coding tables */
    for (int t = 0; t < nGroups; t++) {
      int curr = bsR(5);
      final char[] len_t = len[t];
      for (int i = 0; i < alphaSize; i++) {
        while (bsGetBit()) {
          curr += bsGetBit() ? -1 : 1;
        }
        len_t[i] = (char) curr;
      }
    }

    // finally create the Huffman tables
    createHuffmanDecodingTables(alphaSize, nGroups);
  }

  /**
   * Called by recvDecodingTables() exclusively.
   * 
   * @param alphaSize
   * @param nGroups
   */
  private void createHuffmanDecodingTables(final int alphaSize,
                                           final int nGroups) {
    final Data dataShadow = this.data;
    final char[][] len = dataShadow.temp_charArray2d;
    final int[] minLens = dataShadow.minLens;
    final int[][] limit = dataShadow.limit;
    final int[][] base = dataShadow.base;
    final int[][] perm = dataShadow.perm;

    for (int t = 0; t < nGroups; t++) {
      int minLen = 32;
      int maxLen = 0;
      final char[] len_t = len[t];
      for (int i = alphaSize; --i >= 0;) {
        final char lent = len_t[i];
        if (lent > maxLen) {
          maxLen = lent;
        }
        if (lent < minLen) {
          minLen = lent;
        }
      }
      hbCreateDecodeTables(limit[t], base[t], perm[t], len[t], minLen, maxLen,
          alphaSize);
      minLens[t] = minLen;
    }
  }

  private void getAndMoveToFrontDecode() throws IOException {
    this.origPtr = bsR(24);
    recvDecodingTables();

    final Data dataShadow = this.data;
    final byte[] ll8 = dataShadow.ll8;
    final int[] unzftab = dataShadow.unzftab;
    final byte[] selector = dataShadow.selector;
    final byte[] seqToUnseq = dataShadow.seqToUnseq;
    final char[] yy = dataShadow.getAndMoveToFrontDecode_yy;
    final int[] minLens = dataShadow.minLens;
    final int[][] limit = dataShadow.limit;
    final int[][] base = dataShadow.base;
    final int[][] perm = dataShadow.perm;
    final int limitLast = this.blockSize100k * 100000;

    /*
      Setting up the unzftab entries here is not strictly
      necessary, but it does save having to do it later
      in a separate pass, and so saves a block's worth of
      cache misses.
    */
    for (int i = 256; --i >= 0;) {
      yy[i] = (char) i;
      unzftab[i] = 0;
    }

    int groupNo = 0;
    int groupPos = G_SIZE - 1;
    final int eob = this.nInUse + 1;
    int nextSym = getAndMoveToFrontDecode0(0);
    int bsBuffShadow = this.bsBuff;
    int bsLiveShadow = this.bsLive;
    int lastShadow = -1;
    int zt = selector[groupNo] & 0xff;
    int[] base_zt = base[zt];
    int[] limit_zt = limit[zt];
    int[] perm_zt = perm[zt];
    int minLens_zt = minLens[zt];

    while (nextSym != eob) {
      if ((nextSym == RUNA) || (nextSym == RUNB)) {
        int s = -1;

        for (int n = 1; true; n <<= 1) {
          if (nextSym == RUNA) {
            s += n;
          } else if (nextSym == RUNB) {
            s += n << 1;
          } else {
            break;
          }

          if (groupPos == 0) {
            groupPos = G_SIZE - 1;
            zt = selector[++groupNo] & 0xff;
            base_zt = base[zt];
            limit_zt = limit[zt];
            perm_zt = perm[zt];
            minLens_zt = minLens[zt];
          } else {
            groupPos--;
          }

          int zn = minLens_zt;

          // Inlined:
          // int zvec = bsR(zn);
          while (bsLiveShadow < zn) {
            final int thech = in.read();//inShadow.read();
            if (thech < 0)
              throw new IOException("unexpected end of stream");

            bsBuffShadow = (bsBuffShadow << 8) | thech;
            bsLiveShadow += 8;
            continue;
          }
          int zvec = (bsBuffShadow >> (bsLiveShadow - zn)) & ((1 << zn) - 1);
          bsLiveShadow -= zn;

          while (zvec > limit_zt[zn]) {
            zn++;
            while (bsLiveShadow < 1) {
              final int thech = in.read();//inShadow.read();
              if (thech < 0)
                throw new IOException("unexpected end of stream");
              bsBuffShadow = (bsBuffShadow << 8) | thech;
              bsLiveShadow += 8;
              continue;
            }
            bsLiveShadow--;
            zvec = (zvec << 1) | ((bsBuffShadow >> bsLiveShadow) & 1);
          }
          nextSym = perm_zt[zvec - base_zt[zn]];
        }

        final byte ch = seqToUnseq[yy[0]];
        unzftab[ch & 0xff] += s + 1;

        while (s-- >= 0) {
          ll8[++lastShadow] = ch;
        }

        if (lastShadow >= limitLast) {
          throw new IOException("block overrun");
        }
      } else {
        if (++lastShadow >= limitLast) {
          throw new IOException("block overrun");
        }

        final char tmp = yy[nextSym - 1];
        unzftab[seqToUnseq[tmp] & 0xff]++;
        ll8[lastShadow] = seqToUnseq[tmp];

        /*
          This loop is hammered during decompression,
          hence avoid native method call overhead of
          System.arraycopy for very small ranges to copy.
        */
        if (nextSym <= 16) {
          for (int j = nextSym - 1; j > 0;) {
            yy[j] = yy[--j];
          }
        } else {
          System.arraycopy(yy, 0, yy, 1, nextSym - 1);
        }

        yy[0] = tmp;

        if (groupPos == 0) {
          groupPos = G_SIZE - 1;
          zt = selector[++groupNo] & 0xff;
          base_zt = base[zt];
          limit_zt = limit[zt];
          perm_zt = perm[zt];
          minLens_zt = minLens[zt];
        } else {
          groupPos--;
        }

        int zn = minLens_zt;

        // Inlined:
        // int zvec = bsR(zn);
        while (bsLiveShadow < zn) {
          final int thech = in.read();//inShadow.read();
          if (thech < 0)
            throw new IOException("unexpected end of stream");
          bsBuffShadow = (bsBuffShadow << 8) | thech;
          bsLiveShadow += 8;
          continue;
        }
        int zvec = (bsBuffShadow >> (bsLiveShadow - zn)) & ((1 << zn) - 1);
        bsLiveShadow -= zn;

        while (zvec > limit_zt[zn]) {
          zn++;
          while (bsLiveShadow < 1) {
            final int thech = in.read();//inShadow.read();
            if (thech < 0)
              throw new IOException("unexpected end of stream");
            bsBuffShadow = (bsBuffShadow << 8) | thech;
            bsLiveShadow += 8;
            continue;
          }
          bsLiveShadow--;
          zvec = (zvec << 1) | ((bsBuffShadow >> bsLiveShadow) & 1);
        }
        nextSym = perm_zt[zvec - base_zt[zn]];
      }
    }

    this.last = lastShadow;
    this.bsLive = bsLiveShadow;
    this.bsBuff = bsBuffShadow;
  }

  private int getAndMoveToFrontDecode0(final int groupNo) throws IOException {
    final Data dataShadow = this.data;
    final int zt = dataShadow.selector[groupNo] & 0xff;
    final int[] limit_zt = dataShadow.limit[zt];
    int zn = dataShadow.minLens[zt];
    int zvec = bsR(zn);
    int bsLiveShadow = this.bsLive;
    int bsBuffShadow = this.bsBuff;

    while (zvec > limit_zt[zn]) {
      zn++;
      while (bsLiveShadow < 1) {
        final int thech = in.read();//inShadow.read();

        if (thech < 0)
          throw new IOException("unexpected end of stream");

        bsBuffShadow = (bsBuffShadow << 8) | thech;
        bsLiveShadow += 8;
        continue;
      }
      bsLiveShadow--;
      zvec = (zvec << 1) | ((bsBuffShadow >> bsLiveShadow) & 1);
    }

    this.bsLive = bsLiveShadow;
    this.bsBuff = bsBuffShadow;

    return dataShadow.perm[zt][zvec - dataShadow.base[zt][zn]];
  }

  private void setupBlock() throws IOException {
    if (this.data == null) {
      return;
    }

    final int[] cftab = this.data.cftab;
    final int[] tt = this.data.initTT(this.last + 1);
    final byte[] ll8 = this.data.ll8;
    cftab[0] = 0;
    System.arraycopy(this.data.unzftab, 0, cftab, 1, 256);

    for (int i = 1, c = cftab[0]; i <= 256; i++) {
      c += cftab[i];
      cftab[i] = c;
    }

    for (int i = 0, lastShadow = this.last; i <= lastShadow; i++) {
      tt[cftab[ll8[i] & 0xff]++] = i;
    }

    if ((this.origPtr < 0) || (this.origPtr >= tt.length)) {
      throw new IOException("stream corrupted");
    }

    this.su_tPos = tt[this.origPtr];
    this.su_count = 0;
    this.su_i2 = 0;
    this.su_ch2 = 256; /* not a char and not EOF */

    if (this.blockRandomised) {
      this.su_rNToGo = 0;
      this.su_rTPos = 0;
      setupRandPartA();
    } else {
      setupNoRandPartA();
    }
  }

  private void setupRandPartA() throws IOException {
    if (this.su_i2 <= this.last) {
      this.su_chPrev = this.su_ch2;
      int su_ch2Shadow = this.data.ll8[this.su_tPos] & 0xff;
      this.su_tPos = this.data.tt[this.su_tPos];
      if (this.su_rNToGo == 0) {
        this.su_rNToGo = rNums[this.su_rTPos] - 1;
        if (++this.su_rTPos == 512) {
          this.su_rTPos = 0;
        }
      } else {
        this.su_rNToGo--;
      }
      this.su_ch2 = su_ch2Shadow ^= (this.su_rNToGo == 1) ? 1 : 0;
      this.su_i2++;
      this.currentChar = su_ch2Shadow;
      this.currentState = RAND_PART_B_STATE;
      updateCRC(su_ch2Shadow);
    } else {
      endBlock();
      initBlock();
      setupBlock();
    }
  }

  private void setupNoRandPartA() throws IOException {
    if (this.su_i2 <= this.last) {
      this.su_chPrev = this.su_ch2;
      int su_ch2Shadow = this.data.ll8[this.su_tPos] & 0xff;
      this.su_ch2 = su_ch2Shadow;
      this.su_tPos = this.data.tt[this.su_tPos];
      this.su_i2++;
      this.currentChar = su_ch2Shadow;
      this.currentState = NO_RAND_PART_B_STATE;
      updateCRC(su_ch2Shadow);
    } else {
      this.currentState = NO_RAND_PART_A_STATE;
      endBlock();
      initBlock();
      setupBlock();
    }
  }

  private void setupRandPartB() throws IOException {
    if (this.su_ch2 != this.su_chPrev) {
      this.currentState = RAND_PART_A_STATE;
      this.su_count = 1;
      setupRandPartA();
    } else if (++this.su_count >= 4) {
      this.su_z = (char) (this.data.ll8[this.su_tPos] & 0xff);
      this.su_tPos = this.data.tt[this.su_tPos];
      if (this.su_rNToGo == 0) {
        this.su_rNToGo = rNums[this.su_rTPos] - 1;
        if (++this.su_rTPos == 512) {
          this.su_rTPos = 0;
        }
      } else {
        this.su_rNToGo--;
      }
      this.su_j2 = 0;
      this.currentState = RAND_PART_C_STATE;
      if (this.su_rNToGo == 1) {
        this.su_z ^= 1;
      }
      setupRandPartC();
    } else {
      this.currentState = RAND_PART_A_STATE;
      setupRandPartA();
    }
  }

  private void setupRandPartC() throws IOException {
    if (this.su_j2 < this.su_z) {
      this.currentChar = this.su_ch2;
      updateCRC(this.su_ch2);
      this.su_j2++;
    } else {
      this.currentState = RAND_PART_A_STATE;
      this.su_i2++;
      this.su_count = 0;
      setupRandPartA();
    }
  }

  private void setupNoRandPartB() throws IOException {
    if (this.su_ch2 != this.su_chPrev) {
      this.su_count = 1;
      setupNoRandPartA();
    } else if (++this.su_count >= 4) {
      this.su_z = (char) (this.data.ll8[this.su_tPos] & 0xff);
      this.su_tPos = this.data.tt[this.su_tPos];
      this.su_j2 = 0;
      setupNoRandPartC();
    } else {
      setupNoRandPartA();
    }
  }

  private void setupNoRandPartC() throws IOException {
    if (this.su_j2 < this.su_z) {
      int su_ch2Shadow = this.su_ch2;
      this.currentChar = su_ch2Shadow;
      updateCRC(su_ch2Shadow);
      this.su_j2++;
      this.currentState = NO_RAND_PART_C_STATE;
    } else {
      this.su_i2++;
      this.su_count = 0;
      setupNoRandPartA();
    }
  }

  private static final class Data extends Object {

    // (with blockSize 900k)
    final boolean[] inUse = new boolean[256]; //      256 byte

    final byte[] seqToUnseq = new byte[256]; //      256 byte
    final byte[] selector = new byte[MAX_SELECTORS]; //    18002 byte
    final byte[] selectorMtf = new byte[MAX_SELECTORS]; //    18002 byte

    /**
     * Freq table collected to save a pass over the data during decompression.
     */
    final int[] unzftab = new int[256]; //     1024 byte

    final int[][] limit = new int[N_GROUPS][MAX_ALPHA_SIZE]; //     6192 byte
    final int[][] base = new int[N_GROUPS][MAX_ALPHA_SIZE]; //     6192 byte
    final int[][] perm = new int[N_GROUPS][MAX_ALPHA_SIZE]; //     6192 byte
    final int[] minLens = new int[N_GROUPS]; //       24 byte

    final int[] cftab = new int[257]; //     1028 byte
    final char[] getAndMoveToFrontDecode_yy = new char[256]; //      512 byte
    final char[][] temp_charArray2d = new char[N_GROUPS][MAX_ALPHA_SIZE]; //     3096 byte
    final byte[] recvDecodingTables_pos = new byte[N_GROUPS]; //        6 byte
    //---------------
    //    60798 byte

    int[] tt; //  3600000 byte
    byte[] ll8; //   900000 byte
    //---------------
    //  4560782 byte
    //===============

    Data(int blockSize100k) {
      super();

      this.ll8 = new byte[blockSize100k * baseBlockSize];
    }

    /**
     * Initializes the {@link #tt} array.
     *
     * This method is called when the required length of the array is known. I
     * don't initialize it at construction time to avoid unnecessary memory
     * allocation when compressing small files.
     * 
     * @param length
     * @return int array
     */
    final int[] initTT(int length) {
      int[] ttShadow = this.tt;

      // tt.length should always be >= length, but theoretically
      // it can happen, if the compressor mixed small and large
      // blocks.  Normally only the last block will be smaller
      // than others.
      if ((ttShadow == null) || (ttShadow.length < length)) {
        this.tt = ttShadow = new int[length];
      }

      return ttShadow;
    }

  }

  @SuppressWarnings("unused")
  private static void reportCRCError() throws IOException {
    // The clean way would be to throw an exception.
    //throw new IOException("crc error");

    // Just print a message, like the previous versions of this class did
    System.err.println("BZip2 CRC error");
  }

  private final static int baseBlockSize = 100000;
  private final static int MAX_ALPHA_SIZE = 258;
  private final static int MAX_CODE_LEN = 23;
  private final static int RUNA = 0;
  private final static int RUNB = 1;
  private final static int N_GROUPS = 6;
  private final static int G_SIZE = 50;
//  private final static int N_ITERS = 4;
  private final static int MAX_SELECTORS = (2 + (900000 / G_SIZE));
//  private final static int NUM_OVERSHOOT_BYTES = 20;

  private final static int[] rNums = { 619, 720, 127, 481, 931, 816, 813, 233,
      566, 247, 985, 724, 205, 454, 863, 491, 741, 242, 949, 214, 733, 859, 335,
      708, 621, 574, 73, 654, 730, 472, 419, 436, 278, 496, 867, 210, 399, 680,
      480, 51, 878, 465, 811, 169, 869, 675, 611, 697, 867, 561, 862, 687, 507,
      283, 482, 129, 807, 591, 733, 623, 170, 607, 520, 932, 727, 476, 693, 425,
      174, 647, 150, 238, 59, 379, 684, 877, 625, 169, 643, 105, 73, 122, 335,
      530, 442, 853, 695, 249, 445, 515, 909, 545, 703, 919, 874, 474, 882, 500,
      594, 612, 641, 801, 220, 162, 819, 984, 589, 513, 495, 799, 161, 604, 958,
      533, 221, 400, 386, 867, 600, 782, 382, 596, 414, 171, 516, 375, 682, 485,
      911, 276, 98, 553, 163, 354, 666, 933, 424, 341, 533, 870, 227, 730, 475,
      186, 263, 647, 537, 686, 600, 224, 469, 68, 770, 919, 190, 373, 294, 822,
      808, 206, 184, 943, 795, 384, 383, 461, 404, 758, 839, 887, 715, 67, 618,
      276, 204, 918, 873, 777, 604, 560, 951, 160, 578, 722, 79, 804, 96, 409,
      713, 940, 652, 934, 970, 447, 318, 353, 859, 672, 112, 785, 645, 863, 803,
      350, 139, 93, 354, 99, 820, 908, 609, 772, 154, 274, 580, 184, 79, 626,
      630, 742, 653, 282, 762, 623, 680, 81, 927, 626, 789, 125, 411, 521, 938,
      300, 821, 78, 343, 175, 128, 250, 170, 774, 972, 275, 999, 639, 495, 78,
      352, 126, 857, 956, 358, 619, 580, 124, 737, 594, 701, 612, 669, 112, 134,
      694, 363, 992, 809, 743, 168, 974, 944, 375, 748, 52, 600, 747, 642, 182,
      862, 81, 344, 805, 988, 739, 511, 655, 814, 334, 249, 515, 897, 955, 664,
      981, 649, 113, 974, 459, 893, 228, 433, 837, 553, 268, 926, 240, 102, 654,
      459, 51, 686, 754, 806, 760, 493, 403, 415, 394, 687, 700, 946, 670, 656,
      610, 738, 392, 760, 799, 887, 653, 978, 321, 576, 617, 626, 502, 894, 679,
      243, 440, 680, 879, 194, 572, 640, 724, 926, 56, 204, 700, 707, 151, 457,
      449, 797, 195, 791, 558, 945, 679, 297, 59, 87, 824, 713, 663, 412, 693,
      342, 606, 134, 108, 571, 364, 631, 212, 174, 643, 304, 329, 343, 97, 430,
      751, 497, 314, 983, 374, 822, 928, 140, 206, 73, 263, 980, 736, 876, 478,
      430, 305, 170, 514, 364, 692, 829, 82, 855, 953, 676, 246, 369, 970, 294,
      750, 807, 827, 150, 790, 288, 923, 804, 378, 215, 828, 592, 281, 565, 555,
      710, 82, 896, 831, 547, 261, 524, 462, 293, 465, 502, 56, 661, 821, 976,
      991, 658, 869, 905, 758, 745, 193, 768, 550, 608, 933, 378, 286, 215, 979,
      792, 961, 61, 688, 793, 644, 986, 403, 106, 366, 905, 644, 372, 567, 466,
      434, 645, 210, 389, 550, 919, 135, 780, 773, 635, 389, 707, 100, 626, 958,
      165, 504, 920, 176, 193, 713, 857, 265, 203, 50, 668, 108, 645, 990, 626,
      197, 510, 357, 358, 850, 858, 364, 936, 638 };

  /*
   *  Licensed to the Apache Software Foundation (ASF) under one or more
   *  contributor license agreements.  See the NOTICE file distributed with
   *  this work for additional information regarding copyright ownership.
   *  The ASF licenses this file to You under the Apache License, Version 2.0
   *  (the "License"); you may not use this file except in compliance with
   *  the License.  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   *
   */

  /*
   * This package is based on the work done by Keiron Liddle, Aftex Software
   * <keiron@aftexsw.com> to whom the Ant project is very grateful for his
   * great code.
   */

  static final int crc32Table[] = { 0x00000000, 0x04c11db7, 0x09823b6e,
      0x0d4326d9, 0x130476dc, 0x17c56b6b, 0x1a864db2, 0x1e475005, 0x2608edb8,
      0x22c9f00f, 0x2f8ad6d6, 0x2b4bcb61, 0x350c9b64, 0x31cd86d3, 0x3c8ea00a,
      0x384fbdbd, 0x4c11db70, 0x48d0c6c7, 0x4593e01e, 0x4152fda9, 0x5f15adac,
      0x5bd4b01b, 0x569796c2, 0x52568b75, 0x6a1936c8, 0x6ed82b7f, 0x639b0da6,
      0x675a1011, 0x791d4014, 0x7ddc5da3, 0x709f7b7a, 0x745e66cd, 0x9823b6e0,
      0x9ce2ab57, 0x91a18d8e, 0x95609039, 0x8b27c03c, 0x8fe6dd8b, 0x82a5fb52,
      0x8664e6e5, 0xbe2b5b58, 0xbaea46ef, 0xb7a96036, 0xb3687d81, 0xad2f2d84,
      0xa9ee3033, 0xa4ad16ea, 0xa06c0b5d, 0xd4326d90, 0xd0f37027, 0xddb056fe,
      0xd9714b49, 0xc7361b4c, 0xc3f706fb, 0xceb42022, 0xca753d95, 0xf23a8028,
      0xf6fb9d9f, 0xfbb8bb46, 0xff79a6f1, 0xe13ef6f4, 0xe5ffeb43, 0xe8bccd9a,
      0xec7dd02d, 0x34867077, 0x30476dc0, 0x3d044b19, 0x39c556ae, 0x278206ab,
      0x23431b1c, 0x2e003dc5, 0x2ac12072, 0x128e9dcf, 0x164f8078, 0x1b0ca6a1,
      0x1fcdbb16, 0x018aeb13, 0x054bf6a4, 0x0808d07d, 0x0cc9cdca, 0x7897ab07,
      0x7c56b6b0, 0x71159069, 0x75d48dde, 0x6b93dddb, 0x6f52c06c, 0x6211e6b5,
      0x66d0fb02, 0x5e9f46bf, 0x5a5e5b08, 0x571d7dd1, 0x53dc6066, 0x4d9b3063,
      0x495a2dd4, 0x44190b0d, 0x40d816ba, 0xaca5c697, 0xa864db20, 0xa527fdf9,
      0xa1e6e04e, 0xbfa1b04b, 0xbb60adfc, 0xb6238b25, 0xb2e29692, 0x8aad2b2f,
      0x8e6c3698, 0x832f1041, 0x87ee0df6, 0x99a95df3, 0x9d684044, 0x902b669d,
      0x94ea7b2a, 0xe0b41de7, 0xe4750050, 0xe9362689, 0xedf73b3e, 0xf3b06b3b,
      0xf771768c, 0xfa325055, 0xfef34de2, 0xc6bcf05f, 0xc27dede8, 0xcf3ecb31,
      0xcbffd686, 0xd5b88683, 0xd1799b34, 0xdc3abded, 0xd8fba05a, 0x690ce0ee,
      0x6dcdfd59, 0x608edb80, 0x644fc637, 0x7a089632, 0x7ec98b85, 0x738aad5c,
      0x774bb0eb, 0x4f040d56, 0x4bc510e1, 0x46863638, 0x42472b8f, 0x5c007b8a,
      0x58c1663d, 0x558240e4, 0x51435d53, 0x251d3b9e, 0x21dc2629, 0x2c9f00f0,
      0x285e1d47, 0x36194d42, 0x32d850f5, 0x3f9b762c, 0x3b5a6b9b, 0x0315d626,
      0x07d4cb91, 0x0a97ed48, 0x0e56f0ff, 0x1011a0fa, 0x14d0bd4d, 0x19939b94,
      0x1d528623, 0xf12f560e, 0xf5ee4bb9, 0xf8ad6d60, 0xfc6c70d7, 0xe22b20d2,
      0xe6ea3d65, 0xeba91bbc, 0xef68060b, 0xd727bbb6, 0xd3e6a601, 0xdea580d8,
      0xda649d6f, 0xc423cd6a, 0xc0e2d0dd, 0xcda1f604, 0xc960ebb3, 0xbd3e8d7e,
      0xb9ff90c9, 0xb4bcb610, 0xb07daba7, 0xae3afba2, 0xaafbe615, 0xa7b8c0cc,
      0xa379dd7b, 0x9b3660c6, 0x9ff77d71, 0x92b45ba8, 0x9675461f, 0x8832161a,
      0x8cf30bad, 0x81b02d74, 0x857130c3, 0x5d8a9099, 0x594b8d2e, 0x5408abf7,
      0x50c9b640, 0x4e8ee645, 0x4a4ffbf2, 0x470cdd2b, 0x43cdc09c, 0x7b827d21,
      0x7f436096, 0x7200464f, 0x76c15bf8, 0x68860bfd, 0x6c47164a, 0x61043093,
      0x65c52d24, 0x119b4be9, 0x155a565e, 0x18197087, 0x1cd86d30, 0x029f3d35,
      0x065e2082, 0x0b1d065b, 0x0fdc1bec, 0x3793a651, 0x3352bbe6, 0x3e119d3f,
      0x3ad08088, 0x2497d08d, 0x2056cd3a, 0x2d15ebe3, 0x29d4f654, 0xc5a92679,
      0xc1683bce, 0xcc2b1d17, 0xc8ea00a0, 0xd6ad50a5, 0xd26c4d12, 0xdf2f6bcb,
      0xdbee767c, 0xe3a1cbc1, 0xe760d676, 0xea23f0af, 0xeee2ed18, 0xf0a5bd1d,
      0xf464a0aa, 0xf9278673, 0xfde69bc4, 0x89b8fd09, 0x8d79e0be, 0x803ac667,
      0x84fbdbd0, 0x9abc8bd5, 0x9e7d9662, 0x933eb0bb, 0x97ffad0c, 0xafb010b1,
      0xab710d06, 0xa6322bdf, 0xa2f33668, 0xbcb4666d, 0xb8757bda, 0xb5365d03,
      0xb1f740b4 };

  int globalCrc = 0xffffffff;

  int getFinalCRC() {
    return ~globalCrc;
  }

  int getGlobalCRC() {
    return globalCrc;
  }

  void setGlobalCRC(int newCrc) {
    globalCrc = newCrc;
  }

  void updateCRC(int inCh) {
    int temp = (globalCrc >> 24) ^ inCh;
    if (temp < 0) {
      temp = 256 + temp;
    }
    globalCrc = (globalCrc << 8) ^ crc32Table[temp];
  }

  void updateCRC(int inCh, int repeat) {
    int globalCrcShadow = this.globalCrc;
    while (repeat-- > 0) {
      int temp = (globalCrcShadow >> 24) ^ inCh;
      globalCrcShadow = (globalCrcShadow << 8)
          ^ crc32Table[(temp >= 0) ? temp : (temp + 256)];
    }
    this.globalCrc = globalCrcShadow;
  }

}
