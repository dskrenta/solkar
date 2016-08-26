import { parse, loadDOM } from './scrapper';

async function getEarnings (url) {
  try {
    const $ = await loadDOM(url);
    let logo = await parse($);
    console.log(logo);
  } catch (error) {
    console.log(error);
  }
}

getEarnings('http://harvix.com/about');
