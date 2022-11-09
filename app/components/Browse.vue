<template>
    <Page class="page">
      <ActionBar class="action-bar">
        <NavigationButton visibility="hidden"/>
        <GridLayout columns="50, *">
          <Label class="action-bar-title" text="Model 3D" colSpan="2"/>

          <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap"/>
        </GridLayout>
      </ActionBar>

        <GridLayout class="page__content">
            <Label class="page__content-icon far" text.decode="&#xf1ea;"/>
            <Label class="page__content-placeholder" :text="message"/>
						<Canvas class="canvas" id="canvas" width="100%" height="100%" v-on:ready="onCanvasReady( $event )"/>

        </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "../shared/selected-page-service";
  //import { } from '@nativescript/canvas-three';

  import * as THREE from 'three';

  export default {
		data(){

      return {
        canvas: undefined,
        gl: undefined,
        camera: undefined,
        scene: undefined,
        renderer: undefined,
        geometry: undefined,
        object: undefined,
        material: undefined,
				texture: undefined,
        mesh: undefined,
				width: 300,
				src : 'https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample8/Firefox.mp4?raw=true' ,
				height: 300,
				loader: undefined,
				manager: undefined
	    }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Browse");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onDrawerButtonTap() {
        utils.showDrawer();
      },
			onCanvasReady( event )
            {
                this.canvas = event.object;								
                this.init();
                this.animate();
            },
            init()
            {
							const context = this.canvas.getContext( 'webgl2' );
							this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth /window.innerHeight, 0.01, 10 );
							this.camera.position.z = 1;
							
							this.scene = new THREE.Scene();
							
							this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );					
							this.material = new THREE.MeshNormalMaterial();							
							this.mesh = new THREE.Mesh( this.geometry, this.material );

							
							
							this.scene.add( this.mesh );

							const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
							this.scene.add( ambientLight );

							const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
							this.camera.add( pointLight );

							function loadModel() {
								this.object.traverse( function ( child ) {
									if ( child.isMesh ) child.material.map = this.texture;
								} );

								this.object.position.y = - 95;
								this.scene.add( this.object );

							}

							this.manager = new THREE.LoadingManager( loadModel );
							// texture
							//const textureLoader = new THREE.TextureLoader( manager );
							//const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg' );
							// model

							function onProgress( xhr ) {
								if ( xhr.lengthComputable ) {
									const percentComplete = xhr.loaded / xhr.total * 100;
									console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
								}
							}
							function onError() {}
							
							this.loader = new THREE.ObjectLoader( this.manager );
							/*this.loader.load( '~assets/models3d/room.obj', function ( obj ) {
								this.object = obj;
							}, onProgress, onError );*/

							this.renderer = new THREE.WebGLRenderer( { context } );
							this.renderer.setSize( window.innerWidth, window.innerHeight );
							
            },
            animate()
            {
							requestAnimationFrame(this.animate);
							this.mesh.rotation.x += 0.01;
							this.mesh.rotation.y += 0.02;
							this.renderer.render(this.scene, this.camera);
            }
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables
	.canvas{
		background: #fff;
	}
    // Custom styles
</style>
