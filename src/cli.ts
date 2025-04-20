#!/usr/bin/env node
import inquirer from 'inquirer';
import { execSync } from 'child_process';

const run = async () => {
  const { projectName } = await inquirer.prompt([
    {
      name: 'projectName',
      message: 'What is the name of your project?',
      type: 'input',
      validate: input => input ? true : 'A project name is required.',
    },
  ]);

  console.log(`🚀 Create a project called: ${projectName}...`);
  execSync(`npx @react-native-community/cli init ${projectName}`, { stdio: 'inherit' });
};

run();
