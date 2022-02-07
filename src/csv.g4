/*
 [The "BSD licence"]
 Copyright (c) 2013 Terence Parr
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
    derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

grammar csv;

@lexer::header
{
	let delimiter = ',';
	
	function createCsvLexer(input, delim)
	{
		const inst = new csvLexer(input);
		delimiter = delim;
		return inst;
	}
	
	function isDelimiter(delim)
	{
		return delimiter == delim;
	}

	exports.createCsvLexer = createCsvLexer;
	exports.isDelimiter = isDelimiter;
}

@lexer::members 
{
}


csvFile: hdr row+ ;
hdr : row ;

row : field (DELIMITER field)* '\r'? '\n' ;

field
    : text
    | string
    |
    ;

text: TEXT ;

string: STRING ;

DELIMITER 
	: ',' { isDelimiter(',') }? 
	| ';' { isDelimiter(';') }? 
	| '\t' { isDelimiter('\t') }? 
	;
TEXT   
	: (
			~[,;\t\n\r"] 
		| ',' { !isDelimiter(',') }?
		| ';' { !isDelimiter(';') }?
		| '\t' { !isDelimiter('\t') }?
	  )+ ;

STRING : QUOTE ('""' |~'"')* QUOTE ; // quote-quote is an escaped quote

fragment QUOTE: '"' ;
