import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    handleSwitch: () => void;
}

export default function Header({handleSwitch}: Props) {
    return (
       <AppBar position="static" sx={{mb: 4}}>
        <Toolbar>
            <Typography variant="h6">
                Re-Store
            </Typography>
            <Switch onChange={handleSwitch}/>
        </Toolbar>
       </AppBar> 
    )
}