import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/fetchImages";


const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const searchBtnRef = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more');
const closeBtn = document.querySelector('.closed-btn');
console.log(closeBtn);


let page = 1;
let per_page = 40;

