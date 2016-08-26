import { parse, loadDOM } from './scrapper';

async function getData (url) {
  try {
    const $ = await loadDOM(url);
    let logo = await parse($);
    console.log(logo);
  } catch (error) {
    console.log(error);
  }
}

getData('http://harvix.com/about');
