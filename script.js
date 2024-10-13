let scoreElements = {};

document.querySelectorAll('td').forEach((td) => {
  if (!td.id) return;

  if (startsWiths(td.id.toLowerCase(), 'premid', 'mid', 'postmid', 'final')) {
    scoreElements[td.id] = td;
  }
});

Object.entries(scoreElements).forEach((element) => {
  if (
    startsWiths(
      element[0].toLowerCase(),
      'premidresult',
      'midresult',
      'postmidresult',
      'finalresult'
    )
  ) {
    element[1].style.background = '#ffffff';
  }
});

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
      } else if (element[0].toLowerCase().startsWith('final')) {
        scoreType = 'final';
      }

      if (
        Number(element[1].textContent) <
        Number(
          scoreElements[`${scoreType}Full${extractNum(element[0])}`].textContent
        ) *
          0.6
      ) {
        element[1].style.color = '#aa0000';
      } else {
        element[1].style.color = '#cc8888';
      }
    }
  });
}

function setFullFinals() {
  Object.entries(scoreElements).forEach((element) => {
    if (
      startsWiths(
        element[0].toLowerCase(),
        'premidfull',
        'midfull',
        'postmidfull'
      )
    ) {
    }

    let result = 0;
    let elementNum = extractNum(element[0]);

    console.log(
      Number(scoreElements[`preMidFull${elementNum}`].textContent),
      Number(scoreElements[`midFull${elementNum}`].textContent),
      Number(scoreElements[`postMidFull${elementNum}`].textContent)
    );

    result =
      100 -
      Number(scoreElements[`preMidFull${elementNum}`].textContent) -
      Number(scoreElements[`midFull${elementNum}`].textContent) -
      Number(scoreElements[`postMidFull${elementNum}`].textContent);

    scoreElements[`finalFull${elementNum}`].textContent = result;
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

setFullFinals();
updateColor();
