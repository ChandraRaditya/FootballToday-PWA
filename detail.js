function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = parseInt(urlParams.get("id"));
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
    const cekdata = getCheckSavedMatchById();
    cekdata.then(data => {
      // id = parseInt(data);

      console.log(`id di detail buat pembanding adalah ${data}`)

      if (data) {
        // gheckSavedMatchById()etC
        // console.log(getCheckSavedMatchById());
        console.log("masuk blok cek id tersave");
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
        // getCheckSavedMatchById()
        // console.log(getCheckSavedMatchById());
        console.log("masuk blok cek id blm save");
        btnDel.style.display = 'none';
        const item = getmatchdetail();

        btnSave.onclick = function () {
          console.log("Tombol save di klik.");
          item.then(function (match) {
            saveForLater(match);
            btnSave.style.display = 'none';
            btnDel.style.display = 'flex';
            const item = getSavedMatchById();
            btnDel.onclick = function () {
              console.log("Tombol delete di klik.");
              item.then(match => {
                deleteById(match.id);
                goBack();
              });
            };
          });
        };
      }
    });
  }
});