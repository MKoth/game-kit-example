import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Sprite, Body } from 'react-game-kit';
import Matter from 'matter-js';
import { observer } from 'mobx-react';

@observer
export default class Character extends Component {
	static propTypes = {
		store: PropTypes.object,
		imgSrc: PropTypes.string,
		index: PropTypes.number,
	};
	static contextTypes = {
		engine: PropTypes.object,
		scale: PropTypes.number,
	};
	constructor(props, context) {
		super(props);
		this.getWrapperStyles = this.getWrapperStyles.bind(this);
		this.update = this.update.bind(this);
		this.moveLeft = this.moveLeft.bind(this);
		this.moveRight = this.moveRight.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.changeCharacterState = this.changeCharacterState.bind(this);
		this.state = {
			characterState:11,
			ticksPerFrame: 4,
		}
	}
	getWrapperStyles() {
		var x = this.props.store.characterPosition[this.props.index].x;
		var y = this.props.store.characterPosition[this.props.index].y;
		return {
		  position: 'absolute',
		  transform: 'translate('+x+'px, '+y+'px) translateZ(0)',
		  transformOrigin: 'top left',
		};
	}
	update = () => {
		//this.state.characterState = this.props.store.characterState[this.props.index];
		this.setState({
			characterState:this.props.store.characterState[this.props.index]
		});
		if(this.state.characterState == 8)
			this.moveUp();
		else if(this.state.characterState == 9)
			this.moveLeft();
		else if(this.state.characterState == 10)
			this.moveDown();
		else if(this.state.characterState == 11)
			this.moveRight();
	}
	
	moveRight() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.x<=(700-128))
			Matter.Body.setVelocity(this.body1.body, { x: 1, y: 0 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
		this.changeCharacterState();
	};
	
	moveLeft() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.x>=0)
			Matter.Body.setVelocity(this.body1.body, { x: -1, y: 0 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
		this.changeCharacterState();
	};
	
	moveUp() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.y>=0)
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: -1 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
		this.changeCharacterState();
	};
	
	moveDown() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.y<=430)
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 1 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
		this.changeCharacterState();
	};
	
	changeCharacterState() {
		var timing = 2000;
		if(Date.now() - this.props.store.timeStamp[this.props.index]>=timing){
			var prevState = this.props.store.characterState[this.props.index];
			var newState = this.props.store.characterState[this.props.index];
			while(prevState==newState){
				newState = Math.floor(Math.random()*(11-8+1)+8);
			}
			this.props.store.characterState[this.props.index] = newState;
			this.props.store.timeStamp[this.props.index] = Date.now();
		}
	}
	
	componentDidMount() {
		Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
	}

	componentWillUnmount() {
		Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
	}

	render() {
		return (
			<div id={"character"} style={this.getWrapperStyles()}>
			<Body
				args={[this.props.store.characterPosition[this.props.index].x, 
				this.props.store.characterPosition[this.props.index].y, 128, 128]}
				inertia={Infinity}
				ref={b => {
					this.body1 = b;
				}}
			>
				<Sprite
					repeat={true}
					tileWidth={64}
					tileHeight={64}
					src={this.props.imgSrc}
					scale={2}
					ticksPerFrame={this.state.ticksPerFrame}
					state={this.state.characterState}
					steps={[6,6,6,6,7,7,7,7,8,8,8,8,5,5,5,5,12,12,12,12,5]}
				/>
			</Body>
			</div>
		)
	}
}