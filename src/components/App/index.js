import { Canvas2D, Circle, Polygon, Rect } from 'canvas2d-wrapper'

import './index.css';

export default function App() {
	const elements = [];
	for(let i = 0; i < 998; i++) {
		let object = null;

		object = new Circle({
			id: i,
			x: 50 - Math.round(Math.random() * 100),
			y: 50 - Math.round(Math.random() * 100),
			radius: 0.5,
			fill: (Math.random() > 0.5) ? 'black' : undefined,
			stroke: (Math.random() > 0.5) ? 'black' : undefined
		});

		if(!object.fill && !object.stroke) {
			object.fill = 'green';
		}

		elements.push(object);
	}

	return (
		<>
			<Canvas2D 
				elements={elements}
				width={1200}
				height={700}
				minZoom={0.25}
				maxZoom={4}
				tileSize={32}
				onClick={(e) => {
					console.log('Click event:', e);
				}}
			/>

			<input
				type="button"
				className="ui-button"
				onClick="toggleTime"
				value="Start/Pause"
			/>
		</>
	);
}