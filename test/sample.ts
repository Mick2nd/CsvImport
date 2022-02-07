import { convert } from '../src/converter';

const code = `COL 1;COL 2\nVal 1;"Val 2 with ; and "" "\n`;
console.log('Result Table is: ', convert(code));
