<script setup lang="ts">
import { ref } from 'vue';

const uid = ref('');
const name = ref('');
const time = ref('');
const location = ref('');

const submitForm = async () => {
  const response = await fetch('/api/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: uid.value,
      name: name.value,
      time: time.value,
      location: location.value,
    }),
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
    <h1>工作安排添加处理</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>用户编号：</label>
        <input v-model="uid" type="text" />
      </div>
      <div>
        <label>姓名：</label>
        <input v-model="name" type="text" />
      </div>
      <div>
        <label>时间：</label>
        <input v-model="time" type="text" />
      </div>
      <div>
        <label>地点：</label>
        <input v-model="location" type="text" />
      </div>
      <button type="submit">工作添加</button>
    </form>
  </div>
</template>

<style scoped>
.employee {
  width: 300px;
  margin: 0 auto;
}
</style>