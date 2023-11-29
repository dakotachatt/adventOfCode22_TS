import { readData } from '../utils';
import chalk from 'chalk';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const crateConfiguration: string[][] = [];
  let stackBottomIndex = 0;
  const numOfStacks = Math.ceil(data[0].length / 4)
  let cratesAtTopOfStacks = '';

  //Determine the bottom row of stacks index in the input file
  for(let i = 0; i < data.length; i++) {
    if(data[i] === '') {
      stackBottomIndex = i - 2; //ignores the stack numbering line
      break;
    }
  }

  //Create array of initial crate stacking order, index 0 in each row = bottom of stack
  for(let i = numOfStacks; i > 0; i--) {
    crateConfiguration.push(Array());

    console.log(i);
  }

  console.log(crateConfiguration);

  for(let i = stackBottomIndex; i >= 0; i--) {
    for(let j = 0; j < numOfStacks; j++) {
      const crateLetter = data[i].slice((1 + (j * 4)), ((j * 4) + 2));

      if(crateLetter != ' ') {
        crateConfiguration[j].push(crateLetter);
      }
    }
  }

  console.log('initial crate config', crateConfiguration)

  //Execute crate movements based on input
  for(let i = (stackBottomIndex + 3); i < data.length; i++ ) {
    const movementToExecute = data[i];
    const matches = movementToExecute.match(/\d+/g);
    const numCratesToMove = Number.parseInt(matches[0]);
    const sourceStack = Number.parseInt(matches[1]);
    const destinationStack = Number.parseInt(matches[2]);

    console.log(movementToExecute)

    for(let i = 0; i < numCratesToMove; i++) {
      console.log(`Crate stack ${sourceStack - 1} before pop`, crateConfiguration[sourceStack - 1])

      const crate = crateConfiguration[sourceStack - 1].pop();

      console.log(crate);

      console.log(`source ${sourceStack - 1}`, crateConfiguration[sourceStack - 1])

      crateConfiguration[destinationStack - 1].push(crate);

      console.log(`destination ${destinationStack - 1}`, crateConfiguration[destinationStack - 1])
    }
  }

  //Get top crate from each stack
  for(let i = 0; i < numOfStacks; i++) {
    cratesAtTopOfStacks += crateConfiguration[i][crateConfiguration[i].length - 1]
  }

  return cratesAtTopOfStacks;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day5a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
