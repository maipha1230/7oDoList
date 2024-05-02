import React from 'react'

type ButtonType = {
    isDisable: boolean;
    onClick: () => void
}

function ButtonAdd({isDisable, onClick}: ButtonType) {
    return (
        <button className='px-2 py-1 bg-white border-2 border-green-500 text-green-500 cursor-pointer hover:bg-green-500 hover:text-white duration-150 disabled:text-gray-500 disabled:border-gray-500 disabled:bg-gray-300 font-bold'
        disabled={isDisable}
        onClick={onClick}
        >Add ToDo</button>

    )
}

export default ButtonAdd