package java.nio; // decompiled using http://jd.benow.ca/

class ByteBufferAsDoubleBufferRL
  extends ByteBufferAsDoubleBufferL
{
  ByteBufferAsDoubleBufferRL(ByteBuffer paramByteBuffer)
  {
    super(paramByteBuffer);
  }
  
  ByteBufferAsDoubleBufferRL(ByteBuffer paramByteBuffer, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramByteBuffer, paramInt1, paramInt2, paramInt3, paramInt4, paramInt5);
  }
  
  public DoubleBuffer slice()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    int m = (i << 3) + this.offset;
    assert (m >= 0);
    return new ByteBufferAsDoubleBufferRL(this.bb, -1, 0, k, k, m);
  }
  
  public DoubleBuffer duplicate()
  {
    return new ByteBufferAsDoubleBufferRL(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public DoubleBuffer asReadOnlyBuffer()
  {
    return duplicate();
  }
  
  public DoubleBuffer put(double paramDouble)
  {
    throw new ReadOnlyBufferException();
  }
  
  public DoubleBuffer put(int paramInt, double paramDouble)
  {
    throw new ReadOnlyBufferException();
  }
  
  public DoubleBuffer compact()
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
