import React, {useEffect, useState} from "react";
import {getAll} from "../services/radiator"
import "../css/admin-home.css"
import {Link} from "react-router-dom"
import DropdownButton from "../common/DropdownButton"
import {useTranslation} from "react-i18next"

const AdminHome = () => {

  const [radiatorData, setRadiatorData] = useState([])
  const [radiatorStatus, setRadiatorStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getAll().then((response) => {
      console.log(response)
      setRadiatorData(response)
      setLoading(false)
    }).catch((error) => {
      setRadiatorStatus(error)
      setLoading(false)
    })
  }, [])

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return (
    <div>
      <div className={"radiator-list-column"}>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 3}}>
            {t("radiatorName")}
          </p>
          <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
            {t("owner")}
          </p>
          <p style={{flexGrow: 1}}>
            {t("options")}
          </p>
        </div>
        {loading ? <div>{t("loading")}</div> : radiatorData.map((radiator, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 3}}>
                <Link to={"/radiator/" + radiator.id}>{radiator.name}<br/></Link>
              </div>

              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
                {radiator.owner.name || t("noOwner")}
              </div>

              <div className={"radiator-list-box-div"} style={{flexGrow: 1}}>
                <DropdownButton title={"Options"}>
                  <Link to={`/admin/radiator/${radiator.id}`}>{t("editRadiator")}</Link>
                  <Link to={`/admin/radiator/${radiator.id}/settings`}>{t("radiatorSettings")}</Link>
                </DropdownButton>
              </div>
            </div>
          );
        })}
        <Link to={"/admin/radiators/new"}><button>{t("newRadiator")}</button></Link>
        </div>
        <div className={"history-column"}>

        </div>
      </div>
  );
}

export default AdminHome;