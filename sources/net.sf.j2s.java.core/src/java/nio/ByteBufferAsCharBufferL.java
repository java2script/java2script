package java.nio; // decompiled using http://jd.benow.ca/

class ByteBufferAsCharBufferL
  extends CharBuffer
{
  protected final ByteBuffer bb;
  protected final int offset;
  
  ByteBufferAsCharBufferL(ByteBuffer paramByteBuffer)
  {
    super(-1, 0, paramByteBuffer
      .remaining() >> 1, paramByteBuffer
      .remaining() >> 1);
    this.bb = paramByteBuffer;
    
    int i = capacity();
    limit(i);
    int j = position();
    assert (j <= i);
    this.offset = j;
  }
  
  ByteBufferAsCharBufferL(ByteBuffer paramByteBuffer, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramInt1, paramInt2, paramInt3, paramInt4);
    this.bb = paramByteBuffer;
    this.offset = paramInt5;
  }
  
  public CharBuffer slice()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    int m = (i << 1) + this.offset;
    assert (m >= 0);
    return new ByteBufferAsCharBufferL(this.bb, -1, 0, k, k, m);
  }
  
  public CharBuffer duplicate()
  {
    return new ByteBufferAsCharBufferL(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public CharBuffer asReadOnlyBuffer()
  {
    return new ByteBufferAsCharBufferRL(this.bb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  protected int ix(int paramInt)
  {
    return (paramInt << 1) + this.offset;
  }
  
  public char get()
  {
    return Bits.getCharL(this.bb, ix(nextGetIndex()));
  }
  
  public char get(int paramInt)
  {
    return Bits.getCharL(this.bb, ix(checkIndex(paramInt)));
  }
  
  char getUnchecked(int paramInt)
  {
    return Bits.getCharL(this.bb, ix(paramInt));
  }
  
  public CharBuffer put(char paramChar)
  {
    Bits.putCharL(this.bb, ix(nextPutIndex()), paramChar);
    return this;
  }
  
  public CharBuffer put(int paramInt, char paramChar)
  {
    Bits.putCharL(this.bb, ix(checkIndex(paramInt)), paramChar);
    return this;
  }
  
  public CharBuffer compact()
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    int k = i <= j ? j - i : 0;
    
    ByteBuffer localByteBuffer1 = this.bb.duplicate();
    localByteBuffer1.limit(ix(j));
    localByteBuffer1.position(ix(0));
    ByteBuffer localByteBuffer2 = localByteBuffer1.slice();
    localByteBuffer2.position(i << 1);
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
  
  public String toString(int paramInt1, int paramInt2)
  {
    if ((paramInt2 > limit()) || (paramInt1 > paramInt2)) {
      throw new IndexOutOfBoundsException();
    }
    try
    {
      int i = paramInt2 - paramInt1;
      char[] arrayOfChar = new char[i];
      CharBuffer localCharBuffer1 = CharBuffer.wrap(arrayOfChar);
      CharBuffer localCharBuffer2 = duplicate();
      localCharBuffer2.position(paramInt1);
      localCharBuffer2.limit(paramInt2);
      localCharBuffer1.put(localCharBuffer2);
      return new String(arrayOfChar);
    }
    catch (StringIndexOutOfBoundsException localStringIndexOutOfBoundsException)
    {
      throw new IndexOutOfBoundsException();
    }
  }
  
  public CharBuffer subSequence(int paramInt1, int paramInt2)
  {
    int i = position();
    int j = limit();
    assert (i <= j);
    i = i <= j ? i : j;
    int k = j - i;
    if ((paramInt1 < 0) || (paramInt2 > k) || (paramInt1 > paramInt2)) {
      throw new IndexOutOfBoundsException();
    }
    return new ByteBufferAsCharBufferL(this.bb, -1, i + paramInt1, i + paramInt2, 
    
      capacity(), this.offset);
  }
  
  public ByteOrder order()
  {
    return ByteOrder.BIG_ENDIAN;
  }
}
