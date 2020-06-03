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
    maxHeight: 400,
    borderRadius: 5,
    cursor: 'pointer'
  },
  postsimage:{
    width: '50%',
    borderRadius: 5,
    maxHeight: 70
  },
  button:{
    width: '100%'
  },
  expansion:{
    display: 'block'
  },
  chips:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
  actionButtons:{
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
  tableHeading:{
    fontWeight: 600
  },
  tableCell:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  divider:{
    margin: '10px 0px'
  },
  formControl:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  pageSize:{
    paddingRight: 10
  },
  commentBox:{
    width: '100%'
  },
  commentHeading:{
    marginBottom: 10
  },
  commentsContainer:{
    marginTop: 10
  },
  commentBoxContainer:{
    marginRight: 10
  },
  replyButton:{
    marginTop: 20
  },
  loader:{
    textAlign: 'center'
  },
  pdfContainer:{
    padding: 35,
    borderRadius: 5
  },
  pointer:{
    cursor: 'pointer',
    '&:hover':{
      color: theme.palette.primary.main
    },
  },
  notificationContainer:{
    textAlign: 'right',
    marginBottom: 10
  },
  formControlSelect: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dialogContent:{
    textAlign: 'center'
  }
}));

export default style;