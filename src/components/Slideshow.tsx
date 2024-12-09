import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
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
    if (!isOpen || cards.length === 0) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded z-10"
            >
                <XIcon size={24} />
            </button>
            <button
                onClick={onPrev}
                className="absolute left-4 bg-white text-black p-2 rounded z-10"
            >
                <ChevronLeftIcon size={24} />
            </button>
            <div className="text-white absolute top-4 left-1/2 transform -translate-x-1/2 text-xl font-bold bg-black bg-opacity-50 p-2 rounded z-10">
                {currentSlideIndex + 1} / {cards.length}
            </div>
            <img
                src={cards[currentSlideIndex].imgUrl}
                alt="Slideshow"
                className={`max-w-full max-h-full transition-opacity duration-300 ${slideTransition}`}
            />
            <button
                onClick={onNext}
                className="absolute right-4 bg-white text-black p-2 rounded z-10"
            >
                <ChevronRightIcon size={24} />
            </button>
        </div>
    )
}

export default Slideshow
