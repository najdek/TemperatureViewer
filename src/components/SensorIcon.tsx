import { Deck, Home, LocalFlorist, Thermostat } from "@mui/icons-material";

export function SensorIcon(props) {
    const icon = props.icon;
    const icons = {
        Thermostat: <Thermostat />,
        LocalFlorist: <LocalFlorist />,
        Home: <Home />,
        Deck: <Deck />
    }

    return (
        icons[icon]
    )
}