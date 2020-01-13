package test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

class Test_Interval extends Test_ {

	static int[] i0 = new int[0];

	static int[][] a = new int[][] { 
		{ 1, 7 }, 
		{ 2, 4 }, 
		{ 3, 5 }, 
		{ 3, 6 }, 
		{ 4, 5 }, 
		{ 7, 8 },
		{ 9, 10 }
	
	};

	public static void main(String[] args) {

		// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14
		int[] ap = new int[] { 10, 20, 30, 40, 50, 50, 50, 60, 70, 80, 90, 100, 110, 120 };

		System.out.println(findClosestPoint(ap, 11, true)); // 0
		System.out.println(findClosestPoint(ap, 11, false)); // 1
		System.out.println(findClosestPoint(ap, 51, true)); // 6
		System.out.println(findClosestPoint(ap, 51, false)); // 7
		System.out.println(findClosestPoint(ap, 130, true));// -1
		System.out.println(findClosestPoint(ap, 130, false)); // -1
		System.out.println(findClosestPoint(ap, 0, true)); // -1
		System.out.println(findClosestPoint(ap, 0, false)); // -1
		System.out.println(findClosestPoint(ap, 30, true)); // 2
		System.out.println(findClosestPoint(ap, 60, true)); // 7
		System.out.println(findClosestPoint(ap, 50, true)); // 4
		System.out.println(findClosestPoint(ap, 50, false)); // 6

		assert (findClosestPoint(ap, 11, true) == 0);
		assert (findClosestPoint(ap, 11, false) == 1);
		assert (findClosestPoint(ap, 51, true) == 6);
		assert (findClosestPoint(ap, 51, false) == 7);
		assert (findClosestPoint(ap, 130, true) == -1);
		assert (findClosestPoint(ap, 130, false) == -1);
		assert (findClosestPoint(ap, 0, true) == -1);
		assert (findClosestPoint(ap, 0, false) == -1);
		assert (findClosestPoint(ap, 30, true) == 2);
		assert (findClosestPoint(ap, 60, true) == 7);
		assert (findClosestPoint(ap, 50, true) == 4);
		assert (findClosestPoint(ap, 50, false) == 6);

		new Test_Interval().findIntervals(a, 3);
		new Test_Interval().findIntervals(a, 5);
		new Test_Interval().findIntervals(a, 9);

		System.out.println("Test_Interval OK");
	}

	private static Interval[] ints;

	private void findIntervals(int[][] a, int pos) {
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
//			e.printStackTrace();
		}
		Random rand = new Random();
		int n = a.length;
		Interval[] intervals = new Interval[n];
		for (int i = 0; i < n;) {
			int r = rand.nextInt(n);
			if (intervals[r] == null) {
				intervals[r] = new Interval(a[i][0], a[i][1], i);
				i++;
			}
		}
		System.out.println("=====");
		//dumpIntervals(intervals);
		System.out.println("-----");
		ints = intervals;
		Arrays.sort(intervals, new IComparator());
		linkIntervals(intervals);
		//dumpIntervals(intervals);
		List<Interval> result = new ArrayList<>();
		findInterval(intervals, pos, result);
		for (int i = 0; i < result.size(); i++)
			System.out.println(pos + " " + result.get(i));

	}

	private void findInterval(Interval[] intervals, int pos, List<Interval> result) {
		Interval ithis = findClosestInterval(intervals, pos);
		while (ithis != null) {
			if (ithis.end >= pos)
				result.add(ithis);
			ithis = ithis.containedBy;
		}
	}

	private Interval findClosestInterval(Interval[] l, int pos) {
		int low = 0;
		int high = l.length - 1;
		int mid = 0;
		while (low <= high) {
			mid = (low + high) >>> 1;
			int f = l[mid].begin;
			switch (Long.signum(f - pos)) {
			case -1:
				low = mid + 1;
				continue;
			case 1:
				high = mid - 1;
				continue;
			case 0:
					while (++mid <= high && l[mid].begin == pos) {
						;
					}
					mid--;
				return l[mid];
			}
		}
		return (high < 0 || low >= l.length ? null : l[high]);
	}

	static void dumpIntervals(Interval[] intervals) {
		for (int i = 0; i < intervals.length; i++) {
			System.out.println(intervals[i]);
		}
		System.out.println("");
	}

	public void linkIntervals(Interval[] intervals) {
		if (intervals.length < 2)
			return;
		int maxEnd = intervals[0].end;
		for (int i = 1, n = intervals.length; i < n; i++) {
			Interval ithis = intervals[i];
			if (ithis.begin <= maxEnd)
				ithis.containedBy = getContainedBy(intervals, i);
			if (ithis.end > maxEnd)
				maxEnd = ithis.end;
		}

	}

	private Interval getContainedBy(Interval[] intervals, int i) {
		Interval ithis = intervals[i];
		while (--i >= 0) {
			Interval ilast = intervals[i];
			if (ithis.begin <= ilast.end) {
				return ilast;
			}
		}
		return null;
	}

	class Interval {
		int begin, end, index;
		Interval containedBy;

		Interval(int begin, int end, int index) {
			this.begin = begin;
			this.end = end;
			this.index = index;
		}

		@Override
		public String toString() {
			return "I" + index + " begin:" + begin + " end:" + end + " cont:"
					+ (containedBy == null ? "?" : containedBy.index);
		}

	}

	class IComparator implements Comparator<Interval> {

		@Override
		public int compare(Interval a, Interval b) {
			int val = (a.begin < b.begin ? -1 : a.begin > b.begin ? 1 : a.end > b.end ? 1 : a.end < b.end ? -1 : 0);
			return val;
		}

	}

	static private int findClosestPoint(int[] l, int pos, boolean isStart) {
		int low = 0;
		int high = l.length - 1;
		int mid = 0;
		while (low <= high) {
			mid = (low + high) >>> 1;
			int f = l[mid];
			switch (Long.signum(f - pos)) {
			case -1:
				low = mid + 1;
				continue;
			case 1:
				high = mid - 1;
				continue;
			case 0:
				if (isStart) {
					while (--mid >= low && (f = l[mid]) != -1 && f == pos) {
						;
					}
					++mid;
				} else {
					while (++mid <= high && (f = l[mid]) != -1 && f == pos) {
						;
					}
					mid--;
				}
				return mid;
			}
		}
		// -1 here?
		System.out.println(isStart + " " + low + " " + mid + " " + high);
		return (high < 0 || low >= l.length ? -1 : isStart ? high : low);
	}

}