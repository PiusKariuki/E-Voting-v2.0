import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useSpinner = () => {
	/*..............material ui  styling */
	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			"& > * + *": {
				marginLeft: theme.spacing(2),
			},
		}
	}));
	/* ......end styling.............*/

	/*........spinner render fn...........*/
	const renderSpinner = (load, text) => {
		const classes = useStyles();
		return (
			<div className={classes.root}>
				{load === true ? (
					<Grid container>

						<Grid item xs={12} >
							<CircularProgress color="secondary" xs={12} />
						</Grid>

						<Grid item xs={12} >
							<Typography variant="subtitle1" color ="secondary">
								{text}
							</Typography>
						</Grid>
						
					</Grid>
				) : null}
			</div>
		);
	};
	/*...........end spinner renderer fn...........*/

	/*...........custom hook return mthd .........*/
	return [renderSpinner];
};

export default useSpinner;
