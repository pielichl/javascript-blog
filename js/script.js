'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('link was clicked!');
  console.log(event);
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('', articleSelector);
  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('', targetArticle);
  /*[IN PROGRESS] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';


function generateTitleLinks(customSelector = ''){
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector (optTitleListSelector);
  document.querySelector(optTitleListSelector).innerHTML ='';
  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*[DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags){
  /* Set const params */
  const params = {
    max:0,
    min:999999,
  };
  /* START LOOP: for evry tag: */
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    /* Set params.max */
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    /* set params.min */
    if(tags[tag] < params.min){
      params.max = tags[tag];
    }
  /* END LOOP: for each tag */
  }
  return params;
}

/* Add a function calculateTagClass */
function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  console.log('count:', count);

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */ 
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log('tag:', tag);
      /* generate HTML of the link */
      let LinkHTMLtag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('LinkHTMLtag:', LinkHTMLtag);
      /* add generated code to html variable */
      html = html + LinkHTMLtag;
      console.log('html:', html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){ /* dlaczego podkreśla błąd? */
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('tagsWrapper:', tagsWrapper);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] call a function calculateTagsParams(allTags) to find min and max use of all tags */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create var for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags){
    /* [NEW generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
    console.log('allTagsHTML:', allTagsHTML);
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault('');
  console.log('tag was clicked!');
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagActiveLink of tagActiveLinks){
    /* remove class active */
    tagActiveLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsAll = document.querySelectorAll('a [href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagAll of tagsAll){
    /* add class active */
    tagAll.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagsAll = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagAll of tagsAll){
    /* add tagClickHandler as event listener for that link */
    tagAll.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

function calculateAuthorsParams(authors){
  /* Set const params */
  const authorsParams = {
    max: 0, 
    min: 999999,
  };
  /* START LOOP: for every author: */
  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');
    /* Set params.max */
    if(authors[author] > authorsParams.max){
      authorsParams.max = authors[author];
    }
    /* Set params.min */
    if(authors[author] < authorsParams.min){
      authorsParams.max = authors[author];
    }
  /* END LOOP: for each author */
  }
  return authorsParams; 
}

/* Add z function calculateAuthorClass */
function calculateAuthorClass(count, authorsParams){

  const normalizedCount = count - authorsParams.min;
  console.log('count:', count);

  const normalizedMax = authorsParams.max - authorsParams.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function generateAuthors(){
  /* Create new variable allAuthors with an empty array */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    /* generate a link */
    let linkHTMLAuthor = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    /* insert HTML */
    html = html + linkHTMLAuthor;
    /* Check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(author)){
      /* Add author to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* Insert HTML of all the links into authors wrapper */
    authorWrapper.innerHTML = html;
    console.log('authorWrapper:', authorWrapper);
    /* END LOOP: for every article */
  }
  /* Find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  /* call a function calculateAuthorsParams */
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:',authorsParams);
  /* Create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* START LOOP: for each author in allAuthors */
  for (let author in allAuthors){
    /* generate HTML and add to allAuthorsHTML */
    const linkAuthorsHTML = '<li><a href="#author-' + author + '" class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '">' + author + '</a></li>';
    allAuthorsHTML += linkAuthorsHTML;
    console.log('allAuthorsHTML;', allAuthorsHTML);
    /* END LOOP: for each author in allAuthors: */
  }
  /* add html from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
}

function AuthorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault('');
  console.log('author was clicked!');
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for(let authorActiveLink of authorActiveLinks){
    /* remove class active */
    authorActiveLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorsAll = document.querySelectorAll('a [href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let authorAll of authorsAll){
    /* add class active */
    authorAll.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const authorsAll = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let authorAll of authorsAll){
    /* add authorClickHandler as event listener for that link */
    authorAll.addEventListener('click', AuthorClickHandler);
  /* END LOOP: for each link */
  }
}


generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();