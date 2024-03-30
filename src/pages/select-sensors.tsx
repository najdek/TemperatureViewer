import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { getAllTemps } from "../temp";


function ListRooms() {

    const [allRooms, setAllRooms] = useState(getAllTemps());
    const [checkedRooms, setCheckedRooms] = useState(Array);
    const roomsOut = [];

    useEffect(() => {
        async function updateRooms() {
            setAllRooms(await getAllTemps());
        }
        updateRooms();
    }, [])

    const handleCheckRoom = (key) => {
        let newArray = checkedRooms;
        if (newArray.includes(key)) {
            newArray.splice(newArray.indexOf(key), 1);
        } else {
            newArray.push(key);
        }
        setCheckedRooms([...newArray]);
    }

    for (const [key, value] of Object.entries(allRooms)) {
        const temp = value.temp;
        roomsOut.push(
            <ListItem key={key} disablePadding>
                <ListItemButton onClick={() => handleCheckRoom(key)}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checkedRooms.includes(key) ? true : false}
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
        roomsOut
    )

}


export function SelectSensorsScreen() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <div className="flex flex-col space-y-4">
                    Select temperature sensors you want to use
                </div>
                <List>
                    <ListRooms />
                </List>
            </Container>
        </Layout>

    )
}