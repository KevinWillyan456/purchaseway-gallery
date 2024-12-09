import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import useImageValidation from '../hooks/useImageValidation'

interface EditImageModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (url: string) => void
    initialUrl: string
}

const EditImageModal: React.FC<EditImageModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialUrl,
}) => {
    const [urlToEdit, setUrlToEdit] = useState<string>(initialUrl)
    const { isValidImage, validateImageUrl } = useImageValidation()

    useEffect(() => {
        setUrlToEdit(initialUrl)
    }, [initialUrl])

    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        config: { duration: 200 },
    })

    const handleSave = () => {
        onSave(urlToEdit)
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
                <h2 className="text-xl font-bold mb-4">Editar URL da Imagem</h2>
                <input
                    type="text"
                    value={urlToEdit}
                    onChange={(e) => {
                        setUrlToEdit(e.target.value)
                        validateImageUrl(e.target.value)
                    }}
                    className="border p-2 w-full mb-4"
                    placeholder="Digite a nova URL da imagem"
                />
                {urlToEdit && isValidImage && (
                    <div className="mb-4">
                        <img
                            src={urlToEdit}
                            alt="Preview"
                            className="w-full h-48 object-cover mb-2"
                        />
                        <p className="text-green-500">
                            Imagem válida, pronta para salvar
                        </p>
                    </div>
                )}
                {!isValidImage && urlToEdit && (
                    <p className="text-red-500 mb-4">URL da imagem inválida</p>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                        disabled={!isValidImage || urlToEdit.trim() === ''}
                    >
                        Salvar
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

export default EditImageModal
