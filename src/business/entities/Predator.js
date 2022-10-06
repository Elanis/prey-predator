import { Circle } from 'canvas2d-wrapper'

import { PREDATOR_RADIUS } from '../constants';

import Creature from './Creature';

export default class Predator extends Creature {
	toCanvas() {
		return new Circle({
			id: this.id,
			x: this.x,
			y: this.y,
			radius: PREDATOR_RADIUS,
			fill: '#673ab7'
		});
	}

	tickSpecific() {
		// Do nothing
	}

	clone(id) {
		const newPredator = new Predator(id, this.x, this.y, this.radarDistance, this.radarAmount);
		newPredator.neuralNetwork = this.neuralNetwork.cloneAndMutate();

		this.cloneScore = 0;

		return newPredator;
	}
}