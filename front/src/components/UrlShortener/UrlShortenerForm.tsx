import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { SERVER_ENDPOINTS } from "../../config"
import { isValidHttpUrl } from "../../utils/Validation";
import { AllCenteredContainer, CenteredContainer, ErrorContainer, FormStyled } from "./UrlShortenerForm.styled";
import { UrlShortenerFormState } from "./urlShortenerForm.types";

function UrlShortenerForm() {

    const [state, setState] = useState({} as UrlShortenerFormState);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const destination = state.destination;

        if (!isValidHttpUrl(state.destination)) {
            setState(o => ({ ...o, errorMessage: "Input should be a valid URL" }))
            return;
        }
        try {
            const result = await axios.post(`${SERVER_ENDPOINTS}/api/url`, { destination })
            setState(o => ({ ...o, response: result.data, errorMessage: null }))
        }
        catch (error: any) {
            // todo: more user-friendly?
            setState(o => ({ ...o, errorMessage: "Something wrong happened while sending request. Please, try again later" }))
        }
    }

    const analyticsAddress = `/analytics/${state.response && state.response._id}`
    const shortenedLinkAddress = `${SERVER_ENDPOINTS}/${state?.response?.shortId}`
    return <>
        {state.response ?
            <AllCenteredContainer>
                <h3>Saved successfully</h3>
                <div>Shortened link</div>
                <a href={shortenedLinkAddress}>{shortenedLinkAddress}</a>
                <Link to={analyticsAddress} >Analytics page</Link>
            </AllCenteredContainer> :
            <Box>
                <FormStyled onSubmit={handleSubmit}>
                    <Input onChange={(e: any) => { setState(o => ({ ...o, destination: e.target.value })) }} />
                    {state.errorMessage &&
                        <ErrorContainer>
                            {state.errorMessage}
                        </ErrorContainer>}
                    <CenteredContainer>
                        <Button type="submit">Create</Button>
                    </CenteredContainer>
                </FormStyled>
            </Box>
        }
    </>
}
export default UrlShortenerForm;