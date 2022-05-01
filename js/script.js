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

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
    
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  
function generateTitleLinks(customSelector){
  console.log('Title Lists are just generated')
  
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = '';

  /* for each article */
  
    /* get the article id */
  
    /* find the title element */
  
    /* get the title from the title element */
  
    /* create HTML of the link */
  
    /* insert link into titleList */
  
  }
  
  generateTitleLinks();