# 유어슈 프론트엔드 사전 과제

---

### YourSSU TODO 구현하기 - 나 자신을 위한 회고

- [x]  해당 내용에 개발 과정은 모두 녹화를 진행하였으며, 타임랩스와 나레이션 방식으로 영상을 제작하려 하였으나, 시간상 문제로 노션 문서로 대체하였습니다. + 면접을 위한 회고

[Twince - Overview](https://github.com/Twince)

# 본 문서의 구성

- 개발을 시작하며
- 사전 계획
- 개발과 그 비화
- 마치며

## 1. 개발을 시작하며

---

> 하나도 기억나지 않던 내용으로 개발을 시작하기까지 - 6개월간에 공백
> 

고등학교 때 프로그래밍을 시작했던 저는 유어슈 사전 과제를 받고 다양한 생각이 들었습니다. 분명 개발자 입장에서 어려운 일은 아닐텐데 내가 과연 할 수 있을까?

VS Code를 키며 조금은 당황했습니다. 기본적인 프로젝트 세팅도 생각이 잘 안 났기 때문입니다.
깃 허브에 새로운 [리포지토리](https://github.com/Twince/YourSSU-TODO/tree/master)를 만들고 개발을 진행하던 중 문뜩 이런 생각이 들었습니다. 

<aside>
💡 ‘ **이왕 까먹은거 새로운 기술로 도전 해보자! ‘**

</aside>

그렇게 기존에 하던 작업은 뒤로 한 채 새로 출시되었다는 Vue3 (3.5.2) 프로젝트를 생성 하였습니다.

`data`, `computed`, `methods` 이런 식으로 스크립트 영역이 나눠져 있던  것과는 다르게, 어쩌면 React와 비슷한 방식으로 코드를 진행하더군요!

---

## 2. 사전 계획

개발을 들어가면서 다양한 자료들과 영상을 보았고, 특히나 마지막 블로그를 많이 참고하였습니다. 

[How To Build Sortable Drag & Drop With Vanilla Javascript](https://www.youtube.com/watch?v=jfYWwQrtzzY&t=1s)

[Drag & Drop With Vanilla JS](https://www.youtube.com/watch?v=C22hQKE_32c)

[HTML 드래그 앤 드롭 API - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)

[[JS] 📚 드래그 앤 드롭(Drag and Drop) 기능 구현하기](https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5)

목표로 했던 기능(구현하고자 했던 것)은

- Drag 기능이 구현된 Todo List
- 각 아이템 드래그 시 드래그 효과
- 원하는 위치 사이에 끼워넣기 및 들어가 위치 표시
- Axios 를 이용한 데이터 불러오기
- 부드러운 에니메이션
- 예제와 최대한 비슷한 UI 퍼블리싱

와 같았습니다.

---

## 3. 개발과 그 비화

개발 초기, 프로젝트를 생성하고 간단한 TODO 리스트를 만들기까지는 그리 오랜 시간이 걸리진 
않았습니다. ~~`상대적으로 시간이 많이 안 걸렸을 뿐, 다시 문법 감을 찾는것도 시간이 걸렸습니다`~~

```jsx
// TODO LIST 배열 출력
<div v-for="(item, index) in noneArr" v-bind:key="item">
	<div ref="itemBlock" class="item" draggable="true">
			{{index}}, {{ noneArr[index] }}
	 </div>
</div>

// Input 과 Button을 통해 값 입력
<div class="add-item">
   <input v-model="rawInput">
   <button @click="addTodo(rawInput)" class="commit">test</button>
</div>
```

이와 같이 `data` 영역에 변수를 만들어주고  입력 폼을 값을 출력만 해주면 되었습니다.

문제는 그 다음부터 였는데요, **“ 드래그 기능을 어떻게 구현할 것인가? “** 근본적인 질문 속에 

여러가지 방법들을 생각했었습니다.

 

### 1. addEvenListener로 특정 Element감지 후 appendchild로 돔 트리 구조 변경

→ Rest API 및 배열로 값을 저장하는데 문제가 있어서 기각. 
     (vue에서의 배열과 어떻게 연결해야할지 감이 안잡힘)

### 2. Vue $refs 로 특정 엘리먼트 선택후 index가져와서 위치 검색

→ 처음 선택한 엘리먼트에 위치는 잡히나 드래그 하면서의 위치는 event 가져올 수 없음.

### 3. 특정 엘리먼트 선택 감지 후 마우스 위치 및 각 엘리먼트의 위치 계산 - 위치에 따른 이벤트 지정

→ 엄청나게 비효율적, 반응형 웹 구현 시 더욱 복잡해지거나 불가능함 (실력적인 부분에서도,,)

### 4. 그 밖에 여러 방법들....

---

- *우선 드래그 이벤트를 가진 TODO 리스트를 확실하게 구분해주기 위해 다음과 같이
HTML과 CSS를 구성. - 초기 구현 화면*
    
    ![Untitled](%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%A5%E1%84%89%E1%85%B2%20%E1%84%91%E1%85%B3%E1%84%85%2071956/Untitled.png)
    

> 여러 프레임워크들을 사용해 보았다곤 했지만, 말 그대로 사용만 해본 사람으로써 이런 간단한 작업도 쉽지 않았던 것. 직접적으로 element를 Js 단에서 다뤄본 적도 없었음.
> 

우선, 마우스의 움직임과 그에 따른 이벤트를 감지해서 받아오기로 했습니다. 
(아래 코드와 이에 따른 기능)

```jsx
import { ref, watchEffect } from "vue";
const noneArr = ref([]); //대기열 배열
const rawInput = ref(); //input 입력
const flag = ref(false);
const selectElement = ref();
const mousePosition = ref({
    left: 0,
    top: 0,
});
const mouseDown = (e) => {
    flag.value = true;
    selectElement.value = e.target;
    e.target.parentElement.style.height = "0px"; // 에니메이션을 주기 위해 .item-container를 0px로 변경.
    mousePosition.value.left = e.offsetX; // 이벤트의 대상
    mousePosition.value.top = e.offsetY;
    console.log(document.querySelectorAll(".box-detail"));
}; // 마우스의 클릭을 감지(드래그)
window.addEventListener("mousemove", (e) => {
    if (!flag.value) return; //마우스 클릭이 아닐 시 함수 실행 취소
    e.preventDefault(); // 클릭 왜 모든 이벤트 막기
    // document.querySelector()
    selectElement.value.style.position = "absolute"; // 클릭된 엘리먼트의 absolute 포지션 지정
    selectElement.value.style.left = `${e.clientX - mousePosition.value.left}px`; // 선택된 엘리먼트(아이템)의 위치를 마우스 포지션으로 변경
    selectElement.value.style.top = `${e.clientY - mousePosition.value.top}px`; // 마우스 위치 기준으로 이동시키기 위해 선택된 엘리먼트의 위치를 뺴기
});
window.addEventListener("mouseup", () => {
    if (!flag.value) return; // 드래그중이 아닐 시 함수 실행 취소
    flag.value = false; // 드래그가 종료되었으므로 flag 변환
    selectElement.value.parentElement.style.height = "70px"; // item-continer에 공간 차지
    selectElement.value.style.position = ""; // 드래그하며 지정했던 absolute를 삭제
    // moveTodo();
});
window.addEventListener("load", () => {
        document.querySelectorAll(".box-detail").forEach(box => {
        console.log(box);
        box.addEventListener("mouseup", (e) => {
            console.log(e.currentTarget);
        })
    })
})
```

![https://i.gyazo.com/c2e3ecae003f32b22258aa263ff0ca94.gif](https://i.gyazo.com/c2e3ecae003f32b22258aa263ff0ca94.gif)

이러한 내용을 개발함에 있어도 `addEventListener`, `window`, `document`, `event / e.target`  등 내용을 공부해야 했습니다.

그러나 이윽고 어떤 방법을 통하든 마우스 위치를 기반으로 한 작업은, 원하는 엘리먼트를 
원활하게 가져올 수 없다는 것을 깨달았습니다. 

```jsx
document.querySelector(".item").style.left = ${event.clientX}px
```

TODO 리스트에 아이템을 옮길 때 이런 식으로 가져왔었기 때문이죠. 
(이벤트가 item을 기준으로 작동할 수 밖에 없음)

---

**다른 방법이 필요했습니다.**

그렇게 구글링을 더 하던 중, HTML 드래그 & 드롭 API를 발견하게 됩니다(MDN 문서).

관련된 블로그 내용도 검색을 하며 비슷한 기능을 구현한 코드들을 찾아보았고

<aside>
🟢 **e.dataTransfer.set/getData**

</aside>

를 통해 각 엘리먼트 끼리 데이터를 주고받을 수 있다는 사실을 알게 되었습니다. 

간단하게 정리하여 보자면..

### 본 프로젝트에 사용된 방식은 다음과 같습니다.

![아마 [dataTrasfer.data](http://dataTrasfer.data) 영역에 값이 변수같이 저장 되었을 것으로 예상 ](%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%A5%E1%84%89%E1%85%B2%20%E1%84%91%E1%85%B3%E1%84%85%2071956/Untitled%201.png)

아마 [dataTrasfer.data](http://dataTrasfer.data) 영역에 값이 변수같이 저장 되었을 것으로 예상 

이와 관련된 내용도 계속해서 찾아보며 값을 string형태로 저장된다는 사실을 알았고 `JSON.stringify` 를 이용하여 저장해주었습니다.

![Untitled](%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%A5%E1%84%89%E1%85%B2%20%E1%84%91%E1%85%B3%E1%84%85%2071956/Untitled%202.png)

`onDrop` 이벤트는 Todo에 각 item에 배경이 되는 엘리먼트에서 마우스 드롭 시 변화를 감지합니다.

이런 방식으로 드래그를 시작한 item에 인덱스와 그 배경에 이름을 가져왔습니다.

![Untitled](%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%A5%E1%84%89%E1%85%B2%20%E1%84%91%E1%85%B3%E1%84%85%2071956/Untitled%203.png)

드롭 후에는 onDrop이 실행되며 `전 배열의 인덱스`, `전 배열의 이름`, `가져다 놓은 배열` 을 감지하여

아이템에 추가하여 줍니다.

1. 드래그 아이템이 담겨있는 `box-deatail` 일리먼트에 **Dragover** API 와 **Drop** API 적용
2. 드래그 당하는(?) 아이템은 **onDragStart** 이벤트 적용
3. **onDrop** 이벤트를 통해 값을 추가 후 재 렌더링

---

**이렇게 기본적인 드래그 앤 드롭을 구현할 수 있었습니다.**

그러나 js 코드를 작성하는 것만 문제가 있었던 것은 아닙니다.

HTML 이나 CSS 구성에도 애를 먹었었는데요, Vuesax 나 Vuetify, featherIcon이나 Toast Notification등등 다양한 디펜던시를 설치함에 있어서도 어려움이 있었습니다.

### 적용시켰던 dependencies목록

- ~~Feater Icon~~
- ~~Vuesax3~~
- ~~Vuesax4~~
- ~~Animate.css~~
- ~~Toast Notification~~
- Axios ( REST API )

<aside>
⛔ **기존에 사용해 보았던 Vue2와는 달리, Vue3부터는 적용 방식이 달라져 아예 적용 자체가 
힘들었던 것.**

</aside>

때문에 아이콘들을 비롯한 UI를 직접 CSS로 구현해야 했고 생각보다 더 많은 시간이 걸렸습니다.

하지막 덕분에 더욱 비슷한 과제를 만들 수 있었다고 생각합니다 :)

---

## HTML, CSS, Js작업을 마친 모습

![https://i.gyazo.com/24684f3a134bb7eb3cf2994c8f6d2309.gif](https://i.gyazo.com/24684f3a134bb7eb3cf2994c8f6d2309.gif)

---

## 마치며..

> **우당탕탕 Drag&Drop Todo 개발기**
> 

<aside>
✅ **1. 그 한계와 시사점
2. 아쉬웠던 점
3. 만족했던 
4. 남은 구현 기능
5. 소감**

</aside>

해당 프로젝트를 진행하며 제가 보았던 보였던 한계는 명확합니다. 

- 자유롭게 개발을 진행하기 힘든
실력과 개발에 걸린 시간.
- 하나에 페이지 안에서 정적인 웹이라는 점
- 완벽한 기능 구현이 아닌 버그가 있다는 점
- 코드가 비효율적이라는 점
- 컴포넌트 및 프로젝트의 구조가 명확하지 않다는 점
- 기술적 한계로 Props등 데이터간 통신 기능을 잘 활용하지 못한 점
- 더욱 인터렉티브하게 만들지 못한 점 - 사용자 경험과 에니메이션
- ~~쉬운 것을 만들기 힘들어하는 본인의 실력~~

---

**아쉬웠던 점이라고 말할 수도 있을 것 같아요. 특히나 체계적인 코드 구조가 잡혀있지 않다는 점과**

**비슷한 유형에 코드가 여러 부분 있다는 것이 가장 아쉬운 점으로 남습니다. 코드 컨벤션만 겨우 갖춘 느낌 이에요.**

**어렵다는 핑계로 구현하지 못한 기능들도 있습니다.**

- 아이템을 아이템 사이에 끼워넣기
- 드래그 후 호버 시 위치가 보이는 UI/UX
- DB 구조
- 로컬 스토리지 (적용을 시키긴 했지만 제대로 구현이 된 것인지 모르겠음)

**그러나 아쉬운 점 말고도 만족스러운 점도 있습니다. 이번 프로젝트를 통해 직접적으로** 

- 프레임워크를 직접 구현해보았다는 점.
- JS를 직접적으로 사용해보았다는 점 ( event및 dom을 직접적으로 사용해봄 )
- 최신 프레임워크를 사용해보았다는 것
- 비슷하게 구현된 기능
- 여러가지 예외 처리

**를 해볼 수 있었습니다.**

---

## 정말로 마치며,,

이번 프로젝트는 개인적으로도 실력이 느는 것을 느낄 수 있었던 프로젝트였습니다.

앞으로도 클론 코딩을 자주 해봐야겠다는 생각이 듭니다. 

좋은 기회 마련해주셔서 감사드리며, 이상으로 회고 글 이었습니다. 면접에서 뵈어요 :)

[GitHub - Twince/YourSSU-TODO-V2 at useDraggable](https://github.com/Twince/YourSSU-TODO-V2/tree/useDraggable)