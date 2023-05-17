import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import '../styles/DishForm.scss';
import * as Yup from 'yup';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField  } from '@mui/x-date-pickers/';
import dayjs from 'dayjs';



function DishForm() {
  
  const idRef = useRef(0);
  const dishFormSchema = Yup.object().shape({
    dishName: Yup.string()
      .min(3, 'Dish Name must be at least 3 characters long')
      .required('Dish Name is required'),
    preparationTime: Yup.string().test(
        'is-valid-time',
        'Please provide the full time',
        (value) => {
          const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
          return timeFormatRegex.test(value);
        }
      ),
      
    dishType: Yup.string().required('Dish Type is required'),
    noOfSlices: Yup.lazy((value) => {
      if (formik.values.dishType === 'pizza') {
        return Yup.number().required('Number of Slices is required').min(1, 'Number of Slices must be at least 1');
      }
      return Yup.number().min(1, 'Number of Slices must  be at least 1');
    }),
    diameter: Yup.lazy((value) => {
      if (formik.values.dishType === 'pizza') {
        return Yup.number().required('Diameter is required').min(0.01, 'Diameter must be at least 0.01');
      }
      return Yup.number().min(0.01, 'Diameter must be at least 0.01');
    }),
    spicinessScale: Yup.lazy((value) => {
      if (formik.values.dishType === 'soup') {
        return Yup.number().required('Spiciness Scale is required').min(1, 'Spiciness Scale must be at least 1').max(10, 'Spiciness Scale must be at most 10');
      }
      return Yup.number().min(1, 'Spiciness Scale must be at least 1').max(10, 'Spiciness Scale must be at most 10');
    }),
    slicesOfBread: Yup.lazy((value) => {
      if (formik.values.dishType === 'sandwich') {
        return Yup.number().required('Number of Slices of Bread is required').min(1, 'Number of Slices of Bread must be at least 1');
      }
      return Yup.number().min(1, 'Number of Slices of Bread must be at least 1');
    }),
  })

  const formik = useFormik({
    initialValues: {
      dishType: '',
      dishName: '',
      preparationTime: null,
      noOfSlices: '',
      diameter: '',
      spicinessScale: '',
      slicesOfBread: '',
    },
    validationSchema: dishFormSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        let formData = {
          id: generateId(),
          preparation_time: values.preparationTime,
          type: values.dishType,
          
        };
       
        if (values.dishType === 'pizza') {
          formData = {
            ...formData,
            name: values.dishName,
            no_of_slices: values.noOfSlices,
            diameter: values.diameter,
          };
        } else if (values.dishType === 'soup') {
          formData = {
            ...formData,
            name: values.dishName,
            spiciness_scale: values.spicinessScale,
          };
        } else if (values.dishType === 'sandwich') {
          formData = {
            ...formData,
            name: values.dishName,
            slices_of_bread: values.slicesOfBread,
          };
          delete formData.diameter; 
        }
        const response = await axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status !== 200) {
          
          console.log('Error:', response.data);
        } else {
          
          console.log('Response:', response.data);
          alert('Form submitted successfully!');
          resetForm();
        }
      } catch (error) {
        console.error('Error:', error);
        
      }
    },
  });
  const generateId = () => {
    idRef.current += 1;
    return String(idRef.current);
  };
  return (
    <form onSubmit={formik.handleSubmit} className='form--Dishes'>
      <TextField
        label="Dish Name"
        htmlFor="name"
        id="dish-name"
        {...formik.getFieldProps('dishName')}
        error={formik.touched.dishName && Boolean(formik.errors.dishName)}
        helperText={formik.touched.dishName && formik.errors.dishName}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label="Preparation Time"
          id="preparation-time"
          format="HH:mm:ss"
          value={formik.initialValues.preparationTime}
          onChange={(time) => {
            const formattedTime = dayjs(time).format('HH:mm:ss');
            formik.setFieldValue('preparationTime', formattedTime);
          }}
          onBlur={formik.handleBlur('preparationTime')}
          error={formik.touched.preparationTime && Boolean(formik.errors.preparationTime)}
          helperText={formik.touched.preparationTime && formik.errors.preparationTime}
          required
        />
      </LocalizationProvider>

      <FormControl required > 
        <InputLabel id="dish-type-label">Dish Type</InputLabel>
        <Select
          labelId="dish-type-label"
          id="dish-type"
          {...formik.getFieldProps('dishType')}
          error={formik.touched.dishType && Boolean(formik.errors.dishType)}
          style={{height: '80px',fontWeight:'bold'}}
        >
          <MenuItem style={{height: '40px',fontWeight:'bold'}} value="">Please select a dish type</MenuItem>
          <MenuItem style={{height: '40px',fontWeight:'bold'}} value="pizza">Pizza</MenuItem>
          <MenuItem style={{height: '40px',fontWeight:'bold'}} value="soup">Soup</MenuItem>
          <MenuItem style={{height: '40px',fontWeight:'bold'}} value="sandwich">Sandwich</MenuItem>
        </Select>
      </FormControl>

      {formik.values.dishType === 'pizza' && (
        <>
          <TextField
            label="# of Slices"
            type="number"
            id="no-of-slices"
            {...formik.getFieldProps('noOfSlices')}
            error={formik.touched.noOfSlices && Boolean(formik.errors.noOfSlices)}
            helperText={formik.touched.noOfSlices && formik.errors.noOfSlices}
            required
          />

          <TextField
            label="Diameter"
            type="number"
            id="diameter"
            {...formik.getFieldProps('diameter')}
            error={formik.touched.diameter && Boolean(formik.errors.diameter)}
            helperText={formik.touched.diameter && formik.errors.diameter}
            required
          />
        </>
      )}

      {formik.values.dishType === 'soup' && (
        <TextField
          label="Spiciness Scale"
          type="number"
          id="spiciness-scale"
          {...formik.getFieldProps('spicinessScale')}
          error={formik.touched.spicinessScale && Boolean(formik.errors.spicinessScale)}
          helperText={formik.touched.spicinessScale && formik.errors.spicinessScale}
          required
        />
      )}

      {formik.values.dishType === 'sandwich' && (
        <TextField
          label="# of Slices of Bread"
          type="number"
          id="slices-of-bread"
          
          {...formik.getFieldProps('slicesOfBread')}
          error={formik.touched.slicesOfBread && Boolean(formik.errors.slicesOfBread)}
          helperText={formik.touched.slicesOfBread && formik.errors.slicesOfBread}
          required
        />
      )}

      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
}

export default DishForm;