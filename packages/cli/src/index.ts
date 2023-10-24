import { program } from 'commander';
import { serveCommand } from './command/serve';

program.addCommand(serveCommand);

program.parse(process.argv);