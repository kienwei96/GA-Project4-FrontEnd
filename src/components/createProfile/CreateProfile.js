import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import styles from './createProfile.module.css';
import Spinner from '../others/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function CreateProfile() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const { table_header, create } = styles;
  const [contact, setContact] = useState(
    'needs to be between 8 and 12 numbers'
  );
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [vaccination, setVaccination] = useState('');
  const [recovered, setRecovered] = useState('');
  const [favourite, setFavourite] = useState([]);
  const [bio, setBio] = useState('');
  const [response, setResponse] = useState(null);
  const [badRequest, setBadRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectOnProfile, setRedirectOnProfile] = useState(false);

  const addProfile = async () => {
    try {
      setLoading(true);
      const response = await fetchContext.authAxios.post('/profile/new', {
        _id: authContext.authState.userInfo._id,
        contact: contact,
        age: age,
        gender: gender,
        location: location,
        vaccination: vaccination,
        recovered: recovered,
        favourite,
        bio: bio,
      });
      console.log('response', response.data.message);
      authContext.authState.userInfo.setProfile = true;
      setResponse(response.data.message);
      setTimeout(() => {
        setLoading(false);
        setRedirectOnProfile(true);
      }, 1500);
    } catch (error) {
      console.log(error.response);
      setResponse(error.response.data);
      setBadRequest(error.response.data);
      setLoading(false);
    }
  };

  const favouriteList = [
    'Badminton',
    'Basketball',
    'Baseball',
    'Football',
    'Futsal',
    'Soccer',
    'Ping Pong',
    'Tennis',
  ];
  const handleSubmit = () => {
    addProfile();
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleVaccinationChange = (e) => {
    setVaccination(e.target.value);
  };

  const handleRecoveredChange = (e) => {
    setRecovered(e.target.value);
  };

  const handleFavouriteChange = (e) => {
    const favouriteArray = e.map((e) => {
      return e;
    });
    setFavourite(favouriteArray);
  };

  console.log('bad request is', badRequest);

  return (
    <>
      {redirectOnProfile && <Navigate to='/' replace={true} />}
      {loading ? <Spinner /> : ''}
      <div className={table_header}>Create Profile</div>
      <Paper
        sx={{
          maxHeight: '80vh',
          overflow: 'auto',
          maxWidth: '76vw',
          display: 'flex',
          flex: 1,
          m: 10,
          borderRadius: 2,
          flexDirection: 'column',
        }}
        elevation={0}
      >
        <Modal
          open={loading}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Spinner />
        </Modal>
        <TableContainer>
          <Table
            stickyHeader
            aria-label='view table'
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
                p: 2,
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ color: '#4682B4', fontWeight: '600' }}
                ></TableCell>
                <TableCell>Contact No*</TableCell>
                <TableCell>
                  <TextField
                    placeholder={contact}
                    inputProps={{ style: { fontSize: 14, display: 'grid' } }}
                    size='small'
                    variant='outlined'
                    sx={{ width: 350 }}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                  {response ? response.contact : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Age*</TableCell>
                <TableCell>
                  <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    size='small'
                    variant='outlined'
                    sx={{ width: 350 }}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                  {response ? response.age : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Gender*</TableCell>
                <TableCell>
                  <Select
                    labelId='select-gender'
                    id='select-gender'
                    value={gender}
                    variant='outlined'
                    sx={{ width: 350 }}
                    onChange={handleGenderChange}
                  >
                    <MenuItem value={'Female'}>Female</MenuItem>
                    <MenuItem value={'Male'}>Male</MenuItem>
                  </Select>
                  {response ? response.gender : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Location*</TableCell>
                <TableCell>
                  <Select
                    labelId='location'
                    id='location'
                    variant='outlined'
                    value={location}
                    onChange={handleLocationChange}
                    sx={{ width: 350 }}
                  >
                    <MenuItem value={'City'}>City</MenuItem>
                    <MenuItem value={'Central'}>Central</MenuItem>
                    <MenuItem value={'East'}>East</MenuItem>
                    <MenuItem value={'South'}>South</MenuItem>
                    <MenuItem value={'West'}>West</MenuItem>
                    <MenuItem value={'North'}>North</MenuItem>
                  </Select>
                  {response ? response.location : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Covid-19 Vaccination*</TableCell>
                <TableCell>
                  <Select
                    labelId='vaccination'
                    id='vaccination'
                    variant='outlined'
                    value={vaccination}
                    onChange={handleVaccinationChange}
                    sx={{ width: 350 }}
                  >
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                  </Select>
                  {response ? response.vaccination : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Covid-19 Recovered*</TableCell>
                <TableCell>
                  <Select
                    labelId='recovered'
                    id='recovered'
                    variant='outlined'
                    value={recovered}
                    onChange={handleRecoveredChange}
                    sx={{ width: 350 }}
                  >
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                  </Select>
                  {response ? response.recovered : ''}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Favourite Sports</TableCell>
                <TableCell>
                  <Autocomplete
                    multiple
                    id='checkboxes-tags-demo'
                    options={favouriteList}
                    disableCloseOnSelect
                    autoHighlight
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => handleFavouriteChange(value)}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    sx={{ width: 350 }}
                    renderInput={(params) => (
                      <TextField {...params} variant='outlined' />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>Bio</TableCell>
                <TableCell>
                  <TextField
                    placeholder={bio}
                    multiline
                    maxRows={4}
                    inputProps={{ style: { fontSize: 14 } }}
                    size='small'
                    variant='outlined'
                    sx={{ width: 350 }}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> </TableCell>
                <TableCell>
                  <strong>
                    {badRequest ? `Error: ${badRequest.message}!` : ''}
                  </strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className={create}>
            <Button
              className='primary-color marginB-2'
              type='submit'
              variant='contained'
              onClick={handleSubmit}
            >
              Create
            </Button>
          </div>
        </TableContainer>
      </Paper>
    </>
  );
}
