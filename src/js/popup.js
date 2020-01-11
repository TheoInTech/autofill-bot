$(document).ready(function() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  $("#datenow").html(today);

  chrome.storage.sync.get(["sent", "votes"], function(result) {
    document.getElementById("sentvote").innerHTML = result.sent;
    document.getElementById("noofvotes").value = result.votes;
  });

  $("#submitcount").click(() => {
    let votes = parseInt($("#noofvotes").val());
    chrome.storage.sync.set({ votes: votes }, function() {
      console.log("Votes is set to " + votes);
    });
  });

  // RESET BUTTON
  $("#btnReset").click(() => {
    chrome.storage.sync.set({ sent: 0 }, function() {
      $("#sentvote").html = 0;
    });
  });

  // STOP BUTTON
  $("#btnStop").click(() => {
    chrome.storage.sync.set({ is_auto: false }, function() {});
  });

  // AUTO BUTTON
  $("#btnAuto").click(() => {
    chrome.storage.sync.set({ is_auto: true }, function() {
      $("#submitfill").click();
    });
  });
});

window.onload = function() {
  setTimeout(() => {
    chrome.storage.sync.get(["is_auto", "votes"], function(results) {
      if (results.is_auto == true && results.votes > 0) {
        $("#submitfill").click();
      }
    });
  }, 5000);
};
