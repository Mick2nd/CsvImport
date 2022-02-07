import joplin from 'api';
import { MenuItemLocation, ImportContext, FileSystemItem } from 'api/types';
import { convert } from './converter';
const fs = require('fs-extra');


/**
	@abstract Function or lambda to execute menu command
 */
const paste_csv_command = async () => 
{ 
	try
	{
		let text = await joplin.clipboard.readText();
		text = convert(text);
		await joplin.commands.execute('insertText', text);
	}
	catch(e)
	{
		console.error('Exception in command: ' + e);
	}
	finally
	{
		console.info('Finally'); 
	} 
}

/**
	@abstract Function or lambda to execute import command
	
	This is the real import module integrated in Import sub menu. It will be invoked by the Joplin
	framework, if a csv file is chosen.
 */
const import_module = async (ctx: ImportContext) : Promise<void> =>
{
	console.info('Just before returning Promise: ' + ctx.sourcePath);

	return new Promise(
		async function(resolve, reject) 
		{ 
			try 
			{
				console.info('Executing Import: ' + ctx.sourcePath);

				let text = await fs.readFile(ctx.sourcePath, 'utf-8');
				text = convert(text);
				await joplin.commands.execute('insertText', text);
				
				console.info('Import successfully completed');
				resolve(); 
			}
			catch (ex)
			{
				console.error('Exception: ' + ex);
				reject();
			}
			finally
			{
				console.info('Final statement');
			}
		});
}


/**
	@abstract Function to Setup the plugin
 */
async function setupPlugin()
{
	const scriptId = 'pluginCommandPasteCsv';

	await joplin.commands.register(
		{
			name: scriptId,
			label: 'Paste Csv',
			execute: paste_csv_command, 
		});
	
	await joplin.views.menuItems.create(
		'mnuPasteCsv', 
		scriptId,
		MenuItemLocation.Edit);

	await joplin.interop.registerImportModule(
		{
			format: 'csv',
			isNoteArchive: false,
			description: 'Csv File (utf-8)',
			fileExtensions: [ 'csv', ],
			sources: [ FileSystemItem.File ],
			onExec: import_module,
		}); 
};


/**
	@abstract Registers the setup function
 */
joplin.plugins.register({
	onStart: async function() 
	{
		try
		{
			await setupPlugin();
		}
		catch(e)
		{ 
			console.error('Exception occurred: ' + e)		
		}
	}});

