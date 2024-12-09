import { useState } from 'react'

const useImageValidation = () => {
    const [isValidImage, setIsValidImage] = useState(true)

    const validateImageUrl = (url: string) => {
        return new Promise<boolean>((resolve) => {
            const img = new Image()
            img.onload = () => {
                setIsValidImage(true)
                resolve(true)
            }
            img.onerror = () => {
                setIsValidImage(false)
                resolve(false)
            }
            img.src = url
        })
    }

    return { isValidImage, validateImageUrl }
}

export default useImageValidation
