<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const username = ref('');
const phone = ref('');
const email = ref('');
const role = ref('');

const submitForm = async () => {
    const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            username: username.value,
            phone: phone.value,
            email: email.value,
            role: role.value
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
        <h1>添加用户</h1>
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
            <button type="submit">添加</button>
        </form>
    </div>
</template>

<style scoped>
.employee {
    width: 300px;
    margin: 0 auto;
}
</style>
