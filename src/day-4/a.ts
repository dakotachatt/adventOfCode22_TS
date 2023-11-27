import { readData } from '../utils';
import chalk from 'chalk';

type Section = {
  min: number,
  max: number
}

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);

  let numFullyOverlapping = 0;

  const elf1Sections: Section[] = [];
  const elf2Sections: Section[] = [];

  data.map((sectionPair) => {
    const sections = sectionPair.split(',');
    const section1 = sections[0].split('-');
    const section2 = sections[1].split('-');

    elf1Sections.push({
      min: Number.parseInt(section1[0]),
      max: Number.parseInt(section1[1])
    });

    elf2Sections.push({
      min: Number.parseInt(section2[0]),
      max: Number.parseInt(section2[1])
    });
  });

  for(let i = 0; i < data.length; i++) {
    const {min: elf1Min, max: elf1Max} = elf1Sections[i];
    const {min: elf2Min, max: elf2Max} = elf2Sections[i];

    if((elf1Min <= elf2Min && elf1Max >= elf2Max) || (elf2Min <= elf1Min && elf2Max >= elf1Max)) {
      numFullyOverlapping++;
    }
  }

  return numFullyOverlapping
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day4a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
