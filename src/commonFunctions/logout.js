import { useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();
  const userData = localStorage.removeItem('userData');
  if (userData) {
    history.replace('/login');
  }

}

export default Logout;