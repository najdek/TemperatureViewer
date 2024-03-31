function getApiUrl(path:string, query:string) {
    const apiUrl = localStorage.getItem("apiUrl");
    const apiKey = localStorage.getItem("apiKey");
    const fullApiUrl = apiUrl + "/" + path + "?key=" + apiKey + "&" + query;
    return fullApiUrl;
}

async function listAllRooms() {
    const result = await fetch(getApiUrl("listrooms.php", ""), {
        method: "GET",
    })
    const data = await result.json();
    return data;
}

export async function getTemps(rooms:Array<string>) {
    let roomsString = "";
    rooms.forEach(function(room) {
        roomsString += room + ",";
    });
    roomsString.slice(0, -1);

    const result = await fetch(getApiUrl("get-multiple.php", "rooms=" + roomsString), {
        method: "GET",
    })
    const data = await result.json();
    return data;
}

export function testApi() {
    return listAllRooms();
}

export async function getAllTemps() {
    const allRooms = await listAllRooms();
    return getTemps(allRooms);
}