'use strict';

function titleClickHandler(){
  console.log('Link was clicked!');
  console.log(event);
   

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);{
    clickedElement.classList.add('active');
  }


  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('Article is visible');

}
    
const optArticleSelector = '.post', /* articles */
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  
function generateTitleLinks(){
  console.log('Title Lists are just generated');
  
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  for (let article of articles){
  /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
  
    /* [DONE] find the title element */
    /* [DONE[ get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('HTML link created');
    
    /* [DONE] insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles finding');

  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags); 
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag)
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#-' + tag + '">' + tag + '</a></li>';
      html = html + linkHTML;
      console.log(html)
      /* add generated code to html variable */
    }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }

}

generateTags();