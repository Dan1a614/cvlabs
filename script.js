document.addEventListener("DOMContentLoaded", () => {
    
    const info = `Ваша система: ${navigator.platform} | Браузер: ${navigator.appName}`;
    localStorage.setItem('userSystem', info);
    document.getElementById('browser-info').innerText = localStorage.getItem('userSystem');


    const myVariant = 1; 
    const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${myVariant}/comments`;

    fetch(commentsUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('comments-container');
            container.innerHTML = data.slice(0, 3).map(c => `
                <div style="margin-bottom: 15px; border-left: 3px solid #E07D10; padding-left: 10px;">
                    <strong>${c.name}</strong> <small>(${c.email})</small>
                    <p style="font-size: 13px;">${c.body}</p>
                </div>
            `).join('');
        })
        .catch(err => console.error("Помилка API:", err));

    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".close-modal");

    setTimeout(() => {
        modal.style.display = "block";
    }, 60000); 

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

    const themeBtn = document.getElementById("theme-toggle");
    
    function updateTheme() {
        const hour = new Date().getHours();
        if (hour >= 7 && hour < 21) {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });

    updateTheme();
});