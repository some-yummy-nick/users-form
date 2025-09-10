<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useUsersStore } from '@/stores/users.ts'
import Users from "@/components/Users.vue";
const usersStore = useUsersStore()

function handleAdd() {
  usersStore.add()
}
</script>

<template>
  <Header @handle-add='handleAdd' />
  <Users/>
</template>
