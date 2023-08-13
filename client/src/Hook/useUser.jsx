import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useUser = () => {
   

    // useEffect(() => {
    //     getUserData()
    // },[])

    return {
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        getUserData,
        userData,

    }

}

export default useUser