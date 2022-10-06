export default function calcAngle(a, b) {
	const angle = Math.atan(Math.abs(a.x - b.x) / Math.abs(a.y - b.y));

	if((a.x - b.x) < 0) {
		return Math.PI + angle;
	}

	return angle;
}