package test;

import java.util.Arrays;
import java.util.Comparator;

public class Test_Sort extends Test_ implements Comparator<Test_Sort.SortItem>{
	
  public static class SortItem implements Comparable<SortItem> {

	int id;
	SortItem(int id) {
		this.id = id;
	}
	
	@Override
	public int compareTo(SortItem o) {
		return (id < o.id ? -1 : id > o.id ? 1 : 0);
	}
	
	public String toString() {
		return "[SortItem id=" + id + "]";
	}
	  
  }

	public static void main(String[] args) {

		SortItem[] list = new SortItem[] { new SortItem(3), new SortItem(1), new SortItem(2) };
		System.out.println("ascending test");
		Arrays.sort(list);
		assert (list[0].id == 1 && list[1].id == 2 && list[2].id == 3);
		System.out.println("descending test");
		Arrays.sort(list, new Test_Sort());
		assert (list[0].id == 3 && list[1].id == 2 && list[2].id == 1);
		System.out.println("Test_Sort OK");
	}

	@Override
	public int compare(SortItem o1, SortItem o2) {
		// this is a reverse sort
		return o1.id < o2.id ? 1 : o1.id > o2.id ? -1 : 0;
	}

} 