import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useImageValidation from '../hooks/useImageValidation'

interface AddImageModalProps {
    isOpen: boolean
    onClose: () => void
    onAddImage: (url: string) => void
    validateImageUrl: (url: string) => void
    isValidImage: boolean
}

const AddImageModal: React.FC<AddImageModalProps> = ({
    isOpen,
    onClose,
    onAddImage,
}) => {
    const [newImageUrl, setNewImageUrl] = useState<string>('')
    const { isValidImage, validateImageUrl } = useImageValidation()

    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        config: { duration: 200 },
    })

    const handleAddImage = () => {
        onAddImage(newImageUrl)
        setNewImageUrl('')
    }

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
                <h2 className="text-xl font-bold mb-4">
                    Adicionar URL da Imagem
                </h2>
                <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => {
                        setNewImageUrl(e.target.value)
                        validateImageUrl(e.target.value)
                    }}
                    className="border p-2 w-full mb-4"
                    placeholder="Digite a URL da imagem"
                />
                {newImageUrl && isValidImage && (
                    <div className="mb-4">
                        <img
                            src={newImageUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover mb-2"
                        />
                        <p className="text-green-500">
                            Imagem válida, pronta para salvar
                        </p>
                    </div>
                )}
                {!isValidImage && newImageUrl && (
                    <p className="text-red-500 mb-4">URL da imagem inválida</p>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={handleAddImage}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                        disabled={!isValidImage || newImageUrl.trim() === ''}
                    >
                        Adicionar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white p-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </animated.div>
    )
}

export default AddImageModal
