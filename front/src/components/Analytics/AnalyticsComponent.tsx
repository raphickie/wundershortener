import { Box, Button, chakra, Spinner, Input, StatHelpText } from "@chakra-ui/react";
import axios from "axios";
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { SERVER_ENDPOINTS } from "../../config"
import { useMatch } from "react-router-dom";
import groupByDay from "../../utils/dateGrouping";

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
    useEffect(() => {
        async function getData() {
            const result = await axios.get(`${SERVER_ENDPOINTS}/api/analytics/${urlId}`)
                .then((response) => response.data)
            setState(o => ({ ...o, data: result }))
            console.log(result)
        }
        getData()
    }, [])
    if (state?.data) {
        const q = groupByDay(state.data.map(x => x.createdAt))
        console.log(JSON.stringify(q))
    }


    return !state.data ? <Spinner width={20} height={20} /> :
        < div >
        </div >
}
export default UrlShortenerForm;