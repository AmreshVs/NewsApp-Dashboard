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
import { useHistory } from "react-router-dom";
import { API_URL } from '../../constants/index';

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Font from '@ckeditor/ckeditor5-font/src/font';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapterPlugin from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
import ImageCaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';

import style from './style';
import ImageUploadAdapter from '../../commonFunctions/imageUploadAdapter';
import ImageUpload from '../../api/imageUpload';
import CreatePost from '../../api/post/newPost';
import GetCategories from '../../api/getCategories';
import GetBrands from '../../api/getBrands';
import SnackMessage from '../../commonFunctions/SnackMessage';

const NewPost = (props) => {

  const history = useHistory();
  const classes = style();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [image, setImage] = React.useState(require('../../img/img-placeholder.jpg'));
  const [imageFlag, setImageFlag] = React.useState(false);
  const [brandsChecked, setBrandsChecked] = React.useState([]);
  const [brands, setBrands] = React.useState({});
  const [categoriesChecked, setCategoriesChecked] = React.useState([]);
  const [categories, setCategories] = React.useState({});
  const fileInput = React.createRef();

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

  const validateData = () => {
    if (!title) {
      SnackMessage({ status: 401, msg: 'Title cannot be empty' });
      return false;
    }

    if (!content) {
      SnackMessage({ status: 401, msg: 'Content cannot be empty' });
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
      let data = { title: title, content: content, featured_img: image, categories: categoriesChecked, brands: brandsChecked, tags: tags };
      const response = await CreatePost(data, props.userData.token);
      SnackMessage({ status: response.status, msg: response.message });
      history.replace('/dashboard/all-post');
    }
  }

  const editorConfiguration = {
    plugins: [
      EssentialsPlugin, AutoformatPlugin, BoldPlugin, ItalicPlugin, BlockQuotePlugin, HeadingPlugin, ImagePlugin, ImageCaptionPlugin, ImageStylePlugin, ImageToolbarPlugin, ImageUploadPlugin, LinkPlugin, ListPlugin, ParagraphPlugin, UploadAdapterPlugin, Font, PageBreak, PasteFromOffice, SpecialCharacters, SpecialCharactersEssentials, Alignment, TodoList
    ],
    toolbar: [
      'heading', 'bold', 'italic', 'alignment', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'pageBreak', 'link', 'bulletedList', 'numberedList', 'imageUpload', 'blockQuote', 'SpecialCharacters', 'todoList', 'undo', 'redo',
    ],
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>New Post</h3>
                <TextField
                  id="standard-full-width"
                  variant="outlined"
                  placeholder="Title"
                  className={classes.textBox}
                  margin="normal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <CKEditor
                  activeClass={classes.ckEditor}
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  data=""
                  onInit={editor => {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                      return new ImageUploadAdapter(loader, props.userData.token);
                    };
                  }}
                  onChange={(event, editor) => {
                    setContent(editor.getData());
                  }}
                />
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

export default connect(mapStateToProps)(NewPost);