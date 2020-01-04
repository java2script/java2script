package java.nio; // decompiled using http://jd.benow.ca/

class ByteBufferAsIntBufferL
  extends IntBuffer
{
  protected final ByteBuffer bb;
  protected final int offset;
  
  ByteBufferAsIntBufferL(ByteBuffer paramByteBuffer)
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
  
  ByteBufferAsIntBufferL(ByteBuffer paramByteBuffer, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramInt1, paramInt2, paramInt3, paramInt4);
    this.bb = paramByteBuffer;
    this.offset = paramInt5;
  }
  
  public IntBuffer slice()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    int m = (i << 2) + this.offset;
    assert (m >= 0);
    return new ByteBufferAsIntBufferL(this.bb, -1, 0, k, k, m);
  }
  
  public IntBuffer duplicate()
  {
    return new ByteBufferAsIntBufferL(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public IntBuffer asReadOnlyBuffer()
  {
    return new ByteBufferAsIntBufferRL(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  protected int ix(int paramInt)
  {
    return (paramInt << 2) + this.offset;
  }
  
  public int get()
  {
    return Bits.getIntL(this.bb, ix(nextGetIndex()));
  }
  
  public int get(int paramInt)
  {
    return Bits.getIntL(this.bb, ix(checkIndex(paramInt)));
  }
  
  public IntBuffer put(int paramInt)
  {
    Bits.putIntL(this.bb, ix(nextPutIndex()), paramInt);
    return this;
  }
  
  public IntBuffer put(int paramInt1, int paramInt2)
  {
    Bits.putIntL(this.bb, ix(checkIndex(paramInt1)), paramInt2);
    return this;
  }
  
  public IntBuffer compact()
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
