// import shop from '../../api/shop'

const state = () => ({
	test: 'test'
})

const mutations = {
	setTest(state, data) {
		state.test = data
	}
}

const actions = {
	setTest({ commit }) {
		// const products = await shop.getProducts()
		commit('setTest', 'test2')
	}
}

const getters = {
	test: (state) => state.test
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}