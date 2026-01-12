const btn = document.getElementById("gobletBtn");
const card = document.getElementById("championCard");
const img = document.getElementById("championImg");
const nameEl = document.getElementById("championName");
const houseEl = document.getElementById("championHouse");

btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Summoning... 🔥";

    card.className = "card hidden";

    try {
        const res = await fetch("https://api.potterdb.com/v1/characters");
        const data = await res.json();

        const chars = data.data;
        const champ = chars[Math.floor(Math.random() * chars.length)].attributes;

        nameEl.textContent = champ.name || "Unknown Champion";
houseEl.textContent = champ.house || "House Unknown";

document.getElementById("championMeta").innerHTML = `
    <strong>Species:</strong> ${champ.species || "Unknown"}<br>
    <strong>Gender:</strong> ${champ.gender || "Unknown"}<br>
    <strong>Blood Status:</strong> ${champ.bloodStatus || "Unknown"}<br>
    <strong>Patronus:</strong> ${champ.patronus || "None"}<br>
    <strong>Wizard:</strong> ${champ.wizard ? "Yes" : "No"}
`;

        img.src = champ.image || "https://i.imgur.com/8RKXAIV.png";

        setTimeout(() => {
            card.classList.remove("hidden");

            if (champ.house)
                card.classList.add(champ.house.toLowerCase());

            btn.disabled = false;
            btn.textContent = "🔥 Touch the Goblet 🔥";
        }, 1200);

    } catch {
        alert("The Goblet rejected this name 🫠");
        btn.disabled = false;
    }
});
