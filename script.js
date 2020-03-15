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

  // Pop-up

  const form = document.querySelector(".quote-form");
  const popUp = document.querySelector(".pop-up");
  const blocker = document.querySelector(".blocker");
  const popUpText = popUp.querySelector(".pop-up-text");
  const closeButton = popUp.querySelector(".pop-up-close");
  const subject = form.querySelector("#input-subject");
  const details = form.querySelector("#input-details");
  const content = document.querySelector(".content");

  document.addEventListener("click", (e) => {
    if(e.target === blocker) {
      closePopUp();
    }
  });

  closeButton.addEventListener("click", () => {
    closePopUp();
  });  

  function closePopUp() {
    popUp.classList.remove("pop-up-open");
    content.classList.remove("content-pop-up");
  } 

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setPopUp();
  });

  function setPopUp() {
    let res = "Письмо отправлено<br>";

    res += createRow("Тема: ", subject.value, "Без темы");
    res += createRow("Описание: ", details.value, "Без описания");

    popUpText.innerHTML = res;

    openPopUp();
  }

  function createRow(title, value, defaultValue) {
    let text = !value.length ? defaultValue : title.concat(value);
    return text + "<br>";
  }  

  function openPopUp() {
    popUp.classList.add("pop-up-open");
    content.classList.add("content-pop-up");
  }   
}