<script setup lang="ts">
import {ref, watch} from 'vue'
import {type User, UserType, UserTypeNames} from '@/types/User.ts'
import {useUsersStore} from '@/stores/users.ts'

const usersStore = useUsersStore()

const props = defineProps<{
  item: User
}>()
const values = ref<{ [key: string]: any }>({
  type: props.item.type,
  login: props.item.login,
  password: props.item.password,
  labels: parseLabels(),
})
const types = [
  {
    name: UserTypeNames.LOCAL,
    value: UserType.LOCAL
  },
  {
    name: UserTypeNames.LDAP,
    value: UserType.LDAP
  }
]
const showPasswordField = ref(true)
const showPassword = ref(false)
const required = ['password', 'login']
const errors = ref<{ [key: string]: boolean }>({
  password: false,
  login: false,
})

function validation() {
  return required.every((el: string) => {
    errors.value[el] = values.value[el] === '';
    return values.value[el] !== ''
  })
}

function checkValidation() {
  if (validation()) {
    handleSubmit()
  }
}

function parseLabels() {
  if (!props.item.labels) {
    return
  }
  // @ts-ignore
  return props.item.labels.map((item: { text:string }) => item.text).join(';');
}

function handleSubmit() {
  props.item.login = values.value.login;
  props.item.password = values.value.password;
  props.item.labels = values.value.labels;
  if (!Object.values(errors.value).every(el => el)) {
    usersStore.saveData()
  }
}

function handleDelete() {
  // @ts-ignore
  usersStore.remove(props.item)
}

watch(values, (newVal: { [key: string]: any }) => {
  showPasswordField.value = true
  if (newVal.type === UserType.LDAP) {
    showPasswordField.value = false
    newVal.password = null
  }
}, {deep: true})
</script>

<template>
  <form class='mb-3 user' @submit.prevent="handleSubmit">
    <div class='row g-3'>
      <div class='col-md-4'>
        <label for="label" class="form-label text-secondary">Метки</label>
        <input
            id='label'
            type='text'
            class='form-control user__input'
            maxlength='50'
            v-model='values.labels'
            @blur="checkValidation"
        />
      </div>
      <div class='col-md-2'>
        <label for="type" class="form-label text-secondary">Тип записи</label>

        <select id="type" class='form-select user__select' aria-label='type' @change="checkValidation"
                v-model='values.type'>
          <option v-for='item in types' :value='item.value'>{{ item.name }}</option>
        </select>
      </div>
      <div class='col-md-2'>
        <label for="login" class="form-label text-secondary">Логин</label>
        <input
            id='login'
            type='text'
            class='form-control user__input'
            maxlength='100'
            required
            v-model='values.login'
            @blur="checkValidation"
        />
      </div>
      <div class='col-md-2' v-if='showPasswordField'>
        <label for="password" class="form-label text-secondary">Пароль</label>
        <div class='d-flex align-items-center gap-2'>
          <div
              class='form-control d-flex align-items-center'
          >
            <input
                id='password'
                class='form-control-plaintext'
                maxlength='100'
                :type="showPassword ? 'text' : 'password'"
                required
                @blur="checkValidation"
                v-model='values.password'
            />
            <button type='button' class='btn btn-light' @click='showPassword = !showPassword'>
              <img
                  v-if='showPassword'
                  src='@/assets/images/icons/eye.svg'
                  width='16'
                  height='16'
                  alt=''
              />
              <img v-else src='@/assets/images/icons/eye-slash.svg' width='16' height='16' alt=''/>
            </button>
          </div>

        </div>
      </div>
      <div class='col-md-2'>
        <div class="form-label  text-secondary">Удалить</div>
        <button class='btn btn-danger user__delete' type="button" @click="handleDelete">
          <img src='@/assets/images/icons/delete.svg' width='16' height='16' alt=''/>
        </button>
      </div>
    </div>
  </form>

</template>

<style scoped lang="scss">
.user {
  &__delete {
    img {
      filter: invert(1);
    }
  }

  &__input,
  &__select {
    min-height: 52px;
  }

  &__input,
  &__select,
  .form-control-plaintext {
    &:user-invalid,
    &.is-invalid {
      border-color: red;
    }
  }
}
</style>