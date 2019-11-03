---
---
# Contributing to the Java2Script Project

This page is for developers who like to contribute to the Java2Script project, 
i.e. like to work on the Java-to-JavaScript transpiler or the Java runtime 
environment code.

> _(If you want to use Java2Script to convert your Java applets or Java applications to 
JavaScript see "[Quick Start](quickstart.html)" instead.)_


## Fork the Java2Script repo

If you want to contribute to the Java2Script Project you should start by 
creating a fork of the project on [GitHub](https://github.com/abego/java2script).

For the following let us assume your new repo is
 `https://github.com/your-github-username/java2script`

## Clone 'your' Java2Script repo

To do actual development you will then need to clone "your" java2script repo 
into your Eclipse workspace:

```
cd workspace # where 'workspace' is your Eclipse workspace directory
git clone https://github.com/your-github-username/java2script.git
```

> _(Instead of using Git through the command line you may also use you favorite
graphical Git client.)_

Then, open Eclipse, open Navigator, and hit Refresh. java2script will show up as a blank generic trunk without a name (i.e. 'trunk[]')

![Eclipse Refresh](https://68.media.tumblr.com/47add4de1bc35f07f0e709fd6634289d/tumblr_or8mhqHsje1s5a4bko3_1280.png)

![Eclipse trunk](https://68.media.tumblr.com/866cc531b6b9d1c3dca8071732a66a26/tumblr_or8mihapDW1s5a4bko1_540.png)

Go to net.sf.j2s.core directory, Clean Project, then export as a Deployable plug-ins and fragments.

![Eclipse Deployable](https://68.media.tumblr.com/c5714cadb166c7a887fbd00110e19afc/tumblr_or8mhqHsje1s5a4bko1_1280.png)

![Eclipse Optionsj](https://68.media.tumblr.com/0a7d77765983c11ca59b4739307359ee/tumblr_or8mhqHsje1s5a4bko2_1280.png)

Core is the only thing that was affected. Hence, everything else can be built the same exact way it was built before (assuming you were using the HEAD of the master branch of j2s).
