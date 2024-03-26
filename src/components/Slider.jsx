import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react'

import { hightlightsSlides } from '../constans'

const Slider = () => {
	return (
		<div className='sm:pt-20 pt-10'>
			<div>
				<Swiper
					pagination={{
						el: '.swiper-pagination',
						clickable: 'true',
						type: 'bullets'
					}}
					modules={[Pagination]}
					spaceBetween={80}
					slidesPerView={1}
					className='slider'
					// onSlideChange ={e}
				>
					<div className='swiper-wrapper'>
						{hightlightsSlides.map((list, i) => (
							<SwiperSlide
								data-index={i}
								key={list.id}
								id='slide'
								className='w-full h-full'
							>
								<div className='relative pointer-events-auto cursor-pointer'>
									<div className='w-full h-full min-h-[250px] aspect-[920/496] rounded-3xl overflow-hidden bg-black'>
										<video id='video' preload='auto' muted playsInline={true}>
											<source src={list.video} type='video/mp4' />
										</video>
									</div>
									<div className='absolute pl-[5%] py-[5%] top-0 bottom-0 right-0 left-0 z-10'>
										{list.textLists.map(text => (
											<p key={text} className='md:text-2xl text-xl font-medium'>
												{text}
											</p>
										))}
									</div>
								</div>
							</SwiperSlide>
						))}
					</div>
					<div className='mx-auto flex-center pt-5'>
						<div className='bg-gray-300 rounded-3xl swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal'></div>
					</div>
				</Swiper>
			</div>
		</div>
	)
}

export default Slider
