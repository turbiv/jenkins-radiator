import React from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from "react-i18next"

const MainPage = () => {

  const { t, i18n } = useTranslation();

  return(
    <div>
      <h2>{t("welcome")}</h2>
      <Link to={"/radiator"}>{t("viewRadiator")}</Link><br/>
      <Link to={"/admin/"}>{t("adminPanel")}</Link>
    </div>
  )
}

export default MainPage;