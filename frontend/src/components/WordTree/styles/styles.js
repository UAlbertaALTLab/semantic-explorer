import { makeStyles, createStyles} from "@material-ui/core";

const useStyles = makeStyles(
    createStyles({
      button: {
        position: "relative",
        width: 150,
        height: 40,
        background: "light-gray",
        color: "black",
        "& > span": {
          flexFlow: "column"
        },
        "&:hover": {
          background: "white"
        }
      },
      creeButton: {
        color: "green", background: "white", width: 220, borderRadius: "15px", "&:hover": {
          background: "white"}
      },
      name: {
        fontSize: "14px",
        fontFamily: "'Open Sans', sans-serif"
      },
      listContainer: {
        height: "200px",
        width: '100%',
        overflowY: "auto",
        overflowX: 'hidden',
        wordWrap: 'break-word',
        borderRadius: "10px",
        "&::-webkit-scrollbar": {
          width: "20px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "5px"
        }
      },
      emptyListContainer: {
        height: "200px",
        width: '100%',
        overflowY: "auto",
        overflowX: 'hidden',
        wordWrap: 'break-word',
        borderRadius: "10px",
        color: "black",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "brown",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#eee",
          borderRadius: "10px"
        }
      },
    })
);

export {useStyles};