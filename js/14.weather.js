// 02efdd64bdc14b279bc91d9247db4722
// https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=02efdd64bdc14b279bc91d9247db4722&units=metric

// ? 문제 1. ../json/city.list.json의 모든 데이터를 cityList: Array에 담으시오.
// 		($.get, axios, XMLHttpRequest 셋중의 하나를 선택하시오)

// ? 문제 2 .가져온 데이터에서 한국의 정보만을 korCity: Array에 담으시오.
// ? 문제 3. korCity에서 { 도시이름 city, 위도 lat, 경도 lon, id } 객체를 city: Array에 담으시오.

// cityList | korCity | city


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