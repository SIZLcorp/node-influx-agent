import axios from 'axios'

// 인터넷 연결 확인
export async function isInternetConnected() {
  try {
    await axios.get('http://google.com')
    return true
  } catch {
    return false
  }
}
