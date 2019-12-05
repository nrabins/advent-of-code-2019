import * as fs  from 'fs'

const text = fs.readFileSync('5/input.txt').toString('utf-8');

const originalStrip = text.split(',').map((i: string) => parseInt(i, 10));

const EXIT_CODE = 99;
