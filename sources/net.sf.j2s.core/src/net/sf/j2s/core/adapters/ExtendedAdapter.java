package net.sf.j2s.core.adapters;

import java.util.HashSet;
import java.util.Set;

public class ExtendedAdapter extends AbstractPluginAdapter {

	public static String buildXSource(String fullClassName, String tagName, String firstLine, String sources) {
		if (firstLine != null && sources.length() > 0) {
			Set<String> xTags = null;
			StringBuilder builder = new StringBuilder();
			if ("@j2sXHTML".equals(tagName)) {
				boolean shouldMergeFirstLine = false;
				if (firstLine.startsWith("{$") || firstLine.contains("<") || firstLine.contains(">")) {
					shouldMergeFirstLine = true;
				}
				if (shouldMergeFirstLine) {
					sources = firstLine + "\r\n" + sources;
					firstLine = "";
				}
				xTags = parseXTag(sources);
				sources = "\"" + sources.replaceAll("\t", "\\\\t").replaceAll("\"", "\\\\\"").replaceAll("\r\n", "\\\\r\\\\n\" +\r\n\"") + "\"";
				String[] parts = firstLine.split("(,| |\t)+");
				if (firstLine.length() == 0) {
					builder.append("Clazz.parseHTML(");
				} else if (parts == null || parts.length == 1) {
					if ("return".equals(firstLine)) {
						builder.append("return Clazz.parseHTML(");
					} else {
						builder.append("Clazz.parseHTML(").append(firstLine).append(", ");
					}
				} else {
					String firstVar = parts[0];
					String leftStr = firstLine.substring(firstVar.length() + 1).replaceAll("^(,| |\t)+", "");
					if (leftStr.endsWith(",")) {
						leftStr = leftStr.substring(0, leftStr.length() - 1);
					}
					if ("return".equals(firstVar)) {
						builder.append("return Clazz.parseHTML(").append(leftStr).append(", ");
					} else {
						builder.append(firstVar).append(" = Clazz.parseHTML(").append(leftStr).append(", ");
					}
				}
			} else { // @j2sXCSS
				boolean shouldMergeFirstLine = false;
				if (firstLine.startsWith(".") || firstLine.contains("#") || firstLine.contains(">") || firstLine.contains("{")) {
					shouldMergeFirstLine = true;
				} else if (sources.startsWith("{")) {
					shouldMergeFirstLine = true;
				}
				if (shouldMergeFirstLine) {
					sources = firstLine + "\r\n" + sources;
					xTags = parseXTag(sources);
					builder.append("Clazz.parseCSS(");
				} else {
					xTags = parseXTag(sources);
					if (firstLine.endsWith(",")) {
						firstLine = firstLine.substring(0, firstLine.length() - 1);
					}
					builder.append("Clazz.parseCSS(").append(firstLine).append(", ");
				}
				sources = "\"" + sources.replaceAll("\t", "\\\\t").replaceAll("\"", "\\\\\"").replaceAll("\r\n", "\\\\r\\\\n\" +\r\n\"") + "\"";
			}
			boolean containsThis = containsBeginning(xTags, "$:") || containsBeginning(xTags, "$."); 
			boolean containsClass = containsBeginning(xTags, "$/");
			if (containsThis) {
				builder.append("this, ");
			} else if (containsClass) {
				builder.append(fullClassName).append(", ");
			}
			boolean localStarted = false;
			for (String s : xTags) {
				if (s.startsWith("$~")) {
					if (!localStarted) {
						builder.append("{");
						localStarted = true;
					} else {
						builder.append(", ");
					}
					String varName = s.substring(2);
					builder.append(varName).append(": ").append(varName);
				}
			}
			if (localStarted) {
				builder.append("}, ");
			}
			builder.append(sources).append(");\r\n");
			return builder.toString();
		}
		return sources;
	}

	private static Set<String> parseXTag(String sources) {
		Set<String> vars = new HashSet<String>();
		String key = "{$";
		int index = sources.indexOf(key, 0);
		while (index != -1) {
			int idx = sources.indexOf("}", index + key.length());
			if (idx == -1) {
				break;
			}
			String var = sources.substring(index + key.length() - 1, idx); // with prefix $
			if (var.indexOf(' ') == -1) {
				vars.add(var);
			}
			index = sources.indexOf(key, idx + 1);
		}
		key = "<!--";
		index = sources.indexOf(key, 0);
		while (index != -1) {
			int idx = sources.indexOf("-->", index + key.length());
			if (idx == -1) {
				break;
			}
			String comment = sources.substring(index + key.length(), idx).trim();
			if (comment.startsWith("$") && comment.indexOf(' ') == -1) {
				vars.add(comment);
			}
			index = sources.indexOf(key, idx + 3); // 3: "-->".length()
		}
		key = "id";
		index = sources.indexOf(key, 0);
		while (index > 0) {
			char last = sources.charAt(index - 1);
			if (!(last == ' ' || last == '\t' || last == '\n' || last == '\r')) {
				index = sources.indexOf(key, index + key.length());
				continue;
			}
			int idxEqual = index + key.length();
			do {
				char c = sources.charAt(idxEqual);
				if (c == '=') {
					break;
				} else if (c == ' ' || c == '\t') {
					idxEqual++;
					if (idxEqual == sources.length() - 1) {
						idxEqual = -1;
						break;
					}
				} else {
					idxEqual = -1;
					break;
				}
			} while (true);
			if (idxEqual == -1 || idxEqual == sources.length() - 1) {
				break;
			}
			char quote = 0;
			int idxQuoteStart = idxEqual + 1;
			do {
				char c = sources.charAt(idxQuoteStart);
				if (c == '\'' || c == '\"') {
					quote = c;
					break;
				} else if (c == ' ' || c == '\t') {
					idxQuoteStart++;
					if (idxQuoteStart == sources.length() - 1) {
						idxQuoteStart = -1;
						break;
					}
				} else {
					idxQuoteStart = -1;
					break;
				}
			} while (true);
			if (idxQuoteStart == -1 || idxQuoteStart == sources.length() - 1) {
				break;
			}
			int idxQuoteEnd = sources.indexOf(quote, idxQuoteStart + 1);
			if (idxQuoteEnd == -1 || idxQuoteEnd == sources.length() - 1) {
				break;
			}
			String idStr = sources.substring(idxQuoteStart + 1, idxQuoteEnd).trim();
			if (idStr.startsWith("$") && idStr.indexOf(' ') == -1) {
				vars.add(idStr);
			}
			index = sources.indexOf(key, idxQuoteEnd + 1);
		}
		return vars;
	}

	private static boolean containsBeginning(Set<String> set, String beginning) {
		for (String s : set) {
			if (s.startsWith(beginning)) {
				return true;
			}
		}
		return false;
	}
	
//	/*
//	 * Read HTML/CSS sources from @j2sXHTML, @J2SXCSS or others
//	 */
//	boolean readXSources(BodyDeclaration node, String tagName, String prefix, String suffix) {
//		boolean existed = false;
//		Javadoc javadoc = node.getJavadoc();
//		if (javadoc != null) {
//			List<?> tags = javadoc.tags();
//			if (tags.size() != 0) {
//				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
//					TagElement tagEl = (TagElement) iter.next();
//					if (tagName.equals(tagEl.getTagName())) {
//						List<?> fragments = tagEl.fragments();
//						StringBuffer buf = new StringBuffer();
//						boolean isFirstLine = true;
//						String firstLine = null;
//						for (Iterator<?> iterator = fragments.iterator(); iterator.hasNext();) {
//							TextElement commentEl = (TextElement) iterator.next();
//							String text = commentEl.getText().trim();
//							if (isFirstLine) {
//								if (text.length() == 0) {
//									continue;
//								}
//								firstLine = text.trim();
//								isFirstLine = false;
//								continue;
//							}
//							buf.append(text);
//							buf.append("\r\n");
//						}
//						String sources = buf.toString().trim();
//						sources = buildXSource(tagName, firstLine, sources);
//						buffer.append(prefix + sources + suffix);
//						existed = true;
//					}
//				}
//			}
//		}
//		return existed;
//	}
	

}
