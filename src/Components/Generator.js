import React, {useState, useEffect} from 'react'
import Image from '../Assets/icon-dice.svg'
import Pattern  from '../Assets/pattern-divider-mobile.svg'

function Generator() {
    
    const [advice, setAdvice] = useState("")
    const [adviceNumber, setAdviceNumber] = useState(Math.floor(Math.random() * 401) + 1)
    

    const fetchAdvice = async () => {
        try {
            const response = await fetch(`https://api.adviceslip.com/advice/${adviceNumber}`)
            const data = await response.json()
            data.slip === undefined ? setAdvice(data.message.text): setAdvice(data.slip.advice)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAdvice()
    }, [adviceNumber, fetchAdvice])

    const handleClick = async () => {
        const randomAdviceId = Math.floor(Math.random() * 401) + 1
        setAdviceNumber(randomAdviceId) 
    }

    return(
        <div className='advice-box'>
            <h1>advice #{adviceNumber}</h1>
            <p className='text'>{advice}</p>
            <img className='pattern' src={Pattern} alt='divider pattern' />
            <button type='button' className='btn' onClick={handleClick}><img className='dice' src={Image} alt='dice icon' /></button>

        </div>
    )
} 

export default Generator