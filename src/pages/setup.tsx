import { Button, Container, TextField } from "@mui/material";
import Layout from "../Layout";
import { useState } from "react"; 
import { testApi } from "../temp";

export function SetupScreen() {
    const [inputApiUrl, setInputApiUrl] = useState("");
    const [inputApiKey, setInputApiKey] = useState("");
    const [connectResult, setConnectResult] = useState("");

    const handleConnect = async () => {
        localStorage.setItem("apiUrl", inputApiUrl);
        localStorage.setItem("apiKey", inputApiKey);

        try {
            const connectResult = await testApi();
            setConnectResult("Connected");
            console.log(connectResult);
        } catch (e) {
            setConnectResult("Error connecting to API:\n" + e);
            console.log(e);
        }
    }

    return (
        <Layout>
            <Container maxWidth="sm">
                <div className="h-[30vh] flex flex-col justify-center place-items-center">
                    <img src="/icons/icon.svg" className="h-16"/>
                    <h2 className="text-2xl mt-2">Temperature Viewer</h2>
                    <h3 className="text-lg">Setup</h3>
                </div>
                <div className="flex flex-col space-y-4">
                <TextField label="Temp API url" variant="outlined" className="w-full" onChange={(event) => setInputApiUrl(event.target.value)} />
                <TextField label="API auth key" variant="outlined" className="w-full" onChange={(event) => setInputApiKey(event.target.value)} />
                </div>
                <div className="my-6 flex justify-center">
                <Button variant="contained" className="" onClick={handleConnect}>Connect</Button>
                </div>
                <div className="my-6 flex justify-center text-xl whitespace-pre-wrap">
                    {connectResult}
                </div>
            </Container>
        </Layout>

    )
}