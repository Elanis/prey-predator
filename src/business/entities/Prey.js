import { Circle } from 'canvas2d-wrapper'

import { PREY_RADIUS } from '../constants';

import Creature from './Creature';

export default class Prey extends Creature {
	toCanvas() {
		return new Circle({
			id: this.id,
			x: this.x,
			y: this.y,
			radius: PREY_RADIUS,
			fill: '#ffc107'
		});
	}

	tickSpecific() {
		this.cloneScore++;
	}

	clone(id) {
		const newPrey = new Prey(id, this.x, this.y, this.radarDistance, this.radarAmount);
		newPrey.neuralNetwork = this.neuralNetwork.cloneAndMutate();

		this.cloneScore = 0;

		return newPrey;
	}
}