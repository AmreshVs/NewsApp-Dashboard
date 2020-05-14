import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import SyncIcon from '@material-ui/icons/Sync';
import { useHistory } from "react-router-dom";

import { API_URL } from '../../constants/index';
import style from './style';
import ImageUpload from '../../api/imageUpload';
import VideoUpload from '../../api/video/videoUpload';
import CreateVideo from '../../api/video/addVideo';
import GetCategories from '../../api/getCategories';
import GetBrands from '../../api/getBrands';
import SnackMessage from '../../commonFunctions/SnackMessage';

const AddVideo = (props) => {

  const history = useHistory();
  const classes = style();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [image, setImage] = React.useState(require('../../img/img-placeholder.jpg'));
  const [imageFlag, setImageFlag] = React.useState(false);
  const [videoFlag, setVideoFlag] = React.useState(false);
  const [brandsChecked, setBrandsChecked] = React.useState([]);
  const [brands, setBrands] = React.useState({});
  const [categoriesChecked, setCategoriesChecked] = React.useState([]);
  const [categories, setCategories] = React.useState({});
  const [videoUrl, setVideoUrl] = React.useState('');
  const [videoLink, setVideoLink] = React.useState(''); //http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
  const fileInput = React.createRef();
  const videoFileInput = React.createRef();

  React.useEffect(() => {
    const loadData = async () => {
      const categories_response = await GetCategories(props.userData.token);
      const brands_response = await GetBrands(props.userData.token);
      setCategories(categories_response);
      setBrands(brands_response);
    }
    loadData();
  }, [props.userData.token])

  const handleBrandsCheck = (id) => {
    if (!brandsChecked.includes(id)) {
      setBrandsChecked([...brandsChecked, id]);
    }
    else {
      let index = brandsChecked.indexOf(id);
      let newBrands = [...brandsChecked];
      newBrands.splice(index, 1);
      setBrandsChecked(newBrands);
    }
  }

  const handleCategoriesCheck = (id) => {
    if (!categoriesChecked.includes(id)) {
      setCategoriesChecked([...categoriesChecked, id]);
    }
    else {
      let index = categoriesChecked.indexOf(id);
      let newCategories = [...categoriesChecked];
      newCategories.splice(index, 1);
      setCategoriesChecked(newCategories);
    }
  }

  const handleFileInput = async (image) => {
    setImageFlag(true);
    const response = await ImageUpload(image, props.userData.token);
    setImage(response.url);
  }

  const handleVideoUpload = async (video) => {
    const response = await VideoUpload(video, props.userData.token);
    setVideoUrl(response.url);
    setVideoFlag(true);
  }

  const validateData = () => {
    if (!title) {
      SnackMessage({ status: 401, msg: 'Title cannot be empty' });
      return false;
    }

    if (!description) {
      SnackMessage({ status: 401, msg: 'Description cannot be empty' });
      return false;
    }

    if (!videoUrl) {
      SnackMessage({ status: 401, msg: 'Video cannot be empty' });
      return false;
    }

    if (!imageFlag) {
      SnackMessage({ status: 401, msg: 'Image cannot be empty' });
      return false;
    }

    if (brandsChecked.length <= 0) {
      SnackMessage({ status: 401, msg: 'Brands cannot be empty' });
      return false;
    }

    if (categoriesChecked.length <= 0) {
      SnackMessage({ status: 401, msg: 'Brands cannot be empty' });
      return false;
    }

    return true;
  }

  const handleSubmit = async () => {
    if (validateData()) {
      let data = { title: title, description: description, url: videoUrl, featured_img: image, categories: categoriesChecked, brands: brandsChecked, tags: tags };
      const response = await CreateVideo(data, props.userData.token);
      SnackMessage({ status: response.status, msg: response.message });
      history.replace('/dashboard/all-video');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Add Video</h3>
                <TextField
                  id="title"
                  variant="outlined"
                  placeholder="Title"
                  className={classes.textBox}
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="description"
                  variant="outlined"
                  placeholder="Description"
                  margin="normal"
                  size="small"
                  className={classes.textBox}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Grid item xs={12} className={classes.pdfContainer}>
                  {videoUrl !== '' ? <video width="100%" height="600" controls={true} src={videoFlag === true ? API_URL + videoUrl : videoUrl} aria-label="mp4"/> : null}
                  <label htmlFor="video-upload">
                    <input
                      accept="video/*"
                      className={classes.input}
                      id="video-upload"
                      ref={videoFileInput}
                      onChange={(e) => handleVideoUpload(e.target.files[0])}
                      type="file"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.pdfButton}
                      component="span"
                      onChange={handleFileInput}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Video
                    </Button>
                  </label>
                  <p>or</p>
                  <Grid container>
                    <Grid item xs={10}>
                      <TextField
                        id="video-link"
                        variant="outlined"
                        size="small"
                        placeholder="Video Link"
                        className={classes.textBox}
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.pdfButton}
                        component="span"
                        startIcon={<SyncIcon />}
                        onClick={() => setVideoUrl(videoLink)}
                      >
                        Parse Video
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Brands</h3>
                <FormGroup row>
                  {brands.length > 0 ? brands.map((item) => {
                    return (
                      <FormControlLabel
                        key={item.id}
                        control={<Checkbox checked={brandsChecked.includes(item.id)} onChange={() => handleBrandsCheck(item.id)} name={item.name} />}
                        label={item.name}
                      />
                    )
                  }) : null}
                </FormGroup>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Featured Image</h3>
                <label htmlFor="contained-button-file">
                  <img className={classes.image} src={imageFlag ? API_URL + image : image} alt="upload" />
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    ref={fileInput}
                    onChange={(e) => handleFileInput(e.target.files[0])}
                    type="file"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    component="span"
                    onChange={handleFileInput}
                    startIcon={<CloudUploadIcon />}
                  >
                    {imageFlag === true ? 'Update Image' : 'Upload Image'}
                  </Button>
                </label>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Categories</h3>
                <FormGroup row>
                  {categories.length > 0 ? categories.map((item) => {
                    return (
                      <FormControlLabel
                        key={item.id}
                        control={<Checkbox checked={categoriesChecked.includes(item.id)} onChange={() => handleCategoriesCheck(item.id)} name={item.name} />}
                        label={item.name}
                      />
                    )
                  }) : null}
                </FormGroup>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Tags</h3>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.textBox}
                  multiline
                  rows={5}
                  placeholder="politics, news, breaking news, ..."
                  variant="outlined"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Finish</h3>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  component="span"
                  onClick={handleSubmit}
                  startIcon={<CheckIcon />}
                >
                  Submit Post
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(AddVideo);