import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import style from './style';
import GetVideo from '../../api/video/getVideo';
import AddComment from '../../api/addComment';
import { API_URL } from '../../constants/index';
import SnackMessage from '../../commonFunctions/SnackMessage';

const ViewVideo = (props) => {

  const classes = style();
  const { video_id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [comment, setComment] = React.useState('');
  const [innerComment, setInnerComment] = React.useState('');
  const [data, setData] = React.useState(true);
  const [reply, setReply] = React.useState('');

  React.useEffect(() => {
    const loadData = async () => {
      let response = await GetVideo(video_id, props.token);
      setData(response.data);
      setLoading(false);
    }
    if(loading === true){
      loadData();
    }
  }, [props.token, video_id, loading]);

  const handleReply = (index) => {
    setReply(index);
  }

  const handlePostReply = async () => {
    let response = await AddComment({user_id: props.user_id, comment: comment, comment_type: 'post', reply_to: 'post', reply_id: data.id, is_verified: props.user_type === 'admin' ? 1 : 0}, props.token);
    SnackMessage({ status: response.status, msg: response.message });
    setComment('');
    if(response.message === 'Comment Added'){
      setLoading(true);
    }
  }

  const handlePostInnerReply = async (index) => {
    let response = await AddComment({user_id: props.user_id, comment: innerComment, comment_type: 'post', reply_to: 'comment', reply_id: index, is_verified: props.user_type === 'admin' ? 1 : 0}, props.token);
    SnackMessage({ status: response.status, msg: response.message });
    setInnerComment('');
    setReply('');
    if(response.message === 'Comment Added'){
      setLoading(true);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {loading === true 
        ? 
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        :
          <div>
            <img className={classes.image} alt="featured" src={(/http/ig).test(data.featured_img) === false ? API_URL + data.featured_img : data.featured_img} />
            <Typography variant="h5">{data.title}</Typography>
            <div>{ ReactHtmlParser(data.content) }</div>
            <Typography variant="h6" className={classes.commentHeading}>Comments</Typography>
            <Divider />
            {data.comments.map((item, index) => {
              let avatar = item.posted_by.charAt(0).toUpperCase();
              let posted_by = item.posted_by.charAt(0).toUpperCase() + item.posted_by.slice(1);
              return(
                <Grid className={classes.commentsContainer} container spacing={2} key={index}>
                  <Grid xs={1}>
                    <Avatar>{avatar}</Avatar>
                  </Grid>
                  <Grid xs={11}>
                    <Typography variant="h6">{posted_by}</Typography>
                    <Typography variant="body2">{item.comment}</Typography>
                    {item.reply_comments.map((comment) => {
                      let avatar = comment.posted_by.charAt(0).toUpperCase();
                      let posted_by = comment.posted_by.charAt(0).toUpperCase() + comment.posted_by.slice(1);
                      return(
                        <Grid className={classes.commentsContainer} container spacing={2}>
                          <Grid xs={1}>
                            <Avatar>{avatar}</Avatar>
                          </Grid>
                          <Grid xs={11}>
                            <Typography variant="h6">{posted_by}</Typography>
                            <Typography variant="body2">{comment.comment}</Typography>
                          </Grid>
                        </Grid>
                      )
                    })}
                    {reply === index ?
                      <Grid className={classes.commentsContainer} container spacing={3}>
                        <Grid xs={1}>
                          <Avatar>H</Avatar>
                        </Grid>
                        <Grid xs={9} className={classes.commentBoxContainer}>
                          <TextField id="add-comment" className={classes.commentBox} multiline size="small" placeholder="Add Comment" variant="outlined" value={innerComment} onChange={(e) => setInnerComment(e.target.value)} />
                        </Grid>
                        <Grid xs={1}>
                          <Button variant="contained" color="primary" onClick={() => handlePostInnerReply(item.id)}>
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                    : null}
                    <Button className={classes.replyButton} color="primary" onClick={() => handleReply(reply !== index ? index : '')}>{reply !== index ? 'Reply' : 'Cancel'}</Button>
                  </Grid>
                </Grid>
              )
            })}
            <Grid className={classes.commentsContainer} container spacing={3}>
              <Grid xs={1}>
                <Avatar>H</Avatar>
              </Grid>
              <Grid xs={9} className={classes.commentBoxContainer}>
                <TextField id="add-comment" className={classes.commentBox} multiline size="small" placeholder="Add Comment" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} />
              </Grid>
              <Grid xs={1}>
                <Button variant="contained" color="primary" onClick={handlePostReply}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </div>
        }
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(ViewVideo);