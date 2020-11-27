package test;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.ToIntFunction;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import test.baeldung.doublecolon.Computer;
import test.baeldung.doublecolon.MacbookPro;
import java.awt.event.ActionEvent;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.function.Supplier;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class Test_Future extends JFrame {

	Executor executor = (Runnable r) -> {
		new Thread(r).start();
	};

	public Test_Future() {
		setVisible(true);
		setBounds(500, 300, 400, 300);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		JButton button = new JButton("PRESS ME");
		button.addActionListener((ActionEvent e) -> {
			btnAction();
		});
		add(button);
	}

	private void btnAction() {
		System.out.println("button pressed");
		CompletionStage<String> future = longJob();
		future.thenAccept((value) -> {
			System.out.format("returned with %s%n", value);
		});
		 ExecutorService dialogExecutor = Executors.newSingleThreadExecutor();
		 Future<?> f = dialogExecutor.submit(() -> {
			System.out.println("dialog runnable 1");
		});
		 dialogExecutor.submit(() -> {
			System.out.println("dialog runnable 2");
		});
		 dialogExecutor.submit(() -> {
			System.out.println("dialog runnable 3");
			System.out.println(f.toString() + f.isDone());
		});
		System.out.println("CompletionStage started");
		System.out.println(f.toString() + f.isDone());
		
		
	}

	CompletableFuture<String> longJob() {
		return CompletableFuture.supplyAsync(this::getValue, executor);
	}

	String getValue() {
		return "Hello";
	}

	public static void main(String[] args) {
		SwingUtilities.invokeLater(Test_Future::new);
	}
}
