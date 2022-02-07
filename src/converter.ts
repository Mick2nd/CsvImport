import { InputStream, CommonTokenStream } from 'antlr4';

import { csvAnalyzeLexer } from './generated/csvAnalyzeLexer';
import { csvAnalyzeParser } from './generated/csvAnalyzeParser';
import { AnalyzeListener } from './analyzeListener';

var { createCsvLexer } = require('./generated/csvLexer'); 
import { csvParser } from './generated/csvParser';
import { Listener } from './listener';
import { ErrorStrategy } from './errorStrategy';


export function convert(input: string) : string
{
	try
	{
		const inputStream = new InputStream(input);
		const lexer = new csvAnalyzeLexer(inputStream);
		const tokenStream = new CommonTokenStream(lexer);
		const parser = new csvAnalyzeParser(tokenStream);
		// parser.setErrorHandler(new ErrorStrategy());
		
		const listener = new AnalyzeListener();
		parser.addParseListener(listener);
		parser.csvFile();
		
		console.log('Delimiter is: ', listener.delimiter);
		
		
		inputStream.reset();
		const lexer2 = createCsvLexer(inputStream, listener.delimiter);
		const tokenStream2 = new CommonTokenStream(lexer2);
		const parser2 = new csvParser(tokenStream2);
		
		const listener2 = new Listener();
		parser2.addParseListener(listener2);
		parser2.csvFile();
		
		console.log('Result Table is: ', listener2.table);
		return listener2.table;
	}
	catch(e)
	{
		return '';
	}
}

