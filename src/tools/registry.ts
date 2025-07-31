import { z } from 'zod';

export interface UnifiedTool {
  name: string;
  description: string;
  zodSchema: z.ZodSchema;
  prompt?: {
    description: string;
  };
  category?: string;
  execute: (
    args: any,
    onProgress?: (output: string) => void
  ) => Promise<string>;
}

export const toolRegistry: UnifiedTool[] = [];

export function registerTool(tool: UnifiedTool): void {
  toolRegistry.push(tool);
}

export function getToolByName(name: string): UnifiedTool | undefined {
  return toolRegistry.find(tool => tool.name === name);
}

export function getAllTools(): UnifiedTool[] {
  return toolRegistry;
} 