import { executeCommand, checkCommandExists } from './commandExecutor.js';
import { Logger } from './logger.js';
import { ERROR_MESSAGES, CLI } from '../constants.js';

export async function executeGeminiCLI(
  prompt: string,
  model?: string,
  sandbox: boolean = false,
  onProgress?: (output: string) => void
): Promise<string> {
  // Gemini CLI 설치 확인
  const geminiExists = await checkCommandExists(CLI.COMMAND);
  if (!geminiExists) {
    throw new Error(ERROR_MESSAGES.GEMINI_CLI_NOT_FOUND);
  }

  // 명령어 인수 구성
  const args: string[] = [];
  
  if (model) {
    args.push(CLI.MODEL_FLAG, model);
  }
  
  if (sandbox) {
    args.push(CLI.SANDBOX_FLAG);
  }
  
  args.push(CLI.PROMPT_FLAG, prompt);

  Logger.info(`Executing Gemini CLI with args: ${args.join(' ')}`);

  // 명령어 실행
  const result = await executeCommand(CLI.COMMAND, args, onProgress);

  if (!result.success) {
    Logger.error('Gemini CLI execution failed', { error: result.error });
    throw new Error(result.error || ERROR_MESSAGES.EXECUTION_FAILED);
  }

  return result.output;
}

export function buildGeminiCommand(
  prompt: string,
  model?: string,
  sandbox: boolean = false
): string {
  const parts: string[] = [CLI.COMMAND];
  
  if (model) {
    parts.push(CLI.MODEL_FLAG, model);
  }
  
  if (sandbox) {
    parts.push(CLI.SANDBOX_FLAG);
  }
  
  parts.push(CLI.PROMPT_FLAG, `"${prompt}"`);
  
  return parts.join(' ');
} 