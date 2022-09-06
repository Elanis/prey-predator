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
}