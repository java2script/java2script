package org.sgx.j2s.mauve.report;

import gnu.testlet.Testlet;
import gnu.testlet.java2.lang.Boolean.BooleanTest;
import gnu.testlet.java2.lang.Boolean.equals_Boolean;
import gnu.testlet.java2.lang.Boolean.get;
import gnu.testlet.java2.lang.Boolean.hashcode_Boolean;
import gnu.testlet.java2.lang.Boolean.new_Boolean;
import gnu.testlet.java2.lang.Boolean.value;
import gnu.testlet.java2.lang.Byte.ByteTest;
import gnu.testlet.java2.lang.Byte.new_Byte;
import gnu.testlet.java2.lang.Character.Blocks;
import gnu.testlet.java2.lang.Character.Blocks15;
import gnu.testlet.java2.lang.Character.classify;
import gnu.testlet.java2.lang.Character.classify12;
import gnu.testlet.java2.lang.Character.consts;
import gnu.testlet.java2.lang.Character.digit;
import gnu.testlet.java2.lang.Character.equals_Character;
import gnu.testlet.java2.lang.Character.forDigit;
import gnu.testlet.java2.lang.Character.getNumericValue;
import gnu.testlet.java2.lang.Character.getType;
import gnu.testlet.java2.lang.Character.getType12;
import gnu.testlet.java2.lang.Character.hash;
import gnu.testlet.java2.lang.Character.to;
import gnu.testlet.java2.lang.Class.ClassTest;
import gnu.testlet.java2.lang.Class.init;
import gnu.testlet.java2.lang.Class.newInstance;
import gnu.testlet.java2.lang.Cloneable.CloneableTest;
import gnu.testlet.java2.lang.Double.DoubleSetterTest;
import gnu.testlet.java2.lang.Double.DoubleTest;
import gnu.testlet.java2.lang.Double.compare;
import gnu.testlet.java2.lang.Double.new_Double;
import gnu.testlet.java2.lang.Double.parseDouble;
import gnu.testlet.java2.lang.Double.toHexString;
import gnu.testlet.java2.lang.Enum.PR33183;
import gnu.testlet.java2.lang.Float.FloatTest;
import gnu.testlet.java2.lang.Float.new_Float;
import gnu.testlet.java2.lang.Float.parseFloat;
import gnu.testlet.java2.lang.Integer.IntegerBitStuff;
import gnu.testlet.java2.lang.Integer.IntegerTest;
import gnu.testlet.java2.lang.Integer.Tests15;
import gnu.testlet.java2.lang.Integer.compareTo;
import gnu.testlet.java2.lang.Integer.decode;
import gnu.testlet.java2.lang.Integer.getInteger;
import gnu.testlet.java2.lang.Integer.new_Integer;
import gnu.testlet.java2.lang.Integer.parseInt;
import gnu.testlet.java2.lang.Integer.toStringIntegerTests;
import gnu.testlet.java2.lang.Long.LongBitStuff;
import gnu.testlet.java2.lang.Long.LongTest;
import gnu.testlet.java2.lang.Long.getLong;
import gnu.testlet.java2.lang.Long.new_Long;
import gnu.testlet.java2.lang.Math.MathTest;
import gnu.testlet.java2.lang.Math.cos;
import gnu.testlet.java2.lang.Math.max;
import gnu.testlet.java2.lang.Math.min;
import gnu.testlet.java2.lang.Math.rint;
import gnu.testlet.java2.lang.Math.sin;
import gnu.testlet.java2.lang.Math.ulp;
import gnu.testlet.java2.lang.Number.NumberTest;
import gnu.testlet.java2.lang.Object.ObjectTest;
import gnu.testlet.java2.lang.Short.ShortTest;
import gnu.testlet.java2.lang.String.CASE_INSENSITIVE_ORDER;
import gnu.testlet.java2.lang.String.ConsCharset;
import gnu.testlet.java2.lang.String.StringTest;
import gnu.testlet.java2.lang.String.charAt;
import gnu.testlet.java2.lang.String.getBytes;
import gnu.testlet.java2.lang.String.getBytes13;
import gnu.testlet.java2.lang.String.getBytes14;
import gnu.testlet.java2.lang.String.indexOf;
import gnu.testlet.java2.lang.String.new_String;
import gnu.testlet.java2.lang.String.replaceAll;
import gnu.testlet.java2.lang.String.split;
import gnu.testlet.java2.lang.String.startsWith;
import gnu.testlet.java2.lang.String.substring;
import gnu.testlet.java2.lang.String.surrogate;
import gnu.testlet.java2.lang.StringBuffer.PR34840;
import gnu.testlet.java2.lang.StringBuffer.StringBufferTest;
import gnu.testlet.java2.lang.StringBuffer.plus;
import gnu.testlet.java2.util.Properties.getProperty;

import java.util.LinkedList;
import java.util.List;
/**
 * 
 * @author sgurin
 *
 */
public class JavaLangTests {

	private LinkedList<Testlet> tests;

	public JavaLangTests(LinkedList<Testlet> tests) {
		this.tests=tests;

		doBoolean();
		doByte();
		doCharacter(this.tests);
		doClass();
		doCloneable();
		doDouble();
		doEnum();
		doFloat();
		doInteger();
		doLong(this.tests);
		doMath();		
		doNumber();
		doObject();
		doShort();
		doString();
		doStringBuffer();
		doSystem();
//		doBigDecimal();
	}
	
	
//	private void doBigDecimal() {
//		tests.add(new gnu.testlet.java2.math.BigDecimal.compareTo());
//		tests.add(new construct());
//		tests.add(new DiagBigDecimal());
//		tests.add(new divide());
//		tests.add(new setScale());
//	}


	private void doSystem() {
//		tests.add(new arraycopy()); //inf recursion
		tests.add(new getProperty());
//		tests.add(new identityHashCode());
//		tests.add(new security());  //unsupported by j2s
	}


	private void doStringBuffer() {
		tests.add(new plus());
		tests.add(new PR34840());
		tests.add(new StringBufferTest());
	}


	private void doString() {
		tests.add(new CASE_INSENSITIVE_ORDER());
		tests.add(new charAt());
		tests.add(new gnu.testlet.java2.lang.String.compareTo());
		tests.add(new ConsCharset());
		tests.add(new gnu.testlet.java2.lang.String.decode());
//		tests.addFirst(new gnu.testlet.java2.lang.String.equals()); //not working. gives a strange error...TODO: run this alone
		tests.add(new getBytes());
		tests.add(new getBytes13());
		tests.add(new getBytes14());
		tests.add(new gnu.testlet.java2.lang.String.hash());
		tests.add(new indexOf());
		tests.add(new new_String());
		tests.add(new replaceAll());
		tests.add(new split());
		tests.add(new startsWith());
		tests.add(new StringTest());
		tests.add(new substring());
		tests.add(new surrogate());
		tests.add(new gnu.testlet.java2.lang.String.to());
	}
	private void doShort() {
		tests.add(new gnu.testlet.java2.lang.Short.hash());
		tests.add(new ShortTest());
	}
	private void doObject() {
//		tests.add(new gnu.testlet.java2.lang.Object.clone());
		tests.add(new ObjectTest());
//		tests.add(new oom());  //gives infinite recursion
//		tests.add(new wait());
		
	}
	private void doNumber() {
		tests.add(new NumberTest());
	}
	private void doMath() {
		tests.add(new cos());
		tests.add(new MathTest());
		tests.add(new max());
		tests.add(new min());
		tests.add(new rint());
		tests.add(new sin());
		tests.add(new ulp());
	}
	public static void doLong(List<Testlet> tests) {
		tests.add(new getLong());
		tests.add(new LongTest());
		tests.add(new new_Long());
		tests.add(new LongBitStuff());
		tests.add(new gnu.testlet.java2.lang.Long.Tests15());
	}
	private void doInteger() {
		tests.add(new compareTo());
		tests.add(new decode());
		tests.add(new getInteger());
		tests.add(new IntegerTest());
		tests.add(new new_Integer());
		tests.add(new parseInt());
		tests.add(new Tests15());
		tests.add(new IntegerBitStuff());
		tests.add(new toStringIntegerTests());	
	}
	private void doFloat() {
		tests.add(new gnu.testlet.java2.lang.Float.compare());
		tests.add(new gnu.testlet.java2.lang.Float.compareTo());
		tests.add(new FloatTest());
		tests.add(new new_Float());
		tests.add(new parseFloat());
		tests.add(new gnu.testlet.java2.lang.Float.toHexString());
//		tests.add(new gnu.testlet.java2.lang.Float.valueOf());
	}
	private void doEnum() {
		tests.add(new PR33183());
	}
	private void doDouble() {
		tests.add(new compare());
		tests.add(new gnu.testlet.java2.lang.Double.compareTo());
		tests.add(new DoubleSetterTest());
		tests.add(new DoubleTest());
		tests.add(new new_Double());
		tests.add(new parseDouble());
		tests.add(new toHexString());
//		tests.add(new valueOf());
	}
	private void doCloneable() {
		tests.add(new CloneableTest());
	}
	private void doClass() {
		tests.add(new ClassTest());
		tests.add(new init());
		tests.add(new newInstance());
//		tests.add(new reflect());
//		tests.add(new reflect2());
//		tests.add(new security());
//		tests.add(new serialization()); //no, it uses swing
		
	}
	public static void doCharacter(List<Testlet> tests2) {
		tests2.add(new Blocks());
		tests2.add(new Blocks15());
		tests2.add(new classify());
		tests2.add(new classify12());
		tests2.add(new consts());
		tests2.add(new digit());
		tests2.add(new equals_Character());
		tests2.add(new forDigit());
		tests2.add(new getNumericValue());
		tests2.add(new getType());
		tests2.add(new getType12());
		tests2.add(new hash());
		tests2.add(new to());
	}
	private void doByte() {
		tests.add(new ByteTest());
		tests.add(new new_Byte());
	}
	private void doBoolean() {
		tests.add(new BooleanTest());
		tests.add(new equals_Boolean());
		tests.add(new get());
		tests.add(new hashcode_Boolean());
		tests.add(new new_Boolean());
		tests.add(new value());
	}

}
