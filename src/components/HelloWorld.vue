<template>
    <div class="container">
        <div class="title-section">
            <p class="main_title">Vanilla JS DRAG & DROP Todo List 구현(50점)</p>
            <div class="divide-line" div />
            
            <div class="flex-row">
                <p class="middle-text">Todo List</p>
                <button class="view-button">+보기추가</button>
            </div>
        </div>
        <div class="divide-line" div />

        <div class="todo_list_box">
            <div class="none box-detail">
                <div v-for="(item, index) in noneArr" v-bind:key="item">
                    <div class="item-container">
                        <div
                            ref="itemBlock"
                            @mousedown="mouseDown"
                            class="item"
                        >
                            {{ index }}, {{ noneArr[index] }}
                        </div>
                    </div>
                </div>

                <div class="add-item">
                    <input class="value-input" v-model="rawInput" />
                    <button @click="addTodo" class="commit">test</button>
                </div>
            </div>
            <div ref="itemBlock" class="ready box-detail"></div>
            <div class="ongoing box-detail"></div>
            <div class="done box-detail">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const noneArr = ref([]); //대기 배열
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
    e.target.parentElement.style.height = "0px";

    mousePosition.value.left = e.offsetX;
    mousePosition.value.top = e.offsetY;
};

window.addEventListener("mousemove", (e) => {
    if (!flag.value) return;
    e.preventDefault();

    // document.querySelector()
    selectElement.value.style.position = "absolute";
    selectElement.value.style.left = `${
        e.clientX - mousePosition.value.left
    }px`;
    selectElement.value.style.top = `${e.clientY - mousePosition.value.top}px`;
});

window.addEventListener("mouseup", (e) => {
    if (!flag.value) return;
    flag.value = false;
    console.log(e.target, e.offsetY, e.target.classList[0]);
    selectElement.value.parentElement.style.height = "60px";

    selectElement.value.style.position = "";
});

watchEffect(() => {
    console.log(flag.value);
});

const addTodo = () => {
    noneArr.value.push(rawInput.value);
    console.log(noneArr.value);
};
</script>

<style scope>
.flex-row{ display: flex; flex-direction: row; }
.container {
    width: 100vw;
    height: 100vh;

    background-color: #FCFCFD;
    display: block;
}

.title-section{
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

.divide-line{
    width: 100%;
    height: 1px;

    margin: 0 auto;;
    margin-bottom: 10px;

    background-color: rgb(211, 211, 211);

    /* background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.335), rgba(0, 0, 0, 0)); */
}

.middle-text{
    display: block;

    margin: 0 0 0 3px;
    font-size: 27px;
    font-weight: 700;
}

.view-button{
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
    align-items: center;

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

.item-container {
    transition: height 0.5s;

    width: 310px;
    height: 70px;
}

.item {
    display: block;

    margin: 0 auto;

    width: 305  px;
    height: 70px;

    margin-top: 10px;

    border-radius: 7px;
    background-color: rgb(158, 117, 117);

    cursor: move;
}

.vavlue-input {
    transition: 3s;
}
</style>
