import { LIFETIME } from './constants';

export default function dieIfOld(elements) {
	return elements.filter((elt) => !(elt.age > (LIFETIME/2 + LIFETIME*Math.random())));
}