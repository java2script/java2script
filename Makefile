# To use this file, run:
#
# $ make CONFIGURE_FLAGS="-Dplugin.path=/path/to/your/eclipse/plugins"
#
# For example, on Debian GNU/Linux:
#
# $ make CONFIGURE_FLAGS="-Dplugin.path=/usr/lib/eclipse:/usr/share/eclipse/dropins/jdt"
#
# You can also add e.g. "-DforceContextQualifier=none" to make the jars be
# output under a stable filename.
#
# Due to https://github.com/zhourenjian/java2script/issues/7 you may need to
# run this using xvfb https://packages.debian.org/sid/xvfb
#
CONFIGURE_FLAGS +=
CORE_FLAGS += -DjavacFailOnError=true
INCUBATOR_FLAGS += -DjavacFailOnError=true -DjavacSource=1.6 -DjavacTarget=1.6

# Order is important; dependencies must go earlier.
CORE_PLUGINS = net.sf.j2s.core net.sf.j2s.ajax net.sf.j2s.ui net.sf.j2s.lib
INCUBATOR_PLUGINS = net.sf.j2s.ui.template.velocity net.sf.j2s.ui.cmdline
CORE_J2SLIB = net.sf.j2s.ajax net.sf.j2s.java.core net.sf.j2s.java.org.eclipse.swt

BUILD_WORKSPACE := $(PWD)/autobuild
ECLIPSE_AUTO = eclipse \
	-configuration $(BUILD_WORKSPACE)/configuration \
	-user $(BUILD_WORKSPACE) \
	-data $(BUILD_WORKSPACE) \
	-nosplash -clean

ECLIPSE_ANT = $(ECLIPSE_AUTO) \
	-application org.eclipse.ant.core.antRunner
ECLIPSE_ANT_BUILD = $(ECLIPSE_ANT) build.update.jar
ECLIPSE_ANT_CLEAN = if [ -f build.xml ]; then \
	$(ECLIPSE_ANT) clean; \
	rm -rf build.xml javaCompiler...args; \
fi
ECLIPSE_J2S = $(ECLIPSE_AUTO) \
	-application net.sf.j2s.ui.cmdlineApi

all: build-libs

configure:
	$(ECLIPSE_ANT) -f configure.xml $(CONFIGURE_FLAGS)

build-plugins: configure
	set -e; for i in $(CORE_PLUGINS:%=sources/%); do \
		( cd $$i && $(ECLIPSE_ANT_BUILD) $(CORE_FLAGS); ) \
	done
	set -e; for i in $(INCUBATOR_PLUGINS:%=incubator/%); do \
		( cd $$i && $(ECLIPSE_ANT_BUILD) $(INCUBATOR_FLAGS); ) \
	done

local-install-plugins: build-plugins
	$(MAKE) DESTDIR=$(BUILD_WORKSPACE) eclipsedir= install-plugins
	mkdir -p $(BUILD_WORKSPACE)/features
	touch $(BUILD_WORKSPACE)/artifacts.xml
	$(ECLIPSE_AUTO) -initialize

build-libs: local-install-plugins
	set -e; for i in $(CORE_J2SLIB); do \
		$(ECLIPSE_J2S) -cmd build -path $$PWD/sources/$$i; \
	done
	mkdir -p sources/net.sf.j2s.lib/bin sources/net.sf.j2s.lib/j2slib
	cd sources/net.sf.j2s.lib/bin && jar xf ../library.jar
	cd sources/net.sf.j2s.lib && ant -f build/build.xml
	cd sources/net.sf.j2s.lib && zip -r j2slib.zip j2slib

clean:
	for i in $(INCUBATOR_PLUGINS:%=incubator/%); do \
		( cd $$i && $(ECLIPSE_ANT_CLEAN); ) \
	done
	for i in $(CORE_PLUGINS:%=sources/%); do \
		( cd $$i && $(ECLIPSE_ANT_CLEAN); ) \
	done
	rm -rf $(BUILD_WORKSPACE)/.metadata

prefix ?= /usr/local
eclipsedir ?= $(prefix)/share/eclipse
datadir ?= $(prefix)/share/java2script
pluginsdir ?= $(eclipsedir)/plugins

install-plugins:
	test -z "$(DESTDIR)$(pluginsdir)" || mkdir -p "$(DESTDIR)$(pluginsdir)"
	install -t "$(DESTDIR)$(pluginsdir)" \
	  $(join $(CORE_PLUGINS:%=sources/%/),$(CORE_PLUGINS:%=%_2.0.0.jar)) \
	  $(join $(INCUBATOR_PLUGINS:%=incubator/%/),$(INCUBATOR_PLUGINS:%=%_1.0.0.*.jar))

install: install-plugins
	test -z "$(DESTDIR)$(datadir)" || mkdir -p "$(DESTDIR)$(datadir)"
	install -t "$(DESTDIR)$(datadir)" \
	  sources/net.sf.j2s.lib/j2slib.zip

.PHONY: all configure build-plugins local-install-plugins build-libs clean install-plugins install
