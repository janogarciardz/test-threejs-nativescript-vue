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
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
			model3d: undefined,
			manager: undefined,
			controls: undefined
		}
	},
	mounted() {
		SelectedPageService.getInstance().updateSelectedPage("Search");
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
						this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth /window.innerHeight, 1, 1000 );
						this.camera.position.z = 48;
						
						this.scene = new THREE.Scene();
						
						this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );					
						this.material = new THREE.MeshNormalMaterial();							
						this.mesh = new THREE.Mesh( this.geometry, this.material );
						//this.scene.add( this.mesh );
						

						const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
						ambientLight.castShadow = true;
						this.scene.add( ambientLight );

						const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
						pointLight.position.set(0, 32, 64);
						this.camera.add( pointLight );

						const objLoader = new OBJLoader();
				    objLoader.load('~/assets/models3d/room2.obj', (obj) => {
				    //objLoader.load('https://raw.githubusercontent.com/supromikali/react-three-obj-loader/master/public/eleph.obj', (obj) => {
				     // this.model3d = obj;
							//this.scene.add( obj );
				       console.log('Modelo 3d',obj);

				    //  obj.scene.rotation.y = Math.PI / 8;
				     // obj.scene.position.y = 3;
				    //  obj.scene.scale.set(10, 10, 10);
				   	 // this.scene.add(obj.scene);
				    });

						const animate = () => {
			      if (this.model3d) {
								this.model3d.scene.rotation.x += 0.01;
								this.model3d.scene.rotation.y += 0.01;
								this.model3d.scene.rotation.z += 0.01;
				      }
				      requestAnimationFrame(animate);
				    };
						
						/*this.loader = new OBJLoader( this.manager );
						this.loader.load( '~assets/models3d/room2.obj', function ( obj ) {
							this.object = obj;
						}, onProgress, onError );
						*/
						this.controls = new OrbitControls(this.camera, this.canvas);
						this.renderer = new THREE.WebGLRenderer( { context } );
						this.renderer.setSize( window.innerWidth, window.innerHeight );
						
					},
					animate()
					{
						requestAnimationFrame(this.animate);
						//this.mesh.rotation.x += 0.01;
					//	this.mesh.rotation.y += 0.02;
						this.renderer.render(this.scene, this.camera);
						this.controls.update();
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
