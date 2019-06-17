package test;

import java.util.Observable;
import java.util.Observer;

public class Test_Observer {
	
	
	static class MyObser extends Observable {
			public void doSetChanged() {
			setChanged();
		}
	}

	public static void main(String[] args) {

		Observer observer = new Observer() {

			@Override
			public void update(Observable o, Object arg) {
				System.out.println("observer update????? " + o + arg);
			}
			
			
		};

		Observer observer2 = new Observer() {

			@Override
			public void update(Observable o, Object arg) {
				System.out.println("observer2 update????? " + o + arg);
			}
			
			
		};

		MyObser observable = new MyObser();
		observable.addObserver(observer);
		observable.addObserver(observer2);

		observable.doSetChanged();
		observer.update(observable , "testing");
		observable.notifyObservers("testingNotify");
		
		System.out.println("Test_Obserger OK");

	}

} 