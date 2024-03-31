import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { getAllTemps } from "../temp";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FabButton } from "../components/FabButton";

function ListSensors(props: any) {

    const [allSensors, setAllSensors] = useState(getAllTemps());
    const sensorsOut = [];

    useEffect(() => {
        async function updateSensors() {
            setAllSensors(await getAllTemps());
        }
        updateSensors();
    }, [])

    const handleCheckSensor = (key: string) => {
        const newArray = props.checkedSensors;
        if (newArray.includes(key)) {
            newArray.splice(newArray.indexOf(key), 1);
        } else {
            newArray.push(key);
        }
        props.setCheckedSensors([...newArray]);
    }

    for (const [key, value] of Object.entries(allSensors)) {
        const temp = value.temp;
        sensorsOut.push(
            <ListItem key={key} disablePadding>
                <ListItemButton onClick={() => handleCheckSensor(key)}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={props.checkedSensors.includes(key) ? true : false}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={`${key} [${temp}]`} />
                </ListItemButton>
            </ListItem>
        )
    }


    return (
        sensorsOut
    )
}

export function SelectSensorsScreen() {
    const navigate = useNavigate();
    const pageContainer = useRef<HTMLInputElement>(null);
    const [checkedSensors, setCheckedSensors] = useState(Array);

    useEffect(() => {
        const loadedSensors = localStorage.getItem("sensors");
        if (typeof loadedSensors === "string") {
            setCheckedSensors(JSON.parse(loadedSensors));
        }
    }, [])

    const handleFabClick = () => {
        localStorage.setItem("sensors", JSON.stringify(checkedSensors));
        navigate("/change-order");
    }

    return (
        <Layout>
            <Container ref={pageContainer} maxWidth="sm">
                <div className="flex flex-col space-y-4">
                    Select temperature sensors you want to use
                </div>
                <div className="mb-16">
                    <List>
                        <ListSensors
                            checkedSensors={checkedSensors}
                            setCheckedSensors={setCheckedSensors}
                        />
                    </List>
                </div>
            </Container>
            <FabButton clickfunction={handleFabClick} pageContainer={pageContainer} />
        </Layout>

    )
}