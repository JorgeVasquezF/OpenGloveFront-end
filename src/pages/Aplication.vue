<template>
	<div>
    <div class="q-pa-lg">
      <div class="row">
        <!-- Si es el creador de la aplicacion y su aplicacion fue rechazada !-->
        <template v-if="aplication.published == false && usercheck.role == 1 && aplication.verified == 1">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-white bg-red q-mb-md">
            Tu aplicación fue rechazada.
          </q-banner>
        </div>
        </template>
        <!-- Si es el creador y la aplicacion tiene una nueva version !-->
        <template v-else-if="aplication.published == false && usercheck.role == 1 && aplication.verified == 2">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-white bg-red q-mb-md">
            Actualizaste tu aplicación por lo que sera revisada nuevamente por la comunidad.
          </q-banner>
        </div>
        </template>
        <!-- Si es el creador y la aplicacion todavia no es verificada !-->
        <template v-else-if="aplication.published == false && usercheck.role == 1">
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-white bg-red q-mb-md">
            Tu aplicación está siendo verificada.
          </q-banner>
        </div>
        </template>
        <!-- Si es un revisador y la aplicacion fue rechazada !-->
        <template v-else-if="aplication.published == false && usercheck.role == 2 && aplication.verified == 1">
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2"> 
          <div class="q-gutter-sm q-pa-md">
            <q-banner rounded  inline-actions class="text-white bg-red">
              Esta aplicación fue rechazada por la comunidad.
            </q-banner>
          </div> 
        </div>
        </template>
        <!-- Si es un revisador y aprobo una aplicacion recien creada o que tuvo una actualizacion !-->
        <template v-else-if="aplication.published == false && usercheck.role == 2 && usercheck.approved == true || usercheck.disapproved == true">
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2"> 
          <div class="q-gutter-sm q-pa-md">
            <q-banner v-if="aplication.verified == 0 || 2" rounded  inline-actions class="text-black bg-yellow">
              Gracias por revisar la aplicación. Falta que más usuarios la revisen.
            </q-banner>
          </div> 
        </div>
        </template>
        <!-- Si es un revisador y ve una aplicacion recien creada !-->
        <template v-else-if="aplication.published == false && usercheck.role == 2"> 
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2"> 
          <div class="q-gutter-sm q-pa-md">
            <q-banner v-show="showForm == false" v-if="aplication.verified == 0" rounded  inline-actions class="text-black bg-yellow">
              Por favor revisa la aplicación, luego escribe observaciones y califica.
            </q-banner>
            <q-banner v-show="showForm == true" v-if="aplication.verified == 0 || 2" rounded  inline-actions class="text-black bg-yellow">
              Gracias por revisar la aplicación. Falta que más usuarios la revisen.
            </q-banner>
            <!-- Si es un revisador y ve una aplicacion con una actualizacion !-->
            <q-banner  v-show="showForm == false" v-if="aplication.verified == 2" rounded  inline-actions class="text-black bg-yellow">
              Se ha detectado una nueva versión, puedes revisarla por favor.
            </q-banner>
            <q-input v-show="showForm == false"
              v-model="comment"
              filled
              type="textarea"
              dark
            />
            <q-btn v-show="showForm == false" color="primary" label="Aprobar" @click="checkApp()"/>
            <q-btn v-show="showForm == false" color="red" label="Rechazar"  @click="disapproveApp()"/>
          </div> 
        </div>
        </template>
        <!-- Si es un usuario sin login y la app esta rechazada !-->
        <template  v-else-if="aplication.published == false && aplication.verified == 1">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-white bg-red q-mb-md">
            Esta aplicación fue rechazada por la comunidad.
          </q-banner>
        </div>
        </template>
        <!-- Si es un usuario sin login y la app tiene una nueva version sin verificar !-->
        <template v-else-if="aplication.published == false && aplication.verified == 2 && usercheck.role == 3">
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-black bg-red q-mb-md">
            Esta aplicación tiene una nueva versión, debe ser nuevamente revisada. Bajo tu responsabilidad puedes descargarla.
          </q-banner>
        </div>
        </template>
        <!-- Si es un usuario sin login y ve una aplicacion sin revision !-->
        <template v-else-if="aplication.published == false && usercheck.role == 3">
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-white bg-red q-mb-md">
            Esta aplicación no ha sido verificada, está en proceso de revisión. Bajo tu responsabilidad puedes descargarla.
          </q-banner>
        </div>
        </template>
        <!-- Si es cualquier usuario y la app es verificada !-->
        <template v-else-if="aplication.published == true">
        <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 offset-xl-3 offset-lg-2">
          <q-banner rounded  inline-actions class="text-black bg-primary q-mb-md">
            Aplicación verificada por la comunidad !
          </q-banner>
        </div>
        </template>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
          <q-img v-if="aplication.image_url !== ''"
              v-bind:src="aplication.image_url"
              style="width: 100%"
            >
              <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
               {{aplication.name}}
              </div>
            </q-img>
          <q-img v-else
              src="../assets/header-glove.jpg"
              style="width: 100%"
            >
              <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
               {{aplication.name}}
              </div>
          </q-img>
        </div>
        <div class="q-pa-lg">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 q-gutter-x-xs">
            <h6 class="q-pa-xs q-mt-xs q-mb-md">{{aplication.name}}</h6> 
            <h6 class="q-pa-xs q-mt-xs q-mb-md">Autor: {{autor}}</h6>
            <h6 class="q-pa-xs q-mt-xs q-mb-md">{{aplication.os}}</h6>
            <q-rating class="q-mb-md"
              v-model="averageRating"
              size="2em"
              color="primary"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              readonly
            />
            <q-space/>
            
            <q-btn type="a" v-if="aplication.verified == 0 || aplication.verified == 2" v-bind:href="lastRelease" label="Descargar" color="primary" />
           <!-- <q-badge align="middle">{{releases[0].tag_name}}</q-badge>-->
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="q-pa-xs col-xs-12 text-white col-lg-8 col-xl-8 offset-lg-2 offset-xl-2">
        <q-list dark padding bordered class="rounded-borders " style="max-width: 1500px">
          <q-expansion-item
            icon="format_italic"
            label="Descripción"
            class="itemLabel"
          >
            <q-card class="bg-twitch">
              <q-card-section>
                <h6 class="text-white text-body1">
                  {{aplication.description}}
                </h6>
                <div v-if="aplication.video_url != ''" class="embed-container">
                    <iframe width="560" height="315" v-bind:src="aplication.video_url" allowfullscreen ></iframe>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            icon="description"
            label="Documentación"
            class="itemLabel"
          >
            <q-card class="bg-twitch">
              <q-card-section>
                <h6 class="text-white text-body1">{{aplication.documentation}}</h6>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item v-if="aplication.verified == 0 || aplication.verified == 2"
            icon="cloud_download"
            label="Releases"
            header-class="text-orange"
            class="itemLabel"
          >
            <q-card class="bg-twitch">
              <q-card-section>
                <div class="q-pa-md" style="max-width: 350px">
                  <q-list dense bordered padding class="rounded-borders">
                    <q-item clickable v-ripple v-for="(release, $index) in releases" :key="$index">
                      <q-item-section avatar top>
                        <a v-bind:href="release[16][1]" style="color: #ff9800 "> <q-avatar icon="folder" color="grey" text-color="white" /> </a>                   
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>{{release[8][1]}} {{release[6][1]}}</q-item-label>
                        <q-item-label caption>{{release[13][1]}}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    <div class="row">
      <div class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-4 offset-xl-4 text-center text-orange">
        <h6 class="q-mb-xs">Calificaciones</h6>
      </div>
    </div>
    <div class="row">
      <div v-if="currentUser  && usercheck.role != 1" v-show="showSimulatedReturnData" class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-4 offset-xl-4 text-center text-orange">
        <h6 class="q-mb-xs">Escribe tu review</h6>
      </div>
    </div>
    <div class="row">
      <div v-if="!currentUser" class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-4 offset-xl-4 text-center text-orange">
        <h6 class="q-mb-xs">Inicia sesión para calificar esta aplicación</h6>
      </div>
    </div>
    <q-inner-loading :showing="visible">
      <q-spinner-gears size="100px" color="primary" />
    </q-inner-loading>
    <div v-if="currentUser && usercheck.role != 1" v-show="showSimulatedReturnData" class="row">
      <div  class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-3 offset-xl-3">
        <q-input dark outlined bottom-slots v-model="email" type="email" v-bind:label="currentUser.username" readonly >
          <template v-slot:prepend>
            <q-icon name="perm_identity" />
          </template>
        </q-input>
      </div>
      
      <div   class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-6 offset-xl-3">
        <q-rating
        v-model="rating"
        max="5"
        size="3em"
        color="primary"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
      />
        <q-input
          dark 
          outlined
          v-model="commentRating"
          type="textarea"
        />
        <q-btn @click="createRating" label="Calificar" color="primary" />
      </div>
    </div>
    <div v-for="(rating, $index) in ratings" :key="$index" class="row">
      <div class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-6 offset-xl-3">
        <div class="q-pa-md q-gutter-sm">
          <q-banner v-if="rating.rating > 3" rounded class="bg-green text-black">
          <q-rating class="q-mb-xs q-mt-lg" 
              v-model="rating.rating"
              size="1.5em"
              color="black"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              readonly
              />
              <h6 class="q-pa-xs q-mt-xs q-mb-xs q-mr-xs text-caption" >{{dates[$index]}}</h6>
              <h6 class="q-pa-xs q-mt-xs q-mb-xs q-mr-xs" >{{rating.user.username}}</h6>
              <h6 class="q-pa-xs q-mt-xs q-mb-xs float-left text-body1" >"{{rating.comment}}"</h6> 

          </q-banner>
          <q-banner v-else-if="rating.rating < 3 " rounded class="bg-red text-black">
          <q-rating class="q-mb-xs q-mt-lg" 
              v-model="rating.rating"
              size="1.5em"
              color="black"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              readonly
              />
              <h6 class="q-pa-xs q-mt-xs q-mb-xs q-mr-xs text-caption" >{{dates[$index]}}</h6>
              <h6 class="q-pa-xs q-mt-xs q-mb-xs q-mr-xs" >{{rating.user.username}}</h6>
              <h6 class="q-pa-xs q-mt-xs q-mb-xs float-left text-body1" >"{{rating.comment}}"</h6> 

          </q-banner>
          <q-banner v-else-if="rating.rating == 3 " rounded class="bg-orange text-black">
          <q-rating class="q-mb-xs q-mt-lg" 
              v-model="rating.rating"
              size="1.5em"
              color="black"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              readonly
              /> 
              <h6 class="q-pa-xs q-mt-xs q-mb-xs q-mr-xs text-caption" >{{dates[$index]}}</h6>
              <h6 class="q-pa-xs q-mt-xs q-mb-xs q-mr-xs" >{{rating.user.username}}</h6>
              <h6 class="q-pa-xs q-mt-xs q-mb-xs float-left text-body1" >"{{rating.comment}}"</h6> 
          </q-banner>
        </div>
      </div>
      <div class="q-pa-xs q-gutter-y-xs col-xs-12 col-sm-12 col-xl-6 offset-xl-3">
        <q-separator color="primary" />
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-if="ratings.length"
        v-model="current"
        :max="totalPageRatings"
        :direction-links="true"
        @click="getRatings(current)"
      >
      </q-pagination>
     
    </div>
    <div class="q-pa-lg flex flex-center">
      <template v-if="usercheck.role == 1">
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="red" label="Eliminar App" @click="dialog = true" />
        </div>
    </template>
    <q-dialog v-model="dialog" transition-show="scale" transition-hide="scale"> 
      <q-card class="bg-twitch" style="width: 300px; color: #00d999">
        <q-card-section>
          <div class="text-h6">Confirmar eliminación</div>
          <q-form
            style="text-align: center;"
            @submit="deleteApp"
            class="q-gutter-md"
          >
          <q-input
          dark  
          v-model="nameApp" 
          placeholder="Nombre de la aplicación" 
          hint="App1"
          lazy-rules
          :rules="[ val => val && val.length > 2 || 'Escribe el nombre']"/>
          <q-btn flat color="green" label="Confirmar" type="submit"/>
          <q-btn flat color="red" label="Cancelar" v-close-popup/>
         </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>


<script>


import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',

  data () {
    return {
      tab: 'mails',
      current: 1,
      email: '',
      visible: true,
      showSimulatedReturnData: false,
      page: 1,
      autor: '',
      nameApp: '',
      totalPageRatings: 0,
      text: '',
      approved: false,
      splitterModel: 20,
      aplication: [],
      dates: [],
      dialog: false,
      ratings: [],
      published: false,
      showForm: false,
      rating: 0,
      averageRating: 0,
      commentRating: '',
      comment: '',
      usercheck: [{role: 0}],
      lastRelease: '',
      releases: []
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
    checkCurrentLogin () {
      if (!this.currentUser) {
        return false
      }
      else {
        return true
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.$axios.get("/api/v1/apps/"+to.params.id+"/releases")
      .then(request => { this.releases = request.data 
        //this.autor = this.releases[0].author.login
        this.lastRelease = this.releases[0][16][1]
      })
    .catch(() => { alert('Something went wrong!') })
    this.$axios.get("/api/v1/apps/"+to.params.id+"")
      .then(request => { 
        this.visible = false
        this.showSimulatedReturnData = true
        this.aplication = request.data
        for (let index = 0; index < this.aplication.check.length; index++) {  
          if (this.aplication.check[index].role == 1) {
            this.autor = this.aplication.check[index].user.username
          }
          if(this.currentUser) {
            if (this.aplication.check[index].user_id == this.currentUser.id) {
              this.usercheck = this.aplication.check[index]
            }
          }
          else {
            this.visible = false
            this.usercheck.role = 3
          }
        }
      })
      .catch(error => {
        this.visible = false 
      })
    this.$axios.get("/api/v1/ratings/average/"+to.params.id+"")
      .then(request => { 
        this.averageRating = parseFloat(request.data)
      })
      .catch(() => { alert('error average') })
    this.$axios.get("/api/v1/ratings/app/"+to.params.id+"")
      .then(request => { 
        this.ratings = request.data.rating 
        this.totalPageRatings = request.data.total
        var datestring = ''
        for (let index = 0; index < this.ratings.length; index++) {
          let d = new Date(this.ratings[index].created_at);
          datestring =  d.getDate()  + '-' + (d.getMonth()+1) + '-' + d.getFullYear() 
          this.dates.push(datestring)
        }   
      })
      .catch(error =>{
        console.log(error)
      })
      console.log('Updating slug from', to.params.id)
      next()
      
      
  },
  created () {
    this.$axios.get("/api/v1/apps/"+this.$route.params.id+"/releases")
      .then(request => { this.releases = request.data 
        this.lastRelease = this.releases[0][16][1]
      })
    .catch (error => {
      })
    this.$axios.get("/api/v1/apps/"+this.$route.params.id+"")
      .then(request => { 
        this.visible = false
        this.showSimulatedReturnData = true
        this.aplication = request.data
        for (let index = 0; index < this.aplication.check.length; index++) {  
          if (this.aplication.check[index].role == 1) {
            this.autor = this.aplication.check[index].user.username
          }
          if(this.currentUser) {
            if (this.aplication.check[index].user_id == this.currentUser.id) {
              this.usercheck = this.aplication.check[index]
            }
          }
          else {
            this.visible = false
            this.usercheck.role = 3
          }
        }
      })
      .catch(error => {
        this.visible = false
        this.showNotifAppNotFound("center") 
      })
    this.$axios.get("/api/v1/ratings/average/"+this.$route.params.id+"")
      .then(request => { 
        this.averageRating = parseFloat(request.data)
      })
      .catch(() => { alert('error average') })
    this.$axios.get("/api/v1/ratings/app/"+this.$route.params.id+"")
      .then(request => { 
        this.ratings = request.data.rating 
        this.totalPageRatings = request.data.total
        var datestring = ''
        for (let index = 0; index < this.ratings.length; index++) {
          let d = new Date(this.ratings[index].created_at);
          datestring =  d.getDate()  + '-' + (d.getMonth()+1) + '-' + d.getFullYear() 
          this.dates.push(datestring)
        }
      })
      .catch(error =>{
        console.log(error)
      })
  },
  methods: {
    createRating () {
      var data = { "rating": this.rating, "comment": this.commentRating, "app_id": this.$route.params.id, "user_id": this.currentUser.id}
      var json = JSON.stringify(data);
      this.$axios.post("/api/v1/ratings",json)
      .then(response => {
        this.showNotifRating("center")
      })
      .catch (error => {
        this.showNotifError("center")
      })
    },
    checkApp () {
      this.approved = true
      var data = {"app_id": this.$route.params.id, "user_id": this.currentUser.id, "comment": this.comment, "approved": this.approved}
      var json = JSON.stringify(data);
      this.$axios.post("/api/v1/apps/approve",json)
      .then(response => { 
        this.showNotif("bottom","primary")
        this.showForm = true
        
      })
      .catch(error => {
          console.log(error)
          this.showNotifError("center")
      })
      
    },
    deleteApp () {
      if (this.aplication.name == this.nameApp) {
        this.$axios.delete("/api/v1/apps/"+this.$route.params.id+"")
        .then(request => { 
            this.showNotifAppDelete("bottom")
          })
        .catch(error => {
          this.showNotifError("bottom")
        })
      }
      else {
        this.showNotifNameNotEqual ("bottom")
      }
      
    },
    getRatings (number) {
      this.$axios.get("/api/v1/ratings/app/"+this.$route.params.id+"?page="+number+"")
      .then(request => { this.ratings = request.data.rating 
  
                    
        })
      .catch(() => { alert('error rating') })
    },
    disapproveApp () {
      console.log("TRTRTRTRTRT")
      this.approved = false
      var data = {"app_id": this.$route.params.id, "user_id": this.currentUser.id, "comment": this.comment, "approved": this.approved}
      var json = JSON.stringify(data);
      this.$axios.post("/api/v1/apps/approve",json)
      .then(response => { 
        this.showNotif("center","primary")
        this.showForm = true
      })
      .catch(error => {
        console.log("GGFGFGF")
          console.log(error)
          this.showNotifError("center")
      })
    },
    showNotif (position,color) {
      this.$q.notify({
        message: 'Gracias por tu aporte !',
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
    showNotifRating (position) {
      this.$q.notify({
        message: 'Gracias por calificar !',
        type: 'positive',
        position,
        progress: true,
      })
    },
    showNotifAppNotFound (position) {
      this.$q.notify({
        message: 'Aplicación no encontrada',
        type: 'negative',
        position,
        progress: true,
      })
    },
    showNotifNameNotEqual (position) {
      this.$q.notify({
        message: 'El nombre no coincide',
        type: 'negative',
        position,
        progress: true,
      })
    },
    showNotifAppDelete (position) {
      this.$q.notify({
        message: 'Aplicacion eliminada',
        type: 'positive',
        position,
        progress: true,
      })
    },
  }

}
</script>

<style >
	.center {
	  margin: auto;
	  width: 90%;
	}
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }
  .embed-container iframe {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .q-list--dark, .q-item--dark {
    color: #fff;
    border-color: rgb(0, 217, 153);
  }
  .itemLabel {
    line-height: 1.2em !important;
    max-width: 100%;
    color: rgb(0, 217, 153);
    font-size: x-large;
  }
  
  .bg-twitch {
    background: #0f0e11 !important;
  }
  .q-list--bordered {
    border: 5
    px solid rgb(0, 217, 153);
  }

  
   

</style>