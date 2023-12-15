<script setup lang="ts">
import { ref } from 'vue';

const uid = ref('');
const name = ref('');
const reviewer = ref('');
const time = ref('');
const location = ref('');
const state = ref('');

const submitForm = async () => {
  const response = await fetch('/api/leave', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: uid.value,
      name: name.value,
      reviewer: reviewer.value,
      time: time.value,
      location: location.value,
      state: state.value,
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
    <h1>请假表更新处</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>请假人员姓名：</label>
        <input v-model="name" type="text" />
      </div>
      <div>
        <label>审核人员姓名：</label>
        <input v-model="reviewer" type="text" />
      </div>
      <div>
        <label>时间：</label>
        <input v-model="time" type="text" />
      </div>
      <div>
        <label>地点：</label>
        <input v-model="location" type="text" />
      </div>
      <button type="submit">更新请假安排</button>
    </form>
  </div>
</template>

<style scoped>
.employee {
  width: 300px;
  margin: 0 auto;
}
</style>