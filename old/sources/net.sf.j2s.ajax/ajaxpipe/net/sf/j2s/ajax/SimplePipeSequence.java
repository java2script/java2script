package net.sf.j2s.ajax;

public final class SimplePipeSequence extends SimpleSerializable {

	private static String[] mappings = new String[] {
			"sequence", "s"
	};
	
	public long sequence;
	
	@Override
	protected String[] fieldMapping() {
		if (getSimpleVersion() >= 202) {
			return mappings;
		}
		return null;
	}
	
}
