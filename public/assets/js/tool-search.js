const searchInput = document.getElementById("toolSearch");
const resultBox = document.getElementById("searchResults");

let tools = [];

// Fetch tools from backend
fetch("/includes/tool-search.php")
    .then(res => res.json())
    .then(data => tools = data);

// Search logic
searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    resultBox.innerHTML = "";

    if (value === "") {
        resultBox.style.display = "none";
        return;
    }

    const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(value)
    );

    if (filtered.length === 0) {
        resultBox.innerHTML = `<div class="search-item">No tool found</div>`;
    } else {
        filtered.forEach(tool => {
            resultBox.innerHTML += `
                <a href="${tool.url}" class="search-item">
                    ${tool.name}
                </a>
            `;
        });
    }

    resultBox.style.display = "block";
});
