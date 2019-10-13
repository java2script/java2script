# Notes for developers of java2script/SwingJS

These notes are for developers of SwingJS, not for users of SwingJS.

see also https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/doc/howItWorks.md
```
cd workspace (where workspace is your Eclipse Neon Workspace)
git clone https://github.com/BobHanson/java2script.git
git checkout swingjs
```

Then, open Eclipse, open Navigator, and hit Refresh. java2script will show up as a blank generic trunk without a name (i.e. 'trunk[]')

![Eclipse Refresh](https://68.media.tumblr.com/47add4de1bc35f07f0e709fd6634289d/tumblr_or8mhqHsje1s5a4bko3_1280.png)

![Eclipse trunk](https://68.media.tumblr.com/866cc531b6b9d1c3dca8071732a66a26/tumblr_or8mihapDW1s5a4bko1_540.png)

Or, do the equivalent tasks on Eclipse's graphical git tool.

Go to net.sf.j2s.core directory, Clean Project, then export as a Deployable plug-ins and fragments.

![Eclipse Deployable](https://68.media.tumblr.com/c5714cadb166c7a887fbd00110e19afc/tumblr_or8mhqHsje1s5a4bko1_1280.png)

![Eclipse Optionsj](https://68.media.tumblr.com/0a7d77765983c11ca59b4739307359ee/tumblr_or8mhqHsje1s5a4bko2_1280.png)

Core is the only thing that was affected. Hence, everything else can be built the same exact way it was built before (assuming you were using the HEAD of the master branch of j2s).
