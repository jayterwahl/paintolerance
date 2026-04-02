(function () {
  const handleInput = document.getElementById('handle');
  const activeToggle = document.getElementById('active');
  const intensitySelect = document.getElementById('intensity');
  const statusEl = document.getElementById('status');

  // Load saved settings
  chrome.storage.sync.get(
    { handle: '', active: false, intensity: 'medium' },
    (settings) => {
      handleInput.value = settings.handle;
      activeToggle.checked = settings.active;
      intensitySelect.value = settings.intensity;
      updateStatus(settings.active, settings.handle);
    }
  );

  // Save on change
  handleInput.addEventListener('input', () => {
    const handle = normalizeHandle(handleInput.value);
    chrome.storage.sync.set({ handle });
    updateStatus(activeToggle.checked, handle);
  });

  activeToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ active: activeToggle.checked });
    updateStatus(activeToggle.checked, normalizeHandle(handleInput.value));
  });

  intensitySelect.addEventListener('change', () => {
    chrome.storage.sync.set({ intensity: intensitySelect.value });
  });

  function normalizeHandle(raw) {
    return raw.trim().replace(/^@/, '');
  }

  function updateStatus(active, handle) {
    if (!handle) {
      statusEl.textContent = 'Enter your handle to begin';
      statusEl.className = 'status';
    } else if (active) {
      statusEl.textContent = 'Yapping on twitter.com / x.com';
      statusEl.className = 'status on';
    } else {
      statusEl.textContent = 'Inactive';
      statusEl.className = 'status off';
    }
  }
})();
