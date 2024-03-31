import { Container, IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { FabButton } from "../components/FabButton";
import { Thermostat, LocalFlorist, Home, Deck } from "@mui/icons-material";
import { getSensorCustomization, setSensorCustomization } from "../sensorCustomization";

export function ChangeSensorNameIconScreen() {
    const navigate = useNavigate();
    const pageContainer = useRef<HTMLInputElement>(null);
    const params = useParams();
    const sensorId:string = params.sensor || "";

    const savedSensorCustomization = getSensorCustomization(sensorId);

    const [selectedIcon, setSelectedIcon] = useState(savedSensorCustomization.icon || "Thermostat");
    const [customName, setCustomName] = useState(savedSensorCustomization.name || sensorId);

    const handleFabClick = () => {
        setSensorCustomization(sensorId, customName, selectedIcon);
        navigate("/change-names-icons");
    }

    useEffect(() => {
        console.log(getSensorCustomization(sensorId));
    }, [])

    return (
        <Layout>
            <Container ref={pageContainer} maxWidth="sm">
                <div className="flex flex-col space-y-4">
                    Change sensor name and icon: {sensorId}
                </div>
                <div className="mb-16">
                <TextField id="outlined-basic" label="Sensor Name" defaultValue={customName} onChange={(event) => setCustomName(event.currentTarget.value)} variant="outlined" />
                </div>
                <div className="">
                    <IconList
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                    />
                </div>
            </Container>
            <FabButton clickfunction={handleFabClick} pageContainer={pageContainer} />
        </Layout>
    )
}

function IconWrapper(props:any) {

    const selectedIcon = props.passed.selectedIcon;
    const setSelectedIcon = props.passed.setSelectedIcon

    const selectIcon = (icon: string) => {
        setSelectedIcon(icon);
    }
    return (
        <IconButton onClick={() => selectIcon(props.icon)} size="large" color={props.icon == selectedIcon ? "success" : "primary"}>
            {props.children}
        </IconButton>
    )
}

function IconList(props: any) {
    const selectedIcon = props.selectedIcon;
    const setSelectedIcon = props.setSelectedIcon
    const pass = {
        selectedIcon,
        setSelectedIcon
    };
    return (
        <div>
            <div>Select Icon:</div>
            <div>
                <IconWrapper passed={pass} icon="Thermostat"><Thermostat/></IconWrapper>
                <IconWrapper passed={pass} icon="LocalFlorist"><LocalFlorist/></IconWrapper>
                <IconWrapper passed={pass} icon="Home"><Home/></IconWrapper>
                <IconWrapper passed={pass} icon="Deck"><Deck/></IconWrapper>
            </div>
        </div>
    )
}