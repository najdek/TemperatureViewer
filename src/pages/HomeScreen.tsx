import { AppBar, Avatar, Container, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import MenuIcon from '@mui/icons-material/Menu';
import { Settings } from "@mui/icons-material";
import { getSensorCustomization } from "../sensorCustomization";
import { SensorIcon } from "../components/SensorIcon";
import { getTemps } from "../temp";


export function HomeScreen() {
    const navigate = useNavigate();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("sensors")) {
            navigate("/setup");
        }
    }, [])

    return (
        <Layout>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setDrawerIsOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Temperature Viewer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Container maxWidth="sm">
                <ListSensors />
            </Container>
        </Layout>
    )
}

function Sensor(props: any) {
    const sensorId = props.sensorId;
    const savedSensorCustomization = getSensorCustomization(sensorId);
    const temperatureData = props.temperatureData;
    let temperature;
    if (temperatureData[sensorId]) {
        temperature = parseFloat(temperatureData[sensorId].temp);
        if (temperature) {
            temperature = Math.round(temperature * 10) / 10 + "°C";
        } else {
            temperature = "-";
        }
    }
    return (
        <ListItem key={sensorId}
            secondaryAction={
                <ListItemText>{temperature}</ListItemText>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <SensorIcon icon={savedSensorCustomization.icon || "Thermostat"} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={savedSensorCustomization.name || sensorId} />
        </ListItem>
    )
}

function ListSensors() {
    const [sensorList, setSensorList] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        const sensors = JSON.parse(localStorage.getItem("sensors") || "[]");
        setSensorList(sensors);
        async function updateData() {
            setTemperatureData(await getTemps(sensors));
        }
        updateData();
        setInterval(updateData, 60000);
    }, [])
    const sensorsOut: JSX.Element[] = [];
    sensorList.forEach((sensor: string) => {
        sensorsOut.push(
            <Sensor key={sensor} sensorId={sensor} temperatureData={temperatureData} />
        )
    });
    return (
        <List>
            {sensorsOut}
        </List>
    )
}