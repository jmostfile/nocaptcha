export const state = () => ({
  ipv4: '',
  ipv6: '',
  search: { q: '', c: '' },
})
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  ipv4user(state) {
    return state.ipv4
  },
  ipv6user(state) {
    return state.ipv6
  },
  search(state) {
    return state.search
  },
}
export const actions = {
  async ipUser({ commit, state }) {
    if (!state.ipv4 || !state.ipv6) {
      this.$axios.setToken(false)
      const ipv4 = await this.$axios.$get('https://ipv4.icanhazip.com/')
      const ipv6 = await this.$axios.$get('https://ipv6.icanhazip.com/')
      commit('SET_IPV4', ipv4.replace(/\n/g, ''))
      commit('SET_IPV6', ipv6.replace(/\n/g, ''))
    }
  },
  SEARCH(context, payload){
    context.commit('SEARCH', payload)
  }
}
export const mutations = {
  SET_IPV4(state, ipv4) {
    state.ipv4 = ipv4
  },
  SET_IPV6(state, ipv6) {
    state.ipv6 = ipv6
  },
  SEARCH(state, search) {
    state.search.q = search.q
    state.search.c = search.c
  },
}
