package test;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.DoubleBuffer;
import java.nio.ShortBuffer;

public class Test_Buffer extends Test_{

	public static void main(String[] args) {
		ByteBuffer bf = ByteBuffer.wrap(new byte[] {0,95,0,96,0,97,-100,-100});
		CharBuffer cf= bf.asCharBuffer();
		ShortBuffer sf = ShortBuffer.wrap(new short[3]);
		DoubleBuffer df = DoubleBuffer.wrap(new double[3]);
		System.out.println(cf.get());
		System.out.println(cf.get());
		System.out.println(cf.get());
		
		System.out.println("Test_Buffer OK");
	}
}