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
  const getHref = clickedElement.getAttribute('href');
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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author';
// generateTitleLinks function
function generateTitleLinks(customSelector = ''){
  console.log(generateTitleLinks);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(optArticleSelector);
  console.log(customSelector);

  let html = '';

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    const titleListLinkHTML = titleList.insertAdjacentHTML('beforeend', linkHTML);
    console.log(titleListLinkHTML);
  }
  console.log(html);
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

// GENERATE_TAGS FUNCTION
function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for( let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag' + articleTagsArray + '">' + tag +  '</a></li>';

      /* add generated code to html variable */
      tagsWrapper.innerHTML = tagsWrapper.innerHTML + linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articles.innerHTML = html;
  /* END LOOP: for every article: */
  }
}
generateTags();

// TAG_CLICK_HANDLER FUNCTION
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
    console.log(activeTagLink);
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefTagLinks);
  /* START LOOP: for each found tag link */
  for(let foundTagLink of hrefTagLinks){
    /* add class active */
    foundTagLink.classList.add('active');
    console.log(foundTagLink);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('.post-tags a, .list.tags a');
  console.log(linksToTags);
  /* START LOOP: for each link */
  for(let link of linksToTags){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


// GENERATE_AUTHORS FUNCTION
function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);
    /* make html variable with empty string */
    // let html = '';
    /* get author from data-authors attribute */
    const articleAuthors
    /*[NOT] split tags into array */


    /*[NOT] START LOOP: for each tag */

    /*[NOT][NOT] generate HTML of the link */

    /* [NOT]add generated code to html variable */

    /* [NOT]END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }
}
generateAuthors();


// AUTHOR_CLICK_HANDLER FUNCTION
function authorClickHandler(event){
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */


  /* START LOOP: for each active tag link */

    /* remove class active */


  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */


  /* START LOOP: for each found tag link */

    /* add class active */


  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}


function addClickListenersToAuthors(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}
addClickListenersToAuthors();
