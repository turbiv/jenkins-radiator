import React, {useEffect, useState} from 'react'
import Job from "../common/Job"
import Group from "../common/Group";
import "../css/radiator.css";
import {getRadiatorById} from "../services/public"

const RadiatorView = ({radiatorId}) => {

  const [radiator, setRadiator] = useState(null)

  useEffect(() => {
    getRadiatorById(radiatorId).then((response) => setRadiator(response))
      .catch((error) => console.debug(error))
  }, [])

  if(!radiator){
    return(
      <div>
        Loading radiator...
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

/*
      without loops how it should look like:
      <Category title={"Test title 1"}>
        <div className={"container"}>
          <Job grow={1} order={1} text={"One"} color={"red"}/>
          <Job grow={1} order={2} text={"Two"} color={"red"}/>
          <Job grow={1} order={3} text={"Three"}/>
          <Job grow={1} order={4} text={"Four"}/>
          <Job grow={1} order={5} text={"Five"} color={"red"}/>
        </div>
        <div className={"container"}>
          <Job grow={1} order={1} text={"One"}/>
          <Job grow={1} order={2} text={"Two"} color={"red"}/>
          <Job grow={1} order={3} text={"Three"}/>
        </div>
        <div className={"container"}>
          <Job grow={1} order={1} text={"One"}/>
        </div>
      </Category>
      <Category title={"Test title 2"}>
        <div className={"container"}>
          <Job order={1} text={"One"} color={"red"}/>
          <Job order={2} text={"Two"} color={"red"}/>
          <Job order={3} text={"Three"}/>
          <Job order={4} text={"Four"}/>
        </div>
        <div className={"container"}>
          <Job order={1} text={"One"}/>
          <Job order={2} text={"Two"} color={"red"}/>
        </div>
      </Category>
 */