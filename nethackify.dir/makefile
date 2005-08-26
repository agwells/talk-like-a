../nethackify:
	gcc nethackify.c -o ../nethackify

test:
	@../nethackify The kitten bites.--More--
	@../nethackify You begin praying to Odin.  You finish your prayer.--More--
	@../nethackify A black glow surrounds you.

clean:
	rm -f ../nethackify

install:
	cp ../nethackify /usr/bin
	
uninstall:
	rm /usr/bin/nethackify
