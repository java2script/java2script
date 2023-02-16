package test;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
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

import javax.swing.JButton;
import javax.swing.SwingUtilities;
import javax.swing.Timer;

import test.baeldung.doublecolon.Computer;
import test.baeldung.doublecolon.MacbookPro;

public class Test_J8_lambdafinal extends Test_ {


	public static void main(String args[]) {
		
		testFinal();
	}

	private static void testFinal() {

		Runnable r = () -> {
			for (String s : new String[] { "a", "b" }) {
				Runnable r1 = () -> {
					for (int i : new int[] { 0, 1, 2 }) {
						System.out.println(i + " " + s);
					}

				};
				r1.run();
			}
		};
		r.run();
	}

}
