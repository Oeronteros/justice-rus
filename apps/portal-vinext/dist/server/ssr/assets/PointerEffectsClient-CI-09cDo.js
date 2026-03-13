import { memo, useEffect } from "react";
//#region ../../components/effects/PointerEffectsClient.tsx
function PointerEffectsClient() {
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;
		const root = document.documentElement;
		const maxTilt = 6;
		let frame = 0;
		let lastX = window.innerWidth * .5;
		let lastY = window.innerHeight * .35;
		const apply = () => {
			const x = (lastX / window.innerWidth - .5) * 2;
			const y = (lastY / window.innerHeight - .5) * -2;
			root.style.setProperty("--tilt-x", `${(y * maxTilt).toFixed(2)}deg`);
			root.style.setProperty("--tilt-y", `${(x * maxTilt).toFixed(2)}deg`);
			root.style.setProperty("--cursor-x", `${(lastX / window.innerWidth * 100).toFixed(2)}%`);
			root.style.setProperty("--cursor-y", `${(lastY / window.innerHeight * 100).toFixed(2)}%`);
			frame = 0;
		};
		const handleMove = (event) => {
			lastX = event.clientX;
			lastY = event.clientY;
			if (frame) return;
			frame = window.requestAnimationFrame(apply);
		};
		const reset = () => {
			root.style.setProperty("--tilt-x", "0deg");
			root.style.setProperty("--tilt-y", "0deg");
			root.style.setProperty("--cursor-x", "50%");
			root.style.setProperty("--cursor-y", "35%");
		};
		reset();
		window.addEventListener("pointermove", handleMove, { passive: true });
		window.addEventListener("mouseleave", reset);
		window.addEventListener("blur", reset);
		return () => {
			window.removeEventListener("pointermove", handleMove);
			window.removeEventListener("mouseleave", reset);
			window.removeEventListener("blur", reset);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);
	return null;
}
var PointerEffectsClient_default = memo(PointerEffectsClient);
//#endregion
export { PointerEffectsClient_default as default };
