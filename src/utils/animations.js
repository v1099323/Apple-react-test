import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export const animateWithGsap = (target, animationProps, scrollProps) => {
	gsap.to(target, {
		...animationProps,
		scrollTrigger: {
			trigger: target,
			toggleActions: 'restart reverse restart reverse',
			start: 'top 85%',
			...scrollProps
		}
	})
}

export const animateWithGspapTimeline = (
	timeline,
	rotationRef,
	rotationState,
	firstTaget,
	secondTaget,
	animationProps
) => {
	timeline.to(rotationRef.current.rotation, {
		y: rotationState,
		duration: 1,
		ease: 'power2.inOut'
	})

	timeline.to(
		firstTaget,
		{
			...animationProps,
			ease: 'power2.inOut'
		},
		'<'
	)

	timeline.to(
		secondTaget,
		{
			...animationProps,
			ease: 'power2.inOut'
		},
		'<'
	)
}
