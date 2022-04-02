import { Box, Button, chakra, Input, StatHelpText } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { SERVER_ENDPOINTS } from "../../config"
import { Spinner } from "@chakra-ui/react"
import { useMatch } from "react-router-dom";

interface analyticsState {
    error: string | null,
    data?: shortUrlAnalytics[]
}

interface shortUrlAnalytics {
    createdAt: Date
}

function UrlShortenerForm() {

    const [state, setState] = useState<analyticsState>({ error: null });

    const match = useMatch("/analytics/:id")
    const urlId = match?.params.id
    console.log(urlId)
    useEffect(() => {
        async function getData() {
            const result = await axios.get(`${SERVER_ENDPOINTS}/api/analytics/${urlId}`)
                .then((response) => response.data)
            setState(o => ({ ...o, response: result }))
            console.log(result)
        }
        getData()
    }, [])

    return !state.data ? <Spinner width={20} height={20} /> :
        < div > {JSON.stringify(state.data)}</div >
}
export default UrlShortenerForm;