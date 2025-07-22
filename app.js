const textDisplay = document.getElementById('text-display');
    const inputArea = document.getElementById('input-area');
    const timerDisplay = document.getElementById('timer');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const nextBtn = document.getElementById('next-btn');
    const levelSelect = document.getElementById('level');

    const texts = {
      easy: [
                "Typing speed increases with regular practice.",
        "JavaScript lets you add interactivity to websites.",
        "You should learn HTML, CSS, and JavaScript together.",
        "Debugging is part of every developer's life.",
        "Accuracy is more important than speed initially."
      ],
      medium: [
       "JavaScript supports closures, hoisting, promises, and async functions.",
        "Consistent keyboard practice helps build muscle memory efficiently.",
        "Responsive design requires flexible layouts using media queries and units.",
        "Efficient algorithms and clean code improve web performance drastically.",
        "Asynchronous JavaScript and event loops can be tricky but powerful tools."
      ],
      hard: [
     "The quick brown fox jumps over the lazy dog efficient algorithms and clean code improve web performance drast",
     "Pack my box with five dozen liquor jugs the quick brown fox jumps over the lazy dog.",
  "How vexingly quick daft zebras jump the quick brown fox jumps over the lazy dog.",
 "Jackdaws love my big sphinx of quartz the quick brown fox jumps over the lazy dog.",
"The five boxing wizards jump quickly the quick brown fox jumps over the lazy dog." 
      ]
    };

    let originalText = "";
    let timeLimit = 60;
    let timer = timeLimit;
    let timerInterval;
    let totalTyped = 0;
    let mistakes = 0;
    let testStarted = false;

    function getRandomSentence(level) {
      const list = texts[level] || texts.easy;
      return list[Math.floor(Math.random() * list.length)];
    }

    function loadText() {
      const selectedLevel = levelSelect.value;
      originalText = getRandomSentence(selectedLevel);
      textDisplay.innerText = originalText;
      textDisplay.classList.remove("end");
      inputArea.value = '';
      inputArea.disabled = false;
      timer = timeLimit;
      timerDisplay.innerText = timer;
      wpmDisplay.innerText = '0';
      accuracyDisplay.innerText = '0';
      totalTyped = 0;
      mistakes = 0;
      clearInterval(timerInterval);
      nextBtn.style.display = 'none';
      testStarted = false;
    }

    function updateTimer() {
      timer--;
      timerDisplay.innerText = timer;

      let words = inputArea.value.trim().split(/\s+/).length;
      let wpm = Math.round((words / (timeLimit - timer)) * 60) || 0;
      wpmDisplay.innerText = wpm;

      compareText(inputArea.value);

      if (timer <= 0) {
        clearInterval(timerInterval);
        finishTyping("⏰ Time's up!");
      }
    }

    function compareText(typedText) {
      const expected = originalText.slice(0, typedText.length);
      if (typedText !== expected) {
        mistakes++;
      }

      const accuracy = totalTyped === 0 ? 0 : Math.round(((totalTyped - mistakes) / totalTyped) * 100);
      accuracyDisplay.innerText = accuracy;
    }

    function checkCompletion() {
      const typedText = inputArea.value;
      if (typedText === originalText) {
        clearInterval(timerInterval);
        finishTyping("🎉 Finished early!");
      }
    }

    function finishTyping(message) {
      inputArea.disabled = true;
      textDisplay.innerText = message;
      textDisplay.classList.add("end");
      nextBtn.style.display = 'inline-block';
      testStarted = false;

      let elapsedTime = timeLimit - timer;
      let words = inputArea.value.trim().split(/\s+/).length;
      let wpm = Math.round((words / elapsedTime) * 60) || 0;
      wpmDisplay.innerText = wpm;

      const accuracy = totalTyped === 0 ? 0 : Math.round(((totalTyped - mistakes) / totalTyped) * 100);
      accuracyDisplay.innerText = accuracy;
    }

    inputArea.addEventListener('input', () => {
      if (!testStarted) {
        timerInterval = setInterval(updateTimer, 1000);
        testStarted = true;
      }
      totalTyped = inputArea.value.length;
      checkCompletion();
    });

    // Load the first sentence on page load
    loadText();