var gamesData = [];

$(document).ready(function () {

  $.ajax({
    url: "https://halissonalves.github.io/gameszerados/data/games.json", success: function (result) {
      console.log(result)
      result.games.map(el => {
        gamesData.push(el);
      });
      console.log(gamesData)
      addRowFunc();
    }
  });

  addRowFunc = function () {
    var t = $('#myTable').DataTable();
    console.log(gamesData[1].name)

    for (let index = 0; index < gamesData.length; index++) {
      t.row.add([
        gamesData[index].name,
        gamesData[index].platform,
        gamesData[index].genre,
        gamesData[index].date,
        gamesData[index].dificulty,
        gamesData[index].score
      ]).draw(false);

    }
  }

});
