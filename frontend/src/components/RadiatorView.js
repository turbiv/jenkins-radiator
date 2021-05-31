import React, {useEffect, useState} from 'react'
import Job from "../common/Job"
import Group from "../common/Group";
import "../css/radiator.css";
import {getRadiatorById} from "../services/public"
import {useTranslation} from "react-i18next"

const RadiatorView = ({radiatorId}) => {

  const [radiator, setRadiator] = useState(null)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getRadiatorById(radiatorId).then((response) => setRadiator(response))
      .catch((error) => console.debug(error))
  }, [])

  if(!radiator){
    return(
      <div>
        {t("loadingRadiator")}
      </div>
    )
  }

  return(
    <div>
      {radiator.groups.map((category, index) =>{
        return(
          <Group key={index} title={category.title}>
            {category.jobs.map((row, index)=>{
              return(
                <div key={index} className={"container"}>
                  {row.map((job, index) => <Job key={index} jenkinsHost={job.jenkins.hostname} jenkinsPort={job.jenkins.port} jenkinsPath={job.path} token={job.jenkins.token} grow={job.grow} order={job.order} name={job.name}/>)}
                </div>
              );
            })}
          </Group>
        );
      })}
    </div>
  )
}

export default RadiatorView;