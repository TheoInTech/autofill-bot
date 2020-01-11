chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //   Object.keys(request).map(function(key, index) {
  //     document.getElementById(key).value = request[key];
  //   });
  if (request.action == "fill") {
    document.getElementById("285092847").value = "Pediatrician";
    document.getElementById("285092851").value = "Marigold Castillo";
    document.getElementById("285092854").value = "42-05 Francis Lewis Blvd";
    document.getElementById("285092855").value = "Bayside, NY 11361";
    document.getElementById("285092856").value = "718-631-2273";
    document.getElementById("285092857").value = "md1care.nyc";
    document.getElementById("285092862").value = "Marigold Castillo";
    document.getElementById("285092863").value = "drgold@md1care.nyc";

    var btnSubmit = document.getElementsByClassName("clsSubmitButton");

    // btnSubmit[0].addEventListener("click", function() {
    //   setTimeout(function() {
    //     alert("hey");
    //     location.href =
    //       "https://app.smartsheet.com/b/form/94066650a48040a0a3d36af6f1c21a80";
    //   }, 2000);
    // });

    btnSubmit[0].click();
  } else {
    alert("powerrrr!");
  }
});

window.onload = function() {
  setTimeout(() => {
    if (window.location.href.indexOf("SFConfirm=") > 0) {
      location.href =
        "https://app.smartsheet.com/b/form/94066650a48040a0a3d36af6f1c21a80";
    } else {
    }
  }, 500);
};
