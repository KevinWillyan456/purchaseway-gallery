import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { CardTypes } from '../types'

interface SlideshowProps {
    isOpen: boolean
    cards: CardTypes[]
    currentSlideIndex: number
    slideTransition: string
    onClose: () => void
    onNext: () => void
    onPrev: () => void
}

const Slideshow: React.FC<SlideshowProps> = ({
    isOpen,
    cards,
    currentSlideIndex,
    slideTransition,
    onClose,
    onNext,
    onPrev,
}) => {
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
        config: { duration: 300 },
    })

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                onNext()
            } else if (event.key === 'ArrowLeft') {
                onPrev()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onNext, onPrev])

    if (!isOpen || cards.length === 0) return null

    return (
        <animated.div
            style={modalAnimation}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 dark:bg-opacity-90"
        >
            <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded bg-red-500 p-2 text-white dark:bg-red-700"
            >
                <XIcon size={24} />
            </button>
            <button
                onClick={onPrev}
                className="absolute left-4 z-10 rounded bg-white p-2 text-black dark:bg-gray-700 dark:text-white"
            >
                <ChevronLeftIcon size={24} />
            </button>
            <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 transform rounded bg-black bg-opacity-50 p-2 text-xl font-bold text-white dark:bg-gray-800 dark:bg-opacity-75">
                {currentSlideIndex + 1} / {cards.length}
            </div>
            <img
                src={cards[currentSlideIndex].imgUrl}
                alt="Slideshow"
                className={`max-h-full max-w-full transition-opacity duration-300 ${slideTransition}`}
            />
            <button
                onClick={onNext}
                className="absolute right-4 z-10 rounded bg-white p-2 text-black dark:bg-gray-700 dark:text-white"
            >
                <ChevronRightIcon size={24} />
            </button>
        </animated.div>
    )
}

export default Slideshow
