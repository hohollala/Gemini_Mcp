import { spawn } from 'child_process';
import { Logger } from './logger.js';

export interface CommandResult {
  success: boolean;
  output: string;
  error?: string;
}

export async function executeCommand(
  command: string,
  args: string[],
  onProgress?: (output: string) => void
): Promise<CommandResult> {
  return new Promise((resolve) => {
    Logger.info(`Executing command: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    let output = '';
    let errorOutput = '';

    child.stdout?.on('data', (data) => {
      const chunk = data.toString();
      output += chunk;
      onProgress?.(chunk);
    });

    child.stderr?.on('data', (data) => {
      const chunk = data.toString();
      errorOutput += chunk;
      Logger.warn(`Command stderr: ${chunk}`);
    });

    child.on('close', (code) => {
      const success = code === 0;
      
      if (!success) {
        Logger.error(`Command failed with code ${code}`, { errorOutput });
      } else {
        Logger.info('Command executed successfully');
      }

      resolve({
        success,
        output: output.trim(),
        error: errorOutput.trim() || undefined,
      });
    });

    child.on('error', (error) => {
      Logger.error('Command execution error', error);
      resolve({
        success: false,
        output: '',
        error: error.message,
      });
    });
  });
}

export async function checkCommandExists(command: string): Promise<boolean> {
  try {
    const result = await executeCommand('which', [command]);
    return result.success;
  } catch {
    return false;
  }
} 