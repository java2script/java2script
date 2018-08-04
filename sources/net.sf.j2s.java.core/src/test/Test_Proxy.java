package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;


/**
 * Testing Proxy. This class allows specifying a set of interfaces that can be run 
 * via a proxy class. The proxy class method is invoked, and it then passes the 
 * invocation to the specified Invocationhandler, which has an invoke() method.
 * From there on it is the job of the InvocationHandler to finish the call.
 * 
 * @author hansonr
 *
 */
class Test_Proxy extends Test_ implements InvocationHandler, Runnable, MouseListener, Interface {
	
	private static Runnable proxy;
	
	private static Interface proxy2;
	
	public static void main(String[] args) {
        proxy = (Runnable) Proxy.newProxyInstance( test.Test_Proxy.class.getClassLoader(),
                new Class<?>[] { Interface.class, Runnable.class, MouseListener.class }, new Test_Proxy());
		proxy.run();
        proxy2 = (Interface) Proxy.newProxyInstance( test.Test_Proxy.class.getClassLoader(),
                new Class<?>[] { Interface.class 	}, new Test_Proxy());
		proxy2.test1(3);
		System.out.println("Test_Proxy OK");
	}

	int itest;
	
	// SwingJS cannot handle "private" here for a proxy. 
	public void test1(int i) {
		System.out.println("itest = " + i);
		itest = i;
	}

	private boolean isOK;

	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		Test_Proxy p = new Test_Proxy();
		System.out.println(Test_Proxy.class);
		method.invoke(p, args);
		if (args == null || args.length == 0)
			assert(p.isOK);
		else
			assert(p.itest == 3);
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