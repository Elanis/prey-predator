import Neuron from './Neuron';

export default class NeuralNetwork {
	#layers = [];

	constructor(inputAmount, outputAmount, layers) {
		if(layers) {
			this.#layers = layers;
			return;
		}

		if(inputAmount < outputAmount) {
			for(let i = inputAmount; i <= outputAmount; i++) {
				this.#layers.push(this.newLayer(i, i - 1));
			}
		} else if(inputAmount > outputAmount) {
			for(let i = inputAmount; i >= outputAmount; i--) {
				this.#layers.push(this.newLayer(i, i + 1));
			}
		}else { // Get at least 2 layers
			this.#layers.push(this.newLayer(outputAmount, outputAmount));
		}
	}

	newLayer(currLayerAmount, nextLayerAmount) {
		const layer = [];
		for(let i = 0; i < currLayerAmount; i++) {
			layer.push(new Neuron(nextLayerAmount));
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