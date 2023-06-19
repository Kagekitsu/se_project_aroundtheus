export function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener('keydown', closeModalWithKey);
}

export function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeModalWithKey);
}

export function closeModalWithKey(e) {
  if (e.key === 'Escape') {
    const currentModal = document.querySelector('.modal_opened');
    closePopup(currentModal);
  }
}

export function closeModalOutsideClick(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
}
