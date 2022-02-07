
import { CsvFileContext, DelimiterContext } from './generated/csvAnalyzeParser';
import { csvAnalyzeListener } from './generated/csvAnalyzeListener';

export class AnalyzeListener extends csvAnalyzeListener
{
	constructor()
	{
		super();
	}

	enterCsvFile(ctx: CsvFileContext) : void
	{
		this.map = { 
			',': 0,
			';': 0,
			'\t': 0
		};
		this.all = 0;
	}
	
	exitDelimiter(ctx: DelimiterContext) : void
	{
		const delim = ctx.getText();
		this.map[delim] ++;
		this.all ++;
	}
	
	get delimiter() : string
	{
		const sorted = 
			Object.entries(this.map)
		    .sort((a: any, b: any) => b[1] - a[1]);
		return sorted[0][0];
	}
	
	map: any;
	all: number;
}
