let theme = 'Elmo';
let failColor, passColor;

if (theme === 'Halloween') {
  failColor = '#ff5f5f';
  passColor = '#ffffff';
} else if (theme === 'Elmo') {
  failColor = '#bb0000';
  passColor = '#cc8888';
}

let scoreElements = {};
let tillGradeElements = {};

let subjects = {
  main: [
    {
      subjectNo: 1,
      subject: 'Thai',
      credit: '1.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 2,
      subject: 'Maths',
      credit: '2.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 3,
      subject: 'Science',
      credit: '1.5',
      fullScore: [25, 20, 35],
    },
    {
      subjectNo: 4,
      subject: 'Computer',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 5,
      subject: 'Social Studies',
      credit: '1.0',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 6,
      subject: 'History',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 7,
      subject: 'Buddhism',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 8,
      subject: 'H.E.',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 9,
      subject: 'P.E.',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 10,
      subject: 'Music',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 11,
      subject: 'Dance',
      credit: '0.5',
      fullScore: [40, 20, 20],
    },
    {
      subjectNo: 12,
      subject: 'Work',
      credit: '1.0',
      fullScore: [40, '', 40],
    },
    {
      subjectNo: 13,
      subject: 'English',
      credit: '1.5',
      fullScore: [30, 20, 30],
    },
  ],
  additional: [
    {
      subjectNo: 14,
      subject: 'Additional Science',
      credit: '1.0',
      fullScore: [35, 20, 25],
    },
    {
      subjectNo: 15,
      subject: 'Japanese/Chinese',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 16,
      subject: 'English Read-Write',
      credit: '1.0',
      fullScore: [30, 20, 30],
    },
    {
      subjectNo: 17,
      subject: 'English Writing',
      credit: '0.5',
      fullScore: [30, 20, 30],
    },
  ],
};

const tbody = document.getElementById('tbody');

function generateTable() {
  const mainSubjectsHeader = createSubjectHeader('Main Subjects');
  tbody.appendChild(mainSubjectsHeader);

  Object.entries(subjects.main).forEach((subject) => {
    let tr = createSubjectTr(subject);
    tr.classList.add('mainBg');
    tbody.appendChild(tr);
  });

  const additionalSubjectsHeader = createSubjectHeader('Additional Subjects');
  tbody.appendChild(additionalSubjectsHeader);

  Object.entries(subjects.additional).forEach((subject) => {
    let tr = createSubjectTr(subject);
    tr.classList.add('addBg');
    tbody.appendChild(tr);
  });
}

generateTable();

document.querySelectorAll('td').forEach((td) => {
  if (!td.id) return;

  if (startsWiths(td.id.toLowerCase(), 'premid', 'mid', 'postmid')) {
    scoreElements[td.id] = td;
  } else if (startsWiths(td.id.toLowerCase(), 'tillgrade')) {
    tillGradeElements[td.id] = td;
  }
});

function createSubjectTr(subjectObject) {
  const tr = document.createElement('tr');

  const tdSubjName = document.createElement('td');
  const tdSubjNameText = document.createTextNode(subjectObject[1].subject);
  tdSubjName.appendChild(tdSubjNameText);
  tdSubjName.classList.add('subjName');

  const tdCredit = document.createElement('td');
  const tdCreditText = document.createTextNode(subjectObject[1].credit);
  tdCredit.appendChild(tdCreditText);

  const tdPreMidFull = document.createElement('td');
  const tdPreMidFullText = document.createTextNode(
    subjectObject[1].fullScore[0]
  );
  tdPreMidFull.appendChild(tdPreMidFullText);
  tdPreMidFull.id = `preMidFull${subjectObject[1].subjectNo}`;
  tdPreMidFull.classList.add('full');

  const tdMidFull = document.createElement('td');
  const tdMidFullText = document.createTextNode(subjectObject[1].fullScore[1]);
  tdMidFull.appendChild(tdMidFullText);
  tdMidFull.id = `midFull${subjectObject[1].subjectNo}`;
  tdMidFull.classList.add('full');

  const tdPostMidFull = document.createElement('td');
  const tdPostMidFullText = document.createTextNode(
    subjectObject[1].fullScore[2]
  );

  tdPostMidFull.appendChild(tdPostMidFullText);
  tdPostMidFull.id = `postMidFull${subjectObject[1].subjectNo}`;
  tdPostMidFull.classList.add('full');

  const tdPreMidResult = document.createElement('td');
  tdPreMidResult.id = `preMidResult${subjectObject[1].subjectNo}`;
  tdPreMidResult.classList.add('result');

  const tdMidResult = document.createElement('td');
  tdMidResult.id = `midResult${subjectObject[1].subjectNo}`;
  tdMidResult.classList.add('result');

  const tdPostMidResult = document.createElement('td');
  tdPostMidResult.id = `postMidResult${subjectObject[1].subjectNo}`;
  tdPostMidResult.classList.add('result');

  const tdTillGrade = document.createElement('td');
  tdTillGrade.id = `tillGrade${subjectObject[1].subjectNo}`;
  tdTillGrade.classList.add('grade');

  tr.appendChild(tdSubjName);
  tr.appendChild(tdCredit);

  tr.appendChild(tdPreMidFull);
  tr.appendChild(tdPreMidResult);

  tr.appendChild(tdMidFull);
  tr.appendChild(tdMidResult);

  tr.appendChild(tdPostMidFull);
  tr.appendChild(tdPostMidResult);

  tr.appendChild(tdTillGrade);

  return tr;
}

function createSubjectHeader(text) {
  const tr = document.createElement('tr');

  const td = document.createElement('td');
  const tdText = document.createTextNode(text);

  td.setAttribute('colspan', '9');

  td.classList.add('subjNameHeader');

  if (text === 'Main Subjects') {
    td.classList.add('mainS');
  } else if (text === 'Additional Subjects') {
    td.classList.add('addS');
  }

  td.appendChild(tdText);
  tr.appendChild(td);

  return tr;
}

function calculateTillGrade() {
  Object.entries(tillGradeElements).forEach((element) => {
    let elementNum = extractNum(element[0]);

    if (
      !scoreElements[`preMidResult${elementNum}`].textContent &&
      !scoreElements[`midResult${elementNum}`].textContent &&
      !scoreElements[`postMidResult${elementNum}`].textContent
    )
      return;

    let resultTotal =
      Number(scoreElements[`preMidResult${elementNum}`].textContent) +
      Number(scoreElements[`midResult${elementNum}`].textContent) +
      Number(scoreElements[`postMidResult${elementNum}`].textContent);

    tillGradeElements[`tillGrade${elementNum}`].textContent = 80 - resultTotal;
  });
}

function updateColor() {
  Object.entries(scoreElements).forEach((element) => {
    let scoreType = '';

    if (element[0].toLowerCase().includes('result')) {
      if (element[0].toLowerCase().startsWith('premid')) {
        scoreType = 'preMid';
      } else if (element[0].toLowerCase().startsWith('mid')) {
        scoreType = 'mid';
      } else if (element[0].toLowerCase().startsWith('postmid')) {
        scoreType = 'postMid';
      }

      if (
        Number(element[1].textContent) <
        Number(
          scoreElements[`${scoreType}Full${extractNum(element[0])}`].textContent
        ) *
          0.6
      ) {
        // element[1].style.color = '#bb0000';
        // element[1].style.color = '#eb6123';
        element[1].style.color = '#ff2f2f';
        element[1].style.color = failColor;
      } else {
        // element[1].style.color = '#cc8888';
        // element[1].style.color = '#a389ff';
        // element[1].style.color = '#6fb848';
        element[1].style.color = '#ffffff';
        element[1].style.color = passColor;
      }
    }
  });
}

function startsWiths(str, ...searchStr) {
  for (let i = 0; i < searchStr.length; i++) {
    if (str.startsWith(searchStr[i])) {
      return true;
    }
  }

  return false;
}

function extractNum(str) {
  return Number(str.match(/\d+/));
}

updateColor();

//

const importBtn = document.getElementById('importBtn');
const importInput = document.getElementById('importInput');

importBtn.addEventListener('click', () => {
  importInput.click();
});

importInput.addEventListener('input', importScores);

function importScores() {
  let file = importInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = function (event) {
      scores = JSON.parse(event.target.result).scores;

      for (let i = 0; i < scores.length; i++) {
        let subjNum = scores[i].subjectNo;
        let score = scores[i].score;

        scoreElements[`preMidResult${subjNum}`].textContent = score[0];
        scoreElements[`midResult${subjNum}`].textContent = score[1];
        scoreElements[`postMidResult${subjNum}`].textContent = score[2];
      }

      calculateTillGrade();
      updateColor();
    };

    reader.onerror = function (event) {
      err = event.target.error.message;

      console.error(err);
      alert(err);
    };
  }
}
