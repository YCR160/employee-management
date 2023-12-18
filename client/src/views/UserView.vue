<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const username = ref('');
const phone = ref('');
const email = ref('');
const role = ref('');

const generateQueryParams = () => {
    const params = { name: name.value, username: username.value, phone: phone.value, email: email.value, role: role.value };
    return Object.entries(params)
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
};

const submitForm = async () => {
    const queryParams = generateQueryParams();
    const response = await fetch(`/api/users/?${queryParams}`, {
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
        <h1>用户查询</h1>
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
                <label>电话：</label>
                <input v-model="phone" type="text" />
            </div>
            <div>
                <label>邮箱：</label>
                <input v-model="email" type="text" />
            </div>
            <div>
                <label>身份：</label>
                <input v-model="role" type="text" />
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
