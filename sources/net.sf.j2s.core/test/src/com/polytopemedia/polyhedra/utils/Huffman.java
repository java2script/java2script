package com.polytopemedia.polyhedra.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.TreeSet;

public class Huffman {

	private Node tree;
	private boolean[][] encoding;

	public Huffman(double[] huffStats) {
		TreeSet<Node> nodes = new TreeSet<Node>(); 
		for (int i=0; i<huffStats.length; i++) {
			nodes.add(new Node(i,huffStats[i]));
		}
		while (nodes.size() > 1) {
			Node last1 = nodes.last();
			nodes.remove(last1);
			Node last2 = nodes.last();
			nodes.remove(last2);
			nodes.add(last1.mergeWith(last2));
		}
		tree = nodes.first();
		encoding = tree.getEncoding(128);
	}
	
	public boolean[] toBits(byte[] noz) {
		ArrayList<Boolean> bits = new ArrayList<Boolean>();
		for (byte b : noz) {
			for (boolean bit : encoding[b]) {
				bits.add(bit);
			}
		}
		for (boolean bit : encoding[128]) {
			bits.add(bit);
		}
		return toArray(bits);
	}
	
	public byte[] fromBits(boolean[] bits) throws NullPointerException {
		ArrayList<Byte> bytes = tree.decode(bits);
		byte[] rtn = new byte[bytes.size()];
		int i=0;
		for (Byte b : bytes) {
			rtn[i] = b;
			i++;
		}
		return rtn;
	}

	private boolean[] toArray(List<Boolean> bitsList) {
		Boolean[] bitObjectArray = bitsList.toArray(new Boolean[0]);
		boolean[] bitArray = new boolean[bitObjectArray.length];
		for (int j=0; j<bitArray.length; j++) {
			bitArray[j] = bitObjectArray[j];
		}
		return bitArray;
	}

	private class Node implements Comparable {

		private final int i;
		private final double weight;
		private Node left;
		private Node right;

		public Node mergeWith(Node other) {
			Node n = new Node(-1,this.weight+other.weight);
			n.left = this;
			n.right = other;
			return n;
		}

		public ArrayList<Byte> decode(boolean[] bits) throws NullPointerException {
			ArrayList<Byte> bytes = new ArrayList<Byte>();
			ArrayList<Boolean> bitList = new ArrayList<Boolean>();
			for (boolean bit : bits) {
				bitList.add(bit);
			}
			Iterator<Boolean> bitIterator = bitList.iterator();
			int i;
			while (bitIterator.hasNext()) {
				switch(i = decodeBits(bitIterator)) {
				case Integer.MAX_VALUE: // BH addition
					break;
				case 128:
					return bytes;
			    default:
			    	bytes.add((byte)i);
			    	break;
				}
			}
			throw new NullPointerException(); // BH Exception -- invalid (null) return needs to go all the way out 
		}

		private int decodeBits(Iterator<Boolean> bitIterator) {
			// BH preventing Exception output;
			// BH in JavaScript if (Boolean.FALSE) is true, but Boolean.FALSE == true:
			
			// Boolean.FALSE == true
			// false
			// Boolean.TRUE == true
			// true
			//
			// but
			//
			// if (Boolean.FALSE) 3
			// 3
			//
			// I guess because it is an object.
			
			return (left == null ? i
					: !bitIterator.hasNext() ? Integer.MAX_VALUE
							: bitIterator.next() == true ? left.decodeBits(bitIterator) 
									: right.decodeBits(bitIterator));
		}

		public boolean[][] getEncoding(int max) {
			boolean[][] encoding = new boolean[max+1][]; 
			LinkedList<Boolean> sofar = new LinkedList<Boolean>();
			getEncodingList(sofar, encoding);
			return encoding;
		}

		private void getEncodingList(LinkedList<Boolean> sofar, boolean[][] encoding) {
			if (left == null) {
				boolean[] bits = toArray(sofar);
				encoding[i] = bits; 
			} else {
				sofar.add(true);
				left.getEncodingList(sofar, encoding);
				sofar.removeLast();
				sofar.add(false);
				right.getEncodingList(sofar, encoding);
				sofar.removeLast();
			}
		}


		public String toString() {
			StringBuffer buf = new StringBuffer();
			if (left == null) {
				buf.append(i);
			} else {
				buf.append("[");
				buf.append(left);
				buf.append(",");
				buf.append(right);
				buf.append("]");
			}
			buf.append("@"+weight);
			return buf.toString();
		}
		
		public Node(int i, double d) {
			this.i = i;
			this.weight = d;
		}

		public int compareTo(Object o) {
			Node other = (Node)o;
			if (this.weight < other.weight) {
				return 1;
			} 
			if (this.weight > other.weight) {
				return -1;
			}
			if (this.left == null && other.left == null) {
				return this.i - other.i;
			}
			if (this.left == null) {
				return 1;
			}
			if (other.left == null) {
				return -1;
			}
			int leftComparison = this.left.compareTo(other.left);
			if (leftComparison != 0) {
				return leftComparison;
			}
			int rightComparison = this.right.compareTo(other.right);
			if (rightComparison != 0) {
				return rightComparison;
			}
			return 0;
		}
		
		public boolean equals(Object o) {
			return this.compareTo(o) == 0;
		}
		
	}
}
