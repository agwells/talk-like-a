
T	[" .!?,"]*
%%

look			printf("watch");
watch			printf("look");
hear			printf("listen");
listen			printf("hear");
good			printf("well");
well			printf("good");
say			printf("speaks");
said			printf("speaked");
being			printf("be");
ck			printf("kk");
nn			printf("n");
mm			printf("m");
tt			printf("t");
ss			printf("s");
dd			printf("d");
" had "			printf(" have ");
" than "		printf(" to ");
" was "			printf(" were ");
" can "			printf(" be able to ");
" do "			printf(" doing ");
" does "		printf(" doings ");
" see "			printf(" be seeing ");
" be "			printf(" being ");
" am "			printf(" do be ");
" as "			printf(" so ");
" so "			printf(" as ");
" is "			printf(" does be ");
" my "			printf(" the of me ");
"My "			printf("The of me ");
" his "			printf(" the of him ");
"His "			printf("The of him ");
[Yy]our			printf("the of you");
" a "			printf(" ");
" the "			printf(" ");
"A "			printf("One ");
"ts "			printf("t's ");
"t's "			printf("ts ");
[Tt]hat			printf("this");
[Tt]his			printf("that");
into			printf("in");
" in "			printf(" into ");
onto			printf("on");
" on "			printf(" onto ");
never			printf("not once");
[Oo]nce			printf("one time");
[Tt]wice		printf("two times");
about			printf("by");
[Ww]hy			printf("how");
" by "			printf(" from ");
" to "			printf(" for ");
" for "			printf(" to ");
"ing "			printf("ed ");
%%

main()
{
	srand(getpid());
	yylex();
}
