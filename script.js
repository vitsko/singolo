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

  // Navigation bar
  document.addEventListener("scroll", () => {
    onScroll()
  });

  function onScroll() {
    let navigationItems = document.querySelectorAll(".navigation-item-link");
    let currentPosition = window.scrollY + 300;
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

  // Section of slider

  const slider = document.querySelector(".section-slider");
  const slides = slider.querySelectorAll(".slide");

  function previousSlide() {
    let index = sliderReset() - 1;

    if (index < 0) {
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
      input.value="";
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