/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package org.java2script.demo.gtalk;

import java.util.Date;
import org.jivesoftware.smack.Chat;
import org.jivesoftware.smack.GoogleTalkConnection;
import org.jivesoftware.smack.XMPPException;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 * 
 * @j2sIgnoreImport org.jivesoftware.smack.Chat,org.jivesoftware.smack.GoogleTalkConnection
 */
public class JabberPool {
	/**
	 * FIXME TODO: Your default user email address, if you support default login. 
	 */
	public static final String DEAULT_USER = "defaultuser@gmail.com";
	
	public static final int MAX_CONNECTIONS = 20;
	public static final int MAX_CHATS = 20;
	
	static GoogleTalkConnection[] gts = new GoogleTalkConnection[MAX_CONNECTIONS];
	static long[] lastTimes = new long[MAX_CONNECTIONS];
	static String[] users = new String[MAX_CONNECTIONS];
	static String[] hashes = new String[MAX_CONNECTIONS];
	
	static Chat[] chats = new Chat[MAX_CHATS];
	static long[] lastChatTimes = new long[MAX_CHATS];
	static String[] friends = new String[MAX_CHATS];
	
	
	/**
	 * @j2sIgnore
	 */
	public static String getHashCode(String user, String password) {
		return "" + (user + password).hashCode();
	}
	
	/**
	 * @j2sIgnore
	 */
	public static int getGTalkSlot() {
		for (int i = 0; i < MAX_CONNECTIONS; i++) {
			if (users[i] == null && gts[i] == null) {
				return i;
			}
		}
		int index = 0;
		long oldest = new Date().getTime();
		for (int i = 0; i < MAX_CONNECTIONS; i++) {
			if (lastTimes[i] < oldest) {
				index = i;
				oldest = lastTimes[i];
			}
		}
		return index;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static int getGChatSlot() {
		for (int i = 0; i < MAX_CHATS; i++) {
			if (friends[i] == null && chats[i] == null) {
				return i;
			}
		}
		int index = 0;
		long oldest = new Date().getTime();
		for (int i = 0; i < MAX_CHATS; i++) {
			if (lastChatTimes[i] < oldest) {
				index = i;
				oldest = lastChatTimes[i];
			}
		}
		return index;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static String login(String user, String password) {
		if (DEAULT_USER.equals(user)) {
			/**
			 * FIXME TODO: Your default user password, if you support default login. 
			 */
			password = "defaultpassword";
		}
		if (user != null && password != null) {
			long now = new Date().getTime();
			for (int i = 0; i < MAX_CONNECTIONS; i++) {
				if (user.equals(users[i]) && gts[i] != null
						&& hashes[i] != null && hashes[i].equals(getHashCode(user, password))) {
					lastTimes[i] = now;
					return hashes[i];
				}
			}
			try {
				GoogleTalkConnection gt = new GoogleTalkConnection();
				String id = user;
				if (id.indexOf("@") != -1) {
					id = id.substring(0, id.indexOf("@"));
				}
				gt.login(id, password);
				int index = getGTalkSlot();
				gts[index] = gt;
				lastTimes[index] = now;
				users[index] = user;
				hashes[index] = getHashCode(user, password);
				return hashes[index];
			} catch (XMPPException e) {
				e.printStackTrace();
				return null;
			}
		}
		return null;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static boolean logout(String user, String hash) {
		if (DEAULT_USER.equals(user)) {
			return true; // don't login this default user!
		}
		if (user != null && hash != null) {
			for (int i = 0; i < MAX_CONNECTIONS; i++) {
				if (user.equals(users[i]) && gts[i] != null
						&& hash.equals(hashes[i])) {
					// close all chats
					for (int j = 0; j < MAX_CHATS; j++) {
						if (friends[j] != null && friends[j].startsWith(user + "#")) {
							chats[j] = null;
							friends[j] = null;
							lastChatTimes[j] = 0;
						}
					}
					// close connection
					gts[i] = null;
					users[i] = null;
					hashes[i] = null;
					lastTimes[i] = 0;
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * @j2sIgnore
	 */
	static int getAuthorizedConnectionSlot(String user, String hash) {
		for (int i = 0; i < MAX_CONNECTIONS; i++) {
			if (user.equals(users[i]) && gts[i] != null
					&& hash.equals(hashes[i])) {
				lastTimes[i] = new Date().getTime();
				return i;
			}
		}
		return -1;
	}
	/**
	 * @j2sIgnore
	 */
	public static GoogleTalkConnection getAuthorizedConnection(String user, String hash) {
		for (int i = 0; i < MAX_CONNECTIONS; i++) {
			if (user.equals(users[i]) && gts[i] != null
					&& hash.equals(hashes[i])) {
				lastTimes[i] = new Date().getTime();
				return gts[i];
			}
		}
		return null;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static Chat openChat(String user, String hash, String friend) {
		int index = getAuthorizedConnectionSlot(user, hash);
		if (index != -1 && friend != null) {
			String id = user + "#" + friend;
			long now = new Date().getTime();
			for (int i = 0; i < MAX_CHATS; i++) {
				if (id.equals(friends[i]) && chats[i] != null) {
					lastChatTimes[i] = now;
					return chats[i];
				}
			}
			GoogleTalkConnection gt = gts[index];
			int slot = getGChatSlot();
			Chat chat = gt.createChat(friend);
			chats[slot] = chat;
			friends[slot] = id;
			lastChatTimes[slot] = now;
			return chat;
		}
		return null;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static boolean closeChat(String user, String hash, String friend) {
		int index = getAuthorizedConnectionSlot(user, hash);
		if (index != -1 && friend != null) {
			String id = user + "#" + friend;
			for (int i = 0; i < MAX_CHATS; i++) {
				if (id.equals(friends[i]) && chats[i] != null) {
					chats[i] = null;
					friends[i] = null;
					lastChatTimes[i] = 0;
					return true;
				}
			}
		}
		return false;
	}
	
}
