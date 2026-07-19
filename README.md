# A Free Saturday

A framework-free, static behavioural-study pilot. Serve this directory over HTTP (JSON configuration cannot be loaded from a `file://` URL).

The exposure phase is a freely explored pixel-art living room. Participants click or tap any open area to move an abstract avatar, or select an object to approach and use it. Everyday information objects include a phone, television, newspaper, laptop, magazine, speaker, mail, package, book, and tablet. The first six distinct information objects deliver a seeded, balanced queue of three relevant and three irrelevant claims; filler objects never contain claims.

```sh
npm test
npm run serve
```

Open `http://localhost:4173/` for the participant experience, or append `?debug=true` for assignment inspection, navigation, seed controls, and JSON export. A fixed seed can be supplied with `?seed=example`.

Editable study material lives in `settings.json`, `claims.json`, `scenes.json`, and `room.json`. The shared exposure label is configured in `room.json`; every target claim uses the same body component without object-specific surrounding prose. During use, the app sends `{ type: "free-saturday-resize", height }` to support iframe resizing. At completion, it sends `{ type: "free-saturday-complete", result }` with `window.parent.postMessage`, and provides a local download when it is not embedded.
