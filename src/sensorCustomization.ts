export function getSensorCustomization(sensor) {
    const all = JSON.parse(localStorage.getItem("sensorCustomization") || "{}");
    return all[sensor] || {};
}

export function setSensorCustomization(sensor, name, icon) {
    let all = JSON.parse(localStorage.getItem("sensorCustomization") || "{}");
    let data = {
        name: name,
        icon: icon,
    }
    all[sensor] = data;
    all = JSON.stringify(all);
    localStorage.setItem("sensorCustomization", all);
}