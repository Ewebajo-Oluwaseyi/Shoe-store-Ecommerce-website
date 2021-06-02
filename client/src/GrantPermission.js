import {ROLES} from './App.constants';


export const grantPermission = (role = [...ROLES]) => {

  const user = JSON.parse(localStorage.getItem("user"))
 // console.log(user)
  const roles = user
 //console.log(role)
  const isPermitted = role.filter(item => {
      return item === roles
      //console.log(item)
    })

    return isPermitted.length > 0 ? true : false;

}