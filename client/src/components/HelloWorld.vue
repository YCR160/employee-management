<script setup lang="ts">
import { ref } from 'vue';

const id = ref('');
const name = ref('');
const email = ref('');

const submitForm = async () => {
    const response = await fetch('/assistant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id.value,
            name: name.value,
            email: email.value
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Data received from server:', data);
    } else {
        console.error('Error:', response.status);
    }
};
</script>

<template>
    <div class="employee">
        <h1>员工信息管理</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label>员工ID：</label>
                <input v-model="id" type="text" />
            </div>
            <div>
                <label>姓名：</label>
                <input v-model="name" type="text" />
            </div>
            <div>
                <label>邮箱：</label>
                <input v-model="email" type="text" />
            </div>
            <button type="submit">提交</button>
        </form>
    </div>
</template>

<style scoped>
.employee {
    width: 300px;
    margin: 0 auto;
}
</style>
