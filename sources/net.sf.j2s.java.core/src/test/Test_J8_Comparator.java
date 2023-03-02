package test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

public class Test_J8_Comparator extends Test_ {

	static class StringLengthExtractor implements Function<String, Integer> {
		@Override
		public Integer apply(String t) {
			return t.length();
		}
	}

	static class FirstLetterExtractor implements Function<String, Character> {
		@Override
		public Character apply(String t) {
			return t.charAt(0);
		}
	}

	public static void main(String[] args) {
		
		StringLengthExtractor lenExtractor = new StringLengthExtractor();
		 FirstLetterExtractor flExtractor = new FirstLetterExtractor();
		List<String> list = new ArrayList<String>(listof(
				"bravo", "alpha", "charlie", "delta", "eve"
		));
		list.sort(Comparator.comparing(lenExtractor).thenComparing(flExtractor));
		System.out.println(list);
		System.out.println("Test_J8_Comparator OK");
	}

	private static List<String> listof(String... a) {
		List<String> list = new ArrayList<>();
		for (int i = 0; i < a.length; i++)
			list.add(a[i]);
		return list;
	}

}