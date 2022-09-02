import { MIN_DISTANCE, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT } from './constants';

export default function generateFreePosition(elements) {
	let position = [
		-0.5 * PLAYGROUND_WIDTH + Math.round(Math.random() * PLAYGROUND_WIDTH),
		-0.5 * PLAYGROUND_HEIGHT + Math.round(Math.random() * PLAYGROUND_HEIGHT)
	];

	if(elements.find((elt) => {
		const eltPos = elt.getPosition();
		const xDiff = (eltPos.x - position[0]);
		const yDiff = (eltPos.y - position[1]);

		return (xDiff * xDiff + yDiff * yDiff) < (MIN_DISTANCE * MIN_DISTANCE);
	})) {
		return generateFreePosition(elements);
	}

	return position;
}