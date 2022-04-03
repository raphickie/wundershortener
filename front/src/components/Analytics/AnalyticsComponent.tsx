import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_ENDPOINTS } from "../../config";
import { useMatch } from "react-router-dom";
import { analyticsState } from "./AnalyticsComponent.types";
import "chartjs-adapter-date-fns";
import { Chart, registerables } from "chart.js";
import { LineChart } from "./Chart";
import { Rings } from "react-loader-spinner";
Chart.register(...registerables);

function UrlShortenerForm() {
    const [state, setState] = useState<analyticsState>({ error: null });

    const match = useMatch("/analytics/:id");
    const urlId = match?.params.id;
    useEffect(() => {
        async function getData() {
            try {
                const result = await axios
                    .get(`${SERVER_ENDPOINTS}/api/analytics/${urlId}`)
                    .then((response) => response.data);
                setState((o) => ({ ...o, data: result }));
            }
            catch (err) {
                setState(o => ({ ...o, error: `An error occurred: ${err}` }))
            }
        }
        getData();
    }, [urlId]);

    if (!state.data && !state.error) {
        return (<Rings color="#00BFFF" height={80} width={80} />)
    }

    if (state.error) {
        return <h2>{state.error}</h2>;
    }

    return <LineChart series={state.data}></LineChart>
}
export default UrlShortenerForm;
