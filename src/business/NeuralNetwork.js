import Neuron from './Neuron';

export default class NeuralNetwork {
	#layers = [];

	constructor(inputAmount, outputAmount, layers) {
		if(layers) {
			this.#layers = layers;
			return;
		}

		for(let i = inputAmount; i <= outputAmount; i++) {
			this.#layers.push(this.newLayer(i));
		}

		if(inputAmount === outputAmount) { // At least 2 layers
			this.#layers.push(this.newLayer(outputAmount));
		}
	}

	newLayer(amount) {
		const layer = [];
		for(let i = 0; i < amount; i++) {
			layer.push(new Neuron(amount));
		}
		return layer;
	}

	apply(input) {
		let tempValue = input;
		for(const layer of this.#layers) {
			let newValue = [];
			for(const neuron of layer) {
				newValue.push(neuron.apply(tempValue));
			}
			tempValue = newValue;
		}

		return tempValue;
	}

	cloneAndMutate() {
		// TODO: add layers
		// TODO: remove layers (if more than 2)
		// TODO: remove nodes (if more than 1)
		// TODO: add nodes

		const newLayers = [];
		for(const layerId in this.#layers) {
			newLayers.push([]);

			for(const neuron of this.#layers[layerId]) {
				newLayers[layerId].push(neuron.cloneAndMutate());
			}
		}

		return new NeuralNetwork(0, 0, newLayers);
	}
}