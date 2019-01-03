package java.nio;

class HeapByteBufferR
  extends HeapByteBuffer
{
  HeapByteBufferR(int paramInt1, int paramInt2)
  {
    super(paramInt1, paramInt2);
    this.isReadOnly = true;
  }
  
  HeapByteBufferR(byte[] paramArrayOfByte, int paramInt1, int paramInt2)
  {
    super(paramArrayOfByte, paramInt1, paramInt2);
    this.isReadOnly = true;
  }
  
  protected HeapByteBufferR(byte[] paramArrayOfByte, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
  {
    super(paramArrayOfByte, paramInt1, paramInt2, paramInt3, paramInt4, paramInt5);
    this.isReadOnly = true;
  }
  
  public ByteBuffer slice()
  {
    return new HeapByteBufferR(this.hb, -1, 0, 
    
      remaining(), 
      remaining(), 
      position() + this.offset);
  }
  
  public ByteBuffer duplicate()
  {
    return new HeapByteBufferR(this.hb, 
      markValue(), 
      position(), 
      limit(), 
      capacity(), this.offset);
  }
  
  public ByteBuffer asReadOnlyBuffer()
  {
    return duplicate();
  }
  
  public boolean isReadOnly()
  {
    return true;
  }
  
  public ByteBuffer put(byte paramByte)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer put(int paramInt, byte paramByte)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer put(byte[] paramArrayOfByte, int paramInt1, int paramInt2)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer put(ByteBuffer paramByteBuffer)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer compact()
  {
    throw new ReadOnlyBufferException();
  }
  
  public byte _get(int paramInt)
  {
    return this.hb[paramInt];
  }
  
  public void _put(int paramInt, byte paramByte)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putChar(char paramChar)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putChar(int paramInt, char paramChar)
  {
    throw new ReadOnlyBufferException();
  }
  
  public CharBuffer asCharBuffer()
  {
    int i = remaining() >> 1;
    int j = this.offset + position();
    return this.bigEndian ? new ByteBufferAsCharBufferRB(this, -1, 0, i, i, j) : new ByteBufferAsCharBufferRL(this, -1, 0, i, i, j);
  }
  
  public ByteBuffer putShort(short paramShort)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putShort(int paramInt, short paramShort)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ShortBuffer asShortBuffer()
  {
    int i = remaining() >> 1;
    int j = this.offset + position();
    return this.bigEndian ? new ByteBufferAsShortBufferRB(this, -1, 0, i, i, j) : new ByteBufferAsShortBufferRL(this, -1, 0, i, i, j);
  }
  
  public ByteBuffer putInt(int paramInt)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putInt(int paramInt1, int paramInt2)
  {
    throw new ReadOnlyBufferException();
  }
  
  public IntBuffer asIntBuffer()
  {
    int i = remaining() >> 2;
    int j = this.offset + position();
    return this.bigEndian ? new ByteBufferAsIntBufferRB(this, -1, 0, i, i, j) : new ByteBufferAsIntBufferRL(this, -1, 0, i, i, j);
  }
  
  public ByteBuffer putLong(long paramLong)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putLong(int paramInt, long paramLong)
  {
    throw new ReadOnlyBufferException();
  }
  
  public LongBuffer asLongBuffer()
  {
    int i = remaining() >> 3;
    int j = this.offset + position();
    return this.bigEndian ? new ByteBufferAsLongBufferRB(this, -1, 0, i, i, j) : new ByteBufferAsLongBufferRL(this, -1, 0, i, i, j);
  }
  
  public ByteBuffer putFloat(float paramFloat)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putFloat(int paramInt, float paramFloat)
  {
    throw new ReadOnlyBufferException();
  }
  
  public FloatBuffer asFloatBuffer()
  {
    int i = remaining() >> 2;
    int j = this.offset + position();
    return this.bigEndian ? new ByteBufferAsFloatBufferRB(this, -1, 0, i, i, j) : new ByteBufferAsFloatBufferRL(this, -1, 0, i, i, j);
  }
  
  public ByteBuffer putDouble(double paramDouble)
  {
    throw new ReadOnlyBufferException();
  }
  
  public ByteBuffer putDouble(int paramInt, double paramDouble)
  {
    throw new ReadOnlyBufferException();
  }
  
  public DoubleBuffer asDoubleBuffer()
  {
    int i = remaining() >> 3;
    int j = this.offset + position();
    return this.bigEndian ? new ByteBufferAsDoubleBufferRB(this, -1, 0, i, i, j) : new ByteBufferAsDoubleBufferRL(this, -1, 0, i, i, j);
  }
}
