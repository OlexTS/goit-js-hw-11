import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/fetchImages';
import renderMarkup from './js/renderMarkup';

// import getRefs from "./js/refs";
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
// const searchBtnRef = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearchImages);
loadMoreBtn.addEventListener('click', onload);

let page = 1;
let per_page = 40;
// let name = '';
loadMoreBtn.classList.add('is-hidden');

function onSearchImages(event) {
  event.preventDefault();
  const name = searchQuery.value;
  page = 1;
  if (!name) {
    loadMoreBtn.classList.add('is-hidden');
    return Notify.info('Please enter correct information');
  }

  fetchImages(name, page, per_page).then(data => {
    // let totalPages = data.totalHits / per_page;
    gallery.innerHTML = '';
    renderMarkup(data.hits);
    lightbox.refresh();
    loadMoreBtn.classList.remove('is-hidden');
    if (!data.hits.length) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      //   if (totalPages === page) {
      //     Notify.info("We're sorry, but you've reached the end of search results.");
      // }
    } else {
      Notify.success(`"Hooray! We found ${data.totalHits} images."`);
    }
  });
}

function onload() {
  page += 1;
  const name = searchQuery.value;
  fetchImages(name, page, per_page).then(data => {
    let totalPages = data.totalHits / per_page;
    renderMarkup(data.hits)
    lightbox.refresh();

    if (page >= totalPages) {
      loadMoreBtn.setAttribute('hidden', true);
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  });
}
