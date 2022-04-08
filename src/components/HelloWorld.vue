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
            <div id="none" class="none box-detail">
                <div
                    class="item"
                    v-for="(item, index) in noneArr"
                    v-bind:key="item"
                    v-bind:id="index"
                    ref="itemBlock"
                    @mousedown="mouseDown"
                    draggable="true"
                    @dragstart="onDragStart"
                >
                    {{ index }}, {{ noneArr[index] }}
                </div>

                <div class="add-item">
                    <input class="value-input" v-model="rawInput" />
                    <button @click="addTodo" class="commit">test</button>
                </div>
            </div>
            <div
                ref="itemBlock"
                id="ready"
                class="ready box-detail"
                @dragover="onDragover"
                @drop="onDrop"
            ></div>
            <div
                id="ongoing"
                class="ongoing box-detail"
                @dragover="onDragover"
                @drop="onDrop"
            ></div>
            <div
                id="done"
                class="done box-detail"
                @dragover="onDragover"
                @drop="onDrop"
            ></div>
        </div>
    </div>
</template>

<script setup>
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
    // e.target.parentElement.style.height = "0px"; // 에니메이션을 주기 위해 .item-container를 0px로 변경.

    mousePosition.value.left = e.offsetX; // 이벤트의 대상
    mousePosition.value.top = e.offsetY;

    console.log(document.querySelectorAll(".box-detail"));
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

window.addEventListener("load", () => {
    document.querySelectorAll(".box-detail").forEach((box) => {
        console.log(box);
        box.addEventListener("mouseup", (e) => {
            console.log(e.currentTarget);
        });
    });
});

//  document.addEventListener("drop", function(e) {
//       // prevent default action (open as link for some elements)
//       e.preventDefault();
//       console.log(e.target);
//       // move dragged elem to the selected drop target

//   }, false);

watchEffect(() => {
    console.log(flag.value); // 플레그 디버그를 위한 console.log
});

// const moveTodo = () => {

// }
const onDragStart = (e) => {
    console.log("여기에요!");
    console.log(e.target.parentElement.classList[0]);
    e.dataTransfer.setData(
        "test",
        JSON.stringify({
            targetID: e.target.id,
            ownArr: e.target.parentElement.classList[0],
        })
    );
};

const onDragover = (e) => {
    e.preventDefault(); // 기본적으로 드래그를 막고 있던 이벤트를 막음.
};

const onDrop = (e) => {
    console.log(e.dataTransfer.getData("test"));
    console.log("온드롭 실행함.");
    console.log(e.target.id);
    console.log(JSON.parse(e.dataTransfer.getData("test")).targetID);
};

const addTodo = () => {
    noneArr.value.push(rawInput.value); // 입력된 값을 배열에 출력
    console.log(noneArr.value);
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

    background-color: rgb(197, 134, 134);
}

.item {
    display: block;

    margin: 0 auto;

    width: 305px;
    height: 70px;

    margin-top: 15px;

    border-radius: 7px;
    background-color: rgb(158, 117, 117);

    cursor: move;
}

.vavlue-input {
    transition: 3s;
}
</style>
