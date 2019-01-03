package java.nio; // decompiled using http://jd.benow.ca/

class ByteBufferAsShortBufferRB
  extends ByteBufferAsShortBufferB
{
  ByteBufferAsShortBufferRB(ByteBuffer paramByteBuffer)
  {
    super(paramByteBuffer);
  }
  
  ByteBufferAsShortBufferRB(ByteBuffer paramByteBuffer, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramByteBuffer, paramInt1, paramInt2, paramInt3, paramInt4, paramInt5);
  }
  
  public ShortBuffer slice()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    int m = (i << 1) + this.offset;
    assert (m >= 0);
    return new ByteBufferAsShortBufferRB(this.bb, -1, 0, k, k, m);
  }
  
  public ShortBuffer duplicate()
  {
    return new ByteBufferAsShortBufferRB(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public ShortBuffer asReadOnlyBuffer()
  {
    return duplicate();
  }
  
  public ShortBuffer put(short paramShort)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ShortBuffer put(int paramInt, short paramShort)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ShortBuffer compact()
  {
    throw new ReadOnlyBufferException();
  }
  
  public boolean isDirect()
  {
    return this.bb.isDirect();
  }
  
  public boolean isReadOnly()
  {
    return true;
  }
  
  public ByteOrder order()
  {
    return ByteOrder.BIG_ENDIAN;
  }
}
