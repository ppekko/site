// Wait for the page to finish loading
window.addEventListener('load', () => {
  // Get the wave element
  const wave = document.querySelector('.wave');

  // If the wave element was found
  if (wave) {
    // Get the text content
    const text = wave.textContent;

    // Create an array of letters
    const letters = text.split('');

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
  } else {
    // If the wave element was not found
    console.error('Wave element not found!');
  }
});
