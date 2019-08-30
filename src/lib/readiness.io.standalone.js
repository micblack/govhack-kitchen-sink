'use strict';

/*
Requires
- Axios []
- ReconnectingWebSockets [https://github.com/joewalnes/reconnecting-websocket]
*/

class ReadinessIO {
	constructor(options) {
		options = options || {}
		
		this.channel = options.channel || 'sandbox'
		this.httpURL = [
			document.location.protocol,
			'//',
			this.channel,
			'.v1.readiness.io'
		].join('')
		this.wsURL = [
			'ws://',
			this.channel,
			'.v1.readiness.io'
		].join('')

		this.readKey = options.readKey || ''
		this.writeKey = options.writeKey || ''
		this.deleteKey = options.deleteKey || ''

		this.topics = {}
		this.stores = {}

		this.scope = options.scope || this	
		this.debug = !!options.debug
	}



	listen(options) {
		let root = this
		let topicName = options.topic

		if (!topicName) {
			if (root.debug) console.log(['[RIO] listen ', root.channel, '/', ': no topicName provided'].join(''), options)
			return false
		}

		let topic = this.topics[topicName] = {}
		let store = this.stores[topicName] = {}
		let apiKey = ['apiKey=', this.writeKey || this.readKey || ''].join('')
		let filter = this.options.filter || false

		let conn = topic.conn = new ReconnectingWebSocket([this.wsURL, '/', topic, '?1&', apiKey, filter && '&' + filter])

		options = Object.assign({}, { scope: undefined, dataStore: undefined, onmessage: undefined, onopen: undefined, onclose: undefined, onsend: undefined }, options)

		conn.onopen = () => {
			topic.connected = true
			if (root.debug) console.log(['[RIO] listen ', root.channel, '/', topicName, ': connected'].join(''))
			if (typeof options.onopen === 'function') {
				if (options.scope) {
					options.onopen.call(options.scope)
				} else {
					options.onopen()
				}
			} 
		}

		conn.onclose = () => {
			topic.connected = true
			if (root.debug) console.log(['[RIO] listen ', root.channel, '/', topicName, ': disconnected'].join(''))
			if (typeof options.onopen === 'function') {
				if (options.scope) {
					options.onclose.call(options.scope)
				} else {
					options.onclose()
				}
			} 
		}

		conn.onmessage = (ev) => {
			let data = JSON.parse(ev.data)
			store = Object.assign({}, data)

			if (typeof options.dataStore) {
				dataStore = Object.assign({}, data)
			}
			if (root.debug) console.log(['[RIO] listen ', root.channel, '/', topicName, ': onmessage', data].join(''), data)
		}
	}

	broadcast(options) {
		let root = this
		let topicName = options.topic

		if (!topicName) {
			if (root.debug) console.log(['[RIO] broadcast ', root.channel, '/', ': ERR no topicName provided'].join(''), options)
			return false
		}

		let topic = this.topics[topicName]

		if (!topicName) {
			if (root.debug) console.log(['[RIO] broadcast ', root.channel, '/', ': ERR broadcast without listen'].join(''), options)
			return false
		}

		let conn = topic.conn

		if (topic.connected) {
			conn.send(message)
			if (root.debug) console.log(['[RIO] broadcast ', root.channel, '/', topicName].join(''), data)
		} else {
			if (root.debug) console.log(['[RIO] broadcast ', root.channel, '/', topicName, ': not connected'].join(''), message)
		}

	}

	get(options) {

		let root = this
		let topicName = options.topic
		let url = [this.httpURL, '/', topicName, '/?', this.readKey ? this.readKey : ''].join('')
		options = Object.assign({}, { onsuccess: undefined, onerror: undefined }, options)
		
		axios.get(url)
			.then((response) => {
				var data = response.data == 'Not Found' ? [] : response.data
				root.scope[topicName] = Object.assign({}, data)
				debugger

				if (typeof options.onsuccess === 'function') {
					if (options.scope) {
						options.onsuccess.call(options.scope)
					} else {
						options.onSuccess(data)
					}
				}

				if (root.debug) console.log(['[RIO] get ', root.channel, '/', topicName,].join(''), data)
			})
			.catch((error) => {
				if (root.debug) console.log(['[RIO] get ', root.channel, '/', topicName, ': error'].join(''), error, options)
			})
	}

	poll(options) {
		let root = this
		let frequency = options.frequency || 600000 // default to every minute
		return setInterval(() => {
			root.get(options).call(root)
		}, frequency)
	}

	post(options) {

		let url = [this.httpURL, '/', topic, '?', this.readKey ? this.readKey : '']
		options = Object.assign({}, { payload: {}, scope: undefined, onsuccess: undefined, onerror: undefined }, options)
		
		axios.post(url, options.payload)
			.then((response) => {
				if (typeof options.onsuccess === 'function') {
					if (options.scope) {
						options.onsuccess.call(options.scope)
					} else {
						options.onSuccess()
					}
				}

				if (root.debug) console.log(['[RIO] post ', root.channel, '/', topicName,].join(''), options.payload)
			})
			.catch((error) => {
				if (root.debug) console.log(['[RIO] get ', root.channel, '/', topicName, ': error'].join(''))
			})

	}
}