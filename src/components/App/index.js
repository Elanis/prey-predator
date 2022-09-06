import { useEffect, useState } from 'react';

import { Canvas2D, Circle, Polygon, Rect } from 'canvas2d-wrapper'

import './index.css';

import Prey from '../../business/entities/Prey';
import Predator from '../../business/entities/Predator';

import generateFreePosition from '../../business/generateFreePosition';

import { PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT } from '../../business/constants';

const elements = [];

export default function App() {
	const [shouldUpdate, setShouldUpdate] = useState(null);

	useEffect(() => {
		for(let i = 0; i < 50; i++) {
			elements.push((new Prey(i, ...generateFreePosition(elements))));
			elements.push((new Predator(i + 50, ...generateFreePosition(elements))));
		}
		setShouldUpdate(Date.now());
	}, []);

	function tick() {
		let diff = shouldUpdate - Date.now();

		setTimeout(() => {
			for(const element of elements) {
				element.tick();
			}

			setShouldUpdate(Date.now());
		}, 100 - diff);
	}

	useEffect(() => {
		window.requestAnimationFrame(tick);
	}, [shouldUpdate]);

	return (
		<>
			<Canvas2D 
				elements={elements.map((elt) => elt.toCanvas())}
				width={PLAYGROUND_WIDTH}
				height={PLAYGROUND_HEIGHT}
				minZoom={0.25}
				maxZoom={4}
				tileSize={1}
				lockXAxis={true}
				lockYAxis={true}
				onClick={(e) => {
					console.log('Click event:', e);
				}}
			/>

			<div className="utils">
				<input
					type="button"
					className="ui-button"
					onClick="toggleTime"
					value="Start/Pause"
				/>
				
				<div className="utils-counters">
					Prey: {elements.filter((elt) => elt instanceof Prey).length}<br/>
					Predator: {elements.filter((elt) => elt instanceof Predator).length}<br/>
				</div>
			</div>
		</>
	);
}