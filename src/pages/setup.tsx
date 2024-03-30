import { Button, Container, TextField } from "@mui/material";
import Layout from "../Layout";
import { useEffect, useState } from "react"; 
import { testApi } from "../temp";
import { useNavigate } from "react-router-dom";

export function SetupScreen() {
    const [inputApiUrl, setInputApiUrl] = useState(localStorage.getItem("apiUrl") || "");
    const [inputApiKey, setInputApiKey] = useState(localStorage.getItem("apiKey") || "");
    const [connectResult, setConnectResult] = useState("");
    const navigate = useNavigate();

    const handleConnect = async () => {
        localStorage.setItem("apiUrl", inputApiUrl);
        localStorage.setItem("apiKey", inputApiKey);

        try {
            const connectResult = await testApi();
            setConnectResult("Connected");
            console.log(connectResult);
            navigate("/select-sensors");
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
                <TextField label="Temperature API URL" variant="outlined" className="w-full" defaultValue={inputApiUrl} onChange={(event) => setInputApiUrl(event.target.value)} />
                <TextField label="API Auth Key" variant="outlined" className="w-full" type="password" defaultValue={inputApiKey} onChange={(event) => setInputApiKey(event.target.value)} />
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