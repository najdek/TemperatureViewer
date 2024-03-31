import { Deck, Home, LocalFlorist, Thermostat } from "@mui/icons-material";

export function SensorIcon(props: { icon: string; }) {
    const icon = props.icon;
    const icons:any = {
        Thermostat: <Thermostat />,
        LocalFlorist: <LocalFlorist />,
        Home: <Home />,
        Deck: <Deck />
    }

    const iconElement = icons[icon];

    return (
        iconElement
    )
}