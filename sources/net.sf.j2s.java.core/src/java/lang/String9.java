package java.lang;

public final class String9 {
	
    static final boolean COMPACT_STRINGS;

    static {
        COMPACT_STRINGS = true;
    }


    private final byte coder = 0;

    static final byte LATIN1 = 0;
    static final byte UTF16  = 1;

//    private boolean isLatin1() {
//        return COMPACT_STRINGS && coder == LATIN1;
//    }
//

    /*
     * StringIndexOutOfBoundsException  if {@code index} is
     * negative or greater than or equal to {@code length}.
     */
    static void checkIndex(int index, int length) {
        if (index < 0 || index >= length) {
            throw new StringIndexOutOfBoundsException("index " + index);
        }
    }

    /*
     * StringIndexOutOfBoundsException  if {@code offset}
     * is negative or greater than {@code length}.
     */
    static void checkOffset(int offset, int length) {
        if (offset < 0 || offset > length) {
            throw new StringIndexOutOfBoundsException("offset " + offset +
                                                      ",length " + length);
        }
    }

    static void checkBoundsOffCount(int offset, int count, int length) {
        if (offset < 0 || count < 0 || offset > length - count) {
            throw new StringIndexOutOfBoundsException(
                "offset " + offset + ", count " + count + ", length " + length);
        }
    }



}