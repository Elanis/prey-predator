import Prey from './entities/Prey';
import Predator from './entities/Predator';

export default function makeBirths(elements) {
	for(const element of elements) {
		if(element.canBeCloned()) {
			elements.push(element.clone(elements.length));
		}
	}
}