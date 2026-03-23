document.addEventListener("DOMContentLoaded", () => {
    const projectsData = [
        {
            id: 1,
            title: "Бот з AI асистентами",
            image: "images_1/photo_2026-02-11_22-10-24.jpg",
            description: "Фітнес бот з великим функціоналом.",
            link: null,
            category: "ai"
        },
        {
            id: 2,
            title: "Бот з аналізом калорій",
            image: "images_1/photo_2026-02-15_02-17-33.jpg",
            description: "Зручний інструмент для підрахунку калорій та аналізу харчування.",
            link: "https://github.com/dnezolazk41fbmi28-sys/dimunyra",
            category: "health"
        }
    ];

    // 2. Керований стан (state)
    let currentFilter = "all";

    const projectsContainer = document.getElementById("projects-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // 3. Динамічна зміна DOM (Рендер проєктів)
    function renderProjects(filter) {
        if (!projectsContainer) return; 
        
        projectsContainer.innerHTML = "";

        const filteredProjects = filter === "all" 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);

        filteredProjects.forEach(project => {
            const article = document.createElement("article");
            
            let projectHTML = `
                <h3>${project.title}</h3>
                <img src="${project.image}" alt="Прев'ю боту" width="300">
                <p>${project.description}</p>
            `;
            
            if (project.link) {
                projectHTML += `<a href="${project.link}" target="_blank">Репозиторій проєкту</a>`;
            }

            article.innerHTML = projectHTML;
            projectsContainer.appendChild(article);
        });
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                // Зміна активного класу для кнопок
                filterButtons.forEach(btn => btn.classList.remove("active"));
                e.currentTarget.classList.add("active");

                // Оновлення стану та перемальовування
                currentFilter = e.currentTarget.getAttribute("data-category");
                renderProjects(currentFilter);
            });
        });

        renderProjects(currentFilter);
    }


    const artworksContainer = document.getElementById("artworks-container");

    // Функція для отримання та відображення картин
    async function fetchArtworks() {
        try {
            const response = await fetch('https://api.artic.edu/api/v1/artworks?limit=4&fields=id,title,artist_display,image_id,date_display');
            
            if (!response.ok) {
                throw new Error(`Помилка сервера: ${response.status}`);
            }

            const data = await response.json();
            
            artworksContainer.innerHTML = "";

            // Проходимося по кожній отриманій картині
            data.data.forEach(art => {
                const article = document.createElement("article");
                const imageUrl = art.image_id 
                    ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg` 
                    : ""; // Якщо картинки немає, залишаємо порожнім

                // Створюємо HTML-структуру для кожної картини
                article.innerHTML = `
                    <h3>${art.title}</h3>
                    ${imageUrl ? `<img src="${imageUrl}" alt="${art.title}">` : '<p>Зображення недоступне</p>'}
                    <p><strong>Автор:</strong> ${art.artist_display}</p>
                    <p><strong>Рік:</strong> ${art.date_display || 'Невідомо'}</p>
                `;
                
                artworksContainer.appendChild(article);
            });

        } catch (error) {
            console.error("Помилка fetch-запиту:", error);
            artworksContainer.innerHTML = `<p style="color: red;">Не вдалося завантажити дані. Помилка: ${error.message}</p>`;
        }
    }

    fetchArtworks();
});