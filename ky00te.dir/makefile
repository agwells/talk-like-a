all: ../ky00te

clean:
	rm -f y.tab.* lex.yy.*
	rm -f ../ky00te

../ky00te: y.tab.o lex.yy.o
	cc $(CFLAGS) -o ../ky00te lex.yy.o y.tab.o -lfl

lex.yy.o: lex.yy.c y.tab.h
	cc $(CFLAGS) -c lex.yy.c

y.tab.o: y.tab.c
	cc $(CFLAGS) -c y.tab.c

lex.yy.c: ky00te.lex
	flex ky00te.lex

y.tab.c: ky00te.yacc
	yacc -d ky00te.yacc

