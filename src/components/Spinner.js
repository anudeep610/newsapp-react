import React from 'react'
import Loading from "./ajax-loader.gif"

const Spinner =()=>{
        return (
            <div className="text-center my-4">
                <img src={Loading} alt="loading" />
            </div>
        )
}

export default Spinner