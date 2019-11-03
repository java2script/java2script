Clazz.declarePackage ("org.eclipse.osgi.service.environment");
c$ = Clazz.declareInterface (org.eclipse.osgi.service.environment, "Constants");
Clazz.defineStatics (c$,
"OS_WIN32", "win32",
"OS_LINUX", "linux",
"OS_AIX", "aix",
"OS_SOLARIS", "solaris",
"OS_HPUX", "hpux",
"OS_QNX", "qnx",
"OS_MACOSX", "macosx",
"OS_UNKNOWN", "unknown",
"ARCH_X86", "x86",
"ARCH_PA_RISC", "PA_RISC",
"ARCH_PPC", "ppc",
"ARCH_SPARC", "sparc",
"ARCH_X86_64", "x86_64");
c$.ARCH_AMD64 = c$.prototype.ARCH_AMD64 = "x86_64";
Clazz.defineStatics (c$,
"ARCH_IA64", "ia64",
"ARCH_IA64_32", "ia64_32",
"WS_WIN32", "win32",
"WS_MOTIF", "motif",
"WS_GTK", "gtk",
"WS_PHOTON", "photon",
"WS_CARBON", "carbon",
"WS_UNKNOWN", "unknown");
