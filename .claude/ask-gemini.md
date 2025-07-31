# ask-gemini

Gemini CLI를 통해 AI와 상호작용합니다.

## 사용법

```
/ask-gemini <prompt> [options]
```

## 매개변수

- `prompt` (필수): Gemini에게 전달할 프롬프트나 질문
- `--model <model>` (선택): 사용할 모델 (예: gemini-2.0-flash-exp)
- `--sandbox` (선택): 샌드박스 모드 사용

## 예시


### 예시 1
```
/ask-gemini "안녕하세요! 간단한 Python 함수를 작성해주세요."
```

### 예시 2
```
/ask-gemini "이 JavaScript 파일을 분석해주세요: @src/index.js"
```

### 예시 3
```
/ask-gemini "샌드박스 모드에서 이 스크립트를 실행해주세요" --sandbox
```

### 예시 4
```
/ask-gemini "복잡한 문제를 해결해주세요" --model "gemini-2.0-flash-exp"
```


## 기능

- **실시간 출력: 명령 실행 중 실시간으로 결과 표시**
- **파일 분석: @filename 구문으로 파일 내용 분석**
- **샌드박스 모드: 안전한 코드 실행 환경**
- **모델 선택: 다양한 Gemini 모델 선택 가능**
- **진행 상황 표시: 긴 작업 중 진행 상황 확인**

## 전제 조건

- Node.js (v16.0.0 이상)
- Google Gemini CLI 설치 및 설정
