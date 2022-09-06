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
}