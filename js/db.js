const dbPromised = idb.open("footballtoday", 1, upgradeDb => {
  const scheduleObjectStore = upgradeDb.createObjectStore('matches', {
    keyPath: "id"
  });
  scheduleObjectStore.createIndex("homeTeam", "awayTeam", { unique: false });
});

function saveForLater(matchschedule) {
  dbPromised
    .then(db => {
      const tx = db.transaction("matches", "readwrite");
      const store = tx.objectStore("matches");
      console.log(matchschedule);
      store.put(matchschedule.match);
      return tx.complete;
    }).then(() => {
      M.toast({html: 'Data Saved'})
      console.log("Schedule saved");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
    .then(db => {
      const tx = db.transaction("matches", "readonly");
      const store = tx.objectStore("matches");
      return store.getAll();
    }).then(matchschedule => {
      resolve(matchschedule);
    }).catch(err => {
      console.log(err);
    })
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("matches", "readonly");
        var store = tx.objectStore("matches");
        return store.get(id);
      }).then(function(match) {
        resolve(match);
        console.log("data berhasil getByid bERhasil.");
      }).catch(err => {
        console.log(err);
      });
  });
}

function deleteById(id) {
  return new Promise((resolve) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("matches", "readwrite");
        const store = tx.objectStore("matches");
        store.delete(id);
        return tx.complete;
      }).then(matches => {
        resolve(matches);
      })
      })
}