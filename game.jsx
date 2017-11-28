import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Loop, Stage, Sprite, TileMap } from 'react-game-kit';

class Game extends Component {
	constructor(){
		super();
		this.getWrapperStyles = this.getWrapperStyles.bind(this);
		
	}
  	render() {
		return (
			<Loop>
				<Stage>
				</Stage>
			</Loop>
		);
	}
}

ReactDOM.render(<Game/>, document.getElementById('game'));