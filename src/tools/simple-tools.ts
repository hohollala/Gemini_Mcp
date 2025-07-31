import { z } from 'zod';
import { UnifiedTool } from './registry.js';
import { Logger } from '../utils/logger.js';

const pingArgsSchema = z.object({
  message: z.string().optional().describe("응답할 메시지"),
});

export const pingTool: UnifiedTool = {
  name: "ping",
  description: "MCP 서버가 활성 상태인지 확인합니다.",
  zodSchema: pingArgsSchema,
  category: 'utility',
  execute: async (args) => {
    const message = args.message || "pong";
    Logger.info(`Ping received: ${message}`);
    return `✅ MCP 서버가 활성 상태입니다. 응답: ${message}`;
  }
};

const helpArgsSchema = z.object({
  tool: z.string().optional().describe("도움말을 볼 도구 이름"),
});

export const helpTool: UnifiedTool = {
  name: "help",
  description: "사용 가능한 도구들의 도움말을 표시합니다.",
  zodSchema: helpArgsSchema,
  category: 'utility',
  execute: async (args) => {
    const { tool } = args;
    
    if (tool) {
      return `도구 '${tool}'에 대한 도움말을 표시합니다.`;
    }
    
    return `## 사용 가능한 도구들

### 🤖 Gemini 도구
- **ask-gemini**: Gemini CLI를 통해 AI와 상호작용
  - 프롬프트 분석, 파일 분석, 코드 실행 지원
  - 샌드박스 모드로 안전한 실행
  - 다양한 모델 선택 가능

### 🛠️ 유틸리티 도구
- **ping**: MCP 서버 상태 확인
- **help**: 도움말 표시

### 사용 예시
\`\`\`
/ask-gemini "이 코드를 분석해주세요: @filename.js"
/ask-gemini "샌드박스 모드에서 이 스크립트를 실행해주세요" --sandbox
/ping "테스트 메시지"
\`\`\``;
  }
}; 