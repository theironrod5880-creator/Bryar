# Bryar 1.0 — App Starter Files

This is a starter project for building Bryar 1.0: a multi-person chat room with an AI companion, real-person messaging, audio/video calling, and an advertising area.

## What works in this starter
- Responsive chat interface
- Demo messages in the browser
- Camera and microphone permission buttons (local preview only)
- Advertising placeholder
- Starter project structure and build plan

## What is not connected yet
- Real multi-device messaging
- AI model/API
- Live group audio/video calls
- Real advertising network
- User accounts, moderation, and production security

## Try the interface on a computer
From this folder, run:

```bash
python -m http.server 8000 --directory public
```

Then open `http://localhost:8000`.

Camera and microphone access usually requires `localhost` or an HTTPS website.

## Files
- `public/index.html` — page structure
- `public/styles.css` — visual design
- `public/app.js` — demo interactions
- `server/package.json` and `server/server.js` — minimal server health-check starter
- `BUILD_PLAN.md` — development roadmap
