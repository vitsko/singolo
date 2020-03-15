window.onload = function() {

  // Navigation bar

  function selectMe(mainClass, container, target) {
    const addedClass = mainClass.concat("-selected");

    container.forEach((obj) => {
      obj.classList.remove(addedClass);
    });
    
    if(target.classList.contains(mainClass)) {
      target.classList.add(addedClass);
    }
  }

  const navigation = document.querySelector(".navigation");
  const navigationLinkClass = "navigation-item-link";
  const navigationLinks = navigation.querySelectorAll(".".concat(navigationLinkClass));
  
  navigation.addEventListener("click", (e) => {
    selectMe(navigationLinkClass, navigationLinks, e.target);
  });

  // Section-slider

  const slider = document.querySelector(".section-slider");
  const slides = slider.querySelectorAll(".slide");

  function sliderReset() {
    let index = 0;

    slides.forEach((element, elementIndex) => {
      if(element.classList.contains("slide-selected")) {
        index = elementIndex;
        element.classList.remove("slide-selected");
      }
    });

    return index;
  } 

  function setSlideBackground(slideIndex) {
    slider.classList.toggle("section-slider-red", slideIndex === 0);
    slider.classList.toggle("section-slider-blue", slideIndex === 1);
  }

  function previousSlide() {
    let index = sliderReset() - 1;

    if(index < 0) {
      index = slides.length - 1;
    }

    slides[index].classList.add("slide-selected");
    setSlideBackground(index);
  }

  function nextSlide() {
    let index = (sliderReset() + 1) % slides.length;
    slides[index].classList.add("slide-selected");
    setSlideBackground(index);
  }

  const sliderPreviousButton = document.querySelector(".previous-button");
  const sliderNextButton = document.querySelector(".next-button");

  sliderPreviousButton.addEventListener("click", () => {
    previousSlide();
  });

  sliderNextButton.addEventListener("click", () => {
    nextSlide();
  });
}