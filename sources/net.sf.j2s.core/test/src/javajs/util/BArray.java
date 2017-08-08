package javajs.util;

public class BArray {
  public byte[] data;
  
  public BArray(byte[] data) {
    this.data = data;
  }

  @Override
  public boolean equals(Object o) {
    if (o instanceof BArray) {
      byte[] d = ((BArray) o).data;
      if (d.length == data.length){
        for (int i = 0; i < d.length; i++)
          if (d[i] != data[i])
            return false;
        return true;
      }
    }
    return false;
  }

  @Override
  public int hashCode() {
    return data.hashCode();
  }
  
  @Override
  public String toString() {
    return new String(data);
  }
}
