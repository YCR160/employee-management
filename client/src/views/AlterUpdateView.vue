<script setup lang="ts">
import { ref } from 'vue';

const id = ref('');
const name = ref('');
const username = ref('');
const start_time = ref('');
const end_time = ref('');
const location = ref('');
const valid_status = ref('');
const record_type = ref('');

const submitForm = async () => {
    const response = await fetch(`/api/alter/${id.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            username: username.value,
            start_time: start_time.value,
            end_time: end_time.value,
            location: location.value,
            valid_status: valid_status.value,
            record_type: record_type.value
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
        <h1>更新请假/加班安排</h1>
        <p>请在下方输入要更新的安排的编号以及新的信息</p>
        <form @submit.prevent="submitForm">
            <div>
                <label>编号：</label>
                <input v-model="id" type="text" />
            </div>
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
            <div>
                <label>有效状态：</label>
                <input v-model="valid_status" type="text" />
            </div>
            <div>
                <label>记录类型：</label>
                <input v-model="record_type" type="text" />
            </div>
            <button type="submit">更新安排</button>
        </form>
    </div>
</template>

<style scoped>
.employee {
    width: 300px;
    margin: 0 auto;
}
</style>
