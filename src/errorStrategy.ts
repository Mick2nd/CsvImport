import { Recognizer } from 'antlr4';
import { DefaultErrorStrategy, ParseCancellationException } from 'antlr4/error';


export class ErrorStrategy extends DefaultErrorStrategy
{
	recoverInline(recognizer: Recognizer): void
	{
		throw new ParseCancellationException('Error');
	}

	recover(recognizer: Recognizer, e: Error): void
	{
		throw new ParseCancellationException(e.message);
	}

	sync(recognizer: Recognizer): void
	{
		
	}
}
