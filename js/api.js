const base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json

function getLeague() {

  if ("caches" in window) {

    caches.match(base_url + "competitions/").then(function (response) {
      if (response) {
        response.json().then(function (data) {

          let leaguesHTML = "";

          data.competitions.forEach(function (league) {

            if (!(league.area.name === "Europe") && !(league.area.name === "World") && (league.plan === "TIER_ONE")) {
              leaguesHTML += `
                <div class="option">
                    <input type="radio" class="radio" id="league-id" value="${league.id}" name="category" />
                    <label>(${league.area.name}) ${league.name}</label>
                </div>
                `;
            }
          });

          document.getElementById("select-league").innerHTML = leaguesHTML;


          const selected = document.querySelector(".selected");
          const optionsContainer = document.querySelector(".options-container");

          const optionsList = document.querySelectorAll(".option");

          // selected.addEventListener("click", () => {
          //   optionsContainer.classList.toggle("active");
          // });

          selected.onclick = () => {
            optionsContainer.classList.toggle("active");
          }


          optionsList.forEach(o => {
            o.addEventListener("click", () => {
              selected.innerHTML = o.querySelector("label").innerHTML;
              optionsContainer.classList.remove("active");
              const leagueid = o.querySelector("#league-id").value;
              getStandings(leagueid);
            });
          });
        });
      }
    });
  }

  fetch(base_url + "competitions/", {
    headers: {
      "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {

      let leaguesHTML = "";

      data.competitions.forEach(function (league) {

        if (!(league.area.name === "Europe") && !(league.area.name === "World") && (league.plan === "TIER_ONE")) {
          leaguesHTML += `
            <div class="option">
                <input type="radio" class="radio" id="league-id" value="${league.id}" name="category" />
                <label>(${league.area.name}) ${league.name}</label>
            </div>
            `;
        }
      });

      document.getElementById("select-league").innerHTML = leaguesHTML;


      const selected = document.querySelector(".selected");
      const optionsContainer = document.querySelector(".options-container");

      const optionsList = document.querySelectorAll(".option");

      // selected.addEventListener("click", () => {
      //   optionsContainer.classList.toggle("active");
      // });

      selected.onclick = function () {
        optionsContainer.classList.toggle("active");
      }

      optionsList.forEach(o => {
        o.addEventListener("click", () => {
          selected.innerHTML = o.querySelector("label").innerHTML;
          optionsContainer.classList.remove("active");
          const leagueid = o.querySelector("#league-id").value;
          getStandings(leagueid);
        });
      });
    })
    .catch(error);
}

function getFirstStandings() {

  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let standingsHTML = "";

          standingsHTML = `
          <table class="striped table-content"">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Team</th>
                      <th>MP</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>PTS</th>
                  </tr>
              </thead>`;

          data.standings[0].table.forEach(function (standings) {
            standingsHTML += `
                  <tr>
                    <td>${standings.position}</td>
                    <td>${standings.team.name}</td>
                    <td>${standings.playedGames}</td>
                    <td>${standings.won}</td>
                    <td>${standings.draw}</td>
                    <td>${standings.lost}</td>
                    <td>${standings.points}</td>
                  </tr>
                `;
          });
          standingsHTML += `</table>`;

          document.getElementById("standing-content").innerHTML = standingsHTML;
        });
      }
    });
  }

  fetch(base_url + "competitions/2021/standings", {
    headers: {
      "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let leaguesHTML = "";

      leaguesHTML = `
      <div class="option">
          <input type="radio" class="radio" id="league-id" value="" name="category" />
          <label>(England) Premiere League</label>
      </div>
      `;

      document.getElementById("select-league").innerHTML = leaguesHTML;

      let standingsHTML = "";

      standingsHTML = `
      <table class="striped table-content"">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>PTS</th>
              </tr>
          </thead>`;

      data.standings[0].table.forEach(function (standings) {
        standingsHTML += `
              <tr>
                <td>${standings.position}</td>
                <td>${standings.team.name}</td>
                <td>${standings.playedGames}</td>
                <td>${standings.won}</td>
                <td>${standings.draw}</td>
                <td>${standings.lost}</td>
                <td>${standings.points}</td>
              </tr>
            `;
      });
      standingsHTML += `</table>`;

      document.getElementById("standing-content").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getStandings(id) {

  // var urlParams = new URLSearchParams(window.location.search);
  // var idParam = urlParams.get("id");

  let standingsHTML = `
  <div class="preloader-wrapper big active loading">
    <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
    <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
  </div>`;

  document.getElementById("standing-content").innerHTML = standingsHTML;

  if ("caches" in window) {
    caches.match(base_url + "competitions/" + id + "/standings").then(function (response) {
      if (response) {
        response.json().then(function (data) {

          standingsHTML = `
          <table class="striped table-content"">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Team</th>
                      <th>MP</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>PTS</th>
                  </tr>
              </thead>`;

          data.standings[0].table.forEach(function (standings) {
            standingsHTML += `
                  <tr>
                    <td>${standings.position}</td>
                    <td>${standings.team.name}</td>
                    <td>${standings.playedGames}</td>
                    <td>${standings.won}</td>
                    <td>${standings.draw}</td>
                    <td>${standings.lost}</td>
                    <td>${standings.points}</td>
                  </tr>
                `;
          });
          standingsHTML += `</table>`;

          document.getElementById("standing-content").innerHTML = standingsHTML;
        });
      }
    });
  }

  fetch(base_url + "competitions/" + id + "/standings", {
    headers: {
      "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {

      standingsHTML = `
      <table class="striped table-content"">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>PTS</th>
              </tr>
          </thead>`;

      data.standings[0].table.forEach(function (standings) {
        standingsHTML += `
              <tr>
                <td>${standings.position}</td>
                <td>${standings.team.name}</td>
                <td>${standings.playedGames}</td>
                <td>${standings.won}</td>
                <td>${standings.draw}</td>
                <td>${standings.lost}</td>
                <td>${standings.points}</td>
              </tr>
            `;
      });
      standingsHTML += `</table>`;

      document.getElementById("standing-content").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getLeagueForSchedule() {
  if ("caches" in window) {

    caches.match(base_url + "competitions/").then(function (response) {
      if (response) {
        response.json().then(function (data) {

          let leaguesHTML = "";

          data.competitions.forEach(function (league) {

            if (!(league.area.name === "Europe") && !(league.area.name === "World") && (league.plan === "TIER_ONE")) {
              leaguesHTML += `
                <div class="option">
                    <input type="radio" class="radio" id="league-id" value="${league.id}" name="category" />
                    <label>(${league.area.name}) ${league.name}</label>
                </div>
                `;
            }
          });

          document.getElementById("select-league-match").innerHTML = leaguesHTML;


          const selected = document.querySelector(".selected");
          const optionsContainer = document.querySelector(".options-container");

          const optionsList = document.querySelectorAll(".option");

          // selected.addEventListener("click", () => {
          //   optionsContainer.classList.toggle("active");
          // });

          selected.onclick = () => {
            optionsContainer.classList.toggle("active");
          }


          optionsList.forEach(o => {
            o.addEventListener("click", () => {
              selected.innerHTML = o.querySelector("label").innerHTML;
              optionsContainer.classList.remove("active");
              const leagueid = o.querySelector("#league-id").value;
              getScheduleMatch(leagueid);
            });
          });
        });
      }
    });
  }

  fetch(base_url + "competitions/", {
    headers: {
      "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {

      let leaguesHTML = "";

      data.competitions.forEach(function (league) {

        if (!(league.area.name === "Europe") && !(league.area.name === "World") && (league.plan === "TIER_ONE")) {
          leaguesHTML += `
            <div class="option">
                <input type="radio" class="radio" id="league-id" value="${league.id}" name="category" />
                <label>(${league.area.name}) ${league.name}</label>
            </div>
            `;
        }
      });

      document.getElementById("select-league-match").innerHTML = leaguesHTML;


      const selected = document.querySelector(".selected");
      const optionsContainer = document.querySelector(".options-container");

      const optionsList = document.querySelectorAll(".option");

      // selected.addEventListener("click", () => {
      //   optionsContainer.classList.toggle("active");
      // });

      selected.onclick = function () {
        optionsContainer.classList.toggle("active");
      }

      optionsList.forEach(o => {
        o.addEventListener("click", () => {
          selected.innerHTML = o.querySelector("label").innerHTML;
          optionsContainer.classList.remove("active");
          const leagueid = o.querySelector("#league-id").value;
          getScheduleMatch(leagueid);
        });
      });
    })
    .catch(error);
}

function getFirstschedulematch() {

  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/matches?status=SCHEDULED").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let ScheduleMatchHTML = "";

          ScheduleMatchHTML = `
          <table class="centered responsive-table match-table-content">
              <thead>
                  <tr>
                      <th>Date</th>
                      <th>Matchday</th>
                      <th>Home Team</th>
                      <th>Away Team</th>
                      <th></th>
                  </tr>
              </thead>`;

          data.matches.forEach(function (match) {
            ScheduleMatchHTML += `
                  <tr>
                    <td>${new Date(match.utcDate).toLocaleDateString()}</td>
                    <td>Matchday ${match.season.currentMatchday}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td><a href="./detail_match.html?id=${match.id}" class="waves-effect waves-light btn">Detail</a></td>
                  </tr>
                `;
          });
          ScheduleMatchHTML += `</table>`;

          document.getElementById("match-content").innerHTML = ScheduleMatchHTML;
        })
      }
    });
  }
  fetch(base_url + "competitions/2021/matches?status=SCHEDULED", {
    headers: {
      "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {

      ScheduleMatchHTML = `
      <table class="centered responsive-table match-table-content">
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Matchday</th>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th></th>
              </tr>
          </thead>`;

      data.matches.forEach(function (match) {
        ScheduleMatchHTML += `
              <tr>
                <td>${new Date(match.utcDate).toLocaleDateString()}</td>
                <td>Matchday ${match.season.currentMatchday}</td>
                <td>${match.homeTeam.name}</td>
                <td>${match.awayTeam.name}</td>
                <td><a href="./detail_match.html?id=${match.id}" class="waves-effect waves-light btn">Detail</a></td>
              </tr>
            `;
      });
      ScheduleMatchHTML += `</table>`;

      document.getElementById("match-content").innerHTML = ScheduleMatchHTML;
    })
    .catch(error);
}

function getScheduleMatch(smid) {

  let ScheduleMatchHTML = `
  <div class="preloader-wrapper big active loading">
    <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
    <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
  </div>`;

  document.getElementById("match-content").innerHTML = ScheduleMatchHTML;

  if ("caches" in window) {
    caches.match(base_url + "competitions/" + smid + "/matches?status=SCHEDULED").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let ScheduleMatchHTML = "";

          ScheduleMatchHTML = `
          <table class="centered responsive-table match-table-content">
              <thead>
                  <tr>
                      <th>Date</th>
                      <th>Matchday</th>
                      <th>Home Team</th>
                      <th>Away Team</th>
                      <th></th>
                  </tr>
              </thead>`;

          data.matches.forEach(function (match) {
            ScheduleMatchHTML += `
                  <tr>
                    <td>${new Date(match.utcDate).toLocaleDateString()}</td>
                    <td>Matchday ${match.season.currentMatchday}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td><a href="./detail_match.html?id=${match.id}" class="waves-effect waves-light btn">Detail</a></td>
                  </tr>
                `;
          });
          ScheduleMatchHTML += `</table>`;

          document.getElementById("match-content").innerHTML = ScheduleMatchHTML;
        })
      }
    });
  }

  fetch(base_url + "competitions/" + smid + "/matches?status=SCHEDULED", {
    headers: {
      "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {

      ScheduleMatchHTML = `
      <table class="centered responsive-table match-table-content">
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Matchday</th>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th></th>
              </tr>
          </thead>`;

      data.matches.forEach(function (match) {
        ScheduleMatchHTML += `
              <tr>
                <td>${new Date(match.utcDate).toLocaleDateString()}</td>
                <td>Matchday ${match.season.currentMatchday}</td>
                <td>${match.homeTeam.name}</td>
                <td>${match.awayTeam.name}</td>
                <td><a href="./detail_match.html?id=${match.id}" class="waves-effect waves-light btn">Detail</a></td>
              </tr>
            `;
      });
      ScheduleMatchHTML += `</table>`;

      document.getElementById("match-content").innerHTML = ScheduleMatchHTML;
    })
    .catch(error);
}

function getmatchdetail() {
  return new Promise(function (resolve) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "matches/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {

            console.log(data);

            let matchdetailHTML = `
          <div class="row match-box">
          <div class="col s12 match-container">
           <div class="row">
                  <div class="col s12 league-title"><span>${data.match.competition.name}</span></div>
                  <div class="col s12 date-title"><span>${data.match.venue}, ${new Date(data.match.utcDate).toLocaleTimeString()}, ${new Date(data.match.utcDate).toLocaleDateString()}</span></div>
                  <div class="col s5 club">
                      <div class="row">
                          <div class="col s12 center-align"><img src="https://crests.football-data.org/${data.match.homeTeam.id}.svg" width="100" alt=""></div>
                          <div class="col s12 center-align club-name"><span>${data.match.homeTeam.name}</span></div>
                      </div>
                  </div>
                  <div class="col s2 center-align vs">
                      <div>
                          <span>VS</span>
                      </div>
                  </div>
                  <div class="col s5 club">
                      <div class="row">
                          <div class="col s12 center-align"><img src="https://crests.football-data.org/${data.match.awayTeam.id}.svg" width="100" alt=""></div>
                          <div class="col s12 center-align club-name"><span>${data.match.awayTeam.name}</span></div>
                      </div>
                  </div>
           </div>
          </div>
      </div>
      
            `;

            document.getElementById("body-content").innerHTML = matchdetailHTML;

            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "matches/" + idParam, {
      headers: {
        "X-Auth-Token": "2e00a4b3d1464cd4b4452bba66eb3721"
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {

        console.log(data);

        let matchdetailHTML = `
      <div class="row match-box">
      <div class="col s12 match-container">
       <div class="row">
              <div class="col s12 league-title"><span>${data.match.competition.name}</span></div>
              <div class="col s12 date-title"><span>${data.match.venue}, ${new Date(data.match.utcDate).toLocaleTimeString()}, ${new Date(data.match.utcDate).toLocaleDateString()}</span></div>
              <div class="col s5 club">
                  <div class="row">
                      <div class="col s12 center-align"><img src="https://crests.football-data.org/${data.match.homeTeam.id}.svg" width="100" alt=""></div>
                      <div class="col s12 center-align club-name"><span>${data.match.homeTeam.name}</span></div>
                  </div>
              </div>
              <div class="col s2 center-align vs">
                  <div>
                      <span>VS</span>
                  </div>
              </div>
              <div class="col s5 club">
                  <div class="row">
                      <div class="col s12 center-align"><img src="https://crests.football-data.org/${data.match.awayTeam.id}.svg" width="100" alt=""></div>
                      <div class="col s12 center-align club-name"><span>${data.match.awayTeam.name}</span></div>
                  </div>
              </div>
       </div>
      </div>
      </div>
        `;

        document.getElementById("body-content").innerHTML = matchdetailHTML;

        resolve(data);
      });
  });
}

function getSavedSchedule() {
  getAll().then(function (data) {
    console.log(data);
    let ScheduleMatchHTML = "";

    ScheduleMatchHTML = `
          <table class="centered responsive-table match-table-content">
              <thead>
                  <tr>
                      <th>Date</th>
                      <th>Competitions</th>
                      <th>Matchday</th>
                      <th>Home Team</th>
                      <th>Away Team</th>
                      <th></th>
                  </tr>
              </thead>`;

    data.forEach(function (match) {
      ScheduleMatchHTML += `
                  <tr>
                    <td>${new Date(match.utcDate).toLocaleDateString()}</td>
                    <td>(${match.competition.area.name}) ${match.competition.name}</td>
                    <td>Matchday ${match.season.currentMatchday}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td><a href="./detail_match.html?id=${match.id}&saved=true" class="waves-effect waves-light btn">Detail</a></td>
                  </tr>
                `;
    });
    ScheduleMatchHTML += `</table>`;

    document.getElementById("saved-match-content").innerHTML = ScheduleMatchHTML;
  });
}

function getSavedMatchById() {
  return new Promise((resolve) => {
    var urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get("id"));

    getById(idParam).then(function (data) {


      let matchdetailHTML = `
  <div class="row match-box">
  <div class="col s12 match-container">
   <div class="row">
          <div class="col s12 league-title"><span>${data.competition.name}</span></div>
          <div class="col s12 date-title"><span>${data.venue}, ${new Date(data.utcDate).toLocaleTimeString()}, ${new Date(data.utcDate).toLocaleDateString()}</span></div>
          <div class="col s5 club">
              <div class="row">
                  <div class="col s12 center-align"><img src="https://crests.football-data.org/${data.homeTeam.id}.svg" width="100" alt=""></div>
                  <div class="col s12 center-align club-name"><span>${data.homeTeam.name}</span></div>
              </div>
          </div>
          <div class="col s2 center-align vs">
              <div>
                  <span>VS</span>
              </div>
          </div>
          <div class="col s5 club">
              <div class="row">
                  <div class="col s12 center-align"><img src="https://crests.football-data.org/${data.awayTeam.id}.svg" width="100" alt=""></div>
                  <div class="col s12 center-align club-name"><span>${data.awayTeam.name}</span></div>
              </div>
          </div>
   </div>
  </div>
  </div>
    `;

      document.getElementById("body-content").innerHTML = matchdetailHTML;
      resolve(data);
    });
   });
}