import { ListItem, IconButton, ListItemText, Container, List, ListItemButton, ListItemIcon } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { FabButton } from "../components/FabButton";
import { getSensorCustomization } from "../sensorCustomization";
import { SensorIcon } from "../components/SensorIcon";

function ListSensors(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const sensorList = localStorage.getItem("sensors");
        if (typeof sensorList === "string") {
            props.setOrderedSensorList(JSON.parse(sensorList));
        }
    }, [])

    const handleListBtnClick = (sensor) => {
        navigate("/change-names-icons/" + sensor);
    }

    const sensorsOut: JSX.Element[] = [];
    props.orderedSensorList.forEach((sensor) => {

        const savedSensorCustomization = getSensorCustomization(sensor);

        sensorsOut.push(
            <ListItem key={sensor}>
                <ListItemButton onClick={() => {handleListBtnClick(sensor)}}>
                    <ListItemIcon>
                        <SensorIcon icon={savedSensorCustomization.icon || "Thermostat"} />
                    </ListItemIcon>
                    <ListItemText primary={sensor} secondary={savedSensorCustomization.name} />
                </ListItemButton>
            </ListItem>
        )
    })
    return (
        sensorsOut
    )
}


export function ChangeNamesIconsScreen() {
    const navigate = useNavigate();
    const [orderedSensorList, setOrderedSensorList] = useState(Array);
    const pageContainer = useRef<HTMLInputElement>(null);

    const handleFabClick = () => {
        navigate("/");
    }

    return (
        <Layout>
            <Container ref={pageContainer} maxWidth="sm">
                <div className="flex flex-col space-y-4">
                    Change names and icons
                </div>
                <div className="mb-16">
                    <List>
                        <ListSensors
                            orderedSensorList={orderedSensorList}
                            setOrderedSensorList={setOrderedSensorList}
                        />
                    </List>
                </div>
            </Container>
            <FabButton clickfunction={handleFabClick} pageContainer={pageContainer} />
        </Layout>

    )
}