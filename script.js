document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.getElementById("slide-container");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
  
    let currentSlideIndex = 0;
    let slides = [];
  
    async function loadSlides() {
      try {
        const response = await fetch("slides.json");
        slides = await response.json();
        renderSlide();
      } catch (error) {
        console.error("Errore nel caricamento delle slide:", error);
      }
    }
  
    function renderSlide() {
      const slide = slides[currentSlideIndex];
      slideContainer.innerHTML = `
        <div class="slide">
          <img src="${slide.image}" alt="Slide image" class="slide-image">
          <p class="slide-text">${slide.text}</p>
        </div>
      `;
      prevButton.disabled = currentSlideIndex === 0;
      nextButton.disabled = currentSlideIndex === slides.length - 1;
    }
  
    prevButton.addEventListener("click", () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
      }
    });
  
    nextButton.addEventListener("click", () => {
      if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
      }
    });
  
    // Caricamento iniziale delle slide
    loadSlides();
  });
  