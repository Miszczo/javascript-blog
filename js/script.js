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
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
console.log(optTagsListSelector);
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

// GENERATE CALCULATE_TAGS_PARAMS function
function calculateTagsParams(tags){

  const params = {max: 0, min: 999999};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
  }

  return params;
}

calculateTagsParams();

// calculateTagClass FUNCTION
function calculateTagClass(count, params = {max: 0, min: 999999}){
  console.log(calculateTagClass);

  const normalizedCount = count - params.min;
  console.log(normalizedCount);
  const normalizedMax = params.max - params.min;
  console.log(normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  console.log(percentage);
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}
calculateTagClass();

// GENERATE_TAGS FUNCTION
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log(allTags);
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
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag +  '</a></li>';
      /* add generated code to html variable */
      tagsWrapper.innerHTML = tagsWrapper.innerHTML + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){ // eslint-disable-line no-prototype-builtins
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articles.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(tagList);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a class="calculateTagClass(allTags[tag], tagsParams) + " href="#tag-' + tag + '">' + tag + '</a>(' + allTags[tag] + ')</li>';
    console.log(tag);
  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
  console.log(allTagsHTML);
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
  console.log(href);
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

// addClickListenersToTags
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
    let html = '';
    console.log(html);
    /* get author from data-authors attribute */
    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors);
    /*[NOT] split tags into array */

    /*[NOT] START LOOP: for each tag */

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthors + '">' + articleAuthors +  '</a></li>';
    console.log(linkHTML);
    /* add generated code to html variable */
    authorsWrapper.innerHTML = authorsWrapper.innerHTML + linkHTML;
    /* [NOT]END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    articles.innerHTML = html;
  /* END LOOP: for every article: */
  }
}
generateAuthors();

// AUTHOR_CLICK_HANDLER FUNCTION
function authorClickHandler(event){
  console.log(authorClickHandler);
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  /* make a new constant "hrefAuthor" and read the attribute "href" of the clicked element */
  const hrefAuthor = clickedElement.getAttribute('href');
  console.log(hrefAuthor);
  /* make a new constant "author" and extract tag from the "hrefAuthor" constant */
  const author = hrefAuthor.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);
  /* START LOOP: for each active tag link */
  for(let activeAuthorLink of activeAuthorLinks){
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    console.log(activeAuthorLink);
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "hrefAuthor" constant */
  const hrefAuthorLinks = document.querySelectorAll('a[href="' + hrefAuthor + '"]');
  console.log(hrefAuthorLinks);
  /* START LOOP: for each found author link */
  for(let foundAuthorLink of hrefAuthorLinks){
    /* add class active */
    foundAuthorLink.classList.add('active');
    console.log(foundAuthorLink);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author +'"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const linksToAuthors = document.querySelectorAll('.post-author a, .list.authors a');
  /* START LOOP: for each link */
  for(let link of linksToAuthors){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
