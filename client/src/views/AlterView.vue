<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const username = ref('');
const start_time = ref('');
const end_time = ref('');
const location = ref('');

const generateQueryParams = () => {
    const params = { name: name.value, username: username.value, start_time: start_time.value, end_time: end_time.value, location: location.value };
    return Object.entries(params)
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
};

const submitForm = async () => {
    const queryParams = generateQueryParams();
    const response = await fetch(`/api/alter/?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
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
        <h1>（请假/加班）表查询</h1>
        <p>返回第一条符合所有查询条件的数据。</p>
        <form @submit.prevent="submitForm">
            <div>
                <label>姓名：</label>
                <input v-model="name" type="text" />
            </div>
            <div>
                <label>学号：</label>
                <input v-model="username" type="text" />
            </div>
            <div>
                <label>开始时间：</label>
                <input v-model="start_time" type="text" />
            </div>
            <div>
                <label>结束时间：</label>
                <input v-model="end_time" type="text" />
            </div>
            <div>
                <label>地点：</label>
                <input v-model="location" type="text" />
            </div>
            <button type="submit">查询</button>
        </form>
    </div>
</template>

<style scoped>
.employee {
    width: 300px;
    margin: 0 auto;
}
</style>
