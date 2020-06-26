<template>
	<div>
  	<div class="row">
      <div class="col-xs-12 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
        <div class="q-pa-md">
          <q-carousel
            arrows           
            animated      
            v-model="slide"
            height="700px"
            class="gt-sm"
            infinite
            swipeable
          >
            <q-carousel-slide v-for="(app, $index) in aplications" :key="$index" v-if="$index < 3"
            v-bind:name="$index + 1">
              <a v-bind:href="'#/aplication/'+ app.id">
              <q-img v-if="app.image_url !== ''" 
                :ratio="16/9"
                class="absolute-full" 
                v-bind:src="app.image_url" />
              <q-img v-else
                :ratio="16/9"
                class="absolute-full" 
                src="../assets/header-glove.jpg" />
              <div class="absolute-bottom custom-caption" style="background-color: rgba(0, 0, 0, 0.79);">
                <div class="text-h6">{{ app.name }}</div>          
              </div>
              </a>
              <div v-if="app.published == false">
                <q-badge color="red" style="position: absolute;">
                  No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
                </q-badge>
              </div>
              <div v-else-if="app.published == true">
                <q-badge color="green" style="position: absolute;">
                  Verificada <q-icon name="check" color="white" class="q-ml-xs" />
                </q-badge>
              </div>
            </q-carousel-slide>
          </q-carousel>
          <q-carousel  
            arrows
            animated
            v-model="slide"
            height="150px"
            class="lt-md"
            infinite
            
            swipeable
          >
            <q-carousel-slide v-for="(app, $index) in aplications" :key="$index" v-if="$index < 3"
            v-bind:name="$index +1">
              <a v-bind:href="'#/aplication/'+ app.id">
              <q-img 
                :ratio="16/9"
                class="absolute-full" 
                v-bind:src="app.image_url" />
              <div class="absolute-bottom custom-caption" style="background-color: rgba(0, 0, 0, 0.79);">
                <div class="text-h6">{{ app.name }}</div>
              </div>
              </a>
              <div v-if="app.published == false">
                <q-badge color="red" style="position: absolute;">
                  No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
                </q-badge>
              </div>
              <div v-else-if="app.published == true">
                <q-badge color="green" style="position: absolute;">
                  Verificada <q-icon name="check" color="white" class="q-ml-xs" />
                </q-badge>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg q-ml-xs q-ml-xs q-mr-lg">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-mb-md" v-for="(app, $index) in apps" :key="$index">
        <a v-bind:href="'#/aplication/'+ app.id">
        <q-img v-if="app.image_url !== ''"
          :ratio="16/9"
          v-bind:src="app.image_url"
          style="width: 100%"
          class="zoom"
        >
        
          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs gt-sm" style="background-color: rgba(0, 0, 0, 0.79);">
            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
          </div>
          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs lt-md" style="background-color: rgba(0, 0, 0, 0.79); padding-top: 0px;padding-bottom: 0px;">
            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
          </div>
          <div v-if="app.published == false" style="background-color: rgba(255, 255, 255, 0);">
            <q-badge color="red">
              No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
            </q-badge>
          </div>
          <div v-else-if="app.published == true" style="background-color: rgba(255, 255, 255, 0);">
            <q-badge color="green">
              Verificada <q-icon name="check" color="white" class="q-ml-xs" />
            </q-badge>
          </div>
        </q-img>
        <q-img v-if="app.image_url == ''"
          :ratio="16/9"
          src="../assets/header-glove.jpg"
          style="width: 100%"
          class="zoom"
        >
        
          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs gt-sm" style="background-color: rgba(0, 0, 0, 0.79);">
            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
          </div>
          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs lt-md" style="background-color: rgba(0, 0, 0, 0.79); padding-top: 0px;padding-bottom: 0px;">
            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
          </div>
          <div v-if="app.published == false" style="background-color: rgba(255, 255, 255, 0);">
            <q-badge color="red">
              No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
            </q-badge>
          </div>
          <div v-else-if="app.published == true" style="background-color: rgba(255, 255, 255, 0);">
            <q-badge color="green">
              Verificada <q-icon name="check" color="white" class="q-ml-xs" />
            </q-badge>
          </div>
        </q-img>
        
        
        </a>   
      </div>
      
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more">
        No hay más aplicaciones, realiza tu aporte !
      </span>
    </infinite-loading>
  </div>
</template>

<style>
</style>

<script>

import Carousel from 'layouts/Carousel.vue'
import Card from 'layouts/Card.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'PageIndex',
  components: {
    Carousel,
    Card,
    InfiniteLoading,
  },
  data () {
    return {
      aplications: null,
      model: null,
      slide: 1,
      page: 0,
      apps: []
    }
  },
  created () {
    this.$axios.get("/api/v1/apps")
    .then(request => { this.aplications = request.data
    console.log("dsadsadsa")
    })
    .catch(error =>{
      console.log(error)
    })
  },
  methods: {
    infiniteHandler($state) {
      this.page++
      let url = "/api/v1/apps/?page="+this.page
      this.$axios.get(url)
      .then(request  => {
        let apps = request.data
        if (apps.length) {
          this.apps = this.apps.concat(apps)
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  }
}
</script>


<style>
	.center {
	  margin: auto;
	  width: 80%;
	}
  .custom-caption{
    text-align: center;
    padding: 12px;
    color: white;
    background-color: rgba(0, 0, 0, .3);
  }
  .a{
    color: white;
  }
  .zoom {
  transition: transform .2s;
  }
  .zoom:hover {
    -ms-transform: scale(1.02); /* IE 9 */
    -webkit-transform: scale(1.02); /* Safari 3-8 */
    transform: scale(1.02); 
  }

</style>

