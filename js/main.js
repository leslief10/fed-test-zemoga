//import info from "../assets/data.json" assert { type: "json" };
import { data } from "./data.js";
const subjects = data;

/* Variable to determine the current year */
const currentDate = new Date();
const currentYear = currentDate.getFullYear();


function getSubjects() {
  subjects.forEach(subject => {
    /* Elements already in the HTML file */
    const allSubjectsContainer = document.querySelector('.previous-rulings-container');

    /* Changes the format of the date when each subject was last updated */
    const [date, time] = subject.lastUpdated.split('T');
    const [year, month, day] = date.split('-');
    const lastUpdatedYear = currentYear - year;
    
    /* Gets the totals of votes added to data.json */
    let totalVotes = subject.votes.positive + subject.votes.negative;

    /* Gets the percentage of positive votes */
    let positiveVotesDecimal = ((subject.votes.positive * 100) / totalVotes).toFixed(1);
    let positiveVotesPercentage = Number(positiveVotesDecimal);

    /* Gets the percentage of negative votes */
    let negativeVotesDecimal = ((subject.votes.negative * 100) / totalVotes).toFixed(1);
    let negativeVotesPercentage = Number(negativeVotesDecimal);


    /* Creates the elements to be added to the DOM */
    const subjectContainer = document.createElement('section');
    const subjectRuling = document.createElement('span');
    const subjectName = document.createElement('h3');
    const subjectDescription = document.createElement('p');
    const lastUpdatedAndCategory = document.createElement('p');
    const btnUp = document.createElement('button');
    const btnDown = document.createElement('button');
    const btnSubmitVote = document.createElement('button');
    const subjectOpinionProgressBar = document.createElement('div');
    const subjectOpinionPositiveProgressBar = document.createElement('span');
    const imgThumbUp= document.createElement('img');
    const subjectOpinionPositiveProgressPercentage = document.createElement('p');
    const subjectOpinionNegativeProgressBar = document.createElement('span');
    const imgThumbDown= document.createElement('img');
    const subjectOpinionNegativeProgressPercentage = document.createElement('p');

    /* Adds classes to the elements */
    subjectContainer.classList.add('subject-container');
    subjectRuling.classList.add('subject--ruling');
    subjectName.classList.add('subject--name');
    subjectDescription.classList.add('subject--description');
    lastUpdatedAndCategory.classList.add('subject--timeframe-category');
    btnUp.classList.add('subject--thumb-up');
    btnDown.classList.add('subject--thumb-down');
    btnSubmitVote.classList.add('submit-vote');
    subjectOpinionProgressBar.classList.add('subject--opinion-progress');
    subjectOpinionPositiveProgressBar.classList.add('progress-positive');
    subjectOpinionPositiveProgressPercentage.classList.add('progress-positive--percentage');
    subjectOpinionNegativeProgressBar.classList.add('progress-negative');
    subjectOpinionNegativeProgressPercentage.classList.add('progress-negative--percentage');

    /*Adds attributes */
    imgThumbUp.setAttribute('alt', 'Thumb up icon');
    imgThumbUp.setAttribute('src', '../assets/img/thumbs-up.svg');
    imgThumbDown.setAttribute('alt', 'Thumb down icon');
    imgThumbDown.setAttribute('src', '../assets/img/thumbs-down.svg');
    btnSubmitVote.setAttribute('disabled', '');

    /* Adds text */
    subjectName.textContent = subject.name;
    subjectDescription.textContent = subject.description;
    lastUpdatedAndCategory.textContent = `${lastUpdatedYear} year(s) ago in ${subject.category}`;
    btnSubmitVote.textContent = 'Vote Now';
    subjectOpinionPositiveProgressPercentage.textContent = `${positiveVotesPercentage}%`;
    subjectOpinionNegativeProgressPercentage.textContent = `${negativeVotesPercentage}%`;

    /* Adds extra stylings */
    if (window.innerWidth >= 1440) {
      subjectContainer.style.background =
      `linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888 27%, #666 50%, rgba(51, 51, 51, 0.6) 71.88%),
      url("../assets/img/${subject.picture}") left center no-repeat`;
    } else if (window.innerWidth >= 768) {
      subjectContainer.style.background =
      `linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888 19.79%, #666 50%, rgba(51, 51, 51, 0.6) 71.88%),
      url("../assets/img/${subject.picture}") left center no-repeat`;
      subjectContainer.style.backgroundSize = 'contain';
    } else {
      subjectContainer.style.background = 
      `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.6) 100%), 
      url('../assets/img/${subject.picture}') center no-repeat`;
    }

    /*Appends each elements to their parent*/

    /*Progress Bar*/
    subjectOpinionNegativeProgressBar.append(imgThumbDown, subjectOpinionNegativeProgressPercentage);
    subjectOpinionPositiveProgressBar.append(imgThumbUp, subjectOpinionPositiveProgressPercentage);
    subjectOpinionProgressBar.append(subjectOpinionPositiveProgressBar, subjectOpinionNegativeProgressBar);

    /*Section where all the elements are located*/
    subjectContainer.append(subjectRuling, subjectName, subjectDescription, lastUpdatedAndCategory, btnUp, btnDown, btnSubmitVote,subjectOpinionProgressBar);

    /*Section where everything will be located in the DOM*/
    allSubjectsContainer.appendChild(subjectContainer);


    /* Determines the overall consensus of the subject as per the percentage of votes */
    const ruling = () => {
      if (positiveVotesPercentage >= 50.1) {
        subjectRuling.style.background = 'var(--color-green-positive)';
        subjectRuling.style.content = `url('../assets/img/thumbs-up.svg')`;
      } else {
        subjectRuling.style.background = 'var(--color-yellow-negative)';
        subjectRuling.style.content = `url('../assets/img/thumbs-down.svg')`;
      }
    }
    ruling();

    /* Gets the width of the progress bar container*/
    const widthSubjectOpinionProgressBar = subjectOpinionProgressBar.offsetWidth;

    /* Calculates the width of the positive progress bar */
    const positiveProgressBarWidth = () => (widthSubjectOpinionProgressBar * positiveVotesPercentage) / 100;
    positiveProgressBarWidth();

    /* Calculates the width of the negative progress bar */
    const negativeProgressBarWidth = () => (widthSubjectOpinionProgressBar * negativeVotesPercentage) / 100;
    negativeProgressBarWidth();

    /* Modifies the width of the positive and negative progress bars */
    subjectOpinionPositiveProgressBar.style.width = `${positiveProgressBarWidth()}px`;
    subjectOpinionNegativeProgressBar.style.width = `${negativeProgressBarWidth()}px`;

    /* Enables the btnSubmitVote*/
    function enableBtnSubmitVote(e) {
      e.stopPropagation();

      if (btnSubmitVote.disabled = true) {
        btnSubmitVote.removeAttribute('disabled');
        btnSubmitVote.classList.add('hover')
      } 

      e.target.value = 1;      
    }

    /* Submits votes and updates all the information in the DOM*/
    function submitVote() {
      if (btnUp.value === '1') {
        btnSubmitVote.value = 1;
        const vote = Number(btnSubmitVote.value);

        /* Updates the votes */
        subject.votes.positive + vote;
        totalVotes++;
        positiveVotesPercentage++;
        negativeVotesPercentage--;

        /* Updates the width of the progress bars*/
        positiveProgressBarWidth();
        negativeProgressBarWidth();

        /* Updates the styles on the page with the changes */
        subjectOpinionPositiveProgressPercentage.textContent = `${positiveVotesPercentage}%`
        subjectOpinionNegativeProgressPercentage.textContent = `${negativeVotesPercentage}%`;
        subjectOpinionPositiveProgressBar.style.width = `${positiveProgressBarWidth()}px`;
        subjectOpinionNegativeProgressBar.style.width = `${negativeProgressBarWidth()}px`;
        lastUpdatedAndCategory.textContent = `Thank you for your vote!`;
        btnSubmitVote.textContent = 'Vote Again';  
        ruling();
      }

      if(btnDown.value === '1') {
        btnSubmitVote.value = 1;
        const vote = Number(btnSubmitVote.value);

        /* Updates the votes */
        subject.votes.negative + vote;
        totalVotes++;
        negativeVotesPercentage++;
        positiveVotesPercentage--;    
        
        /* Updates the width of the progress bars*/
        negativeProgressBarWidth(); 
        positiveProgressBarWidth();  

        /* Updates the styles on the page with the changes */
        subjectOpinionNegativeProgressPercentage.textContent = `${negativeVotesPercentage}%`;
        subjectOpinionPositiveProgressPercentage.textContent = `${positiveVotesPercentage}%`
        subjectOpinionNegativeProgressBar.style.width = `${negativeProgressBarWidth()}px`;     
        subjectOpinionPositiveProgressBar.style.width = `${positiveProgressBarWidth()}px`;             
        lastUpdatedAndCategory.textContent = `Thank you for your vote!`;
        btnSubmitVote.textContent = 'Vote Again';
        ruling();
      }

      /* Resets the value of the buttons */
      if (btnSubmitVote.value === '1') {
        btnUp.value = '';
        btnDown.value = '';
        btnSubmitVote.value = '';
      }
    }

    btnUp.addEventListener('click', enableBtnSubmitVote);
    btnDown.addEventListener('click', enableBtnSubmitVote);
    btnSubmitVote.addEventListener('click', submitVote);
  });
}

getSubjects();