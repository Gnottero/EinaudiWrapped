document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.getElementById("slide-container");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
  
    let currentSlideIndex = 0;
    let slides = [];
    const roomNumber = new URLSearchParams(window.location.search).get("room");
  
    async function loadSlides() {
      try {
        const response = await fetch("slides.json");
        const data = await response.json();
        const roomData = data[roomNumber] || { maxSlides: 0, slides: [] };
        slides = roomData.slides.slice(0, roomData.maxSlides);
        if (slides.length === 0) {
          slideContainer.innerHTML = "<p>Nessuna slide disponibile per questa stanza.</p>";
          return;
        }
        renderSlide();
        setupGestures();
      } catch (error) {
        console.error("Errore nel caricamento delle slide:", error);
        slideContainer.innerHTML = "<p>Errore nel caricamento delle slide.</p>";
      }
    }
  
    function renderSlide() {
      const slide = slides[currentSlideIndex];
  
      slideContainer.classList.add("fade-out");
      setTimeout(() => {
        slideContainer.innerHTML = `
          <div class="slide">
            <img src="${slide.image}" alt="Slide image" class="slide-image">
            <p class="slide-text">${slide.text}</p>
          </div>
        `;
        slideContainer.classList.remove("fade-out");
        slideContainer.classList.add("fade-in");
  
        prevButton.style.display = window.innerWidth > 768 && currentSlideIndex > 0 ? "flex" : "none";
        nextButton.style.display = window.innerWidth > 768 && currentSlideIndex < slides.length - 1 ? "flex" : "none";
      }, 300);
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
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" && currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
      } else if (event.key === "ArrowRight" && currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
      }
    });
  
    function setupGestures() {
      let touchStartX = 0;
  
      slideContainer.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
      });
  
      slideContainer.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchDelta = touchStartX - touchEndX;
  
        if (touchDelta > 50 && currentSlideIndex < slides.length - 1) {
          currentSlideIndex++;
          renderSlide();
        } else if (touchDelta < -50 && currentSlideIndex > 0) {
          currentSlideIndex--;
          renderSlide();
        }
      });
    }
  
    loadSlides();
  });
  