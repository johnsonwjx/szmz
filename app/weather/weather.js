require('./weather.scss');
require('./css/weather-icons.css');

var Chart = require('chart.js');
var moment = require('moment');
var _ = require('lodash');

var weatherTpl = require('./weather.tmpl');

var $weather = $('#weather');

// 天气城市暂时固定死深圳, 以后再根据 ip 获取地理位置
var city = {
  name: 'Shenzhen',
  cnName: '深圳'
};

getData().then(function (data) {
  var currentWeather = data.currentWeather;
  currentWeather.city = city.cnName;
  currentWeather.date = moment(currentWeather.time).format('MM/DD');
  currentWeather.iconName = getIconName(currentWeather.weather);
  $weather.html(weatherTpl.render(currentWeather));

  var $weatherChart = $weather.find('.chart');

  var forceastData = data.forceast;
  var chartData = forceastData.datasets[0].data;

  var getY = function (data) {
    return data.y;
  };

  var maxTemp = _.maxBy(chartData, getY);
  var minTemp = _.minBy(chartData, getY);

  new Chart($weatherChart, {
    responsive: false,
    type: 'line',
    data: data.forceast,
    options: {
      legend: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'index',
        intersect: false
      },
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            max: maxTemp.y + 3,
            min: minTemp.y - 3
          }
        }],
        xAxes: [{
          type: 'time',
          gridLines: {
            zeroLineWidth: 0
          },
          ticks: {
            fontColor: 'white'
          },
          time: {
            displayFormats: {
              hour: 'HH:00'
            },
            tooltipFormat: 'YYYY/MM/DD HH:mm',
            unit: 'hour',
            unitStepSize: 3,
          }
        }]
      },
      elements: {
        // disables bezier curves
        line: {
          tension: 0
        }
      }
    }
  });
});

function getWeatherForceast(city) {
  return $.get('business.do?action=queryWeather&type=forecast&city=' + city);
}

function getCurrentWeather(city) {
  return $.get('business.do?action=queryWeather&type=weather&city=' + city);
}

function getData() {
  var cityName = city.name;
  return $.when(getCurrentWeather(cityName), getWeatherForceast(cityName))
    .then(function (weatherResponse, forceastResponse) {
      var currentWeather = getWeather(weatherResponse[0]);
      var chartData = getChartData(forceastResponse[0]);
      return {
        currentWeather: currentWeather,
        forceast: chartData
      };
    });

  function getWeather(weatherInfo) {
    var temperature = weatherInfo.main.temp;
    var weather = weatherInfo.weather[0];
    var wind = weatherInfo.wind;
    var windInfo = {
      speed: toKMH(wind.speed),
      direction: toTextDesc(wind.deg)
    };
    var time = getDateFromDt(weatherInfo.dt);
    return {
      temperature: Math.round(temperature),
      weather: weather,
      wind: windInfo,
      time: time
    };

    /**
     * 米每秒转换为公里每小时
     * @param  {number} ms 米每秒
     * @return {string} 公里每小时,1位小数
     */
    function toKMH(ms) {
      return (ms * 3600 / 1000).toFixed(1);
    }

    /**
     * 风向转换为文字
     * https://stackoverflow.com/a/36475839/902058
     * @param  {number} degree 风向度数
     * @return {string} 风向文字
     */
    function toTextDesc(degree) {
      var sectors = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];

      degree += 22.5;

      if (degree < 0)
        degree = 360 - Math.abs(degree) % 360;
      else
        degree = degree % 360;

      var which = parseInt(degree / 45);
      return sectors[which];
    }
  }

  function getChartData(responsData) {
    var weathers = responsData['list'];
    var fiveWeathers = _.take(weathers, 5);

    var datas = _.map(fiveWeathers, function (weatherData) {
      var temperature = weatherData.main.temp;
      var time = getDateFromDt(weatherData.dt);
      return {
        x: time,
        y: Math.round(temperature)
      };
    });
    return {
      datasets: [{
        data: datas,
        borderWidth: 1,
        fill: false,
        borderColor: 'white',
        backgroundColor: 'white'
      }]
    };
  }

  function getDateFromDt(dtTimeStamp) {
    return new Date(dtTimeStamp * 1000);
  }
}

function getIconName(weather) {
  var dayNight;
  if (weather.icon.indexOf('d') >= 0) {
    dayNight = 'day';
  } else {
    dayNight = 'night';
  }

  return 'wi-owm-' + dayNight + '-' + weather.id;
}
