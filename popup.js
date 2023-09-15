document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', function() {
      chrome.runtime.sendMessage({ command: 'toggle' });
    })
});

document.addEventListener('DOMContentLoaded', function() {
  const sliderInput = document.getElementById('slider-input');
  const sliderValueDisplay = document.getElementById('slider-value-display');

  chrome.storage.sync.get('selectedValue', function(data) {
    const selectedValue = data.selectedValue;
    if (selectedValue) {
      sliderInput.value = selectedValue;
      sliderValueDisplay.textContent = selectedValue;
      chrome.runtime.sendMessage({ command: 'speedChange', rate: selectedValue});
    }
  });

  sliderInput.addEventListener('input', function() {
    const selectedValue = sliderInput.value;
    sliderValueDisplay.textContent = selectedValue;
    chrome.storage.sync.set({ selectedValue: selectedValue });
    chrome.runtime.sendMessage({ command: 'speedChange', rate: selectedValue});
  });
});
