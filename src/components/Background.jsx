import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../styles/Background.css";

const Background = () => {
	const particlesInit = useCallback(async (engine) => {
		console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container) => {
		await console.log(container);
	}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			className="background"
			options={{
				interactivity: {
					events: {
						onHover: {
							enable: true,
							mode: "grab",
							parallax: {
								enable: true,
								force: 20,
								smooth: 10,
							},
						},
						onClick: {
							enable: true,
							mode: "push",
						},
						resize: true,
					},
					modes: {
						grab: {
							distance: 200,
							links: {
								enable: true,
								blink: true,
								consent: true,
								opacity: 2,
							},
						},
						push: {
							quantity: 4,
						},
					},
				},
				fpsLimit: 120,
				particles: {
					color: {
						value: "#ffffff",
					},
					links: {
						color: "#ffffff",
						distance: 100,
						enable: true,
						opacity: 0.4,
						width: 0.5,
					},

					collisions: {
						enable: true,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: true,
						speed: 2,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 800,
						},
						value: 100,
					},
					opacity: {
						value: 0.2,
					},
					shape: {
						type: "circle",
					},
					size: {
						value: { min: 1, max: 3 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
};

export default Background;
