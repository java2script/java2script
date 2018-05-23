---
---
# Quick Start

## Installation

### Prerequisites

- Eclipse Neon (4.6) or higher.

_(Java2Script has been successfully tested in Eclipse Neon and Oxygen on Mac 
and Windows platforms. No reason to believe it would not also work for Linux; 
just haven't tried that recently.)_

### Install the Java2Script transpiler Eclipse plug-in

__Step 1__: Click \[[here](https://github.com/java2script/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins/net.sf.j2s.core.jar?raw=true)\] 
to download the Java2Script transpiler Eclipse plugin `net.sf.j2s.core.jar`.

> _(The Eclipse plugin `net.sf.j2s.core.jar` contains the Java-to-Java2Script 
transpiler. When Eclipse compiles Java code with this plugin installed it will
create `.js` files that match the standard `.class` files normally created 
by the Java compiler.)_

__Step 2__: Move the plugin `net.sf.j2s.core.jar` into your Eclipse dropins directory.

> __*For Mac OSX:*__ The Eclipse dropins directory is `/Applications/Eclipse.app/Contents/Eclipse/dropins`. 
This directory is not visible by default. To open it select the Finder menu item
`Go > Go to Folder [Shift-Cmd G]`, enter `/Applications/Eclipse.app/Contents/Eclipse/dropins` 
and click the `Go` button.

__Step 3__:  Restart Eclipse

__Step 4__:  Check if the plugin `net.sf.j2s.core.jar` was successfully installed. 

- Select the Eclipse menu item `Eclipse > About Eclipse`
- Click the `Installation Details` button
- Select the `Plug-ins` tab _(Wait several seconds until the table is filled.)_
- Type `j2s` into the search field at the top.

You should now see the plugin `Java2Script Core` listed in the table.

If you can't find it please check if you moved `net.sf.j2s.core.jar` into the 
proper directory. Also make sure that you restarted Eclipse.


## Create a Java2Script (J2S) Project

Create an Eclipse Java project for your work, if you have not done so already.

Make sure your source code is a _source directory_ of the project (by default: `src/`).

> If you want to check or edit the source directories of the project, select the
Eclipse menu item `Project > Properties`, click `Java Build Path` and select the
`Source` tab.

All code must be available as Java source code. Therefore your project must not 
include any dependencies to Jar files. However you may include source code 
generated from decompiling `.class` files.

> Java 9 and 10 are currently not supported. Java 8 works fine.

## Install the JavaScript version of the Java Runtime Environment 

__Step 1__: Click \[[here](https://github.com/java2script/java2script/blob/master/sources/net.sf.j2s.java.core/SwingJS-site.zip?raw=true)\]
to download the the JavaScript version of the Java Runtime Environment as a ZIP file.

__Step 2__: Unzip the ZIP file into your project directory and rename the created directory to `site`.

> All JavaScript code produced by the transpiler will be in the project's `site` directory. 

## Enable the Java2Script transpiler

__Step 1__: In your project directory create a file `.j2s` with the content:

    j2s.compiler.status=enable

__Step 2__: Make the project use the Java2Script transpiler rather than the standard Java compiler

- Edit the file `.project` your project directory
- Change the name of the `buildSpec/buildCommand` from `org.eclipse.jdt.core.javabuilder` 
to `net.sf.j2s.core.java2scriptbuilder`.

## Build the Project

Build your project as you normally would. Java class files will be created as usual in the `bin` directory.
JavaScript equivalents of these files will be created in the `site/swingjs/j2s` directory. You might have to 
do a project refresh to see these site files. 

## Test the JavaScript version of your project

The J2S transpiler will automatically set up for you in the `site` directory 
a sample HTML page for any class that subclasses JApplet or contains a 
`public void main(String[] args)` method. You will want to 
associate those files with an external HTML browser. We recommend Firefox. 

Since you will be running AJAX locally within these browsers, you may need to 
enable local file reading in your browser. Instructions for doing that can be 
found at [http://wiki.jmol.org/index.php/Troubleshooting/Local_Files](http://wiki.jmol.org/index.php/Troubleshooting/Local_Files).

## Add more Java classes

If you find you are missing a standard Java Runtime library class, please contact Bob Hanson at 
[mailto:hansonr@stolaf.edu](hansonr@stolaf.edu). You can try adding these 
yourself by **temporarily** adding one or more of the Java classes found 
at [http://grepcode.com](http://grepcode.com) to the proper package in your 
project. For example, java/awt. 

If you do that, be sure to use the OpenJDK version. Most of the current code in 
the Java2Script project started with Java 6-b14 or 6-b27. Build your project, 
then delete these Java files, because you do not necessarily want your Java code 
using that version, just JavaScript. 

## Contribute to Java2Script

Developers who like to contribute to the Java2Script project, i.e. like to work 
on the Java-to-JavaScript transpiler or the Java runtime environment code should
have a look at "[Contribution...](contribute.html)". 


