package net.sf.j2s.test.junit.sample;

public class CVarArgs {
	public String fVarArgsInt(int... ns) {
		String result = "ints: ";
		for (int i = 0; i < ns.length; i++) {
			result += ns[i] + " ";
		}
		return result;
	}
	
	public String fStringVarArgsInt(String s, int... ns) {
		String result = s;
		for (int i = 0; i < ns.length; i++) {
			result += ns[i] + " ";
		}
		return result;
	}
	
	public String fIntArr(int[]... nss) {
		String result = "intss ";
		for (int j = 0; j < nss.length; j++) {
			int[] ns = nss[j];
			result += "[";
			for (int i = 0; i < ns.length; i++) {
				result += ns[i] + " ";
			}
			result += "] ";
		}
		return result;
	}
}
