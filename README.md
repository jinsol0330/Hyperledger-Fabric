# 🌟 Hyperledger Fabric - Transfer Token System 🌟


## 💁🏻 Introduction

**사용자들 간 토큰을 주고 받는 네트워크를 기반으로 하는 웹 어플리케이션**

계좌이체와 비슷한 개념으로, 사용자들의 고유한 wallet ID 를 기반으로 토큰을 생성, 조회, 상환 하는 것은 물론<br>
다른 사용자들과 자유롭게 주고 받을 수 있습니다.

<br>

## 🛠 Tech Stack

`Docker`, `Go`, `JavaSript`, `Nodejs`, `Express`, `MongoDB`

<br>

***
### 📌 Version
- **Ubuntu** : v20.0.4.1 LTS 
- **cURL** : v7.68.0  
- **Docker** : v20.10.2  
- **Docker compose** : v1.27.4  
- **Go** : v1.15.6  
- **Git** : v2.25.1  
- **Python** : v2.7.18  
- **Nodejs** : v14.15.4  
- **npm** : v6.14.10
- **JAVA JDK** : v1.8.0_292  
- **Gradle** : v4.4.1  
- **Fabric** : v2.2.0  
- **Fabric-CA** : v1.4.8  
*** 

<br>

## 🔥 Getting Started

### 1️⃣ 네트워크 구동 및 채널 만들기
➡️ `cd test-network`<br>
➡️ `docker ps -a`<br>
(실행중인 컨테이너가 있는 지 확인. 있다면, `‘./network.sh down’` 명령어로 네트워크 종료)<br>
➡️ `./network.sh up createChannel -ca` 명령어로 네트워크 구동<br>

<br>

### 2️⃣ 체인코드 설치 
➡️ `./network.sh deployCC -ccn token_erc20 -ccp ../token-erc-20/chaincode-go/ -ccl go`<br>

<br>

### 3️⃣ 설정 변경하기
**1. `gateway` 파일 수정**
- `jinsol/test-network/organizations/js/gateway/connection-org1.yaml` 파일의 코드 안 `#` 부분을 수정해야 함
- **파일의 인증서 위치로 이동 후 인증서 내용을 복사해 `#` 부분에 붙여넣음**
- 위와 같은 방식으로, `jinsol/test-network/organizations/yh/gateway/connection-org2.yaml` 파일의 `#` 부분도 수정


**2. `addToWallet.js` 수정**
- `jinsol/test-network/organizations/js/application/addToWallet.js` 파일의 코드 안 `#` 부분을 수정해야 함
- **`credPath`와 `privateKey` 의 경로를 조합하여 해당 위치로 이동 후 인증서 내용을 복사해 `#` 부분에 붙여넣음**
- 위와 같은 방식으로 `jinsol/test-network/organizations/yh/application/addToWallet.js` 파일의 `#` 부분도 수정

<br>

### 4️⃣ 패키지 설치하기
➡️ `cd organizations/js/application`<br>
➡️ `npm install`

<br>

### 5️⃣ 지갑 정보 생성하기
➡️ `cd organizations/js/application`<br>
➡️ `node addToWallet.js`<br>
➡️ 실행 후 , `/js/wallet` 폴더에 `jinsol.id` 생겼는지 확인<br>
➡️ 같은 방식으로 `cd organizations/yh/application`위치로 이동 후 다른 사용자의 지갑 정보도 생성

<br>

### 6️⃣ Database 설정

<br>

### 7️⃣ 실행
➡️ `cd /js/application/server` <br>
➡️ `node server.js`



