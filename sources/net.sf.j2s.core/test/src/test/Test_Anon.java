package test;

import java.util.Enumeration;
import java.util.NoSuchElementException;

class Test_Anon extends Test_ {

	private static final Enumeration<?> EMPTY_ENUMERATION = new Enumeration<Object>() {
        public boolean hasMoreElements() {
            return false;
        }
        
        public Object nextElement() {
            throw new NoSuchElementException();
        }
    };


  public static void main(String[] args) {
	  assert(!EMPTY_ENUMERATION.hasMoreElements());
	  System.out.println("Test_Anon OK");
	  
  }
	
}