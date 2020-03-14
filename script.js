window.onload = function() {
  function SelectMe(mainClass, container, target) {
    const addedClass = mainClass + "-selected";

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
    SelectMe(navigationLinkClass, navigationLinks, e.target);
  });
}