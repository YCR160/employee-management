<script setup lang="ts">
import { ref } from 'vue';

const uid = ref('');
const name = ref('');
const reviewer = ref('');
const time = ref('');
const location = ref('');
const state = ref('');

const submitForm = async () => {
    const response = await fetch(`/api/alter`, {
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
        <h1>机动表查询处</h1>
        <form @submit.prevent="submitForm">
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
