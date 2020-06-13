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
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import style from './style';
import PdfUpload from '../../api/pdf/pdfUpload';
import ImageUpload from '../../api/imageUpload';
import CreatePdf from '../../api/pdf/addPdf';
import GetPdf from '../../api/pdf/getPdf';
import GetCategories from '../../api/getCategories';
import GetBrands from '../../api/getBrands';
import SnackMessage from '../../commonFunctions/SnackMessage';
import { API_URL } from '../../constants/index';

const EditPdf = (props) => {

  const history = useHistory();
  const { pdf_id } = useParams();
  const classes = style();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [image, setImage] = React.useState(require('../../img/img-placeholder.jpg'));
  const [imageFlag, setImageFlag] = React.useState(false);
  const [brandsChecked, setBrandsChecked] = React.useState([]);
  const [brands, setBrands] = React.useState({});
  const [categoriesChecked, setCategoriesChecked] = React.useState([]);
  const [categories, setCategories] = React.useState({});
  const [pdfUrl, setPdfUrl] = React.useState('');
  const [upload, setUpload] = React.useState(false);
  const [pdfUpload, setPdfUpload] = React.useState(false);
  const [loading, setLoading] =  React.useState(true);
  const fileInput = React.createRef();
  const pdfFileInput = React.createRef();

  React.useEffect(() => {
    const loadData = async () => {
      const categories_response = await GetCategories(props.userData.token);
      const brands_response = await GetBrands(props.userData.token);
      setCategories(categories_response);
      setBrands(brands_response);
      const post_response = await GetPdf(pdf_id, props.userData.token);
      updateData(post_response.data);
      setLoading(false);
    }
    loadData();
  }, [props.userData.token, pdf_id])

  const updateData = (data) => {
    let { title, description, tags, url, featured_img, categories, brands } = data;
    let categories_data = categories.split(',');
    let categories_array = [];
    categories_data.map((item) => {
      return categories_array.push(parseInt(item));
    });
    let brands_data = brands.split(',');
    let brands_array = [];
    brands_data.map((item) => {
      return brands_array.push(parseInt(item));
    });
    setTitle(title);
    setDescription(description);
    setTags(tags);
    setPdfUrl(url);
    let image = (/http/ig).test(featured_img) === true ? featured_img : API_URL + featured_img;
    setImage(image);
    setCategoriesChecked(categories_array);
    setBrandsChecked(brands_array);
  }

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

  const validateData = () => {
    if (!title) {
      SnackMessage({ status: 401, msg: 'Title cannot be empty' });
      return false;
    }

    if (!description) {
      SnackMessage({ status: 401, msg: 'description cannot be empty' });
      return false;
    }

    if (!pdfUrl) {
      SnackMessage({ status: 401, msg: 'PDF cannot be empty' });
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

  const handleFileInput = async (image) => {
    setUpload(true);
    setImageFlag(true);
    const response = await ImageUpload(image, props.userData.token);
    setImage(response.url);
    setUpload(false);
  }

  const handlePdfUpload = async (pdf) => {
    setPdfUpload(true);
    const response = await PdfUpload(pdf, props.userData.token);
    setPdfUrl(response.url);
    setPdfUpload(false);
  }

  const handleUpdate = async () => {
    if (validateData()) {
      let data = { id: pdf_id, title: title, description: description, url: pdfUrl, featured_img: image, categories: categoriesChecked, brands: brandsChecked, tags: tags };
      const response = await CreatePdf(data, props.userData.token);
      SnackMessage({ status: response.status, msg: response.message });
      history.push('/dashboard/all-pdf');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {loading === true 
      ? 
      <div className={classes.loading}>
        <CircularProgress  />
      </div>
      :
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.heading}>Edit Pdf</h3>
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
                <TextField
                  id="description"
                  variant="outlined"
                  placeholder="Description"
                  className={classes.textBox}
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Grid item xs={12} className={classes.pdfContainer}>
                  {pdfUpload === true ? 
                    <div className={classes.uploader}>
                      <CircularProgress  />
                    </div>
                    :
                    pdfUrl !== '' ? <object width="100%" height="600" data={pdfUrl !== '' ? API_URL + pdfUrl : ''} type="application/pdf" aria-label="pdf"/> : null
                  }
                  <label htmlFor="pdf-upload">
                    <input
                      accept="pdf/*"
                      className={classes.input}
                      id="pdf-upload"
                      ref={pdfFileInput}
                      onChange={(e) => handlePdfUpload(e.target.files[0])}
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
                      Update PDF
                    </Button>
                  </label>
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
                  {upload === false ? 
                    <img className={classes.image} src={title !== '' && (/http/ig).test(image) === false ? API_URL + image : image} alt="upload" />
                    :
                    <div className={classes.uploader}>
                      <CircularProgress  />
                    </div>
                  }
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
                    Update Image
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
                  variant="outlined"
                  multiline
                  rows={5}
                  placeholder="politics, news, breaking news, ..."
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
                  onClick={handleUpdate}
                  startIcon={<CheckIcon />}
                >
                  Update Post
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(EditPdf);