import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from 'react'
import { SERVER_ENDPOINTS } from "../../config"
import { FormStyled } from "./UrlShortenerForm.styled";
import { UrlShortenerFormState } from "./urlShortenerForm.types";

function UrlShortenerForm() {

    const [state, setState] = useState({} as UrlShortenerFormState);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const destination = state.destination;
        const result = await axios.post(`${SERVER_ENDPOINTS}/api/url`, { destination })
            .then((response) => response.data)
        setState(o => ({ ...o, response: result }))
        console.log(result)
    }

    return <><Box pos="relative">
        <FormStyled onSubmit={handleSubmit}>
            <Input onChange={(e: any) => { setState(o => ({ ...o, destination: e.target.value })) }} />
            <Button type="submit">Create</Button>
        </FormStyled>
    </Box>
        {(state.response) &&
            <>
                <h3>Saved successfully</h3>
                <div>Shortened url</div>
                <a href={SERVER_ENDPOINTS + '/' + state.response.shortId}>{SERVER_ENDPOINTS + '/' + state.response.shortId}</a>
                <div>Analytics page</div>
                {/* // link to???????????????????\ */}
                <a href={SERVER_ENDPOINTS + '/' + state.response._id}></a>
            </>
        }
    </>
}
export default UrlShortenerForm;