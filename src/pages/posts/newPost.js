import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

const NewPost = () => {

  const classes = style();
  const [checked, setChecked] = React.useState(false);
  const [image, setImage] = React.useState('https://keeleandfinchdentaloffice.com/wp-content/uploads/2016/10/orionthemes-placeholder-image-750x750.jpg');
  const fileInput = React.createRef();

  const handleFileInput = (e) => {
    console.log(e)
    setImage(e);
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
          <Paper className={classes.paper}>
            <h1 className={classes.heading}>New Post</h1>
            <TextField
              id="standard-full-width"
              placeholder="Title"
              className={classes.textBox}
              margin="normal"
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
                  return new ImageUploadAdapter(loader);
                };
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <h3 className={classes.heading}>Featured Image</h3>
                  <img className={classes.image} src={image} alt="upload"/>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    ref={fileInput}
                    onChange={(e) => handleFileInput(e.target.files[0])}
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      component="span"
                      onChange={handleFileInput}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                    </Button>
                  </label>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <h3 className={classes.heading}>Categories</h3>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} name="checkedA" />}
                      label="Secondary"
                    />
                  </FormGroup>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default NewPost;