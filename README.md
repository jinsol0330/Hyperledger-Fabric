# ๐ Hyperledger Fabric - Transfer Token System ๐


## ๐๐ป Introduction

**์ฌ์ฉ์๋ค ๊ฐ ํ ํฐ์ ์ฃผ๊ณ  ๋ฐ๋ ๋คํธ์ํฌ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ํ๋ ์น ์ดํ๋ฆฌ์ผ์ด์**

๊ณ์ข์ด์ฒด์ ๋น์ทํ ๊ฐ๋์ผ๋ก, ์ฌ์ฉ์๋ค์ ๊ณ ์ ํ wallet ID ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ํ ํฐ์ ์์ฑ, ์กฐํ, ์ํ ํ๋ ๊ฒ์ ๋ฌผ๋ก <br>
๋ค๋ฅธ ์ฌ์ฉ์๋ค๊ณผ ์์ ๋กญ๊ฒ ์ฃผ๊ณ  ๋ฐ์ ์ ์์ต๋๋ค.

<br>

## ๐  Tech Stack

`Docker`, `Go`, `JavaSript`, `Nodejs`, `Express`, `MongoDB`

<br>

***
### ๐ Version
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

## ๐ฅ Getting Started

### 1๏ธโฃ ๋คํธ์ํฌ ๊ตฌ๋ ๋ฐ ์ฑ๋ ๋ง๋ค๊ธฐ
โก๏ธ `cd test-network`<br>
โก๏ธ `docker ps -a`<br>
(์คํ์ค์ธ ์ปจํ์ด๋๊ฐ ์๋ ์ง ํ์ธ. ์๋ค๋ฉด, `โ./network.sh downโ` ๋ช๋ น์ด๋ก ๋คํธ์ํฌ ์ข๋ฃ)<br>
โก๏ธ `./network.sh up createChannel -ca` ๋ช๋ น์ด๋ก ๋คํธ์ํฌ ๊ตฌ๋<br>

<br>

### 2๏ธโฃ ์ฒด์ธ์ฝ๋ ์ค์น 
โก๏ธ `./network.sh deployCC -ccn token_erc20 -ccp ../token-erc-20/chaincode-go/ -ccl go`<br>

<br>

### 3๏ธโฃ ์ค์  ๋ณ๊ฒฝํ๊ธฐ
**1. `gateway` ํ์ผ ์์ **
- `jinsol/test-network/organizations/js/gateway/connection-org1.yaml` ํ์ผ์ ์ฝ๋ ์ `#` ๋ถ๋ถ์ ์์ ํด์ผ ํจ
- **ํ์ผ์ ์ธ์ฆ์ ์์น๋ก ์ด๋ ํ ์ธ์ฆ์ ๋ด์ฉ์ ๋ณต์ฌํด `#` ๋ถ๋ถ์ ๋ถ์ฌ๋ฃ์**
- ์์ ๊ฐ์ ๋ฐฉ์์ผ๋ก, `jinsol/test-network/organizations/yh/gateway/connection-org2.yaml` ํ์ผ์ `#` ๋ถ๋ถ๋ ์์ 


**2. `addToWallet.js` ์์ **
- `jinsol/test-network/organizations/js/application/addToWallet.js` ํ์ผ์ ์ฝ๋ ์ `#` ๋ถ๋ถ์ ์์ ํด์ผ ํจ
- **`credPath`์ `privateKey` ์ ๊ฒฝ๋ก๋ฅผ ์กฐํฉํ์ฌ ํด๋น ์์น๋ก ์ด๋ ํ ์ธ์ฆ์ ๋ด์ฉ์ ๋ณต์ฌํด `#` ๋ถ๋ถ์ ๋ถ์ฌ๋ฃ์**
- ์์ ๊ฐ์ ๋ฐฉ์์ผ๋ก `jinsol/test-network/organizations/yh/application/addToWallet.js` ํ์ผ์ `#` ๋ถ๋ถ๋ ์์ 

<br>

### 4๏ธโฃ ํจํค์ง ์ค์นํ๊ธฐ
โก๏ธ `cd organizations/js/application`<br>
โก๏ธ `npm install`

<br>

### 5๏ธโฃ ์ง๊ฐ ์ ๋ณด ์์ฑํ๊ธฐ
โก๏ธ `cd organizations/js/application`<br>
โก๏ธ `node addToWallet.js`<br>
โก๏ธ ์คํ ํ , `/js/wallet` ํด๋์ `jinsol.id` ์๊ฒผ๋์ง ํ์ธ<br>
โก๏ธ ๊ฐ์ ๋ฐฉ์์ผ๋ก `cd organizations/yh/application`์์น๋ก ์ด๋ ํ ๋ค๋ฅธ ์ฌ์ฉ์์ ์ง๊ฐ ์ ๋ณด๋ ์์ฑ

<br>

### 6๏ธโฃ ์คํ
โก๏ธ `cd /js/application/server` <br>
โก๏ธ `node server.js`



