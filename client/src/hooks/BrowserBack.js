import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BrowserBack = () => {
  const navigate = useNavigate();

  const browserBackEvent = (e) => {
    alert('エラーが発生しました。トップページへ戻ります。')
    navigate('/')
  }

  useEffect(() => {
    window.addEventListener('popstate', browserBackEvent, true)
    return () => window.removeEventListener('popstate', browserBackEvent, false)
  }, [])

  return null
}
export default BrowserBack
