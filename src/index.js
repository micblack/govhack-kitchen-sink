Vue.component('apexchart', VueApexCharts)

const load = (component) => { 
	return window.httpVueLoader('components/' + component + '.vue')
}

const vm = new window.Vue({
	el: '#app',

	components: {
		'home-layout': load('home-layout'),
		'padded-section': load('padded-section'),
		'wide-section': load('wide-section'),
		'my-component': load('my-component')
	},

	data() {
		return {
			linearChart: {
				options: {
					xaxis: {
						categories: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
					}
				},
				series: [{
					name: 'series-1',
					data: [30, 40, 45, 50, 49, 60, 70, 91]
				}]
			},
			radialChart: {
				series: [44, 55, 41, 17, 15],
				chartOptions: {
					labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
				}
			},
			readinessIO: {
				config: {
					channel: 'sandbox-govhacksc.v1.readiness.io',
					readKey: '',
					writeKey: '',
					deleteKey: ''
				}
			}
		}
	},

	methods: {
		

	},

	created() {
		/*let url  = 'data/road-restrictions.geojson'
		axios.get(url)
		.then((response) => {
			response.data.features.forEach((entry, index) => {
				vm.dangerousLocations.push({
					lat: entry.properties.LAT,
					lng: entry.properties.LONG,
					clearance: entry.properties.SIGNED_CLEARANCE_MIN,

				})
				
			})
			vm.updatePosition()
			console.log('api response', response)
		})*/

		let root = this
		root.data = { parking: [] }

		let conn = new ReadinessIO({
			channel: 'noosacouncil',
			scope: root.data,
			debug: true
		})

		conn.get({
			topic: 'parking',
			onsuccess: (e) => {
				console.log('SUCCESS', e, this)
			}
		})

		window.conn = conn

	}

})