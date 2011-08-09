package org.sgx.j2s.mauve.report;

import gnu.testlet.Testlet;
import gnu.testlet.java2.util.AbstractCollection.AcuniaAbstractCollectionTest;
import gnu.testlet.java2.util.AbstractCollection.AcuniaAddCollectionTest;
import gnu.testlet.java2.util.AbstractCollection.ACtoString;
import gnu.testlet.java2.util.AbstractList.AcuniaAbstractListTest;
import gnu.testlet.java2.util.AbstractMap.AcuniaAbstractMapTest;
import gnu.testlet.java2.util.AbstractSet.AcuniaAbstractSetTest;
import gnu.testlet.java2.util.ArrayList.AcuniaArrayListTest;
import gnu.testlet.java2.util.ArrayList.serial;
import gnu.testlet.java2.util.ArrayList.subList;
import gnu.testlet.java2.util.Arrays.Equals;
import gnu.testlet.java2.util.Arrays.asList;
import gnu.testlet.java2.util.Arrays.binarySearch;
import gnu.testlet.java2.util.Arrays.fill;
import gnu.testlet.java2.util.Arrays.sort;
import gnu.testlet.java2.util.Collections.copy;
import gnu.testlet.java2.util.Collections.max;
import gnu.testlet.java2.util.Collections.min;
import gnu.testlet.java2.util.Collections.nCopies;
import gnu.testlet.java2.util.Collections.reverse;
import gnu.testlet.java2.util.Collections.reverseOrder;
import gnu.testlet.java2.util.Collections.rotate;
import gnu.testlet.java2.util.Collections.unmodifiableList;
import gnu.testlet.java2.util.Collections.unmodifiableMap;
import gnu.testlet.java2.util.HashMap.AcuniaHashMapTest;
import gnu.testlet.java2.util.Hashtable.AcuniaHashtableTest;
import gnu.testlet.java2.util.Hashtable.ContainsHash;
import gnu.testlet.java2.util.Hashtable.EnumerateAndModify;
import gnu.testlet.java2.util.Hashtable.HashContains;
import gnu.testlet.java2.util.Hashtable.NullValue;
import gnu.testlet.java2.util.Hashtable.basic;
import gnu.testlet.java2.util.Iterator.ConcurrentModification;
import gnu.testlet.java2.util.LinkedHashMap.LinkedHashMapTest;
import gnu.testlet.java2.util.LinkedHashMap.Regress;
import gnu.testlet.java2.util.LinkedList.AcuniaLinkedListTest;
import gnu.testlet.java2.util.LinkedList.SubListTest;
import gnu.testlet.java2.util.Properties.AcuniaPropertiesTest;
import gnu.testlet.java2.util.Properties.getProperty;
import gnu.testlet.java2.util.Properties.load;
import gnu.testlet.java2.util.ResourceBundle.getBundle;
import gnu.testlet.java2.util.TreeMap.serialization;
import gnu.testlet.java2.util.Vector.AcuniaVectorTest;
import gnu.testlet.java2.util.Vector.VectorSerialization;
import gnu.testlet.java2.util.Vector.copyInto;
import gnu.testlet.java2.util.Vector.removeAll;
import gnu.testlet.java2.util.Vector.retainAll;
import gnu.testlet.java2.util.prefs.PreferenceTest;
import gnu.testlet.java2.util.regex.CharacterClasses;
import gnu.testlet.java2.util.regex.PatternSplit;
import gnu.testlet.java2.util.regex.Matcher.Regions;
import gnu.testlet.java2.util.regex.Matcher.hitEnd;
import gnu.testlet.java2.util.regex.Pattern.UnicodeSimpleCategory;
import gnu.testlet.java2.util.regex.Pattern.matches;

import java.util.LinkedList;

public class JavaUtilTest {

	private LinkedList<Testlet> tests;

	public JavaUtilTest(LinkedList<Testlet> tests) {
		this.tests=tests;
		doAbstractCollectionAll();	
		doArrayList();
		doArrays();
////		doBitSet();//TODO
////		doCalendar();//TODO
		doCollections();
////		doCurrency();//TODO
////		doDate();//TODO
////		doEnumSet();//TODO
////		doGregorianCalendar();//TODO
		doHashTableAndMap();
		doIterator();
		doLinkedHashMap();
		doLinkedList();
		doPreferenceTest();
		doProperties();
		doRandom();
		doRegex();
		doResourceBundle();
////		doSimpleTimeZone();//TODO;
		doTreeSet();
		doVector();
	}


	private void doVector() {
		tests.add(new AcuniaVectorTest());
		tests.add(new copyInto());
		tests.add(new removeAll());
		tests.add(new retainAll());
		tests.add(new gnu.testlet.java2.util.Vector.subList());
//		tests.add(new VectorSerialization());//features not supported by j2s
	}


	private void doTreeSet() {
//		tests.add(new serialization());
		tests.add(new gnu.testlet.java2.util.TreeSet.basic());
	}


	private void doResourceBundle() {
		tests.add(new getBundle());
	}


	private void doRegex() {
		tests.add(new CharacterClasses());
//		tests.add(new PatternSplit());
		
		//pattern
		tests.add(new matches());
		tests.add(new UnicodeSimpleCategory());
		
		//matcher
//		tests.add(new hitEnd());
//		tests.add(new Regions());
		
	}


	private void doRandom() {
		tests.add(new gnu.testlet.java2.util.Random.basic());
	}


	private void doProperties() {
		tests.add(new AcuniaPropertiesTest());
		tests.add(new getProperty());
		tests.add(new load());
	}


	private void doPreferenceTest() {
		tests.add(new PreferenceTest());
	}


	private void doLinkedList() {
		tests.add(new AcuniaLinkedListTest());
		tests.add(new gnu.testlet.java2.util.LinkedList.subList());
		tests.add(new SubListTest());
	}


	private void doLinkedHashMap() {
		tests.add(new LinkedHashMapTest());
		tests.add(new Regress());
	}


	private void doIterator() {
		tests.add(new ConcurrentModification());
	}


	private void doHashTableAndMap() {
		tests.add(new AcuniaHashMapTest());
		tests.add(new AcuniaHashtableTest());
		tests.add(new basic());
		tests.add(new ContainsHash());
		tests.add(new EnumerateAndModify());
		tests.add(new HashContains());
		tests.add(new NullValue());
	}


	private void doCollections() {
		tests.add(new gnu.testlet.java2.util.Collections.binarySearch());
		tests.add(new copy());
		tests.add(new gnu.testlet.java2.util.Collections.fill());
		tests.add(new max());
		tests.add(new min());
		tests.add(new nCopies());
		tests.add(new reverse());
		tests.add(new reverseOrder());
		tests.add(new rotate());
		tests.add(new sort());
		tests.add(new unmodifiableList());
		tests.add(new unmodifiableMap());		
	}


	private void doArrays() {
		tests.add(new asList());
		tests.add(new binarySearch());
		tests.add(new Equals());
		tests.add(new fill());
		tests.add(new sort());
		
	}


	private void doArrayList() {
		tests.add(new AcuniaArrayListTest());
		tests.add(new serial());
		tests.add(new subList());
	}


	private void doAbstractCollectionAll() {
		tests.add(new AcuniaAddCollectionTest());
		tests.add(new AcuniaAbstractCollectionTest());
		tests.add(new gnu.testlet.java2.util.AbstractCollection.ACtoString());		
		tests.add(new AcuniaAbstractListTest());
		tests.add(new AcuniaAbstractMapTest());
		tests.add(new AcuniaAbstractSetTest());
	}

}
