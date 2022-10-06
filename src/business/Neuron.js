import { MIN_WEIGHT, MAX_WEIGHT } from './constants'

export default class Neuron {
	#weights = [];
	#bias = 0;

	constructor(inputAmount, weights, bias) {
		if(weights && weights.length > 0) {
			this.#weights = weights;
			this.#bias = bias;
			return;
		}

		this.#bias = -0.5 + Math.random();

		for(let i = 0; i < inputAmount; i++) {
			this.#weights.push(MIN_WEIGHT + Math.random() * (MAX_WEIGHT - MIN_WEIGHT));
		}
	}

	apply(inputs) {
		return inputs.reduce((acc, curr, index) => acc + this.#bias + (curr * this.#weights[index]), 0);
	}

	cloneAndMutate() {
		const weights = this.#weights.map((pos) => pos * (0.99 + 0.02 * Math.random()));
		const bias = this.#bias * (0.99 + 0.02 * Math.random());

		return new Neuron(weights.length, weights, bias);
	}
}