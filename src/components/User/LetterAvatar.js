import React from 'react'
import './Avatar.css'

function generateInitial(name) {
    const names = name.split(" ")
    const firstLetter = names[0].charAt(0)
    const lastLetter = names[names.length - 1].charAt(0)
    return `${firstLetter}${lastLetter}`.toUpperCase()
}

const LetterAvatar = (props) => {
    const { name } = props
    const letters = generateInitial(name)

    return <div className="Avatar">{letters}</div>
}

export default LetterAvatar