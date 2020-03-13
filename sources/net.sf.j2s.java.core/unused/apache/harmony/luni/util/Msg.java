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

package org.apache.harmony.luni.util;

/**
 * This class retrieves strings from a resource bundle and returns them,
 * formatting them with MessageFormat when required.
 * <p>
 * It is used by the system classes to provide national language support, by
 * looking up messages in the <code>
 *    org.apache.harmony.luni.util.ExternalMessages
 * </code>
 * resource bundle. Note that if this file is not available, or an invalid key
 * is looked up, or resource bundle support is not available, the key itself
 * will be returned as the associated message. This means that the <em>KEY</em>
 * should a reasonable human-readable (english) string.
 * 
 */
public class Msg {

	final static String msgs = "K0006=Negative index specified\r\nK0007=attempt to write after finish\r\nK0008=Cannot read version\r\nK0009=Missing version string\\: {0}\r\nK000a=Entry is not named\r\nK000b=Invalid attribute {0}\r\nK000c=cannot resolve subclasses\r\nK000d=Unknown attribute\r\nK000e=Cannot add attributes to empty string\r\nK0014=Unquoted {0} in suffix\\: {1}\r\nK0015=Unexpected {0} in fraction\\: {1}\r\nK0016=Unexpected {0} in {1}\r\nK0017=Missing pattern before {0} in {1}\r\nK0018=Missing exponent format {0}\r\nK0019=Unterminated quote {0}\r\nK001a=Missing grouping format {0}\r\nK001b=Invalid exponent format {0}\r\nK001c=Invalid pattern char {0} in {1}\r\nK001d=Invalid argument number\r\nK001e=Missing element format\r\nK001f=Unknown element format\r\nK0020=Unknown format\r\nK002b=Unknown pattern character - \'{0}\'\r\nK002c=Access denied {0}\r\nK002e=Offset out of bounds\r\nK002f=Arguments out of bounds\r\nK0032=Address null or destination port out of range\r\nK0033=Unknown socket type\r\nK0034=Packet address mismatch with connected address\r\nK0035=Zero or negative buffer size\r\nK0036=Invalid negative timeout\r\nK0037=Connection already established\r\nK0038=No host name provided\r\nK0039=Attempted to join a non-multicast group\r\nK003a=Attempted to leave a non-multicast group\r\nK003c=TimeToLive out of bounds\r\nK003d=Socket is closed\r\nK003e=SOCKS connection failed\\: {0}\r\nK003f=Unable to connect to SOCKS server\\: {0}\r\nK0040=Invalid SOCKS client.\r\nK0041=Socket implementation does not support SOCKS.\r\nK0042=Socket implementation factory already set\r\nK0044=The factory has already been set\r\nK0045=Attempted to set a negative SoLinger\r\nK0046=Local port declared out of range\r\nK0047=buffer is null\r\nK0048=Invalid action specified\\: {0}\r\nK0049=MinPort is greater than MaxPort\r\nK004a=Invalid port number specified\r\nK004b=Attempt to set factory more than once.\r\nK004c=Package is sealed\r\nK004d=Does not support writing to the input stream\r\nK004e=Duplicate Factory\r\nK004f=rounding necessary\r\nK0050=wrong rounding mode\r\nK0051=scale value < than zero\r\nK0052=Array index out of range\\: {0}\r\nK0053=Package {0} already defined.\r\nK0055=String index out of range\\: {0}\r\nK0056=Already destroyed\r\nK0057=Has threads\r\nK0058=size must be > 0\r\nK0059=Stream is closed\r\nK005a=Mark has been invalidated.\r\nK005b=BufferedReader is closed\r\nK005c=Invalid Mark.\r\nK005d=Writer is closed.\r\nK005e=size must be >\\= 0\r\nK005f=Does not support writing to the output stream\r\nK0060=CharArrayReader is closed.\r\nK0062=Second byte at {0} does not match UTF8 Specification\r\nK0063=Third byte at {0} does not match UTF8 Specification\r\nK0064=Second or third byte at {0} does not match UTF8 Specification\r\nK0065=Input at {0} does not match UTF8 Specification\r\nK0066=Entry already exists: {0}\r\nK0068=String is too long\r\nK0069=File cannot compare to non File\r\nK006a=time must be positive\r\nK006b=Prefix must be at least 3 characters\r\nK006c=FileDescriptor is null\r\nK006d=actions invalid\r\nK006e=path is null\r\nK006f=invalid permission\\: {0}\r\nK0070=InputStreamReader is closed.\r\nK0071=Error fetching SUID\\: {0}\r\nK0072={0} computing SHA-1 / SUID\r\nK0073=OutputStreamWriter is closed.\r\nK0074=Not connected\r\nK0075=InputStream is closed\r\nK0076=Pipe broken\r\nK0077=Crc mismatch\r\nK0078=Pipe is closed\r\nK0079=Already connected\r\nK007a=Pipe already connected\r\nK007b=Pipe Not Connected\r\nK007e=Pushback buffer full\r\nK007f=Mark/Reset not supported\r\nK0080=Reader is closed\r\nK0081=Mode must be one of \"r\" or \"rw\"\r\nK0083=StringReader is closed.\r\nK0084=can only instantiate one BootstrapClassLoader\r\nK0086=Referenced reflect object is no longer valid\r\nK0087=Referenced reflect object is no longer valid\\: {0}\r\nK0088=Incorrect end of BER tag\r\nK0089=Unknown type\\: {0}\r\nK008a=Read {0} bytes trying to read {1} bytes from {2}\r\nK008b=Position\\: {0}\r\nK008c=Invalid Base64 char\\:{0}\r\nK008d=This protocol does not support input\r\nK008e=Does not support output\r\nK008f=This method does not support writing\\: {0}\r\nK0090=can\'t open OutputStream after reading from an inputStream\r\nK0091=Cannot access request header fields after connection is set\r\nK0092=Cannot set method after connection is made\r\nK0093=Too many redirects\r\nK0094=Unable to change directories\r\nK0095=Could not establish data connection\r\nK0096=Unable to retrieve file\\: {0}\r\nK0097=Unable to connect to server\\: {0}\r\nK0098=Unable to log into server\\: {0}\r\nK0099=Unable to configure data port\r\nK009a=Unable to store file\r\nK009b=Unable to set transfer type\r\nK00a2=Parsing policy file\\: {0}, expected quoted {1}, found unquoted\\: {2}\r\nK00a3=Parsing policy file\\: {0}, found unexpected\\: {1}\r\nK00a4=Content-Length underflow\r\nK00a5=Invalid parameter - {0}\r\nK00a8=Parsing policy file\\: {0}, invalid codesource URL\\: {1}\r\nK00ab=No active entry\r\nK00ae=Size mismatch\r\nK00af=Invalid proxy port\\: {0}\r\nK00b0=Proxy port out of range\r\nK00b1=Invalid port number\r\nK00b2=Content-Length exceeded\r\nK00b3=Unknown protocol\\: {0}\r\nK00b6=No entries\r\nK00b7=File is closed\r\nK00c1=Illegal character\r\nK00cd=Failure to connect to SOCKS server.\r\nK00ce=Unable to connect to identd to verify user.\r\nK00cf=Failure - user ids do not match.\r\nK00d0=Success\r\nK00d1=Read null attempting to read class descriptor for an object\r\nK00d2=Wrong format\\: 0x{0}\r\nK00d3=Read an exception\r\nK00d4={2} - {0} not compatible with {1}\r\nK00d5=Invalid typecode\\: {0}\r\nK00d7=Wrong base type in\\: {0}\r\nK00d8=Protocol not found\\: {0}\r\nK00d9=Callback object cannot be null\r\nK00da=Incompatible class (SUID)\\: {0} but expected {1}\r\nK00dc=IllegalAccessException\r\nK00e3=Could not create specified security manager\\: {0}\r\nK00e4=Key usage is critical and cannot be used for digital signature purposes.\r\nK00e5=month\\: {0}\r\nK00e6=day of month\\: {0}\r\nK00e7=day of week\\: {0}\r\nK00e8=time\\: {0}\r\nK00e9=DST offset\\: {0}\r\nK00ea=era\\: {0}\r\nK00eb={0} failed verification of {1}\r\nK00ec={0} has invalid digest for {1} in {2}\r\nK00ed={0} is not an interface\r\nK00ee={0} is not visible from class loader\r\nK00ef={0} appears more than once\r\nK00f0=non-public interfaces must be in the same package\r\nK00f1=not a proxy instance\r\nK00f2=the methods named {0} must have the same return type\r\nK00f3=Timer was cancelled\r\nK00f5=Illegal delay to start the TimerTask\r\nK00f6=TimerTask is scheduled already\r\nK00f7=TimerTask is cancelled\r\nK00f8=day of week in month\\: {0}\r\nK00f9=min or max digit count too large\r\nK00fa=min digits greater than max digits\r\nK00fb=min or max digits negative\r\nK00fc=Jar entry not specified\r\nK00fd=Invalid keystore\r\nK00fe=Incorrect password\r\nK0185=The alias already exists for a key entry.\r\nK018f=Can\'t convert to BMPString \\: {0}\r\nK0190=No data to decode\r\nK0191=Invalid size, must be a multiple of 64 from 512 to 1024\r\nK0193=An identity with this name already exists in this scope\r\nK0194=An identity in the scope has the same public key\r\nK0195=The existing public key and the one contained in the certificate do not match.\r\nK0196=Certificate is missing\r\nK0199=Count out of range\r\nK01a0=End of stream condition\r\nK01a4=Already shutting down\r\nK01a5=Illegal shutdown hook\\: {0}\r\nK01a6=Invalid filter\r\nK01a7=Name too long: {0}\r\nK01b3=Incorrect number of arguments\r\nK01b4=Cannot convert {0} to {1}\r\nK01b6=Cannot find \\!/\r\nK01c1=File is a Directory\r\nK01c2=Cannot create\\: {0}\r\nK01c3=Unable to open\\: {0}\r\nK01c4=Invalid zip file\\: {0}\r\nK01c6=No Main-Class specified in manifest\\: {0}\r\nK01d1=Signers of \'{0}\' do not match signers of other classes in package\r\nK01d2={1} - protected system package \'{0}\'\r\nK01ec=key size must be a multiple of 8 bits\r\nK01ed=key size must be at least 512 bits\r\nK01fe=Incomplete % sequence at\\: {0}\r\nK01ff=Invalid % sequence ({0}) at\\: {1}\r\nK0220=UTFDataFormatException\r\nK0222=No Manifest found in jar file\\: {0}\r\nK0300=Unsupported encoding\r\nK0301=Not signed data\r\nK0302=Relative path\r\nK0303=Scheme-specific part expected\r\nK0304=Authority expected\r\nK0305=Illegal character in scheme\r\nK0306={0} in schemeSpecificPart\r\nK0307={0} in authority\r\nK0308={0} in path\r\nK0309={0} in query\r\nK030a={0} in fragment\r\nK030c=Expected host\r\nK030d=Illegal character in userinfo\r\nK030e=Expected a closing square bracket for ipv6 address\r\nK030f=Malformed ipv6 address\r\nK0310=Illegal character in host name\r\nK0311=Malformed ipv4 address\r\nK0312=URI is not absolute\r\nK0313=Incomplete % sequence\r\nK0314=Invalid % sequence ({0})\r\nK0315=Socket is already bound\r\nK0316=SocketAddress {0} not supported\r\nK0317=Host is unresolved\\: {0}\r\nK0318=SocketAddress is null\r\nK0319=Exception in thread \"{0}\"\\ \r\nK031a=URI is not absolute\\: {0}\r\nK031b=URI is not hierarchical\\: {0}\r\nK031c=Expected file scheme in URI\\: {0}\r\nK031d=Expected non-empty path in URI\\: {0}\r\nK031e=Found {0} component in URI\\: {1}\r\nK031f=Socket is not bound\r\nK0320=Socket is not connected\r\nK0321=Socket input is shutdown\r\nK0322=Not a supported ISO 4217 Currency Code\\: {0}\r\nK0323=Not a supported ISO 3166 Country locale\\: {0}\r\nK0324=Needs dictionary\r\nK0325=Port out of range\\: {0}\r\nK0326={0} at index {1}\\: {2}\r\nK0327={0}\\: {1}\r\nK0328=Certificate not yet valid\r\nK0329=Certificate expired\r\nK0330=interface name is null\r\nK0331=address is null\r\nK0332=Invalid IP Address is neither 4 or 16 bytes\\: {0}\r\nK0333=Urgent data not supported\r\nK0334=Cannot set network interface with null\r\nK0335=No addresses associated with Interface\r\nK0337=null type not allowed\r\nK0338=Address not associated with an interface - not set\r\nK0339=Invalid IP Address is neither 4 or 16 bytes\r\nK0340={0} incompatible with {1}\r\nK0342=Scheme expected\r\nK0344=Not a valid {0}, subclass should override readResolve()\r\nK0346=Unmatched braces in the pattern\r\nK0347=seek position is negative\r\nK0348=Format specifier \'{0}\'\r\nK0349=Conversion is \'{0}\'\r\nK034a=The flags are {0}\r\nK034b=url and proxy can not be null\r\nK034c=proxy should not be null\r\nK034d=method has not been implemented yet\r\nK034e=Build rules empty\r\nK0351=format is null\r\nKA000=Line too long\r\nKA001=Argument must not be null\r\nKA002=Unshared read of back reference\r\nKA003=different mode already set\r\nKA004=Enums may not be cloned\r\nKA005={0} is not an enum type\r\nKA006={0} is not a constant in the enum type {1}\r\nKA007=field is null\r\nKA008={0} is an illegal radix\r\nKA009=CharsetName is illegal\r\nKA00a=File is null\r\nKA00b=InputStream is null\r\nKA00c=Readable is null\r\nKA00d=ReadableByteChannel is null\r\nKA00e=Radix {0} is less than Character.MIN_RADIX or greater than Character.MAX_RADIX\r\nKA00f=Socket output is shutdown\r\nKA010=Cannot read back reference to unshared object\r\nKA011=Malformed reply from SOCKS server\r\nKA012=No such file or directory\r\nKA013=Number of bytes to skip cannot be negative\r\nKA014=Invalit UUID string\r\nKA015=Incompatible class (base name)\\: {0} but expected {1}\r\n\r\n";

	// ResourceBundle holding the system messages.
//	static private ResourceBundle bundle = null;

//	/**
//	 * @j2sIgnore
//	 */
//	static {
//		// Attempt to load the messages.
//		try {
//			bundle = MsgHelp.setLocale(Locale.getDefault(),
//					"org.apache.harmony.luni.util.ExternalMessages");
//		} catch (Throwable e) {
//			e.printStackTrace();
//		}
//	}

	/**
	 * Retrieves a message which has no arguments.
	 * 
	 * @param msg
	 *            String the key to look up.
	 * @return String the message for that key in the system message bundle.
	 */
	static public String getString(String msg) {
		return getMsg(msg);
//		if (bundle == null)
//			return msg;
//		try {
//			return bundle.getString(msg);
//		} catch (MissingResourceException e) {
//			return msg;
//		}
	}

	/**
	 * Retrieves a message which takes 1 argument.
	 * 
	 * @param msg
	 *            String the key to look up.
	 * @param arg
	 *            Object the object to insert in the formatted output.
	 * @return String the message for that key in the system message bundle.
	 */
	static public String getString(String msg, Object arg) {
		return getString(msg, new Object[] { arg });
	}

	/**
	 * Retrieves a message which takes 1 integer argument.
	 * 
	 * @param msg
	 *            String the key to look up.
	 * @param arg
	 *            int the integer to insert in the formatted output.
	 * @return String the message for that key in the system message bundle.
	 */
	static public String getString(String msg, int arg) {
		return getString(msg, new Object[] { Integer.toString(arg) });
	}

	/**
	 * Retrieves a message which takes 1 character argument.
	 * 
	 * @param msg
	 *            String the key to look up.
	 * @param arg
	 *            char the character to insert in the formatted output.
	 * @return String the message for that key in the system message bundle.
	 */
	static public String getString(String msg, char arg) {
		return getString(msg, new Object[] { String.valueOf(arg) });
	}

	/**
	 * Retrieves a message which takes 2 arguments.
	 * 
	 * @param msg
	 *            String the key to look up.
	 * @param arg1
	 *            Object an object to insert in the formatted output.
	 * @param arg2
	 *            Object another object to insert in the formatted output.
	 * @return String the message for that key in the system message bundle.
	 */
	static public String getString(String msg, Object arg1, Object arg2) {
		return getString(msg, new Object[] { arg1, arg2 });
	}

	/**
	 * Retrieves a message which takes several arguments.
	 * 
	 * @param msg
	 *            String the key to look up.
	 * @param args
	 *            Object[] the objects to insert in the formatted output.
	 * @return String the message for that key in the system message bundle.
	 */
	static public String getString(String msg, Object[] args) {
		String format = getMsg(msg);
//		
//
//		if (bundle != null) {
//			try {
//				format = bundle.getString(msg);
//			} catch (MissingResourceException e) {
//			}
//		}
//
		return format(format, args);
	}

	/**
	 * SwingJS minimal support for harmony error messages
	 * 
	 * @param msg
	 * @return
	 */
	private static String getMsg(String msg) {
		int pt = msgs.indexOf(msg);
		return (pt < 0 ? msg : msg.substring(pt + 6, msg.indexOf("\r", pt)));
	}
	
	// from MsgHelp.java
	
	/**
	 * Generates a formatted text string given a source string containing
	 * "argument markers" of the form "{argNum}" where each argNum must be in
	 * the range 0..9. The result is generated by inserting the toString of each
	 * argument into the position indicated in the string.
	 * <p>
	 * To insert the "{" character into the output, use a single backslash
	 * character to escape it (i.e. "\{"). The "}" character does not need to be
	 * escaped.
	 * 
	 * @param format
	 *            String the format to use when printing.
	 * @param args
	 *            Object[] the arguments to use.
	 * @return String the formatted message.
	 */
	public static String format(String format, Object[] args) {
		StringBuilder answer = new StringBuilder(format.length()
				+ (args.length * 20));
		String[] argStrings = new String[args.length];
		for (int i = 0; i < args.length; ++i) {
			if (args[i] == null)
				argStrings[i] = "<null>";
			else
				argStrings[i] = args[i].toString();
		}
		int lastI = 0;
		for (int i = format.indexOf('{', 0); i >= 0; i = format.indexOf('{',
				lastI)) {
			if (i != 0 && format.charAt(i - 1) == '\\') {
				// It's escaped, just print and loop.
				if (i != 1)
					answer.append(format.substring(lastI, i - 1));
				answer.append('{');
				lastI = i + 1;
			} else {
				// It's a format character.
				if (i > format.length() - 3) {
					// Bad format, just print and loop.
					answer.append(format.substring(lastI, format.length()));
					lastI = format.length();
				} else {
//					int argnum = (byte) Character.digit(format.charAt(i + 1),
//							10);
					int argnum = (byte) (format.charAt(i + 1) - '0');
					if (argnum < 0 || format.charAt(i + 2) != '}') {
						// Bad format, just print and loop.
						answer.append(format.substring(lastI, i + 1));
						lastI = i + 1;
					} else {
						// Got a good one!
						answer.append(format.substring(lastI, i));
						if (argnum >= argStrings.length)
							answer.append("<missing argument>");
						else
							answer.append(argStrings[argnum]);
						lastI = i + 3;
					}
				}
			}
		}
		if (lastI < format.length())
			answer.append(format.substring(lastI, format.length()));
		return answer.toString();
	}

}
