import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import style from './style';
import GetSummary from '../../api/getSummary';
import { API_URL } from '../../constants/index';

const Summary = ({ token }) => {
  
  let history = useHistory();
  const classes = style();
  const [state, setState] = React.useState({
    data: [],
    loading: true,
  });

  React.useEffect(() => {

    async function loadData(){
      const response = await GetSummary(token);
      setState({ ...state, data: response.data, loading: false });
    }

    loadData();
  }, [state, token]);

  return (
    state.loading === true 
    ?
      <div className={classes.loader}>
        <CircularProgress  />
      </div>
    :
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Last Published News
              </Typography>
              {state.data.news.length === 0 && 
                <Typography variant="p" gutterBottom>
                  No News's yet!
                </Typography>
              }
              {state.data.news.length > 0 && state.data.news.map((news) => {
                let image = (/http/ig).test(news.featured_img) === true ? news.featured_img : API_URL + news.featured_img;
                return(
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <img className={classes.image} src={image} alt='img' />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography className={classes.pointer} variant="body2" onClick={() => history.push('/dashboard/view-news/' + news.id)}>
                          {news.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <Box color="text.secondary">{moment(news.posted_on).fromNow()}</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </> 
                )
              })}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Last Published Videos
              </Typography>
              {state.data.videos.length === 0 && 
                <Typography variant="p" gutterBottom>
                  No Videos's yet!
                </Typography>
              }
              {state.data.videos.length > 0 && state.data.videos.map((video) => {
                let image = (/http/ig).test(video.featured_img) === true ? video.featured_img : API_URL + video.featured_img;
                return(
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <img className={classes.image} src={image} alt='img' />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="body2" className={classes.pointer} onClick={() => history.push('/dashboard/view-video/' + video.id)}>
                          {video.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <Box color="text.secondary">{moment(video.posted_on).fromNow()}</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </>
                )
              })}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Last Published PDF's
              </Typography>
              {state.data.pdfs.length === 0 && 
                <Typography variant="p" gutterBottom>
                  No PDF's yet!
                </Typography>
              }
              {state.data.pdfs.length > 0 && state.data.pdfs.map((pdf) => {
                let image = (/http/ig).test(pdf.featured_img) === true ? pdf.featured_img : API_URL + pdf.featured_img;
                return(
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <img className={classes.imagePdf} src={image} alt='img' />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="body2" className={classes.pointer} onClick={() => history.push('/dashboard/view-pdf/' + pdf.id)}>
                          {pdf.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <Box color="text.secondary">{moment(pdf.posted_on).fromNow()}</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </>
                )
              })}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Latest Comments
              </Typography>
              {state.data.comments.length === 0 && 
                <Typography variant="p" gutterBottom>
                  No Comments yet!
                </Typography>
              }
              {state.data.comments.length > 0 && state.data.comments.map((comment) => {
                return(
                  <>
                    <Grid container spacing={2} className={classes.divider}>
                      <Grid item xs={1}>
                        <Avatar>U{comment.id}</Avatar>
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="body2">
                          {comment.comment}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <Box color="text.secondary">{moment(comment.posted_on).fromNow()}</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </>
                )
              })}
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(Summary);