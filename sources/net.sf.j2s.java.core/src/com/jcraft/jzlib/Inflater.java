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

public class Inflater extends ZStream{

  static final private int MAX_WBITS=15;        // 32K LZ77 window
  static final private int DEF_WBITS=MAX_WBITS;

//  static final private int Z_NO_FLUSH=0;
//  static final private int Z_PARTIAL_FLUSH=1;
//  static final private int Z_SYNC_FLUSH=2;
//  static final private int Z_FULL_FLUSH=3;
//  static final private int Z_FINISH=4;

//  static final private int MAX_MEM_LEVEL=9;

//  static final private int Z_OK=0;
//  static final private int Z_STREAM_END=1;
//  static final private int Z_NEED_DICT=2;
//  static final private int Z_ERRNO=-1;
  static final private int Z_STREAM_ERROR=-2;
//  static final private int Z_DATA_ERROR=-3;
//  static final private int Z_MEM_ERROR=-4;
//  static final private int Z_BUF_ERROR=-5;
//  static final private int Z_VERSION_ERROR=-6;

  public Inflater init(int w, boolean nowrap) {
    setAdler32();
    //finished = false;
    if (w == 0)
      w = DEF_WBITS;
    istate=new Inflate(this);
    istate.inflateInit(nowrap?-w:w);
    return this;
}

  @Override
  public int inflate(int f){
    if(istate==null) return Z_STREAM_ERROR;
    int ret = istate.inflate(f);
    //if(ret == Z_STREAM_END) 
      //finished = true;
    return ret;
  }

  @Override
  public int end(){
    //finished = true;
    if(istate==null) return Z_STREAM_ERROR;
    int ret=istate.inflateEnd();
//    istate = null;
    return ret;
  }

  public int sync(){
    if(istate == null)
      return Z_STREAM_ERROR;
    return istate.inflateSync();
  }

  public int syncPoint(){
    if(istate == null)
      return Z_STREAM_ERROR;
    return istate.inflateSyncPoint();
  }

  public int setDictionary(byte[] dictionary, int dictLength){
    if(istate == null)
      return Z_STREAM_ERROR;
    return istate.inflateSetDictionary(dictionary, dictLength);
  }

  @Override
  public boolean finished(){
    return istate.mode==12 /*DONE*/;
  }

  public void reset() {
    avail_in = 0;
    if (istate != null)
      istate.reset();
    /*
     * what is the equivalent?
     * 
        synchronized (zsRef) {
            ensureOpen();
            reset(zsRef.address());
            buf = defaultBuf;
            finished = false;
            needDict = false;
            off = len = 0;
        }
     */
    
  }
}
