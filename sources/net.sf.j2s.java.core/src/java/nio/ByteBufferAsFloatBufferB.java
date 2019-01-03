package java.nio; // decompiled using http://jd.benow.ca/

class ByteBufferAsFloatBufferB
  extends FloatBuffer
{
  protected final ByteBuffer bb;
  protected final int offset;
  
  ByteBufferAsFloatBufferB(ByteBuffer paramByteBuffer)
  {
    super(-1, 0, paramByteBuffer
      .remaining() >> 2, paramByteBuffer
      .remaining() >> 2);
    this.bb = paramByteBuffer;
    
    int i = capacity();
    limit(i);
    int j = position();
    assert (j <= i);
    this.offset = j;
  }
  
  ByteBufferAsFloatBufferB(ByteBuffer paramByteBuffer, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramInt1, paramInt2, paramInt3, paramInt4);
    this.bb = paramByteBuffer;
    this.offset = paramInt5;
  }
  
  public FloatBuffer slice()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    int m = (i << 2) + this.offset;
    assert (m >= 0);
    return new ByteBufferAsFloatBufferB(this.bb, -1, 0, k, k, m);
  }
  
  public FloatBuffer duplicate()
  {
    return new ByteBufferAsFloatBufferB(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public FloatBuffer asReadOnlyBuffer()
  {
    return new ByteBufferAsFloatBufferRB(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  protected int ix(int paramInt)
  {
    return (paramInt << 2) + this.offset;
  }
  
  public float get()
  {
    return Bits.getFloatB(this.bb, ix(nextGetIndex()));
  }
  
  public float get(int paramInt)
  {
    return Bits.getFloatB(this.bb, ix(checkIndex(paramInt)));
  }
  
  public FloatBuffer put(float paramFloat)
  {
    Bits.putFloatB(this.bb, ix(nextPutIndex()), paramFloat);
    return this;
  }
  
  public FloatBuffer put(int paramInt, float paramFloat)
  {
    Bits.putFloatB(this.bb, ix(checkIndex(paramInt)), paramFloat);
    return this;
  }
  
  public FloatBuffer compact()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    
    ByteBuffer localByteBuffer1 = this.bb.duplicate();
    localByteBuffer1.limit(ix(j));
    localByteBuffer1.position(ix(0));
    ByteBuffer localByteBuffer2 = localByteBuffer1.slice();
    localByteBuffer2.position(i << 2);
    localByteBuffer2.compact();
    position(k);
    limit(capacity());
    discardMark();
    return this;
  }
  
  public boolean isDirect()
  {
    return this.bb.isDirect();
  }
  
  public boolean isReadOnly()
  {
    return false;
  }
  
  public ByteOrder order()
  {
    return ByteOrder.BIG_ENDIAN;
  }
}
