import NeuralNetwork from '../NeuralNetwork';

import { PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT, PREY_RADIUS } from '../constants';

export default class Creature {
	id = null;

	x = null;
	y = null;

	neuralNetwork = null;

	constructor(id, x, y) {
		this.id = id;

		this.x = x;
		this.y = y;

		this.neuralNetwork = new NeuralNetwork(2, 2);
	}

	tick() {
		const [ x, y ] = this.neuralNetwork.apply([this.x, this.y]); 

		this.x = x;
		this.y = y;

		const maxX = PLAYGROUND_WIDTH / 2;
		if(this.x > maxX) {
			this.x = -maxX;
		} else if(this.x < -maxX) {
			this.x = maxX;
		}

		const maxY = PLAYGROUND_HEIGHT / 2;
		if(this.y > maxY) {
			this.y = -maxY;
		} else if(this.y < -maxY) {
			this.y = maxY;
		}
	}

	getPosition() {
		return { x: this.x, y: this.y };
	}
}