import React from 'react'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Table from '../components/Table'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function App() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'URL',
                accessor: 'url'
            },
            {
                Header: 'Icon',
                accessor: 'icon'
            },
            {
                Header: 'Visibility',
                accessor: 'visible',
            },
        ],
        []
    )
    const data = React.useMemo(
        () => [
            {
                name: 'Portainer',
                url: 'https://portainer.navneetlal.in',
                icon: 'portainer',
                visible: 'public'
            },
            {
                name: 'Portainer',
                url: 'https://portainer.navneetlal.in',
                icon: 'portainer',
                visible: 'public'
            },
            {
                name: 'Portainer',
                url: 'https://portainer.navneetlal.in',
                icon: 'portainer',
                visible: 'public'
            },
            {
                name: 'Portainer',
                url: 'https://portainer.navneetlal.in',
                icon: 'portainer',
                visible: 'public'
            },
            {
                name: 'Portainer',
                url: 'https://portainer.navneetlal.in',
                icon: 'portainer',
                visible: 'public'
            },
            {
                name: 'Portainer',
                url: 'https://portainer.navneetlal.in',
                icon: 'portainer',
                visible: 'public'
            },
        ],
        []
    )

    const router = useRouter()

    const fetchData = ({ pageIndex, pageSize }) => {
        console.log(pageIndex, pageSize)
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Container maxWidth="lg">
            <Grid>
                <IconButton onClick={() => router.push('/')}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Grid>
            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item>
                    <Typography variant='h3'>Bookmarks</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClickOpen}>
                        + Add
                    </Button>
                </Grid>
            </Grid>
            <CssBaseline />
            <Table columns={columns} fetchData={fetchData} pageCount={100} data={data} />
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </Container>
    )
}

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        mt: 2,
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-error-helper-text"
                        label="App Name"
                        placeholder="Portainer"
                        fullWidth
                        size='small'
                        margin="normal"
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        label="App Url"
                        placeholder="https://portainer.example.com"
                        fullWidth
                        size='small'
                        margin="normal"
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        label="App Icon"
                        placeholder="portainer"
                        helperText="Use icon name from MDI or pass a valid URL. Click here for reference"
                        fullWidth
                        size='small'
                        margin="normal"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default App
