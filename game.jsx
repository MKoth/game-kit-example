import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Loop, Stage, Sprite, TileMap, World } from 'react-game-kit';
import Background from "./background.jsx";
import Character from "./character.jsx";
import Matter from 'matter-js';
import GameStore from './store/game-store.jsx';

export default class Game extends Component {
	constructor(props){
		super(props);
	}
  	render() {
		return (
			<Loop>
				<Stage width={576} height={576} style={{ background: '#3a9bdc' }}>
					<World onUpdate={this.updateHandler} onInit={this.physicsInit} onCollision={this.colissionHandler}
						gravity = {{
							x:0,
							y:0,
							scale:0.001
						}}
					>
						<Character 
							store = {GameStore}
							imgSrc = {"assets/character-blonde.png"}
							key = {0}
							index = {0}
						/>
						<Character 
							store = {GameStore}
							imgSrc = {"assets/character-brunette.png"}
							key = {1}
							index = {1}
						/>
					</World>
				</Stage>
			</Loop>
		);
	}
	physicsInit(engine) {
		
	};
	colissionHandler(engine) {
		//console.log(engine.pairs[0].bodyA);
	};
	updateHandler(engine){
		
	}
}

ReactDOM.render(<Game/>, document.getElementById('game'));