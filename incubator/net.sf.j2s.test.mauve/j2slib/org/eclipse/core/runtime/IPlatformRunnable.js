Clazz.declarePackage ("org.eclipse.core.runtime");
c$ = Clazz.declareInterface (org.eclipse.core.runtime, "IPlatformRunnable");
c$.EXIT_OK = c$.prototype.EXIT_OK =  new Integer (0);
c$.EXIT_RESTART = c$.prototype.EXIT_RESTART =  new Integer (23);
c$.EXIT_RELAUNCH = c$.prototype.EXIT_RELAUNCH =  new Integer (24);
