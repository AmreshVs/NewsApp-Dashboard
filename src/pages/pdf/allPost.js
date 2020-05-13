import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { useHistory, useLocation, Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import style from './style';
import GetAllPost from '../../api/getAllPost';
import deletePost from '../../api/deletePost';
import { API_URL } from '../../constants/index';
import SnackMessage from '../../commonFunctions/SnackMessage';

const AllPost = (props) => {

  let history = useHistory();
  let location = useLocation();
  const classes = style();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [totalPages, setTotalPages] = React.useState(10);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageSizeOpen, setPageSizeOpen] = React.useState(false);
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let response = await GetAllPost(page, pageSize, props.token);
      setData(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    }

    loadData();
  }, [props.token, page, pageSize]);

  const handleEdit = (id) => {
    setId(id);
    setOpen(true);
  }

  const handleDelete = async () => {
    let response = await deletePost(id, props.token);
    setOpen(false);
    SnackMessage({ status: response.status, msg: response.message });
    if(response.status === 200){
      reloadData();
    }
  }

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  }
  console.log(data.length)

  const reloadData = async () => {
    setLoading(true);
    let response = await GetAllPost(1, 10, props.token);
    setData(response.data);
    setTotalPages(response.pagination.totalPages);
    setLoading(false);
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Grid container spacing={1}>
              <Grid item xs={1}>
                <Typography variant="body1" className={classes.tableHeading}>Image</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.tableHeading}>Title</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.tableHeading}>Categories</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.tableHeading}>Brands</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" className={classes.tableHeading}>Posted By</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" className={classes.tableHeading}>Updated On</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.tableHeading}>Actions</Typography>
              </Grid>
            </Grid>
            {loading === true 
              ? 
                <div>
                  <Divider className={classes.divider} />
                  <CircularProgress  />
                </div>
              :
                
                data !== {} && data.map((item) => {
                  return (
                    <div key={item.id}>
                      <Divider className={classes.divider} />
                      <Grid container spacing={1}>
                        <Grid item xs={1} className={classes.tableCell}>
                          <img className={classes.postsimage} src={API_URL + item.featured_img} alt="upload" />
                        </Grid>
                        <Grid item xs={3} className={classes.tableCell}>
                          <Typography variant="body1" gutterBottom>
                            {item.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.tableCell}>
                          <div className={classes.chips}>
                            {(item.categories).map((chip) => {
                              return <Chip key={chip} label={chip} size="small" color="primary" variant="outlined" />
                            })}
                          </div>
                        </Grid>
                        <Grid item xs={2} className={classes.tableCell}>
                          <div className={classes.chips}>
                            {(item.brands).map((chip) => {
                              return <Chip key={chip} label={chip} size="small" color="primary" variant="outlined" />
                            })}
                          </div>
                        </Grid>
                        <Grid item xs={1} className={classes.tableCell}>
                          <Typography variant="body1" gutterBottom>
                            {item.created_by}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} className={classes.tableCell}>
                          <Typography variant="body2" gutterBottom>
                            {moment(item.updated_on).format('MMMM Do YYYY, h:mm:ss a')}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.tableCell}>
                          <div className={classes.actionButtons}>
                            <Button variant="contained" size="small" color="secondary" onClick={() => handleEdit(item.id)}>
                              Delete
                            </Button>
                            <Button variant="contained" size="small" color="primary" onClick={() => history.push('/dashboard/edit-post/' + item.id)}>
                              Edit
                            </Button>
                          </div>
                        </Grid>
                      </Grid> 
                    </div>
                  )
                })
            }
            <div className={classes.formControl}>
              <Pagination
                page={page}
                count={totalPages}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/dashboard/all-post${item.page === 1 ? '' : `?page=${item.page}&size=${pageSize}`}`}
                    {...item}
                  />
                )}
              />
              { data.length >= 10 ?
                <div className={classes.tableCell}>
                  <Typography variant="body2" className={classes.pageSize}>Page Size</Typography>
                  <Select
                    value={pageSize}
                    open={pageSizeOpen}
                    onOpen={() => setPageSizeOpen(true)}
                    onClose={() => setPageSizeOpen(false)}
                    onChange={handlePageSize}
                  >
                    <MenuItem value={10}>10</MenuItem >
                    <MenuItem value={20}>20</MenuItem >
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </div>
              : null}
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting post is irreversable. Click 'Ok' to proceed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return state.common.userData;
};

export default connect(mapStateToProps)(AllPost);