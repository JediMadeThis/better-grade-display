let inputElements = {};
let subjectList = {
  main: {
    1: 'Thai',
    2: 'Maths',
    3: 'Science',
    4: 'Computer',
    5: 'Social Studies',
    6: 'History',
    7: 'Buddhism',
    8: 'H.E.',
    9: 'P.E.',
    10: 'Music',
    11: 'Dance',
    12: 'Work',
    13: 'English',
  },
  additional: {
    14: 'Additional Science',
    15: 'Japansese/Chinese',
    16: 'English Read-Write',
    17: 'English Writing',
  },
};

const tbody = document.getElementById('tbody');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

function generateTable() {
  const mainSubjectsHeader = createSubjectHeader('Main Subjects');
  tbody.appendChild(mainSubjectsHeader);

  Object.entries(subjectList.main).forEach((subject) => {
    const tr = createSubjectTr(subject);
    tbody.appendChild(tr);
  });

  const addtionalSubjectsHeader = createSubjectHeader('Additional Subjects');
  tbody.appendChild(addtionalSubjectsHeader);

  Object.entries(subjectList.additional).forEach((subject) => {
    const tr = createSubjectTr(subject);
    tbody.appendChild(tr);
  });
}

generateTable();

function createSubjectTr(subjectObject) {
  const tr = document.createElement('tr');

  const tdSubjName = document.createElement('td');
  const tdSubjNameText = document.createTextNode(subjectObject[1]);

  tdSubjName.appendChild(tdSubjNameText);
  tdSubjName.classList.add('subjName');

  const tdPreMid = document.createElement('td');
  tdPreMid.classList.add('inputTd');
  const inputPreMid = document.createElement('input');
  inputPreMid.type = 'number';
  inputPreMid.id = `preMidInput${subjectObject[0]}`;
  inputPreMid.classList.add('input');
  tdPreMid.appendChild(inputPreMid);

  const tdMid = document.createElement('td');
  tdMid.classList.add('inputTd');
  const inputMid = document.createElement('input');
  inputMid.type = 'number';
  inputMid.id = `midInput${subjectObject[0]}`;
  inputMid.classList.add('input');
  tdMid.appendChild(inputMid);

  const tdPostMid = document.createElement('td');
  tdPostMid.classList.add('inputTd');
  const inputPostMid = document.createElement('input');
  inputPostMid.type = 'number';
  inputPostMid.id = `postMidInput${subjectObject[0]}`;
  inputPostMid.classList.add('input');
  tdPostMid.appendChild(inputPostMid);

  tr.appendChild(tdSubjName);

  tr.appendChild(tdPreMid);
  tr.appendChild(tdMid);
  tr.appendChild(tdPostMid);

  return tr;
}

function createSubjectHeader(text) {
  const tr = document.createElement('tr');

  const td = document.createElement('td');
  const tdText = document.createTextNode(text);

  td.setAttribute('colspan', '9');
  td.classList.add('subjNameHeader');

  td.appendChild(tdText);
  tr.appendChild(td);

  return tr;
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

let preMidInputs = {};
let midInputs = {};
let postMidInputs = {};

const resultCode = document.getElementById('resultCode');

document.querySelectorAll('input').forEach((input) => {
  if (!input.id) return;

  if (startsWiths(input.id.toLowerCase(), 'premid', 'mid', 'postmid')) {
    inputElements[input.id] = input;
  }

  if (startsWiths(input.id.toLowerCase(), 'premid')) {
    preMidInputs[input.id] = input;
  } else if (startsWiths(input.id.toLowerCase(), 'mid')) {
    midInputs[input.id] = input;
  } else if (startsWiths(input.id.toLowerCase(), 'postmid')) {
    postMidInputs[input.id] = input;
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(generateJson());
  alert('Copied code to clipboard!');
});

downloadBtn.addEventListener('click', () => {
  let textToSave = generateJson();
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'scores.json';
  hiddenElement.click();
});

function generateJson() {
  let result = {
    scores: [],
  };

  let newSubjectList = Object.assign(
    {},
    subjectList.main,
    subjectList.additional
  );

  Object.entries(newSubjectList).forEach((subject) => {
    let current = {};
    let scores = [];

    current.subjectNo = Number(subject[0]);
    current.subject = subject[1];

    scores[0] = Number(preMidInputs[`preMidInput${subject[0]}`].value) || null;
    scores[1] = Number(midInputs[`midInput${subject[0]}`].value) || null;
    scores[2] =
      Number(postMidInputs[`postMidInput${subject[0]}`].value) || null;

    current.score = scores;

    result.scores.push(current);
  });

  return JSON.stringify(result);
}
