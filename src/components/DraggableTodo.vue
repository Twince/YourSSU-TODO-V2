<template>
    <transition name="slide-fade">
        <div class="container">
            <div v-show="modalFlag" class="modal-container">
                <div class="modal-box">
                    <input type="text" class="edit-input" />
                    <button class="modify-commit">수정</button>
                    <button class="delete-item">삭제</button>
                </div>
            </div>
            <div class="title-section">
                <p class="main_title">
                    Vanilla JS DRAG & DROP Todo List 구현(50점)
                </p>
                <div class="divide-line" div />
                <div class="under-title flex-row">
                    <div class="subtitle-addlist">
                        <p class="middle-text">Todo List</p>
                        <button class="view-button">
                            <span style="font-size: 20px">+</span>&nbsp;보기
                            추가
                        </button>
                    </div>
                    <div class="search-addnew">
                        <img src="../assets/search.svg" alt="icon" />
                        <input v-model="searchData" @change="updateSearchData" placeholder="검색" class="search-text" type="text">
                        <p class="search-result">{{searchResult.searchResultRetrun}}</p>
                    </div>
                </div>
            </div>

            <div class="divide-line2" div />
            <div class="todo_list_box">
                <!-- none 배열 영역 -->
                <div class="inbox-title-wrapper">
                    <div class="inbox-title">
                        <div class="status">
                            <img
                                style="display: block"
                                src="../assets/inbox.svg"
                                alt="icon"
                            />
                            <p style="display: block">상태 없음</p>
                            <p class="list-count">
                                {{ TodoStatus.noneArr.length }}
                            </p>
                        </div>
                        <div class="menu-addnew">
                            <button class="inbox-button">
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                            <button
                                @click="noneSection__AddTodo"
                                class="inbox-button"
                            >
                                <img src="../assets/plus.svg" alt="icon" />
                            </button>
                        </div>
                    </div>
                    <div class="inbox-title">
                        <div class="status">
                            <p
                                class="start-before-title"
                                style="display: block"
                            >
                                시작 전
                            </p>
                            <p class="list-count">
                                {{ TodoStatus.readyArr.length }}
                            </p>
                        </div>
                        <div class="menu-addnew">
                            <button class="inbox-button">
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                            <button class="inbox-button">
                                <img
                                    @click="readySection__AddTodo"
                                    src="../assets/plus.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                    </div>
                    <div class="inbox-title">
                        <div class="status">
                            <p class="ongoing-title" style="display: block">
                                진행 중
                            </p>
                            <p class="list-count">
                                {{ TodoStatus.ongoingArr.length }}
                            </p>
                        </div>
                        <div class="menu-addnew">
                            <button class="inbox-button">
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                            <button class="inbox-button">
                                <img
                                    @click="ongoingSection__AddTodo"
                                    src="../assets/plus.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                    </div>
                    <div class="inbox-title">
                        <div class="status">
                            <p class="done-title" style="display: block">
                                완료
                            </p>
                            <p class="list-count">
                                {{ TodoStatus.doneArr.length }}
                            </p>
                        </div>
                        <div class="menu-addnew">
                            <button class="inbox-button">
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                            <button class="inbox-button">
                                <img
                                    @click="doneSection__AddTodo"
                                    src="../assets/plus.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="item-wrapper">
                    <div
                        id="none"
                        class="box-detail"
                        @dragover="onDragover"
                        @drop="onDrop"
                    >
                        <div
                            class="item"
                            v-for="(item, index) in TodoStatus.noneArr"
                            v-bind:key="index"
                            v-bind:id="index"
                            ref="itemBlock"
                            @mousedown="mouseDown"
                            draggable="true"
                            @dragstart="onDragStart"
                        >
                            <p class="item-text">{{ item }}</p>
                            <button
                                @click="editItem(index)"
                                class="item-edit-box"
                            >
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                        <div class="add-item">
                            <input
                                placeholder="새로 만들기"
                                class="value-input"
                                v-model="noneRawInput"
                            />
                            <button
                                @click="noneSection__AddTodo"
                                class="commit"
                            >
                                추가
                            </button>
                        </div>
                    </div>
                    <!-- ready 배열 영역 -->
                    <div
                        ref="itemBlock"
                        id="ready"
                        class="box-detail"
                        @dragover="onDragover"
                        @drop="onDrop"
                    >
                        <div
                            class="item"
                            v-for="(item, index) in TodoStatus.readyArr"
                            v-bind:key="index"
                            v-bind:id="index"
                            ref="itemBlock"
                            @mousedown="mouseDown"
                            draggable="true"
                            @dragstart="onDragStart"
                        >
                            <p class="item-text">{{ item }}</p>
                            <button
                                @click="editItem(index)"
                                class="item-edit-box"
                            >
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                        <div class="add-item">
                            <input
                                placeholder="새로 만들기"
                                class="value-input"
                                v-model="readyRawInput"
                            />
                            <button
                                @click="readySection__AddTodo"
                                class="commit"
                            >
                                추가
                            </button>
                        </div>
                    </div>
                    <!-- ongoing 배열 영역 -->
                    <div
                        id="ongoing"
                        class="box-detail"
                        @dragover="onDragover"
                        @drop="onDrop"
                    >
                        <div
                            class="item"
                            v-for="(item, index) in TodoStatus.ongoingArr"
                            v-bind:key="index"
                            v-bind:id="index"
                            ref="itemBlock"
                            @mousedown="mouseDown"
                            draggable="true"
                            @dragstart="onDragStart"
                        >
                            <p class="item-text">{{ item }}</p>
                            <button
                                @click="editItem(index)"
                                class="item-edit-box"
                            >
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                        <div class="add-item">
                            <input
                                placeholder="새로 만들기"
                                class="value-input"
                                v-model="ongoingRawInput"
                            />
                            <button
                                @click="ongoingSection__AddTodo"
                                class="commit"
                            >
                                추가
                            </button>
                        </div>
                    </div>
                    <div
                        id="done"
                        class="box-detail"
                        @dragover="onDragover"
                        @drop="onDrop"
                    >
                        <div
                            class="item"
                            v-for="(item, index) in TodoStatus.doneArr"
                            v-bind:key="index"
                            v-bind:id="index"
                            ref="itemBlock"
                            @mousedown="mouseDown"
                            draggable="true"
                            @dragstart="onDragStart"
                        >
                            <p class="item-text">{{ item }}</p>
                            <button
                                @click="editItem(index)"
                                class="item-edit-box"
                            >
                                <img
                                    src="../assets/more-horizontal.svg"
                                    alt="icon"
                                />
                            </button>
                        </div>
                        <div class="add-item">
                            <input
                                placeholder="새로 만들기"
                                class="value-input"
                                v-model="doneRawInput"
                            />
                            <button
                                @click="doneSection__AddTodo"
                                class="commit"
                            >
                                추가
                            </button>
                        </div>
                    </div>
                </div>
                {{ TodoStatus }}
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";

axios
    .get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then((response) => {
        // 실제 API를 요청한다/
        response.data.forEach((data) => {
            if (data.state == "none") TodoStatus.value.noneArr.push(data.value);
            else if (data.state == "ready")
                TodoStatus.value.readyArr.push(data.value);
            else if (data.state == "ongoing")
                TodoStatus.value.ongoingArr.push(data.value);
            else TodoStatus.value.doneArr.push(data.value);
        });
    })
    .catch((error) => {
        console.log("데이터를 불러오는 중 오류가 발생했습니다 :" + error);
    });

const TodoStatus = ref({
    noneArr: [],
    readyArr: [],
    ongoingArr: [],
    doneArr: [],
});

const noneRawInput = ref(""); //input 입력
const readyRawInput = ref("");
const ongoingRawInput = ref("");
const doneRawInput = ref("");

// const itemBoxOver = ref({
//     noneBoxOver: false,
//     readyBoxOver: false,
//     ongoingBoxOver: false,
//     doneBoxOver: false,
// });

const searchData = ref("");
const searchResult = ref({
    searchResultRetrun : "",
    ifSearched : false
});

const modalFlag = ref(false);
const isDragFlag = ref(false);
const selectElement = ref();

const mousePosition = ref({
    left: 0,
    top: 0,
});

const mouseDown = (e) => {
    isDragFlag.value = true;
    selectElement.value = e.target;
    // e.target.parentElement.style.height = "0px"; // 에니메이션을 주기 위해 .item-container를 0px로 변경.

    mousePosition.value.left = e.offsetX; // 이벤트의 대상
    mousePosition.value.top = e.offsetY;
}; // 마우스의 클릭을 감지(드래그)

window.addEventListener("mouseup", () => {
    if (!isDragFlag.value) return; // 드래그중이 아닐 시 함수 실행 취소
    isDragFlag.value = false; // 드래그가 종료되었으므로 flag 변환
    selectElement.value.style.height = "50px"; // item-continer에 공간 차지
    selectElement.value.style.position = ""; // 드래그하며 지정했던 absolute를 삭제
    // moveTodo();
});

const updateSearchData = () => {
    console.log(searchData.value);

    document.querySelector(".search-result").style.opacity = "1"; // 값 검색시 result 창 띄우기
    if(searchData.value == "") document.querySelector(".search-result").style.opacity = "0"; // 값 검색 input이 null일 경우 창 숨기기

    searchResult.value.ifSearched = false; // 검색된 값을 없음으로 초기화
    for (const [key, value] of Object.entries(TodoStatus.value)) {
        value.forEach(data => {
            if(data == searchData.value){
                searchResult.value.searchResultRetrun = `${key}에 값'${searchData.value}'가 검색되었습니다.`;
                searchResult.value.ifSearched = true;
                document.querySelector(".search-result").style.width = "280px";  
                return;
            } else { 
                searchResult.value.searchResultRetrun = "검색된 값 없음";
                document.querySelector(".search-result").style.width = "100px";    
            }
        })
        if(searchResult.value.ifSearched == true) return;
        console.log("같은 값이 존재합니다!" + searchResult.value); 
    }
    
}

watchEffect(() => {
    console.log(isDragFlag.value); // 플레그 디버그를 위한 console.log
    console.log(TodoStatus.value);
});

const onDragStart = (e) => {
    e.dataTransfer.setData(
        "test",
        JSON.stringify({
            targetID: e.target.id,
            previousArrName: e.target.parentElement.id,
        }) //setData에 파라미터는 string값만 받으므로, JSON.stringify로 문자열 변환
    );
};

const onDragover = (e) => {
    // console.log("드래그중!");
    // console.log(e.target.id);
    // if (e.target.id == "none" || e.target.parentElement.id == "none")
    //     itemBoxOver.value.noneBoxOver = true;
    e.preventDefault(); // 기본적으로 드래그를 막고 있던 이벤트를 막음. -> 드래그를 가능하게 함.
};

const onDrop = (e) => {
    const previousArrIndex = JSON.parse(
        e.dataTransfer.getData("test")
    ).targetID; // 이전 배열에서 선택(끌어온) 인덱스
    const previousArrName = JSON.parse(
        e.dataTransfer.getData("test")
    ).previousArrName;

    // e.target.id detail-box즉 todo를 놓는 배경 박스
    // Object.keys(TodoStatus.value)[1] : TodoStatus Object nonArr 이름

    console.log("onDrop 된 개체에 ID :" + e.target.id);

    let onDropedID = e.target.id;
    if (!isNaN(e.target.id)) onDropedID = e.target.parentElement.id; // e.target.id 가 숫자로 반환될 시(다른 TODO 위에 올라갔을 경우)
    if (onDropedID === "") onDropedID = e.target.parentElement.parentElement.id; // input에 드래그시 오류 방지를 위한 예외처리

    console.log("결론적으로 onDroped값:" + onDropedID);

    if (previousArrName == "none" && onDropedID != "none") {
        // TODO를 가져온 값의 아이디가 none일때
        if (Object.keys(TodoStatus.value)[1] == onDropedID + "Arr") {
            // 가져다가 놓은 위치가 ready일때
            console.log("ready에다가 놓았음!");
            TodoStatus.value.readyArr.push(
                TodoStatus.value.noneArr[previousArrIndex]
            );
            TodoStatus.value.noneArr.splice(previousArrIndex, 1);
            console.log("slice완료" + TodoStatus.value.noneArr);
        }
        console.log("키 이름" + Object.keys(TodoStatus.value)[1]); // 1번 인덱스는 ready

        if (Object.keys(TodoStatus.value)[2] == onDropedID + "Arr") {
            // 가져다가 놓은 위치가 ongoing일때
            console.log("ongoing에다가 놓았음!");
            TodoStatus.value.ongoingArr.push(
                TodoStatus.value.noneArr[previousArrIndex]
            );
            TodoStatus.value.noneArr.splice(previousArrIndex, 1);
            console.log("slice완료" + TodoStatus.value.noneArr);
        }

        if (Object.keys(TodoStatus.value)[3] == onDropedID + "Arr") {
            // 가져다가 놓은 위치가 done일때
            console.log("ongoing에다가 놓았음!");
            TodoStatus.value.doneArr.push(
                TodoStatus.value.noneArr[previousArrIndex]
            );
            TodoStatus.value.noneArr.splice(previousArrIndex, 1);
            console.log("slice완료" + TodoStatus.value.noneArr);
        }
    }

    if (previousArrName == "ready" && onDropedID != "ready") {
        // TODO를 가져온 값의 아이디가 ready일때
        if (Object.keys(TodoStatus.value)[0] == onDropedID + "Arr")
            // 가져다가 놓은 위치가 none일때
            TodoStatus.value.noneArr.push(
                TodoStatus.value.readyArr[previousArrIndex]
            );
        if (Object.keys(TodoStatus.value)[2] == onDropedID + "Arr")
            // 가져다가 놓은 위치가 ongoing일때
            // console.log(TodoStatus.value.eval(`ongoingArr`)); // eval을 이용하여 변수명을 함수로 적용시키려 했으나 안됨
            TodoStatus.value.ongoingArr.push(
                TodoStatus.value.readyArr[previousArrIndex]
            );
        if (Object.keys(TodoStatus.value)[3] == onDropedID + "Arr")
            // 가져다가 놓은 위치가 done일때
            TodoStatus.value.doneArr.push(
                TodoStatus.value.readyArr[previousArrIndex]
            );
        TodoStatus.value.readyArr.splice(previousArrIndex, 1);
    }

    if (previousArrName == "ongoing" && onDropedID != "ongoing") {
        // onging를 가져온 값의 아이디가 ready일때
        if (Object.keys(TodoStatus.value)[0] == onDropedID + "Arr")
            // 가져다가 놓은 위치가 none일때
            TodoStatus.value.noneArr.push(
                TodoStatus.value.ongoingArr[previousArrIndex]
            );
        if (Object.keys(TodoStatus.value)[1] == onDropedID + "Arr")
            // 가져다가 놓은 위치가 ready일때
            TodoStatus.value.readyArr.push(
                TodoStatus.value.ongoingArr[previousArrIndex]
            );
        if (Object.keys(TodoStatus.value)[3] == onDropedID + "Arr")
            // 가져다가 놓은 위치가 done일때
            TodoStatus.value.doneArr.push(
                TodoStatus.value.ongoingArr[previousArrIndex]
            );
        TodoStatus.value.ongoingArr.splice(previousArrIndex, 1);
    }

    if (previousArrName == "done" && onDropedID != "done") {
        // onging를 가져온 값의 아이디가 ready일때
        if (Object.keys(TodoStatus.value)[0] == onDropedID + "Arr")
            TodoStatus.value.noneArr.push(
                TodoStatus.value.doneArr[previousArrIndex]
            );
        if (Object.keys(TodoStatus.value)[1] == onDropedID + "Arr")
            TodoStatus.value.readyArr.push(
                TodoStatus.value.doneArr[previousArrIndex]
            );
        if (Object.keys(TodoStatus.value)[2] == onDropedID + "Arr")
            TodoStatus.value.ongoingArr.push(
                TodoStatus.value.doneArr[previousArrIndex]
            );
        TodoStatus.value.doneArr.splice(previousArrIndex, 1);
    }
};

const editItem = (index) => {
    modalFlag.value = true;
    index;
};

const noneSection__AddTodo = (e) => {
    console.log("nonRawInput 에 들어가는 값.");
    console.log(noneRawInput.value);
    noneRawInput.value != ""
        ? TodoStatus.value.noneArr.push(noneRawInput.value)
        : alert("입력창에 값을 입력해주세요!");

    console.log("addtdtd");
    console.log(e.target.parentElement.parentElement.id); // 입력한 값이 포함되어 있는 box-detail

    noneRawInput.value = "";
    console.log(TodoStatus.value);
};

const readySection__AddTodo = () => {
    readyRawInput.value != ""
        ? TodoStatus.value.readyArr.push(readyRawInput.value)
        : alert("입력창에 값을 입력해주세요!");
    readyRawInput.value = "";
};
const ongoingSection__AddTodo = () => {
    ongoingRawInput.value != ""
        ? TodoStatus.value.ongoingArr.push(ongoingRawInput.value)
        : alert("입력창에 값을 입력해주세요!");
    ongoingRawInput.value = "";
};
const doneSection__AddTodo = () => {
    doneRawInput.value != ""
        ? TodoStatus.value.doneArr.push(doneRawInput.value)
        : alert("입력창에 값을 입력해주세요!");
    doneRawInput.value = "";
};
</script>

<style scope>
.flex-row {
    display: flex;
    flex-direction: row;
}
.container {
    width: 100vw;
    height: 100vh;

    background-color: #fcfcfd;
    display: block;

    transition: 0.4s;
}

.title-section {
    display: block;

    margin: 0 auto;

    width: 800px;
}

.main_title {
    padding-top: 50px;
    margin-bottom: 10px;

    font-size: 35px;
    font-weight: 700;
}

.divide-line {
    width: 100%;
    height: 1.3px;

    margin: 0 auto;
    margin-bottom: 10px;

    background-color: rgb(211, 211, 211);

    /* background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.335), rgba(0, 0, 0, 0)); */
}
.divide-line2 {
    width: 85%;
    height: 0.7px;

    margin: 0 auto;
    margin-bottom: 10px;
    background-color: rgb(211, 211, 211);
}

.under-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.subtitle-addlist {
    display: flex;
    flex-direction: row;

    align-items: center;
}
/*------------ subTitle Section ---------------*/
.middle-text {
    display: block;

    margin: 3px;
    font-size: 26px;
    font-weight: 700;
}

.view-button {
    display: block;
    margin: 0 0 0 5px;
    padding: 3px 3px 5px 3px;

    border: none;
    border-radius: 5px;
    background-color: #fff;

    font-size: 14px;
    font-weight: 600;
    color: rgb(124, 124, 124);

    cursor: pointer;
    transition: 0.3s;
}
.view-button:hover {
    background-color: rgb(223, 223, 223);
    transform: scale(1.02);
}

.search-addnew {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.search-addnew img {
    display: block;

    font-weight: bold;
    opacity: 0.7;
    width: 15px;
}
.search-addnew > .search-text {
    height: 22px;

    border: none;
    border-radius: 5px;

    font-size: 15px;
    font-weight: 600;

    color: rgb(124, 124, 124);

    padding-left: 3px;

    transition: 0.3s;
}
.search-addnew > .search-text:hover{
    background-color: #eee;
    margin-left: 5px;

    transition: 0.3s;
}
.search-addnew > .search-text::placeholder{ transition: 0.3s; }
.search-addnew > .search-text:hover::placeholder{ font-size: 14px; color: rgb(148, 148, 148); padding-left: 10px; transition: 0.3s;}
.search-addnew > .search-text:focus{
    outline: none;
}

/* -------------- TODO LIST Section ------------------*/

.inbox-title-wrapper {
    display: block;
    margin: 0 auto;

    width: 1300px;

    display: flex;
    flex-direction: row;

    justify-content: space-around;
}

.inbox-title {
    width: 310px;
    height: 40px;

    margin-bottom: 7px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

/* ------------------------ 시작 전, 진행 중, 완료 Title--------------------------=-- */
.start-before-title {
    border-radius: 4px;

    width: 60px;
    height: 20px;

    padding-top: 2px;
    margin-top: 10px;

    text-align: center;
    background-color: rgb(255, 189, 189);
}
.ongoing-title {
    border-radius: 4px;

    width: 60px;
    height: 20px;

    padding-top: 2px;
    margin-top: 10px;

    text-align: center;
    background-color: rgb(191, 243, 160);
}
.done-title {
    border-radius: 4px;

    width: 40px;
    height: 20px;

    padding-top: 2px;
    margin-top: 10px;

    text-align: center;
    background-color: rgb(212, 212, 212);
}

.list-count {
    margin-left: 10px;
    margin-top: 15px;

    align-items: center;
    font-weight: 600 !important;
    color: #929292 !important;
}
/* ------------------------------------------------------------------------------ */

.menu-addnew {
    display: flex;
}
.inbox-button {
    display: block;

    width: 27px;
    height: 27px;

    margin: 7px 5px 0 0;
    padding: 0;

    border: none;
    border-radius: 5px;
    background-color: #fff;

    transition: 0.5s;
}
.inbox-button img {
    display: block;
    width: 18px;

    margin: 0 auto;

    opacity: 0.7;
    cursor: pointer;
}
.inbox-button:hover {
    transform: scale(1.04);
    background-color: rgb(223, 223, 223);
}

.status {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    align-items: cetner;
}
.status img {
    width: 20px;
    height: 43px;

    margin: 0 5px 0 15px;

    opacity: 0.7;
}
.status > p {
    font-weight: 800;
    font-size: 14px;

    margin-bottom: 3px;

    color: rgb(59, 59, 59);
}
.todo_list_box {
    display: block;

    margin: 0 auto;
    width: 1300px;
}

.item-wrapper {
    display: block;
    margin: 0 auto;

    width: 1300px;
    height: 500px;

    display: flex;
    flex-direction: row;

    justify-content: space-around;
    /* align-items: center; */
}

.box-detail {
    display: block;

    width: 320px;
    height: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: auto;
    -ms-overflow-style: none;

    transition: 0.4s;
    /* 
    background-color: rgb(197, 134, 134); */
}
.box-detail:hover {
    /* background-color: rgb(247, 247, 247); */
    border-radius: 10px;
}

.box-detail::-webkit-scrollbar {
    display: none;
}

.add-item {
    display: flex;
    align-items: center;

    width: 295px;
    height: 45px;

    background-color: rgb(247, 247, 247);
    border-radius: 5px;
    margin-top: 5px;

    transition: 0.3s;
}
.add-item input {
    border: none;
    border-radius: 5px;

    width: 220px;
    height: 35px;

    padding-left: 20px;

    background-color: rgb(247, 247, 247);

    cursor: pointer;
    transition: 0.3s;
}
.add-item input:hover {
    background-color: #eee;
}
.add-item input:focus {
    outline: none;
    background-color: #eee;
}
.add-item .commit {
    display: block;

    height: 35px;
    margin-left: 5px;
    padding-top: 1px;

    text-align: center;

    font-weight: 700;
    font-size: 10px;
    color: #5c5c5c;
    background-color: rgb(247, 247, 247);

    border: none;
    border-radius: 5px;
    cursor: pointer;

    transition: 0.3s;
}
.add-item .commit:hover {
    transform: scale(1.03);
    background-color: rgb(241, 241, 241);
}

.item {
    display: block;
    display: flex;
    justify-content: space-between;

    width: 300px;
    height: 50px;

    flex-shrink: 0;

    margin-top: 1px;
    margin-bottom: 15px;

    font-weight: 700;

    border: 1px solid #bababa;
    border-radius: 5px;
    /* background-color: rgb(158, 117, 117); */

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    transition: 0.3s;
    cursor: pointer;
}
.item:hover {
    transform: scale(1.01);
    background-color: rgb(232, 242, 255);
}
.item-text {
    margin-top: 15px;
    margin-left: 10px;

    color: #464646;
}

.item-edit-box {
    display: block;

    width: 20px;
    height: 20px;

    margin-right: 20px;

    border: none;
    opacity: 0;

    cursor: pointer;
    transition: 0.3s;
}
.item-edit-box img {
    display: block;

    width: 20px;
    height: 50px;

    margin: 0;
}
.item:hover .item-edit-box {
    opacity: 0.7;
}

.vavlue-input {
    transition: 3s;
}

.modal-container {
    width: 100%;
    height: 100%;

    padding: 0;
    margin: 0;

    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;

    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.432);
}
.modal-box {
    width: 400px;
    height: 200px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;

    background-color: rgb(252, 252, 252);
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    border: none;
    border-radius: 20px;
}
.modal-box input{
    display: block;

    border: none;
    border-radius: 10px;
    background-color: rgb(241, 241, 241);

    margin-left: 50px;
    margin-top: 40px;

    width: 300px;
    height: 50px;

    text-align: center;
    transition: 0.3s;
}
.modal-box input:hover{
    transform: scale(1.03);
}
.modal-box input:focus{
    outline: none;
}


.modal-box button {
    width: 60px;
    height: 30px;

    color: rgb(255, 83, 83);
    font-weight: 700;

    border: 1px solid rgb(218, 218, 218);
    border-radius: 5px;

background-color: #fff;
    cursor: pointer;
}
.modal-box .delete-item{
    background-color: rgb(255, 86, 86);
}
.search-result{
    display: block;
    position: absolute;

    width: 200px;
    height: 25px;

    margin-top: 70px;
    margin-left: 20px;

    border: 1px solid rgb(201, 201, 201);
    border-radius: 5px;
    background-color: rgb(245, 245, 245);

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    text-align: center;
    font-size: 12px;
    font-weight: 800;
    color: #464646;

    padding-top: 3px;

    opacity: 0;

    transition: 0.3s;
}
/* ------------------------------------------------------------------------------ */

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
</style>
