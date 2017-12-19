package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

class Test_Proxy extends Test_ implements InvocationHandler, Runnable, MouseListener {
	
	private static Runnable proxy;
	
	public static void main(String[] args) {
        proxy = (Runnable) Proxy.newProxyInstance( test.Test_Proxy.class.getClassLoader(),
                new Class<?>[] { Runnable.class, MouseListener.class }, new Test_Proxy());
		proxy.run();
		System.out.println("Test_Proxy OK");
	}
	
	private boolean isOK;

	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		Test_Proxy p = new Test_Proxy();
		System.out.println(Test_Proxy.class);
		method.invoke(p, args);
		assert(p.isOK);
		return null;
	}

	public void run() {
		isOK = true;
	}

	@Override
	public void mouseClicked(MouseEvent e) {
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

}