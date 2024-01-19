/*
 * Copyright (c) 1997, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.util;

import java.io.IOException;
import java.io.Serializable;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * Hash table based implementation of the <tt>Map</tt> interface. This
 * implementation provides all of the optional map operations, and permits
 * <tt>null</tt> values and the <tt>null</tt> key. (The <tt>HashMap</tt> class
 * is roughly equivalent to <tt>Hashtable</tt>, except that it is unsynchronized
 * and permits nulls.) This class makes no guarantees as to the order of the
 * map; in particular, it does not guarantee that the order will remain constant
 * over time.
 *
 * <p>
 * This implementation provides constant-time performance for the basic
 * operations (<tt>get</tt> and <tt>put</tt>), assuming the hash function
 * disperses the elements properly among the buckets. Iteration over collection
 * views requires time proportional to the "capacity" of the <tt>HashMap</tt>
 * instance (the number of buckets) plus its size (the number of key-value
 * mappings). Thus, it's very important not to set the initial capacity too high
 * (or the load factor too low) if iteration performance is important.
 *
 * <p>
 * An instance of <tt>HashMap</tt> has two parameters that affect its
 * performance: <i>initial capacity</i> and <i>load factor</i>. The
 * <i>capacity</i> is the number of buckets in the hash table, and the initial
 * capacity is simply the capacity at the time the hash table is created. The
 * <i>load factor</i> is a measure of how full the hash table is allowed to get
 * before its capacity is automatically increased. When the number of entries in
 * the hash table exceeds the product of the load factor and the current
 * capacity, the hash table is <i>rehashed</i> (that is, internal data
 * structures are rebuilt) so that the hash table has approximately twice the
 * number of buckets.
 *
 * <p>
 * As a general rule, the default load factor (.75) offers a good tradeoff
 * between time and space costs. Higher values decrease the space overhead but
 * increase the lookup cost (reflected in most of the operations of the
 * <tt>HashMap</tt> class, including <tt>get</tt> and <tt>put</tt>). The
 * expected number of entries in the map and its load factor should be taken
 * into account when setting its initial capacity, so as to minimize the number
 * of rehash operations. If the initial capacity is greater than the maximum
 * number of entries divided by the load factor, no rehash operations will ever
 * occur.
 *
 * <p>
 * If many mappings are to be stored in a <tt>HashMap</tt> instance, creating it
 * with a sufficiently large capacity will allow the mappings to be stored more
 * efficiently than letting it perform automatic rehashing as needed to grow the
 * table. Note that using many keys with the same {@code hashCode()} is a sure
 * way to slow down performance of any hash table. To ameliorate impact, when
 * keys are {@link Comparable}, this class may use comparison order among keys
 * to help break ties.
 *
 * <p>
 * <strong>Note that this implementation is not synchronized.</strong> If
 * multiple threads access a hash map concurrently, and at least one of the
 * threads modifies the map structurally, it <i>must</i> be synchronized
 * externally. (A structural modification is any operation that adds or deletes
 * one or more mappings; merely changing the value associated with a key that an
 * instance already contains is not a structural modification.) This is
 * typically accomplished by synchronizing on some object that naturally
 * encapsulates the map.
 *
 * If no such object exists, the map should be "wrapped" using the
 * {@link Collections#synchronizedMap Collections.synchronizedMap} method. This
 * is best done at creation time, to prevent accidental unsynchronized access to
 * the map:
 * 
 * <pre>
 *   Map m = Collections.synchronizedMap(new HashMap(...));
 * </pre>
 *
 * <p>
 * The iterators returned by all of this class's "collection view methods" are
 * <i>fail-fast</i>: if the map is structurally modified at any time after the
 * iterator is created, in any way except through the iterator's own
 * <tt>remove</tt> method, the iterator will throw a
 * {@link ConcurrentModificationException}. Thus, in the face of concurrent
 * modification, the iterator fails quickly and cleanly, rather than risking
 * arbitrary, non-deterministic behavior at an undetermined time in the future.
 *
 * <p>
 * Note that the fail-fast behavior of an iterator cannot be guaranteed as it
 * is, generally speaking, impossible to make any hard guarantees in the
 * presence of unsynchronized concurrent modification. Fail-fast iterators throw
 * <tt>ConcurrentModificationException</tt> on a best-effort basis. Therefore,
 * it would be wrong to write a program that depended on this exception for its
 * correctness: <i>the fail-fast behavior of iterators should be used only to
 * detect bugs.</i>
 *
 * <p>
 * This class is a member of the
 * <a href="{@docRoot}/../technotes/guides/collections/index.html"> Java
 * Collections Framework</a>.
 *
 * @param <K> the type of keys maintained by this map
 * @param <V> the type of mapped values
 *
 * @author Doug Lea
 * @author Josh Bloch
 * @author Arthur van Hoff
 * @author Neal Gafter
 * @see Object#hashCode()
 * @see Collection
 * @see Map
 * @see TreeMap
 * @see Hashtable
 * @since 1.2
 */
public class HashMap<K, V> extends AbstractMap<K, V> implements Map<K, V>, Cloneable, Serializable {

	private static final long serialVersionUID = 362498820763181265L;

	/*
	 * Implementation notes.
	 *
	 * This map usually acts as a binned (bucketed) hash table, but when bins get
	 * too large, they are transformed into bins of TreeNodes, each structured
	 * similarly to those in java.util.TreeMap. Most methods try to use normal bins,
	 * but relay to TreeNode methods when applicable (simply by checking instanceof
	 * a node). Bins of TreeNodes may be traversed and used like any others, but
	 * additionally support faster lookup when overpopulated. However, since the
	 * vast majority of bins in normal use are not overpopulated, checking for
	 * existence of tree bins may be delayed in the course of table methods.
	 *
	 * Tree bins (i.e., bins whose elements are all TreeNodes) are ordered primarily
	 * by hashCode, but in the case of ties, if two elements are of the same
	 * "class C implements Comparable<C>", type then their compareTo method is used
	 * for ordering. (We conservatively check generic types via reflection to
	 * validate this -- see method comparableClassFor). The added complexity of tree
	 * bins is worthwhile in providing worst-case O(log n) operations when keys
	 * either have distinct hashes or are orderable, Thus, performance degrades
	 * gracefully under accidental or malicious usages in which hashCode() methods
	 * return values that are poorly distributed, as well as those in which many
	 * keys share a hashCode, so long as they are also Comparable. (If neither of
	 * these apply, we may waste about a factor of two in time and space compared to
	 * taking no precautions. But the only known cases stem from poor user
	 * programming practices that are already so slow that this makes little
	 * difference.)
	 *
	 * Because TreeNodes are about twice the size of regular nodes, we use them only
	 * when bins contain enough nodes to warrant use (see TREEIFY_THRESHOLD). And
	 * when they become too small (due to removal or resizing) they are converted
	 * back to plain bins. In usages with well-distributed user hashCodes, tree bins
	 * are rarely used. Ideally, under random hashCodes, the frequency of nodes in
	 * bins follows a Poisson distribution
	 * (http://en.wikipedia.org/wiki/Poisson_distribution) with a parameter of about
	 * 0.5 on average for the default resizing threshold of 0.75, although with a
	 * large variance because of resizing granularity. Ignoring variance, the
	 * expected occurrences of list size k are (exp(-0.5) * pow(0.5, k) /
	 * factorial(k)). The first values are:
	 *
	 * 0: 0.60653066 1: 0.30326533 2: 0.07581633 3: 0.01263606 4: 0.00157952 5:
	 * 0.00015795 6: 0.00001316 7: 0.00000094 8: 0.00000006 more: less than 1 in ten
	 * million
	 *
	 * The root of a tree bin is normally its first node. However, sometimes
	 * (currently only upon Iterator.remove), the root might be elsewhere, but can
	 * be recovered following parent links (method TreeNode.root()).
	 *
	 * All applicable internal methods accept a hash code as an argument (as
	 * normally supplied from a public method), allowing them to call each other
	 * without recomputing user hashCodes. Most internal methods also accept a "tab"
	 * argument, that is normally the current table, but may be a new or old one
	 * when resizing or converting.
	 *
	 * When bin lists are treeified, split, or untreeified, we keep them in the same
	 * relative access/traversal order (i.e., field Node.next) to better preserve
	 * locality, and to slightly simplify handling of splits and traversals that
	 * invoke iterator.remove. When using comparators on insertion, to keep a total
	 * ordering (or as close as is required here) across rebalancings, we compare
	 * classes and identityHashCodes as tie-breakers.
	 *
	 * The use and transitions among plain vs tree modes is complicated by the
	 * existence of subclass LinkedHashMap. See below for hook methods defined to be
	 * invoked upon insertion, removal and access that allow LinkedHashMap internals
	 * to otherwise remain independent of these mechanics. (This also requires that
	 * a map instance be passed to some utility methods that may create new nodes.)
	 *
	 * The concurrent-programming-like SSA-based coding style helps avoid aliasing
	 * errors amid all of the twisty pointer operations.
	 */

	/**
	 * The default initial capacity - MUST be a power of two.
	 */
	static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16

	/**
	 * The maximum capacity, used if a higher value is implicitly specified by
	 * either of the constructors with arguments. MUST be a power of two <= 1<<30.
	 */
	static final int MAXIMUM_CAPACITY = 1 << 30;

	/**
	 * The load factor used when none specified in constructor.
	 */
	static final float DEFAULT_LOAD_FACTOR = 0.75f;

	/**
	 * The bin count threshold for using a tree rather than list for a bin. Bins are
	 * converted to trees when adding an element to a bin with at least this many
	 * nodes. The value must be greater than 2 and should be at least 8 to mesh with
	 * assumptions in tree removal about conversion back to plain bins upon
	 * shrinkage.
	 */
	static final int TREEIFY_THRESHOLD = 8;

	/**
	 * The bin count threshold for untreeifying a (split) bin during a resize
	 * operation. Should be less than TREEIFY_THRESHOLD, and at most 6 to mesh with
	 * shrinkage detection under removal.
	 */
	static final int UNTREEIFY_THRESHOLD = 6;

	/**
	 * The smallest table capacity for which bins may be treeified. (Otherwise the
	 * table is resized if too many nodes in a bin.) Should be at least 4 *
	 * TREEIFY_THRESHOLD to avoid conflicts between resizing and treeification
	 * thresholds.
	 */
	static final int MIN_TREEIFY_CAPACITY = 64;

	Map<String, Object> 秘m;
	boolean 秘allowJS = false;

	/**
	 * Basic hash bin node, used for most entries. (See below for TreeNode subclass,
	 * and in LinkedHashMap for its Entry subclass.)
	 */
	static class Node<K, V> implements Map.Entry<K, V> {
		final int hash;
		final K key;
		V value;
		Node<K, V> next_;

		Node(int hash, K key, V value, Node<K, V> next) {
			this.hash = hash;
			this.key = key;
			this.value = value;
			this.next_ = next;
		}

		@Override
		public final K getKey() {
			return key;
		}

		@Override
		public final V getValue() {
			return value;
		}

		@Override
		public final String toString() {
			return key + "=" + value;
		}

		@Override
		public final int hashCode() {
			return Objects.hashCode(key) ^ Objects.hashCode(value);
		}

		@Override
		public final V setValue(V newValue) {
			V oldValue = value;
			value = newValue;
			return oldValue;
		}

		@Override
		public final boolean equals(Object o) {
			return (o != null && (o == this || o instanceof Map.Entry
					&& Objects.equals(key, ((Map.Entry<?, ?>) o).getKey()) 
					&& Objects.equals(value, ((Map.Entry<?, ?>) o).getValue())));
		}
	}

	/* ---------------- Static utilities -------------- */

	/**
	 * Computes key.hashCode() and spreads (XORs) higher bits of hash to lower.
	 * Because the table uses power-of-two masking, sets of hashes that vary only in
	 * bits above the current mask will always collide. (Among known examples are
	 * sets of Float keys holding consecutive whole numbers in small tables.) So we
	 * apply a transform that spreads the impact of higher bits downward. There is a
	 * tradeoff between speed, utility, and quality of bit-spreading. Because many
	 * common sets of hashes are already reasonably distributed (so don't benefit
	 * from spreading), and because we use trees to handle large sets of collisions
	 * in bins, we just XOR some shifted bits in the cheapest possible way to reduce
	 * systematic lossage, as well as to incorporate impact of the highest bits that
	 * would otherwise never be used in index calculations because of table bounds.
	 */
	static final int hash(Object key) {
		int h;
		return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
	}

	/**
	 * Returns x's Class if it is of the form "class C implements Comparable<C>",
	 * else null.
	 */
	static Class<?> comparableClassFor(Object x) {
		if (x instanceof Comparable) {
//			Class<?> c;
//			Type[] ts, as;
//			Type t;
//			ParameterizedType p;
//			if ((c = x.getClass()) == String.class) // bypass checks
			return x.getClass();
//			if ((ts = c.getGenericInterfaces()) != null) {
//				for (int i = 0; i < ts.length; ++i) {
//					if (((t = ts[i]) instanceof ParameterizedType)
//							&& ((p = (ParameterizedType) t).getRawType() == Comparable.class)
//							&& (as = p.getActualTypeArguments()) != null && as.length == 1 && as[0] == c) // type arg is
//																											// c
//						return c;
//				}
//			}
		}
		return null;
	}

	/**
	 * Returns k.compareTo(x) if x matches kc (k's screened comparable class), else
	 * 0.
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" }) // for cast to Comparable
	static int compareComparables(Class<?> kc, Object k, Object x) {
		return (x == null || x.getClass() != kc ? 0 : ((Comparable) k).compareTo(x));
	}

	/**
	 * Returns a power of two size for the given target capacity.
	 */
	static final int tableSizeFor(int cap) {
		int n = cap - 1;
		n |= n >>> 1;
		n |= n >>> 2;
		n |= n >>> 4;
		n |= n >>> 8;
		n |= n >>> 16;
		return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
	}

	/* ---------------- Fields -------------- */

	/**
	 * The table, initialized on first use, and resized as necessary. When
	 * allocated, length is always a power of two. (We also tolerate length zero in
	 * some operations to allow bootstrapping mechanics that are currently not
	 * needed.)
	 */
	transient Node<K, V>[] table;

	/**
	 * Holds cached entrySet(). Note that AbstractMap fields are used for keySet()
	 * and values().
	 */
	transient Set<Map.Entry<K, V>> entrySet;

	/**
	 * The number of key-value mappings contained in this map.
	 */
	transient int size;

	/**
	 * The number of times this HashMap has been structurally modified Structural
	 * modifications are those that change the number of mappings in the HashMap or
	 * otherwise modify its internal structure (e.g., rehash). This field is used to
	 * make iterators on Collection-views of the HashMap fail-fast. (See
	 * ConcurrentModificationException).
	 */
	transient int modCount;

	/**
	 * The next size value at which to resize (capacity * load factor).
	 *
	 * @serial
	 */
	// (The javadoc description is true upon serialization.
	// Additionally, if the table array has not been allocated, this
	// field holds the initial array capacity, or zero signifying
	// DEFAULT_INITIAL_CAPACITY.)
	int threshold;

	/**
	 * The load factor for the hash table.
	 *
	 * @serial
	 */
	final float loadFactor;

	/**
	 * flag developers can use to switch off all use of simple JavaScript Map objects
	 * 
	 * not final, so that it can be managed on the fly in SwingJS
	 */
	public static boolean USE_SIMPLE = true;

	/* ---------------- Public operations -------------- */

	/**
     * SwingJS note: This constructor DOES NOT allow JavaScript Map object for HashMap<String,?>.
     * 
	 * Constructs an empty <tt>HashMap</tt> with the specified initial capacity and
	 * load factor.
	 *
	 * @param initialCapacity the initial capacity
	 * @param loadFactor      the load factor
	 * @throws IllegalArgumentException if the initial capacity is negative or the
	 *                                  load factor is nonpositive
	 */
	public HashMap(int initialCapacity, float loadFactor) {
		if (initialCapacity < 0)
			throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
		if (initialCapacity > MAXIMUM_CAPACITY)
			initialCapacity = MAXIMUM_CAPACITY;
		if (loadFactor <= 0 || Float.isNaN(loadFactor))
			throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
		this.loadFactor = loadFactor;
		this.threshold = tableSizeFor(initialCapacity);
	}

	/**
     * SwingJS note: This constructor allows JavaScript Map object for HashMap<String,?>.
     * 
	 * Constructs an empty <tt>HashMap</tt> with the specified initial capacity and
	 * the default load factor (0.75).
	 *
	 * @param initialCapacity the initial capacity.
	 * @throws IllegalArgumentException if the initial capacity is negative.
	 */
	public HashMap(int initialCapacity) {
		this(initialCapacity, DEFAULT_LOAD_FACTOR);
		秘allowJS = true;
		秘setJS();
	}

	/**
     * SwingJS note: This constructor allows JavaScript Map object for HashMap<String,?>.
     * 
	 * Constructs an empty <tt>HashMap</tt> with the default initial capacity (16)
	 * and the default load factor (0.75).
	 */
	public HashMap() {
		秘allowJS = true;
		秘setJS();
		this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
	}

	/**
	 * Constructs a new <tt>HashMap</tt> with the same mappings as the specified
	 * <tt>Map</tt>. The <tt>HashMap</tt> is created with default load factor (0.75)
	 * and an initial capacity sufficient to hold the mappings in the specified
	 * <tt>Map</tt>.
	 *
	 * @param m the map whose mappings are to be placed in this map
	 * @throws NullPointerException if the specified map is null
	 */
	public HashMap(Map<? extends K, ? extends V> m) {
        秘allowJS = (/** @j2sNative m.allowJS ||*/false);
		秘setJS();
		this.loadFactor = DEFAULT_LOAD_FACTOR;
		putMapEntries(m, false);
	}

	/**
	 * Implements clone, Map.putAll and Map constructor
	 *
	 * @param mOriginal     the map
	 * @param evict false when initially constructing this map, else true (relayed
	 *              to method afterNodeInsertion).
	 */
	void putMapEntries(Map<? extends K, ? extends V> mOriginal, boolean evict) {
		int n = mOriginal.size();
		if (n == 0)
			return;
		K key = null;
		V value = null;
		if (Map.秘isSimple(this) && Map.秘isSimple(mOriginal)) {
			HashMap me = this;
			/**
			 * @j2sNative mOriginal.秘m.forEach(function(value, key) {
			 * 
			 */
			me.putVal(NO_RETURN, key, value, false, evict, Map.秘hasKey(me, key));
			/**
			 * @j2sNative });
			 */
			return;
		}
		if (table == null) { // pre-size
			float ft = ((float) n / loadFactor) + 1.0F;
			int t = ((ft < (float) MAXIMUM_CAPACITY) ? (int) ft : MAXIMUM_CAPACITY);
			if (t > threshold)
				threshold = tableSizeFor(t);
		} else if (n > threshold)
			resize();
		if (Map.秘isSimple(mOriginal)) {
			HashMap me = this;
			/**
			 * @j2sNative mOriginal.秘m.forEach(function(value, key) {
			 * 
			 */
			me.putVal(hash(key), key, value, false, evict, NOT_SIMPLE);
			/**
			 * @j2sNative });
			 */
			return;
		} 
		秘m = null;
		
		for (Map.Entry<? extends K, ? extends V> e : mOriginal.entrySet()) {
	        key = e.getKey();
	        value = e.getValue();
			putVal(hash(key), key, value, false, evict, NOT_SIMPLE);
		}
	
	}

	/**
	 * Returns the number of key-value mappings in this map.
	 *
	 * @return the number of key-value mappings in this map
	 */
	@Override
	public int size() {
		return (/** @j2sNative this.秘m && this.秘m.size || */
		size);
	}

	/**
	 * Returns <tt>true</tt> if this map contains no key-value mappings.
	 *
	 * @return <tt>true</tt> if this map contains no key-value mappings
	 */
	@Override
	public boolean isEmpty() {
		return size() == 0;
	}

	/**
	 * Returns the value to which the specified key is mapped, or {@code null} if
	 * this map contains no mapping for the key.
	 *
	 * <p>
	 * More formally, if this map contains a mapping from a key {@code k} to a value
	 * {@code v} such that {@code (key==null ? k==null :
	 * key.equals(k))}, then this method returns {@code v}; otherwise it returns
	 * {@code null}. (There can be at most one such mapping.)
	 *
	 * <p>
	 * A return value of {@code null} does not <i>necessarily</i> indicate that the
	 * map contains no mapping for the key; it's also possible that the map
	 * explicitly maps the key to {@code null}. The {@link #containsKey containsKey}
	 * operation may be used to distinguish these two cases.
	 *
	 * @see #put(Object, Object)
	 */
	@Override
	public V get(Object key) {

		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return null;
		case HAS_KEY:
			V v = null;
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			return v;
		}

		Node<K, V> e;
		return (e = getNode(hash(key), key)) == null ? null : e.value;
	}

	/**
	 * Implements Map.get and related methods
	 *
	 * @param hash hash for key
	 * @param key  the key
	 * @return the node, or null if none
	 */
	final Node<K, V> getNode(int hash, Object key) {
		Node<K, V>[] tab;
		Node<K, V> first, e;
		int n;
		K k;
		if ((tab = table) != null && (n = tab.length) > 0 && (first = tab[(n - 1) & hash]) != null) {
			if (first.hash == hash && // always check first node
					((k = first.key) == key || (key != null && key.equals(k))))
				return first;
			if ((e = first.next_) != null) {
				if (first instanceof TreeNode)
					return ((TreeNode<K, V>) first).getTreeNode(hash, key);
				do {
					if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
						return e;
				} while ((e = e.next_) != null);
			}
		}
		return null;
	}

	/**
	 * Returns <tt>true</tt> if this map contains a mapping for the specified key.
	 *
	 * @param key The key whose presence in this map is to be tested
	 * @return <tt>true</tt> if this map contains a mapping for the specified key.
	 */
	@Override
	public boolean containsKey(Object key) {
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return false;
		case HAS_KEY:
			return true;
		}
		return getNode(hash(key), key) != null;
	}

	/**
	 * Associates the specified value with the specified key in this map. If the map
	 * previously contained a mapping for the key, the old value is replaced.
	 *
	 * @param key   key with which the specified value is to be associated
	 * @param value value to be associated with the specified key
	 * @return the previous value associated with <tt>key</tt>, or <tt>null</tt> if
	 *         there was no mapping for <tt>key</tt>. (A <tt>null</tt> return can
	 *         also indicate that the map previously associated <tt>null</tt> with
	 *         <tt>key</tt>.)
	 */
	@Override
	public V put(K key, V value) {
		int type = Map.秘hasKey(this, key);
		switch (type) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
		case HAS_KEY:
			return putVal(RET_VALUE, key, value, false, true, type);
		}
		return putVal(hash(key), key, value, false, true, NOT_SIMPLE);
	}

	/**
	 * Implements Map.put and related methods
	 *
	 * @param hash         hash for key
	 * @param key          the key
	 * @param value        the value to put
	 * @param onlyIfAbsent if true, don't change existing value
	 * @param evict        if false, the table is in creation mode.
	 * @param mode         NOT_SIMPLE || NO_SUCH_KEY || HAS_KEY
	 * @return previous value, or null if none
	 */
	V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict, int mode) {

		switch (mode) {
		case NO_SUCH_KEY:
			/**
			 * @j2sNative
			 * 
			 * 			this.秘m.set(key, value);
			 */
			++modCount;
			// afterNodeInsertion(evict);
			return null;
		case HAS_KEY:
			V v0 = (hash == NO_RETURN ? null : /** @j2sNative this.秘m.get(key) || */ null);
			if (!onlyIfAbsent || v0 == null) {
				/**
				 * @j2sNative
				 * 
				 * 			this.秘m.set(key, value);
				 */
				// afterNodeAccess(entry);
			}
			return v0;
		case NOT_SIMPLE:
			break;
		}
		Node<K, V>[] tab;
		Node<K, V> p;
		int n, i;
		if ((tab = table) == null || (n = tab.length) == 0)
			n = (tab = resize()).length;
		if ((p = tab[i = (n - 1) & hash]) == null)
			tab[i] = newNode(hash, key, value, null);
		else {
			Node<K, V> e;
			K k;
			if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
				e = p;
			else if (p instanceof TreeNode)
				e = ((TreeNode<K, V>) p).putTreeVal(this, tab, hash, key, value);
			else {
				for (int binCount = 0;; ++binCount) {
					if ((e = p.next_) == null) {
						p.next_ = newNode(hash, key, value, null);
						if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
							treeifyBin(tab, hash);
						break;
					}
					if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
						break;
					p = e;
				}
			}
			if (e != null) { // existing mapping for key
				V oldValue = e.value;
				if (!onlyIfAbsent || oldValue == null)
					e.value = value;
				afterNodeAccess(e);
				return oldValue;
			}
		}
		++modCount;
		if (++size > threshold)
			resize();
		afterNodeInsertion(evict);
		return null;
	}

	/**
	 * Initializes or doubles table size. If null, allocates in accord with initial
	 * capacity target held in field threshold. Otherwise, because we are using
	 * power-of-two expansion, the elements from each bin must either stay at same
	 * index, or move with a power of two offset in the new table.
	 *
	 * @return the table
	 */
	final Node<K, V>[] resize() {
		Node<K, V>[] oldTab = table;
		int oldCap = (oldTab == null) ? 0 : oldTab.length;
		int oldThr = threshold;
		int newCap, newThr = 0;
		if (oldCap > 0) {
			if (oldCap >= MAXIMUM_CAPACITY) {
				threshold = Integer.MAX_VALUE;
				return oldTab;
			} else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && oldCap >= DEFAULT_INITIAL_CAPACITY)
				newThr = oldThr << 1; // double threshold
		} else if (oldThr > 0) // initial capacity was placed in threshold
			newCap = oldThr;
		else { // zero initial threshold signifies using defaults
			newCap = DEFAULT_INITIAL_CAPACITY;
			newThr = (int) (DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
		}
		if (newThr == 0) {
			float ft = (float) newCap * loadFactor;
			newThr = (newCap < MAXIMUM_CAPACITY && ft < (float) MAXIMUM_CAPACITY ? (int) ft : Integer.MAX_VALUE);
		}
		threshold = newThr;
		@SuppressWarnings({ "rawtypes", "unchecked" })
		Node<K, V>[] newTab = (Node<K, V>[]) new Node[newCap];
		table = newTab;
		if (oldTab != null) {
			for (int j = 0; j < oldCap; ++j) {
				Node<K, V> e;
				if ((e = oldTab[j]) != null) {
					oldTab[j] = null;
					if (e.next_ == null)
						newTab[e.hash & (newCap - 1)] = e;
					else if (e instanceof TreeNode)
						((TreeNode<K, V>) e).split(this, newTab, j, oldCap);
					else { // preserve order
						Node<K, V> loHead = null, loTail = null;
						Node<K, V> hiHead = null, hiTail = null;
						Node<K, V> next;
						do {
							next = e.next_;
							if ((e.hash & oldCap) == 0) {
								if (loTail == null)
									loHead = e;
								else
									loTail.next_ = e;
								loTail = e;
							} else {
								if (hiTail == null)
									hiHead = e;
								else
									hiTail.next_ = e;
								hiTail = e;
							}
						} while ((e = next) != null);
						if (loTail != null) {
							loTail.next_ = null;
							newTab[j] = loHead;
						}
						if (hiTail != null) {
							hiTail.next_ = null;
							newTab[j + oldCap] = hiHead;
						}
					}
				}
			}
		}
		return newTab;
	}

	/**
	 * Replaces all linked nodes in bin at index for given hash unless table is too
	 * small, in which case resizes instead.
	 */
	final void treeifyBin(Node<K, V>[] tab, int hash) {
		int n, index;
		Node<K, V> e;
		if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
			resize();
		else if ((e = tab[index = (n - 1) & hash]) != null) {
			TreeNode<K, V> hd = null, tl = null;
			do {
				TreeNode<K, V> p = replacementTreeNode(e, null);
				if (tl == null)
					hd = p;
				else {
					p.prev = tl;
					tl.next_ = p;
				}
				tl = p;
			} while ((e = e.next_) != null);
			if ((tab[index] = hd) != null)
				hd.treeify(tab);
		}
	}

	/**
	 * Copies all of the mappings from the specified map to this map. These mappings
	 * will replace any mappings that this map had for any of the keys currently in
	 * the specified map.
	 *
	 * @param m mappings to be stored in this map
	 * @throws NullPointerException if the specified map is null
	 */
	@Override
	public void putAll(Map<? extends K, ? extends V> m) {
		putMapEntries(m, true);
	}

	/**
	 * Removes the mapping for the specified key from this map if present.
	 *
	 * @param key key whose mapping is to be removed from the map
	 * @return the previous value associated with <tt>key</tt>, or <tt>null</tt> if
	 *         there was no mapping for <tt>key</tt>. (A <tt>null</tt> return can
	 *         also indicate that the map previously associated <tt>null</tt> with
	 *         <tt>key</tt>.)
	 */
	@Override
	public V remove(Object key) {

		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return null;
		case HAS_KEY:
			return (V) removeNode(RET_VALUE, key, null, false, true, HAS_KEY);
		}
		Node<K, V> e;
		return (e = (Node<K, V>) removeNode(hash(key), key, null, false, true, NOT_SIMPLE)) == null ? null : e.value;
	}

	/**
	 * Implements Map.remove and related methods
	 *
	 * @param hash       hash for key
	 * @param key        the key
	 * @param value      the value to match if matchValue, else ignored
	 * @param matchValue if true only remove if value is equal
	 * @param movable    if false do not move other nodes while removing
	 * @param mode HAS_KEY or NOT_SIMPLE
	 * @return the node, or null if none SwingJS: returns the old value or null if needed, otherwise "true" or null
	 */
	final Object removeNode(int hash, Object key, Object value, boolean matchValue, boolean movable, int mode) {

		V v;
		if (mode == HAS_KEY) {
			v = (hash == RET_VALUE || matchValue ? /** @j2sNative this.秘m.get(key) ||*/ null : null);
			if (!matchValue || v == value || (value != null && value.equals(v))) {
				/**
				 * @j2sNative
				 * 
				 * this.秘m["delete"](key);
				 */
				++modCount;				
				//afterNodeRemoval(node);
				switch (hash) {
				case RET_VALUE:
					return v;
				case HAS_KEY:
					return "true";
				}
			}		
			return null;
		}
		Node<K, V>[] tab;
		Node<K, V> p;
		int n, index;
		if ((tab = table) != null && (n = tab.length) > 0 && (p = tab[index = (n - 1) & hash]) != null) {
			Node<K, V> node = null, e;
			K k;
			if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
				node = p;
			else if ((e = p.next_) != null) {
				if (p instanceof TreeNode)
					node = ((TreeNode<K, V>) p).getTreeNode(hash, key);
				else {
					do {
						if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
							node = e;
							break;
						}
						p = e;
					} while ((e = e.next_) != null);
				}
			}
			if (node != null && (!matchValue || (v = node.value) == value || (value != null && value.equals(v)))) {
				if (node instanceof TreeNode)
					((TreeNode<K, V>) node).removeTreeNode(this, tab, movable);
				else if (node == p)
					tab[index] = node.next_;
				else
					p.next_ = node.next_;
				++modCount;
				--size;
				afterNodeRemoval(node);
				return node;
			}
		}
		return null;
	}

	/**
	 * Removes all of the mappings from this map. The map will be empty after this
	 * call returns.
	 */
	@Override
	public void clear() {
		Node<K, V>[] tab;
		modCount++;
		if (Map.秘isSimple(this)) {
			/**
			 * @j2sNative
			 * 
			 * this.秘m.clear();
			 * 
			 */		

		}
		秘setJS();
		if ((tab = table) != null && size > 0) {
			size = 0;
			for (int i = 0; i < tab.length; ++i)
				tab[i] = null;
		}
	}

	/**
	 * Returns <tt>true</tt> if this map maps one or more keys to the specified
	 * value.
	 *
	 * @param value value whose presence in this map is to be tested
	 * @return <tt>true</tt> if this map maps one or more keys to the specified
	 *         value
	 */
	@Override
	public boolean containsValue(Object value) {

		if (size() == 0)
			return false;
		
		if (Map.秘isSimple(this)) {
			@SuppressWarnings("unused") Map m = this.秘m;
			/**
			 * @j2sNative
			 * 
			 * var iter = m.values();
			 * for (var n = iter.next(); !n.done; n = iter.next()) {
			 *   if (n.value == value || n.value.equals$O(value)) {
			 *     return true;
			 *   }
			 * }
			 * 
			 */
		} else {
			Node<K, V>[] tab;
			V v;
			if ((tab = table) != null) {
				for (int i = 0; i < tab.length; ++i) {
					for (Node<K, V> e = tab[i]; e != null; e = e.next_) {
						if ((v = e.value) == value || (value != null && value.equals(v)))
							return true;
					}
				}
			}
		}
		return false;

	}

	/**
	 * Returns a {@link Set} view of the keys contained in this map. The set is
	 * backed by the map, so changes to the map are reflected in the set, and
	 * vice-versa. If the map is modified while an iteration over the set is in
	 * progress (except through the iterator's own <tt>remove</tt> operation), the
	 * results of the iteration are undefined. The set supports element removal,
	 * which removes the corresponding mapping from the map, via the
	 * <tt>Iterator.remove</tt>, <tt>Set.remove</tt>, <tt>removeAll</tt>,
	 * <tt>retainAll</tt>, and <tt>clear</tt> operations. It does not support the
	 * <tt>add</tt> or <tt>addAll</tt> operations.
	 *
	 * @return a set view of the keys contained in this map
	 */
	@Override
	public Set<K> keySet() {
		Set<K> ks;
		return (ks = keySet) == null ? (keySet = new KeySet()) : ks;
	}

	final class KeySet extends AbstractSet<K> {
		@Override
		public final int size() {
			return size;
		}

		@Override
		public final void clear() {
			HashMap.this.clear();
		}

		@Override
		public final Iterator<K> iterator() {
			return new KeyIterator();
		}

		@Override
		public final boolean contains(Object o) {
			return containsKey(o);
		}

		@Override
		public final boolean remove(Object key) {
			/*
			 * Removes the specified element from this set if it is present(optional
			 * operation). More formally, removes an element e such that (o==null ? e==null
			 * : o.equals(e)), if this set contains such an element. Returns true if this
			 * set contained the element
			 */
			switch (Map.秘hasKey(HashMap.this, key)) {
			case NOT_SIMPLE:
				break;
			case INVALID_KEY:
				Map.秘ensureJavaMap(HashMap.this);
				break;
			case NO_SUCH_KEY:
				return false;
			case HAS_KEY:
				return removeNode(HAS_KEY, key, null, false, true, HAS_KEY) != null;
			}
			return removeNode(hash(key), key, null, false, true, NOT_SIMPLE) != null;
		}

		@Override
		public final Spliterator<K> spliterator() {
			return new KeySpliterator<>(HashMap.this, 0, -1, 0, 0);
		}

		@Override
		public final void forEach(Consumer<? super K> action) {
			if (action == null)
				throw new NullPointerException();
			if (size() == 0)
				return;
			int mc = modCount;
			if(Map.秘isSimple(HashMap.this)) {
				@SuppressWarnings("unused") Map m = 秘m;
				/**
				 * @j2sNative
				 * 
				 * 			m.forEach(function(value, key){ action.accept$O(key); });
				 * 
				 */
			} else {
				Node<K, V>[] tab;
				if ((tab = table) != null) {
					for (int i = 0; i < tab.length; ++i) {
						for (Node<K, V> e = tab[i]; e != null; e = e.next_)
							action.accept(e.key);
					}
				}
			}
			
			if (modCount != mc)
				throw new ConcurrentModificationException();
		}
	}

	/**
	 * Returns a {@link Collection} view of the values contained in this map. The
	 * collection is backed by the map, so changes to the map are reflected in the
	 * collection, and vice-versa. If the map is modified while an iteration over
	 * the collection is in progress (except through the iterator's own
	 * <tt>remove</tt> operation), the results of the iteration are undefined. The
	 * collection supports element removal, which removes the corresponding mapping
	 * from the map, via the <tt>Iterator.remove</tt>, <tt>Collection.remove</tt>,
	 * <tt>removeAll</tt>, <tt>retainAll</tt> and <tt>clear</tt> operations. It does
	 * not support the <tt>add</tt> or <tt>addAll</tt> operations.
	 *
	 * @return a view of the values contained in this map
	 */
	@Override
	public Collection<V> values() {

		Collection<V> vs;
		return (vs = values) == null ? (values = new Values()) : vs;
	}

	final class Values extends AbstractCollection<V> {
		@Override
		public final int size() {
			return HashMap.this.size();
		}

		@Override
		public final void clear() {
			HashMap.this.clear();
		}

		@Override
		public final Iterator<V> iterator() {
			return new ValueIterator();
		}

		@Override
		public final boolean contains(Object o) {
			return containsValue(o);
		}

		@Override
		public final Spliterator<V> spliterator() {
			return new ValueSpliterator<>(HashMap.this, 0, -1, 0, 0);
		}

		@Override
		public final void forEach(Consumer<? super V> action) {
			if (action == null)
				throw new NullPointerException();
			if (size() == 0)
				return;
			int mc = modCount;
			if(Map.秘isSimple(HashMap.this)) {
				@SuppressWarnings("unused") Map m = 秘m;
				/**
				 * @j2sNative
				 * 
				 * 			m.forEach(function(value){ action.accept$O(value); });
				 * 
				 */
			} else {
				Node<K, V>[] tab;
				if ((tab = table) != null) {
					for (int i = 0; i < tab.length; ++i) {
						for (Node<K, V> e = tab[i]; e != null; e = e.next_)
							action.accept(e.value);
					}
				}
			}
			if (modCount != mc)
				throw new ConcurrentModificationException();
		}
	}

	/**
	 * Returns a {@link Set} view of the mappings contained in this map. The set is
	 * backed by the map, so changes to the map are reflected in the set, and
	 * vice-versa. If the map is modified while an iteration over the set is in
	 * progress (except through the iterator's own <tt>remove</tt> operation, or
	 * through the <tt>setValue</tt> operation on a map entry returned by the
	 * iterator) the results of the iteration are undefined. The set supports
	 * element removal, which removes the corresponding mapping from the map, via
	 * the <tt>Iterator.remove</tt>, <tt>Set.remove</tt>, <tt>removeAll</tt>,
	 * <tt>retainAll</tt> and <tt>clear</tt> operations. It does not support the
	 * <tt>add</tt> or <tt>addAll</tt> operations.
	 *
	 * @return a set view of the mappings contained in this map
	 */
	@Override
	public Set<Map.Entry<K, V>> entrySet() {
		Set<Map.Entry<K, V>> es;
		return (es = entrySet) == null ? (entrySet = new EntrySet()) : es;
	}

	final class EntrySet extends AbstractSet<Map.Entry<K, V>> {
		@Override
		public final int size() {
			return HashMap.this.size();
		}

		@Override
		public final void clear() {
			HashMap.this.clear();
		}

		@Override
		public final Iterator<Map.Entry<K, V>> iterator() {
			return new EntryIterator();
		}

		@Override
		public final boolean contains(Object o) {
			if (!(o instanceof Map.Entry))
				return false;
			Map.Entry<?, ?> e = (Map.Entry<?, ?>) o;
			Object key = e.getKey();
			if (!HashMap.this.containsKey(key))
				return false;

			if (Map.秘isSimple(HashMap.this)) {
				Object value = e.getValue();
				Object v = HashMap.this.get(key);
				return (value == v || value != null && value.equals(v));
			}
			Node<K, V> candidate = getNode(hash(key), key);
			return candidate != null && candidate.equals(e);
		}

		@Override
		public final boolean remove(Object o) {
			/*
			 * Removes the specified element from this set if it is present(optional
			 * operation). More formally, removes an element e such that (o==null ? e==null :
			 * o.equals(e)), if this set contains such an element. Returns true if this set
			 * contained the element
			 */
			if (!(o instanceof Map.Entry)) {
				return false;
			}
			Map.Entry<?, ?> e = (Map.Entry<?, ?>) o;
			Object key = e.getKey();
			Object value = e.getValue();
			switch (Map.秘hasKey(HashMap.this,  key)) {
			default:
			case NOT_SIMPLE:
				return removeNode(hash(key), key, value, true, true, NOT_SIMPLE) != null;
			case INVALID_KEY:
				Map.秘ensureJavaMap(HashMap.this);
				return removeNode(hash(key), key, value, true, true, NOT_SIMPLE) != null;
			case NO_SUCH_KEY:
				return false;
			case HAS_KEY:
				return removeNode(HAS_KEY, key, value, true, true, HAS_KEY) != null;
			}
		}

		@Override
		public final Spliterator<Map.Entry<K, V>> spliterator() {
			return new EntrySpliterator<>(HashMap.this, 0, -1, 0, 0);
		}

		@Override
		public final void forEach(Consumer<? super Map.Entry<K, V>> action) {
			if (action == null)
				throw new NullPointerException();
			if (size() == 0)
				return;
			Node<K, V>[] tab;
					
			if ((tab = table) != null) {
				int mc = modCount;
				for (int i = 0; i < tab.length; ++i) {
					for (Node<K, V> e = tab[i]; e != null; e = e.next_)
						action.accept(e);
				}
				if (modCount != mc)
					throw new ConcurrentModificationException();
			}
		}
	}

	// Overrides of JDK8 Map extension methods

	@Override
	public V getOrDefault(Object key, V defaultValue) {
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return defaultValue;
		case HAS_KEY:
			V v = null;
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			return (v == null ? defaultValue : v);
		}

		
		Node<K, V> e;
		return (e = getNode(hash(key), key)) == null ? defaultValue : e.value;
	}

	@SuppressWarnings("unused")
	@Override
	public V putIfAbsent(K key, V value) {

		/*
		 * If the specified key is not already associated with a value (or is mapped to
		 * null) associates it with the given value and returns null, else returns the
		 * current value.
		 */
		int type = Map.秘hasKey(this, key);
		switch (type) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case HAS_KEY:
		case NO_SUCH_KEY:
			return putVal(RET_VALUE, key, value, true, true, type);
		}
		return putVal(hash(key), key, value, true, true, NOT_SIMPLE);
	}

	@Override
	public boolean remove(Object key, Object value) {

		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return false;
		case HAS_KEY:
			return removeNode(HAS_KEY, key, value, true, true, HAS_KEY) != null;
		}
		return removeNode(hash(key), key, value, true, true, NOT_SIMPLE) != null;
	}

	@Override
	public boolean replace(K key, V oldValue, V newValue) {
		/*
		 * Replaces the entry for the specified key only if currently mapped to the
		 * specified value.
		 */
		V v = null;
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return false;
		case HAS_KEY:
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			if (v == null ? oldValue == null : v.equals(oldValue)) {
				/**
				 * @j2sNative
				 * 
				 * 		 this.秘m.set(key, newValue); 
				 * 		 
				 */
				//afterNodeAccess(e);
				return true;
				
			}
			return false;
		}
		Node<K, V> e;
		if ((e = getNode(hash(key), key)) != null && ((v = e.value) == oldValue || (v != null && v.equals(oldValue)))) {
			e.value = newValue;
			afterNodeAccess(e);
			return true;
		}
		return false;
	}

	@Override
	public V replace(K key, V value) {

		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return null;
		case HAS_KEY:
			V v = null;
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key); this.秘m.set(key, value);
			 */
			//afterNodeAccess(e);
			return v;
		}

		Node<K, V> e;
		if ((e = getNode(hash(key), key)) != null) {
			V oldValue = e.value;
			e.value = value;
			afterNodeAccess(e);
			return oldValue;
		}
		return null;
	}

	@SuppressWarnings("unused")
	@Override
	public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction) {
		if (mappingFunction == null)
			throw new NullPointerException();
		
		/*
		 * If the specified key is not already associated with a value (or is mapped to
		 * null), attempts to compute its value using the given mapping function and
		 * enters it into this map unless null.
		 * 
		 * If the function returns null no mapping is recorded. The most common usage is
		 * to construct a new object serving as an initial mapped value or memoized
		 * result, as in: map.computeIfAbsent(key, k -> new Value(f(k)));
		 * 
		 * Or to implement a multi-value map, Map<K,Collection<V>>,supporting multiple
		 * values per key: map.computeIfAbsent(key, k -> new HashSet<V>()).add(v);
		 * 
		 * 
		 */
		V v = null;
		
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			v = mappingFunction.apply(key);
			if (v == null)
				return null;
			Map.秘ensureJavaMap(this);
			break;
		case HAS_KEY:
			v = null;
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			if (v != null)
				return v;
			v = mappingFunction.apply(key);
			if (v != null)
				putVal(NO_RETURN, key, v, false, true, HAS_KEY);
			return v;
		case NO_SUCH_KEY:
			v = mappingFunction.apply(key);
			if (v != null)
				putVal(NO_RETURN, key, v, false, true, NO_SUCH_KEY);
			return v;
		}

		int hash = hash(key);
		Node<K, V>[] tab;
		Node<K, V> first;
		int n, i;
		int binCount = 0;
		TreeNode<K, V> t = null;
		Node<K, V> old = null;
		if (size > threshold || (tab = table) == null || (n = tab.length) == 0)
			n = (tab = resize()).length;
		if ((first = tab[i = (n - 1) & hash]) != null) {
			if (first instanceof TreeNode)
				old = (t = (TreeNode<K, V>) first).getTreeNode(hash, key);
			else {
				Node<K, V> e = first;
				K k;
				do {
					if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
						old = e;
						break;
					}
					++binCount;
				} while ((e = e.next_) != null);
			}
			V oldValue;
			if (old != null && (oldValue = old.value) != null) {
				afterNodeAccess(old);
				return oldValue;
			}
		}
		if (v == null && (v = mappingFunction.apply(key)) == null) {
			return null;
		} else if (old != null) {
			old.value = v;
			afterNodeAccess(old);
			return v;
		} else if (t != null) {
			t.putTreeVal(this, tab, hash, key, v);
		} else {
			tab[i] = newNode(hash, key, v, first);
			if (binCount >= TREEIFY_THRESHOLD - 1)
				treeifyBin(tab, hash);
		}
		++modCount;
		++size;
		afterNodeInsertion(true);
		return v;
	}

	@SuppressWarnings("unused")
	@Override
	public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
		if (remappingFunction == null)
			throw new NullPointerException();
		/*
		 * If the value for the specified key is present and non-null, attempts to
		 * compute a new mapping given the key and its current mapped value.
		 * 
		 * If the function returns null, the mapping is removed.
		 * 
		 */
		V v = null;
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return null;
		case HAS_KEY:
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			if (v != null) {
				v = remappingFunction.apply(key, v);
				if (v == null) {
					removeNode(NO_RETURN, key, v, false, true, HAS_KEY);
				} else {
					putVal(NO_RETURN, key, v, false, true, HAS_KEY);
				}
			}
			return v;
		}
		Node<K, V> e;
		int hash = hash(key);
		if ((e = getNode(hash, key)) != null && (v = e.value) != null) {
			v = remappingFunction.apply(key, v);
			if (v != null) {
				e.value = v;
				afterNodeAccess(e);
				return v;
			} else
				removeNode(hash, key, null, false, true, NOT_SIMPLE);
		}
		return null;
	}

	@Override
	public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
		if (remappingFunction == null)
			throw new NullPointerException();
		/*
		 * Attempts to compute a mapping for the specified key and its current mapped
		 * value (or null if there is no current mapping). For example, to either create
		 * or append a String msg to a value mapping: map.compute(key, (k, v) -> (v ==
		 * null) ? msg : v.concat(msg)) (Method merge() is often simpler to use for such
		 * purposes.) If the function returns null, the mapping is removed (or remains
		 * absent if initially absent).
		 */
		V v = null;
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			v = remappingFunction.apply(key, null);
			if (v == null)
				return null;
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			if ((v = remappingFunction.apply(key, v)) != null)
				putVal(NO_RETURN, key, v, false, true, NO_SUCH_KEY);
			return v;
		case HAS_KEY:
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			if ((v = remappingFunction.apply(key, v)) == null)
				removeNode(NO_RETURN, key, null, false, true, HAS_KEY);
			else
				putVal(NO_RETURN, key, v, false, true, HAS_KEY);
			return v;
		}
		int hash = hash(key);
		Node<K, V>[] tab;
		Node<K, V> first;
		int n, i;
		int binCount = 0;
		TreeNode<K, V> t = null;
		Node<K, V> old = null;
		if (size > threshold || (tab = table) == null || (n = tab.length) == 0)
			n = (tab = resize()).length;
		if ((first = tab[i = (n - 1) & hash]) != null) {
			if (first instanceof TreeNode)
				old = (t = (TreeNode<K, V>) first).getTreeNode(hash, key);
			else {
				Node<K, V> e = first;
				K k;
				do {
					if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
						old = e;
						break;
					}
					++binCount;
				} while ((e = e.next_) != null);
			}
		}
		if (v == null && old != null)
			v = old.value;
		v = remappingFunction.apply(key, v);
		if (old != null) {
			if (v != null) {
				old.value = v;
				afterNodeAccess(old);
			} else
				removeNode(hash, key, null, false, true, NOT_SIMPLE);
		} else if (v != null) {
			if (t != null)
				t.putTreeVal(this, tab, hash, key, v);
			else {
				tab[i] = newNode(hash, key, v, first);
				if (binCount >= TREEIFY_THRESHOLD - 1)
					treeifyBin(tab, hash);
			}
			++modCount;
			++size;
			afterNodeInsertion(true);
		}
		return v;
	}

	@SuppressWarnings("unused")
	@Override
	public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
		if (value == null)
			throw new NullPointerException();
		if (remappingFunction == null)
			throw new NullPointerException();

		/*
		 * If the specified key is not already associated with a value or is associated
		 * with null, associates it with the given non-null value.Otherwise, replaces
		 * the associated value with the results of the given remapping function, or
		 * removes if the result is null. This method may be of use when combining
		 * multiple mapped values for a key.For example, to either create or append a
		 * String msg to avalue mapping: map.merge(key, msg, String::concat)
		 * 
		 * If the function returns null the mapping is removed.
		 */
		V v = null;
		switch (Map.秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			Map.秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			value = remappingFunction.apply(null, value);
			if (value != null)
				putVal(NO_RETURN, key, value, false, true, NO_SUCH_KEY);
			return value;
		case HAS_KEY:
			/**
			 * @j2sNative
			 * 
			 * 			v = this.秘m.get(key);
			 */
			if (v != null)
				value = remappingFunction.apply(v, value);
			if (value == null) {
				removeNode(NO_RETURN, key, null, false, true, HAS_KEY);
			} else {
				putVal(NO_RETURN, key, value, false, true, HAS_KEY);
			}
			return value;
		}
		int hash = hash(key);
		Node<K, V>[] tab;
		Node<K, V> first;
		int n, i;
		int binCount = 0;
		TreeNode<K, V> t = null;
		Node<K, V> old = null;
		if (size > threshold || (tab = table) == null || (n = tab.length) == 0)
			n = (tab = resize()).length;
		if ((first = tab[i = (n - 1) & hash]) != null) {
			if (first instanceof TreeNode)
				old = (t = (TreeNode<K, V>) first).getTreeNode(hash, key);
			else {
				Node<K, V> e = first;
				K k;
				do {
					if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
						old = e;
						break;
					}
					++binCount;
				} while ((e = e.next_) != null);
			}
		}
		if (old != null) {
			if (old.value != null)
				v = remappingFunction.apply(old.value, value);
			else
				v = value;
			if (v != null) {
				old.value = v;
				afterNodeAccess(old);
			} else
				removeNode(hash, key, null, false, true, NOT_SIMPLE);
			return v;
		}
		if (value != null) {
			if (t != null)
				t.putTreeVal(this, tab, hash, key, value);
			else {
				tab[i] = newNode(hash, key, value, first);
				if (binCount >= TREEIFY_THRESHOLD - 1)
					treeifyBin(tab, hash);
			}
			++modCount;
			++size;
			afterNodeInsertion(true);
		}
		return value;
	}

	@Override
	public void forEach(BiConsumer<? super K, ? super V> action) {

		if (action == null)
			throw new NullPointerException();

		if (size() == 0)
			return;

		int mc = modCount;
		if (Map.秘isSimple(this)) {
			@SuppressWarnings("unused")
			Map m = this.秘m;
			/**
			 * @j2sNative
			 * 
			 * 			m.forEach(function(value,key){ action.accept$O$O(key, value); });
			 * 
			 */
		} else {
			Node<K, V>[] tab;
			if ((tab = table) != null) {
				for (int i = 0; i < tab.length; ++i) {
					for (Node<K, V> e = tab[i]; e != null; e = e.next_)
						action.accept(e.key, e.value);
				}
			}
		}
		if (modCount != mc)
			throw new ConcurrentModificationException();
	}

	@Override
	public void replaceAll(BiFunction<? super K, ? super V, ? extends V> f) {
		if (f == null)
			throw new NullPointerException();
		if (size() == 0)
			return;
		int mc = modCount;
		if (Map.秘isSimple(this)) {
			@SuppressWarnings("unused")
			Map m = this.秘m;
			/**
			 * @j2sNative
			 * 
			 * 			m.forEach(function(value,key){ m.set(key, f.apply$O$O(key,
			 *            value)); });
			 * 
			 */
		} else {
			Node<K, V>[] tab;
			if ((tab = table) != null) {
				for (int i = 0; i < tab.length; ++i) {
					for (Node<K, V> e = tab[i]; e != null; e = e.next_) {
						e.value = f.apply(e.key, e.value);
					}
				}
			}
		}
		if (modCount != mc)
			throw new ConcurrentModificationException();
	}

	/* ------------------------------------------------------------ */
	// Cloning and serialization

	/**
	 * Returns a shallow copy of this <tt>HashMap</tt> instance: the keys and values
	 * themselves are not cloned.
	 *
	 * @return a shallow copy of this map
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Object clone() {
		HashMap<K, V> result;
		try {
			result = (HashMap<K, V>) super.clone();
		} catch (CloneNotSupportedException e) {
			// this shouldn't happen, since we are Cloneable
			throw new InternalError(e);
		}
		result.reinitialize();
		result.putMapEntries(this, false);
		return result;
	}

	// These methods are also used when serializing HashSets
	final float loadFactor() {
		return loadFactor;
	}

	final int capacity() {
		return (table != null) ? table.length : (threshold > 0) ? threshold : DEFAULT_INITIAL_CAPACITY;
	}

//    /**
//     * Save the state of the <tt>HashMap</tt> instance to a stream (i.e.,
//     * serialize it).
//     *
//     * @serialData The <i>capacity</i> of the HashMap (the length of the
//     *             bucket array) is emitted (int), followed by the
//     *             <i>size</i> (an int, the number of key-value
//     *             mappings), followed by the key (Object) and value (Object)
//     *             for each key-value mapping.  The key-value mappings are
//     *             emitted in no particular order.
//     */
//    private void writeObject(java.io.ObjectOutputStream s)
//        throws IOException {
//        int buckets = capacity();
//        // Write out the threshold, loadfactor, and any hidden stuff
//        s.defaultWriteObject();
//        s.writeInt(buckets);
//        s.writeInt(size);
//        internalWriteEntries(s);
//    }
//
//    /**
//     * Reconstitute the {@code HashMap} instance from a stream (i.e.,
//     * deserialize it).
//     */
//    private void readObject(java.io.ObjectInputStream s)
//        throws IOException, ClassNotFoundException {
//        // Read in the threshold (ignored), loadfactor, and any hidden stuff
//        s.defaultReadObject();
//        reinitialize();
//        if (loadFactor <= 0 || Float.isNaN(loadFactor))
//            throw new InvalidObjectException("Illegal load factor: " +
//                                             loadFactor);
//        s.readInt();                // Read and ignore number of buckets
//        int mappings = s.readInt(); // Read number of mappings (size)
//        if (mappings < 0)
//            throw new InvalidObjectException("Illegal mappings count: " +
//                                             mappings);
//        else if (mappings > 0) { // (if zero, use defaults)
//            // Size the table using given load factor only if within
//            // range of 0.25...4.0
//            float lf = Math.min(Math.max(0.25f, loadFactor), 4.0f);
//            float fc = (float)mappings / lf + 1.0f;
//            int cap = ((fc < DEFAULT_INITIAL_CAPACITY) ?
//                       DEFAULT_INITIAL_CAPACITY :
//                       (fc >= MAXIMUM_CAPACITY) ?
//                       MAXIMUM_CAPACITY :
//                       tableSizeFor((int)fc));
//            float ft = (float)cap * lf;
//            threshold = ((cap < MAXIMUM_CAPACITY && ft < MAXIMUM_CAPACITY) ?
//                         (int)ft : Integer.MAX_VALUE);
//            @SuppressWarnings({"rawtypes","unchecked"})
//                Node<K,V>[] tab = (Node<K,V>[])new Node[cap];
//            table = tab;
//
//            // Read the keys and values, and put the mappings in the HashMap
//            for (int i = 0; i < mappings; i++) {
//                @SuppressWarnings("unchecked")
//                    K key = (K) s.readObject();
//                @SuppressWarnings("unchecked")
//                    V value = (V) s.readObject();
//                putVal(hash(key), key, value, false, false);
//            }
//        }
//    }

	/* ------------------------------------------------------------ */
	// iterators

	abstract class HashIterator {
		
		Iterator jsMapIterator;
		boolean isSimple;
		
		Node<K, V> next_; // next entry to return
		Node<K, V> current; // current entry
		int expectedModCount; // for fast-fail
		int index; // current slot

		HashIterator() {
			expectedModCount = modCount;
			current = next_ = null;
			isSimple = Map.秘isSimple(HashMap.this);
			if (isSimple) {
				@SuppressWarnings("unused") Map m = HashMap.this.秘m;
				/**
				 * @j2sNative
				 * 
				 * this.jsMapIterator = m.entries();
				 * this.next_ = this.jsMapIterator.next(); 
				 * 
				 */
			} else {				
				Node<K, V>[] t = table;
				index = 0;
				if (t != null && size > 0) { // advance to first entry
					do {
					} while (index < t.length && (next_ = t[index++]) == null);
				}
			}				
		}

		public final boolean hasNext() {
			if(isSimple) {
				return next_ != null && /** @j2sNative !this.next_.done && */ true;
			} else {				
				return next_ != null;
			}
		}

		final Node<K, V> nextNode() {
			if (modCount != expectedModCount)
				throw new ConcurrentModificationException();
			Node<K, V> e = next_;
			if (e == null)
				throw new NoSuchElementException();
			current = e;
			if(isSimple) {
				next_ = /** @j2sNative this.jsMapIterator.next() || */ null;
			} else {				
				Node<K, V>[] t;
				if ((next_ = current.next_) == null && (t = table) != null) {
					do {
					} while (index < t.length && (next_ = t[index++]) == null);
				}
			}
			return e;
		}

		public void remove() {
			Node<K, V> p = current;
			if (p == null)
				throw new IllegalStateException();
			if (modCount != expectedModCount)
				throw new ConcurrentModificationException();
			current = null;
			K key = null;
			if(isSimple) {
				/**
				 * @j2sNative
				 * 
				 * key = p.value[0];
				 */
				removeNode(NO_RETURN, key, null, false, false, HAS_KEY);
			} else {			
				key = p.key;
				removeNode(hash(key), key, null, false, false, NOT_SIMPLE);
			}				
			expectedModCount = modCount;
		}
	}

	final class KeyIterator extends HashIterator implements Iterator<K> {
		@Override
		public final K next() {
			Node<K, V> n = nextNode();
			if(isSimple) {
				return (/** @j2sNative 1 ? n.value[0] : */null);
			} else {			
				return n.key;
			}	
		}
	}

	final class ValueIterator extends HashIterator implements Iterator<V> {
		@Override
		public final V next() {
			Node<K, V> n = nextNode();
			if (isSimple) {
				return (/** @j2sNative 1 ? n.value[1] : */ null);
			} else {
				return n.value;
			}
		}
	}

	final class EntryIterator extends HashIterator implements Iterator<Map.Entry<K, V>> {
		@Override
		public final Map.Entry<K, V> next() {
			Map.Entry<K, V> e = nextNode();
			if(isSimple) {
				return getJSEntry(e);
			} else {			
				return e;
			}	
		}
	}

	/* ------------------------------------------------------------ */
	// spliterators

	static class HashMapSpliterator<K, V> {
		final HashMap<K, V> map;
		Node<K, V> current; // current node
		int index; // current index, modified on advance/split
		int fence; // one past last index
		int est; // size estimate
		int expectedModCount; // for comodification checks
		Iterator jsMapIterator;
		boolean isSimple;
		

		HashMapSpliterator(HashMap<K, V> map, int origin, int fence, int est, int expectedModCount) {
			this.map = map;
			this.index = origin;
			this.fence = fence;
			this.est = est;
			this.expectedModCount = expectedModCount;
			isSimple = Map.秘isSimple(map);
			if (isSimple) {
				@SuppressWarnings("unused") Map m = map.秘m;
				/**
				 * @j2sNative
				 * 
				 * this.jsMapIterator = m.entries();
				 * 
				 */
			}
		}

		final int getFence() { // initialize fence and size on first use
			int hi;
			if ((hi = fence) < 0) {
				HashMap<K, V> m = map;
				est = m.size();
				expectedModCount = m.modCount;
				Node<K, V>[] tab = m.table;
				hi = fence = (tab == null) ? 0 : tab.length;
			}
			return hi;
		}

		public final long estimateSize() {
			getFence(); // force init
			return (long) est;
		}
	}

	static final class KeySpliterator<K, V> extends HashMapSpliterator<K, V> implements Spliterator<K> {
		KeySpliterator(HashMap<K, V> m, int origin, int fence, int est, int expectedModCount) {
			super(m, origin, fence, est, expectedModCount);
		}

		@Override
		public KeySpliterator<K, V> trySplit() {
			if (isSimple)
				return null;
			int hi = getFence(), lo = index, mid = (lo + hi) >>> 1;
			return (lo >= mid || current != null) ? null
					: new KeySpliterator<>(map, lo, index = mid, est >>>= 1, expectedModCount);
		}

		@Override
		public void forEachRemaining(Consumer<? super K> action) {
			if (action == null)
				throw new NullPointerException();
			HashMap<K, V> m = map;
			int i, hi, mc;
			Node<K, V>[] tab = m.table;
			if ((hi = fence) < 0) {
				mc = expectedModCount = m.modCount;
				hi = fence = (tab == null) ? 0 : tab.length;
			} else
				mc = expectedModCount;
			Node<K, V> p = null;
			if (isSimple) {
				while (true) {
					K k = null;
					/**
					 * @j2sNative p = this.jsMapIterator.next(); if (p.done) p = null; else k =
					 *            p.value[0];
					 * 
					 */

					if (p == null)
						break;
					action.accept(k);
				}
			} else if (tab != null && tab.length >= hi && (i = index) >= 0 && (i < (index = hi) || current != null)) {
				p = current;
				current = null;
				do {
					if (p == null)
						p = tab[i++];
					else {
						action.accept(p.key);
						p = p.next_;
					}
				} while (p != null || i < hi);
			}
			if (m.modCount != mc)
				throw new ConcurrentModificationException();
		}

		@SuppressWarnings("unused")
		@Override
		public boolean tryAdvance(Consumer<? super K> action) {
			if (action == null)
				throw new NullPointerException();

			K k = null;
			Node<K, V> p = null;
			if (isSimple) {
				/**
				 * @j2sNative p = this.jsMapIterator.next(); if (p.done) p = null; else k =
				 *            p.value[0];
				 * 
				 */

				if (p != null) {
					action.accept(k);
					return true;
				}
			} else {
				int hi;
				Node<K, V>[] tab = map.table;

				if (tab != null && tab.length >= (hi = getFence()) && index >= 0) {
					while (current != null || index < hi) {
						if (current == null)
							current = tab[index++];
						else {
							k = current.key;
							current = current.next_;
							action.accept(k);
							if (map.modCount != expectedModCount)
								throw new ConcurrentModificationException();
							return true;
						}
					}
				}
			}
			return false;
		}

		@Override
		public int characteristics() {
			return (fence < 0 || est == map.size() ? Spliterator.SIZED : 0) | Spliterator.DISTINCT;
		}
	}

	static final class ValueSpliterator<K, V> extends HashMapSpliterator<K, V> implements Spliterator<V> {
		ValueSpliterator(HashMap<K, V> m, int origin, int fence, int est, int expectedModCount) {
			super(m, origin, fence, est, expectedModCount);
		}

		@Override
		public ValueSpliterator<K, V> trySplit() {
			if (isSimple)
				return null;
			int hi = getFence(), lo = index, mid = (lo + hi) >>> 1;
			return (lo >= mid || current != null) ? null
					: new ValueSpliterator<>(map, lo, index = mid, est >>>= 1, expectedModCount);
		}

		@Override
		public void forEachRemaining(Consumer<? super V> action) {
			if (action == null)
				throw new NullPointerException();
			HashMap<K, V> m = map;
			int i, hi, mc;
			Node<K, V>[] tab = m.table;
			if ((hi = fence) < 0) {
				mc = expectedModCount = m.modCount;
				hi = fence = (tab == null) ? 0 : tab.length;
			} else
				mc = expectedModCount;
			Node<K, V> p = null;
			if (isSimple) {
				while (true) {
					V v = null;
					/**
					 * @j2sNative p = this.jsMapIterator.next(); if (p.done) p = null; else v =
					 *            p.value[1];
					 * 
					 */

					if (p == null)
						break;
					action.accept(v);
				}
			} else if (tab != null && tab.length >= hi && (i = index) >= 0 && (i < (index = hi) || current != null)) {
					p = current;
					current = null;
					do {
						if (p == null)
							p = tab[i++];
						else {
							action.accept(p.value);
							p = p.next_;
						}
					} while (p != null || i < hi);
			}
			if (m.modCount != mc)
				throw new ConcurrentModificationException();
		}

		@SuppressWarnings("unused")
		@Override
		public boolean tryAdvance(Consumer<? super V> action) {
			if (action == null)
				throw new NullPointerException();

			V v = null;
			Node<K, V> p = null;
			if (isSimple) {
				/**
				 * @j2sNative p = this.jsMapIterator.next(); if (p.done) p = null; else v =
				 *            p.value[1];
				 * 
				 */

				if (p != null) {
					action.accept(v);
					if (map.modCount != expectedModCount)
						throw new ConcurrentModificationException();
					return true;
				}
			} else {
				int hi;
				Node<K, V>[] tab = map.table;
				if (tab != null && tab.length >= (hi = getFence()) && index >= 0) {
					while (current != null || index < hi) {
						if (current == null)
							current = tab[index++];
						else {
							v = current.value;
							current = current.next_;
							action.accept(v);
							if (map.modCount != expectedModCount)
								throw new ConcurrentModificationException();
							return true;
						}
					}
				}
			}
			return false;
		}

		@Override
		public int characteristics() {
			return (fence < 0 || est == map.size() ? Spliterator.SIZED : 0);
		}
	}

	static final class EntrySpliterator<K, V> extends HashMapSpliterator<K, V> implements Spliterator<Map.Entry<K, V>> {
		EntrySpliterator(HashMap<K, V> m, int origin, int fence, int est, int expectedModCount) {
			super(m, origin, fence, est, expectedModCount);
		}

		@Override
		public EntrySpliterator<K, V> trySplit() {
			if (isSimple)
				return null;
			int hi = getFence(), lo = index, mid = (lo + hi) >>> 1;
			return (lo >= mid || current != null) ? null
					: new EntrySpliterator<>(map, lo, index = mid, est >>>= 1, expectedModCount);
		}

		@Override
		public void forEachRemaining(Consumer<? super Map.Entry<K, V>> action) {
			int i, hi, mc;
			if (action == null)
				throw new NullPointerException();
			HashMap<K, V> m = map;
			Node<K, V>[] tab = m.table;
			if ((hi = fence) < 0) {
				mc = expectedModCount = m.modCount;
				hi = fence = (tab == null) ? 0 : tab.length;
			} else
				mc = expectedModCount;
			
			Node<K, V> p = null;
			if (isSimple) {
				while (true) {
					/**
					 * @j2sNative p = this.jsMapIterator.next(); if (p.done) p = null;
					 * 
					 */

					if (p == null)
						break;
					action.accept(map.getJSEntry(p));
				}
			} else if (tab != null && tab.length >= hi && (i = index) >= 0 && (i < (index = hi) || current != null)) {
				p = current;
				current = null;
				do {
					if (p == null)
						p = tab[i++];
					else {
						action.accept(p);
						p = p.next_;
					}
				} while (p != null || i < hi);
			}
			if (m.modCount != mc)
				throw new ConcurrentModificationException();
		}

		@SuppressWarnings("unused")
		@Override
		public boolean tryAdvance(Consumer<? super Map.Entry<K, V>> action) {
			int hi;
			if (action == null)
				throw new NullPointerException();
			Node<K, V>[] tab = map.table;
			Node<K, V> p = null;
			if (isSimple) {
				/**
				 * @j2sNative p = this.jsMapIterator.next(); if (p.done) p = null;
				 * 
				 */

				if (p != null) {
					action.accept(map.getJSEntry(p));
					if (map.modCount != expectedModCount)
						throw new ConcurrentModificationException();
					return true;
				}
			} else if (tab != null && tab.length >= (hi = getFence()) && index >= 0) {
				while (current != null || index < hi) {
					if (current == null)
						current = tab[index++];
					else {
						Node<K, V> e = current;
						current = current.next_;
						action.accept(e);
						if (map.modCount != expectedModCount)
							throw new ConcurrentModificationException();
						return true;
					}
				}
			}
			return false;
		}

		@Override
		public int characteristics() {
			return (fence < 0 || est == map.size() ? Spliterator.SIZED : 0) | Spliterator.DISTINCT;
		}
	}

	/* ------------------------------------------------------------ */
	// LinkedHashMap support

	/*
	 * The following package-protected methods are designed to be overridden by
	 * LinkedHashMap, but not by any other subclass. Nearly all other internal
	 * methods are also package-protected but are declared final, so can be used by
	 * LinkedHashMap, view classes, and HashSet.
	 */

	// Create a regular (non-tree) node
	Node<K, V> newNode(int hash, K key, V value, Node<K, V> next) {
		return new Node<>(hash, key, value, next);
	}

	public Entry<K, V> getJSEntry(Entry<K, V> e) {
        return new Map.Entry<K, V> () {
			@SuppressWarnings("unused")
			@Override
			public K getKey() {
				Entry<K, V> node = e;
				return (/** @j2sNative 1 ? node.value[0] : */null);
			}

			@SuppressWarnings("unused")
			@Override
			public V getValue() {
				Entry<K, V> node = e;
				return (/** @j2sNative 1 ? node.value[1] : */null);
			}

			@Override
			public V setValue(V value) {
				return HashMap.this.put(getKey(), value);
			}
		};
	}

	// For conversion from TreeNodes to plain nodes
	Node<K, V> replacementNode(Node<K, V> p, Node<K, V> next) {
		return new Node<>(p.hash, p.key, p.value, next);
	}

	// Create a tree bin node
	TreeNode<K, V> newTreeNode(int hash, K key, V value, Node<K, V> next) {
		return new TreeNode<>(hash, key, value, next);
	}

	// For treeifyBin
	TreeNode<K, V> replacementTreeNode(Node<K, V> p, Node<K, V> next) {
		return new TreeNode<>(p.hash, p.key, p.value, next);
	}

	/**
	 * Reset to initial default state. Called by clone and readObject.
	 */
	void reinitialize() {
		table = null;
		entrySet = null;
		keySet = null;
		values = null;
		modCount = 0;
		threshold = 0;
		秘setJS();
		size = 0;
	}

	// Callbacks to allow LinkedHashMap post-actions
	void afterNodeAccess(Node<K, V> p) {
	}

	void afterNodeInsertion(boolean evict) {
	}

	void afterNodeRemoval(Node<K, V> p) {
	}

	// Called only from writeObject, to ensure compatible ordering.
	void internalWriteEntries(java.io.ObjectOutputStream s) throws IOException {
		Node<K, V>[] tab;
		if (size > 0 && (tab = table) != null) {
			for (int i = 0; i < tab.length; ++i) {
				for (Node<K, V> e = tab[i]; e != null; e = e.next_) {
					s.writeObject(e.key);
					s.writeObject(e.value);
				}
			}
		}
	}

	/* ------------------------------------------------------------ */
	// Tree bins

	/**
	 * Entry for Tree bins. Extends LinkedHashMap.Entry (which in turn extends Node)
	 * so can be used as extension of either regular or linked node.
	 */
	static final class TreeNode<K, V> extends LinkedHashMap.Entry<K, V> {
		TreeNode<K, V> parent; // red-black tree links
		TreeNode<K, V> left;
		TreeNode<K, V> right;
		TreeNode<K, V> prev; // needed to unlink next upon deletion
		boolean red;

		TreeNode(int hash, K key, V val, Node<K, V> next) {
			super(hash, key, val, next);
		}

		/**
		 * Returns root of tree containing this node.
		 */
		final TreeNode<K, V> root() {
			for (TreeNode<K, V> r = this, p;;) {
				if ((p = r.parent) == null)
					return r;
				r = p;
			}
		}

		/**
		 * Ensures that the given root is the first node of its bin.
		 */
		static <K, V> void moveRootToFront(Node<K, V>[] tab, TreeNode<K, V> root) {
			int n;
			if (root != null && tab != null && (n = tab.length) > 0) {
				int index = (n - 1) & root.hash;
				TreeNode<K, V> first = (TreeNode<K, V>) tab[index];
				if (root != first) {
					Node<K, V> rn;
					tab[index] = root;
					TreeNode<K, V> rp = root.prev;
					if ((rn = root.next_) != null)
						((TreeNode<K, V>) rn).prev = rp;
					if (rp != null)
						rp.next_ = rn;
					if (first != null)
						first.prev = root;
					root.next_ = first;
					root.prev = null;
				}
				assert checkInvariants(root);
			}
		}

		/**
		 * Finds the node starting at root p with the given hash and key. The kc
		 * argument caches comparableClassFor(key) upon first use comparing keys.
		 */
		final TreeNode<K, V> find(int h, Object k, Class<?> kc) {
			TreeNode<K, V> p = this;
			do {
				int ph, dir;
				K pk;
				TreeNode<K, V> pl = p.left, pr = p.right, q;
				if ((ph = p.hash) > h)
					p = pl;
				else if (ph < h)
					p = pr;
				else if ((pk = p.key) == k || (k != null && k.equals(pk)))
					return p;
				else if (pl == null)
					p = pr;
				else if (pr == null)
					p = pl;
				else if ((kc != null || (kc = comparableClassFor(k)) != null)
						&& (dir = compareComparables(kc, k, pk)) != 0)
					p = (dir < 0) ? pl : pr;
				else if ((q = pr.find(h, k, kc)) != null)
					return q;
				else
					p = pl;
			} while (p != null);
			return null;
		}

		/**
		 * Calls find for root node.
		 */
		final TreeNode<K, V> getTreeNode(int h, Object k) {
			return ((parent != null) ? root() : this).find(h, k, null);
		}

		/**
		 * Tie-breaking utility for ordering insertions when equal hashCodes and
		 * non-comparable. We don't require a total order, just a consistent insertion
		 * rule to maintain equivalence across rebalancings. Tie-breaking further than
		 * necessary simplifies testing a bit.
		 */
		static int tieBreakOrder(Object a, Object b) {
			int d;
			if (a == null || b == null || (d = a.getClass().getName().compareTo(b.getClass().getName())) == 0)
				d = (System.identityHashCode(a) <= System.identityHashCode(b) ? -1 : 1);
			return d;
		}

		/**
		 * Forms tree of the nodes linked from this node.
		 * 
		 * @return root of tree
		 */
		final void treeify(Node<K, V>[] tab) {
			TreeNode<K, V> root = null;
			for (TreeNode<K, V> x = this, next; x != null; x = next) {
				next = (TreeNode<K, V>) x.next_;
				x.left = x.right = null;
				if (root == null) {
					x.parent = null;
					x.red = false;
					root = x;
				} else {
					K k = x.key;
					int h = x.hash;
					Class<?> kc = null;
					for (TreeNode<K, V> p = root;;) {
						int dir, ph;
						K pk = p.key;
						if ((ph = p.hash) > h)
							dir = -1;
						else if (ph < h)
							dir = 1;
						else if ((kc == null && (kc = comparableClassFor(k)) == null)
								|| (dir = compareComparables(kc, k, pk)) == 0)
							dir = tieBreakOrder(k, pk);

						TreeNode<K, V> xp = p;
						if ((p = (dir <= 0) ? p.left : p.right) == null) {
							x.parent = xp;
							if (dir <= 0)
								xp.left = x;
							else
								xp.right = x;
							root = balanceInsertion(root, x);
							break;
						}
					}
				}
			}
			moveRootToFront(tab, root);
		}

		/**
		 * Returns a list of non-TreeNodes replacing those linked from this node.
		 */
		final Node<K, V> untreeify(HashMap<K, V> map) {
			Node<K, V> hd = null, tl = null;
			for (Node<K, V> q = this; q != null; q = q.next_) {
				Node<K, V> p = map.replacementNode(q, null);
				if (tl == null)
					hd = p;
				else
					tl.next_ = p;
				tl = p;
			}
			return hd;
		}

		/**
		 * Tree version of putVal.
		 */
		final TreeNode<K, V> putTreeVal(HashMap<K, V> map, Node<K, V>[] tab, int h, K k, V v) {
			Class<?> kc = null;
			boolean searched = false;
			TreeNode<K, V> root = (parent != null) ? root() : this;
			for (TreeNode<K, V> p = root;;) {
				int dir, ph;
				K pk;
				if ((ph = p.hash) > h)
					dir = -1;
				else if (ph < h)
					dir = 1;
				else if ((pk = p.key) == k || (k != null && k.equals(pk)))
					return p;
				else if ((kc == null && (kc = comparableClassFor(k)) == null)
						|| (dir = compareComparables(kc, k, pk)) == 0) {
					if (!searched) {
						TreeNode<K, V> q, ch;
						searched = true;
						if (((ch = p.left) != null && (q = ch.find(h, k, kc)) != null)
								|| ((ch = p.right) != null && (q = ch.find(h, k, kc)) != null))
							return q;
					}
					dir = tieBreakOrder(k, pk);
				}

				TreeNode<K, V> xp = p;
				if ((p = (dir <= 0) ? p.left : p.right) == null) {
					Node<K, V> xpn = xp.next_;
					TreeNode<K, V> x = map.newTreeNode(h, k, v, xpn);
					if (dir <= 0)
						xp.left = x;
					else
						xp.right = x;
					xp.next_ = x;
					x.parent = x.prev = xp;
					if (xpn != null)
						((TreeNode<K, V>) xpn).prev = x;
					moveRootToFront(tab, balanceInsertion(root, x));
					return null;
				}
			}
		}

		/**
		 * Removes the given node, that must be present before this call. This is
		 * messier than typical red-black deletion code because we cannot swap the
		 * contents of an interior node with a leaf successor that is pinned by "next"
		 * pointers that are accessible independently during traversal. So instead we
		 * swap the tree linkages. If the current tree appears to have too few nodes,
		 * the bin is converted back to a plain bin. (The test triggers somewhere
		 * between 2 and 6 nodes, depending on tree structure).
		 */
		final void removeTreeNode(HashMap<K, V> map, Node<K, V>[] tab, boolean movable) {
			int n;
			if (tab == null || (n = tab.length) == 0)
				return;
			int index = (n - 1) & hash;
			TreeNode<K, V> first = (TreeNode<K, V>) tab[index], root = first, rl;
			TreeNode<K, V> succ = (TreeNode<K, V>) next_, pred = prev;
			if (pred == null)
				tab[index] = first = succ;
			else
				pred.next_ = succ;
			if (succ != null)
				succ.prev = pred;
			if (first == null)
				return;
			if (root.parent != null)
				root = root.root();
			if (root == null || root.right == null || (rl = root.left) == null || rl.left == null) {
				tab[index] = first.untreeify(map); // too small
				return;
			}
			TreeNode<K, V> p = this, pl = left, pr = right, replacement;
			if (pl != null && pr != null) {
				TreeNode<K, V> s = pr, sl;
				while ((sl = s.left) != null) // find successor
					s = sl;
				boolean c = s.red;
				s.red = p.red;
				p.red = c; // swap colors
				TreeNode<K, V> sr = s.right;
				TreeNode<K, V> pp = p.parent;
				if (s == pr) { // p was s's direct parent
					p.parent = s;
					s.right = p;
				} else {
					TreeNode<K, V> sp = s.parent;
					if ((p.parent = sp) != null) {
						if (s == sp.left)
							sp.left = p;
						else
							sp.right = p;
					}
					if ((s.right = pr) != null)
						pr.parent = s;
				}
				p.left = null;
				if ((p.right = sr) != null)
					sr.parent = p;
				if ((s.left = pl) != null)
					pl.parent = s;
				if ((s.parent = pp) == null)
					root = s;
				else if (p == pp.left)
					pp.left = s;
				else
					pp.right = s;
				if (sr != null)
					replacement = sr;
				else
					replacement = p;
			} else if (pl != null)
				replacement = pl;
			else if (pr != null)
				replacement = pr;
			else
				replacement = p;
			if (replacement != p) {
				TreeNode<K, V> pp = replacement.parent = p.parent;
				if (pp == null)
					root = replacement;
				else if (p == pp.left)
					pp.left = replacement;
				else
					pp.right = replacement;
				p.left = p.right = p.parent = null;
			}

			TreeNode<K, V> r = p.red ? root : balanceDeletion(root, replacement);

			if (replacement == p) { // detach
				TreeNode<K, V> pp = p.parent;
				p.parent = null;
				if (pp != null) {
					if (p == pp.left)
						pp.left = null;
					else if (p == pp.right)
						pp.right = null;
				}
			}
			if (movable)
				moveRootToFront(tab, r);
		}

		/**
		 * Splits nodes in a tree bin into lower and upper tree bins, or untreeifies if
		 * now too small. Called only from resize; see above discussion about split bits
		 * and indices.
		 *
		 * @param map   the map
		 * @param tab   the table for recording bin heads
		 * @param index the index of the table being split
		 * @param bit   the bit of hash to split on
		 */
		final void split(HashMap<K, V> map, Node<K, V>[] tab, int index, int bit) {
			TreeNode<K, V> b = this;
			// Relink into lo and hi lists, preserving order
			TreeNode<K, V> loHead = null, loTail = null;
			TreeNode<K, V> hiHead = null, hiTail = null;
			int lc = 0, hc = 0;
			for (TreeNode<K, V> e = b, next; e != null; e = next) {
				next = (TreeNode<K, V>) e.next_;
				e.next_ = null;
				if ((e.hash & bit) == 0) {
					if ((e.prev = loTail) == null)
						loHead = e;
					else
						loTail.next_ = e;
					loTail = e;
					++lc;
				} else {
					if ((e.prev = hiTail) == null)
						hiHead = e;
					else
						hiTail.next_ = e;
					hiTail = e;
					++hc;
				}
			}

			if (loHead != null) {
				if (lc <= UNTREEIFY_THRESHOLD)
					tab[index] = loHead.untreeify(map);
				else {
					tab[index] = loHead;
					if (hiHead != null) // (else is already treeified)
						loHead.treeify(tab);
				}
			}
			if (hiHead != null) {
				if (hc <= UNTREEIFY_THRESHOLD)
					tab[index + bit] = hiHead.untreeify(map);
				else {
					tab[index + bit] = hiHead;
					if (loHead != null)
						hiHead.treeify(tab);
				}
			}
		}

		/* ------------------------------------------------------------ */
		// Red-black tree methods, all adapted from CLR

		static <K, V> TreeNode<K, V> rotateLeft(TreeNode<K, V> root, TreeNode<K, V> p) {
			TreeNode<K, V> r, pp, rl;
			if (p != null && (r = p.right) != null) {
				if ((rl = p.right = r.left) != null)
					rl.parent = p;
				if ((pp = r.parent = p.parent) == null)
					(root = r).red = false;
				else if (pp.left == p)
					pp.left = r;
				else
					pp.right = r;
				r.left = p;
				p.parent = r;
			}
			return root;
		}

		static <K, V> TreeNode<K, V> rotateRight(TreeNode<K, V> root, TreeNode<K, V> p) {
			TreeNode<K, V> l, pp, lr;
			if (p != null && (l = p.left) != null) {
				if ((lr = p.left = l.right) != null)
					lr.parent = p;
				if ((pp = l.parent = p.parent) == null)
					(root = l).red = false;
				else if (pp.right == p)
					pp.right = l;
				else
					pp.left = l;
				l.right = p;
				p.parent = l;
			}
			return root;
		}

		static <K, V> TreeNode<K, V> balanceInsertion(TreeNode<K, V> root, TreeNode<K, V> x) {
			x.red = true;
			for (TreeNode<K, V> xp, xpp, xppl, xppr;;) {
				if ((xp = x.parent) == null) {
					x.red = false;
					return x;
				} else if (!xp.red || (xpp = xp.parent) == null)
					return root;
				if (xp == (xppl = xpp.left)) {
					if ((xppr = xpp.right) != null && xppr.red) {
						xppr.red = false;
						xp.red = false;
						xpp.red = true;
						x = xpp;
					} else {
						if (x == xp.right) {
							root = rotateLeft(root, x = xp);
							xpp = (xp = x.parent) == null ? null : xp.parent;
						}
						if (xp != null) {
							xp.red = false;
							if (xpp != null) {
								xpp.red = true;
								root = rotateRight(root, xpp);
							}
						}
					}
				} else {
					if (xppl != null && xppl.red) {
						xppl.red = false;
						xp.red = false;
						xpp.red = true;
						x = xpp;
					} else {
						if (x == xp.left) {
							root = rotateRight(root, x = xp);
							xpp = (xp = x.parent) == null ? null : xp.parent;
						}
						if (xp != null) {
							xp.red = false;
							if (xpp != null) {
								xpp.red = true;
								root = rotateLeft(root, xpp);
							}
						}
					}
				}
			}
		}

		static <K, V> TreeNode<K, V> balanceDeletion(TreeNode<K, V> root, TreeNode<K, V> x) {
			for (TreeNode<K, V> xp, xpl, xpr;;) {
				if (x == null || x == root)
					return root;
				else if ((xp = x.parent) == null) {
					x.red = false;
					return x;
				} else if (x.red) {
					x.red = false;
					return root;
				} else if ((xpl = xp.left) == x) {
					if ((xpr = xp.right) != null && xpr.red) {
						xpr.red = false;
						xp.red = true;
						root = rotateLeft(root, xp);
						xpr = (xp = x.parent) == null ? null : xp.right;
					}
					if (xpr == null)
						x = xp;
					else {
						TreeNode<K, V> sl = xpr.left, sr = xpr.right;
						if ((sr == null || !sr.red) && (sl == null || !sl.red)) {
							xpr.red = true;
							x = xp;
						} else {
							if (sr == null || !sr.red) {
								if (sl != null)
									sl.red = false;
								xpr.red = true;
								root = rotateRight(root, xpr);
								xpr = (xp = x.parent) == null ? null : xp.right;
							}
							if (xpr != null) {
								xpr.red = (xp == null) ? false : xp.red;
								if ((sr = xpr.right) != null)
									sr.red = false;
							}
							if (xp != null) {
								xp.red = false;
								root = rotateLeft(root, xp);
							}
							x = root;
						}
					}
				} else { // symmetric
					if (xpl != null && xpl.red) {
						xpl.red = false;
						xp.red = true;
						root = rotateRight(root, xp);
						xpl = (xp = x.parent) == null ? null : xp.left;
					}
					if (xpl == null)
						x = xp;
					else {
						TreeNode<K, V> sl = xpl.left, sr = xpl.right;
						if ((sl == null || !sl.red) && (sr == null || !sr.red)) {
							xpl.red = true;
							x = xp;
						} else {
							if (sl == null || !sl.red) {
								if (sr != null)
									sr.red = false;
								xpl.red = true;
								root = rotateLeft(root, xpl);
								xpl = (xp = x.parent) == null ? null : xp.left;
							}
							if (xpl != null) {
								xpl.red = (xp == null) ? false : xp.red;
								if ((sl = xpl.left) != null)
									sl.red = false;
							}
							if (xp != null) {
								xp.red = false;
								root = rotateRight(root, xp);
							}
							x = root;
						}
					}
				}
			}
		}

		/**
		 * Recursive invariant check
		 */
		static <K, V> boolean checkInvariants(TreeNode<K, V> t) {
			TreeNode<K, V> tp = t.parent, tl = t.left, tr = t.right, tb = t.prev, tn = (TreeNode<K, V>) t.next_;
			if (tb != null && tb.next_ != t)
				return false;
			if (tn != null && tn.prev != t)
				return false;
			if (tp != null && t != tp.left && t != tp.right)
				return false;
			if (tl != null && (tl.parent != t || tl.hash > t.hash))
				return false;
			if (tr != null && (tr.parent != t || tr.hash < t.hash))
				return false;
			if (t.red && tl != null && tl.red && tr != null && tr.red)
				return false;
			if (tl != null && !checkInvariants(tl))
				return false;
			if (tr != null && !checkInvariants(tr))
				return false;
			return true;
		}
	}

	protected void 秘setJS() {

		秘m = (秘allowJS && HashMap.USE_SIMPLE ? /** @j2sNative new Map() || */
				null : null);
	}

	static final int NO_RETURN = 0;
	static final int RET_VALUE = 1;

}
