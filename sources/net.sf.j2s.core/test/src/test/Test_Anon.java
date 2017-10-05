package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Enumeration;
import java.util.NoSuchElementException;

class Test_Anon extends Test_ {

	private static int x = 3;
	private static final Enumeration<?> EMPTY_ENUMERATION = new Enumeration<Object>() {
        public boolean hasMoreElements() {
            return false;
        }
        
        public Object nextElement() {
            throw new NoSuchElementException();
        }
        
    };


  public static void main(String[] args) { 
	  int z = 3;
	  assert(!EMPTY_ENUMERATION.hasMoreElements());
	  Object xx = new MouseListener() {

		int y = 0;
		@Override
		public void mouseClicked(MouseEvent e) {
			System.out.println(x + " " + y + " " + z);
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mousePressed(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mouseEntered(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mouseExited(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}
		  
	  };
	  System.out.println("Test_Anon OK");
	  
  }
	
}