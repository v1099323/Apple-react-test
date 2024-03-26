import React from 'react'

import { footerLinks } from '../constans'

const Footer = () => {
	return (
		<footer className='py-5 sm:px-10 px-5'>
			<div className='screen-max-width'>
				<div className='tracking-wide'>
					<p className='font-semibold text-gray text-xs'>
						More ways to shop:
						<a href='#' className=' hover:underline text-blue'>
							{''} Find an Apple Store {''}
						</a>
						or
						<a href='#' className='hover:underline text-blue'>
							{''} other retailer {''}
						</a>
						near you.
					</p>
					<p className='font-semibold text-gray text-xs pt-1'>
						Or call{' '}
						<a className='hover:underline text-blue' href='tel:0008000401966'>
							000800-040-19-66
						</a>
					</p>
				</div>
				<div className='bg-neutral-700 my-5 h-[1px] w-full'></div>
				<div className='flex md:flex-row flex-col md:items-center justify-between'>
					<p className='font-semibold text-gray text-xs'>
						Copyright @ 2024 Apple Inc. All right reserverd
					</p>
					<div className="flex flex-wrap gap-2 pt-3 md:pt-0">
          {footerLinks.map((link, i) => (
						<p className='flex gap-2 whitespace-nowrap font-semibold text-gray text-xs' key={link}>
							{link}
							{''}
							{i !== footerLinks.length - 1 && (
								<span className=''> | </span>
							)}
						</p>
					))}
          </div>
				</div>
			</div>
		</footer>
	)
}

export default Footer

// 3.45.00
