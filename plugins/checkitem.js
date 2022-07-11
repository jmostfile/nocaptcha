const strategy = 'local'

async function checkitemexp($auth, $axios, token, refreshToken) {
  if (token && refreshToken) {
    try {
      $axios.setToken(token)
      const response = await $axios.post('/api/account/checkitemexp/')
      $axios.setToken(false)
      return response
    } catch (error) {
      $auth.logout()
      throw new Error('Error while check user item')
    }
  }
}

export default async function ({ app }) {
  const { $axios, $auth } = app

  const token = $auth.getToken(strategy)
  const refreshToken = $auth.getRefreshToken(strategy)

  if (token && refreshToken) {
    let date1
    let date2 = new Date()
    const newdate2 =
      date2.getFullYear() +
      '-' +
      ('0' + (date2.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date2.getDate()).slice(-2)
    if ($auth.user.profile.lastcheckitem == null) {
      date1 = parseInt(newdate2.split('-').join(''))
    } else {
      date1 = parseInt($auth.user.profile.lastcheckitem.split('-').join(''))
    }
    date2 = parseInt(newdate2.split('-').join(''))
    if (date1 < date2) {
      await checkitemexp($auth, $axios, token, refreshToken)
    }
  }
}
