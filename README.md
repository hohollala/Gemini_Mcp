# Gemini MCP Server

Claude Code에서 Gemini CLI와 상호작용할 수 있는 MCP(Model Context Protocol) 서버입니다.

## 🚀 기능

- **Gemini CLI 연동**: Gemini AI와 직접 상호작용
- **실시간 출력**: 명령 실행 중 실시간으로 결과 표시
- **파일 분석**: `@filename` 구문으로 파일 내용 분석
- **샌드박스 모드**: 안전한 코드 실행 환경
- **모델 선택**: 다양한 Gemini 모델 선택 가능

## 📋 전제 조건

1. **Node.js** (v16.0.0 이상)
2. **Google Gemini CLI** 설치 및 설정
   ```bash
   # Gemini CLI 설치 (macOS)
   brew install google-gemini/gemini/gemini
   
   # 또는 공식 문서 참조
   # https://github.com/google-gemini/gemini-cli
   ```

## 🛠️ 설치

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **빌드**
   ```bash
   npm run build
   ```

3. **Claude Code에 MCP 서버 추가**
   ```bash
   claude mcp add gemini-cli -- node dist/index.js
   ```

## 📖 사용법

### 기본 사용법

Claude Code에서 `/mcp` 명령으로 MCP 서버가 활성화되었는지 확인한 후:

```
/ask-gemini "안녕하세요! 간단한 Python 함수를 작성해주세요."
```

### 파일 분석

```
/ask-gemini "이 JavaScript 파일을 분석해주세요: @src/index.js"
```

### 샌드박스 모드

```
/ask-gemini "샌드박스 모드에서 이 스크립트를 실행해주세요" --sandbox
```

### 특정 모델 사용

```
/ask-gemini "복잡한 문제를 해결해주세요" --model "gemini-2.0-flash-exp"
```

### 서버 상태 확인

```
/ping "테스트 메시지"
```

### 도움말

```
/help
```

## 🏗️ 프로젝트 구조

```
GeminiMCP/
├── src/
│   ├── index.ts              # MCP 서버 메인 파일
│   ├── constants.ts          # 상수 정의
│   ├── tools/
│   │   ├── index.ts          # 도구 등록
│   │   ├── registry.ts       # 도구 레지스트리
│   │   ├── gemini-tool.ts    # Gemini CLI 도구
│   │   └── simple-tools.ts   # 유틸리티 도구들
│   └── utils/
│       ├── logger.ts         # 로깅 유틸리티
│       ├── commandExecutor.ts # 명령어 실행
│       └── geminiExecutor.ts # Gemini CLI 실행기
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 개발

### 개발 모드 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 실행
```bash
npm start
```

## 📝 사용 예시

### 1. 코드 분석
```
사용자: /ask-gemini "이 React 컴포넌트의 성능을 개선해주세요: @components/UserList.jsx"

Gemini: 이 React 컴포넌트를 분석한 결과, 다음과 같은 성능 개선 사항을 제안합니다:
1. React.memo를 사용한 메모이제이션
2. useCallback으로 함수 메모이제이션
3. 가상화를 통한 대용량 리스트 최적화
...
```

### 2. 코드 생성
```
사용자: /ask-gemini "TypeScript로 REST API 클라이언트를 만들어주세요"

Gemini: TypeScript로 REST API 클라이언트를 생성하겠습니다:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
  // ... 더 많은 메서드들
}
```

### 3. 문제 해결
```
사용자: /ask-gemini "이 에러를 해결해주세요: @error.log"

Gemini: 로그를 분석한 결과, 다음과 같은 문제를 발견했습니다:
1. 메모리 부족 오류
2. 네트워크 타임아웃
3. 잘못된 설정값

해결 방법:
1. 메모리 할당량 증가
2. 타임아웃 설정 조정
3. 설정 파일 수정
...
```

## 🐛 문제 해결

### Gemini CLI가 설치되지 않은 경우
```bash
# macOS
brew install google-gemini/gemini/gemini

# 또는 공식 설치 가이드 참조
# https://github.com/google-gemini/gemini-cli#installation
```

### MCP 서버 연결 실패
1. Gemini CLI가 올바르게 설치되었는지 확인
2. `gemini --version` 명령으로 설치 확인
3. 환경 변수 설정 확인

### 권한 오류
```bash
# 실행 권한 부여
chmod +x dist/index.js
```

## 📄 라이선스

MIT License

## 🤝 기여

버그 리포트, 기능 요청, 풀 리퀘스트를 환영합니다!

## 📞 지원

문제가 발생하면 GitHub Issues를 통해 문의해주세요. 