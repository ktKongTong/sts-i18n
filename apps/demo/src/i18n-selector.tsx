import {useLocale} from "./i18n";


export default function I18nSelector() {

  const { locale, setLocale } = useLocale()
  const handleSelect = (e:any) => {
    e.preventDefault()
    const v = e.target.value
    setLocale(v)
  }
  return <div>
    <select value={locale} onChange={handleSelect}>
      <option value="en-US">English</option>
      <option value="zh-CN">中文</option>
    </select>
  </div>

}