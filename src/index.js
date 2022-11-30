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

let page = 1;
let per_page = 40;
loadMoreBtn.classList.add('is-hidden');

function onSearchImages(event) {
  //   console.log(event.currentTarget.input);
  event.preventDefault();
  const name = searchQuery.value;
    
  page = 1;
  if (name === '') {
    return Notify.info('Please enter correct information');
  }
  fetchImages(name, page, per_page).then(result => {
    gallery.innerHTML = '';
    renderMarkup(result.hits);
    lightbox.refresh();
    
    if (!result.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`"Hooray! We found ${result.totalHits} images."`);
    }
  });
}
