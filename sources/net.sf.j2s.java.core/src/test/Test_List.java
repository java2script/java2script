package test;

import java.util.ImmutableCollections;

/**
 * A class with a main method entry point for ad hoc tests of JalviewJS
 * behaviour. The J2S transpiler should generate an html entry point for this
 * class, allowing comparison between Java and Javascript execution.
 */
public class Test_List extends Test_ {

	public static void main(String[] args) {
		
		java.util.List<Integer> li = of(1,2,3,4);
		System.out.println(li);
		
	}

    static <E> java.util.List<E> of(E e1, E e2, E e3, E e4) {
    	Object o = new Object[] {1,2,3};
        return new ImmutableCollections.ListN<>(e1, e2, e3, e4);
    }
//	
//    // Java 9 and 10 additions
//    
//    static <E> List<E> of() {
//        return ImmutableCollections.emptyList();
//    }
//
//    static <E> List<E> of(E e1, E e2) {
//        return new ImmutableCollections.List12<>(e1, e2);
//    }
//
//
//    static <E> List<E> of(E... elements) {
//        switch (elements.length) { // implicit null check of elements
//            case 0:
//                return ImmutableCollections.emptyList();
//            case 1:
//                return new ImmutableCollections.List12<>(elements[0]);
//            case 2:
//                return new ImmutableCollections.List12<>(elements[0], elements[1]);
//            default:
//                return new ImmutableCollections.ListN<>(elements);
//        }
//    }
//    
//    static <E> List<E> copyOf(Collection<? extends E> coll) {
//        return ImmutableCollections.listCopy(coll);
//    }
//
//
}
