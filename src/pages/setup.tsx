import { Container, TextField } from "@mui/material";
import Layout from "../Layout";
import { useParams } from "react-router-dom";

export function SetupScreen() {
    const params = useParams();
    const page = params.page;
    return (
        <Layout>
            <Container maxWidth="sm">
                <div className="h-[30vh] flex flex-col justify-center place-items-center">
                    <img src="/icons/icon.svg" className="h-16"/>
                    <h2 className="text-2xl mt-2">Temperature Viewer {page}</h2>
                    <h3 className="text-lg">Setup</h3>
                </div>
                <div>
                <TextField id="outlined-basic" label="Temp API url" variant="outlined" className="w-full" />
                <TextField id="outlined-basic" label="API auth key" variant="outlined" className="w-full" />
                </div>
            </Container>
        </Layout>

    )
}