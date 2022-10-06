import NeuralNetwork from '../NeuralNetwork';

import { CLONE_SCORE_THRESOLD, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT, PREY_RADIUS } from '../constants';

import calcAngle from '../calcAngle';
import squared_distance from '../squared_distance';

export default class Creature {
	id = null;

	x = null;
	y = null;

	radarDistance = null;
	radarAmount = null;

	neuralNetwork = null;

	cloneScore = 0;

	age = 0;

	constructor(id, x, y, radarDistance, radarAmount) {
		this.id = id;

		this.x = x;
		this.y = y;

		this.radarDistance = radarDistance;
		this.radarAmount = radarAmount;

		this.neuralNetwork = new NeuralNetwork(radarAmount * 2, 2);
	}

	radar(entities, name) {
		const angle = 2*Math.PI/(this.radarAmount + 1);

		const maxDistanceSquared = this.radarDistance * this.radarDistance;
		const validEntities = entities
			.filter((entity) => entity.constructor.name === name && squared_distance(this, entity) <= maxDistanceSquared)
			.map((x) => calcAngle(this, x));

		let output = [];
		for(let i = 0; i < this.radarAmount; i++) {
			output.push(
				validEntities.filter((localAngle) => localAngle > angle * i && localAngle <= angle * (i + 1)).length
			);
		}

		return output;
	}

	tick(entities) {
		const [ x, y ] = this.neuralNetwork.apply(this.radar(entities, 'Prey'), this.radar(entities, 'Predator')); 

		this.x += x;
		this.y += y;

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

		this.tickSpecific();
		this.age++;
	}

	getPosition() {
		return { x: this.x, y: this.y };
	}

	canBeCloned() {
		return this.cloneScore >= CLONE_SCORE_THRESOLD;
	}

	clone() {
		throw new Error("clone hasn't been implemented !");
	}
}