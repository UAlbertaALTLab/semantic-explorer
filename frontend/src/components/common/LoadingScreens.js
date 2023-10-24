import { CircularProgress } from "@mui/material";

export function SimpleSpinner() {
    return (
        <div>
            <CircularProgress 
                sx={{
                    color: "#000000",
                    position: "absolute",
                    top: "50%",
                    left: "50%"
                }}
            />
        </div>
    );
}

export function GraphSpinner() {
    return (
        <div>
            <CircularProgress 
                sx={{
                    color: "#000000",
                }}
            />
        </div>
    );
}