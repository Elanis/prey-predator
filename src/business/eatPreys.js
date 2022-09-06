import Prey from './entities/Prey';
import Predator from './entities/Predator';

import { EATING_DISTANCE, EATING_SCORE } from './constants';

import squared_distance from './squared_distance';

export default function eatPreys(elements) {
	for(const element of elements) {
		if(element instanceof Predator) {
			const prevAmount = elements.length;
			elements = elements.filter((other) => squared_distance(other, element) > EATING_DISTANCE || !(other instanceof Prey));
		
			element.cloneScore += (prevAmount - elements.length) * EATING_SCORE;
		}
	}

	return elements;
}