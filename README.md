# Joplin CSV Import Plugin

This plugin serves the insertion of a md table from CSV text from either the clipboard or a CSV file.
This plug-in can be used in either of 2 ways:

- You can import a CSV file by using the import command for CSV files:
  Invoke *File - Import - CSV File* and select the CSV file
- You can insert the content of the Clipboard interpreting it as CSV text by using the appropriate command *Paste CSV*
  Copy the contents to the clipboard (from Excel for instance) and invoke the command *Edit - Paste CSV*

In either case the plug-in tries to interprete the text as CSV and builds a table from it. It uses a simple algorithm to determine the used delimiter. This self-recognition enables the use of 3 different delimiter characters (see: *CSV File Format*)

## CSV File Format

The items in a file line are separated by either of 3 delimiter characters:

- a *comma* **','**
- a *semi-colon* **';'**
- a *tabulator* **'\t';**

The lines themselves are separated by an optional CARIAGE RETURN and a NEWLINE as usual.

The items in a line may be enclosed by *Double Quotes* enabling them to contain the separator character and escaped quotes.

The first line of the file / text is a header line with item names.

The file / text encoding is assumed to be *UTF-8*

## Tests

The plugin was tested with  an Excel - exported csv file and with a sheet copied from Excel to the clipboard.