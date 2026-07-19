# A Free Saturday — exposure-phase redesign

## Critical evaluation of the original pilot

### Behavioural-science weaknesses

- Claims appeared automatically on scene entry, before any participant action. Exposure was therefore focal rather than incidental and likely to reveal the manipulation.
- A visible media-format label framed each claim as a stimulus. The isolated claim card had none of the semantic competition, source cues, or reading goals found in ordinary media.
- Display duration began before participants made their story choice, confounding claim processing with decision latency.
- Every choice followed the same exposed claim. The behavioural action could not plausibly cause the information encounter.
- The line explicitly explaining that paths converged exposed the experimental structure and weakened narrative transportation.
- Presentation formats were mainly cosmetic containers. A television transcript, advertisement, and conversation did not behave or read like distinct media.
- The original log could not distinguish opening an object, scrolling, completing content, or returning to it.

### Game- and interaction-design weaknesses

- Choices changed only a short response sentence and had no experiential consequence.
- The interface described scenes instead of staging small situations within them.
- Large decorative emoji dominated the scene while interactive objects had no presence.
- Pacing repeated the obvious loop “claim → choice → convergence,” making the system legible after one scene.
- Copy such as “No matter which path you chose” directly invalidated participant agency.

## Redesigned paradigm

Each scene now has two stages. First, participants see an ordinary situation and choose between two believable actions. No claim is present. Their action opens a corresponding object—phone, radio, recipe, paper, transit screen, call, product display, gallery guide, review page, menu, cinema preview, magazine, package, newsletter, podcast, or streaming page. The assigned claim is grammatically embedded within surrounding content in that object.

The exposure phase now runs as a compact pixel-art living room. Participants control a non-descriptive geometric avatar and deliberately select everyday information objects. The first six distinct information objects receive a dynamically assigned, seeded condition queue with three American and three different irrelevant-nationality claims. The participant chooses the source before the identity condition is revealed. Non-information objects provide genuine filler interactions, and no claims play ambiently.

Each choice has an independent purpose: checking messages, deciding where to eat, comparing products, or passing time. Branches produce different short outcomes and then converge implicitly at the next clock time. The interface never announces convergence.

Exactly one claim family remains assigned to each scene. Both available actions in a scene are exposure-bearing, so participants voluntarily choose the object and format while every participant still receives eight controlled exposures. Choice changes the presentation format, never the assigned claim, relevance condition, or exposure count.

## Measurement changes

The exposure log now records:

- selected object and branch;
- object-open timestamp and count;
- whether an opening is a revisit;
- claim-visible/interaction duration;
- scroll-event count and maximum scroll depth;
- inferred reading completion;
- exposure order;
- scene and selected presentation format.

The original assignment, truth-rating, recognition, seed, and completion records remain intact.

## Pilot cautions

- The claim is visible whenever the chosen object opens. “Finished reading” is behavioural inference, not proof of attention; validation should include dwell-time and scroll-quality exclusions rather than treating it as comprehension.
- Branch formats can differ in baseline credibility, word count, and visual salience. Before confirmatory use, pretest source credibility and normalize the words before/after each claim.
- Allowing participants to avoid every information-bearing object would break fixed exposure counts. This design instead offers a choice between two independently plausible information interactions. The consent/instructions should not describe these as information exposures.
- Identity relevance should be established with a separate identity-strength measure. Nationality alone does not guarantee equivalent self-relevance across participants.
- Recognition questions can sensitize participants to the repetition manipulation. If truth ratings are primary, consider placing recognition after all ratings or assigning it to a separate sample.
