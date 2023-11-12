/* -*-mode:java; c-basic-offset:2; indent-tabs-mode:nil -*- */
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

public class Deflater extends ZStream {

  static final private int MAX_WBITS = 15; // 32K LZ77 window

  //static final private int DEF_WBITS=MAX_WBITS;

  //  static final private int Z_NO_FLUSH=0;
  //  static final private int Z_PARTIAL_FLUSH=1;
  //  static final private int Z_SYNC_FLUSH=2;
  //  static final private int Z_FULL_FLUSH=3;
  //  static final private int Z_FINISH=4;
  //
  //  static final private int MAX_MEM_LEVEL=9;

  //static final private int Z_OK = 0;
  static final private int Z_STREAM_END = 1;
  //  static final private int Z_NEED_DICT=2;
  //  static final private int Z_ERRNO=-1;
  static final private int Z_STREAM_ERROR = -2;
  //  static final private int Z_DATA_ERROR=-3;
  //  static final private int Z_MEM_ERROR=-4;
  //  static final private int Z_BUF_ERROR=-5;
  //  static final private int Z_VERSION_ERROR=-6;

  private boolean finished = false;

  /*

  public Deflater(int level) {
    this(level, 0, false);
  }

  public Deflater(int level, boolean nowrap) {
    this(level, 0, nowrap);
  }

  public Deflater(int level, int bits) {
    this(level, bits, false);
  }
   */
  
/*
  public Deflater(int level, int bits, int memlevel) {
    super();
    init3(level, bits, memlevel);
    //if (ret != Z_OK)
      //throw new GZIPException(ret + ": " + msg);
  }
  public int init(int level) {
    return init2(level, MAX_WBITS);
  }

  public int init2(int level, int bits) {
    return init3b(level, bits, false);
  }


  public int init2b(int level, boolean nowrap) {
    return init3b(level, MAX_WBITS, nowrap);
  }

  public int init3(int level, int bits, int memlevel) {
    finished = false;
    dstate = new Deflate(this);
    return dstate.deflateInit3(level, bits, memlevel);
  }


*/
  public Deflater init(int level, int bits, boolean nowrap) {
    if (bits == 0)
      bits = MAX_WBITS;
    finished = false;
    setAdler32();
    dstate = new Deflate(this);
    dstate.deflateInit2(level, nowrap ? -bits : bits);
    return this;
  }

  @Override
  public int deflate(int flush) {
    if (dstate == null) {
      return Z_STREAM_ERROR;
    }
    int ret = dstate.deflate(flush);
    if (ret == Z_STREAM_END)
      finished = true;
    return ret;
  }

  @Override
  public int end() {
    finished = true;
    if (dstate == null)
      return Z_STREAM_ERROR;
    int ret = dstate.deflateEnd();
    dstate = null;
    free();
    return ret;
  }

  public int params(int level, int strategy) {
    if (dstate == null)
      return Z_STREAM_ERROR;
    return dstate.deflateParams(level, strategy);
  }

  public int setDictionary(byte[] dictionary, int dictLength) {
    if (dstate == null)
      return Z_STREAM_ERROR;
    return dstate.deflateSetDictionary(dictionary, dictLength);
  }

  @Override
  public boolean finished() {
    return finished;
  }

  public void finish() {
    // native use only?
    
  }

  public long getBytesRead() {
    return dstate.getBytesRead();
  }

  public long getBytesWritten() {
    return dstate.getBytesWritten();
  }

  //  public int copy(Deflater src){
  //    this.finished = src.finished;
  //    return Deflate.deflateCopy(this, src);
  //  }
}
