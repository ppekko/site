window.addEventListener('load', () => {
  // Get the wave element
  const wave = document.querySelector('.wave');

  // If the wave element was found
  if (wave) {
    // Fetch the MOTD (Message of the Day) from motd.txt
    fetch('/motd.txt')
      .then(response => response.text())
      .then(data => {
        // Split the text into lines
        const lines = data.split('\n');
        // Pick a random line
        const randomIndex = Math.floor(Math.random() * lines.length);
        const randomLine = lines[randomIndex];

        // Check if the random line is the 13th line
        const isLine13 = randomIndex === 12;

        // Create a function to wrap the letters and set the wave content
        const wrapAndSetText = () => {
          // Create an array of letters from the random line
          const letters = randomLine.split('');

          // Wrap each letter in a span tag
          const wrappedText = letters.map((letter) => {
            if (letter === ' ') {
              // If the current letter is a space, add a non-breaking space instead
              return '<span>&nbsp;</span>';
            } else {
              return `<span>${letter}</span>`;
            }
          });

          // Set the wrapped text as the new content of the wave element
          wave.innerHTML = wrappedText.join('');

          // Get all the letter spans
          const letterSpans = wave.querySelectorAll('span');

          // Set the animation delay for each letter
          letterSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.1}s`;
          });
        };

        // If the random line is the 13th line, wait for 2 seconds before setting the text
        if (isLine13) {
          setTimeout(wrapAndSetText, 2000);
        } else {
          wrapAndSetText();
        }
      })
      .catch(error => {
        console.error('Error fetching MOTD:', error);
      });
  } else {
    // If the wave element was not found
    console.error('Wave element not found!');
  }
});
