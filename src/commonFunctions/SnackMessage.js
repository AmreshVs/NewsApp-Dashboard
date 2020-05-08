import { snackMessage } from '../redux/actions/commonActions';
import store from '../redux/store';

const snackbarMessage = (data) => {
  store.dispatch(snackMessage({ visible: true, msg: data.msg, status: data.status }));
  setTimeout(() => {
    store.dispatch(snackMessage({ visible: false, msg: data.msg, status: data.status }));
  }, 3000);
}

export default snackbarMessage;