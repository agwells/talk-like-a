LEX	= flex
BUILD	= jethro kraut cockney jive nyc ken ky00te newspeak nethackify scramble
OTHER	= eleet b1ff chef jibberish upside-down rasterman studly fudd \
	  censor spammer uniencode pirate kenny scottish fanboy LOLCAT
ifndef CFLAGS
CFLAGS = -O2
endif
CFLAGS += $(CPPFLAGS)
export CFLAGS
INSTALL_PROGRAM = install

# DEB_BUILD_OPTIONS suport, to control binary stripping.
ifeq (,$(findstring nostrip,$(DEB_BUILD_OPTIONS)))
INSTALL_PROGRAM += -s
endif

all:	$(OTHER) $(BUILD)

install:	$(BUILD) $(OTHER)
	install -d $(DESTDIR)/usr/games
	$(INSTALL_PROGRAM) $(BUILD) $(DESTDIR)/usr/games/
	install $(OTHER) $(DESTDIR)/usr/games/
	install -d $(DESTDIR)/usr/share/man/man6
	install -m 0644 filters.6 $(DESTDIR)/usr/share/man/man6
	cd $(DESTDIR)/usr/share/man/man6 && \
		$(foreach prog,$(BUILD) $(OTHER),ln -s filters.6 $(prog).6;)

clean:
	$(RM) -f core *.o *~ $(BUILD)
	cd ky00te.dir && make clean

.SUFFIXES: .l

.l:
	$(RM) $*.c
	$(LEX) -t $< > $*.c
	$(CC) -o $@ $*.c $(CFLAGS) -lfl $(LDFLAGS)
	$(RM) $*.c

.SUFFIXES: .dir

.dir:
	cd $<; make

nethackify: nethackify.c
scramble: scramble.c
