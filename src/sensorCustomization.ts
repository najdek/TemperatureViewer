export function getSensorCustomization(sensor: string) {
    const all = JSON.parse(localStorage.getItem("sensorCustomization") || "{}");
    return all[sensor] || {};
}

export function setSensorCustomization(sensor: string, name: string, icon: string) {
    let all = JSON.parse(localStorage.getItem("sensorCustomization") || "{}");
    const data = {
        name: name,
        icon: icon,
    }
    all[sensor] = data;
    all = JSON.stringify(all);
    localStorage.setItem("sensorCustomization", all);
}