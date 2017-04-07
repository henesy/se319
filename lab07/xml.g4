lexer grammar xml;
 
@members {
    boolean inTag = false;
}
NEWLINE: ('\t' | '\r' | '\n') {skip();};

BOPEN : '<' { inTag = true;} ;
COPEN : '</' { inTag = true;} ;
CLOSE : { inTag }? '>' { inTag = false; } ;

INSIDE : { !inTag }? (~'<')+ {System.out.println("found xml: " + getText());};

GENERIC_ID: { inTag }?(LETTER) (NAMECHAR)*;

fragment NAMECHAR: (LETTER | DIGIT | '.' | '-' | '_' | ':');

fragment DIGIT : '0'..'9';
fragment LETTER : 'a'..'z'| 'A'..'Z'|' ';
