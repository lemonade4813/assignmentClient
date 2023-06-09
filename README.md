RGT 과제 전형 : 

[테이블 오더] 프로그램 만들기
⚫ 서버 구성을 위한 프로그래밍 언어(language) 선택은 제약이 없습니다.

⚫ 선택된 메뉴는 리스트 형태로 ‘Cart’에 저장되고, 해당 Cart 아이콘을 누르면 ‘주문하기’
버튼이 하단에 위치해 있으며, ‘주문하기’버튼 클릭시 선택된 메뉴가 백엔드단에 DB로 저
장되도록 합니다.

◼ 메뉴명 / 수량 / 가격 / 소계 정보가 저장되어야 함

◆ 각 카테고리별 선택하는 버튼이 있어야 하며, 각 카테고리별 메뉴 정보는 아래
와 같습니다. 예시로 각 카테고리별 4개씩 메뉴로 한정합니다.
1) 커피

◼ 아메리카노 (HOT) : 2,000원 / 아메리카노 (ICE) : 2,300원

◼ 카페라떼 (HOT) : 3,500원 / 카푸치노 : 4,000원

2) 차 / 음료

◼ 레몬 에이드 : 3,500원 / 밀크쉐이크 : 4,500원

◼ 말차라떼 : 4,500원 / 초코라떼 : 5,000원

3) 디저트

◼ 초코 쿠키 : 2,500원 / 아몬드 쿠키 : 3,000원

◼ 초코 케익 : 4,000원 / 딸기 케익 : 4,500원

4) 기타

◼ 생수 : 2,000원 / 콜라 : 2,500원

◼ 사이다 : 2,500원 / 페리에 : 4,000원

⚫ 메뉴를 주문할 수 있는 테이블 오더 (Table Order)화면을 구성하고, 메뉴를 선택시 백앤드
(서버)단에 DB로 저장되며, 해당 테이블 번호로 검색하면 선택한 메뉴명과 주문일시( xx :
yy 시분 형태로 표현되도록 합니다.

---------------------------------


서버 Repository : https://github.com/lemonade4813/assignmentServer


### 1. 실행방법

1. 패키지 설치 : npm install 

2. 실행 : npm start

(실행 시 : http://localhost: 3000)

### 2. 기능 설명

1. 사용할 테이블을 선택합니다.

![image](https://user-images.githubusercontent.com/103189961/230841200-33e8fffc-7667-4630-a6ae-ca7c95c9da33.png)


2. 테이블 주문

* 사용 중인 테이블이 아닐 경우

1) 카테고리를 선택하여 해당 카테고리별 주문메뉴가 표시되며, 해당 메뉴 클릭시 "STEP3"의 주문 리스트에 추가됩니다.

   ![image](https://user-images.githubusercontent.com/103189961/230839200-33be3fd5-5a6f-4396-9b1c-030b77d2fd42.png)

2) STEP3에서 주문한 메뉴와, 수량, 가격을 확인할 수 있으며, 하단의 주문하기 버튼을 누르면 주문 처리가 진행됩니다.
 
![image](https://user-images.githubusercontent.com/103189961/230839859-53567046-5e75-49e6-8d7d-c71336dba47a.png)

3) 해당 테이블을 다시 클릭하면 주문정보를 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/103189961/230887557-3fdaac46-e603-4f9d-a52b-d336213f3d9f.png)


* 사용 중인 테이블인 경우

1) 주문번호와, 주문일자, 주문 상세정보(메뉴, 수량, 가격)가 표시됩니다.

![image](https://user-images.githubusercontent.com/103189961/230840292-765607a2-7bfb-4679-b21e-45823c3bebe9.png)

2) 하단의 "식사완료" 버튼을 누르면 화면이 새로고침되고 해당 테이블의 주문을 다시 처리할 수 있습니다. 




