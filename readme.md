수테크 장비 - 시즐 MES(PMS)간 연동 프로그램(agent) 개발

Background: 
   기존에는,
   제스텍 장비 -> pms_device 로 TCP로 대략 1000ms 정도로 보내던 데이터들을 파싱해서 로그로 찍어내면, telegraf를 통해 influxDB에 입력하던 단방향 통신이었음

ToBe:
   수테크 장비 <-> agent(지금 만들고 있는것) -> influxDB
                      <-API/socket-> 장비 제어 (예: 카운터 리셋) 


해야하는것

1. 읽어오고자 하는 메모리 맵들을 입력값으로 받아, 스캔 명령을 통해 주욱 읽어올 수 있어야 한다.
   1. 메모리 맵의 인터페이스를 정의해야 한다. (오늘!)
   2. 메모리 맵의 주소를 접근 가능한 형태의 주소로 변환하는 함수를 작성해야 한다. -> issue
   3. 스캔은 메모리 맵을 iteration 하며 순차적으로 read 진행할 수 있도록 한다. -> issue
2. 읽어온 값들을 influxDB에 저장할 수 있어야 한다.
   1. influx 접속 정보는 환경변수를 통해 입력받을 수 있어야 한다.
   2. 설비 정보도 환경변수를 통해 입력받을 수 있어야 한다.
   3. 메모리 맵 데이터를 토대로 influxDB에 들어가는 데이터를 매핑해서 생성할 수 있어야 한다. -> issue
      1. influxDB의 데이터프레임 스키마를 인터페이스로 작성해야 한다. (오늘!)
   (4). 중복값의 경우 전송하지 않아도 될거 같다.. -> issue/feature
3. 위 행동을 반복해야 한다
   1. 반복 주기를 환경변수를 통해 입력받을 수 있어야 한다.
   2. setInterval 등을 이용한다
   (3). 최근 10회 정도의 스캔 시간들을 평균내서, 반복 주기보다 스캔 시간이 더 길다면 warning 발생해야 한다. -> issue/feature

아래는 급하지는 않음
3. 여러대의 장비의 값들을 전달하기 위해서 pm2를 이용해 장비별로 인스턴스를 띄우는 방법으로 사용할 수 있게 한다.
4. 여러 대의 장비를 컨트롤하기 위해서, 각각의 포트번호를 노출할 필요가 있겠나..? 그렇다면 moleculer를 사용하는건 어떤가?

# 배포
사전에 pm2 가 global로 설치되어 있어야 함
```bash
> npm i -g pm2
```

# 필수!! 윈도우에서 빌드시
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
를 수행해서 사용자에게 스크립트 실행 권한을 줘야한다.


## PM2 이용해서 띄우는 방법
```bash
> npm run build
> pm2 kill && pm2 start pm2-scripts/sutechAgent.json
```

## PM2 로그 보는방법
```bash
> pm2 logs
```

## 장비 추가하는법
`pm2-script/sutechAgent.json` 파일 내에, apps 에 새로운 오브젝트 추가
```json
   {
      "name": "Agent-P001", //  프로세스 이름, 장비명을 구분할 수 있게 장비 코드를 넣어주면 좋겠음
      "script": "node dist", // 건드릴거 없음 (빌드된것을 실행)
      "env": { // 환경변수 설정 (이 인스턴스 에서만)
         "EQUIPMENT_HOST": "192.168.100.111", // 장비 IP
         "MACHINE_CODE": "P001" // 장비 코드
      }
   }
```

나머지 공통 env들은 .env 파일에 있음
