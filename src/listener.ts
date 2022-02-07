import { Readable } from 'stream';
import { CsvFileContext, HdrContext, RowContext, FieldContext, TextContext, StringContext } from './generated/csvParser';
import { csvListener } from './generated/csvListener';


export class Listener extends csvListener
{
	constructor()
	{
		super();
	}
	
	
	enterHdr(ctx: HdrContext): void
	{
		this.stream = new Readable();
		this.fieldNo = 0;
	}
	
	enterRow(ctx: RowContext): void
	{
		this.stream.push('|');
	}
	
	enterField(ctx: FieldContext): void
	{
		this.field = '';
	}
	
	exitText(ctx: TextContext): void
	{
		super.exitText(ctx);
		this.field = ctx.getText();
	}
	
	exitString(ctx: StringContext): void
	{
		super.exitString(ctx);
		this.field = ctx.getText().slice(1, -1).replace(/""/g, '"');
	}
	
	exitField(ctx: FieldContext): void
	{
		super.exitField(ctx);
		this.stream.push(this.field + '|');
		this.fieldNo ++;
		console.log('Field detected: ', ctx.getText(), ' : ', this.field);
	}
	
	exitRow(ctx: RowContext): void
	{
		super.exitRow(ctx);
		this.stream.push('\n');
	}
	
	exitHdr(ctx: HdrContext): void
	{
		super.exitHdr(ctx);
		this.createDivider();
	}
	
	exitCsvFile(ctx: CsvFileContext): void
	{
		super.exitCsvFile(ctx);
		this.stream.push(null);
		this.result = this.stream.read().toString('utf-8');
	}
	
	createDivider(): void
	{
		this.stream.push('|');
		for (let no = 0; no < this.fieldNo; no++)
		{
			this.stream.push('-|');
		}
		this.stream.push('\n');
	}
	
	get table() : string
	{
		return this.result;	
	}
	
	field: string;
	fieldNo: number;
	stream: Readable;
	result: string;
}
