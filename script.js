window.onload = function () {

  // Common function
  function selectMe(mainClass, container, target) {
    const addedClass = mainClass.concat("-selected");

    container.forEach((obj) => {
      obj.classList.remove(addedClass);
    });

    if (target.classList.contains(mainClass)) {
      target.classList.add(addedClass);
    }
  }

  function updateHeaderHeight() {
    const style = getComputedStyle(document.body);

    const big = style.getPropertyValue("--header-height-default-big");
    const small = style.getPropertyValue("--header-height-default-small");

    const root = document.querySelector(":root");
    root.style.setProperty("--header-height", window.scrollY > 30 ? small : big);
  }

  window.addEventListener("resize", updateHeaderHeight);

  // Navigation bar
  document.addEventListener("scroll", function() {
    onScroll();
    updateHeaderHeight();
  });

  function onScroll() {
    let navigationItems = document.querySelectorAll(".navigation-item-link");
    let currentPosition = window.scrollY + 80;
    let linkToHeader = document.querySelectorAll(".link-to-header");
    let content = document.querySelectorAll(".link-to-header ~ section");

    linkToHeader.forEach((link, index) => {
      if (content[index].offsetTop <= currentPosition &&
        content[index].offsetTop + content[index].offsetHeight > currentPosition) {
        navigationItems.forEach((a) => {
          a.classList.remove("navigation-item-link-selected");

          if (link.getAttribute("id") === a.getAttribute("href").substring(1)) {
            a.classList.add("navigation-item-link-selected");
          }
        });
      }
    });
  }

  const navMenu = document.querySelector(".navigation");

  navMenu.addEventListener("click", (e) => {
    if(e.target.classList.contains("navigation-item-link")) {
      switchMenu(false);
    }
  });
  
  const navShadow = document.querySelector(".navigation-shadow");

  navShadow.addEventListener("click", (e) => {
    switchMenu(false);
  });

  const burgerButton = document.querySelector(".navigation-burger");
  
  burgerButton.addEventListener("click", (e) => {
    switchMenu();
    e.stopPropagation();
  });

  function switchMenu (open) {
    const navMenu = document.querySelector(".navigation");
    const burgerButton = document.querySelector(".navigation-burger");
    const headerLogo = document.querySelector(".logo-icon");
    const navShadow = document.querySelector(".navigation-shadow");
    
    switchThis(navMenu, "navigation-display", open);
    switchThis(burgerButton, "navigation-burger-display", open);
    switchThis(headerLogo, "logo-icon-burger", open);
    switchThis(navShadow, "navigation-shadow-display", open);
  }
  
  function switchThis (selector, className, value) {
    if(value !== undefined) {
      selector.classList.toggle(className, value);
    } else {
      selector.classList.toggle(className);
    }
  }

  // Section of slider

  const slider = document.querySelector(".section-slider");
  const slides = slider.querySelectorAll(".slide");

  const sliderPreviousButton = document.querySelector(".previous-button");
  const sliderNextButton = document.querySelector(".next-button");

  sliderPreviousButton.addEventListener("click", () => {
    previousSlide();
  });

  sliderNextButton.addEventListener("click", () => {
    nextSlide();
  });

  function previousSlide() {
    let previousIndex = sliderReset();
    let index = previousIndex - 1;

    if (index < 0) {
      index = slides.length - 1;
    }

    setAnimationToSlider(slides[index], { transform: 'translate(-100%)' }, { transform: 'translate(0)' }, 500, 'ease-in-out');
    setAnimationToSlider(slides[previousIndex], { transform: 'translate(0)' }, { transform: 'translate(100%)' }, 500, 'ease-in-out');
    slides[index].classList.add("slide-selected");
    setSlideBackground(index);
  }

  function setAnimationToSlider(target, from, to, duration, transitionTiming) {
    target.animate([
      { ...from },
      { ...to },
    ], {
      duration: duration,
      easing: transitionTiming
    });
  }

  function nextSlide() {
    let previousIndex = sliderReset();
    let index = (previousIndex + 1) % slides.length;
    setAnimationToSlider(slides[index], { transform: 'translate(100%)' }, { transform: 'translate(0)' }, 500, 'ease-in-out');
    setAnimationToSlider(slides[previousIndex], { transform: 'translate(0)' }, { transform: 'translate(-100%)' }, 500, 'ease-in-out');
    slides[index].classList.add("slide-selected");
    setSlideBackground(index);
  }

  function sliderReset() {
    let index = 0;

    slides.forEach((element, elementIndex) => {
      if (element.classList.contains("slide-selected")) {
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
    for (let i = blocks.length - 1; i >= 1; --i) {
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
    if (e.target === blocker) {
      closePopUp();
    }
  });

  closeButton.addEventListener("click", () => {
    closePopUp();
  });

  function closePopUp() {
    popUp.classList.remove("pop-up-open");
    content.classList.remove("content-pop-up");
    formReset();
  }

  function formReset() {
    document.querySelectorAll(".quote-form .input-text").forEach((input) => {
      input.value = "";
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setPopUp();
  });

  function setPopUp() {
    let res = "<h1>Письмо отправлено</h1><br>";

    res = res.concat(createRow("<h2>Тема:</h2> ", subject.value, "<h2>Без темы</h2>"));
    res = res.concat(createRow("<h2>Описание:</h2> ", details.value, "<h2>Без описания</h2>"));

    popUpText.innerHTML = res;

    openPopUp();
  }

  function createRow(title, value, defaultValue) {
    let text = !value.length ? defaultValue : title.concat("<div class='pop-up-text-content'>".concat(value).concat("</div>"));
    return text + "<br>";
  }

  function openPopUp() {
    popUp.classList.add("pop-up-open");
    content.classList.add("content-pop-up");
  }
}