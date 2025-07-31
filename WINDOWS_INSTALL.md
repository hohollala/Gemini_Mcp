# 윈도우용 Gemini MCP Server 설치 가이드

## 🚀 윈도우에서 Gemini MCP Server 설치하기

### 전제 조건
1. **Node.js** (v16.0.0 이상) - [다운로드](https://nodejs.org/)
2. **Google Gemini CLI** 설치
3. **Claude Code** 설치

### 1단계: 프로젝트 다운로드 및 설치

```cmd
# 프로젝트 클론
git clone https://github.com/hohollala/Gemini_Mcp.git
cd Gemini_Mcp

# 의존성 설치 및 빌드
npm install
npm run build
npm run generate-commands
```

### 2단계: 글로벌 설치

```cmd
# 글로벌 설치
npm install -g .
```

### 3단계: MCP 서버 등록

#### 방법 1: .cmd 파일 사용 (권장)
```cmd
claude mcp add gemini-mcp -- "C:\Users\%USERNAME%\AppData\Roaming\npm\gemini-mcp.cmd"
```

#### 방법 2: node 명령어 직접 사용
```cmd
claude mcp add gemini-mcp -- "node C:\Users\%USERNAME%\AppData\Roaming\npm\node_modules\gemini-mcp\dist\index.js"
```

### 4단계: 설치 확인

```cmd
# MCP 서버 목록 확인
claude mcp list

# 명령어 파일 확인
dir %USERPROFILE%\.claude\commands\
```

## 🔧 윈도우 특별 문제 해결

### 문제 1: MCP 서버가 자동 실행되지 않음

**해결 방법:**
```cmd
# 1. 절대 경로로 등록
claude mcp add gemini-mcp -- "C:\Users\%USERNAME%\AppData\Roaming\npm\gemini-mcp.cmd"

# 2. PowerShell 실행 정책 변경
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 문제 2: npm 글로벌 설치 경로 확인

```cmd
# npm 글로벌 설치 경로 확인
npm config get prefix

# 일반적인 경로:
# C:\Users\%USERNAME%\AppData\Roaming\npm
# C:\Program Files\nodejs
```

### 문제 3: PATH 환경변수 문제

```cmd
# PATH 확인
echo %PATH%

# PATH에 npm 글로벌 경로 추가
setx PATH "%PATH%;C:\Users\%USERNAME%\AppData\Roaming\npm"
```

### 문제 4: 권한 문제

```cmd
# 관리자 권한으로 명령 프롬프트 실행 후
npm install -g .
```

## 📝 사용법

설치 완료 후 Claude Code에서 다음 명령어 사용:

```
/gc-ask "질문을 입력하세요"
/gc-ping "테스트"
/gc-help
```

## 🚨 주의사항

1. **절대 경로 사용**: 윈도우에서는 상대 경로보다 절대 경로를 사용하는 것이 안정적입니다.
2. **실행 정책**: PowerShell에서 스크립트 실행이 차단될 수 있으므로 실행 정책을 변경해야 할 수 있습니다.
3. **PATH 환경변수**: npm 글로벌 설치 경로가 PATH에 포함되어 있는지 확인하세요.

## 📞 문제 해결

문제가 발생하면:
1. `claude mcp list`로 서버 상태 확인
2. `npm config get prefix`로 설치 경로 확인
3. PATH 환경변수 확인
4. 관리자 권한으로 재설치 시도 