<template>
  <q-dialog>
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-toggle v-model="dense" label="Dense QInput" />
        <q-input outlined bottom-slots v-model="text" label="Label" counter :dense="dense">
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            Field hint
          </template>
        </q-input>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      ph: '',

      dense: false
    }
  }
}
</script>