document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/ai/process");
        const data = await response.json();
        
        const list = document.getElementById("ai-data-list");
        list.innerHTML = data.data.map(item => `<li>${item.name}</li>`).join("");
    } catch (error) {
        console.error("Error fetching AI data:", error);
    }
});
