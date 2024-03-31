import { Container, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FabButton } from "../components/FabButton";
import { JSX } from "react/jsx-runtime";

function ListSensors(props) {

    useEffect(() => {
        const sensorList = localStorage.getItem("sensors");
        if (typeof sensorList === "string") {
            props.setOrderedSensorList(JSON.parse(sensorList));
        }
    }, [])

    const changeItemPosition = (sensor, change) => {
        const newArray = props.orderedSensorList;
        const index = newArray.indexOf(sensor);
        newArray.splice(index + change, 0, newArray.splice(index, 1)[0]);
        props.setOrderedSensorList([...newArray]);
    }

    const sensorsOut: JSX.Element[] = [];
    props.orderedSensorList.forEach((sensor) => {
        sensorsOut.push(
            <ListItem key={sensor} secondaryAction={

                <IconButton onClick={() => changeItemPosition(sensor, 1)} edge="end" disabled={
                    props.orderedSensorList.indexOf(sensor) == props.orderedSensorList.length - 1
                }>
                    <ArrowDownward />
                </IconButton>

            }>
                {
                    <IconButton onClick={() => changeItemPosition(sensor, -1)} disabled={
                        props.orderedSensorList.indexOf(sensor) == 0
                    }>
                        <ArrowUpward />
                    </IconButton>

                }
                <ListItemText className="text-center" primary={`${sensor}`} />
            </ListItem>
        )
    })


    return (
        sensorsOut
    )
}


export function ChangeOrderScreen() {
    const navigate = useNavigate();
    const [orderedSensorList, setOrderedSensorList] = useState(Array);
    const pageContainer = useRef<HTMLInputElement>(null);

    const handleFabClick = () => {
        localStorage.setItem("sensors", JSON.stringify(orderedSensorList));
        navigate("/change-names-icons");
    }

    return (
        <Layout>
            <Container ref={pageContainer} maxWidth="sm">
                <div className="flex flex-col space-y-4">
                    Change sensor order
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