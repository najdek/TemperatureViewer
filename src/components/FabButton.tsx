import { Check } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";

export function FabButton(props:any) {
    const [fabRight, setFabRight] = useState(null);

    const pageContainer = props.pageContainer;

    useEffect(() => {
        let rightOffset;
        if (pageContainer.current !== null) {
            rightOffset = pageContainer.current.getBoundingClientRect().left
        } else {
            rightOffset = 0;
        }
        setFabRight(rightOffset);
    }, [])


    const clickfunction = props.clickfunction;

    return (
        <div className={`fixed p-4 bottom-0 ${fabRight == null && "hidden"}`} style={
            {
                right: fabRight + "px"
            }
        }>
            <Fab color="success" onClick={clickfunction}>
                <Check />
            </Fab>
        </div>
    )
}