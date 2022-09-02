import { Circle } from 'canvas2d-wrapper'

import { PREY_RADIUS } from '../constants';

export default class Prey {
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
			radius: PREY_RADIUS,
			fill: '#ffc107'
		});
	}
}