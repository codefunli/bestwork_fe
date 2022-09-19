import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
	initial: { x: 50, opacity: 0 },
	enter: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.25,
			ease: [0.6, -0.05, 0.01, 0.99],
		},
	},
};

export default function AnimationPage({ children }: { children: ReactNode }): JSX.Element {
	return (
		<AnimatePresence>
			<motion.div initial="initial" animate="enter" variants={variants}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}