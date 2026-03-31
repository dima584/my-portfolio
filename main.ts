import { Project } from './types.js';
import { fetchArtworksData } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectsData: Project[] = [
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

    let currentFilter: string = "all";

    const projectsContainer = document.getElementById("projects-container") as HTMLElement | null;
    const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");

    function renderProjects(filter: string): void {

        if (!projectsContainer) return; 
        
        projectsContainer.innerHTML = "";

        const filteredProjects: Project[] = filter === "all" 
            ? projectsData 
            : projectsData.filter((project: Project) => project.category === filter);

        filteredProjects.forEach((project: Project) => {
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
        filterButtons.forEach((button: HTMLButtonElement) => {
            button.addEventListener("click", (e: Event) => {
                const target = e.currentTarget as HTMLButtonElement;

                filterButtons.forEach(btn => btn.classList.remove("active"));
                target.classList.add("active");

                currentFilter = target.getAttribute("data-category") || "all";
                renderProjects(currentFilter);
            });
        });

        renderProjects(currentFilter);
    }

    const artworksContainer = document.getElementById("artworks-container") as HTMLElement | null;

    async function displayArtworks(): Promise<void> {
        if (!artworksContainer) return;

        try {
            const data = await fetchArtworksData();
            
            artworksContainer.innerHTML = "";

            data.data.forEach(art => {
                const article = document.createElement("article");
                const imageUrl = art.image_id 
                    ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg` 
                    : "";

                article.innerHTML = `
                    <h3>${art.title}</h3>
                    ${imageUrl ? `<img src="${imageUrl}" alt="${art.title}">` : '<p>Зображення недоступне</p>'}
                    <p><strong>Автор:</strong> ${art.artist_display}</p>
                    <p><strong>Рік:</strong> ${art.date_display || 'Невідомо'}</p>
                `;
                
                artworksContainer.appendChild(article);
            });

        } catch (error: unknown) {
            console.error("Помилка fetch-запиту:", error);
            
            let errorMessage = "Невідома помилка";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            
            artworksContainer.innerHTML = `<p style="color: red;">Не вдалося завантажити дані. Помилка: ${errorMessage}</p>`;
        }
    }

    if (artworksContainer) {
        displayArtworks();
    }
});