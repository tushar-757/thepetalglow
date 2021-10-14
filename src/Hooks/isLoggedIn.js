import React, { useEffect, useState } from 'react';


const IsLoggedIn = () => {
  const [user, setUser] = useState(null)
  const [user_id, setUserId] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const user = localStorage.getItem('user')
        const user_id = localStorage.getItem('user_id')
        if (user !== null && user_id !== null) {
          setUser(user)
          setUserId(user_id)
        }
      } catch (e) {
        console.log('🚀 -------------------------------------------------')
        console.log('🚀 ~ file: Dashboard.js ~ line 44 ~ getData ~ e', e)
        console.log('🚀 -------------------------------------------------')
      }
    }
    getData();
  }, [user, user_id])

  return [user, user_id];
};

export default IsLoggedIn;