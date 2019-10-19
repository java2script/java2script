package test;

import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;

public class Test_Log extends Test_ {

	private static Logger logger;

	private static void logClass(String name) {
		ConsoleHandler consoleHandler = new ConsoleHandler() {
			@Override
			public void publish(LogRecord rec) {
				System.out.println("Test_Log consoleHandler: " + rec.getMessage());
			}
		};
		consoleHandler.setLevel(Level.ALL);
		logger = Logger.getLogger(name);
		logger.setLevel(Level.ALL);
    	logger.addHandler(consoleHandler);
	}

	private void setLogging() {
//		Logger rootLogger = Logger.getLogger("");
//		rootLogger.setLevel(Level.ALL);
		logClass("test.Test_Log");
	}

	public static void main(String[] args) {
		new Test_Log();
	}

	public Test_Log() {

		setLogging();
		logger.setLevel(Level.SEVERE);

		logger.info("info Test_Log");		
		
		System.out.println("logger.parent.parent " + logger.getParent().getHandlers()[0].getClass().getName());
		logger.getParent().log(Level.SEVERE, "parent test");
		
		showError();
	}

	private void showError() {
		logger.severe("Severe Test_Log");
		Handler[] a = logger.getHandlers();
		for (int i = 0; i < a.length; i++)
			System.out.println(i + " " + a[i].getClass().getName());		

	}


}
