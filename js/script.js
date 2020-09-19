'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }
  /* [DONE]add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
  }
  /* [DONE]get 'href' attribute from the clicked link */
  const getHref = clickedElement.getAttribute("href");
  console.log(getHref);
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(getHref);
  console.log(correctArticle);
  /* [DONE]add class 'active' to the correct article */
  correctArticle.classList.add('active');
}

// OPTIONS
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
// generateTitleLinks function
function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  let html = '';

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute("id");
    console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    const titleListLinkHTML = titleList.insertAdjacentHTML("beforeend", linkHTML);
    console.log(titleListLinkHTML);
  }

  console.log(html);


  const links = document.querySelectorAll('.titles a');
  console.log(links)

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
