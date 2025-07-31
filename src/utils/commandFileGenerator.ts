import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Logger } from './logger.js';

export interface CommandDefinition {
  name: string;
  description: string;
  usage: string;
  parameters: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
  examples: string[];
  features: string[];
  prerequisites: string[];
}

export function generateCommandFile(command: CommandDefinition, projectRoot: string): void {
  // 항상 ~/.claude/commands/ 폴더에 생성
  const claudeDir = join(process.env.HOME || process.env.USERPROFILE || '', '.claude', 'commands');
  
  const commandFile = join(claudeDir, `${command.name}.md`);

  // .claude 디렉토리 생성
  if (!existsSync(claudeDir)) {
    mkdirSync(claudeDir, { recursive: true });
    Logger.info(`Created .claude directory at ${claudeDir}`);
  }

  // 마크다운 파일 내용 생성
  const content = `# ${command.name}

${command.description}

## 사용법

\`\`\`
${command.usage}
\`\`\`

## 매개변수

${command.parameters.map(param => 
  `- \`${param.name}\` ${param.required ? '(필수)' : '(선택)'}: ${param.description}`
).join('\n')}

## 예시

${command.examples.map((example, index) => `
### 예시 ${index + 1}
\`\`\`
${example}
\`\`\`
`).join('')}

## 기능

${command.features.map(feature => `- **${feature}**`).join('\n')}

## 전제 조건

${command.prerequisites.map(prereq => `- ${prereq}`).join('\n')}
`;

  // 파일 작성
  writeFileSync(commandFile, content, 'utf8');
  Logger.info(`Generated command file: ${commandFile}`);
}

export function generateAllCommandFiles(projectRoot: string): void {
  // 항상 홈 디렉토리를 기준으로 명령어 파일 생성
  const targetRoot = process.env.HOME || process.env.USERPROFILE || '';
  
  const commands: CommandDefinition[] = [
    {
      name: 'gc-ask',
      description: 'Gemini CLI를 통해 AI와 상호작용합니다.',
      usage: '/gc-ask <prompt> [options]',
      parameters: [
        {
          name: 'prompt',
          description: 'Gemini에게 전달할 프롬프트나 질문',
          required: true
        },
        {
          name: '--model <model>',
          description: '사용할 모델 (예: gemini-2.0-flash-exp)',
          required: false
        },
        {
          name: '--sandbox',
          description: '샌드박스 모드 사용',
          required: false
        }
      ],
      examples: [
        '/gc-ask "안녕하세요! 간단한 Python 함수를 작성해주세요."',
        '/gc-ask "이 JavaScript 파일을 분석해주세요: @src/index.js"',
        '/gc-ask "샌드박스 모드에서 이 스크립트를 실행해주세요" --sandbox',
        '/gc-ask "복잡한 문제를 해결해주세요" --model "gemini-2.0-flash-exp"'
      ],
      features: [
        '실시간 출력: 명령 실행 중 실시간으로 결과 표시',
        '파일 분석: @filename 구문으로 파일 내용 분석',
        '샌드박스 모드: 안전한 코드 실행 환경',
        '모델 선택: 다양한 Gemini 모델 선택 가능',
        '진행 상황 표시: 긴 작업 중 진행 상황 확인'
      ],
      prerequisites: [
        'Google Gemini CLI 설치 및 설정'
      ]
    },
    {
      name: 'gc-ping',
      description: 'MCP 서버가 활성 상태인지 확인합니다.',
      usage: '/gc-ping [message]',
      parameters: [
        {
          name: 'message',
          description: '테스트 메시지 (선택사항)',
          required: false
        }
      ],
      examples: [
        '/gc-ping',
        '/gc-ping "테스트 메시지"'
      ],
      features: [
        '서버 상태 확인: MCP 서버가 정상 작동하는지 확인'
      ],
      prerequisites: []
    },
    {
      name: 'gc-help',
      description: '사용 가능한 도구들의 도움말을 표시합니다.',
      usage: '/gc-help [tool]',
      parameters: [
        {
          name: 'tool',
          description: '특정 도구의 도움말을 보려면 도구 이름을 입력',
          required: false
        }
      ],
      examples: [
        '/gc-help',
        '/gc-help gc-ask'
      ],
      features: [
        '도움말 표시: 사용 가능한 도구들의 목록과 사용법 표시'
      ],
      prerequisites: []
    }
  ];
  
  commands.forEach(command => {
    generateCommandFile(command, targetRoot);
  });
  
  Logger.info(`Generated ${commands.length} command files in ~/.claude/commands directory`);
} 