<template>
	<div>
		<div class="row q-col-gutter-lg q-pa-md">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-4 offset-xl-4">
	      <label class="typo__label">Busqueda por categoría</label>
	      <multiselect placeholder="Elige una categoría" :value="value" :options="autocompleteItems"  :multiple="true" :searchable="true" @remove="remove" :hide-selected="true" :max-height="150" :max="1" :disabled="isDisabled" :block-keys="['Tab', 'Enter']" @input="onChange" @close="onTouch" @select="onSelect"></multiselect>
	    </div>
    </div>
    <div class="row q-col-gutter-lg q-pa-md" v-if="busqueda == 1">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(app, $index) in appsfilter" :key="$index">
				<a v-bind:href="'#/aplication/'+ app.id">
	        <q-img v-if="app.image_url !== ''"
          	  :ratio="16/9"
	          v-bind:src="app.image_url"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs" style="background-color: rgba(0, 0, 0, 0.79);">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
	          </div>
			  <div v-if="app.published == false">
	            <q-badge color="red">
	              No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	          <div v-else-if="app.published == true">
	            <q-badge color="green">
	              Verificada <q-icon name="check" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	        </q-img>
			<q-img v-else
          	  :ratio="16/9"
	          src="../assets/header-glove.jpg"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs" style="background-color: rgba(0, 0, 0, 0.79);">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
	          </div>
			  <div v-if="app.published == false">
	            <q-badge color="red">
	              No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	          <div v-else-if="app.published == true">
	            <q-badge color="green">
	              Verificada <q-icon name="check" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	        </q-img>
	        </a>
	        <div class="q-mt-sm" >
	        	<q-chip outline size="md" color="primary" text-color="white">
		        	{{value[0]}}
		      	</q-chip>
	        </div> 
			</div>
		</div>
		<div class="row q-col-gutter-lg q-pa-md" v-if="busqueda == 0">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(app, $index) in aplications" :key="$index">
				<a v-bind:href="'#/aplication/'+ app.id">
	        <q-img v-if="app.image_url !== ''"
	          :ratio="16/9"
	          v-bind:src="app.image_url"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs" style="background-color: rgba(0, 0, 0, 0.79);">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
	          </div>
	          <div v-if="app.published == false">
	            <q-badge color="red">
	              No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	          <div v-else-if="app.published == true">
	            <q-badge color="green">
	              Verificada <q-icon name="check" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	        </q-img>
			<q-img v-else
	          :ratio="16/9"
	          src="../assets/header-glove.jpg"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs" style="background-color: rgba(0, 0, 0, 0.79);">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #ffffff; text-decoration: none;"> {{app.name}} </a>
	          </div>
	          <div v-if="app.published == false">
	            <q-badge color="red">
	              No verificada <q-icon name="warning" color="white" class="q-ml-xs" />
	            </q-badge>
	          </div>
	          <div v-else-if="app.published == true">
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
		<!--<h5>Acción</h5>
		<div class="row q-col-gutter-lg">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(app, $index) in accion" :key="$index">
				<a v-bind:href="'#/aplication/'+ app.id">
	        <q-img
	          v-bind:src="app.image_url"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #00d999; text-decoration: none;"> {{app.name}} </a>
	          </div>
	        </q-img>
	        </a>
			</div>
		</div>
		<h5>Deportes</h5>
		<div class="row q-col-gutter-lg">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(app, $index) in sports" :key="$index">
				<a v-bind:href="'#/aplication/'+ app.id">
	        <q-img
	          v-bind:src="app.image_url"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #00d999; text-decoration: none;"> {{app.name}} </a>
	          </div>
	        </q-img>
	        </a>
			</div>
		</div>
		<h5>Estrategia</h5>
		<div class="row q-col-gutter-lg">
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(app, $index) in strategy" :key="$index">
				<a v-bind:href="'#/aplication/'+ app.id">
	        <q-img
	          v-bind:src="app.image_url"
	          style="width: 100%"
	          class="zoom"
	        >
	          <div class="absolute-bottom text-subtitle1 text-center text-white q-pa-xs">
	            <a v-bind:href="'#/aplication/'+ app.id" style="color: #00d999; text-decoration: none;"> {{app.name}} </a>
	          </div>
	        </q-img>
	        </a>
			</div>
		</div> !-->
	</div>

	
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import InfiniteLoading from 'vue-infinite-loading'
	export default {
		components: {
      Multiselect,
      InfiniteLoading,
    },
		data () {
			return {
				accion: null,
				sports: null,
        strategy: null,
        page: 0,
				autocompleteItems: [],
				value: [],
				isDisabled: false,
				appsfilter: [],
				aplications: [],
				appsByTag: [],
				busqueda: 0,

			}
			
		},
		created() {
			this.$axios.post("/api/v1/tags/apps")
        .then(response => { this.autocompleteItems = response.data.map(a => {
          return a.name
        });
        }).catch(() => { alert('Error carga de apps') 

      	})
      /*this.$axios.get("/api/v1/apps")
        .then(request => { this.aplications = request.data
          })*/
    },
    
		methods: {
      infiniteHandler($state) {
        this.page++
        let url = "/api/v1/apps/?page="+this.page
        this.$axios.get(url)
        .then(request  => {
          let apps = request.data
          console.log(request.data)
          if (apps.length) {
            this.aplications = this.aplications.concat(apps)
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      },
			onSelect (option) {
      this.busqueda = 1
      var data = {"name": option}
      var json = JSON.stringify(data);
      this.$axios.post("/api/v1/apps/filter",json)
          .then(response => { 
          this.appsfilter = response.data 
          })
          .catch(error => {
            console.log("error")
          })
    	},
    	remove () {
      	this.busqueda = 0
      },
      onChange (value) {
	      this.value = value
	      if (value.indexOf('Reset me!') !== -1) this.value = []
	    },
		  onTouch () {
	      this.isTouched = true
	    },
		}
}
</script>
