# Various dialect translators.

LEX	 = flex

ALL	 = jethro kraut cockney jive nyc
OTHER	 = eleet b1ff chef jibberish upside-down

all:	$(OTHER) $(ALL)

install:	$(ALL) $(OTHER)
	install -d $(PREFIX)/usr/games
	install $(ALL) $(OTHER) $(PREFIX)/usr/games/
	install -d $(PREFIX)/usr/share/man/man6
	install -m 0644 filters.6 $(PREFIX)/usr/share/man/man6
	cd $(PREFIX)/usr/share/man/man6 && \
		$(foreach prog,$(ALL) $(OTHER),ln -s filters.6 $(prog).6;)

samples:	$(ALL) $(OTHER)
	-rm -f SAMPLES
	PATH=. echo $(ALL) $(OTHER) |xargs -n 1 sh makesample.sh

clean:
	$(RM) -f core *.o *~ $(ALL) *.c SAMPLES

.SUFFIXES: .l

.l:
	$(RM) $*.c
	$(LEX) -t $< > $*.c
	$(CC) -O -o $@ $*.c -lfl -g
#	strip $@
	$(RM) $*.c

.SUFFIXES: .dir

.dir:	
	cd $<; make

kraut:
	cd kraut.dir && lex kraut.l
	cd kraut.dir && cc kraut.c lex.yy.c -o ../kraut
