const form = document.querySelector('#chatForm');
const input = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');
const cameraBtn = document.querySelector('#cameraBtn');
const micBtn = document.querySelector('#micBtn');
const localVideo = document.querySelector('#localVideo');
let cameraStream = null;
let micStream = null;

function addMessage(name, text, isBryar = false) {
  const article = document.createElement('article');
  article.className = `message${isBryar ? ' bryar' : ''}`;
  const avatar = document.createElement('div');
  avatar.className = `avatar${isBryar ? '' : ' person'}`;
  avatar.textContent = isBryar ? 'B' : 'Y';
  const body = document.createElement('div');
  const speaker = document.createElement('p');
  speaker.className = 'speaker';
  speaker.textContent = name;
  const content = document.createElement('p');
  content.textContent = text;
  body.append(speaker, content);
  article.append(avatar, body);
  messages.append(article);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addMessage('You · local demo', value);
  input.value = '';
});

document.querySelector('#inviteBtn').addEventListener('click', async () => {
  const invite = 'Join my Bryar 1.0 room (demo — live invitations are not connected yet).';
  try {
    if (navigator.share) await navigator.share({ title: 'Bryar 1.0', text: invite });
    else if (navigator.clipboard) { await navigator.clipboard.writeText(invite); alert('Demo invitation text copied.'); }
    else alert(invite);
  } catch (error) { if (error.name !== 'AbortError') alert(invite); }
});

cameraBtn.addEventListener('click', async () => {
  try {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
      localVideo.srcObject = null;
      localVideo.hidden = true;
      cameraBtn.textContent = 'Turn camera on';
      return;
    }
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    localVideo.srcObject = cameraStream;
    localVideo.hidden = false;
    cameraBtn.textContent = 'Turn camera off';
  } catch (error) {
    alert('Camera access was unavailable. Use localhost or HTTPS and allow camera permission.');
  }
});

micBtn.addEventListener('click', async () => {
  try {
    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
      micStream = null;
      micBtn.textContent = 'Turn microphone on';
      return;
    }
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micBtn.textContent = 'Turn microphone off';
    alert('Microphone permission is enabled for this local demo. It is not transmitting audio to other people.');
  } catch (error) {
    alert('Microphone access was unavailable. Use localhost or HTTPS and allow microphone permission.');
  }
});

window.addEventListener('beforeunload', () => {
  [cameraStream, micStream].filter(Boolean).forEach(stream => stream.getTracks().forEach(track => track.stop()));
});
