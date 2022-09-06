import { MIN_WEIGHT, MAX_WEIGHT } from './constants'

export default class Neuron {
	#weights = [];

	constructor(inputAmount, weights) {
		if(weights && weights.length > 0) {
			this.#weights = weights;
			return;
		}

		for(let i = 0; i < inputAmount; i++) {
			this.#weights.push(MIN_WEIGHT + Math.random() * (MAX_WEIGHT - MIN_WEIGHT));
		}
	}

	apply(inputs) {
		return inputs.reduce((acc, curr, index) => acc + (curr * this.#weights[index]), 0);
	}

	cloneAndMutate() {
		const weights = this.#weights.map((pos) => pos * (0.99 + 0.02 * Math.random()));

		return new Neuron(weights.length, weights);
	}
}