# Various dialect translators.

LEX	 = flex

ALL	 = jive valspeak nyc cockney fin biffa ken aust drawl \
		kraut newspeak chef mb censor fudd moo buck \
		jethro b1ff
OTHER	 = ky00te

all:	$(OTHER) $(ALL)

install:	$(ALL) $(OTHER)
	install -d $(PREFIX)/usr/games
	install -s $(ALL) $(OTHER) $(PREFIX)/usr/games/
	install -d $(PREFIX)/usr/man/man6
	install -m 0644 filters.6 $(PREFIX)/usr/man/man6
	cd $(PREFIX)/usr/man/man6 && \
		$(foreach prog,$(ALL) $(OTHER),ln -s filters.6 $(prog).6;)

samples:	$(ALL) $(OTHER)
	echo $(ALL) $(OTHER) |xargs -n 1 sh makesample.sh

clean:
	$(RM) -f core *.o *~ $(ALL) *.c SAMPLES
	cd ky00te.dir; make clean	

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
