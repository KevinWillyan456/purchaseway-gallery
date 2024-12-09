import React from 'react'
import {
    Maximize2Icon,
    Trash2Icon,
    EditIcon,
    CopyIcon,
    ExternalLinkIcon,
} from 'lucide-react'
import { animated } from 'react-spring'
import { CardTypes } from '../types'

interface CardProps {
    card: CardTypes
    style: React.CSSProperties
    onOpenImage: (imgUrl: string) => void
    onConfirmRemove: (id: string) => void
    onCopyToClipboard: (url: string) => void
    onOpenInNewTab: (url: string) => void
    onOpenEditModal: (id: string, url: string) => void
}

const Card: React.FC<CardProps> = ({
    card,
    style,
    onOpenImage,
    onConfirmRemove,
    onCopyToClipboard,
    onOpenInNewTab,
    onOpenEditModal,
}) => {
    return (
        <animated.div
            key={card.id}
            style={style}
            className="relative bg-white shadow-md rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => onOpenImage(card.imgUrl)}
        >
            <div className="relative w-full h-48">
                <img
                    src={card.imgUrl}
                    alt="Imagem"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenImage(card.imgUrl)
                    }}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    <Maximize2Icon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onConfirmRemove(card.id)
                    }}
                    className="bg-red-500 text-white p-2 rounded"
                >
                    <Trash2Icon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onCopyToClipboard(card.imgUrl)
                    }}
                    className="bg-yellow-500 text-white p-2 rounded"
                >
                    <CopyIcon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenInNewTab(card.imgUrl)
                    }}
                    className="bg-purple-500 text-white p-2 rounded"
                >
                    <ExternalLinkIcon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenEditModal(card.id, card.imgUrl)
                    }}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    <EditIcon size={16} />
                </button>
            </div>
        </animated.div>
    )
}

export default Card
