<script setup lang="ts">
import {ref} from 'vue'
import type {User} from '@/types/User.ts'
import {useUsersStore} from '@/stores/users.ts'

const usersStore = useUsersStore()

const props = defineProps<{
  item: User
}>()
const login = ref(props.item.login)

function handleSubmit() {
  props.item.login = login.value;
  usersStore.saveData()
}
</script>

<template>
  <form class='mb-3 member' @submit.prevent="handleSubmit">
    <div class='row g-3'>
      <div class='col-md-3'>
        <label for="login" class="form-label text-secondary">Логин</label>
        <input
            id='login'
            type='text'
            class='form-control member__input'
            maxlength='100'
            v-model='login'
        />
      </div>
    </div>
  </form>

</template>

<style scoped>

</style>