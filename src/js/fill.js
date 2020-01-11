$(document).ready(function() {
  $("#btnReload").click(() => {
    let params = { active: true, currentWindow: true };

    chrome.tabs.query(params, tabs => {
      chrome.tabs.reload(tabs[0].id);
    });
  });

  $("#submitfill").click(() => {
    chrome.storage.sync.get(["votes", "sent"], function(result) {
      let votes = result.votes;
      let sent = result.sent;

      if (votes > 0) {
        let info = {
          "285092847": $("#category").val(),
          "285092851": $("#nominee").val(),
          "285092854": $("#address").val(),
          "285092855": $("#city").val(),
          "285092856": $("#phone").val(),
          "285092857": $("#website").val(),
          "285092862": $("#cname").val(),
          "285092863": $("#cemail").val()
        };

        votes = parseInt(votes) - 1;
        if (typeof sent !== "undefined") {
          sent = parseInt(sent) + 1;
        }

        chrome.storage.sync.set({ sent: sent, votes: votes }, function() {
          document.getElementById("sentvote").innerHTML = sent;
          document.getElementById("noofvotes").value = votes;

          let params = { active: true, currentWindow: true };

          chrome.tabs.query(params, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "fill" }, res => {
              $("#btnReload").click();
            });
          });
        });
      } else {
        // Reset state ready for next time.
        votes = 0;
        chrome.storage.sync.set(
          { votes: votes, is_auto: false },
          function() {}
        );
      }
    });
  });
});
