import React from 'react'
import { animated, useSpring } from 'react-spring'
import { XIcon } from 'lucide-react'

interface ImageModalProps {
    imageUrl: string
    onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    const modalAnimation = useSpring({
        opacity: 1,
        transform: 'scale(1)',
        config: { duration: 200 },
    })

    if (!imageUrl) return null

    return (
        <animated.div
            style={modalAnimation}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative bg-white p-6 rounded shadow-lg transform transition-all duration-200 scale-95 max-w-4xl max-h-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageUrl}
                    alt="Imagem Ampliada"
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                >
                    <XIcon size={24} />
                </button>
            </div>
        </animated.div>
    )
}

export default ImageModal
