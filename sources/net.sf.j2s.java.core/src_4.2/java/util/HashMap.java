/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package java.util;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * HashMap is an implementation of Map. All optional operations are supported,
 * adding and removing. Keys and values can be any objects.
 */
public class HashMap<K, V> extends AbstractMap<K, V> implements Map<K, V>, Cloneable, Serializable {
	private static final long serialVersionUID = 362498820763181265L;

	transient int elementCount;

	transient Entry<K, V>[] elementData;

	float loadFactor;

	int threshold;

	transient int modCount = 0;

	/**
	 * Holds cached entrySet(). Note that AbstractMap fields are used for keySet()
	 * and values().
	 */
	transient Set<Map.Entry<K, V>> entrySet;

	private static final int DEFAULT_SIZE = 16;

	static class Entry<K, V> extends MapEntry<K, V> {
		final int origKeyHash;
		Entry<K, V> next;

		Entry(K theKey, V theValue) {
			super(theKey, theValue);
			origKeyHash = (theKey == null ? 0 : theKey.hashCode());
		}

		@Override
		@SuppressWarnings("unchecked")
		public Object clone() {
			Entry<K, V> entry = (Entry<K, V>) super.clone();
			if (next != null) {
				entry.next = (Entry<K, V>) next.clone();
			}
			return entry;
		}
	}

	static class HashMapIterator<E, KT, VT> implements Iterator<E> {
		
		Iterator jsMapIterator;
		boolean isSimple;

		private int index = 0;

		int expectedModCount;

		final MapEntry.Type<E, KT, VT> type;

		boolean canRemove = false;

		Entry<KT, VT> entry;

		Entry<KT, VT> lastEntry;

		final HashMap<KT, VT> associatedMap;

		HashMapIterator(MapEntry.Type<E, KT, VT> value, HashMap<KT, VT> hm) {
			associatedMap = hm;
			type = value;
			expectedModCount = hm.modCount;
			lastEntry = entry = null;
			isSimple = 秘isSimple(associatedMap);
			if (isSimple) {
				@SuppressWarnings("unused") Map m = associatedMap.秘m;
				/**
				 * @j2sNative
				 * 
				 * this.jsMapIterator = m.entries();
				 * this.entry = this.jsMapIterator.next(); 
				 * 
				 */
				{}
			}

		}

		@Override
		public boolean hasNext() {
			if (isSimple) {
				if (entry == null) {
					return false;
				}
				boolean isDone = false;
				/** @j2sNative 
				  isDone = this.entry.done;
				  */
				{}
				return !isDone;
			}

			if (entry != null) {
				return true;
			}
			while (index < associatedMap.elementData.length) {
				if (associatedMap.elementData[index] == null) {
					index++;
				} else {
					return true;
				}
			}
			return false;
		}

		void checkConcurrentMod() throws ConcurrentModificationException {
			if (expectedModCount != associatedMap.modCount) {
				throw new ConcurrentModificationException();
			}
		}

		@Override
		public E next() {
			checkConcurrentMod();
			if (!hasNext()) {
				throw new NoSuchElementException();
			}
			MapEntry<KT, VT> result = null;
			if(isSimple) {
				/** @j2sNative 
				 *     result = this.entry;
				 *     this.entry = this.jsMapIterator.next() || null;
				 */
				{}
			} else if (entry == null) {
				result = lastEntry = associatedMap.elementData[index++];
				entry = lastEntry.next;
			} else {
				if (lastEntry.next != entry) {
					lastEntry = lastEntry.next;
				}
				result = entry;
				entry = entry.next;
			}
			canRemove = true;
			return type.get(result);
		}

		@Override
		public void remove() {
			checkConcurrentMod();
			if (!canRemove) {
				throw new IllegalStateException();
			}

			canRemove = false;
			associatedMap.modCount++;
			if (lastEntry.next == entry) {
				while (associatedMap.elementData[--index] == null) {
					;
				}
				associatedMap.elementData[index] = associatedMap.elementData[index].next;
				entry = null;
			} else {
				lastEntry.next = entry;
			}
			associatedMap.elementCount--;
			expectedModCount++;
		}
	}

	static class HashMapEntrySet<KT, VT> extends AbstractSet<Map.Entry<KT, VT>> {
		private final HashMap<KT, VT> associatedMap;

		public HashMapEntrySet(HashMap<KT, VT> hm) {
			associatedMap = hm;
		}

		HashMap<KT, VT> hashMap() {
			return associatedMap;
		}

		@Override
		public int size() {
			return associatedMap.elementCount;
		}

		@Override
		public void clear() {
			associatedMap.clear();
		}

		@Override
		public boolean remove(Object object) {
			if (contains(object)) {
				associatedMap.remove(((Map.Entry) object).getKey());
				return true;
			}
			return false;
		}

		@Override
		public boolean contains(Object object) {
			if (!(object instanceof Map.Entry))
				return false;
			Object key = ((Map.Entry) object).getKey();
			if (!associatedMap.containsKey(key))
				return false;
			if (秘isSimple(associatedMap)) {
				Object value = ((Map.Entry) object).getValue();
				Object v = associatedMap.get(key);
				return (value == v || value != null && value.equals(v));
			}
			Entry<KT, VT> entry = associatedMap.getJavaEntry(((Map.Entry) object).getKey());
			return object.equals(entry);

		}

		@Override
		public Iterator<Map.Entry<KT, VT>> iterator() {
			return new HashMapIterator<Map.Entry<KT, VT>, KT, VT>(new MapEntry.Type<Map.Entry<KT, VT>, KT, VT>() {
				@Override
				public Map.Entry<KT, VT> get(MapEntry<KT, VT> entry) {
					if (秘isSimple(associatedMap)) {
						KT key = null;
						VT value = null;
						/**
						 * @j2sNative
						 * key = entry.value[0];
						 * value = entry.value[1];
						 */
						{}							
						return new Entry(key, value);
					}
					return entry;
				}
			}, associatedMap);
		}
	}

	/**
	 * Create a new element array
	 * 
	 * @param s
	 * @return Reference to the element array
	 */
	@SuppressWarnings("unchecked")
	Entry<K, V>[] newElementArray(int s) {
		return new Entry[s];
	}

	/**
	 * Constructs a new empty instance of HashMap.
	 * 
	 * @j2sIgnoreSuperConstructor
	 */
	public HashMap() {
		// the sole constructor for Jmol
		int size = DEFAULT_SIZE;
		float loadFactor = 0.75f;
		/**
		 * 
		 * @j2sNative
		 * 
		 * 			size = (arguments[0] || size); loadFactor = (arguments[1] ||
		 *            0.75);
		 * 
		 */
		{
		}
		initHM(size, loadFactor);
	}

	/**
	 * Constructs a new instance of HashMap with the specified capacity.
	 * 
	 * @param capacity the initial capacity of this HashMap
	 * 
	 * @exception IllegalArgumentException when the capacity is less than zero
	 * 
	 * @j2sIgnore
	 */
	public HashMap(int capacity) {
//    	initHM(capacity, 0.75f);
	}

	/**
	 * Constructs a new instance of HashMap with the specified capacity and load
	 * factor.
	 * 
	 * 
	 * @param capacity   the initial capacity
	 * @param loadFactor the initial load factor
	 * 
	 * @exception IllegalArgumentException when the capacity is less than zero or
	 *                                     the load factor is less or equal to zero
	 * 
	 * @j2sIgnore
	 */
	public HashMap(int capacity, float loadFactor) {
		initHM(capacity, loadFactor);
	}

	@SuppressWarnings("unused")
	private void initHM(int capacity, float loadFactor) {
		Map<? extends K, ? extends V> map = null;
		/**
		 * @j2sNative
		 * 
		 * 			if (typeof capacity == "object") { map = capacity; this.秘allowJS =
		 *            map.秘allowJS; capacity = (map.size() < 6 ? 11 : map.size() * 2); }
		 *            else { this.秘allowJS = true; } !capacity && (capacity = 0);
		 *            !loadFactor && (loadFactor = 0.75);
		 */
		{
		}
		if (capacity == 0)
			capacity = DEFAULT_SIZE;
		if (capacity >= 0) {
			elementCount = 0;
			elementData = newElementArray(capacity == 0 ? 1 : capacity);
			this.loadFactor = loadFactor;
			computeMaxSize();
		} else {
			throw new IllegalArgumentException();
		}
		秘setJS();
		if (map != null) {
			putAll(map);
		}
	}

	/**
	 * Constructs a new instance of HashMap containing the mappings from the
	 * specified Map.
	 * 
	 * @param map the mappings to add
	 * 
	 * @j2sIgnore
	 */
	public HashMap(Map<? extends K, ? extends V> map) {
		this(map.size() < 6 ? 11 : map.size() * 2);
		putMapEntries(map, false);
	}

	void putMapEntries(Map<? extends K, ? extends V> mOriginal, boolean evict) {
		int n = mOriginal.size();
		if (n == 0)
			return;
		K key = null;
		V value = null;
		if (秘isSimple(this) && 秘isSimple(mOriginal)) {
			HashMap me = this;
			int hash = NO_RETURN;
			int mode = 秘hasKey(me, key);
			/**
			 * @j2sNative mOriginal.秘m.forEach(function(value, key) {
			 * 			me.putJSVal(hash, key, value, false, evict, mode);
			 *		});
			 */
			{
			}
			return;
		}
		if (秘isSimple(mOriginal)) {
			HashMap me = this;
			/**
			 * @j2sNative mOriginal.秘m.forEach(function(value, key) {
			 *       me.putJavaValue(key, value);
			 *   });
			 */
			{
			}
			return;
		}
		秘m = null;
		for (Map.Entry<? extends K, ? extends V> e : mOriginal.entrySet()) {
			key = e.getKey();
			value = e.getValue();
			putJavaValue(key, value);
		}
	}

	/**
	 * Reset to initial default state. Called by clone and readObject.
	 */
	void reinitialize() {
		elementData = null;
		entrySet = null;
		keySet = null;
		values = null;
		modCount = 0;
		threshold = 0;
		elementCount = 0;
		秘setJS();
	}

	/**
	 * Removes all mappings from this HashMap, leaving it empty.
	 * 
	 * @see #isEmpty
	 * @see #size
	 */
	@Override
	public void clear() {
		modCount++;
		if (秘isSimple(this)) {
			/**
			 * @j2sNative
			 * 
			 * 			this.秘m.clear();
			 * 
			 */
			{
			}
		}
		秘setJS();
		if (elementCount > 0) {
			elementCount = 0;
			Arrays.fill(elementData, null);
			modCount++;
		}
	}

	/**
	 * Answers a new HashMap with the same mappings and size as this HashMap.
	 * 
	 * @return a shallow copy of this HashMap
	 * 
	 * @see java.lang.Cloneable
	 */
	@Override
	@SuppressWarnings("unchecked")
	public Object clone() {
		HashMap<K, V> result;
		try {
			result = (HashMap<K, V>) super.clone();
		} catch (CloneNotSupportedException e) {
			return null;
		}
		result.reinitialize();
		result.putMapEntries(this, false);
		return result;
	}

	private void computeMaxSize() {
		threshold = (int) (elementData.length * loadFactor);
	}

	/**
	 * Searches this HashMap for the specified key.
	 * 
	 * @param key the object to search for
	 * @return true if <code>key</code> is a key of this HashMap, false otherwise
	 */
	@Override
	public boolean containsKey(Object key) {
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
		return (getJavaEntry(key) != null);
	}

	/**
	 * Tests two keys for equality. This method just calls key.equals but can be
	 * overridden.
	 * 
	 * @param k1 first key to compare
	 * @param k2 second key to compare
	 * @return true if the keys are considered equal
	 */
	boolean keysEqual(Object k1, Entry<K, V> entry) {
		int k1Hash = k1 == null ? 0 : k1.hashCode();
		if (k1Hash != entry.origKeyHash) {
			return false;
		}
		if (k1 == null && entry.key == null) {
			return true;
		}
		assert k1 != null;
		return k1.equals(entry.key);
	}

	/**
	 * Searches this HashMap for the specified value.
	 * 
	 * @param value the object to search for
	 * @return true if <code>value</code> is a value of this HashMap, false
	 *         otherwise
	 */
	@Override
	public boolean containsValue(Object value) {
		if (秘isSimple(this)) {
			@SuppressWarnings("unused")
			Map m = 秘m;
			/**
			 * @j2sNative
			 * 
			 * 			var iter = m.values(); 
			 * 			for (var n = iter.next(); !n.done; n = iter.next()) { 
			 * 			  if (n.value == value || n.value.equals$O(value)) {
			 *            	return true; 
			 *            } 
			 *          }
			 * 
			 */
			{
			}
		} else if (value != null) {
			for (int i = elementData.length; --i >= 0;) {
				Entry<K, V> entry = elementData[i];
				while (entry != null) {
					if (value.equals(entry.value)) {
						return true;
					}
					entry = entry.next;
				}
			}
		} else {
			for (int i = elementData.length; --i >= 0;) {
				Entry<K, V> entry = elementData[i];
				while (entry != null) {
					if (entry.value == null) {
						return true;
					}
					entry = entry.next;
				}
			}
		}
		return false;
	}

	/**
	 * Answers a Set of the mappings contained in this HashMap. Each element in the
	 * set is a Map.Entry. The set is backed by this HashMap so changes to one are
	 * reflected by the other. The set does not support adding.
	 * 
	 * @return a Set of the mappings
	 */
	@Override
	public Set<Map.Entry<K, V>> entrySet() {
		Set<Map.Entry<K, V>> es;
		return (es = entrySet) == null ? (entrySet = new HashMapEntrySet(this)) : es;
	}

	/**
	 * Answers the value of the mapping with the specified key.
	 * 
	 * @param key the key
	 * @return the value of the mapping with the specified key
	 */
	@Override
	public V get(Object key) {

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

		Entry<K, V> m = getJavaEntry(key);
		return (m == null ? null : m.value);
	}

	Entry<K, V> getJavaEntry(Object key) {
		int index = getModuloHash(key);
		return findJavaEntry(key, index);
	}

	int getModuloHash(Object key) {
		if (key == null) {
			return 0;
		}
		return (key.hashCode() & 0x7FFFFFFF) % elementData.length;
	}

	Entry<K, V> findJavaEntry(Object key, int index) {
		Entry<K, V> m;
		m = elementData[index];
		if (key != null) {
			while (m != null && !keysEqual(key, m)) {
				m = m.next;
			}
		} else {
			while (m != null && m.key != null) {
				m = m.next;
			}
		}
		return m;
	}

	/**
	 * Answers if this HashMap has no elements, a size of zero.
	 * 
	 * @return true if this HashMap has no elements, false otherwise
	 * 
	 * @see #size
	 */
	@Override
	public boolean isEmpty() {
		return size() == 0;
	}

	/**
	 * Answers a Set of the keys contained in this HashMap. The set is backed by
	 * this HashMap so changes to one are reflected by the other. The set does not
	 * support adding.
	 * 
	 * @return a Set of the keys
	 */
	@Override
	public Set<K> keySet() {
		if (keySet == null) {
			keySet = new AbstractSet<K>() {
				@Override
				public boolean contains(Object object) {
					return containsKey(object);
				}

				@Override
				public int size() {
					return HashMap.this.size();
				}

				@Override
				public void clear() {
					HashMap.this.clear();
				}

				@Override
				public boolean remove(Object key) {
					if (!containsKey(key))
						return false;
					HashMap.this.remove(key);
					return true;
				}

				@Override
				public Iterator<K> iterator() {
					return new HashMapIterator<K, K, V>(new MapEntry.Type<K, K, V>() {
						@Override
						public K get(MapEntry<K, V> entry) {
							if (秘isSimple(HashMap.this)) {
								/**
								 * @j2sNative
								 * return (entry == null ? null : entry.value[0]);
								 */
								{}							
							}
							return entry.key;
						}
					}, HashMap.this);
				}
			};
		}
		return keySet;
	}

	/**
	 * Maps the specified key to the specified value.
	 * 
	 * @param key   the key
	 * @param value the value
	 * @return the value of any previous mapping with the specified key or null if
	 *         there was no mapping
	 */
	@Override
	public V put(K key, V value) {
		int type = 秘hasKey(this, key);
		switch (type) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
		case HAS_KEY:
			return putJSVal(RET_VALUE, key, value, false, true, type);
		}
		return putJavaValue(key, value);
	}

	protected V putJavaValue(K key, V value) {
		int index = getModuloHash(key);
		Entry<K, V> entry = findJavaEntry(key, index);

		if (entry == null) {
			modCount++;
			if (++elementCount > threshold) {
				rehash();
				index = key == null ? 0 : (key.hashCode() & 0x7FFFFFFF) % elementData.length;
			}
			entry = createEntry(key, index, value);
			return null;
		}

		V result = entry.value;
		entry.value = value;
		return result;
	}

	Entry<K, V> createEntry(K key, int index, V value) {
		Entry<K, V> entry = new Entry<K, V>(key, value);
		entry.next = elementData[index];
		elementData[index] = entry;
		return entry;
	}

	/**
	 * Copies all the mappings in the given map to this map. These mappings will
	 * replace all mappings that this map had for any of the keys currently in the
	 * given map.
	 * 
	 * @param map the Map to copy mappings from
	 * @throws NullPointerException if the given map is null
	 */
	@Override
	public void putAll(Map<? extends K, ? extends V> map) {
		if (!map.isEmpty())
			for (Map.Entry<? extends K, ? extends V> entry : map.entrySet()) {
				put(entry.getKey(), entry.getValue());
			}
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
	V putJSVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict, int mode) {

		V v0 = null;
		switch (mode) {
		case NO_SUCH_KEY:
		/**
		 * @j2sNative
		 * 
		 * 			this.秘m.set(key, value);
		 */
		{
		}
			++modCount;
			break;
		case HAS_KEY:
			if (hash != NO_RETURN) {
				/**
				 * @j2sNative v0 = this.秘m.get(key) || null;
				 */
				{
				}
			}
			if (!onlyIfAbsent || v0 == null) {
				/**
				 * @j2sNative
				 * 
				 * 			this.秘m.set(key, value);
				 */
				{
				}
			}
			break;
		}
		return v0;
	}

	void rehashImpl(int capacity) {
		int length = (capacity == 0 ? 1 : capacity << 1);

		Entry<K, V>[] newData = newElementArray(length);
		for (int i = 0; i < elementData.length; i++) {
			Entry<K, V> entry = elementData[i];
			while (entry != null) {
				Object key = entry.key;
				int index = key == null ? 0 : (key.hashCode() & 0x7FFFFFFF) % length;
				Entry<K, V> next = entry.next;
				entry.next = newData[index];
				newData[index] = entry;
				entry = next;
			}
		}
		elementData = newData;
		computeMaxSize();
	}

	void rehash() {
		rehashImpl(elementData.length);
	}

	/**
	 * Removes a mapping with the specified key from this HashMap.
	 * 
	 * @param key the key of the mapping to remove
	 * @return the value of the removed mapping or null if key is not a key in this
	 *         HashMap
	 */
	@Override
	public V remove(Object key) {
		switch (秘hasKey(this, key)) {
		case NOT_SIMPLE:
			break;
		case INVALID_KEY:
			秘ensureJavaMap(this);
			break;
		case NO_SUCH_KEY:
			return null;
		case HAS_KEY:
			return (V) removeJSNode(RET_VALUE, key, null, false, true);
		}
		Entry<K, V> entry = removeJavaEntry(key);
		return (entry == null ? null : entry.value);
	}

	final Object removeJSNode(int hash, Object key, Object value, boolean matchValue, boolean movable) {
		V v = null;
		if (hash == RET_VALUE || matchValue) {
			/**
			 * @j2sNative v = this.秘m.get(key) || null;
			 * 
			 */
			{
			}
		}
		if (!matchValue || v == value || (value != null && value.equals(v))) {
			/**
			 * @j2sNative
			 * 
			 * 			this.秘m["delete"](key);
			 */
			{
			}
			++modCount;
			switch (hash) {
			case RET_VALUE:
				return v;
			case HAS_KEY:
				return "true";
			}
		}
		return null;
	}

	Entry<K, V> removeJavaEntry(Object key) {
		int index = 0;
		Entry<K, V> entry;
		Entry<K, V> last = null;
		if (key != null) {
			index = (key.hashCode() & 0x7FFFFFFF) % elementData.length;
			entry = elementData[index];
			while (entry != null && !keysEqual(key, entry)) {
				last = entry;
				entry = entry.next;
			}
		} else {
			entry = elementData[0];
			while (entry != null && entry.key != null) {
				last = entry;
				entry = entry.next;
			}
		}
		if (entry == null) {
			return null;
		}
		if (last == null) {
			elementData[index] = entry.next;
		} else {
			last.next = entry.next;
		}
		modCount++;
		elementCount--;
		return entry;
	}

	/**
	 * Answers the number of mappings in this HashMap.
	 * 
	 * @return the number of mappings in this HashMap
	 */
	@Override
	public int size() {
		/** @j2sNative 
		 * if (this.秘m)
		 *  return this.秘m.size;
		 */
		{}
		return elementCount;
	}

	/**
	 * Answers a Collection of the values contained in this HashMap. The collection
	 * is backed by this HashMap so changes to one are reflected by the other. The
	 * collection does not support adding.
	 * 
	 * @return a Collection of the values
	 */
	@Override
	public Collection<V> values() {
		if (values == null) {
			values = new AbstractCollection<V>() {
				@Override
				public boolean contains(Object object) {
					return containsValue(object);
				}

				@Override
				public int size() {
					return HashMap.this.size();
				}

				@Override
				public void clear() {
					HashMap.this.clear();
				}

				@Override
				public Iterator<V> iterator() {
					return new HashMapIterator<V, K, V>(new MapEntry.Type<V, K, V>() {
						@Override
						public V get(MapEntry<K, V> entry) {
							if (秘isSimple(HashMap.this)) {
								/**
								 * @j2sNative
								 * return (entry == null ? null : entry.value[1]);
								 */
								{}							
							}
							return entry.value;
						}
					}, HashMap.this);
				}
			};
		}
		return values;
	}

	protected void 秘setJS() {
		if (秘allowJS && USE_SIMPLE) {
			Map<String, Object> m = null;
			/**
			 * @j2sNative
			 * 
			 * 			m = new Map();
			 */
			{
			}
			秘m = m;
		} else {
			秘m = null;
		}
	}

	static Object 秘get(Object map, Object key) {
		/**
		 * @j2sNative
		 * 
		 * 			return map.秘m.get(key == null ? null : key + "");
		 */
		{
			return null;
		}
	}

	static void 秘set(Map map, Object key, Object value) {
		/**
		 * @j2sNative
		 * 
		 * 			map.秘m.set(key == null ? null : key + "", value);
		 */
		{
		}
	}

	/**
	 * Determine the type of key within this map.
	 * 
	 * We allow null keys for HashMap, but other than that only String keys, because
	 * although JavaScript Map allows for non-string values, it cannot detect the
	 * equivalence of Integer.valueOf(n) for a given n.
	 * 
	 * @param map
	 * @param key
	 * @return 0 (NOT_SIMPLE), 1 (INVALID_KEY), 2 (NO_SUCH_KEY), or 3 (HAS_KEY)
	 */
	static int 秘hasKey(Map map, Object key) {

		/**
		 * 
		 * Note that JavaScript Map.has() will distinguish between new String("") and
		 * "". And yet Java will not. So the "1" return here must be handled as "invalid
		 * -- convert now" even if it is just a remove or contains check.
		 * 
		 * @j2sNative
		 * 
		 * 			return (!map.秘m ? 0 : key != null && typeof key != "string" ? 1 :
		 *            map.秘m.has(key) ? 3 : 2);
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
		 * 			return !!map.秘m;
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
		 * 			if (map.秘m) { var m = map.秘m; map.秘m = null;
		 *            m.forEach(function(value, key){map.put(key, value);}); m.clear();
		 *            }
		 */
		{
		}
	}

	/**
	 * flag developers can use to switch off all use of simple JavaScript Map
	 * objects
	 * 
	 * not final, so that it can be managed on the fly in SwingJS
	 */
	public static boolean USE_SIMPLE = true;

	Map<String, Object> 秘m;
	boolean 秘allowJS = false;

	static final int NO_RETURN = 0;
	static final int RET_VALUE = 1;

}
