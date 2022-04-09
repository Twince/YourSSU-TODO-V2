<template>
    <div class="container">
        <div class="title-section">
            <p class="main_title">
                Vanilla JS DRAG & DROP Todo List 구현(50점)
            </p>
            <div class="divide-line" div />

            <div class="flex-row">
                <p class="middle-text">Todo List</p>
                <button class="view-button">+보기추가</button>
            </div>
        </div>
        <div class="divide-line2" div />

        <div class="todo_list_box">
            <!-- none 배열 영역 -->
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
                    {{ index }}, {{ item }}
                </div>

                <div class="add-item">
                    <input class="value-input" v-model="noneRawInput" />
                    <button @click="noneSection__AddTodo" class="commit">test</button>
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
                    {{ index }}, {{ item }}
                </div>

                <div class="add-item">
                    <input
                        class="value-input"
                        v-model="readyRawInput"
                    />
                    <button @click="readySection__AddTodo" class="commit">test</button>
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
                    {{ index }}, {{ item }}
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
                    {{ index }}, {{ item }}
                </div>
            </div>
        </div>
        {{ TodoStatus }}
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const TodoStatus = ref({
    noneArr: [], // 대기열 배열
    readyArr: [],
    ongoingArr: [],
    doneArr: [],
});
// const readyArr = ref([]);

const noneRawInput = ref(); //input 입력
const readyRawInput = ref();
// const ongoingawInput = ref();
// const doneRawInput = ref();


const flag = ref(false);
const selectElement = ref();
// const previousArr = ref(); // 옮겨진 대상의 배열 이름

const mousePosition = ref({
    left: 0,
    top: 0,
});

const mouseDown = (e) => {
    flag.value = true;
    selectElement.value = e.target;
    // e.target.parentElement.style.height = "0px"; // 에니메이션을 주기 위해 .item-container를 0px로 변경.

    mousePosition.value.left = e.offsetX; // 이벤트의 대상
    mousePosition.value.top = e.offsetY;
}; // 마우스의 클릭을 감지(드래그)

// window.addEventListener("mousemove", (e) => {
//     if (!flag.value) return; //마우스 클릭이 아닐 시 함수 실행 취소
//     e.preventDefault(); // 클릭 왜 모든 이벤트 막기

//     // document.querySelector()
//     selectElement.value.style.position = "absolute"; // 클릭된 엘리먼트의 absolute 포지션 지정
//     selectElement.value.style.left = `${e.clientX - mousePosition.value.left}px`; // 선택된 엘리먼트(아이템)의 위치를 마우스 포지션으로 변경
//     selectElement.value.style.top = `${e.clientY - mousePosition.value.top}px`; // 마우스 위치 기준으로 이동시키기 위해 선택된 엘리먼트의 위치를 뺴기
// });

window.addEventListener("mouseup", () => {
    if (!flag.value) return; // 드래그중이 아닐 시 함수 실행 취소
    flag.value = false; // 드래그가 종료되었으므로 flag 변환
    selectElement.value.style.height = "70px"; // item-continer에 공간 차지
    selectElement.value.style.position = ""; // 드래그하며 지정했던 absolute를 삭제
    // moveTodo();
});

// window.addEventListener("load", () => {
//     document.querySelectorAll(".box-detail").forEach((box) => {
//         console.log(box);
//         box.addEventListener("mouseup", (e) => {
//             // console.log(e.currentTarget);
//         });
//     });
// });

//  document.addEventListener("drop", function(e) {
//       // prevent default action (open as link for some elements)
//       e.preventDefault();
//       console.log(e.target);
//       // move dragged elem to the selected drop target

//   }, false);

watchEffect(() => {
    console.log(flag.value); // 플레그 디버그를 위한 console.log
    console.log(TodoStatus.value);
});

// const moveTodo = () => {

// }
const onDragStart = (e) => {
    // console.log("여기에요!" + e.target.parentElement.classList[0]);
    e.dataTransfer.setData(
        "test",
        JSON.stringify({
            targetID: e.target.id,
            previousArrName: e.target.parentElement.id,
        }) //setData에 파라미터는 string값만 받으므로, JSON.stringify로 문자열 변환
    );
};

const onDragover = (e) => {
    e.preventDefault(); // 기본적으로 드래그를 막고 있던 이벤트를 막음. -> 드래그를 가능하게 함.
};

const onDrop = (e) => {
    // console.log("전 배열 이름 저장" + previousArr.value);
    // console.log(e.dataTransfer.getData("test"));
    // console.log("온드롭 실행함.");
    // console.log(e.target.id);
    // console.log(JSON.parse(e.dataTransfer.getData("test")).targetID); // JSON.parse로 sringify를 JSON형태로 되돌림.

    const previousArrIndex = JSON.parse(
        e.dataTransfer.getData("test")
    ).targetID; // 이전 배열에서 선택(끌어온) 인덱스
    const previousArrName = JSON.parse(
        e.dataTransfer.getData("test")
    ).previousArrName;

    // e.target.id detail-box즉 todo를 놓는 배경 박스
    // Object.keys(TodoStatus.value)[1] : TodoStatus Object nonArr 이름

    console.log("onDrop 된 개체에 ID :" + e.target.id);
    if (previousArrName == "none") { // TODO를 가져온 값의 아이디가 none일때
        if (Object.keys(TodoStatus.value)[1] == e.target.id + "Arr") { // 가져다가 놓은 위치가 ready일때
            console.log("ready에다가 놓았음!");
            TodoStatus.value.readyArr.push(
                TodoStatus.value.noneArr[previousArrIndex]
            );

            TodoStatus.value.noneArr.splice(previousArrIndex, 1);
            console.log("slice완료" + TodoStatus.value.noneArr);
        }
        console.log("키 이름" + Object.keys(TodoStatus.value)[1]); // 1번 인덱스는 ready

        if (Object.keys(TodoStatus.value)[2] == e.target.id + "Arr") { // 가져다가 놓은 위치가 ongoing일때
            console.log("ongoing에다가 놓았음!");
            TodoStatus.value.ongoingArr.push(
                TodoStatus.value.noneArr[previousArrIndex]
            );
            TodoStatus.value.noneArr.splice(previousArrIndex, 1);
            console.log("slice완료" + TodoStatus.value.noneArr);
        }

        if (Object.keys(TodoStatus.value)[3] == e.target.id + "Arr") { // 가져다가 놓은 위치가 done일때
            console.log("ongoing에다가 놓았음!");
            TodoStatus.value.doneArr.push(
                TodoStatus.value.noneArr[previousArrIndex]
            );
            TodoStatus.value.noneArr.splice(previousArrIndex, 1);
            console.log("slice완료" + TodoStatus.value.noneArr);
        }
    }


    if (previousArrName == "ready") { // TODO를 가져온 값의 아이디가 ready일때
        if (Object.keys(TodoStatus.value)[0] == e.target.id + "Arr") { // 가져다가 놓은 위치가 none일때
            TodoStatus.value.noneArr.push(TodoStatus.value.readyArr[previousArrIndex]);
        }

        if (Object.keys(TodoStatus.value)[2] == e.target.id + "Arr") { // 가져다가 놓은 위치가 ongoing일때
            // console.log(TodoStatus.value.eval(`ongoingArr`)); // eval을 이용하여 변수명을 함수로 적용시키려 했으나 안됨
            TodoStatus.value.ongoingArr.push(
                TodoStatus.value.readyArr[previousArrIndex]
            );
        }

        if (Object.keys(TodoStatus.value)[3] == e.target.id + "Arr") { // 가져다가 놓은 위치가 done일때
            TodoStatus.value.doneArr.push(
                TodoStatus.value.readyArr[previousArrIndex]
            );
        }
        TodoStatus.value.readyArr.splice(previousArrIndex, 1);
    }

    // if (previousArrName == "ready") {
    //     if(Object.keys(TodoStatus.value[2]))
    // }






    // const index = JSON.parse(e.dataTransfer.getData("test")).targetID
    // const cutedData = previousArr.value + "Arr".value.slice(index, 1); // 전값 이름 + Arr.slice(index(targetID), 1)

    // // e.dataTransfer.getData("test")
    // e.target.id + "Arr".push(cutedData);
};

const noneSection__AddTodo = (e) => {
    console.log("nonRawInput 에 들어가는 값.");
    console.log(noneRawInput.value);
    TodoStatus.value.noneArr.push(noneRawInput.value);
    
    console.log("addtdtd");
    console.log(e.target.parentElement.parentElement.id); // 입력한 값이 포함되어 있는 box-detail

    noneRawInput.value = "";
    console.log(TodoStatus.value);
};

const readySection__AddTodo = (e) => {
    TodoStatus.value.readyArr.push(readyRawInput.value);
    readyRawInput.value = "";
    e
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
    height: 1px;

    margin: 0 auto;
    margin-bottom: 10px;

    background-color: rgb(211, 211, 211);

    /* background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.335), rgba(0, 0, 0, 0)); */
}
.divide-line2 {
    width: 80%;
    height: 1px;

    margin: 0 auto;
    margin-bottom: 10px;
    background-color: rgb(211, 211, 211);
}

.middle-text {
    display: block;

    margin: 0 0 0 3px;
    font-size: 27px;
    font-weight: 700;
}

.view-button {
    display: block;
}

.todo_list_box {
    display: block;
    margin: 0 auto;

    width: 1300px;
    height: 500px;

    display: flex;
    flex-direction: row;

    justify-content: space-around;
    /* align-items: center; */

    background-color: rgb(163, 163, 163);
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

    background-color: rgb(197, 134, 134);
}

.box-detail::-webkit-scrollbar {
    display: none;
}

.item {
    display: block;

    width: 305px;
    height: 70px;

    flex-shrink: 0;

    margin-top: 15px;

    border-radius: 7px;
    background-color: rgb(158, 117, 117);

    /* cursor: move; */
}

.vavlue-input {
    transition: 3s;
}
</style>
