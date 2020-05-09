// GETTING GAMES

var allData = [];
var games = []

var datas = [];
var gamesPerData = {};
var dataForLine =[]

var genres = [];
var gamesPerGenre = {};
var dataForDoughnut = [];

var platforms = [];
var gamesPerPlatform = {};
var dataForPie = [];

var months = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez',
}

var colorArray =
    ['#8246e5', '#00c3df', '#fee440', '#9ce800', '#3A86FF',
        '#dd1c1a', '#F15BB5', '#FEE440', '#00BBF9', '#00F5D4',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

// POPULANDO OS DADOS

$(document).ready(function () {

    $.ajax({
        url: "https://halissonalves.github.io/gameszerados/data/games.json", success: function (result) {
            result.games.map(el => {
                allData.push(el);
                const tempData = el.date.slice(3, 5);
                games.push(el.name);
                gamesPerPlatform[el.platform] = (gamesPerPlatform[el.platform] || 0) + 1;
                gamesPerGenre[el.genre] = (gamesPerGenre[el.genre] || 0) + 1;
                gamesPerData[months[tempData]] = (gamesPerData[months[tempData]] || 0) + 1;
                if (platforms.indexOf(el.platform) === -1) {
                    platforms.push(el.platform);
                }
                if (genres.indexOf(el.genre) === -1) {
                    genres.push(el.genre);
                }
                if (datas.indexOf(months[tempData]) === -1) {
                    datas.push(months[tempData]);
                }
            });
            platforms.forEach(el => {
                dataForPie.push(gamesPerPlatform[el]);
            })
            genres.forEach(el => {
                dataForDoughnut.push(gamesPerGenre[el]);
            })
            datas.forEach(el => {
                dataForLine.push(gamesPerData[el]);
            })
            plotGraphs();
        }
    });

});

// CHARTS

// PLATFORM

function plotGraphs() {

    var ctx = document.getElementById('platformPizza');
    var ctx2 = document.getElementById('lineGraph');
    var ctx3 = document.getElementById('doughnutGraph');

    var platformPizza = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: platforms,
            datasets: [{
                data: dataForPie,
                backgroundColor: colorArray,
                borderColor: [
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 1
            }],
        },

    });

    var lineGraph = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: datas,
            datasets: [{
                label: 'Quantidade de Jogos Zerados por Mês',
                data: dataForLine,
                backgroundColor: ['rgba(130,70,229,0.5)'],
                borderColor: [
                    'rgba(81, 224, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    var doughnutGraph = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: genres,
            datasets: [{
                label: '# of Votes',
                data: dataForDoughnut,
                backgroundColor: colorArray,
                borderColor: [
                'rgba(255, 0, 255, 1)'
            ],
                borderWidth: 1
            }]
    }
    });


}


