
import { useEffect, useState } from 'react';
import {  Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { useQuery, useQueryClient } from 'react-query';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import { headUserCol, RoleUser, UserInfoRes } from '../../core/types/user';
import { getUsers } from '../../services/user-service';

const initialValues = {
    name: "",
    email: "",
};

export default function UserSearch() {
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [state, setState] = useState<UserInfoRes[]>([{
        id: -1,
        userId: '',
        current_org_id: -1,
        user_nm: '',
        role: RoleUser.SYS_ADMIN,
        email: '',
        first_nm: '',
        last_nm: '',
        is_deleted: false,
        created_dt: '',
        created_prg_id: '',
        updated_dt: '',
        updated_prg_id: '',
    }]);

    const nativgate = useNavigate();

    const { data, isLoading } = useQuery(['getUsers'], () => getUsers(), {
        staleTime: 10000,
        onSuccess:(company:any) => {
            company.data?.content?.forEach((userEl: { id: any; }) => {
                queryClient.setQueryData(['userEl', userEl.id], userEl);
            })
        }
    });

    useEffect(() => {
        // do some checking here to ensure data exist
        setState([]);
        if (data && data.data && data.data.content) {
            // mutate data if you need to
            setState(data.data?.content);
        };
    }, [data]);

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(formValues);
    };

    const handleClearData = (e:any) => {
        setFormValues({
            ...initialValues
        });
    }

    // miss pass id with url
    const handleEditData = (e:any,id:number) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.COMPANY.EDIT}/${id}`);
    }

    // miss pass id with url
    const handleEditData2 = (e:any,id:number) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.COMPANY.EDIT}/${id}`);
    }


    const arrButton:ArrayAction[] = [
        {
            nameFn:"edit",
            acFn: handleEditData,
            iconFn: "ModeEditIcon",
        },
        {
            nameFn:"edit2",
            acFn: handleEditData2,
            iconFn: "AcUnitIcon",
        },
    ]

    return (
        <div>
            <div className='row'>
                <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        COMPANY SEARCH
                    </Typography>
                </div>
                <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                    <Button variant="contained" color="primary" component={Link} to={UrlFeApp.COMPANY.CREATE}>
                        REGISTER
                    </Button>
                </div>
                <div className="col-sm-12 text-start d-block d-lg-none">
                    <Button variant="contained" color="primary" component={Link} to={UrlFeApp.COMPANY.CREATE}>
                        REGISTER
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <Grid 
                    container
                    direction="row"
                    alignItems="center">
                    <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
                        <Card w-full>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe">
                                    SC
                                </Avatar>
                                }
                                title="Seach info of your company"
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
                                                label="non-required"
                                                placeholder="Please input a new value"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="outlined-adornment-amount">Email:</InputLabel>
                                            <TextField
                                                fullWidth sx={{ mt: 1, mb: 1 }}
                                                required
                                                size="small"
                                                id="outlined-required"
                                                label="non-required"
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
                                                label="non-required"
                                                placeholder="Please input a new value"
                                            />
                                        </div>
                                    </div>
                                    <div className='text-center justify-center m-1'>
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button sx={{ mr: 1 }} size="small" variant="contained" type="submit">Search</Button>
                                            <Button onClick={handleClearData} variant="outlined">Clear</Button>
                                        </ButtonGroup>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
            {(state !== undefined && state.length > 0) && (
                <EnhancedTable 
                    headCells={headUserCol} 
                    rows={state}
                    isLoading={isLoading}
                    arrButton={arrButton}
                />
            )}
        </div>
    );
}