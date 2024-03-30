function getApiUrl(path) {
    const apiUrl = localStorage.getItem("apiUrl");
    const apiKey = localStorage.getItem("apiKey");
    const fullApiUrl = apiUrl + "/" + path + "?key=" + apiKey;
    return fullApiUrl;
}

export async function testApi() {
    const result = await fetch(getApiUrl("listrooms.php"), {
        method: "GET",
    })
    const data = await result.json();
    return data;
}