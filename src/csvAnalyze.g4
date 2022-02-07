/*
 * This combined grammar is used for csv file analysis.
 * It shall be used for auto-detection of relevant delimiter
 */

grammar csvAnalyze;


csvFile: row+ ;

row : field (delimiter field)* CR? LF ;

field
    : text
    | string
    |
    ;

text: TEXT ;
string: STRING ;
delimiter: tab | semi | comma ;
tab: TAB ;
semi: SEMI ;
comma: COMMA ;

TEXT: ~('\t' | ';' | ',' | '\r' | '\n')+ ;
STRING : QUOTE (DOUBLEQUOTE | ~'"')* QUOTE ;

TAB: '\t' ;
SEMI: ';' ;
COMMA: ',' ;
CR: '\r' ;
LF: '\n';

fragment DOUBLEQUOTE: '""' ;
fragment QUOTE: '"' ;
