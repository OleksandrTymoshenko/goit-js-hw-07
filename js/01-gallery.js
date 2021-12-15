import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const refs = {
    gallery: document.querySelector('.gallery'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
function createGalleryMarkup(galleryItems) {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"/>
            </a>
        </div>`;
    })
    .join('');
}
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

const onGalleryClick = event => {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
    return;
}
    const instance = basicLightbox.create(`<img src='${event.target.dataset.source}'>`, {
    onShow: instance => {
        document.addEventListener('keydown', onEsc);
        },
    onClose: instance => {
        document.removeEventListener('keydown', onEsc);
    },
});

    function onEsc(event) {
    if (event.code === 'Escape') {
        instance.close();
    }
}
    instance.show();
};
refs.gallery.addEventListener('click', onGalleryClick);
