import { css } from "@emotion/react"
import styled from "@emotion/styled"

const Justified = styled.div`
display: flex;
justify-content: center;
`

export const FormStyled = styled.form`
display: flex;
flex-direction: column;

input {
    min-width:400px;
}
`

export const CenteredContainer = styled(Justified)`
button {
    margin: 3px;
    width:100px;
    }
`

export const AllCenteredContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
div,h3,a {
    display: flex;
    justify-content: center;
    }
`

export const ErrorContainer = styled(Justified)`
color: red;
font-weight: bold;
`