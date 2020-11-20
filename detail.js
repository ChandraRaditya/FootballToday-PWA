function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  const btnSave = document.getElementById("save");
  const btnDel = document.getElementById("delete");

  if (isFromSaved) {

    btnSave.style.display = 'none';
    const item = getSavedMatchById();
    btnDel.onclick = function () {
      console.log("Tombol delete di klik.");
      item.then(match => {
        deleteById(match.id);
        goBack();
      });
    };

  } else {

    btnDel.style.display = 'none';
    const item = getmatchdetail();

    btnSave.onclick = function () {
      console.log("Tombol save di klik.");
      item.then(function (match) {
        saveForLater(match);
      });
    };
  }
});