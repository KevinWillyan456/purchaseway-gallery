import React from 'react'

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-blue-500 p-4 text-center text-white dark:bg-gray-800">
            <p className="text-sm">
                &copy; {currentYear} Purchaseway Gallery. Todos os direitos
                reservados.
            </p>
        </footer>
    )
}

export default Footer
