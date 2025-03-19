import { XIcon } from 'lucide-react'
import React from 'react'
import { animated, useSpring } from 'react-spring'

interface ImageModalProps {
    imageUrl: string
    onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    const modalAnimation = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
        config: { duration: 300 },
    })

    if (!imageUrl) return null

    return (
        <animated.div
            style={modalAnimation}
            className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 dark:bg-opacity-90"
            onClick={onClose}
        >
            <div
                className="max-h-4xl relative max-w-4xl rounded bg-white p-6 shadow-lg transition-all duration-300 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageUrl}
                    alt="Imagem Ampliada"
                    className="h-full w-full object-cover"
                />
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 rounded bg-red-500 p-2 text-white dark:bg-red-700"
                >
                    <XIcon size={24} />
                </button>
            </div>
        </animated.div>
    )
}

export default ImageModal
