package com.polytopemedia.polyhedra.ui.io;

public class JSCallback {
	
  private Object data;
  
  private Runnable r;
  
  boolean success = false;
  
  public JSCallback() {
	  // for reflection
  }
  
  public void setRunnable(Runnable r) {
	  this.r = r;
  }
  
  public void setData(Object data) {
	  this.data = data;
  }
  
  public Object getData() {
	  return data;
  }
  
  public void setSuccessful(boolean tf) {
	  success = tf;
  }
  
  public boolean getSuccessful() {
	  return success;
  }
  
  public void run() {
	  r.run();
  }
}
