package test;

import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;

public class Test_Java8a extends Test_ {

	String test = "testing";
	
	public int getI(int i) {
		return test.charAt(i);
	}
		
	public double[] getTest() {
	  return IntStream.range(0, 4).mapToDouble(i -> this.getI(i)).toArray();
	}
	
    private static String whitespaceString(int width) {
        return IntStream.range(0, width).mapToObj(i -> " ").collect(Collectors.joining());
    }
	
	public static void main(String[] args) {
		double[] cc = new Test_Java8a().getTest();
		assert(cc[2] == 's');
		double[] dd = new Test_Java8a().values().toArray();
		assert(dd[2] == 2);
		assert(whitespaceString(10).length() == 10);
		System.out.println("Test_Java8a OK");
	}

    public DoubleStream values() {
        return IntStream.range(0, 4)
                .mapToDouble(this::get);
    }

	
    public double get(int row) {
        return row;
    }

}
