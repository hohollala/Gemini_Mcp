# Gemini MCP Server

Claude Code에서 Gemini CLI와 상호작용할 수 있는 MCP(Model Context Protocol) 서버입니다.

## 🚀 기능

- **Gemini CLI 연동**: Gemini AI와 직접 상호작용
- **실시간 출력**: 명령 실행 중 실시간으로 결과 표시
- **파일 분석**: `@filename` 구문으로 파일 내용 분석
- **샌드박스 모드**: 안전한 코드 실행 환경
- **모델 선택**: 다양한 Gemini 모델 선택 가능
- **글로벌 설치**: npm을 통한 전역 설치 지원

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

### 방법 1: 로컬 개발 버전 전역 설치 (현재 권장)

```bash
# 프로젝트 클론 및 빌드
git clone https://github.com/hohollala/Gemini_Mcp.git
cd Gemini_Mcp
npm install
npm run build

# npm 전역 설치
npm install -g .

# 홈 디렉토리에서 MCP 서버 등록
cd ~
claude mcp add gemini-mcp -- gemini-mcp
```

### 방법 2: npm을 통한 글로벌 설치 (npm 배포 후 사용 가능)

```bash
# npm을 통한 글로벌 설치 (npm 배포 후)
npm install -g gemini-mcp

# 홈 디렉토리에서 MCP 서버 등록
cd ~
claude mcp add gemini-mcp -- gemini-mcp
```

### 방법 3: 프로젝트별 설치 (기본)

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

### 🚀 빠른 시작 (로컬 개발 버전 전역 설치)

1. **프로젝트 클론 및 빌드**
   ```bash
   git clone https://github.com/hohollala/Gemini_Mcp.git
   cd Gemini_Mcp
   npm install
   npm run build
   ```

2. **전역 설치**
   ```bash
   # npm 전역 설치
   npm install -g .
   
   # 홈 디렉토리로 이동하여 전역 MCP 서버 등록
   cd ~
   claude mcp add gemini-mcp -- gemini-mcp
   ```

3. **설치 확인**
   ```bash
   claude mcp list
   ```

4. **사용 시작**
   이제 홈 디렉토리에서 다음 명령어를 사용할 수 있습니다:
   ```
   /gc-ask "질문을 입력하세요"
   /gc-ping "테스트"
   /gc-help
   ```

### 🔧 기본 사용법

#### 1. 간단한 질문
```
/gc-ask "안녕하세요! 간단한 Python 함수를 작성해주세요."
```

#### 2. 파일 분석
```
/gc-ask "이 JavaScript 파일을 분석해주세요: @src/index.js"
```

#### 3. 코드 리뷰
```
/gc-ask "이 코드의 보안 취약점을 찾아주세요: @security.js"
```

#### 4. 문서 생성
```
/gc-ask "이 API 코드에 대한 문서를 작성해주세요: @api.js"
```

### 🛡️ 샌드박스 모드

안전한 코드 실행을 위한 격리된 환경에서 실행:

```
/gc-ask "샌드박스 모드에서 이 스크립트를 실행해주세요" --sandbox
```

### 🤖 모델 선택

특정 Gemini 모델을 사용하여 실행:

```
/gc-ask "복잡한 문제를 해결해주세요" --model "gemini-2.0-flash-exp"
```

사용 가능한 모델:
- `gemini-2.0-flash-exp` (기본값, 빠르고 효율적)
- `gemini-2.0-flash-exp` (고성능)

### 🛠️ 유틸리티 명령어

#### 서버 상태 확인
```
/gc-ping "테스트 메시지"
```

#### 도움말 보기
```
/gc-help
```

### 📁 파일 분석 예시

#### JavaScript 파일 분석
```
/gc-ask "이 React 컴포넌트의 성능을 개선해주세요: @components/UserList.jsx"
```

#### TypeScript 파일 분석
```
/gc-ask "이 TypeScript 코드의 타입 안전성을 검토해주세요: @utils/validator.ts"
```

#### Python 파일 분석
```
/gc-ask "이 Python 스크립트의 최적화 방안을 제안해주세요: @data_processor.py"
```

#### 설정 파일 분석
```
/gc-ask "이 설정 파일의 문제점을 찾아주세요: @config.json"
```

### 🔍 고급 사용법

#### 1. 복합 분석
```
/gc-ask "이 프로젝트의 전체 구조를 분석하고 개선 방안을 제시해주세요: @src/ @tests/ @docs/"
```

#### 2. 코드 리팩토링
```
/gc-ask "이 함수를 더 읽기 쉽게 리팩토링해주세요: @utils/helper.js"
```

#### 3. 테스트 코드 생성
```
/gc-ask "이 함수에 대한 단위 테스트를 작성해주세요: @services/auth.js"
```

#### 4. 문서화
```
/gc-ask "이 클래스에 대한 JSDoc 문서를 작성해주세요: @models/User.js"
```

### ⚡ 실시간 기능

- **진행 상황 표시**: 긴 작업 중 실시간으로 진행 상황을 확인할 수 있습니다
- **실시간 출력**: 명령 실행 중 결과가 실시간으로 표시됩니다
- **에러 처리**: 오류 발생 시 상세한 에러 메시지를 제공합니다

### 🎯 사용 팁

1. **구체적인 질문**: "이 코드를 개선해주세요"보다는 "이 함수의 성능을 개선해주세요"가 더 좋습니다
2. **파일 경로**: `@filename` 구문을 사용하여 정확한 파일을 지정하세요
3. **샌드박스 모드**: 실행 가능한 코드를 테스트할 때는 샌드박스 모드를 사용하세요
4. **모델 선택**: 복잡한 분석에는 고성능 모델을, 간단한 질문에는 기본 모델을 사용하세요

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
│       ├── geminiExecutor.ts # Gemini CLI 실행기
│       └── commandFileGenerator.ts # 명령어 파일 생성기
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
사용자: /gc-ask "이 React 컴포넌트의 성능을 개선해주세요: @components/UserList.jsx"

Gemini: 이 React 컴포넌트를 분석한 결과, 다음과 같은 성능 개선 사항을 제안합니다:
1. React.memo를 사용한 메모이제이션
2. useCallback으로 함수 메모이제이션
3. 가상화를 통한 대용량 리스트 최적화
...
```

### 2. 코드 생성
```
사용자: /gc-ask "TypeScript로 REST API 클라이언트를 만들어주세요"

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
사용자: /gc-ask "이 에러를 해결해주세요: @error.log"

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

### 다른 폴더에서 MCP 서버가 보이지 않는 경우
**문제**: 특정 프로젝트 폴더에서만 MCP 서버가 작동함

**해결책**: 각 프로젝트에서 개별 등록
```bash
# 각 프로젝트 폴더에서
claude mcp add gemini-mcp -- gemini-mcp
```

### 권한 오류
```bash
# 실행 권한 부여
chmod +x dist/index.js
```

### MCP 서버 제거
```bash
# 특정 MCP 서버 제거
claude mcp remove gemini-mcp

# 전역 npm 패키지 제거 (선택사항)
npm uninstall -g gemini-mcp
```

### 명령어 파일이 생성되지 않는 경우
```bash
# npm 설치 시 자동으로 명령어 파일이 생성됩니다
npm install -g .

# 수동으로 명령어 파일 생성이 필요한 경우
mkdir -p ~/.claude/commands/
# gc-ask.md, gc-ping.md, gc-help.md 파일을 수동으로 생성
```

### 설치 과정 설명
1. **프로젝트 클론**: GitHub에서 프로젝트를 다운로드합니다
2. **의존성 설치**: `npm install`로 필요한 패키지를 설치합니다
3. **빌드**: `npm run build`로 TypeScript를 컴파일합니다
4. **전역 설치**: `npm install -g .`로 글로벌에 설치하고 명령어 파일을 생성합니다
5. **MCP 서버 등록**: `claude mcp add` 명령으로 MCP 서버를 등록합니다
6. **사용 준비**: 명령어 파일이 `~/.claude/commands/`에 생성되어 Claude Code에서 사용할 수 있습니다

**참고**: 명령어 파일은 **설치 시에만** 생성되며, MCP 서버 실행 시에는 생성되지 않습니다.

## 📄 라이선스

MIT License

## 🤝 기여

버그 리포트, 기능 요청, 풀 리퀘스트를 환영합니다!

## 📞 지원

문제가 발생하면 GitHub Issues를 통해 문의해주세요.
