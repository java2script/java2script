package java.nio; // decompiled using http://jd.benow.ca/

class ByteBufferAsIntBufferRL
  extends ByteBufferAsIntBufferL
{
  ByteBufferAsIntBufferRL(ByteBuffer paramByteBuffer)
  {
    super(paramByteBuffer);
  }
  
  ByteBufferAsIntBufferRL(ByteBuffer paramByteBuffer, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramByteBuffer, paramInt1, paramInt2, paramInt3, paramInt4, paramInt5);
  }
  
  public IntBuffer slice()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    int m = (i << 2) + this.offset;
    assert (m >= 0);
    return new ByteBufferAsIntBufferRL(this.bb, -1, 0, k, k, m);
  }
  
  public IntBuffer duplicate()
  {
    return new ByteBufferAsIntBufferRL(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public IntBuffer asReadOnlyBuffer()
  {
    return duplicate();
  }
  
  public IntBuffer put(int paramInt)
  {
    throw new ReadOnlyBufferException();
  }
  
  public IntBuffer put(int paramInt1, int paramInt2)
  {
    throw new ReadOnlyBufferException();
  }
  
  public IntBuffer compact()
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
