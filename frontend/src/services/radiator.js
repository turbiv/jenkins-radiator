import data from "../test_data/radiators.json"
import singleRad from "../test_data/single_radiator.json"

export const getAll = () => {
  return data
};

export const getRadiatorById = () =>{
  return singleRad
}

export const postRadiator = (radiatorJson) =>{
  console.log(radiatorJson)
  return true
}

export default { getAll, getRadiatorById }
