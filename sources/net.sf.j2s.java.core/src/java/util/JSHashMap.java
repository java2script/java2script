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

import java.io.Serializable;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * A super simple very limited capability HashMap - Strings Only; extends AbstractMap, not HashMap.
 * 
 * Used in BinaryCIF-SwingJS
 * 
 * @author hansonr
 *
 * @param <K>
 * @param <V>
 */
final public class JSHashMap<K, V> extends AbstractMap<K, V> implements Map<K, V>, Cloneable, Serializable {

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

	public JSHashMap() {
	}

	public JSHashMap(Map<? extends K, ? extends V> m) {
		putMapEntries(m, false);
	}

	Object jsmap = /** @j2sNative {} || */
			null;

	/**
	 * Implements Map.putAll and Map constructor
	 *
	 * @param m     the map
	 * @param evict false when initially constructing this map, else true (relayed
	 *              to method afterNodeInsertion).
	 */
	void putMapEntries(Map<? extends K, ? extends V> m, boolean evict) {
		int s = m.size();
		if (s > 0) {
			for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
				int hash = 0;
				K key = e.getKey();
				V value = e.getValue();
				putVal(key, value, false, evict);
			}
		}
	}

	/**
	 * Returns the number of key-value mappings in this map.
	 *
	 * @return the number of key-value mappings in this map
	 */
	public int size() {
		return size;
	}

	/**
	 * Returns <tt>true</tt> if this map contains no key-value mappings.
	 *
	 * @return <tt>true</tt> if this map contains no key-value mappings
	 */
	public boolean isEmpty() {
		return size == 0;
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
	public V get(Object key) {
		/**
		 * @j2sNative
		 * 
		 * 			var v = this.jsmap[key]; return (v === undefined ? null : v);
		 */
		return null;
	}

	public boolean containsKey(Object key) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.jsmap[key] !== undefined;
		 */
		return false;
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
	public V put(K key, V value) {
		return putVal(key, value, false, true);
	}

	final V putVal(K key, V value, boolean onlyIfAbsent, boolean evict) {
		/**
		 * @j2sNative
		 * 
		 * 			var v = this.jsmap[key]; 
		 *  if (!onlyIfAbsent
		 *            || v == null) {
		 *            this.jsmap[key] = value; 
		 *            this.modCount++;
		 *            if (v === undefined)
		 *            	this.size++;
		 *            return v;
		 *            }
		 * 
		 */
		return null;
	}

	/**
	 * Copies all of the mappings from the specified map to this map. These mappings
	 * will replace any mappings that this map had for any of the keys currently in
	 * the specified map.
	 *
	 * @param m mappings to be stored in this map
	 * @throws NullPointerException if the specified map is null
	 */
	public void putAll(Map<? extends K, ? extends V> m) {
		putMapEntries(m, true);
	}

	public V remove(Object key) {
		modCount++;
		/**
		 * @j2sNative
		 * 
		 * 			var v = this.jsmap[key]; 
		 * 			delete this.jsmap.key; 
		 * 			return (v === undefined ? null : v);
		 */
		return null;
	}

	public void clear() {
		/**
		 * @j2sNative this.jsmap={};
		 */
		modCount++;
		size = 0;
	}

	/**
	 * Returns <tt>true</tt> if this map maps one or more keys to the specified
	 * value.
	 *
	 * @param value value whose presence in this map is to be tested
	 * @return <tt>true</tt> if this map maps one or more keys to the specified
	 *         value
	 */
	public boolean containsValue(Object value) {
		/**
		 * for (var k in this.jsmap) { if (this.jsmap[k].equals$O(value)) return true; }
		 */
		return false;
	}

	public Set<K> keySet() {
		Set<K> ks;
		return (ks = keySet) == null ? (keySet = new KeySet()) : ks;
	}

	final class KeySet extends AbstractSet<K> {
		
		public final int size() {
			return size;
		}

		public final void clear() {
			JSHashMap.this.clear();
		}

		public final Iterator<K> iterator() {
			return new KeyIterator(jsmap);
		}

		public final boolean contains(Object o) {
			return containsKey(o);
		}

		public final boolean remove(Object key) {
			return JSHashMap.this.remove(key) != null;
		}

		public final void forEach(Consumer<? super K> action) {
			if (action == null)
				throw new NullPointerException();
			K[] a = null;
			if (size > 0) {
				Object map = jsmap;
				int mc = modCount;
				/**
				 * @j2sNative
				 * 
				 * a = [];
				 * for (var k in map)a.push(k);
				 * 
				 */
				for (int i = 0; i < size; ++i) {
				    action.accept(a[i]);
				}
				if (modCount != mc)
					throw new ConcurrentModificationException();
			}
		}
	}

//	/**
//	 * Returns a {@link Collection} view of the values contained in this map. The
//	 * collection is backed by the map, so changes to the map are reflected in the
//	 * collection, and vice-versa. If the map is modified while an iteration over
//	 * the collection is in progress (except through the iterator's own
//	 * <tt>remove</tt> operation), the results of the iteration are undefined. The
//	 * collection supports element removal, which removes the corresponding mapping
//	 * from the map, via the <tt>Iterator.remove</tt>, <tt>Collection.remove</tt>,
//	 * <tt>removeAll</tt>, <tt>retainAll</tt> and <tt>clear</tt> operations. It does
//	 * not support the <tt>add</tt> or <tt>addAll</tt> operations.
//	 *
//	 * @return a view of the values contained in this map
//	 */
//	public Collection<V> values() {
//		Collection<V> vs;
//		return (vs = values) == null ? (values = new Values()) : vs;
//	}
//
//	final class Values extends AbstractCollection<V> {
//		public final int size() {
//			return size;
//		}
//
//		public final void clear() {
//			HashMap.this.clear();
//		}
//
//		public final Iterator<V> iterator() {
//			return new ValueIterator();
//		}
//
//		public final boolean contains(Object o) {
//			return containsValue(o);
//		}
//
//		public final Spliterator<V> spliterator() {
//			return new ValueSpliterator<>(HashMap.this, 0, -1, 0, 0);
//		}
//
//		public final void forEach(Consumer<? super V> action) {
//			Node<K, V>[] tab;
//			if (action == null)
//				throw new NullPointerException();
//			if (size > 0 && (tab = table) != null) {
//				int mc = modCount;
//				for (int i = 0; i < tab.length; ++i) {
//					for (Node<K, V> e = tab[i]; e != null; e = e.next_)
//						action.accept(e.value);
//				}
//				if (modCount != mc)
//					throw new ConcurrentModificationException();
//			}
//		}
//	}

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
	public Set<Map.Entry<K, V>> entrySet() {
		Set<Map.Entry<K, V>> es;
		return (es = entrySet) == null ? (entrySet = new EntrySet()) : es;
	}

	final class EntrySet extends AbstractSet<Map.Entry<K, V>> {
		public final int size() {
			return size;
		}

		public final void clear() {
			JSHashMap.this.clear();
		}

		public final Iterator<Map.Entry<K, V>> iterator() {
			return new EntryIterator(jsmap);
		}

		public final boolean contains(Object o) {
			if (!(o instanceof Map.Entry))
				return false;
			Map.Entry<?, ?> e = (Map.Entry<?, ?>) o;
			Object key = e.getKey();
			return (o.equals(JSHashMap.this.get(key)));
		}

		public final boolean remove(Object o) {
			if (o instanceof Map.Entry) {
				Map.Entry<?, ?> e = (Map.Entry<?, ?>) o;
				Object key = e.getKey();
				Object value = e.getValue();
				return JSHashMap.this.remove(key, value);
			}
			return false;
		}

//		public final Spliterator<Map.Entry<K, V>> spliterator() {
//			// OHOH
//			return new EntrySpliterator<>(JSHashMap.this, 0, -1, 0, 0);
//		}

		public final void forEach(Consumer<? super Map.Entry<K, V>> action) {
			if (action == null)
				throw new NullPointerException();
			Object[] a = null;
			if (size > 0) {
				Object map = jsmap;
				int mc = modCount;
				/**
				 * @j2sNative
				 * 
				 * a = [];
				 * for (var k in map)a.push([k, map[k]]);
				 * 
				 */
				for (int i = 0; i < size; ++i) {
					K key = null;
					V value = null;
					
					/**
					 * 
					 * var e = a.shift();
					 * key = e[0];
					 * value = e[1];
					 * 
					 */
					action.accept(new Map.Entry() {

						@Override
						public Object getKey() {
							return key;
						}

						@Override
						public Object getValue() {
							return value;
						}

						@Override
						public Object setValue(Object val) {
							JSHashMap.this.put(key, (V) val);
							return value;
						}
						
					});

				}
				if (modCount != mc)
					throw new ConcurrentModificationException();
			}
		}
	}

	// Overrides of JDK8 Map extension methods

	@Override
	public V getOrDefault(Object key, V defaultValue) {
		/**
		 * @j2sNative
		 * 
		 * 			var val = jsmap[key]; 
		 * 			return (val === undefined ? defaultValue : val);
		 */
		return null;
	}

	@Override
	public V putIfAbsent(K key, V value) {
		/**
		 * @j2sNative
		 * 
		 * 			var val = jsmap[key]; if (val !== null && val !== undefined) return val;
		 */

		return putVal(key, value, true, true);
	}

	@Override
	public boolean remove(Object key, Object value) {
		modCount++;
		/**
		 * @j2sNative
		 * 
		 * 			var v = this.jsmap[key]; 
		 *          if (v !== undefined) this.size--;
		 * 			if (v != null && v.equals$O(value)) {
		 *              delete this.jsmap.key; 
		 *              return true;
		 *           }
		 */
		return false;
	}

	@Override
	public boolean replace(K key, V oldValue, V newValue) {
		V v = null;
		/**
		 * @j2sNative
		 * v = this.jsmap[key];
		 * if (v == null || !v.equals$O(oldValue)) {
		 *   return false;
		 * }
		 */
		put(key, newValue);
		return true;
	}

	@Override
	public V replace(K key, V value) {
		V v = null;
		/**
		 * @j2sNative
		 * v = this.jsmap[key];
		 * if (v == null) {
		 *   return null;
		 * }
		 */
		put(key, value);
		return v;
	}

	@Override
	public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction) {
		if (mappingFunction == null)
			throw new NullPointerException();
		/**
		 * @j2sNative
		 * 
		 * var v = this.jsmap[key];
		 * 
		 * if (v != null)
		 * return v;
		 */
		V v = mappingFunction.apply(key);
		if (v == null) {
			return null;
		}
		return put(key, v);
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

	void reinitialize() {
		entrySet = null;
		keySet = null;
		values = null;
		modCount = 0;
		size = 0;
	}

	class KeyIterator implements Iterator<K> {
		Object[] a;
		
		KeyIterator(Object map) {
			/**
			 * @j2sNative
			 * 
			 * a = [];
			 * for (var k in map) {
			 *   a.push(k);
			 * }
			 */
		}
		public final K next() {
			/**
			 * @j2sNative return a.shift();
			 */
			return null;
		}

		@Override
		public boolean hasNext() {
			return /**
					 * @j2sNative !!a.length ||
					 */
			false;
		}
	}

	final class ValueIterator implements Iterator<V> {

		Object[] a;
		
		ValueIterator(Object map) {
			/**
			 * @j2sNative
			 * 
			 * a = [];
			 * for (var k in map) {
			 *   a.push([k, map[k]]);
			 * }
			 */
		}
		@Override
		public boolean hasNext() {
			return /**
					 * @j2sNative !!a.length ||
					 */
			false;
		}

		@Override
		public V next() {
			/**
			 * @j2sNative return a.shift();
			 * 
			 */
			return null;
		}
	}

	final class EntryIterator implements Iterator<Map.Entry<K, V>> {
		Object[] a;
		
		EntryIterator(Object map) {
			/**
			 * @j2sNative
			 * 
			 * a = [];
			 * for (var k in map) {
			 *   a.push([k, map[k]]);
			 * }
			 */
		}
		public final Map.Entry<K, V> next() {
			K key = null;
			V value = null;
			
			/**
			 * 
			 * var e = a.shift();
			 * key = e[0];
			 * value = e[1];
			 * 
			 */
			return new Map.Entry() {

				@Override
				public Object getKey() {
					return key;
				}

				@Override
				public Object getValue() {
					return value;
				}

				@Override
				public Object setValue(Object val) {
					JSHashMap.this.put(key, (V) val);
					return value;
				}
				
			};

		}

		@Override
		public boolean hasNext() {
			return /**
					 * @j2sNative !!a.length ||
					 */
			false;
		}
	}


}
