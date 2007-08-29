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
package net.sf.j2s.ui.resources;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */
public class FileSystemUtils {
    public static void copyFolder(String srcPath, String destPath, boolean overwrite) {
        File srcFolder = new File(srcPath);
        if (srcFolder.exists() && srcFolder.isDirectory()) {
            File destFolder = new File(destPath);
            if (destFolder.exists() && destFolder.isDirectory()) {
                //return ;
            } else {
                try {
                    destFolder.mkdirs();
                } catch (Exception e) {
                }
            }
            FileFilter filter = new FileFilter() {
                public boolean accept(File file) {
                    if (file.isDirectory()) {
                        String name = file.getName();
                        if (name.equals("CVS")) {
                            return false;
                        }
                    }
                    if (file.getAbsolutePath().endsWith(".swp")) {
                        return false;
                    }
                    return true;
                }
            };
            File[] files = srcFolder.listFiles(filter);
            for (int i = 0; i < files.length; i++) {
                File file = new File(destFolder, files[i].getName());
                if (files[i].isDirectory()) {
                    copyFolder(files[i].getAbsolutePath(), file.getAbsolutePath(), overwrite);
                } else {
                    if (!file.exists() || overwrite) {
                        streamCopyFile(files[i], file);
                    }
                }
            }
        }
    }
    
    public static void copyFile(String srcFile, String destFile) {
        streamCopyFile(new File(srcFile), new File(destFile));
    }
    public static void streamCopyFile(File srcFile, File destFile) {
        try {
            FileInputStream fi = new FileInputStream(srcFile);
            FileOutputStream fo = new FileOutputStream(destFile);
            byte[] buf = new byte[1024];
            int readLength = 0;
            while (readLength != -1) {
                readLength = fi.read(buf);
                if (readLength != -1) {
                    fo.write(buf, 0, readLength);
                }
            }
            fo.close();
            fi.close();
        } catch (Exception e) {
        }
    }
}
