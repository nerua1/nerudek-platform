const SESSION_KEY = 'nerudek_age_session'
const PERSIST_KEY = 'nerudek_age_verified'

export const ageGate = {
  isVerified(): boolean {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === '1' || localStorage.getItem(PERSIST_KEY) === '1'
  },
  verify(remember = false) {
    sessionStorage.setItem(SESSION_KEY, '1')
    if (remember) localStorage.setItem(PERSIST_KEY, '1')
  },
  reset() {
    sessionStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(PERSIST_KEY)
  },
}
