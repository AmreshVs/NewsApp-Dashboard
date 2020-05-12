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
import GetPost from '../../api/getPost';
import { API_URL } from '../../constants/index';

const ViewPost = (props) => {

  const classes = style();
  const { post_id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(true);
  // const [state, setState] = React.useState({
  //   loading: true  
  // });

  React.useEffect(() => {
    const loadData = async () => {
      let response = await GetPost(post_id, props.token);
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    }

    loadData();
  }, [props.token, post_id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {loading === true 
        ? 
          <CircularProgress />
        :
          <div>
            <img className={classes.image} alt="featured" src={API_URL + data.featured_img} />
            <Typography variant="h5">{data.title}</Typography>
            <div>{ ReactHtmlParser(data.content) }</div>
            <Typography variant="h6" className={classes.commentHeading}>Comments</Typography>
            <Divider />
            <Grid className={classes.commentsContainer} container spacing={2}>
              <Grid xs={1}>
                <Avatar>H</Avatar>
              </Grid>
              <Grid xs={11}>
                <Typography variant="h6">Amresh Vs</Typography>
                <Typography variant="body2">ஆகி உள்ளதால், தயாரிப்புக்குப் பிந்தைய பணிகளை செய்வதற்காக மட்டும் அனுமதி அளிக்க வேண்டும் என்றும் அரசிடம் கோரிக்கை வைத்தனர். அதன் அடிப்படையில் தற்போது அனுமதி வழங்கப்பட்டுள்ளது.</Typography>
                <Button color="primary">Reply</Button>
              </Grid>
            </Grid>
            <Grid className={classes.commentsContainer} container spacing={3}>
              <Grid xs={1}>
                <Avatar>H</Avatar>
              </Grid>
              <Grid xs={9}>
                <TextField id="add-comment" className={classes.commentBox} multiline size="small" placeholder="Add Comment" variant="outlined" />
              </Grid>
              <Grid xs={2}>
                <Button variant="contained" color="primary">
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

export default connect(mapStateToProps)(ViewPost);