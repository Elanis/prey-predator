import { LIFETIME } from './constants';

export default function dieIfOld(elements) {
	return elements.filter((elt) => !(elt.age > LIFETIME && Math.random() > 0.5));
}