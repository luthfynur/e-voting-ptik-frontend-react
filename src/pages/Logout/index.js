import * as React from 'react';
import { useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { userLogout } from '../../features/Auth/actions';
import { logout } from '../../api/auth';

export default function Logout(){
  let history = useHistory();
  let dispatch = useDispatch();

  React.useEffect(() => {
    logout()
    .then(() => dispatch(userLogout()))
    .then(() => history.push('/'));
  }, [history, dispatch]);

  return (
    <div>
      Logging out ...
    </div>
  )
}