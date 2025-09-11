<script setup lang="ts">
import {ref} from 'vue'

import UserItem from '@/components/UserItem.vue'
import {useUsersStore} from '@/stores/users.ts'
import type {User} from "@/data/User.ts";

const usersStore = useUsersStore()

usersStore.loadData()
const items = ref<User[]>(usersStore.users)
</script>

<template>
  <div class='users'>
    <div class='users__items'>
      <UserItem v-for='(item, index) in items' :item='item' :key='index'/>
    </div>
  </div>
</template>

<style scoped>

</style>