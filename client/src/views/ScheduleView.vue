<script setup lang="ts">
import { ref } from 'vue';

const uid = ref('');
const name = ref('');
const time = ref('');
const location = ref('');

const submitForm = async () => {
  const response = await fetch('/api/schedule', {
    method: 'GET',
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
    <h1>工作安排查询</h1>
    <form @submit.prevent="submitForm">
      <button type="submit">获取工作安排表</button>
    </form>
  </div>
</template>

<style scoped>
.employee {
  width: 300px;
  margin: 0 auto;
}
</style>