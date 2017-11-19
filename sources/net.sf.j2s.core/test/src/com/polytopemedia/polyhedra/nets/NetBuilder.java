package com.polytopemedia.polyhedra.nets;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import com.polytopemedia.polyhedra.Polygon;
import com.polytopemedia.polyhedra.PolygonFactory;
import com.polytopemedia.polyhedra.utils.Huffman;

public class NetBuilder {
	
	private final BuilderType type;

	private enum BuilderType {
		hybrid, huff, old
	}
	
	public NetBuilder() {
		this(BuilderType.hybrid);
	}
	
	private NetBuilder(BuilderType type) {
		this.type = type;
	}

	Net buildFrom(List<NetAction> actions, double[] angles) {
		Net[] currentNet = new Net[1];
		buildFromActions(actions, currentNet);
		currentNet[0].setFoldingAngles(angles);
		return currentNet[0];
	}

	private void buildFromActions(List<NetAction> actions, Net[] currentNet) {
		PolygonFactory polygonFactory = new PolygonFactory();
		for (NetAction action : actions) {
			int[][] params = action.getParameters();
			switch (action.getType()) {
			case start : 
				currentNet[0] = new Net(polygonFactory.getPolygon(params[0]));
				break;
			case add :
				if (currentNet[0] == null) {
					throw new IllegalStateException("first action must be 'start'");
				}
				Polygon polygon = polygonFactory.getPolygon(params[0]);
				Edge edge = currentNet[0].getEdge(params[1][0]);
				currentNet[0].addPolygon(polygon, edge);
				break;
			case join :
				if (currentNet[0] == null) {
					throw new IllegalStateException("first action must be 'start'");
				}
				Edge e1 = currentNet[0].getEdge(params[0][0]);
				Edge e2 = currentNet[0].getEdge(params[0][1]);
				currentNet[0].join(e1, e2);
				break;
			case multi :
				ActionsAndAngles actionsAndAngles = actionsFromIntArray(params[0]);
				buildFromActions(actionsAndAngles.actions, currentNet);
			}
		}
	}
	
	
	
	private byte[] munge(int[] x) {
		byte[] b = new byte[4*x.length];
		for (int i=0; i<x.length; i++) {
			for (int j=0; j<4; j++) {
				b[x.length*(3-j)+i] = extractByte(j, x[i]);
			}
		}
		byte[] rtn = shortenByteArray(b);
		return rtn;
	}

	private int[] unmunge(byte[] y) throws NullPointerException {
		byte[] b = unshortenByteArray(y);
		int[] rtn = new int[b.length/4];
		for (int i=0; i<rtn.length; i++) {
			rtn[i] = fromBytes(b[i+3*rtn.length], b[i+2*rtn.length], b[i+rtn.length], b[i]);
		}
		return rtn;
	}

	
	private byte[] shortenByteArray(byte[] b) {
		int nz = 0;
		for (; nz<b.length && b[nz] == 0; nz++);
		byte[] noz = new byte[b.length-nz];
		for (int i=0; i<noz.length; i++) {
			noz[i] = b[i+nz];
		}
		noz = huff(noz);
		byte max = -1;
		for (int i=0; i<noz.length; i++) {
			if (max < noz[i]) {
				max = noz[i];
			}
		}
		int base = max+1;
		byte[] newz = changeBase(128,base,noz);
		byte[] rtn = new byte[newz.length+5];
		rtn[1] = extractByte(0, nz);
		rtn[2] = extractByte(1, nz);
		rtn[3] = extractByte(2, nz);
		rtn[4] = extractByte(3, nz);
		rtn[0] = max;
		for (int i=5; i<rtn.length; i++) {
			rtn[i] = newz[i-5];
		}
		return rtn;
	}

	private byte[] huff(byte[] noz) {
		if (type.equals(BuilderType.huff)) {
			// TODO! test this...
			// TODO! implement the method below
			boolean[] bits = huff.toBits(noz);
			byte[] huffed = new byte[bits.length/7+1];
			for (int i=0; i<bits.length; i++) {
				if (bits[i]) {
					huffed[i/7] |= (1 << i%7); 
				}
			}
			return huffed;
		} else {
			return noz;
		}
	}

	private byte[] unhuff(byte[] huffed) throws NullPointerException {
		if (type.equals(BuilderType.huff)) {
			// TODO ! test this...
			boolean[] bits = new boolean[huffed.length*7];
			for (int i=0; i<bits.length; i++) {
				if ((huffed[i/7] & (1 << i%7)) != 0) {
					bits[i] = true;
				}
			}
			// TODO! implement the method below
			byte[] noz = huff.fromBits(bits);
			return noz;
		} else {
			return huffed;
		}
	}
	
	private static double[] huffStats = new double[129];
	static {
		Arrays.fill(huffStats, 0.1);
		huffStats[0] += 543;
		huffStats[1] += 100;
		huffStats[2] += 387;
		huffStats[3] += 343;
		huffStats[4] += 91;
		huffStats[5] += 81;
		huffStats[6] += 54;
		huffStats[7] += 55;
		huffStats[8] += 23;
		huffStats[9] += 14;
		huffStats[10] += 8;
		huffStats[11] += 8;
		huffStats[12] += 9;
		huffStats[13] += 11;
		huffStats[14] += 20;
		huffStats[15] += 13;
		huffStats[16] += 9;
		huffStats[17] += 14;
		huffStats[18] += 12;
		huffStats[19] += 6;
		huffStats[21] += 3;
		huffStats[22] += 3;
		huffStats[23] += 4;
		huffStats[24] += 5;
		huffStats[25] += 11;
		huffStats[26] += 6;
		huffStats[27] += 3;
		huffStats[28] += 3;
		huffStats[29] += 10;
		huffStats[30] += 9;
		huffStats[31] += 7;
		huffStats[32] += 1;
		huffStats[33] += 1;
		huffStats[34] += 1;
		huffStats[35] += 1;
		huffStats[36] += 1;
		huffStats[37] += 2;
		huffStats[38] += 2;
		huffStats[39] += 1;
		huffStats[40] += 2;
		huffStats[41] += 2;
		huffStats[42] += 2;
		huffStats[43] += 1;
		huffStats[44] += 2;
		huffStats[45] += 2;
		huffStats[46] += 2;
		huffStats[47] += 1;
		huffStats[48] += 1;
		huffStats[49] += 3;
		huffStats[50] += 2;
		huffStats[51] += 1;
		huffStats[52] += 1;
		huffStats[53] += 2;
		huffStats[54] += 3;
		huffStats[55] += 1;
		huffStats[56] += 1;
		huffStats[60] += 1;
		huffStats[64] += 1;
		huffStats[65] += 2;
		huffStats[66] += 1;
		huffStats[68] += 2;
		huffStats[71] += 1;
		huffStats[72] += 1;
		huffStats[77] += 1;
		huffStats[78] += 1;
		huffStats[83] += 1;
		huffStats[84] += 1;
		huffStats[88] += 1;
		huffStats[89] += 1;
		huffStats[90] += 2;
		huffStats[91] += 1;
		huffStats[92] += 1;
		huffStats[93] += 2;
		huffStats[94] += 1;
		huffStats[95] += 1;
		huffStats[96] += 1;
		huffStats[97] += 1;
		huffStats[98] += 2;
		huffStats[99] += 1;
		huffStats[100] += 1;
		huffStats[101] += 1;
		huffStats[102] += 1;
		huffStats[103] += 1;
		huffStats[104] += 1;
		huffStats[105] += 1;
		huffStats[106] += 1;
		huffStats[107] += 1;
		huffStats[108] += 1;
		huffStats[109] += 1;
		huffStats[110] += 1;
		huffStats[118] += 1;
		huffStats[120] += 1;
		huffStats[126] += 1;

	}
	private static Huffman huff = new Huffman(huffStats);
	

	private byte[] unshortenByteArray(byte[] y) throws NullPointerException {
		int nz = fromBytes(y[1],y[2],y[3],y[4]);
		int oldMax = y[0];
		int base = oldMax+1;
		byte[] newz = new byte[y.length-5];
		for (int i=0; i<newz.length; i++) {
			newz[i] = y[i+5];
		}
		byte[] noz = changeBase(base, 128, newz);
		noz = unhuff(noz); // BH can throw exception here
		byte[] b = new byte[noz.length + nz];
		for (int i=nz; i<b.length; i++) {
			b[i] = noz[i-nz];
		}
		return b;
	}




	private byte[] changeBase(int newBase, int oldBase, byte[] oldNum) {
		int oldDigits = oldNum.length;
		int newDigits = (int) Math.ceil(oldDigits * Math.log(oldBase)/Math.log(newBase));
		byte[] newNum = new byte[newDigits];
		for (int i=0; i<oldDigits; i++) {
			// add digit to newNum
			if (i != 0) mult(oldBase, newNum, newBase);
			add(oldNum[i], newNum, newBase);
		}
		while (newNum[0] == 0 && newNum.length>1) {
			byte[] newerNum = new byte[newNum.length-1];
			for (int i=0; i<newerNum.length; i++) {
				newerNum[i] = newNum[i+1];
			}
			newNum = newerNum;
		}
		return newNum;
	}

	private void mult(int m, byte[] newNum, int newBase) {
		int carry = 0;
		for (int d=newNum.length-1; d>=0; d--) {
			int newDigit = newNum[d]*m+carry;
			newNum[d] = (byte) (newDigit % newBase);
			carry = newDigit / newBase;
		}
	}
	
	private void add(int b, byte[] newNum, int newBase) {
		add(b, newNum, newBase, newNum.length-1);
	}


	private void add(int b, byte[] newNum, int newBase, int d) {
		int newDigit = b+newNum[d];
		int carry = newDigit / newBase;
		newNum[d] = (byte) (newDigit % newBase);
		if (carry != 0) {
			add((byte) carry, newNum, newBase, d-1);
		}
	}


	private byte extractByte(int j, int integer) {
		return (byte) ((integer & (127<<(7*j))) >> (7*j));
	}
	
	private int fromBytes(byte b0, byte b1, byte b2, byte b3) {
		int i0 = b0;
		int i1 = b1;
		int i2 = b2;
		int i3 = b3;
		int rtn = i0;
		rtn += i1 << 7;
		rtn += i2 << 14;
		rtn += i3 << 21;
		return rtn;
	}
	
	
	private static final String allowedCharacters = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
	private static char[] chars = new char[allowedCharacters.length()];
	private static byte[] bytes = new byte[128];
	static {
		for (int i=0; i<allowedCharacters.length(); i++) {
			chars[i] = allowedCharacters.charAt(i);
			bytes[allowedCharacters.charAt(i)] = (byte) i;
		}
	}
	
	public String encode(Net net) {
		if (type.equals(BuilderType.hybrid)) {
			NetBuilder huffBuilder = new NetBuilder(BuilderType.huff);
			String huffString = huffBuilder.encode(net);
			NetBuilder oldBuilder = new NetBuilder(BuilderType.old);
			String oldString = oldBuilder.encode(net);
			String lens = "[h="+huffString.length()+",o="+oldString.length()+"] ";
			System.out.println(lens);
			// check if old would be accepted by huff decoder
			try {
				huffBuilder.decode(oldString);
				return huffString;
			} catch (NullPointerException e) {
				// BH ignore
			}
			if (huffString.length() <= oldString.length()) {
				return huffString;
			} else {
				return oldString;
			}
		}
		List<NetAction> reconstruction = net.getReconstruction();
		double[] angles = net.getLastFoldingAngles();
		int[] intArray = this.actionsToIntArray(reconstruction, angles);
		byte[] munged = munge(intArray);
		byte[] aschars = changeBase(allowedCharacters.length(), 128, munged);
		StringBuffer buf = new StringBuffer();
		for (byte b : aschars) {
			buf.append(chars[b]);
		}
		return buf.toString();
	}
	

	public Net decode(String string) throws NullPointerException {
		if (string == null)
			throw new NullPointerException(); // BH -- adding guard so true NullPointerException is called
		if (type.equals(BuilderType.hybrid)) {
			NetBuilder huffBuilder = new NetBuilder(BuilderType.huff);
			try {
				return huffBuilder.decode(string);
			} catch (NullPointerException e) {
				NetBuilder oldBuilder = new NetBuilder(BuilderType.old);
				return oldBuilder.decode(string);
			}
		}
		byte[] aschars = new byte[string.length()];
		for (int i=0; i<aschars.length; i++) {
			aschars[i] = bytes[string.charAt(i)];
		}
		byte[] munged = changeBase(128, allowedCharacters.length(), aschars); 
		int[] intArray = unmunge(munged);
		ActionsAndAngles actionsAndAngles = actionsFromIntArray(intArray);
		List<NetAction> reconstruction = actionsAndAngles.actions;
		double[] angles = actionsAndAngles.angles;
		return buildFrom(reconstruction, angles);
	}

	private int[] actionsToIntArray(List<NetAction> reconstruction, double[] angles) {
		List<Integer> list = new ArrayList<Integer>();
//		list.add(reconstruction.size());
		for (NetAction action : reconstruction) {
			addToList(list, action);
		}
		if (angles != null) {
			addToList(list, NetAction.END);
		}
		Integer[] rtno = list.toArray(new Integer[list.size()]);
		Integer[] rtna = anglesToInts(angles);
		int[] rtn = new int[rtno.length+rtna.length];
		for (int i=0; i<rtn.length; i++) {
			rtn[i] = i < rtno.length ? rtno[i] : rtna[i-rtno.length];
		}
		return rtn;
	}

	public static void main(String[] args) {
		double[] angles = {1,2,4,8,16, Math.PI, Math.E*1e30};
		Integer[] ints = anglesToInts(angles);
		double[] array = anglesFromArray(ints);
		System.out.println("NetBuilder.main()");
	} 
	
	private static double[] anglesFromArray(Integer[] array) {
		if (array.length == 0) return null;
		int length = array[0];
		if (array.length != length+1) {
			return null;
		}
		double[] angles = new double[length];
		for (int i=0; i<angles.length; i++) {
			angles[i] = array[i+1] / 1e6;
		}
		return angles;
	}

	private static Integer[] anglesToInts(double[] angles) {
		if (angles== null) return new Integer[0];
		Integer[] rtn = new Integer[angles.length+1];
		rtn[0] = angles.length;
		for (int i=0; i<angles.length; i++) {
			double angle = angles[i];
			angle = angle % (2*Math.PI);
			while (angle > 2*Math.PI) {
				angle -= 2*Math.PI;
			}
			while (angle < 0) {
				angle += 2*Math.PI;
			}
			rtn[i+1] = (int)(Math.round(angle*1000000));
		}
		return rtn;
	}

	class ActionsAndAngles {

		public ActionsAndAngles(List<NetAction> actions, double[] angles) {
			this.actions = actions;
			this.angles = angles;
		}
		List<NetAction> actions;
		double[] angles;
	}
	
	private ActionsAndAngles actionsFromIntArray(int[] intArray) {
		Integer[] objArray = new Integer[intArray.length];
		for (int i=0; i<objArray.length; i++) {
			objArray[i] = intArray[i];
		}
		List<Integer> list = Arrays.asList(objArray);
		List<NetAction> actions = new ArrayList<NetAction>();
		Iterator<Integer> iterator = list.iterator();
//		int size = iterator.next();
		while (iterator.hasNext()) {
			NetAction action = getFromIterator(iterator);
			if (action == null) return null;
			if (action.getType().equals(NetActionType.end)) break;
			actions.add(action);
		}
		List<Integer> codedAngles = new LinkedList<Integer>();
		while (iterator.hasNext()) {
			codedAngles.add(iterator.next());
		}
		double[] angles = anglesFromArray(codedAngles.toArray(new Integer[0]));
		return new ActionsAndAngles(actions, angles);
	}

	
	private NetAction getFromIterator(Iterator<Integer> iterator) {
		if (!iterator.hasNext()) return null;
		NetActionType type = NetActionType.values()[iterator.next()-1];
		int[][] parameters;
		try {
		switch (type) {
		case start : 
		case multi:
		{
			int size = iterator.next();
			int[] array = new int[size];
			for (int i=0; i<size; i++) {
				array[i] = iterator.next();
			}
			parameters = new int[][] {array};
			return new NetAction(type, parameters);
		}
		case add : {
			int size = iterator.next();
			int[] polygon = new int[size];
			for (int i=0; i<size; i++) {
				polygon[i] = iterator.next();
			}
			parameters = new int[][] {polygon, new int[] {iterator.next()}};
			return new NetAction(type, parameters);
		}
		case join : {
			parameters = new int[][] {{iterator.next()*8+iterator.next(), iterator.next()*8+iterator.next()}};
			return new NetAction(type, parameters);
		}
		case end: {
			return new NetAction(NetActionType.end);
		}
		}
		} catch (NullPointerException e) {
		}
		return null;
	}

	private void addToList(List<Integer> list, NetAction action) {
		NetActionType type = action.getType();
		int[][] parameters = action.getParameters();
		list.add(type.ordinal()+1);
		switch (type) {
		case start :
		case multi:
			list.add(parameters[0].length);
			for (int i : parameters[0]) {
				list.add(i);
			}
			break;
		case add :
			list.add(parameters[0].length);
			for (int i : parameters[0]) {
				list.add(i);
			}
			list.add(parameters[1][0]);
			break;
		case join :
			list.add(parameters[0][0]/8);
			list.add(parameters[0][0]%8);
			list.add(parameters[0][1]/8);
			list.add(parameters[0][1]%8);
			break;
		}
	}

	NetAction buildMultiAction(ArrayList<NetAction> reconstruction) {
		int[] param = actionsToIntArray(reconstruction, null);
		return new NetAction(NetActionType.multi, param);
	}

}
