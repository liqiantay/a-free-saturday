# Hosting and Qualtrics setup

## Static hosting

Upload the contents of this project to the root of an HTTPS static host. Keep
all JSON, CSS, JavaScript, and `assets/` paths unchanged. The included
`.nojekyll` file makes the directory ready for GitHub Pages.

After deployment, open the public URL and complete a standalone session.

## Qualtrics Survey Flow

Before the block containing the game question, add an Embedded Data element.
Create every field listed in `qualtrics/embedded-data-fields.txt`.

## Qualtrics question

1. Add a Text/Graphic question.
2. In its HTML/source editor, paste `qualtrics/question.html`.
3. Select Add JavaScript and paste `qualtrics/question.js`.
4. Replace `APP_URL` and `APP_ORIGIN` with the deployed HTTPS values.
5. Preview and complete the study. The Next button should remain hidden until
   the game sends its completion result.

## Data verification

Submit one real anonymous test response and export it. Check that
`FS_Complete` is `1`, `FS_Seed` is populated, and the numbered result fields
contain JSON chunks. The included `qualtrics/reconstruct-results.R` recombines
and parses those fields.
