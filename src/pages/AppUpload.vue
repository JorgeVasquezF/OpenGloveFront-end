<template>
  <div class="q-pa-md">
    <template v-if="checkCurrentLogin">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
      >
        <q-step
          :name="1"
          title="Paso 1"
          icon="settings"
          :done="step > 1"
          style="min-height: 200px;"
        >
        	<div class="q-pa-md q-gutter-y-md" style="max-width: 800px">
  	        <q-input outlined bottom-slots v-model="name" type="email" label="Nombre de la aplicación" hint="Rainbow Six Siege"
  	        :rules="[ val => val.length >= 3 || 'Debe contener al menos 3 caracteres']" >
              <template v-slot:prepend>
                <q-icon name="title" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="name = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input outlined bottom-slots v-model="image" type="email" label="Link de imagen (Opcional)" hint="https://www.example.com/image.jpg" >
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="image = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input outlined bottom-slots v-model="video" type="email" label="Link de video (Opcional)"  hint="https://www.youtube.com/embed/id" >
              <template v-slot:prepend>
                <q-icon name="video_library" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="video = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
    	    <q-stepper-navigation>
      	    <template v-if="name.length >= 3">
      	    	<q-btn @click="$refs.stepper.next()" color="primary" :label="'Continuar'" />
      	    </template>
      	    <template v-if="name.length < 3">
      	    	<q-btn  color="primary" :label="'Continuar'" >
      	    		<q-tooltip content-class="bg-red" :offset="[10, 10]">
      		          Completa el nombre
      		        </q-tooltip>
      	    	</q-btn>
      	    </template>
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Paso 2"
          icon="create_new_folder"
          :done="step > 2"
          style="min-height: 200px;"
        >
          <div class="q-pa-md" style="max-width: 250px">
            <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
              Categorías
            </div>
            <q-select
              transition-show="scale"
              transition-hide="scale"
              label="Acción, Deportes, etc."
              filled
              v-model="selectTags"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="filterOptions"
              @filter="filterFn"
              style="max-width: 800px"
            />
          </div>
  			  <div class="q-pa-md text-subtitle1 text-weight-bold" style="color: #000000; max-width: 250px" >
            <div class="text-center" >
                Plataforma
            </div>
    			    <q-option-group
    			      :options="options"
    			      label="Notifications"
    			      type="radio"
    			      v-model="group"
    			    />
    			</div>
    		  <div class="q-pa-md " style="max-width: 1600px">
            <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
                Descripción
            </div>
    		    <q-input
    		      v-model="textareaDescription"
    		      filled
    		      type="textarea"
    		    />
    		  </div>
          <q-stepper-navigation>
           	<template  v-if="selectTags.length > 0 && group != null && textareaDescription != ''" >
           		<q-btn @click="$refs.stepper.next()" color="primary" :label="'Continuar'" >
  	    	    </q-btn>
            </template>
    		    <template  v-if="selectTags.length <= 0 || group == null || textareaDescription == ''" >
    		    	<q-btn  color="primary" :label="'Continuar'" >
      	    		<q-tooltip content-class="bg-red" :offset="[10, 10]">
      		        Completa todos los campos
      		      </q-tooltip>
    	         </q-btn>
    		    </template>
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Paso 3"
          icon="assignment"
          :done="step > 3"
          style="min-height: 200px;"
        >
          <div class="q-pa-md" style="max-width: 800px">
  	        <q-input outlined bottom-slots v-model="nameGit" type="url" label="Nombre de usuario en GitHub" hint="JorgeVasquez"
  	        >
              <template v-slot:prepend>
                <q-icon name="link" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="nombre = ''" class="cursor-pointer" />
              </template>
            </q-input>
            </div>
            <div class="q-pa-md" style="max-width: 800px">
            <q-input outlined bottom-slots v-model="repoGit" type="url" label="Nombre del repositorio" hint="APICSharp"
  	        >
              <template v-slot:prepend>
                <q-icon name="link" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="nombre = ''" class="cursor-pointer" />
              </template>
            </q-input>
            </div>
            <div class="q-pa-md" style="max-width: 1600px; color: #000000" >
                <div class="text-center text-weight-bold" >
                Documentación
            </div>
              <q-input
                v-model="textareaDocumentation"
                filled
                type="textarea"
              />
            </div>
  	      
           <q-stepper-navigation>
            <template  v-if="nameGit !== '' && textareaDocumentation !== '' && repoGit !== ''" >
              <q-btn @click="$refs.stepper.next()" color="primary" :label="'Continuar'" ></q-btn>
            
            </template>
            <template  v-if="nameGit == '' || textareaDocumentation == '' || repoGit == ''" >
              <q-btn  color="primary" :label="'Continuar'" >
                <q-tooltip content-class="bg-red" :offset="[10, 10]">
                    Completa todos los campos
                  </q-tooltip>
              </q-btn>
            </template>
            
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="4"
          title="Paso 4"
          icon="add_comment"
          style="min-height: 200px;"
        >
          <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
            Nombre de la aplicación
            <q-space/>
            <div class="text-subtitle1 text-weight-light text-center" style="color: #000000" >
              {{name}}
            </div>
          </div>
          <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
            Imagen de portada
            <q-space/>
            <div v-if="image != ''" class="text-subtitle1 text-weight-light text-center" style="color: #000000" >
              <q-img
                v-bind:src="image"
                style="width: 300px"
              >
              </q-img>
            </div>
            <div v-if="image == ''" class="text-subtitle1 text-weight-light text-center" style="color: #000000" >
              No adjuntaste imagen de portada
            </div>
          </div>
          <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
            Categorias
            <q-space/>
            <div class="text-subtitle1 text-weight-light text-center" style="color: #000000" >
              <div v-for="(tag, $index) in selectTags" :key="$index">
                {{tag}}
              </div>
            </div>
          </div>
          <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
            Repositorio
            <q-space/>
            <div class="text-subtitle1 text-weight-light text-center" style="color: #000000" >
              {{nameGit}} {{repoGit}}
            </div>
          </div>
          <div class="text-subtitle1 text-weight-bold text-center" style="color: #000000" >
            Plataforma
            <q-space/>
            <div class="text-subtitle1 text-weight-light text-center" style="color: #000000" >
              {{group}}
            </div>
          </div>
           <q-stepper-navigation>
            <q-btn @click="upload()"  color="primary" label="Subir App"/>
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
        <template v-slot:message>
          <q-banner v-if="step === 1" class="bg-purple-8 text-white q-px-lg">
            Escribe el nombre de tu aplicación, el video y la imagen son opcionales.
          </q-banner>
          <q-banner v-else-if="step === 2" class="bg-orange-8 text-white q-px-lg">
            Elige todas las categorías a las que pertenece tu aplicación, selecciona la plataforma compatible y escribe una descripción para tu app !
          </q-banner>
          <q-banner v-else-if="step === 3" class="bg-green-8 text-white q-px-lg">
            Debes escribir tu usuario de GitHub, el nombre del repositorio y la documentacion puede ser un link directo para descarga de un documento.
          </q-banner>
          <q-banner v-else class="bg-blue-8 text-white q-px-lg">
            Ahora se muestra un resumen de tu aplicación, si esta todo correcto finaliza el proceso. Tu aplicacion pasara por una revisión para luego ser publicada.
          </q-banner>
        </template>
      </q-stepper>
    </template>
    <template v-if="!checkCurrentLogin">
      <h4 class="text-center">Inicia sesión para subir tu aplicación!</h4>
    </template>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      step: 1,
      image: '',
      video: '',
      name: '',
      textareaDescription: '',
      textareaDocumentation: '',
      nameGit: '',
      repoGit: '',
      selectTags: [],
      tagsAux: null,
      tags: [],
      filterOptions: this.tags,
      group: null,
      idApp: 0,
      options: [
        { label: 'Windows', value: 'Windows', color: 'blue' },
        { label: 'Android', value: 'Android', color: 'green' }
      ]
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
    checkCurrentLogin () {
      if (!this.currentUser) {
        return false
      }
      else {
        console.log("logueado")
        console.log(this.currentUser)
        return true
      }
    }
  },
  created () {
    this.$axios.get("/api/v1/tags/")
        .then(response => { this.tagsAux = response.data
          var i;
          for (i = 0; i < this.tagsAux.length; i++) { 
            this.tags[i]= this.tagsAux[i].name
          }
        }).catch(() => { alert('Something went wrong!') })
  },
  methods: {
    upload () {
      if (this.currentUser) {
        console.log(this.currentUser)
        var github = this.nameGit.concat("/",this.repoGit)
        var data = {"name": this.name, "description": this.textareaDescription, "git_url": github, "video_url":this.video, "documentation":this.textareaDocumentation, "image_url": this.image, "os": this.group,"user_id": this.currentUser.id}
        var json = JSON.stringify(data);
        this.$axios.post("/api/v1/apps",json)
        .then(response => {
          console.log(response)
          if (response.data.status == 102) {
            this.showNotifErrorRepository("center")
          }
          else {
            this.showNotif("center","primary")
            this.idApp = response.data.id
            for (var i = 0; i < this.selectTags.length; i++) {
              var data = {"name": this.selectTags[i]}
              var json = JSON.stringify(data);
              this.$axios.post("/api/v1/apps/"+this.idApp+"/tags",json)
              .then(response => {       
              })
              .catch(error => {
                console.log("error")
              }) 
            } 
          }
                  
        })
        .catch(error => {
          this.showNotifError("center")
        })
        
      }
      else {
        console.log("noo")
      }
      
    },
    createValue (val, done) {
      if (val.length > 2) {
        if (!this.tags.includes(val)) {
          done()
        }
      }
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.tags
        }
        else {
          const needle = val.toLowerCase()
          this.filterOptions = this.tags.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    showNotif (position,color) {
      this.$q.notify({
        message: 'Gracias por tu aporte, en breve sera publicado !',
        position,
        color
      })
    },
    showNotifError (position) {
      this.$q.notify({
        message: 'No se pudo completar la solicitud.',
        position,
        type: 'negative',
        progress: true,
      })
    },
    showNotifErrorRepository (position) {
      this.$q.notify({
        message: 'Repositorio o release no encontrado.',
        position,
        type: 'negative',
        progress: true,
      })
    },
    
  }
}
</script>
<style type="text/css">
.q-chip {
   
   background: #00d999;
   
}

</style>