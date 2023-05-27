const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => {
    if (this.classList.contains("trigger-enter")) {
      this.classList.add('trigger-enter-active');
    }
  }, 150);
  background.classList.add("open");

  const dropdown = this.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  }

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);

  document.addEventListener('click', handleClickOutside);
  document.addEventListener('touchstart', handleClickOutside);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove("open");

  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('touchstart', handleClickOutside);
}

function handleClickOutside(event) {
  if (!event.target.closest('.dropdown') && !event.target.closest('.cool > li')) {
    background.classList.remove('open');
    triggers.forEach(trigger => trigger.classList.remove('trigger-enter', 'trigger-enter-active'));
  }
}

triggers.forEach(trigger => {
  trigger.addEventListener("mouseenter", handleEnter);
  trigger.addEventListener("mouseleave", handleLeave);
  trigger.addEventListener("touchstart", handleEnter);
  trigger.addEventListener("touchend", handleLeave);
});
