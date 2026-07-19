/*
 * Paste this into the Qualtrics question's Add JavaScript editor.
 * Replace both deployment constants below before using it.
 */
Qualtrics.SurveyEngine.addOnload(function () {
  var question = this;
  var frame = document.getElementById("free-saturday-frame");
  var status = document.getElementById("free-saturday-status");

  var APP_URL = "https://YOUR-USERNAME.github.io/a-free-saturday/";
  var APP_ORIGIN = "https://YOUR-USERNAME.github.io";
  var MAX_CHUNKS = 10;
  var CHUNK_SIZE = 6000;
  var completed = false;

  var seed = window.crypto && window.crypto.randomUUID
    ? window.crypto.randomUUID()
    : Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);

  Qualtrics.SurveyEngine.setEmbeddedData("FS_Seed", seed);
  Qualtrics.SurveyEngine.setEmbeddedData("FS_Complete", "0");
  question.hideNextButton();
  frame.src = APP_URL + "?seed=" + encodeURIComponent(seed);

  function saveResult(result) {
    var json = JSON.stringify(result);
    var chunks = [];
    var position;
    var index;

    for (position = 0; position < json.length; position += CHUNK_SIZE) {
      chunks.push(json.slice(position, position + CHUNK_SIZE));
    }

    if (chunks.length > MAX_CHUNKS) {
      status.textContent = "The activity finished, but its data exceeded the configured storage size.";
      return false;
    }

    Qualtrics.SurveyEngine.setEmbeddedData("FS_ResultChunks", String(chunks.length));
    for (index = 0; index < MAX_CHUNKS; index += 1) {
      var number = String(index + 1).padStart(2, "0");
      Qualtrics.SurveyEngine.setEmbeddedData("FS_Result_" + number, chunks[index] || "");
    }

    Qualtrics.SurveyEngine.setEmbeddedData("FS_Seed", result.participantSeed || seed);
    Qualtrics.SurveyEngine.setEmbeddedData("FS_Complete", "1");
    return true;
  }

  function receiveMessage(event) {
    if (event.origin !== APP_ORIGIN || event.source !== frame.contentWindow) return;
    if (!event.data || typeof event.data !== "object") return;

    if (event.data.type === "free-saturday-resize") {
      var requestedHeight = Number(event.data.height);
      if (isFinite(requestedHeight)) {
        frame.style.height = Math.max(650, Math.min(requestedHeight + 20, 1400)) + "px";
      }
    }

    if (!completed && event.data.type === "free-saturday-complete") {
      completed = saveResult(event.data.result);
      if (completed) {
        status.textContent = "Activity complete. Select Next to continue.";
        question.showNextButton();
      }
    }
  }

  window.addEventListener("message", receiveMessage);
});
