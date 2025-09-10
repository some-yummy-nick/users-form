<script setup lang='ts'>
const emit = defineEmits(['handleAdd'])
</script>

<template>
  <header class='header'>
    <div class='d-flex align-items-center gap-3'>
      <h1 class='header__title'>Учетные записи</h1>
      <button class='btn btn-primary' @click="emit('handleAdd')">+</button>
    </div>
    <div class='d-flex alert align-items-center gap-2 alert-secondary' role='alert'>
      <div class='header__mark border border-black rounded-circle'>?</div>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>
  </header>
</template>

<style scoped lang='scss'>
.header {
  &__mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    min-width: 25px;
    height: 25px;
  }
}
</style>
