window.onload = function() {

  // Common function
  function selectMe(mainClass, container, target) {
    const addedClass = mainClass.concat("-selected");

    container.forEach((obj) => {
      obj.classList.remove(addedClass);
    });
    
    if(target.classList.contains(mainClass)) {
      target.classList.add(addedClass);
    }
  }

  // Navigation bar
  const navigation = document.querySelector(".navigation");
  const navigationLinkClass = "navigation-item-link";
  const navigationLinks = navigation.querySelectorAll(".".concat(navigationLinkClass));
  
  navigation.addEventListener("click", (e) => {
    selectMe(navigationLinkClass, navigationLinks, e.target);
  });

  // Section of slider

  const slider = document.querySelector(".section-slider");
  const slides = slider.querySelectorAll(".slide");

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

  const sliderPreviousButton = document.querySelector(".previous-button");
  const sliderNextButton = document.querySelector(".next-button");

  sliderPreviousButton.addEventListener("click", () => {
    previousSlide();
  });

  sliderNextButton.addEventListener("click", () => {
    nextSlide();
  });

  const phones = document.querySelectorAll(".phone");

  phones.forEach((phone) => {
    phone.addEventListener("click", () => {
      phone.classList.toggle("turn-off");
    });
  });

  // Section of portfolio  

  const portfolio = document.querySelector('.portfolio-items');
  const portfolioImageClass = "portfolio-image";
  const portfolioImages = portfolio.querySelectorAll('.'.concat(portfolioImageClass));

  portfolio.addEventListener("click", (e) => {
    selectMe(portfolioImageClass, portfolioImages, e.target);
  });

  const filter = document.querySelector(".portfolio-filter");
  const filterButtonClass = "filter-input-button";
  const filterItems = filter.querySelectorAll('.'.concat(filterButtonClass));


  filter.addEventListener("click", (e) => {
    selectMe(filterButtonClass, filterItems, e.target);

    const portfolioItems = portfolio.querySelectorAll(".portfolio-item");
    shiftBlocks(portfolioItems);
  });

  function shiftBlocks(blocks) {
    for(let i = blocks.length - 1; i >= 1; --i) {
      let newIndex = Math.floor(Math.random() * i);
      swapNodes(blocks, i, newIndex);
    }
  } 

  function swapNodes(items, currentIndex, newIndex) {
    let parent = items[currentIndex].parentNode;
    let replaced = parent.replaceChild(items[newIndex], items[currentIndex]);
    parent.insertBefore(replaced, items[newIndex]);
  }
}