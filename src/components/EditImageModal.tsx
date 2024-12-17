import React, { useEffect, useState } from 'react'
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
            className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="scale-95 transform rounded bg-white p-6 shadow-lg transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-bold">Editar URL da Imagem</h2>
                <input
                    type="text"
                    value={urlToEdit}
                    onChange={(e) => {
                        setUrlToEdit(e.target.value)
                        validateImageUrl(e.target.value)
                    }}
                    className="mb-4 w-full border p-2"
                    placeholder="Digite a nova URL da imagem"
                />
                {urlToEdit && isValidImage && (
                    <div className="mb-4">
                        <img
                            src={urlToEdit}
                            alt="Preview"
                            className="mb-2 h-48 w-full object-cover"
                        />
                        <p className="text-green-500">
                            Imagem válida, pronta para salvar
                        </p>
                    </div>
                )}
                {!isValidImage && urlToEdit && (
                    <p className="mb-4 text-red-500">URL da imagem inválida</p>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="mr-2 rounded bg-blue-500 p-2 text-white"
                        disabled={!isValidImage || urlToEdit.trim() === ''}
                    >
                        Salvar
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded bg-red-500 p-2 text-white"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </animated.div>
    )
}

export default EditImageModal
