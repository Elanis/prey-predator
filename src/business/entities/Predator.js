import { Circle } from 'canvas2d-wrapper'

import { PREDATOR_RADIUS } from '../constants';

export default class Predator {
	#id = null;

	#x = null;
	#y = null;

	constructor(id, x, y) {
		this.#id = id;

		this.#x = x;
		this.#y = y;
	}

	getPosition() {
		return { x: this.#x, y: this.#y };
	}

	toCanvas() {
		return new Circle({
			id: this.#id,
			x: this.#x,
			y: this.#y,
			radius: PREDATOR_RADIUS,
			fill: '#673ab7'
		});
	}
}