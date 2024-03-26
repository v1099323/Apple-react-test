import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { hightlightsSlides } from '../constans'
import { pauseImg, playImg, replayImg } from '../utils'

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const [loadedData, setLoadedData] = useState([])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
                onComplete: () => {
                    setVideo(prev => ({
                        ...prev,
                        startPlay: true,
                        isPlaying: true
                    }))
                }
            }
        })
    }, [isEnd, videoId])

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo(prev => ({ ...prev, isEnd: true, videoId: i + 1 }))
                break
            case 'video-last':
                setVideo(prev => ({ ...prev, isLastVideo: true }))
                break
            case 'video-reset':
                setVideo(prev => ({ ...prev, isLastVideo: false, videoId: 0 }))
                break
            case 'play':
                setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
                break
                case 'pause':
                  setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
                  break
            default:
                return video
        }
    }

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetadata = (i, duration) => {
        setLoadedData(prev => [...prev, duration])
    }

    useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current

        if (span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)

                    if (progress !== currentProgress) {
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '100vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            background: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })

                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if (videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay, isPlaying])

    return (
        <div>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div
                        key={list.id}
                        id='slider'
                        className='sm:pr-20 pr-10 sm:pt-20 pt-10'
                    >
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video
                                    id='video'
                                    preload='auto'
                                    autoPlay
                                    muted
                                    playsInline={true}
                                    ref={el => (videoRef.current[i] = el)}
                                    onEnded={() => { i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last', i) }}
                                    onPlay={() => setVideo(prev => ({ ...prev, isPlaying: true }))}
                                    onLoadedMetadata={e => handleLoadedMetadata(i, e.target.duration)}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map(text => (
                                    <p key={text} className='md:text-2xl text-xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                            key={i}
                            ref={el => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className='absolute h-full w-full rounded-full'
                                ref={el => (videoSpanRef.current[i] = el)}
                            ></span>
                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt='control-button'
                        onClick={
                            isLastVideo
                                ? () => handleProcess('video-reset')
                                : !isPlaying
                                ? () => handleProcess('play')
                                : () => handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </div>
    )
}

export default VideoCarousel
