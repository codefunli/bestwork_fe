
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const initialValues = {
    firstName: "",
    lastName: "",
    gender: "male",
    country: "Canada",
    hobby: ""
};

export default function CompanyEdit() {
    const params = useParams();
    alert("This is Id from company: " + params.id + " Let's use this Id to get data");
    const [formValues, setFormValues] = useState(initialValues);
    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(formValues);
        // cal ap
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" className='mb-4' color="textSecondary" gutterBottom>
                COMPANY REGISTER
                <Divider />
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Card w-full>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                C
                            </Avatar>
                            }
                            title="Register a new company"
                            subheader={new Date().toLocaleDateString()}
                        />
                        <CardContent>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Company Name:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Email:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Tel-no:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Tax-no:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 p-1'>
                                            <InputLabel id="demo-simple-select-outlined-label">City/Provice</InputLabel>
                                            <FormControl size="small" fullWidth sx={{ mt: 1, mb: 1 }} variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">non-required</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                //value={age}
                                                //onChange={handleChange}
                                                label="non-required"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className='col-12 col-sm-6 p-1'>
                                            <InputLabel id="demo-simple-select-outlined-label">District/Town:</InputLabel>
                                            <FormControl size="small" fullWidth sx={{ mt: 1, mb: 1 }} variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">non-required</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                //value={age}
                                                //onChange={handleChange}
                                                label="non-required"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel id="demo-simple-select-outlined-label">Ward/Township:</InputLabel>
                                            <FormControl size="small" fullWidth sx={{ mt: 1, mb: 1 }} variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">non-required</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                //value={age}
                                                //onChange={handleChange}
                                                label="non-required"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Street:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Start Date/Time (UTC):</InputLabel>
                                            <TextField
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="dateStart"
                                                label="start"
                                                type="datetime-local"
                                                defaultValue="2017-05-23T10:30"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">End Date/Time (UTC):</InputLabel>
                                            <TextField
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="dateEnd"
                                                label="end"
                                                type="datetime-local"
                                                defaultValue="2017-05-24T10:30"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-center justify-center m-1'>
                                        <Button variant="outlined">
                                            Clear
                                        </Button>
                                    </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card w-full>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                U
                            </Avatar>
                            }
                            title="Register a new admin user"
                            subheader={new Date().toLocaleDateString()}
                        />
                        <CardContent>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">User Name:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Password:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">First Name:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Last Name:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-12 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Tel-no:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-12 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Email:</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-lg-6 d-block p-3'>
                                            <FormControl component="fieldset">
                                            <FormLabel component="legend">Allow Login</FormLabel>
                                            <FormControlLabel
                                                control={<Switch checked={true} name="gilad" />}
                                                label="Enabled"
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='col-12 col-md-6 d-block p-3'>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Role Assigned:</FormLabel>
                                                <RadioGroup row aria-label="role" name="role" value="admin" defaultValue="admin">
                                                    <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
                                                    <FormControlLabel value="user" control={<Radio color="primary" />} label="User" disabled/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className='text-center justify-center m-1'>
                                        <Button variant="outlined">
                                            Clear
                                        </Button>
                                    </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} className="text-center">
                    <Button variant="contained" color="primary">
                        SAVE
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}