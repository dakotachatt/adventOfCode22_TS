import { readData } from '../utils';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const signalStream = data[0];

  for(let i = 14; i < signalStream.length; i++) {
    const substringToCompare = signalStream.slice(i - 14, i);

    const sortedSubstringArray = substringToCompare.split('').sort().join("").match(/(.)\1+/g);

    if(!sortedSubstringArray) {
      return i;
    }
  }

  return 0;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day6a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
