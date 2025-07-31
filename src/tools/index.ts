// 도구 등록 인덱스
import { registerTool, getAllTools, getToolByName } from './registry.js';
import { geminiTool } from './gemini-tool.js';
import { pingTool, helpTool } from './simple-tools.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

// 모든 도구 등록
registerTool(geminiTool);
registerTool(pingTool);
registerTool(helpTool);

export * from './registry.js';
export * from './gemini-tool.js';
export * from './simple-tools.js';

// 도구 정의 가져오기
export function getToolDefinitions(): Tool[] {
  return getAllTools().map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: zodToJsonSchema(tool.zodSchema),
  })) as Tool[];
}

// 도구 존재 확인
export function toolExists(name: string): boolean {
  return getToolByName(name) !== undefined;
}

// 도구 실행
export async function executeTool(
  name: string, 
  args: any, 
  onProgress?: (output: string) => void
): Promise<string> {
  const tool = getToolByName(name);
  if (!tool) {
    throw new Error(`도구를 찾을 수 없습니다: ${name}`);
  }
  
  return await tool.execute(args, onProgress);
}

// 프롬프트 정의 가져오기
export function getPromptDefinitions() {
  return getAllTools()
    .filter(tool => tool.prompt)
    .map(tool => ({
      name: tool.name,
      description: tool.prompt!.description,
      arguments: tool.zodSchema,
    })) as any;
}

// 프롬프트 메시지 가져오기
export function getPromptMessage(name: string): string | null {
  const tool = getToolByName(name);
  return tool?.prompt?.description || null;
} 