<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const username = ref('');
const location = ref('');

const submitForm = async () => {
    const response = await fetch(`/api/sign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            username: username.value,
            location: location.value
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
        <h1>签到处</h1>
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
                <label>地点：</label>
                <input v-model="location" type="text" />
            </div>
            <button type="submit">签到</button>
        </form>
    </div>
</template>

<style scoped>
.employee {
    width: 300px;
    margin: 0 auto;
}
</style>
