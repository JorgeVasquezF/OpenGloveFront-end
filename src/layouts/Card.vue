<template>
  
    <q-card class="my-card bg-secondary">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>
      <q-card-actions vertical align="center">
        <q-btn flat>Descargar</q-btn>
      </q-card-actions>
    </q-card>

 
</template>

<script>
export default {
  data () {
    return {
      lorem: 'Lorem'
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 250px
  color #00d999
</style>
