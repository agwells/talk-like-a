LEX	= flex
BUILD	= jethro kraut cockney jive nyc ken ky00te newspeak
OTHER	= eleet b1ff chef jibberish upside-down rasterman studly fudd censor spammer
CFLAGS	= -O2
INSTALL_PROGRAM = install

# DEB_BUILD_OPTIONS suport, to control binary stripping.
ifeq (,$(findstring nostrip,$(DEB_BUILD_OPTIONS)))
INSTALL_PROGRAM += -s
endif

# And debug building.
ifneq (,$(findstring debug,$(DEB_BUILD_OPTIONS)))
CFLAGS += -g
endif

all:	$(OTHER) $(BUILD)

install:	$(BUILD) $(OTHER)
	install -d $(PREFIX)/usr/games
	$(INSTALL_PROGRAM) $(BUILD) $(PREFIX)/usr/games/
	install $(OTHER) $(PREFIX)/usr/games/
	install -d $(PREFIX)/usr/share/man/man6
	install -m 0644 filters.6 $(PREFIX)/usr/share/man/man6
	cd $(PREFIX)/usr/share/man/man6 && \
		$(foreach prog,$(BUILD) $(OTHER),ln -s filters.6 $(prog).6;)

samples:	$(BUILD) $(OTHER)
	-rm -f SAMPLES
	PATH=.:$$PATH; export PATH; echo $(BUILD) $(OTHER) |xargs -n 1 sh makesample.sh

clean:
	$(RM) -f core *.o *~ $(BUILD) *.c SAMPLES
	cd ky00te.dir && make clean

.SUFFIXES: .l

.l:
	$(RM) $*.c
	$(LEX) -t $< > $*.c
	$(CC) -O -o $@ $*.c -lfl $(CFLAGS)
	$(RM) $*.c

.SUFFIXES: .dir

.dir:	
	cd $<; make

ky00te:
	cd ky00te.dir && make

kraut:
	cd kraut.dir && lex kraut.l
	cd kraut.dir && cc kraut.c lex.yy.c -o ../kraut
