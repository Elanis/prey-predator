import { useEffect, useState } from 'react';

import { Canvas2D } from 'canvas2d-wrapper'

import './index.css';

import Prey from '../../business/entities/Prey';
import Predator from '../../business/entities/Predator';

import dieIfOld from '../../business/dieIfOld';
import eatPreys from '../../business/eatPreys';
import generateFreePosition from '../../business/generateFreePosition';
import makeBirths from '../../business/makeBirths';

import { PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT } from '../../business/constants';

let elements = [];
let timeoutId = -1;

export default function App() {
	const [shouldUpdate, setShouldUpdate] = useState(null);

	useEffect(() => {
		for(let i = 0; i < 10; i++) {
			elements.push((new Prey(i, ...generateFreePosition(elements), 12, 4)));
			elements.push((new Predator(i + 50, ...generateFreePosition(elements), 9, 6)));
		}
		setShouldUpdate(Date.now());
	}, []);

	function tick() {
		let diff = shouldUpdate - Date.now();

		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			if(!shouldUpdate) {
				return;
			}

			for(const element of elements) {
				element.tick(elements);
			}

			elements = eatPreys(elements);
			makeBirths(elements);
			elements = dieIfOld(elements);

			elements = [...elements];

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
					onClick={() => shouldUpdate ? setShouldUpdate(null) : setShouldUpdate(Date.now())}
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