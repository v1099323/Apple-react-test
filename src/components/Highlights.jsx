import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { rightImg, watchImg } from '../utils'
import { animateWithGsap } from '../utils/animations'

import Slider from './Slider'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
	useGSAP(() => {
		animateWithGsap('#title', {
			y: 0,
			opacity: 1
		})
		animateWithGsap('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
		// gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
	}, [])

	return (
		<section
			className='w-screen overflow-hidden h-full common-padding bg-zinc'
			id='highlights'
		>
			<div className='screen-max-width'>
				<div className='md-12 w-full gap-5 md:flex items-end justify-between'>
					<h1 className='section-heading' id='title'>
						Get the highlights.
					</h1>
					<div className='flex flex-wrap items-end gap-5 overflow-hidden'>
						<p className='link flex items-center'>
							Watch the film
							<img className='ml-2' src={watchImg} alt='watch-image' />
						</p>
						<p className='link flex items-center'>
							Watch the event
							<img className='ml-2' src={rightImg} alt='right-image' />
						</p>
					</div>
				</div>
				<Slider />
			</div>
		</section>
	)
}

export default Highlights
