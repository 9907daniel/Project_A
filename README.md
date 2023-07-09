
# Project A

## 깃허브 관리 컨벤션
### 1. 커밋 메세지 컨벤션
```
Feat : 새로운 기능을 추가
Fix : 버그 고침
Rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
Remove	: 파일을 삭제하는 작업만 수행한 경우
Refactor	프로덕션 코드 리팩토링
Style	코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
Docs : 문서를 수정한 경우
Test : 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
Chore	빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
```
- ex) "Fix 로그인페이지 에러 수정"

- ex) "Rename XXX 폴더 안으로 옮김"


### 2. Git Flow (PR / Code Review)
새로운 테스크, 작업 진행시 새로운 브랜치 만들기 (PR / Code Review)
1. feature branches -> develop -> master

2. 프론치 파는 방법
- ex) 프론트에서 contact us 페이지를 만들 었다면 새로운 브랜치 생성해서 PR로 푸쉬 하기
- 다른 사람 브랜치 merge 이후에 
- Main Branch push 방지를 위해 설정했습니다 (README는 바로 해도 괜찮을듯 (?))
- Merge 된 Branch는 Closed 로 변경
```
git branch _새로운브랜치이름_
git checkout _새로운브랜치이름_

# 푸쉬 할때
git add . 
git commit -m "_커밋을 설명하는 코멘트_"
git push origin _파생브랜치이름_ _새로운브랜치이름_

# main브랜치 없데이트 필요시, main pull + main rebase
git checkout develop
git pull
git checkout _현재일하고있는브랜치_
git rebase develop
git add .
git status 
...

```

### 3. Docker 환경 구축
```
# docker-compose.yml있는 directory로 이동

docker compose build

# 실행
docker compose up

# dettached mode 실행
docker compose up -d

# 중단
docker compose down

# 주기적으로 사용하지 않는 image들 제거하기
docker image prune

######################################
### docker compose 없이 개별 실행 필요시 ###
######################################

# 백엔드
docker pull mysql
docker run --name backend -e MYSQL_ROOT_PASSWORD=projecta -d mysql
docker run --name mysqldb --network mynetwork  -e MYSQL_ROOT_PASSWORD=projecta -e MYSQL_DATABASE=backend -d mysql
docker exec -it mysqldb bash
-> mysql -u root -p
docker build -t backend .
docker run --network mynetwork --name backend_run -p 7072:7072 -d backend


# 프론트
docker build -t frontend ./
docker run -i -p 3000:3000 frontend


```




### 4. 생각하는 추가 기능, 이슈, 발전사항
- 만약 당장 구현을 못하거나 장기적인 이슈가 있을때 Github Issues 에 추가하기

### 5. 푸쉬할때 쓸때없는 파일 푸쉬안하게 .gitignore 관리
