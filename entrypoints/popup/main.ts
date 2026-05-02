import { browser } from 'wxt/browser';

type Intensity = 'mild' | 'medium' | 'unhinged';

interface Settings {
  handle: string;
  active: boolean;
  intensity: Intensity;
}

const DEFAULT_SETTINGS: Settings = {
  handle: '',
  active: false,
  intensity: 'medium',
};

const handleInput = requireElement<HTMLInputElement>('handle');
const activeToggle = requireElement<HTMLInputElement>('active');
const intensitySelect = requireElement<HTMLSelectElement>('intensity');
const statusEl = requireElement<HTMLDivElement>('status');

void restoreSettings();

handleInput.addEventListener('input', () => {
  const handle = normalizeHandle(handleInput.value);
  void browser.storage.sync.set({ handle });
  updateStatus(activeToggle.checked, handle);
});

activeToggle.addEventListener('change', () => {
  void browser.storage.sync.set({ active: activeToggle.checked });
  updateStatus(activeToggle.checked, normalizeHandle(handleInput.value));
});

intensitySelect.addEventListener('change', () => {
  void browser.storage.sync.set({ intensity: normalizeIntensity(intensitySelect.value) });
});

async function restoreSettings() {
  const settings = (await browser.storage.sync.get(DEFAULT_SETTINGS)) as Settings;

  handleInput.value = settings.handle;
  activeToggle.checked = settings.active;
  intensitySelect.value = normalizeIntensity(settings.intensity);
  updateStatus(settings.active, settings.handle);
}

function requireElement<TElement extends HTMLElement>(id: string): TElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing #${id} element`);
  return element as TElement;
}

function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@/, '');
}

function normalizeIntensity(value: unknown): Intensity {
  return value === 'mild' || value === 'medium' || value === 'unhinged'
    ? value
    : 'medium';
}

function updateStatus(active: boolean, handle: string) {
  if (!handle) {
    statusEl.textContent = 'Enter your handle to begin';
    statusEl.className = 'status';
  } else if (active) {
    statusEl.textContent = 'Active on twitter.com / x.com';
    statusEl.className = 'status on';
  } else {
    statusEl.textContent = 'Inactive';
    statusEl.className = 'status off';
  }
}
