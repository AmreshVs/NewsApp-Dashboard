import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textBox:{
    width: '100%',
    fontSize: 20,
    marginBottom: theme.spacing(3)
  },
  ckEditor:{
    height: '500px'
  },
  heading:{
    textAlign: 'start',
    marginTop: 0
  },
  input: {
    display: 'none',
  },
  image:{
    width: '100%',
    maxHeight: 400
  }
}));

export default style;