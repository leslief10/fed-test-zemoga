/* Variable to determine the current year */
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

async function getSubjects() {
  const res = await fetch('../assets/data.json');
  const info = await res.json();

  const subjects = info.data;


  subjects.forEach(subject => {
    /* Elements already in the HTML file */
    const allSubjectsContainer = document.querySelector('.previous-rulings-container');

    /* Changes the format of the date when each subject was last updated */
    const [date, time] = subject.lastUpdated.split('T');
    const [year, month, day] = date.split('-');
    const lastUpdatedYear = currentYear - year;
    
    /* Gets the totals of votes added to data.json */
    const totalVotes = subject.votes.positive + subject.votes.negative;

    /* Gets the percentage of positive votes */
    const positiveVotesDecimal = ((subject.votes.positive * 100) / totalVotes).toFixed(1);
    const positiveVotesPercentage = Number(positiveVotesDecimal);
    //console.log('positive', positiveVotesPercentage);

    /* Gets the percentage of negative votes */
    const negativeVotesDecimal = ((subject.votes.negative * 100) / totalVotes).toFixed(1);
    const negativeVotesPercentage = Number(negativeVotesDecimal);
    //console.log('negative', negativeVotesPercentage);

    /* Creates the elements to be added to the DOM */
    const subjectContainer = document.createElement('section');
    subjectContainer.classList.add('subject-container');
    subjectContainer.style.background = 
    `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.6) 100%), 
    url('../assets/img/${subject.picture}') center no-repeat`;

    const subjectRuling = document.createElement('span');
    subjectRuling.classList.add('subject--ruling');

    const subjectName = document.createElement('h3');
    subjectName.classList.add('subject--name');
    subjectName.textContent = subject.name;

    const subjectDescription = document.createElement('p');
    subjectDescription.classList.add('subject--description');
    subjectDescription.textContent = subject.description;

    const lastUpdatedAndCategory = document.createElement('p');
    lastUpdatedAndCategory.classList.add('subject--timeframe-category');
    lastUpdatedAndCategory.textContent = `${lastUpdatedYear} year(s) ago in ${subject.category}`;

    const btnUp = document.createElement('button');
    btnUp.classList.add('subject--thumb-up');

    const imgThumbUp= document.createElement('img');
    imgThumbUp.setAttribute('alt', 'Thumb up icon');
    imgThumbUp.setAttribute('src', '../assets/img/thumbs-up.svg');

    const btnDown = document.createElement('button');
    btnDown.classList.add('subject--thumb-down');

    const imgThumbDown= document.createElement('img');
    imgThumbDown.setAttribute('alt', 'Thumb down icon');
    imgThumbDown.setAttribute('src', '../assets/img/thumbs-down.svg');

    const btnSubmitVote = document.createElement('button');
    btnSubmitVote.classList.add('submit-vote');
    btnSubmitVote.textContent = 'Vote Now';
    btnSubmitVote.setAttribute('disabled', '');

    const subjectOpinionProgressBar = document.createElement('div');
    subjectOpinionProgressBar.classList.add('subject--opinion-progress');

    const subjectOpinionPositiveProgressBar = document.createElement('span');
    subjectOpinionPositiveProgressBar.classList.add('progress-positive');

    const subjectOpinionPositiveProgressPercentage = document.createElement('p');
    subjectOpinionPositiveProgressPercentage.classList.add('progress-positive--percentage');
    subjectOpinionPositiveProgressPercentage.textContent = `${positiveVotesPercentage}%`;

    const subjectOpinionNegativeProgressBar = document.createElement('span');
    subjectOpinionNegativeProgressBar.classList.add('progress-negative');

    const subjectOpinionNegativeProgressPercentage = document.createElement('p');
    subjectOpinionNegativeProgressPercentage.classList.add('progress-negative--percentage');
    subjectOpinionNegativeProgressPercentage.textContent = `${negativeVotesPercentage}%`;

    /*Appends each elements to their parent*/

    /*Progress Bar*/
    subjectOpinionNegativeProgressBar.append(imgThumbDown, subjectOpinionNegativeProgressPercentage);
    subjectOpinionPositiveProgressBar.append(imgThumbUp, subjectOpinionPositiveProgressPercentage);
    subjectOpinionProgressBar.append(subjectOpinionPositiveProgressBar, subjectOpinionNegativeProgressBar);

    /*Thumbs-up and thumbs-down buttons*/
    btnDown.appendChild(imgThumbDown);
    btnUp.appendChild(imgThumbUp);

    /*Section where all the elements are located*/
    subjectContainer.append(subjectRuling, subjectName, subjectDescription, lastUpdatedAndCategory, btnUp, btnDown, btnSubmitVote,subjectOpinionProgressBar);

    /*Section where everything will be located in the DOM*/

    allSubjectsContainer.appendChild(subjectContainer);

    /* Determines the overall consensus of the subject as per the percentage of votes */
    if (positiveVotesPercentage >= 50.1) {
      subjectRuling.style.background = 'var(--color-green-positive)';
      subjectRuling.style.content = `url('../assets/img/thumbs-up.svg')`;
    } else {
      subjectRuling.style.background = 'var(--color-yellow-negative)';
      subjectRuling.style.content = `url('../assets/img/thumbs-down.svg')`;
    }

    /* Gets the width of the progress bar container*/
    const widthSubjectOpinionProgressBar = subjectOpinionProgressBar.offsetWidth;

    /* Calculates the width of the positive progress bar */
    const positiveProgressBarWidth =  (widthSubjectOpinionProgressBar * positiveVotesPercentage) / 100;
    //console.log('positive', positiveProgressBarWidth);

    /* Calculates the width of the negative progress bar */
    const negativeProgressBarWidth =  (widthSubjectOpinionProgressBar * negativeVotesPercentage) / 100;
    //console.log('negative', negativeProgressBarWidth);

    /* Modifies the width of the positive and negative progress bars */
    subjectOpinionPositiveProgressBar.style.width = `${positiveProgressBarWidth}px`;
    subjectOpinionNegativeProgressBar.style.width = `${negativeProgressBarWidth}px`;

    /* Event listener for the thumbs-up buttons */
    btnUp.addEventListener('click', () => {
      btnSubmitVote.removeAttribute('disabled');
      btnSubmitVote.classList.add('hover');
    });
    
    /* Event listener for the thumbs-down buttons */
    btnDown.addEventListener('click', () => {
      btnSubmitVote.removeAttribute('disabled');
      btnSubmitVote.classList.add('hover');
    });
  });
}

getSubjects();