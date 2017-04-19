<template>
  <div class="container-fluid">
    <h1>{{ error.statusCode }}</h1>
    <p>{{error.message}}</p>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
