// 02efdd64bdc14b279bc91d9247db4722
// https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
// http://openweathermap.org/img/wn/10d@2x.png

// ? 문제 1. ../json/city.list.json의 모든 데이터를 cityList: Array에 담으시오.
// ? ($.get, axios, XMLHttpRequest 셋중의 하나를 선택하시오)
// ? 문제 2 .가져온 데이터에서 한국의 정보만을 korCity: Array에 담으시오.
// ? 문제 3. korCity에서 { 도시이름 city, 위도 lat, 경도 lon, id } 객체를 city: Array에 담으시오.

/*
axios.get('../json/city.list.json').then(onGet).catch(onError);
function onGet(r) {
	const cityList = r.data;
	const korCity = cityList.filter(v => v.country === 'KR');
	const city = korCity.map(v => ({ id: v.id, name: v.name, lat: v.coord.lat, lon: v.coord.lon }));
	const seoul = city.filter(v => v.name === 'Seoul');
	let [, { id, name, lat, lon }] = seoul;
	console.log(korCity, city);
	console.log(id, name, lat, lon);
	// console.log( JSON.stringify(city) );
}
function onError(err) {
	console.log(err);
}

axios.get('../json/city.list.json').then(onGet).catch(onError);
function onGet(res) {
	const korList = [];
	const city = [];
	const cityList = res.data;
	for(let v of res.data) {
		if(v.country === 'KR') korList.push(v);
	}
	for(let v of korList) {
		city.push({ id: v.id, name: v.name, lat: v.coord.lat, lon: v.coord.lon });
	}
	console.log(korList, city);
}
*/

// navigator.clipboard.writeText("<Hello World>").then(() => { console.log('카피되었습니다.') })

navigator.geolocation.getCurrentPosition(onCoordSuccess, onCoordError);
function onCoordSuccess(r) {
	let { latitude: lat, longitude: lon } = r.coords;
	console.log(lat, lon);
}
function onCoordError(err) {
	// 1835848
	console.log(err);
}





/*************** global init **************/
const appid = '02efdd64bdc14b279bc91d9247db4722';
// const url = 'https://api.openweathermap.org/data/2.5/weather';
const url = 'http://127.0.0.1:3000/weather';
const icons = ['http://openweathermap.org/img/wn/', '@2x.png'];
const param = { units: 'metric', appid };

/************** user function *************/
function init() {
	navigator.geolocation.getCurrentPosition(onCoordSuccess, onCoordError);
	function onCoordSuccess(r) {
		let { latitude: lat, longitude: lon } = r.coords;
		axios.get(url, { params: { ...param, lat, lon } }).then(onGetWeather).catch(onError);
	}
	function onCoordError(err) {
		axios.get(url, { params: { ...param, id: '1835848' } }).then(onGetWeather).catch(onError);
	}
}

/************** event callback ************/
function onGetWeather(r) {
	let { main, name, weather } = r.data;
	let { temp } = main;
	let { main: title, description, icon } = weather[0];
	let html = `<img src="${icons[0] + icon + icons[1]}" alt="${icon}" class="w100">`;
	const $wrap = $('.weather-wrap');
	$wrap.find('.city span').text(name);
	$wrap.find('.img-wp').html(html);
	// $wrap.find('.img-wp img').attr('src', icons[0] + icon + icons[1]);
	$wrap.find('.temp-wp span').text(temp);
	$wrap.find('.desc-wp .main').text(title);
	$wrap.find('.desc-wp .description').text(description);
}

function onError(err) {
	console.log(err);
}

/*************** event init ***************/


/*************** start init ***************/
init();


