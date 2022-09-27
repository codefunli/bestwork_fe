
import { Avatar, Box, Button, Card, CardContent, CardHeader, 
    Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, 
    MenuItem, Radio, RadioGroup, Select, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import cities from 'hanhchinhvn/dist/tinh_tp.json';
import { District, Ward } from '../../core/types/administrative';
import { getDistrictsByCityCode, getWardsByDistrictCode } from '../../core/utils/administrative-utils';

const initialValues = {
    company:{
        name:"",
        email: "",
        telNo: "",
        taxNo:"",
        city: "",
        district: "",
        ward:"",
        startDate:"",
        endDate:""
    },
    user:{
        userName:"",
        password:"",
        firstName:"",
        lastName:"",
        telNo: "",
        email:"",
        isEnable:false,
        role:"admin"
    }
};

export default function CompanyRegister() {
    const [formValues, setFormValues] = useState(initialValues);
	const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const handleCityChange = (event:any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
                [name]: value,
            } 
        });

        setDistricts(getDistrictsByCityCode(value));
    }

    const handleDistrictChange = (event:any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
                [name]: value,
            } 
        });

        setWards(getWardsByDistrictCode(value));
    }

    const handleWardChange = (event:any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
                [name]: value,
            } 
        });
    }

    const handleAllowLoginChange = (event:any) => {
        const { name } = event.target;
        setFormValues({
            ...formValues,
            user: {
                ...formValues.user,
                [name]: !formValues.user.isEnable,
            } 
        });
    }

    const handleClearCompany = () => {
        setFormValues({
            ...formValues,
            company: initialValues.company
        });
    }

    const handleClearUser = () => {
        setFormValues({
            ...formValues,
            user: initialValues.user
        });
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(formValues);
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
                                                name="name"
                                                value={formValues.company.name}
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
                                                name="email"
                                                value={formValues.company.email}
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
                                                name="telNo"
                                                value={formValues.company.telNo}
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
                                                name="taxNo"
                                                value={formValues.company.taxNo}
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
                                                    name='city'
                                                    value={formValues.company.city}
                                                    onChange={handleCityChange}
                                                    label="non-required"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {Object.values(cities).map(city => (
                                                        <MenuItem value={city.code}>{city.name}</MenuItem>
                                                    ))}
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
                                                name='district'
                                                value={formValues.company.district}
                                                onChange={handleDistrictChange}
                                                label="non-required"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {districts.map(dis => (
                                                        <MenuItem value={dis.code}>{dis.name}</MenuItem>
                                                    ))}
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
                                                name='ward'
                                                value={formValues.company.ward}
                                                onChange={handleWardChange}
                                                label="non-required"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                    {wards.map(ward => (
                                                        <MenuItem value={ward.code}>{ward.name}</MenuItem>
                                                    ))}
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
                                                name="startDate"
                                                value={formValues.company.startDate}
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
                                                name="endDate"
                                                value={formValues.company.endDate}
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
                                        <Button variant="outlined" onClick={handleClearCompany}>
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
                                                name="userName"
                                                value={formValues.user.userName}
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
                                                name="password"
                                                value={formValues.user.password}
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
                                                name="firstName"
                                                value={formValues.user.firstName}
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
                                                name="lastName"
                                                value={formValues.user.lastName}
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
                                                name="telNo"
                                                value={formValues.user.telNo}
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
                                                name="email"
                                                value={formValues.user.email}
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
                                                control={<Switch checked={formValues.user.isEnable} name="isEnable" onChange={handleAllowLoginChange}/>}
                                                label="Enabled"
                                            />
                                            </FormControl>
                                        </div>
                                        <div className='col-12 col-md-6 d-block p-3'>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Role Assigned:</FormLabel>
                                                <RadioGroup row aria-label="role" name="role" value={formValues.user.role} defaultValue="admin">
                                                    <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
                                                    <FormControlLabel value="user" control={<Radio color="primary" />} label="User" disabled/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className='text-center justify-center m-1'>
                                        <Button variant="outlined" onClick={handleClearUser}>
                                            Clear
                                        </Button>
                                    </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} className="text-center">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>SAVE</Button>
                </Grid>
            </Grid>
        </form>
    );
}