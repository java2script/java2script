/*
 * Copyright (c) 1994, 2013, Oracle and/or its affiliates. All rights reserved.
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

/**
 * This class implements a hash table, which maps keys to values. Any
 * non-<code>null</code> object can be used as a key or as a value. <p>
 *
 * To successfully store and retrieve objects from a hashtable, the
 * objects used as keys must implement the <code>hashCode</code>
 * method and the <code>equals</code> method. <p>
 *
 * An instance of <code>Hashtable</code> has two parameters that affect its
 * performance: <i>initial capacity</i> and <i>load factor</i>.  The
 * <i>capacity</i> is the number of <i>buckets</i> in the hash table, and the
 * <i>initial capacity</i> is simply the capacity at the time the hash table
 * is created.  Note that the hash table is <i>open</i>: in the case of a "hash
 * collision", a single bucket stores multiple entries, which must be searched
 * sequentially.  The <i>load factor</i> is a measure of how full the hash
 * table is allowed to get before its capacity is automatically increased.
 * The initial capacity and load factor parameters are merely hints to
 * the implementation.  The exact details as to when and whether the rehash
 * method is invoked are implementation-dependent.<p>
 *
 * Generally, the default load factor (.75) offers a good tradeoff between
 * time and space costs.  Higher values decrease the space overhead but
 * increase the time cost to look up an entry (which is reflected in most
 * <tt>Hashtable</tt> operations, including <tt>get</tt> and <tt>put</tt>).<p>
 *
 * The initial capacity controls a tradeoff between wasted space and the
 * need for <code>rehash</code> operations, which are time-consuming.
 * No <code>rehash</code> operations will <i>ever</i> occur if the initial
 * capacity is greater than the maximum number of entries the
 * <tt>Hashtable</tt> will contain divided by its load factor.  However,
 * setting the initial capacity too high can waste space.<p>
 *
 * If many entries are to be made into a <code>Hashtable</code>,
 * creating it with a sufficiently large capacity may allow the
 * entries to be inserted more efficiently than letting it perform
 * automatic rehashing as needed to grow the table. <p>
 *
 * This example creates a hashtable of numbers. It uses the names of
 * the numbers as keys:
 * <pre>   {@code
 *   Hashtable<String, Integer> numbers
 *     = new Hashtable<String, Integer>();
 *   numbers.put("one", 1);
 *   numbers.put("two", 2);
 *   numbers.put("three", 3);}</pre>
 *
 * <p>To retrieve a number, use the following code:
 * <pre>   {@code
 *   Integer n = numbers.get("two");
 *   if (n != null) {
 *     System.out.println("two = " + n);
 *   }}</pre>
 *
 * <p>The iterators returned by the <tt>iterator</tt> method of the collections
 * returned by all of this class's "collection view methods" are
 * <em>fail-fast</em>: if the Hashtable is structurally modified at any time
 * after the iterator is created, in any way except through the iterator's own
 * <tt>remove</tt> method, the iterator will throw a {@link
 * ConcurrentModificationException}.  Thus, in the face of concurrent
 * modification, the iterator fails quickly and cleanly, rather than risking
 * arbitrary, non-deterministic behavior at an undetermined time in the future.
 * The Enumerations returned by Hashtable's keys and elements methods are
 * <em>not</em> fail-fast.
 *
 * <p>Note that the fail-fast behavior of an iterator cannot be guaranteed
 * as it is, generally speaking, impossible to make any hard guarantees in the
 * presence of unsynchronized concurrent modification.  Fail-fast iterators
 * throw <tt>ConcurrentModificationException</tt> on a best-effort basis.
 * Therefore, it would be wrong to write a program that depended on this
 * exception for its correctness: <i>the fail-fast behavior of iterators
 * should be used only to detect bugs.</i>
 *
 * <p>As of the Java 2 platform v1.2, this class was retrofitted to
 * implement the {@link Map} interface, making it a member of the
 * <a href="{@docRoot}/../technotes/guides/collections/index.html">
 *
 * Java Collections Framework</a>.  Unlike the new collection
 * implementations, {@code Hashtable} is synchronized.  If a
 * thread-safe implementation is not needed, it is recommended to use
 * {@link HashMap} in place of {@code Hashtable}.  If a thread-safe
 * highly-concurrent implementation is desired, then it is recommended
 * to use {@link java.util.concurrent.ConcurrentHashMap} in place of
 * {@code Hashtable}.
 *
 * @author  Arthur van Hoff
 * @author  Josh Bloch
 * @author  Neal Gafter
 * @see     Object#equals(java.lang.Object)
 * @see     Object#hashCode()
 * @see     Hashtable#rehash()
 * @see     Collection
 * @see     Map
 * @see     HashMap
 * @see     TreeMap
 * @since JDK1.0
 * 
 */
public class Hashtable<K,V>
    extends Dictionary<K,V>
    implements Map<K,V>, Cloneable {

    /**
     * The hash table data.
     */
    private transient Entry<?,?>[] table;

    /**
     * The total number of entries in the hash table.
     */
    private transient int count;

    /**
     * The table is rehashed when its size exceeds this threshold.  (The
     * value of this field is (int)(capacity * loadFactor).)
     *
     * @serial
     */
    private int threshold;

    /**
     * The load factor for the hashtable.
     *
     * @serial
     */
    private float loadFactor;

    /**
     * The number of times this Hashtable has been structurally modified
     * Structural modifications are those that change the number of entries in
     * the Hashtable or otherwise modify its internal structure (e.g.,
     * rehash).  This field is used to make iterators on Collection-views of
     * the Hashtable fail-fast.  (See ConcurrentModificationException).
     */
    private transient int modCount;

	/**
	 * SwingJS note: This constructor DOES NOT allow JavaScript Map object for
	 * Hashtable<String,?>.
	 * 
	 * Constructs a new, empty hashtable with the specified initial capacity and the
	 * specified load factor.
	 *
	 * @param size       the initial capacity of the hashtable.
	 * @param loadFactor the load factor of the hashtable.
	 * @exception IllegalArgumentException if the initial capacity is less than
	 *                                     zero, or if the load factor is
	 *                                     nonpositive.
	 * 
     *              @j2sIgnore
	 */
	public Hashtable(int capacity, float loadFactor) {
		super();
		if (capacity < 0)
			throw new IllegalArgumentException("Illegal Capacity: " + capacity);
		if (loadFactor <= 0 || Float.isNaN(loadFactor))
			throw new IllegalArgumentException("Illegal Load: " + loadFactor);
		if (capacity == 0)
			capacity = 1;
		this.loadFactor = loadFactor;
		table = new Entry<?, ?>[capacity];
		threshold = (int) Math.min(capacity * loadFactor, MAX_ARRAY_SIZE + 1);
	}
    
    /**
     * SwingJS note: This constructor allows JavaScript Map object for Hashtable<String,?>.
     * 
     * Constructs a new, empty hashtable with the specified initial capacity
     * and default load factor (0.75).
     *
     * @param     initialCapacity   the initial capacity of the hashtable.
     * @exception IllegalArgumentException if the initial capacity is less
     *              than zero.
     *              
     *              @j2sIgnore
     */
    public Hashtable(int initialCapacity) {
        this(initialCapacity, 0.75f);
    }

    /**
     * SwingJS note: This constructor allows JavaScript Map object for Hashtable<String,?>.
     * 
     * Constructs a new, empty hashtable with a default initial capacity (11)
     * and load factor (0.75).
     * 
	 * @j2sIgnoreSuperConstructor
     */
    @SuppressWarnings("unused")
	public Hashtable() {
		super();
		Hashtable map = null;
		int capacity = 11;
		float loadFactor = 0.75f;
		/**
		 * 
		 * @j2sNative
		 * 			capacity = arguments[0];
		 * 			loadFactor = arguments[1];
		 * 			if (typeof capacity == "object") { 
		 * 				map = capacity; 
		 * 				capacity = Math.max(2*t.size(), 11); 
         *				this.秘allowJS = map.秘allowJS;
		 * 			} else {
         *				this.秘allowJS = true;
		 * 			}
		 *            capacity = (capacity || 11); 
		 *            loadFactor = (loadFactor || 0.75);
		 * 
		 */
		{
		}
		if (capacity < 0)
			throw new IllegalArgumentException("Illegal Capacity: " + capacity);
		if (loadFactor <= 0 || Float.isNaN(loadFactor))
			throw new IllegalArgumentException("Illegal Load: " + loadFactor);
		if (capacity == 0)
			capacity = 1;
		this.loadFactor = loadFactor;
		table = new Entry<?, ?>[capacity];
		threshold = (int) Math.min(capacity * loadFactor, MAX_ARRAY_SIZE + 1);
		秘setJS();
		if (map != null)
			putAll(map);
    }

    /**
     * Constructs a new hashtable with the same mappings as the given
     * Map.  The hashtable is created with an initial capacity sufficient to
     * hold the mappings in the given Map and a default load factor (0.75).
     *
     * @param t the map whose mappings are to be placed in this map.
     * @throws NullPointerException if the specified map is null.
     * @since   1.2
     * 
     * @j2sIgnore
     */
    public Hashtable(Map<? extends K, ? extends V> t) {
        this(Math.max(2*t.size(), 11), 0.75f);
        boolean b = false;
        /** @j2sNative 
         * b = t.allowJS;
         */
        {}
        秘allowJS = b;
        putAll(t);
    }

    /**
     * Returns the number of keys in this hashtable.
     *
     * @return  the number of keys in this hashtable.
     */
    @Override
	public synchronized int size() {
    	int c = count;
    	/** @j2sNative 
    	 * c = this.秘m && this.秘m.size || c;
    	 */
    	{}
		return c;
    }

    /**
     * Tests if this hashtable maps no keys to values.
     *
     * @return  <code>true</code> if this hashtable maps no keys to values;
     *          <code>false</code> otherwise.
     */
    @Override
	public synchronized boolean isEmpty() {
		return size() == 0;
    }

    /**
     * Returns an enumeration of the keys in this hashtable.
     *
     * @return  an enumeration of the keys in this hashtable.
     * @see     Enumeration
     * @see     #elements()
     * @see     #keySet()
     * @see     Map
     */
    @Override
	public synchronized Enumeration<K> keys() {
    	
        return this.<K>getEnumeration(KEYS);
    }

    /**
     * Returns an enumeration of the values in this hashtable.
     * Use the Enumeration methods on the returned object to fetch the elements
     * sequentially.
     *
     * @return  an enumeration of the values in this hashtable.
     * @see     java.util.Enumeration
     * @see     #keys()
     * @see     #values()
     * @see     Map
     */
    @Override
	public synchronized Enumeration<V> elements() {
        return this.<V>getEnumeration(VALUES);
    }

	/**
	 * Tests if some key maps into the specified value in this hashtable. This
	 * operation is more expensive than the {@link #containsKey containsKey} method.
	 *
	 * <p>
	 * Note that this method is identical in functionality to {@link #containsValue
	 * containsValue}, (which is part of the {@link Map} interface in the
	 * collections framework).
	 *
	 * @param value a value to search for
	 * @return <code>true</code> if and only if some key maps to the
	 *         <code>value</code> argument in this hashtable as determined by the
	 *         <tt>equals</tt> method; <code>false</code> otherwise.
	 * @exception NullPointerException if the value is <code>null</code>
	 */
	public synchronized boolean contains(Object value) {
		if (value == null) {
			throw new NullPointerException();
		}

		if (size() == 0)
			return false;

		if (秘isSimple(this)) {
			@SuppressWarnings("unused")
			Map m = this.秘m;
			/**
			 * @j2sNative
			 * 
			 * 	    var iter = m.values(); 
			 * 		for (var n = iter.next(); !n.done; n = iter.next()) { 
			 *            if (n.value == value || n.value.equals(value)) { 
			 *              return true; 
			 *            } 
			 *      }
			 * 
			 */
			{}
		} else {

			Entry<?, ?> tab[] = table;
			for (int i = tab.length; i-- > 0;) {
				for (Entry<?, ?> e = tab[i]; e != null; e = e.next_) {
					if (e.value.equals(value)) {
						return true;
					}
				}
			}
		}
		return false;
	}

    /**
     * Returns true if this hashtable maps one or more keys to this value.
     *
     * <p>Note that this method is identical in functionality to {@link
     * #contains contains} (which predates the {@link Map} interface).
     *
     * @param value value whose presence in this hashtable is to be tested
     * @return <tt>true</tt> if this map maps one or more keys to the
     *         specified value
     * @throws NullPointerException  if the value is <code>null</code>
     * @since 1.2
     */
    @Override
	public boolean containsValue(Object value) {
        return contains(value);
    }

    /**
     * Tests if the specified object is a key in this hashtable.
     *
     * @param   key   possible key
     * @return  <code>true</code> if and only if the specified object
     *          is a key in this hashtable, as determined by the
     *          <tt>equals</tt> method; <code>false</code> otherwise.
     * @throws  NullPointerException  if the key is <code>null</code>
     * @see     #contains(Object)
     */
    @Override
	public synchronized boolean containsKey(Object key) {
    	
		switch (秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return false;
		case HAS_KEY:
			return true;
		}    	
        Entry<?,?> tab[] = table;
        int hash = key.hashCode();
        int index = (hash & 0x7FFFFFFF) % tab.length;
        for (Entry<?,?> e = tab[index] ; e != null ; e = e.next_) {
            if ((e.hash == hash) && e.key.equals(key)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the value to which the specified key is mapped,
     * or {@code null} if this map contains no mapping for the key.
     *
     * <p>More formally, if this map contains a mapping from a key
     * {@code k} to a value {@code v} such that {@code (key.equals(k))},
     * then this method returns {@code v}; otherwise it returns
     * {@code null}.  (There can be at most one such mapping.)
     *
     * @param key the key whose associated value is to be returned
     * @return the value to which the specified key is mapped, or
     *         {@code null} if this map contains no mapping for the key
     * @throws NullPointerException if the specified key is null
     * @see     #put(Object, Object)
     */
    @Override
    public synchronized V get(Object key) {
    	if (key == null)
    		return null;
		switch (秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			秘ensureJavaMap(this);
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
			{}
			return v;
		}

        Entry<?,?> tab[] = table;
        int hash = key.hashCode();
        int index = (hash & 0x7FFFFFFF) % tab.length;
        for (Entry<?,?> e = tab[index] ; e != null ; e = e.next_) {
            if ((e.hash == hash) && e.key.equals(key)) {
                return (V)e.value;
            }
        }
        return null;
    }

    /**
     * The maximum size of array to allocate.
     * Some VMs reserve some header words in an array.
     * Attempts to allocate larger arrays may result in
     * OutOfMemoryError: Requested array size exceeds VM limit
     */
    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

    /**
     * Increases the capacity of and internally reorganizes this
     * hashtable, in order to accommodate and access its entries more
     * efficiently.  This method is called automatically when the
     * number of keys in the hashtable exceeds this hashtable's capacity
     * and load factor.
     */
    protected void rehash() {
        int oldCapacity = table.length;
        Entry<?,?>[] oldMap = table;

        // overflow-conscious code
        int newCapacity = (oldCapacity << 1) + 1;
        if (newCapacity - MAX_ARRAY_SIZE > 0) {
            if (oldCapacity == MAX_ARRAY_SIZE)
                // Keep running with MAX_ARRAY_SIZE buckets
                return;
            newCapacity = MAX_ARRAY_SIZE;
        }
        Entry<?,?>[] newMap = new Entry<?,?>[newCapacity];

        modCount++;
        threshold = (int)Math.min(newCapacity * loadFactor, MAX_ARRAY_SIZE + 1);
        table = newMap;

        for (int i = oldCapacity ; i-- > 0 ;) {
            for (Entry<K,V> old = (Entry<K,V>)oldMap[i] ; old != null ; ) {
                Entry<K,V> e = old;
                old = old.next_;

                int index = (e.hash & 0x7FFFFFFF) % newCapacity;
                e.next_ = (Entry<K,V>)newMap[index];
                newMap[index] = e;
            }
        }
    }

    private void addEntry(int hash, K key, V value, int index) {
        modCount++;

        Entry<?,?> tab[] = table;
        if (count >= threshold) {
            // Rehash the table if the threshold is exceeded
            rehash();

            tab = table;
            hash = key.hashCode();
            index = (hash & 0x7FFFFFFF) % tab.length;
        }

        // Creates the new entry.
        Entry<K,V> e = (Entry<K,V>) tab[index];
        tab[index] = new Entry<>(hash, key, value, e);
        count++;
    }

    /**
     * Maps the specified <code>key</code> to the specified
     * <code>value</code> in this hashtable. Neither the key nor the
     * value can be <code>null</code>. <p>
     *
     * The value can be retrieved by calling the <code>get</code> method
     * with a key that is equal to the original key.
     *
     * @param      key     the hashtable key
     * @param      value   the value
     * @return     the previous value of the specified key in this hashtable,
     *             or <code>null</code> if it did not have one
     * @exception  NullPointerException  if the key or value is
     *               <code>null</code>
     * @see     Object#equals(Object)
     * @see     #get(Object)
     */
    @Override
	public synchronized V put(K key, V value) {
    	
        // Make sure the value is not null
        if (value == null) {
            throw new NullPointerException();
        }

		switch (秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			/**
			 * @j2sNative
			 * 
			 * 			this.秘m.set(key, value);
			 */
			{}
			++modCount;
			return null;
		case HAS_KEY:
			V v0 = null;
			/**
			 * @j2sNative
			 * 
			 * 			v0 = this.秘m.get(key); 
			 * 			this.秘m.set(key, value);
			 */
			{}
			++modCount;
			return v0;
		}
    	
        // Makes sure the key is not already in the hashtable.
        Entry<?,?> tab[] = table;
        int hash = key.hashCode();
        int index = (hash & 0x7FFFFFFF) % tab.length;
        Entry<K,V> entry = (Entry<K,V>)tab[index];
        for(; entry != null ; entry = entry.next_) {
            if ((entry.hash == hash) && entry.key.equals(key)) {
                V old = entry.value;
                entry.value = value;
                return old;
            }
        }

        addEntry(hash, key, value, index);
        return null;
    }

    /**
     * Removes the key (and its corresponding value) from this
     * hashtable. This method does nothing if the key is not in the hashtable.
     *
     * @param   key   the key that needs to be removed
     * @return  the value to which the key had been mapped in this hashtable,
     *          or <code>null</code> if the key did not have a mapping
     * @throws  NullPointerException  if the key is <code>null</code>
     */
    @Override
	public synchronized V remove(Object key) {
    	
    	if (key == null)
    		throw new NullPointerException("Hashtable key may not be null");
    		
		switch (秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return null;
		case HAS_KEY:
			V v0 = null;
			/**
			 * @j2sNative
			 * 
			 * 			v0 = this.秘m.get(key); this.秘m["delete"](key);
			 */
			{}
			++modCount;
			return v0;
		}

        Entry<?,?> tab[] = table;
        int hash = key.hashCode();
        int index = (hash & 0x7FFFFFFF) % tab.length;
        Entry<K,V> e = (Entry<K,V>)tab[index];
        for(Entry<K,V> prev = null ; e != null ; prev = e, e = e.next_) {
            if ((e.hash == hash) && e.key.equals(key)) {
                modCount++;
                if (prev != null) {
                    prev.next_ = e.next_;
                } else {
                    tab[index] = e.next_;
                }
                count--;
                V oldValue = e.value;
                e.value = null;
                return oldValue;
            }
        }
        return null;
    }

	/**
	 * Copies all of the mappings from the specified map to this hashtable. These
	 * mappings will replace any mappings that this hashtable had for any of the
	 * keys currently in the specified map.
	 *
	 * @param t mappings to be stored in this map
	 * @throws NullPointerException if the specified map is null
	 * @since 1.2
	 */
	@SuppressWarnings("unused")
	@Override
	public synchronized void putAll(Map<? extends K, ? extends V> t) {
		K key = null;
		V value = null;
		if (秘isSimple(t)) {
			Hashtable me = this;
			/**
			 * @j2sNative t.秘m.forEach(function(value, key) { me.put(key, value); })
			 */
			{}
			return;
		}
		for (Map.Entry<? extends K, ? extends V> e : t.entrySet())
			put(e.getKey(), e.getValue());
	}

	/**
	 * Clears this hashtable so that it contains no keys.
	 */
	@Override
	public synchronized void clear() {
		Entry<?, ?> tab[] = table;
		modCount++;
		if (秘isSimple(this)) {
			/**
			 * @j2sNative
			 * 
			 * 			this.秘m.clear();
			 * 
			 */
			{}
		}
		秘setJS();
		for (int index = tab.length; --index >= 0;)
			tab[index] = null;
		count = 0;
	}

	/**
	 * Creates a shallow copy of this hashtable. All the structure of the hashtable
	 * itself is copied, but the keys and values are not cloned. This is a
	 * relatively expensive operation.
	 *
	 * @return a clone of the hashtable
	 */
	@Override
	public synchronized Object clone() {
		try {
			Hashtable<?, ?> t = (Hashtable<?, ?>) super.clone();
			t.table = new Entry<?, ?>[table.length];
			for (int i = table.length; i-- > 0;) {
				t.table[i] = (table[i] != null) ? (Entry<?, ?>) table[i].clone() : null;
			}
			t.keySet = null;
			t.entrySet = null;
			t.values = null;
			t.modCount = 0;
			if (秘isSimple(this)) {
				t.秘setJS();
				@SuppressWarnings("unused")
				Hashtable me = this;
				// evict is for afterNodeAccess, which is not public
				/**
				 * @j2sNative 
				 * me.秘m.forEach(function(value, key) { 
				 * 		t.秘m.set(key, value); t.modCount++; 
				 * });
				 */
				{}
			} else {
				t.秘m = null;
			}
			return t;
		} catch (CloneNotSupportedException e) {
			// this shouldn't happen, since we are Cloneable
			throw new InternalError(e);
		}
	}

    /**
     * Returns a string representation of this <tt>Hashtable</tt> object
     * in the form of a set of entries, enclosed in braces and separated
     * by the ASCII characters "<tt>,&nbsp;</tt>" (comma and space). Each
     * entry is rendered as the key, an equals sign <tt>=</tt>, and the
     * associated element, where the <tt>toString</tt> method is used to
     * convert the key and element to strings.
     *
     * @return  a string representation of this hashtable
     */
    @Override
	public synchronized String toString() {
        int max = size() - 1;
        if (max == -1)
            return "{}";

        StringBuilder sb = new StringBuilder();
        Iterator<Map.Entry<K,V>> it = entrySet().iterator();

        sb.append('{');
        for (int i = 0; ; i++) {
            Map.Entry<K,V> e = it.next();
            K key = e.getKey();
            V value = e.getValue();
            sb.append(key   == this ? "(this Map)" : key.toString());
            sb.append('=');
            sb.append(value == this ? "(this Map)" : value.toString());

            if (i == max)
                return sb.append('}').toString();
            sb.append(", ");
        }
    }

    // Comparison and hashing

    /**
     * Compares the specified Object with this Map for equality,
     * as per the definition in the Map interface.
     *
     * @param  o object to be compared for equality with this hashtable
     * @return true if the specified Object is equal to this Map
     * @see Map#equals(Object)
     * @since 1.2
     */
    @Override
	public synchronized boolean equals(Object o) {
        if (o == this)
            return true;

        if (!(o instanceof Map))
            return false;
        Map<?,?> t = (Map<?,?>) o;
        if (t.size() != size())
            return false;

        try {
            Iterator<Map.Entry<K,V>> i = entrySet().iterator();
            while (i.hasNext()) {
                Map.Entry<K,V> e = i.next();
                K key = e.getKey();
                V value = e.getValue();
                if (value == null) {
                    if (!(t.get(key)==null && t.containsKey(key)))
                        return false;
                } else {
                    if (!value.equals(t.get(key)))
                        return false;
                }
            }
        } catch (ClassCastException unused)   {
            return false;
        } catch (NullPointerException unused) {
            return false;
        }

        return true;
    }

    /**
     * Returns the hash code value for this Map as per the definition in the
     * Map interface.
     *
     * @see Map#hashCode()
     * @since 1.2
     */
    @Override
	public synchronized int hashCode() {
        /*
         * This code detects the recursion caused by computing the hash code
         * of a self-referential hash table and prevents the stack overflow
         * that would otherwise result.  This allows certain 1.1-era
         * applets with self-referential hash tables to work.  This code
         * abuses the loadFactor field to do double-duty as a hashCode
         * in progress flag, so as not to worsen the space performance.
         * A negative load factor indicates that hash code computation is
         * in progress.
         */
        int h = 0;
        if (count == 0 || loadFactor < 0)
            return h;  // Returns zero

        loadFactor = -loadFactor;  // Mark hashCode computation in progress
        Entry<?,?>[] tab = table;
        for (Entry<?,?> entry : tab) {
            while (entry != null) {
                h += entry.hashCode();
                entry = entry.next_;
            }
        }

        loadFactor = -loadFactor;  // Mark hashCode computation complete

        return h;
    }

    /**
     * Hashtable bucket collision list entry
     */
    private static class Entry<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Entry<K,V> next_;

        protected Entry(int hash, K key, V value, Entry<K,V> next) {
            this.hash = hash;
            this.key =  key;
            this.value = value;
            this.next_ = next;
        } 

        @Override
		protected Object clone() {
            return new Entry<>(hash, key, value,
                                  (next_==null ? null : (Entry<K,V>) next_.clone()));
        }

        // Map.Entry Ops

        @Override
		public K getKey() {
            return key;
        }

        @Override
		public V getValue() {
            return value;
        }

        @Override
		public V setValue(V value) {
            if (value == null)
                throw new NullPointerException();

            V oldValue = this.value;
            this.value = value;
            return oldValue;
        }

        @Override
		public boolean equals(Object o) {
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry<?,?> e = (Map.Entry<?,?>)o;

            return (key==null ? e.getKey()==null : key.equals(e.getKey())) &&
               (value==null ? e.getValue()==null : value.equals(e.getValue()));
        }

        @Override
		public int hashCode() {
            return hash ^ (value == null ? 0 : value.hashCode());
        }

        @Override
		public String toString() {
            return key.toString()+"="+value.toString();
        }
    }


    private <T> Enumeration<T> getEnumeration(int type) {

        if (size() == 0) {
            return Collections.emptyEnumeration();
        } else {
            return new Enumerator<>(this, type, false);
        }
    }

    <T> Iterator<T> getIterator(int type) {

        if (size() == 0) {
            return Collections.emptyIterator();
        } else {
            return new Enumerator<>(this, type, true);
        }
    }

    // Views

    /**
     * Each of these fields are initialized to contain an instance of the
     * appropriate view the first time this view is requested.  The views are
     * stateless, so there's no reason to create more than one of each.
     */
    private transient volatile Set<K> keySet;
    private transient volatile Set<Map.Entry<K,V>> entrySet;
    private transient volatile Collection<V> values;

    /**
     * Returns a {@link Set} view of the keys contained in this map.
     * The set is backed by the map, so changes to the map are
     * reflected in the set, and vice-versa.  If the map is modified
     * while an iteration over the set is in progress (except through
     * the iterator's own <tt>remove</tt> operation), the results of
     * the iteration are undefined.  The set supports element removal,
     * which removes the corresponding mapping from the map, via the
     * <tt>Iterator.remove</tt>, <tt>Set.remove</tt>,
     * <tt>removeAll</tt>, <tt>retainAll</tt>, and <tt>clear</tt>
     * operations.  It does not support the <tt>add</tt> or <tt>addAll</tt>
     * operations.
     *
     * @since 1.2
     */
    @Override
	public Set<K> keySet() {
        if (keySet == null)
            keySet = new KeySet(this);
        return keySet;
    }

    private static class KeySet<K> extends AbstractSet<K> {
    	private Hashtable ht;
        public KeySet(Hashtable ht) {
        	this.ht = ht;
		}
		@Override
		public Iterator<K> iterator() {
            return ht.getIterator(KEYS);
        }
        @Override
		public int size() {
            return ht.size();
        }
        @Override
		public boolean contains(Object o) {
            return ht.containsKey(o);
        }
        @Override
		public boolean remove(Object o) {
            return ht.remove(o) != null;
        }
        @Override
		public void clear() {
            ht.clear();
        }
    }

    /**
     * Returns a {@link Set} view of the mappings contained in this map.
     * The set is backed by the map, so changes to the map are
     * reflected in the set, and vice-versa.  If the map is modified
     * while an iteration over the set is in progress (except through
     * the iterator's own <tt>remove</tt> operation, or through the
     * <tt>setValue</tt> operation on a map entry returned by the
     * iterator) the results of the iteration are undefined.  The set
     * supports element removal, which removes the corresponding
     * mapping from the map, via the <tt>Iterator.remove</tt>,
     * <tt>Set.remove</tt>, <tt>removeAll</tt>, <tt>retainAll</tt> and
     * <tt>clear</tt> operations.  It does not support the
     * <tt>add</tt> or <tt>addAll</tt> operations.
     *
     * @since 1.2
     */
    @Override
	public Set<Map.Entry<K,V>> entrySet() {
        if (entrySet==null)
            entrySet = new EntrySet(this);
        return entrySet;
    }

    private static class EntrySet<K,V> extends AbstractSet<Map.Entry<K,V>> {
        private Hashtable ht;

		public EntrySet(Hashtable ht) {
			this.ht = ht;
		}

		@Override
		public Iterator<Map.Entry<K,V>> iterator() {
            return ht.getIterator(ENTRIES);
        }

        @Override
		public boolean add(Map.Entry<K,V> o) {
            return super.add(o);
        }

        @Override
		public boolean contains(Object o) {
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry<?,?> entry = (Map.Entry<?,?>)o;
            Object key = entry.getKey();
            
            switch (秘hasKey(ht, key)) {
            case NOT_SIMPLE:
            	break;
            case INVALID_KEY:
    			秘ensureJavaMap(ht);
    			break;
            case HAS_KEY:
				Object value = entry.getValue();
				Object v = ht.get(key);
				return (value == v || value != null && value.equals(key));
            case NO_SUCH_KEY:
            	return false;
            }
            Entry<?,?>[] tab = ht.table;
            int hash = key.hashCode();
            int index = (hash & 0x7FFFFFFF) % tab.length;

            for (Entry<?,?> e = tab[index]; e != null; e = e.next_)
                if (e.hash==hash && e.equals(entry))
                    return true;
            return false;

        }

        @Override
		public boolean remove(Object o) {
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry<?,?> entry = (Map.Entry<?,?>) o;
            Object key = entry.getKey();
            
            switch (秘hasKey(ht, key)) {
            case NOT_SIMPLE:
	            break;
            case INVALID_KEY:
    			秘ensureJavaMap(ht);
    			break;
            case HAS_KEY:
				Object value = entry.getValue();
				if (value == null)
					return false;
				Object v = ht.get(key);
				if (v == value || v.equals(value)) {
					ht.remove(key);
					return true;
				}
				return false;
            case NO_SUCH_KEY:
				return false;
			}
            Entry<?,?>[] tab = ht.table;
            int hash = key.hashCode();
            int index = (hash & 0x7FFFFFFF) % tab.length;

            Entry<K,V> e = (Entry<K,V>)tab[index];
            for(Entry<K,V> prev = null; e != null; prev = e, e = e.next_) {
                if (e.hash==hash && e.equals(entry)) {
                    ht.modCount++;
                    if (prev != null)
                        prev.next_ = e.next_;
                    else
                        tab[index] = e.next_;

                    ht.count--;
                    e.value = null;
                    return true;
                }
            }
            return false;
		}

        @Override
		public int size() {
            return ht.size();
        }

        @Override
		public void clear() {
            ht.clear();
        }
    }

    /**
     * Returns a {@link Collection} view of the values contained in this map.
     * The collection is backed by the map, so changes to the map are
     * reflected in the collection, and vice-versa.  If the map is
     * modified while an iteration over the collection is in progress
     * (except through the iterator's own <tt>remove</tt> operation),
     * the results of the iteration are undefined.  The collection
     * supports element removal, which removes the corresponding
     * mapping from the map, via the <tt>Iterator.remove</tt>,
     * <tt>Collection.remove</tt>, <tt>removeAll</tt>,
     * <tt>retainAll</tt> and <tt>clear</tt> operations.  It does not
     * support the <tt>add</tt> or <tt>addAll</tt> operations.
     *
     * @since 1.2
     */
    @Override
	public Collection<V> values() {
    		
        if (values==null)
            values = new ValueCollection(this);
        return values;
    }

    private static class ValueCollection<V> extends AbstractCollection<V> {
    	
        private Hashtable ht;
		public ValueCollection(Hashtable ht) {
        	this.ht = ht;
		}
		@Override
		public Iterator<V> iterator() {
            return ht.getIterator(VALUES);
        }
        @Override
		public int size() {
            return ht.size();
        }
        @Override
		public boolean contains(Object o) {
            return ht.containsValue(o);
        }
        @Override
		public void clear() {
            ht.clear();
        }
        
    }

    // Types of Enumerations/Iterations
    private static final int KEYS = 0;
    private static final int VALUES = 1;
    private static final int ENTRIES = 2;

    /**
     * A hashtable enumerator class.  This class implements both the
     * Enumeration and Iterator interfaces, but individual instances
     * can be created with the Iterator methods disabled.  This is necessary
     * to avoid unintentionally increasing the capabilities granted a user
     * by passing an Enumeration.
     */
    private static class Enumerator<T> implements Enumeration<T>, Iterator<T> {
    	private Entry<?,?>[] table;
        private int index;
        private Entry<?,?> next_;
        private Entry<?,?> current;
        private int type;
		@SuppressWarnings("unused")
		private Iterator jsMapIterator;
		
		private Hashtable ht;

        /**
         * Indicates whether this Enumerator is serving as an Iterator
         * or an Enumeration.  (true -> Iterator).
         */
        private boolean isIterator;

        /**
         * The modCount value that the iterator believes that the backing
         * Hashtable should have.  If this expectation is violated, the iterator
         * has detected concurrent modification.
         */
        private int expectedModCount;

        Enumerator(Hashtable ht, int type, boolean iterator) {
        	this.ht = ht;
        	this.table = ht.table;
        	this.index = ht.table.length;
            this.type = type;
            this.isIterator = iterator;
            expectedModCount = ht.modCount;
			if(秘isSimple(ht)) {
				// note that unlike HashMap, this implementation
				// initializes with the next element in place
				@SuppressWarnings("unused") Map m = ht.秘m;
				/**
				 * @j2sNative
				 * 
				 * this.jsMapIterator = m.entries();
				 * this.next_ = this.jsMapIterator.next(); 
				 * 
				 */
				{}
			}
        }

        @Override
		public boolean hasMoreElements() {
			if(秘isSimple(ht)) {
				boolean b = false;
				/** 
				 * @j2sNative 
				 * 
				 * b = this.next_ && !this.next_.done 
				 */
				{}
				return b;
			} else {				
	            Entry<?,?> e = next_;
	            int i = index;
	            Entry<?,?>[] t = table;
	            /* Use locals for faster loop iteration */
	            while (e == null && i > 0) {
	                e = t[--i];
	            }
	            next_ = e;
	            index = i;
	            return e != null;
			}
        }

		@Override
		public T nextElement() {
			Entry<?, ?> node = next_;
			if (秘isSimple(ht)) {
				@SuppressWarnings("unused")
				int t = type;
				current = node;
				Entry<?, ?> n = null;
				/** @j2sNative 
				 * 
				 * n = this.jsMapIterator.next() || null;
				 */
				{}
				next_ = n;
				if (node != null) {
					Object k = null;
					Object v = null;
					boolean done = false;
					/**
					 * @j2sNative
					 * 
					 * 			done = node.done; 
					 * 			if (!done) { 
					 * 				if (t < 2) return node.value[t];
					 * 				k = node.value[0];
					 *              v = node.value[1];
					 *            }
					 */
					{}
					if (!done) {
						return (T) new Entry<Object, Object>(0, k, v, null) {

							@Override
							public Object setValue(Object value) {
								return ht.put(getKey(), value);
							}
						};
					}
				}
			} else {
				int i = index;
				Entry<?, ?>[] t = table;
				/* Use locals for faster loop iteration */
				while (node == null && i > 0) {
					node = t[--i];
				}
				next_ = node;
				index = i;
				if (node != null) {
					Entry<?, ?> e = current = next_;
					next_ = e.next_;
					return type == KEYS ? (T) e.key : (type == VALUES ? (T) e.value : (T) e);
				}
			}
			throw new NoSuchElementException("Hashtable Enumerator");
		}

        // Iterator methods
        @Override
		public boolean hasNext() {
            return hasMoreElements();
        }

        @Override
		public T next() {
            if (ht.modCount != expectedModCount)
                throw new ConcurrentModificationException();
            return nextElement();
        }

		@Override
		public void remove() {
			if (!isIterator)
				throw new UnsupportedOperationException();
			Entry<?, ?> p = current;
			if (p == null)
				throw new IllegalStateException("Hashtable Enumerator");
			if (ht.modCount != expectedModCount)
				throw new ConcurrentModificationException();

			if (秘isSimple(ht)) {
				Object key = null;
				/**
				 * @j2sNative
				 * 
				 * 			key = p.value[0];
				 */
				{}
				ht.remove(key);
				expectedModCount++;
			} else {

				synchronized (ht) {
					Entry<?, ?>[] tab = ht.table;
					int index = (current.hash & 0x7FFFFFFF) % tab.length;

					Entry<?, ?> e = (Entry<?, ?>) tab[index];
					for (Entry prev = null; e != null; prev = e, e = e.next_) {
						if (e == current) {
							ht.modCount++;
							expectedModCount++;
							if (prev == null)
								tab[index] = e.next_;
							else
								prev.next_ = e.next_;
							ht.count--;
							current = null;
							return;
						}
					}
					throw new ConcurrentModificationException();
				}
			}
		}
    }
    
	protected void 秘setJS() {		
		if (秘allowJS && USE_SIMPLE) {
			Map<String, Object> m = null;
			/** @j2sNative 
			 * 
			 * m = new Map();
			 */
			{}
			秘m =  m;			
		} else {
			秘m = null;
		}
		
	}

	static Object 秘get(Object map, Object key) {
		/**
		 * @j2sNative
		 * 
		 * return map.秘m.get(key == null ? null : key + "")
		 */
		{
		return null;
		}
	}

	static void 秘set(Map map, Object key, Object value) {
		/**
		 * @j2sNative
		 * 
		 * map.秘m.set(key == null ? null : key + "", value)
		 */
	}

	/**
	 * Determine the type of key within this map.
	 *  
	 * We allow null keys for HashMap, but other than that only String keys,
	 * because although JavaScript Map allows for non-string values, it cannot
	 * detect the equivalence of Integer.valueOf(n) for a given n.
	 * 
	 * @param map
	 * @param key
	 * @return 0 (NOT_SIMPLE), 1 (INVALID_KEY), 2 (NO_SUCH_KEY), or 3 (HAS_KEY)
	 */
	static int 秘hasKey(Map map, Object key) { 
		
		/**
		 * 
		 * Note that JavaScript Map.has() will distinguish between new String("") and "". 
		 * And yet Java will not. So the "1" return here must be handled as "invalid -- convert now"
		 * even if it is just a remove or contains check.
		 * 
		 * @j2sNative
		 * 
		 * 			return (!map.秘m ? 0 : key != null && typeof key != "string" 
		 *                ? 1 : map.秘m.has(key) ? 3 : 2); 
		 *
		 */
		{
			return Map.NOT_SIMPLE;
		}
	}

	static boolean 秘isSimple(Map map) {
		/**
		 * @j2sNative
		 * 
		 * 	return !!map.秘m;
		 */
		{
			return false;
		}
		
	}

	/**
	 * We've had our fun, now we have to go back to Java...
	 * 
	 */
	static void 秘ensureJavaMap(Map map) {
			/**
			 * @j2sNative
			 * 
			 * 		if (map.秘m) {
			 * 			var m = map.秘m; 
			 *          map.秘m = null;
			 *          m.forEach(function(value, key){map.put(key, value);}); 
			 *          m.clear();
			 * 		}
			 */
	}
	
	/**
	 * flag developers can use to switch off all use of simple JavaScript Map objects
	 * 
	 * not final, so that it can be managed on the fly in SwingJS
	 */
	public static boolean USE_SIMPLE = true;


	Map<String, Object> 秘m;
	boolean 秘allowJS = false;


}
