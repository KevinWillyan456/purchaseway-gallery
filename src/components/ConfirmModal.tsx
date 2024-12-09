import React from 'react'
import { animated, useSpring } from 'react-spring'

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    message?: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message = 'Tem certeza de que deseja excluir esta imagem?',
}) => {
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        config: { duration: 200 },
    })

    if (!isOpen) return null

    return (
        <animated.div
            style={modalAnimation}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded shadow-lg transform transition-all duration-200 scale-95"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white p-2 rounded mr-2"
                    >
                        Excluir
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white p-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </animated.div>
    )
}

export default ConfirmModal
