package test;

import java.util.Enumeration;
import java.util.NoSuchElementException;

class Test_Anon {

	private static final Enumeration<?> EMPTY_ENUMERATION = new Enumeration<Object>() {
        public boolean hasMoreElements() {
            return false;
        }
        
        public Object nextElement() {
            throw new NoSuchElementException();
        }
    };


  public static void main(String[] args) {
	  System.out.println(!EMPTY_ENUMERATION.hasMoreElements());
	  
  }
	
}